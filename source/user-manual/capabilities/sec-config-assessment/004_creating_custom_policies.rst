Creating custom SCA policies
----------------------------
.. contents:: Table of Contents
   :depth: 10

An SCA policy looks like the following:

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

As shown in this example, policy files are comprised by four sections, although not all of them are required, as
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
Checks are the core of an SCA policy, as they describe the checks to be performed in the system.
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

Special mention deserves how rules evaluated as **non-applicable** are treated by the aforementioned aggregators.

- ``all``: If any rule returns **non-applicable**, and no rule returns **failed**, the result will be **non-applicable**.

- ``any``: The check will be evaluated as **non-applicable** if no rule evaluates to **passed** and any returns **non-applicable**.

- ``none``: The check will be evaluated as **non-applicable** if no rule evaluates to **passed** and any returns **non-applicable**.

.. table:: Condition truth-table
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

In an abstract manner, rules start by a location (and a `type` of location), that will be the target of the test, followed by the actual
the test specification. Such tests fall into two categories: existence and content checks.

.. General rule syntax
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

    +--------------------------------------------------------------------------------------+-----------------+------------------------------------------------------------+
    | Operation                                                                            | Operator        | Example                                                    |
    +======================================================================================+=================+============================================================+
    | Literal comparison, exact match                                                      | *by omision*    | ``f:/file -> CONTENT``                                     |
    +--------------------------------------------------------------------------------------+-----------------+------------------------------------------------------------+
    | :doc:`Lightweight Regular expression <../../ruleset/ruleset-xml-syntax/regex>` match | ``r:``          | ``f:/file -> r:REGEX``                                     |
    +--------------------------------------------------------------------------------------+-----------------+------------------------------------------------------------+
    | Numeric comparison (integers)                                                        | ``n:``          | ``f:/file -> n:REGEX_WITH_CAPTURE_GROUP compare <= VALUE`` |
    +--------------------------------------------------------------------------------------+-----------------+------------------------------------------------------------+

.. table:: Numeric comparison operators
    :widths: auto

    +--------------------------------+----------+---------------------------------------+
    | Arithmetic relational operator | Operator | Example                               |
    +--------------------------------+----------+---------------------------------------+
    | less than                      | ``<``    | ``n:SomeProperty (\d) compare < 42``  |
    +--------------------------------+----------+---------------------------------------+
    | less than or equal to          | ``>=``   | ``n:SomeProperty (\d) compare <= 42`` |
    +--------------------------------+----------+---------------------------------------+
    | equal to                       | ``==``   | ``n:SomeProperty (\d) compare == 42`` |
    +--------------------------------+----------+---------------------------------------+
    | not equal to                   | ``!=``   | ``n:SomeProperty (\d) compare != 42`` |
    +--------------------------------+----------+---------------------------------------+
    | greater than or equal to       | ``>=``   | ``n:SomeProperty (\d) compare >= 42`` |
    +--------------------------------+----------+---------------------------------------+
    | greater than                   | ``>``    | ``n:SomeProperty (\d) compare > 42``  |
    +--------------------------------+----------+---------------------------------------+

A whole rule can be negated using the operator ``not``, which is placed at the beginning of the rule.

.. code-block:: yaml

    not RULE

Example: ``not f:/some_file -> some_text`` will **fail** if `some_text` is found within the contents of `some_file`.

By combining the aforementioned rule types and operators, both existence and content checking can be performed.

.. note::
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
    - Content checks are case-sensitive.
    - It is **mandatory** to respect the spaces around the ``->`` and ``compare`` separators.
    - If the **target** of a rule that checks for contents does not exist, the result will be **non-applicable** as it could not be checked.

Content check operator results can be negated by adding a ``!`` before then, for example:

.. code-block:: yaml

    f:/etc/ssh_config -> !r:PermitRootLogin

.. attention::
    Be careful when negating content operators as that will make then evaluate as  **passed** for **anything** that does not match with the check specified.
    For example rule ```f:/etc/ssh_config -> !r:PermitRootLogin``` will be evaluated as **passed** if it finds **any line** that does not contain ``PermitRootLogin``.

