.. _wazuh_agent_macos:

Install Wazuh agent on Mac OS X
===============================

Mac OS X agent can be downloaded from our :doc:`packages list<../packages-list/index>`. The current version has been tested on Mac OS X 10.12 and should be compatible with other versions. You can install it via:

  a) The command line::

        installer -pkg wazuh-agent-2.0-2.pkg -target /

  b) The GUI:

     Double click on the downloaded file and follow the wizard. If unsure, leave default answers.

     .. thumbnail:: ../../images/installation/macos.png
         :align: center

By default all agent files can be found at the following location: ``/Library/Ossec/``.

.. note:: At this point, your agent is installed and you just need to register and configure it to talk to your manager. For more information about this process please visit our user manual at the :ref:`Registering agents <connecting_agents>` section.
