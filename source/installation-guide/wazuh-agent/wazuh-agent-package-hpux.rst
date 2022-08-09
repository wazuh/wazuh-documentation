.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Learn more about how to successfully install the Wazuh agent on HP-UX systems in this section of our Installation Guide.

.. _wazuh_agent_package_hpux:

Installing Wazuh agents on HP-UX systems
========================================

The installed agent runs on the host you want to monitor and communicates with the Wazuh manager, sending data in near real time through an encrypted and authenticated channel. 


#. To start the installation process, download the `HP-UX installer <https://packages.wazuh.com/|WAZUH_CURRENT_MAJOR_HPUX|/hp-ux/wazuh-agent-|WAZUH_CURRENT_HPUX|-|WAZUH_REVISION_HPUX|-hpux-11v3-ia64.tar>`_. 

#. Create the ``wazuh`` user and group.
   
   .. code-block:: console
   
       # groupadd wazuh
       # useradd -G wazuh wazuh
   
#. Unzip the package in ``/``.

   .. code-block:: console
   
       # tar -xvf wazuh-agent-|WAZUH_CURRENT_HPUX|-|WAZUH_REVISION_HPUX|-hpux-11v3-ia64.tar

#. Edit ``/var/ossec/etc/ossec.conf`` and add the Wazuh manager IP address. The agent registers automatically with the manager through enrollment, configuration details can be found on the :doc:`Enrollment section </user-manual/reference/ossec-conf/client>`.

   .. code-block:: console
   
      <server>
        <address>WAZUH_MANAGER_IP</address>
        <port>1514</port>
        <protocol>tcp</protocol>
      </server>


#. To complete the installation and registration process, start the Wazuh agent service.

   .. code-block:: console
   
       # /sbin/init.d/wazuh-agent start


The installation process is now complete and the Wazuh agent is successfully installed and registered.  

Uninstall a Wazuh agent
-----------------------

To uninstall the agent, follow these steps: 

1. Stop the Wazuh agent service.

    .. code-block:: console

      # /var/ossec/bin/wazuh-control stop

2. Delete ``wazuh`` user and group:

    .. code-block:: console

        # groupdel wazuh
        # userdel wazuh

3. Remove Wazuh files.

    .. code-block:: console

      # rm -rf /var/ossec

The Wazuh agent is now completely removed from your HP-UX system.
