---
layout: post
title: !binary |-
  SHlsYWZheCB3aXRoIEEwMS1QVTMgV2ViUnVubmVyIFVTQg==
created: 1258448889
comments: true
categories: !binary |-
  ZGViaWFuIGVuX3Vz
---
<blockquote>HylaFAX is an enterprise-class system for sending and receiving facsimiles as well as for sending alpha-numeric pages.</blockquote>

The A01-PU3 is an usb PSTN modem that support the <a href="http://wiki.openmoko.org/wiki/USB_CDC_ACM">CDC ACM</a> standard, and it works great on Linux!

On Debian you can easily setup an Hylafax Server installing it by:
<pre lang="bash">aptitude install hylafax</pre>
And configure your fax device with <a href="http://www.hylafax.org/content/Handbook:Basic_Server_Configuration:Faxaddmodem">faxaddmodem</a>:
<pre lang="bash">faxaddmodem /dev/ttyACM0</pre>

At this point, the faxserver was correctly receiving faxes but the sending was constatly failing due to no carrier errors:
<pre lang="none">Nov 16 12:18:09 hylafax FaxSend[8506]: SEND FAILED: JOB N DEST XXXXXXX ERR [2] No carrier detected</pre>
You should add to /etc/hylafax/config.ttyACM0 for fixing the problem:
<pre lang="none">ModemResetCmds:         ATX3</pre>

You can find other useful information on:
<a href="http://wiki.debian.org/HylaFax#ConfiguringFaxtoEmail">DebianWiki</a>
<a href="http://www.hylafax.org/content/Handbook">HylaFax Documentation</a>
<a href="http://www.hylafax.org/content/Desktop_Client_Software">HylafaxFax Desktop Clients</a>
