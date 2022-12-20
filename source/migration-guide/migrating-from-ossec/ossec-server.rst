.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: If you want to know how to migrate from OSSEC to Wazuh, check this section where we explain how to do it without losing configuration data or agent keys.
   
.. _ossec_server:

Migrating OSSEC server
======================

Backup your files
-----------------

To avoid losing any configuration data, or agent keys, we will stop the OSSEC server and make a copy of the directory where it lives. But first, lets check if we have enough space to create a copy of ``/var/ossec``:

.. code-block:: console

   $ sudo du -h /var/ossec | tail -n1
   $ sudo df -h /var

Now we copy all files to a separated backup directory:

.. code-block:: console

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
     - .. code-block:: console

          $ sudo apt-get remove ossec-hids --purge
          $ sudo rm -f /etc/ossec-init.conf
          $ sudo rm -rf /var/ossec

   * - RPM packages
     - .. code-block:: console

          $ sudo yum remove ossec-hids
          $ sudo rm -f /etc/ossec-init.conf
          $ sudo rm -rf /var/ossec

   * - From sources
     - .. code-block:: console

          $ sudo rm -f /etc/ossec-init.conf
          $ sudo rm -rf /var/ossec

Install Wazuh server
--------------------

Now it's time to install the Wazuh server component. Read the :doc:`Installing Wazuh server </installation-guide/wazuh-server/index>` section for detailed instructions. Read the :doc:`/deployment-options/wazuh-from-sources/wazuh-server/index` section for an alternative to this.

Restore configuration
---------------------

Before restoring our previous settings please note that some configuration options have been deprecated or use a different syntax, what can cause the manager not to start properly. To avoid this, you can manually try to migrate your settings. Same thing happens with rules and decoders. In case of doubt take a look at our :doc:`User manual </user-manual/index>`.

The first step is to stop the manager processes:

.. code-block:: console

   $ sudo systemctl stop wazuh-manager

Now we will restore the following files:

.. code-block:: console

   $ cp -p /var/ossec_backup/agentless/.passlist /var/ossec/agentless/
   $ cp -p /var/ossec_backup/etc/client.keys /var/ossec/etc/
   $ cp -p /var/ossec_backup/etc/ossec.conf /var/ossec/etc/ossec.conf.orig
   $ cp -p /var/ossec_backup/etc/local_internal_options.conf /var/ossec/etc/local_internal_options.conf
   $ cp -p /var/ossec_backup/etc/local_decoder.xml /var/ossec/etc/decoders/local_decoder.xml
   $ cp -p /var/ossec_backup/etc/shared/agent.conf /var/ossec/etc/shared/default/agent.conf
   $ cp -p /var/ossec_backup/rules/local_rules.xml /var/ossec/etc/rules/local_rules.xml
   $ cp -p /var/ossec_backup/queue/rids/sender_counter /var/ossec/queue/rids/sender_counter

There have been some syntax changes, and new settings, incorporated to ``ossec.conf`` file. Please review this file manually in order to import parts of your previous configuration from ``ossec.conf.orig``. In addition, if you have existing ossec clients, then you may need to enable receiving UDP on port 1514 by changing the following block in ``ossec.conf``:

.. code-block:: xml

  <remote>
    <connection>secure</connection>
    <port>1514</port>
    <protocol>tcp</protocol>

To:

.. code-block:: xml

  <remote>
    <connection>secure</connection>
    <port>1514</port>
    <protocol>tcp,udp</protocol>

Also note that the ``agent.conf`` file directory has now changed to ``/var/ossec/etc/shared/default``.

Optionally the following files can be restored to preserve alert log files and syscheck/rootcheck databases:

.. code-block:: console

   $ cp -rp /var/ossec_backup/logs/archives/* /var/ossec/logs/archives
   $ cp -rp /var/ossec_backup/logs/alerts/* /var/ossec/logs/alerts
   $ cp -rp /var/ossec_backup/queue/rootcheck/* /var/ossec/queue/rootcheck
   $ cp -rp /var/ossec_backup/queue/syscheck/* /var/ossec/queue/syscheck

Finally we can start the services again. Please check ``/var/ossec/logs/ossec.log`` file to ensure there are no errors or warnings related to the settings migration.

.. code-block:: console

   $ sudo systemctl start wazuh-manager
