.. Copyright (C) 2019 Wazuh, Inc.

.. Section marks used on this document:
.. h0 ======================================
.. h1 --------------------------------------
.. h2 ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
.. h3 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
.. h4 ######################################
.. h5 ::::::::::::::::::::::::::::::::::::::

Security Configuration Assessment
=================================

.. contents:: Table of Contents
   :local:
   :depth: 10

One of the most certain ways to avoid hosts from being compromised is to secure them by reducing their vulnerabiliy surface.
That process is commonly known as hardening, and the configuration assessment is the most effective way to determine where
the hosts may have their hardening improved.

The SCA will perform scans using policy files as templates to discover the exposures or misconfiguration of the monitored hosts.
For example it will determine if it is necessary to change default passwords, remove unnecessary software, unnecessary usernames
or logins, and disable or remove of unnecessary services.
The target of those policies can be an Operating System such as Debian or Windows, or a particular software like the SSH server.

Policies for the SCA module are written using YAML format. Such format was chosen due to its focus on human readability,
which allows the user to quickly understand and write their own policy files or extend the existing ones.

Security compliance
----------------------------------

Each policy check can contain an optional **compliance** field that is used to specify how the check is relevant to different
compliance standard specifications. Many of the default policies available with Wazuh, specially CIS policies, already have the
CIS and PCI-DSS controls mapped. Here we can see an example:

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
----------------------------------

SCA scan results appear as alerts when a check has changed its status between scans.
Only the events that are necessary to keep the global status of the scan updated are sent by agents,
avoiding flooding with unnecessary events in each scan.

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

On the Wazuh App, within the *SCA* tab we can see the result for each check of the scanned policies.
In addition, each check can be expanded to display further information.

.. thumbnail:: ../../../images/sca/sca-check.png
    :title: SCA check list
    :align: center
    :width: 100%

Scanned policies overview
----------------------------------

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

When a Wazuh agent is installed, the system will only include the policy files supported by that particular Operating System.
The table :ref:`available_sca_policies` sumarizes the policy files officially supported by Wazuh.
These policies are included with the Wazuh manager installation so they can be easily enabled.

.. _available_sca_policies:

.. table:: Available SCA policies
    :widths: auto


    +-----------------------------+------------------------------------------------------------+-------------------------------+
    | Policy                      | Name                                                       | Requirement                   |
    +=============================+============================================================+===============================+
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
    | sca_win_audit               |  Benchmark for Windows auditing                            | Windows                       |
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
- Wazuh manager: ``path/manager/all-policies``.
- Linux agents: ``/var/ossec/ruleset/sca``.
- Windows agents: ``C:\Program files (x86)\ossec-agent\ruleset\sca``.

.. note::
    By default, the Wazuh Agent will run every policy (`.yaml` or `.yml` files) present in ``/ruleset/sca``.

How to share policy files with agents
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

As described in the :doc:`centralized configuration <../../reference/centralized-configuration>` section,
the Wazuh manager has the ability to push files and configurations to connected agents.

This feature con be used to push policy files to agents in defined groups. By default, every connected agent belongs
to the *default* group, so we can use this group as an example.

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

Current policy files configured to be run on the agent (either by default or by local configuration) can be disabled via the
centralized configuration file ``/var/ossec/etc/shared/default/agent.conf`` as follows:

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

As mentioned previously, the policy files have a YAML format. In order to illustrate shown below is a section of the policy
file for Unix auditing:

.. code-block:: yaml

    policy:
      id: "unix_audit"
      file: "sca_unix_audit.yml"
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
      - id: 4004
        title: "SSH Hardening - 5: Password Authentication should be disabled"
        description: "The option PasswordAuthentication should be set to no."
        rationale: "The option PasswordAuthentication specifies whether we should use password-based authentication. Use public key authentication instead of passwords."
        remediation: "Change the PasswordAuthentication option value in the sshd_config file."
        compliance:
          - pci_dss: ["2.2.4"]
          - nist_800_53: ["CM.1"]
        condition: all
        rules:
         - 'f:$sshd_file -> r:^\s*PasswordAuthentication\s*\t*no'

      - id: [...]

As it is shown in this example, policy files are comprised by four sections, although not all of them are required, as
detailed in the :ref:`sca_policy_file_sections` table.

.. _sca_policy_file_sections:
.. table:: Policy file Sections
    :widths: auto

    +--------------------+----------------+
    | Section            | Required       |
    +====================+================+
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


Each section has their own fields as described in the as described in tables
:ref:`sca_policy_file_policy_section`,
:ref:`sca_policy_file_requirements_section`,
:ref:`sca_policy_file_variables_section`,
:ref:`sca_policy_file_checks_section`.

