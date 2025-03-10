.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Learn how to remotely configure agents using agent.conf. In this section of the Wazuh documentation, you will find which capabilities can be configured remotely.

.. _reference_agent_conf:

Centralized configuration (agent.conf)
======================================

Introduction
------------

Agents can be configured remotely by using the ``agent.conf`` file. The following capabilities can be configured remotely:

-  :doc:`File Integrity monitoring <../capabilities/file-integrity/index>` (**syscheck**)
-  :doc:`Rootkit detection <../capabilities/malware-detection/index>` (**rootcheck**)
-  :doc:`Log data collection <../capabilities/log-data-collection/index>` (**localfile**)
-  :doc:`Remote commands <ossec-conf/wodle-command>` (**wodle name="command"**)
-  :doc:`Labels for agent alerts <../agent/agent-management/labels>` (**labels**)
-  :doc:`Security Configuration Assessment <../capabilities/sec-config-assessment/index>` (**sca**)
-  :doc:`System inventory <../capabilities/system-inventory/index>` (**syscollector**)
-  :doc:`Avoid events flooding <ossec-conf/client-buffer>` (**client_buffer**)
-  :doc:`Configure osquery wodle <ossec-conf/wodle-osquery>` (**wodle name="osquery"**)
-  :doc:`force_reconnect_interval setting <ossec-conf/client>` (**client**)

.. note::
  When setting up remote commands in the shared agent configuration, **you must enable remote commands for Agent Modules**. This is enabled by adding the following line to the ``/var/ossec/etc/local_internal_options.conf`` file in the agent:

.. code-block:: shell

    wazuh_command.remote_commands=1

Agent groups
------------

Agents can be grouped together in order to send them a unique centralized configuration that is group specific. Each agent can belong to more than one group, and unless otherwise configured, all agents belong to a group called ``default``.

.. note::
    Check the :doc:`agent_groups manual <./tools/agent-groups>` to learn how to add groups and assign agents to them.

The manager pushes all files included in the group folder to the agents belonging to this group. For example, all files in ``/var/ossec/etc/shared/default`` will be pushed to all agents belonging to the ``default`` group.

In case an agent is assigned to multiple groups, all the files contained in each group folder will be merged into one, and subsequently sent to the agents, being the last one the group with the highest priority.

The file ``ar.conf`` (Active Response status) will always be sent to agents even if it is not present in the group folder.

The agent will store the shared files in ``/var/ossec/etc/shared``, not in a group folder.

Below are the files that would be found in this folder on an agent assigned to the **debian** group.  Notice that these files are pushed to the agent from the manager ``/var/ossec/etc/shared/debian`` folder.

+-----------------------------------------------------+-----------------------------------------------------+
| **Manager**                                         | **Agent (Group: 'debian')**                         |
+-----------------------------------------------------+-----------------------------------------------------+
|.. code-block:: none                                 |.. code-block:: none                                 |
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

For example, for the ``group1`` group, it is in ``/var/ossec/etc/shared/group1``.  Each of these files should be readable by the ``wazuh`` user.

Options
-------

+-------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **name**    | Assigns the block to agents with specific names.                                                                                                                  |
+             +-------------------------------------------------------+-----------------------------------------------------------------------------------------------------------+
|             | Allowed values                                        | Any regular expression that matches the agent name.                                                       |
+-------------+-------------------------------------------------------+-----------------------------------------------------------------------------------------------------------+
| **os**      | Assigns the block to agents on specific operating systems.                                                                                                        |
+             +-------------------------------------------------------+-----------------------------------------------------------------------------------------------------------+
|             | Allowed values                                        | Any regular expression that matches the agent OS information.                                             |
+-------------+-------------------------------------------------------+-----------------------------------------------------------------------------------------------------------+
| **profile** | Assigns the block to agents with specific profiles as defined in :ref:`client configuration <reference_ossec_client_config_profile>`.                             |
+             +-------------------------------------------------------+-----------------------------------------------------------------------------------------------------------+
|             | Allowed values                                        | Any regular expression that matches the agent profile.                                                    |
+-------------+-------------------------------------------------------+-----------------------------------------------------------------------------------------------------------+

.. topic:: Example

	.. code-block:: xml

		<agent_config name=”^agent01|^agent02”>
		...
		<agent_config os="^Linux">
		...
		<agent_config profile="^UnixHost">

   To get the agent name and operating system information, you can run the ``agent_control`` utility.

    .. code-block:: console

        agent_control -i <AGENT_ID>

    Where ``<AGENT_ID>`` corresponds to the agent ID of the endpoint.

    .. code-block:: none
        :class: output

        Wazuh agent_control. Agent information:
        Agent ID:   001
        Agent Name: agent01
        IP address: any
        Status:     Active

        Operating system:    Linux |centos9 |5.14.0-366.el9.x86_64 |#1 SMP PREEMPT_DYNAMIC Thu Sep 14 23:37:14 UTC 2023 |x86_64
        Client version:      Wazuh v4.5.2
        Configuration hash:  ab73af41699f13fdd81903b5f23d8d00
        Shared file hash:    4a8724b20dee0124ff9656783c490c4e
        Last keep alive:     1696963366

        Syscheck last started at:  Tue Oct 10 12:37:43 2023
        Syscheck last ended at:    Tue Oct 10 12:37:46 2023

Centralized configuration process
---------------------------------

The following is an example of how a centralized configuration can be done.

