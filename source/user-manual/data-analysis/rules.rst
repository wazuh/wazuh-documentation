.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Wazuh rules define the detection logic used to identify security activity in normalized events. Learn how to write Sigma-format rules in this section.

.. _data_analysis_rules:

Rules
=====

Wazuh rules define the detection logic used to identify relevant security activity in normalized events. They describe what should be detected by specifying conditions on event fields. Rules are written in `Sigma <https://sigmahq.io/>`__ format with Wazuh-specific extensions for metadata, MITRE ATT&CK mapping, compliance mapping, and dynamic placeholders.

Top-level fields
----------------

A valid rule must define top-level identifiers, a ``detection`` block, a ``logsource``, and a ``metadata`` section, and can optionally add MITRE ATT&CK and compliance mappings.

The following table lists all supported top-level fields in a Wazuh Sigma rule. Fields marked as required must be present for the rule to pass validation.

+--------------------+-----------+------------+--------------------------------------------------------+
| Field              | Type      | Required   | Description                                            |
+====================+===========+============+========================================================+
| ``id``             | String    | Yes        | Globally unique rule identifier (UUIDv4 recommended)   |
+--------------------+-----------+------------+--------------------------------------------------------+
| ``status``         | String    | Yes        | Rule maturity status: ``experimental``, ``test``, or   |
|                    |           |            | ``stable``                                             |
+--------------------+-----------+------------+--------------------------------------------------------+
| ``level``          | String    | Yes        | Findings severity: ``informational``, ``low``,         |
|                    |           |            | ``medium``, ``high``, or ``critical``                  |
+--------------------+-----------+------------+--------------------------------------------------------+
| ``detection``      | Object    | Yes        | Detection logic: selections, keywords, and conditions  |
+--------------------+-----------+------------+--------------------------------------------------------+
| ``logsource``      | Object    | Yes        | Classifies the type of log data the rule targets       |
+--------------------+-----------+------------+--------------------------------------------------------+
| ``metadata``       | Object    | Yes        | Authorship and lifecycle information                   |
+--------------------+-----------+------------+--------------------------------------------------------+
| ``sigma_id``       | String    | No         | Original Sigma rule identifier (UUID), preserved when  |
|                    |           |            | importing from upstream                                |
+--------------------+-----------+------------+--------------------------------------------------------+
| ``enabled``        | Boolean   | No         | Whether the rule is active (default: ``true``)         |
+--------------------+-----------+------------+--------------------------------------------------------+
| ``tags``           | Array     | No         | Categorization tags (e.g., ``attack.initial-access``)  |
+--------------------+-----------+------------+--------------------------------------------------------+
| ``falsepositives`` | Array     | No         | Known sources of false positives                       |
+--------------------+-----------+------------+--------------------------------------------------------+
| ``mitre``          | Object    | No         | MITRE ATT&CK threat intelligence mapping               |
+--------------------+-----------+------------+--------------------------------------------------------+
| ``compliance``     | Object    | No         | Compliance framework mapping                           |
+--------------------+-----------+------------+--------------------------------------------------------+

Wazuh rule sample
-----------------

The following example demonstrates a complete Wazuh detection rule using all supported blocks:

.. code-block:: yaml

   metadata:
     title: Python SQL Exceptions
     author: Thomas Patzke
     description: Detects SQL exceptions in Python applications according to PEP 249.
   id: 9c1c1e3f-21ad-4db0-9bb4-5cf2e9c1b901
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

.. note::

   For the full Sigma standard, see the `Sigma Rules Specification <https://github.com/SigmaHQ/sigma-specification/blob/main/specification/sigma-rules-specification.md>`__.

Components of Wazuh rules
-------------------------

A Wazuh Sigma rule is composed of the following blocks:

**Required**

-  :ref:`Detection <data_analysis_rules_detection>`

-  :ref:`Log source <data_analysis_rules_logsource>`

-  :ref:`Metadata <data_analysis_rules_metadata>`

