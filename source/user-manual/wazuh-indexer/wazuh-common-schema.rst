.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: The Wazuh Common Schema standardizes how the Wazuh indexer organizes and categorizes security event data. Find more information in this section of the documentation.

Wazuh Common Schema (WCS)
=========================

WCS is a standardized structure for organizing and categorizing security event data from any source, ensuring consistent analysis, correlation, and reporting across data types. The WCS definitions, templates, and mappings are maintained in the `wazuh-indexer-plugins repository <https://github.com/wazuh/wazuh-indexer-plugins>`__.

Every event category shares a single baseline template (``templates/streams/events.json``). During deployment, the Setup module generates one index template for each category from this shared template by overriding the ``index_patterns`` and ``rollover_alias`` fields. Specialized data streams, such as raw, unclassified, and active-responses, use dedicated template files instead.

Template priority
-----------------

The index mappings and settings for subcategories override those from the main category. Templates with lower priority apply first, while higher-priority templates apply later and can override earlier settings. The main category template applies first with priority 1. The subcategory template applies afterward with priority 10, overriding the main category's default settings.

Categories
----------

The Key column on the table below is the canonical identifier used everywhere: in data stream names, integrations, rules, decoders, and the Security Analytics module. Use it exactly as shown when creating or referencing any of these resources.

+-------------------+-----------------------+--------------------------------------------------------+
| Name              | Key                   | Example log types                                      |
+===================+=======================+========================================================+
| Access Management | ``access-management`` | ``ad_ldap``, ``apache_access``, ``okta``               |
+-------------------+-----------------------+--------------------------------------------------------+
| Applications      | ``applications``      | ``github``, ``gworkspace``, ``m365``                   |
+-------------------+-----------------------+--------------------------------------------------------+
| Cloud Services    | ``cloud-services``    | ``azure``, ``cloudtrail``, ``s3``                      |
+-------------------+-----------------------+--------------------------------------------------------+
| Network Activity  | ``network-activity``  | ``dns``, ``network``, ``vpcflow``                      |
+-------------------+-----------------------+--------------------------------------------------------+
| Security          | ``security``          | ``waf``                                                |
+-------------------+-----------------------+--------------------------------------------------------+
| System Activity   | ``system-activity``   | ``linux``, ``windows``, ``others_macos``               |
+-------------------+-----------------------+--------------------------------------------------------+
| Other             | ``other``             | ``others_application``, ``others_apt``, ``others_web`` |
+-------------------+-----------------------+--------------------------------------------------------+
| Unclassified      | ``unclassified``      | Events that couldn't be categorized                    |
+-------------------+-----------------------+--------------------------------------------------------+

.. note::

   Unclassified is a catch-all for events that could not be assigned to any other category. It is managed automatically by the pipeline and is not to be used as a target category when creating new integrations or rules.
