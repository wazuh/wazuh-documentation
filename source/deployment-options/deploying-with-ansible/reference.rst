.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn about the Ansible variable references for Wazuh deployments, including general variables and role-specific variables for the indexer, manager, dashboard, and agent.

Variables references
====================

General variables
-----------------

These variables are defined in ``/etc/ansible/roles/wazuh-ansible/roles/vars/main.yml`` and are automatically loaded by every role.

| **Variable:** ``wazuh_version_data``
| **Description:** Parsed JSON object read from VERSION.json in the playbook directory.
| **Default value:** ``{{ lookup('file', playbook_dir + '/VERSION.json') | from_json }}``
|
| **Variable:** ``wazuh_full_version``
| **Description:** The full Wazuh version string (e.g., ``|WAZUH_CURRENT_ANSIBLE|``) extracted from ``wazuh_version_data``.
| **Default value:** ``{{ wazuh_version_data.version }}``
|
| **Variable:** ``wazuh_major_minor_version``
| **Description:** The major and minor version components only (e.g., ``|WAZUH_CURRENT_MINOR_ANSIBLE|``), derived from ``wazuh_full_version``.
| **Default value:** ``{{ wazuh_version_data.version.split('.')[0:2] | join('.') }}``
|
| **Variable:** ``wazuh_major_version``
| **Description:** The major version string in X.x format (e.g., ``|WAZUH_CURRENT_MAJOR|``), used in package repository URL paths.
| **Default value:** ``{{ wazuh_version_data.version.split('.')[0] }}.x``
|
| **Variable:** ``wazuh_package_revision``
| **Description:** The package revision number is appended to package filenames. Increment the value when a new package revision is released for the same version.
| **Default value:** ``1``
|
| **Variable:** ``wazuh_stage``
| **Description:** The release stage of the current version (e.g., ``alpha``, ``beta``, ``rc``, ``stable``). The ``package-urls`` role uses it to build the pre-release URL of the artifact URL definitions file.
| **Default value:** ``{{ wazuh_version_data.stage }}``
|
| **Variable:** ``local_configs_path``
| **Description:** Path on the control node to the directory that holds the deployment configuration files, such as ``config.yml``, the certificates, and the cluster key. The Wazuh indexer role creates it when it generates the certificates. The Wazuh manager and Wazuh dashboard roles stop if it does not exist. If you set ``generate_certs`` to ``false``, create it and place your certificates in its ``wazuh-certificates`` subdirectory before you run a playbook.
| **Default value:** ``{{ playbook_dir }}/deployment-config-files``
|
| **Variable:** ``urls_file``
| **Description:** This is the filename of the artifact URLs YAML file that is downloaded by the ``package-urls`` role and subsequently loaded by all other roles to resolve package download URLs.
| **Default value:** ``artifact_urls.yaml``

Package-urls
------------

These variables are defined in ``/etc/ansible/roles/wazuh-ansible/roles/package-urls/defaults/main.yml`` and control where the artifact URL definitions file is retrieved.

| **Variable:** ``source``
| **Description:** Determines which package source to use when downloading the artifact URL definitions file. Accepted values are ``production`` (public release packages) and ``prerelease`` (staging packages for pre-release versions).
| **Default value:** ``production``
|
| **Variable:** ``package_urls_file_uri``
| **Description:** The URL of the artifact URL definitions file, without the ``https://`` prefix, that the role downloads when ``source`` is ``production``.
| **Default value:** ``packages.wazuh.com/production/{{ wazuh_major_version }}/artifact-urls/artifact_urls_{{ wazuh_full_version }}.yaml``
|
| **Variable:** ``package_urls_file_uri_prerelease``
| **Description:** The URL of the artifact URL definitions file, without the ``https://`` prefix, that the role downloads when ``source`` is ``prerelease``.
| **Default value:** ``packages-staging.xdrsiem.wazuh.info/pre-release/{{ wazuh_major_version }}/artifact-urls/artifact_urls_{{ wazuh_full_version }}-{{ wazuh_stage }}.yaml``

