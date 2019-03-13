.. Copyright (C) 2018 Wazuh, Inc.

.. _reference_agent_conf:

Centralized configuration (agent.conf)
======================================

Introduction
------------

Agents can be configured remotely by using the ``agent.conf`` file. The following capabilities can be configured remotely:

- :doc:`File Integrity monitoring <../capabilities/file-integrity/index>` (**syscheck**)
- :doc:`Rootkit detection <../capabilities/anomalies-detection/index>` (**rootcheck**)
- :doc:`Log data collection <../capabilities/log-data-collection/index>` (**localfile**)
- :doc:`Security policy monitoring <../capabilities/policy-monitoring/index>` (**rootcheck**, **wodle name="open-scap"**, **wodle name="cis-cat"**)
- :doc:`Remote commands <ossec-conf/wodle-command>` (**wodle name="command"**)
- :doc:`Anti-flooding mechanism <../capabilities/antiflooding>` (**bucket options**)
- :doc:`Labels for agent alerts <../capabilities/labels>` (**labels**)
- :doc:`System inventory <../capabilities/syscollector>` (**syscollector**)
- :doc:`Active Response <../capabilities/active-response/index>` (**active-response**)
- :doc:`Configure connection <ossec-conf/client>`(**client**)
- :doc:`Avoid events flooding <ossec-conf/client_buffer>` (**client_buffer**)
- :doc:`Format of Internal Logs <ossec-conf/logging>` (**logging**)
- :doc:`Defining output sockets <ossec-conf/socket>` (**socket**)
- :doc:`Configure AWS-S3 wodle <ossec-conf/wodle-s3>` (**wodle name="aws-s3"**)
- :doc:`Configure osquery wodle <ossec-conf/wodle-osquery>` (**wodle name="osquery"**)
- :doc:`Configure Docker wodle <ossec-conf/wodle-docker>` (**wodle name="docker-listener"**)

.. note::
  When setting up remote commands in the shared agent configuration, **you must enable remote commands for Agent Modules**. This is enabled by adding the following line to the ``/var/ossec/etc/local_internal_options.conf`` file in the agent:

.. code-block:: shell

    wazuh_command.remote_commands=1

Agent groups
------------

.. versionadded:: 3.0.0

Agents can be grouped together in order to send them unique centralized configuration that is group specific. Each agent can belong to more than one group and unless otherwise configured, all agents belong to a group called ``default``.

.. note::
    Check the :doc:`agent_groups manual <./tools/agent_groups>` to learn how to add groups and assign agents to them.

The manager pushes all files included in the group folder to the agents belonging this group. For example, all files in ``/var/ossec/etc/shared/default`` will be pushed to all agents belonging to ``default`` group.

In case an agent is assigned to multiple groups, all the files contained in each group folder will be merged into one, and subsequently sent to the agents, being the last one the group with the highest priority.

The file ``ar.conf`` (active response status) will always be sent to agents even if it is not present in the group folder.

The agent will store the shared files in ``/var/ossec/etc/shared``, not in a group folder.

Below are the files that would be found in this folder on an agent assigned to the **debian** group.  Notice that these files are pushed to the agent from the manager's ``/var/ossec/etc/shared/debian`` folder.

