package com.inmobly.ott.android_payment;

import android.app.Activity;

import com.android.billingclient.api.BillingClient;
import com.android.billingclient.api.Purchase;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.List;

public final class IabPaymentController implements BillingManager.BillingUpdatesListener {

    private final BillingManager billingManager;
    private List<Purchase> purchases;
    private String pendingId;
    private String pendingType;
    private Listener pendingListener;

    public void onBillingClientSetupFinished() {

    }

    public void onConsumeFinished(String token, int result) {

    }

    public void onPurchasesUpdated(List<Purchase> purchases) {
        this.purchases = purchases;
        if (this.pendingId != null) {
            Purchase purchase = null;
            for (Purchase it : purchases) {
                if (it.getSku().equals(pendingId) && ((pendingType.equals(BillingClient.SkuType.SUBS)
                        && it.isAutoRenewing()) || pendingType.equals(BillingClient.SkuType.INAPP))) {
                    purchase = it;
                    break;
                }
            }

            if (purchase == null) {
                pendingListener.onFailed(new JSONObject());
            } else {
                JSONObject obj = new JSONObject();
                try {
                    obj.put("purchase_token", purchase.getPurchaseToken());
                } catch (JSONException e) {
                    e.printStackTrace();
                }
                pendingListener.onSuccess(obj);
            }
        }

    }

    public final void payForPackage(String packageId, Listener listener) {
        pendingId = packageId;
        pendingType = BillingClient.SkuType.SUBS;
        pendingListener = listener;

        ArrayList<String> oldList = new ArrayList<>();
        if (purchases != null)
          for (Purchase it : purchases) {
              if (it.isAutoRenewing()) {
                  oldList.add(it.getSku());
              }
          }

        billingManager.initiatePurchaseFlow(packageId, oldList.isEmpty() ? null : oldList, BillingClient.SkuType.SUBS);
    }

    public final void cancel() {
    }

    public final void destroy() {
        this.billingManager.destroy();
    }

    public final void payForAuxiliaryPackage(String hashId, boolean isAddon, Listener listener) {
        pendingId = hashId;
        pendingType = (isAddon) ? BillingClient.SkuType.SUBS : BillingClient.SkuType.INAPP;
        pendingListener = listener;

        billingManager.initiatePurchaseFlow(hashId, pendingType);
    }

    public final void consumeAll() {
        for (Purchase it : purchases) {
            if (!it.isAutoRenewing())
                billingManager.consumeAsync(it.getPurchaseToken());
        }
    }

    public IabPaymentController(Activity activity) {
        this.billingManager = new BillingManager(activity, this);
    }

    public interface Listener {
        void onSuccess(JSONObject obj);

        void onFailed(JSONObject obj);
    }
}
