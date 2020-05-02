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

Se avete ancora il firmware originale, dovrebbero ancora valere i passi descritti nel precedente post su <a href="/?p=539">CyanogenMod 4.x</a> per poter installare una recovery image custom (fino a Installazione Android escluso, ovviamente).

Ho seguito la guida presente sul wiki di CM: <a href="http://wiki.cyanogenmod.com/index.php/DangerSPL_and_CM_5_for_Dream">DangerSPL and CM 5 for Dream</a>.

Requisiti:
* HTC Dream/G1 con immagine di recovery custom (Home+Power in fase di boot)
* Radio Compatibile (versione 2.22.19.26I, vedi con Camera+Power in fase di boot)
<!--break-->
<strong>Files richiesti</strong>:
* <a href="http://sapphire-port-dream.googlecode.com/files/spl-signed.zip">Danger Spl</a>
* <a href="http://kanged.net/mirror/download.php?file=gapps-ds-ERE36B-signed.zip">gapps-ds-ERE36B-signed.zip (Google Apps)</a>
* <a href="http://wiki.cyanogenmod.com/index.php/Latest_version#Current_Stable_Version_2">Android-CM5 for Dream/G1</a>

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
