.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how the Wazuh Logcollector module, custom retention policies, and unclassified event storage help meet PCI DSS log data analysis requirements.

Log data analysis
==================

Log messages from devices, systems, and applications often carry evidence of an attack. The Wazuh Logcollector module receives logs through text files or Windows event logs. It can also directly receive logs via remote syslog, which is useful for firewalls and other such devices.

Wazuh agents use the Logcollector module to collect events from monitored endpoints and applications. The Wazuh agents forward these events to the Wazuh manager, where the normalization engine processes them. The Wazuh manager then sends the normalized data to the Wazuh indexer for rule matching and indexing. This processed data supports threat detection, prevention, and active response.

The Logcollector module helps to meet the following PCI DSS requirement:

-  **Requirement 10 - Log and Monitor All Access to System Components and Cardholder Data**: This control mandates logging and monitoring user activities by employees, contractors, consultants, vendors, third parties, and other authorized users for a specified period.

To help meet this requirement, the Wazuh agent uses the Logcollector module to collect endpoint logs or receive syslog messages from network and other syslog-enabled devices. The Wazuh manager normalization engine decodes the logs to extract the relevant fields, then forwards the normalized events to the Wazuh indexer. The detection engine in the Wazuh indexer evaluates them against the ruleset and triggers a finding when an event matches a rule. Refer to :ref:`rules <data_analysis_rules_compliance>` for more information.

Wazuh indexes decoded events whether or not they trigger a finding. To also keep the events that no integration decodes, see :ref:`enabling unclassified events storage <pci_dss_unclassified_events>`.

Use cases
---------

Below are PCI DSS requirements that the Wazuh Logcollector module can meet.

PCI DSS requirement 10.2.1.4
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

PCI DSS requirement 10.2.1.4 mandates that audit logs capture invalid logical access attempts. Requirement 10.2.2 mandates that audit logs record the following details for each auditable event:

-  User identification

-  Type of event

-  Date and time

-  Success and failure indication

-  Origination of the event

-  Identity or name of affected data, system component, resource, or service (for example, name and protocol)

The following Wazuh rule helps achieve this requirement:

Failed authentication attempt
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

This rule triggers a finding when a non-existent user tries to log in to a system via SSH. The generated finding contains the information listed above. On Ubuntu, a second rule, Failed authentication attempt, also triggers for the same login. The screenshot below shows the finding generated on the dashboard.

.. thumbnail:: /images/compliance/pci/failed-authentication-attempt-finding-01.png
   :title: Failed authentication attempt finding
   :alt: Threat Hunting Findings tab listing failed authentication attempt findings from one source IP
   :align: center
   :width: 80%

.. thumbnail:: /images/compliance/pci/failed-authentication-attempt-finding-02.png
   :title: Failed authentication attempt finding details
   :alt: Document details of a failed authentication finding with the event action, message, source IP, and user highlighted
   :align: center
   :width: 80%

.. thumbnail:: /images/compliance/pci/failed-authentication-attempt-finding-03.png
   :title: Failed authentication attempt finding details expanded
   :alt: Document details of a failed authentication finding with its PCI DSS compliance mapping highlighted
   :align: center
   :width: 80%

PCI DSS requirement 10.2.1.7
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

PCI DSS requirement 10.2.1.7 mandates that audit logs capture the creation and deletion of system-level objects.

The following Wazuh rule helps achieve this requirement:

System service installed
~~~~~~~~~~~~~~~~~~~~~~~~~

This rule triggers a finding after the detection engine analyzes the system logs from a Windows endpoint and determines that a new service was created. In the finding, you can see the service name, event type, installation time, and other information.

.. thumbnail:: /images/compliance/pci/system-service-installed-finding.png
   :title: System service installed finding
   :alt: Document details of a system service installed finding from a Windows endpoint
   :align: center
   :width: 80%

PCI DSS requirement 10.5.1
^^^^^^^^^^^^^^^^^^^^^^^^^^^

PCI DSS requirement 10.5.1 mandates that you retain audit log history for at least 12 months, with the most recent 3 months immediately available for analysis. To meet it, keep events and findings for at least 365 days with custom retention policies, and turn on the storage of unclassified events so that Wazuh also keeps the events that no integration decodes.

