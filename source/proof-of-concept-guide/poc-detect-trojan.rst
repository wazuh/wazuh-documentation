.. _poc_trojan_detection:

Detecting suspicious binaries - Trojan
======================================

Wazuh can detect trojaned system binaries by using signatures in ``/var/ossec/etc/shared/rootkit_trojans.txt`` file.

Configuration
-------------

On the Linux monitored endpoint, we will use out-of-the box configuration for trojans detection in ``/var/ossec/etc/ossec.conf`` file:

    .. code-block:: XML

        <rootcheck>
            <disabled>no</disabled>
            <check_files>yes</check_files>
            
            <!-- Line for trojans detection -->
            <check_trojans>yes</check_trojans>
            
            <check_dev>yes</check_dev>
            <check_sys>yes</check_sys>
            <check_pids>yes</check_pids>
            <check_ports>yes</check_ports>
            <check_if>yes</check_if>
            
            <!-- Frequency that rootcheck is executed - every 12 hours -->
            <frequency>43200</frequency>
            <rootkit_files>/var/ossec/etc/shared/rootkit_files.txt</rootkit_files>
            <rootkit_trojans>/var/ossec/etc/shared/rootkit_trojans.txt</rootkit_trojans>
            <skip_nfs>yes</skip_nfs>
        </rootcheck>

Steps to generate the alerts
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

- Create a copy of the trojaned file

    .. code-block:: XML

        cp -p /usr/bin/w /usr/bin/w.copy


- Then modify the original system binary so it runs a shell script instead. In this case we modify ``/usr/bin/w``:
  
    .. code-block:: console

        #!/bin/bash
        echo "`date` this is evil"   > /tmp/trojan_created_file
        echo 'test for /usr/bin/w trojaned file' >> /tmp/trojan_created_file
        #Now running original binary
        /usr/bin/w.copy


Alerts
^^^^^^

Wait for the next rootcheck scan to be completed (frequency can be adjusted), and look for the resulting trojan alert running the following query:

- ``location:rootcheck AND rule.id:510 AND data.title:Trojan*``

Affected endpoints
^^^^^^^^^^^^^^^^^^

- Linux RHEL
