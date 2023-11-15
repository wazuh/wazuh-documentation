.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how to define index management policies in this section of the documentation.

Index life management
=====================

To optimize your cluster performance, you can perform periodic operations, such as index rollovers and deletions.

Index State Management (ISM) lets you automate these operational tasks. You can implement lifecycle policies, such as retention policies, for your data using ISM. ISM triggers index operations automatically based on your policies and the changes detected in index age, size, and documents count.

Index rollover
---------------

Wazuh uses an ISM policy to rotate the ``wazuh-alerts-*`` and ``wazuh-archives-*`` indices automatically.

If a rollover policy is missing, it sets a default one during the Wazuh indexer initialization. This default policy establishes the following conditions for the rollover.

-  A single primary shard of an index is larger than 25 GB.
-  The index is older than 7 days.
-  The index has more than 600,000,000 documents.

.. code-block:: json
   :emphasize-lines: 11,12,13

   {
      "policy": {
            "description": "Wazuh rollover and alias policy",
            "default_state": "active",
            "states": [
            {
               "name": "active",
               "actions": [
               {
                  "rollover": {
                        "min_primary_shard_size": "25gb",
                        "min_index_age": "7d",
                        "min_doc_count": "600000000"
                  }
               }
               ]
            }
            ],
            "ism_template": {
               "index_patterns": ["wazuh-alerts-*", "wazuh-archives-*", "-wazuh-alerts-4.x-sample*"],
               "priority": "50"
            }
      }
   }

Customizing the rollover policy
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

You can customize the rollover policy to fit your needs. For example, you can change the minimum index size, age, and documents count values that trigger a rollover.

To customize your policy, you can follow one of these methods:

-  Recommended – `Using the ISM user interface`_.
-  `Using the ISM API`_.
-  `Using the initialization script`_.

Whatever the method you choose, make sure to keep the following considerations in mind:

-  Keep ``rollover_policy`` for the policy name. Wazuh preserves this policy unaffected between upgrades and initialization if present.
-  The ``min_doc_count`` value must be lower than *2^31*. Furthermore, we recommend a value not higher than 200 million.
-  The ``priority`` value must be unique among all policies managing the same indices.
-  For best performance, we recommend a value between 10 GB and 50 GB for ``min_primary_shard_size``.

We recommend keeping your documents count from exceeding 200 million while allocating between 10 GB and 50 GB per shard. This configuration typically works well for most use cases. In addition, we don't recommend changing the ``index_patterns`` value.

Using the ISM user interface
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

This is the recommended method. Perform the following steps using the Wazuh dashboard user interface.

#. Click on the upper left menu **☰** and select **Index Management** under **OpenSearch Plugins**.
#. Choose **State management policies** and click **rollover_policy**. 
#. Select your preferred edition method and update with your custom values.

Using the ISM API
~~~~~~~~~~~~~~~~~

You can use the `ISM API <https://opensearch.org/docs/latest/im-plugin/ism/api/>`__ directly from **Dev Tools** under **Management** section on the UI. You can also use external tools like `Postman <https://www.postman.com/>`_, `cURL <https://curl.se/>`_, or any other tool or library capable of performing HTTP requests.

By default, only the ``admin`` and ``kibanaserver`` users have permissions to manage the policies. However, the ``manage_ism`` permission group and role grants permissions to the `ISM API <https://opensearch.org/docs/latest/security/access-control/permissions/#index-state-management-permissions>`__.

Using the initialization script
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

When deploying Wazuh step by step, you have the option to customize the rollover policy using the ``indexer-ism-init.sh`` script. In this scenario, the cluster initialization process involves two distinct steps instead of using the ``indexer-init.sh`` script:

#. To set up the security options, execute the ``indexer-security-init.sh`` script.

   .. code-block:: console
    
      # /usr/share/wazuh-indexer/bin/indexer-security-init.sh

#. Next, configure the rollover policy by running the ``indexer-ism-init.sh`` script. For example, you can specify a 30 days rollover interval with the ``-a`` option as shown below. For a complete list of available options, use ``--help``.

   .. code-block:: console
    
      # /usr/share/wazuh-indexer/bin/indexer-ism-init.sh -a 30d

   Please note that this script uses the default password for the ``admin`` user. If you have changed the password, use the ``-p`` option to specify the new password.

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