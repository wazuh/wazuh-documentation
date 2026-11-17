.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how to configure the Active Response capability in this section of the Wazuh documentation.

Configuration
=============

Configure active response to define when and how Wazuh automatically executes actions in response to specific events.

Wazuh dashboard
----------------

Configure active response commands and their triggers from the Wazuh dashboard. First, create an active response. Then create an Alerting monitor that runs the active response when a finding matches your conditions.

Creating an active response
^^^^^^^^^^^^^^^^^^^^^^^^^^^

Follow these steps to create an active response:

#. From the Wazuh dashboard main menu, navigate to **Explore** > **Active Responses**.

#. Click **Create active response** and complete the configuration form with the following details:

   -  **Name**: The name of the active response. Use this name when attaching the active response to a trigger action.

   -  **Description**: An optional description of the active response and its purpose.

   -  **Executable**: The active response script or executable that runs when the response triggers. You do not need to specify the file extension unless multiple scripts share the same name.

   -  **Extra arguments**: Optional arguments required by the active response script.

   -  **Location**: Specifies where the active response executes:

      -  **All agents**: Executes the active response on every agent. Use this option with caution, as an incorrect configuration can affect the entire environment.

      -  **Local**: Executes the active response on the agent that generates the finding.

      -  **Defined agent**: Executes the active response on a specific agent, regardless of where the event occurs. Enter the target Wazuh agent ID in the **Agent ID** field.

   -  **Type**: Specifies the type of active response:

      -  **Stateful**: Executes the response for a specified period and automatically reverts the action when the timeout expires.

      -  **Stateless**: Executes the response once on the specified endpoint(s) and does not automatically revert the action.

   -  **Stateful timeout**: Specifies how long, in seconds, a stateful active response remains active before it automatically reverts the action. The default is 180 seconds.

#. Click **Create** to save the configuration.

.. note::

   Restarting a Wazuh manager is not required after creating or modifying an active response configuration. The Wazuh manager automatically distributes the updated active response configuration to the agents where the active response is configured to run.

Creating a monitor
^^^^^^^^^^^^^^^^^^

An Active Response monitor is an Alerting monitor that runs an active response when a finding matches your conditions. The monitor checks new findings in a findings index at a fixed interval. When a finding matches the trigger condition, the monitor runs the active response attached to the trigger. The monitor evaluates each finding separately, so it can't run an active response based on a count of findings, such as several failed logins from the same IP address. It also doesn't evaluate findings indexed before its first run.

Active Response monitors have the following requirements:

-  The monitor must use the **By interval** frequency, with an interval of 60 seconds or less.

-  The monitor index must be a findings index whose name starts with ``wazuh-findings-v5``, such as ``wazuh-findings-v5-applications``.

.. note::

   If you create the monitor with the Alerting API instead of the Wazuh dashboard, set the ``message_template`` of the active response action to ``{{ctx.alerts.0.related_doc_ids}}``. The Wazuh dashboard sets this value for you. Without it, the active response doesn't run, although the monitor still generates an alert.

You can define the monitor with the **Visual editor** or the **Extraction query editor**. The following table compares both methods:

+-------------------------+--------------------------------------------------------------+--------------------------------------------------------------+
| **Method**              | **Use it when**                                              | **Limitations**                                              |
+=========================+==============================================================+==============================================================+
| Visual editor           | You need exact matches, such as a specific rule ID. It       | It supports only the is and is not operators. It can't match |
|                         | doesn't require any query syntax.                            | part of a field value or compare numbers.                    |
+-------------------------+--------------------------------------------------------------+--------------------------------------------------------------+
| Extraction query editor | You need conditions that the Visual editor doesn't support,  | It requires you to know the query string syntax and the      |
|                         | such as partial matches with wildcards, numeric comparisons, | field names in the findings.                                 |
|                         | or conditions combined with AND, OR, and NOT.                |                                                              |
+-------------------------+--------------------------------------------------------------+--------------------------------------------------------------+

.. _active_response_visual_editor:

Using the Visual editor
~~~~~~~~~~~~~~~~~~~~~~~

Follow these steps to create an Active Response monitor with the **Visual editor**:

#. From the Wazuh dashboard main menu, navigate to **Explore** > **Alerting**.

#. Switch to the **Monitors** tab, then click **Create monitor**.

