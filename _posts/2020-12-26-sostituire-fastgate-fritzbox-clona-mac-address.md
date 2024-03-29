---
layout: post
title: Come sostituire un FASTGate su linea FTTN/FTTC con un Fritz!Box senza contattare assistenza Fastweb
image: /images/fritzbox_7530_640x400.jpg
redirect_from:
 - /2020/12/25/sostuire-fastgate-fritzbox-clona-mac-address/
tags:
 - italiano
 - modem libero
---

Dopo aver lasciato TIM e aver ottenuto [il rimborso a seguito dell'acquisto
obbligatorio del modem](/2020/04/20/rimborso-rate-modem-tim/), ho sentito
profondamente la necessità di sostituire il FASTGate fornito da Fastweb con un
altro router a causa di una serie di spiacevoli limitazioni:

* Impossibilità di configurare **DNS alternativi** (Cloudflare, OpenDNS, Google
  DNS)
* Wi-Fi 5Ghz instabile da quando ho iniziato ad usare **Google Stadia** nelle
  ultime settimane
* Impossibilità di disabilitare il servizio **WOW FI** che mantiene attiva una
  rete aperta per far utilizzare ad altri clienti Fastweb la connessione
  Internet che io pago
* Più in generale, gli aggiornamenti del **firmware del FASTGate** sono gestiti
  da remoto e non è dato sapere quali siano le modifiche apportate, né avere
  accesso ai sorgenti, quindi il controllo che possiamo esercitare è molto
  limitato.

Nonostante la **delibera 348/18/CONS** di AGCOM, denominata volgarmente **Modem
Libero**, preveda che il consumatore debba esser libero di non utilizzare il
router fornito dal provider (oltre al non doverlo acquistare obbligatoriamente),
la realtà è leggermente più complicata con Fastweb.

