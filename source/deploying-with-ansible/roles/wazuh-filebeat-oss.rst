.. Copyright (C) 2020 Wazuh, Inc.

.. _ansible-wazuh-filebeat-oss:

Filebeat-oss
------------

Filebeat-oss can be used in conjunction with Wazuh Manager to send events and alerts to ODFE, this role will install Filebeat-oss, you can customize the installation with these variables:

- **filebeat_output_elasticsearch_hosts:** define Elasticsearch node(s) to be use (default: ``127.0.0.1:9200``).

Please review the :ref:`references <wazuh_ansible_reference_filebeat_oss>` section to see all variables available for this role.
