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
    If you wish to modify or add new policies, place them under an alternative folder.

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

#. Place a new policy file in the Wazuh manager's ``/var/ossec/etc/shared/default`` folder. This file must be owned by the user ``ossec``.


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
    | Policy                      | Name                                                       | Requirement                   |
    +=============================+============================================================+===============================+
    | cis_win2012r2_domainL1      |  CIS benchmark for Windows 2012 R2 Domain Controller L1    | Windows Server 2012 R2        |
    +-----------------------------+------------------------------------------------------------+-------------------------------+
    | cis_win2012r2_domainL2      |  CIS benchmark for Windows 2012 R2 Domain Controller L2    | Windows Server 2012 R2        |
    +-----------------------------+------------------------------------------------------------+-------------------------------+
    | cis_win2012r2_memberL1      |  CIS benchmark for Windows 2012 R2 Member Server L1        | Windows Server 2012 R2        |
    +-----------------------------+------------------------------------------------------------+-------------------------------+
    | cis_win2012r2_memberL2      |  CIS benchmark for Windows 2012 R2 Member Server L2        | Windows Server 2012 R2        |
    +-----------------------------+------------------------------------------------------------+-------------------------------+
    | cis_win10_enterprise_L1     |  CIS benchmark for Windows 10 Enterprise (Release 1709)    | Windows 10                    |
    +-----------------------------+------------------------------------------------------------+-------------------------------+
    | cis_win10_enterprise_L2     |  CIS benchmark for Windows 10 Enterprise (Release 1709)    | Windows 10                    |
    +-----------------------------+------------------------------------------------------------+-------------------------------+
    | sca_win_audit               |  Benchmark for Windows auditing                            | Windows                       |
    +-----------------------------+------------------------------------------------------------+-------------------------------+
    | cis_rhel5_linux             |  CIS Benchmark for Red Hat Enterprise Linux 5              | Red Hat Systems               |
    +-----------------------------+------------------------------------------------------------+-------------------------------+
    | cis_rhel6_linux             |  CIS Benchmark for Red Hat Enterprise Linux 6              | Red Hat Systems               |
    +-----------------------------+------------------------------------------------------------+-------------------------------+
    | cis_rhel7_linux             |  CIS Benchmark for Red Hat Enterprise Linux 7              | Red Hat Systems               |
    +-----------------------------+------------------------------------------------------------+-------------------------------+
    | cis_debian7_L1              |  CIS benchmark for Debian/Linux 7 L1                       | Debian 7                      |
    +-----------------------------+------------------------------------------------------------+-------------------------------+
    | cis_debian7_L2              |  CIS benchmark for Debian/Linux 7 L2                       | Debian 7                      |
    +-----------------------------+------------------------------------------------------------+-------------------------------+
    | cis_debian8_L1              |  CIS benchmark for Debian/Linux 8 L1                       | Debian 8                      |
    +-----------------------------+------------------------------------------------------------+-------------------------------+
    | cis_debian8_L2              |  CIS benchmark for Debian/Linux 8 L2                       | Debian 8                      |
    +-----------------------------+------------------------------------------------------------+-------------------------------+
    | cis_debian9_L1              |  CIS benchmark for Debian/Linux 9 L1                       | Debian 9                      |
    +-----------------------------+------------------------------------------------------------+-------------------------------+
    | cis_debian9_L2              |  CIS benchmark for Debian/Linux 9 L2                       | Debian 9                      |
    +-----------------------------+------------------------------------------------------------+-------------------------------+
    | cis_sles11_linux            |  CIS SUSE Linux Enterprise 11 Benchmark                    | SUSE 11                       |
    +-----------------------------+------------------------------------------------------------+-------------------------------+
    | cis_sles12_linux            |  CIS SUSE Linux Enterprise 12 Benchmark                    | SUSE 12                       |
    +-----------------------------+------------------------------------------------------------+-------------------------------+
    | cis_solaris11               |  CIS benchmark for Oracle Solaris 11                       | Solaris 11                    |
    +-----------------------------+------------------------------------------------------------+-------------------------------+
    | sca_unix_audit              |  Benchmark for Linux auditing                              | N/A                           |
    +-----------------------------+------------------------------------------------------------+-------------------------------+
    | cis_apple_macOS_10.11       |  CIS Apple OSX 10.11 Benchmark                             | MAC OS X 10.11 (El Capitan)   |
    +-----------------------------+------------------------------------------------------------+-------------------------------+
    | cis_apple_macOS_10.12       |  CIS Apple macOS 10.12 Benchmark                           | MAC OS X 10.12 (Sierra)       |
    +-----------------------------+------------------------------------------------------------+-------------------------------+
    | cis_apple_macOS_10.13       |  CIS Apple macOS 10.13 Benchmark                           | MAC OS X 10.13 (High Sierra)  |
    +-----------------------------+------------------------------------------------------------+-------------------------------+
    | web_vulnerabilities         |  System audit for web-related vulnerabilities              | N/A                           |
    +-----------------------------+------------------------------------------------------------+-------------------------------+
    | cis_apache_24               |  CIS Apache HTTP Server 2.4 Benchmark                      | Apache configuration files    |
    +-----------------------------+------------------------------------------------------------+-------------------------------+
    | cis_mysql5-6_community      |  CIS benchmark for Oracle MySQL Community Server 5.6       | MySQL configuration files     |
    +-----------------------------+------------------------------------------------------------+-------------------------------+
    | cis_mysql5-6_enterprise     |  CIS benchmark for Oracle MySQL Enterprise 5.6             | MySQL configuration files     |
    +-----------------------------+------------------------------------------------------------+-------------------------------+
