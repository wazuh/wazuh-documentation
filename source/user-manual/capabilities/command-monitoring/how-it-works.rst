.. Copyright (C) 2019 Wazuh, Inc.

How it works
============

.. thumbnail:: ../../../images/manual/command-monitoring/command-monitoring.png
  :title: Command monitoring
  :align: center
  :width: 100%

The following is required to set up the monitoring of a specific command's output on agents:

Configure Wazuh agents to accept remote commands from the manager
-----------------------------------------------------------------

Agents have the ability to run commands pushed from the manager (via the files in the ``shared`` directory). Before this feature can be used, however, the agents must be explicitly configured to accept remote commands. This can be done by setting the :ref:`logcollector.remote_commands <ossec_internal_logcollector>` in the ``local_internal_options.conf`` file on each agent as shown below::

  # Logcollector - Whether or not to accept remote commands from the manager
  logcollector.remote_commands=1

Configure a command to monitor
------------------------------

The commands to run and monitor can be configured in the local the :ref:`ossec.conf <reference_ossec_conf>` file of individual agents, however, the ideal location for this configuration is in the appropriate configuration section of the :ref:`agent.conf <reference_agent_conf>` file on the manager.

Example::

  <localfile>
       <log_format>full_command</log_format>
       <command>.....</command>
       <frequency>120</frequency>
  </localfile>

Process the output
------------------

After configuring the system to monitor the command's output as if it were log data, custom rules can be created, like for :ref:`Log analysis <manual_log_analysis>` for instance, in order to process the output and trigger an alert when alert criteria are met.
