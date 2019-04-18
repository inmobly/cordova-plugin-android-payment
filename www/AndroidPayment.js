/*global cordova, module*/

module.exports = {
    initialize: function(purchasePublicKey){
        cordova.exec(null, null, "AndroidPayment", "initialize", [purchasePublicKey]);
    },
    payForPackage: function (id,packageIds, successCallback, errorCallback) {
        cordova.exec(successCallback, errorCallback, "AndroidPayment", "payForPackage", [id,packageIds]);
    },
    payForAuxiliaryPackage: function(id, type, successCallback, errorCallback) {
        cordova.exec(successCallback, errorCallback, "AndroidPayment", "payForAuxiliaryPackage", [id, type]);
    }
};
