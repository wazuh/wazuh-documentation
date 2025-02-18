.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Wazuh helps meet the common criteria CC7.1 by providing the Vulnerability Detection module.

Common criteria 7.1
===================

The TSC *common criteria CC7.1* states that: *“To meet its objectives, the entity uses detection and monitoring procedures to identify (1) changes to configurations that result in the introduction of new vulnerabilities, and (2) susceptibilities to newly discovered vulnerabilities”*. This control indicates the depth and rigor of the evaluation required to be performed on an information asset to monitor changes to the configuration. It ensures that changes do not introduce new vulnerabilities to the system or make it prone to new vulnerabilities.

Evaluation and compliance of an information asset to *CC7.1* ensure that the asset is strengthened to a high level of security assurance. *CC7.1* facilitates the prevention of misconfiguration flaws and ensures continuous monitoring to quickly identify vulnerabilities.

The use case below shows how Wazuh assists in meeting this requirement.

Use case: Monitoring a CentOS endpoint for vulnerabilities
----------------------------------------------------------

Wazuh helps meet the *common criteria CC7.1* by providing the Vulnerability Detection module. This module can uncover vulnerabilities in operating systems and installed applications. It performs a software audit by querying our Cyber Threat Intelligence (CTI) API for vulnerability content documents. We aggregate vulnerability information into the CTI repository from external vulnerability sources indexed by Canonical, Debian, Red Hat, Arch Linux, Amazon Linux Advisories Security (ALAS), Microsoft, CISA, and the National Vulnerability Database (NVD). We also maintain the integrity of our vulnerability data and the vulnerabilities repository updated, ensuring the solution checks for the latest CVEs. The Vulnerability detection module correlates this information with data from the endpoint application inventory.

In this use case, you can see how the Wazuh Vulnerability Detection module detects vulnerabilities on a CentOS 8 endpoint.

#. Edit the Wazuh server configuration file ``/var/ossec/etc/ossec.conf``. Make sure the module is enabled.

   .. code-block:: xml
      :emphasize-lines: 2
   
      <vulnerability-detection>
        <enabled>yes</enabled>
        <index-status>yes</index-status>
        <feed-update-interval>60m</feed-update-interval>
      </vulnerability-detection>
   
      <indexer>
        <enabled>yes</enabled>
        <hosts>
          <host>https://0.0.0.0:9200</host>
        </hosts>
        <ssl>
          <certificate_authorities>
            <ca>/etc/filebeat/certs/root-ca.pem</ca>
          </certificate_authorities>
          <certificate>/etc/filebeat/certs/filebeat.pem</certificate>
          <key>/etc/filebeat/certs/filebeat-key.pem</key>
        </ssl>
      </indexer>

#. If you made changes, restart the Wazuh manager to apply them:

   .. include:: /_templates/common/restart_manager.rst

#. Navigate to the **Vulnerability Detection** module from the Wazuh dashboard. Select the agent to view its discovered vulnerabilities.

   .. thumbnail:: /images/compliance/tsc/common-criteria/agent-vulnerabilities.png
      :title: Agent vulnerabilities
      :alt: Agent vulnerabilities
      :align: center
      :width: 80%
