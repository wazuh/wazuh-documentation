.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn about the Ansible variable references for Wazuh deployments, including general variables and role-specific variables for the indexer, manager, dashboard, and agent.

Variables reference
===================

Set a variable in the playbook's ``vars:`` section, in the inventory, or with ``-e`` on the ``ansible-playbook`` command line. A value in the inventory does not override a variable that the playbook's ``vars:`` section already sets, such as ``wazuh_enrollment_token`` in ``wazuh-agent.yml``. Change it in the playbook, or pass it with ``-e``. ``-e name=value`` passes a string, so pass a list in JSON form, for example ``-e '{"wazuh_manager_ips": ["<AIO_PUBLIC_IP>"]}'``.

General variables
-----------------

These variables are defined in ``/etc/ansible/roles/wazuh-ansible/roles/vars/main.yml`` and are automatically loaded by every role.

.. list-table::
   :header-rows: 1
   :widths: 25 30 45

   * - Variable
     - Default
     - Description
   * - ``wazuh_version_data``
     - ``{{ lookup('file', playbook_dir + '/VERSION.json') | from_json }}``
     - Parsed JSON object read from ``VERSION.json`` in the playbook directory.
   * - ``wazuh_full_version``
     - ``{{ wazuh_version_data.version }}``
     - The full Wazuh version string (e.g., ``|WAZUH_CURRENT_ANSIBLE|``) extracted from ``wazuh_version_data``.
   * - ``wazuh_major_minor_version``
     - ``{{ wazuh_version_data.version.split('.')[0:2] | join('.') }}``
     - The major and minor version components only (e.g., ``|WAZUH_CURRENT_MINOR_ANSIBLE|``), derived from ``wazuh_full_version``.
   * - ``wazuh_major_version``
     - ``{{ wazuh_version_data.version.split('.')[0] }}.x``
     - The major version string in X.x format (e.g., ``|WAZUH_CURRENT_MAJOR|``), used in package repository URL paths.
   * - ``wazuh_package_revision``
     - ``1``
     - The package revision number is appended to package filenames. Increment the value when a new package revision is released for the same version.
   * - ``wazuh_stage``
     - ``{{ wazuh_version_data.stage }}``
     - The release stage of the current version (e.g., ``alpha``, ``beta``, ``rc``, ``stable``). The ``package-urls`` role uses it to build the pre-release URL of the artifact URL definitions file.
   * - ``local_configs_path``
     - ``{{ playbook_dir }}/deployment-config-files``
     - Path on the control node to the directory that holds the deployment configuration files: the cluster key and, in a Wazuh cluster deployment, the root CA of the deployment and the certificates issued from it, in its ``wazuh-ca`` subdirectory. The Wazuh credentials role creates it. The Wazuh manager and Wazuh dashboard roles stop if it does not exist.
   * - ``urls_file``
     - ``artifact_urls.yaml``
     - This is the filename of the artifact URLs YAML file that is downloaded by the ``package-urls`` role and subsequently loaded by all other roles to resolve package download URLs.

Package-urls
------------

These variables are defined in ``/etc/ansible/roles/wazuh-ansible/roles/package-urls/defaults/main.yml`` and control where the artifact URL definitions file is retrieved.

.. list-table::
   :header-rows: 1
   :widths: 25 30 45

   * - Variable
     - Default
     - Description
   * - ``source``
     - ``production``
     - Determines which package source to use when downloading the artifact URL definitions file. Accepted values are ``production`` (public release packages) and ``prerelease`` (staging packages for pre-release versions).
   * - ``package_urls_file_uri``
     - ``packages.wazuh.com/production/{{ wazuh_major_version }}/artifact-urls/artifact_urls_{{ wazuh_full_version }}.yaml``
     - The URL of the artifact URL definitions file, without the ``https://`` prefix, that the role downloads when ``source`` is ``production``.
   * - ``package_urls_file_uri_prerelease``
     - ``packages-staging.xdrsiem.wazuh.info/pre-release/{{ wazuh_major_version }}/artifact-urls/artifact_urls_{{ wazuh_full_version }}-{{ wazuh_stage }}.yaml``
     - The URL of the artifact URL definitions file, without the ``https://`` prefix, that the role downloads when ``source`` is ``prerelease``.

