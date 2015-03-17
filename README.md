# GodfotenWebUI


## Android-platform

### Signering og bygging av Android-app
Keystore-fil med passord for signering blir levert fra oss.
Filen ant.properties ligger under /phonegap. Den skal inneholde info om path og alias til keystore'n som blir brukt (bytt ut nåværende path med riktig).

For bygging av signert versjon brukes phonegap fra kommandolinjen:
cordova build android --release
Hvis ant.properties inneholder riktig info, vil det være nødvendig å skrive inn passord for keystore/key

Bygging av signert versjon genererer filen phonegap/platforms/android/ant-build/CordovaApp-release.apk. Denne filen lastes opp til Google Play.

For mer info om signering, se "Signing a Cordova Android app from the command line": http://vincentpeters.be/signing-a-cordova-android-apk-from-the-command-line/


### Publisering på Google Play
For publisering, gå til Googles Developer Console: https://play.google.com/apps/publish/
En liste over registrerte apper kommer opp. Velg Godfoten.
I menyen til venstre, velg APK. Velg fanen "I produksjon" eller "Betatesting". Vi anbefaler å laste opp ny versjon til betatesting før produksjon.
Når akp-filen er lastet opp vil det ta noe tid - anslagsvis noen timer - før den nye versjonen er tilgjengelig for testing.


### Betatesting
Hvem som skal få testtilgang bestemmes under "Administrer listen over testere". Det enkleste er å lage en Google Plus-gruppe, og legge til testerne i denne gruppen.
Når den nye versjonen er tilgjengelig for testing, kan den lastes ned fra Google Play av de registrerte testerne.

For mer info om betatesting, se "Android Beta testing on the Play Store": http://pugetworks.com/blog/2013/06/beta-testing-android-apps-on-the-google-play-store/


### Produksjon
