.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn about the Ansible roles available to deploy Wazuh components, including the package-urls, Wazuh indexer, manager, dashboard, and agent roles.

Roles
=====

You can use the preconfigured roles to deploy the Wazuh central components and the Wazuh agents. Roles are reusable Ansible components that contain the tasks, default variables, and configuration logic required to install and configure each Wazuh component. Clone the Wazuh `GitHub repository <https://github.com/wazuh/wazuh-ansible>`_ to your Ansible roles folder:

.. code-block:: console

   # cd /etc/ansible/roles
   # git clone --branch v|WAZUH_CURRENT_ANSIBLE|-|WAZUH_CURRENT_ANSIBLE_REV| https://github.com/wazuh/wazuh-ansible.git

The following sections explain how to use and customize these roles. For more details about Ansible roles, see the `Ansible community documentation <https://docs.ansible.com/ansible/latest/playbook_guide/playbooks_reuse_roles.html>`_.

.. contents::
   :local:
   :depth: 1
   :backlinks: none

Package-urls
------------

This role resolves and downloads the artifact URL definitions file that other roles use to locate the correct Wazuh packages for the target version. Depending on the ``source`` variable, the role downloads the URL definitions file from either the production repository or the pre-release staging environment. The resulting file, ``artifact_urls.yaml``, is stored locally in ``/etc/ansible/roles/wazuh-ansible/roles/vars/`` and subsequently loaded by other roles at runtime.

This role runs once on the control node (not on target hosts) and is a prerequisite for any deployment that downloads packages from remote sources. The role is executed first in the ``wazuh-aio.yml``, ``wazuh-distributed.yml``, and ``wazuh-agent.yml`` playbooks to ensure package URLs are available before installation tasks begin.

Wazuh indexer
-------------

This role installs and configures the Wazuh indexer on the target node. It supports both RHEL-based and Debian-based Linux distributions. The role handles package installation, dependency installation, SSL certificate deployment, cluster security initialization, service startup, and API verification. It supports both single-node and multi-node deployments using the ``single_node`` variable.

The role performs the following tasks:

-  **Import variables:** Loads shared variables from ``/etc/ansible/roles/wazuh-ansible/vars/main.yml`` and ``/etc/ansible/roles/wazuh-ansible/vars/artifact_urls.yaml``.
-  **Install dependencies:** Installs required system packages using the ``dependencies.yml`` task file.
-  **Install package (RHEL):** Downloads and installs the ``.rpm`` package using the ``dnf`` package manager.
-  **Install package (Debian):** Downloads and installs the ``.deb`` package using the ``apt`` package manager.
-  **Configure node:** Applies node-specific settings and deploys SSL certificates via ``config_files_setup.yml``.
-  **Reload systemd:** Reloads the systemd daemon after installation.
-  **Start service:** Enables and starts the Wazuh indexer service.
-  **Initialize security:** Runs the ``indexer-security-init.sh`` script to initialize the cluster security configuration.
-  **Verify API:** Verifies that the Wazuh indexer REST API is reachable on port 9200.

Wazuh manager
-------------

This role installs and configures the Wazuh manager on the target node. It supports both RHEL-based and Debian-based Linux distributions. The role downloads and installs packages for the target architecture, deploys configuration files and SSL certificates from ``deployment-config-files/``, and ensures the service remains enabled and running. The role supports both single-node and multi-node deployments. In distributed environments, nodes can be configured as master or worker.

The role performs the following tasks:

-  **Import variables:** Loads shared variables from ``/etc/ansible/roles/wazuh-ansible/vars/main.yml`` and ``/etc/ansible/roles/wazuh-ansible/vars/artifact_urls.yaml``.
-  **Validate config path:** Verifies that the ``local_configs_path`` directory exists on the Ansible control node before deployment begins.
-  **Create download directory:** Creates the package download directory on the target node before downloading installation packages.
-  **Download package (RHEL):** Downloads the ``.rpm`` package for supported ``x86_64`` and ``aarch64`` RHEL architectures.
-  **Install package (RHEL):** Installs the downloaded ``.rpm`` package using ``dnf``.
-  **Download package (Debian):** Downloads the ``.deb`` package for supported ``amd64`` and ``arm64`` Debian architectures.
-  **Install package (Debian):** Installs the downloaded ``.deb`` package using ``apt``.
-  **Deploy configuration files:** Copies ``ossec.conf`` and related configuration files from the Ansible control node to the target node.
-  **Deploy SSL certificates:** Copies certificates required for Wazuh manager to Wazuh indexer communication.
-  **Start service:** Enables and starts the Wazuh manager service.

Wazuh dashboard
---------------

This role installs and configures the Wazuh dashboard on the target node. It supports both RHEL-based and Debian-based Linux distributions. After installation, the role configures ``opensearch_dashboards.yml`` with Wazuh indexer nodes and the Wazuh manager address. The role deploys SSL certificates and ensures the dashboard service remains enabled and running.

The role performs the following tasks:

-  **Import variables:** Loads shared variables from ``/etc/ansible/roles/wazuh-ansible/vars/main.yml`` and ``/etc/ansible/roles/wazuh-ansible/vars/artifact_urls.yaml``.
-  **Install dependencies:** Installs required system packages using the ``dependencies.yml`` task file.
-  **Install package (RHEL):** Installs the ``.rpm`` package using ``dnf``.
-  **Install package (Debian):** Installs the ``.deb`` package using ``apt``.
-  **Reload systemd:** Reloads the systemd daemon after installation.
-  **Configure OpenSearch hosts:** Updates ``opensearch_dashboards.yml`` with Wazuh indexer cluster nodes.
-  **Configure manager URL:** Configures the Wazuh manager URL in ``opensearch_dashboards.yml``.
-  **Detect SSL certificate paths:** Reads certificate and key file paths from ``opensearch_dashboards.yml``.
-  **Deploy SSL certificates:** Copies SSL certificates and key files to the configured target paths.
-  **Start service:** Enables and starts the Wazuh dashboard service.

Wazuh agent
-----------

This role installs the Wazuh agent on Linux, Windows, and macOS target nodes. The role automatically detects the operating system at runtime and imports the appropriate platform-specific task file. On Linux systems, the role imports distribution-specific tasks depending on the detected operating system family.

The role performs the following tasks:

-  **Import variables:** Loads shared variables from ``/etc/ansible/roles/wazuh-ansible/vars/main.yml`` and ``/etc/ansible/roles/wazuh-ansible/vars/artifact_urls.yaml``.
-  **Linux tasks:** Imports ``Linux.yml`` for Linux systems and distribution-specific tasks automatically.
-  **Windows tasks:** Imports ``Windows.yml`` for Windows systems.
-  **macOS tasks:** Imports ``macOS.yml`` for macOS systems.