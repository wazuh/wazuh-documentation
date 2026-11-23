.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Wazuh agents use the Logcollector module to collect logs from monitored endpoints, applications, and network devices. Learn how log data collection works, and how to configure it locally on the Wazuh agent or centrally from the Wazuh manager.

How log data collection works
==============================

Wazuh agents use the Logcollector module to collect events from endpoints and applications, then forward them to the Wazuh manager for processing, normalization, and indexing. The Wazuh manager applies decoders to classify incoming events. Wazuh indexes every event that an integration decoder classifies, whether or not a rule matches it. Events that no integration classifies are indexed in ``wazuh-events-v5-unclassified`` only when :ref:`unclassified event storage is enabled <wazuh_indexer_indices_enabling_unclassified_events_storage>`.

The log analysis flow in Wazuh is straightforward: the agent collects the data, the manager normalizes, decodes, and enriches it, and the indexer stores it for rule matching and analysis. In Wazuh 5.0, the manager no longer ingests syslog directly, so agentless syslog sources must be relayed through a Linux host running a Wazuh agent and Logcollector.

The image below illustrates the flow of log data collection and analysis in Wazuh.

.. thumbnail:: /images/manual/log-data-collection/log-data-collection.png
   :title: Log data collection and analysis flow in Wazuh
   :alt: Diagram of the log data flow: the Wazuh agent collects logs, the Wazuh manager decodes and enriches them, the Wazuh indexer runs detectors and rules and stores the events, and the Wazuh dashboard shows the findings.
   :align: center
   :width: 100%

.. note::

   In Wazuh 5.0, the Wazuh manager syslog listener has been removed. To ingest syslog from agentless devices such as firewalls, switches, and routers, configure a Linux system as a syslog relay. Install a Wazuh agent on the relay system, configure rsyslog to receive syslog events over the network and write them to a log file, such as ``/var/log/network-devices.log``. Then, configure the Wazuh agent's ``ossec.conf`` file to monitor the log file with the Logcollector module. See the :ref:`configuring rsyslog on a Linux endpoint <configuring_rsyslog_relay>` section for an example.

Configuring a Wazuh agent
--------------------------

You can configure log collection either locally on the Wazuh agent or centrally on the Wazuh manager. Local configuration applies to an individual agent, while centralized configuration allows you to define and distribute log collection settings to multiple enrolled agents. The following sections describe both configuration methods. You can apply configuration changes:

-  :ref:`Using a local configuration from the monitored Wazuh agent <using_local_configuration_agent>`
-  :ref:`Using a centralized configuration from the Wazuh dashboard <using_centralized_configuration_manager>`

.. _using_local_configuration_agent:

Using a local configuration from the monitored Wazuh agent
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The :ref:`ossec.conf <reference_ossec_conf>` file is the main configuration file on the Wazuh agent. The Wazuh agent collects logs from monitored endpoints and forwards these logs to the Wazuh manager for normalization. You can configure the Wazuh agent configuration file to collect logs from specific log files on a monitored endpoint. The table below shows the location of the ``ossec.conf`` file on different operating systems.

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

The Wazuh manager enables centralized distribution of configuration settings to multiple monitored endpoints in the same operating system or group. You can use the centralized configuration to configure log collection across agent groups. Configuration settings in the ``agent.conf`` file on the Wazuh manager take precedence over those in the Wazuh agent ``ossec.conf`` file.

You manage the centralized configuration in the ``agent.conf`` file of a Wazuh agent group. The log collection settings of a single endpoint appear in the Wazuh dashboard for reference. For the ``agent.conf`` syntax, agent filters, and configuration precedence, see :doc:`Centralized configuration for Wazuh agents </user-manual/reference/centralized-configuration>`. To add a log file for a group of agents:

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
