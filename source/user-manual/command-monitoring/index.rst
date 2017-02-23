.. _manual_command_monitoring:

Command monitoring
==================

Sometimes what we want to monitor is not included on the logs. To solve that gap, Wazuh incorpore the ability to monitor the commands ouput and treat the output as any other log.

Command monitoring is configured inside the :ref:`ossec.conf <reference_ossec_conf>`, in the :ref:`localfile section<reference_ossec_localfile>`. It can be configured in the :ref:`agent.conf<reference_agent_conf>` file also.

.. topic:: Contents

    .. toctree::
        :maxdepth: 1

        command-examples
        command-faq

How it works
------------

In order to monitor the command ouput on a server we differenciate some phases:

Configure Wazuh in order to monitor a command
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

We need to configure the agent in order to support remote commands from the manager. This is configured on the ``internal_options.conf`` file with the :ref:`logcollector option<reference_ossec_logcollector>`.

Example::

  # Logcollector - If it should accept remote commands from the manager
  logcollector.remote_commands=1

Configure the commands to monitor
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Inside the :ref:`ossec.conf <reference_ossec_conf>` or :ref:`agent.conf <reference_agent_conf>`, we configure the commands that are going to be monitored by Wazuh.

Example::

  <localfile>
       <log_format>full_command</log_format>
       <command>.....</command>
       <frequency>120</frequency>
  </localfile>

Process the output
^^^^^^^^^^^^^^^^^^

After configuring the system to monitor the command output as one more log, we can create custom rules like for :ref:`Log anlaysis <manual_log_analysis>`, in order to process the output and alert when is needed.
