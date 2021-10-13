.. _poc_fim_:

File integrity monitoring
=========================

Configuration
-------------

- Enable whodata on the monitored endpoint (RHEL and Windows) ossec.conf file. Optionally, this can also be done through centralized configuration groups:

    .. code-block:: XML

        <directories check_all="yes" whodata="yes">/usr/bin,/usr/sbin</directories>
        <directories check_all="yes" whodata="yes">/bin,/sbin,/boot</directories>
        <directories check_all="yes" report_changes="yes" whodata="yes" tags="cron">/etc/cron*</directories>
        <directories check_all="yes" report_changes="yes" whodata="yes" recursion_level="2">/home,/root</directories>

- Add directories to be monitored on the Windows endpoint:

    .. code-block:: XML
        
        <scan_on_start>yes</scan_on_start>
        <directories check_all="yes" report_changes="yes" whodata="yes">C:\\Users\\Administrator\\Desktop</directories>
        <directories check_all="yes" report_changes="yes" whodata="yes">C:\\Wazuh</directories>

Steps to generate the alerts
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

- Create, remove, or modify a file in the monitored directories.

Alerts
^^^^^^

Related alerts can be found with:

- ``syscheck.path: "{path_to_the_modified_file}"``

Affected endpoints
^^^^^^^^^^^^^^^^^^

- Linux RHEL
- Windows