#. Fill in the monitor details:

   +-------------------------+----------------------------------------------------------------------------+
   | **Field**               | **Description**                                                            |
   +=========================+============================================================================+
   | Monitor name            | A name for the monitor.                                                    |
   +-------------------------+----------------------------------------------------------------------------+
   | Monitor type            | Select Active Response monitor.                                            |
   +-------------------------+----------------------------------------------------------------------------+
   | Monitor defining method | Select Visual editor.                                                      |
   +-------------------------+----------------------------------------------------------------------------+
   | Frequency               | Select By interval.                                                        |
   +-------------------------+----------------------------------------------------------------------------+
   | Run every               | The interval between monitor runs. The maximum is 1 minute.                |
   +-------------------------+----------------------------------------------------------------------------+
   | Index                   | The findings index to monitor, such as ``wazuh-findings-v5-applications``. |
   +-------------------------+----------------------------------------------------------------------------+

#. In the **Query** section, define one or more queries with the following parameters. Click **Add another query** to add more queries:

   +------------+-----------------------------------------------------------------------------+
   | **Field**  | **Description**                                                             |
   +============+=============================================================================+
   | Query name | A name for the query. The trigger uses this name to select the query.       |
   +------------+-----------------------------------------------------------------------------+
   | Field      | The finding field, an operator, and a value. For example, ``wazuh.rule.id`` |
   |            | ``is`` ``<RULE_ID>``.                                                       |
   +------------+-----------------------------------------------------------------------------+
   | Tags       | Optional tags. The trigger can select all queries that share a tag.         |
   +------------+-----------------------------------------------------------------------------+

#. In the **Triggers** section, click **Add trigger** and fill in the following parameters:

   +-------------------------+----------------------------------------------------------------------------------+
   | **Field**               | **Description**                                                                  |
   +=========================+==================================================================================+
   | Trigger name            | A name for the trigger.                                                          |
   +-------------------------+----------------------------------------------------------------------------------+
   | Severity level          | The severity of the alerts that the trigger generates, from 1 (Highest) to 5     |
   |                         | (Lowest).                                                                        |
   +-------------------------+----------------------------------------------------------------------------------+
   | Specify queries or tags | The queries or tags that the trigger evaluates. Click + Add condition to combine |
   |                         | several queries or tags.                                                         |
   +-------------------------+----------------------------------------------------------------------------------+

#. In the **Actions** subsection, click **Add active response** and fill in the following parameters:

   +-----------------+--------------------------------------------------------------------------------+
   | **Field**       | **Description**                                                                |
   +=================+================================================================================+
   | Action name     | A name for the action.                                                         |
   +-----------------+--------------------------------------------------------------------------------+
   | Active response | The active response to run, such as one that you created in Creating an active |
   |                 | response.                                                                      |
   +-----------------+--------------------------------------------------------------------------------+

#. Click **Create** to save the monitor.

Using the Extraction query editor
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Follow these steps to create an Active Response monitor with the **Extraction query editor**:

#. From the Wazuh dashboard main menu, navigate to **Explore** > **Alerting**.

#. Switch to the **Monitors** tab, then click **Create monitor**.

#. Fill in the monitor details as described in :ref:`Using the Visual editor <active_response_visual_editor>`. Set **Monitor defining method** to **Extraction query editor**.

#. Replace the content of the **Define extraction query** field with the monitor queries in the following format:

   .. code-block:: json

      {
          "description": "<DESCRIPTION>",
          "queries": [
              {
                  "name": "<QUERY_NAME>",
                  "query": "<QUERY>",
                  "tags": ["<TAG>"]
              }
          ]
      }

   +-----------------+---------------------------------------------------------------------------------+
   | **Field**       | **Description**                                                                 |
   +=================+=================================================================================+
   | ``description`` | A description of the monitor queries.                                           |
   +-----------------+---------------------------------------------------------------------------------+
   | ``queries``     | The list of queries. Add one object for each query.                             |
   +-----------------+---------------------------------------------------------------------------------+
   | ``name``        | A name for the query. The trigger condition uses this name to select the query. |
   +-----------------+---------------------------------------------------------------------------------+
   | ``query``       | The query, in query string syntax. See :ref:`Query syntax                       |
   |                 | <active_response_query_syntax>`.                                                |
   +-----------------+---------------------------------------------------------------------------------+
   | ``tags``        | Optional tags. The trigger condition can select all queries that share a tag.   |
   +-----------------+---------------------------------------------------------------------------------+

