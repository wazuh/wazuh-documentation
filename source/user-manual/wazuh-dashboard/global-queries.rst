.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: The Wazuh dashboard provides query capabilities to search, filter, analyze, and visualize security data collected from monitored endpoints. Learn more in this section of the documentation.

Querying security information on the Wazuh dashboard
====================================================

The Wazuh dashboard lets you search, filter, analyze, and visualize security data collected from monitored endpoints. You can query system inventory, vulnerabilities, file integrity monitoring (FIM), security configuration assessment (SCA), and other security data from one interface. This information can be used to investigate security issues, assess compliance, monitor endpoint security posture, and support threat hunting activities. Much of this information is stored as Wazuh global state data, which represents the current state of all monitored endpoints and provides a consolidated view of endpoint security and compliance information.

Wazuh global state data
-----------------------

Wazuh global state data is stored in the ``wazuh-states-*`` indices of the Wazuh indexer. For details about these indices and the Wazuh capabilities that populate them, see :ref:`Stateful indices <wazuh_indexer_indices_stateful_indices>` in the Wazuh indexer user manual. The following sections show where to view each type of global state data on the Wazuh dashboard.

System inventory (IT Hygiene)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Navigate to **Security operations** > **IT Hygiene** on the Wazuh dashboard to view system inventory information, including hardware, operating system, software, network, user, and service data collected from monitored endpoints.

.. thumbnail:: /images/wazuh-dashboard/global-queries/system-inventory.png
   :align: center
   :width: 80%
   :title: System inventory on the Wazuh dashboard
   :alt: System inventory on the Wazuh dashboard

Vulnerability detection
^^^^^^^^^^^^^^^^^^^^^^^

Navigate to **Threat intelligence** > **Vulnerability Detection** on the Wazuh dashboard to view and query vulnerability information collected from monitored endpoints.

.. thumbnail:: /images/wazuh-dashboard/global-queries/vulnerability-detection.png
   :align: center
   :width: 80%
   :title: Vulnerability detection on the Wazuh dashboard
   :alt: Vulnerability detection on the Wazuh dashboard

File integrity monitoring
^^^^^^^^^^^^^^^^^^^^^^^^^

Navigate to **Endpoint security** > **File Integrity Monitoring** on the Wazuh dashboard to view and query file integrity monitoring data collected from monitored endpoints.

.. thumbnail:: /images/wazuh-dashboard/global-queries/file-integrity-monitoring.png
   :align: center
   :width: 80%
   :title: File integrity monitoring on the Wazuh dashboard
   :alt: File integrity monitoring on the Wazuh dashboard

Security configuration assessment (SCA)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Navigate to **Endpoint security** > **Configuration Assessment** on the Wazuh dashboard to view and query security configuration assessment (SCA) data collected from monitored endpoints.

.. thumbnail:: /images/wazuh-dashboard/global-queries/security-configuration-assessment.png
   :align: center
   :width: 80%
   :title: Security Configuration Assessment on the Wazuh dashboard
   :alt: Security Configuration Assessment on the Wazuh dashboard

Searching findings and events with DQL
--------------------------------------

The search bars of **Discover** and of the **Dashboard** and **Findings** tabs of each module, such as **Threat Hunting**, use Dashboards Query Language (DQL). WQL is available on the pages listed in :ref:`dashboard_wql`.

A DQL query is a field name, a colon, and a value. Combine conditions with ``and``, ``or``, and ``not``, and use ``*`` as a wildcard. For example, the following query in **Threat intelligence** > **Threat Hunting** > **Findings** shows the findings of one Wazuh agent:

.. code-block:: none

   wazuh.agent.name: "Ubuntu24"

.. thumbnail:: /images/wazuh-dashboard/global-queries/dql-findings.png
   :align: center
   :width: 80%
   :title: DQL query in Threat Hunting Findings
   :alt: Threat intelligence > Threat Hunting > Findings with the query wazuh.agent.name: "Ubuntu24" in the search bar and the matching findings

The following query shows the findings of every Wazuh agent whose name starts with Windows:

.. code-block:: none

   wazuh.agent.name: Windows*

For the full syntax, see `Dashboards Query Language <https://docs.opensearch.org/latest/dashboards/dql/>`__ in the OpenSearch documentation.

.. _dashboard_wql:

Filtering data using Wazuh Query Language (WQL)
-----------------------------------------------

Wazuh Query Language (WQL) is a text-based language for advanced data filtering in the Wazuh dashboard. WQL stands out with its user-friendly syntax that leverages the Wazuh manager API to facilitate advanced data analysis to gain security insights.

Beyond basic data retrieval, WQL extends the functionality of the Wazuh dashboard search bars, particularly within specialized tabs. This provides a seamless user experience, allowing for intuitive navigation and data manipulation on the Wazuh dashboard.

This guide shows the specifics of operators, values, separators, and the unique syntax of WQL. With WQL, you can filter for specific threat group names or conduct a broad search for related terms. WQL matches values regardless of case, so ``os.name=ubuntu`` and ``os.name=Ubuntu`` return the same agents. Write the ``and`` and ``or`` separators in lowercase.

WQL is available in the search bars of the following pages:

-  Agents management > Summary
-  MITRE ATT&CK > Intelligence
-  Agents management > Groups, and the Agents tab of each group

WQL queries
^^^^^^^^^^^

WQL enables precise data retrieval by defining detailed criteria. This approach requires defining the field, operator, and value, ensuring the return of accurate and relevant data. The structure of these queries follows a simple pattern: ``fieldname operator value``.

Field name
^^^^^^^^^^

In WQL, "Field name" indicates the particular data type you want to filter, serving as the starting point in a query. It precedes the operator, pinpointing the exact data segment for targeted text searches. The image below demonstrates the WQL search bar in action on the **MITRE ATT&CK** > **Intelligence** tab. Click the search bar to list the available field names.

.. thumbnail:: /images/wazuh-dashboard/queries/intelligence-field-names.png
   :align: center
   :width: 80%
   :title: Intelligence - Field names
   :alt: Intelligence - Field names

The Wazuh dashboard displays a validation error if you use an incorrect field name.

.. thumbnail:: /images/wazuh-dashboard/queries/intelligence-validation-error.png
   :align: center
   :width: 80%
   :title: Intelligence - Field names validation error
   :alt: Intelligence - Field names validation error

Operators
^^^^^^^^^

In the Wazuh Query Language, operators enable precise data filtering and guide the flow of operations to generate desired outcomes. The key operators in WQL are:

-  ``=`` for equality
-  ``!=`` for inequality
-  ``>`` for greater than
-  ``<`` for less than
-  ``~`` for like as

Equality (=)
~~~~~~~~~~~~

This filter operator is used to find exact matches within a dataset. It is also known as equals to and is denoted by the symbol ``=``. For example, the query ``name=Mimikatz`` returns only the Mimikatz entry in **MITRE ATT&CK** > **Intelligence** > **Software**.

.. thumbnail:: /images/wazuh-dashboard/queries/os_name-ubuntu.png
   :align: center
   :width: 80%
   :title: Query name=Mimikatz in MITRE ATT&CK Intelligence Software
   :alt: Query name=Mimikatz in MITRE ATT&CK Intelligence Software

Inequality (!=)
~~~~~~~~~~~~~~~

This filter operator finds all data that does not match the specified value within a dataset. It is also known as *not equal to* and denoted by the symbol ``!=``. For example, the query ``name!=Persistence`` returns every tactic except Persistence in **MITRE ATT&CK** > **Intelligence** > **Tactics**.

.. thumbnail:: /images/wazuh-dashboard/queries/os_name-not-ubuntu.png
   :align: center
   :width: 80%
   :title: Query name!=Persistence in MITRE ATT&CK Intelligence Tactics
   :alt: Query name!=Persistence in MITRE ATT&CK Intelligence Tactics

Greater than (>)
~~~~~~~~~~~~~~~~

This *greater than* (``>``) operator filters values exceeding a specified threshold in a dataset. For example, the query ``count>1`` returns the groups that contain more than one agent in **Agents management** > **Groups**.

.. thumbnail:: /images/wazuh-dashboard/queries/port-greater-than-value.png
   :align: center
   :width: 80%
   :title: Query count>1 in Agents management Groups
   :alt: Query count>1 in Agents management Groups

Less than (<)
~~~~~~~~~~~~~

This *less than* (``<``) operator filters values below a specified limit in a dataset. For example, the query ``count<2`` returns the groups that contain fewer than two agents in **Agents management** > **Groups**.

