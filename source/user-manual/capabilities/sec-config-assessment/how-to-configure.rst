.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Learn how to configure the Wazuh Security Configuration Assessment module, manage SCA policies, and create custom SCA policies.

Configuring Security Configuration Assessment
=============================================

The Wazuh SCA module is enabled by default on Wazuh agents.

The SCA module is configured in the Wazuh agent configuration file under the ``<sca>`` section. By default, the configuration file is located in the following paths:

- Linux and other Unix-based systems: ``/var/ossec/etc/ossec.conf``
- Windows: ``C:\Program Files (x86)\ossec-agent\ossec.conf``
- macOS: ``/Library/Ossec/etc/ossec.conf``

The following ``<sca>`` block is the default SCA configuration in the Wazuh agent configuration file.

.. code-block:: xml

   <sca>
     <enabled>yes</enabled>
     <scan_on_start>yes</scan_on_start>
     <interval>12h</interval>
     <!-- Database synchronization settings -->
     <synchronization>
       <enabled>yes</enabled>
       <interval>5m</interval>
       <integrity_interval>24h</integrity_interval>
     </synchronization>
   </sca>

Where:

- ``<enabled>``: Enables or disables the Wazuh SCA module. The default value is yes.
- ``<scan_on_start>``: Runs an SCA scan immediately after the Wazuh agent starts. The default value is yes.
- ``<interval>``: Specifies how often the Wazuh agent performs SCA scans. The value is a number followed by s, m, h, or d. The default value is 1d, and the installed Wazuh agent configuration file sets 12h.
- ``<synchronization>``: Configures how the Wazuh agent synchronizes SCA state with the Wazuh manager.

  - ``<enabled>``: Enables or disables SCA state synchronization between the Wazuh agent and the Wazuh manager. The default value is ``yes``.
  - ``<interval>``: Defines how often the Wazuh agent synchronizes SCA state data with the Wazuh manager. The default value is 5m.
  - ``<integrity_interval>``: Specifies how often the Wazuh agent checks that its synchronized SCA results match the state in the Wazuh indexer. On a mismatch, the Wazuh agent sends all its SCA results again. The default value is 24h. Set it to 0 to turn off this check.

- **Optional**

  - ``<policies>``: Contains the list of SCA policy files that the Wazuh agent loads.

    - ``<policy>``: Specifies an individual SCA policy file. Set ``enabled="no"`` to disable a policy without removing it from the configuration.

For all the options, see the :doc:`SCA reference </user-manual/reference/ossec-conf/sca>`.

.. _sca_enabling_and_disabling_policies:

Enabling and disabling policies
--------------------------------

By default, the Wazuh agent scans every policy (``.yaml`` or ``.yml`` file) in its ruleset directory:

- Linux and Unix-based endpoints: ``/var/ossec/ruleset/sca``.
- Windows endpoints: ``C:\Program Files (x86)\ossec-agent\ruleset\sca``.
- macOS endpoints: ``/Library/Ossec/ruleset/sca``.

.. note::

   Installations and updates don't preserve the contents of these default ruleset directories. Store new or modified policies in a different directory.

There are two ways to disable policies on the Wazuh agent. The simplest method is to rename the policy file with an extension other than ``.yaml`` or ``.yml``.

Alternatively, disable a policy in the Wazuh agent configuration file ``ossec.conf`` by setting the ``enabled`` attribute to ``no``. Add the following ``<sca>`` block inside the ``<ossec_config>`` block.

To disable a policy included with the Wazuh agent, specify its path relative to the Wazuh installation directory:

.. code-block:: xml

   <sca>
     <policies>
       <policy enabled="no">ruleset/sca/<POLICY_FILE_TO_DISABLE></policy>
     </policies>
   </sca>

For a policy distributed through centralized configuration, use its path in the ``etc/shared`` directory on Linux and macOS endpoints, or in the ``shared`` directory on Windows endpoints:

.. code-block:: xml

   <sca>
     <policies>
       <policy enabled="no">etc/shared/<POLICY_FILE_TO_DISABLE></policy>
     </policies>
   </sca>

.. code-block:: xml

   <sca>
     <policies>
       <policy enabled="no">shared\<POLICY_FILE_TO_DISABLE></policy>
     </policies>
   </sca>

You can also specify an absolute path to the policy file.

Restart the Wazuh agent to apply the change. If the ``<sca>`` block is outside the ``<ossec_config>`` block, the Wazuh agent fails to start and logs ``Invalid element in the configuration: 'sca'``.

