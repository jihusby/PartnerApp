# GodfotenWebUI


## Publisering på Google Play


### Signering
For signering, se "Signing a Cordova Android app from the command line": http://vincentpeters.be/signing-a-cordova-android-apk-from-the-command-line/

I phonegap/platforms/android/ må filen ant.properties ligge. Den inneholder info om path og alias til keystore'n som blir brukt.
Ved første gangs publisering så den slik ut:
key.store=/Users/jih/keystores/android.jks
key.alias=AndroidKey

For bygging av signert versjon brukes phonegap fra kommandolinjen:
cordova build android --release
Hvis ant.properties inneholder riktig info, vil det være nødvendig å skrive inn passord for keystore/key

### Betatesting
For betatesting, se "Android Beta testing on the Play Store": http://pugetworks.com/blog/2013/06/beta-testing-android-apps-on-the-google-play-store/