Wazuh credentials
-----------------

These variables are defined in ``/etc/ansible/roles/wazuh-ansible/roles/wazuh-credentials/defaults/main.yml``.

| **Variable:** ``wazuh_credentials_path``
| **Description:** Directory on the Ansible control node where the role keeps the deployment passwords, one file per key. Back up this directory. It is the only record of the passwords.
| **Default value:** ``{{ playbook_dir }}/deployment-credentials``
|
| **Variable:** ``wazuh_credentials_overrides``
| **Description:** Passwords to use instead of generated ones, keyed by ``WAZUH_INDEXER_ADMIN_PASSWORD``, ``WAZUH_INDEXER_KIBANASERVER_PASSWORD``, ``WAZUH_INDEXER_MANAGER_PASSWORD``, ``WAZUH_MANAGER_API_PASSWORD``, or ``WAZUH_MANAGER_WUI_PASSWORD``. Each value must have 12 to 64 characters from ``A-Z a-z 0-9 . , _ + : @ % ^ = ~ -``, with at least one uppercase letter, one lowercase letter, one digit, and one of those symbols. The role uses a value only for a key that has no file in ``wazuh_credentials_path`` yet.
| **Default value:** ``{}``
|
| **Variable:** ``wazuh_certificate_max_wait``
| **Description:** Maximum number of seconds a host waits for a certificate issued on the Ansible control node to become valid, when the host clock is behind the control node. Beyond it, the run stops and asks you to synchronize the clocks.
| **Default value:** ``300``

Wazuh indexer
-------------

These variables are defined in ``/etc/ansible/roles/wazuh-ansible/roles/wazuh-indexer/defaults/main.yml``.

| **Variable:** ``single_node``
| **Description:** When set to ``true``, it configures the Wazuh indexer as a single-node cluster. It is set to ``false`` for multi-node deployments.
| **Default value:** ``false``
|
| **Variable:** ``generate_certs``
| **Description:** When set to ``true``, the role generates the root CA and the certificates of every node in ``instances`` with the Wazuh certificates tool. It does so once, on the Ansible control node, and later runs reuse them. Set to ``false`` to use your own certificates. Place them in ``deployment-config-files/wazuh-certificates/`` in the playbook directory, with the file names the Wazuh certificates tool uses:

-  ``root-ca.pem``, ``admin.pem``, and ``admin-key.pem``;
-  ``<NAME>.pem`` and ``<NAME>-key.pem`` for each node in ``instances``;
-  ``<NAME>-remoted.pem`` and ``<NAME>-remoted-key.pem`` for each Wazuh manager node.

| **Default value:** ``true``
|
| **Variable:** ``instances``
| **Description:** Defines every node of the deployment: Wazuh indexer, Wazuh manager, and Wazuh dashboard nodes. The role uses it to generate the certificates and to configure the Wazuh indexer cluster.

-  **Entries:** each entry specifies the node ``name``, its ``ip`` address, and its ``role: aio``, ``indexer``, ``manager``, or ``dashboard``.
-  **Keys:** the key of each Wazuh indexer entry must match its inventory hostname.
-  **Manager entries:** they also take ``node_type`` (``master`` or ``worker``) and an optional ``extra_ips`` list of additional addresses for that node's certificates.
-  **Names:** the ``name`` of a Wazuh manager or Wazuh dashboard entry must match that node's ``manager_node_name`` or ``dashboard_node_name``. The roles copy certificate files by those names.

| **Default value:**

.. code-block:: yaml

   instances:
     aio_node:
       name: indexer
       ip: "{{ hostvars[inventory_hostname].private_ip }}"
       role: aio

