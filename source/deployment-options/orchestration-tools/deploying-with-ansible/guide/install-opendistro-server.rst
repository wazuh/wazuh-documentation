.. Copyright (C) 2021 Wazuh, Inc.

.. meta::
  :description: Deploying the Open Distro for Elasticsearch server involves installing the Open Distro and Kibana services. Find out how to do it step by step in this section.

.. _wazuh_ansible_elk_server:

Install Open Distro for Elasticsearch Server
============================================

The deployment of the Open Distro for the Elasticsearch server involves the installation of Open Distro for Elasticsearch and Kibana services. In the Wazuh Ansible repository, we can find the playbooks and roles necessary to carry out the installation. The Ansible server must have access to the Open Distro for Elasticsearch server.

- `1 - Access to wazuh-ansible`_
- `2 - Preparing the playbook`_
- `3 - Running the playbook`_


.. warning::

	In previous versions of this guide, playbooks were used pointing to roles to install Elasticsearch.
	Currently, the roles for the installation following previous guides are preserved.
	Starting Wazuh v4.2.5, the installation steps of this guide point to the roles that install Open Distro for Elasticsearch.

.. warning::

    About the nomenclature:
       - We refer with Open Distro for Elasticsearch to:
         - https://opendistro.github.io/for-elasticsearch-docs/
       - We refer with Elasticsearch to:
         - https://www.elastic.co/what-is/elasticsearch

.. note::

	Following the example we started in the previous sections, we have added a second host to the ``/etc/ansible/hosts`` file. In this case, the operating system is Ubuntu 17, and we need to indicate the path of the Python interpreter.


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


Using **Opendistro** and **Kibana** roles, we will install and configure the Open Distro for Elasticsearch server components. There are several variables we can use to customize the installation or configuration. To consult the default configuration go to this :ref:`section <wazuh_ansible_reference>`.

If we want to change the default configuration, we can change the following files:

- ``/etc/ansible/roles/wazuh-ansible/roles/opendistro/opendistro-elasticsearch/defaults/main.yml``
- ``/etc/ansible/roles/wazuh-ansible/roles/opendistro/opendistro-kibana/defaults/main.yml``

We also can create another YAML file only with the content we want to change the configuration for each role. We can find more information here:

- :ref:`Open Distro <ansible-wazuh-opendistro>` role.
- :ref:`Kibana <ansible-wazuh-kibana>` role.


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

We could configure these three files and execute them, but we will create a single file that executes the installation of the services in our Elastic Stack Server.

.. code-block:: console

	ansible@ansible:/etc/ansible/wazuh-ansible$ cat playbooks/wazuh-opendistro-and-kibana.yml

.. code-block:: yaml
    :class: output

    - hosts: wazuh-cluster-manager
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

It seems that we are ready to run the playbook and start the installation, but some of the operations we will perform on the remote systems will need sudo permissions. We can solve this in several ways, such as entering the password when Ansible requests it. To contemplate other options, we can consult the option `become <https://docs.ansible.com/ansible/latest/user_guide/become.html#id1>`_ (to avoid entering passwords one by one).

3.1 - Let's launch the playbook run.

- We use the ``-b`` option to indicate that we are going to become a super user.
- We use the ``-K`` option to indicate Ansible to ask for the password.

.. code-block:: console

	ansible@ansible:/etc/ansible/roles/wazuh-ansible/playbooks$ ansible-playbook wazuh-opendistro-and-kibana.yml -b -K

.. note::

	The installation of the Wazuh application for Kibana may take some time.


We will obtain a final result similar to the one shown in the following code block.


