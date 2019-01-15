.. Copyright (C) 2018 Wazuh, Inc.

.. _release_3_8_0:

3.8.0 Release Notes
===================

Wazuh core
----------

Additions and changes related to Wazuh manager and Wazuh agent components.

**Support for new AWS services in the AWS module**

- AWS Config
- AWS Trusted Advisor
- AWS KMS
- AWS Inspector
- Add support for IAM roles authentication in EC2 instances.

Adding new kind of buckets to your integration is as simple as adding an entry like this to your AWS configuration:

.. code-block:: console

  <bucket type="config">
    <name>wazuh-aws-wodle</name>
    <path>config</path>
  </bucket>


The alerts that Wazuh sends to Elasticsearch are now including all these AWS additions, so you can track all your AWS services / buckets using Kibana.

.. thumbnail:: ../images/release-notes/3.8.0/aws-alert.png
  :title: AWS sample alert
  :align: center
  :width: 100%

**Windows agents improvements**

- The inventory features for Windows are now using native queries directly to the Windows API, this adds value for this feature, enriches the inventory for Windows and guarantees that you can check your Windows agent accurately.
- Windows events are now being fetched in JSON format, which provides a useful format for third-party software and makes Wazuh be more optimized while analyzing Windows events. This improves Windows alerts result and analyzing performance.
- FIM for Windows agents now has the ability to detect changes in attributes and file permissions, this enriches a lot our FIM capabilities for Windows.


**New module for agent keys polling**

When Remoted reads an invalid key, now it can retrieve it from an external database server and store it to the `client.keys` file.

Details:

- Integrated agent key request to external data sources. 
- Look for missing or old agent keys when Remoted detects an authorization failure.
- Request agent keys by calling a defined executable or connecting to a local socket.

**FIM who-data changes**

- Added a health check for who-data monitoring features. It checks if the Audit events socket is working before starting the who-data engine in order to avoid start listening to it when it's blocked or disabled. 
- Checks if a rule already exists before trying to insert it to avoid flooding in the `audit.log` file.
- Who-data module is now able to re-connect to an Audit socket even if the instance is using enforcing with SELinux. Before this enhancement, Wazuh could not re-connect the socket after restart Wazuh if enforcing was being used along Audit.

**CDB lists auto build**

Now the CDB lists are built at installation time, so there is no need to execute `ossec-makelists` as before for the default lists. Custom lists (added after installation) still need to be compiled manually.

**Other**

- When upgrading, databases used for FIM purposes are now auto-upgraded by Wazuh (no need for scripts).
- Vulnerability detector has been improved for RedHat systems.
- This version also fixes some known issues when using Wazuh on ARM, HP-UX or AIX systems. 
- Logcollector component has been refactored, multiple known issues have been fixed, its performance has been also improved.

**External contributions**

Many thanks to all our external contributors!

Bob Vincent (`@pillarsdotnet <https://github.com/pillarsdotnet>`_):

- Improved IP address validation in the option ``<white_list>``.
- Improved rule option ``<info>`` validation. 
- Fixed error description in the osquery configuration parser. 
- The FTS comment option ``<ftscomment>`` was not being read. 

**Full changelog**

- `Wazuh core changelog <https://github.com/wazuh/wazuh/blob/master/CHANGELOG.md>`_.

Wazuh API 
---------

**New API calls for group management** 

- Add/remove multiple agents to/from a group at the same time. 

.. code-block:: console

  curl -u foo:bar -X POST -H "Content-Type:application/json" -d '{"ids":["001","002"]}' \
      "http://localhost:55000/agents/group/staging?pretty"
  {
    "error": 0,
    "data": {
        "msg": "All selected agents assigned to group staging",
        "affected_agents": [
          "001",
          "002"
        ]
    }
  }


- Add/remove multiple agents to/from a group at the same time. 

.. code-block:: console

  curl -u foo:bar -X DELETE -H "Content-Type:application/json" -d '{"ids":["002","001"]}' \
      "http://localhost:55000/agents/group/staging?pretty"
  {
    "error": 0,
    "data": {
        "msg": "All selected agents were removed to group staging",
        "affected_agents": [
          "002",
          "001"
        ]
    }
  }

- Edit group configuration file (agent.conf) uploading XML file with new configuration.

.. code-block:: console

  curl -u foo:bar -X POST -H 'Content-type: application/xml' -d @/tmp/agent.conf.xml \
      "http://localhost:55000/agents/groups/default/files/agent.conf?pretty"

      Missing output