#. In the **Triggers** section, click **Add trigger** and fill in the following parameters:

   +-------------------+------------------------------------------------------------------------------+
   | **Field**         | **Description**                                                              |
   +===================+==============================================================================+
   | Trigger name      | A name for the trigger.                                                      |
   +-------------------+------------------------------------------------------------------------------+
   | Severity level    | The severity of the alerts that the trigger generates, from 1 (Highest) to 5 |
   |                   | (Lowest).                                                                    |
   +-------------------+------------------------------------------------------------------------------+
   | Trigger condition | An expression that selects the queries to evaluate, such as                  |
   |                   | ``query[name=<QUERY_NAME>]``. Use ``query[tag=<TAG>]`` to select all queries |
   |                   | that share a tag. Combine expressions with ``||`` when either can match, or  |
   |                   | ``&&`` when the same finding must match both.                                |
   +-------------------+------------------------------------------------------------------------------+

#. In the **Actions** subsection, click **Add active response** and fill in the parameters as described in :ref:`Using the Visual editor <active_response_visual_editor>`.

#. Click **Create** to save the monitor.

Extraction query structure
""""""""""""""""""""""""""

The extraction query is a JSON object with the following fields:

+-----------------+--------------+-------------------------------------------------------------+
| **Field**       | **Required** | **Description**                                             |
+=================+==============+=============================================================+
| ``description`` | No           | A description of the queries.                               |
+-----------------+--------------+-------------------------------------------------------------+
| ``queries``     | Yes          | The list of queries. The monitor evaluates each query       |
|                 |              | separately against every new finding.                       |
+-----------------+--------------+-------------------------------------------------------------+
| ``name``        | Yes          | A name for the query. Use a unique name for each query. The |
|                 |              | trigger condition refers to the query by this name, such as |
|                 |              | ``query[name=<QUERY_NAME>]``.                               |
+-----------------+--------------+-------------------------------------------------------------+
| ``query``       | Yes          | The condition that a finding must match, in query string    |
|                 |              | syntax. See :ref:`Query syntax                              |
|                 |              | <active_response_query_syntax>`.                            |
+-----------------+--------------+-------------------------------------------------------------+
| ``tags``        | No           | A list of labels for the query. The trigger condition can   |
|                 |              | select all queries that share a tag, such as                |
|                 |              | ``query[tag=<TAG>]``.                                       |
+-----------------+--------------+-------------------------------------------------------------+

The ``name`` and ``query`` fields are required. The Wazuh indexer adds an ``id`` field to each query when you save the monitor, so you don't need to set it.

The following example defines two queries. The first query matches cross-site scripting findings, and the second matches SQL injection findings. Both queries share the ``web`` tag:

.. code-block:: json

   {
       "description": "Detects web attack findings",
       "queries": [
           {
               "name": "xss_query",
               "query": "wazuh.rule.title:*scripting*",
               "tags": ["web"]
           },
           {
               "name": "sqli_query",
               "query": "wazuh.rule.title:*injection*",
               "tags": ["web"]
           }
       ]
   }

With this extraction query, the trigger condition ``query[tag=web]`` runs the active response for both types of findings. The condition ``query[name=xss_query]`` runs it only for cross-site scripting findings.

.. _active_response_query_syntax:

Query syntax
""""""""""""""""""""""""""

Each ``query`` value uses the query string syntax. A query is made up of one or more conditions in the ``<FIELD>:<VALUE>`` format, where:

-  ``<FIELD>`` is the full name of a Wazuh Common Schemas (WCS) field in the finding, such as ``wazuh.rule.id``, ``wazuh.rule.title``, ``source.ip``, or ``file.path``.

-  ``<VALUE>`` is the value to match. Its format depends on the operator, such as an exact value, a pattern with wildcards, or a range.

You can combine conditions with Boolean operators and group them with parentheses. For example, the following query matches findings from rule ``<RULE_ID>`` that involve a file inside a ``Downloads`` directory:

.. code-block:: none

   wazuh.rule.id:"<RULE_ID>" AND file.path:*Downloads*

The following table lists the operators that you can use in a query:

+--------------------------------+-----------------------------------------------------------------------+----------------------------------------------------+
| **Operator**                   | **Example**                                                           | **Matches findings where**                         |
+================================+=======================================================================+====================================================+
| Quoted value                   | ``wazuh.rule.title:"Cross site scripting strings - 192.168.56.250"``  | The rule title is exactly the quoted text.         |
+--------------------------------+-----------------------------------------------------------------------+----------------------------------------------------+
| ``*`` (any characters)         | ``wazuh.rule.title:*scripting*``                                      | The rule title contains scripting.                 |
+--------------------------------+-----------------------------------------------------------------------+----------------------------------------------------+
| ``?`` (one character)          | ``wazuh.rule.title:*scr?pting*``                                      | The rule title contains scr, any single character, |
|                                |                                                                       | and pting.                                         |
+--------------------------------+-----------------------------------------------------------------------+----------------------------------------------------+
| ``/ /`` (regular expression)   | ``wazuh.rule.title:/.*script.*/``                                     | The rule title matches the regular expression.     |
+--------------------------------+-----------------------------------------------------------------------+----------------------------------------------------+
| ``AND``, ``&&``                | ``wazuh.rule.title:*scripting* AND source.ip:"192.168.56.250"``       | Both conditions are true.                          |
+--------------------------------+-----------------------------------------------------------------------+----------------------------------------------------+
| ``OR``, ``||``                 | ``wazuh.rule.title:*scripting* OR wazuh.rule.title:*injection*``      | At least one condition is true.                    |
+--------------------------------+-----------------------------------------------------------------------+----------------------------------------------------+
| ``NOT``, ``-``                 | ``wazuh.rule.title:*scripting* AND NOT wazuh.rule.title:*injection*`` | The first condition is true and the second is      |
|                                |                                                                       | false.                                             |
+--------------------------------+-----------------------------------------------------------------------+----------------------------------------------------+
| ``( )`` (grouping)             | ``wazuh.rule.title:(*scripting* OR *injection*)``                     | The rule title contains scripting or injection.    |
+--------------------------------+-----------------------------------------------------------------------+----------------------------------------------------+
| ``[ TO ]``, ``{ TO }`` (range) | ``http.response.status_code:[400 TO 499]``                            | The status code is from 400 to 499. Square         |
|                                |                                                                       | brackets include the limits, and curly brackets    |
|                                |                                                                       | exclude them.                                      |
+--------------------------------+-----------------------------------------------------------------------+----------------------------------------------------+
| ``>``, ``>=``, ``<``, ``<=``   | ``http.response.status_code:>=400``                                   | The status code is 400 or higher.                  |
+--------------------------------+-----------------------------------------------------------------------+----------------------------------------------------+
| ``_exists_``                   | ``_exists_:file.path``                                                | The finding has a file.path field.                 |
+--------------------------------+-----------------------------------------------------------------------+----------------------------------------------------+
| IP network (CIDR)              | ``source.ip:"192.168.56.0/24"``                                       | The source IP address is in the 192.168.56.0/24    |
|                                |                                                                       | network.                                           |
+--------------------------------+-----------------------------------------------------------------------+----------------------------------------------------+

Keep the following rules in mind when you write a query:

-  Write ``AND``, ``OR``, and ``NOT`` in uppercase. Lowercase operators, such as ``and``, are treated as search terms.

-  Always include the field name. A value without a field, such as ``scripting``, doesn't match reliably.

-  Matching is case-sensitive. For example, ``wazuh.rule.title:*Scripting*`` doesn't match a rule title that contains ``scripting``. The Windows agent reports file paths in lowercase, such as ``c:\users\<USER>\downloads\eicar.txt``, so write Windows paths in lowercase.

-  A quoted value matches the whole field value, not a phrase inside it. For example, ``wazuh.rule.title:"scripting strings"`` doesn't match the title ``Cross site scripting strings - 192.168.56.250``. Use wildcards to match part of a value.

-  Escape spaces and special characters, such as ``: \ / ( ) [ ] { } " * ?``, with a backslash. For example, ``wazuh.rule.title:Cross\ site\ scripting*``. In the JSON, write each backslash twice, so this query becomes ``"wazuh.rule.title:Cross\\ site\\ scripting*"``. Wildcards avoid most escaping, for example ``file.path:*downloads*`` instead of a full Windows path.

-  If the monitor uses more than one index, combine ``NOT`` with a positive condition, such as ``_exists_:wazuh.rule.title AND NOT wazuh.rule.title:*scripting*``. A query that contains only a negation can return incorrect matches across several indices.

Building a query
""""""""""""""""""""""""""

Follow these steps to build and check the queries of an extraction query:

#. Identify the findings that the monitor must respond to. Open one of these findings in the **Threat Hunting** module and note the fields and values that identify it, such as ``wazuh.rule.id``, ``wazuh.rule.title``, or ``file.path``.

#. Write a condition for each field with the operators described in **Query syntax**. Combine the conditions in one query, or define separate queries and combine them in the trigger condition.

#. Add each query to the ``queries`` list of the extraction query, with a unique ``name``.

