.. Copyright (C) 2018 Wazuh, Inc.

.. _wazuh_ansible_wazuh_server:

Install Wazuh Server
====================

Once the Ansible repository has been cloned, we proceed to install the Wazuh server, that is, we will install a Wazuh manager, Wazuh API and Filebeat.

1 - Access to wazuh-ansible. 
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

1.1 - We access the directory where we have cloned the repository from our Ansible server

.. code-block:: console

	ansible@ansible:/etc/ansible/wazuh-ansible$ ls
	ansible-role-elasticsearch  ansible-role-logstash  meta             wazuh-elastic_stack-distributed.yml  wazuh-kibana.yml
	ansible-role-filebeat       ansible-wazuh-agent    README.md        wazuh-elastic_stack-single.yml       wazuh-logstash.yml
	ansible-role-kibana         ansible-wazuh-manager  wazuh-agent.yml  wazuh-elastic.yml                    wazuh-manager.yml

Using **Wazuh Manager** role we will install and configure Wazuh Manager and Wazuh API, there are several variables we can use to customize the installation or configuration. To consult the default configuration go to this :ref:`section <wazuh_ansible_reference>`. 

If we want to change the default configuration we can change the ``/etc/ansible/wazuh-ansible/ansible-wazuh-manager/defaults/main.yml`` file directly or we can create another YAML file only with the content we want to change the configuration. If we would like to do this, we can find more information at :ref: `Wazuh Manager <ansible-wazuh-manager>` role, where we can also see how to change the default configuration of agentless and Wazuh API. 

Let's see below, the content of the YAML file ``/etc/ansible/wazuh-ansible/wazuh-manager.yml`` that we are going to run for a complete installation of the server. 

.. code-block:: console

	ansible@ansible:/etc/ansible/wazuh-ansible$ cat wazuh-manager.yml
	- hosts: wazuh-manager
	  roles:
	    - role: ansible-wazuh-manager
	    - { role: ansible-role-filebeat, filebeat_output_logstash_hosts: '192.168.33.169:5000' }


Let's take a closer look at the content. 

The first line ``hosts:`` indicates the machines where the commands below will be executed. 

The ``roles:`` section indicates the roles that will be executed on the hosts mentioned above. Specifically, we are going to install the role of wazuh-manager (Wazuh manager + API) and the role of filebeat to which we indicate to overwrite the field ``filebeat_output_logstash_hosts`` with that IP address.

2 - Preparing the playbook 
~~~~~~~~~~~~~~~~~~~~~~~~~~

2.1 - We must create a similar YAML file or modify the one we already have to adapt it to our configuration. We will use the IP address of the machine where we are going to install the Wazuh server adding it to the hosts section and we will add the IP address of the machine where we are going to install our Logstash service to the ``filebeat_output_logstash_hosts`` field. 

Our resulting file is:  

.. code-block:: yaml

	- hosts: 192.168.0.180
	  roles:
	    - role: ansible-wazuh-manager
	    - { role: ansible-role-filebeat, filebeat_output_logstash_hosts: '192.168.0.108:5000' }


.. note::

	In this case we have chosen to install Filebeat. If we don't want to install it, it would be enough to delete the corresponding entry in the roles section. 

	.. code-block:: yaml

		- hosts: 192.168.0.180
		  roles:
		    - role: ansible-wazuh-manager

.. note::

	Analogically, we can only install the role of Filebeat.

	.. code-block:: yaml

		- hosts: 192.168.0.180
		  roles:
		    - { role: ansible-role-filebeat, filebeat_output_logstash_hosts: '192.168.0.108:5000' }


3 - Running the playbook
~~~~~~~~~~~~~~~~~~~~~~~~

It seems that we are ready to run the playbook and start the installation, but some of the operations we will perform on the remote systems will need sudo permissions. We can solve this in several ways, opting to enter the password when Ansible requests it. To contemplate other options we consult the option `become <https://docs.ansible.com/ansible/latest/user_guide/become.html#id1>`_ (to avoid entering passwords one by one). 

3.1 - Let's launch the playbook run.

- We use the ``-b`` option to indicate that we are going to become a super user.
- We use the ``-K`` option to indicate Ansible to ask for the password. 

.. code-block:: console

	ansible@ansible:/etc/ansible/wazuh-ansible$ ansible-playbook wazuh-manager.yml -b -K

We will obtain a final result similar to the one shown in the following image. 

.. thumbnail:: ../../images/ansible/ansible-manager.png
    :align: center
    :width: 100%

We can check the status of our new services in our Wazuh server. 

- Wazuh manager.

.. code-block:: console

	[root@localhost centos]# systemctl status wazuh-manager
	● wazuh-manager.service - Wazuh manager
	   Loaded: loaded (/etc/systemd/system/wazuh-manager.service; enabled; vendor preset: disabled)
	   Active: active (running) since jue 2018-09-13 12:36:52 CEST; 35min ago

- Wazuh API.

.. code-block:: console

	[root@localhost centos]# systemctl status wazuh-api
	● wazuh-api.service - Wazuh API daemon
	   Loaded: loaded (/etc/systemd/system/wazuh-api.service; enabled; vendor preset: disabled)
	   Active: active (running) since jue 2018-09-13 12:36:54 CEST; 36min ago

- Filebeat

.. code-block:: console

	● filebeat.service - Filebeat sends log files to Logstash or directly to Elasticsearch.
	   Loaded: loaded (/usr/lib/systemd/system/filebeat.service; enabled; vendor preset: disabled)
	   Active: active (running) since jue 2018-09-13 12:36:55 CEST; 37min ago