**Optional**

-  :ref:`MITRE ATT&CK <data_analysis_rules_mitre>`

-  :ref:`Compliance <data_analysis_rules_compliance>`

.. _data_analysis_rules_detection:

Detection
---------

The ``detection`` block defines when a rule matches an event. It tells the detection engine what to look for in an event and how to combine those checks into a final match decision. It consists of one or more named selections (or keywords) and a condition that combines them using Boolean logic.

Every detection block has two required parts:

-  **Condition**: A condition field wires the selections together using Boolean logic (and, or, not) to produce a true/false result for each incoming event.

-  **Selection**: One or more named selections (or a keyword list) that define the conditions to check.

Example:

.. code-block:: yaml

   detection:
     condition: selection
     selection:
       event.action: account-locked
       event.category|contains: authentication

.. warning::

   All fields referenced in the ``detection`` block are validated against the Wazuh Common Schema (WCS). If a field name does not exist in the schema, the detection engine rejects the rule with a structured error identifying the offending field. This prevents rules that appear active but never match because they query a non-existent field.

Selections
^^^^^^^^^^

A selection is a named object whose keys correspond to existing WCS fields and whose values define the matching criteria. A selection matches when any or all of its field conditions are satisfied, depending on the chosen syntax.

There are two ways to write a selection, depending on whether you want any condition to match or all of them to match:

+-------------------------------------+--------------------------------------------------+----------------------------------------+
| Syntax                              | How it matches                                   | Example                                |
+=====================================+==================================================+========================================+
| **Field list (implicit OR)**        | When you assign a list of values to a single     | .. code-block:: yaml                   |
|                                     | field, the selection matches if the field equals |                                        |
|                                     | any value in the list. This is the "match one of |    detection:                          |
|                                     | these" pattern. This rule matches when           |      selection:                        |
|                                     | ``event.action`` is either "``login_failed``" or |        event.action:                   |
|                                     | "``authentication_error``".                      |          - login_failed # or           |
|                                     |                                                  |          - authentication_error        |
|                                     |                                                  |      condition: selection              |
+-------------------------------------+--------------------------------------------------+----------------------------------------+
| **Field dictionary (implicit AND)** | When you assign multiple fields within a single  | .. code-block:: yaml                   |
|                                     | selection, the selection matches only when all   |                                        |
|                                     | field conditions are satisfied simultaneously.   |    detection:                          |
|                                     | This is the "match all of these together"        |      selection:                        |
|                                     | pattern. This rule matches when ``log.level`` is |        log.level: ERROR # and          |
|                                     | "``ERROR``" and ``event.kind`` is "``event``".   |        event.kind: event               |
|                                     | Both conditions must hold simultaneously.        |      condition: selection              |
+-------------------------------------+--------------------------------------------------+----------------------------------------+

Keywords (implicit OR)
^^^^^^^^^^^^^^^^^^^^^^^

Keyword detection performs value-only searches across all event fields without specifying a target field name.

Use ``keywords`` to search for a value anywhere in an event, without targeting a specific field. The detection engine scans all fields and matches if any of them contain the specified string.

Example:

.. code-block:: yaml

   detection:
     keywords:
       - DataError # or
       - IntegrityError
       - OperationalError
     condition: keywords

Each item in the above list is effectively separated by a logical "OR" operator, meaning that the rule will match if any of the specified keywords are found in any field of the event.

Use keywords for broad, field-agnostic detection (e.g., scanning log messages for error strings when the field name varies by integration). Use named selections when you know exactly which field to target; selections are more precise and less likely to produce false positives.

Conditions
^^^^^^^^^^

The ``condition`` field is a string expression that combines named selections using boolean logic to define when the rule triggers. Each identifier in the condition must correspond to a named selection defined in the same ``detection`` object.

.. code-block:: yaml

   condition: (selection_one or selection_two) and not filter

