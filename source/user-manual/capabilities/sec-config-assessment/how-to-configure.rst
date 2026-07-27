.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Learn how to configure the Wazuh Security Configuration Assessment module, manage SCA policies, and create custom SCA policies.

Configuration
=============

The Wazuh SCA module is enabled by default on Wazuh agents, allowing security configuration assessments to run automatically without additional configuration. The following sections describe how to manage SCA policies, customize the module configuration, and create custom policies for your environment.

The SCA module is configured in the Wazuh agent configuration file under the ``<sca>`` section. By default, the configuration file is located in the following paths:

- Linux and other Unix-based systems: ``/var/ossec/etc/ossec.conf``.
- Windows: ``C:\Program Files (x86)\ossec-agent\ossec.conf``.
- macOS: ``/Library/Ossec/etc/ossec.conf``.

The following example shows the SCA configuration with the available configuration options. You can modify these options to customize how the Wazuh agent performs security configuration assessments.

.. code-block:: xml

   <sca>
     <!-- General settings -->
     <enabled>yes</enabled>
     <scan_on_start>yes</scan_on_start>
     <interval>12h</interval>
     <max_eps>100</max_eps>
     <!-- SCA policies -->
     <policies>
       <policy>/var/ossec/etc/shared/cis_debian10.yml</policy>
       <policy>/var/ossec/etc/shared/cis_apache_24.yml</policy>
       <policy enabled="no">/custom/policies/disabled_policy.yml</policy>
     </policies>
     <!-- Database synchronization settings -->
     <synchronization>
       <enabled>yes</enabled>
       <interval>5m</interval>
       <integrity_interval>1h</integrity_interval>
       <max_eps>75</max_eps>
     </synchronization>
   </sca>

Where:

- ``<enabled>``: Enables or disables the Wazuh SCA module.
- ``<scan_on_start>``: Runs an SCA scan immediately after the Wazuh agent starts.
- ``<interval>``: Specifies how often the Wazuh agent performs SCA scans.
- ``<max_eps>``: Limits the maximum number of SCA events per second that the Wazuh agent can generate.
- ``<synchronization>``: Configures how the Wazuh agent synchronizes SCA state with the Wazuh manager.

  - ``<enabled>``: Enables or disables SCA state synchronization between the Wazuh agent and the Wazuh manager. The default value is ``yes``.
  - ``<interval>``: Defines how often the Wazuh agent initiates the synchronization process with the Wazuh manager to synchronize SCA state data.
  - ``<integrity_interval>``: Specifies how often the Wazuh agent performs an integrity check to verify that the SCA policy files match those stored on the Wazuh manager.
  - ``<response_timeout>``: Specifies how long the Wazuh agent waits for a synchronization response before timing out.
  - ``<max_eps>``: Specifies the maximum number of SCA synchronization events that the Wazuh agent can send per second.

- Optional

  - ``<policies>``: Contains the list of SCA policy files that the Wazuh agent loads.

    - ``<policy>``: Specifies an individual SCA policy file. Set ``enabled="no"`` to disable a policy without removing it from the configuration.

For a detailed description of the SCA configuration parameters, check the SCA reference.

Enabling and disabling policies
--------------------------------

By default, the Wazuh agent scans every policy (``.yaml`` or ``.yml`` file) in its ruleset folder:

- Linux and Unix-based agents: ``/var/ossec/ruleset/sca``.
- Windows agents: ``C:\Program Files (x86)\ossec-agent\ruleset\sca``.
- macOS agents: ``/Library/Ossec/ruleset/sca``.

.. note::

   Installations and updates don't preserve the contents of these default ruleset folders. Place your policies under an alternative folder if you want to modify or add new ones.

To enable a policy file outside the Wazuh agent installation folder, add the policy file path to the ``<sca>`` block in the Wazuh agent configuration file. For example:

.. code-block:: xml

   <sca>
     <policies>
       <policy><FULLPATH_TO_CUSTOM_SCA_POLICY_FILE></policy>
     </policies>
   </sca>

You can also specify a path relative to the Wazuh installation directory:

.. code-block:: xml

   <sca>
     <policies>
       <policy>etc/shared/<CUSTOM_SCA_POLICY_FILE></policy>
     </policies>
   </sca>

