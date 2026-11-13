.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Follow this guide to create a custom Wazuh security analytics policy end to end, from integration and decoders to rules, detectors, and findings.

.. _data_analysis_detection_workflow:

Create a security analytics detection workflow
==============================================

This guide walks you through creating a custom Wazuh security analytics policy. You will create a custom integration, add decoders to parse raw logs, write a rule to identify suspicious events, validate the content with the Wazuh Log test tool, create a detector, and promote the content into production. You will also view the generated security findings in the Wazuh dashboard.

The example used throughout is based on Apache HTTP Server error logs. A few concepts make the rest of this guide easier to follow.

.. note::

   Wazuh already decodes Apache HTTP Server error logs with the ``apache-http`` integration in the Standard space. This guide uses the same log source to keep the example simple, so each Apache error line is indexed twice: once by ``custom-integration`` and once by ``apache-http``.

-  **Integration.** A logical grouping of decoders, rules, and optional key-value databases (KVDBs) that belong to the same log source or product. Every decoder must belong to exactly one integration.

-  **Decoder.** Parses raw, unstructured log lines into a structured format that follows the Wazuh Common Schema, so the analysis engine can work with consistent fields.

-  **Rule.** Defines detection logic that inspects the structured fields produced by decoders and generates a finding when a condition is met.

-  **Detector.** A scheduled job that applies selected rules to incoming events and generates findings.

-  **Finding.** A finding is a security record that is created when an event matches a rule. This was previously called alert in Wazuh 4.x.

.. note::

   Security analytics organizes content into three spaces: draft, test, and custom. Content is created in Draft, validated in Test, and promoted to Custom for production use. Each space serves as a controlled step in the promotion flow, ensuring changes are validated before affecting live data. Use the space selector in the top-right corner to confirm you are working in the correct space.

You will complete the following steps in order:

-  `Create a custom integration`_

-  `Create custom decoders`_

-  `Set the root decoder of the space`_

-  `Create a custom rule`_

-  `Promote the content from the draft to the test space`_

-  `Validate the content with a log test`_

-  `Promote the content from test to custom`_

-  `Create a detector`_

-  `Configure the Wazuh agent to collect the Apache error log`_

-  `Generate a test event`_

-  `View findings on the Wazuh dashboard`_

Create a custom integration
---------------------------

Custom Wazuh security policies are managed through an integration on the Ruleset Management dashboard. Each custom decoder, KVDB, or rule is managed from within an integration.

Make sure the space selector reads **Draft** and follow these steps to create a custom integration.

#. Go to **Ruleset Management** > **Overview** > **Integrations** > **Actions** > **Create**.

   .. thumbnail:: /images/manual/data-analysis/security-analytics-create-custom-integration.jpg
      :title: Create a custom integration
      :alt: Create a custom integration
      :align: center
      :width: 80%

#. In the form, enter the following values that we use in this example, make sure the integration is **Enabled**, then click **Create integration**:

   -  **Title**: custom-integration

   -  **Category**: System Activity

   -  **Author**: Security Team

   The **Mode** field reads ``user-managed``. Integrations you create are always user-managed. In the Standard space, the Wazuh core integrations are ``protected`` and can't be edited or disabled, while the other standard integrations are ``user-managed`` and can be enabled or disabled.

   .. thumbnail:: /images/manual/data-analysis/security-analytics-confirm-custom-integration.jpg
      :title: Confirm the custom integration
      :alt: Confirm the custom integration
      :align: center
      :width: 80%

#. After creating the integration, it will appear in the integrations list.

   .. thumbnail:: /images/manual/data-analysis/security-analytics-custom-integration-list.jpg
      :title: Custom integration list
      :alt: Custom integration list
      :align: center
      :width: 80%

.. _data_analysis_create_custom_decoders:

Create custom decoders
----------------------

Configure two decoders: a root decoder that processes all incoming events before any source-specific analysis, and a child decoder that receives matching events from the root decoder to perform detailed parsing of Apache error logs.

Make sure the space selector reads **Draft** and follow the steps below to create custom decoders using the **Ruleset Management** dashboard.

#. Go to **Ruleset Management** > **Normalization** > **Decoders** > **Actions** > **Create**.

