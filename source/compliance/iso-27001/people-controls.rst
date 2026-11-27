.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how Wazuh helps you meet ISO 27001 Annex A people control A.6.8 by reporting security events as findings, with a File Integrity Monitoring use case for the sudo configuration.

People controls
===============

A.6.8 Information security event reporting
------------------------------------------

Control A.6.8 requires the organization to provide a mechanism for personnel to report observed or suspected information security events in a timely manner.

Automated detection complements personnel reports because it detects events nobody observes, such as changes to configuration files.

Wazuh helps meet the A.6.8 control by reporting security events as findings in real time. For example, the Wazuh File Integrity Monitoring (FIM) module reports changes to monitored files and shows what changed.

Use case: Detecting changes to the sudo configuration
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

This use case shows how to configure the Wazuh agent on an Ubuntu 24.04 endpoint to report changes to the files in the ``/etc/sudoers.d`` directory. Changes to these files grant or remove privileged access.

Ubuntu endpoint
~~~~~~~~~~~~~~~

#. Add the following configuration to the ``<syscheck>`` block of the Wazuh agent configuration file ``/var/ossec/etc/ossec.conf``:

   .. code-block:: xml

      <directories report_changes="yes" realtime="yes">/etc/sudoers.d</directories>

#. Restart the Wazuh agent to apply the changes:

   .. code-block:: console

      $ sudo systemctl restart wazuh-agent

#. Create a sudoers file that gives the ``contractor01`` user full privileges without a password:

   .. code-block:: console

      $ echo "contractor01 ALL=(ALL) NOPASSWD: ALL" | sudo tee /etc/sudoers.d/90-contractor
      $ sudo chmod 440 /etc/sudoers.d/90-contractor

#. Restrict the sudoers rule to a single command:

   .. code-block:: console

      $ sudo sed -i 's#NOPASSWD: ALL#/usr/bin/systemctl restart nginx#' /etc/sudoers.d/90-contractor

Wazuh dashboard
~~~~~~~~~~~~~~~

#. Open the menu (**☰**), go to **Endpoint security** > **File Integrity Monitoring**, switch to the **Findings** tab, and enter the following query:

   .. code-block:: none

      file.path:"/etc/sudoers.d/90-contractor"

   The ``Wazuh FIM - File modified`` finding reports the change to the file.

   .. thumbnail:: /images/compliance/iso-27001/fim-sudoers-finding.png
      :title: File Integrity Monitoring finding for the sudoers file
      :alt: File Integrity Monitoring finding for the sudoers file
      :align: center
      :width: 80%

#. Expand the finding. The ``file.diff`` field shows the line that changed.

   .. thumbnail:: /images/compliance/iso-27001/fim-sudoers-finding-details.png
      :title: File Integrity Monitoring finding details
      :alt: File Integrity Monitoring finding details
      :align: center
      :width: 80%

#. Scroll down to the ``wazuh.rule.compliance.iso_27001`` field to see the Annex A controls of the finding.

   .. thumbnail:: /images/compliance/iso-27001/fim-sudoers-compliance-field.png
      :title: ISO 27001 controls of the File Integrity Monitoring finding
      :alt: ISO 27001 controls of the File Integrity Monitoring finding
      :align: center
      :width: 80%

After you finish this use case, remove the test file on the Ubuntu endpoint:

.. code-block:: console

   $ sudo rm /etc/sudoers.d/90-contractor
