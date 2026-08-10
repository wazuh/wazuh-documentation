.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Check out this section to learn more about how to use Wazuh for GDPR II (The General Data Protection Regulation of the European Union).

GDPR II, Principles
====================

This chapter describes the GDPR requirements for processing personal data.

Chapter II, Article 5, Head 1 (f)
----------------------------------

**Principles relating to the processing of personal data, Head 1 (f)**: *“Personal data shall be processed in a manner that ensures appropriate security of the personal data, including protection against unauthorized or unlawful processing and against accidental loss, destruction or damage, using appropriate technical or organizational measures (integrity and confidentiality).”*

This article requires confidentiality and integrity in the processing of user data. The Wazuh File Integrity Monitoring (FIM) module helps with this requirement by monitoring files and folders. The FIM module generates a finding when it detects a file creation, modification, or deletion event. The module stores the cryptographic checksums and other attributes of a file, and compares them against the current values. The FIM detections are Sigma rules. Each rule maps to ``II_5.1.f`` through the ``compliance.gdpr`` field.

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

      # mkdir /root/personal_data

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
    :align: center
    :width: 80%

.. thumbnail:: /images/compliance/gdpr/fim-file-mod-details.png
    :title: File modification finding - more details
    :align: center
    :width: 80%
