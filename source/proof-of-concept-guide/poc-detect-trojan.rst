.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Wazuh has a powerful anomaly and malware detection capabilitie. It uses signatures to detect trojaned system binaries. Learn more about this in this PoC.

Detecting suspicious binaries
=============================

Wazuh has anomaly and malware detection capabilities that detect suspicious binaries on an endpoint. Binaries are executable code written to perform automated tasks. Malicious actors use them mostly to carry out exploitation to avoid being detected.

In this use case, we demonstrate how the Wazuh rootcheck module can detect a trojan system binary on an Ubuntu endpoint. You perform the exploit by replacing the content of a legitimate binary with malicious code to trick the endpoint into running it as the legitimate binary.

The Wazuh rootcheck module also checks for hidden processes, ports, and files.

Infrastructure
--------------

+---------------+----------------------------------------------------------------------------------------------+
| Endpoint      | Description                                                                                  |
+===============+==============================================================================================+
| Ubuntu 22.04  | The Wazuh rootcheck module detects the execution of a suspicious binary on this endpoint.    |
+---------------+----------------------------------------------------------------------------------------------+

Configuration
-------------

Take the following steps on the Ubuntu endpoint to enable the Wazuh rootcheck module and perform anomaly and malware detection.

By default, the Wazuh rootcheck module is enabled in the Wazuh agent configuration file. Check the ``<rootcheck>`` block in the ``/var/ossec/etc/ossec.conf`` configuration file of the monitored endpoint and make sure that it has the configuration below:

.. code-block:: xml

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

The :doc:`rootcheck section </user-manual/reference/ossec-conf/rootcheck>` explains the options in the rootcheck module.

Attack emulation
----------------

#. Create a copy of the original system binary:

   .. code-block:: console

      $ sudo cp -p /usr/bin/w /usr/bin/w.copy

#. Replace the original system binary ``/usr/bin/w`` with the following shell script:

   .. code-block:: console

      $ sudo tee /usr/bin/w << EOF
      #!/bin/bash
      echo "`date` this is evil" > /tmp/trojan_created_file
      echo 'test for /usr/bin/w trojaned file' >> /tmp/trojan_created_file
      #Now running original binary
      /usr/bin/w.copy
      EOF

#. The rootcheck scan runs every 12 hours by default. Force a scan by restarting the Wazuh agent to see the relevant alert:

   .. code-block:: console

      $ sudo systemctl restart wazuh-agent

Visualize the alerts
--------------------

You can visualize the alert data in the Wazuh dashboard. To do this, go to the **Threat hunting** module and add the filters in the search bar to query the alerts.

-  ``location:rootcheck AND rule.id:510 AND data.title:Trojaned version of file detected.``

-  Additionally, using the **Filter by type** search field, apply the ``full_log`` filter.

   .. thumbnail:: /images/poc/suspicious-binary-alerts.png
      :title: Suspicious binary alerts
      :align: center
      :width: 80%
