.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: The Wazuh File Integrity Monitoring module detects the creation, modification, and deletion of files in monitored directories and shows the user and process behind each change. Learn more about it in this PoC.

File integrity monitoring
=========================

File integrity monitoring (FIM) detects when files are created, changed, or deleted. It helps you audit sensitive files and meet regulatory compliance requirements. In this use case, you configure the :doc:`Wazuh FIM module </user-manual/capabilities/file-integrity/index>` to monitor a directory on the Ubuntu and Windows endpoints. With who-data enabled, each finding also shows the user and the process that made the change.

Endpoints
---------

+---------------------+-------------------------------------------------------------------------------+
| Endpoint            | Role                                                                          |
+=====================+===============================================================================+
| Ubuntu 24.04        | The Wazuh FIM module monitors the ``/root`` directory.                        |
+---------------------+-------------------------------------------------------------------------------+
| Windows Server 2022 | The Wazuh FIM module monitors the ``C:\Users\<USER_NAME>\Desktop`` directory. |
+---------------------+-------------------------------------------------------------------------------+

Configuration
-------------

Ubuntu endpoint
^^^^^^^^^^^^^^^

#. Edit the Wazuh agent configuration file ``/var/ossec/etc/ossec.conf``. Add the following lines inside the ``<syscheck>`` block. They monitor ``/root`` with who-data and set ``ebpf`` as the who-data provider:

   .. code-block:: xml

      <directories check_all="yes" report_changes="yes" whodata="yes">/root</directories>

      <whodata>
        <provider>ebpf</provider>
      </whodata>

   .. note::

      The ``ebpf`` provider needs a Linux kernel with BPF ring buffer and BPF Type Format (BTF) support (5.8 or later, which Ubuntu 24.04 meets). If its health check fails, the agent logs ``(6959)`` and switches to the ``audit`` provider, which needs the ``auditd`` package. See :ref:`Who-data monitoring <who-data-monitoring>` for both providers.

   .. note::

      You can monitor any other path by changing the ``<directories>`` value.

#. Restart the Wazuh agent to apply the changes:

   .. code-block:: console

      $ sudo systemctl restart wazuh-agent

Windows endpoint
^^^^^^^^^^^^^^^^

#. Edit ``C:\Program Files (x86)\ossec-agent\ossec.conf``. Add the following line inside the ``<syscheck>`` block and replace ``<USER_NAME>`` with the name of the user:

   .. code-block:: xml

      <directories check_all="yes" report_changes="yes" whodata="yes">C:\Users\<USER_NAME>\Desktop</directories>

#. Restart the Wazuh agent in PowerShell with administrator privileges:

   .. code-block:: ps1con

      > Restart-Service -Name WazuhSvc

To configure multiple agents at once, you can use :doc:`centralized configuration </user-manual/reference/centralized-configuration>` for groups of agents instead of editing each agent.

.. _poc_fim_test_configuration:

Test the configuration
----------------------

Before you start, wait for the Wazuh agent to finish its first FIM scan. Changes made before that aren't reported. Check the agent log for the messages in the following table.

+----------+--------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------+
| Endpoint | Log file                                         | Messages to wait for                                                                                                          |
+==========+==================================================+===============================================================================================================================+
| Ubuntu   | ``/var/ossec/logs/ossec.log``                    | ``(6009): File integrity monitoring scan ended.`` and ``(6048): Healthcheck for eBPF FIM whodata module success.``            |
+----------+--------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------+
| Windows  | ``C:\Program Files (x86)\ossec-agent\ossec.log`` | ``(6009): File integrity monitoring scan ended.`` and ``(6019): File integrity monitoring real-time Whodata engine started.`` |
+----------+--------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------+

Ubuntu endpoint
^^^^^^^^^^^^^^^

Run these commands as root, because the monitored directory is ``/root``.

#. Create a text file in the monitored directory, then wait 5 seconds:

   .. code-block:: console

      # echo "Hello from Wazuh FIM" > /root/fim-test.txt
      # sleep 5