+-----------------------------------------------------+-----------------------------------------------------+
| **Manager**                                         | **Agent (Group: 'debian')**                         |
+-----------------------------------------------------+-----------------------------------------------------+
|.. code-block:: console                              |.. code-block:: console                              |
|                                                     |                                                     |
|    /var/ossec/etc/shared/                           |    /var/ossec/etc/shared/                           |
|    ├── ar.conf                                      |    ├── ar.conf                                      |
|    ├── debian                                       |    ├── agent.conf                                   |
|    │   ├── agent.conf                               |    ├── cis_debian_linux_rcl.txt                     |
|    │   ├── cis_debian_linux_rcl.txt                 |    ├── cis_rhel5_linux_rcl.txt                      |
|    │   ├── cis_rhel5_linux_rcl.txt                  |    ├── cis_rhel6_linux_rcl.txt                      |
|    │   ├── cis_rhel6_linux_rcl.txt                  |    ├── cis_rhel7_linux_rcl.txt                      |
|    │   ├── cis_rhel7_linux_rcl.txt                  |    ├── cis_rhel_linux_rcl.txt                       |
|    │   ├── cis_rhel_linux_rcl.txt                   |    ├── cis_sles11_linux_rcl.txt                     |
|    │   ├── cis_sles11_linux_rcl.txt                 |    ├── cis_sles12_linux_rcl.txt                     |
|    │   ├── cis_sles12_linux_rcl.txt                 |    ├── custom_rootcheck.txt                         |
|    │   ├── custom_rootcheck.txt                     |    ├── debian_ports_check.txt                       |
|    │   ├── debian_ports_check.txt                   |    ├── debian_test_files.txt                        |
|    │   ├── debian_test_files.txt                    |    ├── merged.mg                                    |
|    │   ├── merged.mg                                |    ├── rootkit_files.txt                            |
|    │   ├── rootkit_files.txt                        |    ├── rootkit_trojans.txt                          |
|    │   ├── rootkit_trojans.txt                      |    ├── system_audit_rcl.txt                         |
|    │   ├── system_audit_rcl.txt                     |    ├── system_audit_ssh.txt                         |
|    │   ├── system_audit_ssh.txt                     |    ├── win_applications_rcl.txt                     |
|    │   ├── win_applications_rcl.txt                 |    ├── win_audit_rcl.txt                            |
|    │   ├── win_audit_rcl.txt                        |    └── win_malware_rcl.txt                          |
|    │   └── win_malware_rcl.txt                      |                                                     |
|    └── default                                      |                                                     |
|        ├── agent.conf                               |                                                     |
|        ├── cis_debian_linux_rcl.txt                 |                                                     |
|        ├── cis_rhel5_linux_rcl.txt                  |                                                     |
|        ├── cis_rhel6_linux_rcl.txt                  |                                                     |
|        ├── cis_rhel7_linux_rcl.txt                  |                                                     |
|        ├── cis_rhel_linux_rcl.txt                   |                                                     |
|        ├── cis_sles11_linux_rcl.txt                 |                                                     |
|        ├── cis_sles12_linux_rcl.txt                 |                                                     |
|        ├── merged.mg                                |                                                     |
|        ├── rootkit_files.txt                        |                                                     |
|        ├── rootkit_trojans.txt                      |                                                     |
|        ├── system_audit_rcl.txt                     |                                                     |
|        ├── system_audit_ssh.txt                     |                                                     |
|        ├── win_applications_rcl.txt                 |                                                     |
|        ├── win_audit_rcl.txt                        |                                                     |
|        └── win_malware_rcl.txt                      |                                                     |
+-----------------------------------------------------+-----------------------------------------------------+

The proper syntax of ``agent.conf`` is shown below along with the process for pushing the configuration from the manager to the agent.

agent.conf
----------
.. topic:: XML section name

	.. code-block:: xml

		<agent_config>
		    ...
		</agent_config>

The ``agent.conf`` is only valid on server installations.

The ``agent.conf`` may exist in each group folder at ``/var/ossec/etc/shared``.

For example, for the ``group1`` group, it is in ``/var/ossec/etc/shared/group1``.  Each of these files should be readable by the ossec user.

Options
-------

+-------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **name**    | Allows assignment of the block to one particular agent.                                                                                                           |
+             +-------------------------------------------------------+-----------------------------------------------------------------------------------------------------------+
|             | Allowed values                                        | Any agent name                                                                                            |
+-------------+-------------------------------------------------------+-----------------------------------------------------------------------------------------------------------+
| **os**      | Allows assignment of the block to an operating system.                                                                                                            |
+             +-------------------------------------------------------+-----------------------------------------------------------------------------------------------------------+
|             | Allowed values                                        | Any OS family                                                                                             |
+-------------+-------------------------------------------------------+-----------------------------------------------------------------------------------------------------------+
| **profile** | Allows assignment of a profile name to a block. Any agent configured to use the defined :ref:`profile <reference_ossec_client_config_profile>` may use the block. |
+             +-------------------------------------------------------+-----------------------------------------------------------------------------------------------------------+
|             | Allowed values                                        | Any defined profile                                                                                       |
+-------------+-------------------------------------------------------+-----------------------------------------------------------------------------------------------------------+