Wazuh credentials
-----------------

These variables are defined in ``/etc/ansible/roles/wazuh-ansible/roles/wazuh-credentials/defaults/main.yml``.

.. list-table::
   :header-rows: 1
   :widths: 25 25 50

   * - Variable
     - Default
     - Description
   * - ``wazuh_credentials_path``
     - ``{{ playbook_dir }}/deployment-credentials``
     - Directory on the Ansible control node where the role keeps the deployment passwords, one file per key. Back up this directory. It is the only record of the passwords.
   * - ``wazuh_credentials_overrides``
     - ``{}``
     - Passwords to use instead of generated ones, keyed by ``WAZUH_INDEXER_ADMIN_PASSWORD``, ``WAZUH_INDEXER_KIBANASERVER_PASSWORD``, ``WAZUH_INDEXER_MANAGER_PASSWORD``, ``WAZUH_MANAGER_API_PASSWORD``, or ``WAZUH_MANAGER_WUI_PASSWORD``. Each value must have 12 to 64 characters from ``A-Z a-z 0-9 . , _ + : @ % ^ = ~ -``, with at least one uppercase letter, one lowercase letter, one digit, and one of those symbols. The role uses a value only for a key that has no file in ``wazuh_credentials_path`` yet.
   * - ``wazuh_ca_path``
     - ``{{ local_configs_path }}/wazuh-ca``
     - Directory on the Ansible control node where the root CA of a Wazuh cluster deployment is kept: ``root-ca.pem`` and its private key, ``root-ca.key``. The role creates them during the first run if they are not there and never replaces them, so you can place your own root CA there before the first run. It also holds the certificates issued from the root CA, those of each host in ``issued/<INVENTORY_HOST>/``. Back up this directory. It is the only record of the root CA and its private key, which never leaves the Ansible control node. Not used in an all-in-one deployment.

Wazuh indexer
-------------

These variables are defined in ``/etc/ansible/roles/wazuh-ansible/roles/wazuh-indexer/defaults/main.yml``.

.. list-table::
   :header-rows: 1
   :widths: 25 25 50

   * - Variable
     - Default
     - Description
   * - ``single_node``
     - ``false``
     - When set to ``true``, it configures the Wazuh indexer as a single-node cluster. It is set to ``false`` for multi-node deployments.
   * - ``wazuh_indexer_security_init_force``
     - ``false``
     - When set to ``true``, the run loads the security configuration files of the first Wazuh indexer node of the play into the cluster again with ``indexer-security-init.sh``, even if the cluster already has one. This replaces the internal users, roles, role mappings, and passwords of the cluster with those of the files. By default, the role loads the configuration only on a new cluster, when no node of the play has it. If no node reports it and one of them was installed by an earlier run, the run stops instead. After a first run that stopped before the upload, run the playbook again with this variable set to ``true``.
   * - ``instances``
     - .. code-block:: yaml

          instances:
            aio_node:
              name: indexer
              ip: "{{ hostvars[inventory_hostname].private_ip }}"
              role: aio
     - Defines every node of the deployment: Wazuh indexer, Wazuh manager, and Wazuh dashboard nodes. The role uses it to generate the certificates and to configure the Wazuh indexer cluster.

       -  **Entries:** each entry specifies the node ``name``, its ``ip`` address, and its ``role``: ``aio``, ``indexer``, ``manager``, or ``dashboard``.
       -  **Keys:** the key of each Wazuh indexer entry must match its inventory hostname.
       -  **Manager entries:** they also take ``node_type`` (``master`` or ``worker``) and an optional ``extra_ips`` list of additional addresses for that node's certificates.
       -  **Names:** the ``name`` of a Wazuh manager or Wazuh dashboard entry must match that node's ``manager_node_name`` or ``dashboard_node_name``. The roles copy certificate files by those names.
   * - ``wazuh_indexer_package_download_path``
     - ``/tmp/wazuh-indexer``
     - Defines the path on the target node where the Wazuh indexer package file will be downloaded before installation.
   * - ``wazuh_indexer_package_name``
     - ``wazuh-indexer-{{ wazuh_full_version }}-{{ wazuh_package_revision }}``
     - This is the base filename of the Wazuh indexer package to download and install.
   * - ``wazuh_indexer_heap_size``
     - Empty
     - JVM heap size of the Wazuh indexer, with a unit, for example ``4g``. When empty, the role uses a quarter of the host memory with ``single_node: true``, where other components share the host, and half of it otherwise.

