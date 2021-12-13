.. Copyright (C) 2021 Wazuh, Inc.

.. meta::
	:description: Check out this guide to learn how to install the Wazuh manager if you are deploying Wazuh with Ansible, an open source platform designed for automating tasks.
	
.. _wazuh_ansible_wazuh_manager:

Install Wazuh Manager
=====================

Once the Ansible repository has been cloned, we proceed to install the Wazuh server, that is, we will install a Wazuh manager, Wazuh API and Filebeat.

1. Access to wazuh-ansible
2. Preparing the playbook
3. Running the playbook

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
	│       ├── defaults
	│       ├── handlers
	│       ├── meta
	│       ├── tasks
	│       └── templates
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
	├── wazuh-opendistro-full.yml
	├── wazuh-opendistro-kibana.yml
	└── wazuh-opendistro.yml

Using the **Wazuh Manager** role, we will install and configure Wazuh Manager and Wazuh API. There are several variables we can use to customize the installation or configuration. To consult the default configuration go to this :ref:`section <wazuh_ansible_reference>`.

If we want to change the default configuration we can change the ``/etc/ansible/roles/wazuh-ansible/roles/wazuh/ansible-wazuh-manager/defaults/main.yml`` file directly or we can create another YAML file only with the content we want to change the configuration. If we would like to do this, we can find more information at :ref:`Wazuh Manager <ansible-wazuh-manager>` role, where we can also see how to change the default configuration of agentless and Wazuh API.

We also can create another YAML file only with the content we want to change for **Filebeat**, or modify the configuration directly in the ``/etc/ansible/roles/wazuh-ansible/roles/wazuh/ansible-filebeat-oss/defaults/main.yml`` file. We can find more information at :ref:`Filebeat <ansible-wazuh-filebeat>` role.

Let's see below, the content of the YAML file ``/etc/ansible/roles/wazuh-ansible/playbooks/wazuh-manager-oss.yml`` that we are going to run for a complete installation of the server.

.. code-block:: console

	ansible@ansible:/etc/ansible/roles/wazuh-ansible/playbooks$ cat wazuh-manager-oss.yml

.. code-block:: yaml
	:class: output

	- hosts: <your server host>
	  roles:
		- role: ../roles/wazuh/ansible-wazuh-manager
		- role: ../roles/wazuh/ansible-filebeat-oss
		become: yes
		become_user: root
		vars:
			wazuh_manager_config:
			cluster:
				name: 'wazuh-cluster'
				node_name: 'wazuh-master'
				node_type: 'master' # master or worker
				nodes:
					# - "<wazuh-cluster-node-1>"
					# - "<wazuh-cluster-node-2>"
					# - "<wazuh-cluster-node-3"
					# - "<wazuh-cluster-node-n>"
			filebeat_node_name: node-1
			filebeat_output_elasticsearch_hosts:
			# - "<opendistro-node-1>"
			# - "<opendistro-node-2>"
			# - "<opendistro-node-3>"
			# - "<opendistro-node-n>"

Let's take a closer look at the content.

The first line ``hosts:`` indicates the machines where the commands below will be executed.

The ``roles:`` section indicates the roles that will be executed on the hosts mentioned above. Specifically, we are going to install the role of wazuh-manager (Wazuh manager + API) and the role of filebeat to which we indicate to overwrite the field ``filebeat_output_elasticsearch_hosts`` with that IP address.

The parameter ``filebeat_output_elasticsearch_hosts:`` is used to indicate the host group of the Opendistro cluster.

2 - Preparing the playbook
--------------------------

2.1 - We must create a similar YAML file or modify the one we already have to adapt it to our configuration. We will use the IP address of the machine where we are going to install the Wazuh server adding it to the hosts section and we will add the IP address of the machine where we are going to install our Elasticsearch service to the ``filebeat_output_elasticsearch_hosts`` field.

Our resulting file is:

.. code-block:: yaml

    - hosts: wazuh-cluster-manager
      roles:
        - role: ../roles/wazuh/ansible-wazuh-manager
        - role: ../roles/wazuh/ansible-filebeat-oss
          become: yes
          become_user: root
          vars:
            wazuh_manager_config:
              cluster:
                  name: 'wazuh-cluster'
                  node_name: 'wazuh-master'
                  node_type: 'master' # master or worker
                  nodes:
                    - "127.0.0.1"
             filebeat_node_name: node-1
             filebeat_output_elasticsearch_hosts:
                - "127.0.0.1"

.. note::

	In this case we have chosen to install Filebeat. If we don't want to install it, it would be enough to delete the corresponding entry in the roles section.
	Analogically, we can only install the role of Filebeat.

3 - Running the playbook
------------------------

It seems that we are ready to run the playbook and start the installation, but some of the operations we will perform on the remote systems will need sudo permissions. We can solve this in several ways, opting to enter the password when Ansible requests it. To contemplate other options we consult the option `become <https://docs.ansible.com/ansible/latest/user_guide/become.html#id1>`_ (to avoid entering passwords one by one).

3.1 - Let's launch the playbook run.

- We use the ``-b`` option to indicate that we are going to become a super user.
- We use the ``-K`` option to indicate Ansible to ask for the password.

.. code-block:: console

	ansible@ansible:/etc/ansible/roles/wazuh-ansible/playbooks$ ansible-playbook wazuh-manager-oss.yml -b -K

We will obtain a final result similar to the one shown in the following code block.