Examples

	.. code-block:: xml

		<agent_config name=”agent01”>
		...
		<agent_config os="Linux">
		...
		<agent_config profile="UnixHost">

Centralized configuration process
---------------------------------

The following is an example of how a centralized configuration can be done.

1. Configure the ``agent.conf`` file:

Edit the file corresponding to the agent group. For example, for the ``default`` group, edit the file ``/var/ossec/etc/shared/default/agent.conf``. If the file does not exist, create it::

    # touch /var/ossec/etc/shared/default/agent.conf
    # chown ossec:ossec /var/ossec/etc/shared/default/agent.conf
    # chmod 640 /var/ossec/etc/shared/default/agent.conf

Several configurations may be created based on the ``name``, ``OS`` or ``profile`` of an agent.

.. code-block:: xml

    <agent_config name="agent_name">
        <localfile>
            <location>/var/log/my.log</location>
            <log_format>syslog</log_format>
        </localfile>
    </agent_config>

    <agent_config os="Linux">
        <localfile>
            <location>/var/log/linux.log</location>
            <log_format>syslog</log_format>
        </localfile>
    </agent_config>

    <agent_config profile="database">
        <localfile>
            <location>/var/log/database.log</location>
            <log_format>syslog</log_format>
        </localfile>
    </agent_config>

.. note::
  The ``profile`` option uses the values defined on the ``<config-profile>`` setting from the :ref:`client configuration <reference_ossec_client_config_profile>`.

2. Run ``/var/ossec/bin/verify-agent-conf``:

Each time you make a change to the ``agent.conf`` file, it is important to check for configuration errors. If any errors are reported by this check, they must be fixed before the next step.  Failure to perform this step may allow errors to be pushed to agents which may prevent the agents from running.  At that point, it is very likely that you will be forced to visit each agent manually to recover them.

3. Push the configuration to the agents:

Each time an agent checks-in with the manager (10 minute default), it looks to see if a new version of ``agent.conf`` is available from the manager.  When a new version is available, it automatically pulls the new file. However, the new ``agent.conf`` is not used by the agent until the next time the agent is restarted, as in step 5.

.. note:: Restarting the manager will make the new ``agent.conf`` file available to the agents more quickly.

4. Confirm that the agent received the configuration:

The ``agent_groups`` tool or the API can show whether the group is synchronized in the agent:

.. code-block:: console

    # curl -u foo:bar -X GET "http://localhost:55000/agents/001/group/is_sync?pretty"
    {
        "error": 0,
        "data": {
            "synced": true
        }
    }

.. code-block:: console

    # /var/ossec/bin/agent_groups -S -i 001
    Agent '001' is synchronized.

5. Restart the agent:

By default, the agent restarts by itself automatically when it receives a new shared configuration.

If ``auto_restart`` has been disabled (in the ``<client>`` section of :doc:`Local configuration <ossec-conf/index>`), the agent will have to be manually restarted so that the new ``agent.conf`` file will be used. This can be done as follows:

.. code-block:: console

    # /var/ossec/bin/agent_control -R -u 1032

    Wazuh agent_control: Restarting agent: 1032

Precedence
----------

It's important to understand which configuration file takes precedence between ``ossec.conf`` and ``agent.conf`` when central configuration is used. When central configuration is utilized, the local and the shared configuration are merged, however, the ``ossec.conf`` file is read before the shared ``agent.conf`` and the last configuration of any setting will overwrite the previous. Also, if a file path for a particular setting is set in both of the configuration files, both paths will be included in the final configuration.

For example:

Let's say we have this configuration in the ``ossec.conf`` file:

