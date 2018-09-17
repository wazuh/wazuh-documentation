.. Copyright (C) 2018 Wazuh, Inc.

.. _wazuh_ansible_elk_server:

Install Elastic Stack Server
============================

The deployment of the Elastic Stack server involves the installation of Elasticsearch, Logstash and Kibana services. In the repository of Ansible that Wazuh has we can find the playbooks and roles necessary to carry out the installation. The Ansible server must have access to the Elastic Stack server. 

- `1 - Access to wazuh-ansible`_
- `2 - Preparing the playbook`_
- `3 - Running the playbook`_

.. note::

	Following the example we started in the previous sections, we have added a second host to the ``/etc/ansible/hosts`` file, in this case the operating system is Ubuntu 17 and we need to indicate the path of the Python interpreter.   


	192.168.0.180 ansible_ssh_user=centos
	
	192.168.0.108 ansible_ssh_user=elk      ansible_python_interpreter=/usr/bin/python3

	.. code-block:: console

		ansible@ansible:/etc/ansible/wazuh-ansible$ ansible all -m ping
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

	ansible@ansible:/etc/ansible/wazuh-ansible$ ls
	ansible-role-elasticsearch  ansible-role-logstash  meta             wazuh-elastic_stack-distributed.yml  wazuh-kibana.yml
	ansible-role-filebeat       ansible-wazuh-agent    README.md        wazuh-elastic_stack-single.yml       wazuh-logstash.yml
	ansible-role-kibana         ansible-wazuh-manager  wazuh-agent.yml  wazuh-elastic.yml                    wazuh-manager.yml

Using **Elasticsearch**, **Logstash** and **Kibana** roles we will install and configure the Elastic Stack server components, there are several variables we can use to customize the installation or configuration. To consult the default configuration go to this :ref:`section <wazuh_ansible_reference>`. 

If we want to change the default configuration we can change the following files:
- ``/etc/ansible/wazuh-ansible/ansible-role-elasticsearch/defaults/main.yml`` 
- ``/etc/ansible/wazuh-ansible/ansible-role-logstash/defaults/main.yml`` 
- ``/etc/ansible/wazuh-ansible/ansible-role-kibana/defaults/main.yml`` 

We also can create another YAML file only with the content we want to change the configuration for each role. We can find more information here:

- :ref:`Elasticsearch <ansible-wazuh-elasticsearch>` role. 
- :ref:`Logstash <ansible-wazuh-logstash>` role. 
- :ref:`Kibana <ansible-wazuh-kibana>` role. 


Let's see below, the content of the YAML files ``/etc/ansible/wazuh-elastic.yml``. 


.. code-block:: yaml

	- hosts: elasticsearch
	  roles:
	    - { role: ansible-role-elasticsearch, elasticsearch_network_host: '192.168.33.182' }

.. code-block:: yaml

	- hosts: logstash
	  roles:
	    - { role: ansible-role-logstash, elasticsearch_network_host: 'localhost' }

.. code-block:: yaml

	- hosts: kibana
	  roles:
	    - { role: ansible-role-kibana, elasticsearch_network_host: '192.168.33.182' }

These files are designed to run the installations of each service individually. 

Let's take a closer look at the content. 

The first line ``hosts:`` indicates the machines where the commands below will be executed. 

The ``roles:`` section indicates the roles that will be executed on the hosts.


2 - Preparing the playbook 
--------------------------

We could configure these three files and execute them, but we are going to create a single file that executes the installation of the services in our Elastic Stack Server. 

.. code-block:: console

	ansible@ansible:/etc/ansible/wazuh-ansible$ cat wazuh-elk.yml
	- hosts: 192.168.0.108
	  roles:
	      - { role: ansible-role-elasticsearch, elasticsearch_network_host: 'localhost' }
	      - { role: ansible-role-logstash, logstash_input_beats: true,  elasticsearch_network_host: 'localhost' }
	      - { role: ansible-role-kibana, elasticsearch_network_host: 'localhost' }

As we can see, we have added the IP address of our Elastic Stack server to the ``hosts`` entry. We have added the three roles to execute, as everything goes on a single server, they will use ``localhost`` to communicate with Elasticsearch. Finally, we prepare Logstash by adding the entry ``logstash_input_beats: true`` to receive Filebeat events. 


