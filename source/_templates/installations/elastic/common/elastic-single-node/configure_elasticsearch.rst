.. Copyright (C) 2020 Wazuh, Inc.

Once Elasticsearch is installed, download the preconfigured configuration file:

.. code-block:: console

  # curl -so /etc/elasticsearch/elasticsearch.yml https://raw.githubusercontent.com/wazuh/wazuh/new-documentation-templates/extensions/elasticsearch/7.x/elasticsearch.yml

This file is configured to use ``0.0.0.0`` as default IP, which binds all the available IPs on the machine. This configuration may not be suitable for all environments since the Elasticsearch installation will be accessible from all the machine’s IPs, that is why it is recommended to modify this value and bind the ``network.host`` to the desired IP address. This value can be changed by any available IP on the file ``/etc/elasticsearch/elasticsearch.yml``. More information about ``network.host`` attribute can be found on Open Distro for Elasticsearch page in `Bind a cluster to specific IP addresses <https://opendistro.github.io/for-elasticsearch-docs/docs/elasticsearch/cluster/#step-3-bind-a-cluster-to-specific-ip-addresses>`_ section.

In order to use Wazuh Kibana plugin properly, it is neccesary to add the roles ``wazuh-ui``, ``wazuh-ui-user`` and ``wazuh-ui-admin``. Besides, two users are added to the default users, ``wazuh_user`` and ``wazuh_admin``:

.. code-block:: console

  # curl -so /usr/share/elasticsearch/plugins/opendistro_security/securityconfig/roles.yml https://raw.githubusercontent.com/wazuh/wazuh/new-documentation-templates/extensions/elasticsearch/roles/roles.yml
  # curl -so /usr/share/elasticsearch/plugins/opendistro_security/securityconfig/roles_mapping.yml https://raw.githubusercontent.com/wazuh/wazuh/new-documentation-templates/extensions/elasticsearch/roles/roles_mapping.yml
  # curl -so /usr/share/elasticsearch/plugins/opendistro_security/securityconfig/internal_users.yml https://raw.githubusercontent.com/wazuh/wazuh/new-documentation-templates/extensions/elasticsearch/roles/internal_users.yml

.. End of include file
