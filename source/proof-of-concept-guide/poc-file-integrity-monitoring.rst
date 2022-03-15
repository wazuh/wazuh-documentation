.. meta::
  :description: The Wazuh File Integrity Monitoring system watches for modification of files in selected directories and triggers alerts when these files are modified. Learn more about it in this POC.


.. _poc_fim:

File integrity monitoring
=========================

In this POC, the Wazuh File Integrity Monitoring (FIM) system watches for modifying files in the monitored directories. Then FIM triggers alerts when these files are modified. Additionally, it enriches alert data by fetching information about the user who made the changes and the process at play.

See the :ref:`File integrity monitoring <manual_file_integrity>` section of our documentation for more information about FIM functionality and configuration.


Configuration
-------------

Configure your environment as follows to test the POC.

#. Edit ``/var/ossec/etc/ossec.conf`` in the monitored CentOS 8 endpoint and enable whodata by adding ``whodata="yes"`` to the monitored directories. 

    .. code-block:: XML
        
        <syscheck>
        <directories check_all="yes" whodata="yes">/usr/bin,/usr/sbin</directories>
        <directories check_all="yes" whodata="yes">/bin,/sbin,/boot</directories>
        <directories check_all="yes" report_changes="yes" whodata="yes" tags="cron">/etc/cron*</directories>
        <directories check_all="yes" report_changes="yes" whodata="yes" recursion_level="2">/home,/root</directories>
        </syscheck>

#. Edit ``C:\Program Files (x86)\ossec-agent\ossec.conf`` in the monitored Windows endpoint and add directories for monitoring including the ``whodata="yes"`` switch.

    .. code-block:: XML
        
        <syscheck>
        <scan_on_start>yes</scan_on_start>
        <directories check_all="yes" report_changes="yes" whodata="yes">C:\\Users\\Administrator\\Desktop</directories>
        <directories check_all="yes" report_changes="yes" whodata="yes">C:\\Wazuh</directories>
        </syscheck>

As an alternative to local configurations, you can :ref:`centrally configure groups of agents <reference_agent_conf>`.

Steps to generate the alerts
----------------------------

#. Create, remove, or modify a file in the monitored directories.

Query the alerts
----------------

You can visualize the alert data in the Wazuh dashboard. To do this, go to the **Security events** module and add the filters in the search bar to query the alerts.

- ``syscheck.path: "{path_to_the_modified_file}"``

.. thumbnail:: ../images/poc/File-integrity-monitoring.png
          :title: File integrity monitoring
          :align: center
          :wrap_image: No