#. Select **YAML Editor**, select the integration you created (``custom-integration``), paste the root decoder below, and click **Create decoder**. Repeat for the child decoder. Use the YAML Editor: the parse patterns below are YAML strings folded with ``\``, and the Visual Editor rejects them.

   .. thumbnail:: /images/manual/data-analysis/security-analytics-create-decoder-yaml-editor.jpg
      :title: Create a decoder in the YAML Editor
      :alt: Create a decoder in the YAML Editor
      :align: center
      :width: 80%

   **Root decoder**

   .. code-block:: yaml

      name: "decoder/core-wazuh-message/0"
      metadata:
        author: "Wazuh, Inc."
        date: "2026-06-10T19:32:11Z"
        description: "Base decoder to process Wazuh message format, parses location part\
          \ and enriches the events that comes from a Wazuh agent with the host information."
        documentation: ""
        modified: "2026-06-10T19:32:11Z"
        references:
        - "https://documentation.wazuh.com/"
        supports: []
        title: "Wazuh message decoder"
      normalize:
      - map:
        - _tmp_json: "parse_json($event.original)"
      enabled: true

   The ``decoder/core-wazuh-message/0`` is a root decoder that parses the raw event as JSON and stores the result in a temporary field for child decoders to use. Other decoders inherit from it to handle specific log sources. The Apache error log isn't JSON, so ``parse_json`` doesn't produce a value for these events. A failed ``map`` operation doesn't make the decoder reject the event, so the event still reaches the child decoder. This decoder belongs to your custom content and is separate from the decoder with the same name in the standard space.

   **Child decoder**

   .. code-block:: yaml

      name: "decoder/apache-error/0"
      metadata:
        date: "2026-06-10T20:04:08Z"
        title: "Apache HTTP Server error logs decoder"
        author: "Wazuh, Inc."
        modified: "2026-06-10T20:04:08Z"
        supports: []
        references:
        - "https://httpd.apache.org/docs/2.4/logs.html"
        - "https://httpd.apache.org/docs/2.4/custom-error.html"
        description: "Decoder for Apache HTTP Server error logs."
        documentation: ""
      parents:
      - "decoder/core-wazuh-message/0"
      parse|event.original:
      - "[<event.start/ANSIC>] [<log.logger>:<log.level>] [pid <process.pid>(?:tid <process.thread.id>)]\
        \ [client <source.address>(?:<source.port>)] <message>"
      - "[<event.start/ANSIC>] [<log.logger>:<log.level>] [pid <process.pid>(?:tid <process.thread.id>)]\
        \ <message>"
      - "[<event.start/ANSIC>] [<log.level>] [client <source.address>(?:<source.port>)]\
        \ <message>"
      - "[<event.start/ANSIC>] [<log.level>] <message>"
      normalize:
      - map:
        - event.category: "array_append(web)"
        - event.dataset: "apache-error"
        - event.kind: "event"
        - service.type: "apache"
        - source.ip: "$source.address"
      - map:
        - event.type: "array_append(error)"
        - event.outcome: "failure"
        check:
        - log.level: "regex_match(^(?:emerg|alert|crit|error|warn\\)$)"
      - map:
        - event.type: "array_append(info)"
        - event.outcome: "unknown"
        check:
        - log.level: "regex_not_match(^(?:emerg|alert|crit|error|warn\\)?$)"
      - parse|message:
        - "File does not exist: <file.path>(?, referer: <http.request.referrer>)"
      - map:
        - source.domain: "$source.address"
        check:
        - source.ip: "not_exists()"
      enabled: true

   The ``decoder/apache-error/0`` decoder inherits from the base decoder and processes Apache HTTP Server error logs. It parses the raw log to extract fields like timestamp, log level, and client address, then classifies the event as an error or informational based on the log level. In the ``check`` conditions, ``\\)`` escapes the closing parenthesis of the regular expression: YAML turns ``\\`` into ``\``, and the helper parser needs ``\)`` so that it doesn't read the parenthesis as the end of the helper call.

#. Once both decoders are saved, they appear together in the decoders list.

   .. thumbnail:: /images/manual/data-analysis/security-analytics-decoders-list.jpg
      :title: Decoders list
      :alt: Decoders list
      :align: center
      :width: 80%

