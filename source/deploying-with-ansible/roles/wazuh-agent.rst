.. _ansible-wazuh-agent:

Wazuh agent
--------------

First you need a Wazuh Manager server running with ``ossec-authd`` service enabling and running, this role will install Wazuh Agent and will attempt to register it using Registration Service from Wazuh Manager, also you have some variables that can be used to customize the Agent installation:

- **wazuh_manager_ip:** set Wazuh server to connect.
- **wazuh_register_client:** register the Wazuh agent on Wazuh server, will require the ``ossec-authd`` service started on the Wazuh server.

Next, create a YAML file ``wazuh-agent.yml`` to be used be Ansible playbook:

.. code-block:: yaml

    - hosts: all:!wazuh-manager
      roles:
       - ansible-wazuh-agent

You can maintain different environments using a variable definition YAML file for each one, by example:

a. For production environment ``vars-production.yml``:

.. code-block:: yaml

    wazuh_manager_ip: 10.1.1.12
    wazuh_authd_port: 1515
    wazuh_register_client: true

b. For development environment ``vars-development.yml``:

.. code-block:: yaml

    wazuh_manager_ip: 192.168.0.10
    wazuh_authd_port: 1515
    wazuh_register_client: true

Next, run the ansible playbook:

.. code-block:: bash

  $ ansible-playbook wazuh-agent.yml -e@vars-production.yml

The example above for production environment will install Wazuh agent in all host excepting ``wazuh-manager``. then will register it against ``wazuh-manager`` with ip ``10.1.1.12``.
