---
layout: post
title: How I built a cross-chain Dex arbitrage bot
tags:
 - english
 - cryptocurrency
hidden: true
---

> This article is a work in progress and I will update it in the coming weeks.

Since August I am following all the DeFi revolution on Ethereum and side-chains.
When jumping from a Discord server to another in the crypto space, you can find
a lot of people talking about big *arbitrage* opportunities on the multiple
Decentralized Exchanges (DEX) that are popping everywhere, even on different
chains.

Arbitrage exists even in traditional finance and is the practice of taking
advantage of a difference in prices of the same assets in two or more markets.

Talking with a friend, we imagined it would be cool to try developing a simple
arbitrage bot interacting with on-chain contract to detect arbitrage
opportunities and execute swaps to capture them.

The first task was to find a low capitalization token that can be found on
multiple DEX of different chains, and we came across
[YEL](https://yel.finance/), Yield Enhancement Labs (YEL) is a multi-chain yield
enhancement protocol, that can be found, paired with native chain tokens, on
Apeswap (BSC), Quickswap (Polygon) and Spookyswap (Fantom) exchanges.

Most DEX are just forks of the great Uniswap V2, so to query prices and make
swap we need to learn how Uniswap V2 works and which method are available on
their smart contracts. The [Router
documentation](https://docs.uniswap.org/protocol/V2/reference/smart-contracts/router-02)
is a good starting point to learn them.

But first, let's describe how to the bot should work.

### Opportunity finder

* On each monitored DEX:
  * Retrieve how much BToken you are getting with a fixed AToken input
  * Select the DEX with higher output where you are going to swap the AToken
* Repeat the loop on each monitored DEX, excluding the already selected DEX to:
  * Retrieve how much AToken you are getting with the BToken amount obtained
    before
  * Select the DEX with higher output where you are going to swap the BToken
* Compare the difference between the AToken input for the first swap and the
  AToken output of the second swap:
  * If it's worth it, execute the swap transactions
  * If it's worth it, but the wallet balances are not sufficient to make the
    swap, it's better to sleep until the next iteration
  * If it's not worth it, sleep until the next iteration

### Connect to multiple chains via Web3

To interact with smart contracts, the [Web3.py] library is a good starting
point.

You can hook on different chains just by creating a Web3 instance:

```python
from web3 import Web3
from web3.middleware import geth_poa_middleware

def getWeb3Matic():
    w3 = Web3(Web3.HTTPProvider(
        'https://rpc-mainnet.maticvigil.com/'))
    w3.middleware_onion.inject(geth_poa_middleware, layer=0)
    return w3


def getWeb3Ftm():
    w3 = Web3(Web3.HTTPProvider(
        'https://rpc.ftm.tools/'))
    w3.middleware_onion.inject(geth_poa_middleware, layer=0)
    return w3


def getWeb3Bsc():
    w3 = Web3(Web3.HTTPProvider(
        'https://bsc-dataseed.binance.org/'))
    w3.middleware_onion.inject(geth_poa_middleware, layer=0)
    return w3
```

The `geth_poa_middleware` is required by `BSC`, `Polygon` and `Fantom` since they are all Proof-of-Authority chains.

### Get a swap quote

Now we can build a Contract instance referencing the contract address (it may be
different on each chain):

```python
contract_addr = Web3.toChecksumAddress(
    '0xcF0feBd3f17CEf5b47b0cD257aCf6025c5BFf3b7')
contract = w3.eth.contract(contract_addr, abi=abi_def)
```

In order to call contract methods, the library needs to know the Application
Binary Interface (ABI) of the contract, that can be easily copied from the
contract explorer page:
[bscscan](https://bscscan.com/address/0xcf0febd3f17cef5b47b0cd257acf6025c5bff3b7#code).
Scroll down to the `Contract ABI` section and grab the json definition that
should be passed as `abi_def` in the snippet.

Now we are ready to call the `getAmountsOut` method to obtain how many B token
you get spending a certain amount of A token, that is exactly the same function
that get executed when you are on the Swap page of a DEX and you have selected
the types of the two tokens and entered a number on the source input.

```python
input_quantity_wei = 1000000000000000000
swap_path = [input_token_address, output_token_address]
swap_contract.functions.getAmountsOut(input_quantity_wei, swap_path).call()
```

The `input_quantity_wei` is an integer value expressed in `wei` (1 unit =
10^18), that can be easily converted with `Web3.toWei(input_quantity, 'ether')`.
In the example is 1 YEL.

The `*_token_address` can be easily found by searching for the token name on
Explorer, e.g. [YEL on
BSC](https://bscscan.com/token/0xd3b71117e6c1558c1553305b44988cd944e97300).

The `swap_path` can contains more than two token address, since some pairs are
not directly available (e.g.: YEL -> BNB -> BUSD).

The output of the `getAmountsOut` is an array of token amounts (one for each
token in the `swap_path`). The last element of the array contains the output
amount, taking care of swap fees and Price Impact.

```python
[1000000000000000000, 51809702564267386, 131625]
```

Please be aware that each token can have a different amount of decimals, for
example USDC on Polygon and Fantom has 6 decimals, while on BSC it's 18.

### Make a swap

Now the fun part: make the swap with the `swapExactTokensForTokens`. Please note
that if you want to swap from/to the native chain token (BNB, MATIC, FTM), there
are slightly different version of this method (`swapExactETHForTokens` and
`swapTokensForExactETH`).

```python
import time

account_address = '***REMOVED***'
input_quantity_wei = 1000000000000000000
minimum_input_quantity_wei = 997000000000000000
deadline = int(time.time() + 60)
fun = contract.functions.swapExactTokensForTokens(
    input_quantity_wei,
    minimum_input_quantity_wei,
    swap_path,
    account_address,
    deadline
)
```

The `minimum_input_quantity_wei` is necessary to avoid the [Sandwich
attacks](https://coinmarketcap.com/alexandria/article/what-are-sandwich-attacks-in-defi-and-how-can-you-avoid-them),
and should be set to something like the 0.3% of the `input_quantity_wei`. In
this way, you are getting at least such minimum quantity after the swap, or the
transaction get aborted and you lost have lost only the transaction fee.

The `deadline` will abort the transaction if it get executed too late, for
example due to increasing gas on the network.

Now it's time to build the transaction, sign it with your private key and
broadcast it on the network.

```python
tx = fun.buildTransaction(
    {
        'from': account_address,
        'nonce': w3.eth.getTransactionCount(account_address),
        'gasPrice': Web3.toWei('30', 'gwei'),
    }
)
signed_tx = w3.eth.account.signTransaction(tx, my_account.key)
emitted = w3.eth.sendRawTransaction(signed_tx.rawTransaction)
```

There are different ways to manage accounts and keys with Web3, and you
definitively needs to take a look at the
[docs](https://web3py.readthedocs.io/en/stable/web3.eth.account.html).

The `gasPrice` depends on the network, on BSC starts from 5, on Polygon starts
from 30, on Fantom you need an API.
