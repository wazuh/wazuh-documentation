.. Copyright (C) 2019 Wazuh, Inc.

.. _ansible-wazuh-kibana:

Kibana
--------------

This is similar to the Elasticsearch role and is intended to deploy Kibana with the correct Wazuh APP version, you can customize the installation with the following:

- **elasticsearch_network_host:** defines Elasticsearch node ip address (default: ``127.0.0.1``).
- **elasticsearch_http_port:** defines Elasticsearch node port (default: ``9200``).
- **kibana_server_host**: defines Kibana listen address (default: ``0.0.0.0``).
- **elastic_stack_version**: defines Kibana version to be installed.

You can create a YAML file ``wazuh-kibana.yml`` to be used be Ansible playbook:

.. code-block:: yaml

  - hosts: kibana
    roles:
      - ansible-role-kibana

You can set your custom variable definitions for different environments, for example:

a. For production environment ``vars-production.yml``:

.. code-block:: yaml

    elasticsearch_network_host: '10.1.1.10'

b. For development environment ``vars-development.yml``:

.. code-block:: yaml

    elasticsearch_network_host: '192.168.0.10'

Next, run the Ansible playbook: ::

  $ ansible-playbook wazuh-kibana.yml -e@vars-production.yml

The example above will install Kibana and configure to use ``10.1.1.10`` as Elasticsearch node.

Please review the :ref:`references <wazuh_ansible_reference_kibana>` section to see all variables available for this role.
