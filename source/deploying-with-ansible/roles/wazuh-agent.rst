.. Copyright (C) 2021 Wazuh, Inc.

.. _ansible-wazuh-agent:

Wazuh Agent
--------------

This role is designed to install and configure Wazuh Agent on different hosts, this agent is compatible with Linux and Windows machines. Also, has the ability to register the agent using the ``wazuh-authd`` service on the Wazuh Manager, you can use several variables to customize the installation:

- **wazuh_managers:** a list of dictionaries to set Wazuh manager/s node/s to report .
- **wazuh_agent_authd:** array with a set of options to register the Wazuh agent on the Wazuh server, will require the ``wazuh-authd`` service started on the Wazuh server.

For example, create a YAML file ``wazuh-agent.yml`` to be used as an Ansible playbook:

.. code-block:: yaml

    - hosts: all:!wazuh-manager
      roles:
       - ansible-wazuh-agent

You can maintain different environments using a variable definition YAML file for each one:

a. For production environment ``vars-production.yml``:

.. code-block:: yaml

    wazuh_managers:
      - address: 10.1.1.12
        port: 1514
        protocol: udp
    wazuh_agent_authd:
      registration_address: 10.1.1.12
      enable: true
      port: 1515
      ssl_agent_ca: null
      ssl_auto_negotiate: 'no'

b. For development environment ``vars-development.yml``:

.. code-block:: yaml

    wazuh_managers:
      - address: 192.168.0.10
        port: 1514
        protocol: udp
    wazuh_agent_authd:
      registration_address: 192.168.0.10
      enable: true
      port: 1515
      ssl_agent_ca: null
      ssl_auto_negotiate: 'no'

Next, run the ansible playbook:

.. code-block:: console

  $ ansible-playbook wazuh-agent.yml -e@vars-production.yml

The example above for a production environment will install a Wazuh agent in all hosts except ``wazuh-manager``, then it will register against them ``wazuh-manager`` with IP address ``10.1.1.12``.

Please review the :ref:`references <wazuh_ansible_reference_agent>` section to see all variables available for this role.
