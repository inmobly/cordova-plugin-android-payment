
echo "Install Cordova"
echo "Cordova installing ......."
sudo npm install -g cordova
echo "=============================================="


echo "moving www ... cordova-android-payment ...."
cp -r www cordova-android-payment/
echo "=============================================="

echo "moving src ... cordova-android-payment ...."
cp -r src cordova-android-payment/
echo "=============================================="

echo "moving plugin.xml ... cordova-android-payment"
cp -r plugin.xml cordova-android-payment/
echo "=============================================="


echo "moving package.json ... cordova-android-payment ...."
cp -r package.json cordova-android-payment/
echo "=============================================="


cd test

echo "Adding android project ...."
cordova platform add android
echo "=============================================="

echo "Adding android payment plugin to the project ...."
cordova plugin add ../cordova-android-payment/ --save
echo "================ Done ===================="

