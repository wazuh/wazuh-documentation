.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how the Wazuh Active Response module works with Alerting monitors to run response actions on monitored endpoints.

How it works
============

The Wazuh Active Response module works with Alerting monitors to run response actions when security findings meet configured conditions. The process works as follows:

#. An Alerting monitor periodically evaluates security findings stored in the Wazuh indexer against its configured trigger conditions, such as a specific rule ID.

#. When a finding matches the defined condition, the trigger fires and initiates the configured active response action.

#. The active response configuration selects the executable, location, and :ref:`type <active_response_types>`.

#. The Wazuh manager then sends the active response command, together with the relevant finding information, to the selected monitored endpoint.

#. The Wazuh agent receives the command and executes the specified active response script.

After execution, Wazuh stores the results of each active response in the ``wazuh-active-responses*`` index. Each entry includes details such as the command and execution location, which can be reviewed from the Wazuh dashboard. The index data is available for only 3 days. The ``stream-active-responses-policy`` ISM policy controls the retention period. Navigate to **Indexer Management** > **Index Management** > **State management policies** and edit the policy if you need to keep active response results for longer.

You can find the results of active response script executions in:

-  ``/var/ossec/logs/active-responses.log`` on Linux endpoints.
-  ``/Library/Ossec/logs/active-responses.log`` on macOS endpoints.
-  ``C:\Program Files (x86)\ossec-agent\active-response\active-responses.log`` on Windows endpoints.

The following diagram shows the active response workflow.

.. thumbnail:: /images/manual/active-response/active-response-workflow.png
   :title: Active response workflow
   :align: center
   :width: 100%

See the :doc:`Use cases <ar-use-cases/index>` section for examples of configuring an Alerting monitor, trigger, and active response action.
