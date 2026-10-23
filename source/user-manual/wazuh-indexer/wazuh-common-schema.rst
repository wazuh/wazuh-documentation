.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: The Wazuh Common Schema standardizes how the Wazuh indexer organizes and categorizes security event data. Find more information in this section of the documentation.

Wazuh Common Schema (WCS)
=========================

WCS is a standardized structure for organizing and categorizing security event data from any source, ensuring consistent analysis, correlation, and reporting across data types. The WCS definitions, templates, and mappings are maintained in the `wazuh-indexer-plugins repository <https://github.com/wazuh/wazuh-indexer-plugins>`__.

Every event category, including ``unclassified``, shares a single baseline template, ``plugins/setup/src/main/resources/templates/streams/events.json``. Findings categories share their own baseline template, ``plugins/setup/src/main/resources/templates/streams/findings.json``. During deployment, the Setup module generates one index template per category from the shared template. It overrides only the ``index_patterns`` field, for example to ``wazuh-events-v5-security*``. Specialized data streams, such as ``raw`` and ``active-responses``, use dedicated template files instead. For the fields in each index, see the :doc:`WCS field reference </user-manual/reference/wazuh-common-schema>`.

Template priority
-----------------

Every Wazuh-managed index template has priority 1, and each one matches a single data stream or index. When more than one index template matches a new index, the Wazuh indexer applies only the template with the highest priority. It does not merge them.

Categories
----------

The Key column on the table below is the canonical identifier used everywhere: in data stream names, integrations, rules, decoders, and the Security Analytics module. Use it exactly as shown when creating or referencing any of these resources.

+-------------------+-----------------------+--------------------------------------------------------------------+
| Name              | Key                   | Example log types                                                  |
+===================+=======================+====================================================================+
| Access Management | ``access-management`` | ``okta``, ``keycloak``, ``jumpcloud``                              |
+-------------------+-----------------------+--------------------------------------------------------------------+
| Applications      | ``applications``      | ``apache-http``, ``nginx``, ``google-workspace``                   |
+-------------------+-----------------------+--------------------------------------------------------------------+
| Cloud Services    | ``cloud-services``    | ``aws``, ``azure``, ``gcp``, ``github``                            |
+-------------------+-----------------------+--------------------------------------------------------------------+
| Network Activity  | ``network-activity``  | ``cisco-asa``, ``fortinet``, ``pfsense``, ``netflow``              |
+-------------------+-----------------------+--------------------------------------------------------------------+
| Security          | ``security``          | ``crowdstrike``, ``suricata``, ``m365-defender``, ``sentinel-one`` |
+-------------------+-----------------------+--------------------------------------------------------------------+
| System Activity   | ``system-activity``   | ``linux``, ``windows``, ``macos``, ``auditd``                      |
+-------------------+-----------------------+--------------------------------------------------------------------+
| Other             | ``other``             | ``others_application``, ``others_apt``, ``others_web``             |
+-------------------+-----------------------+--------------------------------------------------------------------+
| Unclassified      | ``unclassified``      | Events that couldn't be categorized                                |
+-------------------+-----------------------+--------------------------------------------------------------------+

.. note::

   ``unclassified`` is a catch-all for events that could not be assigned to any other category. It is managed automatically by the pipeline and is not to be used as a target category when creating new integrations or rules.