By default, Wazuh deletes an events backing index once it has rolled over and is older than 1 hour, and a findings backing index once it has rolled over and is older than 90 days. See :ref:`Data stream lifecycle <wazuh_indexer_indices_data_stream_lifecycle>` for the defaults. Don't edit the default policies. Wazuh rewrites them when the Wazuh indexer cluster restarts or is upgraded.

Keep events and findings for at least 12 months
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Run the following steps on a Wazuh indexer node to create custom retention policies for events and findings. The commands use ``jq``.

#. Copy the default events policy. In the copy, set the minimum age for deletion to 365 days and the template priority to 1, so that new event indices use it:

   .. code-block:: bash
      :emphasize-lines: 1

      curl -sk -u <WAZUH_INDEXER_USERNAME>:<WAZUH_INDEXER_PASSWORD> \
        'https://localhost:9200/_plugins/_ism/policies/stream-events-policy' \
        | jq '{policy: (.policy
            | del(.policy_id, .last_updated_time, .schema_version, .error_notification)
            | .description = "Custom events policy: keeps events for at least 365 days."
            | .states[0].transitions[0].conditions.min_index_age = "365d"
            | .ism_template[].priority = 1)}' > custom-events-policy.json

#. Store the copy as ``custom-events-policy``:

   .. code-block:: console
      :emphasize-lines: 1

      # curl -sk -u <WAZUH_INDEXER_USERNAME>:<WAZUH_INDEXER_PASSWORD> -X PUT \
        'https://localhost:9200/_plugins/_ism/policies/custom-events-policy' \
        -H 'Content-Type: application/json' -d @custom-events-policy.json

#. Move the existing events indices to ``custom-events-policy``:

   .. code-block:: console
      :emphasize-lines: 1

      # curl -sk -u <WAZUH_INDEXER_USERNAME>:<WAZUH_INDEXER_PASSWORD> -X POST \
        'https://localhost:9200/_plugins/_ism/change_policy/.ds-wazuh-events-v5-*' \
        -H 'Content-Type: application/json' -d '{"policy_id": "custom-events-policy"}'

#. Check that every events index uses ``custom-events-policy``. The change applies at the next ISM run, every 5 minutes by default, and can take two runs or more. Don't restart the Wazuh indexer cluster until every index shows ``custom-events-policy`` and a step name:

   .. code-block:: console
      :emphasize-lines: 1

      # curl -sk -u <WAZUH_INDEXER_USERNAME>:<WAZUH_INDEXER_PASSWORD> \
        'https://localhost:9200/_plugins/_ism/explain/.ds-wazuh-events-v5-*' \
        | jq -r 'to_entries[] | select(.value | type == "object") | [.key, .value.policy_id, (.value.step.name // "pending")] | @tsv'

#. Repeat steps 1 to 4 for findings. Use ``stream-findings-policy``, ``custom-findings-policy``, and ``.ds-wazuh-findings-v5-*`` instead of the events values.

.. _pci_dss_unclassified_events:

Enable the storage of unclassified events
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Wazuh indexes decoded events in ``wazuh-events-v5-<category>`` whether or not a rule matches. An event is unclassified when the decoder that matched it belongs to an integration in the **Unclassified** category, such as ``wazuh-core``. Wazuh drops these events unless you turn on **Index unclassified events**.

Unclassified event indexing is configured per :doc:`space </user-manual/data-analysis/space>`. When it's turned on, Wazuh stores unclassified events in the :ref:`wazuh-events-v5-unclassified <wazuh_indexer_indices_data_streams>` index. The Wazuh agents' events are processed in the **Standard** space by default.

#. Navigate to **Ruleset management** > **Overview**. Select **Standard** in **Space**, then select **Actions** > **Edit**.

   .. thumbnail:: /images/compliance/pci/security-analytics-edit-space.png
      :title: Edit a space in Ruleset management
      :alt: Ruleset management Overview with the Standard space selected and the Actions menu open on Edit
      :align: center
      :width: 80%

#. Toggle on **Index unclassified events**, and click **Save**.

   .. thumbnail:: /images/compliance/pci/index-unclassified-events-toggle.png
      :title: Index unclassified events toggle
      :alt: Edit Standard space panel with Index unclassified events turned on
      :align: center
      :width: 80%
