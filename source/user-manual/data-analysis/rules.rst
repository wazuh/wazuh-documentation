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

.. list-table::
   :header-rows: 1
   :widths: 18 12 10 60

   * - Field
     - Type
     - Required
     - Description
   * - ``id``
     - String
     - Yes
     - Globally unique rule identifier (UUIDv4 recommended)
   * - ``status``
     - String
     - Yes
     - Rule maturity status: ``experimental``, ``test``, or ``stable``
   * - ``level``
     - String
     - Yes
     - Findings severity: ``informational``, ``low``, ``medium``, ``high``, or ``critical``
   * - ``detection``
     - Object
     - Yes
     - Detection logic: selections, keywords, and conditions
   * - ``logsource``
     - Object
     - Yes
     - Classifies the type of log data the rule targets
   * - ``metadata``
     - Object
     - Yes
     - Authorship and lifecycle information
   * - ``sigma_id``
     - String
     - No
     - Original Sigma rule identifier (UUID), preserved when importing from upstream
   * - ``enabled``
     - Boolean
     - No
     - Whether the rule is active (default: ``true``)
   * - ``tags``
     - Array
     - No
     - Categorization tags (e.g., ``attack.initial-access``)
   * - ``falsepositives``
     - Array
     - No
     - Known sources of false positives
   * - ``mitre``
     - Object
     - No
     - MITRE ATT&CK threat intelligence mapping
   * - ``compliance``
     - Object
     - No
     - Compliance framework mapping

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

.. list-table::
   :header-rows: 1
   :widths: 22 48 30

   * - Syntax
     - How it matches
     - Example
   * - **Field list (implicit OR)**
     - When you assign a list of values to a single field, the selection matches if the field equals any value in the list. This is the "match one of these" pattern. This rule matches when ``event.action`` is either "``login_failed``" or "``authentication_error``".
     - .. code-block:: yaml

          detection:
            selection:
              event.action:
                - login_failed # or
                - authentication_error
            condition: selection
   * - **Field dictionary (implicit AND)**
     - When you assign multiple fields within a single selection, the selection matches only when all field conditions are satisfied simultaneously. This is the "match all of these together" pattern. This rule matches when ``log.level`` is "``ERROR``" and ``event.kind`` is "``event``". Both conditions must hold simultaneously.
     - .. code-block:: yaml

          detection:
            selection:
              log.level: ERROR # and
              event.kind: event
            condition: selection

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

.. list-table::
   :header-rows: 1
   :widths: 12 38 50

   * - Operator
     - Description
     - Example
   * - ``and``
     - Both operands must match
     - .. code-block:: yaml

          detection:
            sel_severity:
              event.severity|gte: 8
            sel_message:
              message|contains: fatal
            condition: sel_severity and sel_message
   * - ``or``
     - At least one operand must match
     - .. code-block:: yaml

          detection:
            sel_error:
              log.level: ERROR
            sel_warn:
              log.level: WARN
            condition: sel_error or sel_warn
   * - ``not``
     - Fires on matching events, but excludes any event generated by a thread whose name starts with ``Test``. This is the standard pattern for reducing false positives.
     - .. code-block:: yaml

          detection:
            selection:
              event.kind: event
            filter:
              process.thread.name|startswith: Test
            condition: selection and not filter
   * - ``brackets``
     - Allows for the grouping of different operations
     - .. code-block:: yaml

          detection:
            sel_high:
              event.severity|gte: 8
            sel_critical:
              log.level: CRITICAL
            filter:
              process.name: monitor
            condition: (sel_high or sel_critical) and not filter

See `Sigma Conditions <https://sigmahq.io/docs/basics/conditions.html>`__ for the full specification of condition syntax.

Modifiers
^^^^^^^^^

Modifiers change how a field's value is compared. They are appended to the field name with the pipe character (``|``) and can be chained; each modifier in the chain further transforms the comparison.

.. code-block:: yaml

   field_name|modifier: value

Multiple modifiers can be chained: ``field|modifier1|modifier2: value``.

