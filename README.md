# IFDb 
I dagens samfunn kommer det stadig nye filmer på markedet, noe som gjør det vanskelig å ha en oversikt og velge filmer som passer personlige preferanser. IFDb er en nettjeneste for filminteresserte brukere, som skal hjelpe de med å holde overiskt over filmer. Nettsiden skal bestå av en forside, som har en oversikt over alle filmer tilgjengelig på nettsiden, hvor det også skal være mulig å filtrere filmer basert på preferanser. Videre skal brukeren kunne gi vurderinger, markere filmer som sett og like filmer. Dette er brukevennelige funksjoner som gjør det lettere for brukeren å navigere seg rundt i havet av filmer tilgjenglig.

## Funksjonalitet
### Autentisering
- Burkeren kan logge seg ut eller inn ved å trykke på tilhørende knapp.
### Filtrering av filmer
- Brukeren kan filtrere filmer basert på sjanger, årstall og regissør ved å trykke på filterknappen. 
### Visning av film informasjon
- Brukeren kan klikke på et film cover (bildet) for å få en beskrivelse, detaljert informasjon og trailer ab filmen.
### Tilfeldig film
- Brukeren kan oppdage nye filmer ved å trykke på tilfeldig filmknappen. 
### Like, vurdere og markere filmer som sett
- Når burkeren er logget inn kan brukeren like, vurdere og markere filmer som sett. Disse vil dukke opp på profil siden.
-  Når brukeren vurderer en film kan vedkommende gi en score 1-10 og skrive en kommentar.
### Profilsiden
- Brukeren kan komme inn på profil siden, ved å trykke på profil ikonet.
- På profil siden er det mulig å se sette, vurderte, anbefalte og likte filmer. 
- Anbfalte filmer er basert på likte filmer sine sjangere og regissører.
### Dårlige filmer
- Brukeren kan se dårlige filmer for denne uken. 


## Rammeverk  
Teknologistakken til prosjektet er satt sammen av Node.js, React og Firebase, som støtter webutvikling. Node.js er basert på Javascript og støtter backend funskjonaliteten til serveren, mens React gir en interaktiv frontend gjennom komponenter. Innen Firebase brukes Firestore for databehandling, noe som gjør det enkelt å hente og lagre data i sanntid. 

## Hvordan sette opp utviklingsmiljøet
1. Åpne terminalen og klon repository ved å skrive kommandoen: `git clone git@gitlab.stud.idi.ntnu.no:tdt4140-2024/produktomraade-4/gruppe-59/ifdb.git` 
2. Åpne prosjektet i ønsket IDEA

## Kommandoer for å kjøre prosjektet
I prosjektmappen kan du kjøre: `npm install` for å laste ned npm install avhengigheter, og deretter `npm install sweetalert2` for å kunne gi en vurdering. Når alt er lastet ned, kjør  `npm start fir å kjøre appen i development mode.

Hvis det er problemer med avhengighetene, kjør `rm node_modules` og deretter skriv `A` for å avinstallere alle lokale kopier av avhengighetene. Deretter kjør kommandoene over. 

Kjør appen i "development mode" og åpne [http://localhost:3000](http://localhost:3000) for å se den i nettleseren din. Ved endringer vil siden bli oppdatert. For å åpne en spesifikk side i prosjektet: [http://localhost:3000/navnside](http://localhost:3000/navnside).

Ved problemer ved logg inn, bytt nettleser til google chrome.

## Bidrag 
Alma Dalvang Anthonisen

Balin Balinov

Camilla Szwarc Jensen

Jonathan Løvdal

Lars Dalbakk

Leo Fredsvik
 



