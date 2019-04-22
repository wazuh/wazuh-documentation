.. Copyright (C) 2019 Wazuh, Inc.

Security Configuration Assessment
=================================

This section attempts to introduce how this module can help us to securize our systems.

- `The configuration assessment scope`_
- `How this module can help us`_
- `Available policies`_
- `Creating a SCA policy`_

The configuration assessment scope
----------------------------------

One of the most important points to avoid hosts to be compromised is to securing them by reducing their surface of vulnerabilities. That process is commonly known
as hardening, and the configuration assessment is the most effective way to detect how to handle that hardening in our systems.

It consists on carrying out scans where policy files are used as template to discover the exposures or misconfiguration of the monitored host. To be more specific, 
changing default passwords, the removal of unnecessary software, unnecessary usernames or logins, and the disabling or removal of unnecessary services, for example. 
Those policies can be focused on a whole OS such as Debian, or Windows, or directly on a particular software like the SSH server.


How this module can help us
---------------------------

This module has been designed to perform security configuration assessment on agents by providing the scan results of one or more policy files. 


CIS and PCI-DSS controls
^^^^^^^^^^^^^^^^^^^^^^^^

Each CIS policy file has the CIS and PCI-DSS reference associated for each check that the file has inside. For example the check with id 5501 inside the policy file *cis_rhel5_linux_rcl.yml*:

.. code-block:: yaml

    - id: 5501
      title: "Set nodev option for /tmp Partition"
      description: "The nodev mount option specifies that the filesystem cannot contain special devices."
      rationale: "Since the /tmp filesystem is not intended to support devices, set this option to ensure that users cannot attempt to create block or character special devices in /tmp."
      remediation: "Edit the /etc/fstab file and add nodev to the fourth field (mounting options). # mount -o remount,nodev /tmp"
      compliance:
        - cis: "1.1.2"
        - pci_dss: "2.2.4"
      references:
        - CCE-14412-1
      condition: any
      rules:
        - 'f:/etc/fstab -> !r:^# && r:/tmp && !r:nodev;'

The *compliance* field meets both CIS and PCI_DSS compliances. The user can define wich compliances each check meets based on official CIS benchmarks.

How alerts appear
^^^^^^^^^^^^^^^^^

When an agent finished a policy monitoring scan, it sends the results for each check defined in the policy file. If nothing has changed during the last scan, the results 
will remain the same.

The following image shows an alert inside the Kibana app, for the ``system_audit_ssh.yml`` policy file:

.. thumbnail:: ../../../images/sca/alert.png
    :title: SSH example alert
    :align: center
    :width: 50%


Now within the *Configuration Assessment* tab, we can see the result for each check of the policy:

.. thumbnail:: ../../../images/sca/ssh-checks.png
    :title: Configuration Assessment tab for SSH policy
    :align: center
    :width: 100%


We can expand each check to view useful information about it like how to remediate it:

.. thumbnail:: ../../../images/sca/check-expand.png
    :title: Configuration Assessment check expanded
    :align: center
    :width: 100%

Information provided for each policy
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Every policy file provides useful information about what it does. Taking as example the ``system_audit_ssh.yml`` policy file:

.. code-block:: yaml

    policy:
      id: "system_audit_ssh"
      file: "system_audit_ssh.yml"
      name: "System audit for SSH hardening"
      description: "Guidance for establishing a secure configuration for SSH service vulnerabilities."
      references:
        - https://www.ssh.com/ssh/

In the following screeshot within the Kibana app, we can see the name and description along with a summary for the last scan of every file:

.. thumbnail:: ../../../images/sca/summary.png
    :title: SCA summary
    :align: center
    :width: 100%


Available policies
------------------

YAML format
^^^^^^^^^^^

The policy files are described following the YAML format, as this standard focus on human readability, allowing the user to quickly understand and write their own policy files 
or extend the existing ones.


Compatibility matrix
^^^^^^^^^^^^^^^^^^^^

When installing Wazuh agent, the system will install only the policy files for that particular Operating System. The following lists shows
all the policy files avaiable for all Operating System that Wazuh supports.

