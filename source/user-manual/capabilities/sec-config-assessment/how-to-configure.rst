
.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Check out this section of our documentation to learn more about how to configure Security Configuration Assessment in Wazuh.

How to configure SCA
--------------------

Upon installation, agents will include the appropriate policies for their particular Operating System.
For the full list of **Officially supported policy files** see table :ref:`available_sca_policies`.
These policies are included with the Wazuh Manager installation so that they can be easily enabled.

For a detailed description of the various configuration parameters of SCA, please check the :ref:`SCA reference <reference_sec_config_assessment>`.

Enabling and disabling policies
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

By default, the Wazuh Agent will run scans for every policy (`.yaml` or `.yml` files) present in their
ruleset folder:

- Linux agents: ``<agent-installation-folder>/ruleset/sca``.
- Windows agents: ``<agent-installation-folder>\ruleset\sca``.

.. warning::
    The contents of the aforementioned **default ruleset folders are neither kept across installations nor updates**.
    If you wish to modify or add new policies, place them under an alternative folder.

To enable a policy file that's outside the Wazuh installation folder, add a line like

.. code-block:: xml

    <policy>/some/custom/policy/folder/policy_file_to_enable.yml</policy>

You can also specify a relative path to the Wazuh installation directory.

.. code-block:: xml

    <policy>etc/shared/policy_file_to_enable.yml</policy>

There are two ways to disable policies. The simplest one is renaming the policy file by adding ``.disabled``
(or anything different from `.yaml` or `.yml`) after their YAML extension. The second is to disable them from
the `ossec.conf` by adding a line such as the following:

.. code-block:: xml

    <policy enabled="no">etc/shared/policy_file_to_disable.yml</policy>

to the **policies section** of the **SCA** module.

.. _share_policy_files_and_configuration_with_the_Wazuh_agents:

How to share policy files and configuration with the Wazuh agents
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

As described in the :doc:`centralized configuration <../../reference/centralized-configuration>` section,
the Wazuh manager has the ability to push files and configurations to connected Wazuh agents.

This feature can be used to push policy files to the Wazuh agents in defined groups. By default, every Wazuh agent belongs
to the ``default`` group, which is used here as an example:

#. Edit the Wazuh agent ``local_internal_options.conf`` file to allow the execution of commands in SCA policies sent from the Wazuh manager:

     .. code-block:: console

        # echo "sca.remote_commands=1" >> /var/ossec/etc/local_internal_options.conf

#. Place a new policy file in the Wazuh manager ``/var/ossec/etc/shared/default`` folder. This file must be owned by the user ``wazuh``.


#. Add the configuration block to the Wazuh manager ``etc/shared/default/agent.conf`` file to push the new policy file to the Wazuh agent:

     .. code-block:: xml

        <agent_config>
            <!-- Shared agent configuration here -->
            <sca>
                <policies>
                    <policy>etc/shared/your_policy_file.yml</policy>
                </policies>
            </sca>
        </agent_config>

The ``<sca>`` block will be merged with the ``<sca>`` block on the Wazuh agent side and the new configuration will be added.

