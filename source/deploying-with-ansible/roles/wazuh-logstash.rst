.. _ansible-wazuh-logstash:

Logstash
--------------

This role will install and configure Logstash with Wazuh template on the hosts you selected, you can customize the installation with this vars:

- **elasticsearch_network_host:** define elasticsearch node ip address (default: ``127.0.0.1``).
- **elasticsearch_http_port:** define elasticsearch node port (default: ``9200``).
- **elastic_stack_version**: define kibana version to be installed.

Create a YAML file ``wazuh-logstash.yml`` to be used be Ansible playbook:

.. code-block:: yaml

    - hosts: logstash
      roles:
        - ansible-role-logstash

You can set your custom variable definitions for different environment, be example:

a. For production enviroment ``vars-production.yml``:

.. code-block:: yaml

    elasticsearch_network_host: '10.1.1.10'

b. For development enviroment ``vars-development.yml``:

.. code-block:: yaml

    elasticsearch_network_host: '192.168.0.10'

Next, run the ansible playbook:

.. code-block:: bash

  ansible-playbook wazuh-logstash.yml -e@vars-production.yml

The example above will install Logstash and configure to use ``10.1.1.10`` as Elasticsearch node.
