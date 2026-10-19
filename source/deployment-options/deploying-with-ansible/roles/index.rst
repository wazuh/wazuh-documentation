.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn about the Ansible roles available to deploy Wazuh components, including the package-urls, Wazuh credentials, Wazuh indexer, manager, dashboard, and agent roles.

Roles
=====

You can use the preconfigured roles to deploy the Wazuh central components and the Wazuh agents. Roles are reusable Ansible components that contain the tasks, default variables, and configuration logic required to install and configure each Wazuh component. Clone the Wazuh `GitHub repository <https://github.com/wazuh/wazuh-ansible>`__ to your Ansible roles folder:

.. code-block:: console

   # cd /etc/ansible/roles
   # git clone --branch v|WAZUH_CURRENT_ANSIBLE|-|WAZUH_CURRENT_ANSIBLE_REV| https://github.com/wazuh/wazuh-ansible.git

The following sections explain how to use and customize these roles. For more details about Ansible roles, see the `Ansible community documentation <https://docs.ansible.com/projects/ansible/latest/playbook_guide/playbooks_reuse_roles.html>`__.

.. contents::
   :local:
   :depth: 1
   :backlinks: none

Package-urls
------------

This role resolves and downloads the artifact URL definitions file that other roles use to locate the correct Wazuh packages for the target version. Depending on the ``source`` variable, the role downloads the URL definitions file from either the production repository or the pre-release staging environment. The resulting file, ``artifact_urls.yaml``, is stored locally in ``/etc/ansible/roles/wazuh-ansible/roles/vars/`` and subsequently loaded by other roles at runtime.

This role runs once on the control node (not on target hosts) and is a prerequisite for any deployment that downloads packages from remote sources. The role is executed first in the ``wazuh-aio.yml``, ``wazuh-distributed.yml``, and ``wazuh-agent.yml`` playbooks to ensure package URLs are available before installation tasks begin.

Wazuh credentials
-----------------

This role provides the deployment passwords to the Wazuh indexer, Wazuh manager, and Wazuh dashboard packages, which read them only when they are installed. The ``wazuh-indexer``, ``wazuh-manager``, and ``wazuh-dashboard`` roles include it, so the playbooks do not list it. The role performs the following tasks:

-  **Validate supplied passwords:** Checks the values in ``wazuh_credentials_overrides`` against the password policy of the packages. Runs once, on the Ansible control node.
-  **Generate passwords:** Writes a password for each key that has no file yet in ``wazuh_credentials_path``, on the Ansible control node. It never overwrites an existing file.
-  **Load passwords:** Reads the five passwords for the rest of the run.
-  **Refuse another deployment:** Stops the run if ``/etc/wazuh/ca/root-ca.pem`` on the host is not the root CA of this deployment. Before the package is installed, it also stops if ``/etc/wazuh/credentials.env`` holds other values for the component's keys.
-  **Provide credentials:** Before the component's package is installed, writes the keys the component reads to ``/etc/wazuh/credentials.env`` on the host. It does not write the file again after installation and never removes it.
-  **Wait for the certificate:** Before each service starts, waits until the node certificate is valid on the host. It stops the run if the host clock is more than ``wazuh_certificate_max_wait`` seconds behind the Ansible control node.

Wazuh indexer
-------------

This role installs and configures the Wazuh indexer on the target node. It supports both RHEL-based and Debian-based Linux distributions. The role provides the node's passwords, generates the deployment certificates on the Ansible control node, and stages the node's certificates before it installs the package. It then configures the node, initializes the cluster security, and verifies the Wazuh indexer API. It supports both single-node and multi-node deployments using the ``single_node`` variable.

The role performs the following tasks:

