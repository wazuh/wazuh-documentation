.. Copyright (C) 2020 Wazuh, Inc.

.. _ansible-wazuh-opendistro-elasticsearch:

Opendistro for Elasticsearch
----------------------------

This role is intended to deploy Opendistro for Elasticsearch node. You have some variables that can be used to customize the installation:

- **elasticsearch_network_host:** defines listen ip address (default: ``127.0.0.1``).
- **elasticsearch_reachable_host:** sets ip address to perform a test after elasticsearch install. It usually matches the ``elasticsearch_network_host`` address.
- **elasticsearch_http_port:** defines listen port (default: ``9200``).
- **elasticsearch_jvm_xms**: amount of memory for java (default: ``null``).
- **elastic_stack_version**: defines elk version to be installed.


You can create a YAML file ``wazuh-elastic.yml`` to be used by Ansible playbook:

.. code-block:: yaml

  - hosts: elasticsearch
    roles:
    - ansible-role-elasticsearch

You can set your custom variable definitions for different environments, for example:

a. For production environment ``vars-production.yml``:

.. code-block:: yaml

    elasticsearch_network_host: '10.1.1.10'

b. For development environment ``vars-development.yml``:

.. code-block:: yaml

    elasticsearch_network_host: '192.168.0.10'

Next, run the ansible playbook: ::

  $ ansible-playbook wazuh-elastic.yml -e@vars-production.yml

The example above will install ODFE and set the listen address to: ``10.1.1.10`` using ``vars-production.yml``.

Please review the :ref:`references <wazuh_ansible_reference_opendistro_elasticsearch>` section to see all variables available for this role.
