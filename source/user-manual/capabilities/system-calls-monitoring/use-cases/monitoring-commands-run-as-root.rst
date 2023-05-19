.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: The Linux Audit system provides a way to track security-relevant information on your machine. Discover some Audit use cases in this section of our documentation. 
  
Monitoring commands run as root
===============================

In this use case, we use Wazuh and Linux Audit system to monitor all commands executed using root privileges. 

Ubuntu endpoint
---------------

#. Add the rules below in the ``/etc/audit/audit.rules`` audit rule file:

   .. code-block:: console
      
      # echo "-a exit,always -F euid=0 -F arch=b64 -S execve -k audit-wazuh-c" >> /etc/audit/audit.rules
      # echo "-a exit,always -F euid=0 -F arch=b32 -S execve -k audit-wazuh-c" >> /etc/audit/audit.rules

   - ``-a always,exit``: Specifies that the audit event should always be generated, regardless of whether the system call was successful or not.
   - ``-S execve``: Specifies that the rule should match events that involve the ``execve`` system call.
   - ``-F euid=0``: Specifies that the rule should only match events where the effective user ID (euid) is equal to 0, which is the root user.
   - ``-k audit-wazuh-c``: Specifies a key value that will be used to tag the generated audit events.
   
   Overall, this rule generates audit events for every execution of the ``execve`` system call by the root user (euid=0) and tags those events with the key ``"audit-wazuh-c"``.

#. Reload the audit rules to apply the changes:

   .. code-block:: console
      
      # auditctl -R /etc/audit/audit.rules
      # auditctl -l

   .. code-block:: console   
      :class: output

      -w /home -p w -k audit-wazuh-w
      -w /home -p a -k audit-wazuh-a
      -w /home -p r -k audit-wazuh-r
      -w /home -p x -k audit-wazuh-x
      -a always,exit -F arch=b64 -S execve -F euid=0 -F key=audit-wazuh-c
      -a always,exit -F arch=b32 -S execve -F euid=0 -F key=audit-wazuh-c

Test the configuration
----------------------

Perform the following actions below.

#. Run the following command as a regular user using root privileges:

   .. code-block:: console
      
      $ sudo touch newfile.txt

#. Run the command below as the root user:

   .. code-block:: console
      
      # touch newfile2.txt

You can visualize the alerts for ``rule.id:80792`` in the Wazuh dashboard.

.. thumbnail:: /images/manual/system-calls-monitoring/monitoring-commands-run-as-root.png
  :title: Monitoring commands run as root
  :alt: Monitoring commands run as root
  :align: center
  :width: 80%

.. thumbnail:: /images/manual/system-calls-monitoring/root-commands-alerts.png
  :title: root commands alerts
  :alt: root commands alerts
  :align: center
  :width: 80%

Checking the ``euid`` field, we see both actions were performed using root privileges. It is also possible to go further and see who initiated the action by checking the ``auid`` field. 