Set the root decoder of the space
---------------------------------

Each space has one root decoder, the entry point for parsing every event in that space. All the integrations in the space share it, and a promotion needs it. You can't delete a decoder while it's set as the root decoder.

Make sure the space selector reads **Draft** and follow these steps to set the root decoder of the space.

#. Go to **Ruleset Management** > **Overview** > **Actions** > **Edit**.

#. In **Edit Draft**, confirm the status is **Enabled**, select ``decoder/core-wazuh-message/0`` under **Root decoder**, and click **Save**.

   .. thumbnail:: /images/manual/data-analysis/security-analytics-select-root-decoder.jpg
      :title: Select the root decoder
      :alt: Select the root decoder
      :align: center
      :width: 80%

.. _data_analysis_create_custom_rule:

Create a custom rule
--------------------

Rules are used to identify patterns in normalized events and determine when specific conditions indicate a potential security event. They form the detection logic in Wazuh, allowing you to trigger findings based on structured event data generated by decoders.

Make sure the space selector reads **Draft** and follow these steps to create a rule that flags Apache error events classified as failures.

#. Go to **Ruleset Management** > **Detection** > **Rules** > **Actions** > **Create**.

#. Select **YAML Editor**, choose the ``custom-integration`` integration and paste the rule:

   .. code-block:: yaml

      logsource:
        product: custom-integration
      tags:
        - attack.initial-access
        - attack.t1190
      falsepositives:
        - Legitimate application errors
        - Expected access denials due to web server configuration
        - Temporary backend service failures
      level: medium
      status: experimental
      enabled: true
      detection:
        condition: selection
        selection:
          event.dataset: apache-error
          event.outcome: failure
      metadata:
        title: Apache Failure Detection
        author: Security Team
        description: >-
          Detects Apache error log events that have been classified as failures, which
          may indicate web application issues, unauthorized access attempts, or server
          misconfigurations.
        references:
          - https://httpd.apache.org/docs/
        documentation: ''
        supports:
          - ''
      mitre:
        tactic:
          id:
            - TA0001
          name:
            - Initial Access
        technique:
          id:
            - T1190
          name:
            - Exploit Public-Facing Application
      compliance:
        pci_dss:
          - '10.2'
        nist_800_53:
          - AU-6

   .. note::

      ``logsource.product`` must match the integration title exactly (``custom-integration``).

   This rule fires when ``event.dataset`` is ``apache-error`` and ``event.outcome`` is ``failure``. These failures can indicate web application issues, unauthorized access attempts, or server misconfigurations.

#. Click **Create rule** to complete the rule creation process.

   .. thumbnail:: /images/manual/data-analysis/security-analytics-create-rule.jpg
      :title: Create a rule
      :alt: Create a rule
      :align: center
      :width: 80%

#. Once the rule is created, it will appear in the **Rules** list.

   .. thumbnail:: /images/manual/data-analysis/security-analytics-rule-list.jpg
      :title: Rules list
      :alt: Rules list
      :align: center
      :width: 80%

Promote the content from the draft to the test space
----------------------------------------------------

In the draft space, you create and refine your integrations, decoders, and rules. Promoting this content to the test space allows you to validate it with the Log test tool before it is introduced into production. Promotion moves the integration along with its associated decoders and rules.

Make sure the space selector reads **Draft**, and follow these steps to promote the content from draft to test.

#. Go to **Ruleset Management** > **Overview**, and click **Actions** > **Promote**.

   .. thumbnail:: /images/manual/data-analysis/security-analytics-promotion.jpg
      :title: Promote the content
      :alt: Promote the content
      :align: center
      :width: 80%

#. Type ``promote`` to confirm, and click **Promote**.

   .. thumbnail:: /images/manual/data-analysis/security-analytics-promotion-confirmation.jpg
      :title: Promotion confirmation
      :alt: Promotion confirmation
      :align: center
      :width: 80%

   .. thumbnail:: /images/manual/data-analysis/security-analytics-promoted.jpg
      :title: Content promoted
      :alt: Content promoted
      :align: center
      :width: 80%

#. After promotion, the integration appears in the **Test** space.

   .. thumbnail:: /images/manual/data-analysis/security-analytics-promoted-list.jpg
      :title: Promoted integration in the Test space
      :alt: Promoted integration in the Test space
      :align: center
      :width: 80%