+-----------------------------+-------------------------------------------------------------------------------------------+
| Operating System            | Policies                                                                                  |
+-----------------------------+-------------------------------------------------------------------------------------------+
| Debian Based                | cis_debian_linux_rcl.yml                                                                  |            
+-----------------------------+-------------------------------------------------------------------------------------------+
| Redhat / CentOS Based       | cis_rhel5_linux_rcl.yml, cis_rhel6_linux_rcl.yml, cis_rhel7_linux_rcl.yml                 |            
+-----------------------------+-------------------------------------------------------------------------------------------+
| Suse                        | cis_sles11_linux_rcl.yml, cis_sles12_linux_rcl.yml                                        |            
+-----------------------------+-------------------------------------------------------------------------------------------+
| Windows                     | win_audit_rcl.yml                                                                         |
+-----------------------------+-------------------------------------------------------------------------------------------+
| Macintosh                   | cis_apple_macOS_10.11.yml, cis_apple_macOS_10.12.yml, cis_apple_macOS_10.13.yml           |
+-----------------------------+-------------------------------------------------------------------------------------------+
| Solaris                     | cis_solaris11_rcl.yml                                                                     |            
+-----------------------------+-------------------------------------------------------------------------------------------+
| Generic                     | system_audit_rcl.yml, system_audit_ssh.yml                                                |            
+-----------------------------+-------------------------------------------------------------------------------------------+


With a Wazuh manager installation the following additional files are also installed:

+-----------------------------+----------------------------------------------------------------------------------------------------------------------------------+
| Application                 | Policies                                                                                                                         |
+-----------------------------+----------------------------------------------------------------------------------------------------------------------------------+
| Apache                      | cis_apache2224_rcl.yml                                                                                                           |            
+-----------------------------+----------------------------------------------------------------------------------------------------------------------------------+
| MySQL                       | cis_mysql5-6_community_rcl.yml, cis_mysql5-6_enterprise_rcl.yml                                                                  |            
+-----------------------------+----------------------------------------------------------------------------------------------------------------------------------+
| Windows Server 2012 r2      | cis_win2012r2_memberL1_rcl.yml, cis_win2012r2_memberL2_rcl.yml, cis_win2012r2_domainL1_rcl.yml, cis_win2012r2_domainL2_rcl..yml  |            
+-----------------------------+----------------------------------------------------------------------------------------------------------------------------------+


Policy files location
^^^^^^^^^^^^^^^^^^^^^

- For Wazuh agent and manager on a Linux platform, the policy files are located under the default installation directory: ``/var/ossec/ruleset/sca`` by default.
- For Wazuh agent on a Windows platform, the policy files are located under the default installation directory: ``C:\\Program files (x86)\\ossec-agent\\ruleset\\sca`` by default.


How to push policy files to agents
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

As described in the :doc:`centralized configuration <../../reference/centralized-configuration>`, section the Wazuh manager has the ability to push files and
configurations to the connected agents.

This feature con be used to push policy files for the agents that we want. By default every conected agents belongs to the *default* group. We will use this as
an example.  

- Steps on the manager

    - Put the new policy file under the directory: ``/var/ossec/etc/shared/default``
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

If you want to disable a current policy file thats being scanned on the agent, put the following block inside the file ``/var/ossec/etc/shared/default/agent.conf``:

.. code-block:: xml

    <agent_config>

        <!-- Shared agent configuration here -->
        <sca>
            <policies>
                <policy enabled="no">/var/ossec/etc/shared/policy_file_to_disable.yml</policy>
            </policies>
        </sca>

    </agent_config>

The agent will disable the policy file specified.


Creating a SCA policy
---------------------

First of all we need to take a look at the structure of a policy file as it is declared in YAML. Take a look at the following example below taken from the policy file for ssh hardening:

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
        - 'f:$sshd_file -> !r:^# && r:Port\.+22;'


As shown above, there are four sections for a policy file, the following table shows the required sections:

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
  If the *requirements* aren't meet for a specific policy file, the scan for that file won't start.


Each section have their own fields that are or aren't mandatory as described below:

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
| rules              | No             | Array of strings  | Any string                           |
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

A *check* can be marked as *not applicable* in the case that an error happens getting the result.
In this case, the field *result* doesn't appear and the check returns two fields: *status* and *reason*.

Examples:

- Looking at the value inside a file: ``f:/proc/sys/net/ipv4/ip_forward -> 1;``
- Checking if a file exists: ``f:/proc/sys/net/ipv4/ip_forward;``
- Checking if a process is running: ``p:avahi-daemon;``
- Looking at the value of a registry: ``r:HKEY_LOCAL_MACHINE\System\CurrentControlSet\Services\Netlogon\Parameters -> MaximumPasswordAge -> 0;``
- Looking if a directory contains files: ``d:/home/* -> ^.mysql_history$;``
- Checking if a directory exists: ``d:/etc/mysql;``
- Check the running configuration of ssh to check the maximum number of tries: ``c:sshd -T -> !r:^\s*maxauthtries\s+4\s*$;``

.. note::
   Remember that the each rule must end with the semicolon ``;`` character.
