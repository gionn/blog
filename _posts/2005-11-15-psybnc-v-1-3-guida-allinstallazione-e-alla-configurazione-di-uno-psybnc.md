---
layout: post
tags:
  - italiano
title: !binary |-
  UHN5Qk5DIHYuMS4zIC0gR3VpZGEgYWxsJ2luc3RhbGxhemlvbmUgZSBhbGxh
  IGNvbmZpZ3VyYXppb25lIGRpIHVubyBwc3libmM=
created: 1132072066
comments: true
categories: !binary |-
  bnVsbA==
---
Innanzi tutto qualsiasi commento costruttivo o distruttivo è ben accetto, utilizzate il form a fondo pagina.

<strong>X) PsyBNC?! Chi era costui?</strong>

Lo [tag]psybnc[/tag] è una versione avanzata di un bnc, ovvero di un [tag]bouncer[/tag] per [tag]irc[/tag]. Quest'ultimo viene utilizzato per nascondere l'ip dell'utente, ma ha funzioni molto limitate. Lo psybnc invece rimane permanentemente collegato al server irc registrando i messaggi che vi vengono lasciati in query da altri utenti, vi permetterà  di mantenere gli stati guadagnati sui canali prima della vostro uscita, la possibilità  di avere un host personalizzato (quello dopo la @) e molto altro.

<!--break-->
<strong>1) Cominciamo...</strong>

Allora innanzi tutto ci serve l'accesso ad una shell che sia 24h su 24h collegata ad internet, altrimenti lo psy servirà  a poco o niente. Per collegarsi alla shell è necessario un client [tag]ssh[/tag]: per windows c'è poca scelta, o si usa [tag]Putty[/tag] o niente! :D Una volta collegati alla shell e inseriti i dati correttamente apparirà  il prompt della [tag]shell[/tag].

<strong>2) Installazione</strong>

Provvediamo a scaricare il package per installare lo psy con il comando:
wget http://www.psybnc.at/download/beta/psyBNC-2.3.2-7.tar.gz

Una volta pronti scompattiamo il file tramite il comando:
tar -xvzf psyBNC-2.3.2-7.tar.gz

Spostiamoci sotto la directory dello psy:
cd psybnc

Ora abbiamo due possibilità : o editiamo velocemente il file di configurazione oppure utilizziamo l'interfaccia grafica di menuconfig. Qui di seguito descriverò i valori di base da cambiare manualmente nel file di configurazione; se invece si preferisce avere un controllo più completo della configurazione, consiglio di utilizzare l'interfaccia grafica digitando:
make menuconfig

Ricordatevi che in entrambi i casi prima di poter avvia lo psy sarà  necessario compilarlo con il comando:
make

<strong>2a) Modifica psybnc.conf</strong>
Allora apriamo il file di configurazione con un editor di testo:
nano -w psybnc.conf

Quella che vederete è la configurazione di default, voi avrete necessità  di modificare a proprio piacimento le seguenti righe:

PSYBNC.SYSTEM.PORT1=65535
Il numero della porta va modificato con quello che vi è stato assegnato dall'amministratore o in caso contrario con uno che più vi aggrada.

PSYBNC.SYSTEM.HOST1=shell.simosnap.com
Questo dice allo psy su quale interfaccia di rete aprire la porta. Inserendo il dominio del server, lo psy sarà  raggiungibile da internet.

Premiamo Ctrl+X contemporaneamente per uscire dall'editor e, alla richiesta, salviamo il file modificato.

Adesso che il file di configurazione è pronto, compiliamo il programma con il comando:
make

Durante la procedura verrà  richiesto di inserire i dati identificativi per i certificati di sicurezza per connessioni ssl; questi sono di scarsa rilevanza, quindi lasciate quelli che propone oppure mettete come meglio credete.

<strong>2b) Menuconfig</strong>
Con menuconfig la configurazione sarà  più semplice. Avviamolo con:
make menuconfig

Apparirà  una semplice interfaccia di testo dove si potrà  prima configurare la compilazione dello psy e alcuno opzioni avanzate come il numero di utenti e connessioni massime permesse. Nella seconda parte invece verranno mostrate le scelte di configurazione della parte tecnica dello psy ed inoltre degli utenti e i loro relativi settaggi. La cosa importante da fare qui è impostare la porta che ci è stata assegnata dall'amministratore, o in caso contrario una a nostro piacimento, e un utente base con cui ci collegheremo allo psy.

Quando ci sentiremo soddisfatti della configurazione, possiamo uscire da menuconfig selezionando l'apposita voce nel menù principale.

Una volta usciti e tornati al prompt della shell digiteremo:
make

e cosà¬ verrà  compilato l'eseguibile.

Durante la procedura verrà  richiesto di inserire i dati identificativi per i certificati di sicurezza per connessioni ssl; questi sono di scarsa rilevanza, quindi lasciate quelli che propone oppure mettete come meglio credete.

<strong>3) Primo Avvio</strong>

Una volta terminata la compilazione avviamo lo psy con:
./psybnc

