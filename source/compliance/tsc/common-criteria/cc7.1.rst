.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Wazuh helps meet the common criteria CC7.1 by providing the Vulnerability Detector module.

Common criteria 7.1
===================

The TSC *common criteria CC7.1* states that: *“To meet its objectives, the entity uses detection and monitoring procedures to identify (1) changes to configurations that result in the introduction of new vulnerabilities, and (2) susceptibilities to newly discovered vulnerabilities”*. This control indicates the depth and rigor of the evaluation required to be performed on an information asset to monitor changes to the configuration. It ensures that changes do not introduce new vulnerabilities to the system or make it prone to new vulnerabilities.

Evaluation and compliance of an information asset to CC7.1 ensure that the asset is strengthened to a high level of security assurance. CC7.1 facilitates the prevention of misconfiguration flaws and ensures continuous monitoring to quickly identify vulnerabilities.

The use case below shows how Wazuh assists in meeting this requirement.

Use case: Monitoring a CentOS endpoint for vulnerabilities
----------------------------------------------------------

Wazuh helps meet the *common criteria CC7.1* by providing the Vulnerability Detector module. This module can uncover vulnerabilities in operating systems and installed applications. It builds a database of Common Vulnerabilities and Exposures (CVEs) using data indexed from Canonical, Debian, Red Hat, Arch Linux, Amazon Linux Advisories Security (ALAS), Microsoft, and the National Vulnerability Database (NVD). Wazuh compares the information from these sources with scanned data from the monitored endpoint.

In this use case, we show how the Wazuh Vulnerability Detector module detects vulnerabilities on a CentOS 8 endpoint.

#. Enable the Vulnerability Detector module. This is found under the ``<vulnerability-detector>`` block of the Wazuh server ``/var/ossec/etc/ossec.conf`` configuration file:

   .. code-block:: XML
      :emphasize-lines: 3, 10, 22

      <ossec_config>
        <vulnerability-detector>
          <enabled>yes</enabled>
          <interval>5m</interval>
          <min_full_scan_interval>6h</min_full_scan_interval>
          <run_on_start>yes</run_on_start>

          <!-- RedHat OS vulnerabilities -->
          <provider name="redhat">
          <enabled>yes</enabled>
          <os>5</os>
          <os>6</os>
          <os>7</os>
          <os>8</os>
          <os allow="CentOS Linux-8">8</os>
          <os>9</os>
          <update_interval>1h</update_interval>
          </provider>

          <!-- Aggregate vulnerabilities -->
          <provider name="nvd">
          <enabled>yes</enabled>
          <update_from_year>2019</update_from_year>
          <update_interval>1h</update_interval>
          </provider>
        </vulnerability-detector>
      </ossec_config>

#. Restart the Wazuh manager to apply the changes:

   .. code-block:: console

      # systemctl restart wazuh-manager

#. Navigate to the Vulnerability Detector module from the Wazuh dashboard. Select an agent to view its discovered vulnerabilities.

   .. thumbnail:: /images/compliance/tsc/common-criteria/agent-vulnerabilities.png
      :title: Agent vulnerabilities
      :align: center
      :width: 80%
