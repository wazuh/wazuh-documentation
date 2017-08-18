.. _ansible-wazuh-kibana:

Kibana
--------------

This is similar to elasticsearch role, is intended to deploy Kibana and installing the correct Wazuh App version, you can customize the installation with this vars:

- **elasticsearch_network_host:** define elasticsearch node ip address (default: ``127.0.0.1``).
- **elasticsearch_http_port:** define elasticsearch node port (default: ``9200``).
- **kibana_server_host**: define kibana listen address (default: ``0.0.0.0``).
- **elastic_stack_version**: define kibana version to be installed.

You can create a YAML file ``wazuh-kibana.yml`` to be used be Ansible playbook:

.. code-block:: yaml

  - hosts: kibana
    roles:
      - ansible-role-kibana

You can set your custom variable definitions for different environment, be example:

a. For production environment ``vars-production.yml``:

.. code-block:: yaml

    elasticsearch_network_host: '10.1.1.10'

b. For development enviroment ``vars-development.yml``:

.. code-block:: yaml

    elasticsearch_network_host: '192.168.0.10'

Next, run the Ansible playbook: ::

  ansible-playbook wazuh-kibana.yml -e@vars-production.yml

The example above will install Kibana and configure to use ``10.1.1.10`` as Elasticsearch node.