You can disable policies on the Wazuh agent in two ways. The simplest is to rename the policy file by adding ``.disabled`` (or anything other than ``.yaml`` or ``.yml``) after its YAML extension.

The second way is to disable the policy from the Wazuh agent ``ossec.conf`` file by adding a line like the following to the ``<policy>`` section of the SCA module:

.. code-block:: xml

   <sca>
     <policies>
       <policy enabled="no">etc/shared/<POLICY_FILE_TO_DISABLE></policy>
     </policies>
   </sca>

Managing SCA policies using centralized configuration
-------------------------------------------------------

As described in the centralized configuration section, the Wazuh manager can push files and configurations to connected Wazuh agents.

You can enable this feature to push policy files to Wazuh agents in defined groups. By default, every Wazuh agent belongs to the ``default`` group, which is used here as an example:

#. Edit the Wazuh agent ``local_internal_options.conf`` file to allow SCA policies sent from the Wazuh manager to execute commands:

   .. tabs::

      .. group-tab:: Linux

         .. code-block:: console

            # echo "sca.remote_commands=1" >> /var/ossec/etc/local_internal_options.conf

      .. group-tab:: Windows

         .. code-block:: doscon

            > notepad "C:\Program Files (x86)\ossec-agent\local_internal_options.conf"

         Append the command ``sca.remote_commands=1``.

      .. group-tab:: macOS

         .. code-block:: console

            # echo "sca.remote_commands=1" >> /Library/Ossec/etc/local_internal_options.conf

   .. note::

      Enabling remote command execution lets the Wazuh manager execute commands on the monitored endpoint. Remote commands are disabled by default as a security measure, which helps reduce the attack surface if the Wazuh manager is compromised. You don't need to enable remote commands if you add the policy files to each agent without using Wazuh to push them. For example, you can create the policy file directly on the monitored endpoint, or use ``scp`` to copy it there.

#. On the Wazuh manager, place a new policy file in the ``/var/ossec/etc/shared/default`` folder and change its ownership. Replace ``<NEW_POLICY_FILE>`` with your policy name:

   .. code-block:: console

      # chown wazuh:wazuh /var/ossec/etc/shared/default/<NEW_SCA_POLICY_FILE>

#. Add the following configuration block to the Wazuh manager ``/var/ossec/etc/shared/default/agent.conf`` file to configure the new policy file in the Wazuh agent:

   .. code-block:: xml
      :emphasize-lines: 5

      <agent_config>
        <!-- Shared agent configuration here -->
        <sca>
          <policies>
            <policy>etc/shared/<NEW_POLICY_FILE></policy>
          </policies>
        </sca>
      </agent_config>

   Wazuh saves every file pushed remotely from the server in the ``/<WAZUH_HOME_DIRECTORY>/etc/shared/`` directory on the agent endpoints, regardless of the group they belong to. We specify the policy's relative file path in the configuration because the full file path might differ depending on the endpoint's operating system.

The new ``<sca>`` block in the Wazuh manager ``/var/ossec/etc/shared/default/agent.conf`` file merges with the ``<sca>`` block on the Wazuh agent side, and Wazuh adds the new configuration.

.. _sca_creating_custom_policies:

Creating custom SCA policies
------------------------------

Wazuh has built-in SCA policies for common operating systems and applications. However, you can also create custom SCA policies to assess security configurations that are specific to your environment, internal security standards, or third-party applications that are not covered by the default policies.

Every custom SCA policy is defined in a YAML file. You need to consider the following four sections when creating a custom policy file, although not all of them are required.

.. _sca_policy_file_sections:

.. table:: Policy file sections
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

An SCA policy looks like the following:

