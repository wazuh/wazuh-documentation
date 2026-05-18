.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn about the requirements for deploying Wazuh with Ansible, including control node and target node requirements.

Requirements
============

Before deploying Wazuh with Ansible, ensure your environment meets the following requirements.

.. _ansible_control_node_requirements:

Control node requirements
-------------------------

The control node is the endpoint where you install Ansible and run the playbooks. The control node must meet the following requirements before you proceed with the deployment:

-  **Ansible is installed and configured**: Install ansible-core version 2.16 or later. Verify the installed version with ``ansible --version``. Ensure the version is compatible with the operating systems of your target endpoints.
-  **Python is installed**: Install Python 3.10 or later. Verify the version with ``python3 --version``.
-  **Required Ansible Galaxy collections are installed**: Install the collections listed in the ``requirements.yml`` file of the ``wazuh-ansible`` repository:

   .. code-block:: console

      # ansible-galaxy install -r requirements.yml

-  **Inventory file is configured**: Create and configure the ``/etc/ansible/hosts`` file that defines your target endpoints and connection variables. You can verify connectivity for Linux/macOS endpoints using ``ansible all -m ping`` and for Windows endpoints using ``ansible -i all -m win_ping``.
-  **Git is installed**: Required to clone the ``wazuh-ansible`` repository.

.. _ansible_target_node_requirements:

Target node requirements
------------------------

Target nodes are the endpoints where Wazuh components will be installed. Your endpoints must meet the following requirements before you proceed with the deployment of Ansible:

-  **Ansible version compatibility**: Ensure the Ansible version installed on the control node is compatible with the target endpoints on which Wazuh components will be installed.
-  **Python is installed on Linux endpoints**: Install Python 3.10 or later on all Linux endpoints. Ansible requires Python on managed Linux endpoints.
-  **Private network DNS**: If you use hostnames instead of IP addresses for endpoints, configure a DNS server. Ensure it resolves the FQDN of your endpoints. Otherwise, use the hosts file.
-  **SSH Access to Linux endpoints**: By default, Ansible connects to Linux endpoints on TCP port 22. Ensure that this port is open on all managed hosts and any intermediate firewalls. If Ansible is configured to use a different port, verify that the corresponding port is also opened and accessible.
-  **Windows Remote Management (WinRM) access to Windows endpoints**: A WinRM listener is configured and running on the Windows endpoints. Ansible communicates with Windows endpoints over WinRM HTTPS (port 5986). Configuring WinRM over HTTPS requires a server authentication certificate. WinRM HTTPS cannot be enabled without a certificate.
-  **Required open ports**: Refer to the :ref:`default_ports` section for details about the network ports used by the Wazuh components for communication.
-  **Hardware requirements**: Ensure that each endpoint meets the hardware requirements for the Wazuh component being installed. Refer to the documentation for the :doc:`Wazuh indexer </installation-guide/wazuh-indexer/index>`, :doc:`Wazuh manager </installation-guide/wazuh-server/index>`, :doc:`Wazuh dashboard </installation-guide/wazuh-dashboard/index>`, or :doc:`Wazuh agent </installation-guide/wazuh-agent/index>` for detailed hardware specifications.