3 - Running the playbook
------------------------

It seems that we are ready to run the playbook and start the installation, but some of the operations we will perform on the remote systems will need sudo permissions. We can solve this in several ways, opting to enter the password when Ansible requests it. To contemplate other options we consult the option `become <https://docs.ansible.com/ansible/latest/user_guide/become.html#id1>`_ (to avoid entering passwords one by one). 

3.1 - Let's launch the playbook run.

- We use the ``-b`` option to indicate that we are going to become a super user.
- We use the ``-K`` option to indicate Ansible to ask for the password. 

.. code-block:: console

	ansible@ansible:/etc/ansible/wazuh-ansible$ ansible-playbook wazuh-elk.yml -b -K

.. note::

	The installation of the Wazuh application for Kibana may take some time.


We will obtain a final result similar to the one shown in the following code block. 


.. code-block:: console

	TASK [ansible-role-kibana : Make sure Elasticsearch is running before proceeding.] ************************************************************************
	ok: [192.168.0.108]

	TASK [ansible-role-kibana : Reload systemd] ***************************************************************************************************************
	ok: [192.168.0.108]

	TASK [ansible-role-kibana : Kibana configuration] *********************************************************************************************************
	changed: [192.168.0.108]

	TASK [ansible-role-kibana : Checking Wazuh-APP version] ***************************************************************************************************
	ok: [192.168.0.108]

	TASK [ansible-role-kibana : Removing old Wazuh-APP] *******************************************************************************************************
	skipping: [192.168.0.108]

	TASK [ansible-role-kibana : Removing bundles] *************************************************************************************************************
	skipping: [192.168.0.108]

	TASK [ansible-role-kibana : Install Wazuh-APP (can take a while)] *****************************************************************************************
	changed: [192.168.0.108]

	TASK [ansible-role-kibana : Ensure Kibana started and enabled] ********************************************************************************************
	changed: [192.168.0.108]

	TASK [ansible-role-kibana : Remove Elasticsearch repository (and clean up left-over metadata)] ************************************************************
	skipping: [192.168.0.108]

	TASK [ansible-role-kibana : Debian/Ubuntu | Removing Elasticsearch repository] ****************************************************************************
	ok: [192.168.0.108]

	RUNNING HANDLER [ansible-role-elasticsearch : restart elasticsearch] **************************************************************************************
	changed: [192.168.0.108]

	RUNNING HANDLER [ansible-role-logstash : restart logstash] ************************************************************************************************
	changed: [192.168.0.108]

	RUNNING HANDLER [ansible-role-kibana : restart kibana] ****************************************************************************************************
	changed: [192.168.0.108]

	PLAY RECAP ************************************************************************************************************************************************
	192.168.0.108              : ok=43   changed=23   unreachable=0    failed=0

	ansible@ansible:/etc/ansible/wazuh-ansible$


We can check the status of our new services in our Elastic Stack server. 

- Elasticsearch.

.. code-block:: console

	root@elk:/home/elk# systemctl status elasticsearch.service
	● elasticsearch.service - Elasticsearch
	   Loaded: loaded (/usr/lib/systemd/system/elasticsearch.service; enabled; vendor preset: enabled)
	  Drop-In: /etc/systemd/system/elasticsearch.service.d
	           └─elasticsearch.conf
	   Active: active (running) since Thu 2018-09-13 16:51:59 CEST; 5min ago

- Logstash.

.. code-block:: console

	root@elk:/home/elk# systemctl status logstash.service
	● logstash.service - logstash
	   Loaded: loaded (/etc/systemd/system/logstash.service; enabled; vendor preset: enabled)
	   Active: active (running) since Thu 2018-09-13 16:53:31 CEST; 4min 8s ago

- Kibana

.. code-block:: console

	root@elk:/home/elk# systemctl status kibana.service
	● kibana.service - Kibana
	   Loaded: loaded (/etc/systemd/system/kibana.service; enabled; vendor preset: enabled)
	   Active: active (running) since Thu 2018-09-13 16:53:32 CEST; 4min 58s ago

Once the Wazuh API is registered we can access it through our Kibana portal. 

.. thumbnail:: ../../images/ansible/ansible-elk.png
    :align: center
    :width: 100%