.. tabs::

   .. group-tab:: Linux

      .. code-block:: console

         # systemctl restart wazuh-agent

   .. group-tab:: Windows

      .. code-block:: pwsh-session

         > Restart-Service -Name WazuhSvc

   .. group-tab:: macOS

      .. code-block:: console

         # /Library/Ossec/bin/wazuh-control restart

After the restart, the Wazuh agent deletes the results of the disabled policy from the Wazuh indexer. The policy then leaves the **Inventory** tab.

Managing SCA policies using centralized configuration
-------------------------------------------------------

As described in the :doc:`centralized configuration section </user-manual/reference/centralized-configuration>`, the Wazuh manager can push files and configurations to connected Wazuh agents.

You can use centralized configuration to push policy files to a group of Wazuh agents. The following steps use the ``default`` group, which every Wazuh agent belongs to:

#. If the policy files you push contain command rules, edit the Wazuh agent ``local_internal_options.conf`` file to let the Wazuh agent run them:

   .. tabs::

      .. group-tab:: Linux

         .. code-block:: console

            # echo "sca.remote_commands=1" >> /var/ossec/etc/local_internal_options.conf

      .. group-tab:: Windows

         .. code-block:: doscon

            > notepad "C:\Program Files (x86)\ossec-agent\local_internal_options.conf"

         Append the line ``sca.remote_commands=1`` to the file.

      .. group-tab:: macOS

         .. code-block:: console

            # echo "sca.remote_commands=1" >> /Library/Ossec/etc/local_internal_options.conf

   .. note::

      Remote commands let the Wazuh manager run commands on the monitored endpoint. They're disabled by default to reduce the attack surface if the Wazuh manager is compromised.

      You don't need them for a policy that you copy to the endpoint and enable in the Wazuh agent ``ossec.conf`` file. A policy enabled in ``agent.conf`` is a remote policy unless its file is in the ``ruleset/sca`` directory, and its command rules need remote commands. Without them, the Wazuh agent still evaluates the policy but reports its command checks as **Not applicable**, with the reason ``Remote commands are disabled for this policy``.

#. Restart the Wazuh agent to apply the change. The Wazuh agent reads ``local_internal_options.conf`` only when it starts:

   .. tabs::

      .. group-tab:: Linux

         .. code-block:: console

            # systemctl restart wazuh-agent

      .. group-tab:: Windows

         .. code-block:: pwsh-session

            > Restart-Service -Name WazuhSvc

      .. group-tab:: macOS

         .. code-block:: console

            # /Library/Ossec/bin/wazuh-control restart

#. On the Wazuh manager, place a new policy file in the ``/etc/wazuh-manager/shared/default`` directory and change its ownership. Replace ``<NEW_POLICY_FILE>`` with your policy name:

   .. code-block:: console

      # chown wazuh-manager:wazuh-manager /etc/wazuh-manager/shared/default/<NEW_POLICY_FILE>

#. Add the following configuration block to the Wazuh manager ``/etc/wazuh-manager/shared/default/agent.conf`` file to configure the new policy file in the Wazuh agent:

   .. code-block:: xml

      <agent_config os="Linux">
        <sca>
          <policies>
            <policy>etc/shared/<NEW_POLICY_FILE></policy>
          </policies>
        </sca>
      </agent_config>

      <agent_config os="macOS">
        <sca>
          <policies>
            <policy>etc/shared/<NEW_POLICY_FILE></policy>
          </policies>
        </sca>
      </agent_config>

      <agent_config os="Windows">
        <sca>
          <policies>
            <policy>shared\<NEW_POLICY_FILE></policy>
          </policies>
        </sca>
      </agent_config>

   The Wazuh agent saves all files pushed from the Wazuh manager in the ``etc/shared/`` directory on Linux and macOS endpoints and in the ``shared\`` directory on Windows endpoints, regardless of the group they belong to. We specify the relative file path of the policy because the installation directory differs between operating systems.

The new ``<sca>`` block in the Wazuh manager ``/etc/wazuh-manager/shared/default/agent.conf`` file merges with the ``<sca>`` block in the Wazuh agent ``ossec.conf`` file.

Check that the policy file is in the ``etc/shared`` directory (``shared`` on Windows endpoints) on the endpoint. Then check that the policy appears in **Endpoint security** > **Configuration Assessment** > **Inventory** after the next SCA synchronization.

.. _sca_creating_custom_policies:

Creating custom SCA policies
------------------------------