- Added a new parameter named format for fetching the agent.conf content in JSON/XML format depending on the parameter value.

.. code-block:: console

  curl -u foo:bar -X GET "http://localhost:55000/agents/groups/default/files/agent.conf?format=xml&pretty"
  {
    "error": 0,
    "data": "<agent_config>  <!-- Shared agent configuration here --></agent_config>"
  }


This addition brings the user the ability to manage groups remotely, from now and onwards it's no longer needed to SSH into the manager instance to modify groups or to add/remove agents in groups.

**Wazuh API also has some fixes for this version such as**

- Now the Wazuh API service gets the group ID and user ID properly when using Docker containers.
- Added missing information when requesting certain files from a group.
- Rule variables from the Wazuh ruleset are now replaced by its real value when fetching rules.

**Full changelog**

- `Wazuh API changelog <https://github.com/wazuh/wazuh-api/blob/master/CHANGELOG.md>`_.

Wazuh app
---------

**Group management from the app is now available**. Manage your groups from the app, this feature includes:

- Edit group configuration (agent.conf), just open the XML editor we've added, edit the group configuration and send it to the Wazuh API.

.. thumbnail:: ../images/release-notes/3.8.0/xml-edit.png
  :title: XML editor
  :align: center
  :width: 100%

- Adding and removing agents in groups. An intuitive view has been added to drag-drop agents in your groups then a button is clicked and your groups are updated.

.. thumbnail:: ../images/release-notes/3.8.0/add-remove-agents.png
  :title: Add or remove agents
  :align: center
  :width: 100%

**New search bar for the agents' list**

- The search bar has been modified to provide an easier user experience. 
- Selectors were removed and the search bar was modified, now all the user needs is covered by this new search bar.
- It suggests filters, allows multiple filters at the same time, combines string searches with filters, same as before but now in one place.

.. thumbnail:: ../images/release-notes/3.8.0/search-bar.png
  :title: AWS sample alert
  :align: center
  :width: 100%

**New tables for an agent FIM monitored files**

- If the agent OS platform is Windows you'll see two new tables under FIM tab, the first one is for the files and the second one shows the Windows registry entries.

.. thumbnail:: ../images/release-notes/3.8.0/fim-files-windows.png
  :title: FIM monitored files for Windows
  :align: center
  :width: 100%

- On the other hand, if the agent is not using Windows, you'll see the agent files including many Linux related fields. 

.. thumbnail:: ../images/release-notes/3.8.0/fim-files-linux.png
  :title: FIM monitored files for Linux
  :align: center
  :width: 100%

- As most of the app tables, these tables include a search bar and sortable columns.


**Modify the Wazuh monitoring index pattern name**, this was added before for Wazuh alerts indices, now you can do the same for monitoring indices editing the app configuration file (config.yml).

.. code-block:: console

  # Default index pattern to use for Wazuh monitoring
  wazuh.monitoring.pattern: wazuh-monitoring-3.x-*

**Edit the app configuration file (config.yml) from the app**

- Those settings are shown at Settings > Configuration as before but now they include a pencil icon which allows you to edit certain settings.
- Note: Some settings need that Kibana is restarted before being applied.

.. thumbnail:: ../images/release-notes/3.8.0/settings-edit.png
  :title: AWS sample alert
  :align: center
  :width: 100%

**Other**

- The Dev Tools utility has been improved, small bugs fixed, resizable columns by dragging.
- Template check from the app health check now accepts multipattern templates.
- All known fields for all the index patterns are now refreshed on the app health check too.
- Added "Registered date" and "Last keep alive" in agents table allowing you to sort by these fields.
- Now the app looks for the request target if the destination is unreachable. Now you'll know if it was Elasticsearch or the Wazuh API.


**Full changelog**

- `Kibana Wazuh app changelog <https://github.com/wazuh/wazuh-kibana-app/blob/master/CHANGELOG.md>`_.
- `Splunk Wazuh app changelog <https://github.com/wazuh/wazuh-splunk/blob/master/CHANGELOG.md>`_.

Wazuh ruleset
-------------

Our ruleset this time comes with some new rules/decoders for Windows:

- Added new rules to support the new Windows eventchannel decoder. 
- Extend Auditd decoder to support more fields. 

And we've added a new rule to alert when an agent is removed. 

**Full changelog**

- `Wazuh ruleset changelog <https://github.com/wazuh/wazuh-ruleset/blob/master/CHANGELOG.md>`_.