---
layout: post
title: How to fix Xbox 360 wireless receiver not working on Windows 10
---

Since the recent Windows 10 builds, when trying to install the **Xbox 360
Wireless Receiver for Windows** with a non-original Microsoft device (on Amazon
there are plenty of chinese clones of them at half the price), we end-up with an
**Unknown Device** entry on Device Manager and a detailed message like this:

> Device USB\VID_045E&PID_0291\5&15c311e1&0&1 was not migrated due to partial or
> ambiguous match.

A workaround has been found by the AZnativefire Reddit user and posted to a
[thread](https://www.reddit.com/r/Windows10/comments/djxhxq/current_windows_10_builds_break_xbox_360/fbj22cs/).

I've repackaged the driver folder after the PID renaming to 0291: [download here](/files/xbox360_receiver_pid_0291.zip).

Before installing, you need to [Disable Driver Signature Verification](https://www.howtogeek.com/167723/how-to-disable-driver-signature-verification-on-64-bit-windows-8.1-so-that-you-can-install-unsigned-drivers/).

After reboot, unpack the zip, right click on the **xusb21.inf** file and select
**Install** and enojoy your receiver working again.
