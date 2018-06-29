.. Copyright (C) 2018 Wazuh, Inc.

.. _wazuh_agent_hpux:

Install Wazuh agent on HP-UX
============================

The Wazuh agent for HP-UX can be downloaded from our :doc:`packages list<../packages-list/index>`. The installation steps are:

Create the user and the group OSSEC:

.. code-block:: console

    # groupadd ossec
    # useradd -G ossec ossec

Unzip the package in ``/``:

.. code-block:: console

    # tar -xvf wazuh-agent-3.3.1-1-hpux-11v3-ia64.tar -C /

.. note:: Now that the agent is installed, the next step is to register and configure it to communicate with the manager. For more information about this process, please visit the :doc:`user manual<../../user-manual/registering/index>`.