|
| **Variable:** ``wazuh_indexer_package_download_path``
| **Description:** Defines the path on the target node where the Wazuh indexer package file will be downloaded before installation.
| **Default value:** ``/tmp/wazuh-indexer``
|
| **Variable:** ``wazuh_indexer_package_name``
| **Description:** This is the base filename of the Wazuh indexer package to download and install.
| **Default value:** ``wazuh-indexer-{{ wazuh_full_version }}-{{ wazuh_package_revision }}``
|
| **Variable:** ``wazuh_manager_ips``
| **Description:** Additional IP addresses, such as a public IP address, to add to the Wazuh manager certificates in an all-in-one deployment. Use it in single-node deployments only: the role stops if it is set for a multi-node cluster. In a cluster, set ``extra_ips`` on the Wazuh manager entry in ``instances`` instead. The value is a list. For example, add it to the ``vars`` section of ``wazuh-aio.yml``:

.. code-block:: yaml
   :emphasize-lines: 4

   vars:
     single_node: true
     wazuh_manager_ips:
       - "<AIO_PUBLIC_IP>"

| **Default value:** ``[]``
|
| **Variable:** ``agent_san``
| **Description:** IP addresses or DNS names to add to the agent listener certificate (``remoted.pem``) of every Wazuh manager node. Use it for an address the whole cluster shares, such as a load balancer. Set it in the ``vars`` of the play that runs the ``wazuh-indexer`` role, for example:

.. code-block:: yaml
   :emphasize-lines: 2

   vars:
     agent_san: ["<SHARED_ADDRESS>"]

Set it before the first run. The certificates are generated once.

| **Default value:** ``[]``
|
| **Variable:** ``wazuh_certs_ca_dir``
| **Description:** Directory on the Ansible control node where the Wazuh certificates tool keeps the root CA of the deployment and its private key. Every directory in the path must be owned by root and not writable by other users. The playbook prints this directory on every run. Back it up.
| **Default value:** ``/var/lib/wazuh-ansible/<ID>/ca``, where ``<ID>`` is the first 12 characters of the SHA-256 hash of ``local_configs_path``
|
| **Variable:** ``wazuh_indexer_heap_size``
| **Description:** JVM heap size of the Wazuh indexer, with a unit, for example ``4g``. When empty, the role uses a quarter of the host memory with ``single_node: true``, where other components share the host, and half of it otherwise.
| **Default value:** Empty

Wazuh manager
-------------

These variables are defined in ``/etc/ansible/roles/wazuh-ansible/roles/wazuh-manager/defaults/main.yml``.

| **Variable:** ``single_node``
| **Description:** When set to ``true``, it configures the Wazuh manager for a single-node deployment. Set to ``false`` for multi-node deployments.
| **Default value:** ``false``
|
| **Variable:** ``node_type``
| **Description:** Defines the role of the Wazuh manager node within the cluster. Accepted values are ``master`` and ``worker``.
| **Default value:** ``master``
|
| **Variable:** ``manager_node_name``
| **Description:** The logical name assigned to this manager node. It is used in the manager configuration file to identify the node within the cluster. In a cluster, it also names the certificate files the role copies to the node, so it must match the ``name`` of this node in ``instances``.
| **Default value:** ``manager``
|
| **Variable:** ``wazuh_indexer_hosts``
| **Description:** The list of Wazuh indexer hosts that this manager node will connect to. Each entry specifies a host address and the port to use for the connection.
| **Default value:**

.. code-block:: yaml

   wazuh_indexer_hosts:
     - host: "{{ hostvars[inventory_hostname].private_ip }}"
       port: 9200

|
| **Variable:** ``wazuh_manager_package_download_path``
| **Description:** The path on the target node where the Wazuh manager package file will be downloaded before installation.
| **Default value:** ``/tmp/wazuh-manager``
|
| **Variable:** ``wazuh_manager_package_name``
| **Description:** The base filename of the Wazuh manager package to download and install.
| **Default value:** ``wazuh-manager-{{ wazuh_full_version }}-{{ wazuh_package_revision }}``
|
| **Variable:** ``wazuh_manager_install_path``
| **Description:** This is the filesystem path where the Wazuh manager is installed on the target node.
| **Default value:** ``/var/wazuh-manager/``

