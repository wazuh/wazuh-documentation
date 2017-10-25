.. _release_3_0_0:

3.0.0 Release Notes
===================

This section shows the most relevant new features of Wazuh v3.0.0. You will find more detailed information in our `changelog <https://github.com/wazuh/wazuh/blob/3.0/CHANGELOG.md>`_ file.

**New features:**

- `Grouping agents`_
- `Remote agent upgrades`_
- `Improved JSON integration`_
- `MSI Windows installer for agents`_
- `More relevant features`_
- `Wazuh API`_
- `Updated external libraries`_

Grouping agents
---------------

Since Wazuh 3.0.0 agents can be organized by groups making their centralized configuration much more flexible and efficient. We have a tool called :doc:`agent_groups <../user-manual/reference/tools/agent_groups>` to
manage groups easily, as well as the possibility of using the Wazuh API.

More information about this feature is found at :doc:`Grouping agents <../user-manual/agents/grouping-agents>`.

Remote agent upgrades
---------------------

Another important feature related to agents management are remote upgrades. The manager can upgrade each agent sending a WPK (Wazuh Signed Package) file
compressed and signed which performs the upgrade automatically.

For this reason, it will be available the necessaries WPK files for performing remote agent upgrades easily in each release. Additionally, it is possible to add a custom WPK repository.

In our dedicated section for :doc:`Remote upgrading <../user-manual/agents/remote-upgrading/index>` you can find more useful information.

Improved JSON integration
-------------------------

Wazuh has been incoporated a decoder for JSON format which can read any JSON log or event and extract its fields dynamically.
This way, we are able to use those dynamic fields for generating rules directly.

See the complete section of the :doc:`JSON decoder <../user-manual/ruleset/json-decoder>` for knowing how it works.

In order to make more powerful the JSON decoder, we have been improved the log data collector adding it the possibility of monitoring JSON log files. In addition, it can be included
personalized labels to these log files adding valuable metadata to our monitored JSON logs.

Here we can see a simple configuration where adding labels to a monitored JSON log file.

.. code-block:: xml

    <localfile>
      <location>/var/log/myapp/log.json</location>
      <log_format>json</log_format>
      <label key="@source">myapp</label>
      <label key="agent.type">webserver</label>
    </localfile>

Here we have a JSON log from the monitored file.

.. code-block:: json

  {
    "event": {
      "type": "write",
      "destination": "sample.txt"
    },
    "agent": {
      "name": "web01"
    }
  }

Joining the previous configuration with the JSON log, we obtain the following result.

.. code-block:: json

  {
    "event": {
      "type": "write",
      "destination": "sample.txt"
    },
    "agent": {
      "name": "web01",
      "type": "webserver"
    },
    "@source": "myapp"
  }

In the :doc:`localfile section <../user-manual/reference/ossec-conf/localfile>` of ``ossec.conf`` can be found how to configure this feature.

MSI Windows installer for agents
--------------------------------

A new Windows installer has been developed in order to improve the installation process for Windows agents. Among its many advantages, the new installer can be launched on
a command line automating the agent registration with `Authd` in a easy way.

The procedure for using the MSI installer can be found at the following section: :doc:`Install Wazuh agent on Windows <../../installation-guide/installing-wazuh-agent/wazuh_agent_windows>`


More relevant features
----------------------

Additional features have been added to Wazuh 3.0.0 in order to improve its performance. Most relevant of them are the following:

- Possibility of choose the Cipher suite in Authd settings.
- When a new shared configuration is added from the manager to an agent, this agent will be restarted automatically.
- New state 'pending' is shown for agents which are waiting for a manager response.
- Possibility of configure several manager for each agent, specifying its own protocol and port for each one of them.
- New function to rotate and compress internal logs by size.


Wazuh API
---------

The Wazuh API has significantly expanded its functionality, including the following features:

- Management of remote agent upgrades.
- Requests for managing groups.
- Management of the new Wazuh Cluster.

In addition, more new features could be found in the `API changelog <https://github.com/wazuh/wazuh-api/blob/master/CHANGELOG.md>`_.

Updated external libraries
--------------------------

External libraries used by Wazuh have been updated to improve their integration with our components.
