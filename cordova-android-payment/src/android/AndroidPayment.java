package com.inmobly.ott.android_payment;

import org.apache.cordova.*;
import org.json.*;
import android.widget.Toast;
import java.util.*;

public class AndroidPayment extends CordovaPlugin {

    private IabPaymentController paymentController;

    @Override
    public boolean execute(String action, JSONArray data, CallbackContext callbackContext) throws JSONException {
      if (action.equals("initialize")){
          paymentController = new IabPaymentController(cordova.getActivity());
      } else if (action.equals("payForPackage")) {
          String id = data.getString(0);
          paymentController.payForPackage(id, new IabPaymentController.Listener() {
              @Override
              public void onSuccess(JSONObject obj) {
                  callbackContext.success(obj);
              }

              @Override
              public void onFailed(JSONObject obj) {
                  callbackContext.error(obj);
              }
          });
          return true;
      } else if (action.equals("payForAuxiliaryPackage")) {
          String id = data.getString(0);
          String type = data.getString(1);
          paymentController.payForAuxiliaryPackage(id, type.equals("addon"), new IabPaymentController.Listener(){
              @Override
              public void onSuccess(JSONObject obj){
                  callbackContext.success(obj);
              }

              @Override
              public void onFailed(JSONObject obj){
                  callbackContext.error(obj);
              }
          });
          return true;
      }
      return false;
    }
}
