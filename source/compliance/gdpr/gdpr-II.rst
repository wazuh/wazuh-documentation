.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Check out this section to learn more about how to use Wazuh for GDPR II (The General Data Protection Regulation of the European Union).

GDPR II, Principles
====================

This chapter describes the GDPR requirements for processing personal data.

Chapter II, Article 5, Head 1 (f)
----------------------------------

**Principles relating to the processing of personal data, Head 1 (f)**: *“Personal data shall be processed in a manner that ensures appropriate security of the personal data, including protection against unauthorized or unlawful processing and against accidental loss, destruction or damage, using appropriate technical or organizational measures (integrity and confidentiality).”*

This article requires confidentiality and integrity in the processing of user data. The Wazuh File Integrity Monitoring (FIM) module helps with this requirement by monitoring files and folders. The FIM module generates a finding when it detects a file creation, modification, or deletion event. The module stores the cryptographic checksums and other attributes of a file, and compares them against the current values. The FIM detections are Sigma rules. The file modification and deletion rules map to ``II_5.1.f`` through the ``compliance.gdpr`` field.

Use case: Detect file changes
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

In this use case, you configure the Wazuh agent on an Ubuntu 24.04 endpoint to detect changes in the ``/root/personal_data``. You then modify a file to trigger a finding.

Ubuntu endpoint
~~~~~~~~~~~~~~~

-  Switch to the ``root`` user:

   .. code-block:: console

      $ sudo su

-  Create the directory ``personal_data`` in the ``/root`` directory:

   .. code-block:: console

      # mkdir -p /root/personal_data

-  Create the file ``subject_data.txt`` in the ``/root/personal_data`` directory and include some content:

   .. code-block:: console

      # touch /root/personal_data/subject_data.txt
      # echo "User01= user03_ID" >> /root/personal_data/subject_data.txt

-  Add the highlighted configuration to the ``<syscheck>`` block of the Wazuh agent configuration file ``/var/ossec/etc/ossec.conf``:

   .. code-block:: xml
      :emphasize-lines: 2

      <syscheck>
        <directories realtime="yes" check_all="yes" report_changes="yes">/root/personal_data</directories>
      </syscheck>

-  Restart the Wazuh agent to apply the changes:

   .. code-block:: console

      # systemctl restart wazuh-agent

-  Modify the file by changing the content of ``subject_data.txt`` from ``User01= user03_ID`` to ``User01= user02_ID``:

   .. code-block:: console

      # echo "User01= user02_ID" > /root/personal_data/subject_data.txt

-  Confirm the change took effect by viewing the contents of the modified file:

   .. code-block:: console

      # cat /root/personal_data/subject_data.txt

   .. code-block:: none
      :class: output

      User01= user02_ID

On the Wazuh dashboard, a finding shows the modification of the ``subject_data.txt`` file. The finding is tagged with ``II_5.1.f``.

.. thumbnail:: /images/compliance/gdpr/fim-file-mod.png
   :title: File modification finding visualization
   :alt: GDPR Findings tab filtered to a Wazuh FIM file modified finding on /root/personal_data/subject_data.txt
   :align: center
   :width: 80%

.. thumbnail:: /images/compliance/gdpr/fim-file-mod-details.png
   :title: File modification finding - more details
   :alt: Document details of the file modified finding with the GDPR compliance field and rule title highlighted
   :align: center
   :width: 80%

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

      # mkdir -p /root/personal_data

#. Create the file ``subject_data.txt`` in the ``/root/personal_data`` directory and include some content:

   .. code-block:: console

      # touch /root/personal_data/subject_data.txt
      # echo "User01= user03_ID" >> /root/personal_data/subject_data.txt

#. If you followed a previous use case on this page, remove its ``<directories>`` line for ``/root/personal_data`` first. Add the highlighted configuration to the ``<syscheck>`` block of the Wazuh agent configuration file ``/var/ossec/etc/ossec.conf``:

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
   :alt: Document details of the file deleted finding with the GDPR compliance field and rule title highlighted
   :align: center
   :width: 80%

Use case: Detect changes to file attributes
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

In this use case, you configure the Wazuh agent on an Ubuntu 24.04 endpoint to detect changes to ``/root/personal_data`` or its attributes, and to identify who made them. You then change the owner of a file to trigger a finding.

Ubuntu endpoint
~~~~~~~~~~~~~~~

#. Switch to the ``root`` user:

   .. code-block:: console

      $ sudo su

#. Create the directory ``personal_data`` in the ``/root`` directory:

   .. code-block:: console

      # mkdir -p /root/personal_data

#. Create the file ``subject_data.txt`` in the ``/root/personal_data`` directory and include some content:

   .. code-block:: console

      # touch /root/personal_data/subject_data.txt
      # echo "User01= user03_ID" >> /root/personal_data/subject_data.txt

#. Install ``auditd`` so that the Linux Auditing System provides information about who made changes in a monitored directory:

   .. code-block:: console

      # apt-get install auditd

   For Audit 3.1.1 and later, install the ``audispd`` af_unix plugin and restart the Audit service.

   .. code-block:: console

      # apt-get install audispd-plugins
      # service auditd restart

#. If you followed a previous use case on this page, remove its ``<directories>`` line for ``/root/personal_data`` first. Add the highlighted configuration to the ``<syscheck>`` block of the Wazuh agent configuration file ``/var/ossec/etc/ossec.conf``:

   .. code-block:: xml
      :emphasize-lines: 2, 3, 4, 5

      <syscheck>
        <directories check_all="yes" whodata="yes">/root/personal_data</directories>
        <whodata>
          <provider>audit</provider>
        </whodata>
      </syscheck>

#. Restart the Wazuh agent to apply the changes:

   .. code-block:: console

      # systemctl restart wazuh-agent

#. Change the owner of ``subject_data.txt`` from ``root`` to a regular user:

   .. code-block:: console

      # chown <YOUR_REGULAR_USER>:<YOUR_REGULAR_USER> /root/personal_data/subject_data.txt

The following image shows the change made to the file.

.. thumbnail:: /images/compliance/gdpr/fim-file-mod-who.png
   :title: Changed attributes finding visualization
   :alt: Document details of a FIM finding with the changed attributes in event.original highlighted
   :align: center
   :width: 80%
