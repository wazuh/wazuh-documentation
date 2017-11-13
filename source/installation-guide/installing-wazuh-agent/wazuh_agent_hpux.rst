.. _wazuh_agent_hpux:

Install Wazuh agent on HP-UX
============================


HP-UX agent can be downloaded from our :doc:`packages list<../packages-list/index>`. The installation steps are:

Create user and group OSSEC:

.. code-block:: bash

    useradd ossec
    groupadd ossec

Unzip the package in ``/``:

.. code-block:: bash

    tar -xvf wazuh-agent-hpux-11v3-ia64.tar -C /

.. note:: At this point your agent is installed and you just need to register and configure it to talk to your manager. For more information about this process please visit our user manual.
