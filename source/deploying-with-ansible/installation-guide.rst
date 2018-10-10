.. Copyright (C) 2018 Wazuh, Inc.

.. _wazuh_ansible_guide:

Installation Guide
==================

The main objective of this section is to guide any user in the installation of an environment consisting of a Wazuh server, an Elastic Stack server and a Wazuh agent, in a simple and intuitive way using the Ansible deploy tool. 

`Ansible <https://www.ansible.com/resources/get-started>`_ is an open source software that automates software provisioning, configuration management, and application deployment. Ansible is a very powerful tool so its options are much wider than what we will show in this guide. 


.. note:: Before we get started with Ansible, confirm the following network requirements are met:

	- **Private network DNS**: If you intended to use hostname instead of IP Address for remote hosts definitions, be sure you have correctly setup you own DNS server and it responds correctly to your hosts FQDN hostname, otherwise use your hosts file.

	- **Firewall open ports**: Ansible can work with any TCP port, by default Ansible uses TCP/22 port to work with Linux hosts, be sure this port is open in hosts and/or firewalls.


.. toctree::
    :maxdepth: 1

    guide/install-ansible
    guide/install-wazuh-server
    guide/install-elk-server
    guide/install-wazuh-agent