1. Configure the ``agent.conf`` file:

    Edit the file corresponding to the agent group. For example, for the ``default`` group, edit the file ``/var/ossec/etc/shared/default/agent.conf``. If the file does not exist, create it:

    .. code-block:: console

        # touch /var/ossec/etc/shared/default/agent.conf
        # chown wazuh:wazuh /var/ossec/etc/shared/default/agent.conf
        # chmod 660 /var/ossec/etc/shared/default/agent.conf

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

    With every agent keepalive (10 seconds default), the agent sends to the manager the checksum of its merge.md file and the manager compares it with the current one. If the received checksum differs from the available one, the Wazuh manager pushes the new file to the agent. The agent will start using the new configuration after being restarted.

    .. note:: Restarting the manager will make the new ``agent.conf`` file available to the agents more quickly.

4. Confirm that the agent received the configuration:

    The ``agent_groups`` tool or the Wazuh API endpoint :api-ref:`GET /agents <operation/api.controllers.agent_controller.get_agents>` can show whether the group configuration is synchronized in the agent or not:

    .. code-block:: console

        # curl -k -X GET "https://localhost:55000/agents?agents_list=001&select=group_config_status&pretty=true" -H  "Authorization: Bearer $TOKEN"

    .. code-block:: json
        :class: output

        {
           "data": {
              "affected_items": [
                 {
                    "group_config_status": "synced",
                    "id": "001"
                 }
              ],
              "total_affected_items": 1,
              "total_failed_items": 0,
              "failed_items": []
           },
           "message": "All selected agents information was returned",
           "error": 0
        }

    .. code-block:: console

        # /var/ossec/bin/agent_groups -S -i 001

    .. code-block:: none
        :class: output

        Agent '001' is synchronized.

5. Restart the agent:

    By default, the agent restarts by itself automatically when it receives a new shared configuration.

    If ``auto_restart`` has been disabled (in the ``<client>`` section of :doc:`Local configuration <ossec-conf/index>`), the agent will have to be manually restarted so that the new ``agent.conf`` file will be used. This can be done as follows:

    .. code-block:: console

        # /var/ossec/bin/agent_control -R -u 1032

    .. code-block:: none
        :class: output

        Wazuh agent_control: Restarting agent: 1032

Precedence
----------

It's important to understand which configuration file takes precedence between ``ossec.conf`` and ``agent.conf`` when the central configuration is used. When this configuration is utilized, the local and the shared configuration are merged, however, the ``ossec.conf`` file is read before the shared ``agent.conf`` and the last configuration of any setting will overwrite the previous. Also, if a file path for a particular setting is set in both of the configuration files, both paths will be included in the final configuration.

For example:

Let's say we have this configuration in the ``ossec.conf`` file:

.. code-block:: xml

  <sca>
    <enabled>no</enabled>
    <scan_on_start>yes</scan_on_start>
    <interval>12h</interval>
    <skip_nfs>yes</skip_nfs>

    <policies>
      <policy>system_audit_rcl.yml</policy>
      <policy>system_audit_ssh.yml</policy>
      <policy>system_audit_pw.yml</policy>
    </policies>
  </sca>

and this configuration in the ``agent.conf`` file.

.. code-block:: xml

  <sca>
    <enabled>yes</enabled>

    <policies>
      <policy>cis_debian_linux_rcl.yml</policy>
    </policies>
  </sca>

The final configuration will enable the Security Configuration Assessment module. In addition, it will add the `cis_debian_linux_rcl.yml` to the list of scanned policies.
In other words, the configuration located at ``agent.conf`` will overwrite the one of the ``ossec.conf``.

How to ignore shared configuration
----------------------------------

Whether for any reason you don't want to apply the shared configuration in a specific agent, it can be disabled by adding the following line to the ``/var/ossec/etc/local_internal_options.conf`` file in that agent:

.. code-block:: shell

    agent.remote_conf=0

Download configuration files from remote location
-------------------------------------------------

The Wazuh manager has the capability to download configuration files like ``merged.mg`` as well as other files to be merged for the groups that you want.

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

Here we can distinguish the two main blocks: ``groups`` and ``agents``.


1. In the ``groups`` block we define the group name from which we want to download the files.

    - If the group doesn't exist, it will be created.
    - If a file has the name ``merged.mg``, only this file will be downloaded. Then it will be validated.
    - The ``poll`` label indicates the download rate in seconds of the specified files.

This configuration can be changed on the fly. The **manager** will reload the file and parse it again so there is no need to restart the **manager** every time.

The information about the parsing is shown on the ``/var/ossec/logs/ossec.log`` file. For example:

-  Parsing is successful:

   .. code-block:: none
      :class: output

      INFO: Successfully parsed of yaml file: /etc/shared/files.yml

-  File has been changed:

   .. code-block:: none
      :class: output

      INFO: File '/etc/shared/files.yml' changed. Reloading data

-  Parsing failed due to bad token:

   .. code-block:: none
      :class: output

      INFO: Parsing file '/etc/shared/files.yml': unexpected identifier: 'group'

-  Download of file failed:

   .. code-block:: none
      :class: output

      ERROR: Failed to download file from url: https://example.com/merged.mg

-  Downloaded ``merged.mg`` file is corrupted or not valid:

   .. code-block:: none
      :class: output

      ERROR: The downloaded file '/var/download/merged.mg' is corrupted.
