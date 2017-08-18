.. _ansible-wazuh-elasticsearch:

Elasticsearch
--------------

This role is intended to deploy Elasticsearch node, you have some variables that can be used to customize the installation:

- **elasticsearch_network_host:** define listen ip address (default: ``127.0.0.1``).
- **elasticsearch_http_port:** define listen port (default: ``9200``).
- **elasticsearch_jvm_xms**: amount of memory for java (default: ``1g``).
- **elastic_stack_version**: define elk version to be installed.

You can create a YAML file ``wazuh-elastic.yml`` to be used by Ansible playbook:

.. code-block:: yaml

  - hosts: elasticsearch
    roles:
    - ansible-role-elasticsearch

You can set your custom variable definitions for different environment, be example:

a. For production enviroment ``vars-production.yml``:

.. code-block:: yaml

    elasticsearch_network_host: '10.1.1.10'

b. For development enviroment ``vars-development.yml``:

.. code-block:: yaml

    elasticsearch_network_host: '192.168.0.10'

Next, run the ansible playbook: ::

  ansible-playbook wazuh-elastic.yml -e@vars-production.yml

The example above will install Elasticsearch and set the listen address to: ``10.1.1.10`` using ``vars-production.yml``.
