.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Wazuh helps meet the TSC common criteria CC7.2 requirement by detecting anomalies on monitored systems through log data analysis and file integrity monitoring.

Common criteria 7.2
=====================

The TSC **Common Criteria CC7.2** specifies the monitoring of system components for anomalies. It states, "*The entity monitors system components and the operation of those components for anomalies that are indicative of malicious acts, natural disasters, and errors affecting the entity's ability to meet its objectives; anomalies are analyzed to determine whether they represent security events.*"

This criterion requires the entity to detect anomalies on its systems and analyze them to determine whether they are security events. Collecting and analyzing log data from the monitored components supports this requirement.

Wazuh helps meet the CC7.2 requirement by providing capabilities that detect anomalies on monitored systems. An example is log data analysis. The Wazuh Logcollector module retrieves and centralizes log data from different sources, such as operating systems, applications, network devices, and security appliances. Once Wazuh collects the log data, it applies various analysis techniques to extract valuable insights and detect potential security issues. This is done by matching the received data with the Wazuh out-of-the-box decoders and rules.

Use case: Collecting and analyzing logs across multiple endpoints
--------------------------------------------------------------------

The use case below shows how log data analysis can detect specific events on monitored endpoints.

Wazuh dashboard
^^^^^^^^^^^^^^^^

#. Click **Threat Hunting** from the Wazuh dashboard:

   .. thumbnail:: /images/compliance/tsc/common-criteria/overview-threat-hunting-card.png
      :title: Wazuh Overview dashboard - Threat Hunting
      :alt: Wazuh Overview dashboard - Threat Hunting
      :align: center
      :width: 80%

   The images below show the Wazuh **Threat Hunting** dashboard.

   .. thumbnail:: /images/compliance/tsc/common-criteria/threat-hunting-dashboard.png
      :title: Threat Hunting dashboard
      :alt: Threat Hunting dashboard
      :align: center
      :width: 80%

   The Wazuh ruleset also labels these triggered events correctly. For example, the image below shows details for the triggered finding: ``Secret or credential accessed from vault``.

#. Navigate to the **Findings** section and click on a finding to view details.

   .. thumbnail:: /images/compliance/tsc/common-criteria/vault-secret-finding-details.png
      :title: Secret or credential accessed from vault finding details
      :alt: Secret or credential accessed from vault finding details
      :align: center
      :width: 80%

Use case: Detecting file changes using the Wazuh file integrity monitoring capability
------------------------------------------------------------------------------------------

This use case shows how you can configure the Wazuh agent on an Ubuntu 24.04 endpoint to detect changes in the ``critical_folder`` directory. The finding supports the CC7.2 requirement as evidence that Wazuh detects unexpected file changes.

Ubuntu endpoint
^^^^^^^^^^^^^^^^

#. Switch to the ``root`` user:

   .. code-block:: console

      $ sudo su

#. Create the directory ``critical_folder`` in the ``/root`` directory:

   .. code-block:: console

      # mkdir /root/critical_folder

#. Create the file ``special_data.txt`` in the ``/root/critical_folder`` directory and add some content:

   .. code-block:: console

      # touch /root/critical_folder/special_data.txt
      # echo "The content in this file must maintain integrity" >> /root/critical_folder/special_data.txt

#. Add the configuration highlighted to the ``<syscheck>`` block of the Wazuh agent configuration file ``/var/ossec/etc/ossec.conf``:

   .. code-block:: xml
      :emphasize-lines: 2

      <syscheck>
        <directories realtime="yes" check_all="yes" report_changes="yes">/root/critical_folder</directories>
      </syscheck>

#. Restart the Wazuh agent to apply the changes:

   .. code-block:: console

      # systemctl restart wazuh-agent

#. Modify the file by changing the content of ``special_data.txt`` from ``The content in this file must maintain integrity`` to ``A change has occurred``:

   .. code-block:: console

      # echo "A change has occurred" > /root/critical_folder/special_data.txt
      # cat /root/critical_folder/special_data.txt

   The command output looks similar to this:

   .. code-block:: none
      :class: output

      A change has occurred

Wazuh dashboard
^^^^^^^^^^^^^^^^

#. Click the menu icon, then navigate to **Security operations** > **Regulatory Compliance** > **TSC**.

   .. thumbnail:: /images/compliance/tsc/additional-criteria/overview-regulatory-compliance-tsc-card.png
      :title: Wazuh Overview dashboard - Regulatory Compliance
      :alt: Wazuh Overview dashboard - Regulatory Compliance
      :align: center
      :width: 80%

#. Select the **Findings** subsection and apply the following filter: ``wazuh.integration.name: wazuh-fim``

   .. thumbnail:: /images/compliance/tsc/additional-criteria/tsc-findings-wazuh-fim-filter.png
      :title: TSC Findings filtered by wazuh-fim
      :alt: TSC Findings filtered by wazuh-fim
      :align: center
      :width: 80%

   .. thumbnail:: /images/compliance/tsc/additional-criteria/fim-file-modified-details.png
      :title: FIM file modified finding details
      :alt: FIM file modified finding details
      :align: center
      :width: 80%
