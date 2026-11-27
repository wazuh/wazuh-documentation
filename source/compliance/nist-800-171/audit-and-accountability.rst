.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how Wazuh helps you meet the NIST SP 800-171 Audit and Accountability requirement 3.3.1 with a file integrity monitoring use case.

Audit and Accountability (3.3)
==============================

3.3.1 Create and retain system audit logs and records
-----------------------------------------------------

Requirement 3.3.1 states, "Create and retain system audit logs and records to the extent needed to enable the monitoring, analysis, investigation, and reporting of unlawful or unauthorized system activity."

Wazuh helps meet requirement 3.3.1 by collecting the logs and file integrity events of your endpoints and storing the resulting findings in the Wazuh indexer. For example, the File Integrity Monitoring (FIM) module records what changed in a monitored file.

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

#. Restrict the rule to a single command:

   .. code-block:: console

      $ sudo sed -i 's#NOPASSWD: ALL#/usr/bin/systemctl restart nginx#' /etc/sudoers.d/90-contractor

Wazuh dashboard
~~~~~~~~~~~~~~~

#. Open the menu (☰), go to **Endpoint security** > **File Integrity Monitoring**, switch to the **Findings** tab, and enter the following query:

   .. code-block:: none

      file.path:"/etc/sudoers.d/90-contractor"

   The ``Wazuh FIM - File modified`` finding reports the change to the file.

   .. thumbnail:: /images/compliance/nist-800-171/sudoers-fim-finding.png
      :title: FIM finding for the sudoers file
      :alt: FIM finding for the sudoers file
      :align: center
      :width: 80%

#. Expand the finding. The ``file.diff`` field shows the line that changed.

   .. thumbnail:: /images/compliance/nist-800-171/sudoers-fim-file-diff.png
      :title: Changed line of the sudoers file
      :alt: Changed line of the sudoers file
      :align: center
      :width: 80%

#. Scroll down to the ``wazuh.rule.compliance.nist_800_171`` field. The finding maps to 3.3.1, 3.3.2, 3.4.1, 3.14.6, and 3.14.7.

   .. thumbnail:: /images/compliance/nist-800-171/sudoers-fim-nist-800-171-mapping.png
      :title: NIST 800-171 mapping of the FIM finding
      :alt: NIST 800-171 mapping of the FIM finding
      :align: center
      :width: 80%

After you finish this use case, remove the test file on the Ubuntu endpoint:

.. code-block:: console

   $ sudo rm /etc/sudoers.d/90-contractor