.. table:: Available SCA policies
    :widths: auto
    :name: available_sca_policies

    +-----------------------------+------------------------------------------------------------+-------------------------------+
    | Policy                      | Name                                                       | Target                        |
    +=============================+============================================================+===============================+
    | cis_win2012r2               |  CIS Benchmark for Windows 2012 R2                         | Windows Server 2012 R2        |
    +-----------------------------+------------------------------------------------------------+-------------------------------+
    | cis_win10_enterprise        |  CIS Benchmark for Windows 10 Enterprise                   | Windows 10                    |
    +-----------------------------+------------------------------------------------------------+-------------------------------+
    | cis_win11_enterprise        |  CIS Benchmark for Windows 11 Enterprise                   | Windows 11                    |
    +-----------------------------+------------------------------------------------------------+-------------------------------+    
    | cis_win2016                 |  CIS Benchmark for Windows Server 2016                     | Windows Server 2016           |
    +-----------------------------+------------------------------------------------------------+-------------------------------+
    | cis_win2019                 |  CIS Benchmark for Windows Server 2019 RTM                 | Windows Server 2019           |
    +-----------------------------+------------------------------------------------------------+-------------------------------+
    | cis_win2022                 |  CIS Benchmark for Windows Server 2022                     | Windows Server 2022           |
    +-----------------------------+------------------------------------------------------------+-------------------------------+
    | sca_win_audit               |  Benchmark for Windows auditing                            | Windows                       |
    +-----------------------------+------------------------------------------------------------+-------------------------------+
    | cis_centos6_linux           |  CIS Benchmark for CentOS 6                                | CentOS 6                      |
    +-----------------------------+------------------------------------------------------------+-------------------------------+
    | cis_centos7_linux           |  CIS Benchmark for CentOS 7                                | CentOS 7                      |
    +-----------------------------+------------------------------------------------------------+-------------------------------+
    | cis_centos8_linux           |  CIS Benchmark for CentOS 8                                | CentOS 8                      |
    +-----------------------------+------------------------------------------------------------+-------------------------------+
    | cis_rhel5_linux             |  CIS Benchmark for Red Hat Enterprise Linux 5              | Red Hat Enterprise Linux 5    |
    +-----------------------------+------------------------------------------------------------+-------------------------------+
    | cis_rhel6_linux             |  CIS Benchmark for Red Hat Enterprise Linux 6              | Red Hat Enterprise Linux 6    |
    +-----------------------------+------------------------------------------------------------+-------------------------------+
    | cis_rhel7_linux             |  CIS Benchmark for Red Hat Enterprise Linux 7              | Red Hat Enterprise Linux 7    |
    +-----------------------------+------------------------------------------------------------+-------------------------------+
    | cis_rhel8_linux             |  CIS Benchmark for Red Hat Enterprise Linux 8              | Red Hat Enterprise Linux 8    |
    +-----------------------------+------------------------------------------------------------+-------------------------------+
    | cis_rhel9_linux             |  CIS Benchmark for Red Hat Enterprise Linux 9              | Red Hat Enterprise Linux 9    |
    +-----------------------------+------------------------------------------------------------+-------------------------------+    
    | cis_debian7                 |  CIS Benchmark for Debian/Linux 7                          | Debian 7                      |
    +-----------------------------+------------------------------------------------------------+-------------------------------+
    | cis_debian8                 |  CIS Benchmark for Debian/Linux 8                          | Debian 8                      |
    +-----------------------------+------------------------------------------------------------+-------------------------------+
    | cis_debian9                 |  CIS Benchmark for Debian/Linux 9                          | Debian 9                      |
    +-----------------------------+------------------------------------------------------------+-------------------------------+
    | cis_debian10                |  CIS Benchmark for Debian/Linux 10                         | Debian 10                     |
    +-----------------------------+------------------------------------------------------------+-------------------------------+
    | cis_ubuntu14-04             |  CIS Checks for Ubuntu Linux 14.04 LTS                     | Ubuntu 14.04                  |
    +-----------------------------+------------------------------------------------------------+-------------------------------+
    | cis_ubuntu16-04             |  CIS Checks for Ubuntu Linux 16.04 LTS                     | Ubuntu 16.04                  |
    +-----------------------------+------------------------------------------------------------+-------------------------------+
    | cis_ubuntu18-04             |  CIS Checks for Ubuntu Linux 18.04 LTS                     | Ubuntu 18.04                  |
    +-----------------------------+------------------------------------------------------------+-------------------------------+
    | cis_ubuntu20-04             |  CIS Checks for Ubuntu Linux 20.04 LTS                     | Ubuntu 20.04                  |
    +-----------------------------+------------------------------------------------------------+-------------------------------+
    | cis_ubuntu22-04             |  CIS Checks for Ubuntu Linux 22.04 LTS                     | Ubuntu 22.04                  |
    +-----------------------------+------------------------------------------------------------+-------------------------------+
    | cis_sles11_linux            |  CIS SUSE Linux Enterprise 11 Benchmark                    | SUSE 11                       |
    +-----------------------------+------------------------------------------------------------+-------------------------------+
    | cis_sles12_linux            |  CIS SUSE Linux Enterprise 12 Benchmark                    | SUSE 12                       |
    +-----------------------------+------------------------------------------------------------+-------------------------------+
    | cis_sles15_linux            |  CIS Checks for SUSE SLES 15                               | SUSE 15                       |
    +-----------------------------+------------------------------------------------------------+-------------------------------+
    | cis_amazon_linux_1          |  CIS Checks for Amazon Linux 1                             | Amazon Linux 1                |
    +-----------------------------+------------------------------------------------------------+-------------------------------+
    | cis_amazon_linux_2          |  CIS Checks for Amazon Linux 2                             | Amazon Linux 2                |
    +-----------------------------+------------------------------------------------------------+-------------------------------+
    | cis_solaris11               |  CIS Benchmark for Oracle Solaris 11                       | Solaris 11                    |
    +-----------------------------+------------------------------------------------------------+-------------------------------+
    | cis_solaris11.4             |  CIS Checks for Oracle Solaris 11.4                        | Solaris 11.4                  |
    +-----------------------------+------------------------------------------------------------+-------------------------------+
    | sca_unix_audit              |  Benchmark for Linux auditing                              | Unix based OS                 |
    +-----------------------------+------------------------------------------------------------+-------------------------------+
    | cis_apple_macOS_10.11       |  CIS Apple macOS 10.11 Benchmark                           | macOS 10.11 (El Capitan)      |
    +-----------------------------+------------------------------------------------------------+-------------------------------+
    | cis_apple_macOS_10.12       |  CIS Apple macOS 10.12 Benchmark                           | macOS 10.12 (Sierra)          |
    +-----------------------------+------------------------------------------------------------+-------------------------------+
    | cis_apple_macOS_10.13       |  CIS Apple macOS 10.13 Benchmark                           | macOS 10.13 (High Sierra)     |
    +-----------------------------+------------------------------------------------------------+-------------------------------+
    | cis_apple_macOS_10.14       |  CIS Checks for macOS 10.14                                | macOS 10.14 (Mojave)          |
    +-----------------------------+------------------------------------------------------------+-------------------------------+
    | cis_apple_macOS_10.15       |  CIS Checks for macOS 10.15                                | macOS 10.15 (Catalina)        |
    +-----------------------------+------------------------------------------------------------+-------------------------------+
    | cis_apple_macOS_11.1        |  CIS Checks for macOS 11.x                                 | macOS 11.x (Big Sur)          |
    +-----------------------------+------------------------------------------------------------+-------------------------------+
    | cis_apple_macOS_12.0        |  CIS Checks for macOS 12.x                                 | macOS 12.0 (Monterey)         |
    +-----------------------------+------------------------------------------------------------+-------------------------------+
    | web_vulnerabilities         |  System audit for web-related vulnerabilities              | N/A                           |
    +-----------------------------+------------------------------------------------------------+-------------------------------+
    | cis_apache_24               |  CIS Apache HTTP Server 2.4 Benchmark                      | Apache configuration files    |
    +-----------------------------+------------------------------------------------------------+-------------------------------+
    | cis_mysql5-6_community      |  CIS Benchmark for Oracle MySQL Community Server 5.6       | MySQL configuration files     |
    +-----------------------------+------------------------------------------------------------+-------------------------------+
    | cis_mysql5-6_enterprise     |  CIS Benchmark for Oracle MySQL Enterprise 5.6             | MySQL configuration files     |
    +-----------------------------+------------------------------------------------------------+-------------------------------+
    | cis_sqlserver_2012          |  CIS Microsoft SQL Server 2012                             | Microsoft SQL Server 2012     |
    +-----------------------------+------------------------------------------------------------+-------------------------------+
    | cis_sqlserver_2014          |  CIS Microsoft SQL Server 2014                             | Microsoft SQL Server 2014     |
    +-----------------------------+------------------------------------------------------------+-------------------------------+
    | cis_sqlserver_2016          |  CIS Microsoft SQL Server 2016                             | Microsoft SQL Server 2016     |
    +-----------------------------+------------------------------------------------------------+-------------------------------+
    | cis_sqlserver_2017          |  CIS Microsoft SQL Server 2017                             | Microsoft SQL Server 2017     |
    +-----------------------------+------------------------------------------------------------+-------------------------------+
    | cis_sqlserver_2019          |  CIS Microsoft SQL Server 2019                             | Microsoft SQL Server 2019     |
    +-----------------------------+------------------------------------------------------------+-------------------------------+
    | cis_iis_10                  |  CIS Checks for Microsoft IIS 10                           | Microsoft IIS 10              |
    +-----------------------------+------------------------------------------------------------+-------------------------------+
    | cis_mongodb_36              |  CIS Checks for MongoDB                                    | MongoDB 3.6                   |
    +-----------------------------+------------------------------------------------------------+-------------------------------+
    | cis_nginx_1                 |  CIS Benchmark for NGINX                                   | NGINX 1.14.0                  |
    +-----------------------------+------------------------------------------------------------+-------------------------------+
    | cis_oracle_database_19c     |  CIS Checks for Oracle Database 19c                        | Oracle Database 19c           |
    +-----------------------------+------------------------------------------------------------+-------------------------------+
    | cis_postgre-sql-13          |  CIS Checks for PostgreSQL 13                              | PostgreSQL 13                 |
    +-----------------------------+------------------------------------------------------------+-------------------------------+
