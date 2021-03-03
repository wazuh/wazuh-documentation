How to configure SCA
------------------------------------

.. contents:: Table of Contents
   :depth: 10

Upon installation, agents will include the policies appropriates for their particular Operating System.
For the full list of **Officially supported policy files** see table :ref:`available_sca_policies`.
These policies are included with the Wazuh Manager installation so that they can be easily enabled.

For a detailed description of the various configuration parameters of SCA, please check the
:ref:`reference_sec_config_assessment`.

Enabling and disabling policies
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

By default, the Wazuh Agent will run scans for every policy (`.yaml` or `.yml` files) present in their
ruleset folder:

- Linux agents: ``<agent-installation-folder>/ruleset/sca``.
- Windows agents: ``<agent-installation-folder>\ruleset\sca``.

.. warning::
    The contents of the aforementioned **default ruleset folders are neither kept across installations nor updates**.
    If you wish to modify or add new policies, place then under an alternative folder.

To enable a policy file that's outside the default folder, add a line like

.. code-block:: xml

    <policy>/some/custom/policy/folder/policy_file_to_enable.yml</policy>

to the **policies section** of the **SCA** module.

There are two ways to disable policies, the simplest one is by renaming the policy file by adding ``.disabled``
(or anything different from `.yaml` or `.yml`) after their YAML extension. The second is to disable them from
the `ossec.conf` by adding a line such as

.. code-block:: xml

    <policy enabled="no">/var/ossec/etc/shared/policy_file_to_disable.yml</policy>

to the **policies section** of the **SCA** module.

How to share policy files and configuration with the Wazuh agents
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

As described in the :doc:`centralized configuration <../../reference/centralized-configuration>` section,
the Wazuh manager has the ability to push files and configurations to connected Wazuh agents.

This feature can be used to push policy files to the Wazuh agents in defined groups. By default, every Wazuh agent belongs
to the ``default`` group, which is used here as an example:

#. Edit the Wazuh agent’s ``local_internal_options.conf`` file to allow the execution of commands in SCA policies sent from the Wazuh manager:

     .. code-block:: console

        # echo "sca.remote_commands=1" >> /var/ossec/etc/local_internal_options.conf

#. Place a new policy file in the Wazuh manager's ``/var/ossec/etc/shared/default`` folder. This file must be owned by the user ``wazuh``.


#. Add the configuration block to the Wazuh manager's ``/var/ossec/etc/shared/default/agent.conf`` file to push the new policy file to the Wazuh agent:

     .. code-block:: xml

        <agent_config>
            <!-- Shared agent configuration here -->
            <sca>
                <policies>
                    <policy>/var/ossec/etc/shared/your_policy_file.yml</policy>
                </policies>
            </sca>
        </agent_config>

The ``<sca>`` block will be merged with the ``<sca>`` block on the Wazuh agent side and the new configuration will be added.

