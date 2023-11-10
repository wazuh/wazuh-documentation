.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Check out this guide to learn how to install the Wazuh agent if you are deploying Wazuh with Ansible, an open source platform designed for automating tasks.

Install Wazuh Agent
===================

We can install the Wazuh agent on endpoints using the roles and playbooks available in the Wazuh Ansible repository. The Ansible server must have access to the endpoints where the agents are to be installed.

.. contents::
   :local:
   :depth: 1
   :backlinks: none

.. note::

	- 	SSH key-pairing should already be configured between the ansible deployment server and the endpoints.
	- 	Add the endpoints where the agent will be deployed in the Ansible hosts file under the ``[wazuh-agents]`` hosts group.
	- 	This playbook does not support deploying Wazuh agents to macOS endpoints.

1 - Accessing the wazuh-ansible directory
-----------------------------------------

We access the contents of the directory on the Ansible server where we have cloned the repository to. We can see the roles we have by running the command below in the cloned directory:

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

And we can see the preconfigured playbooks we have by running the command below:

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

For the agent deployment, we are going to use the role of wazuh-agent, which contains the necessary commands to install an agent and register it in our Wazuh environment. Below is the content of the YAML file ``/etc/ansible/roles/wazuh-ansible/playbooks/wazuh-agent.yml`` we are going to run for a complete installation of the Wazuh agent.

.. code-block:: yaml

	---
	- hosts: <your wazuh agents hosts>
	  become: yes
	  become_user: root
	  roles:
	    - ../roles/wazuh/ansible-wazuh-agent
	  vars:
	    wazuh_managers:
	      - address: <your manager IP>
	        port: 1514
	        protocol: tcp
	        api_port: 55000
	        api_proto: 'http'
	        api_user: ansible
	        max_retries: 5
	        retry_interval: 5

Let’s take a closer look at the content.

- 	The first line ``hosts``: indicates the machines where the commands in the playbook will be executed.
- 	The ``roles``: section indicates the roles that will be executed on the hosts specified. In this case, we are going to install the role of wazuh-agent.
- 	The variables list ``wazuh_managers``: indicates details for the connection with the Wazuh manager. This list overwrites the default configuration.

There are several variables we can use to customize the installation or configuration. If we want to change the default configuration:

- 	We can change the ``/etc/ansible/roles/wazuh-ansible/roles/wazuh/ansible-wazuh-agent/defaults/main.yml`` file directly.
- 	Alternatively, we can create another YAML file with the content we want to change in the configuration. If we want to do this, we can find more information about the :doc:`Wazuh agent role <../roles/wazuh-agent>`.

More details on default configuration variables can be found in the :doc:`variables references section <../reference>`.

2 - Preparing to run the playbook
---------------------------------

We can create a similar YAML file or modify the one we already have to adapt it to our configuration. We will use the host group of the endpoints where we are going to install the Wazuh agent in the hosts section. In this case, it is ``wazuh-agents``. The hosts file will look like this:

.. code-block:: yaml

	[wazuh-agents]
	192.168.33.31 ansible_ssh_user=centos

We will also add the IP address of the Wazuh server to the ``wazuh_managers:`` section.

Our resulting file is:

.. code-block:: yaml

	---
	- hosts: wazuh-agents
	  become: yes
	  become_user: root
	  roles:
	    - ../roles/wazuh/ansible-wazuh-agent
	  vars:
	    wazuh_managers:
	      - address: 192.168.33.31
	        port: 1514
	        protocol: tcp
	        api_port: 55000
	        api_proto: 'http'
	        api_user: ansible
	        max_retries: 5
	        retry_interval: 5

3 - Running the playbook
------------------------

Now, we are ready to run the playbook and start the installation. However, some of the operations to be  performed on the remote systems will need sudo permissions. We can solve this in several ways, either by opting to enter the password when Ansible requests it or using the `become <https://docs.ansible.com/ansible/latest/user_guide/become.html#id1>`_ option (to avoid entering passwords one by one).

#.	Let’s run the playbook.

	Switch to the playbooks folder on the Ansible server and proceed to run the command below:

	.. code-block:: console

		# ansible-playbook wazuh-agent.yml -b -K

#. Once the deployment completes, we can check the status of the Wazuh agent on the endpoints.

	.. code-block:: console

		# systemctl status wazuh-agent

	We can also view agent information from the Wazuh server.

	.. code-block:: console

		# /var/ossec/bin/agent_control -l

..
		We can see the agent connection in the Wazuh dashboard.

		.. thumbnail:: ../../../images/ansible/ansible-agent2.png
		   :title: Ansible agent 1
		   :align: center
		   :width: 80%

		.. thumbnail:: ../../../images/ansible/ansible-agent.png
		   :title: Ansible agent 2
		   :align: center
		   :width: 80%