+--------------+----------------------------------------+----------------------------------------------------------+
| Operator     | Description                            | Example                                                  |
+==============+========================================+==========================================================+
| ``and``      | Both operands must match               | .. code-block:: yaml                                     |
|              |                                        |                                                          |
|              |                                        |    detection:                                            |
|              |                                        |      sel_severity:                                       |
|              |                                        |        event.severity|gte: 8                             |
|              |                                        |      sel_message:                                        |
|              |                                        |        message|contains: fatal                           |
|              |                                        |      condition: sel_severity and sel_message             |
+--------------+----------------------------------------+----------------------------------------------------------+
| ``or``       | At least one operand must match        | .. code-block:: yaml                                     |
|              |                                        |                                                          |
|              |                                        |    detection:                                            |
|              |                                        |      sel_error:                                          |
|              |                                        |        log.level: ERROR                                  |
|              |                                        |      sel_warn:                                           |
|              |                                        |        log.level: WARN                                   |
|              |                                        |      condition: sel_error or sel_warn                    |
+--------------+----------------------------------------+----------------------------------------------------------+
| ``not``      | Fires on matching events, but excludes | .. code-block:: yaml                                     |
|              | any event generated by a thread whose  |                                                          |
|              | name starts with ``Test``. This is the |    detection:                                            |
|              | standard pattern for reducing false    |      selection:                                          |
|              | positives.                             |        event.kind: event                                 |
|              |                                        |      filter:                                             |
|              |                                        |        process.thread.name|startswith: Test              |
|              |                                        |      condition: selection and not filter                 |
+--------------+----------------------------------------+----------------------------------------------------------+
| ``brackets`` | Allows for the grouping of different   | .. code-block:: yaml                                     |
|              | operations                             |                                                          |
|              |                                        |    detection:                                            |
|              |                                        |      sel_high:                                           |
|              |                                        |        event.severity|gte: 8                             |
|              |                                        |      sel_critical:                                       |
|              |                                        |        log.level: CRITICAL                               |
|              |                                        |      filter:                                             |
|              |                                        |        process.name: monitor                             |
|              |                                        |      condition: (sel_high or sel_critical) and not filter|
+--------------+----------------------------------------+----------------------------------------------------------+

See `Sigma Conditions <https://sigmahq.io/docs/basics/conditions.html>`__ for the full specification of condition syntax.

Modifiers
^^^^^^^^^

Modifiers change how a field's value is compared. They are appended to the field name with the pipe character (``|``) and can be chained; each modifier in the chain further transforms the comparison.

.. code-block:: yaml

   field_name|modifier: value

Multiple modifiers can be chained: ``field|modifier1|modifier2: value``.

