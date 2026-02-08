---
layout: post
title: "Fixing Google Sheets: import securities prices via Yahoo Finance"
permalink: /2026/google-sheets-yahoo-finance-fix/
image: /images/2026/yahoo-import-hero.png
tags:
  - finance
  - open-source
  - google-sheets
  - yahoo-finance
---

As many of you may have noticed, Google Finance recently broke support for many
European tickers (ETFs on Borsa Italiana, XETRA, etc.) within Google Sheets. The
classic `=GOOGLEFINANCE("BIT:VWCE")` now simply returns an error, leaving us
stranded.

Since waiting for a fix from Google is wishful thinking, and many are scrambling
for alternatives, I've built a clean solution based on **Cloudflare Workers**.
This allows you to import prices from Yahoo Finance (perfect for EU markets and
beyond) using a very simple formula.

It's a lightweight, open-source API that queries Yahoo Finance and returns only
the price in text format—ideal for being "digested" by Google Sheets.

You just need to use the `IMPORTDATA` function, pointing to either my public
instance or your own (if you prefer total control over privacy and uptime).

## Examples

* **VWCE (XETRA)**: `=IMPORTDATA("https://yf-import.gionn.net/api/quotes/VWCE.DE")`
* **VUAA (Milan)**: `=IMPORTDATA("https://yf-import.gionn.net/api/quotes/VUAA.MI")`
* **AAPL (US)**: `=IMPORTDATA("https://yf-import.gionn.net/api/quotes/AAPL")`

## Key Information

* **Public Instance**: It’s free and currently runs on my free Cloudflare
  account, which handles up to 100,000 requests per day. If we ever hit this
  limit, I’ll re-evaluate the next steps.
* **Caching**: Prices are cached for 4 hours to avoid hammering Yahoo’s servers.
  I'm fairly sure you won't be checking your sheets more frequently than that!
* **Self-Hosting (For Power Users)**: If you want total control, the project is
  on GitHub:
  [https://github.com/gionn/yf-import](https://github.com/gionn/yf-import). Just
  click "Fork," connect your Cloudflare Workers, and you'll have your own
  private instance: `https://yf-import.yourname.workers.dev`.

I hope this helps anyone who, like me, has been dealing with a "broken"
portfolio tracker for the past few months.

Let me know if you run into issues with any specific tickers or anything else!
