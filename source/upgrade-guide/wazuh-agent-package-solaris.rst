.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Check out how to upgrade the Wazuh agent to the latest available version remotely, using the agent_upgrade tool or the Wazuh API, or locally.


Ugrading Wazuh agents on Solaris systems
========================================

Select your Solaris Intel version and follow the steps to upgrade the Wazuh agent. 

.. tabs::

   .. group-tab:: Solaris 11
   
      The Wazuh agent upgrading process for Solaris 11 systems requires to download the latest `Solaris 11 i386 installer <https://packages.wazuh.com/|WAZUH_CURRENT_MAJOR_SOLARIS11|/solaris/i386/11/wazuh-agent_v|WAZUH_CURRENT_SOLARIS11|-sol11-i386.p5p>`_ or `Solaris 11 sparc installer <https://packages.wazuh.com/|WAZUH_CURRENT_MAJOR_SOLARIS11|/solaris/sparc/11/wazuh-agent_v|WAZUH_CURRENT_SOLARIS11|-sol11-sparc.p5p>`_ depending on the Solaris 11 host architecture.
   
      #. Stop the Wazuh agent:
   
         .. code-block:: console
   
            # /var/ossec/bin/wazuh-control stop
   
   
      #. After that, upgrade the Wazuh agent. Choose one option depending on the host architecture:
   
         * Solaris 11 i386:
   
            .. code-block:: console
   
               # pkg install -g wazuh-agent_v|WAZUH_CURRENT_SOLARIS11|-sol11-i386.p5p wazuh-agent
   
         * Solaris 11 sparc:
   
            .. code-block:: console
   
               # pkg install -g wazuh-agent_v|WAZUH_CURRENT_SOLARIS11|-sol11-sparc.p5p wazuh-agent
   
   
      #. Start the Wazuh agent:
   
         .. code-block:: console
   
            # /var/ossec/bin/wazuh-control start
   
   
   .. group-tab:: Solaris 10
   
      The Wazuh agent upgrading process for Solaris 10 systems requires to download the latest `Solaris 10 i386 installer <https://packages.wazuh.com/|WAZUH_CURRENT_MAJOR_SOLARIS10|/solaris/i386/10/wazuh-agent_v|WAZUH_CURRENT_SOLARIS10|-sol10-i386.pkg>`_ or `Solaris 10 sparc installer <https://packages.wazuh.com/|WAZUH_CURRENT_MAJOR_SOLARIS10|/solaris/sparc/10/wazuh-agent_v|WAZUH_CURRENT_SOLARIS10|-sol10-sparc.pkg>`_ depending on the Solaris 10 host architecture.
   
      #. Stop the Wazuh agent:
   
         .. code-block:: console
   
            # /var/ossec/bin/wazuh-control stop
   
   
      #. Backup the ``ossec.conf`` and ``client.keys`` files:
   
           .. code-block:: console
   
             # cp /var/ossec/etc/ossec.conf ~/ossec.conf.bk
             # cp /var/ossec/etc/client.keys ~/client.keys.bk
   
   
      #. Remove the Wazuh agent:
   
         .. code-block:: console
   
            # pkgrm wazuh-agent
   
   
      #. After that, install the Wazuh agent. Choose one option depending on the host architecture:
   
         * Solaris 10 i386:
   
            .. code-block:: console
   
               # pkgadd -d wazuh-agent_v|WAZUH_CURRENT_SOLARIS10|-sol10-i386.pkg wazuh-agent
   
         * Solaris 10 sparc:
   
            .. code-block:: console
   
               # pkgadd -d wazuh-agent_v|WAZUH_CURRENT_SOLARIS10|-sol10-sparc.pkg wazuh-agent
   
   
      #. Restore the ``ossec.conf`` and ``client.keys`` files:
   
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