#. Select the monitor index and click **Run**. The **Extraction query response** shows the findings that match each query. Check that the response includes the findings that you expect and excludes the others.

#. Write a trigger condition that selects the queries, such as ``query[name=<QUERY_NAME>]``.

You can also generate a starting query with the **Visual editor**. Create and save the monitor with the **Visual editor**, then edit the monitor and select **Extraction query editor**. The **Define extraction query** field shows the queries that the **Visual editor** built, in JSON format. The **Visual editor** operators correspond to the following query strings:

+----------------------------+-----------------------------+
| **Visual editor operator** | **Query string**            |
+============================+=============================+
| is                         | ``<FIELD>:"<VALUE>"``       |
+----------------------------+-----------------------------+
| is not                     | ``NOT (<FIELD>:"<VALUE>")`` |
+----------------------------+-----------------------------+

Monitored endpoint
--------------------

Wazuh provides out-of-the-box active response scripts for performing common response actions on monitored endpoints. These scripts are included with the Wazuh agent and do not require additional scripts to be deployed on the endpoint.

For example, the ``block-ip`` script blocks or unblocks network access from a specified IP address using supported firewall mechanisms available on the endpoint. On Linux endpoints, Wazuh also provides the ``disable-account`` script to disable or re-enable user accounts.

See the :doc:`Default active response scripts <default-active-response-scripts>` section for a complete list of the available scripts, the actions they perform, and the operating systems they support.

When a required response action is not available through the default scripts, you can create a custom active response script. Wazuh supports custom scripts written in any programming language. Before the Wazuh agent can execute a custom script, place it in the agent's active response directory for that platform and configure the required permissions.

A custom active response script must also implement the JSON message format that Wazuh uses to communicate with active response scripts. See :ref:`Developing active response scripts <developing_active_response_scripts>` for the required message format, and the subsections below for the script location and permissions on Linux/Unix, macOS, and Windows endpoints.

Linux/Unix
^^^^^^^^^^

#. Add your custom active response script or executable to the ``/var/ossec/active-response/bin`` directory on Linux/Unix endpoints.

#. Change the script permissions and ownership as shown below:

   .. code-block:: console

      $ sudo chmod 750 /var/ossec/active-response/bin/<CUSTOM_SCRIPT>
      $ sudo chown root:wazuh /var/ossec/active-response/bin/<CUSTOM_SCRIPT>

macOS
^^^^^

#. Add your custom active response script or executable to the ``/Library/Ossec/active-response/bin`` directory on macOS endpoints.

#. Change the script permissions and ownership as shown below:

   .. code-block:: console

      $ sudo chmod 750 /Library/Ossec/active-response/bin/<CUSTOM_SCRIPT>
      $ sudo chown root:wazuh /Library/Ossec/active-response/bin/<CUSTOM_SCRIPT>

Windows
^^^^^^^

Add your custom active response script or executable to the ``C:\Program Files (x86)\ossec-agent\active-response\bin`` directory on Windows endpoints.

Excluding IP addresses from active responses
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The Wazuh agent doesn't run an active response when the ``source.ip`` value of the finding is an excluded address. The agent always excludes the Wazuh manager address, the loopback addresses ``127.0.0.0/8`` and ``::1``, and the unspecified addresses ``0.0.0.0`` and ``::``. To exclude other hosts, such as administration workstations or vulnerability scanners, add ``allowlist`` options to the ``active-response`` block of the Wazuh agent configuration file.

Each ``allowlist`` option takes one IPv4 or IPv6 address or CIDR range:

.. code-block:: xml

   <active-response>
     <disabled>no</disabled>
     <allowlist>192.168.56.10</allowlist>
     <allowlist>10.99.0.0/16</allowlist>
   </active-response>

The Wazuh agent configuration file is ``/var/ossec/etc/ossec.conf`` on Linux/Unix, ``/Library/Ossec/etc/ossec.conf`` on macOS, and ``C:\Program Files (x86)\ossec-agent\ossec.conf`` on Windows. Restart the Wazuh agent to apply the change. Host names, ``any``, and negated values, such as ``!192.168.56.10``, are configuration errors, and the Wazuh agent doesn't start. The ``allowlist`` option replaces the ``white_list`` option of the Wazuh 4.x manager configuration.

When the Wazuh agent skips an active response because of an excluded address, it writes a warning such as the following to its log file:

.. code-block:: none
   :class: output

   wazuh-execd: WARNING: Active response 'block-ip' not executed: source.ip '192.168.56.10' is the manager or in the allowlist.
