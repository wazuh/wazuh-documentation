.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: The Wazuh File Integrity Monitoring system watches for modification of files in selected directories and triggers alerts when these files are modified. Learn more about it in this PoC.

File integrity monitoring
=========================

File Integrity Monitoring (FIM) helps you audit sensitive files and meet regulatory compliance requirements. Wazuh has a built-in FIM module that monitors file system changes to detect the creation, modification, and deletion of files. This use case uses the Wazuh FIM module to detect changes in monitored directories on Ubuntu and Windows endpoints. The Wazuh FIM module enriches finding data by fetching information about the user and process that made the changes using who-data audit.

Infrastructure
--------------

+--------------+------------------------------------------------------------------------------------------------------------+
| Endpoint     | Description                                                                                                |
+==============+============================================================================================================+
| Ubuntu 24.04 | The Wazuh FIM module monitors a directory on this endpoint to detect file creation, changes, and deletion. |
+--------------+------------------------------------------------------------------------------------------------------------+
| Windows 11   | The Wazuh FIM module monitors a directory on this endpoint to detect file creation, changes, and deletion. |
+--------------+------------------------------------------------------------------------------------------------------------+

Configuration
-------------

Ubuntu endpoint
^^^^^^^^^^^^^^^

Perform the following steps to configure the Wazuh agent to monitor file system changes in the ``/root`` directory.

#. Edit the Wazuh agent ``/var/ossec/etc/ossec.conf`` configuration file. Add the following configuration within the ``<syscheck>`` block to specify the monitored directory and who-data provider. For this use case, you configure Wazuh to monitor the ``/root`` directory:

   .. code-block:: xml

      <directories check_all="yes" report_changes="yes" whodata="yes">/root</directories>

      <whodata>
        <provider>ebpf</provider>
      </whodata>

   .. note::

      You can also configure any path of your choice in the ``<directories>`` block.

#. Restart the Wazuh agent to apply the configuration changes:

   .. code-block:: console

      $ sudo systemctl restart wazuh-agent

   .. note::

      Wait until the Wazuh agent finishes its initial scan before you test the configuration. The agent logs ``(6012): Real-time file integrity monitoring started.`` in the ``/var/ossec/logs/ossec.log`` file. Changes made before that aren't reported. See :ref:`Real-time monitoring <real_time_monitoring>`.

Windows endpoint
^^^^^^^^^^^^^^^^

Take the following steps to configure the Wazuh agent to monitor file system changes in the ``C:\Users\<USER_NAME>\Desktop`` directory.

#. Edit the ``C:\Program Files (x86)\ossec-agent\ossec.conf`` configuration file on the monitored Windows endpoint. Add the directories for monitoring within the ``<syscheck>`` block. To get additional information about the user and the process that made the changes, enable who-data audit. Replace ``<USER_NAME>`` with the name of the user:

   .. code-block:: xml

      <directories check_all="yes" report_changes="yes" whodata="yes">C:\Users\<USER_NAME>\Desktop</directories>

   .. note::

      You can also configure any path of your choice in the ``<directories>`` block.

#. Restart the Wazuh agent using PowerShell with administrator privileges to apply the changes:

   .. code-block:: powershell

      > Restart-Service -Name WazuhSvc

   .. note::

      Wait until the Wazuh agent finishes its initial scan before you test the configuration. The agent logs ``(6012): Real-time file integrity monitoring started.`` in the ``C:\Program Files (x86)\ossec-agent\ossec.log`` file. Changes made before that aren't reported. See :ref:`Real-time monitoring <real_time_monitoring>`.

As an alternative to local configurations on the Wazuh agents, you can :doc:`centrally configure groups of agents </user-manual/reference/centralized-configuration>`.

Test the configuration
----------------------

#. Create a text file in the monitored directory, then wait for 5 seconds.

#. Add content to the text file and save it. Then wait for 5 seconds.

#. Delete the text file from the monitored directory.

Visualize the findings
----------------------

You can visualize the findings in the Wazuh dashboard. To do this, navigate to **Endpoint security** > **File Integrity Monitoring** and click the **Findings** tab.

.. note::

   Findings appear in the dashboard a few minutes after each change. The Wazuh agents report real-time and who-data changes right away, and the ``wazuh-fim`` detector creates the findings on its next run, every minute in the default content.

-  Windows and Ubuntu findings for the simulated events

   .. thumbnail:: /images/poc/fim-findings.png
      :title: Windows and Ubuntu findings for the simulated events
      :alt: Wazuh dashboard File Integrity Monitoring Findings tab listing file created, modified, and deleted findings for the Ubuntu and Windows endpoints
      :align: center
      :width: 80%

-  Finding showing who-data information on Ubuntu

   .. thumbnail:: /images/poc/fim-findings-ubuntu.png
      :title: Finding showing who-data information on Ubuntu
      :alt: Wazuh dashboard Document Details panel showing who-data information for a file modified on the Ubuntu agent
      :align: center
      :width: 80%

-  Finding showing who-data information on Windows

   .. thumbnail:: /images/poc/fim-findings-windows.png
      :title: Finding showing who-data information on Windows
      :alt: Wazuh dashboard Document Details panel showing who-data information for a file modified on the Windows agent
      :align: center
      :width: 80%
