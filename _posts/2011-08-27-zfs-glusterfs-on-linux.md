---
layout: post
title: !binary |-
  WkZTICsgR2x1c3RlckZTIG9uIExpbnV4
created: 1314438242
comments: true
categories: !binary |-
  c29mdHdhcmU=
---
Time is almost ripe for start using the native ZFS port on Linux (http://zfsonlinux.org/), and to increase the performances, reliability and space usage of our affordable distributed opensource storage solution.

Installing ZFS on Debian/Ubuntu is straightforward: you need first to build the SPL (Solaris Porting Layer) and after ZFS itself.

Download the latest <a href="https://github.com/zfsonlinux/spl/downloads">SPL package</a>, unpack it and build:

``` bash
sudo apt-get install build-essential gawk alien fakeroot linux-headers-$(uname -r)
./configure
make deb
dpkg -i *.deb
```

Download the latest <a href="https://github.com/zfsonlinux/zfs/downloads">ZFS package</a>, unpack it and build:

``` bash
sudo apt-get install zlib1g-dev uuid-dev libblkid-dev libselinux-dev parted lsscsi
./configure
make deb
dpkg -i *.deb
```

ZFS is now ready to be used.

Let's create our first pool with:

``` bash
zpool create tank raidz [devices]
```

Devices can be partitions, UUIDs or entire disk. Is often a *very* good practice to use an entire disk using the disks id as found on /dev/disk/by-id/* (it should be advisable to not mix up existing drives with one of an existing volume).

``` bash
sudo zpool status tank
df -h
```

Check pool status. :)

Now, the interesting features:

``` bash
zfs set compression=on tank
zfs set dedup=on tank
```

Et voilà, your space usage is highly optimized compressing and deduplicating data.

Now it's the GlusterFS turn, download the latest version and install it:

``` bash
dpkg -i glusterfs_3.2.2-1_amd64.deb 
update-rc.d glusterd defaults
/etc/init.d/glusterd start
```

Only on one node do the peer probing for every peer:

``` bash
gluster peer probe ip.add.re.ss
```

Only on one node, create and start the volume:

``` bash
gluster volume create gtank replica 2 transport tcp ip.add.re.ss1:/tank ip.add.re.ss2:/tank
gluster volume start gtank
``` 

On every node, mount it with:

``` bash
mount -t glusterfs localhost:/gtank /gtank
```

Now some live example:

```
root@debz-1:/gtank# df -h
File system           Dim. Usati Disp. Uso% Montato su
[..]
tank                   10G  1,8G  8,2G  18% /tank
localhost:/gtank       10G  1,8G  8,2G  18% /gtank
```

GlusterFS replica 2 on 2 servers, anything unexpected here.

```
root@debz-1:/gtank# ls -lh
totale 1,8G
-rw-r--r-- 1 scorp scorp  253K  1 gen  1980 Fattura Garanzia redcoon dns-323.pdf
-rw-r--r-- 1 scorp scorp   68K  1 gen  1980 fattura scontrino eeepc 900a.pdf
-rw-r--r-- 1 scorp scorp   55K  1 gen  1980 Fattura Scontrino WD HD Caviar Green Videofantasy.pdf
-rw-r--r-- 1 scorp scorp  681M 23 ago 19.29 lubuntu-11.04-desktop-i386.iso
-rw-r--r-- 1 scorp scorp 1021K  1 gen  1980 Scontrino xbox 360.pdf
-rw-r--r-- 1 root  root    98M 27 ago 12.00 test2_random.dat
-rw-r--r-- 1 root  root    98M 27 ago 11.59 test_random_copy.dat
-rw-r--r-- 1 root  root    98M 27 ago 11.55 test_random.dat
-rw-r--r-- 1 root  root   293M 27 ago 12.06 test_random-with-zero-hole.dat
-rw-r--r-- 1 root  root    98M 27 ago 11.53 test_zero.dat
-rw-r--r-- 1 root  root   674M 18 ago 16.43 ubuntu-11.04-server-amd64.iso
```

Here I've copied some PDFs, 2 ISO, and some dd generated file:
test_zero.dat is a dd if=/dev/zero
test_random.dat and test2_random.dat are 2 different iteration with dd if=/dev/urandom
test_random_copy.dat is a cp of test_random.dat
test_random-with-zero-hole.dat is the result of cat test_random.dat + test_random.dat + test2_random.dat

The following are the real disk usage:

```
root@debz-1:/gtank# du -sh *
259K	Fattura Garanzia redcoon dns-323.pdf
69K	fattura scontrino eeepc 900a.pdf
55K	Fattura Scontrino WD HD Caviar Green Videofantasy.pdf
675M	lubuntu-11.04-desktop-i386.iso
1,1M	Scontrino xbox 360.pdf
98M	test2_random.dat
98M	test_random_copy.dat
98M	test_random.dat
196M	test_random-with-zero-hole.dat
512	test_zero.dat
667M	ubuntu-11.04-server-amd64.iso
```

As you can see, compression is doing its work with ISO and test_zero.dat, but isn't effective with PDFs and random data (do you remember that if you zip an already zip file the total size will increase?).

And what about the dedup? You should check it with:
```
root@debz-1:/gtank# zpool list
NAME   SIZE  ALLOC   FREE    CAP  DEDUP  HEALTH  ALTROOT
tank  9,94G  1,60G  8,34G    16%  1.20x  ONLINE  -
```
so there are ~ 200 MB of available deduped space.

Other "batteries included" functions with ZFS are:
<ul>
  <li>Decrease disk I/O bottleneck using fast SSDs as caches with <a href="http://www.solarisinternals.com/wiki/index.php/ZFS_Best_Practices_Guide#Separate_Cache_Devices">L2ARC</a></li>
  <li>Copy-on-write transactions: no need for fsck after hard reboot, data is always consistent on disk.</li>
  <li>Online Repair: ZFS store a checksum for every data block, and can notify data alternation on avery access or during a scheduled online scrub operation</li>
</ul>

Let me know if you have some good usage tips to submit!
