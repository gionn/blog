---
layout: post
title: !binary |-
  enJhbSBvbiBEZWJpYW4vVWJ1bnR1IGZvciBtZW1vcnkgb3ZlcmNvbW1pdG1l
  bnQ=
created: 1331498473
comments: true
categories: !binary |-
  ZGViaWFuIGVuX3VzIHVidW50dQ==
tags:
 - howto
---
In recent Linux releases, it's available a tiny module called <strong>zram</strong>, that permits us to create RAM based block devices (named /dev/zramX), which will be kept in memory as compressed data. These ram-based block devices allow very fast I/O, and compression provides a reasonable amounts of memory saving.

We can use it as a drop-in replacement for the well-known *tmpfs* (used for speeding up compilation tasks or for /tmp), or better as a primary swap device, that will lead to virtually <strong>increase memory capacity</strong>, at the expense of a <strong>slightly increased CPU usage</strong> to compress/decompress the swapped data.

Nowadays RAM is very cheap, so <strong>why bother with compression?</strong> Because there are some situations where you can't upgrade memory (netbooks) or you want to over-commit real resources (virtualization hosts).

### For Ubuntu Precise and later:

Starting with Ubuntu Precise, there is an official upstart script for Ubuntu by Adam Conrad to configure zram in the main repository:
```
sudo apt-get install zram-config
```

### For other distributions or older Ubuntu:

Googlin' around to find a nice way to configure zram devices as swap, I found a very nice upstart script that will create a bunch of ramz devices depending on the number of CPU cores available, with a total size of the available memory:
https://raw.github.com/gionn/etc/master/init.d/zram

Copy the script to the init.d folder, mark it as executable and enable autostart on boot:
```
sudo wget https://raw.github.com/gionn/etc/master/init.d/zram -O /etc/init.d/zram
sudo chmod +x /etc/init.d/zram
sudo update-rc.d zram defaults
```

Try it manually executing it for the first time with:
```
/etc/init.d/zram start
```

Depending on the kernel version you are running, you may need to adjust the module parameter name to num_devices on line 26 to:
```
modprobe zram num_devices=$num_cpus
```
or keep as is for newer kernels:
```
modprobe zram zram_num_devices=$num_cpus
```

### Checking if it's working

If everything went smooth, you will find a few notices on ```dmesg```:
```
zram: module is from the staging directory, the quality is unknown, you have been warned.
zram: Creating 4 devices ...
Adding 1497864k swap on /dev/zram0.  Priority:100 extents:1 across:1497864k SS
Adding 1497864k swap on /dev/zram1.  Priority:100 extents:1 across:1497864k SS
Adding 1497864k swap on /dev/zram2.  Priority:100 extents:1 across:1497864k SS
Adding 1497864k swap on /dev/zram3.  Priority:100 extents:1 across:1497864k SS
```
meaning that the zram device have been created and enabled as swap devices with highest priority.

You can discover the increased swap space available with ```free -m```:
```
             total       used       free     shared    buffers     cached
Mem:          5851       5696        154          0         85       4310
-/+ buffers/cache:       1300       4550
Swap:         5851          0       5850
```

Happy zramming!

Read [Reddit comments](http://www.reddit.com/r/sysadmin/comments/15kmby/using_compressed_ram_for_memoryovercommit_on_linux/)
