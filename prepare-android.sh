echo "moving www ... cordova-android-payment ...."
cp -r www cordova-android-payment/
echo "=============================================="

echo "moving src ... cordova-android-payment ...."
cp -r src cordova-android-payment/
echo "=============================================="

echo "moving plugin.xml ... cordova-android-payment ...."
cp -r plugin.xml cordova-android-payment/
echo "=============================================="


echo "moving package.json ... cordova-android-payment ...."
cp -r package.json cordova-android-payment/
echo "=============================================="

cd test
echo "removing android payment plugin ...."
cordova plugin rm cordova-plugin-android-payment
echo "=============================================="

echo "adding android payment plugin ...."
cordova plugin add ../cordova-android-payment/
echo "=============================================="

echo "prepare android project ...."
cordova prepare android
echo "=============== Done ================"