---
layout: post
title: !binary |-
  TGlua3N5cyBXQUc1NEcyIGFuZCBzbG93bmVzcyBvbiBwMnA=
created: 1255973766
comments: true
categories: !binary |-
  ZW5fdXMgaGFyZHdhcmU=
---
It's 3 weeks that I bought a <strong>Linksys WAG54G2</strong> wifi adsl router, and <strong>I wasn't very happy</strong> with it.
Even with a very low bandwidth allotment for my torrent client, the <strong>navigation</strong> on every site was <strong>very SLOW</strong> (~5 sec for http://www.google.it), with the latest firmware (1.00.17) and with default settings.

Today I probably<strong> found a solution</strong> for the WAG54G2 problems with high latency when using p2p. The problem is probably not the router itself, but it's poor QoS implementation or its gui frontend.

Let's look at my actual configuration.

With this QoS configuration, <strong>I can happily browse the internet while torrenting</strong>. I don't have any idea why the hell with QoS disabled, the opening of new connections is massively retarded.

For those who aren't fluent in Linksys web interface, you should go to Applications &
Gaming -> QoS;
Set Internet Bandwidth to Manual (I have a 7mbits DSL, ~8000 should be good, I put 9000)
In Category -> Applications, Add a new application: name web, port range 80 80 on the first line, 443 443 on the second and 53 on the third. On the dropdown select Both, Priority Medium, then Add.
Save settings.
Finish.

If these settings solve your problems, <strong>please drop me a comment</strong> on this page, thanks!
