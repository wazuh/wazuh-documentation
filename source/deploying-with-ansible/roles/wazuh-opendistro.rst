.. Copyright (C) 2021 Wazuh, Inc.

.. _ansible-wazuh-opendistro:

Open Distro
-----------

This role is intended to deploy the Open Distro node. The following variables can be used to customize the installation:

- **elasticsearch_network_host:** defines listen ip address (default: ``127.0.0.1``).
- **elasticsearch_http_port:** defines listen port (default: ``9200``).
- **elasticsearch_jvm_xms**: amount of memory for java (default: ``null``).
- **elastic_stack_version**: defines elk version to be installed.

You can create a YAML file ``wazuh-opendistro.yml`` to be used by Ansible playbook:

.. code-block:: yaml

  - hosts: opendistro
    roles:
    - ansible-role-opendistro

You can set your custom variable definitions for different environments, for example:

a. For production environment ``vars-production.yml``:

.. code-block:: yaml

    elasticsearch_network_host: '10.1.1.10'

b. For development environment ``vars-development.yml``:

.. code-block:: yaml

    elasticsearch_network_host: '192.168.0.10'

Next, run the ansible playbook: ::

  $ ansible-playbook wazuh-elastic.yml -e@vars-production.yml

The example above will install Open Distro and set the listen address to: ``10.1.1.10`` using ``vars-production.yml``.

Please review the :ref:`references <wazuh_ansible_reference_elasticsearch>` section to see all variables available for this role.