.. code-block:: none
	:class: output

	PLAY [wazuh-cluster-manager] *********************************************************************************

	TASK [Gathering Facts] ***********************************************************************************
	ok: [poc-allinone-wm]

	TASK [../roles/wazuh/ansible-wazuh-manager : Overlay wazuh_manager_config on top of defaults] ************
	ok: [poc-allinone-wm]

	TASK [../roles/wazuh/ansible-wazuh-manager : Install dependencies] ***************************************
	changed: [poc-allinone-wm]

	TASK [../roles/wazuh/ansible-wazuh-manager : include_tasks] **********************************************
	skipping: [poc-allinone-wm]

	TASK [../roles/wazuh/ansible-wazuh-manager : include_tasks] **********************************************
	included: /home/nikos/workspace/work-wazuh/repos/wazuh-ansible/roles/wazuh/ansible-wazuh-manager/tasks/Debian.yml for poc-allinone-wm

	TASK [../roles/wazuh/ansible-wazuh-manager : Debian/Ubuntu | Install apt-transport-https and ca-certificates] ***
	changed: [poc-allinone-wm]

	TASK [../roles/wazuh/ansible-wazuh-manager : Debian/Ubuntu | Installing Wazuh repository key (Ubuntu 14)] ***
	skipping: [poc-allinone-wm]

	TASK [../roles/wazuh/ansible-wazuh-manager : Debian/Ubuntu | Installing Wazuh repository key] ************
	changed: [poc-allinone-wm]

	TASK [../roles/wazuh/ansible-wazuh-manager : Debian/Ubuntu | Add Wazuh repositories] *********************
	ok: [poc-allinone-wm]

	TASK [../roles/wazuh/ansible-wazuh-manager : Debian/Ubuntu | Set Distribution CIS filename for Debian/Ubuntu] ***
	ok: [poc-allinone-wm]

	TASK [../roles/wazuh/ansible-wazuh-manager : Debian/Ubuntu | Install OpenJDK-8 repo] *********************
	skipping: [poc-allinone-wm]

	TASK [../roles/wazuh/ansible-wazuh-manager : Debian/Ubuntu | Install OpenJDK 1.8] ************************
	skipping: [poc-allinone-wm]

	TASK [../roles/wazuh/ansible-wazuh-manager : Debian/Ubuntu | Install OpenScap] ***************************
	skipping: [poc-allinone-wm]

	TASK [../roles/wazuh/ansible-wazuh-manager : Debian/Ubuntu | Get OpenScap installed version] *************
	skipping: [poc-allinone-wm]

	TASK [../roles/wazuh/ansible-wazuh-manager : Debian/Ubuntu | Check OpenScap version] *********************
	skipping: [poc-allinone-wm]

	TASK [../roles/wazuh/ansible-wazuh-manager : Install dependencies to build from sources] *****************
	skipping: [poc-allinone-wm]

	TASK [../roles/wazuh/ansible-wazuh-manager : Debian/Ubuntu | Install wazuh-manager] **********************
	changed: [poc-allinone-wm]

	TASK [../roles/wazuh/ansible-wazuh-manager : include_tasks] **********************************************
	skipping: [poc-allinone-wm]

	TASK [../roles/wazuh/ansible-wazuh-manager : include_tasks] **********************************************
	skipping: [poc-allinone-wm]

	TASK [../roles/wazuh/ansible-wazuh-manager : Install expect] *********************************************
	changed: [poc-allinone-wm]

	TASK [../roles/wazuh/ansible-wazuh-manager : Generate SSL files for authd] *******************************
	skipping: [poc-allinone-wm]

	TASK [../roles/wazuh/ansible-wazuh-manager : Copy CA, SSL key and cert for authd] ************************
	skipping: [poc-allinone-wm] => (item=) 
	skipping: [poc-allinone-wm] => (item=sslmanager.cert) 
	skipping: [poc-allinone-wm] => (item=sslmanager.key) 

	TASK [../roles/wazuh/ansible-wazuh-manager : Verifying for old init authd service] ***********************
	ok: [poc-allinone-wm]

	TASK [../roles/wazuh/ansible-wazuh-manager : Verifying for old systemd authd service] ********************
	ok: [poc-allinone-wm]

	TASK [../roles/wazuh/ansible-wazuh-manager : Ensure ossec-authd service is disabled] *********************
	skipping: [poc-allinone-wm]

	TASK [../roles/wazuh/ansible-wazuh-manager : Removing old init authd services] ***************************
	skipping: [poc-allinone-wm] => (item=/etc/init.d/ossec-authd) 
	skipping: [poc-allinone-wm] => (item=/lib/systemd/system/ossec-authd.service) 

	TASK [../roles/wazuh/ansible-wazuh-manager : Installing the local_rules.xml (default local_rules.xml)] ***
	changed: [poc-allinone-wm]

	TASK [../roles/wazuh/ansible-wazuh-manager : Adding local rules files] ***********************************
	changed: [poc-allinone-wm]

	TASK [../roles/wazuh/ansible-wazuh-manager : Installing the local_decoder.xml] ***************************
	changed: [poc-allinone-wm]

	TASK [../roles/wazuh/ansible-wazuh-manager : Adding local decoders files] ********************************
	changed: [poc-allinone-wm]

	TASK [../roles/wazuh/ansible-wazuh-manager : Configure the shared-agent.conf] ****************************
	skipping: [poc-allinone-wm]

	TASK [../roles/wazuh/ansible-wazuh-manager : Installing the local_internal_options.conf] *****************
	changed: [poc-allinone-wm]

	TASK [../roles/wazuh/ansible-wazuh-manager : Retrieving Agentless Credentials] ***************************
	ok: [poc-allinone-wm]

	TASK [../roles/wazuh/ansible-wazuh-manager : Retrieving authd Credentials] *******************************
	ok: [poc-allinone-wm]

	TASK [../roles/wazuh/ansible-wazuh-manager : Check if syslog output is enabled] **************************
	skipping: [poc-allinone-wm] => (item={'server': None, 'port': None, 'format': None}) 

	TASK [../roles/wazuh/ansible-wazuh-manager : Check if client-syslog is enabled] **************************
	ok: [poc-allinone-wm]

	TASK [../roles/wazuh/ansible-wazuh-manager : Enable client-syslog] ***************************************
	skipping: [poc-allinone-wm]

	TASK [../roles/wazuh/ansible-wazuh-manager : Check if ossec-agentlessd is enabled] ***********************
	ok: [poc-allinone-wm]

	TASK [../roles/wazuh/ansible-wazuh-manager : Enable ossec-agentlessd] ************************************
	skipping: [poc-allinone-wm]

	TASK [../roles/wazuh/ansible-wazuh-manager : Checking alert log output settings] *************************
	skipping: [poc-allinone-wm]

	TASK [../roles/wazuh/ansible-wazuh-manager : Configure ossec.conf] ***************************************
	changed: [poc-allinone-wm]

	TASK [../roles/wazuh/ansible-wazuh-manager : Ossec-authd password] ***************************************
	skipping: [poc-allinone-wm]

	TASK [../roles/wazuh/ansible-wazuh-manager : Copy create_user script] ************************************
	skipping: [poc-allinone-wm]

	TASK [../roles/wazuh/ansible-wazuh-manager : Execute create_user script] *********************************
	skipping: [poc-allinone-wm]

	TASK [../roles/wazuh/ansible-wazuh-manager : Agentless Hosts & Passwd] ***********************************
	skipping: [poc-allinone-wm]

	TASK [../roles/wazuh/ansible-wazuh-manager : Encode the secret] ******************************************
	skipping: [poc-allinone-wm]

	TASK [../roles/wazuh/ansible-wazuh-manager : Ensure Wazuh Manager service is started and enabled.] *******
	changed: [poc-allinone-wm]

	TASK [../roles/wazuh/ansible-wazuh-manager : Create agent groups] ****************************************

	TASK [../roles/wazuh/ansible-wazuh-manager : Run uninstall tasks] ****************************************
	included: /home/nikos/workspace/work-wazuh/repos/wazuh-ansible/roles/wazuh/ansible-wazuh-manager/tasks/uninstall.yml for poc-allinone-wm

	TASK [../roles/wazuh/ansible-wazuh-manager : Debian/Ubuntu | Remove Wazuh repository.] *******************
	ok: [poc-allinone-wm]

	TASK [../roles/wazuh/ansible-wazuh-manager : RedHat/CentOS/Fedora | Remove Wazuh repository (and clean up left-over metadata)] ***
	skipping: [poc-allinone-wm]

	TASK [../roles/wazuh/ansible-filebeat-oss : include_tasks] ***********************************************
	skipping: [poc-allinone-wm]

	TASK [../roles/wazuh/ansible-filebeat-oss : include_tasks] ***********************************************
	included: /home/nikos/workspace/work-wazuh/repos/wazuh-ansible/roles/wazuh/ansible-filebeat-oss/tasks/Debian.yml for poc-allinone-wm

	TASK [../roles/wazuh/ansible-filebeat-oss : Debian/Ubuntu | Install apt-transport-https and ca-certificates] ***
	ok: [poc-allinone-wm]

	TASK [../roles/wazuh/ansible-filebeat-oss : Debian/Ubuntu | Add Elasticsearch apt key.] ******************
	changed: [poc-allinone-wm]

	TASK [../roles/wazuh/ansible-filebeat-oss : Debian/Ubuntu | Add Filebeat-oss repository.] ****************
	ok: [poc-allinone-wm]

	TASK [../roles/wazuh/ansible-filebeat-oss : Install Filebeat | Redhat] ***********************************
	skipping: [poc-allinone-wm]

	TASK [../roles/wazuh/ansible-filebeat-oss : Install Filebeat | Debian] ***********************************
	changed: [poc-allinone-wm]

	TASK [../roles/wazuh/ansible-filebeat-oss : Checking if Filebeat Module folder file exists] **************
	ok: [poc-allinone-wm]

	TASK [../roles/wazuh/ansible-filebeat-oss : Download Filebeat module package] ****************************
	changed: [poc-allinone-wm]

	TASK [../roles/wazuh/ansible-filebeat-oss : Unpack Filebeat module package] ******************************
	changed: [poc-allinone-wm]

	TASK [../roles/wazuh/ansible-filebeat-oss : Setting 0755 permission for Filebeat module folder] **********
	changed: [poc-allinone-wm]

	TASK [../roles/wazuh/ansible-filebeat-oss : Checking if Filebeat Module package file exists] *************
	ok: [poc-allinone-wm]

	TASK [../roles/wazuh/ansible-filebeat-oss : Delete Filebeat module package file] *************************
	changed: [poc-allinone-wm]

	TASK [../roles/wazuh/ansible-filebeat-oss : Copy Filebeat configuration.] ********************************
	changed: [poc-allinone-wm]

	TASK [../roles/wazuh/ansible-filebeat-oss : Fetch latest Wazuh alerts template] **************************
	changed: [poc-allinone-wm]

	TASK [../roles/wazuh/ansible-filebeat-oss : include_tasks] ***********************************************
	included: /home/nikos/workspace/work-wazuh/repos/wazuh-ansible/roles/wazuh/ansible-filebeat-oss/tasks/security_actions.yml for poc-allinone-wm

	TASK [../roles/wazuh/ansible-filebeat-oss : Ensure Filebeat SSL key pair directory exists.] **************
	changed: [poc-allinone-wm]

	TASK [../roles/wazuh/ansible-filebeat-oss : Copy the certificates from local to the Manager instance] ****
	changed: [poc-allinone-wm] => (item=node-1.key)
	changed: [poc-allinone-wm] => (item=node-1.pem)
	changed: [poc-allinone-wm] => (item=root-ca.pem)

	TASK [../roles/wazuh/ansible-filebeat-oss : Ensure Filebeat is started and enabled at boot.] *************
	changed: [poc-allinone-wm]

	TASK [../roles/wazuh/ansible-filebeat-oss : include_tasks] ***********************************************
	skipping: [poc-allinone-wm]

	TASK [../roles/wazuh/ansible-filebeat-oss : include_tasks] ***********************************************
	included: /home/nikos/workspace/work-wazuh/repos/wazuh-ansible/roles/wazuh/ansible-filebeat-oss/tasks/RMDebian.yml for poc-allinone-wm

	TASK [../roles/wazuh/ansible-filebeat-oss : Debian/Ubuntu | Remove Filebeat repository (and clean up left-over metadata)] ***
	ok: [poc-allinone-wm]

	RUNNING HANDLER [../roles/wazuh/ansible-wazuh-manager : restart wazuh-manager] ***************************
	changed: [poc-allinone-wm]

	RUNNING HANDLER [../roles/wazuh/ansible-filebeat-oss : restart filebeat] *********************************
	changed: [poc-allinone-wm]

	PLAY RECAP ***********************************************************************************************
	poc-allinone-wm            : ok=46   changed=25   unreachable=0    failed=0    skipped=29   rescued=0    ignored=0   



