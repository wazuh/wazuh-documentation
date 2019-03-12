.. Copyright (C) 2018 Wazuh, Inc.

.. _wazuh_ansible_wazuh_agent:

Install Wazuh Agent
===================
 
We can install the Wazuh agent using the roles and playbooks available in the Wazuh Ansible repository. The Ansible server must have access to the Agent instance.

- `1 - Access to wazuh-ansible`_
- `2 - Preparing the playbook`_
- `3 - Running the playbook`_

.. note::

	Following the example we started in the previous sections, we have added a second host to the ``/etc/ansible/hosts`` file, in this case the operating system is CentOS 7 and we do not need to indicate the path of the Python interpreter. 
	

	192.168.0.180 ansible_ssh_user=centos

	192.168.0.108 ansible_ssh_user=elk      ansible_python_interpreter=/usr/bin/python3

	192.168.0.102 ansible_ssh_user=centos


	.. code-block:: console

		ansible@ansible:~$ ansible all -m ping
		192.168.0.102 | SUCCESS => {
		    "changed": false,
		    "ping": "pong"
		}
		192.168.0.180 | SUCCESS => {
		    "changed": false,
		    "ping": "pong"
		}
		192.168.0.108 | SUCCESS => {
		    "changed": false,
		    "ping": "pong"
		}


1 - Access to wazuh-ansible
---------------------------

1.1 - We access the directory where we have cloned the repository from our Ansible server.

.. code-block:: console

	ansible@ansible:/etc/ansible/roles/wazuh-ansible$ ls
	CHANGELOG.md  playbooks  README.md  roles  VERSION

We can see the roles we have. 

.. code-block:: console

	ansible@ansible:/etc/ansible/roles/wazuh-ansible$ tree roles -d
	roles
	├── ansible-galaxy
	│   └── meta
	├── elastic-stack
	│   ├── ansible-elasticsearch
	│   │   ├── defaults
	│   │   ├── handlers
	│   │   ├── meta
	│   │   ├── tasks
	│   │   └── templates
	│   ├── ansible-kibana
	│   │   ├── defaults
	│   │   ├── handlers
	│   │   ├── meta
	│   │   ├── tasks
	│   │   └── templates
	│   └── ansible-logstash
	│       ├── defaults
	│       ├── handlers
	│       ├── meta
	│       ├── tasks
	│       └── templates
	└── wazuh
	    ├── ansible-filebeat
	    │   ├── defaults
	    │   ├── handlers
	    │   ├── meta
	    │   ├── tasks
	    │   ├── templates
	    │   └── tests
	    ├── ansible-wazuh-agent
	    │   ├── defaults
	    │   ├── handlers
	    │   ├── meta
	    │   ├── tasks
	    │   ├── templates
	    │   └── vars
	    └── ansible-wazuh-manager
	        ├── defaults
	        ├── handlers
	        ├── meta
	        ├── tasks
	        ├── templates
	        └── vars

And we can see the preconfigured playbooks we have. 

.. code-block:: console

	ansible@ansible:/etc/ansible/roles/wazuh-ansible$ tree playbooks/
	playbooks/
	├── wazuh-agent.yml
	├── wazuh-elastic_stack-distributed.yml
	├── wazuh-elastic_stack-single.yml
	├── wazuh-elastic.yml
	├── wazuh-kibana.yml
	├── wazuh-logstash.yml
	└── wazuh-manager.yml

In this occasion we are going to use the role of **wazuh-agent**, which contains the necessary commands to install an agent and register it in our Wazuh environment. To consult the default configuration go to this :ref:`section <wazuh_ansible_reference>`. 

If we want to change the default configuration we can change the ``/etc/ansible/roles/wazuh-ansible/roles/wazuh/ansible-wazuh-agent/defaults/main.yml`` file directly or we can create another YAML file only with the content we want to change the configuration. If we would like to do this, we can find more information at :ref:`Wazuh Agent <ansible-wazuh-agent>` role.

Let's see below, the content of the YAML file ``/etc/ansible/roles/wazuh-ansible/playbooks/wazuh-agent.yml`` that we are going to run for a complete installation of the Wazuh agent.

.. code-block:: yaml

	- hosts: <your wazuh agents hosts>
	  roles:
	    - /etc/ansible/roles/wazuh-ansible/roles/wazuh/ansible-wazuh-agent
	  vars:
	    wazuh_managers:
	      - address: <your manager IP>
	        port: 1514
	        protocol: udp
	        api_port: 55000
	        api_proto: 'http'
	        api_user: ansible
	    wazuh_agent_authd:
	      enable: true
	      port: 1515
	      ssl_agent_ca: null
	      ssl_auto_negotiate: 'no'


Let's take a closer look at the content. 

The first line ``hosts:`` indicates the machines where the commands below will be executed. 

The ``roles:`` section indicates the roles that will be executed on the hosts mentioned above. Specifically, we are going to install the role of wazuh-agent. 

We can also see a list of variables ``wazuh_managers:`` for the connection with Wazuh manager. This list overwrites the default configuration. 

