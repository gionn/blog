---
layout: post
title: !binary |-
  QWdnaW9ybmFyZSBmaXJtd2FyZSBBbmRyb2lkIHN1IEhUQyBEcmVhbSBHMSBU
  aW0gdGVzdGF0byBhIEFuZHJvaWQgMS42IEN5YW5vZ2VuTW9k
created: 1258809683
comments: true
categories: !binary |-
  aGFyZHdhcmUgaXRfaXQ=
---
<strong>UPDATE</strong>: ho pubblicato un aggiornamento per Android 2.1 + CyanogenMod 5.x

Questo lunedì mi è arrivato l'<strong>HTC Dream</strong> marchiato Tim che in questi giorni si trova scontato al Mediaworld (289 euro, di listino sta a 349).
Purtroppo, come spesso capita con gli smartphone che montano un software modificato dagli operatori, la versione è vecchia, non più mantenuta e spesso priva di alcune applicazioni "strategiche" (google talk, chat, sincronizzazione contatti gmail).

Con Tim inoltre, non è possibile accedere nativamente come utente root e poter riflashare liberamente il proprio Android.
Quindi, prima di poter aggiornare il software, è necessario sfruttare una qualche falla per potere accedere come utente privilegiato.

Girovagando per la rete, ho scoperto una <a href="http://www.androidiani.com">comunità  italiana Android</a> in cui, oltre ad un blog, mettono a disposizione un <a href="http://www.androidiani.com/wiki/">wiki</a> con diverse istruzioni sul come aggiornare il proprio droid, incluso il mio.
Peccato che le immagini Android che mettono a disposizione sian piuttosto obsolete e anche le istruzioni mi son sembrate, con il senno di poi, più complesse del dovuto.

Cercherò qui di ricostruire i passi da effettuare per poter mettere una versione di Android decentemente aggiornata e funzionale.
<!--break-->
<strong>Hardware</strong>:
<ul>
	<li>HTC Dream Tim</li>
	<li>Cavetto USB (in dotazione)</li>
</ul>
<strong>Software</strong>:
<ul>
	<li><a href="http://developer.android.com/sdk/index.html">Android SDK</a></li>
	<li>Utility <a href="http://developer.htc.com/adp.html#s2">Fastboot</a></li>
</ul>


Le SDK contengono software e documentazione necessaria a chi vuol sviluppare sia Android che applicazioni per Android. Fastboot è una utility per bypassare il caricamento dell'immagine di presente sulla memoria e passarne una "volante" tramite USB (puoi scompattarlo all'interno della cartella tools dell'SDK)

<h3>Riepilogo</h3>
<ol>
	<li><a href="#step1">Abilita USB Debugging</a></li>
	<li><a href="#step2">Fastboot</a></li>
	<li><a href="#step3">Installazione rom di recovery</a></li>
	<li><a href="#step4">Installazione Android</a></li>
</ol>


<h2><a name="step1">Abilita USB Debugging</a></h2>
Menu -> Impostazioni -> Applicazioni -> Sviluppo -> Debug USB
<code>$ ./tools/adb devices
List of devices attached 
HT935NG08417    device</code>
Se il vostro device viene riportato, siete pronti per poter utilizzare Fastboot


<h2><a name="step2">Fastboot</a></h2>
<code>$ wget http://blog.scorpionworld.it/wp-content/uploads/2009/11/boot.zip
$ unzip boot.zip</code>
Accendi il telefono utilizzando il tasto <strong>Power + Camera</strong>
<code>$ ./tools/fastboot boot boot.img</code>
Attendi il caricamento di Android...
<code>$ ./adb shell</code>
Adesso sei collegato al tuo Android con privilegi di root:
<code># id
uid=0(root) gid=0(root)</code>

Passiamo il filesystem /system da sola lettura a lettura/scrittura, e creiamo una copia della shell però con il flag setuid attivo (che ci permetterà  di avere una shell root senza esser root)
<code># mount -o remount,rw -t yaffs2 /dev/block/mtdblock3 /system
# cat /system/bin/sh > /system/bin/su
# chmod 4755 /system/bin/su
# exit </code>

Adesso siamo pronti per poter flashare il nostro device con un versione di Android custom.
Così a naso, sembra che il miglior Android mantenuto dalla comunità è CyanogenMod, e anche qui c'è un nutrito wiki con la procedura per installarlo (<a href="http://wiki.cyanogenmod.com/index.php/Upgrading_From_Older_CyanogenMod_or_other_rooted_ROMs">upgrade da firmware con root</a>).


<h2><a name="step3">Installazione rom di recovery</a></h2>
<del datetime="2010-09-04T10:06:00+00:00">Scarica la più recente versione della <a href="http://www.cyanogenmod.com/downloads/recovery-image">Recovery Image CyanogenMod</a> (sostituisce il sistema minimale di recovery, sarà  utilizzato per poter installare facilmente Android+CyanogenMod)</del>
Scarica la più recente versione della ra-recovery da <a href="http://forum.xda-developers.com/showpost.php?p=4647751&postcount=1">XDA</a>. 

Scompatta e copia la prima immagine direttamente nella cartella principale della tua memoria SD (con il telefono collegato al pc, seleziona l'avviso che esce fra le notifiche in alto del device e fai Connetti) e riapri una shell:
<code>$ ./tools/adb shell
# su
# flash_image recovery /sdcard/cm-recovery-1.4.img
# exit</code>


<h2><a name="step4">Installazione Android</a></h2>

<strong>Procedi seguendo il post linkato all'inizio di questo articolo.</strong>

<del datetime="2010-01-10T10:51:27+00:00">Scarica l'ultimo firmware marcato <strong>"recovery image"</strong> <a href="http://developer.htc.com/adp.html#s3">qui</a>
Scarica l'ultima immagine ufficiale di Android 1.6 denominata <a href='http://blog.scorpionworld.it/wp-content/uploads/2009/11/signed-dream_devphone_userdebug-ota-14721.zip'>recovery image</a>.


Adesso copia i due files zip nella cartella principale della tua memoria SD (non li scompattare!)

Procediamo con la reinstallazione del sistema: completa entrambi i passi, <strong>non riavviare</strong>.

Puoi accedere al sistema di recovery appena installato accendendo il telefono tramite <strong>Home + Power</strong>.
Seleziona 'Apply any zip from SD' e poi signed-dream_devphone_userdebug-ota-14721.zip (Android 1.6)
Seleziona nuovamente 'Apply any zip from SD' e poi update-cm-4.2.5-signed.zip (CyanogenMod)
Premi <strong>Home + Back</strong> per riavviare.


Al successivo riavvio, se tutto è andato come previsto, vedrete apparire il logo in blu che identifica la CyanogenMod.</del>

A questo punto in cui sarete colti da immensa felicità , ricordatevi di installare anche l'applicazione <a href="http://code.google.com/p/cyanogen-updater/">Cyanogen Updater</a> che trovate nel Market, così che con due click potrete facilmente <strong>aggiornare</strong> all'ultima versione di CyanogenMod (prevalentemente bugfix ma spesso arrivano anche nuove features) senza nemmeno dover usare il proprio pc.

Unica nota di demerito: la tastiera pare esser con <strong>layout americano</strong>, nessun problema per le lettere, solo i tasti secondari sono messi fuori posto. Non ho ancora voluto indagare perchè alla fine si fa prima ad imparare il nuovo layout (:P), ma se qualcuno ha la soluzione sarei più che felice di integrarla in questa guida.