#. Add content to the file, then wait 5 seconds:

   .. code-block:: console

      # echo "Modified content" >> /root/fim-test.txt
      # sleep 5

#. Delete the file:

   .. code-block:: console

      # rm /root/fim-test.txt

Windows endpoint
^^^^^^^^^^^^^^^^

#. Create a text file in the monitored directory, then wait 5 seconds:

   .. code-block:: ps1con

      > Set-Content -Path C:\Users\<USER_NAME>\Desktop\fim-test.txt -Value "Hello from Wazuh FIM"
      > Start-Sleep 5

#. Add content to the file, then wait 5 seconds:

   .. code-block:: ps1con

      > Add-Content -Path C:\Users\<USER_NAME>\Desktop\fim-test.txt -Value "Modified content"
      > Start-Sleep 5

#. Delete the file:

   .. code-block:: ps1con

      > Remove-Item -Path C:\Users\<USER_NAME>\Desktop\fim-test.txt

View the findings
-----------------

You see one finding for each change, for example ``Wazuh FIM - File created - <FILE_PATH>``, ``Wazuh FIM - File modified - <FILE_PATH>``, and ``Wazuh FIM - File deleted - <FILE_PATH>``. Here, ``<FILE_PATH>`` is the full path of the test file.

#. In the Wazuh dashboard, go to **Endpoint security** > **File Integrity Monitoring**.

#. Select the **Findings** tab.

   .. note::

      Findings appear a few minutes after each change. The Wazuh agents report real-time and who-data changes right away, and the ``wazuh-fim`` detector creates the findings on its next run, every minute in the default content.

You see findings for the file creation, modification, and deletion on both endpoints.

.. thumbnail:: /images/poc/fim-findings.png
   :title: Windows and Ubuntu findings for the simulated events
   :alt: Wazuh dashboard File Integrity Monitoring Findings tab listing the file created, modified, and deleted findings for the Ubuntu and Windows endpoints
   :align: center
   :width: 80%

Expand a finding to see the who-data information, such as the user and process that made the change.

-  On the Ubuntu endpoint

   .. thumbnail:: /images/poc/fim-findings-ubuntu.png
      :title: Finding showing who-data information on Ubuntu
      :alt: Document details of a Wazuh FIM finding on the Ubuntu endpoint, with the user and process that modified the file
      :align: center
      :width: 80%

-  On the Windows endpoint

   .. thumbnail:: /images/poc/fim-findings-windows.png
      :title: Finding showing who-data information on Windows
      :alt: Document details of a Wazuh FIM finding on the Windows endpoint, with the user and process that modified the file
      :align: center
      :width: 80%

Troubleshooting
---------------

+------------------------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------+
| Check                                    | How                                                                                                                                                 |
+==========================================+=====================================================================================================================================================+
| The first FIM scan ended                 | The ``(6009)`` message from :ref:`Test the configuration <poc_fim_test_configuration>` is in the agent log. Run the test again after it.            |
+------------------------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------+
| Who-data started                         | Ubuntu: the ``(6048)`` message is in the log. If not, check that ``/sys/kernel/btf/vmlinux`` exists. Windows: the ``(6019)`` message is in the log. |
+------------------------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------+
| The path is monitored                    | The ``<directories>`` line names ``/root`` (Ubuntu) or the Desktop folder (Windows).                                                                |
+------------------------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------+
| Extra findings for other files           | A text editor creates swap and backup files in the monitored directory. Use the commands in this guide instead.                                     |
+------------------------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------+
| The filter matches                       | Windows paths are lowercase in the finding. Filter on ``file.name``.                                                                                |
+------------------------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------+
| The ``wazuh-fim`` integration is enabled | **Ruleset management** > **Overview** shows it enabled. With it off, Wazuh drops the events without any message.                                    |
+------------------------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------+

Clean up
--------

The test commands already delete the test file. To stop monitoring the directories, remove the lines you added to the ``<syscheck>`` block and restart the Wazuh agent, or restore your lab snapshot.
