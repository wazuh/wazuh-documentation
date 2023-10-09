.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: 

Index life management
=====================

Index retention
---------------

Security standards require keeping data available for audits for a minimum period of time. For data older than this retention period, you might want to delete it to save storage space.

You can define specific policies to handle deletions automatically. You might also find these policies useful for index rollovers.

Creating a retention policy
^^^^^^^^^^^^^^^^^^^^^^^^^^^

Using the Visual editor
~~~~~~~~~~~~~~~~~~~~~~~

#. Click on the upper left menu **☰**, go to **OpenSearch Plugins**, and select **Index Management**. Choose **State management policies** and click **Create policy**. Select **Visual editor** and click **Continue**.

   .. thumbnail:: /images/manual/wazuh-indexer/state-management-policies.png
      :title: State management policies
      :alt: State management policies
      :align: center
      :width: 80%

   .. thumbnail:: /images/manual/wazuh-indexer/configuration-method-visual.png
      :title: Visual editor configuration method
      :alt: Visual editor configuration method
      :align: center
      :width: 80%

#. Enter a unique **Policy ID** in the **Policy info** section. For example, ``wazuh-alert-retention-policy``. You can optionally describe the policy in the **Description** field.

   .. thumbnail:: /images/manual/wazuh-indexer/create-policy.png
      :title: Create policy
      :alt: Create policy
      :align: center
      :width: 80%

#. Click **Add template** under **ISM templates** and enter an index pattern such as ``wazuh-alerts-*`` to apply this policy to future alert indices automatically.
#. Click **Add state** to create a state for index deletion. Enter a name such as ``delete_alerts``.
#. Click **Add action** and select **Delete** in the **Action type**. Click **Add action**. Then click **Save state**.
#. Click **Add state** again to create an initial state. Enter a name, such as *initial*.
#. Choose **Add before** from the **Order** tab and select **delete_alerts**.
#. Click **Add transition** and select **delete_alerts** as the **Destination state**.
#. Select **Minimum Index Age** in **Condition**. Input the retention value, for example, **90d** for 90 days, in the **Minimum Index Age**.
#. Click **Add transition**. Click **Save state**. Click **Create**.

Using the JSON editor
~~~~~~~~~~~~~~~~~~~~~

#. Click on the upper left menu **☰**, go to **OpenSearch Plugins**, and choose **Index Management**. Choose **State management policies** and click **Create policy**. Select **JSON editor** and click **Continue**.

   .. thumbnail:: /images/manual/wazuh-indexer/configuration-method-json.png
      :title: JSON editor configuration method
      :alt: JSON editor configuration method
      :align: center
      :width: 80%

#. Enter a unique **Policy ID** in the **Policy info** section. For example, ``wazuh-alert-retention-policy``. You can optionally enter a description within your JSON policy definition.