+------------------+----------------------------------------------------------+-------------------------------------------------------------+
| Modifier         | What it does                                             | Example                                                     |
+==================+==========================================================+=============================================================+
| ``contains``     | Matches if the field value contains a specified string.  | ``message|contains: timeout``                               |
|                  | Wildcards are inserted around the value.                 |                                                             |
+------------------+----------------------------------------------------------+-------------------------------------------------------------+
| ``startswith``   | Matches when the field value begins with the specified   | ``process.thread.name|startswith: Gossip``                  |
|                  | string. A wildcard is inserted at the end of the value.  |                                                             |
+------------------+----------------------------------------------------------+-------------------------------------------------------------+
| ``endswith``     | Matches when the field value ends with the specified     | ``process.thread.name|endswith: "-5"``                      |
|                  | string. A wildcard is inserted at the beginning of the   |                                                             |
|                  | value.                                                   |                                                             |
+------------------+----------------------------------------------------------+-------------------------------------------------------------+
| ``base64``       | Encodes the provided value as a Base64 string before     | ``process.command_line|base64: "/bin/bash"``                |
|                  | comparison. Used to detect commands or parameters that   |                                                             |
|                  | an attacker has Base64-encoded to evade plain-text       |                                                             |
|                  | detection.                                               |                                                             |
+------------------+----------------------------------------------------------+-------------------------------------------------------------+
| ``base64offset`` | Generates all three possible Base64 offsets of the value | ``process.command_line|base64offset|contains: "/bin/bash"`` |
|                  | to account for the byte position where it might appear   |                                                             |
|                  | inside a larger Base64-encoded blob. Usually preferred   |                                                             |
|                  | over ``base64`` when matching a substring inside an      |                                                             |
|                  | encoded stream, and typically chained with ``contains``. |                                                             |
+------------------+----------------------------------------------------------+-------------------------------------------------------------+
| ``wide``         | Transforms the value to a UTF-16 (wide-character) byte   | ``process.command_line|wide|base64offset|contains: "ping"`` |
|                  | sequence before comparison. Must be chained with an      |                                                             |
|                  | encoding modifier such as ``base64`` or                  |                                                             |
|                  | ``base64offset``. It cannot be the final modifier in the |                                                             |
|                  | chain because the intermediate representation contains   |                                                             |
|                  | null bytes.                                              |                                                             |
+------------------+----------------------------------------------------------+-------------------------------------------------------------+
| ``windash``      | Expands command-line flag prefixes to match all Windows  | ``process.command_line|windash|contains: " -enc "``         |
|                  | dash variants: ``-``, ``/``, ``–`` (en dash), ``—`` (em  |                                                             |
|                  | dash), and ``―`` (horizontal bar). Useful for detecting  |                                                             |
|                  | invocations where attackers swap dash characters to      |                                                             |
|                  | evade signatures.                                        |                                                             |
+------------------+----------------------------------------------------------+-------------------------------------------------------------+
| ``re``           | Matches against a PCRE regular expression. Submodifiers  | ``process.thread.name|re: "^Repair"``                       |
|                  | can be chained with ``re|<flag>``:                       |                                                             |
|                  |                                                          |                                                             |
|                  | - ``i``: case-insensitive matching.                      |                                                             |
|                  | - ``m``: multi-line mode (``^``/``$`` match the          |                                                             |
|                  |   start/end of each line).                               |                                                             |
|                  | - ``s``: single-line mode (``.`` also matches newline    |                                                             |
|                  |   characters).                                           |                                                             |
+------------------+----------------------------------------------------------+-------------------------------------------------------------+
| ``cidr``         | Matches when the field value (an IPv4 or IPv6 address)   | ``source.ip|cidr: 10.42.0.0/16``                            |
|                  | falls within the specified CIDR subnet. IPv6 addresses   |                                                             |
|                  | are supported in the following formats:                  |                                                             |
|                  |                                                          |                                                             |
|                  | - Standard: full 8-group notation with leading zeros,    |                                                             |
|                  |   for example                                            |                                                             |
|                  |   ``2001:0db8:85a3:0000:0000:8a2e:0370:7334``.           |                                                             |
|                  | - Compressed: zero-compression using ``::`` to omit      |                                                             |
|                  |   consecutive zero groups, for example                   |                                                             |
|                  |   ``2001:db8:85a3::8a2e:370:7334``.                      |                                                             |
|                  | - CIDR: subnet notation with a prefix length, for        |                                                             |
|                  |   example ``2001:db8::/32``.                             |                                                             |
+------------------+----------------------------------------------------------+-------------------------------------------------------------+
| ``exists``       | Checks whether the field is present in the event. The    | ``source.ip|exists: true``                                  |
|                  | value must be ``true`` (field must exist) or ``false``   |                                                             |
|                  | (field must be absent).                                  |                                                             |
+------------------+----------------------------------------------------------+-------------------------------------------------------------+
| ``all``          | By default, list values are combined with ``OR``. The    | .. code-block:: yaml                                        |
|                  | ``all`` modifier changes the logic to ``AND``, requiring |                                                             |
|                  | every value in the list to match. Cannot be applied to   |    event.category|contains|all:                             |
|                  | single-item lists.                                       |      - authentication                                       |
|                  |                                                          |      - failure                                              |
+------------------+----------------------------------------------------------+-------------------------------------------------------------+
| ``lt``           | Matches when the field value is less than the specified  | ``event.severity|lt: 10``                                   |
|                  | number.                                                  |                                                             |
+------------------+----------------------------------------------------------+-------------------------------------------------------------+
| ``lte``          | Matches when the field value is less than or equal to    | ``event.severity|lte: 3``                                   |
|                  | the specified number.                                    |                                                             |
+------------------+----------------------------------------------------------+-------------------------------------------------------------+
| ``gt``           | Matches when the field value is greater than the         | ``event.severity|gt: 7``                                    |
|                  | specified number.                                        |                                                             |
+------------------+----------------------------------------------------------+-------------------------------------------------------------+
| ``gte``          | Matches when the field value is greater than or equal to | ``event.duration|gte: 5000``                                |
|                  | the specified number.                                    |                                                             |
+------------------+----------------------------------------------------------+-------------------------------------------------------------+