Wazuh dashboard
---------------

These variables are defined in ``/etc/ansible/roles/wazuh-ansible/roles/wazuh-dashboard/defaults/main.yml``.

| **Variable:** ``dashboard_node_name``
| **Description:** The logical name assigned to the Wazuh dashboard node. It is used to identify the node in configuration and certificate files. In a cluster, it must match the ``name`` of the dashboard node in ``instances``.
| **Default value:** ``dashboard``
|
| **Variable:** ``wazuh_manager_master_address``
| **Description:** Defines the IP address or hostname of the Wazuh manager master node. The Wazuh dashboard uses this address to configure the Wazuh manager URL in ``opensearch_dashboards.yml``.
| **Default value:** ``{{ hostvars[inventory_hostname].private_ip }}``
|
| **Variable:** ``indexer_cluster_nodes``
| **Description:** Defines the list of IP addresses or hostnames of the Wazuh indexer nodes. The Wazuh dashboard uses this list to configure the *opensearch.hosts* entries in ``opensearch_dashboards.yml``.
| **Default value:**

.. code-block:: yaml

   indexer_cluster_nodes:
     - "{{ hostvars[inventory_hostname].private_ip }}"

|
| **Variable:** ``wazuh_dashboard_package_download_path``
| **Description:** Defines the path on the target node where the Wazuh dashboard package file will be downloaded before installation.
| **Default value:** ``/tmp/wazuh-dashboard``
|
| **Variable:** ``wazuh_dashboard_package_name``
| **Description:** The base filename of the Wazuh dashboard package to download and install.
| **Default value:** ``wazuh-dashboard-{{ wazuh_full_version }}-{{ wazuh_package_revision }}``

Wazuh agent
-----------

These variables are defined in ``/etc/ansible/roles/wazuh-ansible/roles/wazuh-agent/defaults/main.yml``.

| **Variable:** ``wazuh_agent_package_download_path``
| **Description:** Defines the path on the Linux or macOS target node where the Wazuh agent package file will be downloaded before installation.
| **Default value:** ``/tmp/wazuh-agent``
|
| **Variable:** ``wazuh_agent_win_package_download_path``
| **Description:** Defines the path on the Windows target node where the Wazuh agent package file will be downloaded before installation.
| **Default value:** ``C:\Temp\wazuh-agent``
|
| **Variable:** ``wazuh_agent_package_name``
| **Description:** The base filename of the Wazuh agent package to download and install.
| **Default value:** ``wazuh-agent-{{ wazuh_full_version }}-{{ wazuh_package_revision }}``
|
| **Variable:** ``wazuh_enrollment_token``
| **Description:** The enrollment token generated on the Wazuh manager. The role passes it to the Wazuh agent installer as ``WAZUH_ENROLLMENT_TOKEN``. The variable is set in the ``wazuh-agent.yml`` playbook, not in ``defaults/main.yml``. The role stops before installing anything if the value is empty or still holds the placeholder.
| **Default value:** ``<Your Wazuh Agent Enrollment Token>``, in ``wazuh-agent.yml``. Replace it with your token.
|
| **Variable:** ``wazuh_ssl_verification``
| **Description:** An optional setting that defines the Wazuh agent TLS verification mode, passed to the agent installer as ``WAZUH_SSL_VERIFICATION`` and written to ``<agent><ssl><verification_mode>``. Accepted values are ``full`` (verify against the CA and check the manager hostname), ``certificate`` (verify against the CA only), ``system`` (trust the operating system certificate store), and ``none`` (no verification, for lab or CI use only). An empty value leaves the setting unset, and the agent still verifies the manager against the trust anchor it bootstraps during enrollment. Do not use ``full`` or ``certificate`` on a fresh install with ``wazuh_enrollment_token``, because the agent fails to start. Changing this value does not affect agents that are already installed.
| **Default value:** Empty
