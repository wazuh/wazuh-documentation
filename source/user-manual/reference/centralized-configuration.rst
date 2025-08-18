.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how to remotely configure agents using ``agent.conf``. This section describes the capabilities that can be configured remotely in Wazuh.

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
|    │   ├── debian_test_files.txt                    |    └── merged.mg                                    |
|    │   └── merged.mg                                |                                                     |
|    └── default                                      |                                                     |
|        ├── agent.conf                               |                                                     |
|        ├── cis_debian_linux_rcl.txt                 |                                                     |
|        ├── cis_rhel5_linux_rcl.txt                  |                                                     |
|        ├── cis_rhel6_linux_rcl.txt                  |                                                     |
|        ├── cis_rhel7_linux_rcl.txt                  |                                                     |
|        ├── cis_rhel_linux_rcl.txt                   |                                                     |
|        ├── cis_sles11_linux_rcl.txt                 |                                                     |
|        ├── cis_sles12_linux_rcl.txt                 |                                                     |
|        └── merged.mg                                |                                                     |
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

Creating and validating the configuration
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

#. Create or edit the configuration file in the group directory.

   Use a temporary filename such as ``agent.conf.tmp`` during editing to prevent the manager from distributing an incomplete or invalid configuration. For example, run these commands for the ``default`` group.

   .. code-block:: console

      # touch /var/ossec/etc/shared/default/agent.conf.tmp
      # chown wazuh:wazuh /var/ossec/etc/shared/default/agent.conf.tmp
      # chmod 660 /var/ossec/etc/shared/default/agent.conf.tmp

#. Define one or more configuration blocks. Use filters such as ``name``, ``os``, and ``profile`` to target specific agents:

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

      The ``profile`` option uses values defined in the :ref:`config-profile  <reference_ossec_client_config_profile>` setting of the ``<client>`` configuration.

#. Rename the file to make it active. For example:

   .. code-block:: console

      # mv /var/ossec/etc/shared/default/agent.conf.tmp /var/ossec/etc/shared/default/agent.conf

The manager will automatically detect the new configuration and distribute it to all agents in the group.

.. note::

   Restarting the manager helps distribute the new ``agent.conf`` file to the agents more quickly.

Confirming that the configuration was applied
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Agents automatically reload the configuration after receiving it. The agent maintains its connection to the manager, since the ``agentd`` daemon is not restarted.

With every agent keepalive (10 seconds default), the agent sends the checksum of its ``merge.md`` file to the manager. If the checksums differ, the manager pushes the updated file to the agent. The agent applies the new configuration immediately after receiving it. No manual restart is required, regardless of the :ref:`auto_restart <client_auto_restart>` setting.

If the configuration is successfully applied, the agent log includes entries similar to the following:

.. code-block:: none

   2025/07/11 08:42:24 wazuh-agentd: INFO: Agent is reloading due to shared configuration changes.
   2025/07/11 08:42:34 wazuh-agentd: INFO: SIGNAL [(30)-(User defined signal 1: 30)] Received. Reload agentd.
   2025/07/11 08:42:34 wazuh-agentd: INFO: Buffer agent.conf updated, enable: 1 size: 30000
   2025/07/11 08:42:34 wazuh-agentd: INFO: Client buffer resized from 20000 to 30000 elements.

Use the Wazuh server API endpoint :api-ref:`GET /agents <operation/api.controllers.agent_controller.get_agents>` or the ``agent_groups`` tool to check the synchronization status of the group configuration on the agent. For example, for agent ID ``001``:

-  **Wazuh server API**

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

-  **agent_groups tool**

   .. code-block:: console

      # /var/ossec/bin/agent_groups -S -i 001

   .. code-block:: none
      :class: output

      Agent '001' is synchronized.

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

The Wazuh manager can download configuration files such as ``merged.mg`` and other files to be merged for selected groups.

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

The ``groups`` block defines the group name from which to download the files.

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