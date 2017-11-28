Upgrading Wazuh agents
======================

Follow next steps in order to update your ``Wazuh v1.x`` agents to ``Wazuh v2.x``.

a) On DEB or RPM based **Linux systems**, you can easily rely on the packages manager to upgrade your agents. The process differs very little from installing a new agent. More information available in our documentation at:

  - :ref:`Install Wazuh agent with RPM packages <wazuh_agent_rpm>`
  - :ref:`Install Wazuh agent with Deb packages <wazuh_agent_deb>`

  You can check your agent version running the following command:

  .. code-block:: console

      # /var/ossec/bin/manage_agents -V

          Wazuh v2.0 - Wazuh Inc.

          This program is free software; you can redistribute it and/or modify
          it under the terms of the GNU General Public License (version 2) as
          published by the Free Software Foundation.

b) On **Windows**, **Mac OS** and other operating systems, we advise you to delete your previous version and install Wazuh v2.x from scratch. More information can be found at:

  - :ref:`Install Wazuh agent on Windows <wazuh_agent_windows>`
  - :ref:`Install Wazuh agent on Mac OS X <wazuh_agent_macos>`
