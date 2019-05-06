.. Copyright (C) 2019 Wazuh, Inc.

Security Configuration Assessment
=================================

This section attempts to introduce how this module can help us to securize our systems.

- `The configuration assessment scope`_
- `How SCA can help us`_
- `Available policies`_
- `Creating custom SCA policies`_

The configuration assessment scope
----------------------------------

One of the most important points to avoid hosts to be compromised is to securing them by reducing their surface of vulnerabilities. That process is commonly known
as hardening, and the configuration assessment is the most effective way to detect how to handle that hardening in our systems.

It consists on carrying out scans where policy files are used as template to discover the exposures or misconfiguration of the monitored host. To be more specific, 
changing default passwords, the removal of unnecessary software, unnecessary usernames or logins, and the disabling or removal of unnecessary services, for example. 
The target of those policies can be an Operating System such as Debian or Windows, or a particular software like the SSH server.


How SCA can help us
-------------------

This module has been designed to perform Security Configuration Assessment on agents by providing the scan results of one or more policy files.

Security compliance
^^^^^^^^^^^^^^^^^^^

Each CIS policy has the CIS and PCI-DSS controls mapped for each check of the policies. Here we can see an example:

.. code-block:: yaml

   id: 6512
   title: "Ensure noexec option set on removable media partitions"
   description: "The noexec mount option specifies that the filesystem cannot contain executable binaries."
   rationale: "Setting this option on a file system prevents users from executing programs from the removable media. This deters users from being able to introduce potentially malicious software on the system."
   remediation: "Edit the /etc/fstab file and add noexec to the fourth field (mounting options) of all removable media partitions. Look for entries that have mount points that contain words such as floppy or cdrom."
   compliance:
    - cis: "1.1.20"
    - cis_csc: "8"
    - pci_dss: "2.2.4"
   condition: any
   rules:
     - 'f:/etc/fstab -> NIN !r:^# && r:/media && r:noexec;'

These controls are included in the *compliance* section, and it is designed to allow the addition of more compliance controls.

SCA scan results
^^^^^^^^^^^^^^^^

SCA scan results appear as alerts when a check has changed its status based on reporting just the different results between scans to the manager. Only the necessary events
to keep the last global status of the scan are sent by agents, avoiding the flooding of unnecessary events in each scan.

Differences between scan results are alerted and updated to warn the users about the detected changes. Here we can see how alerts look like:

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

On the other side, within the *SCA* tab we can see the result for each check of the policy scanned. In addition, each check can be expanded each check to view more detailed information about each check.

.. thumbnail:: ../../../images/sca/sca-check.png
    :title: SCA check list
    :align: center
    :width: 100%

Scanned policies overview
^^^^^^^^^^^^^^^^^^^^^^^^^

Every scanned policy should contain a header to provide its overview information. Here we can see a header example:

.. code-block:: yaml

    policy:
      id: "system_audit_ssh"
      file: "system_audit_ssh.yml"
      name: "System audit for SSH hardening"
      description: "Guidance for establishing a secure configuration for SSH service vulnerabilities."
      references:
        - https://www.ssh.com/ssh/

Fields like `id` are mandatory to identify and classify policies.

The following screenshot of the *SCA* tab shows the overviewed of scanned policies for an agent:

.. thumbnail:: ../../../images/sca/sca-agent.png
    :title: SCA summary
    :align: center
    :width: 100%


Available policies
------------------

For this SCA module, available policies are described following the YAML format, as this standard focus on human readability, 
allowing the user to quickly understand and write their own policy files or extend the existing ones.

Most of available policies are based on CIS benchmarks, enriched with valuable information for every check. 

Available policies list
^^^^^^^^^^^^^^^^^^^^^^^

When installing Wazuh agent, the system will install only the policy files supported by that particular Operating System. The following list shows
all the policy files available for all Operating System that Wazuh supports. Those policies are installed on every Wazuh manager in order to include them
in agents groups easily.

