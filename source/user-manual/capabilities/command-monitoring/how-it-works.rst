How it works
============

.. thumbnail:: ../../../images/manual/command-monitoring/command-monitoring.png
  :title: Command monitoring
  :align: center
  :width: 100%

The following is required to set up the monitoring of a specific command's output on agents:

Configure Wazuh agents to accept remote commands from the manager
-----------------------------------------------------------------

It is usually best to locally configure agents to accept remote commands from the manager.  This is done by setting the :ref:`logcollector option<ossec_internal_logcollector>` in ``local_internal_options.conf`` on each agent.  If you will be using this widely, you can make this change part of the stock ``ossec.conf`` file you put on all newly installed agents.  Without allowing this feature, custom command monitoring configuration has to be added separately into each individual agent's ossec.conf file, which may quickly become impractical.  The only reason to not enable remote commands on an agent is if, for security reasons, you require that the Wazuh manager not has the capability to run arbitrary commands on that agent.

Example::

  # Logcollector - Whether or not to accept remote commands from the manager
  logcollector.remote_commands=1

Configure a command to monitor
------------------------------

The commands to run and monitor, can be configured either inside the local :ref:`ossec.conf <reference_ossec_conf>` of individual agents, but the ideal location would be the appropriate config section of :ref:`agent.conf <reference_agent_conf>` on the manager.

Example::

  <localfile>
       <log_format>full_command</log_format>
       <command>.....</command>
       <frequency>120</frequency>
  </localfile>

Process the output
------------------

After configuring the system to monitor the command's output as if it were log data, we can create custom rules like for :ref:`Log analysis <manual_log_analysis>`, in order to process the output and alert when is needed.