We can check the status of our new services in our Wazuh server.

- Wazuh manager.

.. code-block:: console

	[root@localhost centos]# systemctl status wazuh-manager

.. code-block:: none
	:class: output

	● wazuh-manager.service - Wazuh manager
		Loaded: loaded (/lib/systemd/system/wazuh-manager.service; enabled; vendor preset: enabled)
		Active: active (running) since Fri 2021-10-15 01:32:53 UTC; 18min ago
		Process: 45945 ExecStart=/usr/bin/env /var/ossec/bin/wazuh-control start (code=exited, status=0/SUCCE>
		Tasks: 108 (limit: 4567)
		Memory: 137.7M
		CGroup: /system.slice/wazuh-manager.service
				├─46017 /var/ossec/framework/python/bin/python3 /var/ossec/api/scripts/wazuh-apid.py


- Filebeat.

.. code-block:: console
	:class: output

	[root@localhost centos]# systemctl status filebeat

.. code-block:: none
	:class: output

	[root@localhost centos]# systemctl status filebeat
	● filebeat.service - Filebeat sends log files to Elasticsearch.
	   Loaded: loaded (/usr/lib/systemd/system/filebeat.service; enabled; vendor preset: disabled)
	   Active: active (running) since jue 2018-09-13 12:36:55 CEST; 37min ago