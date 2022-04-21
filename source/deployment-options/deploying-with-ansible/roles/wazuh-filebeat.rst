.. Copyright (C) 2015–2022 Wazuh, Inc.

.. meta::
  :description: Filebeat is used in conjunction with the Wazuh manager to send events and alerts to Elasticsearch. Learn how to customize the installation here.
  
Filebeat
--------

Filebeat can be used in conjunction with Wazuh Manager to send events and alerts to the Wazuh indexer. This role will install Filebeat, you can customize the installation with these variables:

-   ``filebeat_output_indexer_hosts``: This defines the indexer node(s) to be used (default: ``127.0.0.1:9200``).

Please review the :ref:`variables references <wazuh_ansible_reference_filebeat>` section to see all variables available for this role.
