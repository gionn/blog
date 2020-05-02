---
layout: post
title: !binary |-
  UmVjb3ZlciBMaW51eCBYYW5kcm9zIG9uIEVlZS1Cb3gsIHdpdGhvdXQgQ0RS
  T00sIHdpdGhvdXQgVVNCICh0aGUgbWFudWFsIHdheSk=
created: 1245180232
comments: true
categories: !binary |-
  ZW5fdXMgaGFyZHdhcmU=
---
I don't have an external USB CD-ROM drive, nor a live Xandros installation to build an usb recovery image.

The prerequisites are:
- the file named system_image.gz that is on the Recovery CD.
- a live linux system (<a href="http://www.knoppix.net/">knoppix</a>? SysRescueCD? I've used my debian on nfs.)
- basic knowledge of a partition tool editor (like cfdisk).

system_image.gz is the compressed image of the root system. Copy it on a usb pen, samba share, public_html, where you want!
Start the eee-box with the live system of your choice, and unpack the compressed root on the internal drive of EEE-Box with:

<code>zcat system_image.gz > /dev/sdb</code>
(nb: my debian recognized the harddisk as sdb, on other live system can be sda, check the dmesg for being sure)

Now we need to add a second ext3 partition that will be used as /home directory with cfdisk: remember to create it as Primary Partition, so it will be called sdb2.
After, create a swap partition in a Extended Partition, so it will be named sdb5.

Format the newly crated partition with:
<code>mkfs.ext3 /dev/sdb2
mkswap /dev/sdb5</code>

Reboot, and you are ready to use a brand new Asus Xandros.