Finally we see another list of variables ``wazuh_agent_authd`` for the agent registration, which also overwrites the default configuration.  

2 - Preparing the playbook 
--------------------------

2.1 - We must create a similar YAML file or modify the one we already have to adapt it to our configuration. We will use the IP address of the machine where we are going to install the Wazuh agent adding it to the hosts section and we will add the IP address of the Wazuh server to the ``wazuh_managers:`` section. 

Our resulting file is:  

.. code-block:: yaml

	- hosts: 192.168.0.102
	  roles:
	    - /etc/ansible/roles/wazuh-ansible/roles/wazuh/ansible-wazuh-agent
	  vars:
	    wazuh_managers:
	      - address: 192.168.0.180
	        port: 1514
	        protocol: udp
	        api_port: 55000
	        api_proto: 'http'
	        api_user: ansible
	    wazuh_agent_authd:
	      enable: true
	      port: 1515
	      ssl_agent_ca: null
	      ssl_auto_negotiate: 'no'


3 - Running the playbook
------------------------

It seems that we are ready to run the playbook and start the installation, but some of the operations we will perform on the remote systems will need sudo permissions. We can solve this in several ways, opting to enter the password when Ansible requests it. To contemplate other options we consult the option `become <https://docs.ansible.com/ansible/latest/user_guide/become.html#id1>`_ (to avoid entering passwords one by one). 

3.1 - Let's launch the playbook run.

- We use the ``-b`` option to indicate that we are going to become a super user.
- We use the ``-K`` option to indicate Ansible to ask for the password. 

.. code-block:: console

	ansible@ansible:/etc/ansible/roles/wazuh-ansible/playboks$ ansible-playbook wazuh-agent.yml -b -K

We will obtain a final result similar to the one shown in the following code block. 

.. code-block:: console

	TASK [ansible-wazuh-agent : Copy CA, SSL key and cert for authd] ******************************************************************************************
	skipping: [192.168.0.102]

	TASK [ansible-wazuh-agent : Linux | Register agent (via authd)] *******************************************************************************************
	changed: [192.168.0.102]

	TASK [ansible-wazuh-agent : Linux | Verify agent registration] ********************************************************************************************
	changed: [192.168.0.102]

	TASK [ansible-wazuh-agent : Retrieving rest-API Credentials] **********************************************************************************************
	skipping: [192.168.0.102]

	TASK [ansible-wazuh-agent : Linux | Create the agent key via rest-API] ************************************************************************************
	skipping: [192.168.0.102]

	TASK [ansible-wazuh-agent : Linux | Retieve new agent data via rest-API] **********************************************************************************
	skipping: [192.168.0.102]

	TASK [ansible-wazuh-agent : Linux | Register agent (via rest-API)] ****************************************************************************************
	skipping: [192.168.0.102]

	TASK [ansible-wazuh-agent : Linux | Vuls integration deploy (runs in background, can take a while)] *******************************************************
	skipping: [192.168.0.102]

	TASK [ansible-wazuh-agent : Linux | Installing agent configuration (ossec.conf)] **************************************************************************
	changed: [192.168.0.102]

	TASK [ansible-wazuh-agent : Linux | Ensure Wazuh Agent service is started and enabled] ********************************************************************
	changed: [192.168.0.102]

	TASK [ansible-wazuh-agent : Remove Wazuh repository (and clean up left-over metadata)] ********************************************************************
	changed: [192.168.0.102]

	TASK [ansible-wazuh-agent : Remove Wazuh repository (and clean up left-over metadata)] ********************************************************************
	skipping: [192.168.0.102]

	RUNNING HANDLER [ansible-wazuh-agent : restart wazuh-agent] ***********************************************************************************************
	changed: [192.168.0.102]

	PLAY RECAP ************************************************************************************************************************************************
	192.168.0.102              : ok=12   changed=8    unreachable=0    failed=0

	ansible@ansible:/etc/ansible/wazuh-ansible$


We can check the status of our new services in our Wazuh agent. 

.. code-block:: console

	[root@wazuh-agent-ansible centos]# systemctl status wazuh-agent
	● wazuh-agent.service - Wazuh agent
	   Loaded: loaded (/etc/systemd/system/wazuh-agent.service; enabled; vendor preset: disabled)
	   Active: active (running) since lun 2018-09-17 11:26:16 CEST; 3min 28s ago

We can see the agent connection in Kibana. 

.. thumbnail:: ../../images/ansible/ansible-agent2.png
    :align: center
    :width: 100%

.. thumbnail:: ../../images/ansible/ansible-agent.png
    :align: center
    :width: 100%

We can also view agent information from the Wazuh-server. 

.. code-block:: console

	[root@localhost centos]# /var/ossec/bin/agent_control -l

	Wazuh agent_control. List of available agents:
	   ID: 000, Name: localhost.localdomain (server), IP: 127.0.0.1, Active/Local
	   ID: 001, Name: wazuh-agent-ansible, IP: 192.168.0.102, Active

	List of agentless devices:
