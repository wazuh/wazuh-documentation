.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how to define index management policies in this section of the documentation.

Index lifecycle management
==========================

Index lifecycle management helps to optimize the Wazuh indexer cluster performance by controlling the lifecycle of an index. You can perform periodic operations, such as index rollovers and deletions. These periodic operations are configured using Index State Management (ISM) policies.

Index State Management (ISM) lets you automate these operational tasks. You can implement lifecycle policies, such as retention policies, for your data using ISM. ISM triggers index operations automatically based on your policies and the changes detected in index age, size, and documents count.

This section discusses some configuration options to manage the index lifecycle for optimization of the Wazuh indexer storage.

Index retention
---------------

Security standards require keeping data available for audits for a minimum period of time. For data older than this retention period, you might want to delete it to save storage space.

You can define specific policies to handle deletions automatically. You might also find these policies useful for index rollovers.

Creating a retention policy
^^^^^^^^^^^^^^^^^^^^^^^^^^^

Using the Visual editor
~~~~~~~~~~~~~~~~~~~~~~~

#. Click on the **upper left menu ☰**, go to **Indexer management**, and select **Index Management**. Choose **State management policies** and click **Create policy**. Select **Visual editor** and click **Continue**.

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

#. Click **Add template** under **ISM templates** and enter an index pattern such as ``wazuh-alerts-*`` to apply this policy to future alert indices automatically.  The priority  is set to the default value of ``1`` and can be set to any other value. The index with higher priority value is treated first.
#. Click **Add state** to create a state for index deletion. Enter a name such as ``delete_alerts``.
#. Click **Add action** and select **Delete** in the **Action type**. Click **Add action**. Then click **Save state**.
#. Click **Add state** again to create an initial state. Enter a name, such as ``initial``.
#. Choose **Add before** from the **Order** tab and select **delete_alerts**.
#. Click **Add transition** and select **delete_alerts** as the **Destination state**.
#. Select **Minimum Index Age** in **Condition**. Input the retention value, for example, **90d** for 90 days, in the **Minimum Index Age**.
#. Click **Add transition**. Click **Save state**. Click **Create**.

Using the JSON editor
~~~~~~~~~~~~~~~~~~~~~

#. Click on the **upper left menu ☰**, go to **Indexer management**, and choose **Index Management**. Choose **State management policies** and click **Create policy**. Select **JSON editor** and click **Continue**.

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

#. Click on the **upper left menu ☰**, go to **Indexer management**, and choose **Index Management**. Choose **Indices**.
#. Select the index or indices to attach the policy.
#. Click **Actions** > **Apply policy**.

   .. thumbnail:: /images/manual/wazuh-indexer/apply-policy-to-indices.png
      :title: Apply policy to indices
      :alt: Apply policy to indices
      :align: center
      :width: 80%

#. Select the policy created in the previous steps from the **Policy ID** menu. Click **Apply**.

Set up hot-warm architecture
----------------------------

This section shows how to configure indexes to be stored in hot and warm nodes. A hot-warm architecture is made up of hot and warm nodes with the following characteristics:

-  A hot node is typically fast and expensive due to its high computing resources.
-  A warm node is slower and cheaper due to lower computing resources.

You can design a hot-warm architecture where you first index your data to hot nodes and after a certain period move them to warm nodes. This architecture is suited for you if you have older data that you don't often query. The older data is moved, to be stored on a slower, and less expensive hardware. This architecture helps save money on computing costs.

Rather than increasing the number of hot nodes, you can add warm nodes for data that you don’t access as frequently.

To configure a hot-warm storage architecture, add ``temp`` attributes to the respective nodes.

.. note::

   You can set the attribute name and value to whatever you want as long as it’s consistent for all your hot and warm nodes.

Configure a hot node
^^^^^^^^^^^^^^^^^^^^

To configure a hot node, add the following configuration to the ``/etc/wazuh-indexer/opensearch.yml`` file:

.. code-block:: yaml

   node.attr.temp: hot

Restart the Wazuh indexer service:

.. code-block:: console

   # systemctl restart wazuh-indexer

Configure a warm node
^^^^^^^^^^^^^^^^^^^^^

To configure a warm node, add the following configuration to the ``/etc/wazuh-indexer/opensearch.yml`` file:

.. code-block:: yaml

   node.attr.temp: warm

Restart the Wazuh indexer service:

.. code-block:: console

   # systemctl restart wazuh-indexer

Create indexer state management policy
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Perform the following steps on the Wazuh dashboard console.

#. Confirm that the ``temp`` attributes assigned earlier were applied:

   .. code-block:: none

      GET _cat/nodeattrs?v&h=node,attr,value

#. Create an ISM policy to assign indices using the ``wazuh-alerts-4.x-*`` index pattern to hot nodes and move them to warm nodes after a defined time:

   .. code-block:: none
      :emphasize-lines: 16

      PUT _plugins/_ism/policies/hot_warm
      {
          "policy": {
              "description": "Send shards from hot to warm nodes",
              "schema_version": 17,
              "error_notification": null,
              "default_state": "hot",
              "states": [
                  {
                      "name": "hot",
                      "actions": [],
                      "transitions": [
                          {
                              "state_name": "warm",
                              "conditions": {
                                  "min_index_age": "30d"
                              }
                          }
                      ]
                  },
                  {
                      "name": "warm",
                      "actions": [
                          {
                              "retry": {
                                  "count": 3,
                                  "backoff": "exponential",
                                  "delay": "1m"
                              },
                              "replica_count": {
                                  "number_of_replicas": 0
                              }
                          },
                          {
                              "retry": {
                                  "count": 3,
                                  "backoff": "exponential",
                                  "delay": "1m"
                              },
                              "allocation": {
                                  "require": {
                                      "temp": "warm"
                                  },
                                  "include": {},
                                  "exclude": {},
                                  "wait_for": false
                              }
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

   Adjust the ``min_index_age`` from ``30d`` to your preferred number of days to define the minimum number of days to store the indices on a hot node.

Now all future indices created using the ``wazuh-alerts-4.x-*`` index pattern will be allocated to a hot node. After the ``min_index_age`` condition is met, the indices are moved to a warm node and all replicas removed. The removal of the replicas ensures that storage is managed on the warm node since the data will not be queried frequently.

Apply the ISM policy to existing indices
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

#. Choose **Indices** in **Index Management**.
#. Select the index or indices to attach the policy.
#. Click **Actions** > **Apply policy**.
#. Select the ``hot-warm``  policy in Policy ID.
#. Click **Apply** to add the policy to the selected indices.

   .. thumbnail:: /images/manual/wazuh-indexer/apply-ism-policy-to-indices.gif
      :title: Apply the ISM policy to indices
      :alt: Apply the ISM policy to indices
      :align: center
      :width: 80%
