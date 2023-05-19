.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: The Linux Audit system provides a way to track security-relevant information on your machine. Discover some Audit use cases in this section of our documentation. 
  
Privilege abuse
===============

This use case shows how Wazuh can audit access to sensitive data in users' home directories. We use an audit rule that monitors all files and subdirectories in a user's home directory and tracks when another user tries to access them. Then, we create a Wazuh custom rule to alert for such behavior so that security teams can take action accordingly.

Ubuntu endpoint
---------------

In this use case, we have two users, John and Jane. We monitor Jane’s home directory and track if any other user that is not Jane or root tries to access this directory.

#. Create the two users, Jane and John, on your endpoint:

   .. code-block:: console

      # useradd jane
      # useradd john

#. Edit the audit rule file ``/etc/audit/audit.rules`` and add the following configuration:

   .. code-block:: console
      
      # echo "-a always,exit -S open -S openat -F dir=/home/jane/ -F perm=rwa -F auid>=1000 -F auid!=-1 -F euid!=<EUID_OF_JANE> -F uid!=0 -C auid!=obj_uid -F key=power_abuse">>/etc/audit/audit.rules

   Here is a breakdown of the rule:

   - ``-a always,exit`` specifies that the rule should always trigger on a process exit.
   - ``-F dir=/home/jane/`` specifies that the rule should only apply to files and directories inside the ``/home/jane`` directory.
   - ``-F perm=rwa`` specifies the permissions being monitored for the system call to occur, in this case, read, write, and append permissions.
   - ``-F auid>=1000`` this specifies the audit UID (``auid``), which is the user ID associated with the process that triggered the event, should be more than or equal to 1000.
   - ``-F auid!=-1`` specifies the ``auid`` should not be equal to -1, which is used when a process is launched without a user ID.
   - ``-F euid!=<EUID_OF_JANE>`` specifies that the audit rule should not apply to Jane herself. ``<EUID_OF_JANE>`` represents Jane’s ``euid``. You can obtain a user ``euid`` using the following command: ``id -u <USERNAME>``.
   - ``-F uid!=0`` specifies that the audit rule doesn’t apply to the root user.
   - ``-C auid!=obj_uid`` specifies that the ``auid`` should not be equal to the object UID (``obj_uid``), which is the UID associated with the accessed file or directory.
   - ``-k power_abuse`` provides a unique ID that Wazuh uses to analyze the audit logs.
   
   This audit rule logs all attempts by another user to open files or directories inside Jane’s home directory.

#. Reload the rules and confirm they are in place:

   .. code-block:: console      
      
      # auditctl -R /etc/audit/rules.d/audit.rules
      # auditctl -l

   .. code-block:: console       
      :class: output
      
      -a always,exit -S open,openat -F dir=/home/jane/ -F perm=rwa -F auid>=1000 -F auid!=-1 -F euid!=1003 -F uid!=0 -C auid!=obj_uid -F key=power_abuse

Wazuh server
------------
#. Update the ``/var/ossec/etc/lists/audit-keys`` CDB list with the custom audit key:

   .. code-block:: console
      
      # echo "power_abuse:abuse" >> /var/ossec/etc/lists/audit-keys

#. Add the following rule to the custom ``/var/ossec/etc/rules/local_rules.xml`` file:

   .. code-block:: xml
      
      <group name="audit">
        <rule id="100210" level="8">
          <if_sid>80700</if_sid>
          <list field="audit.key" lookup="match_key_value" check_value="abuse">etc/lists/audit-keys</list>
          <description>Audit: User with uid $(audit.uid) trying to access $(audit.directory.name) files.</description>
          <group>audit_command,</group>
        </rule>
      </group>

#. Restart the Wazuh manager to apply the changes:

   .. code-block:: console
      
      # systemctl restart wazuh-manager

Test the configuration
----------------------

Perform the following actions on the monitored endpoint to test the configuration.

#. Switch to the user John:

   .. code-block:: console
      
      $ su john

#. Then, try to list the content of ``/home/jane`` or open any file under this directory:

   .. code-block:: console
      
      $ ls /home/jane/

You can visualize the alerts for ``rule.id:100210`` in the Wazuh dashboard.

.. thumbnail:: /images/manual/system-calls-monitoring/test-the-configuration.png
  :title: Test the configuration
  :alt: Test the configuration
  :align: center
  :width: 80%