.. _reference_agent_conf:

Centralized agent configuration
================================

Introduction
--------------------------------

Agents can be configured remotely by using the ``agent.conf`` file. The following capabilities can be configured remotely:

- :ref:`File Integrity monitoring <manual_file_integrity>` (**syscheck**)
- :ref:`Rootkit detection <manual_anomaly_detection>` (**rootcheck**)
- :ref:`Log analysis <manual_log_analysis>`

Below, it is explained the syntax of *agent.conf* and how it works the process of pushing the configuration from the manager to the agent.

agent.conf
--------------------------------
.. topic:: XML section name

	.. code-block:: xml

		<agent_config>
		    ...
		</agent_config>

The agent.conf is only valid on server installations.

The ``agent.conf`` exists in ``/var/ossec/etc/shared``.
It should be readable by the ossec user.

+------------+---------------------+
| Options    | Allowed values      |
+============+=====================+
| `name`_    | Any  agent name     |
+------------+---------------------+
| `os`_      | Any OS family       |
+------------+---------------------+
| `profile`_ | Any defined profile |
+------------+---------------------+


``name``
--------

This option allows you to assign the block to one particular agent.

.. topic:: Default value

	n/a

.. topic:: Allowed values

	Any agent name

.. topic:: Example

	.. code-block:: xml

		<agent_config name=”agent01”>


``os``
------

This option allows you to assign the block to an operating system.

.. topic:: Default value

	n/a

.. topic:: Allowed values

	Any OS family

.. topic:: Example

	.. code-block:: xml

		<agent_config os="Linux">


``profile``
-----------

This option allows you to assign a profile name to a block; so any agent configured to use the defined profile may use the block.

.. topic:: Default value

	n/a

.. topic:: Allowed values

	Any defined profile

.. topic:: Example

	.. code-block:: xml

		<agent_config profile="UnixHost">

Centralized configuration process
-----------------------------------

1. Configuration

Edit the file */var/ossec/etc/shared/agent.conf*.

You can create several configurations according to the *name*, *OS* or *profile* of an agent.

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
            <location>/var/log/database.loglocation>
            <log_format>syslog</log_format>
        </localfile>
    </agent_config>

2. Push the configuration to the agents

The manager will push the configuration automatically to the agents. It can take a while for it to complete, if you restart the manager the file will be pushed much faster.

3. Check if the agent received the configuration

Once the agent received the configuration, the "Client version" field will have the md5sum of the agent.conf file.

.. code-block:: console

    $ md5sum /var/ossec/etc/shared/agent.conf
    078b0711a8b2ee8b18e839afdafe6be0  /var/ossec/etc/shared/agent.conf

    $ /var/ossec/bin/agent_control -i 1032

    Wazuh agent_control. Agent information:
       Agent ID:   1032
       Agent Name: vpc-agent-ubuntu
       IP address: 10.0.0.122
       Status:     Active

       Operating system:    Linux vpc-agent-ubuntu.wazuh.com 3.13.0-57-generic #95-Ubuntu SMP Fri Jun 19 09:28:15 UTC 2015 x86_64
       Client version:      OSSEC Wazuh v1.2 / 078b0711a8b2ee8b18e839afdafe6be0
       Last keep alive:     Wed Feb 15 15:35:15 2017

       Syscheck last started  at: Wed Feb 15 13:24:32 2017
       Rootcheck last started at: Wed Feb 15 13:37:11 2017

Also, the API returns the md5sum of agent.conf in the field *sharedSum*:

.. code-block:: console

    $ curl -u foo:bar -k http://127.0.0.1:55000/agents/1032?pretty

    {
       "error": 0,
       "data": {
          "status": "Active",
          "name": "vpc-agent-ubuntu",
          "ip": "10.0.0.122",
          "dateAdd": "2016-12-22 11:59:08",
          "version": "OSSEC Wazuh v1.2",
          "sharedSum": "078b0711a8b2ee8b18e839afdafe6be0",
          "lastKeepAlive": "2017-02-15 15:44:57",
          "os": "Linux vpc-agent-ubuntu.wazuh.com 3.13.0-57-generic #95-Ubuntu SMP Fri Jun 19 09:28:15 UTC 2015 x86_64",
          "id": "1032"
       }
    }


4. Restart the agent

In order to apply the changes, you must restart the agent. It can be done remotely:

.. code-block:: console

    $ /var/ossec/bin/agent_control -R -u 1032

    Wazuh agent_control: Restarting agent: 1032