Wazuh manager
-------------

These variables are defined in ``/etc/ansible/roles/wazuh-ansible/roles/wazuh-manager/defaults/main.yml``.

.. list-table::
   :header-rows: 1
   :widths: 25 25 50

   * - Variable
     - Default
     - Description
   * - ``single_node``
     - ``false``
     - When set to ``true``, it configures the Wazuh manager for a single-node deployment. Set to ``false`` for multi-node deployments.
   * - ``node_type``
     - ``master``
     - Defines the role of the Wazuh manager node within the cluster. Accepted values are ``master`` and ``worker``.
   * - ``manager_node_name``
     - ``manager``
     - The logical name assigned to this manager node. It is used in the manager configuration file to identify the node within the cluster. In a cluster, it also names the certificate files the role copies to the node, so it must match the ``name`` of this node in ``instances``.
   * - ``wazuh_indexer_hosts``
     - .. code-block:: yaml

          wazuh_indexer_hosts:
            - host: "{{ hostvars[inventory_hostname].private_ip }}"
              port: 9200
     - The list of Wazuh indexer hosts that this manager node will connect to. Each entry specifies a host address and the port to use for the connection.
   * - ``wazuh_manager_package_download_path``
     - ``/tmp/wazuh-manager``
     - The path on the target node where the Wazuh manager package file will be downloaded before installation.
   * - ``wazuh_manager_package_name``
     - ``wazuh-manager-{{ wazuh_full_version }}-{{ wazuh_package_revision }}``
     - The base filename of the Wazuh manager package to download and install.
   * - ``wazuh_manager_install_path``
     - ``/var/wazuh-manager/``
     - This is the filesystem path where the Wazuh manager is installed on the target node.
   * - ``wazuh_manager_conf_dir``
     - ``/etc/wazuh-manager``
     - Directory on the target node where the Wazuh manager reads its configuration, such as ``wazuh-manager.conf`` and the certs directory.
   * - ``wazuh_manager_ips``
     - ``[]``
     - Additional IP addresses, such as a public IP address, to add to the agent listener (``remoted.pem``) and Wazuh manager API (``apid.pem``) certificates in an all-in-one deployment. Use it only with ``single_node: true``, as in the all-in-one deployment: the role stops if it is set for a multi-node cluster. In a cluster, set ``extra_ips`` on the Wazuh manager entry in ``instances`` instead. The value is a list. See the examples after this table.
   * - ``agent_san``
     - ``[]``
     - IP addresses or DNS names to add to the agent listener certificate (``remoted.pem``) of every Wazuh manager node, such as a load balancer or a DNS name the whole cluster shares. In a cluster, the master node creates enrollment tokens only for addresses in its own certificate, so agents enroll through one of these addresses. Set it in the vars of every play that runs the ``wazuh-manager`` role, before the first run. See the examples after this table.
   * - ``api_san``
     - ``[]``
     - IP addresses or DNS names to add to the Wazuh manager API certificate (``apid.pem``) of every Wazuh manager node, such as a published name or a load balancer in front of the Wazuh manager API.

For example, to add a public IP address to the Wazuh manager certificates of an all-in-one deployment, add ``wazuh_manager_ips`` to the ``vars`` section of the play in ``wazuh-aio.yml``. Keep the two-space indentation of that section:

.. code-block:: yaml
   :emphasize-lines: 4

   vars:
     single_node: true
     wazuh_manager_ips:
       - "<AIO_PUBLIC_IP>"

