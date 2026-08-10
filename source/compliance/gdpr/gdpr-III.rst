.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Check out this section to learn more about how to use Wazuh for GDPR III (The General Data Protection Regulation of the European Union).

GDPR III, Rights of the data subject
======================================

In this chapter, the GDPR sets out individuals' rights regarding the management of their personal data by third parties.

Chapter III, Article 17, Head 1
---------------------------------

**Right to erasure (right to be forgotten), Head 1**: *“The data subject shall have the right to obtain from the controller the erasure of personal data concerning him or her without undue delay, and the controller shall have the obligation to erase personal data without undue delay.”*

The Wazuh FIM module helps meet this requirement. It monitors the files and folders that contain personal data, and it generates a finding when a modification or deletion occurs. A file deletion finding shows that the personal data of an individual was deleted in response to their request. Erasure requests also cover copies held elsewhere.

Use case: Detect file deletion
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

In this use case, you configure the Wazuh agent on an Ubuntu 24.04 endpoint to detect file deletion in the ``/root/personal_data`` directory. You then delete a file to trigger a finding.

Ubuntu endpoint
~~~~~~~~~~~~~~~

#. Switch to the ``root`` user:

   .. code-block:: console

      $ sudo su

#. Create the directory ``personal_data`` in the ``/root`` directory:

   .. code-block:: console

      # mkdir /root/personal_data

#. Create the file ``subject_data.txt`` in the ``/root/personal_data`` directory and include some content:

   .. code-block:: console

      # touch /root/personal_data/subject_data.txt
      # echo "User01= user03_ID" >> /root/personal_data/subject_data.txt

#. Add the highlighted configuration to the ``<syscheck>`` block of the Wazuh agent configuration file ``/var/ossec/etc/ossec.conf``:

   .. code-block:: xml
      :emphasize-lines: 2

      <syscheck>
        <directories check_all="yes" realtime="yes">/root/personal_data</directories>
      </syscheck>

#. Restart the Wazuh agent to apply the changes:

   .. code-block:: console

      # systemctl restart wazuh-agent

#. Delete the file ``subject_data.txt``:

   .. code-block:: console

      # rm /root/personal_data/subject_data.txt

On the Wazuh dashboard, a finding shows that the ``subject_data.txt`` file was deleted.

.. thumbnail:: /images/compliance/gdpr/fim-file-del.png
    :title: File deletion finding visualization
    :align: center
    :width: 80%

Chapter III, Article 18, Head 2
---------------------------------

**Right to restriction of processing, Head 2**: *“Where processing has been restricted under paragraph 1, such personal data shall, with the exception of storage, only be processed with the data subject's consent or for the establishment, exercise or defence of legal claims or for the protection of the rights of another natural or legal person or for reasons of important public interest of the Union or of a Member State.”*

This article requires that when an individual requests a temporary restriction on processing their personal data, no one accesses that data without explicit consent.

With the FIM module and the Wazuh dashboard, you can perform searches to confirm that no user data is modified or deleted during the specified restriction period.

Use case: Search for FIM events within a certain time frame
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

On the Wazuh dashboard, check **Threat intelligence** > **Threat Hunting** > **findings** to confirm that no modification or deletion of restricted data occurred during a specific time interval. The **GDPR** dashboard also shows this information.

.. thumbnail:: /images/compliance/gdpr/syscheck-no-alerts.png
    :title: File modification finding visualization within specific time frame
    :align: center
    :width: 80%

You can see a finding from the previous use case.
