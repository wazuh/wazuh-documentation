.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: The Linux Audit system provides a way to track security-relevant information on your machine. Discover some Audit use cases in this section of our documentation. 
  
Monitoring file and directory access
====================================

In this example, we monitor various types of access to the ``/home`` directory of the monitored endpoint. This includes write, read, execution access, and changes in the directory's attributes.

Ubuntu endpoint
---------------

#. Run the commands below to configure the following audit rules:

   .. code-block:: console
      
      # echo "-w /home -p w -k audit-wazuh-w" >> /etc/audit/audit.rules
      # echo "-w /home -p a -k audit-wazuh-a" >> /etc/audit/audit.rules
      # echo "-w /home -p r -k audit-wazuh-r" >> /etc/audit/audit.rules
      # echo "-w /home -p x -k audit-wazuh-x" >> /etc/audit/audit.rules

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

Audit configuration alerts are displayed in the **Threat hunting** tab of the Wazuh dashboard. 

.. thumbnail:: /images/manual/system-calls-monitoring/audit-configuration-alerts.png
  :title: Audit configuration alerts
  :alt: Audit configuration alerts
  :align: center
  :width: 80%

.. Note:: 
   While it would be possible to define the previous audit rules as one rule specifying ``-p warx``,we intentionally separate them out. So, each rule has its own unique key value that is important for analysis.

Test the configuration
----------------------

Perform the following actions on the monitored endpoint.

Create a new file
^^^^^^^^^^^^^^^^^

Run the command below to create a new file in the ``/home`` directory:

   .. code-block:: console
      
      $ touch /home/malware.py

You can visualize the alert data in the Wazuh dashboard. To do this, go to the **Threat hunting** module and apply the ``rule.id:80790`` filter to query the alert.
 
.. thumbnail:: /images/manual/system-calls-monitoring/create-a-new-file-alert.png
  :title: Create a new file alert
  :alt: Create a new file alert
  :align: center
  :width: 80%

Write access
^^^^^^^^^^^^

Run the command below to read the new file:

   .. code-block:: console
      
      $ nano /home/malware.py

You can visualize the alert data in the Wazuh dashboard. To do this, go to the **Threat hunting** module and apply the ``rule.id:80784`` filter to query the alert.

.. thumbnail:: /images/manual/system-calls-monitoring/write-access-alert.png
  :title: Write access alert
  :alt: Write access alert
  :align: center
  :width: 80%
  
Change permissions
^^^^^^^^^^^^^^^^^^

Run the command below to change the permission of the ``/home/malware.py`` file:

   .. code-block:: console
      
      $ chmod u+x /home/malware.py

You can visualize the alert data in the Wazuh dashboard. To do this, go to the **Threat hunting** module and apply the ``rule.id:80787`` filter to query the alert.

.. thumbnail:: /images/manual/system-calls-monitoring/change-permissions-alert.png
  :title: Change permissions alert
  :alt: Change permissions alert
  :align: center
  :width: 80%
  
Read and execute access
^^^^^^^^^^^^^^^^^^^^^^^

Run the command below to execute the ``/home/malware.py`` file:

   .. code-block:: console
      
      $ /home/malware.py

You can visualize the alert data in the Wazuh dashboard. To do this, go to the **Threat hunting** module and apply the ``rule.id: (80784 or 80789)`` filters to query the alerts.

.. thumbnail:: /images/manual/system-calls-monitoring/execute-access-alert.png
  :title: Read and execute access alert
  :alt: Read and execute access alert
  :align: center
  :width: 80%
  
Delete file
^^^^^^^^^^^

Run the command below to delete the ``/home/malware.py`` file:

   .. code-block:: console
      
      $ rm /home/malware.py

You can visualize the alert data in the Wazuh dashboard. To do this, go to the **Threat hunting** module and apply the ``rule.id:80791`` filter to query the alert.

.. thumbnail:: /images/manual/system-calls-monitoring/delete-file-alert.png
  :title: Delete file alert
  :alt: Delete file alert
  :align: center
  :width: 80%
  