Se tutto è andato bene apparirà  una schermata del tipo:
<pre><code>[user@shell psybnc]$ ./psybnc
.-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-.
,----.,----.,-. ,-.,---.,--. ,-.,----.
| O || ,-'  / / | o || | || ,--'
| _/ _   / | o&lt; | | || |__
|_| |____/ |__| |___||_| _| ___|
Version 2.3.2-4 (c) 1999-2002
the most psychoid
and the cool lam3rz Group IRCnet

`-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=tCl=-'
Configuration File: psybnc.conf
Language File: psyBNC Language File - English
No logfile specified, logging to log/psybnc.log
Listening on: shell.simosnap.com port 666
psyBNC2.3.2-4-cBtITLdDMSNpE started (PID 3644)
[user@shell psybnc]$</code></pre>
Adesso potrete collegarvi tranquillamente allo psy e identificarvi tramite il comando:
/quote pass password

Se non avete creato nei passi precedenti un utente con diritti di amministratore dello psy, dopo aver mandato il messaggio di identificazione, verrà  creato in automatico un nuovo utente con username uguale al vostro attuale ident settato nel vostro client e con password uguale a quella che voi gli avete appena passato.

-- NB --
E' da ricordare che alla nostra password è associato un nome utente che corrisponde all'ident del client. Se questo dovesse esser inavvertitamente modificato (o magari cambiamo client con cui ci colleghiamo), quando proveremo a collegarci e ad inserire la password, la connessione verrà  respinta per password errata, anche se in realtà  non lo è! Occorre quindi settare l'ident corretto nel client prima di collegarsi
-- NB --

<strong>4) Configurazione</strong>

La prima cosa da fare ora che siamo entrati è dire a quale server vogliamo lo psybnc si agganci tramite il comando:
/addserver host.del.tuo.irc.server.org :6667

Fatto ciò il bnc dovrebbe cercare di collegarsi automaticamente.

Ci sono molti altri comandi per personalizzare il proprio psy, consiglio quindi di dargli un'occhiata attraverso il comando:
/bhelp

Questi sono quelli più utili:

/setleavemsg ciao a tutti!
Con questo comando, quando chiuderete il client irc, il bnc automaticamente dirà  quella frase in automatico attraverso una action.
Es.:
[23:01] * pincopall ciao a tutti!

/setawaynick pincopall\dorme
Con questo comando, quando chiuderete il client irc, il bnc cambierà  in automatico il vostro nick in quello specificato cosà¬ che gli altri utenti possano sapere che non sei collegati
Riporto un esempio:
[23:01] * pincopall is now known as pincopall\dorme

/setlang italiano
Questo scommetto che chi non sa l'inglese lo farà  subito :P

Per il resto dei comandi rimandiamo all'help in linea dello psy e ricordiamo che è anche possibile far in modo che lo psy oppi automaticamente un determinato nick su un canale anche quando siamo assenti o che esegua bankick su determinate masks, anche quando non siete connessi ad esso.

<strong>5) Manutenzione straordinaria</strong>

Può capitare che non riusciate a collegarvi con il vostro bouncer e i motivi potrebbero essere differenti. Qui di seguito elencherò i problemi più comuni con le possibili soluzioni:

<strong>-1</strong> <em>Non riesco a collegarmi allo psy, il client mi dice Connection Refused.</em>

In questo caso potrebbero esserci problemi di connessione col server, o un problema di configurazione (del tipo vi state collegando ad una porta sbagliata dello psybnc) oppure semplicemente il processo dello psybnc non è attivo (./psybnc per avviarlo).

<strong>-2</strong> <em>Riesco a collegarmi allo psy, ma questo sembra esser impallato...</em>
In questo caso la cosa più veloce da fare è collegarsi alla shell con Putty e restartare il processo dello psy. Per far questo dobbiamo prima killare il processo attivo con il comando:
killall -9 psybnc
Ignoriamo i vari messaggi che potrebbero apparire e facciamo ripartire lo psy con:
./psybnc

<strong>-3</strong> <em>Quando provo ad avviare lo psy mi dice "Cannot Create Listening Port... Aborting".</em>
Praticamente in questo caso lo psy non riesce a mettersi in comunicazione con l'esterno tramite la porta settata e le possibilità  sono diverse: quella che avete settato non è la porta corretta (magari è già  in uso da qualche altro utente), lo psybnc è attivo (la porta è utilizzata da se stesso, e quindi è necessario prima killare il processo con killall -9 psybnc) oppure infine non abbiamo specificato l'interfaccia di rete durante la configurazione (vedi PSYBNC.SYSTEM.HOST1).

<strong>-4</strong> <em>Riesco a collegarmi correttamente allo psy ma non riesco a collegarmi ad un server irc.</em>
Qui le possibili cause sono moltissime: potrebbero esserci problemi di routing (sia ipv4 che ipv6 con il tunnel broker utilizzato dallo shell provider, noi non possiamo farci niente, contattiamo l'admin), l'accesso a quel determinato server potrebbe esser interdetto per vari motivi dall'amministratore o il server non esiste (magari abbiamo digitato male l'indirizzo o non è momentaneamente raggiungibile). In ogni caso è consigliato riprovare in un secondo momento. In particolare con le [tag]freeshell[/tag] di [tag]SimosNap[/tag], è consentito l'accesso esclusivo a tutti i server ipv6 e per quanto riguarda i server in ipv4 è necessario contattare l'amministratore.
