/*global cordova, module*/

module.exports = {
    initialize: function(){
        cordova.exec(null, null, "AndroidPayment", "initialize", []);
    },
    payForPackage: function (id, successCallback, errorCallback) {
        cordova.exec(successCallback, errorCallback, "AndroidPayment", "payForPackage", [id]);
    },
    payForAuxiliaryPackage: function(id, type, successCallback, errorCallback) {
        cordova.exec(successCallback, errorCallback, "AndroidPayment", "payForAuxiliaryPackage", [id, type]);
    }
};