+-----------------------------+------------------------------------------------------------+-------------------------------+
| Policy                      | Name                                                       | Requirement                   |
+-----------------------------+------------------------------------------------------------+-------------------------------+
| acsc_office2016_rcl         |  System audit for Office 2016 vulnerabilities              | Microsoft Office 2016         |
+-----------------------------+------------------------------------------------------------+-------------------------------+
| cis_apache2224_rcl          |  CIS Apache HTTP Server 2.2/2.4 Benchmark                  | Apache configuration files    |
+-----------------------------+------------------------------------------------------------+-------------------------------+
| cis_win2012r2_domainL1_rcl  |  CIS benchmark for Windows 2012 R2 Domain Controller L1    | Windows Server 2012 R2        |
+-----------------------------+------------------------------------------------------------+-------------------------------+
| cis_win2012r2_domainL2_rcl  |  CIS benchmark for Windows 2012 R2 Domain Controller L2    | Windows Server 2012 R2        |
+-----------------------------+------------------------------------------------------------+-------------------------------+
| cis_win2012r2_memberL1_rcl  |  CIS benchmark for Windows 2012 R2 Member Server L1        | Windows Server 2012 R2        |
+-----------------------------+------------------------------------------------------------+-------------------------------+
| cis_win2012r2_memberL2_rcl  |  CIS benchmark for Windows 2012 R2 Member Server L2        | Windows Server 2012 R2        |
+-----------------------------+------------------------------------------------------------+-------------------------------+
| cis_rhel5_linux_rcl         |  CIS Benchmark for Red Hat Enterprise Linux 5              | Red Hat Systems               |
+-----------------------------+------------------------------------------------------------+-------------------------------+
| cis_rhel6_linux_rcl         |  CIS Benchmark for Red Hat Enterprise Linux 6              | Red Hat Systems               |
+-----------------------------+------------------------------------------------------------+-------------------------------+
| cis_rhel7_linux_rcl         |  CIS Benchmark for Red Hat Enterprise Linux 7              | Red Hat Systems               |
+-----------------------------+------------------------------------------------------------+-------------------------------+
| cis_apple_macOS_10.11       |  CIS Apple OSX 10.11 Benchmark                             | MAC OS X 10.11 (El Capitan)   |
+-----------------------------+------------------------------------------------------------+-------------------------------+
| cis_apple_macOS_10.12       |  CIS Apple macOS 10.12 Benchmark                           | MAC OS X 10.12 (Sierra)       |
+-----------------------------+------------------------------------------------------------+-------------------------------+
| cis_apple_macOS_10.13       |  CIS Apple macOS 10.13 Benchmark                           | MAC OS X 10.13 (High Sierra)  |
+-----------------------------+------------------------------------------------------------+-------------------------------+
| cis_debianlinux7-8_L1_rcl   |  CIS benchmark for Debian/Linux 7 and 8 L1                 | Debian 7 and 8                |
+-----------------------------+------------------------------------------------------------+-------------------------------+
| cis_debianlinux7-8_L2_rcl   |  CIS benchmark for Debian/Linux 7 and 8 L2                 | Debian 7 and 8                |
+-----------------------------+------------------------------------------------------------+-------------------------------+
| cis_debian_linux_rcl        |  CIS benchmark for Debian/Linux                            | Debian systems                |
+-----------------------------+------------------------------------------------------------+-------------------------------+
| cis_sles11_linux_rcl        |  CIS SUSE Linux Enterprise 11 Benchmark                    | SUSE 11                       |
+-----------------------------+------------------------------------------------------------+-------------------------------+
| cis_sles12_linux_rcl        |  CIS SUSE Linux Enterprise 12 Benchmark                    | SUSE 12                       |
+-----------------------------+------------------------------------------------------------+-------------------------------+
| cis_solaris11_rcl           |  CIS benchmark for Oracle Solaris 11                       | Solaris 11                    |
+-----------------------------+------------------------------------------------------------+-------------------------------+
| system_audit_pw             |  System audit for password-related vulnerabilities         | Password files                |
+-----------------------------+------------------------------------------------------------+-------------------------------+
| system_audit_rcl_mac        |  System audit for web-related vulnerabilities              | N/A                           |
+-----------------------------+------------------------------------------------------------+-------------------------------+
| system_audit_rcl            |  System audit for web-related vulnerabilities              | N/A                           |
+-----------------------------+------------------------------------------------------------+-------------------------------+
| system_audit_ssh            |  System audit for SSH hardening                            | SSH configuration files       |
+-----------------------------+------------------------------------------------------------+-------------------------------+
| win_audit_rcl               |  Benchmark for Windows audit                               | Windows                       |
+-----------------------------+------------------------------------------------------------+-------------------------------+
| cis_win10_enterprise_L1_rcl |  CIS benchmark for Windows 10 Enterprise (Release 1709)    | Windows 10                    |
+-----------------------------+------------------------------------------------------------+-------------------------------+
| cis_win10_enterprise_L2_rcl |  CIS benchmark for Windows 10 Enterprise (Release 1709)    | Windows 10                    |
+-----------------------------+------------------------------------------------------------+-------------------------------+
| cis_mysql5-6_community_rcl  |  CIS benchmark for Oracle MySQL Community Server 5.6       | MySQL configuration files     |
+-----------------------------+------------------------------------------------------------+-------------------------------+
| cis_mysql5-6_enterprise_rcl |  CIS benchmark for Oracle MySQL Enterprise 5.6             | MySQL configuration files     |
+-----------------------------+------------------------------------------------------------+-------------------------------+