See `Sigma Modifiers <https://sigmahq.io/docs/basics/modifiers.html>`__ for additional context on value transformation modifiers.

.. _data_analysis_rules_logsource:

Log source
----------

The ``logsource`` block specifies the type of log data the rule applies to. It tells Wazuh which integration owns the rule and helps organize rules by platform, log type, and service, making it easier to find, filter, and audit your rule library.

The ``logsource`` block does not directly affect detection matching. The ``detection`` block determines whether an event triggers the rule. ``logsource`` is metadata that ties the rule to an integration and organizes it within the Content Manager.

.. code-block:: yaml

   logsource:
     product: linux
     category: authentication
     service: sshd
     definition: Ensure sshd authentication logs are collected via the Wazuh Linux integration.

The ``logsource`` block has one required field and three optional fields. ``product`` is required; every rule must declare the platform or integration it targets. The ``category``, ``service``, and ``definition`` fields are optional and can be added to narrow scope, improve grouping, or document prerequisites, but the rule will validate without them.

+----------------+----------+----------------------------------------+-------------------------------------------------------+
| Field          | Required | Description                            | Example                                               |
+================+==========+========================================+=======================================================+
| ``product``    | yes      | The product or platform generating the | .. code-block:: yaml                                  |
|                |          | log (for example, ``linux``,           |                                                       |
|                |          | ``windows``, ``python``). Must hold    |    logsource:                                         |
|                |          | the same value as ``metadata.title``   |      product: linux                                   |
|                |          | from the integration it belongs to.    |                                                       |
+----------------+----------+----------------------------------------+-------------------------------------------------------+
| ``category``   | no       | A broad classification of the log type | .. code-block:: yaml                                  |
|                |          | within the product (for example,       |                                                       |
|                |          | ``authentication``,                    |    logsource:                                         |
|                |          | ``process_creation``, ``application``, |      category: authentication                         |
|                |          | ``webserver``, ``firewall``). Useful   |                                                       |
|                |          | for grouping related rules across      |                                                       |
|                |          | products.                              |                                                       |
+----------------+----------+----------------------------------------+-------------------------------------------------------+
| ``service``    | no       | The specific service, daemon, or log   | .. code-block:: yaml                                  |
|                |          | channel within the product (e.g.,      |                                                       |
|                |          | ``sshd``, ``security``, ``syslog``,    |    logsource:                                         |
|                |          | ``kerberos``). Use this when the log   |      service: sshd                                    |
|                |          | can be attributed to a particular      |                                                       |
|                |          | subsystem or event channel.            |                                                       |
+----------------+----------+----------------------------------------+-------------------------------------------------------+
| ``definition`` | no       | Free-form notes describing onboarding  | .. code-block:: yaml                                  |
|                |          | requirements or prerequisites for the  |                                                       |
|                |          | log source. For example, audit         |    logsource:                                         |
|                |          | policies that must be enabled, agent   |      definition: Script Block Logging must be enabled |
|                |          | configuration needed, or specific      |                                                       |
|                |          | event IDs to collect.                  |                                                       |
+----------------+----------+----------------------------------------+-------------------------------------------------------+

