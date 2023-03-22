.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Follow a use case to see how Wazuh runs SCA checks and triggers alerts in this section of the documentation.

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

SCA will load all the policies present on the default policy folder; this folder is ``/var/ossec/ruleset/sca`` on Unix environments and ``C:\Program files (x86)\ossec-agent\ruleset\sca`` on Windows.

Results of the first scan are reported and alerts with SCA scan data are fired for every check.

.. code-block:: JSON
    
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

Those alerts will inform about the initial status of checks. Furthermore, no additional alerts will be
issued unless the state of a check changes between successive scans.

In addition to the check events, SCA will issue an alert that summarizes the results of policy scans. Summary alerts are triggered upon the first scan and whenever any check state changes.

.. code-block:: JSON

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

The first example of SCA scan data above corresponds to an alert for check ``id 2139``. It checks the contents of file ``/etc/ssh/sshd_config``. We can see in that example that it does not verify that SSH root login is disabled.

Disabling the ``PermitRootLogin`` makes the check to be passed.

.. code-block:: console

   # sed -i 's/PermitRootLogin yes/PermitRootLogin no/g' /etc/ssh/sshd_config


The next SCA scan for that policy generates an alert with the following SCA scan data.

.. code-block:: JSON
   :emphasize-lines: 5, 7

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

The alert shows how the check has changed from `Passed` to `Failed`. This state is updated on the manager side and the last result scanned is available from the SCA tab in the Wazuh dashboard.

.. thumbnail:: /images/sca/sca-alert-ssh-permit-root-login.png
    :title: Security configuration assessment dashboard. 
    :align: center
    :width: 100%

The insights provided by SCA Alerts will then help system operators to take actions aiming to reduce the attack surface of the
hosts they manage.
