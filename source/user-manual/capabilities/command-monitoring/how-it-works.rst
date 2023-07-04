.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Learn more about how the command monitoring configuration works and its configuration in this section of our documentation. 
  
How it works
============

.. thumbnail:: ../../../images/manual/command-monitoring/command-monitoring.png
  :title: Command monitoring workflow
  :alt: Command monitoring workflow
  :align: center
  :width: 100%

The following is required to set up the monitoring of a specific command's output on agents:

Configure Wazuh agents to accept remote commands from the manager
-----------------------------------------------------------------

Agents have the ability to run commands pushed from the manager (via the files in the ``shared`` directory). However, before this feature can be used, the agents must be explicitly configured to accept remote commands. This can be done by setting the :ref:`logcollector.remote_commands <ossec_internal_logcollector>` in the ``local_internal_options.conf`` file on each agent, as shown below:

.. code-block:: yaml

  # Logcollector - Whether or not to accept remote commands from the manager
  logcollector.remote_commands=1

Configure a command to monitor
------------------------------

The commands to run and monitor can be configured in the local the :ref:`ossec.conf <reference_ossec_conf>` file of individual agents. However, the ideal location for this configuration is in the appropriate configuration section of the :ref:`agent.conf <reference_agent_conf>` file on the manager.

Example::

  <localfile>
       <log_format>full_command</log_format>
       <command>.....</command>
       <frequency>120</frequency>
  </localfile>

Process the output
------------------

After configuring the system to monitor the command's output as if it were log data, custom rules can be created, like for :ref:`Log analysis <manual_log_analysis>` for instance, in order to process the output and trigger an alert when alert criteria are met.

.. note:: Read the `Scheduling remote commands for Wazuh agents <https://wazuh.com/blog/scheduling-remote-commands-for-wazuh-agents//>`_ document for more information and remote command use cases.
