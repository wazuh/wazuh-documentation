.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
    :description: The Wazuh platform is often used to meet the technical aspects of regulatory compliance standards. Learn more about this Wazuh capability here. 
    
Regulatory compliance
=====================

Wazuh uses its SIEM capabilities to centralize, analyze and enrich security data. In addition, it provides security controls, such as intrusion detection, configuration assessment, log analysis, and vulnerability detection, to meet the technical aspects of regulatory compliance standards.

The Wazuh rules are carefully mapped against compliance requirements to provide regulatory compliance support. This way, when an alert is generated (a threat detection rule condition has been matched), it automatically includes compliance information. Here is the list of currently supported standards:

-  Payment Card Industry Data Security Standard (PCI DSS)
-  General Data Protection Regulation (GDPR)
-  NIST Special Publication 800-53 (NIST 800-53)
-  Good Practice Guide 13 (GPG13)
-  Trust Services Criteria (TSC SOC2)
-  Health Insurance Portability and Accountability Act (HIPAA)

Wazuh rules also include mapping with the MITRE ATT&CK framework, which is used for alerts taxonomy and to provide better security context. Below is an example of a detection rule used to identify access to forbidden directories in Apache web servers.

.. code-block:: xml
   :emphasize-lines: 6,8

   <rule id="30306" level="5">
     <if_sid>30301</if_sid>
     <id>AH01276</id>
     <description>Apache: Attempt to access forbidden directory index.</description>
     <mitre>
       <id>T1190</id>
     </mitre>
     <group>access_denied,pci_dss_6.5.8,pci_dss_10.2.4,gdpr_IV_35.7.d,hipaa_164.312.b,nist_800_53_SA.11,nist_800_53_AU.14,nist_800_53_AC.7,tsc_CC6.6,tsc_CC7.1,tsc_CC6.1,tsc_CC6.8,tsc_CC7.2,tsc_CC7.3,</group>
   </rule>

Example alert for rule ``Apache: Attempt to access forbidden directory index``:

.. code-block:: json
   :emphasize-lines: 18,29,32,35,40,44
   :class: output accordion-output

   {
     "agent": {
         "id": "006",
         "ip": "10.0.1.214",
         "name": "RHEL7"
     },
     "data": {
         "id": "AH01276",
         "srcip": "24.4.35.192",
         "srcport": "61844"
     },
     "full_log": "[Fri Sep 04 06:08:51.973988 2020] [autoindex:error] [pid 28811] [client 24.4.35.192:61844] AH01276: Cannot serve directory /var/www/html/: No matching DirectoryIndex (index.html) found, and server-generated directory index forbidden by Options directive",
     "location": "/var/log/httpd/error_log",
     "rule": {
         "description": "Apache: Attempt to access forbidden directory index.",
         "level": 5,
         "id": "30306",
         "mitre": {
             "id": [
                 "T1190"
             ],
             "tactic": [
                 "Initial Access"
             ],
             "technique": [
                 "Exploit Public-Facing Application"
             ]
         },
         "gdpr": [
             "IV_35.7.d"
         ],
         "hipaa": [
             "164.312.b"
         ],
         "nist_800_53": [
             "SA.11",
             "AU.14",
             "AC.7"
         ],
         "pci_dss": [
             "6.5.8",
             "10.2.4"
         ],
         "tsc": [
             "CC6.6",
             "CC7.1",
             "CC6.1",
             "CC6.8",
             "CC7.2",
             "CC7.3"
         ]
     },
     "timestamp": "2020-09-04T06:08:53.878+0000"
   }

Example of regulatory compliance dashboards:

.. thumbnail:: /images/getting-started/use-cases/regulatory-compliance.png
   :title: PCI DSS compliance dashboard
   :alt: PCI DSS compliance dashboard
   :align: center

.. thumbnail:: /images/getting-started/use-cases/regulatory-compliance-dashboard.png
   :title: HIPAA compliance dashboard
   :alt: HIPAA compliance dashboard
   :align: center
                    
.. thumbnail:: /images/getting-started/use-cases/compliance-requirements.png
    :title: NIST 800-53 compliance dashboard
    :alt: NIST 800-53 compliance dashboard
    :align: center

You can find more information on how Wazuh helps meet compliance requirements at:

- :doc:`Using Wazuh for PCI DSS </pci-dss/index>`
- :doc:`Using Wazuh for GDPR </gdpr/index>`
- :doc:`Wazuh rules documentation </user-manual/ruleset/index>`