.. _sca_policy_file_policy_section:
.. table:: Policy section

    +--------------------+----------------+-------------------+------------------------+
    | Field              | Mandatory      | Type              | Allowed values         |
    +====================+================+===================+========================+
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

.. _sca_policy_file_requirements_section:
.. table:: Requirements section

    +--------------------+----------------+-------------------+------------------------+
    | Field              | Mandatory      | Type              | Allowed values         |
    +====================+================+===================+========================+
    | title              | Yes            | String            | Any string             |
    +--------------------+----------------+-------------------+------------------------+
    | description        | Yes            | String            | Any string             |
    +--------------------+----------------+-------------------+------------------------+
    | condition          | Yes            | String            | Any string             |
    +--------------------+----------------+-------------------+------------------------+
    | rules              | Yes            | Array of strings  | Any string             |
    +--------------------+----------------+-------------------+------------------------+

.. _sca_policy_file_variables_section:
.. table:: Variables section

    +--------------------+----------------+-------------------+------------------------+
    | Field              | Mandatory      | Type              | Allowed values         |
    +====================+================+===================+========================+
    | variable_name      | Yes            | Array of strings  | Any string             |
    +--------------------+----------------+-------------------+------------------------+

.. note::
  - Fields id from **policy** and **checks** must be unique across policy files.

Variables
^^^^^^^^^

Variables are set in the **variables** section. Their names are preceded by ``$``. For instance,

.. code-block:: yaml

    $list_of_files: /etc/ssh/sshd_config,/etc/sysctl.conf,/var/log/dmesg
    $list_of_folders: /etc,/var,/tmp

Checks
^^^^^^^^^
Checks are the core of a SCA policy, as they describe the checks to be performed in the system.
Each check is comprised by several fields as described in table :ref:`sca_policy_file_checks_section`.


.. _sca_policy_file_checks_section:
.. table:: Checks section

    +-------------+-----------+----------------------------+--------------------+
    |    Field    | Mandatory |            Type            |   Allowed values   |
    +=============+===========+============================+====================+
    |      id     |    Yes    |           Numeric          | Any integer number |
    +-------------+-----------+----------------------------+--------------------+
    |    title    |    Yes    |           String           |     Any string     |
    +-------------+-----------+----------------------------+--------------------+
    | description |     No    |           String           |     Any string     |
    +-------------+-----------+----------------------------+--------------------+
    |  rationale  |     No    |           String           |     Any string     |
    +-------------+-----------+----------------------------+--------------------+
    | remediation |     No    |           String           |     Any string     |
    +-------------+-----------+----------------------------+--------------------+
    |  compliance |     No    | Array of arrays of strings |     Any string     |
    +-------------+-----------+----------------------------+--------------------+
    |  references |     No    |      Array of strings      |     Any string     |
    +-------------+-----------+----------------------------+--------------------+
    |  condition  |    Yes    |           String           |   all, any, none   |
    +-------------+-----------+----------------------------+--------------------+
    |    rules    |    Yes    |      Array of strings      |     Any string     |
    +-------------+-----------+----------------------------+--------------------+

Check evaluation is governed by its `rule result aggregation strategy`, as set in its ``condition`` field, and the results of
the evaluation of its rules.

Condition
~~~~~~~~~~~~~~~~~~~

The condition field specifies how rule results are aggregated in order to calculate the final value of a check, there are three options:

- ``all``: the check will be evaluated as **passed** if **all** of its rules are satisfied, and as **failed** as soon as one evaluates to **failed**,

- ``any``: the check will be evaluated as **passed** as soon as **any** of its rules is satisfied,

- ``none``: the check will be evaluated as **passed** if **none** of its rules are satisfied, and as **failed** as soon as one evaluates to **passed**.

Special mention deserves the how how rules evaluated as **non-applicable** are treated by the aforementioned aggregators.

- ``all``: If any rule returns **non-applicable**, and no rule returns **failed**, the result will be **non-applicable**.

- ``any``: The check will be evaluated as **non-applicable** if no rule evaluates to **passed** and any returns **non-applicable**.

- ``none``: The check will be evaluated as **non-applicable** if no rule evaluates to **passed** and any returns **non-applicable**.

