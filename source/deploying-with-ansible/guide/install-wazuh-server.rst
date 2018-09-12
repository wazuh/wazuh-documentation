.. Copyright (C) 2018 Wazuh, Inc.

.. _wazuh_ansible_wazuh_server:

Install Wazuh Server
====================

Once the Ansible repository has been cloned, we proceed to install the Wazuh server, that is, we will install a Wazuh manager, Wazuh API and Filebeat.

1 - First we access the directory where we have cloned the repository from our Ansible server. 

.. code-block:: console

	ansible@ansible:/etc/ansible/wazuh-ansible$ ls
	ansible-role-elasticsearch  ansible-role-logstash  meta             wazuh-elastic_stack-distributed.yml  wazuh-kibana.yml
	ansible-role-filebeat       ansible-wazuh-agent    README.md        wazuh-elastic_stack-single.yml       wazuh-logstash.yml
	ansible-role-kibana         ansible-wazuh-manager  wazuh-agent.yml  wazuh-elastic.yml                    wazuh-manager.yml

Using **Wazuh Manager** role we will install and configure Wazuh Manager and Wazuh API, there are several variables we can use to customize the installation or configuration. To consult the default configuration go to this :ref:`section <wazuh_ansible_reference>`. 