See `Sigma Log Sources <https://sigmahq.io/docs/basics/log-sources.html>`__ for general guidance on log source classification, including the standard combinations of ``product``, ``category``, and ``service``.

.. _data_analysis_rules_metadata:

Metadata
--------

The ``metadata`` block captures authorship, lifecycle, and descriptive information about the rule. It is separate from detection logic; nothing in ``metadata`` affects whether a rule fires. Its purpose is to make rules discoverable, attributable, and useful to analysts when a finding appears.

+-------------------+----------+----------------------------------+---------------------------------------------------------------------------+
| Field             | Required | Description                      | Example                                                                   |
+===================+==========+==================================+===========================================================================+
| ``title``         | Yes      | A human-readable rule title is   | ``title: Suspicious SSH Login from IPv6``                                 |
|                   |          | shown in alerts and the rule     |                                                                           |
|                   |          | catalog. Keep titles short and   |                                                                           |
|                   |          | avoid prefixes like "Detects     |                                                                           |
|                   |          | when…" or "This rule will…".     |                                                                           |
+-------------------+----------+----------------------------------+---------------------------------------------------------------------------+
| ``author``        | No       | The author of the rule.          | ``author: Security Operations <secops@example.com>``                      |
|                   |          | Free-form text; may include      |                                                                           |
|                   |          | contact information such as an   |                                                                           |
|                   |          | email address or handle.         |                                                                           |
+-------------------+----------+----------------------------------+---------------------------------------------------------------------------+
| ``date``          | No       | Creation date in ISO 8601 format | ``date: "2026-06-10"``                                                    |
|                   |          | (``YYYY-MM-DD``). Auto-managed   |                                                                           |
|                   |          | when the rule is first           |                                                                           |
|                   |          | registered.                      |                                                                           |
+-------------------+----------+----------------------------------+---------------------------------------------------------------------------+
| ``modified``      | No       | Last modification date in ISO    | ``modified: "2026-06-10"``                                                |
|                   |          | 8601 format (``YYYY-MM-DD``).    |                                                                           |
|                   |          | Auto-managed when the rule's     |                                                                           |
|                   |          | content changes.                 |                                                                           |
+-------------------+----------+----------------------------------+---------------------------------------------------------------------------+
| ``description``   | No       | Brief explanation of what the    | ``description: Detects SSH login attempts from blocklisted IPv6 ranges.`` |
|                   |          | rule detects and the context in  |                                                                           |
|                   |          | which it is useful.              |                                                                           |
+-------------------+----------+----------------------------------+---------------------------------------------------------------------------+
| ``references``    | No       | URLs or plain-text references    | ``references: - https://example.com/advisory/2026-001``                   |
|                   |          | (e.g., advisories, CVE IDs, blog |                                                                           |
|                   |          | posts) that explain the          |                                                                           |
|                   |          | motivation for the rule.         |                                                                           |
+-------------------+----------+----------------------------------+---------------------------------------------------------------------------+
| ``documentation`` | No       | Free-form text or a URL          | ``documentation: https://internal.wiki/wazuh/rules/ssh-ipv6``             |
|                   |          | providing additional triage      |                                                                           |
|                   |          | context for analysts             |                                                                           |
|                   |          | investigating a finding.         |                                                                           |
+-------------------+----------+----------------------------------+---------------------------------------------------------------------------+
| ``supports``      | No       | List of platforms or products    | ``supports: - linux``                                                     |
|                   |          | the rule is intended to operate  |                                                                           |
|                   |          | on.                              |                                                                           |
+-------------------+----------+----------------------------------+---------------------------------------------------------------------------+

.. _data_analysis_rules_mitre:

MITRE ATT&CK
------------

The ``mitre`` block maps a rule to MITRE ATT&CK tactics, techniques, and subtechniques. Each field is an array of ID strings:

