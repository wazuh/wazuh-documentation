.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Wazuh helps meet the TSC common criteria CC6.8 requirement by detecting malicious files on monitored endpoints using its threat intelligence IoC database.

Common criteria 6.8
=====================

The TSC common criteria CC6.8 states, “The entity implements controls to prevent or detect and act upon the introduction of unauthorized or malicious software to meet the entity's objectives.” This means the entity should be able to detect malicious software on its systems and act on it.

Wazuh helps meet the CC6.8 requirement by detecting malicious files on monitored endpoints. Wazuh matches file hashes against its threat intelligence IoC database and raises a finding when it finds a match. Security personnel can view these findings in the Wazuh dashboard.

Use case: Detecting a malicious file download on a monitored Ubuntu endpoint
--------------------------------------------------------------------------------

Follow the steps below to identify a malicious file downloaded to a monitored Ubuntu 24.04 endpoint.

Ubuntu endpoint
^^^^^^^^^^^^^^^^

#. Create the directory to be monitored. Real-time monitoring only attaches to a directory that exists when the agent starts, so this must be done before the agent is restarted:

   .. code-block:: console

      $ mkdir -p /home/ubuntu/Downloads

#. Add the following configuration to the ``<syscheck>`` block of the ``/var/ossec/etc/ossec.conf`` file on the monitored Ubuntu endpoint:

   .. code-block:: xml
      :emphasize-lines: 9

      <!-- File integrity monitoring -->
      <syscheck>
        <disabled>no</disabled>
        <!-- Frequency that syscheck is executed default every 12 hours -->
        <frequency>43200</frequency>
        <!-- Directories to check  (perform all possible verifications) -->
        <directories>/etc,/usr/bin,/usr/sbin</directories>
        <directories>/boot</directories>
        <directories realtime="yes">/home/ubuntu/Downloads</directories>
        . . .
      </syscheck>

   In our scenario, we used the ``/home/ubuntu/Downloads`` folder.

#. Restart the Wazuh agent:

   .. code-block:: console

      $ sudo systemctl restart wazuh-agent

#. Navigate to the monitored folder and download the EICAR test file:

   .. code-block:: console

      $ cd /home/ubuntu/Downloads
      $ curl -fL -o eicar.com.txt https://secure.eicar.org/eicar.com.txt

Wazuh dashboard
^^^^^^^^^^^^^^^^

#. Navigate to **Threat Hunting** on the Wazuh **Overview** dashboard.

   .. thumbnail:: /images/compliance/tsc/common-criteria/overview-threat-hunting-malware.png
      :title: Wazuh Overview dashboard - Threat Hunting
      :alt: Wazuh Overview dashboard - Threat Hunting
      :align: center
      :width: 80%

#. Select the Malicious hash detected finding.

   .. thumbnail:: /images/compliance/tsc/common-criteria/threat-hunting-findings-list.png
      :title: Threat Hunting findings list
      :alt: Threat Hunting findings list
      :align: center
      :width: 80%

   The image below shows the details of the malicious file download. Wazuh classifies the file by matching its hash against the threat intelligence IoC database included with the installation, which contains the EICAR test file; the Malicious hash detected rule raises the finding at high severity.

   .. thumbnail:: /images/compliance/tsc/common-criteria/malicious-hash-finding-details.png
      :title: Malicious hash detected finding details
      :alt: Malicious hash detected finding details
      :align: center
      :width: 80%
