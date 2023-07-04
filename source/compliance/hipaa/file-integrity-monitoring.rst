.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: The File Integrity Monitoring module assists you in meeting HIPAA compliance. Learn more about it in this section of the Wazuh documentation.

File integrity monitoring
=========================

The Wazuh File Integrity Monitoring (FIM) module monitors an endpoint filesystem to detect changes in specified files and directories. It triggers alerts on file creation, modification, or deletion from the monitored paths. The FIM module stores the cryptographic checksum and other attributes of the monitored file, folder, or Windows registry key, and alerts when there is a change.

The :doc:`File Integrity Monitoring </user-manual/capabilities/file-integrity/index>` module assists you in meeting the following HIPAA sections:

- **Workforce Security §164.308(a)(3)(i) - Authorization and/or supervision**: *“Implement procedures for the authorization and/or supervision of workforce members who work with electronic protected health information or in locations where it might be accessed.”*

- **Integrity §164.312(c)(1) - Mechanism to authenticate electronic protected health information**: *“Implement electronic mechanisms to corroborate that electronic protected health information has not been altered or  destroyed in an unauthorized manner. ”*

- **Transmission Security §164.312(e)(1) - Integrity controls**: *“Implement security measures to ensure that electronically transmitted electronic protected health information is not improperly modified without detection until disposed of.”*

These sections of the HIPAA standard require monitoring files and directories containing healthcare data. The Wazuh FIM module assists in meeting this HIPAA section. It monitors files containing healthcare information and generates alerts when there is a modification or deletion. Refer to the Wazuh :doc:`FIM documentation </user-manual/capabilities/file-integrity/index>` for more details on configuring file integrity monitoring.

Use cases: Detect file changes and deletion
-------------------------------------------

The use cases in this section are performed on an Ubuntu 22.04 endpoint.

Detect file changes
^^^^^^^^^^^^^^^^^^^

In this use case, the Wazuh agent detects changes made to the ``patient_data.txt`` file in the ``/root/health_data`` directory.

On the Ubuntu endpoint

#. Create the ``health_data`` directory in the ``/root directory``:

   .. code-block:: console

         # mkdir /root/health_data


#. Create the file ``patient_data.txt`` in the ``/root/health_data`` directory and include some content:

   .. code-block:: console

         # touch /root/health_data/patient_data.txt
         # echo "User1 = medication" >> /root/health_data/patient_data.txt 

#. Add the following configuration to the ``syscheck`` block of the agent configuration file ``/var/ossec/etc/ossec.conf`` to monitor the ``/root/health_data`` directory for changes:

   .. code-block:: console

         <syscheck>
            <directories check_all="yes" realtime="yes">/root/health_data</directories>
         </syscheck>

#. Restart the Wazuh agent to apply the changes:

   .. include:: /_templates/common/restart_agent.rst

#. Modify the file by adding new content:
 
   .. code-block:: console

         # echo "User2 = medication3" >> /root/health_data/patient_data.txt

   You can see an alert generated to show that a file in the monitored directory was modified.

      .. thumbnail:: /images/compliance/hipaa/04-file-integrity-monitoring.png    
         :title: Alert generated to show that a file in the monitored directory was modified 
         :align: center
         :width: 80%

   The alert details include the differences in the file checksum, the file modified, the modification time, and other information.

Detect file deletion
^^^^^^^^^^^^^^^^^^^^

In this use case, you configure the Wazuh agent to detect file deletion in a monitored directory. Using the steps below, configure the FIM module to monitor the ``/root/health_data/`` directory for changes.

On the Ubuntu endpoint 

#. Create the ``health_data`` directory in the ``/root`` directory if it is not present:
 
   .. code-block:: console

         # mkdir /root/health_data

#. Create the file ``patient_data.txt`` in the ``/root/health_data`` directory and include some content:

   .. code-block:: console

         # touch /root/health_data/patient_data.txt
         # echo "User1 = medication" > /root/health_data/patient_data.txt 

#. Add the following configuration to the ``syscheck`` block of the agent configuration file ``/var/ossec/etc/ossec.conf`` to monitor the ``/root/health_data`` directory for changes: 

   .. code-block:: console

         <syscheck>
            <directories check_all="yes" realtime="yes">/root/health_data</directories>
         </syscheck>

#. Restart the Wazuh agent to apply the changes:

   .. include:: /_templates/common/restart_agent.rst

#. Delete a file from the monitored directory. In this case, delete ``patient_data.txt``. You can see an alert generated for the file deleted.

   .. thumbnail:: /images/compliance/hipaa/05-file-integrity-monitoring.png    
      :title: You can see an alert generated for the file deleted 
      :align: center
      :width: 80%

   The alert details include the file deleted, the endpoint where the file was deleted, the deletion time, and other details. 