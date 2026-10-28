# Drunk Uncle Said

Quiz satirico: la frase viene da Billy, lo zio immaginario, oppure da una figura pubblica?

## Giocare

Ogni manche contiene 10 domande: da 6 a 8 citazioni pubbliche e da 2 a 4 invenzioni di Billy. Le due frasi della stessa coppia non compaiono nella stessa manche. Un punto per ogni risposta corretta; riepilogo finale e ripresa locale della partita.

Il corpus comprende 330 domande, in 165 coppie. Le 40 coppie in riserva restano nei dati ma non vengono estratte. Le altre sono candidate editoriali da testare, non approvate automaticamente per una pubblicazione definitiva.

## Avvio locale

Servire la cartella principale con un server statico, per esempio:

```sh
python3 -m http.server 4173
```

Aprire http://localhost:4173. Nessuna installazione o compilazione richiesta.

## GitHub Pages

In **Settings → Pages → Build and deployment**, scegliere **Deploy from a branch**, ramo **main**, cartella **/ (root)**. Salvare. Il file `.nojekyll` consente di servire direttamente questi file statici.

## Verifica

Con Node.js, dalla cartella principale:

```sh
node tests/smoke.mjs
```

Il controllo verifica 10.000 estrazioni, proporzioni, esclusione delle riserve e delle coppie gemelle, punteggio, ripresa e gestione delle traduzioni.

## Dati e contesto

`questions.json` contiene i dati leggibili; `corpus.js` contiene gli stessi dati per il caricamento diretto nel browser. Aggiornare entrambi insieme. `core.js` gestisce l'estrazione; `app.js` gestisce l'interfaccia.

Le citazioni pubbliche mantengono testo attestato, eventuale traduzione editoriale, autore, ruolo, data, occasione, fonte e verifiche aperte. Le note tra parentesi quadre sono contesto editoriale e non fanno parte del virgolettato. Alcune fonti riportano già una traduzione: l'interfaccia lo dichiara senza presentarla come originale nella lingua pronunciata. Le fonti attestano le parole, non rendono vere le affermazioni.

Le frasi di Billy e i commenti del quiz sono invenzioni satiriche, distinte dalle citazioni reali. Billy non è una persona reale.

La lingua della traduzione viene rilevata dal browser. L'italiano editoriale è disponibile per tutte le schede. Le altre lingue dipendono dalla Translator API del browser; se non disponibile, compare un avviso e si mantiene l'italiano. Le traduzioni automatiche sono indicate come tali.

Il sito non usa servizi di analisi o un backend. La partita e la preferenza linguistica restano nel browser. I dati e le risposte corrette sono inclusi nel codice pubblico: è un MVP editoriale, non una piattaforma per gare con premi.