.. thumbnail:: /images/wazuh-dashboard/queries/port-less-than-value.png
   :align: center
   :width: 80%
   :title: Query count<2 in Agents management Groups
   :alt: Query count<2 in Agents management Groups

Like as (~)
~~~~~~~~~~~

The *like as* operator (``~``) enables pattern matching, allowing data retrieval when a specified field matches a given pattern. It offers flexibility by finding records with partial matches. For example, the image below shows how to filter threat groups with names similar to “APT1”:

.. thumbnail:: /images/wazuh-dashboard/queries/filter-similar-name-groups.png
   :align: center
   :width: 80%
   :title: Filter similar name groups
   :alt: Filter similar name groups

Consider a query aimed at finding descriptions that include the term "*threat group*" shown below:

.. thumbnail:: /images/wazuh-dashboard/queries/filter-similar-description-groups.png
   :align: center
   :width: 80%
   :title: Filter similar description groups
   :alt: Filter similar description groups

The like as operator matches the whole value as one phrase, in the order written. For example, ``description~"threat group"`` returns the groups whose description contains threat group, and ``description~"group threat"`` returns none.

Value
^^^^^

*Value* is the specific data that is being filtered for. It represents the condition used to narrow down the results of a query. For instance, to display the mitigation named Audit in **MITRE ATT&CK** > **Intelligence** > **Mitigations**, use the following query:

.. code-block:: none

   name=Audit

.. thumbnail:: /images/wazuh-dashboard/queries/filter-value.png
   :align: center
   :width: 80%
   :title: Filter value
   :alt: Filter value

