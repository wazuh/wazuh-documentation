.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Wazuh uses Sigma rules to detect suspicious and malicious activity in the Security Analytics module. Find more information in this section of the documentation.

Wazuh Sigma rules
=================

The Security Analytics module uses Sigma rules to detect suspicious and malicious activity. Sigma is an open standard for describing log-based detection logic in a platform-independent format.

Wazuh supports Sigma rules through the Content Manager and evaluates them using Security Analytics detectors. When an event matches a Sigma rule, the Security Analytics module generates a finding that can be reviewed and investigated in the Wazuh dashboard.

A Sigma rule defines:

-  Detection logic used to identify matching events.
-  Log source information describing the target data source.
-  Metadata such as title, description, author, and references.
-  MITRE ATT&CK mappings.
-  Compliance framework mappings.

Security Analytics supports both pre-packaged Sigma rules and custom Sigma rules created by users.

When a detector is created, it can reference either Standard rules or Custom rules. A detector cannot reference both rule types simultaneously.

Rule structure
--------------

The Wazuh Sigma rule consists of the following components:

+--------------+---------------------------------------------------------------------------------------------------+
| Component    | Description                                                                                       |
+==============+===================================================================================================+
| Metadata     | Provides rule information such as title, description, author, dates, and severity level.          |
+--------------+---------------------------------------------------------------------------------------------------+
| Log source   | Defines the data source targeted by the rule.                                                     |
+--------------+---------------------------------------------------------------------------------------------------+
| Detection    | Contains the rule's matching logic used to identify events (selection, keywords, and conditions). |
+--------------+---------------------------------------------------------------------------------------------------+
| MITRE ATT&CK | Maps detections to ATT&CK tactics, techniques, and sub-techniques.                                |
+--------------+---------------------------------------------------------------------------------------------------+
| Compliance   | Maps detections to supported compliance frameworks (GDPR, PCI DSS, NIST 800-53, etc.).            |
+--------------+---------------------------------------------------------------------------------------------------+

The following example shows a complete Sigma rule, using all supported blocks:

.. code-block:: yaml

   metadata:
     title: Python SQL Exceptions
     author: Thomas Patzke
     description: Detects SQL exceptions in Python applications according to PEP 249.
   sigma_id: 19aefed0-ffd4-47dc-a7fc-f8b1425e84f9
   status: stable
   level: medium
   enabled: true
   tags:
     - attack.initial-access
     - attack.t1190
   logsource:
     category: application
     product: python
   detection:
     keywords:
       - DataError
       - IntegrityError
       - ProgrammingError
       - OperationalError
     condition: keywords
   falsepositives:
     - Application bugs
   mitre:
     tactic:
       - TA0001
     technique:
       - T1190
     subtechnique: []
   compliance:
     pci_dss:
       - "6.5.1"
     gdpr:
       - Art. 32

Required fields
---------------

The following fields are required for all Sigma rules:

+---------------+--------+---------------------------------------------------------------------------------------------------------+
| Field         | Type   | Description                                                                                             |
+===============+========+=========================================================================================================+
| ``sigma_id``  | String | Original Sigma rule identifier. Preserved when importing rules from external Sigma repositories.        |
+---------------+--------+---------------------------------------------------------------------------------------------------------+
| ``status``    | String | Rule maturity level. Supported values are ``experimental``, ``test``, and ``stable``.                   |
+---------------+--------+---------------------------------------------------------------------------------------------------------+
| ``level``     | String | Rule severity. Supported values are ``informational``, ``low``, ``medium``, ``high``, and ``critical``. |
+---------------+--------+---------------------------------------------------------------------------------------------------------+
| ``metadata``  | Object | Rule metadata, including the rule title.                                                                |
+---------------+--------+---------------------------------------------------------------------------------------------------------+
| ``logsource`` | Object | Target log source definition.                                                                           |
+---------------+--------+---------------------------------------------------------------------------------------------------------+
| ``detection`` | Object | Rule detection logic.                                                                                   |
+---------------+--------+---------------------------------------------------------------------------------------------------------+

Rules that do not contain the required fields fail validation and cannot be added to the rule catalog.

Optional fields
---------------

In addition to the required fields, Sigma rules support several optional fields that provide additional context, threat intelligence mappings, and compliance information.