.. table:: Truth table for condition
    :widths: auto

    +------------------------------+-------------+-------------+-------------------+--------------------+
    | Condition \\ Rule evaluation |  passed(s)  |  failed(s)  | non-applicable(s) |     Result         |
    +==============================+=============+=============+===================+====================+
    |            ``all``           |     yes     |      no     |         no        |     **passed**     |
    +------------------------------+-------------+-------------+-------------------+--------------------+
    |            ``all``           | indifferent |      no     |        yes        | **non-applicable** |
    +------------------------------+-------------+-------------+-------------------+--------------------+
    |            ``all``           | indifferent |     yes     |    indifferent    |     **failed**     |
    +------------------------------+-------------+-------------+-------------------+--------------------+
    |            ``any``           |     yes     | indifferent |    indifferent    |     **passed**     |
    +------------------------------+-------------+-------------+-------------------+--------------------+
    |            ``any``           |      no     |     yes     |         no        |     **failed**     |
    +------------------------------+-------------+-------------+-------------------+--------------------+
    |            ``any``           |      no     | indifferent |        yes        | **non-applicable** |
    +------------------------------+-------------+-------------+-------------------+--------------------+
    |           ``none``           |     yes     | indifferent |    indifferent    |     **failed**     |
    +------------------------------+-------------+-------------+-------------------+--------------------+
    |           ``none``           |      no     | indifferent |        yes        | **non-applicable** |
    +------------------------------+-------------+-------------+-------------------+--------------------+
    |           ``none``           |      no     |     yes     |         no        |     **passed**     |
    +------------------------------+-------------+-------------+-------------------+--------------------+


Rules
~~~~~~~~~~~~~~~~~~~

Rules can check for existence of files, directories, registry keys and values, running processes, and recursively test for
existence of files inside directories. When it comes to content checking, they are able to check for file contents, recursively
check for the contents of files inside directories, command output and registry value data.

General rule syntax
###################

There are five main types of rules as described below:

.. table:: Rule types
    :widths: auto

    +------------------------------+------------------+
    | Type                         | Character        |
    +==============================+==================+
    | File                         | ``f``            |
    +------------------------------+------------------+
    | Directory                    | ``d``            |
    +------------------------------+------------------+
    | Process                      | ``p``            |
    +------------------------------+------------------+
    | Commands                     | ``c``            |
    +------------------------------+------------------+
    | Registry (Windows Only)      | ``r``            |
    +------------------------------+------------------+

The operators for content checking are:

.. table:: Content comparison operators
    :widths: auto

    +---------------------------------------+-----------------+-------------------------------------------------+
    | Operation                             | Operator        | Example                                         |
    +=======================================+=================+=================================================+
    | Literal comparison, exact match       | *by omision*    | ``f:/file -> file_content``                     |
    +---------------------------------------+-----------------+-------------------------------------------------+
    | Regular expression                    | ``r:``          | ``f:/file -> r:file_content``                   |
    +---------------------------------------+-----------------+-------------------------------------------------+
    | Numeric comparison (integers)         | ``n:``          | ``f:/file -> n:(regex_capture_group) <= VALUE`` |
    +---------------------------------------+-----------------+-------------------------------------------------+

A whole rule can be negated using the operator ``not``, which is placed at the beginng the rule to be negated.

.. code-block:: yaml

    not RULE

Example: ``not f:/some_file -> some_text`` will **fail** if `some_text` is found within the contents of `some_file`.

By combining the aforementioned rule types and operators, both existence and content checking can be performed.

.. attention::
    - **Process** rules only allow existence checks.
    - **Command** rules only allow content (output) checks.

Existence checking rules
######################################

Existence checks are created by setting rules without a content operator, the general form is as follows:

.. code-block:: yaml

    RULE_TYPE:target

Examples of existence checks:

- ``f:/etc/sshd_config`` checks the existence of file */etc/ssh_config*
- ``d:/etc`` checks the existence of directory */etc*
- ``not p:sshd`` will test the presence of processes called *sshd* and fail if one is found.
- ``r:HKEY_LOCAL_MACHINE\System\CurrentControlSet\Control\Lsa`` checks for the existence of that key.
- ``r:HKEY_LOCAL_MACHINE\System\CurrentControlSet\Control\Lsa -> LimitBlankPasswordUse`` checks for the existence of value *LimitBlankPasswordUse* in the key.

Content checking rules
######################################

The general form of a rule testing for contents is as follows:

.. code-block:: yaml

    RULE_TYPE:target -> CONTENT_OPERATOR:value

.. attention::
    - The context of a content check is limited to a **line**.
    - It is **mandatory** to respect the spaces arround the ``->`` separator.
    - If the **target** of a rule that checks for contents does not exist, the result will be **non-applicable** as it could not be checked.

Content check operator results can be negated by adding a ``!`` before then, for example:

.. code-block:: yaml

    f:/etc/ssh_config -> !r:PermitRootLogin

.. attention::
    Be carefull when negating content operators as that will make then evaluate as  **passed** for **anything** that does not match with the check specified.
    For example rule ```f:/etc/ssh_config -> !r:PermitRootLogin``` will be evalauted as **passed** if it finds **any line** that does not contain ``PermitRootLogin``.

Content check operators can be chained ussing the operator ``&&`` (AND) as follows:

.. code-block:: yaml

    f:/etc/ssh_config -> !r:^# && r:Protocol && r:2

This test reads as `Pass if there's a line whose first character is no "#" and contains "Protocol" and "2"`.

.. attention::
    - It is **mandatory** to respect the spaces arround the ``&&`` operator.
    - There's no particular order of evaluation between tests chained using the ``&&`` operator.

Examples of content checks:

- ``d:/etc/`` checks the existence of directory */etc*
- ``not p:sshd`` will test the presence of processes called *sshd* and fail if one is found.
- Checking a numeric value ``c:command -> n:REGEX_WITH_A_CAPTURE_GROUP compare >= number``
- ``r:HKEY_LOCAL_MACHINE\System\CurrentControlSet\Control\Lsa -> LimitBlankPasswordUse -> 1`` checks that value of *LimitBlankPasswordUse* is 1.

Examples
###################

- ``r:HKEY_LOCAL_MACHINE\System\CurrentControlSet\Control\Lsa -> LimitBlankPasswordUse -> 1`` checks that the value data of *LimitBlankPasswordUse* is *1*

In order to better understand the syntax of the rules is important to note that:

- The *type* of a rule references the `location` (i.e, a file or a command output) where the rule will look for the content of the check. Every rule has to start with a location.

- The location is commonly followed by the content to look for. It is accepted a literal string or a lightweight regular expression preceded by ``r:`` (the supported Regex syntax can be found :doc:`here <../../ruleset/ruleset-xml-syntax/regex>`).

- As explained before, the most common rules have the format ``type:location -> r:REGEX``. However, there are exceptions, for example, for Windows registries, we would have to add the registry key in the middle of the rule.

Content operators can be aggregated using the ``&&`` (AND) operator, for example

The following sections cover each rule type, illustrating them with several examples.

Rule syntax for files
:::::::::::::::::::::::::::::::::::

- Checking that a file exists: ``f:/path/to/file``
- Checking that a file does not exists: ``not f:/path/to/file``
- Checking file contains (whole line literal match): ``f:/path/to/file -> content``
- Checking file contents against regex: ``f:/path/to/file -> r:REGEX``
- Checking a numeric value: ``f:/path/to/file -> n:REGEX(\d+) compare <= Number``

Rule syntax for directories
:::::::::::::::::::::::::::::::::::

- Checking that a directory exists: ``d:/path/to/directory``
- Checking that a directory contains a file: ``d:/path/to/directory -> file``
- Checking that a directory contains files that match a regex: ``d:/path/to/directory -> r:^files``
- Checking files matching ``file_name`` for content: ``d:/path/to/directory -> file_name -> content``

Rule syntax for processes
:::::::::::::::::::::::::::::::::::

- Checking that a process is running ``p:process_name``
- Checking that a process is **not** running ``not p:process_name``

Rule syntax for commands
:::::::::::::::::::::::::::::::::::

- Checking the output of a command ``c:command -> output``
- Checking the output of a command using regex ``c:command -> r:REGEX``
- Checking a numeric value ``c:command -> n:REGEX_WITH_A_CAPTURE_GROUP compare >= number``

Rule syntax for Windows Registry
:::::::::::::::::::::::::::::::::::

- Checking that a registry exists ``r:path/to/registry``
- Checking that a registry key exists ``r:path/to/registry -> key``
- Checking a registry key content ``r:path/to/registry -> key -> content``

Composed rules:
:::::::::::::::::::::::::::::::::::

- Checking that there is a line that does not begin with ``#`` and contains ``Port 22``
  | ``f:/etc/ssh/sshd_config -> !r:^# && r:Port\.+22``

- Checking that there is **no** line that does not begin with ``#`` and contains ``Port 22``
  | ``not f:/etc/ssh/sshd_config -> !r:^# && r:Port\.+22``

Other examples:
:::::::::::::::::::::::::::::::::::

- Looking at the value inside a file: ``f:/proc/sys/net/ipv4/ip_forward -> 1``
- Checking if a file exists: ``f:/proc/sys/net/ipv4/ip_forward``
- Checking if a process is running: ``p:avahi-daemon``
- Looking at the value of a registry: ``r:HKEY_LOCAL_MACHINE\System\CurrentControlSet\Services\Netlogon\Parameters -> MaximumPasswordAge -> 0``
- Looking if a directory contains files: ``d:/home/* -> ^.mysql_history$``
- Checking if a directory exists: ``d:/etc/mysql``
- Check the running configuration of ssh to check the maximum authentication tries: ``c:sshd -T -> !r:^\s*maxauthtries\s+4\s*$``
- Check if root is the only UID 0 account ``f:/etc/passwd -> !r:^# && !r:^root: && r:^\w+:\w+:0:``