-  **Import variables:** Loads shared variables from ``/etc/ansible/roles/wazuh-ansible/roles/vars/main.yml`` and ``/etc/ansible/roles/wazuh-ansible/roles/vars/artifact_urls.yaml``.
-  **Install dependencies:** Installs required system packages using the ``dependencies.yml`` task file.
-  **Load passwords:** Runs the ``wazuh-credentials`` role, which generates the deployment passwords on the Ansible control node during the first run and loads them on later runs.
-  **Generate certificates:** Runs the Wazuh certificates tool as root on the Ansible control node when ``generate_certs`` is ``true`` and the deployment has no root CA yet. It builds ``config.yml`` from ``instances`` and keeps the root CA and its private key in ``wazuh_certs_ca_dir``.
-  **Provide credentials:** Writes the Wazuh indexer passwords to ``/etc/wazuh/credentials.env`` on the node before the package is installed. It stops the run if the node holds the root CA or the passwords of another deployment.
-  **Stage certificates:** Copies the root CA certificate to ``/etc/wazuh/ca``, and the node and admin certificates to ``/etc/wazuh-indexer/certs``, before the package is installed.
-  **Install package (RHEL):** Downloads and installs the ``.rpm`` package using the ``dnf`` package manager.
-  **Install package (Debian):** Downloads and installs the ``.deb`` package using the ``apt`` package manager.
-  **Configure node:** Sets the node address, node name, cluster nodes, and ``plugins.security.nodes_dn`` using ``config_files_setup.yml``.
-  **Configure JVM heap:** Sets the heap size to ``wazuh_indexer_heap_size``. When the variable is empty, it uses a quarter of the host memory with ``single_node: true``, and half of it otherwise.
-  **Reload systemd:** Reloads the ``systemd`` daemon after installation.
-  **Wait for the certificate:** Waits until the node certificate is valid on the host, up to ``wazuh_certificate_max_wait`` seconds.
-  **Start service:** Enables and starts the Wazuh indexer service.
-  **Initialize security:** Runs the ``indexer-security-init.sh`` script once, from one node, to load the security configuration into the cluster.
-  **Verify API:** Waits for the Wazuh indexer API on port ``9200`` to report a healthy cluster, authenticating as ``admin`` with the deployment password.
-  **Remove installation files:** Deletes the ``wazuh_indexer_package_download_path`` directory from the node.

Wazuh manager
-------------

This role installs and configures the Wazuh manager on the target node. It supports both RHEL-based and Debian-based Linux distributions. The role downloads and installs packages for the target architecture, deploys SSL certificates from the Ansible control node. It also configures ``wazuh-manager.conf`` on the target node, and ensures the service remains enabled and running. The role supports both single-node and multi-node deployments. In distributed environments, nodes can be configured as master or worker.

The role performs the following tasks:

-  **Import variables:** Loads shared variables from ``/etc/ansible/roles/wazuh-ansible/roles/vars/main.yml`` and ``/etc/ansible/roles/wazuh-ansible/roles/vars/artifact_urls.yaml``.
-  **Validate config path:** Verifies that the ``local_configs_path`` directory exists on the Ansible control node before deployment begins.
-  **Provide credentials:** Runs the ``wazuh-credentials`` role and writes the Wazuh manager passwords to ``/etc/wazuh/credentials.env`` on the node before the package is installed.
-  **Stage certificates:** Copies the root CA certificate to ``/etc/wazuh/ca``, and the indexer connector and agent listener certificates to ``/var/wazuh-manager/etc/certs``, before the package is installed.
-  **Create download directory:** Creates the package download directory on the target node before downloading installation packages.
-  **Download package (RHEL):** Downloads the ``.rpm`` package for supported ``x86_64`` and ``aarch64`` RHEL architectures.
-  **Install package (RHEL):** Installs the downloaded ``.rpm`` package using dnf.
-  **Download package (Debian):** Downloads the ``.deb`` package for supported ``amd64`` and ``arm64`` Debian architectures.
-  **Install package (Debian):** Installs the downloaded ``.deb`` package using ``apt``.
-  **Reload systemd:** Reloads the ``systemd`` daemon after installation.
-  **Configure the Wazuh manager:** Edits ``/var/wazuh-manager/etc/wazuh-manager.conf`` on the target node to set the Wazuh indexer hosts, the node name, the node type, and the bind address. In a cluster, it also sets the cluster key, which it generates once on the Ansible control node, and the master node address.
-  **Deploy SSL certificates:** Copies the root CA certificate, the indexer connector certificate, and the agent listener certificate to the paths the Wazuh manager uses.
-  **Wait for the certificate:** Waits until the node certificate is valid on the host.
-  **Start service:** Enables and restarts the Wazuh manager service.
-  **Verify API:** On the master node, authenticates to the Wazuh manager API as ``wazuh`` with the deployment password and runs a cluster health check. On a worker node, runs ``cluster_control -l``.
-  **Remove installation files:** Deletes the package download directory on the target node.

