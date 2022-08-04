.. Copyright (C) 2015, Wazuh, Inc.

Use case: Getting an alert when a check changes its result value
================================================================

Let's describe how the SCA scanner detects and reports changes in the check results using a simple use case.

To configure the execution of the SCA module with a policy file, it is necessary to set up a block as follows:

.. code-block:: YAML

    <sca>
      <enabled>yes</enabled>
      <scan_on_start>yes</scan_on_start>
      <interval>12h</interval>
      <skip_nfs>yes</skip_nfs>
    </sca>

SCA will load all the policies present on the default policy folder; this folder is ``/var/ossec/ruleset/sca`` on Unix environments and ``C:\\Program files (x86)\\ossec-agent\\ruleset\\sca`` on Windows.

Results of the first scan are reported and alerts such as the following one are fired for every check:

.. code-block:: JSON

   {
     "_index": "wazuh-alerts-4.x-2022.08.04",
     "_type": "_doc",
     "_id": "v3ZHaoIBIH0NbHDL14SV",
     "_version": 1,
     "_score": null,
     "_source": {
       "input": {
         "type": "log"
       },
       "agent": {
         "ip": "10.0.2.15",
         "name": "ag-debian9",
         "id": "002"
       },
       "manager": {
         "name": "centos7a"
       },
       "data": {
         "sca": {
           "scan_id": "107317899",
           "check": {
             "result": "failed",
             "remediation": "Edit the /etc/ssh/sshd_config file to set the parameter as follows: PermitRootLogin no",
             "compliance": {
               "pci_dss": "4.1",
               "hipaa": "164.312.a.2.IV,164.312.e.1,164.312.e.2.I,164.312.e.2.II",
               "tsc": "CC6.7",
               "cis_csc": "4.3",
               "cis": "5.2.10",
               "nist_800_53": "SC.8"
             },
             "description": "The PermitRootLogin parameter specifies if the root user can log in using ssh(1). The default is no.",
             "id": "2139",
             "title": "Ensure SSH root login is disabled",
             "rationale": "Disallowing root logins over SSH requires server admins to authenticate using their own individual account, then escalating to root via sudo or su. This in turn limits opportunity for non-repudiation and provides a clear audit trail in the event of a security incident.",
             "command": [
               "sshd -T"
             ]
           },
           "type": "check",
           "policy": "CIS Benchmark for Debian/Linux 9"
         }
       },
       "rule": {
         "mail": false,
         "level": 7,
         "pci_dss": [
           "2.2",
           "4.1"
         ],
         "tsc": [
           "CC7.1",
           "CC7.2",
           "CC6.7"
         ],
         "hipaa": [
           "164.312.a.2.IV",
           "164.312.e.1",
           "164.312.e.2.I",
           "164.312.e.2.II"
         ],
         "description": "CIS Benchmark for Debian/Linux 9: Ensure SSH root login is disabled",
         "groups": [
           "sca"
         ],
         "cis": [
           "5.2.10"
         ],
         "nist_800_53": [
           "CM.1",
           "SC.8"
         ],
         "gdpr": [
           "IV_35.7.d"
         ],
         "firedtimes": 89,
         "cis_csc": [
           "4.3"
         ],
         "id": "19007"
       },
       "location": "sca",
       "decoder": {
         "name": "sca"
       },
       "id": "1659640462.998947",
       "timestamp": "2022-08-04T19:14:22.328+0000"
     },
     "fields": {
       "timestamp": [
         "2022-08-04T19:14:22.328Z"
       ]
     },
     "highlight": {
       "agent.id": [
         "@opensearch-dashboards-highlighted-field@002@/opensearch-dashboards-highlighted-field@"
       ],
       "manager.name": [
         "@opensearch-dashboards-highlighted-field@centos7a@/opensearch-dashboards-highlighted-field@"
       ],
       "data.sca.check.id": [
         "@opensearch-dashboards-highlighted-field@2139@/opensearch-dashboards-highlighted-field@"
       ],
       "rule.groups": [
         "@opensearch-dashboards-highlighted-field@sca@/opensearch-dashboards-highlighted-field@"
       ]
     },
     "sort": [
       1659640462328
     ]
   }

Those alerts will inform about the initial status of checks. Furthermore, no additional alerts will be
issued unless the state of a check changes between successive scans.

In addition to the check events, SCA will issue an alert that summarizes the results of policy scans. Summary alerts are triggered upon the first scan and whenever any check state changes.

