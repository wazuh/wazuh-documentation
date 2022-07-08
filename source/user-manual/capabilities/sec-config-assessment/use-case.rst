.. Copyright (C) 2015, Wazuh, Inc.

Use case: Getting an alert when a check changes its result value
================================================================

.. contents:: Table of Contents
   :depth: 10

Let's describe how the SCA scanner detects and reports changes in the check results using a simple use case.

To configure the execution of the **SCA** module with a policy file, it is necessary to set up a block as follows:

.. code-block:: none

    <sca>
      <enabled>yes</enabled>
      <scan_on_start>yes</scan_on_start>
      <interval>12h</interval>
      <skip_nfs>yes</skip_nfs>
    </sca>

SCA will load all the policies present on the default policy folder; this folder is */var/ossec/ruleset/sca*
on Unix environments and *C:\\Program files (x86)\\ossec-agent\\ruleset\\sca* on Windows.

Results of the first scan are reported and alerts such as the following one are fired for every check:

.. code-block:: none
    :class: output

    ** Alert 1568287463.187123: mail  - sca,gdpr_IV_35.7.d
    2019 Sep 12 13:24:23 (debian9-56) 10.0.0.56->sca
    Rule: 19007 (level 7) -> 'CIS benchmark for Debian/Linux 9 L1: Ensure SSH root login is disabled'
    {"type":"check","id":1802673953,"policy":"CIS benchmark for Debian/Linux 9 L1","policy_id":"cis_debian9_L1","check":{"id":3078,"title":"Ensure SSH root login is disabled","description":"The PermitRootLogin parameter specifies if the root user can log in using ssh(1). The default is no.","rationale":"Disallowing root logins over SSH requires server admins to authenticate using their own individual account, then escalating to root via sudo or su. This in turn limits opportunity for non-repudiation and provides a clear audit trail in the event of a security incident.","remediation":"Edit the /etc/ssh/sshd_config file to set the parameter as follows: PermitRootLogin no","compliance":{"cis":"5.2.10","cis_csc":"4.3"},"rules":["f:/etc/ssh/sshd_config -> !r:^# && r:PermitRootLogin\\s+no"],"file":"/etc/ssh/sshd_config","result":"failed"}}
    sca.type: check
    sca.scan_id: 1802673953
    sca.policy: CIS benchmark for Debian/Linux 9 L1
    sca.check.id: 3078
    sca.check.title: Ensure SSH root login is disabled
    sca.check.description: The PermitRootLogin parameter specifies if the root user can log in using ssh(1). The default is no.
    sca.check.rationale: Disallowing root logins over SSH requires server admins to authenticate using their own individual account, then escalating to root via sudo or su. This in turn limits opportunity for non-repudiation and provides a clear audit trail in the event of a security incident.
    sca.check.remediation: Edit the /etc/ssh/sshd_config file to set the parameter as follows: PermitRootLogin no
    sca.check.compliance.cis: 5.2.10
    sca.check.compliance.cis_csc: 4.3
    sca.check.file: ["/etc/ssh/sshd_config"]
    sca.check.result: passed


Those alerts will inform about the initial status of checks. Furthermore, no additional alerts will be
issued unless the state of a check changes between successive scans.

In addition to the check-events, SCA will issue an alert that summarizes the results of policy scans.
In the same way, summary alerts are triggered only upon the first scan, and whenever any check state
changes, as any variation alters the summary information.