Validate the content with a log test
------------------------------------

After promoting the integration to the test space, use **Log test** to validate how incoming events are decoded, normalized, and matched against your rules. This helps confirm that the integration behaves as expected before moving to production.

Follow these steps to validate with **Log test**.

#. Go to **Ruleset Management** > **Log test**, and select **Test** in the space selector. Log test opens on the **Standard** space.

#. Under **Detection**, select ``custom-integration`` in **Integration**. Without it, Log test skips detection.

#. Paste the sample Apache log line below into the **Log event** field to see how it is decoded and matched.

   **Sample log event**

   .. code-block:: none

      [Wed Jun 10 12:40:55.444444 2026] [rewrite:error] [pid 1239:tid 140123456794] [client 203.0.113.50:34567] AH00670: Options FollowSymLinks and SymLinksIfOwnerMatch are both off, so the RewriteRule directive is also forbidden

   When decoding succeeds, the **Normalization** section of the **Test Result** shows the decoded event, and the **Detection** section shows the custom rule that matched it.

   .. thumbnail:: /images/manual/data-analysis/security-analytics-logtest-normalization.jpg
      :title: Log test normalization result
      :alt: Log test normalization result
      :align: center
      :width: 80%

   .. thumbnail:: /images/manual/data-analysis/security-analytics-logtest-detection.jpg
      :title: Log test detection result
      :alt: Log test detection result
      :align: center
      :width: 80%

   The processed event should match the JSON shown below. Notice that ``event.outcome`` is ``failure`` and ``event.dataset`` is ``apache-error``, which are the exact conditions this rule is designed to match.

   **Processed JSON event**

   .. code-block:: json
      :emphasize-lines: 13, 18

      {
        "source": {
          "port": 34567,
          "address": "203.0.113.50",
          "ip": "203.0.113.50"
        },
        "event": {
          "original": "[Wed Jun 10 12:40:55.444444 2026] [rewrite:error] [pid 1239:tid 140123456794] [client 203.0.113.50:34567] AH00670: Options FollowSymLinks and SymLinksIfOwnerMatch are both off, so the RewriteRule directive is also forbidden",
          "category": [
            "web"
          ],
          "kind": "event",
          "outcome": "failure",
          "start": "2026-06-10T12:40:55.444Z",
          "type": [
            "error"
          ],
          "dataset": "apache-error"
        },
        "process": {
          "pid": 1239,
          "thread": {
            "id": 140123456794
          }
        },
        "log": {
          "level": "error",
          "logger": "rewrite"
        },
        "message": "AH00670: Options FollowSymLinks and SymLinksIfOwnerMatch are both off, so the RewriteRule directive is also forbidden",
        "wazuh": {
          "protocol": {
            "location": "-",
            "queue": 1
          },
          "integration": {
            "category": "system-activity",
            "decoders": [
              "decoder/core-wazuh-message/0",
              "decoder/apache-error/0"
            ],
            "name": "custom-integration"
          },
          "event": {
            "id": "414a9ceb-86b9-4ecf-b350-f09df927cfae"
          },
          "space": {
            "name": "test"
          }
        },
        "service": {
          "type": "apache"
        },
        "@timestamp": "2026-06-11T19:33:54.235Z"
      }

Promote the content from test to custom
---------------------------------------

After validating your integrations, decoders, and rules in the test space using Log test, you can promote the content to the custom space. This makes your validated detection content available for use in production environments, where the Wazuh data analysis capability can process and analyze incoming events.

Make sure the space selector reads **Test**, then follow these steps to promote the content.

#. Go to **Ruleset Management** > **Overview**.

#. Click **Actions** > **Promote**, type ``promote`` to confirm, and click **Promote**.

   .. thumbnail:: /images/manual/data-analysis/security-analytics-apache-promotion.jpg
      :title: Promote the Apache integration
      :alt: Promote the Apache integration
      :align: center
      :width: 80%

   .. thumbnail:: /images/manual/data-analysis/security-analytics-apache-promotion-confirmation.jpg
      :title: Apache promotion confirmation
      :alt: Apache promotion confirmation
      :align: center
      :width: 80%

