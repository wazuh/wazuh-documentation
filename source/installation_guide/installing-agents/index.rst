.. _installation_agents:

Installing agents
======================================================

There are several ways to install a Wazuh agent, in order to determine which option is the most appropiate, please consult this table:

+-------------------------------------------------+--------------------------------------------------+
| Type                                            | Description                                      |
+=================================================+==================================================+
| :ref:`Rpm packages <wazuh_agent_rpm>`           | Install Wazuh agents using rpm packages.         |
+-------------------------------------------------+--------------------------------------------------+
| :ref:`Deb packages <wazuh_agent_deb>`           | Install Wazuh agents using deb packages.         |
+-------------------------------------------------+--------------------------------------------------+
| :ref:`Windows installer <wazuh_agent_windows>`  | Install Wazuh agents on Windows.                 |
+-------------------------------------------------+--------------------------------------------------+
| :ref:`Sources <wazuh_agent_other>`              | Install Wazuh agents from source code.           |
+-------------------------------------------------+--------------------------------------------------+

Once we have our agents installed, it is necessary to connect them with the manager. Check out the :ref:`registration process <connecting_agents>`.

.. topic:: Contents

    .. toctree::
        :maxdepth: 2

        packages-installation/index
        windows/index
        sources/index
