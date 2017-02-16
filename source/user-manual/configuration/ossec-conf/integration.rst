.. _reference_ossec_integration:


Integration
===========

.. topic:: XML section name

	.. code-block:: xml

		<integration>

Configure manager to connect Wazuh to external APIs and alerting tools, such Slack and PagerDuty.

+------------------+-----------------------------------------------------------------------+
| Options          | Allowed values                                                        |
+==================+=======================================================================+
| `name`_          | slack, pagerdty                                                       |
+------------------+-----------------------------------------------------------------------+
| `hook_url`_      | Slack URL                                                             |
+------------------+-----------------------------------------------------------------------+
| `api_key`_       | PagerDuty Api key                                                     |
+------------------+-----------------------------------------------------------------------+
| `level`_         | Any alert level from 0 to 16                                          |
+------------------+-----------------------------------------------------------------------+
| `rule_id`_       | Id rules                                                              |
+------------------+-----------------------------------------------------------------------+
| `group`_         | One or more groups or categories                                      |
+------------------+-----------------------------------------------------------------------+
| `event_location`_| Any single agent name, hostname, ip address, or log file              |
+------------------+-----------------------------------------------------------------------+


``name``
--------

Name of the service. Allowed values:

- ``slack``
- ``pagerduty``

``hook_url``
------------

The URL provided by Slack when the integration was enabled. **Mandatory for
Slack.**

``api_key``
-----------

The key that you retrieved from the PagerDuty API. **Mandatory for PagerDuty.**

.. note:: You must restart OSSEC after changing the configuration.

Optional filters
^^^^^^^^^^^^^^^^

``level``
---------

Filter rules by level: push only alerts with the specified level or above.

``rule_id``
-----------

Filter by rule ID.

``group``
---------

Filter rules by category. `OS_Regex Syntax`_.

``event_location``
------------------

Filter rules by location where they were originated. `OS_Regex Syntax`_

.. _`OS_Regex Syntax`: http://ossec-docs.readthedocs.org/en/latest/syntax/regex.html
