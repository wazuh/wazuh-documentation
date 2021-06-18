.. Copyright (C) 2021 Wazuh, Inc.

.. meta:: :description: Learn how to install the Wazuh agent on HP-UX

.. _wazuh_agent_package_hpux:


Installing Wazuh agents on HP-UX systems
========================================

The installed agent runs on the host you want to monitor and communicates with the Wazuh manager, sending data in near real time through an encrypted and authenticated channel. Alternatively, if you want to download the Wazuh agent package directly or check the compatible versions, see the :ref:`packages list <packages>` section. 

#. Download the `HP-UX installer <https://packages.wazuh.com/|CURRENT_MAJOR|/hp-ux/wazuh-agent-|WAZUH_LATEST|-|WAZUH_REVISION_HPUX|-hpux-11v3-ia64.tar>`_. 

#. Create the ``ossec`` user and group:
   
   .. code-block:: console
   
       # groupadd ossec
       # useradd -G ossec ossec
   
#. Unzip the package in ``/``:

   .. code-block:: console
   
       # tar -xvf wazuh-agent-|WAZUH_LATEST|-|WAZUH_REVISION_HPUX|-hpux-11v3-ia64.tar

#. Start the service:

   .. code-block:: console
   
       # /sbin/init.d/wazuh-agent start


You now have an installed Wazuh agent, the next step is to register and configure it to communicate with the Wazuh manager. See :ref:`Registering Wazuh agents <register_agents>`.        

Uninstall a Wazuh agent
-----------------------

To uninstall the agent follow the next steps. 

1. Stop the Wazuh agent service:

    .. code-block:: console

      # /var/ossec/bin/ossec-control stop

2. Delete ``ossec`` user and group:

    .. code-block:: console

        # groupdel ossec
        # userdel ossec

3. Remove Wazuh files:

    .. code-block:: console

      # rm -rf /var/ossec