Policy files location
^^^^^^^^^^^^^^^^^^^^^

- On Linux platforms, the default policy files are located under the default installation directory at ``/var/ossec/ruleset/sca``.
- On Windows platformss, the policy files are located under the default installation directory at ``C:\\Program files (x86)\\ossec-agent\\ruleset\\sca``.

How to share policy files with agents
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

As described in the :doc:`centralized configuration <../../reference/centralized-configuration>` section, the Wazuh manager has the ability to push files and
configurations to connected agents.

This feature con be used to push policy files to agents in defined groups. By default, every connected agents belongs to the *default* group. We will use this group to show an example.

- Steps on the manager

    - Put the new policy file under the directory: ``/var/ossec/etc/shared/default``
    - Ensure the policy owner is `ossec`.
    - Edit the ``/var/ossec/etc/shared/default/agent.conf`` file.
    - Add the following block:

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

If you want to disable a current policy file that is being scanned on the agent, put the following block inside the file ``/var/ossec/etc/shared/default/agent.conf``:

.. code-block:: xml

    <agent_config>

        <!-- Shared agent configuration here -->
        <sca>
            <policies>
                <policy enabled="no">/var/ossec/etc/shared/policy_file_to_disable.yml</policy>
            </policies>
        </sca>

    </agent_config>

The agent will stop to scan the policy file specified.

.. note::
    Remote policies are not allowed to run commands by default for security reasons. To enable it, change the ``sca.remote_commands`` of the internal options.

Creating custom SCA policies
----------------------------

First of all, we need to take a look at the structure of a policy file as it is declared in YAML. Take a look at the example below taken from the policy file for SSH hardening:

.. code-block:: yaml

    policy:
      id: "system_audit_ssh"
      file: "system_audit_ssh.yml"
      name: "System audit for SSH hardening"
      description: "Guidance for establishing a secure configuration for SSH service vulnerabilities."
      references:
        - https://www.ssh.com/ssh/

    requirements:
      title: "Check that the SSH service is installed on the system"
      description: "Requirements for running the SCA scan against the SSH policy."
      condition: "all required"
      rules:
        - 'f:/etc/ssh/sshd_config;'

    variables:
     $sshd_file: /etc/ssh/sshd_config;

    checks:
     - id: 1500
       title: "SSH Hardening - 1: Port 22"
       description: "The ssh daemon should not be listening on port 22 (the default value) for incoming connections."
       rationale: "Changing the default port you may reduce the number of successful attacks from zombie bots, an attacker or bot doing port-scanning can quickly identify your SSH port."
       remediation: "Change the Port option value in the sshd_config file."
       compliance:
        - pci_dss: "2.2.4"
       condition: any
       rules:
        - 'f:$sshd_file -> IN !r:^# && r:Port\.+22;'


