.. Copyright (C) 2015–2022 Wazuh, Inc.

.. meta::
    :description: Check out this installation guide to create an environment consisting of a Wazuh server, an Elastic Stack server, and a Wazuh agent. 
  
  
.. _wazuh_ansible_guide:

Installation Guide
==================

The objective of this section is to guide users in the installation of an environment consisting of a Wazuh indexer, dashboard, manager, and Wazuh agents, in a simple and intuitive way using the Ansible deploy tool.

`Ansible <https://www.ansible.com/resources/get-started>`_ is an open source software that automates software provisioning, configuration management, and application deployment.


.. note::
  
  Before we get started with Ansible, confirm the following requirements are met:

	- Private network DNS: If you intend to use hostname instead of IP Address for remote endpoints definitions, be sure you have correctly set up your own DNS server and it corresponds to the FQDN of your endpoints, otherwise use your hosts file.

	- Firewall open ports: Ansible can work with any TCP port. By default, it uses TCP/22 port to work with Linux endpoints. Ensure this port is open in endpoints and/or firewalls.


.. toctree::
    :maxdepth: 1

    guide/install-ansible
    guide/install-indexer-dashboard
    guide/install-wazuh-manager
    guide/install-wazuh-cluster
    guide/install-wazuh-agent