You can create custom SCA policies for settings specific to your environment, your internal standards, or other applications.

A custom SCA policy is a YAML file with up to four sections.

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
   :emphasize-lines: 1,9,18,22

   policy:
     id: "unix_audit"
     file: "sca_unix_audit.yml"
     name: "System audit for Unix based systems"
     description: "Guidance for establishing a secure configuration for Unix based systems."
     references:
       - https://www.ssh.com/ssh/

   requirements:
     name: "Check that the SSH service and password-related files are present on the system"
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
       name: "SSH Hardening: Port should not be 22"
       description: "The ssh daemon should not be listening on port 22 (the default value) for incoming connections."
       rationale: "Changing the default port you may reduce the number of successful attacks from zombie bots, an attacker or bot doing port-scanning can quickly identify your SSH port."
       remediation: "Change the Port option value in the sshd_config file."
       compliance:
         pci_dss: ["2.2.4"]
         nist_800_53: ["CM.1"]
       condition: all
       rules:
         - 'f:$sshd_file -> !r:^# && r:Port && !r:\s*\t*22$'

Policy section
^^^^^^^^^^^^^^

The policy section defines the policy metadata, such as its ID, name, and description.

.. _sca_policy_file_policy_section:
.. table:: Policy section

   +--------------------+----------------+-------------------+----------------------------------+------------------------+
   | Field              | Mandatory      | Type              | Allowed values                   | Description            |
   +====================+================+===================+==================================+========================+
   | id                 | Yes            | String            | Any string                       | Policy ID              |
   +--------------------+----------------+-------------------+----------------------------------+------------------------+
   | file               | Yes            | String            | Any string                       | Policy filename        |
   +--------------------+----------------+-------------------+----------------------------------+------------------------+
   | name               | Yes            | String            | Any string                       | Policy title           |
   +--------------------+----------------+-------------------+----------------------------------+------------------------+
   | description        | Yes            | String            | Any string                       | Brief description      |
   +--------------------+----------------+-------------------+----------------------------------+------------------------+
   | references         | No             | Array of strings  | Any string (empty by default)    | Links to references    |
   +--------------------+----------------+-------------------+----------------------------------+------------------------+
   | regex_type         | No             | String            | Ignored. Rules always use PCRE2. | Policy regex engine    |
   +--------------------+----------------+-------------------+----------------------------------+------------------------+

Requirements section
^^^^^^^^^^^^^^^^^^^^^

Requirements decide whether a policy runs on an endpoint. If the requirements aren't met, the Wazuh agent skips the policy. Use them to limit a policy to an operating system, installed packages, or other system characteristics.

.. _sca_policy_file_requirements_section:
.. table:: Requirements section

   +--------------------+----------------+-------------------+------------------------+
   | Field              | Mandatory      | Type              | Allowed values         |
   +====================+================+===================+========================+
   | name               | Yes            | String            | Any string             |
   +--------------------+----------------+-------------------+------------------------+
   | description        | Yes            | String            | Any string             |
   +--------------------+----------------+-------------------+------------------------+
   | condition          | Yes            | String            | all, any, none         |
   +--------------------+----------------+-------------------+------------------------+
   | rules              | Yes            | Array of strings  | Any string             |
   +--------------------+----------------+-------------------+------------------------+

Variables section
^^^^^^^^^^^^^^^^^^

The variables section defines values that you can reuse across the policy. There's no limit on the number of variables in a rule.

.. _sca_policy_file_variables_section:
.. table:: Variables section

   +--------------------+----------------+-------------------+------------------------+
   | Field              | Mandatory      | Type              | Allowed values         |
   +====================+================+===================+========================+
   | variable_name      | Yes            | Array of strings  | Any string             |
   +--------------------+----------------+-------------------+------------------------+

Variable names start with ``$``. For example:

- ``$list_of_files``: ``/etc/ssh/sshd_config``, ``/etc/sysctl.conf``, ``/var/log/dmesg``
- ``$list_of_folders``: ``/etc``, ``/var``, ``/tmp``
- ``$program_name``: ``apache2``