.. code-block:: YAML
   :emphasize-lines: 10,18,27,31

   # Security Configuration Assessment
   # Audit for UNIX systems
   # Copyright (C) 2015, Wazuh Inc.
   #
   # This program is free software; you can redistribute it
   # and/or modify it under the terms of the GNU General Public
   # License (version 2) as published by the FSF - Free Software
   # Foundation

   policy:
     id: "unix_audit"
     file: "sca_unix_audit.yml"
     name: "System audit for Unix based systems"
     description: "Guidance for establishing a secure configuration for Unix based systems."
     references:
       - https://www.ssh.com/ssh/

   requirements:
     title: "Check that the SSH service and password-related files are present on the system"
     description: "Requirements for running the SCA scan against the Unix based systems policy."
     condition: any
     rules:
       - 'f:$sshd_file'
       - 'f:/etc/passwd'
       - 'f:/etc/shadow'

   variables:
     $sshd_file: /etc/ssh/sshd_config
     $pam_d_files: /etc/pam.d/common-password,/etc/pam.d/password-auth,/etc/pam.d/system-auth,/etc/pam.d/system-auth-ac,/etc/pam.d/passwd

   checks:
     - id: 3000
       title: "SSH Hardening: Port should not be 22"
       description: "The ssh daemon should not be listening on port 22 (the default value) for incoming connections."
       rationale: "Changing the default port you may reduce the number of successful attacks from zombie bots, an attacker or bot doing port-scanning can quickly identify your SSH port."
       remediation: "Change the Port option value in the sshd_config file."
       compliance:
         - pci_dss: ["2.2.4"]
         - nist_800_53: ["CM.1"]
       condition: all
       rules:
         - 'f:$sshd_file -> !r:^# && r:Port && !r:\s*\t*22$'

     - id: 3001
       title: "SSH Hardening: Protocol should be set to 2"

.. note::
   If the ``requirements`` aren't satisfied for a specific policy file, the scan for that file won't start.

Policy section
^^^^^^^^^^^^^^

The policy section defines the metadata for the SCA policy, including its identifier, name, description, and other general attributes.

.. _sca_policy_file_policy_section:
.. table:: Policy section

   +--------------------+----------------+-------------------+-------------------------------+------------------------+
   | Field              | Mandatory      | Type              | Allowed values                | Description            |
   +====================+================+===================+===============================+========================+
   | id                 | Yes            | String            | Any string                    | Policy ID              |
   +--------------------+----------------+-------------------+-------------------------------+------------------------+
   | file               | Yes            | String            | Any string                    | Policy filename        |
   +--------------------+----------------+-------------------+-------------------------------+------------------------+
   | name               | Yes            | String            | Any string                    | Policy title           |
   +--------------------+----------------+-------------------+-------------------------------+------------------------+
   | description        | Yes            | String            | Any string                    | Brief description      |
   +--------------------+----------------+-------------------+-------------------------------+------------------------+
   | references         | No             | Array of strings  | Any string (empty by default) | Links to references    |
   +--------------------+----------------+-------------------+-------------------------------+------------------------+
   | regex_type         | No             | String            | "osregex" (default), "pcre2"  | Policy regex engine    |
   +--------------------+----------------+-------------------+-------------------------------+------------------------+

Requirement section
^^^^^^^^^^^^^^^^^^^^

Requirements determine whether a policy should run on an endpoint before any checks are evaluated. If the requirements are not met, the policy is skipped. The **requirements** section specifies the conditions that determine whether a policy should run on an endpoint. Use this section to restrict policy execution based on factors such as the operating system, installed packages, or other system characteristics.

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

Variables section
^^^^^^^^^^^^^^^^^^

The variables section defines reusable values that can be referenced throughout the policy. Using variables reduces duplication and simplifies policy maintenance when the same value is used in multiple checks. There is no limit on the number of variables to add within a rule.

.. _sca_policy_file_variables_section:
.. table:: Variables section

   +--------------------+----------------+-------------------+------------------------+
   | Field              | Mandatory      | Type              | Allowed values         |
   +====================+================+===================+========================+
   | variable_name      | Yes            | Array of strings  | Any string             |
   +--------------------+----------------+-------------------+------------------------+

The variable names are preceded by ``$``. For example:

- ``$list_of_files``: ``/etc/ssh/sshd_config``, ``/etc/sysctl.conf``, ``/var/log/dmesg``
- ``$list_of_folders``: ``/etc``, ``/var``, ``/tmp``
- ``$program_name``: ``apache2``

Variables can be placed anywhere in the left part of the rule. Therefore, regarding the variables above, the following rules could be built:

.. code-block:: yaml

    f:$list_of_files -> r:^Content to be found
    c:systemctl is-enabled $program_name -> r:^enabled

Checks section
^^^^^^^^^^^^^^