For an address the whole cluster shares, add ``agent_san`` to the ``vars`` of both the Configure Wazuh Manager and the Configure Wazuh Worker plays in ``wazuh-distributed.yml``. Keep the two-space indentation of that section:

.. code-block:: yaml
   :emphasize-lines: 2

   vars:
     agent_san: ["<SHARED_ADDRESS>"]

Then generate the enrollment tokens of the Wazuh agents for that address on the master node.

Wazuh dashboard
---------------

These variables are defined in ``/etc/ansible/roles/wazuh-ansible/roles/wazuh-dashboard/defaults/main.yml``.

.. list-table::
   :header-rows: 1
   :widths: 25 25 50

   * - Variable
     - Default
     - Description
   * - ``dashboard_node_name``
     - ``dashboard``
     - The logical name assigned to the Wazuh dashboard node. It is used to identify the node in configuration and certificate files. In a cluster, it must match the ``name`` of the dashboard node in ``instances``.
   * - ``wazuh_manager_master_address``
     - ``{{ hostvars[inventory_hostname].private_ip }}``
     - Defines the IP address or hostname of the Wazuh manager master node. The Wazuh dashboard uses this address to configure the Wazuh manager URL in ``opensearch_dashboards.yml``.
   * - ``indexer_cluster_nodes``
     - .. code-block:: yaml

          indexer_cluster_nodes:
            - "{{ hostvars[inventory_hostname].private_ip }}"
     - Defines the list of IP addresses or hostnames of the Wazuh indexer nodes. The Wazuh dashboard uses this list to configure the ``opensearch.hosts`` entries in ``opensearch_dashboards.yml``.
   * - ``wazuh_dashboard_package_download_path``
     - ``/tmp/wazuh-dashboard``
     - Defines the path on the target node where the Wazuh dashboard package file will be downloaded before installation.
   * - ``wazuh_dashboard_package_name``
     - ``wazuh-dashboard-{{ wazuh_full_version }}-{{ wazuh_package_revision }}``
     - The base filename of the Wazuh dashboard package to download and install.

Wazuh agent
-----------

These variables are defined in ``/etc/ansible/roles/wazuh-ansible/roles/wazuh-agent/defaults/main.yml``.

.. list-table::
   :header-rows: 1
   :widths: 25 25 50

   * - Variable
     - Default
     - Description
   * - ``wazuh_agent_package_download_path``
     - ``/tmp/wazuh-agent``
     - Defines the path on the Linux or macOS target node where the Wazuh agent package file will be downloaded before installation.
   * - ``wazuh_agent_win_package_download_path``
     - ``C:\Temp\wazuh-agent``
     - Defines the path on the Windows target node where the Wazuh agent package file will be downloaded before installation.
   * - ``wazuh_agent_package_name``
     - ``wazuh-agent-{{ wazuh_full_version }}-{{ wazuh_package_revision }}``
     - The base filename of the Wazuh agent package to download and install.
   * - ``wazuh_enrollment_token``
     - ``<Your Wazuh Agent Enrollment Token>``, in ``wazuh-agent.yml``. Replace it with your token.
     - The enrollment token generated on the Wazuh manager. The role passes it to the Wazuh agent installer as ``WAZUH_ENROLLMENT_TOKEN``. The variable is set in the ``wazuh-agent.yml`` playbook, not in ``defaults/main.yml``. The role stops before installing anything if the value is empty or still holds the placeholder.
   * - ``wazuh_ssl_verification``
     - Empty
     - An optional setting that defines the Wazuh agent TLS verification mode, passed to the agent installer as ``WAZUH_SSL_VERIFICATION`` and written to ``<agent><ssl><verification_mode>``. Accepted values are ``full`` (verify against the CA and check the manager hostname), ``certificate`` (verify against the CA only), ``system`` (trust the operating system certificate store), and ``none`` (no verification, for lab or CI use only). An empty value leaves the setting unset, and the agent still verifies the manager against the trust anchor it bootstraps during enrollment. Do not use ``full`` or ``certificate`` on a fresh install with ``wazuh_enrollment_token``, because the agent fails to start. Changing this value does not affect agents that are already installed.
