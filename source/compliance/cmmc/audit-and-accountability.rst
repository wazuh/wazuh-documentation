.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how Wazuh helps meet the CMMC Audit and Accountability (AU) requirements, with a use case that detects changes to the sudo configuration.

Audit and Accountability (AU)
=============================

AU.L2-3.3.1 System Auditing
---------------------------

AU.L2-3.3.1 requires you to create and retain system audit logs and records to enable the monitoring, analysis, investigation, and reporting of unlawful or unauthorized system activity.

Audit records must capture the events that matter for an investigation, such as changes to the files that control privileged access.

Wazuh helps meet AU.L2-3.3.1 by collecting the logs and file integrity events of your endpoints and storing the resulting findings in the Wazuh indexer. For example, the File Integrity Monitoring (FIM) module records what changed in a monitored file.

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

   .. thumbnail:: /images/compliance/cmmc/fim-sudoers-finding.png
      :title: FIM finding for the sudoers file
      :alt: FIM finding for the sudoers file
      :align: center
      :width: 80%

#. Expand the finding. The ``file.diff`` field shows the line that changed.

   .. thumbnail:: /images/compliance/cmmc/fim-sudoers-finding-diff.png
      :title: Changed line in the sudoers file
      :alt: Changed line in the sudoers file
      :align: center
      :width: 80%

#. Scroll down to the ``wazuh.rule.compliance.cmmc`` field. The finding maps to AU.L2-3.3.1, CM.L2-3.4.1, and SI.L2-3.14.1.

   .. thumbnail:: /images/compliance/cmmc/fim-sudoers-finding-cmmc.png
      :title: CMMC requirements of the FIM finding
      :alt: CMMC requirements of the FIM finding
      :align: center
      :width: 80%

After you finish this use case, remove the test file on the Ubuntu endpoint:

.. code-block:: console

   $ sudo rm /etc/sudoers.d/90-contractor
