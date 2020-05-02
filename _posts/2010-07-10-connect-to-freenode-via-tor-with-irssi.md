---
layout: post
title: !binary |-
  Q29ubmVjdCB0byBGcmVlbm9kZSB2aWEgVG9yIHdpdGggaXJzc2k=
created: 1278764929
comments: true
categories: !binary |-
  ZW5fdXMgc29mdHdhcmU=
---
For privacy paranoids, it's possibile to hide our own location when connecting to IRC Freenode using Tor.

Prerequisites:
* A working tor client on your workstation
* A registered nick on Freenode

What you need:
* http://freenode.net/sasl/cap_sasl.pl (irssi plugin for SASL auth)
<!--break-->
You should add or change the server for connecting to Freenode:
<pre><code>servers = (
  {
    address = "p4fsi4ockecnea7l.onion";
    chatnet = "freenode";
    port = "6667";
    autoconnect = "yes";
  }
);</code></pre>

wget the perl irssi script in and add it to autostart.
<pre><code>cd ~/.irssi/scripts/
wget http://freenode.net/sasl/cap_sasl.pl
cd ~/.irssi/scripts/autorun
ln -s ../cap_sasl.pl</code></pre>

In irssi do:
<pre><code>/sasl add freenode <nick> <pass> DH-BLOWFISH
/sasl save</code></pre>

Now launch irssi using the tor wrapper, torify:
<pre><code>torify irssi</code></pre>

As an additional note, I <a name="patch">added a line</a> to the perl script to make it working on my irssi:
<pre><code>--- cap_sasl_old.pl     2010-01-28 22:38:43.000000000 +0100
+++ cap_sasl.pl 2010-07-10 13:10:04.000000000 +0200
@@ -4,6 +4,7 @@
 # $Id$
 
 use MIME::Base64;
+use Irssi::Irc;
 
 $VERSION = "1.1";
 </code></pre>

For macports users:
<pre><code>sudo port install p5-crypt-blowfish p5-crypt-dh p5-crypt-openssl-bignum \
p5-math-gmp p5-math-pari</code></pre>
Although I've installed these libraries, I continue to get the error:
<pre><code>Math::BigInt: couldn't load specified math lib(s), fallback to Math::BigInt::Calc at 
          /opt/local/lib/perl5/vendor_perl/5.8.9/Crypt/DH.pm line 6</code></pre>
Comments welcome.

