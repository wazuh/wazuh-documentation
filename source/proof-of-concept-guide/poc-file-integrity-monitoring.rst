.. _poc_fim_:

File integrity monitoring
=========================

Watch for modification of files in selected directories. Get information about the user who made the changes and the process at play in real time.

More information can be found in :ref:`manual_file_integrity`.

Configuration
-------------

#. Edit ``/var/ossec/etc/ossec.conf`` in the monitored RHEL 7 endpoint and enable `whodata` by adding ``whodata="yes"`` to the monitored directories.

    .. code-block:: XML

        <directories check_all="yes" whodata="yes">/usr/bin,/usr/sbin</directories>
        <directories check_all="yes" whodata="yes">/bin,/sbin,/boot</directories>
        <directories check_all="yes" report_changes="yes" whodata="yes" tags="cron">/etc/cron*</directories>
        <directories check_all="yes" report_changes="yes" whodata="yes" recursion_level="2">/home,/root</directories>

#. Edit ``C:\Program Files (x86)\ossec-agent\ossec.conf`` in the monitored Windows endpoint and add directories for monitoring including the ``whodata="yes"`` switch.

    .. code-block:: XML
        
        <scan_on_start>yes</scan_on_start>
        <directories check_all="yes" report_changes="yes" whodata="yes">C:\\Users\\Administrator\\Desktop</directories>
        <directories check_all="yes" report_changes="yes" whodata="yes">C:\\Wazuh</directories>

As an alternative to local configurations, you can :ref:`configure group of agents centrally <reference_agent_conf>`.

Steps to generate the alerts
----------------------------

#. Create, remove, or modify a file in the monitored directories.

Alerts
------

Related alerts can be found with:

* ``syscheck.path: "{path_to_the_modified_file}"``

Affected endpoints
------------------

* RHEL 7 agent host
* Windows agent host
