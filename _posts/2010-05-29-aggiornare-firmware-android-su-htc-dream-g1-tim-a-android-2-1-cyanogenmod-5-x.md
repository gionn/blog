---
layout: post
title: !binary |-
  QWdnaW9ybmFyZSBmaXJtd2FyZSBBbmRyb2lkIHN1IEhUQyBEcmVhbSBHMSBU
  aW0gYSBBbmRyb2lkIDIuMSBDeWFub2dlbk1vZCA1Lng=
created: 1275129442
comments: true
categories: !binary |-
  aGFyZHdhcmUgaXRfaXQgc29mdHdhcmU=
---
Sono riuscito ad aggiornare il mio HTC Dream dal firmware CyanogenMod 4.x a 5.x.

Se avete ancora il firmware originale, dovrebbero ancora valere i passi descritti nel precedente post su CyanogenMod 4.x per poter installare una recovery image custom (fino a Installazione Android escluso, ovviamente).

Ho seguito la guida presente sul wiki di CM: DangerSPL and CM 5 for Dream.

Requisiti:
* HTC Dream/G1 con immagine di recovery custom (Home+Power in fase di boot)
* Radio Compatibile (versione 2.22.19.26I, vedi con Camera+Power in fase di boot)
<!--break-->
<strong>Files richiesti</strong>:
* Danger Spl
* gapps-ds-ERE36B-signed.zip (Google Apps)
* Android-CM5 for Dream/G1

Ultima versione testata da me: <strong>CyanogenMod-5.0.8</strong>

<strong>Passi di installazione</strong>:
<ol>
<li>Copia tutti e tre i file zip sulla memoria SD</li>
<li>Riavvia in modalità  Recovery (Home+Power)</li>
<li>Esegui un nandroid backup (Opzionale)</li>
<li>Data/Factory Reset</li>
<li>Apply Update: DangerSPL (spl-signed.zip)</li>
<li>Reboot e rientra in Recovery (Home+Power)</li>
<li>Apply Update: CM5</li>
<li>Apply Update: gapps-ds-ERE36B</li>
<li>Reboot e attendi con pazienza il primo avvio (circa 5 minuti)</li>
</ol>
