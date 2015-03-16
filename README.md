# GodfotenWebUI

## Teknologi

## Godfoten API

## Produksjonsmiljø  

## Utviklingsmiljø



## Publisering på App Store

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

- Lag arktiv: "Product" => "Archive"

- Legg ut (submit) ny versjon på iTunes Connect: åpne Organizer => velg arkiv som skal legges ut => "Submit"


## Publisering på Google Play


### Signering
For signering, se "Signing a Cordova Android app from the command line":   
http://vincentpeters.be/signing-a-cordova-android-apk-from-the-command-line/

I phonegap/platforms/android/ må filen ant.properties ligge. Den inneholder info om path og alias til keystore'n som blir brukt. Ved første gangs publisering så den slik ut:  
key.store=/Users/jih/keystores/android.jks  
key.alias=AndroidKey

For bygging av signert versjon brukes phonegap fra kommandolinjen:  
cordova build android --release  
Hvis ant.properties inneholder riktig info, vil det være nødvendig å skrive inn passord for keystore/key

### Betatesting
For betatesting, se "Android Beta testing on the Play Store":  
http://pugetworks.com/blog/2013/06/beta-testing-android-apps-on-the-google-play-store/

