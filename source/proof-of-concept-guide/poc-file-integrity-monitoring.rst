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

   The ebpf provider needs a Linux kernel with BPF ring buffer and BTF support (5.8 or later, which Ubuntu 24.04 meets). If its health check fails, the agent logs (``6959``) and switches to the audit provider, which needs the auditd package. See :ref:`Who-data monitoring <who-data-monitoring>` for both providers.

   .. note::

      You can also configure any path of your choice in the ``<directories>`` block.

#. Restart the Wazuh agent to apply the configuration changes:

   .. code-block:: console

      $ sudo systemctl restart wazuh-agent

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

As an alternative to local configurations on the Wazuh agents, you can :doc:`centrally configure groups of agents </user-manual/reference/centralized-configuration>`.

Test the configuration
----------------------

On the Ubuntu endpoint, run the following steps as root, for example with ``sudo``, because the monitored directory is ``/root``. Before you start, wait until the Wazuh agent finishes its initial scan. On the Ubuntu endpoint, the agent logs ``(6009): File integrity monitoring scan ended.`` in ``/var/ossec/logs/ossec.log``, and ``(6048): Healthcheck for eBPF FIM whodata module success.`` when the eBPF who-data engine is ready. Changes made before that aren't reported. On the Windows endpoint, wait until ``C:\Program Files (x86)\ossec-agent\ossec.log`` shows ``(6009): File integrity monitoring scan ended.`` and ``(6019): File integrity monitoring real-time Whodata engine started``. See :ref:`Real-time monitoring <real_time_monitoring>`.

Ubuntu endpoint
^^^^^^^^^^^^^^^

#. Create a text file in the monitored directory, then wait for 5 seconds:

   .. code-block:: console

      # echo "Hello from Wazuh FIM" > /root/fim-test.txt
      # sleep 5

#. Add content to the text file and save it. Then wait for 5 seconds:

   .. code-block:: console

      # echo "Modified content" >> /root/fim-test.txt
      # sleep 5

#. Delete the text file from the monitored directory:

   .. code-block:: console

      # rm /root/fim-test.txt

Windows endpoint
^^^^^^^^^^^^^^^^

#. Create a text file in the monitored directory, then wait for 5 seconds:

   .. code-block:: ps1con

      > Set-Content -Path C:\Users\<USER_NAME>\Desktop\fim-test.txt -Value "Hello from Wazuh FIM"
      > Start-Sleep 5

#. Add content to the text file and save it. Then wait for 5 seconds:

   .. code-block:: ps1con

      > Add-Content -Path C:\Users\<USER_NAME>\Desktop\fim-test.txt -Value "Modified content"
      > Start-Sleep 5

#. Delete the text file from the monitored directory:

   .. code-block:: ps1con

      > Remove-Item -Path C:\Users\<USER_NAME>\Desktop\fim-test.txt

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
