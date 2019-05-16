.. Copyright (C) 2019 Wazuh, Inc.

.. _ossec_agent:

Migrating OSSEC agent
=====================

The following instructions have been written to migrate OSSEC agents to Wazuh agents on Linux systems. For Windows and other platforms please check our :ref:`Installation guide <installation_guide>`.

Backup your files
-----------------

To avoid losing any configuration data, or the agent key, we will stop the OSSEC agent and make a copy of the directory where it lives. But first, lets check if we have enough space to create a copy of ``/var/ossec``:

.. code-block:: bash

   $ sudo du -h /var/ossec | tail -n1
   $ sudo df -h /var

Now we copy all files to a separated backup directory:

.. code-block:: bash

   $ sudo /var/ossec/bin/ossec-control stop
   $ sudo cp -rp /var/ossec /var/ossec_backup

Remove your current installation
--------------------------------

.. list-table::
   :widths: 30 70
   :header-rows: 1

   * - Installation type
     - How to remove OSSEC

   * - Deb packages
     - .. code-block:: bash

          $ sudo apt-get remove ossec-hids-agent --purge
          $ sudo rm -f /etc/ossec-init.conf
          $ sudo rm -rf /var/ossec

   * - RPM packages
     - .. code-block:: bash

          $ sudo yum remove ossec-hids-agent
          $ sudo rm -f /etc/ossec-init.conf
          $ sudo rm -rf /var/ossec

   * - From sources
     - .. code-block:: bash

          $ sudo rm -f /etc/ossec-init.conf
          $ sudo rm -rf /var/ossec

Install Wazuh agent
-------------------

Now it's time to install the Wazuh agent component. This can be done from sources or from binary packages. Go to our documentation to :ref:`Installing Wazuh agent <installation_agents>` section for detailed instructions on this process.

Restore configuration
---------------------

Before restoring our previous settings please note that some configuration options have been deprecated or use a different syntax, what can cause the agent not to start properly. To avoid this, you can manually try to migrate your settings. Same thing happens with rules and decoders. In case of doubt take a look at our :ref:`User manual <user_manual>`.

The first step is to stop the agent processes:

.. code-block:: bash

   $ systemctl stop wazuh-agent

Now we will restore the following files:

.. code-block:: bash

   $ cp -p /var/ossec_backup/etc/ossec.conf /var/ossec/etc/ossec.conf.orig
   $ cp -p /var/ossec_backup/etc/local_internal_options.conf /var/ossec/etc/local_internal_options.conf
   $ cp -p /var/ossec_backup/etc/client.keys /var/ossec/etc/
   $ cp -p /var/ossec_backup/queue/rids/* /var/ossec/queue/rids/

There have been some syntax changes, and new settings, incorporated to ``ossec.conf`` file. Please review this file manually in order to import your previous configuration. More specifically, one of the changes is the configuration stanza for the communication with the manager:

.. code-block:: xml

   <ossec_config>
     <client>
       <server-ip>MANAGER_IP</server-ip>

Finally we can start the agent again. Please check ``/var/ossec/logs/ossec.log`` file to ensure there are no errors or warnings related to the settings migration.

.. code-block:: bash

   $ systemctl start wazuh-agent
