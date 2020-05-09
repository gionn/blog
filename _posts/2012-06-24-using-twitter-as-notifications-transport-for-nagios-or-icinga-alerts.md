---
layout: post
title: !binary |-
  VXNpbmcgVHdpdHRlciBhcyBub3RpZmljYXRpb25zIHRyYW5zcG9ydCBmb3Ig
  TmFnaW9zIG9yIEljaW5nYSBhbGVydHM=
created: 1340524732
comments: true
categories: !binary |-
  ZW5fdXMgdWJ1bnR1
tags:
 - howto
---
Are you wondering how many alternative ways to get notifications from your nagios/icinga exists, other than plain email messages? And what if you actually are monitoring your email or DNS infrastructure and you don't want to use a third-party email account dedicated to our precious notices?

An alternative and effective method to deliver the short status notification is via Twitter messages, using a protected account (for privacy).

<!--more-->

Register a new standard Twitter account and make sure to enable in the settings.

We need to install on the monitoring server a command-line Twitter client, such as Twidge:

``` bash
sudo apt-get install twidge
```

Do the one-time configuration procedure with the user you prefer:

``` bash
twidge setup
```

Move the generated configuration file from your home folder somewhere into the nagios/icinga configuration folder:

```
sudo mv ~/.twidgerc /etc/icinga/twidgerc
```

Now add two new custom commands in the nagios/icinga configuration:

<strong>/etc/icinga/commands.cfg</strong>:
```
define command {
        command_name	notify-host-by-twitter
        command_line	/bin/echo "HOST $HOSTALIAS$ is $HOSTSTATE$" | twidge -c /etc/icinga/twidgerc update
}
define command {
	command_name	notify-service-by-twitter
	command_line	/bin/echo "SERVICE $SERVICEDESC$ on $HOSTALIAS$ is $SERVICESTATE$" | twidge -c /etc/icinga/twidgerc update
}
```

Now you need to use such commands as host and service notifications, like here:
```
define contact {
        contact_name                    root
        alias                           Root
        service_notification_period     24x7
        host_notification_period        24x7
        service_notification_options    w,u,c,r
        host_notification_options       d,r
        service_notification_commands   notify-service-by-twitter
        host_notification_commands      notify-host-by-twitter
}
```

Reload and enjoy!

``` bash
sudo /etc/init.d/icinga reload
```

<img src="http://gionn.net/sites/default/files/space%20new%20robot.png" alt="space new robot" />
