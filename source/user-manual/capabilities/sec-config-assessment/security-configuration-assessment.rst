.. Copyright (C) 2019 Wazuh, Inc.

Security Configuration Assessment
=================================

This section attempts to introduce how this module can help us to securize our systems.

- `The configuration assessment scope`_
- `Available policies`_
- `Creating custom SCA policies`_

The configuration assessment scope
----------------------------------

One of the most certain ways to avoid hosts being compromised is to secure them by reducing their surface of vulnerabilities. That process is commonly known as hardening, and the configuration assessment is the most effective way to determine where the hosts may have their hardening improved.

The SCA will perform scans using policy files as templates to discover the exposures or misconfiguration of the monitored hosts. For example it will determine if it is necessary to change default passwords, remove unnecessary software, unnecessary usernames or logins, and disable or remove of unnecessary services.
The target of those policies can be an Operating System such as Debian or Windows, or a particular software like the SSH server.

Security compliance
^^^^^^^^^^^^^^^^^^^

Each policy check can contain an optional **compliance** field that is used to specify how the check is relevant to different Compliance Standards specifications. Many of the default policies available with Wazuh, specially CIS policies, already have the CIS and PCI-DSS controls mapped. Here we can see an example:

.. code-block:: yaml

   id: 3010
   title: "Ensure noexec option set on /var/tmp partition"
   description: "The noexec mount option specifies that the filesystem cannot contain executable binaries."
   rationale: "Setting this option on a file system prevents users from executing programs from the removable media. This deters users from being able to introduce potentially malicious software on the system."
   remediation: "Edit the /etc/fstab file and add noexec to the fourth field (mounting options) of all removable media partitions. Look for entries that have mount points that contain words such as floppy or cdrom."
   compliance:
      - cis: ["1.1.10"]
      - cis_csc: ["2.6"]
   condition: all
   rules:
      - 'c:mount -> r:\s/var/tmp\s && r:noexec'

SCA scan results
^^^^^^^^^^^^^^^^

SCA scan results appear as alerts when a check has changed its status between scans. Only the events that are necessary to keep the global status of the scan updated are sent by agents, avoiding the flooding of unnecessary events in each scan.

An alert example can be seen here:

