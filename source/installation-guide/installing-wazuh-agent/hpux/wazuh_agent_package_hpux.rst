.. Copyright (C) 2020 Wazuh, Inc.

.. _wazuh_agent_package_hpux:

HP-UX from package
==================
You can download the `HP-UX installer <https://packages.wazuh.com/3.x/hp-ux/wazuh-agent-|WAZUH_LATEST_HPUX|-|WAZUH_REVISION_HPUX|-hpux-11v3-ia64.tar>`_ from our :ref:`packages list<packages>`. The installation steps are:

Create the user and the group OSSEC:

.. code-block:: console

    # groupadd ossec
    # useradd -G ossec ossec

Unzip the package in ``/``:

.. code-block:: console

    # tar -xvf wazuh-agent-|WAZUH_LATEST_HPUX|-|WAZUH_REVISION_HPUX|-hpux-11v3-ia64.tar

Now that the agent is installed, the next step is to register and configure it to communicate with the manager. For more information about this process, please visit the document:  :ref:`user manual<register_agents>`.