.. table:: Available SCA policies
    :widths: auto
    :name: available_sca_policies

    +-----------------------------+------------------------------------------------------------+-------------------------------+
    | Policy                      | Name                                                       | Target OS                     |
    +=============================+============================================================+===============================+
    | cis_win2012r2               |  CIS Benchmark for Windows 2012 R2                         | Windows Server 2012 R2        |
    +-----------------------------+------------------------------------------------------------+-------------------------------+
    | cis_win10_enterprise        |  CIS Benchmark for Windows 10 Enterprise (Release 1803)    | Windows 10                    |
    +-----------------------------+------------------------------------------------------------+-------------------------------+
    | cis_win2016                 |  CIS Benchmark for Windows Server 2016                     | Windows Server 2016           |
    +-----------------------------+------------------------------------------------------------+-------------------------------+
    | cis_win2019                 |  CIS Benchmark for Windows Server 2019 RTM                 | Windows Server 2019           |
    +-----------------------------+------------------------------------------------------------+-------------------------------+
    | sca_win_audit               |  Benchmark for Windows auditing                            | Windows                       |
    +-----------------------------+------------------------------------------------------------+-------------------------------+
    | cis_centos6_linux           |  CIS Benchmark for CentOS 6                                | CentOS 6                      |
    +-----------------------------+------------------------------------------------------------+-------------------------------+
    | cis_centos7_linux           |  CIS Benchmark for CentOS 7                                | CentOS 7                      |
    +-----------------------------+------------------------------------------------------------+-------------------------------+
    | cis_centos8_linux           |  CIS Benchmark for CentOS 8                                | CentOS 8                      |
    +-----------------------------+------------------------------------------------------------+-------------------------------+
    | cis_rhel5_linux             |  CIS Benchmark for Red Hat Enterprise Linux 5              | Red Hat Systems               |
    +-----------------------------+------------------------------------------------------------+-------------------------------+
    | cis_rhel6_linux             |  CIS Benchmark for Red Hat Enterprise Linux 6              | Red Hat Systems               |
    +-----------------------------+------------------------------------------------------------+-------------------------------+
    | cis_rhel7_linux             |  CIS Benchmark for Red Hat Enterprise Linux 7              | Red Hat Systems               |
    +-----------------------------+------------------------------------------------------------+-------------------------------+
    | cis_rhel8_linux             |  CIS Benchmark for Red Hat Enterprise Linux 8              | Red Hat Systems               |
    +-----------------------------+------------------------------------------------------------+-------------------------------+
    | cis_debian7                 |  CIS Benchmark for Debian/Linux 7                          | Debian 7 / Ubuntu 12          |
    +-----------------------------+------------------------------------------------------------+-------------------------------+
    | cis_debian8                 |  CIS Benchmark for Debian/Linux 8                          | Debian 8 / Ubuntu 14          |
    +-----------------------------+------------------------------------------------------------+-------------------------------+
    | cis_debian9                 |  CIS Benchmark for Debian/Linux 9                          | Debian 9 / Ubuntu 16          |
    +-----------------------------+------------------------------------------------------------+-------------------------------+
    | cis_debian10                |  CIS Benchmark for Debian/Linux 10                         | Debian 10 / Ubuntu 18         |
    +-----------------------------+------------------------------------------------------------+-------------------------------+
    | cis_sles11_linux            |  CIS SUSE Linux Enterprise 11 Benchmark                    | SUSE 11                       |
    +-----------------------------+------------------------------------------------------------+-------------------------------+
    | cis_sles12_linux            |  CIS SUSE Linux Enterprise 12 Benchmark                    | SUSE 12                       |
    +-----------------------------+------------------------------------------------------------+-------------------------------+
    | cis_solaris11               |  CIS Benchmark for Oracle Solaris 11                       | Solaris 11                    |
    +-----------------------------+------------------------------------------------------------+-------------------------------+
    | sca_unix_audit              |  Benchmark for Linux auditing                              | Unix based OS                 |
    +-----------------------------+------------------------------------------------------------+-------------------------------+
    | cis_apple_macOS_10.11       |  CIS Apple macOS 10.11 Benchmark                           | OS X 10.11 (El Capitan)       |
    +-----------------------------+------------------------------------------------------------+-------------------------------+
    | cis_apple_macOS_10.12       |  CIS Apple macOS 10.12 Benchmark                           | macOS 10.12 (Sierra)          |
    +-----------------------------+------------------------------------------------------------+-------------------------------+
    | cis_apple_macOS_10.13       |  CIS Apple macOS 10.13 Benchmark                           | macOS 10.13 (High Sierra)     |
    +-----------------------------+------------------------------------------------------------+-------------------------------+
    | web_vulnerabilities         |  System audit for web-related vulnerabilities              | N/A                           |
    +-----------------------------+------------------------------------------------------------+-------------------------------+
    | cis_apache_24               |  CIS Apache HTTP Server 2.4 Benchmark                      | Apache configuration files    |
    +-----------------------------+------------------------------------------------------------+-------------------------------+
    | cis_mysql5-6_community      |  CIS Benchmark for Oracle MySQL Community Server 5.6       | MySQL configuration files     |
    +-----------------------------+------------------------------------------------------------+-------------------------------+
    | cis_mysql5-6_enterprise     |  CIS Benchmark for Oracle MySQL Enterprise 5.6             | MySQL configuration files     |
    +-----------------------------+------------------------------------------------------------+-------------------------------+
    | cis_sqlserver2012           |  CIS Microsoft SQL Server 2012                             | Microsoft SQL Server 2012     |
    +-----------------------------+------------------------------------------------------------+-------------------------------+
    | cis_sqlserver2014           |  CIS Microsoft SQL Server 2014                             | Microsoft SQL Server 2014     |
    +-----------------------------+------------------------------------------------------------+-------------------------------+
    | cis_sqlserver2017           |  CIS Microsoft SQL Server 2017                             | Microsoft SQL Server 2017     |
    +-----------------------------+------------------------------------------------------------+-------------------------------+
    | cis_sqlserver2019           |  CIS Microsoft SQL Server 2019                             | Microsoft SQL Server 2019     |
    +-----------------------------+------------------------------------------------------------+-------------------------------+