.. code-block:: JSON

   {
     "_index": "wazuh-alerts-4.x-2022.08.04",
     "_type": "_doc",
     "_id": "43ZHaoIBIH0NbHDL4oSG",
     "_version": 1,
     "_score": null,
     "_source": {
       "input": {
         "type": "log"
       },
       "agent": {
         "ip": "10.0.2.15",
         "name": "ag-debian9",
         "id": "002"
       },
       "manager": {
         "name": "centos7a"
       },
       "data": {
         "sca": {
           "score": "38",
           "total_checks": "175",
           "file": "cis_debian9.yml",
           "policy_id": "cis_debian9",
           "invalid": "7",
           "description": "This document provides prescriptive guidance for establishing a secure configuration posture for Debian Linux 9.",
           "scan_id": "107317899",
           "passed": "64",
           "failed": "104",
           "type": "summary",
           "policy": "CIS Benchmark for Debian/Linux 9"
         }
       },
       "rule": {
         "firedtimes": 1,
         "mail": false,
         "level": 7,
         "pci_dss": [
           "2.2"
         ],
         "tsc": [
           "CC7.1",
           "CC7.2"
         ],
         "description": "SCA summary: CIS Benchmark for Debian/Linux 9: Score less than 50% (38)",
         "groups": [
           "sca"
         ],
         "id": "19004",
         "nist_800_53": [
           "CM.1"
         ],
         "gdpr": [
           "IV_35.7.d"
         ]
       },
       "location": "sca",
       "decoder": {
         "name": "sca"
       },
       "id": "1659640469.1095670",
       "timestamp": "2022-08-04T19:14:29.892+0000"
     },
     "fields": {
       "timestamp": [
         "2022-08-04T19:14:29.892Z"
       ]
     },
     "highlight": {
       "agent.id": [
         "@opensearch-dashboards-highlighted-field@002@/opensearch-dashboards-highlighted-field@"
       ],
       "manager.name": [
         "@opensearch-dashboards-highlighted-field@centos7a@/opensearch-dashboards-highlighted-field@"
       ],
       "rule.groups": [
         "@opensearch-dashboards-highlighted-field@sca@/opensearch-dashboards-highlighted-field@"
       ]
     },
     "sort": [
       1659640469892
     ]
   }

The alert for check ``2139`` appears above. It checks the contents of file ``/etc/ssh/sshd_config``. We can see it does not verify that that SSH root login is disabled.

Disabling the ``PermitRootLogin`` makes the check to be passed.

.. code-block:: console

   # sed -i 's/PermitRootLogin yes/PermitRootLogin no/g' /etc/ssh/sshd_config


The next SCA scan for that policy generates the following alert.

.. code-block:: JSON

   {
     "_index": "wazuh-alerts-4.x-2022.08.04",
     "_type": "_doc",
     "_id": "-XZZaoIBIH0NbHDLU4S0",
     "_version": 1,
     "_score": null,
     "_source": {
       "input": {
         "type": "log"
       },
       "agent": {
         "ip": "10.0.2.15",
         "name": "ag-debian9",
         "id": "002"
       },
       "manager": {
         "name": "centos7a"
       },
       "data": {
         "sca": {
           "scan_id": "1427001503",
           "check": {
             "result": "passed",
             "remediation": "Edit the /etc/ssh/sshd_config file to set the parameter as follows: PermitRootLogin no",
             "previous_result": "failed",
             "compliance": {
               "pci_dss": "4.1",
               "hipaa": "164.312.a.2.IV,164.312.e.1,164.312.e.2.I,164.312.e.2.II",
               "tsc": "CC6.7",
               "cis_csc": "4.3",
               "cis": "5.2.10",
               "nist_800_53": "SC.8"
             },
             "description": "The PermitRootLogin parameter specifies if the root user can log in using ssh(1). The default is no.",
             "id": "2139",
             "title": "Ensure SSH root login is disabled",
             "rationale": "Disallowing root logins over SSH requires server admins to authenticate using their own individual account, then escalating to root via sudo or su. This in turn limits opportunity for non-repudiation and provides a clear audit trail in the event of a security incident.",
             "command": [
               "sshd -T"
             ]
           },
           "type": "check",
           "policy": "CIS Benchmark for Debian/Linux 9"
         }
       },
       "rule": {
         "mail": false,
         "level": 3,
         "pci_dss": [
           "2.2",
           "4.1"
         ],
         "tsc": [
           "CC7.1",
           "CC7.2",
           "CC6.7"
         ],
         "hipaa": [
           "164.312.a.2.IV",
           "164.312.e.1",
           "164.312.e.2.I",
           "164.312.e.2.II"
         ],
         "description": "CIS Benchmark for Debian/Linux 9: Ensure SSH root login is disabled: Status changed from failed to passed",
         "groups": [
           "sca"
         ],
         "cis": [
           "5.2.10"
         ],
         "nist_800_53": [
           "CM.1",
           "SC.8"
         ],
         "gdpr": [
           "IV_35.7.d"
         ],
         "firedtimes": 1,
         "cis_csc": [
           "4.3"
         ],
         "id": "19010"
       },
       "location": "sca",
       "decoder": {
         "name": "sca"
       },
       "id": "1659641611.1100056",
       "timestamp": "2022-08-04T19:33:31.127+0000"
     },
     "fields": {
       "timestamp": [
         "2022-08-04T19:33:31.127Z"
       ]
     },
     "highlight": {
       "agent.id": [
         "@opensearch-dashboards-highlighted-field@002@/opensearch-dashboards-highlighted-field@"
       ],
       "manager.name": [
         "@opensearch-dashboards-highlighted-field@centos7a@/opensearch-dashboards-highlighted-field@"
       ],
       "data.sca.check.id": [
         "@opensearch-dashboards-highlighted-field@2139@/opensearch-dashboards-highlighted-field@"
       ],
       "rule.groups": [
         "@opensearch-dashboards-highlighted-field@sca@/opensearch-dashboards-highlighted-field@"
       ]
     },
     "sort": [
       1659641611127
     ]
   }

The alert shows how the check has changed from Passed to Failed. This state is updated on the manager side and the last result scanned is available from the SCA tab in the Wazuh dashboard.

.. thumbnail:: /images/sca/sca-alert-ssh-permit-root-login.png
    :title: Alert generated due to SSH configuration change.
    :align: center
    :width: 100%

The insights provided by SCA Alerts will then help system operators to take actions aiming to reduce the attack surface of the
hosts they manage.
