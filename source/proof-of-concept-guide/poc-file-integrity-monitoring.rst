.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: The Wazuh File Integrity Monitoring system watches for modification of files in selected directories and triggers alerts when these files are modified. Learn more about it in this PoC.

.. _poc_fim:

File integrity monitoring
=========================

In this PoC, the Wazuh File Integrity Monitoring (FIM) system watches for modifying files in the monitored directories. Then FIM triggers alerts when these files are modified. Additionally, it enriches alert data by fetching information about the user who made the changes and the process at play.

See the :ref:`File integrity monitoring <manual_file_integrity>` section of our documentation for more information about FIM functionality and configuration.


Configuration
-------------

Configure your environment as follows to test the PoC.

#. Edit ``/var/ossec/etc/ossec.conf`` in the monitored Ubuntu 20 endpoint and enable whodata by adding ``whodata="yes"`` to the monitored directories.

    .. code-block:: XML

        <syscheck>
            <directories check_all="yes" whodata="yes">/usr/bin,/usr/sbin</directories>
            <directories check_all="yes" whodata="yes">/bin,/sbin,/boot</directories>
            <directories check_all="yes" report_changes="yes" whodata="yes" tags="cron">/etc/cron*</directories>
            <directories check_all="yes" report_changes="yes" whodata="yes" recursion_level="2">/home,/root</directories>
        </syscheck>

#. Restart the Linux Wazuh agent to apply the configuration changes.

    .. code-block:: console

        # systemctl restart wazuh-agent

#. Edit ``C:\Program Files (x86)\ossec-agent\ossec.conf`` in the monitored Windows endpoint and add directories for monitoring including the ``whodata="yes"`` switch.

    .. code-block:: XML

        <syscheck>
            <scan_on_start>yes</scan_on_start>
            <directories check_all="yes" report_changes="yes" whodata="yes">C:\\Users\\Administrator\\Desktop</directories>
            <directories check_all="yes" report_changes="yes" whodata="yes">C:\\Wazuh</directories>
        </syscheck>


#. Restart the Windows Wazuh agent to apply the configuration changes using the UI.


As an alternative to local configurations, you can :ref:`centrally configure groups of agents <reference_shared_conf>`.

Steps to generate the alerts
----------------------------

#. Create, remove, or modify a file in the monitored directories.

Query the alerts
----------------

You can visualize the alert data in the Wazuh dashboard. To do this, go to the **Security events** module and add the filters in the search bar to query the alerts.

- ``syscheck.path: "{path_to_the_modified_file}"``

.. thumbnail:: ../images/poc/File-integrity-monitoring-1.png
          :title: File integrity monitoring Linux
          :align: center
          :wrap_image: No

.. thumbnail:: ../images/poc/File-integrity-monitoring-2.png
          :title: File integrity monitoring Windows
          :align: center
          :wrap_image: No