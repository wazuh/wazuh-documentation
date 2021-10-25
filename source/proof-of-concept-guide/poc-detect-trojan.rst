.. _poc_trojan_detection:

Detecting suspicious binaries - Trojan
======================================

Detect trojaned system binaries using the signatures in the ``/var/ossec/etc/shared/rootkit_trojans.txt`` file.

Configuration
-------------

No additional configuration is required. Trojans detection is configured out-of-the-box. Check your configuration in ``/var/ossec/etc/ossec.conf`` at the RHEL 7 monitored endpoint.

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
----------------------------

#. Save a copy of the original system binary.

    .. code-block:: console

        # cp -p /usr/bin/w /usr/bin/w.copy

#. Replace the original system binary ``/usr/bin/w`` with the following shell script.
  
    .. code-block:: sh

        #!/bin/bash
        echo "`date` this is evil"   > /tmp/trojan_created_file
        echo 'test for /usr/bin/w trojaned file' >> /tmp/trojan_created_file
        #Now running original binary
        /usr/bin/w.copy

Alerts
------

Related alerts can be found with the following query once the next rootcheck scan has been completed:

* ``location:rootcheck AND rule.id:510 AND data.title:Trojan*``

Affected endpoints
------------------

* RHEL 7 agent host
