---
layout: post
title: !binary |-
  Y2Fubm90IGNyZWF0ZSB6ZnMgdm9sdW1lOiBvbmUgb2YgdGhlIGRldmljZXMg
  aXMgcGFydCBvZiBhbiBhY3RpdmUgbWQgb3IgbHZtIGRldmljZQ==
created: 1335101520
comments: true
categories: !binary |-
  ZW5fdXMgdWJ1bnR1

tags:
 - howto
---
During the migration of a RAID1 mdadm on Ubuntu server to a ZFS mirror, I got stuck at the initial zfs volume creation with the following error:

<blockquote>cannot create 'tank': one or more vdevs refer to the same device, or one of the devices is part of an active md or lvm device</blockquote>

Obviously I've removed the device from the old mdadm array with:

``` bash
sudo mdadm /dev/md3 --set-faulty /dev/sdb3
sudo mdadm /dev/md3 --remove /dev/sdb3
```

However, the zpool utility doesn't actually look if the device is currently used or not, but simply look at the metadata at the beginning of the disk that is still there.

To wipe the mdadm metadata you need to use:
``` bash
sudo mdadm --zero-superblock /dev/sdb3
```

But the good old dd will do the job too:
``` bash
sudo dd if=/dev/zero of=/dev/sdb3 count=64 bs=1024
```
