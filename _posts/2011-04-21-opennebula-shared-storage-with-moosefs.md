---
layout: post
title: !binary |-
  T3Blbk5lYnVsYSBzaGFyZWQgc3RvcmFnZSB3aXRoIE1vb3NlRlM=
created: 1303407723
comments: true
categories: !binary |-
  ZW5fdXMgc29mdHdhcmU=
---
I've written a post for the OpenNebula official blog about the [usage of MooseFS as shared storage](https://opennebula.io/opennebula-shared-storage-with-moosefs/):

When running many VMs with persistent images, there is the need to have a shared
storage behind OpenNebula hosts, with the purpose of faster recovery in case of
host failure. However, SAN are expensive, and an NFS server or NAS can’t provide
either performance or fault-tolerance.

A distributed fault-tolerant network filesystem takes easily place in this gap.
This alternative provides shared storage without the need of a dedicated storage
hardware and fault-tolerance capabilities by replicating your data across
different nodes.

I am working at LiberSoft, and we evaluated the usage of two different
opensource distributed filesystem, MooseFS and GlusterFS. A third choice could
be Ceph, which is currently under heavy development and probably not so
production-ready, but it certainly would be a good alternative in the near
future.

Our choice fell on MooseFS because of its great expandability (you can add how
many disks you want, any size you prefer) and its web monitor where you can
easily check the status of your shared storage (replication status or disk
errors). So we published on the Ecosystem section a new transfer manager and
some basic instructions to get it working together with OpenNebula.

We had promising results during the testing deployment of 4 nodes (Gateway with
2x Xeon X3450, 12GB ram, 2x2TB SATA2 disks) for a private cloud at National
Central Library of Florence (Italy), that will grow hence most Windows and Linux
servers will get on the cloud in the next few months.

The requirements on this project were to use ordinary and affordable hardware
and open-source software to avoid any possible vendor lock-in, with the purpose
to lower energy consumption and hardware maintenance costs.