.. code-block:: xml

  <rootcheck>
    <disabled>no</disabled>
    <check_unixaudit>no</check_unixaudit>
    <check_files>yes</check_files>
    <check_trojans>no</check_trojans>
    <check_dev>yes</check_dev>
    <check_sys>yes</check_sys>
    <check_pids>yes</check_pids>
    <check_ports>yes</check_ports>
    <check_if>yes</check_if>
    <system_audit>/var/ossec/etc/shared/system_audit_rcl.txt</system_audit>
  </rootcheck>

and this configuration in the ``agent.conf`` file.

.. code-block:: xml

  <rootcheck>
    <check_unixaudit>yes</check_unixaudit>
    <rootkit_files>/var/ossec/etc/shared/rootkit_files.txt</rootkit_files>
    <rootkit_trojans>/var/ossec/etc/shared/rootkit_trojans.txt</rootkit_trojans>
    <system_audit>/var/ossec/etc/shared/cis_debian_linux_rcl.txt</system_audit>
    <system_audit>/var/ossec/etc/shared/cis_rhel_linux_rcl.txt</system_audit>
    <system_audit>/var/ossec/etc/shared/cis_rhel5_linux_rcl.txt</system_audit>
  </rootcheck>

The final configuration will overwrite ``check_unixaudit`` to "yes" because it appears in the ``agent.conf`` file. However, the path listed with the ``system_audit`` option will be repeated with both settings in the final configuration. In other words, ``system_audit_rcl.txt`` (from ``ossec.conf``) and ``cis_debian_linux_rcl.txt`` (from ``agent.conf``) will be included.

How to ignore shared configuration
----------------------------------

Whether for any reason you don't want to apply the shared configuration in a specific agent, it can be disabled by adding the following line to the ``/var/ossec/etc/local_internal_options.conf`` file in that agent:

.. code-block:: shell

    agent.remote_conf=0

Download configuration files from remote location
-------------------------------------------------

Wazuh manager has the capability to download configuration files like ``merged.mg`` as well as other files to be merged for the groups that you want to.

To use this feature, we need to put a yaml file named ``files.yml`` under the directory ``/var/ossec/etc/shared/``. When the **manager** starts, it will read and parse the file.

The ``files.yml`` has the following structure as shown in the following example:

.. code-block:: yaml

    groups:
        my_group_1:
            files:
                agent.conf: https://example.com/agent.conf
                rootcheck.txt: https://example.com/rootcheck.txt
                merged.mg: https://example.com/merged.mg
            poll: 15

        my_group_2:
            files:
                agent.conf: https://example.com/agent.conf
            poll: 200

    agents:
        001: my_group_1
        002: my_group_2
        003: another_group

Here we can distinct the two main blocks: ``groups`` and ``agents``.


1. In the ``groups`` block we define the group name from which we want to download the files.

    - If the group doesn't exists, it will be created.
    - If a file has the name ``merged.mg``, only this file will be downloaded. Then it will be validated.
    - The ``poll`` label indicates the download rate in seconds of the specified files.

2. In the ``agents`` block, we define for each agent the group to which we want it to belong.

This configuration can be changed on the fly. The **manager** will reload the file and parse it again so there is no need to restart the **manager** every time.

The information about the parsing is shown on the ``/var/ossec/logs/ossec.log`` file. For example:

- Parsing is successful:

.. code-block:: shell

    INFO: Successfully parsed of yaml file: /etc/shared/files.yml

- File has been changed:

.. code-block:: shell

    INFO: File '/etc/shared/files.yml' changed. Reloading data

- Parsing failed due to bad token:

.. code-block:: shell

    INFO: Parsing file '/etc/shared/files.yml': unexpected identifier: 'group'

- Download of file failed:

.. code-block:: shell

    ERROR: Failed to download file from url: https://example.com/merged.mg

- Downloaded ``merged.mg`` file is corrupted or not valid:

.. code-block:: shell

    ERROR: The downloaded file '/var/download/merged.mg' is corrupted.
