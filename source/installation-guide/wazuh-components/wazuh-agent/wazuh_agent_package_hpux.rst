.. Copyright (C) 2021 Wazuh, Inc.

.. meta:: :description: Learn how to install the Wazuh agent on HP-UX

.. _wazuh_agent_package_hpux:

HP-UX
=====

You can download the `HP-UX installer <https://packages.wazuh.com/|CURRENT_MAJOR|/hp-ux/wazuh-agent-|WAZUH_LATEST|-|WAZUH_REVISION_HPUX|-hpux-11v3-ia64.tar>`_ from our :ref:`packages list<packages>`. The installation steps are:

Create the user and the group OSSEC:

.. code-block:: console

    # groupadd wazuh
    # useradd -G wazuh wazuh

Unzip the package in ``/``:

.. code-block:: console

    # tar -xvf wazuh-agent-|WAZUH_LATEST|-|WAZUH_REVISION_HPUX|-hpux-11v3-ia64.tar

Start the service:

.. code-block:: console

    # /sbin/init.d/wazuh-agent start

Now that the agent is installed, the next step is to register and configure it to communicate with the manager. For more information about this process, please visit the document:  :ref:`user manual<register_agents>`.

Uninstall
---------

To uninstall the agent:

1. Stop the Wazuh agent service

    .. code-block:: console

      # /var/ossec/bin/wazuh-control stop

2. Delete ``wazuh`` user and group:

    .. code-block:: console

        # groupdel wazuh
        # userdel wazuh

3. Remove Wazuh files:

    .. code-block:: console

      # rm -rf /var/ossec
