.. _installation_agents:

Installing Wazuh agent
======================

There are several ways to install a Wazuh agent, depending on the operating system and whether or not you wish to build from source. Consult the table below and choose how to proceed for a given agent:

+-------------------------------------------------+--------------------------------------------------+
| Type                                            | Description                                      |
+=================================================+==================================================+
| :doc:`Rpm packages <wazuh_agent_rpm>`           | Install Wazuh agents on CentOS/RHEL/Fedora.      |
+-------------------------------------------------+--------------------------------------------------+
| :doc:`Deb packages <wazuh_agent_deb>`           | Install Wazuh agents on Debian/Ubuntu.           |
+-------------------------------------------------+--------------------------------------------------+
| :doc:`Windows installer <agent-windows>`        | Install Wazuh agents on Windows.                 |
+-------------------------------------------------+--------------------------------------------------+
| :doc:`Mac OS installer <agent-macos>`           | Install Wazuh agents on Mac OS                   |
+-------------------------------------------------+--------------------------------------------------+
| :doc:`Sources <agent-sources>`                  | Install Wazuh agents from source code.           |
+-------------------------------------------------+--------------------------------------------------+

Once we have our agents installed, it is necessary to connect them with the manager. Check out the :ref:`registration process <connecting_agents>`.

.. topic:: Contents

    .. toctree::
        :maxdepth: 2

        wazuh_agent_rpm
        wazuh_agent_deb
        agent-windows
        agent-macos
        agent-sources
