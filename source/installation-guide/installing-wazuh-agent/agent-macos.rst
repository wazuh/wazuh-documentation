Installing Wazuh agent on Mac OS X
==================================

This agent has been tested on Darwin 10.12 (it should also be compatible with other versions). To install the agent this command needs to be run:

#. Download Mac OS package on :doc:`package index<../packages-list/index>`

#. Installation

    - via command line:

      ::

        installer -pkg wazuh-agent-2.0-2.pkg -target /

    - via GUI

      Double click on the downloaded file. Follow the steps on the installer:

      .. thumbnail:: ../../images/installation/macos.png
          :align: center

#. Wazuh agent resgistration (via OSSEC authd):

    ::

      /Library/Ossec/bin/agent-auth -m OSSEC_SERVER -p OSSEC_AUTHD_PORT

#. Wazuh agent configuration:

    Configuration file ``/Library/Ossec/etc/ossec.conf`` need to be edited to add the right server:

    ::

      <server-ip>IP_OF_OSSEC_SERVER</server-ip>

    And agent needs to be started:

    ::

      /Library/Ossec/bin/ossec-control start