.. code-block:: none
    :class: output

    ** Alert 1568287673.333022: mail  - sca,gdpr_IV_35.7.d
    2019 Sep 12 13:27:53 (debian9-56) 10.0.0.56->sca
    Rule: 19004 (level 7) -> 'SCA summary: CIS benchmark for Debian/Linux 9 L1: Score less than 50% (34)'
    {"type":"summary","scan_id":2006384692,"name":"CIS benchmark for Debian/Linux 9 L1","policy_id":"cis_debian9_L1","file":"cis_debian9_L1.yml","description":"This document provides prescriptive guidance for establishing a secure configuration posture for Debian Linux 9.","references":"https://www.cisecurity.org/cis-benchmarks/","passed":33,"failed":63,"invalid":3,"total_checks":99,"score":34.375,"start_time":1568287670,"end_time":1568287670,"hash":"73d14799b59bd7d24325190c6fa55c3e525888d2d7c0863276ec9d2eb50de183","hash_file":"050662edd03c302de6d9f7f68757ece85ebb274ef023cfcd2bba37cc5554eb4d"}
    sca.type: summary
    sca.scan_id: 2006384692
    sca.policy: CIS benchmark for Debian/Linux 9 L1
    sca.description: This document provides prescriptive guidance for establishing a secure configuration posture for Debian Linux 9.
    sca.policy_id: cis_debian9_L1
    sca.passed: 35
    sca.failed: 61
    sca.invalid: 3
    sca.total_checks: 99
    sca.score: 36
    sca.file: cis_debian9_L1.yml

If we focus in check 3078 (whose alert appears above), we can see it verifies that SSH root login is
disabled by checking the contents of file */etc/ssh/sshd_config*.

By enabling the `PermitRootLogin` option to force the check to fail,

.. code-block:: console

    # sed -i 's/PermitRootLogin no/PermitRootLogin yes/g' /etc/ssh/sshd_config


The next SCA scan for that policy generates the following alert:

.. code-block:: none
    :class: output

    ** Alert 1568287670.331089: mail  - sca,gdpr_IV_35.7.d
    2019 Sep 12 13:27:50 (debian9-56) 10.0.0.56->sca
    Rule: 19011 (level 9) -> 'CIS benchmark for Debian/Linux 9 L1: Ensure SSH root login is disabled: Status changed from passed to failed'
    {"type":"check","id":2006384692,"policy":"CIS benchmark for Debian/Linux 9 L1","policy_id":"cis_debian9_L1","check":{"id":3078,"title":"Ensure SSH root login is disabled","description":"The PermitRootLogin parameter specifies if the root user can log in using ssh(1). The default is no.","rationale":"Disallowing root logins over SSH requires server admins to authenticate using their own individual account, then escalating to root via sudo or su. This in turn limits opportunity for non-repudiation and provides a clear audit trail in the event of a security incident.","remediation":"Edit the /etc/ssh/sshd_config file to set the parameter as follows: PermitRootLogin no","compliance":{"cis":"5.2.10","cis_csc":"4.3"},"rules":["f:/etc/ssh/sshd_config -> !r:^# && r:PermitRootLogin\\s+no"],"file":"/etc/ssh/sshd_config","result":"failed"}}
    sca.type: check
    sca.scan_id: 2006384692
    sca.policy: CIS benchmark for Debian/Linux 9 L1
    sca.check.id: 3078
    sca.check.title: Ensure SSH root login is disabled
    sca.check.description: The PermitRootLogin parameter specifies if the root user can log in using ssh(1). The default is no.
    sca.check.rationale: Disallowing root logins over SSH requires server admins to authenticate using their own individual account, then escalating to root via sudo or su. This in turn limits opportunity for non-repudiation and provides a clear audit trail in the event of a security incident.
    sca.check.remediation: Edit the /etc/ssh/sshd_config file to set the parameter as follows: PermitRootLogin no
    sca.check.compliance.cis: 5.2.10
    sca.check.compliance.cis_csc: 4.3
    sca.check.file: ["/etc/ssh/sshd_config"]
    sca.check.result: failed
    sca.check.previous_result: passed


The level 9 alert shows how the check has changed from **passed** to **failed**. This state is updated on the
manager side and the last result scanned is available from the SCA tab in the Wazuh app, which finishes the path
that began with the host being scanned.

.. thumbnail:: ../../../images/sca/sca-alert-ssh-permit-root-login.png
    :title: Alert generated due to SSH configuration change.
    :align: center
    :width: 100%

The insights provided by SCA Alerts will then help system operators to take actions aiming to reduce the attack surface of the
hosts they manage.
