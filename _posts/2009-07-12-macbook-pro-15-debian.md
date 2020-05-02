---
layout: post
title: !binary |-
  TWFjQm9vayBQcm8gMTUnJyBEZWJpYW4=
created: 1247422011
comments: true
categories: !binary |-
  aGFyZHdhcmUgc29mdHdhcmU=
---
Il vecchio Asus F3Jc stava esalando gli ultimi respiri, quindi onde evitare di rimanere senza pc (anche perchè lo usavo a lavoro), ho ben pensato di accattarmi un nuovo portatile.
Lavorando con due mac luser (ndr: <a href="https://twitter.com/malteo">malteo</a> e <a href="https://twitter.com/orontobate">orontobate</a>) con diversi anni in attivo di militanza in territorio Apple, son riusciti a convincermi a prendermene uno.

La scelta è ricaduta su un MacBook Pro da 15 pollici con processore 2.66GHz (che ho preso da Essedi scontato di 200 euro).
<!--break-->
<code>00:00.0 Host bridge: nVidia Corporation MCP79 Host Bridge (rev b1)
00:00.1 RAM memory: nVidia Corporation MCP79 Memory Controller (rev b1)
00:03.0 ISA bridge: nVidia Corporation MCP79 LPC Bridge (rev b3)
00:03.1 RAM memory: nVidia Corporation MCP79 Memory Controller (rev b1)
00:03.2 SMBus: nVidia Corporation MCP79 SMBus (rev b1)
00:03.3 RAM memory: nVidia Corporation MCP79 Memory Controller (rev b1)
00:03.4 RAM memory: nVidia Corporation Device 0a98 (rev b1)
00:03.5 Co-processor: nVidia Corporation MCP79 Co-processor (rev b1)
00:04.0 USB Controller: nVidia Corporation MCP79 OHCI USB 1.1 Controller (rev b1)
00:04.1 USB Controller: nVidia Corporation MCP79 EHCI USB 2.0 Controller (rev b1)
00:06.0 USB Controller: nVidia Corporation MCP79 OHCI USB 1.1 Controller (rev b1)
00:06.1 USB Controller: nVidia Corporation MCP79 EHCI USB 2.0 Controller (rev b1)
00:08.0 Audio device: nVidia Corporation MCP79 High Definition Audio (rev b1)
00:09.0 PCI bridge: nVidia Corporation MCP79 PCI Bridge (rev b1)
00:0a.0 Ethernet controller: nVidia Corporation MCP79 Ethernet (rev b1)
00:0b.0 IDE interface: nVidia Corporation MCP79 SATA Controller (rev b1)
00:0c.0 PCI bridge: nVidia Corporation MCP79 PCI Express Bridge (rev b1)
00:15.0 PCI bridge: nVidia Corporation MCP79 PCI Express Bridge (rev b1)
00:16.0 PCI bridge: nVidia Corporation MCP79 PCI Express Bridge (rev b1)
00:17.0 PCI bridge: nVidia Corporation MCP79 PCI Express Bridge (rev b1)
02:00.0 VGA compatible controller: nVidia Corporation G96 [GeForce 9600M GT] (rev a1)
04:00.0 Network controller: Broadcom Corporation BCM4322 802.11a/b/g/n Wireless LAN Controller (rev 01)
05:00.0 FireWire (IEEE 1394): Agere Systems FW643 PCI Express1394b Controller (PHY/Link) (rev 07)
</code>

Praticamente tutto fatto da nvidia =P

Con una Lenny amd64 il grosso funziona, manca solo il wireless che non è supportato dal modulo bcm43xx opensource ma tocca usare il driver AP WL STA proprietario (aptitude install broadcom-sta-source && module-assistant a-i broadcom-sta && modprobe wl), e l'audio, nonostante venga rilevata correttamente la scheda audio e i controlli paiono esserci tutti, non son riuscito a far funzionare nè gli speaker interni nè il jack delle cuffie.

Per il controllo delle ventole (fornito dal modulo applesmc di Linux) ho trovato uno script carino:
setfan.sh
(l'autore originale non me ne vorrà , ma non ricordo proprio da dove l'ho pescato)

Non dimenticate di installare pommed per la gestione dei tasti funzione (luminosità  e retroilluminazione dei tasti).