As shown above, there are four sections for a policy file, the following table shows required sections:

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


Each section have their own fields that can be mandatory as described below:

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

To add a new policy file, it is recommended to put the file under the `ruleset/sca` directory.

.. note::
  - Remember that the **policy** id field must be unique, not existing in other policy files.
  - Remember that the **checks** id field must be unique, not existing in other policy files.


Information about variables
^^^^^^^^^^^^^^^^^^^^^^^^^^^

When setting variables in the **variables** section:

- Make sure they start with ``$`` character
- Make sure they end with ``;`` character

Example: ``$sshd_file: /etc/ssh/sshd_config;``


Information about rules
^^^^^^^^^^^^^^^^^^^^^^^

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

**Rule syntax for files**

- Checking that a file exists
  - ``'f:/path/to/file;'``

- Checking file content (whole line match)
  - ``'f:/path/to/file -> content;'``

- Checking file content with regex
  - ``'f:/path/to/file -> r:REGEX;'``


**Rule syntax for directories**

- Checking that a directory exists
  - ``'d:/path/to/directory;'``

- Checking that a directory contains a file
  - ``'d:/path/to/directory -> file;'``

- Checking that a directory contains files with regex
  - ``'d:/path/to/directory -> r:^files;'``

- Checking that a directory contains files and its content
  - ``'d:/path/to/directory -> file -> content;'``


**Rule syntax for processes**

- Checking that a process is running
  - ``'p:process_name;'``


**Rule syntax for commands**

- Checking the output of a command
  - ``'c:command -> output;'``

- Checking the output of a command with regex
  - ``'c:command -> r:REGEX;'``


**Rule syntax for registries (Windows only).**

- Checking that a registry exists
  - ``'r:path/to/registry ;'``

- Checking that a registry key exists
  - ``'r:path/to/registry -> key;'``

- Checking a registry key content
  - ``'r:path/to/registry  -> key -> content;'``

**Logic operators**

There are two logic operators that: IN and NIN (not in)

- IN: will alert if the condition matches.  
- NIN: will alert if the condition is not satisfied.

The above operators are used for composed rules that have more than one term. 

**Use cases**

- Alert when there is a line that does not begin with ``#`` and contains ``Port 22``
  - ``'f:/etc/ssh/sshd_config -> IN !r:^# && r:Port\.+22;'``

- Alert when there is no line that does not begin with ``#`` and contains ``Port 2222``
  - ``'f:/etc/ssh/sshd_config -> NIN !r:^# && r:Port\.+2222;'``

.. note::
  Remember that the each rule must end with the semicolon ``;`` character.

More examples:

- Looking at the value inside a file: ``'f:/proc/sys/net/ipv4/ip_forward -> 1;'``
- Checking if a file exists: ``'f:/proc/sys/net/ipv4/ip_forward;'``
- Checking if a process is running: ``'p:avahi-daemon;'``
- Looking at the value of a registry: ``'r:HKEY_LOCAL_MACHINE\System\CurrentControlSet\Services\Netlogon\Parameters -> MaximumPasswordAge -> 0;'``
- Looking if a directory contains files: ``'d:/home/* -> ^.mysql_history$;'``
- Checking if a directory exists: ``'d:/etc/mysql;``
- Check the running configuration of ssh to check the maximum authentication tries: ``'c:sshd -T -> !r:^\s*maxauthtries\s+4\s*$;'``
- Check if root is the only UID 0 account ``'f:/etc/passwd -> IN !r:^# && !r:^root: && r:^\w+:\w+:0:;'``
