.. _rootcheck-examples:

Examples
========

#. `Root access to SSH`_

.. _how_to_rootcheck_ssh:

Root access to SSH
------------------

1. First you need to create your custom audit file (audit_test.txt):
::

  # PermitRootLogin not allowed
  # PermitRootLogin indicates if the root user can log in by ssh.
  $sshd_file=/etc/ssh/sshd_config;

  [SSH Configuration - 1: Root can log in] [any] [1]
  f:$sshd_file -> !r:^# && r:PermitRootLogin\.+yes;
  f:$sshd_file -> r:^#\s*PermitRootLogin;

2. Reference our new file in the rootcheck options:
::

   <rootcheck>
      <system_audit>/var/ossec/etc/shared/audit_test.txt</system_audit>
   </rootcheck>
