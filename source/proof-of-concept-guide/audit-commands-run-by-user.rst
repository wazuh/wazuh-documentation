.. meta::
  :description: In this proof of concept, you create specific rules to alert about commands run by the user. Learn more about it in our documentation.
  
.. _poc_audit_commands:

Auditing commands run by a user
===============================

With this POC, you can create specific rules to alert about commands run by the user. To do this, you must first enable Audit logging to capture and log execve system calls so the Wazuh agent can read these logs.

Check our documentation to learn more about the :ref:`Linux auditd system <learning_wazuh_audit_commands>`. In addition, `CentOS Audit documentation <https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/8/html/security_hardening/auditing-the-system_security-hardening>`_ has extended information about the Audit kernel subsystem.

Configuration
-------------

Configure your environment as follows to test the POC.

#. Run ``systemctl status auditd.service`` to check that the Linux Auditing System is installed and running on your CentOS 8 endpoint.

#. Check that ``/var/ossec/etc/ossec.conf`` in your CentOS 8 endpoint is configured for the agent to read the ``audit.log`` file. This configuration is included by default.

   .. code-block:: XML

      <localfile>
        <log_format>audit</log_format>
        <location>/var/log/audit/audit.log</location>
      </localfile>

#. Get your current euid in the CentOS 8 endpoint. This is needed to monitor the actions of your user. Root user monitoring is not recommended for this test, as it can be quite noisy.

    .. code-block:: console

      # echo $EUID

#. Create the rules for your user at ``/etc/audit/rules.d/wazuh.rules``. Make sure to replace ``<your_user_id>`` with your current ``euid``.

    .. code-block:: XML

       -a exit,always -F euid=your_user_id -F arch=b32 -S execve -k audit-wazuh-c
       -a exit,always -F euid=your_user_id -F arch=b64 -S execve -k audit-wazuh-c

#. Optionally, you can delete old rules.

    .. code-block:: console

        # auditctl -D

#. Load rules from file.

    .. code-block:: console

        # auditctl -R /etc/audit/rules.d/wazuh.rules


Steps to generate the alerts
----------------------------

#. Log into the CentOS 8 endpoint as the monitored user.

#. Execute a ping to *www.google.com*

Query the alerts
----------------

You can visualize the alert data in the Wazuh Kibana plugin. To do this, go to the **Security events** module and add the filters in the search bar to query the alerts.

* ``data.audit.exe: "/usr/bin/ping"``


.. thumbnail:: ../images/poc/Auditing_commands_run_by_a_user.png
          :title: Auditing commands run by a user
          :align: center
          :wrap_image: No


