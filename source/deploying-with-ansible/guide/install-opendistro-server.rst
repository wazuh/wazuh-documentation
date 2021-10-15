.. Copyright (C) 2020 Wazuh, Inc.

.. _wazuh_ansible_elk_server:

Install Opendistro Stack Server
===============================

The deployment of the Opendistro Stack server involves the installation of Opendistro and Kibana services. In the repository of Ansible that Wazuh has we can find the playbooks and roles necessary to carry out the installation. The Ansible server must have access to the Opendistro Stack server.

- `1 - Access to wazuh-ansible`_
- `2 - Preparing the playbook`_
- `3 - Running the playbook`_

.. note::

	Following the example we started in the previous sections, we have added a second host to the ``/etc/ansible/hosts`` file, in this case the operating system is Ubuntu 17 and we need to indicate the path of the Python interpreter.


	192.168.0.180 ansible_ssh_user=centos

	192.168.0.108 ansible_ssh_user=elk      ansible_python_interpreter=/usr/bin/python3

	.. code-block:: console

		ansible@ansible:/etc/ansible/wazuh-ansible$ ansible all -m ping

	.. code-block:: none
		:class: output

		192.168.0.108 | SUCCESS => {
		    "changed": false,
		    "ping": "pong"
		}
		192.168.0.180 | SUCCESS => {
		    "changed": false,
		    "ping": "pong"
		}


1 - Access to wazuh-ansible
---------------------------

1.1 - We access the directory where we have cloned the repository from our Ansible server.

.. code-block:: console

	ansible@ansible:/etc/ansible/roles/wazuh-ansible$ ls

.. code-block:: none
	:class: output

	CHANGELOG.md  playbooks  README.md  roles  VERSION

We can see the roles we have.

.. code-block:: console

	ansible@ansible:/etc/ansible/roles/wazuh-ansible$ tree roles -d

.. code-block:: none
	:class: output

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
	│   └── ansible-kibana
	│       ├── defaults
	│       ├── handlers
	│       ├── meta
	│       ├── tasks
	│       └── templates
	├── opendistro
	│   ├── opendistro-elasticsearch
	│   │   ├── defaults
	│   │   ├── handlers
	│   │   ├── meta
	│   │   ├── tasks
	│   │   └── templates
	│   └── opendistro-kibana
	│       ├── defaults
	│       ├── handlers
	│       ├── tasks
	│       ├── templates
	│       └── vars
	└── wazuh
		├── ansible-filebeat
		│   ├── defaults
		│   ├── handlers
		│   ├── meta
		│   ├── tasks
		│   └── templates
		├── ansible-filebeat-oss
		│   ├── defaults
		│   ├── handlers
		│   ├── meta
		│   ├── tasks
		│   └── templates
		├── ansible-wazuh-agent
		│   ├── defaults
		│   ├── handlers
		│   ├── meta
		│   ├── tasks
		│   └── templates
		└── ansible-wazuh-manager
			├── defaults
			├── files
			├── handlers
			├── meta
			├── tasks
			├── templates
			└── vars


And we can see the preconfigured playbooks we have.

.. code-block:: console

	ansible@ansible:/etc/ansible/roles/wazuh-ansible$ tree playbooks/

.. code-block:: none
	:class: output

	playbooks/
	├── wazuh-agent.yml
	├── wazuh-elastic_stack-distributed.yml
	├── wazuh-elastic_stack-single.yml
	├── wazuh-elastic.yml
	├── wazuh-kibana.yml
	├── wazuh-manager-oss.yml
	├── wazuh-manager.yml
	├── wazuh-odfe-production-ready.yml
	├── wazuh-odfe-single.yml
	├── wazuh-opendistro-kibana.yml
	└── wazuh-opendistro.yml


Using **opendistro** roles we will install and configure the Opendistro Stack server components, there are several variables we can use to customize the installation or configuration. To consult the default configuration go to this :ref:`section <wazuh_ansible_reference>`.

If we want to change the default configuration we can change the following files:
- ``/etc/ansible/roles/wazuh-ansible/roles/opendistro/opendistro-elasticsearch/defaults/main.yml``
- ``/etc/ansible/roles/wazuh-ansible/roles/opendistro/opendistro-kibana/defaults/main.yml``

We also can create another YAML file only with the content we want to change the configuration for each role. We can find more information here:

- :ref:`Opendistro <opendistro-elasticsearch>` role.
- :ref:`Kibana <opendistro-kibana>` role.


Let's see below, the content of the playbooks ``/etc/ansible/roles/wazuh-ansible/playbooks/wazuh-opendistro.yml``.


.. code-block:: yaml

    - hosts: <your opendistro host>
      roles:
        - role: ../roles/opendistro/opendistro-elasticsearch

      vars:
        elasticsearch_network_host: 127.0.0.1 # '<YOUR_ELASTICSEARCH_IP>'
        instances:           # A certificate will be generated for every node using the name as CN.
          node1:
            name: node-1
            ip: <node-1 IP>
          node2:
            name: node-2
            ip: <node-2 IP>
          node3:
            name: node-3
            ip: <node-3 IP>

Let's see below, the content of the playbooks ``/etc/ansible/roles/wazuh-ansible/playbooks/wazuh-opendistro-kibana.yml``.

.. code-block:: yaml

    - hosts: <your opendistro host>
      roles:
        - role: ../roles/opendistro/opendistro-kibana
      vars:
        ansible_shell_allow_world_readable_temp: true


These files are designed to run the installations of each service individually.

Let's take a closer look at the content.

The first line ``hosts:`` indicates the machines where the commands below will be executed.

The ``roles:`` section indicates the roles that will be executed on the hosts.


2 - Preparing the playbook
--------------------------

We could configure these three files and execute them, but we are going to create a single file that executes the installation of the services in our Elastic Stack Server.

.. code-block:: console

	ansible@ansible:/etc/ansible/wazuh-ansible$ cat playbooks/wazuh-opendistro-and-kibana.yml

.. code-block:: yaml
	:class: output

    - hosts: linuxwazuhmanager
      roles:
        - role: ../roles/opendistro/opendistro-elasticsearch
        - role: ../roles/opendistro/opendistro-kibana

      vars:
        single_node: true
        elasticsearch_network_host: 127.0.0.1
        ansible_shell_allow_world_readable_temp: true
        instances:           # A certificate will be generated for every node using the name as CN.
          node1:
            name: node-1
            ip: 127.0.0.1

 
As we can see, we have added the IP address of our Elastic Stack server to the ``elasticsearch_network_host`` entry.


3 - Running the playbook
------------------------

It seems that we are ready to run the playbook and start the installation, but some of the operations we will perform on the remote systems will need sudo permissions. We can solve this in several ways, opting to enter the password when Ansible requests it. To contemplate other options we consult the option `become <https://docs.ansible.com/ansible/latest/user_guide/become.html#id1>`_ (to avoid entering passwords one by one).

3.1 - Let's launch the playbook run.

- We use the ``-b`` option to indicate that we are going to become a super user.
- We use the ``-K`` option to indicate Ansible to ask for the password.

.. code-block:: console

	ansible@ansible:/etc/ansible/roles/wazuh-ansible/playbooks$ ansible-playbook wazuh-opendistro-full.yml -b -K

.. note::

	The installation of the Wazuh application for Kibana may take some time.


We will obtain a final result similar to the one shown in the following code block.


.. code-block:: none
	:class: output




We can check the status of our new services in our Elastic Stack server.

- Elasticsearch.

.. code-block:: console

	root@elk:/home/user# systemctl status elasticsearch.service

.. code-block:: none
	:class: output

	● elasticsearch.service - Elasticsearch
	   Loaded: loaded (/usr/lib/systemd/system/elasticsearch.service; enabled; vendor preset: enabled)
	  Drop-In: /etc/systemd/system/elasticsearch.service.d
	           └─elasticsearch.conf
	   Active: active (running) since Thu 2018-09-13 16:51:59 CEST; 5min ago

- Kibana

.. code-block:: console

	root@elk:/home/elk# systemctl status kibana.service

.. code-block:: none
	:class: output

	● kibana.service - Kibana
	   Loaded: loaded (/etc/systemd/system/kibana.service; enabled; vendor preset: enabled)
	   Active: active (running) since Thu 2018-09-13 16:53:32 CEST; 4min 58s ago

Once the Wazuh API is registered we can access it through our Kibana portal.

.. thumbnail:: ../../images/ansible/ansible-elk.png
    :align: center
    :width: 100%
