.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: The section below describes how to configure your Wazuh agent for log collection across Windows, Linux, and macOS endpoints.

Configuring log collection
============================

The section below describes how to configure your Wazuh agent for log collection across Windows, Linux, and macOS endpoints.

Configuring a Wazuh agent
--------------------------

You can configure log collection either locally on the Wazuh agent or centrally on the Wazuh manager. Local configuration applies to an individual agent, while centralized configuration allows you to define and distribute log collection settings to multiple enrolled agents.

.. _using_local_configuration_agent:

Using a local configuration from the monitored Wazuh agent
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The :ref:`ossec.conf <reference_ossec_conf>` file is the main configuration file on the Wazuh agent. You can configure the Wazuh agent configuration file to collect logs from specific log files on a monitored endpoint. The table below shows the location of the ``ossec.conf`` file on different operating systems.

=================  ==================================================
Operating systems  Location of the ossec.conf file
=================  ==================================================
Windows            ``C:\Program Files (x86)\ossec-agent\ossec.conf``
Linux/Unix         ``/var/ossec/etc/ossec.conf``
macOS              ``/Library/Ossec/etc/ossec.conf``
=================  ==================================================

Location of the ``ossec.conf`` file on different operating systems

.. _using_centralized_configuration_manager:

Using a centralized configuration from the Wazuh dashboard
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The Wazuh manager enables centralized distribution of configuration settings to multiple monitored endpoints in the same operating system or group. Configuration settings in the ``agent.conf`` file on the Wazuh manager take precedence over those in the Wazuh agent ``ossec.conf`` file.

You manage the centralized configuration in the ``agent.conf`` file of a Wazuh agent group. The log collection settings of a single endpoint appear in the Wazuh dashboard for reference. To add a log file for a group of agents:

#. In the Wazuh dashboard, go to **Agents management** > **Groups**.

#. In the row of the group, click the **Edit group configuration** icon.

   .. thumbnail:: /images/manual/log-data-collection/centralized-configuration-groups.png
      :title: Groups page with the Edit group configuration button
      :alt: Agents management Groups page in the Wazuh dashboard with the Edit group configuration button highlighted in the default group row.
      :align: center
      :width: 80%

#. Below the existing ``<agent_config>`` block, add a ``<localfile>`` block inside a new ``<agent_config>`` block. Use the ``os`` attribute to target one operating system, for example:

   .. code-block:: xml

      <agent_config os="Linux">
        <localfile>
          <location>/PATH_TO_FILE/file.log</location>
          <log_format>syslog</log_format>
        </localfile>
      </agent_config>

#. Click **Save**. The Wazuh manager sends the updated file to the agents in the group, and each agent reloads its configuration on its own. You don't need to restart the agents. You can also edit the file on the Wazuh manager at ``/etc/wazuh-manager/shared/<GROUP_NAME>/agent.conf``. See the :ref:`centralized configuration reference <reference_centralized_configuration>`.

   .. thumbnail:: /images/manual/log-data-collection/centralized-configuration-agent-conf.png
      :title: Group configuration editor for the default group
      :alt: Group configuration editor for the default group showing an agent_config block for Linux with a localfile entry for /PATH_TO_FILE/file.log.
      :align: center
      :width: 80%

#. To check that an agent applied the block, go to **Agents management** > **Summary**, select the agent, and open **Configuration** > **Log collection**. The file appears under **Logs files**.

.. toctree::
   :maxdepth: 2

   monitoring-log-files
   configuration
