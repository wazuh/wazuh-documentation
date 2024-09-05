.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how to define index management policies in this section of the documentation.

Index life management
=====================

To optimize your cluster performance, you can perform periodic operations, such as index rollovers and deletions.

Index State Management (ISM) lets you automate these operational tasks. You can implement lifecycle policies, such as retention policies, for your data using ISM. ISM triggers index operations automatically based on your policies and the changes detected in index age, size, and documents count.

Index retention
---------------

Security standards require keeping data available for audits for a minimum period of time. For data older than this retention period, you might want to delete it to save storage space.

You can define specific policies to handle deletions automatically. You might also find these policies useful for index rollovers.

Creating a retention policy
^^^^^^^^^^^^^^^^^^^^^^^^^^^

Using the Visual editor
~~~~~~~~~~~~~~~~~~~~~~~

#. Click on the upper left menu **☰**, go to **Indexer management**, and select **Index Management**. Choose **State management policies** and click **Create policy**. Select **Visual editor** and click **Continue**.

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
#. Change the **Initial State** to **Initial**.

   .. thumbnail:: /images/manual/wazuh-indexer/ism-policy-states.png
         :title: ISM Policy States
         :alt: ISM Policy States
         :align: center
         :width: 80%

Using the JSON editor
~~~~~~~~~~~~~~~~~~~~~

#. Click on the upper left menu **☰**, go to **Indexer management**, and choose **Index Management**. Choose **State management policies** and click **Create policy**. Select **JSON editor** and click **Continue**.

   .. thumbnail:: /images/manual/wazuh-indexer/configuration-method-json.png
      :title: JSON editor configuration method
      :alt: JSON editor configuration method
      :align: center
      :width: 80%

#. Enter a unique **Policy ID** in the **Policy info** section. For example, ``wazuh-alert-retention-policy``. You can optionally enter a description within your JSON policy definition.

   .. thumbnail:: /images/manual/wazuh-indexer/json-policy-definition.png
      :title: JSON policy definition
      :alt: JSON policy definition
      :align: center
      :width: 80%

#. In the **Define policy** section, replace the content with your JSON policy definition. Your definition must look similar to this.

   .. code-block:: json
      :emphasize-lines: 16

      {
          "policy": {
              "policy_id": "wazuh-alert-retention-policy",
              "description": "Wazuh alerts retention policy",
              "schema_version": 17,
              "error_notification": null,
              "default_state": "retention_state",
              "states": [
                  {
                      "name": "retention_state",
                      "actions": [],
                      "transitions": [
                          {
                              "state_name": "delete_alerts",
                              "conditions": {
                                  "min_index_age": "90d"
                              }
                          }
                      ]
                  },
                  {
                      "name": "delete_alerts",
                      "actions": [
                          {
                              "retry": {
                                  "count": 3,
                                  "backoff": "exponential",
                                  "delay": "1m"
                              },
                              "delete": {}
                          }
                      ],
                      "transitions": []
                  }
              ],
              "ism_template": [
                  {
                      "index_patterns": [
                          "wazuh-alerts-*"
                      ],
                      "priority": 1
                  }
              ]
          }
      }

   Adjust the ``“min_index_age”:`` from ``“90d”`` to your preferred number of days for minimum index retention.

#. Click **Create**.

Applying the retention policy to alerts index
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

#. Choose **Indices** in **Index Management**.
#. Select the index or indices to attach the policy.
#. Click **Actions** > **Apply policy**.

   .. thumbnail:: /images/manual/wazuh-indexer/apply-policy-to-indices.png
      :title: Apply policy to indices
      :alt: Apply policy to indices
      :align: center
      :width: 80%

#. Select the policy created in the previous steps from the **Policy ID** menu. Click **Apply**.
