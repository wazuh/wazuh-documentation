.. _reference_ossec_integration:


integration
===========

.. topic:: XML section name

	.. code-block:: xml

		<integration>

This configures the manager to connect Wazuh to external APIs and alerting tools such as Slack and PagerDuty.

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
| `rule_id`_       | rules IDs                                                             |
+------------------+-----------------------------------------------------------------------+
| `group`_         | One or more groups or categories                                      |
+------------------+-----------------------------------------------------------------------+
| `event_location`_| Any single agent name, hostname, ip address, or log file              |
+------------------+-----------------------------------------------------------------------+


``name``
--------

This indicates the type of the service to integrate with. Allowed values:

- ``slack``
- ``pagerduty``


``hook_url``
------------

This is the URL provided by Slack when integration is enabled on the Slack side. This is **mandatory for
Slack.**


``api_key``
-----------

This is the key that you would have retrieved from the PagerDuty API. This is **mandatory for PagerDuty.**

.. note:: You must restart OSSEC after changing this configuration.


Optional filters
^^^^^^^^^^^^^^^^

``level``
---------

This filter alerts by rule level.  It will push only alerts with the specified level or above.


``rule_id``
-----------

This filters alerts by rule ID.


``group``
---------

This filters alerts by rules. `OS_Regex Syntax`_.


``event_location``
------------------

This filters alerts by the location of where the event originated. `OS_Regex Syntax`_

.. _`OS_Regex Syntax`: http://ossec-docs.readthedocs.org/en/latest/syntax/regex.html
