.. _poc_audit_commands:

Auditing commands run by user
=============================

You can enable `Audit` logging to capture and log `execve` system calls so the Wazuh agent can read these logs. Create specific rules to alert about commands run by the user.

More information on the :ref:`Audit Configuration Guide <learning_wazuh_audit_commands>`. In addition, `RHEL Audit documentation <https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/6/html/security_guide/chap-system_auditing>`_ has extended information about the Audit kernel subsystem.

Configuration
-------------

#. Run ``systemctl status auditd.service`` to check that the Linux Auditing System is installed and running in your RHEL7 agent endpoint.

#. Check that ``/var/ossec/etc/ossec.conf`` in your RHEL7 agent endpoint is configured for the agent to read the ``audit.log`` file.

   .. code-block:: XML

      <localfile>
        <log_format>audit</log_format>
        <location>/var/log/audit/audit.log</location>
      </localfile>

#. Get your current `euid` in the RHEL7 agent endpoint. This is needed to monitor the actions of your user. Monitoring 'root' user's actions is not recommended for the test, as it can be quite noisy.

    .. code-block:: console

      # echo $EUID

#. Create the rules for your user at ``/etc/audit/rules.d/wazuh.rules``, replacing ``<your_user_id>`` with your current ``euid``.

    .. code-block:: XML

       -a exit,always -F euid=${<your_user_id>} -F arch=b32 -S execve -k audit-wazuh-c
       -a exit,always -F euid=${<your_user_id>} -F arch=b64 -S execve -k audit-wazuh-c

#. Optionally, delete old rules.

    .. code-block:: console

        # auditctl -D

#. Load rules from file.

    .. code-block:: console

        # auditctl -R /etc/audit/rules.d/wazuh.rules


Steps to generate the alerts
----------------------------

#. Log in the RHEL 7 Agent endpoint as the monitored user.

#. Execute a ping to www.google.com

Alerts
------
Related alerts can be found with:

* ``data.audit.exe: "/usr/bin/ping"``

Affected endpoints
------------------

* RHEL 7 agent host
