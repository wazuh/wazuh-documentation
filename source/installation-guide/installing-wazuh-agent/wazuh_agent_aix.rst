.. Copyright (C) 2018 Wazuh, Inc.

.. _wazuh_agent_aix:

Install Wazuh agent on AIX
==============================

The Wazuh agent for AIX can be downloaded from our :doc:`packages list<../packages-list/index>`. Once the RPM package is downloaded, install it as follows:

.. code-block:: console

    # rpm -ivh wazuh-agent-3.8.1-1.aix5.3.ppc.rpm

.. note:: Now that the agent is installed, the next step is to register and configure it to communicate with the manager. For more information about this process, please visit the :doc:`user manual<../../user-manual/agents/registering/index>`.
