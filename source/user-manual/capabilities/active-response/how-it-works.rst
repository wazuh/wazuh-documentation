.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how the Wazuh Active Response module works with Alerting monitors to run response actions on monitored endpoints.

How it works
============

The Wazuh Active Response module works with Alerting monitors to run response actions when security findings meet configured conditions. The process works as follows:

#. An Alerting monitor periodically evaluates security findings stored in the Wazuh indexer against its configured trigger conditions, such as a specific rule ID.

#. When a finding matches the defined condition, the trigger fires and initiates the configured active response action.

#. The active response configuration selects the executable, location, and :ref:`type <active_response_types>`.

#. The Wazuh manager then sends the active response command, together with the relevant finding information to the selected monitored endpoint.

#. The Wazuh agent receives the command and executes the specified active response script.

Wazuh records each active response that it sends to the agents in the ``wazuh-active-responses*`` index. Each entry includes details such as the active response name, executable, and execution location, which can be reviewed from the Wazuh dashboard. An entry means that Wazuh sent the active response, not that the script ran successfully. To check the result, read the active response log on the endpoint, listed below.

The default ``stream-active-responses-policy`` Index State Management (ISM) policy controls the retention period. It rolls over the active response index at 20 GB per primary shard or 200,000,000 documents, and deletes each rolled-over index 3 days after the rollover. Deployments that don't reach the rollover threshold keep active response entries until they do. Wazuh restores this default policy on every restart, so don't edit it. To change the retention, create a custom policy in **Indexer management** > **Index Management** > **State management policies** and apply it to the active response indices.

You can find the results of active response script executions in:

-  ``/var/ossec/logs/active-responses.log`` on Linux endpoints.
-  ``/Library/Ossec/logs/active-responses.log`` on macOS endpoints.
-  ``C:\Program Files (x86)\ossec-agent\active-response\active-responses.log`` on Windows endpoints.

The following diagram shows the active response workflow.

.. thumbnail:: /images/manual/active-response/active-response-workflow.png
   :title: Active response workflow
   :alt: Diagram of the active response workflow between the monitored endpoint, the Wazuh manager, and the Wazuh indexer
   :align: center
   :width: 100%

See the :doc:`Use cases <ar-use-cases/index>` section for examples of configuring an Alerting monitor, trigger, and active response action.
