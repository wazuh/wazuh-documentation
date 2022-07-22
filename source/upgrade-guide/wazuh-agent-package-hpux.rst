.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Check out how to upgrade the Wazuh agent to the latest available version remotely, using the agent_upgrade tool or the Wazuh API, or locally.


Ugrading Wazuh agents on HPUX systems
=====================================

The Wazuh agent upgrading process for HP-UX systems requires to download the latest `HP-UX installer <https://packages.wazuh.com/|WAZUH_CURRENT_MAJOR_HPUX|/hp-ux/wazuh-agent-|WAZUH_CURRENT_HPUX|-|WAZUH_REVISION_HPUX|-hpux-11v3-ia64.tar>`_.

#. Stop the Wazuh agent:

   .. code-block:: console

      # /var/ossec/bin/wazuh-control stop


#. Backup the ``ossec.conf`` configuration file:

   .. code-block:: console

      # cp /var/ossec/etc/ossec.conf ~/ossec.conf.bk
      # cp /var/ossec/etc/client.keys ~/client.keys.bk


#. **Only for upgrades from version 4.2.7 or lower**:  
      
   #. Delete ossec user and group:

      .. code-block:: console

         # groupdel ossec
         # userdel ossec

   #. Create the wazuh user and group:

      .. code-block:: console

         # groupadd wazuh
         # useradd -G wazuh wazuh

#. Deploy the Wazuh agent files:

   .. code-block:: console

      # tar -xvf wazuh-agent-|WAZUH_CURRENT_HPUX|-|WAZUH_REVISION_HPUX|-hpux-11v3-ia64.tar


#. Restore the ``ossec.conf`` configuration file:

   .. code-block:: console

      # mv ~/ossec.conf.bk /var/ossec/etc/ossec.conf
      # chown root:wazuh /var/ossec/etc/ossec.conf
      # mv ~/client.keys.bk /var/ossec/etc/client.keys
      # chown root:wazuh /var/ossec/etc/client.keys


#. Start the wazuh-agent:

   .. code-block:: console

      # /var/ossec/bin/wazuh-control start

.. note::

   Once the Wazuh agent is upgraded, if it still uses UDP, which was the default protocol for versions prior to Wazuh 4.x, it must be changed to TCP in the ``ossec.conf`` file:
   
   .. code-block:: console
     :emphasize-lines: 6
   
     <ossec_config>
       <client>
         <server>
           <address>172.16.1.17</address>
           <port>1514</port>
           <protocol>udp</protocol>
         </server>               