.. list-table::
   :header-rows: 1
   :widths: 14 56 30

   * - Modifier
     - What it does
     - Example
   * - ``contains``
     - Matches if the field value contains a specified string. Wildcards are inserted around the value.
     - ``message|contains: timeout``
   * - ``startswith``
     - Matches when the field value begins with the specified string. A wildcard is inserted at the end of the value.
     - ``process.thread.name|startswith: Gossip``
   * - ``endswith``
     - Matches when the field value ends with the specified string. A wildcard is inserted at the beginning of the value.
     - ``process.thread.name|endswith: "-5"``
   * - ``base64``
     - Encodes the provided value as a Base64 string before comparison. Used to detect commands or parameters that an attacker has Base64-encoded to evade plain-text detection.
     - ``process.command_line|base64: "/bin/bash"``
   * - ``base64offset``
     - Generates all three possible Base64 offsets of the value to account for the byte position where it might appear inside a larger Base64-encoded blob. Usually preferred over ``base64`` when matching a substring inside an encoded stream, and typically chained with ``contains``.
     - ``process.command_line|base64offset|contains: "/bin/bash"``
   * - ``wide``
     - Transforms the value to a UTF-16 (wide-character) byte sequence before comparison. Must be chained with an encoding modifier such as ``base64`` or ``base64offset``. It cannot be the final modifier in the chain because the intermediate representation contains null bytes.
     - ``process.command_line|wide|base64offset|contains: "ping"``
   * - ``windash``
     - Expands command-line flag prefixes to match all Windows dash variants: ``-``, ``/``, ``–`` (en dash), ``—`` (em dash), and ``―`` (horizontal bar). Useful for detecting invocations where attackers swap dash characters to evade signatures.
     - ``process.command_line|windash|contains: " -enc "``
   * - ``re``
     - Matches against a PCRE regular expression. Submodifiers can be chained with ``re|<flag>``:

       - ``i``: case-insensitive matching.
       - ``m``: multi-line mode (``^``/``$`` match the start/end of each line).
       - ``s``: single-line mode (``.`` also matches newline characters).
     - ``process.thread.name|re: "^Repair"``
   * - ``cidr``
     - Matches when the field value (an IPv4 or IPv6 address) falls within the specified CIDR subnet. IPv6 addresses are supported in the following formats:

       - Standard: full 8-group notation with leading zeros, for example ``2001:0db8:85a3:0000:0000:8a2e:0370:7334``.
       - Compressed: zero-compression using ``::`` to omit consecutive zero groups, for example ``2001:db8:85a3::8a2e:370:7334``.
       - CIDR: subnet notation with a prefix length, for example ``2001:db8::/32``.
     - ``source.ip|cidr: 10.42.0.0/16``
   * - ``exists``
     - Checks whether the field is present in the event. The value must be ``true`` (field must exist) or ``false`` (field must be absent).
     - ``source.ip|exists: true``
   * - ``all``
     - By default, list values are combined with ``OR``. The ``all`` modifier changes the logic to ``AND``, requiring every value in the list to match. Cannot be applied to single-item lists.
     - .. code-block:: yaml

          event.category|contains|all:
            - authentication
            - failure
   * - ``lt``
     - Matches when the field value is less than the specified number.
     - ``event.severity|lt: 10``
   * - ``lte``
     - Matches when the field value is less than or equal to the specified number.
     - ``event.severity|lte: 3``
   * - ``gt``
     - Matches when the field value is greater than the specified number.
     - ``event.severity|gt: 7``
   * - ``gte``
     - Matches when the field value is greater than or equal to the specified number.
     - ``event.duration|gte: 5000``

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

.. list-table::
   :header-rows: 1
   :widths: 14 10 46 30

   * - Field
     - Required
     - Description
     - Example
   * - ``product``
     - yes
     - The product or platform generating the log (for example, ``linux``, ``windows``, ``python``). Must hold the same value as ``metadata.title`` from the integration it belongs to.
     - .. code-block:: yaml

          logsource:
            product: linux
   * - ``category``
     - no
     - A broad classification of the log type within the product (for example, ``authentication``, ``process_creation``, ``application``, ``webserver``, ``firewall``). Useful for grouping related rules across products.
     - .. code-block:: yaml

          logsource:
            category: authentication
   * - ``service``
     - no
     - The specific service, daemon, or log channel within the product (e.g., ``sshd``, ``security``, ``syslog``, ``kerberos``). Use this when the log can be attributed to a particular subsystem or event channel.
     - .. code-block:: yaml

          logsource:
            service: sshd
   * - ``definition``
     - no
     - Free-form notes describing onboarding requirements or prerequisites for the log source. For example, audit policies that must be enabled, agent configuration needed, or specific event IDs to collect.
     - .. code-block:: yaml

          logsource:
            definition: Script Block Logging must be enabled

See `Sigma Log Sources <https://sigmahq.io/docs/basics/log-sources.html>`__ for general guidance on log source classification, including the standard combinations of ``product``, ``category``, and ``service``.

.. _data_analysis_rules_metadata:

Metadata
--------

The ``metadata`` block captures authorship, lifecycle, and descriptive information about the rule. It is separate from detection logic; nothing in ``metadata`` affects whether a rule fires. Its purpose is to make rules discoverable, attributable, and useful to analysts when a finding appears.

