---
layout: post
title: !binary |-
  SG93IHRvIGNpcmN1bXZlbnQgdGhlIDQxNyBFeHBlY3RhdGlvbiBmYWlsZWQg
  YmVoaW5kIGEgU3F1aWQgcHJveHk=
created: 1283853194
comments: true
categories: !binary |-
  ZW5fdXMgc29mdHdhcmU=
---
Many applications rely on using a special HTTP/1.1 header (Expect: 100-continue) when doing a POST, which is not happily supported by Squid.

<a href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec8.html">RFC2616</a> says:

<blockquote>The purpose of the 100 (Continue) status (see section 10.1.1) is to allow a client that is sending a request message with a request body to determine if the origin server is willing to accept the request (based on the request headers) before the client sends the request body. In some cases, it might either be inappropriate or highly inefficient for the client to send the body if the server will reject the message without looking at the body. </blockquote>

We can configure Squid to simply ignore that request header, and usually client with poor error handling will fallback without even notice it.

Add in squid.conf:
<code>ignore_expect_100 on</code>

Android application like AppBrain and Facebook Contact Sync, and BOINC client was having login issues due to this reason.
