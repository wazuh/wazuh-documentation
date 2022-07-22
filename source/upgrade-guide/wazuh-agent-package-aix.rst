.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Check out how to upgrade the Wazuh agent to the latest available version remotely, using the agent_upgrade tool or the Wazuh API, or locally.


Ugrading Wazuh agents on AIX systems
====================================
  
  
The Wazuh agent upgrading process for AIX systems requires to download the latest `AIX installer <https://packages.wazuh.com/|WAZUH_CURRENT_MAJOR_AIX|/aix/wazuh-agent-|WAZUH_CURRENT_AIX|-|WAZUH_REVISION_AIX|.aix.ppc.rpm>`_ and run the following command:

   .. code-block:: console

      # rpm -U wazuh-agent-|WAZUH_CURRENT_AIX|-|WAZUH_REVISION_AIX|.aix.ppc.rpm



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