.. list-table::
   :header-rows: 1
   :widths: 14 10 40 36

   * - Field
     - Required
     - Description
     - Example
   * - ``title``
     - Yes
     - A human-readable rule title is shown in alerts and the rule catalog. Keep titles short and avoid prefixes like "Detects when…" or "This rule will…".
     - ``title: Suspicious SSH Login from IPv6``
   * - ``author``
     - No
     - The author of the rule. Free-form text; may include contact information such as an email address or handle.
     - ``author: Security Operations <secops@example.com>``
   * - ``date``
     - No
     - Creation date in ISO 8601 format (``YYYY-MM-DD``). Auto-managed when the rule is first registered.
     - ``date: "2026-06-10"``
   * - ``modified``
     - No
     - Last modification date in ISO 8601 format (``YYYY-MM-DD``). Auto-managed when the rule's content changes.
     - ``modified: "2026-06-10"``
   * - ``description``
     - No
     - Brief explanation of what the rule detects and the context in which it is useful.
     - ``description: Detects SSH login attempts from blocklisted IPv6 ranges.``
   * - ``references``
     - No
     - URLs or plain-text references (e.g., advisories, CVE IDs, blog posts) that explain the motivation for the rule.
     - ``references: - https://example.com/advisory/2026-001``
   * - ``documentation``
     - No
     - Free-form text or a URL providing additional triage context for analysts investigating a finding.
     - ``documentation: https://internal.wiki/wazuh/rules/ssh-ipv6``
   * - ``supports``
     - No
     - List of platforms or products the rule is intended to operate on.
     - ``supports: - linux``

.. _data_analysis_rules_mitre:

MITRE ATT&CK
------------

The ``mitre`` block maps a rule to MITRE ATT&CK tactics, techniques, and subtechniques. Each field is an array of ID strings:

.. list-table::
   :header-rows: 1
   :widths: 18 52 30

   * - Field
     - Description
     - Example
   * - ``tactic``
     - MITRE ATT&CK tactic IDs. An array of one or more tactic identifiers.
     - ``tactic: - TA0002``
   * - ``technique``
     - MITRE ATT&CK technique IDs. An array of one or more technique identifiers.
     - ``technique: - T1059``
   * - ``subtechnique``
     - MITRE ATT&CK subtechnique IDs. An array of one or more subtechnique identifiers. Use an empty array ``[]`` if no subtechnique applies.
     - ``subtechnique: - T1059.001``

.. _data_analysis_rules_compliance:

Compliance
----------

The ``compliance`` block maps a rule to one or more compliance frameworks. Each key is a normalized framework identifier, and its value is an array of requirement ID strings.

.. list-table::
   :header-rows: 1
   :widths: 18 32 50

   * - Framework Key
     - Full Name
     - Example
   * - ``gdpr``
     - GDPR
     - ``gdpr: - Art. 32 - Art. 25``
   * - ``pci_dss``
     - PCI DSS
     - ``pci_dss: - "2.2.1" - "6.3.3"``
   * - ``cmmc``
     - CMMC
     - ``cmmc: - AC.1.001``
   * - ``nist_800_53``
     - NIST 800-53
     - ``nist_800_53: - AC-3 - AU-2``
   * - ``nist_800_171``
     - NIST 800-171
     - ``nist_800_171: - 3.1.1 - 3.3.1``
   * - ``hipaa``
     - HIPAA
     - ``hipaa: - 164.312(a)(1)``
   * - ``iso_27001``
     - ISO 27001
     - ``iso_27001: - A.8.16 - A.9.4.2``
   * - ``nis2``
     - NIS2
     - ``nis2: - Art. 21 - Art. 23``
   * - ``tsc``
     - TSC
     - ``tsc: - CC6.1 - CC7.2``
   * - ``fedramp``
     - FedRAMP
     - ``fedramp: - AC-2 - SI-4``

Dynamic event field referencing
--------------------------------

A Sigma rule's metadata is normally static: the ``title``, ``tags``, ``mitre``, and ``compliance`` blocks describe the rule itself and are attached unchanged to every finding it generates. Wazuh extends Sigma with dynamic event field referencing, allowing those metadata fields to embed placeholders that resolve against the triggering event at enrichment time. This process is known as Interpolation. Interpolation means taking static text in your rule YAML and replacing placeholders with values from the current event at detection time, so the final string is dynamically built for each event.

Each finding is written to the ``wazuh-findings-v5-{logtype}-*`` index and reflects the specific context of the matched event. For example, the Wazuh agent ID, hostname, or any other field present in the normalized event.

**Syntax**

You can insert ``{{ field.path }}`` placeholders into certain rule metadata fields. When a rule script executes, Wazuh replaces those placeholders with the actual values from the triggering event before writing the finding to the index.

.. code-block:: yaml

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

.. list-table::
   :header-rows: 1
   :widths: 50 50

   * - Situation
     - Result
   * - Field is a string/number/boolean
     - Converted to a string and substituted
   * - Field is an array
     - Each element is expanded into the surrounding array
   * - Field is missing, null, or an object
     - Resolves to an empty string, **no failure**
   * - The entire value is an empty placeholder
     - The field is **dropped** from the output entirely

Scope
^^^^^

Interpolation runs after a matching rule is fetched and before the finding is indexed into ``wazuh-findings-v5-{logtype}-*``. The original rule document in the rule index is never modified.