+------------------+----------------------------------------------------+-------------------------------+
| Field            | Description                                        | Example                       |
+==================+====================================================+===============================+
| ``tactic``       | MITRE ATT&CK tactic IDs. An array of one or more   | ``tactic: - TA0002``          |
|                  | tactic identifiers.                                |                               |
+------------------+----------------------------------------------------+-------------------------------+
| ``technique``    | MITRE ATT&CK technique IDs. An array of one or     | ``technique: - T1059``        |
|                  | more technique identifiers.                        |                               |
+------------------+----------------------------------------------------+-------------------------------+
| ``subtechnique`` | MITRE ATT&CK subtechnique IDs. An array of one or  | ``subtechnique: - T1059.001`` |
|                  | more subtechnique identifiers. Use an empty array  |                               |
|                  | ``[]`` if no subtechnique applies.                 |                               |
+------------------+----------------------------------------------------+-------------------------------+

.. _data_analysis_rules_compliance:

Compliance
----------

The ``compliance`` block maps a rule to one or more compliance frameworks. Each key is a normalized framework identifier, and its value is an array of requirement ID strings.

+------------------+--------------+------------------------------+
| Framework Key    | Full Name    | Example                      |
+==================+==============+==============================+
| ``gdpr``         | GDPR         | .. code-block:: yaml         |
|                  |              |                              |
|                  |              |    gdpr:                     |
|                  |              |      - Art. 32               |
|                  |              |      - Art. 25               |
+------------------+--------------+------------------------------+
| ``pci_dss``      | PCI DSS      | .. code-block:: yaml         |
|                  |              |                              |
|                  |              |    pci_dss:                  |
|                  |              |      - "2.2.1"               |
|                  |              |      - "6.3.3"               |
+------------------+--------------+------------------------------+
| ``cmmc``         | CMMC         | .. code-block:: yaml         |
|                  |              |                              |
|                  |              |    cmmc:                     |
|                  |              |      - AC.1.001              |
+------------------+--------------+------------------------------+
| ``nist_800_53``  | NIST 800-53  | .. code-block:: yaml         |
|                  |              |                              |
|                  |              |    nist_800_53:              |
|                  |              |      - AC-3                  |
|                  |              |      - AU-2                  |
+------------------+--------------+------------------------------+
| ``nist_800_171`` | NIST 800-171 | .. code-block:: yaml         |
|                  |              |                              |
|                  |              |    nist_800_171:             |
|                  |              |      - 3.1.1                 |
|                  |              |      - 3.3.1                 |
+------------------+--------------+------------------------------+
| ``hipaa``        | HIPAA        | .. code-block:: yaml         |
|                  |              |                              |
|                  |              |    hipaa:                    |
|                  |              |      - 164.312(a)(1)         |
+------------------+--------------+------------------------------+
| ``iso_27001``    | ISO 27001    | .. code-block:: yaml         |
|                  |              |                              |
|                  |              |    iso_27001:                |
|                  |              |      - A.8.16                |
|                  |              |      - A.9.4.2               |
+------------------+--------------+------------------------------+
| ``nis2``         | NIS2         | .. code-block:: yaml         |
|                  |              |                              |
|                  |              |    nis2:                     |
|                  |              |      - Art. 21               |
|                  |              |      - Art. 23               |
+------------------+--------------+------------------------------+
| ``tsc``          | TSC          | .. code-block:: yaml         |
|                  |              |                              |
|                  |              |    tsc:                      |
|                  |              |      - CC6.1                 |
|                  |              |      - CC7.2                 |
+------------------+--------------+------------------------------+
| ``fedramp``      | FedRAMP      | .. code-block:: yaml         |
|                  |              |                              |
|                  |              |    fedramp:                  |
|                  |              |      - AC-2                  |
|                  |              |      - SI-4                  |
+------------------+--------------+------------------------------+

Dynamic event field referencing
--------------------------------