.. code-block:: none

    ** Alert 1556643969.400529: - sca,gdpr_IV_35.7.d
    2019 Apr 30 10:06:09 (centos) 192.168.0.97->sca
    Rule: 19008 (level 3) -> 'CIS Benchmark for Red Hat Enterprise Linux 7: Ensure address space layout randomization (ASLR) is enabled'
    {"type":"check","id":645241598,"policy":"CIS Benchmark for Red Hat Enterprise Linux 7","policy_id":"cis_rhel7","check":{"id":6523,"title":"Ensure address space layout randomization (ASLR) is enabled","description":"Address space layout randomization (ASLR) is an exploit mitigation technique which randomly arranges the address space of key data areas of a process.","rationale":"Randomly placing virtual memory regions will make it difficult to write memory page exploits as the memory placement will be consistently shifting.","remediation":"Set the following parameter in /etc/sysctl.conf or a /etc/sysctl.d/* file: kernel.randomize_va_space = 2 and set the active kernel parameter","compliance":{"cis":"1.5.3","cis_csc":"8.4"},"rules":["f:/proc/sys/kernel/randomize_va_space -> !r:^2$;"],"file":"/proc/sys/kernel/randomize_va_space","result":"passed"}}
    sca.type: check
    sca.scan_id: 645241598
    sca.policy: CIS Benchmark for Red Hat Enterprise Linux 7
    sca.check.id: 6523
    sca.check.title: Ensure address space layout randomization (ASLR) is enabled
    sca.check.description: Address space layout randomization (ASLR) is an exploit mitigation technique which randomly arranges the address space of key data areas of a process.
    sca.check.rationale: Randomly placing virtual memory regions will make it difficult to write memory page exploits as the memory placement will be consistently shifting.
    sca.check.remediation: Set the following parameter in /etc/sysctl.conf or a /etc/sysctl.d/* file: kernel.randomize_va_space = 2 and set the active kernel parameter
    sca.check.compliance.cis: 1.5.3
    sca.check.compliance.cis_csc: 8.4
    sca.check.file: ["/proc/sys/kernel/randomize_va_space"]
    sca.check.result: passed

On the Wazuh App, within the *SCA* tab we can see the result for each check of the scanned policies. In addition, each check can be expanded to view more detailed information about it.

.. thumbnail:: ../../../images/sca/sca-check.png
    :title: SCA check list
    :align: center
    :width: 100%

Scanned policies overview
^^^^^^^^^^^^^^^^^^^^^^^^^

Every scanned policy should contain a header to provide its overview information. Here we can see a header example:

.. code-block:: yaml

    policy:
      id: "cis_debian9_L1"
      file: "cis_debian9_L1.yml"
      name: "CIS benchmark for Debian/Linux 9 L1"
      description: "This document provides prescriptive guidance for establishing a secure configuration posture for Debian Linux 9."
      references:
        - https://www.cisecurity.org/cis-benchmarks/

Fields like `id` are mandatory to identify and classify policies.

The following screenshot of the *SCA* tab shows an overview of scanned policies for an agent:

.. thumbnail:: ../../../images/sca/sca-agent.png
    :title: SCA summary
    :align: center
    :width: 100%


Available policies
------------------

Policies for the SCA module are written using the YAML format, which was chosen due to its focus on human readability, 
which allows the user to quickly understand and write their own policy files or extend the existing ones.

Many of the available default policies are based on CIS benchmarks, enriched with valuable information for every check. 

Available policies list
^^^^^^^^^^^^^^^^^^^^^^^

When a Wazuh agent is installed, the system will only include the policy files supported by that particular Operating System. The following list shows
all the default policy files available for the Operating Systems officially supported by Wazuh. These policies are all included with the Wazuh manager installation so they may be included in agent groups easily.

+-----------------------------+------------------------------------------------------------+-------------------------------+
| Policy                      | Name                                                       | Requirement                   |
+-----------------------------+------------------------------------------------------------+-------------------------------+
| acsc_office2016             |  System audit for Office 2016 vulnerabilities              | Microsoft Office 2016         |
+-----------------------------+------------------------------------------------------------+-------------------------------+
| cis_apache2224              |  CIS Apache HTTP Server 2.2/2.4 Benchmark                  | Apache configuration files    |
+-----------------------------+------------------------------------------------------------+-------------------------------+
| cis_win2012r2_domainL1      |  CIS benchmark for Windows 2012 R2 Domain Controller L1    | Windows Server 2012 R2        |
+-----------------------------+------------------------------------------------------------+-------------------------------+
| cis_win2012r2_domainL2      |  CIS benchmark for Windows 2012 R2 Domain Controller L2    | Windows Server 2012 R2        |
+-----------------------------+------------------------------------------------------------+-------------------------------+
| cis_win2012r2_memberL1      |  CIS benchmark for Windows 2012 R2 Member Server L1        | Windows Server 2012 R2        |
+-----------------------------+------------------------------------------------------------+-------------------------------+
| cis_win2012r2_memberL2      |  CIS benchmark for Windows 2012 R2 Member Server L2        | Windows Server 2012 R2        |
+-----------------------------+------------------------------------------------------------+-------------------------------+
| cis_rhel5_linux             |  CIS Benchmark for Red Hat Enterprise Linux 5              | Red Hat Systems               |
+-----------------------------+------------------------------------------------------------+-------------------------------+
| cis_rhel6_linux             |  CIS Benchmark for Red Hat Enterprise Linux 6              | Red Hat Systems               |
+-----------------------------+------------------------------------------------------------+-------------------------------+
| cis_rhel7_linux             |  CIS Benchmark for Red Hat Enterprise Linux 7              | Red Hat Systems               |
+-----------------------------+------------------------------------------------------------+-------------------------------+
| cis_apple_macOS_10.11       |  CIS Apple OSX 10.11 Benchmark                             | MAC OS X 10.11 (El Capitan)   |
+-----------------------------+------------------------------------------------------------+-------------------------------+
| cis_apple_macOS_10.12       |  CIS Apple macOS 10.12 Benchmark                           | MAC OS X 10.12 (Sierra)       |
+-----------------------------+------------------------------------------------------------+-------------------------------+
| cis_apple_macOS_10.13       |  CIS Apple macOS 10.13 Benchmark                           | MAC OS X 10.13 (High Sierra)  |
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
| cis_debian_linux            |  CIS benchmark for Debian/Linux                            | Debian systems                |
+-----------------------------+------------------------------------------------------------+-------------------------------+
| cis_sles11_linux            |  CIS SUSE Linux Enterprise 11 Benchmark                    | SUSE 11                       |
+-----------------------------+------------------------------------------------------------+-------------------------------+
| cis_sles12_linux            |  CIS SUSE Linux Enterprise 12 Benchmark                    | SUSE 12                       |
+-----------------------------+------------------------------------------------------------+-------------------------------+
| cis_solaris11               |  CIS benchmark for Oracle Solaris 11                       | Solaris 11                    |
+-----------------------------+------------------------------------------------------------+-------------------------------+
| sca_unix_audit              |  System audit for web-related vulnerabilities              | N/A                           |
+-----------------------------+------------------------------------------------------------+-------------------------------+
| sca_win_audit               |  Benchmark for Windows audit                               | Windows                       |
+-----------------------------+------------------------------------------------------------+-------------------------------+
| cis_win10_enterprise_L1     |  CIS benchmark for Windows 10 Enterprise (Release 1709)    | Windows 10                    |
+-----------------------------+------------------------------------------------------------+-------------------------------+
| cis_win10_enterprise_L2     |  CIS benchmark for Windows 10 Enterprise (Release 1709)    | Windows 10                    |
+-----------------------------+------------------------------------------------------------+-------------------------------+
| cis_mysql5-6_community      |  CIS benchmark for Oracle MySQL Community Server 5.6       | MySQL configuration files     |
+-----------------------------+------------------------------------------------------------+-------------------------------+
| cis_mysql5-6_enterprise     |  CIS benchmark for Oracle MySQL Enterprise 5.6             | MySQL configuration files     |
+-----------------------------+------------------------------------------------------------+-------------------------------+

Policy files location
^^^^^^^^^^^^^^^^^^^^^

- On Linux platforms, the default policy files are located under the default installation directory at ``/var/ossec/ruleset/sca``.
- On Windows platformss, the policy files are located under the default installation directory at ``C:\\Program files (x86)\\ossec-agent\\ruleset\\sca``.

How to share policy files with agents
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

As described in the :doc:`centralized configuration <../../reference/centralized-configuration>` section, the Wazuh manager has the ability to push files and
configurations to connected agents.

This feature con be used to push policy files to agents in defined groups. By default, every connected agent belongs to the *default* group, so we can use this group as an example. 

In order to push a new policy from the manager it should be placed in the directory: ``/var/ossec/etc/shared/default``
, ensure the policy owner is `ossec` and then add the following block to the ``/var/ossec/etc/shared/default/agent.conf`` file:

.. code-block:: xml

    <agent_config>

        <!-- Shared agent configuration here -->
        <sca>
            <policies>
                <policy>/var/ossec/etc/shared/your_policy_file.yml</policy>
            </policies>
        </sca>

    </agent_config>

The ``<sca>`` block will be merged with the current ``<sca>`` block on the agent side and the new policy file will be added.

Current policy files configured to be run on the agent (either by default or by local configuration) my be disabled via the centralized configuration file ``/var/ossec/etc/shared/default/agent.conf`` as follows:

.. code-block:: xml

    <agent_config>

        <!-- Shared agent configuration here -->
        <sca>
            <policies>
                <policy enabled="no">/var/ossec/etc/shared/policy_file_to_disable.yml</policy>
            </policies>
        </sca>

    </agent_config>

.. note::
    Remote policies are not allowed to run commands by default for security reasons. To enable it, change the ``sca.remote_commands`` of the internal options.

Creating custom SCA policies
----------------------------

As mentioned previously, the policy files have a YAML format. In order to illustrate shown below is a section of the policy file for Unix auditing:

.. code-block:: yaml

    policy:
    id: "unix_audit"
    file: "unix_audit.yml"
    name: "System audit for Unix based systems"
    description: "Guidance for establishing a secure configuration for Unix based systems."
    references:
        - https://www.ssh.com/ssh/

    variables:
    $sshd_file: /etc/ssh/sshd_config,/opt/ssh/etc/sshd_config
    $pam_d_files: /etc/pam.d/common-password,/etc/pam.d/password-auth,/etc/pam.d/system-auth,/etc/pam.d/system-auth-ac,/etc/pam.d/passwd

    requirements:
    title: "Check that the SSH service is installed on the system and password-related files are present on the system"
    description: "Requirements for running the SCA scan against the Unix based systems policy."
    condition: any
    rules:
        - 'f:$sshd_file'
        - 'f:/etc/passwd'
        - 'f:/etc/shadow'

    checks:
    - id: 4000
        title: "SSH Hardening - 1: Port should not be 22"
        description: "The ssh daemon should not be listening on port 22 (the default value) for incoming connections."
        rationale: "Changing the default port you may reduce the number of successful attacks from zombie bots, an attacker or bot doing port-scanning can quickly identify your SSH port."
        remediation: "Change the Port option value in the sshd_config file."
        compliance:
        - pci_dss: ["2.2.4"]
        condition: all
        rules:
          - 'f:$sshd_file -> !r:^# && r:Port && !r:\s*\t*22\s\t*$'

As shown in this example, there are four sections, not all of them are required for a policy file:

+--------------------+----------------+
| Section            | Required       |
+--------------------+----------------+
| policy             | Yes            |
+--------------------+----------------+
| requirements       | No             |
+--------------------+----------------+
| variables          | No             |
+--------------------+----------------+
| checks             | Yes            |
+--------------------+----------------+


.. note::
  If the *requirements* aren't satisfied for a specific policy file, the scan for that file won't start.


Each section has their own fields that can be mandatory as described below:

**Policy section**

+--------------------+----------------+-------------------+------------------------+
| Field              | Mandatory      | Type              | Allowed values         |
+--------------------+----------------+-------------------+------------------------+
| id                 | Yes            | String            | Any string             |
+--------------------+----------------+-------------------+------------------------+
| file               | Yes            | String            | Any string             |
+--------------------+----------------+-------------------+------------------------+
| name               | Yes            | String            | Any string             |
+--------------------+----------------+-------------------+------------------------+
| description        | Yes            | String            | Any string             |
+--------------------+----------------+-------------------+------------------------+
| references         | No             | Array of strings  | Any string             |
+--------------------+----------------+-------------------+------------------------+


**Requirements section**

+--------------------+----------------+-------------------+------------------------+
| Field              | Mandatory      | Type              | Allowed values         |
+--------------------+----------------+-------------------+------------------------+
| title              | Yes            | String            | Any string             |
+--------------------+----------------+-------------------+------------------------+
| description        | Yes            | String            | Any string             |
+--------------------+----------------+-------------------+------------------------+
| condition          | Yes            | String            | Any string             |
+--------------------+----------------+-------------------+------------------------+
| rules              | Yes            | Array of strings  | Any string             |
+--------------------+----------------+-------------------+------------------------+


**Variables section**

+--------------------+----------------+-------------------+------------------------+
| Field              | Mandatory      | Type              | Allowed values         |
+--------------------+----------------+-------------------+------------------------+
| variable_name      | Yes            | String            | Any string             |
+--------------------+----------------+-------------------+------------------------+


**Checks section**

+--------------------+----------------+-------------------+--------------------------------------+
| Field              | Mandatory      | Type              | Allowed values                       |
+--------------------+----------------+-------------------+--------------------------------------+
| id                 | Yes            | Numeric           | Any integer number                   |
+--------------------+----------------+-------------------+--------------------------------------+
| title              | Yes            | String            | Any string                           |
+--------------------+----------------+-------------------+--------------------------------------+
| description        | No             | String            | Any string                           |
+--------------------+----------------+-------------------+--------------------------------------+
| rationale          | No             | String            | Any string                           |
+--------------------+----------------+-------------------+--------------------------------------+
| remediation        | No             | String            | Any string                           |
+--------------------+----------------+-------------------+--------------------------------------+
| compliance         | No             | Array of strings  | Any string                           |
+--------------------+----------------+-------------------+--------------------------------------+
| references         | No             | Array of strings  | Any string                           |
+--------------------+----------------+-------------------+--------------------------------------+
| condition          | Yes            | String            | all, any, any required, all required |
+--------------------+----------------+-------------------+--------------------------------------+
| rules              | Yes            | Array of strings  | Any string                           |
+--------------------+----------------+-------------------+--------------------------------------+

It is recommended that new policy files be placed under the `ruleset/sca` directory.

.. note::
  - Remember that fields id from **policy** and **checks** must be unique, not existing in other policy files.

Information about variables
^^^^^^^^^^^^^^^^^^^^^^^^^^^

When setting variables in the **variables** section:

- Make sure they start with ``$`` character

Example: ``$sshd_file: /etc/ssh/sshd_config``


Information about rules
^^^^^^^^^^^^^^^^^^^^^^^

**General rule syntax**

The *rules* field is where ``SCA`` dictates if a *check* is marked as *passed* or *failed*.

There are five main types of rules as described below:

+------------------------------+----------------+
| Type                         | Character      |
+------------------------------+----------------+
| File                         | f              |
+------------------------------+----------------+
| Directory                    | d              |
+------------------------------+----------------+
| Process                      | p              |
+------------------------------+----------------+
| Commands                     | c              |
+------------------------------+----------------+
| Registry (Windows Only)      | r              |
+------------------------------+----------------+

In order to better understand the syntax of the rules it is important to note that:

- The *type* of a rule references the location where the rule will look for the content of the check. Every rule has to start with a location.

- The location is commonly followed by the content to look for. It is accepted a literal string or a regular expression preceded by ``r:`` (the supported Regex syntax can be found :doc:`here <../../ruleset/ruleset-xml-syntax/regex>`).

- As explained before, the most common rules have the format ``type:location -> r:REGEX``. However, there are exceptions, for example, for Windows registries, we would have to add the registry key in the middle of the rule.

The following examples illustrate this logic:

**Rule syntax for files**

- Checking that a file exists
  - ``'f:/path/to/file'``

- Checking file content (whole line match)
  - ``'f:/path/to/file -> content'``

- Checking file content with regex
  - ``'f:/path/to/file -> r:REGEX'``

- Checking a numeric value
  - ``'f:/path/to/file -> n:REGEX(\d+) compare <= Number'``

**Rule syntax for directories**

- Checking that a directory exists
  - ``'d:/path/to/directory'``

- Checking that a directory contains a file
  - ``'d:/path/to/directory -> file'``

- Checking that a directory contains files with regex
  - ``'d:/path/to/directory -> r:^files'``

- Checking that a directory contains files and its content
  - ``'d:/path/to/directory -> file -> content'``


**Rule syntax for processes**

- Checking that a process is running
  - ``'p:process_name'``


**Rule syntax for commands**

- Checking the output of a command
  - ``'c:command -> output'``

- Checking the output of a command with regex
  - ``'c:command -> r:REGEX'``

- Checking a numeric value
  - ``'c:command -> n:REGEX(\d+) compare <= Number'``

**Rule syntax for registries (Windows only).**

- Checking that a registry exists
  - ``'r:path/to/registry '``

- Checking that a registry key exists
  - ``'r:path/to/registry -> key;``

- Checking a registry key content
  - ``'r:path/to/registry  -> key -> content'``

**Use cases**

Composed rules:

- Alert when there is a line that does not begin with ``#`` and contains ``Port 22``
  - ``'f:/etc/ssh/sshd_config -> !r:^# && r:Port\.+22'``

- Alert when there is no line that does not begin with ``#`` and contains ``Port 2222``
  - ``'f:/etc/ssh/sshd_config -> !r:^# && r:Port\.+2222'``

Other examples:

- Looking at the value inside a file: ``'f:/proc/sys/net/ipv4/ip_forward -> 1'``
- Checking if a file exists: ``'f:/proc/sys/net/ipv4/ip_forward'``
- Checking if a process is running: ``'p:avahi-daemon'``
- Looking at the value of a registry: ``'r:HKEY_LOCAL_MACHINE\System\CurrentControlSet\Services\Netlogon\Parameters -> MaximumPasswordAge -> 0'``
- Looking if a directory contains files: ``'d:/home/* -> ^.mysql_history$'``
- Checking if a directory exists: ``'d:/etc/mysql'``
- Check the running configuration of ssh to check the maximum authentication tries: ``'c:sshd -T -> !r:^\s*maxauthtries\s+4\s*$'``
- Check if root is the only UID 0 account ``'f:/etc/passwd -> IN !r:^# && !r:^root: && r:^\w+:\w+:0:'``
