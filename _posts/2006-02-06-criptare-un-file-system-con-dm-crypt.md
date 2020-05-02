---
layout: post
title: !binary |-
  Q3JpcHRhcmUgdW4gZmlsZSBzeXN0ZW0gY29uIGRtLWNyeXB0Lg==
created: 1139222631
comments: true
categories: !binary |-
  bnVsbA==
---
Ecco qua una breve guida su come creare una partizione criptata accessibile solamente tramite password. La procedura è abbastanza semplice e intuitiva e può esser facilmente adoperata sia per partizioni su disco fisso, sia per periferiche rimovibili come hd esterni o chiavi usb.

<!--break-->
Procediamo con l'installazione del pacchetto.

<code>~$ sudo apt-get install cryptsetup</code>


Le librerie utilizzate sono componenti modulari del kernel, attualmente presenti nella breezy ubuntu:

<pre><code>~$ /sbin/modinfo /lib/modules/`uname -r`/kernel/crypto/*           |grep description
~$ /sbin/modinfo /lib/modules/`uname -r`/kernel/arch/i386/crypto/* |grep description</code></pre>


I moduli dovrebbero esser caricati in automatico non appena vengono richiesti, ma per sicurezza possiamo dirgli di caricarli all'avvio tramite:

<code>~$ sudo echo aes >> /etc/modules</code>
<code>~$ sudo echo dm_mod   >> /etc/modules</code>
<code>~$ sudo echo dm_crypt >> /etc/modules</code>


A questo punto dovete avere una partizione vuota da sacrificare:

<code>sudo cryptsetup -y create crypt /dev/hda7</code>
Sostituite ovviamente /dev/hda7 con la vostra partizione da criptare. Tenete ben presente che la partizione non deve esser montata altrimenti il comando non andrà  a buon fine.


Adesso inseriamo una riga dentro a /etc/cryptab per collegare la partizione al filtro che gestisce il crypting:
<code>~$ sudo echo "crypt /dev/hda7" >> /etc/crypttab</code>

E anche in /etc/fstab per farla montare in automatico all'avvio (aggiungere noauto se si tratta di unità  amovibile):
<code>~$ sudo echo "/dev/mapper/crypt /crypt reiserfs defaults 0 1" >> /etc/fstab</code>


Adesso non resta che formattare l'unità  criptata:
<code>~$ sudo mkfs.reiserfs /dev/mapper/crypt</code>

E montarla (il mount point deve esistere, <code>sudo mkdir /crypt</code> per crearlo):
<code>~$ sudo mount /crypt</code>


La vostra partizione è ora pronta all'uso. La password vi sarà  richiesta ogni volta all'avvio e se non sarà  corretta vi verrà  restituito un errore in fase di montaggio. Rammentate che perdere la password significa perdere tutti i vostri dati all'interno della partizione.

Questa guida può esser presa come riferimento per creare una partizione criptata per la propria home o per altre cartelle che contengono dati sensibili come /var e /tmp.

E' anche possibili criptare la propria partizione di swap molto facilmente attraverso questi semplici comandi:

<pre><code>~$ sudo swapoff
~$ sudo cryptsetup -d /dev/urandom create cryptoswap /dev/hda3
~$ sudo mkswap /dev/mapper/cryptoswap -L accessisdenied -v1
~$ sudo echo 'cryptoswap /dev/hda3 /dev/urandom swap' >> /etc/crypttab</code></pre>
Adesso non resta che modificare la relativa linea in /etc/fstab:
da qualcosa tipo:
<blockquote>/dev/hda3       none            swap    sw              0       0</blockquote>
in:
<blockquote>/dev/mapper/cryptoswap none     swap    sw              0       0</blockquote>

Nessuna password verrà  richiesta in quanto la chiave sarà  generata in modo random ad ogni avvio (poichè lo swap non è persistente da una sessione all'altra e quindi viene "resettato" ad ogni avvio di sistema).

Per ulteriori informazioni potete far riferimento alla <a href="https://wiki.ubuntu.com/EncryptedFilesystemHowto?action=fullsearch&context=180&value=EncryptedFilesystemHowto&titlesearch=Titoli">guida originale in inglese</a>.