.. _sca_check_overview:

The checks section contains the security checks performed during policy evaluation. Each check defines the condition to verify, the expected result, and the remediation guidance presented when a check fails. Each check is composed of several fields as described in the table below:

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
   | regex_type  |    No     |           String           |"pcre2" or "osregex"|
   +-------------+-----------+----------------------------+--------------------+

Check evaluation is governed by its rule result aggregation strategy, as set in its ``condition`` field, and the results of
the evaluation of its rules.

.. note::

   -  The ``id`` field under the ``policy`` and ``checks`` sections must be unique across policy files.
   -  If you set a ``regex_type``, it overrides the regex engine type defined in the policy.

Condition
~~~~~~~~~

The result of each SCA check is governed by the conditions set in the ``condition`` field, and the results of the evaluation of its rules. The condition field specifies how rule results are aggregated in order to calculate the final value of a check. There are three options:

- ``all``: The check is evaluated as **Passed** if all of its rules are satisfied and as **Failed** as soon as one rule is not satisfied.
- ``any``: The check is evaluated as **Passed** as soon as any of its rules are satisfied.
- ``none``: The check is evaluated as **Passed** if none of its rules are satisfied and as **Failed** as soon as one rule is satisfied.

There are certain situations in which the aforementioned aggregators are evaluated as **Not applicable**.

- ``all``: If any rule returns **Not applicable**, and no rule returns **Failed**, the result is **Not applicable**.
- ``any``: The check is evaluated as **Not applicable** if no rule is evaluated as **Passed** and any rule returns **Not applicable**.
- ``none``: The check is evaluated as **Not applicable** if no rule is evaluated as **Passed** and any rule returns **Not applicable**.

.. table:: Condition / rule evaluation
   :widths: auto

   +------------------------------+-------------+-------------+-------------------+--------------------+
   | Condition \\ Rule evaluation |  Passed     |  Failed     | Not applicable    |     Result         |
   +==============================+=============+=============+===================+====================+
   |            ``all``           |     yes     |      no     |         no        |     Passed         |
   +------------------------------+-------------+-------------+-------------------+--------------------+
   |            ``all``           | \*          |      no     |        yes        |  Not applicable    |
   +------------------------------+-------------+-------------+-------------------+--------------------+
   |            ``all``           | \*          |     yes     | \*                |     Failed         |
   +------------------------------+-------------+-------------+-------------------+--------------------+
   |            ``any``           |     yes     | \*          | \*                |     Passed         |
   +------------------------------+-------------+-------------+-------------------+--------------------+
   |            ``any``           |      no     |     yes     |         no        |     Failed         |
   +------------------------------+-------------+-------------+-------------------+--------------------+
   |            ``any``           |      no     |  \*         |        yes        |  Not applicable    |
   +------------------------------+-------------+-------------+-------------------+--------------------+
   |           ``none``           |     yes     |  \*         | \*                |     Failed         |
   +------------------------------+-------------+-------------+-------------------+--------------------+
   |           ``none``           |      no     |  \*         |        yes        |  Not applicable    |
   +------------------------------+-------------+-------------+-------------------+--------------------+
   |           ``none``           |      no     |     yes     |         no        |     Passed         |
   +------------------------------+-------------+-------------+-------------------+--------------------+

\*: This result does not affect the final result.

Rules
~~~~~

Rules can check for the existence of files, directories, registry keys and values, running processes, and recursively test for the existence of files inside directories. When it comes to content checking, they are able to check for file contents, recursively check for the contents of files inside directories, command output, and registry value data.

Abstractly, rules start with a location and a type of location that is the target of the test, followed by the actual test specification. Such tests fall into two categories: existence and content checks. The type of location is listed in the :ref:`Rule types<rule_types>` table below, and the location could be a file name, directory, process name, command, or a registry key.

.. _rule_types:

There are five main types of rules as described below.

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

The operators for content checking are shown in the content comparison operators table below.

