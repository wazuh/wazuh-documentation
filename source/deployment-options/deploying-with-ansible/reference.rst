.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn about the Ansible variable references for Wazuh deployments, including general variables and role-specific variables for the indexer, manager, dashboard, and agent.

Variables references
====================

General variables
-----------------

These variables are defined in ``/etc/ansible/roles/wazuh-ansible/roles/vars/main.yml`` and are automatically loaded by every role.

| **Variable:** ``wazuh_version_data``
| **Description:** Parsed JSON object read from ``VERSION.json`` in the playbook directory.
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
| **Description:** The release stage of the current version (e.g., ``alpha``, ``beta``, ``rc``, ``stable``). It is used to construct pre-release package URLs.
| **Default value:** ``{{ wazuh_version_data.stage }}``
|
| **Variable:** ``local_configs_path``
| **Description:** Path on the control node to the directory containing deployment configuration files (e.g., ``config.yml``, certificates). This directory must exist before running any deployment playbook.
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
| **Description:** This is the uniform resource identifier (URI) path relative to the production package host used to download the artifact URL definitions file when the ``source`` is set to ``production``.
| **Default value:** ``packages.wazuh.com/production/{{ wazuh_major_version }}/artifact-urls/artifact_urls_{{ wazuh_full_version }}.yaml``
|
| **Variable:** ``package_urls_file_uri_prerelease``
| **Description:** This is the URI path relative to the staging package host used to download the artifact URL definitions file when the ``source`` is set to ``prerelease``.
| **Default value:** ``packages-staging.xdrsiem.wazuh.info/pre-release/{{ wazuh_major_version }}/artifact-urls/artifact_urls_{{ wazuh_full_version }}-{{ wazuh_stage }}.yaml``

Wazuh indexer
-------------

These variables are defined in ``/etc/ansible/roles/wazuh-ansible/roles/wazuh-indexer/defaults/main.yml``.

| **Variable:** ``single_node``
| **Description:** When set to ``true``, it configures the Wazuh indexer as a single-node cluster. It is set to ``false`` for multi-node deployments.
| **Default value:** ``false``
|
| **Variable:** ``generate_certs``
| **Description:** When set to ``true``, the role triggers certificate generation for the indexer node using the Wazuh certificates tool. Set to ``false`` if certificates are already in place.
| **Default value:** ``true``
|
| **Variable:** ``instances``
| **Description:** Defines the indexer node instances involved in the deployment. Each entry specifies the node name, IP address, and role.
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
| **Description:** The logical name assigned to this manager node. It is used in the manager configuration file to identify the node within the cluster.
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
| **Description:** The logical name assigned to the Wazuh dashboard node. It is used to identify the node in configuration and certificate files.
| **Default value:** ``dashboard``
|
| **Variable:** ``wazuh_manager_master_address``
| **Description:** Defines the IP address or hostname of the Wazuh manager master node. The Wazuh dashboard uses this address to configure the Wazuh manager URL in ``opensearch_dashboards.yml``.
| **Default value:** ``{{ hostvars[inventory_hostname].private_ip }}``
|
| **Variable:** ``indexer_cluster_nodes``
| **Description:** Defines the list of IP addresses or hostnames of the Wazuh indexer nodes. The Wazuh dashboard uses this list to configure the ``opensearch.hosts`` entries in ``opensearch_dashboards.yml``.
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