+--------------------+---------+------------------------------------------------------------------------------+
| Field              | Type    | Description                                                                  |
+====================+=========+==============================================================================+
| ``id``             | String  | Unique rule identifier.                                                      |
+--------------------+---------+------------------------------------------------------------------------------+
| ``enabled``        | Boolean | Enables or disables the rule. Disabled rules are not evaluated by detectors. |
+--------------------+---------+------------------------------------------------------------------------------+
| ``tags``           | Array   | Categorization tags used for grouping, filtering, and threat classification. |
+--------------------+---------+------------------------------------------------------------------------------+
| ``falsepositives`` | Array   | Known sources of legitimate activity that may trigger the rule.              |
+--------------------+---------+------------------------------------------------------------------------------+
| ``mitre``          | Object  | Maps the rule to MITRE ATT&CK tactics, techniques, and sub-techniques.       |
+--------------------+---------+------------------------------------------------------------------------------+
| ``compliance``     | Object  | Maps the rule to the supported compliance frameworks and controls.           |
+--------------------+---------+------------------------------------------------------------------------------+

Detection logic
---------------

The detection section defines the conditions that must be met for a rule to generate a finding. A detection must contain:

-  At least one selection or keyword list.
-  A condition statement that references those selections.

**Example:**

.. code-block:: yaml

   detection:
     selection:
       process.name: powershell.exe
       command_line|contains: "-enc"
     condition: selection

Multiple selections can be combined using boolean operators.

.. code-block:: yaml

   detection:
     sel_process:
       process.name: powershell.exe
     sel_command:
       command_line|contains: "-enc"
     condition: sel_process and sel_command

The following operators are supported:

+----------+------------------------------------+
| Operator | Description                        |
+==========+====================================+
| ``and``  | All conditions must match.         |
+----------+------------------------------------+
| ``or``   | At least one condition must match. |
+----------+------------------------------------+
| ``not``  | Excludes matching conditions.      |
+----------+------------------------------------+
| ``( )``  | Groups expressions.                |
+----------+------------------------------------+

Field validation
----------------

All fields referenced in the detection section are validated against the Wazuh Common Schema (WCS).

Rules that reference unsupported or unknown fields are rejected during validation. This prevents rules from being deployed against fields that do not exist in normalized events.

Rule metadata
-------------

Metadata provides contextual information used during investigation and reporting. The metadata section supports information such as:

-  Rule title
-  Description
-  Author
-  References
-  Documentation links
-  Supported platforms

The rule title is displayed in findings and alerts generated by Security Analytics.

MITRE ATT&CK mapping
--------------------

Sigma rules can include MITRE ATT&CK mappings to provide threat context for generated findings.

The MITRE section supports:

-  Tactics
-  Techniques
-  Sub-techniques

These mappings are displayed in Security Analytics findings and can be used for threat hunting and reporting activities.

Compliance mapping
------------------

Rules can be mapped to supported compliance frameworks. Supported frameworks include:

-  PCI DSS
-  GDPR
-  HIPAA
-  NIST 800-53
-  NIST 800-171
-  ISO 27001
-  CMMC
-  FedRAMP
-  NIS2
-  TSC

Compliance mappings are included in enriched findings and can be used to support compliance reporting requirements.

Dynamic field references
------------------------

Wazuh extends the Sigma specification by allowing selected metadata fields to reference values from the triggering event. Dynamic references use the ``{{ field.path }}`` syntax.

**For example:**

.. code-block:: yaml

   metadata:
     title: "Suspicious activity detected on agent {{ wazuh.agent.id }}"

When a finding is generated, the placeholder is replaced with the corresponding value from the event. Dynamic references are supported in:

-  Rule titles
-  Tags
-  MITRE mappings
-  Compliance mappings

This capability enables findings to include event-specific context without requiring separate rules for different assets or environments. Dynamic field references affect only enriched findings stored in the ``wazuh-findings-v5-*`` indices, while the original Sigma rule remains unchanged.

Rule lifecycle
--------------

Rules can exist in one of the following states:

+------------------+---------------------------------------+
| Status           | Description                           |
+==================+=======================================+
| ``experimental`` | Initial development or testing stage. |
+------------------+---------------------------------------+
| ``test``         | Validated but still under evaluation. |
+------------------+---------------------------------------+
| ``stable``       | Production-ready rule.                |
+------------------+---------------------------------------+

Rules can also be enabled or disabled without being removed from the rule catalog. Disabled rules remain available for management and editing, but are not evaluated by detectors.

Detector integration
--------------------

Detectors evaluate events against assigned Sigma rules and generate findings when matches occur. A detector can reference:

-  Standard rules, or
-  Custom rules

A detector cannot use both rule types simultaneously. Each detector supports a maximum of 100 Sigma rules.

.. note::

   Rule changes take effect the next time the detector evaluates matching events. Existing findings are not modified when a rule is updated.