Nella pagina dedicata del supporto Fastweb si trova [Tutto quello che hai
bisogno di sapere se vuoi usare un modem alternativo a quello fornito da
Fastweb](https://www.fastweb.it/adsl-fibra-ottica/dettagli/altri-modem/), in
realtà manca di una informazione essenziale: anche collegando alla propria linea
un modem compatibile con le specifiche documentate, otterrete con successo il
collegamento alla portante DSL ma **non otterrete alcun indirizzo IP**, gateway
né DNS servers dal server DHCP di Fastweb.

Solo contattando l'assistenza, si scopre che per passare dal FASTGate ad un
router personale secondo la delibera *Modem Libero*, è necessario l'intervento
del supporto tecnico, fornendo il **MAC address del nuovo router**, affinché
possa esser abilitato e contestualmente disattivato l'accesso tramite FASTGate.

Questo implica che qualsiasi necessità futura di cambio router o ritorno al
FASTGate (anche temporaneamente magari a causa di un guasto dell'apparato
principale), si traduca nel dover **ricontattare nuovamente il supporto**, con
annessa perdita di tempo.

Effettuando qualche ricerca, si scoprono diversi utenti sui forum online che
hanno provato una procedura per poter utilizzare un modem alternativa senza
comunicare alcunché a Fastweb, ma questa non risulta ben documentata e spesso
con informazioni discrepanti o con evidenti errori di copia-incolla. Alcuni
riferimenti:
[[1]](https://www.fritzbox-forum.com/t10295-cambiare-mac-address-fritz-box#49719)
[[2]](https://www.wisp-forum.it/viewtopic.php?t=37528)
[[3]](https://www.ilpuntotecnico.com/forum/index.php/topic,82468.msg259979.html#msg259979)
[[4]](https://www.fastweb.it/forum/servizi-rete-fissa-tematiche-tecniche/prima-attivazione-con-fritzbox-t28081.html#p110082)
[[5]](https://www.amazon.it/gp/customer-reviews/RQXWJEQL0YYCH?ref_=fspcr_pl_sr_2_5_15_460169031)

## Procedura di configurazione

Questa procedura l'ho verificata sulla mia linea FTTN/FTTC 200 (VULA Tim) con un
[FRITZ!Box 7530](https://amzn.to/34KsOok), ma probabilmente è utilizzabile anche
su modelli precedenti e successivi.

Requisiti prima di iniziare la procedura:

* Completare il **Wizard di prima configurazione** del Fritz!Box. A seconda
  della versione installata di FRITZ!OS, la procedura più affidabile è sempre
  quella di selezionare **Altro Provider** così da avere accesso a tutti
  i parametri di configurazione, che nel nostro caso sono:
  * **VLAN-ID** uguale a **100**
  * Altri parametri, come VPI e VCI, sono indifferenti (lasciate il default
    proposto).
* Scaricare l'ultima versione di
  [FBEditor](https://github.com/proghack/FBEditor) (io ho usato la
  [v0.7.2.1j](https://github.com/proghack/FBEditor/releases/tag/v0.7.2.1j)) ed
  essere in grado di avviare *FBEditor.jar* (necessita di [Java
  JRE](https://www.oracle.com/it/java/technologies/javase-jre8-downloads.html))
* Recuperare il MAC Address dell'attuale FASTGate, stampato sull'etichetta sul
  retro del dispositivo oppure dall'interfaccia web nella sezione *Informazioni*

In breve i passi da effettuare sono:

* Collegarsi all'[interfaccia web del Fritz!Box](http://fritz.box)
* Effettuare il salvataggio delle impostazioni correnti del Fritz!Box da
  **System -> Backup -> Save**, scegliendo una password semplice per il restore.
* Aprire il precedente file .export con FBEditor (**File -> Open**)
* Effettuare le modifiche documentate nel [prossimo
  paragrafo](#modifica-del-file-di-export) e salvarle nello stesso file.
* Ricaricare il file delle impostazioni sul router, inserendo la password
  semplice definita in fase di salvataggio, da **System -> Backup -> Restore**
* Attendere qualche minuto il riavvio del Fritz!Box

### Modifica del file di export

Le impostazioni da modificare sono due:

* Modificare la direttiva `macdsl_override` con il MAC address del proprio
  FASTGate:

```
    enable_mac_override = yes;
    macdsl_override = 00:00:00:00:00:00;
```

* Aggiungere la direttiva `class_identifier` nelle **2** sezioni
  `etherencapcfg` (rispettivamente per la linea dati e linea voce):

```
    etherencapcfg {
            use_dhcp = yes;
            use_dhcp_if_not_encap_ether = no;
            ipaddr = 0.0.0.0;
            netmask = 0.0.0.0;
            gateway = 0.0.0.0;
            dns1 = 0.0.0.0;
            dns2 = 0.0.0.0;
            class_identifier = "askey_HW_ES1_SW_0.00.47/gionn.net";
    }
```

Per completezza, con `class_identifier` andiamo a definire la [DHCP Option
60](https://tools.ietf.org/html/rfc2132), che non è altro che un semplice campo
testuale che il DHCP client inserisce nella propria richiesta e che corrisponde
al **Vendor Class Identifier**, su cui il DHCP server può basarsi per rispondere
(oppure no) alla richiesta.

Entrambe le modifiche faranno credere a Fastweb che si stia ancora usando il
proprio FASTGate e non un modem personale, e quindi si riuscirà a **stabilire
correttamente una connessione**, ricevendo le impostazioni di rete necessarie.

Grazie al passaggio al Fritz!Box inoltre sono passato da circa 110 Mbit/s a
123,8 Mbit/s di portante DSL, a 253 metri di distanza dalla centrale Broadcom
v12.0.20 con protocollo VDSL2 35b (ITU G.993.2).

Leggi i commenti a questo articolo su Reddit
[r/ItalyInformatica](https://www.reddit.com/r/ItalyInformatica/comments/kkfx7w/come_sostituire_il_router_fastweb_fastgate_con_un/)
