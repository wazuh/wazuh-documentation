.. Copyright (C) 2019 Wazuh, Inc.

.. _kibana_agents:

Agents
^^^^^^

This section shows the overall status of all the Wazuh agents belonging to the Wazuh cluster. The section shows also an interactive table, listing the Wazuh agents and some of their details. The table allows the user to perform operations such as adding a new Wazuh agent, viewing the configuration of an existing Wazuh agent and more:

.. thumbnail:: ../../images/kibana-app/sections/agents/wazuh-kibana-agents.png
  :align: center
  :width: 100%

After selecting a specific Wazuh agent from the list, the user can monitor its security information management, threat detection and response, auditing and policy monitoring, and regulatory compliance:

.. thumbnail:: ../../images/kibana-app/sections/agents/wazuh-kibana-agent.png
  :align: center
  :width: 100%

Monitoring the Wazuh agent's capabilities
-----------------------------------------

Each capability section provides information about related triggered alerts, organized in dashboards containing easy to analyze charts and tables. An example below shows the Wazuh agent's security events page:

.. thumbnail:: ../../images/kibana-app/sections/agents/wazuh-kibana-agent-security-events.png
  :align: center
  :width: 100%

By clicking on the printer icon button located on the top right corner in the interface, the user can generate a report for the data presented in the current section.
The reports are stored on the same machine where Kibana is installed, in the ``/usr/share/kibana/optimize/wazuh/downloads/reports`` folder. A status message will indicate if the report was generated successfully, or if the process was aborted:

.. thumbnail:: ../../images/kibana-app/sections/agents/wazuh-kibana-agent-report.png
  :align: center
  :width: 100%

The list of the generated reports is available on *Management > Reporting*, from where they can be downloaded or deleted.

Wazuh agent's configuration information
---------------------------------------

This section provides also information about the Wazuh agent's configuration in real-time. The image below shows that the Wazuh agent's configuration is synchronized:

.. thumbnail:: ../../images/kibana-app/sections/agents/wazuh-kibana-agent-sync.png
  :align: center

Most of the elements in the table are clickable, allowing the user to explore each section of the configuration in detail. For example, by clicking on the Wazuh agent’s *Log collection* section, the detailed active configuration is shown:

.. thumbnail:: ../../images/kibana-app/sections/agents/wazuh-kibana-agent-conf-logcollector.png
  :align: center
  :width: 100%

For better readability, the configuration can also be displayed in JSON or XML format :

.. thumbnail:: ../../images/kibana-app/sections/agents/wazuh-kibana-conf-json.png
  :align: center
  :width: 100%

Discover the Wazuh agent's alerts
---------------------------------

The section available under the *Discover* button allows interactively explore the Wazuh agent's alerts from the currently selected index pattern. It is possible to submit search queries, filter the search results, view alerts data, and also, by clicking on the fields on the left side of the window, add columns for a quick value comparison between alerts.
The user can see the number of alerts that match the search query and get field value statistics:

.. thumbnail:: ../../images/kibana-app/sections/agents/wazuh-kibana-agent-discover.png
  :align: center
  :width: 100%
