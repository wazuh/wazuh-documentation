.. _wazuh_agent_windows:

Install Wazuh agent on Windows
==============================

Download the Windows installer from our :doc:`packages list<../packages-list/index>`. Installation options are:

  a) Using the command line (the ``/S`` argument is used for unattended installations)::

        wazuh-agent-2.0.exe /S

  b) Using the GUI:

     Double click on the downloaded file and follow the wizard. If unsure, leave default answers.

Once installed, the agent includes a graphic user interface that can be used to configure it, to open the log file or to start/stop the service.

  .. thumbnail:: ../../images/manual/windows-agent.png
      :align: center
      :width: 320 px

By default all agent files can be found at the following location: ``C:\Program Files(x86)\ossec-agent``.

.. note:: At this point your agent is installed and you just need to register and configure it to talk to your manager. For more information about this process please visit our user manual.