You can place variables anywhere in the left part of a rule. For example, with these variables, you can write the following rules:

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
   |     name    |    Yes    |           String           |     Any string     |
   +-------------+-----------+----------------------------+--------------------+
   | description |     No    |           String           |     Any string     |
   +-------------+-----------+----------------------------+--------------------+
   |  rationale  |     No    |           String           |     Any string     |
   +-------------+-----------+----------------------------+--------------------+
   | remediation |     No    |           String           |     Any string     |
   +-------------+-----------+----------------------------+--------------------+
   |  compliance |     No    |           Object           | cmmc, fedramp,     |
   |             |           |                            | gdpr, hipaa,       |
   |             |           |                            | iso_27001, nis2,   |
   |             |           |                            | nist_800_171,      |
   |             |           |                            | nist_800_53,       |
   |             |           |                            | pci_dss, tsc       |
   +-------------+-----------+----------------------------+--------------------+
   |    mitre    |     No    |           Object           | tactic, technique, |
   |             |           |                            | subtechnique (each |
   |             |           |                            | with id and name   |
   |             |           |                            | arrays)            |
   +-------------+-----------+----------------------------+--------------------+
   |  references |     No    |      Array of strings      |     Any string     |
   +-------------+-----------+----------------------------+--------------------+
   |  condition  |    Yes    |           String           |   all, any, none   |
   +-------------+-----------+----------------------------+--------------------+
   |    rules    |    Yes    |      Array of strings      |     Any string     |
   +-------------+-----------+----------------------------+--------------------+
   | regex_type  |    No     |           String           | Ignored. Rules     |
   |             |           |                            | always use PCRE2.  |
   +-------------+-----------+----------------------------+--------------------+

.. note::

   -  The ``id`` field under the ``policy`` and ``checks`` section must be unique across policy files. To avoid conflicts with the check IDs of the default policies, start the check IDs of your custom policies at ``100000``.
   -  A check can use ``title`` instead of ``name``. The SCA module stores the value as ``name``.

Condition
~~~~~~~~~

The ``condition`` field sets how the rule results combine into the check result. There are three options:

- ``all``: The check is evaluated as **Passed** if all of its rules are satisfied and as **Failed** as soon as one rule is not satisfied.
- ``any``: The check is evaluated as **Passed** as soon as any of its rules are satisfied.
- ``none``: The check is evaluated as **Passed** if none of its rules are satisfied and as **Failed** as soon as one rule is satisfied.

A condition can also return **Not applicable**:

- ``all``: If any rule returns **Not applicable**, and no rule returns **Failed**, the result is **Not applicable**.
- ``any``: The check is evaluated as **Not applicable** if no rule is evaluated as **Passed** and any rule returns **Not applicable**.
- ``none``: The check is evaluated as **Not applicable** if no rule is evaluated as **Passed** and any rule returns **Not applicable**.

.. table:: Condition/rule evaluation
   :widths: auto

   +------------------------------+-------------+-------------+-------------------+--------------------+
   | Condition / Rule evaluation  |  Passed     |  Failed     | Not applicable    |     Result         |
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

\*: This result doesn't affect the final result.

Rules
~~~~~

A rule starts with a type and a location, followed by the test. Tests are either existence checks or content checks. The location can be a file, directory, process name, command, or registry key. The following table lists the rule types.

.. _rule_types:

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
   | Command                      | ``c``            |
   +------------------------------+------------------+
   | Registry (Windows only)      | ``r``            |
   +------------------------------+------------------+

The following table lists the content comparison operators.

.. table:: Content comparison operators
   :widths: auto

   +--------------------------------------+------------------------------------------------------------------------------------------+------------------------------------------------------------+
   | Operation                            | Operator                                                                                 | Example                                                    |
   +======================================+==========================================================================================+============================================================+
   | Literal comparison, exact match      | *(by omission: the absence of an operator signifies a literal comparison or exact match)*| ``f:/file -> CONTENT``                                     |
   +--------------------------------------+------------------------------------------------------------------------------------------+------------------------------------------------------------+
   | Regular expression match (PCRE2)     | ``r:``                                                                                   | ``f:/file -> r:REGEX``                                     |
   +--------------------------------------+------------------------------------------------------------------------------------------+------------------------------------------------------------+
   | Numeric comparison (integers)        | ``n:``                                                                                   | ``f:/file -> n:REGEX_WITH_CAPTURE_GROUP compare <= VALUE`` |
   +--------------------------------------+------------------------------------------------------------------------------------------+------------------------------------------------------------+

The following table lists the numeric comparison operators.

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

This rule fails if ``some_text`` is found in ``some_file``.

.. note::

   **Process** rules only allow existence checks. **Command** rules only allow content (output) checks.

Existence checking rules
"""""""""""""""""""""""""

An existence check is a rule without a content operator. It has the following form:

.. code-block:: yaml

    RULE_TYPE:target

