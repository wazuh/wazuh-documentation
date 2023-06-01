.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Check out how to upgrade the Wazuh agent to the latest available version remotely, using the agent_upgrade tool or the Wazuh API, or locally.


Upgrading Wazuh agents on Solaris systems
=========================================

Select your Solaris version and follow the steps to upgrade the Wazuh agent. 

.. tabs::

   .. group-tab:: Solaris 11
   
      #. Download the latest Solaris 11 installer. Choose one option depending on the host architecture. 
      
         * `Solaris 11 i386 installer <https://packages.wazuh.com/|WAZUH_CURRENT_MAJOR_SOLARIS11_i386|/solaris/i386/11/wazuh-agent_v|WAZUH_CURRENT_SOLARIS11_i386|-sol11-i386.p5p>`_ 

         * `Solaris 11 sparc installer <https://packages.wazuh.com/|WAZUH_CURRENT_MAJOR_SOLARIS11_SPARC|/solaris/sparc/11/wazuh-agent_v|WAZUH_CURRENT_SOLARIS11_SPARC|-sol11-sparc.p5p>`_
   
      #. Stop the Wazuh agent. 
   
         .. code-block:: console
   
            # /var/ossec/bin/wazuh-control stop
   
   
      #. Upgrade the Wazuh agent. Choose one option depending on the host architecture. 
   
         * Solaris 11 i386:
   
            .. code-block:: console
   
               # pkg install -g wazuh-agent_v|WAZUH_CURRENT_SOLARIS11_i386|-sol11-i386.p5p wazuh-agent
   
         * Solaris 11 sparc:
   
            .. code-block:: console
   
               # pkg install -g wazuh-agent_v|WAZUH_CURRENT_SOLARIS11_SPARC|-sol11-sparc.p5p wazuh-agent
   
   
      #. Start the Wazuh agent. 
   
         .. code-block:: console
   
            # /var/ossec/bin/wazuh-control start
   
   
   .. group-tab:: Solaris 10

      #. Download the latest Solaris 10 installer. Choose one option depending on the host architecture.
   
         * `Solaris 10 i386 installer <https://packages.wazuh.com/|WAZUH_CURRENT_MAJOR_SOLARIS10_i386|/solaris/i386/10/wazuh-agent_v|WAZUH_CURRENT_SOLARIS10_i386|-sol10-i386.pkg>`_ 

         * `Solaris 10 sparc installer <https://packages.wazuh.com/|WAZUH_CURRENT_MAJOR_SOLARIS10_SPARC|/solaris/sparc/10/wazuh-agent_v|WAZUH_CURRENT_SOLARIS10_SPARC|-sol10-sparc.pkg>`_ 
   
      #. Stop the Wazuh agent.
   
         .. code-block:: console
   
            # /var/ossec/bin/wazuh-control stop
   
   
      #. Backup the ``ossec.conf`` and ``client.keys`` files.
   
           .. code-block:: console
   
             # cp /var/ossec/etc/ossec.conf ~/ossec.conf.bk
             # cp /var/ossec/etc/client.keys ~/client.keys.bk
   
   
      #. Remove the Wazuh agent.
   
         .. code-block:: console
   
            # pkgrm wazuh-agent
   
   
      #. Install the Wazuh agent. Choose one option depending on the host architecture.
   
         * Solaris 10 i386:
   
            .. code-block:: console
   
               # pkgadd -d wazuh-agent_v|WAZUH_CURRENT_SOLARIS10_i386|-sol10-i386.pkg wazuh-agent
   
         * Solaris 10 sparc:
   
            .. code-block:: console
   
               # pkgadd -d wazuh-agent_v|WAZUH_CURRENT_SOLARIS10_SPARC|-sol10-sparc.pkg wazuh-agent
   
   
      #. Restore the ``ossec.conf`` and ``client.keys`` files.
   
         .. code-block:: console
   
            # mv ~/ossec.conf.bk /var/ossec/etc/ossec.conf
            # chown root:wazuh /var/ossec/etc/ossec.conf
            # mv ~/client.keys.bk /var/ossec/etc/client.keys
            # chown root:wazuh /var/ossec/etc/client.keys
   
   
      #. Start the Wazuh agent.
   
         .. code-block:: console
   
            # /var/ossec/bin/wazuh-control start


.. note::
   :class: not-long

   When upgrading agents from versions earlier than 4.x, make sure that the communication protocol is compatible. Up to that point, UDP was the default protocol and it was switched to TCP for later versions. Edit the agent configuration file ``ossec.conf`` to update the :ref:`protocol <server_protocol>` or make sure that your Wazuh manager accepts :ref:`both protocols<manager_protocol>`. 