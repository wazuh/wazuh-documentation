.. _rootcheck-examples:

Examples
========

#. `Root access by SSH`_

.. _how_to_rootcheck_ssh:

Root access by SSH
------------------

1. First you need to create your audit file (audit_test.txt):
::

  # PermitRootLogin no allowed
  # PermitRootLogin indicate if the user root can log in by ssh.
  $sshd_file=/etc/ssh/sshd_config;

  [SSH Configuration - 1: Root can log in] [any] [1]
  f:$sshd_file -> !r:^# && r:PermitRootLogin\.+yes;
  f:$sshd_file -> r:^#\s*PermitRootLogin;

2. Configure our created file on the rootcheck options:
::

  <rootcheck>
      <system_audit>/var/ossec/etc/shared/audit_test.txt</system_audit>
   </rootcheck>
