---
layout: post
title: "Ethereum senza fronzoli: crea wallet e prime transazioni"
---

## Cosa è Ethereum (spiegato semplice)

Ethereum è una **rete decentralizzata** che consente di trasferire fondi a
terzi senza intermediari fisici come banche, governi o aziende. Nello specifico,
puoi trasferire la valuta nativa (Ether) o qualsiasi altro token disponibile
sulla rete (stablecoins, wrapped Bitcoin o altri tipi di token), fino ad
operazioni più complesse come interagire con gli smart contract.

Gli smart contract sono programmi resi disponibili all'interno del network, e
permettono di eseguire una o più operazioni in sequenza, come previsto dagli
sviluppatori che lo hanno sviluppato e pubblicato. Per maggiori dettagli tecnici
vedi il linguaggio di programmazione [Solidity](https://soliditylang.org/) e
alcune [implementazioni](https://docs.openzeppelin.com/contracts/5.x/tokens).

Per poter interagire sulla rete Ethereum, è necessario pagare una commissione,
che viene semplicemente chiamata `gas`, per analogia con la benzina che fa
funzionare un motore. Più complessa è l'azione, più gas serve. Il gas si paga
usando la valuta nativa Ethereum.

## Perché esistono le sottoreti Layer 2 (L2)

La rete Ethereum, denominata L1 o mainnet, ha una capienza limitata, e quando la
rete è particolarmente congestionata, le commissioni per poter eseguire una
nuova transazione possono lievitare vertiginosamente. Negli ultimi anni ha preso
piede un nuovo paradigma basato sull'avere un insieme di sotto-reti indipendenti
(L2), con alcune caratteristiche che però le rendono molto più interessanti
rispetto ad altre reti L1 alternative:

- Sono veloci e economiche
- Continuano a usare Ethereum come base di sicurezza
- Supportano le stesse funzionalità a livello applicativo di Ethereum

Alcuni esempi delle L2 più utilizzate sono **Arbitrum**, **Optimism** e
**Base**. Per chi ama approfondire i numeri,
[DefiLlama](https://defillama.com/chains/Rollup) offre statistiche in tempo
reale sulle performance delle principali L2.

## Il wallet Ethereum

Un *wallet* è il tuo portafoglio digitale: ti serve per ricevere, inviare e
custodire criptovalute. Ma non è solo un portafoglio, è anche l'interfaccia per
accedere al **Web3**: ti permette di interagire con le app decentralizzate come
Aave, Uniswap, OpenSea (che vedremo meglio più avanti).

Esistono wallet *custodial*, dove le chiavi vengono custodite da
qualcun altro, per esempio un exchange, e *non-custodial*, le cui chiavi sono
gestite direttamente da te. Qui ci concentreremo su come utilizzare un wallet
*non-custodial* open-source, nello specifico [Rabby Wallet](https://rabby.io/)
che è attualmente considerato uno dei wallet Ethereum con la migliore usabilità.

## Perché Rabby e non MetaMask

[MetaMask](https://metamask.io/) è ancora il più diffuso wallet non-custodial
open-source, ma soprattutto per i neofiti **Rabby** ha alcuni vantaggi chiave:

- Gestisce le sottoreti Ethereum (L2) in modo più trasparente rispetto a MetaMask
- Mostra una simulazione delle transazioni prima della loro firma
- Numerose altre piccole migliorie alla user experience che lo rendono più
  gradevole da utilizzare

## Installazione di Rabby

1. Vai su [https://rabby.io](https://rabby.io)
2. Scarica l'estensione per il tuo browser internet (Firefox o Chrome-based)
3. Dopo l'installazione fai clic sull'icona in alto a destra per iniziare

## Creazione di un nuovo wallet

Quando apri Rabby per la prima volta:

1. Seleziona **"Create a new address"**
2. Ti verrà mostrata una **seed phrase** (12 parole):
   - Questa è **la chiave per accedere ai tuoi fondi**, non perderla mai, non ci
     sono altre opzioni di recupero.
   - Scrivila su carta e conservala rigorosamente **offline**.
   - **NON** fare screenshot.
   - **NON** salvarla su Google Drive, iCloud o simili.
   - meglio conservarne una seconda copia in un luogo diverso da quello
     principale ma comunque facilmente accessibile a te.
3. Scegli una **password robusta** per criptare localmente il wallet, dovrai
   reinserirla ogni volta che riapri il browser. Se la dimentichi non importa,
   potrai sempre ripristinare il tuo wallet usando la **seed phrase**.

In futuro, o su un dispositivo diverso, anche usando un wallet software diverso,
potrai accedere allo stesso portafoglio inserendo la medesima **seed phrase**.

> ⚠️ Attenzione! Assicurati di utilizzare sempre i siti web ufficiali (usa i
> segnalibri!) o direttamente gli store del tuo browser/piattaforma, verificando
> che il publisher sia effettivamente quello previsto.

Ora hai un wallet Ethereum. In alto troverai il tuo **indirizzo pubblico** (una
stringa che inizia con `0x...`). È come l’IBAN del tuo conto crypto: puoi
ricevere ETH e altri token lì sopra.

Noterai che il bilancio sarà inesorabilmente vuoto, e già sai che per poter
effettuare transazioni è necessario avere un po' di `gas`, quindi adesso vediamo
come fare.

## Comprare Ethereum con carta di credito

Esistono numerosi servizi per acquistare cripto, quelli più semplici da
utilizzare per transazioni sporadiche utilizzando la carta di credito sono:

- [Transak](https://global.transak.com/)
- [Moonpay](https://www.moonpay.com/it/comprare/eth)
- [Ramp](https://ramp.network/buy)

> ⚠️ A causa delle stringenti normative anti-riciclaggio, è molto probabile che
> anche per piccoli importi, ti verrà richiesto di fornire i tuoi dati
> identificativi e seguire una procedura di *KYC* (know your customer).
> Purtroppo non ci sono scappatoie, ma se non hai fretta puoi mandarmi un tip
> privato con uno dei link che trovi a fine articolo, avendo cura di inserire
> l'indirizzo nel tuo wallet nel messaggio. Con calma, ti invierò un po' di
> Ethereum su L2 Arbitrum.

Segui il percorso che solitamente viene chiamato `Buy Crypto`, selezionando
`EUR` come valuta. Ogni servizio ha il suo taglio minimo, per i nostri primi
test 10 euro sono più che sufficienti.

Seleziona `ETH` o `Ethereum` come cripto di destinazione, ma assicurati di
selezionare una rete L2, come **Arbitrum**, così poi da poter effettuare
transazioni a bassissimo costo.

Come wallet di destinazione, incolla l'indirizzo che trovi nel tuo Rabby wallet
(che inizia con `0x...`), e completa l'operazione con le tue informazioni di
pagamento.

Riceverai gli Ethereum all'indirizzo e sulla rete che hai scelto dopo pochi
minuti.

## La tua prima transazione

A questo punto puoi effettuare la tua prima transazione attraverso Rabby,
utilizzando la funzione `Send`.

Puoi usare come destinatario il mio indirizzo che trovi a fine articolo, ma puoi
anche utilizzare il tuo stesso indirizzo, e ancor più interessante, il valore da
trasferire può anche essere pari a zero.

Per utenti più avanzati: puoi includere un breve messaggio nella transazione,
che verrà registrato sulla blockchain. Ti basta impostare il parametro
`calldata` con il tuo messaggio convertito da ascii a esadecimale, preceduto da
`0x` e senza spazi extra. Per esempio, `ciao eth` corrisponde a
`0x6369616f20657468`.

Dopo qualche istante, riceverai un messaggio che la transazione è stata
completata con successo. Se fai click sul messaggio, oppure da `Transactions`
fai click sull'id dell'ultima transazione, ti si aprirà il dettaglio della
transazione su un sito web chiamato block explorer, che pubblica tutti i
dettagli delle transazioni del network corrente.

## Parte 2?

Se ti è piaciuto questo articolo e vorresti leggere la seconda parte su come
interagire con le applicazioni distribuite più famose, fammelo sapere nei
commenti!