Content check operators can be chained using the operator ``&&`` (AND) as follows:

.. code-block:: yaml

    f:/etc/ssh_config -> !r:^# && r:Protocol && r:2

This rule reads as `Pass if there's a line whose first character is not "#" and contains "Protocol" and "2"`.

.. attention::
    - It is **mandatory** to respect the spaces around the ``&&`` operator.
    - There's no particular order of evaluation between tests chained using the ``&&`` operator.

Examples of content checks:

    - ``systemctl is-enabled cups -> r:^enabled``` checks that the output of the command contains a line starting by `enabled`.
    - ``f:$sshd_file -> n:^\s*MaxAuthTries\s*\t*(\d+) compare <= 4'`` checks that value of MaxAuthTries is less or equal to 4.
    - ``r:HKEY_LOCAL_MACHINE\System\CurrentControlSet\Control\Lsa -> LimitBlankPasswordUse -> 1`` checks that value of *LimitBlankPasswordUse* is 1.

Examples
###################

The following sections cover each rule type, illustrating them with several examples. It is also recomended to check the actual
policies and, for minimalistic although complete examples, the `SCA test suite policies <https://github.com/wazuh/wazuh-qa/tree/master/integration_tests/sca/3.10>`_.

Rule syntax for files
:::::::::::::::::::::::::::::::::::

- Check that a file exists: ``f:/path/to/file``
- Check that a file does not exists: ``not f:/path/to/file``
- Check file contains (whole line literal match): ``f:/path/to/file -> content``
- Check file contents against regex: ``f:/path/to/file -> r:REGEX``
- Check a numeric value: ``f:/path/to/file -> n:REGEX(\d+) compare <= Number``

Rule syntax for directories
:::::::::::::::::::::::::::::::::::

- Check if a directory exists: ``d:/path/to/directory``
- Check if a directory contains a file: ``d:/path/to/directory -> file``
- Check if a directory contains files that match a regex: ``d:/path/to/directory -> r:^files``
- Check files matching ``file_name`` for content: ``d:/path/to/directory -> file_name -> content``

Rule syntax for processes
:::::::::::::::::::::::::::::::::::

- Check if a process is running ``p:process_name``
- Check if a process is **not** running ``not p:process_name``

Rule syntax for commands
:::::::::::::::::::::::::::::::::::

- Check the output of a command ``c:command -> output``
- Check the output of a command using regex ``c:command -> r:REGEX``
- Check a numeric value ``c:command -> n:REGEX_WITH_A_CAPTURE_GROUP compare >= number``

Rule syntax for Windows Registry
:::::::::::::::::::::::::::::::::::

- Check if a registry exists ``r:path/to/registry``
- Check if a registry key exists ``r:path/to/registry -> key``
- Check registry key contents ``r:path/to/registry -> key -> content``

Composite rules
:::::::::::::::::::::::::::::::::::

- Check if there is a line that does not begin with ``#`` and contains ``Port 22`` ``f:/etc/ssh/sshd_config -> !r:^# && r:Port\.+22``

- Check if there is **no** line that does not begin with ``#`` and contains ``Port 22`` ``not f:/etc/ssh/sshd_config -> !r:^# && r:Port\.+22``

Other examples
:::::::::::::::::::::::::::::::::::

- Check for file contents, whole line match: ``f:/proc/sys/net/ipv4/ip_forward -> 1``
- Check if a file exists: ``f:/proc/sys/net/ipv4/ip_forward``
- Check if a process is running: ``p:avahi-daemon``
- Check value of registry: ``r:HKEY_LOCAL_MACHINE\System\CurrentControlSet\Services\Netlogon\Parameters -> MaximumPasswordAge -> 0``
- Check if a directory contains files: ``d:/home/* -> ^.mysql_history$``
- Check if a directory exists: ``d:/etc/mysql``
- Check the running configuration of sshd for the maximum authentication tries allowed: ``c:sshd -T -> !r:^\s*maxauthtries\s+4\s*$``
- Check if root is the only account with UID 0: ``f:/etc/passwd -> !r:^# && !r:^root: && r:^\w+:\w+:0:``
