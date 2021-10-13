.. _poc_audit_commands:

Auditing commands run by user
=============================

On the Linux monitored endpoint (RHEL), configure Audit logging to capture execve system calls (necessary to audit commands run by users). More info on :ref:`Audit Configuration Guide <learning_wazuh_audit_commands>`.

RHEL also has good documentation about Audit kernel subsystem, check `RHEL Audit documentation <https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/6/html/security_guide/chap-system_auditing>`_ for more information about this.

Configuration
-------------

- Check that the Linux Auditing System (``auditd``) is installed and running in your system.
- Check that your Wazuh agent is configured to read ``audit.log`` file. This configuration is included by default.

   .. code-block:: XML

      <localfile>
        <log_format>audit</log_format>
        <location>/var/log/audit/audit.log</location>
      </localfile>

- In order to monitor your user actions, get your current EUID ('root' user monitoring is not recommended for the test, as it can be quite noisy).

    .. code-block:: console

      # echo $EUID

- Create the rules for your user at ``/etc/audit/rules.d/wazuh.rules``. Make sure you include your user ``euid``:

    .. code-block:: XML

       -a exit,always -F euid=${replace_by_your_user_euid} -F arch=b32 -S execve -k audit-wazuh-c
       -a exit,always -F euid=${replace_by_your_user_euid} -F arch=b64 -S execve -k audit-wazuh-c

- Delete old rules (optional)

    .. code-block:: XML

        auditctl -D

- Update rules

    .. code-block:: XML

        auditctl -R /etc/audit/rules.d/wazuh.rules


Steps to generate the alerts
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

- Log in the RHEL Agent as the monitored user
- Execute a ping to www.google.com

Alerts
^^^^^^
Related alerts can be found with:

- ``data.audit.exe: "/usr/bin/ping"``

Affected endpoint
^^^^^^^^^^^^^^^^^

- RHEL 7 Agent