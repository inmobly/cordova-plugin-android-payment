package com.inmobly.ott.android_payment;

import org.apache.cordova.*;
import org.json.*;

import java.util.*;

public class AndroidPayment extends CordovaPlugin {

    private IabPaymentController paymentController;

      @Override
    public boolean execute(String action, JSONArray data, CallbackContext callbackContext) throws JSONException {
        if (action.equals("initialize")) {
            paymentController = new IabPaymentController(cordova.getActivity(),
                    data.getString(0));
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
            }, parseJsonArray(data.getJSONArray(1)));
            return true;
        } else if (action.equals("payForAuxiliaryPackage")) {
            String id = data.getString(0);
            String type = data.getString(1);
            paymentController.payForAuxiliaryPackage(id, type.equals("addon"), new IabPaymentController.Listener() {
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
        }
        return false;
    }

    private List<String> parseJsonArray(JSONArray jsonArray) {
        ArrayList<String> packagesIds = new ArrayList<>();
        for (int i = 0; i < jsonArray.length(); i++) {
            try {
                packagesIds.add(jsonArray.getString(i));
            } catch (Exception exc) {

            }
        }
        return packagesIds;
    }
}
