.. Copyright (C) 2019 Wazuh, Inc.

.. _before_ansible_installation:

Before Ansible installation
===========================

.. meta::
  :description: Find instructions to deploy Wazuh using the Ansible platform.

`Ansible <https://www.ansible.com/resources/get-started>`_  is an open source platform designed for automating tasks. It comes with Playbooks, a descriptive language based on YAML, that make easy to create and describe automation jobs. Also, Ansible communicates with every host over SSH, making it very secure. See `Ansible Overview <https://www.ansible.com/how-ansible-works>`_ for more info.

The main objective of this section is to guide any user in the installation of an environment consisting of a Wazuh server, an Elastic Stack server and a Wazuh agent, in a simple and intuitive way using the Ansible deploy tool.

Ansible is a very powerful tool that automates software provisioning, configuration management, and application deployment, so its options are much wider than what we will show in this guide.


.. note:: Before we get started with Ansible, confirm the following network requirements are met:

	- **Private network DNS**: If you intended to use hostname instead of IP Address for remote hosts definitions, be sure you have correctly setup you own DNS server and it responds correctly to your hosts FQDN hostname, otherwise use your hosts file.

	- **Firewall open ports**: Ansible can work with any TCP port, by default Ansible uses TCP/22 port to work with Linux hosts, be sure this port is open in hosts and/or firewalls.
