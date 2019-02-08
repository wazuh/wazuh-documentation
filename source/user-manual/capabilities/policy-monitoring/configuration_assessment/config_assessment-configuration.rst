.. Copyright (C) 2019 Wazuh, Inc.

Configuration
=============

#. `Basic usage`_

Basic usage
-----------

The options for the configuration assessment module are described at the :ref:`configuration assessment section <reference_ossec_configuration_assessment>` in :ref:`ossec.conf <reference_ossec_conf>`. Below there is an example of a basic configuration.

::

 <configuration_assessment>
   <enabled>yes</enabled>
   <scan_on_start>yes</scan_on_start>
   <interval>1m</interval>
   <skip_nfs>yes</skip_nfs>

   <profile>debian/cis_debian_rcl.yml</profile>
 </configuration_assessment>


Configure periodic scans
------------------------

This is a basic configuration to run a scan on the 29th of every month.

::

 <configuration_assessment>
   <enabled>yes</enabled>
   <scan_on_start>yes</scan_on_start>
   <scan_day>29</scan_day>
   <skip_nfs>yes</skip_nfs>

   <profile>debian/cis_debian_rcl.yml</profile>
 </configuration_assessment>


Root access to SSH
------------------

1. Create a custom audit YAML file (audit_test.yml) that will be parsed by the module:
::

   - id: 18000
     title: "Ensure SSH root login is disabled"
     cis_control: "5.2.10"
     description: "The PermitRootLogin parameter specifies if the root user can log in using ssh. The default is no."
     rationale: "Disallowing root logins over SSH requires system admins to authenticate using their own individual account, then escalating to root via sudo or su . This in turn limits opportunity for non-repudiation and provides a clear audit trail in the event of a security incident."
     remediation: "Edit the /etc/ssh/sshd_config file to set the parameter as follows: PermitRootLogin no."
     compliance:
        - cis: "4.3"
     condition: any
     rules:
        - 'f:/etc/ssh/sshd_config -> !r:^# && r:PermitRootLogin\.+yes;'
        - 'f:/etc/ssh/sshd_config -> r:^#\s*PermitRootLogin;'

2. Set the new file in the configuration:
::

      <configuration_assessment>
        <enabled>yes</enabled>
        <scan_on_start>yes</scan_on_start>
        <interval>50s</interval>
        <skip_nfs>yes</skip_nfs>

        <profile>audit_test.yml</profile>
      </configuration_assessment>