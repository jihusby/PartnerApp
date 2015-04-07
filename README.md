# GodfotenWebUI

## Teknologi
Godfoten Partner App er en webapp laget med React, som er et Javascriptbibliotek for å bygge brukergrensesnitt.
Webappen er distribuert som en ”hybrid” applikasjon til Android og IOS ved hjelp av Phonegap (Apache Cordova).
Sentrale biblioteker / rammeverk:
- React
- Bootstrap
- JQuery
- Gulp
- Node.js

### Kodebeskrivelse - arkitektur
All React-kode ligger under /js.

#### /js/components
Her ligger alle React-komponenter som brukes i appen. De er gjenbrukbare og representerer typisk et synlig objekt i appen. De bruker en kombinasjon av HTML og JSX. 
JSX er et objektorientert språk for moderne browsere som kompileres til Javascript.  
Eksempel på komponenter: 
- PartnerBox.jsx viser ett innslag i listen over partnere. Den viser navn og type partner. Den brukes av PartnerListView.
- PartnerDetailView.jsx viser alle detaljer om en bestemt partner (Navn, kontaktinfo, liste over kontaktpersoner etc).

#### /js/external
Eksterne biblioteker som er brukt i appen. Vanligvis ikke nødvendig/lurt å endre.

#### /js/model
Representerer objektene som hentes fra databasen. 

#### /js/stores
Komponenter som sørger for lagring/henting av lokale data og henting av serverdata.
- AuthStore.js behandler innlogging og autentisering.
- MenuStore.js behandler navigering mellom views.
- ContactStore administrerer favoritter, kontaktnotater etc.
- DataStore.js inneholder alle funksjonskall til API'et.

#### /js/utils
Utility-metoder som brukes i appen.

#### /js/app.js
Startpunkt for appen.

#### /css
CSS for appen. I tillegg til disse to css-filene brukes også Bootstrap.

#### /node_modules
Eksterne biblioteker som er brukt i appen. Vanligvis ikke nødvendig/lurt å endre.

#### /phonegap
Inneholder Phonegap-spesifikk data.
- /platforms/android/ant-build inneholder ferdig bygd apk-fil for Android.
- /ant.properties inneholder info om keystore som skal brukes for å signere Android-bygg.
- /config.xml inneholder konfigureringsparametre for både IOS- og Androidbygg.

## Publisering på App Store (første gang)

### App ID
Opprett app id i Member Center (se "[Registering App IDs](https://developer.apple.com/library/ios/documentation/IDEs/Conceptual/AppDistributionGuide/MaintainingProfiles/MaintainingProfiles.html)").  
Prefix genereres, men suffix må være det samme som i .plist filen (“CFBundleIdentifier”).

### Sertifikat
- Generere et produksjonssertifikat (iOS Distribution). Se “[Generating a Certificate Signing Request](http://lessons.runrev.com/m/4069/l/32957-how-do-i-create-a-distribution-profile-for-ios)” og “[Submitting a Certificate Signing Request](http://lessons.runrev.com/m/4069/l/32957-how-do-i-create-a-distribution-profile-for-ios)”.

- Member Center: last ned og installer sertifikat.

### Provisioning profile
- Lag en "iOS Distribution provisioning profile". Se ”[Creating Store Provisioning Profiles](https://developer.apple.com/library/ios/documentation/IDEs/Conceptual/AppDistributionGuide/MaintainingProfiles/MaintainingProfiles.html)".

- Member Center: last ned og installer profil.

### Xcode
- Konfigurer riktig sertifikat/distribusjonsprofil under "Build Settings" => “Code Signing”:  
Release/Any iOS SDK = “iPhone Distribution: Zoftconsult AS (LN6DYTAA9H)”.

- Lag arkiv: "Product" => "Archive"

- Legg ut (submit) ny versjon på iTunes Connect: åpne Organizer => velg arkiv som skal legges ut => "Submit"


## Publisering på Google Play

### Signering
- Keystore-fil med passord for signering blir levert fra oss.
- Filen ant.properties ligger under /phonegap. Den skal inneholde info om path og alias til keystore'n som blir brukt (bytt ut nåværende path med riktig).
- For mer info om signering, se "Signing a Cordova Android app from the command line": http://vincentpeters.be/signing-a-cordova-android-apk-from-the-command-line/

### Bygging
- For bygging av signert versjon brukes phonegap fra kommandolinjen: cordova build android --release
- Skriv inn passord for keystore/key: zC03Android/zC03Android
- Bygging av signert versjon genererer filen phonegap/platforms/android/ant-build/CordovaApp-release.apk. Denne filen lastes opp til Google Play.

### Publisering på Google Play
- Gå til Googles Developer Console: https://play.google.com/apps/publish/
- Velg Godfoten i listen over registrerte apper
- I menyen til venstre, velg APK. Velg fanen "I produksjon" eller "Betatesting". Vi anbefaler å laste opp ny versjon til betatesting før produksjon.
- Når akp-filen er lastet opp vil det ta noe tid - anslagsvis noen timer - før den nye versjonen er tilgjengelig for testing.

### Betatesting
- Bestem hvem som skal få testtilgang under "Administrer listen over testere". Det enkleste er å lage en Google Plus-gruppe, og legge til testerne i denne gruppen.
- Når den nye versjonen er tilgjengelig for testing, kan den lastes ned fra Google Play av de registrerte testerne.
- For mer info om betatesting, se "Android Beta testing on the Play Store": http://pugetworks.com/blog/2013/06/beta-testing-android-apps-on-the-google-play-store/

### Produksjonssetting
Velg fanen "I produksjon".
