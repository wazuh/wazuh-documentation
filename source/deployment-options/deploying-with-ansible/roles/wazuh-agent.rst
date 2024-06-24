.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how to use a preconfigured role to install and configure the Wazuh Agent on different hosts in this section of the Wazuh documentation.
  
Wazuh Agent
-----------

This role is designed to install and configure the Wazuh Agent on different hosts. There are agent installer packages for Linux, macOS, and Windows machines. This role can also enroll the agent in the Wazuh Manager. Below are some variables you can use to customize the installation:

-  ``wazuh_managers``: This specifies a list of Wazuh manager node(s) for Wazuh agents to report to.
-  ``wazuh_agent_authd``: This specifies a set of options to register the Wazuh agent on the Wazuh server. This requires the ``wazuh-authd`` service to be running on the Wazuh server.

To use the role in a playbook, a YAML file ``wazuh-agent.yml`` can be created with the contents below:

.. code-block:: yaml

   - hosts: all:!wazuh-manager
     roles:
      - ansible-wazuh-agent

You can maintain different environments using a variable definition YAML file for each one:

-  For a production environment, the variables can be saved in ``vars-production.yml``:

.. code-block:: yaml

   wazuh_managers:
     - address: <manager IP>
       port: 1514
       protocol: udp
   wazuh_agent_authd:
     registration_address: <manager IP>
     enable: true
     port: 1515
     ssl_agent_ca: null
     ssl_auto_negotiate: 'no'

-  For a development environment, the variables can be saved in ``vars-development.yml``:

.. code-block:: yaml

   wazuh_managers:
     - address: <manager IP>
       port: 1514
       protocol: udp
   wazuh_agent_authd:
     registration_address: <manager IP>
     enable: true
     port: 1515
     ssl_agent_ca: null
     ssl_auto_negotiate: 'no'

To run the playbook for a specific environment, the command below is run:

.. code-block:: console

   $ ansible-playbook wazuh-agent.yml -e@vars-production.yml

The example above for a production environment will install a Wazuh agent in all host groups except the ``wazuh-manager`` group. Then, it will register them against the ``wazuh-manager`` with IP address ``10.1.1.12``.

Please review the :ref:`variables references <wazuh_ansible_reference_agent>` section to see all variables available for this role.
