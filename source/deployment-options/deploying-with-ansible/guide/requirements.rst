.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn about the requirements for deploying Wazuh with Ansible.

.. _wazuh_ansible_requirements:

Requirements
============

Your endpoints must meet the following requirements before you proceed with the installation:

-  **Private network DNS**: If you use hostnames instead of IP addresses for endpoints, configure a DNS server. Ensure it resolves the FQDN of your endpoints. Otherwise, use the hosts file.

-  **Firewall open ports**: By default, Ansible connects to Linux endpoints on TCP port 22. Ensure that this port is open on all managed hosts and any intermediate firewalls. If Ansible is configured to use a different port, verify that the corresponding port is also opened and accessible.

-  **Required open ports**: Refer to the :ref:`Required ports <default_ports>` section for details about the network ports used by the Wazuh components to communicate with each other.
