.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how to define index management policies in this section of the documentation.

Index life management
=====================

Using Index State Management policies will allow you to define the lifecycle for an index from the ingestion to the deletion stage, optimizing the cluster's performance and establishing a retention policy for your data.

What is an ISM policy?
----------------------

Extracted from `OpenSearch's documentation
<https://opensearch.org/docs/latest/im-plugin/ism/index>`_: 

|   Index State Management (ISM) is a plugin that lets you automate these periodic, administrative operations by triggering them based on changes in the index age, index size, or number of documents. Using the ISM plugin, you can define policies that automatically handle index rollovers or deletions to fit your use case.

Index rollover
---------------

Since 4.8.0, Wazuh uses an ISM policy to automatically rollover indices based on the number of documents, index size, or index age.

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
                            "min_doc_count": "200000000"
                        }
                    }
                    ]
                }
                ],
                "ism_template": {
                    "index_patterns": ["wazuh-alerts*", "wazuh-archives*", "-wazuh-alerts-4.x-sample*"],
                    "priority": "50"
                }
            }
        }


This policy will rotate the ``wazuh-alerts`` and ``wazuh-archives`` indices when any of the following conditions are met:

    * The index is older than 7 days.
    * An index's primary shard is larger than 25 GB.
    * The index has more than 200,000,000 documents.

   .. note::
      
      There is a limit of 2^31 documents per shard. 
      
      Each shard can contain up to just over two billion documents (2^31). Shards between 10 GB and 50 GB usually work well for many use cases, as long as the documents-per-shard is kept below 200 million.

The policy will be automatically added to the environment when Wazuh Indexer is configured, only 

The policy will be automatically added to the environment when Wazuh Indexer is configured, only if there is not any other rollover policy already managing the indices. If you want to use a different rollover policy, you can disable the default one by **TO BE DONE**. If the policy has been already uploaded and applied to the indices, you can remove it using the Index State Management plugin.

.. _Customizing the rollover policy:

Customizing the rollover policy
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

You can customize the rollover policy to fit your needs. For example, you can change the number of documents per shard, the index size, or the index age. To customize the initialization values of the policy, you can edit the ``TO BE DEFINED`` file.

Do not worry, you can still customize the policy after being created following one of these methods:

    * Using the Index State Management plugin (**recommended**).
    * Using the Index State Management API.

By default, only the ``admin`` and ``kibanaserver`` users have permissions to manage the policies. For convenience, a new permission group and role (**manage_ism**) has been created to grant permissions to the `ISM API <https://opensearch.org/docs/latest/security/access-control/permissions/#index-state-management-permissions>`__.

Whatever the method you choose to customize the policy, make sure to have the following considerations in mind:

    * The policy's name is ``rollover-policy``.
    * The ``min_doc_count`` value should be lower than the maximum number of documents per shard (2^31). A value over 200 million is not recommended. 
    * The ``priority`` value should be unique among other policies managing the same indices.
    * The ``min_primary_shard_size`` value should be between 10 GB and 50 GB for best performance.
    * It's not advised to change the ``index_patterns`` value.

Using the Index State Management plugin (**recommended**)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

#. Click on the upper left menu **☰**, go to **Management**, and select **Index Management**. Choose **State management policies** and click on **wazuh_rollover_policy**. Select the preferred method and edit as desired.

Using the Index State Management API
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

You can use the `ISM API <https://opensearch.org/docs/latest/im-plugin/ism/api/>`__ directly from the **Dev Tools** section on the UI. You can also use external tools like `Postman <https://www.postman.com/>`_, `cURL <https://curl.se/>`_, or any other tool or library capable of performing HTTP requests.


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