Examples of existence checks:

- ``f:/etc/sshd_config`` checks that the ``/etc/sshd_config`` file exists.
- ``d:/etc`` checks that the ``/etc`` directory exists.
- ``not p:sshd`` tests the presence of processes called ``sshd`` and fails if one is found.
- ``r:HKEY_LOCAL_MACHINE\System\CurrentControlSet\Control\Lsa`` checks for the existence of the ``HKEY_LOCAL_MACHINE\System\CurrentControlSet\Control\Lsa`` key.
- ``r:HKEY_LOCAL_MACHINE\System\CurrentControlSet\Control\Lsa -> LimitBlankPasswordUse`` checks for the existence of the ``LimitBlankPasswordUse`` value in the key.

Content checking rules
"""""""""""""""""""""""

A content check has the following form:

.. code-block:: yaml

    RULE_TYPE:target -> CONTENT_OPERATOR:value

.. warning::

   The context of a content check is limited to a line. Keep the spaces around the ``->`` and ``compare`` separators. If the target doesn't exist, the result is ``Not applicable``.

Add ``!`` before a content operator to negate it, for example:

.. code-block:: yaml

    f:/etc/ssh_config -> !r:PermitRootLogin

.. warning::

   A negated content operator passes for any line that doesn't match. For example, rule ``f:/etc/ssh_config -> !r:PermitRootLogin`` passes if any line doesn't contain ``PermitRootLogin``.

Chain content operators with ``&&`` (AND):

.. code-block:: yaml

    f:/etc/ssh_config -> !r:^# && r:Protocol && r:2

This rule passes if there's a line whose first character isn't ``#`` and contains ``Protocol`` and ``2``.

.. warning::

   Keep the spaces around the ``&&`` operator. Chained tests have no particular evaluation order.

Examples of content checks:

- ``c:systemctl is-enabled cups -> r:^enabled`` checks that the output of the command contains a line starting with enabled.
- ``f:$sshd_file -> n:^\s*MaxAuthTries\s*\t*(\d+) compare <= 4`` checks that ``MaxAuthTries`` is less than or equal to ``4``.
- ``r:HKEY_LOCAL_MACHINE\System\CurrentControlSet\Control\Lsa -> LimitBlankPasswordUse -> 1`` checks that the value of ``LimitBlankPasswordUse`` is ``1``.

Examples
"""""""""

For complete examples, see the default policies in ``/var/ossec/ruleset/sca/`` on a Wazuh agent.

.. rubric:: Rule syntax for files

- Check that a file exists: ``f:<PATH_TO_FILE>``
- Check that a file doesn't exist: ``not f:<PATH_TO_FILE>``
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
- Check if a process isn't running: ``not p:<PROCESS_NAME>``

.. rubric:: Rule syntax for commands

- Check command output for an exact match: ``c:<COMMAND> -> <OUTPUT>``
- Check the output of a command using regex: ``c:<COMMAND> -> r:<REGEX>``
- Check whether a numeric value in command output meets a specified condition: ``c:<COMMAND> -> n:<REGEX_WITH_A_CAPTURE_GROUP> compare >= <NUMBER>``

.. rubric:: Rule syntax for Windows Registry

- Check if a registry value exists: ``r:<PATH_TO_REGISTRY> -> <VALUE>``
- Check registry value data: ``r:<PATH_TO_REGISTRY> -> <VALUE> -> <CONTENT>``

.. rubric:: Composite rules

- Check if there's a line that doesn't begin with ``#`` and contains ``Port 22``: ``f:/etc/ssh/sshd_config -> !r:^# && r:Port\s+22``
- Check if there's no line that doesn't begin with ``#`` and contains ``Port 22``: ``not f:/etc/ssh/sshd_config -> !r:^# && r:Port\s+22``

.. rubric:: Examples from the default policies

- Check for file contents, whole line match: ``f:/proc/sys/net/ipv4/ip_forward -> 1``
- Check value of registry: ``r:HKEY_LOCAL_MACHINE\System\CurrentControlSet\Services\Netlogon\Parameters -> MaximumPasswordAge -> 0``
- Check if a directory contains files: ``d:/home/<USER> -> r:^\.mysql_history$``
- Check the running configuration of ``sshd`` for the maximum authentication tries allowed: ``c:sshd -T -> !r:^\s*maxauthtries\s+4\s*$``
- Check if root is the only account with UID 0: ``f:/etc/passwd -> !r:^# && !r:^root: && r:^\w+:\w+:0:``