Wazuh dashboard
---------------

This role installs and configures the Wazuh dashboard on the target node. It supports both RHEL-based and Debian-based Linux distributions. After installation, the role configures ``opensearch_dashboards.yml`` with Wazuh indexer nodes and the Wazuh manager address. The role deploys SSL certificates and ensures the dashboard service remains enabled and running.

The role performs the following tasks:

-  **Import variables:** Loads shared variables from ``/etc/ansible/roles/wazuh-ansible/roles/vars/main.yml`` and ``/etc/ansible/roles/wazuh-ansible/roles/vars/artifact_urls.yaml``.
-  **Install dependencies:** Checks that the ``local_configs_path`` directory exists on the Ansible control node, installs the required system packages, and downloads the ``.rpm`` or ``.deb`` package, using the ``dependencies.yml`` task file. On Debian-based systems, it also restarts the services that ``needrestart`` reports, including SSH.
-  **Provide credentials:** Runs the ``wazuh-credentials`` role and writes the Wazuh dashboard passwords to ``/etc/wazuh/credentials.env`` on the node before the package is installed.
-  **Stage certificates:** Copies the root CA certificate to ``/etc/wazuh/ca`` and the dashboard certificate to ``/etc/wazuh-dashboard/certs`` before the package is installed.
-  **Install package (RHEL):** Installs the ``.rpm`` package using ``dnf``.
-  **Install package (Debian):** Installs the ``.deb`` package using ``apt``.
-  **Reload systemd:** Reloads the ``systemd`` daemon after installation.
-  **Configure OpenSearch hosts:** Updates ``opensearch_dashboards.yml`` with Wazuh indexer cluster nodes.
-  **Configure manager URL:** Configures the Wazuh manager URL in ``opensearch_dashboards.yml``.
-  **Detect SSL certificate paths:** Reads certificate and key file paths from ``opensearch_dashboards.yml``.
-  **Deploy SSL certificates:** Copies SSL certificates and key files to the configured target paths.
-  **Wait for the certificate:** Waits until the node certificate is valid on the host.
-  **Start service:** Enables and restarts the Wazuh dashboard service.
-  **Verify service:** Waits until the Wazuh dashboard login page returns HTTP 200.
-  **Remove installation files:** Deletes the package download directory on the target node.

Wazuh agent
-----------

This role installs the Wazuh agent on Linux, Windows, and macOS target nodes, and enrolls it in the Wazuh manager with an enrollment token. The role automatically detects the operating system at runtime and imports the appropriate platform-specific task file. On Linux systems, the role imports distribution-specific tasks depending on the detected operating system family.

The role performs the following tasks:

-  **Import variables:** Loads shared variables from ``/etc/ansible/roles/wazuh-ansible/roles/vars/main.yml`` and ``/etc/ansible/roles/wazuh-ansible/roles/vars/artifact_urls.yaml``.
-  **Linux tasks:** Imports ``Linux.yml`` for Linux systems and distribution-specific tasks automatically.
-  **Windows tasks:** Imports ``Windows.yml`` for Windows systems.
-  **macOS tasks:** Imports ``macOS.yml`` for macOS systems.