As shown in the example above, no additional formatting is necessary when filtering for values without spaces. You must wrap the value with a pair of double quotes ``" "`` if it contains spaces or the double quote character (").

.. code-block:: none

   name="OS Credential Dumping"

.. thumbnail:: /images/wazuh-dashboard/queries/filter-value-spaces.png
   :align: center
   :width: 80%
   :title: Filter value with spaces
   :alt: Filter value with spaces

.. note::

   The double quote ``"`` can be escaped using ``\``. For example: ``"value with whitespaces and escaped \"quotes\""`` represents ``value with whitespaces and escaped "quotes"``.

Separators
^^^^^^^^^^

*Separators* are operators that combine multiple queries for complex filtering. WQL supports the use of the ``and`` and ``or`` boolean operators.

.. note::

   Write separators in lowercase. The search bar rejects ``AND`` and ``OR``.

or separator
~~~~~~~~~~~~

The *or* logical operator merges various conditions within a query, requiring at least one condition to be true for the query to succeed. For example, we show the query to filter threat groups named “APT1” or “APT3” below:

.. code-block:: none

   name=APT1 or name=APT3

.. thumbnail:: /images/wazuh-dashboard/queries/or-filter-names.png
   :align: center
   :width: 80%
   :title: OR filter names
   :alt: OR filter names

and separator
~~~~~~~~~~~~~

The *and* logical operator links several conditions in a query, requiring all conditions to be met for the overall query to succeed. For example, run the following query in **Agents management** > **Groups** > default > **Agents** to filter active agents whose operating system name contains Windows:

.. code-block:: none

   status=active and os.name~Windows

.. thumbnail:: /images/wazuh-dashboard/queries/and-filter.png
   :align: center
   :width: 80%
   :title: AND filter
   :alt: AND filter

Grouping operators
^^^^^^^^^^^^^^^^^^

WQL utilizes parentheses ``()`` to prioritize expressions, ensuring those within are assessed first. This approach structures the enclosed expressions as singular units within broader queries, guiding the order of evaluation.

.. code-block:: none

   ( status=active and os.platform=windows ) or id=001

.. thumbnail:: /images/wazuh-dashboard/queries/grouping-operators.png
   :align: center
   :width: 80%
   :title: Grouping operators
   :alt: Grouping operators

Wildcards
^^^^^^^^^

WQL matches exact values. To match part of a value, use the like as operator (~). The search bar rejects the ``*`` character, as the image below shows.

.. thumbnail:: /images/wazuh-dashboard/queries/wildcards-not-supported.png
   :align: center
   :width: 80%
   :title: Wildcards not supported
   :alt: Wildcards not supported

.. note::

   WQL doesn't apply to the search bar in **Threat Hunting**, **Discover**, or other search bars labeled **DQL**. These search bars use Dashboards Query Language (DQL), which supports wildcards. For example, ``wazuh.rule.title:Failed*`` returns findings with a rule title that starts with ``Failed``. For the full syntax, see `Dashboards Query Language (DQL) <https://docs.opensearch.org/latest/dashboards/dql/>`__ in the OpenSearch documentation.

Whitespaces
^^^^^^^^^^^

WQL supports the use of whitespaces between data tokens.

.. code-block:: none

   name = Persistence or name = Execution

.. thumbnail:: /images/wazuh-dashboard/queries/whitespaces-supported.png
   :align: center
   :width: 80%
   :title: Whitespaces are supported
   :alt: Whitespaces are supported

Ranges
^^^^^^

WQL supports numeric inequalities using the ``>`` and ``<`` operators. For example:

.. code-block:: none

   id>000 and id<003

.. thumbnail:: /images/wazuh-dashboard/queries/port-ranges.png
   :align: center
   :width: 80%
   :title: Query id>000 and id<003 in Agents management Summary
   :alt: Query id>000 and id<003 in Agents management Summary

Example: Sending WQL queries with cURL
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Generate a token to be used to interact with the API:

.. code-block:: console

   # TOKEN=$(curl -u <WAZUH_MANAGER_API_USER>:<WAZUH_MANAGER_API_PASSWORD> -k -X POST "https://<WAZUH_MANAGER_ADDRESS>:55000/security/user/authenticate?raw=true")

Replace:

-  ``<WAZUH_MANAGER_API_USER>`` with your Wazuh manager API user. After installation, it is ``wazuh``.
-  ``<WAZUH_MANAGER_API_PASSWORD>`` with your Wazuh manager API password. The installation stores it as ``WAZUH_MANAGER_API_PASSWORD`` in ``/etc/wazuh-manager/export/credentials.env`` on the Wazuh manager.
-  ``<WAZUH_MANAGER_ADDRESS>`` with your Wazuh manager IP address. On an all-in-one deployment from the installation assistant, run the commands on the Wazuh manager host and use ``localhost``. The Wazuh manager API listens on ``127.0.0.1`` and ``::1`` only, as the host setting in ``/var/wazuh-manager/api/configuration/api.yaml`` shows.

For example, the following query filters Ubuntu endpoints with a major version higher than 18. The ``q`` parameter of the Wazuh manager API uses a semicolon (``;``) for ``and``, and a comma (``,``) for ``or``.

We encode the value of the parameter ``q`` with the ``--data-urlencode`` flag:

.. code-block:: console

   # curl -G --data-urlencode "q=os.name=ubuntu;os.major>18" -k -X GET "https://<WAZUH_MANAGER_ADDRESS>:55000/agents?limit=500&pretty=true&select=id,name,os.name,version,os.major" -H  "Authorization: Bearer $TOKEN"

The command output looks similar to this:

.. code-block:: none
   :class: output

   {
      "data": {
         "affected_items": [
            {
               "os": {
                  "major": "24",
                  "name": "Ubuntu"
               },
               "id": "001",
               "name": "Ubuntu24",
               "version": "v5.0.0"
            }
         ],
         "total_affected_items": 1,
         "total_failed_items": 0,
         "failed_items": []
      },
      "message": "All selected agents information was returned",
      "error": 0
   }

The following query uses the comma (``,``) separator for *or* and the like as (``~``) operator. It filters Wazuh agents whose operating system name contains ``windows`` or ``centos``.

.. code-block:: console

   # curl -G --data-urlencode "q=os.name~centos,os.name~windows" -k -X GET "https://<WAZUH_MANAGER_ADDRESS>:55000/agents?limit=500&pretty=true&select=id,name,os.name,os.version,os.major" -H  "Authorization: Bearer $TOKEN"

The command output looks similar to this:

.. code-block:: none
   :class: output

   {
      "data": {
         "affected_items": [
            {
               "os": {
                  "major": "10",
                  "name": "Microsoft Windows Server 2022 Datacenter",
                  "version": "10.0.20348.5761"
               },
               "id": "003",
               "name": "WindowsServer2022"
            }
         ],
         "total_affected_items": 1,
         "total_failed_items": 0,
         "failed_items": []
      },
      "message": "All selected agents information was returned",
      "error": 0
   }
