---
layout: post
title: Come funzionano le app di contact-tracing (Immuni)
author: Andrea Vecchi
image: /images/markus-winkler--D-6Ve_yNWc-unsplash.jpg
---

Proverò a spiegare con un linguaggio non troppo tecnico (mi scusino i colleghi
informatici) il funzionamento dell’app **Immuni**, sperando di dissipare qualche
dubbio e fornendo anche alcune considerazioni personali.

Innanzitutto una premessa: l'app Immuni utilizzerà un approccio
*decentralizzato*, utilizzando il protocollo [DP-3T][1], promosso e supportato
anche da Google e Apple, e consiste in quanto segue: la notifica a un soggetto X
(anonimo) che si è trovato *in prossimità*, per un certo numero di minuti, con
un soggetto Y (anch'esso anonimo) successivamente risultato positivo al
COVID-19, viene calcolata dall’app che gira sul dispositivo del soggetto X e non
da un server centralizzato remoto.

Com'è possibile tutto questo?

* Appena installata sul dispositivo dell'utente, l'app genera una **chiave K**
  univoca e segreta, che resterà sempre e solo conservata nel dispositivo stesso.
* Utilizzando la chiave K di cui sopra, l'app genera delle **chiavi univoche
  giornaliere KD1...KDn** criptate (a partire dal valore di KDi non è possibile
  risalire al valore di K, mentre a partire da K ed essendo noto un certo
  giorno G, il valore generato di KDG sarà sempre lo stesso).
* Ogni giorno, ogni X minuti (presumibilmente, ad esempio, 15 minuti) l’app
  genera delle **chiavi periodiche** (anch'esse criptate con lo stesso
  meccanismo di cui sopra) a partire dalla chiave giornaliera corrente,
  generando quindi:
  * nel giorno 1, a partire dalla chiave KD1, le chiavi periodiche KD1-q1, KD1-qn;
  * nel giorno 2, a partire dalla chiave KD2, le chiavi periodiche KD2-q1, KD2-qn;
  * e così via nei giorni successivi.
* I valori delle chiavi periodiche sono scambiati via Bluetooth tra dispositivi
  che si sono trovati in prossimità tra loro, per un certo numero di minuti. Ne
  consegue che ogni app conosce le chiavi periodiche generate dai dispositivi
  che gli sono stati vicini per un certo periodo di tempo, ma non può, grazie ad
  esse, risalire all'identità (ossia alla chiave originale K, ma nemmeno alle
  chiavi giornaliere KDi) della persona che le che ha generate e nemmeno
  impersonare un altro dispositivo.
* Ogni app conserva quindi un **registro dei contatti anonimi** avvenuti negli
  ultimi 14 (ad esempio) giorni.
* Nel momento in cui una persona viene riconosciuta come infetta (dopo i
  risultati del tampone), un'autorità pubblica accreditata gli fornisce un
  codice ad utilizzo singolo che può essere volontariamente inserito dall'utente
  infetto nell'app. A seguito di questa azione, l'app invierà ad un server
  centralizzato le sue ultime 14 (ad esempio) chiavi giornaliere. Ricordo ancora
  che dalle chiavi giornaliere non si può dedurre l'identità dell’utente, poiché
  sono generate a partire da una chiave K presente sul dispositivo e non
  deducibile a partire dalle chiavi periodiche giornaliere.
* il server centrale notificherà le 14 chiavi giornaliere anonime del soggetto
  infetto a **tutta la base utenti** dell'app immuni, indistintamente.
* ciascuna app di ciascun utente, ricevuta questa lista di chiavi giornaliere
  infette, genera per ciascuna di esse le chiavi periodiche KD1-q1...KD1-qn,
  KD2-q1...KD2-qn e le confronta con quelle che aveva precedentemente
  memorizzato nel suo *registro dei contatti anonimi* degli ultimi 14 (ad
  esempio) giorni. Se trova delle corrispondenze, l'app notifica l’utente con:
  **Attenzione! Sei entrato in contatto per più di X minuti con un soggetto
  positivo al COVID in queste date**.

Ad oggi non sappiamo cosa verrà offerto dalle istituzioni agli utenti che hanno
ricevuto una notifica di un contatto avvenuto con un soggetto positivo.
Auspicabilmente verrà offerta la possibilità di effettuare un tampone, oppure
verrà forse consigliato di mettersi in quarantena preventiva, oppure ancora
semplicemente di porre maggiore attenzione nelle sue prossime interazioni
sociali.

Non è chiaro se l’app fornirà ulteriori funzionalità (si è parlato di un *diario
clinico*) e quindi adesso non vorrei soffermarmi su questo aspetto.

Riassumendo quindi, se l'app (come più volte confermato) seguirà questo protocollo:

* nessun dato personale verrà inviato e conservato su un server centrale
* nessuna informazione sui contatti avvenuti tra le persone (quando e chi) verrà inviata e conservata su un server centrale

Concludo con alcune considerazioni personali.

Se risultassi positivo al COVID-19, riterrei **eticamente corretto** avvisare,
con ogni mezzo a mia disposizione, tutte le persone con cui sono entrato in
contatto negli ultimi 14 giorni, ma purtroppo per molte di esse non avrei modo
di farlo (es: sconosciuti incrociati in una fila al supermercato).

Immuni mi consentirebbe invece di adempiere a questo **dovere morale**,
automaticamente, e senza grandi sforzi.

Avvisando per tempo una persona con cui ho avuto contatti come infetto, posso
**salvare la sua vita** o quella di un suo parente anziano. Avvisando un
possibile nuovo infetto e invitandolo a prendere le dovute precauzioni, posso
evitare che lui ne infetti altre. In questo modo, contribuisco all'abbassamento
della curva dei contagi ed ho maggiori possibilità - io stesso - di uscire prima
dal lock-down.

Affinché l’app abbia un senso è stato calcolato che dovrebbe essere installata
ed utilizzata dal 60% della popolazione. Se ciò avvenisse, avremmo un'arma in
più (certamente non l’unica e/o la più importante) per uscire prima fuori da
questa situazione.

> Articolo originale pubblicato su [Linkedin][2] e [Facebook][3]

### Aggiornamento all'articolo originale

Dopo la pubblicazione sui social, un contatto ha posto la seguente domanda:

> Visto che il bluetooth ha una **portata** di 10 mt circa, come posso essere
sicuro di non essere notificato come soggetto **forse contagiato** da qualcuno
che in realtà era molto lontano da me?

E' vero che il BT è in grado di scambiare dati in modo anonimo sino a 10 mt di
distanza, ma è anche vero che analizzando *la potenza del segnale* si può
distinguere chi sta trasmettendo dati è più vicino da chi è più lontano.

Se incrociamo questa informazione con il fattore tempo, ossia per quanto tempo
due dispositivi sono stati sufficientemente vicini tra loro, si può provare a
minimizzare i falsi positivi che comunque ci saranno di sicuro: prendiamo ad
esempio il caso di due persone distanti 2 metri ma separate da una parete in
vetro o cartongesso.

Il mio parere personale resta sempre che è meglio avere un allarme forse non
necessario, che rimanere completamente ignaro...

[1]: https://en.wikipedia.org/wiki/Decentralized_Privacy-Preserving_Proximity_Tracing
[2]: https://www.linkedin.com/pulse/funzionamento-dellapp-di-contact-tracing-immuni-e-personali-vecchi/
[3]: https://www.facebook.com/andrea.vecchi71/posts/10158452698846468
