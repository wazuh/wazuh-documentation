.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: The FIM module monitors an endpoint filesystem to detect file changes in specified files and directories. Learn more about it in this section.

File integrity monitoring
=========================

The Wazuh File Integrity Monitoring (FIM) module monitors an endpoint filesystem to detect file changes in specified files and directories. It triggers findings on file creation, modification, or deletion from the monitored paths. The FIM module compares the cryptographic checksum and other attributes of the monitored files and folders when a change occurs.

The Wazuh File Integrity Monitoring module assists you in meeting the following NIST 800-53 controls:

-  **CM-6 Configuration settings:** "*Configuration settings are the parameters that can be changed in the hardware, software, or firmware components of the system that affect the security and privacy posture or functionality of the system. Information technology products for which configuration settings can be defined include mainframe computers, servers, workstations, operating systems, mobile devices, input/output devices, protocols, and applications. Parameters that impact the security posture of systems include registry settings; account, file, or directory permission settings; and settings for functions, protocols, ports, services, and remote connections.*"

-  **SI-4 System monitoring:** "*System monitoring includes external and internal monitoring. External monitoring includes the observation of events occurring at external interfaces to the system. Internal monitoring includes the observation of events occurring within the system. Organizations monitor systems by observing audit activities in real-time or by observing other system aspects such as access patterns, characteristics of access, and other actions. The monitoring objectives guide and inform the determination of the events. System monitoring capabilities are achieved through a variety of tools and techniques, including intrusion detection and prevention systems, malicious code protection software, scanning tools, audit record monitoring software, and network monitoring software.*"

These NIST 800-53 controls require you to maintain secure configuration settings and monitor system changes in your infrastructure. The Wazuh FIM module helps you monitor the creation, modification, and deletion of files, directories, and Windows registry keys. This helps you meet the NIST 800-53 controls that require monitoring changes to files and folders.

Use cases
---------

Detect SSH configuration changes
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Wazuh helps meet the CM-6 Configuration settings requirement by providing file integrity monitoring on specified files and paths.

In this scenario, the Wazuh FIM monitors the SSH configuration file ``/etc/ssh/sshd_config`` on an Ubuntu 24.04 endpoint to detect changes in the SSH configuration. Monitor the SSH configuration file for changes using the steps below:

#. Install OpenSSH server:

   .. code-block:: console

      # apt install openssh-server

#. Add the following configuration to the ``<syscheck>`` block of the Wazuh agent configuration file ``/var/ossec/etc/ossec.conf``.

   This monitors the ``/etc/ssh/sshd_config`` file for changes:

   .. code-block:: xml

      <directories report_changes="yes" realtime="yes">/etc/ssh</directories>

#. Restart the Wazuh agent to apply the changes:

   .. code-block:: console

      # systemctl restart wazuh-agent

#. Enable the ``PasswordAuthentication`` option in the ``/etc/ssh/sshd_config`` file to create a change in the SSH configuration:

   .. code-block:: console

      # sed -i.`date -I` 's/^#PasswordAuthentication yes/PasswordAuthentication yes/' /etc/ssh/sshd_config

#. Click the upper-left menu icon (**☰**) and go to **Endpoint security > File Integrity Monitoring**.

   The finding details show that ``/etc/ssh/sshd_config`` changed, including the differences in the file checksum, the modification made, the modification time, and other information. The first change after the Wazuh agent restarts can show ``Unable to calculate diff due to no previous data stored for this file.`` in the ``file.diff`` field. Later changes show the modified lines.

   .. thumbnail:: /images/compliance/nist/fim-sshd-config-finding.png
      :title: FIM finding for the sshd_config file
      :alt: FIM finding for the sshd_config file
      :align: center
      :width: 80%

Detect change actors to UFW rules using who-data
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Wazuh helps meet SI-4 System monitoring by detecting system configuration changes and providing additional audit data on triggered events.

In this scenario, the Wazuh FIM monitors the Uncomplicated Firewall (UFW) rule files in the ``/etc/ufw/`` directory on an Ubuntu 24.04 endpoint. Using who-data, you can get more information like the user, program, or process that made changes to a monitored file or folder. Perform the steps below to monitor and detect changes to the UFW rule files:

#. Install the audit daemon:

   .. code-block:: console

      # apt-get install auditd
      # apt-get install audispd-plugins

#. Add the following configuration to the ``<syscheck>`` block of the Wazuh agent configuration file ``/var/ossec/etc/ossec.conf``.

   This monitors all UFW rule files for changes:

   .. code-block:: xml

      <directories report_changes="yes" whodata="yes">/etc/ufw/</directories>

   UFW stores its rule files in the ``/etc/ufw/`` directory, and all rule files have the extension ``.rules``. We use the configuration above to monitor the modification, addition, and deletion of any files in the ``/etc/ufw/`` directory.

#. Restart the Wazuh agent to apply the changes:

   .. code-block:: console

      # systemctl restart wazuh-agent

#. Modify the permissions for an existing rule file, ``user.rules``, in the ``/etc/ufw`` directory to create a change to the UFW rule files:

   .. code-block:: console

      # chmod 777 /etc/ufw/user.rules

#. Click the upper-left menu icon (**☰**) and go to **Endpoint security > File Integrity Monitoring**.

#. Check the FIM finding regarding the ``/etc/ufw/user.rules`` file which shows permissions for the ``/etc/ufw/user.rules`` file have changed.

#. Expand the finding. The ``user.name`` and ``process.name`` fields show the user and the process that changed the file, and the ``event.original`` field shows an overview of the event.

   .. thumbnail:: /images/compliance/nist/fim-ufw-user-rules-finding.png
      :title: FIM finding for the user.rules file
      :alt: FIM finding for the user.rules file
      :align: center
      :width: 80%

After you review the finding, restore the original permissions of the rule file with ``chmod 640 /etc/ufw/user.rules``. Otherwise, later ``ufw`` commands warn that ``/etc/ufw/user.rules`` is world writable.
