.. Copyright (C) 2021 Wazuh, Inc.

.. meta::
  :description: Filebeat is used in conjunction with the Wazuh manager to send events and alerts to Elasticsearch. Learn how to customize the installation here.
  
.. _ansible-wazuh-filebeat:

Filebeat
--------------

Filebeat can be used in conjunction with Wazuh Manager to send events and alerts to Elasticsearch, this role will install Filebeat, you can customize the installation with these variables:

- **filebeat_output_elasticsearch_hosts:** define Elasticsearch node(s) to be use (default: ``127.0.0.1:9200``).

Please review the :ref:`references <wazuh_ansible_reference_filebeat>` section to see all variables available for this role.
