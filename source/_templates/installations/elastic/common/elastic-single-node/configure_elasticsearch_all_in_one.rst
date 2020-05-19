.. Copyright (C) 2020 Wazuh, Inc.

Once Elasticsearch is installed it can be configured by downloading the file ``/etc/elasticsearch/elasticsearch.yml`` as follows:

.. code-block:: console

  # curl -so /etc/elasticsearch/elasticsearch.yml https://raw.githubusercontent.com/wazuh/wazuh/new-documentation-templates/extensions/elasticsearch/7.x/elasticsearch_all_in_one.yml

In order to use Wazuh Kibana plugin properly, it is neccesary to add the role ``wazuh-ui``. It can be added by downloading the following files:

.. code-block:: console

  # curl -so /usr/share/elasticsearch/plugins/opendistro_security/securityconfig/roles.yml https://raw.githubusercontent.com/wazuh/wazuh/new-documentation-templates/extensions/elasticsearch/roles/roles.yml
  # curl -so /usr/share/elasticsearch/plugins/opendistro_security/securityconfig/roles_mapping.yml https://raw.githubusercontent.com/wazuh/wazuh/new-documentation-templates/extensions/elasticsearch/roles/roles_mapping.yml  

.. End of include file
