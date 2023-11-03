.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: The Wazuh File Integrity Monitoring system watches for modification of files in selected directories and triggers alerts when these files are modified. Learn more about it in this PoC.

File integrity monitoring
=========================

File Integrity Monitoring (FIM) helps in auditing sensitive files and meeting regulatory compliance requirements. Wazuh has an inbuilt :doc:`FIM </user-manual/capabilities/file-integrity/index>` module that monitors file system changes to detect the creation, modification, and deletion of files.

This use case uses the Wazuh FIM module to detect changes in monitored directories on Ubuntu and Windows endpoints. The Wazuh FIM module enriches alert data by fetching information about the user and process that made the changes using :ref:`who-data audit <who-data-monitoring>`.

Infrastructure 
--------------

+---------------+-----------------------------------------------------------------------------------------------------------------+
| Endpoint      | Description                                                                                                     |
+===============+=================================================================================================================+
| Ubuntu 22.04  | The Wazuh FIM module monitors a directory on this endpoint to detect file creation, changes, and deletion.      |
+---------------+-----------------------------------------------------------------------------------------------------------------+
| Windows 11    | The Wazuh FIM module monitors a directory on this endpoint to detect file creation, changes, and deletion.      |
+---------------+-----------------------------------------------------------------------------------------------------------------+

Configuration
-------------

Ubuntu endpoint
^^^^^^^^^^^^^^^

Perform the following steps to configure the Wazuh agent to monitor filesystem changes in the ``/root`` directory.

#. Edit the Wazuh agent ``/var/ossec/etc/ossec.conf`` configuration file. Add the directories for monitoring within the ``<syscheck>`` block. For this use case, you configure Wazuh to monitor the ``/root`` directory. To get additional information about the user and process that made the changes, enable :ref:`who-data audit <who-data-monitoring-linux>`:

   .. code-block:: xml

      <directories check_all="yes" report_changes="yes" realtime="yes">/root</directories>

   .. note::
   
      You can also configure any path of your choice in the ``<directories>`` block.

#. Restart the Wazuh agent to apply the configuration changes:

   .. code-block:: console

      $ sudo systemctl restart wazuh-agent


Windows endpoint
^^^^^^^^^^^^^^^^

Take the following steps to configure the Wazuh agent to monitor filesystem changes in the ``C:\Users\Administrator\Desktop`` directory.

#. Edit the ``C:\Program Files (x86)\ossec-agent\ossec.conf`` configuration file on the monitored Windows endpoint. Add the directories for monitoring within the ``<syscheck>`` block. For this use case, you  configure Wazuh to monitor the ``C:\Users\Administrator\Desktop`` directory. To get additional information about the user and process that made the changes, enable :ref:`who-data audit <who-data-monitoring-windows>`:

   .. code-block:: xml

      <directories check_all="yes" report_changes="yes" realtime="yes">C:\Users\<USER_NAME>\Desktop</directories>

   .. note::
   
      You can also configure any path of your choice in the ``<directories>`` block.

#. Restart the Wazuh agent using Powershell with administrator privileges to apply the changes:

   .. code-block:: powershell

      > Restart-Service -Name wazuh

As an alternative to local configurations on the Wazuh agents, you can :doc:`centrally configure groups of agents </user-manual/reference/centralized-configuration>`.

Test the configuration
----------------------

#. Create a text file in the monitored directory then wait for 5 seconds.

#. Add content to the text file and save it. Wait for 5 seconds.

#. Delete the text file from the monitored directory.

Visualize the alerts
--------------------

You can visualize the alert data in the Wazuh dashboard. To do this, go to the **Threat hunting** module and add the filters in the search bar to query the alerts:

-  Ubuntu - ``rule.id: is one of 550,553,554``

   .. thumbnail:: /images/poc/fim-alerts-ubuntu.png
         :title: Visualize FIM alerts from Ubuntu system
         :align: center
         :width: 80%

-  Windows - ``rule.id: is one of 550,553,554``

   .. thumbnail:: /images/poc/fim-alerts-windows.png
         :title: Visualize FIM alerts from Ubuntu system
         :align: center
         :width: 80%
