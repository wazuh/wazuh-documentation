.. Copyright (C) 2018 Wazuh, Inc.

.. _wazuh_agent_aix:

Install Wazuh agent on AIX
==============================

The Wazuh agent for AIX can be downloaded from our :doc:`packages list<../packages-list/index>`. The installation steps are:

Create user and group OSSEC:

.. code-block:: console

    # mkgroup ossec
    # useradd -G ossec ossec

Unzip the package in ``/``:

* Installing in AIX 5.3

.. code-block:: console

    # tar -xvf wazuh-agent_v3.2.2-aix5.3.tar

* Installing in AIX 6 and 7

.. code-block:: console

    # tar -xvf wazuh-agent_v3.2.2-aix6.1.tar

.. note:: Now that the agent is installed, the next step is to register and configure it to communicate with the manager. For more information about this process, please visit the :doc:`user manual<../../user-manual/registering/index>`.