.. table:: Content comparison operators
   :widths: auto

   +--------------------------------------+------------------------------------------------------------------------------------------+------------------------------------------------------------+
   | Operation                            | Operator                                                                                 | Example                                                    |
   +======================================+==========================================================================================+============================================================+
   | Literal comparison, exact match      | *by omission (the absence of an operator signifies a literal comparison or exact match)* | ``f:/file -> CONTENT``                                     |
   +--------------------------------------+------------------------------------------------------------------------------------------+------------------------------------------------------------+
   | Lightweight Regular expression match | ``r:``                                                                                   | ``f:/file -> r:REGEX``                                     |
   +--------------------------------------+------------------------------------------------------------------------------------------+------------------------------------------------------------+
   | Numeric comparison (integers)        | ``n:``                                                                                   | ``f:/file -> n:REGEX_WITH_CAPTURE_GROUP compare <= VALUE`` |
   +--------------------------------------+------------------------------------------------------------------------------------------+------------------------------------------------------------+

The operators for numeric comparison are shown in the table below.

.. table:: Numeric comparison operators
   :widths: auto

   +--------------------------------+----------+---------------------------------------+
   | Arithmetic relational operator | Operator | Example                               |
   +================================+==========+=======================================+
   | less than                      | ``<``    | ``n:SomeProperty (\d) compare < 42``  |
   +--------------------------------+----------+---------------------------------------+
   | less than or equal to          | ``<=``   | ``n:SomeProperty (\d) compare <= 42`` |
   +--------------------------------+----------+---------------------------------------+
   | equal to                       | ``==``   | ``n:SomeProperty (\d) compare == 42`` |
   +--------------------------------+----------+---------------------------------------+
   | not equal to                   | ``!=``   | ``n:SomeProperty (\d) compare != 42`` |
   +--------------------------------+----------+---------------------------------------+
   | greater than or equal to       | ``>=``   | ``n:SomeProperty (\d) compare >= 42`` |
   +--------------------------------+----------+---------------------------------------+
   | greater than                   | ``>``    | ``n:SomeProperty (\d) compare > 42``  |
   +--------------------------------+----------+---------------------------------------+

You can place ``not`` at the beginning of a rule to negate it. For example:

.. code-block:: yaml

    not f:/some_file -> some_text

The SCA rule above fails if ``some_text`` is found within the contents of ``some_file``.

By combining the aforementioned rule types and operators, both existence and content checking can be performed.

.. note::
    - **Process** rules only allow existence checks.
    - **Command** rules only allow content (output) checks.

Existence checking rules
'''''''''''''''''''''''''

Existence checks are created by setting rules without a content operator. The general form is as follows:

.. code-block:: yaml

    RULE_TYPE:target

Examples of existence checks:

- ``f:/etc/sshd_config`` checks the existence of ``/etc/sshd_config`` file.
- ``d:/etc`` checks the existence of the ``/etc`` directory.
- ``not p:sshd`` tests the presence of processes called ``sshd`` and fails if one is found.
- ``r:HKEY_LOCAL_MACHINE\System\CurrentControlSet\Control\Lsa`` checks for the existence of the ``HKEY_LOCAL_MACHINE\System\CurrentControlSet\Control\Lsa`` key.
- ``r:HKEY_LOCAL_MACHINE\System\CurrentControlSet\Control\Lsa -> LimitBlankPasswordUse`` checks for the existence of the ``LimitBlankPasswordUse`` value in the key.

Content checking rules
'''''''''''''''''''''''

The general form of a rule testing for contents is as follows:

.. code-block:: yaml

    RULE_TYPE:target -> CONTENT_OPERATOR:value

.. warning::
    - The context of a content check is limited to a **line**.
    - It is **mandatory** to respect the spaces around the ``->`` and ``compare`` separators.
    - If the **target** of a rule that checks for contents does not exist, the result will be ``Not applicable`` as it could not be checked.

Content check operator results can be negated by adding a ``!`` before them, for example:

.. code-block:: yaml

    f:/etc/ssh_config -> !r:PermitRootLogin

.. warning::

    Be careful when negating content operators as that makes them evaluate as **Passed** for anything that does not match with the check specified. For example, rule ``f:/etc/ssh_config -> !r:PermitRootLogin`` is evaluated as Passed if it finds any line that does not contain ``PermitRootLogin``.

Content check operators can be chained using the operator ``&&`` (AND) as follows:

.. code-block:: yaml

    f:/etc/ssh_config -> !r:^# && r:Protocol && r:2

This rule reads as Pass if there's a line whose first character is not ``#`` and contains ``Protocol`` and ``2``.

.. warning::
    - It is mandatory to respect the spaces around the ``&&`` operator.
    - There's no particular order of evaluation between tests chained using the ``&&`` operator.

Examples of content checks:

- ``c:systemctl is-enabled cups -> r:^enabled`` checks that the output of the command contains a line starting with enabled.
- ``f:$sshd_file -> n:^\s*MaxAuthTries\s*\t*(\d+) compare <= 4`` checks that MaxAuthTries is less or equal to 4.
- ``r:HKEY_LOCAL_MACHINE\System\CurrentControlSet\Control\Lsa -> LimitBlankPasswordUse -> 1`` checks that the value of ``LimitBlankPasswordUse`` is 1.

Examples
'''''''''