.. code-block:: none
	:class: output

	PLAY [wazuh-cluster-manager] *********************************************************************************

	TASK [Gathering Facts] ***********************************************************************************
	ok: [poc-allinone-wm]

	TASK [../roles/opendistro/opendistro-elasticsearch : Check if certificates already exists] ***************
	ok: [poc-allinone-wm -> localhost]

	TASK [../roles/opendistro/opendistro-elasticsearch : Local action | Create local temporary directory for certificates generation] ***
	skipping: [poc-allinone-wm]

	TASK [../roles/opendistro/opendistro-elasticsearch : Local action | Check that the generation tool exists] ***
	skipping: [poc-allinone-wm]

	TASK [../roles/opendistro/opendistro-elasticsearch : Local action | Download certificates generation tool] ***
	skipping: [poc-allinone-wm]

	TASK [../roles/opendistro/opendistro-elasticsearch : Local action | Extract the certificates generation tool] ***
	skipping: [poc-allinone-wm]

	TASK [../roles/opendistro/opendistro-elasticsearch : Local action | Add the execution bit to the binary] ***
	skipping: [poc-allinone-wm]

	TASK [../roles/opendistro/opendistro-elasticsearch : Local action | Prepare the certificates generation template file] ***
	skipping: [poc-allinone-wm]

	TASK [../roles/opendistro/opendistro-elasticsearch : Create a directory if it does not exist] ************
	skipping: [poc-allinone-wm]

	TASK [../roles/opendistro/opendistro-elasticsearch : Local action | Check if root CA file exists] ********
	skipping: [poc-allinone-wm]

	TASK [../roles/opendistro/opendistro-elasticsearch : Local action | Generate the node & admin certificates in local] ***
	skipping: [poc-allinone-wm]

	TASK [../roles/opendistro/opendistro-elasticsearch : Local action | Generate the node & admin certificates using an existing root CA] ***
	skipping: [poc-allinone-wm]

	TASK [../roles/opendistro/opendistro-elasticsearch : RedHat/CentOS/Fedora | Add OpenDistro repo] *********
	skipping: [poc-allinone-wm]

	TASK [../roles/opendistro/opendistro-elasticsearch : RedHat/CentOS/Fedora | Install OpenJDK 11] **********
	skipping: [poc-allinone-wm]

	TASK [../roles/opendistro/opendistro-elasticsearch : Install Amazon extras] ******************************
	skipping: [poc-allinone-wm]

	TASK [../roles/opendistro/opendistro-elasticsearch : Install OpenJDK 11] *********************************
	skipping: [poc-allinone-wm]

	TASK [../roles/opendistro/opendistro-elasticsearch : RedHat/CentOS/Fedora | Install OpenDistro dependencies] ***
	skipping: [poc-allinone-wm]

	TASK [../roles/opendistro/opendistro-elasticsearch : Install OpenDistro] *********************************
	skipping: [poc-allinone-wm]

	TASK [../roles/opendistro/opendistro-elasticsearch : Add openjdk repository] *****************************
	skipping: [poc-allinone-wm]

	TASK [../roles/opendistro/opendistro-elasticsearch : Install openjdk-11-jdk] *****************************
	ok: [poc-allinone-wm]

	TASK [../roles/opendistro/opendistro-elasticsearch : Add apt repository signing key] *********************
	ok: [poc-allinone-wm]

	TASK [../roles/opendistro/opendistro-elasticsearch : Add Opendistro repository] **************************
	ok: [poc-allinone-wm]

	TASK [../roles/opendistro/opendistro-elasticsearch : Install OpenDistro] *********************************
	ok: [poc-allinone-wm]

	TASK [../roles/opendistro/opendistro-elasticsearch : Remove performance analyzer plugin from elasticsearch] ***
	fatal: [poc-allinone-wm]: FAILED! => {"changed": true, "cmd": ["./elasticsearch-plugin", "remove", "opendistro-performance-analyzer"], "delta": "0:00:01.363928", "end": "2021-10-15 03:58:54.698552", "msg": "non-zero return code", "rc": 78, "start": "2021-10-15 03:58:53.334624", "stderr": "ERROR: plugin [opendistro-performance-analyzer] not found; run 'elasticsearch-plugin list' to get list of installed plugins", "stderr_lines": ["ERROR: plugin [opendistro-performance-analyzer] not found; run 'elasticsearch-plugin list' to get list of installed plugins"], "stdout": "-> removing [opendistro-performance-analyzer]...", "stdout_lines": ["-> removing [opendistro-performance-analyzer]..."]}
	...ignoring

	TASK [../roles/opendistro/opendistro-elasticsearch : Remove elasticsearch configuration file] ************
	changed: [poc-allinone-wm]

	TASK [../roles/opendistro/opendistro-elasticsearch : Copy Configuration File] ****************************
	changed: [poc-allinone-wm]

	TASK [../roles/opendistro/opendistro-elasticsearch : include_tasks] **************************************
	included: /home/nikos/workspace/work-wazuh/repos/wazuh-ansible/roles/opendistro/opendistro-elasticsearch/tasks/security_actions.yml for poc-allinone-wm

	TASK [../roles/opendistro/opendistro-elasticsearch : Remove demo certs] **********************************
	ok: [poc-allinone-wm] => (item=/etc/elasticsearch//kirk.pem)
	ok: [poc-allinone-wm] => (item=/etc/elasticsearch//kirk-key.pem)
	ok: [poc-allinone-wm] => (item=/etc/elasticsearch//esnode.pem)
	ok: [poc-allinone-wm] => (item=/etc/elasticsearch//esnode-key.pem)

	TASK [../roles/opendistro/opendistro-elasticsearch : Configure IP (Private address)] *********************
	skipping: [poc-allinone-wm]

	TASK [../roles/opendistro/opendistro-elasticsearch : Configure IP (Public address)] **********************
	ok: [poc-allinone-wm]

	TASK [../roles/opendistro/opendistro-elasticsearch : Copy the node & admin certificates to Elasticsearch cluster] ***
	ok: [poc-allinone-wm] => (item=root-ca.pem)
	ok: [poc-allinone-wm] => (item=root-ca.key)
	ok: [poc-allinone-wm] => (item=node-1.key)
	ok: [poc-allinone-wm] => (item=node-1.pem)
	ok: [poc-allinone-wm] => (item=node-1_http.key)
	ok: [poc-allinone-wm] => (item=node-1_http.pem)
	ok: [poc-allinone-wm] => (item=node-1_elasticsearch_config_snippet.yml)
	ok: [poc-allinone-wm] => (item=admin.key)
	ok: [poc-allinone-wm] => (item=admin.pem)

	TASK [../roles/opendistro/opendistro-elasticsearch : Copy the OpenDistro security configuration file to cluster] ***
	changed: [poc-allinone-wm]

	TASK [../roles/opendistro/opendistro-elasticsearch : Prepare the OpenDistro security configuration file] ***
	changed: [poc-allinone-wm]

	TASK [../roles/opendistro/opendistro-elasticsearch : Restart elasticsearch with security configuration] ***
	changed: [poc-allinone-wm]

	TASK [../roles/opendistro/opendistro-elasticsearch : Copy the OpenDistro security internal users template] ***
	changed: [poc-allinone-wm]

	TASK [../roles/opendistro/opendistro-elasticsearch : Hashing the custom admin password] ******************
	changed: [poc-allinone-wm]

	TASK [../roles/opendistro/opendistro-elasticsearch : Set the Admin user password] ************************
	changed: [poc-allinone-wm]

	TASK [../roles/opendistro/opendistro-elasticsearch : Hash the kibanaserver role/user pasword] ************
	changed: [poc-allinone-wm]

	TASK [../roles/opendistro/opendistro-elasticsearch : Set the kibanaserver user password] *****************
	changed: [poc-allinone-wm]

	TASK [../roles/opendistro/opendistro-elasticsearch : Initialize the OpenDistro security index in elasticsearch] ***
	changed: [poc-allinone-wm]

	TASK [../roles/opendistro/opendistro-elasticsearch : Create custom user] *********************************
	skipping: [poc-allinone-wm]

	TASK [../roles/opendistro/opendistro-elasticsearch : Configure OpenDistro Elasticsearch JVM memmory.] ****
	changed: [poc-allinone-wm]

	TASK [../roles/opendistro/opendistro-elasticsearch : Ensure Elasticsearch started and enabled] ***********
	changed: [poc-allinone-wm]

	TASK [../roles/opendistro/opendistro-elasticsearch : Wait for Elasticsearch API] *************************
	ok: [poc-allinone-wm]

	TASK [../roles/opendistro/opendistro-elasticsearch : Wait for Elasticsearch API (Private IP)] ************
	skipping: [poc-allinone-wm]

	TASK [../roles/opendistro/opendistro-elasticsearch : RedHat/CentOS/Fedora | Remove Elasticsearch repository (and clean up left-over metadata)] ***
	skipping: [poc-allinone-wm]

	TASK [../roles/opendistro/opendistro-kibana : Stopping early, trying to compile Wazuh Kibana Plugin on Debian 10 is not possible] ***
	skipping: [poc-allinone-wm]

	TASK [../roles/opendistro/opendistro-kibana : RedHat/CentOS/Fedora | Add OpenDistro repo] ****************
	skipping: [poc-allinone-wm]

	TASK [../roles/opendistro/opendistro-kibana : Install Kibana] ********************************************
	skipping: [poc-allinone-wm]

	TASK [../roles/opendistro/opendistro-kibana : include_vars] **********************************************
	ok: [poc-allinone-wm]

	TASK [../roles/opendistro/opendistro-kibana : Add apt repository signing key] ****************************
	ok: [poc-allinone-wm]

	TASK [../roles/opendistro/opendistro-kibana : Debian systems | Add OpenDistro repo] **********************
	ok: [poc-allinone-wm]

	TASK [../roles/opendistro/opendistro-kibana : Install Kibana] ********************************************
	changed: [poc-allinone-wm]

	TASK [../roles/opendistro/opendistro-kibana : Remove Kibana configuration file] **************************
	changed: [poc-allinone-wm]

	TASK [../roles/opendistro/opendistro-kibana : Copy the certificates from local to the Kibana instance] ***
	changed: [poc-allinone-wm] => (item=root-ca.pem)
	changed: [poc-allinone-wm] => (item=node-1_http.key)
	changed: [poc-allinone-wm] => (item=node-1_http.pem)

	TASK [../roles/opendistro/opendistro-kibana : Copy Configuration File] ***********************************
	changed: [poc-allinone-wm]

	TASK [../roles/opendistro/opendistro-kibana : Ensuring Kibana directory owner] ***************************
	changed: [poc-allinone-wm]

	TASK [../roles/opendistro/opendistro-kibana : Ensure the Git package is present] *************************
	skipping: [poc-allinone-wm]

	TASK [../roles/opendistro/opendistro-kibana : Modify repo url if host is in Debian family] ***************
	skipping: [poc-allinone-wm]

	TASK [../roles/opendistro/opendistro-kibana : Download script to install Nodejs repository] **************
	skipping: [poc-allinone-wm]

	TASK [../roles/opendistro/opendistro-kibana : Execute downloaded script to install Nodejs repo] **********
	skipping: [poc-allinone-wm]

	TASK [../roles/opendistro/opendistro-kibana : Install Nodejs] ********************************************
	skipping: [poc-allinone-wm]

	TASK [../roles/opendistro/opendistro-kibana : Install yarn dependency to build the Wazuh Kibana Plugin] ***
	skipping: [poc-allinone-wm]

	TASK [../roles/opendistro/opendistro-kibana : Remove old wazuh-kibana-app git directory] *****************
	skipping: [poc-allinone-wm]

	TASK [../roles/opendistro/opendistro-kibana : Clone wazuh-kibana-app repository] *************************
	skipping: [poc-allinone-wm]

	TASK [../roles/opendistro/opendistro-kibana : Executing yarn to build the package] ***********************
	skipping: [poc-allinone-wm] => (item=yarn) 
	skipping: [poc-allinone-wm] => (item=yarn build) 

	TASK [../roles/opendistro/opendistro-kibana : Obtain name of generated package] **************************
	skipping: [poc-allinone-wm]

	TASK [../roles/opendistro/opendistro-kibana : Install Wazuh Plugin (can take a while)] *******************
	skipping: [poc-allinone-wm]

	TASK [../roles/opendistro/opendistro-kibana : Install Wazuh Plugin (can take a while)] *******************
	[WARNING]: Unable to use /home/kibana/.ansible/tmp as temporary directory, failing back to system: [Errno
	13] Permission denied: '/home/kibana'
	changed: [poc-allinone-wm]

	TASK [../roles/opendistro/opendistro-kibana : Kibana optimization (can take a while)] ********************
	ok: [poc-allinone-wm]

	TASK [../roles/opendistro/opendistro-kibana : Wait for Elasticsearch port] *******************************
	ok: [poc-allinone-wm]

	TASK [../roles/opendistro/opendistro-kibana : Select correct API protocol] *******************************
	ok: [poc-allinone-wm]

	TASK [../roles/opendistro/opendistro-kibana : Attempting to delete legacy Wazuh index if exists] *********
	ok: [poc-allinone-wm]

	TASK [../roles/opendistro/opendistro-kibana : Create wazuh plugin config directory] **********************
	ok: [poc-allinone-wm]

	TASK [../roles/opendistro/opendistro-kibana : Configure Wazuh Kibana Plugin] *****************************
	ok: [poc-allinone-wm]

	TASK [../roles/opendistro/opendistro-kibana : Ensure Kibana started and enabled] *************************
	changed: [poc-allinone-wm]

	TASK [../roles/opendistro/opendistro-kibana : Remove Elasticsearch repository (and clean up left-over metadata)] ***
	skipping: [poc-allinone-wm]

	RUNNING HANDLER [../roles/opendistro/opendistro-elasticsearch : restart elasticsearch] *******************
	changed: [poc-allinone-wm]

	RUNNING HANDLER [../roles/opendistro/opendistro-kibana : restart kibana] *********************************
	changed: [poc-allinone-wm]

	PLAY RECAP ***********************************************************************************************
	poc-allinone-wm            : ok=43   changed=23   unreachable=0    failed=0    skipped=36   rescued=0    ignored=1   


We can check the status of our new services in our Open Distro for Elasticsearch server.

- Elasticsearch/Opendistro.

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

.. thumbnail:: ../../../images/ansible/wazuh-dashboard-main.png
    :align: center
    :width: 100%