#. After promotion the integration becomes active and is used by the Wazuh data analysis capability to process incoming events and trigger findings when rule conditions are met.

   .. note::

      The Wazuh manager loads the custom space on a polling cycle. Events sent within about 2 minutes of the promotion are processed only by the standard policy and don't generate the custom finding.

.. _data_analysis_create_detector:

Create a detector
-----------------

A detector is the scheduled job that executes your rule. It scans indexed events from monitored endpoints at a defined interval, applies the selected rules, and generates findings when matches occur. Creating a detector turns your promoted content into an active and continuous detection.

Follow these steps to create a detector.

#. Go to **Ruleset Management** > **Detection** > **Detectors** > **Create detector**.

   .. thumbnail:: /images/manual/data-analysis/security-analytics-detectors-list.jpg
      :title: Detectors list
      :alt: Detectors list
      :align: center
      :width: 80%

#. Fill the required sections with this information and click **Create detector**.

   -  **Name**: wazuh-apache-detector

   -  **Data source** > **Select indexes/aliases**: ``wazuh-events-v5-system-activity``. Wazuh indexes events in ``wazuh-events-v5-<category>``, using the category of the integration that decoded them. The categories are ``access-management``, ``applications``, ``cloud-services``, ``network-activity``, ``system-activity``, ``security``, ``other`` and ``unclassified``.

   -  **Space**: Custom

   -  **Integration**: custom-integration

   -  **Selected rules**: Apache Failure Detection

   -  **Run every**: 2 minutes

   .. thumbnail:: /images/manual/data-analysis/security-analytics-create-custom-detectors.jpg
      :title: Create a custom detector
      :alt: Create a custom detector
      :align: center
      :width: 80%

   .. thumbnail:: /images/manual/data-analysis/security-analytics-confirm-custom-detectors.jpg
      :title: Confirm the custom detector
      :alt: Confirm the custom detector
      :align: center
      :width: 80%

   Once the detector is created, it appears in the **Detectors** list.

   .. thumbnail:: /images/manual/data-analysis/security-analytics-lists-custom-detectors.jpg
      :title: Custom detectors list
      :alt: Custom detectors list
      :align: center
      :width: 80%

Configure the Wazuh agent to collect the Apache error log
---------------------------------------------------------

The detector only generates findings from events that reach the Wazuh manager. Perform these steps on a Linux endpoint with Apache HTTP Server and the Wazuh agent installed.

#. Append the following configuration to the ``/var/ossec/etc/ossec.conf`` file on the monitored endpoint. The location shown is the Apache error log on Debian and Ubuntu. On Red Hat Enterprise Linux and CentOS Stream, use ``/var/log/httpd/error_log`` instead:

   .. code-block:: xml

      <ossec_config>
        <localfile>
          <log_format>apache</log_format>
          <location>/var/log/apache2/error.log</location>
        </localfile>
      </ossec_config>

#. Restart the Wazuh agent to apply the changes:

   .. include:: /_templates/common/restart_agent.rst

Generate a test event
---------------------

A healthy Apache HTTP Server writes only ``notice`` lines to the error log, which the rule doesn't match. Append the sample log line to the Apache error log on the monitored endpoint to generate an event:

.. code-block:: console

   # echo '[Wed Jun 10 12:40:55.444444 2026] [rewrite:error] [pid 1239:tid 140123456794] [client 203.0.113.50:34567] AH00670: Options FollowSymLinks and SymLinksIfOwnerMatch are both off, so the RewriteRule directive is also forbidden' >> /var/log/apache2/error.log

The finding appears after the detector's next run, about 2 minutes later.

View findings on the Wazuh dashboard
------------------------------------

A finding is a security record generated when an event matches a detection rule during normal processing by the Wazuh detection engine. Findings are indexed and displayed in the Wazuh dashboard for investigation and analysis. Follow these steps to view findings on the Wazuh dashboard.

#. Go to **Threat intelligence** > **Threat Hunting** > **Findings**.

#. In the image below, you see the findings generated from the events.

   .. thumbnail:: /images/manual/data-analysis/wazuh-dashboard-findings.jpg
      :title: Findings on the Wazuh dashboard
      :alt: Findings on the Wazuh dashboard
      :align: center
      :width: 80%

#. Expand the finding to see more information about the event.

   .. thumbnail:: /images/manual/data-analysis/wazuh-dashboard-expand-findings.jpg
      :title: Expanded finding on the Wazuh dashboard
      :alt: Expanded finding on the Wazuh dashboard
      :align: center
      :width: 80%

A single finding contains the complete enriched record, including the matched rule with its MITRE ATT&CK and compliance mappings, the originating agent and host, the source address, and the original log line. An example is shown below.

**Example finding (expanded)**

.. code-block:: json

   {
     "_index": ".ds-wazuh-findings-v5-system-activity-000001",
     "_id": "YANRuJ4BbNtri9_jjU2Q",
     "_score": null,
     "_source": {
       "process": {
         "pid": 1239,
         "thread": {
           "id": 130120416294
         }
       },
       "@timestamp": "2026-06-11T20:13:28.889318808Z",
       "log": {
         "level": "error",
         "logger": "rewrite"
       },
       "service": {
         "type": "apache"
       },
       "wazuh": {
         "cluster": {
           "node": "node01",
           "name": "wazuh"
         },
         "protocol": {
           "location": "/var/log/apache2/error.log",
           "queue": 49
         },
         "agent": {
           "host": {
             "hostname": "localhost.localdomain",
             "os": {
               "name": "CentOS Stream",
               "type": "linux",
               "version": "9",
               "platform": "centos"
             },
             "architecture": "x86_64"
           },
           "name": "localhost.localdomain",
           "groups": [
             "default"
           ],
           "id": "001",
           "version": "v5.0.0"
         },
         "integration": {
           "name": "custom-integration",
           "decoders": [
             "decoder/core-wazuh-message/0",
             "decoder/apache-error/0"
           ],
           "category": "system-activity"
         },
         "rule": {
           "sigma_id": "d78bd034-8838-4f85-b471-5e8c9a0daf18",
           "level": "medium",
           "compliance": {
             "pci_dss": [
               "10.2"
             ],
             "nist_800_53": [
               "AU-6"
             ]
           },
           "mitre": {
             "technique": {
               "id": [
                 "T1190"
               ],
               "name": [
                 "Exploit Public-Facing Application"
               ]
             },
             "tactic": {
               "id": [
                 "TA0001"
               ],
               "name": [
                 "Initial Access"
               ]
             }
           },
           "id": "d78bd034-8838-4f85-b471-5e8c9a0daf18",
           "title": "Apache Failure Detection",
           "tags": [
             "medium",
             "custom-integration",
             "attack.initial-access",
             "attack.t1190"
           ],
           "status": "experimental"
         },
         "event": {
           "id": "4b72124c-f85c-4510-b069-d79831021fbf"
         },
         "space": {
           "name": "custom"
         }
       },
       "source": {
         "address": "203.0.113.50",
         "port": 54567,
         "ip": "203.0.113.50"
       },
       "event": {
         "ingested": "2026-06-11T20:12:45.559Z",
         "original": "[Wed Jun 10 12:40:55.444444 2026] [rewrite:error] [pid 1239:tid 130120416294] [client 203.0.113.50:54567] AH00670: Options FollowSymLinks and SymLinksIfOwnerMatch are both off, so the RewriteRule directive is also forbidden",
         "kind": "event",
         "start": "2026-06-10T12:40:55.444Z",
         "index": ".ds-wazuh-events-v5-system-activity-000001",
         "category": [
           "web"
         ],
         "type": [
           "error"
         ],
         "dataset": "apache-error",
         "doc_id": "UgNRuJ4BbNtri9_jBk3H",
         "outcome": "failure"
       },
       "message": "AH00670: Options FollowSymLinks and SymLinksIfOwnerMatch are both off, so the RewriteRule directive is also forbidden"
     },
     "fields": {
       "event.start": [
         "2026-06-10T12:40:55.444Z"
       ],
       "event.ingested": [
         "2026-06-11T20:12:45.559Z"
       ],
       "@timestamp": [
         "2026-06-11T20:13:28.889Z"
       ]
     },
     "sort": [
       1781208808889
     ]
   }

This completes the workflow. You have created custom detection content, validated it, promoted it to production, and verified that it generates findings in the dashboard.
