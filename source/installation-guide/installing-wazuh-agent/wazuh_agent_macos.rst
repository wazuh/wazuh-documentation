Install Wazuh agent on Mac OS X
===============================

Mac OS X agent can be downloaded from our :doc:`packages list<../packages-list/index>`. Current version has been tested on Mac OS X version 10.12 and should also be compatible with other versions. Installation options are:

  a) Using the command line::

        installer -pkg wazuh-agent-2.0-2.pkg -target /

  b) Using the GUI:

     Double click on the downloaded file and follow the wizard. If unsure, leave default answers.

     .. thumbnail:: ../../images/installation/macos.png
         :align: center

By default all agent files can be found at the following location: ``/Library/Ossec/etc/ossec.conf``.

.. note:: At this point your agent is installed and you just need to register and configure it to talk to your manager. For more information about this process please visit our user manual.
