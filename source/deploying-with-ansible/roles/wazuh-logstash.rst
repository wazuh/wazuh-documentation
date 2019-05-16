.. Copyright (C) 2019 Wazuh, Inc.

.. _ansible-wazuh-logstash:

Logstash
--------------

This role will install and configure Logstash with Wazuh templates on the hosts you selected, you can customize the installation with this vars:

- **elasticsearch_network_host:** defines Elasticsearch node ip address (default: ``127.0.0.1``).
- **elasticsearch_http_port:** defines Elasticsearch node port (default: ``9200``).
- **elastic_stack_version**: defines Logstash version to be installed.
- **logstash_input_beats**: defines the use of File input or Filebeat input. (default: ``false``)

Create a YAML file ``wazuh-logstash.yml`` to be used by Ansible playbook:

.. code-block:: yaml

    - hosts: logstash
      roles:
        - ansible-role-logstash

You can set your custom variable definitions for different environments, for example:

a. For production environment ``vars-production.yml``:

.. code-block:: yaml

    elasticsearch_network_host: '10.1.1.10'
    logstash_input_beats: true

b. For development environment ``vars-development.yml``:

.. code-block:: yaml

    elasticsearch_network_host: '127.0.0.1'
    logstash_input_beats: false

Next, run the Ansible playbook:

.. code-block:: console

  $ ansible-playbook wazuh-logstash.yml -e@vars-production.yml

The example above will install Logstash and configure to use ``10.1.1.10`` as Elasticsearch node enabling the Filebeat input.

Please review the :ref:`references <wazuh_ansible_reference_logstash>` section to see all variables available for this role.