A Sigma rule's metadata is normally static: the ``title``, ``tags``, ``mitre``, and ``compliance`` blocks describe the rule itself and are attached unchanged to every finding it generates. Wazuh extends Sigma with dynamic event field referencing, allowing those metadata fields to embed placeholders that resolve against the triggering event at enrichment time. This process is known as Interpolation. Interpolation means taking static text in your rule YAML and replacing placeholders with values from the current event at detection time, so the final string is dynamically built for each event.

Each finding is written to the ``wazuh-findings-v5-{logtype}-*`` index and reflects the specific context of the matched event. For example, the Wazuh agent ID, hostname, or any other field present in the normalized event.

**Syntax**

You can insert ``{{ field.path }}`` placeholders into certain rule metadata fields. When a rule script executes, Wazuh replaces those placeholders with the actual values from the triggering event before writing the finding to the index.

.. code-block:: yaml
   :emphasize-lines: 2

   metadata:
     title: "Apache segmentation fault in agent {{ wazuh.agent.id }}"

If the event has ``wazuh.agent.id`` = "``001``", the stored finding title becomes: "``Apache segmentation fault in agent 001``"

Supported fields
^^^^^^^^^^^^^^^^

Interpolation is applied only to the following fields of the enriched finding's ``rule`` object:

-  ``title``

-  ``tags``

-  ``mitre.tactic``, ``mitre.technique``, ``mitre.subtechnique``

-  ``compliance.*`` (every framework sub-array)

In the ``detection`` block, neither ``selection`` nor ``condition`` is ever interpolated.

Example
^^^^^^^

.. code-block:: yaml
   :emphasize-lines: 8, 18

   id: ed85157d-711b-4edb-8390-492ec63c92ac
   sigma_id: 12345678-90ab-cdef-1234-567890abcdef
   logsource:
     product: apache-http
   tags:
     - attack.impact
     - attack.t1499.004
     - "{{ wazuh.agent.host.name }}"
   level: high
   status: test
   detection:
     condition: selection
     selection:
       message|contains:
         - exit signal Segmentation Fault
       wazuh.integration.name: apache-http
   metadata:
     title: "Apache segmentation fault in agent {{ wazuh.agent.id }}"
     description: Segmentation faults raised by an Apache worker process.
   mitre:
     tactic:
       - TA0040
     technique:
       - T1499
     subtechnique:
       - T1499.004
   compliance:
     pci_dss:
       - "6.2"
       - "11.4"

When this rule matches an event where ``wazuh.agent.id = "001"`` and ``wazuh.agent.host.name = "web-prod-01"``, the resulting enriched finding contains:

.. code-block:: json
   :emphasize-lines: 2, 3

   {
     "title": "Apache segmentation fault in agent 001",
     "tags": ["attack.impact", "attack.t1499.004", "web-prod-01"],
     "mitre": {
       "tactic": ["TA0040"],
       "technique": ["T1499"],
       "subtechnique": ["T1499.004"]
     },
     "compliance": {
       "pci_dss": ["6.2", "11.4"]
     }
   }

Placeholder resolution rules
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The following table shows conditions and results for dynamic event field referencing:

+--------------------------------------------+--------------------------------------------------+
| Situation                                  | Result                                           |
+============================================+==================================================+
| Field is a string/number/boolean           | Converted to a string and substituted            |
+--------------------------------------------+--------------------------------------------------+
| Field is an array                          | Each element is expanded into the surrounding    |
|                                            | array                                            |
+--------------------------------------------+--------------------------------------------------+
| Field is missing, null, or an object       | Resolves to an empty string, **no failure**      |
+--------------------------------------------+--------------------------------------------------+
| The entire value is an empty placeholder   | The field is **dropped** from the output         |
|                                            | entirely                                         |
+--------------------------------------------+--------------------------------------------------+

Scope
^^^^^

Interpolation runs after a matching rule is fetched and before the finding is indexed into ``wazuh-findings-v5-{logtype}-*``. The original rule document in the rule index is never modified.