The following sections cover each rule type, illustrating them with several examples. It is also recommended to check the actual policies and, for minimalistic although complete examples, the `SCA test suite policies
<https://github.com/wazuh/wazuh-qa/tree/master/tests/legacy/test_sca/test_basic_usage/data>`_.

.. rubric:: Rule syntax for files

- Check that a file exists: ``f:<PATH_TO_FILE>``
- Check that a file does not exist: ``not f:<PATH_TO_FILE>``
- Check a file for an exact line match: ``f:<PATH_TO_FILE> -> <CONTENT>``
- Check file contents against a regular expression: ``f:<PATH_TO_FILE> -> r:<REGEX>``
- Check whether a numeric value meets a specified condition: ``f:<PATH_TO_FILE> -> n:<REGEX> compare <OPERATOR> <NUMBER>``

.. rubric:: Rule syntax for directories

- Check if a directory exists: ``d:/<PATH_TO_DIRECTORY>``
- Check whether a directory contains a specified file: ``d:/<PATH_TO_DIRECTORY> -> <FILE>``
- Check whether a directory contains files matching a regular expression: ``d:/<PATH_TO_DIRECTORY> -> r:^files``
- Check the contents of a specified file within a directory: ``d:/<PATH_TO_DIRECTORY> -> <FILE_NAME> -> <CONTENT>``

.. rubric:: Rule syntax for processes

- Check if a process is running: ``p:<PROCESS_NAME>``
- Check if a process is **not** running: ``not p:<PROCESS_NAME>``

.. rubric:: Rule syntax for commands

- Check command output for an exact match: ``c:<COMMAND> -> <OUTPUT>``
- Check the output of a command using regex: ``c:<COMMAND> -> r:<REGEX>``
- Check whether a numeric value in command output meets a specified condition: ``c:<COMMAND> -> n:<REGEX_WITH_A_CAPTURE_GROUP> compare >= <NUMBER>``

.. rubric:: Rule syntax for Windows Registry

- Check if a registry key exists: ``r:<PATH_TO_REGISTRY> -> <KEY>``
- Check registry key contents: ``r:<PATH_TO_DIRECTORY> -> <KEY> -> <CONTENT>``

.. rubric:: Composite rules

- Check if there is a line that does not begin with ``#`` and contains ``Port 22``: ``f:/etc/ssh/sshd_config -> !r:^# && r:Port\.+22``
- Check if there is no line that does not begin with ``#`` and contains ``Port 22``: ``not f:/etc/ssh/sshd_config -> !r:^# && r:Port\.+22``

.. rubric:: Other examples

- Check for file contents, whole line match: ``f:/proc/sys/net/ipv4/ip_forward -> 1``
- Check if a file exists: ``f:/proc/sys/net/ipv4/ip_forward``
- Check if a process is running: ``p:avahi-daemon``
- Check value of registry: ``r:HKEY_LOCAL_MACHINE\System\CurrentControlSet\Services\Netlogon\Parameters -> MaximumPasswordAge -> 0``
- Check if a directory contains files: ``d:/home -> ^.mysql_history$``
- Check if a directory exists: ``d:/etc/mysql``
- Check the running configuration of sshd for the maximum authentication tries allowed: ``c:sshd -T -> !r:^\s*maxauthtries\s+4\s*$``
- Check if root is the only account with UID 0: ``f:/etc/passwd -> !r:^# && !r:^root: && r:^\w+:\w+:0:``
