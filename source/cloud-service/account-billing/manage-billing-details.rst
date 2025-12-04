.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Learn how to add your billing details to your Wazuh Cloud account in this section of the documentation. 

Manage your billing details
===========================

To continue using your environment beyond the trial period, you need to add credit card details to your Wazuh Cloud account. Your credit card information is sent securely to our billing provider and stored with them.

.. note::

   A trial environment is converted to a paid environment when the trial expires. If you do not add your credit card information before the expiration date, your environment is deleted, and all data is permanently erased. Make sure to add your credit card before the end of the trial period.

Add your billing details
------------------------

To add the billing details:

#. Log in to the `Wazuh Cloud Console <https://console.cloud.wazuh.com/>`_.
#. Go to the **Account** section and select **Billing**.
#. Select **Add billing information** in the **Payment method** section.
#. Fill in the form with your billing details.
#. Click **Save** to confirm the payment method.

You can stop upcoming charges by :doc:`canceling your environments <stop-charges>`.

.. note::

   Cancellation cannot be undone, all data will be permanently deleted.

Remove your billing details
---------------------------

You can only remove billing details when there are no active paid environments. This means either:

-  There are no environments.
-  The only active environment is in a trial period.
-  All the environments have been canceled.

In order to remove your billing information:

#. Log in to the `Wazuh Cloud Console <https://console.cloud.wazuh.com/>`_.
#. Go to the **Account** section, select **Billing**, and select **Payment method**.
#. Select **Delete** in the **Payment method**. This button will be disabled if there is an active paid environment.
#. Confirm **Delete** in the pop up.