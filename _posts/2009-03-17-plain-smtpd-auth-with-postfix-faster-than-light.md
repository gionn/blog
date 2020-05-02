---
layout: post
title: !binary |-
  UExBSU4gU210cGQgQXV0aCB3aXRoIFBvc3RmaXggKGZhc3RlciB0aGFuIGxp
  Z2h0KQ==
created: 1237308222
comments: true
categories: !binary |-
  ZGViaWFuIGVuX3Vz
---
Ok, you have a small postfix deployed, and you need a fast but effective protection from third people using your server as a rocket-delivering-spam.

The first thing to do, is to configure the variable mynetworks to allow only certain netblocks to use postfix to send email all over the world:
<code>mynetworks = 127.0.0.0/8 [::ffff:127.0.0.0]/104 [::1]/128 X.X.X.X/XX</code>
Look out: the ips should be in <a href="https://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing">CIDR</a> notation, so you probably need to <strong>apt-get install ipcalc</strong>.

Using ipcalc is straight-forward. For example, think our servers are located on the netblock from 188.57.33.80 to 188.57.33.87:
<code>$ ipcalc 188.57.33.80 - 188.57.33.87
deaggregate 188.57.33.80 - 188.57.33.87
188.57.33.80/29</code>
Here it is.

Next level is to configure smtp login, if you don't have a subnet for your clients.
<code>aptitude install sasl2-bin libsasl2-modules libsasl2-2</code>
Now enable daemon and configure it for being accessed by postfix, editing /etc/default/saslauthd:
<code>START=yes
OPTIONS="-c -m /var/spool/postfix/var/run/saslauthd"</code>

Now tell to postfix to use saslauth in <em>/etc/postfix/sasl/smtpd.conf</em>:
<code>pwcheck_method: saslauthd
mech_list: PLAIN LOGIN</code>

And enable it in <em>/etc/postfix/main.cf</em>:
<code>smtpd_sasl_auth_enable = yes
broken_sasl_auth_clients = yes
smtpd_recipient_restrictions = permit_sasl_authenticated, permit_mynetworks, reject_unauth_destination</code>

In case of:
<blockquote>postfix/smtpd[638]: warning: SASL authentication failure: cannot connect to saslauthd server: Permission denied</blockquote>
<strong>Hint</strong>: add postfix to sasl group:
<code>$ adduser postfix sasl</code>
