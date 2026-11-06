.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn about the requirements for deploying Wazuh with Ansible, including control node and target node requirements.

Requirements
============

Before deploying Wazuh with Ansible, ensure your environment meets the following requirements.

Control node requirements
-------------------------

The control node is the endpoint where you install Ansible and run the playbooks. The control node must meet the following requirements before you proceed with the deployment:

-  **Ansible is installed and configured**: Install ``ansible-core`` version 2.16 or later. This document was tested on ``ansible-core`` 2.16. Verify the installed version with the command, ``ansible --version``. Ensure the version is compatible with the operating systems of your target endpoints. The ``requirements.yml`` file does not pin collection versions, so ``ansible-galaxy`` installs the latest release of each collection that isn't installed yet. If a package of your distribution already installed a collection, for example the ``ansible`` package that ``ansible-core`` recommends on Ubuntu 24.04, ``ansible-galaxy`` prints ``Nothing to do`` and keeps that version. To install the latest releases instead, run ``ansible-galaxy install -r requirements.yml --force``. When a release requires a newer ``ansible-core`` than yours, ``ansible-galaxy`` and ``ansible-playbook`` can print a warning such as ``Collection community.general does not support Ansible version 2.16.19``, and continue.
-  **Python is installed**: Install Python 3.10 or later. Verify the version with the command, ``python3 --version``.
-  **Inventory file is configured**: Create and configure the ``/etc/ansible/hosts`` file that defines your target endpoints and connection variables. You can verify connectivity with ``ansible <HOST_OR_GROUP> -m ping`` for Linux and macOS endpoints, and with ``ansible <HOST_OR_GROUP> -m win_ping`` for Windows endpoints. Replace ``<HOST_OR_GROUP>`` with a host or group from your inventory. Each module works only on its own operating system.
-  **Git is installed**: Required to clone the ``wazuh-ansible`` repository.
-  **OpenSSL is installed**: The playbooks run ``openssl`` on the control node to read the certificates and to generate the cluster key. In a Wazuh cluster deployment, they also create the root CA of the deployment and issue its certificates with it.
-  **Root privileges**: Run the commands and playbooks of this guide as root (or with ``sudo``).
-  **SSH key access**: The control node logs in to every Linux and macOS target with an SSH key, as a user with ``sudo`` privileges. On the control node, as the user that runs ``ansible-playbook``, create a key with ``ssh-keygen -t ed25519 -f <PATH_TO_PRIVATE_KEY_FILE>``. Then copy it to each target with ``ssh-copy-id -i <PATH_TO_PRIVATE_KEY_FILE>.pub <USERNAME>@<TARGET_IP>``. Use the same path as ``<PATH_TO_PRIVATE_KEY_FILE>`` in the inventory.

Target node requirements
------------------------

Target nodes are the endpoints where Wazuh components will be installed. Your endpoints must meet the following requirements before you deploy Wazuh:

-  **Ansible version compatibility**: Ensure the Ansible version installed on the control node is compatible with the target endpoints on which Wazuh components will be installed.
-  **Python is installed on Linux endpoints**: Install Python 3.9 or later on all Linux endpoints. The default ``python3`` of RHEL 9 works. Ansible requires Python on managed Linux endpoints.
-  **Private network DNS**: If you use hostnames instead of IP addresses for endpoints, configure a DNS server. Ensure it resolves the FQDN of your endpoints. Otherwise, use the hosts file.
-  **SSH Access to Linux endpoints**: By default, Ansible connects to Linux endpoints on TCP port 22. Ensure that this port is open on all managed hosts and any intermediate firewalls. If Ansible is configured to use a different port, verify that the corresponding port is also opened and accessible.
-  **Windows Remote Management (WinRM) access to Windows endpoints**: A WinRM listener over HTTPS is configured and running on port 5986 of the Windows endpoints. An HTTPS listener requires a server authentication certificate. Ansible connects over WinRM only to hosts whose inventory entry sets ``ansible_connection=winrm``, and it needs the ``pywinrm`` Python package on the control node.
-  **Required open ports**: Refer to the :ref:`default_ports` section for details about the network ports used by the Wazuh components for communication.
-  **Hardware requirements**: Ensure that each endpoint meets the hardware requirements for the Wazuh component being installed. Refer to the documentation for :doc:`Wazuh indexer </installation-guide/wazuh-indexer/index>`, :doc:`Wazuh manager </installation-guide/wazuh-manager/index>`, :doc:`Wazuh dashboard </installation-guide/wazuh-dashboard/index>`, or :doc:`Wazuh agent </installation-guide/wazuh-agent/index>` for detailed hardware specifications.
