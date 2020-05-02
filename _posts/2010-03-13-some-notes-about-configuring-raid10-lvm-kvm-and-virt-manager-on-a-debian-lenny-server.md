---
layout: post
title: !binary |-
  U29tZSBub3RlcyBhYm91dCBjb25maWd1cmluZyBSQUlEMTAsIExWTSwgS1ZN
  IGFuZCB2aXJ0IG1hbmFnZXIgb24gYSBEZWJpYW4gTGVubnkgc2VydmVy
created: 1268493411
comments: true
categories: !binary |-
  ZGViaWFuIGVuX3VzIHNvZnR3YXJl
---
Recently I've achieved a good setup for a virtualized environment, using Debian Lenny as host, with a RAID10, and LVM for managing VM disk images.

The server was a:
CPU Intel Xeon X3430
RAM 4GB
HD 4x500GB

During the installation, on each of the 4 disks, I created:
- a small /boot partition (~300Mb)
- 10 Gb RAID1 for /
- 1 Gb RAID10 for swap
- remaining space as RAID10, with a big LVM volume on top of it.

Please note: at the end of the installation, you should manually install grub on every disk, because if the first disk get destroyed, you cannot boot your system.
<pre lang="bash">mkdir /boot2 /boot3 /boot4
mount /dev/sdb1 /boot2
mount /dev/sdc1 /boot3
mount /dev/sdd1 /boot4
rsync -av /boot/ /boot2/
rsync -av /boot/ /boot3/
rsync -av /boot/ /boot4/
umount /boot2/ /boot3/ /boot4/
dd if=/dev/sda of=/dev/sdb count=1 bs=512
dd if=/dev/sda of=/dev/sdc count=1 bs=512
dd if=/dev/sda of=/dev/sdd count=1 bs=512</pre>

At this point, installing kvm plus virt-manager is straightway:
<pre lang="bash">aptitude install kvm libvirt-bin virt-manager</pre>
Remember that Lenny is getting pretty old, so for getting more from your server, you should use the backports.org packages.

Now add your user to the libvirt and kvm system groups (/etc/groups):
<pre lang="bash">[..]
kvm:x:112:bob
libvirt:x:115:bob
[..]</pre>

At this point, you should connect to virt-manager GUI. As far as I understood, virt-manager support connections from remote hosts, but the TLS configuration is not so well documented, so you can simply do X11 forwarding or install a VNC server, or NX server, on the host to get the local virt-manager.

What I usually do on my lan from my laptop is:
<pre lang="bash">
ssh -X -l myuser myserver.local
virt-manager
</pre>
And the virt-manager window will popup.


<strong>LVM Configuration</strong>
Edit->Host Details->Storage
Add your LVM Volume Group defined during the first setup: from this window, you can create virtual disks for your machines.
Using LVM instead of simple disk images give great benefits: less overhead, and the ability to expands images (and filesystems on it) without even rebooting the VM.

<strong>Network Configuration</strong>
You can use both <strong>bridged networks</strong> and <strong>private networks</strong>. Bridged networks are used when a VM should have the same subnet address of the other hosts on the local networks.

<strong>Bridged networks</strong> requires additional configuration on the host to work:
<pre lang="bash">cat /etc/network/interfaces
# The loopback network interface
auto lo
iface lo inet loopback

# The primary network interface
#auto eth0
#allow-hotplug eth0
#iface eth0 inet static
#        address 192.168.0.4
#         netmask 255.255.255.0
#         gateway 192.168.0.1

auto br0
allow-hotplug br0
iface br0 inet static
         address 192.168.0.4
         netmask 255.255.255.0
         gateway 192.168.0.1
         bridge_ports eth0
         bridge_stp off
         bridge_maxwait 15
</pre>

<strong>Private networks</strong> should be use to isolate the virtual machine from the physical networks. You can create a DMZ using strict iptables rules for allowing clients to reach VM inside a private network. You can take a look on the iptables scripts I am using on the host, that use both bridged and private networks.
<pre lang="bash">cat firewall.sh
#! /bin/bash
# By Giovanni Toraldo

LAN='br0'
VLAN='virbr0'
SUBNET='192.168.0.0/24'
VSUBNET='192.168.122.0/24'

## FLUSH
iptables -F
iptables -X
iptables -t nat -F
iptables -t nat -X

## Default Policy
iptables -P INPUT DROP
iptables -P OUTPUT ACCEPT
iptables -P FORWARD DROP

# Basic Routing/Forwarding
echo 1 > /proc/sys/net/ipv4/ip_forward
iptables -A INPUT -m state --state ESTABLISHED,RELATED -j ACCEPT
iptables -A INPUT -i lo -j ACCEPT
iptables -A FORWARD -i lo -j ACCEPT

## Local Inbound Services
iptables -A INPUT -p tcp --dport 22 -j ACCEPT # ssh
iptables -A INPUT -p tcp --dport 25 -j ACCEPT # mail
iptables -A INPUT -p udp --dport 123 -j ACCEPT # ntp
iptables -A INPUT -p tcp --dport 80 -s $SUBNET -j ACCEPT # nginx

# VLAN - I accept and route all traffic
iptables -A INPUT -i $VLAN -j ACCEPT
iptables -A INPUT -i $LAN -j ACCEPT
iptables -A FORWARD -i $VLAN -j ACCEPT
iptables -A FORWARD -i $LAN -o $VLAN -j ACCEPT
# Masquerading packets from private networks only!!
iptables -t nat -A POSTROUTING -s $VSUBNET -o $LAN -j MASQUERADE
</pre>
