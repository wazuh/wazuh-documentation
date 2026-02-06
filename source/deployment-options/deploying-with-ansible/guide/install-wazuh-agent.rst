.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Check out this guide to learn how to install the Wazuh agent if you are deploying Wazuh with Ansible, an open source platform designed for automating tasks.

Installing the Wazuh agent
==========================

The ``ansible-wazuh-agent`` role installs Wazuh agents on Linux endpoints. The Ansible control server requires SSH access to each endpoint.

.. contents::
   :local:
   :depth: 1
   :backlinks: none

Prerequisites
-------------

Before deploying Wazuh agents with Ansible, check your Ansible version:

-  Ansible-core 2.10 or later requires installing additional collections from Ansible Galaxy. Without these collections, running the Wazuh agent playbook may fail with an invalid characters error in ``roles/wazuh/ansible-wazuh-agent/handlers/main.yml``:

   .. code-block:: console

      # ansible-galaxy collection install ansible.windows community.windows

-  Ansible 2.9 or earlier does not require these collections.

.. note::

   SSH key-pairing should already be configured between the Ansible control server and the endpoints. Add the endpoints where the agent will be deployed in the ``/etc/ansible/hosts`` Ansible hosts file under the ``[wazuh-agents]`` hosts group.

   .. code-block:: ini

      [wazuh-agents]
      agent_1 ansible_host=<WAZUH_AGENT_IP_ADDRESS> ansible_ssh_user=<USERNAME>

Access the wazuh-ansible directory
----------------------------------

Change to the directory where you cloned the Wazuh Ansible repository:

.. code-block:: console

   # cd /etc/ansible/roles/wazuh-ansible/
   # tree roles -d

.. code-block:: none
   :class: output

   roles
   ├── ansible-galaxy
   │   └── meta
   └── wazuh
       ├── ansible-filebeat-oss
       │   ├── defaults
       │   ├── handlers
       │   ├── meta
       │   ├── tasks
       │   └── templates
       ├── ansible-wazuh-agent
       │   ├── defaults
       │   ├── handlers
       │   ├── meta
       │   ├── tasks
       │   └── templates
       ├── ansible-wazuh-manager
       │   ├── defaults
       │   ├── files
       │   │   └── custom_ruleset
       │   │       ├── decoders
       │   │       └── rules
       │   ├── handlers
       │   ├── meta
       │   ├── tasks
       │   ├── templates
       │   └── vars
       ├── wazuh-dashboard
       │   ├── defaults
       │   ├── handlers
       │   ├── tasks
       │   ├── templates
       │   └── vars
       └── wazuh-indexer
           ├── defaults
           ├── handlers
           ├── meta
           ├── tasks
           └── templates

You can see the preconfigured playbooks by running the command below:

.. code-block:: console

   # tree playbooks/

.. code-block:: none
   :class: output

   playbooks
   ├── ansible.cfg
   ├── wazuh-agent.yml
   ├── wazuh-dashboard.yml
   ├── wazuh-indexer.yml
   ├── wazuh-manager-oss.yml
   ├── wazuh-production-ready.yml
   └── wazuh-single.yml

The ``/etc/ansible/roles/wazuh-ansible/playbooks/wazuh-agent.yml`` file contains the necessary commands to install a Wazuh agent and register it to the Wazuh manager. Below is the content of the ``/etc/ansible/roles/wazuh-ansible/playbooks/wazuh-agent.yml`` file:

.. code-block:: yaml

   ---
   - hosts: <WAZUH_AGENT_IP_ADDRESS> OR <WAZUH_AGENT_GROUP_NAME>
     become: yes
     become_user: root
     roles:
       - ../roles/wazuh/ansible-wazuh-agent
     vars:
       wazuh_managers:
         - address: <WAZUH_MANAGER_IP_ADDRESS>
           port: 1514
           protocol: tcp
           api_port: 55000
           api_proto: 'https'
           api_user: wazuh
           max_retries: 5
           retry_interval: 5

**Where:**

-  ``hosts:`` indicates the endpoints where the commands in the playbook will be executed.

-  ``roles:`` section indicates the roles that will be executed on the hosts specified. In this case, the role of the wazuh-agent will be installed. Replace the ``<WAZUH_AGENT_IP_ADDRESS>`` OR ``<WAZUH_AGENT_GROUP_NAME>`` with the IP address of the Wazuh agent or the Wazuh agent group name.

-  ``wazuh_managers:`` indicates details for the connection with the Wazuh manager. This list overwrites the default configuration. Replace ``<WAZUH_MANAGER_IP_ADDRESS>`` with the actual IP address of the Wazuh manager.

There are several variables that you can use to customize the installation or configuration. You can change the default configuration by modifying the ``/etc/ansible/roles/wazuh-ansible/roles/wazuh/ansible-wazuh-agent/defaults/main.yml`` file.

Alternatively, you can create another YAML file with the content you want to change in the configuration. You can find more information in the :doc:`Wazuh agent role <../roles/wazuh-agent>` section.

More details on default configuration variables can be found in the :doc:`variables references section <../reference>`.

Prepare the playbook
--------------------

Add ``wazuh-agents`` as host group of the endpoints where the installation of the Wazuh agent will be done in the hosts section and the IP address of the Wazuh server in the ``wazuh_managers:`` section of the ``/etc/ansible/roles/wazuh-ansible/playbooks/wazuh-agent.yml`` file.

.. code-block:: yaml

   ---
   - hosts: wazuh-agents
     become: yes
     become_user: root
     roles:
       - ../roles/wazuh/ansible-wazuh-agent
     vars:
       wazuh_managers:
         - address: <WAZUH_MANAGER_IP_ADDRESS>
           port: 1514
           protocol: tcp
           api_port: 55000
           api_proto: 'https'
           api_user: wazuh
           max_retries: 5
           retry_interval: 5

Run the playbook
----------------

#. Switch to the playbooks folder on the Ansible server and run the command below:

   .. code-block:: console

      # ansible-playbook wazuh-agent.yml -b -K

#. Check the status of Wazuh agent:

   -  Wazuh agent status on the endpoint

      .. code-block:: console

         # systemctl status wazuh-agent

   -  Wazuh agent status on the Wazuh server

      .. code-block:: console

         # /var/ossec/bin/agent_control -l
