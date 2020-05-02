---
layout: post
title: !binary |-
  VGhlIHBlcmZlY3Qgd29ya2luZyBlbnZpcm9ubWVudCB3aXRoIE9wZW5Tb3Vy
  Y2UgU29mdHdhcmUgb24gYSBNYWNib29r
created: 1253198637
comments: true
categories: !binary |-
  ZW5fdXM=
---
I am writing this article for sharing my actual setup on my recently bought MacBook Pro Unibody.

After some week, I managed how to make a third-boot system with rEFIt, having MacOS, Windows (I like enjoying some videogame, the last was Fallout 3), and Debian GNU/Linux.
I wasn't very satisfied with this choice, because i wasted a lot of my 300 GB hd, and the hardware support in Linux wasn't has in MacOS:
- Soundcard not supported by alsa bug: #4432
- The nvidia proprietary driver fails to detect the integrated 9400 chip, so I was forced to use the 9600GT, which is a waste of battery lifetime when I am not gaming
- The only good way to share documents between OS is thru a HFS+ paritition with <strong>journaling disabled</strong>.

So I preferred to try out MacOS as my first operating system for dealing out with browsing, mailing, chatting and listening to music.
For the working aspect, I can't find something good and flexible like a Debian GNU/Linux system: so I installed VirtualBox and installed linux on it.

Now I split my experience in two separated articles:
<ul>
	<li>OpenSource Software for my Mac</li>
	<li>My network hints for setting up VirtualBox on Mac Host with Linux Guests</li>
</ul>
