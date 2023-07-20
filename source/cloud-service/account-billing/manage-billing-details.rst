.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Learn how to add your billing details to your Wazuh Cloud account in this section of the documentation. 

.. _cloud_account_billing_details:

Manage your billing details
===========================

If you want to continue using your environment beyond the trial period, you need to add credit card details to your Wazuh Cloud account. Your credit card information is sent securely to our billing provider and stored with them.

.. note::

  A trial environment is converted to a paid environment when the trial expires. If you do not add your credit card information before the expiration date, your environment is deleted, and all data is permanently erased. Make sure to add your credit card before the end of the trial period.

Add your billing details
------------------------

To add the billing details:

1. Log in to the `Wazuh Cloud Console <https://console.cloud.wazuh.com/>`_.

2. Go to the **Account** section and select **Billing**.

3. In Payment method section, select **Add billing information**.

4. Fill in the form with your billing details.

5. Click **Save** to confirm the payment method.

You can stop upcoming charges by :ref:`canceling your environments <cloud_stop_charges>`. 

.. note::
  
  Please take into account that the cancellation cannot be undone once you do it and that all your data will be completely deleted.

Remove your billing details
---------------------------

Billing details can only be removed when there are no active paid environments. This means either:

- There are no environments.
- The only active environment is in a trial period.
- All the environments have been canceled.

In order to remove your billing information:

1. Log in to the `Wazuh Cloud Console <https://console.cloud.wazuh.com/>`_.

2. Go to the **Account** section, select **Billing**, and select **Payment method**.

3. In Payment method, select **Delete**. This button will be disabled if there is an active paid environment.

4. Confirm **Delete** in the pop up.