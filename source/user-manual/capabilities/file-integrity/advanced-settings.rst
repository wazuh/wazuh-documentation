.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Check out this section to learn about different advanced configuration options that can provide greater control and flexibility over how the FIM module works.

Advanced configuration options
================================

This section describes advanced configuration options that provide greater control and flexibility over how the FIM module works.

.. _who-data-monitoring:

Who-data monitoring
---------------------

The who-data functionality lets the FIM module identify who modified a monitored file, capturing the user and the program or process responsible.

Who-data monitoring on Linux
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Wazuh supports two modes for who-data monitoring on Linux endpoints:

-  :ref:`The audit mode <the_audit_mode>`
-  :ref:`The eBPF mode <the_ebpf_mode>`

.. _the_audit_mode:

The audit mode
~~~~~~~~~~~~~~~~

Who-data monitoring in audit mode uses the Linux Audit subsystem to identify who makes changes in a monitored directory. These changes produce audit events, which the FIM module processes and reports to the Wazuh manager. Audit mode extends the :ref:`real-time monitoring <real_time_monitoring>` by adding who-data information.

.. _who_data_audit_requirements:

Requirements
""""""""""""""

Install the audit daemon if you do not already have it on your endpoint.

-  In Red Hat-based systems:

   .. code-block:: console

      # yum install audit

   For audit version 3.1.1 and later, install the ``audispd-plugins`` package, which provides the ``audisp-af_unix`` plugin, and restart the audit service:

   .. code-block:: console

      # yum install audispd-plugins
      # service auditd restart

   If the ``service`` command isn't available, for example on Red Hat Enterprise Linux 9 without the ``initscripts-service`` package, restart the audit service with ``/usr/libexec/initscripts/legacy-actions/auditd/restart`` instead. The audit service refuses ``systemctl restart auditd``.

-  Debian-based systems:

   .. code-block:: console

      # apt-get install auditd

   For audit version 3.1.1 and later, the ``auditd`` package includes the ``audisp-af_unix`` plugin. Restart the audit service:

   .. code-block:: console

      # service auditd restart

In most systems, auditd includes a default rule that stops the processing of subsequent audit rules. This setting prevents the reporting of any who-data information. Follow these steps to verify that auditing is not disabled. For more information, visit the `manual <https://man7.org/linux/man-pages/man8/auditctl.8.html#DISABLED_BY_DEFAULT>`__ for auditctl.

#. Check the output of this command to find out if the auditd rules include the ``-a never,task`` rule:

   .. code-block:: console

      # auditctl -l | grep task

#. If the output displays the ``-a never,task`` rule, remove it from the ``/etc/audit/rules.d/audit.rules`` audit rules file.

#. Restart auditd and Wazuh agent to apply the changes:

   .. code-block:: console

      # service auditd restart
      # systemctl restart wazuh-agent

Configuration
""""""""""""""""

Perform the following steps to enable who-data monitoring using the audit mode. In this example, we configure who-data monitoring for the ``/etc`` directory.

#. Add the configuration below within the ``<ossec_config>`` block of the Wazuh agent ``/var/ossec/etc/ossec.conf`` configuration file:

   .. code-block:: xml

      <syscheck>
        <directories check_all="yes" whodata="yes">/etc</directories>
        <whodata>
          <provider>audit</provider>
        </whodata>
      </syscheck>

   .. note::

      If the ``<provider>`` tag is not configured, the FIM module will default to using the audit mode.

#. Restart the Wazuh agent to apply the changes. This action adds an audit rule for the monitored directory.

   .. code-block:: console

      # systemctl restart wazuh-agent

#. Execute the following command to check if the audit rule for monitoring the selected directory is applied:

   .. code-block:: console

      # auditctl -l | grep wazuh_fim

   The command output looks similar to this:

   .. code-block:: none
      :class: output

      -w /etc -p wa -k wazuh_fim

   From the output above, you can see the rule was added.

   .. note::

      When the Wazuh agent service stops, it removes the rule. You can use the same command to check that it removed the rule successfully.

FIM finding fields
"""""""""""""""""""""

The following table maps each audit field collected through whodata to its corresponding Wazuh Common Schema (WCS) field as it appears in the resulting FIM finding on the Wazuh dashboard.

+--------------------+---------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Audit field        | WCS field                 | Fields description                                                                                                                                                                                                               |
+====================+===========================+==================================================================================================================================================================================================================================+
| ``Login user``     | | ``user.name``           | Contains information about who started the process that modified the monitored file.                                                                                                                                             |
|                    | | ``user.id``             |                                                                                                                                                                                                                                  |
+--------------------+---------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``Effective user`` | | ``user.effective.id``   | Contains the effective ID and name of the user who started the process that modified the monitored file. When a user executes a command using sudo, the effective user ID changes to 0, and the effective username becomes root. |
|                    | | ``user.effective.name`` |                                                                                                                                                                                                                                  |
+--------------------+---------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``Group``          | | ``user.group.id``       | Contains the group ID and group name of the user who started the process that modified the monitored file.                                                                                                                       |
|                    | | ``user.group.name``     |                                                                                                                                                                                                                                  |
+--------------------+---------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``Process ID``     | ``process.pid``           | Contains the ID of the process used to modify the monitored file.                                                                                                                                                                |
+--------------------+---------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``Process name``   | ``process.name``          | Contains the name of the process used to modify the monitored file.                                                                                                                                                              |
+--------------------+---------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``Process ppid``   | ``process.parent.pid``    | Contains the parent process ID of the process used to modify the monitored file.                                                                                                                                                 |
+--------------------+---------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

Example: Monitor changes in the /etc/hosts.allow file on Linux
""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""

Perform the following steps to configure the FIM module to get the information about who makes changes to the ``/etc/hosts.allow`` file.

.. rubric:: Configuration

#. Append the configuration below to the ``/var/ossec/etc/ossec.conf`` file to monitor the ``/etc/hosts.allow`` file for changes:

   .. code-block:: xml

      <ossec_config>
        <syscheck>
          <directories check_all="yes" whodata="yes" report_changes="yes">/etc/hosts.allow</directories>
          <whodata>
            <provider>audit</provider>
          </whodata>
        </syscheck>
      </ossec_config>

#. Restart the Wazuh agent to apply the configuration changes:

   .. code-block:: console

      # systemctl restart wazuh-agent

.. rubric:: Test the configuration

#. Create the user ``smith`` on the Linux endpoint and give it sudo privileges. On Debian and Ubuntu, run:

   .. code-block:: console

      # adduser smith
      # usermod -aG sudo smith

   On Red Hat-based systems, run:

   .. code-block:: console

      # adduser smith
      # passwd smith
      # usermod -aG wheel smith

#. Log out of the Linux endpoint and log in as ``smith``.

#. Open the ``/etc/hosts.allow`` file with ``nano``, add a line such as ``ALL: 192.168.32.5``, then save the file and exit the editor.

   .. code-block:: console

      $ sudo nano /etc/hosts.allow

   If the finding shows ``Unable to calculate diff due to no previous data stored for this file.`` instead of the added line, repeat step 3 with another line, such as ``ALL: 192.168.32.6``. The default configuration already monitors ``/etc``, so the FIM module has no stored copy of ``/etc/hosts.allow`` for the first change after the restart. See :ref:`Report changes in file values <report_changes_in_file_values>`.

.. rubric:: Visualize the finding

Navigate to **Endpoint security** > **File Integrity Monitoring** > **Findings** on the Wazuh dashboard to view the finding generated when the monitored file is modified.

.. thumbnail:: /images/manual/fim/monitor-changes-finding.png
  :title: Monitor changes finding
  :alt: Monitor changes finding
  :align: center
  :width: 80%

Expand the finding to view more information. In the finding fields below, you can see that the user ``smith`` added a new IP address to the ``/etc/hosts.allow`` file using the nano text editor with root privileges.

.. thumbnail:: /images/manual/fim/monitor-changes-finding-expanded.png
  :title: Monitor changes finding expanded
  :alt: Monitor changes finding expanded
  :align: center
  :width: 80%

Finding in JSON format:

.. code-block:: json
   :emphasize-lines: 17, 29-38, 228

   {
     "_index": ".ds-wazuh-findings-v5-system-activity-000001",
     "_id": "35FHruMi-56AlmnZgfZ3pg",
     "_score": null,
     "_source": {
       "process": {
         "parent": {
           "name": "sudo",
           "pid": 21949,
           "working_directory": "/home/smith",
           "executable": "/usr/bin/sudo"
         },
         "real_user": {
           "name": "root",
           "id": "0"
         },
         "name": "nano",
         "pid": 21950,
         "real_group": {
           "name": "root",
           "id": "0"
         },
         "working_directory": "/home/smith",
         "executable": "/usr/bin/nano"
       },
       "@timestamp": "2026-11-13T01:17:21.655288080Z",
       "file": {
         "owner": "root",
         "extension": "allow",
         "gid": "0",
         "diff": "11a12\n> ALL: 192.168.32.6\n",
         "mtime": "2026-11-13T01:17:20.000Z",
         "directory": "/etc",
         "inode": "1367",
         "mode": [
           "rw-r--r--"
         ],
         "path": "/etc/hosts.allow",
         "uid": "0",
         "size": 447,
         "name": "hosts.allow",
         "device": "66305",
         "hash": {
           "sha1": "6098afaa729ef94135e0e9f9a3b292b1371e263a",
           "sha256": "970ad845ce7932feb68ebe2956ea05cb35db4a932b88525cdc948cbd84e896fa",
           "md5": "2db35c36c6646a969ff0aea18ec09bcb"
         },
         "group": "root"
       },
       "related": {
         "user": [
           "root",
           "smith"
         ],
         "hash": [
           "2db35c36c6646a969ff0aea18ec09bcb",
           "6098afaa729ef94135e0e9f9a3b292b1371e263a",
           "970ad845ce7932feb68ebe2956ea05cb35db4a932b88525cdc948cbd84e896fa"
         ]
       },
       "data_stream": {
         "type": "logs",
         "dataset": "wazuh.fim"
       },
       "wazuh": {
         "cluster": {
           "node": "node01",
           "name": "wazuh"
         },
         "protocol": {
           "location": "syscheck",
           "queue": 56
         },
         "agent": {
           "host": {
             "hostname": "Ubuntu24",
             "os": {
               "name": "Ubuntu",
               "type": "linux",
               "version": "24.04.5 LTS (Noble Numbat)",
               "platform": "ubuntu"
             },
             "architecture": "x86_64"
           },
           "name": "Ubuntu24",
           "groups": [
             "default"
           ],
           "id": "001",
           "version": "v5.0.0"
         },
         "integration": {
           "name": "wazuh-fim",
           "decoders": [
             "decoder/core-wazuh-message/0",
             "decoder/wazuh-fim/0"
           ],
           "category": "system-activity"
         },
         "rule": {
           "level": "medium",
           "compliance": {
             "iso_27001": [
               "A.8.15",
               "A.8.8",
               "A.6.8"
             ],
             "hipaa": [
               "164.308.a.1.ii.D",
               "164.308.a.6",
               "164.312.b",
               "164.312.c.2"
             ],
             "pci_dss": [
               "10.2.2",
               "11.5.2",
               "11.5"
             ],
             "tsc": [
               "A1.2",
               "CC7.2",
               "CC7.3"
             ],
             "nis2": [
               "21.2.a",
               "21.2.e",
               "23"
             ],
             "nist_800_171": [
               "3.3.1",
               "3.3.2",
               "3.4.1",
               "3.14.6",
               "3.14.7"
             ],
             "fedramp": [
               "AU-6",
               "CM-6",
               "SI-4"
             ],
             "nist_800_53": [
               "AU-6",
               "CM-6",
               "SI-4"
             ],
             "cmmc": [
               "AU.L2-3.3.1",
               "CM.L2-3.4.1",
               "SI.L2-3.14.1"
             ],
             "gdpr": [
               "II_5.1.f",
               "IV_32.1.a",
               "IV_33.1",
               "IV_34.1"
             ]
           },
           "mitre": {
             "technique": {
               "name": [
                 "Data Manipulation",
                 "Masquerading"
               ],
               "id": [
                 "T1565",
                 "T1036"
               ]
             },
             "tactic": {
               "name": [
                 "Stealth",
                 "Impact"
               ],
               "id": [
                 "TA0005",
                 "TA0040"
               ]
             }
           },
           "id": "c90baadd-1510-5657-bf72-000375cbcac8",
           "title": "Wazuh FIM - File modified - /etc/hosts.allow",
           "tags": [
             "medium",
             "wazuh-fim",
             "attack.stealth",
             "attack.impact",
             "attack.t1565.001",
             "attack.t1036"
           ],
           "status": "stable"
         },
         "event": {
           "id": "663ecda4-bacf-423e-9a42-fc16074411eb"
         },
         "space": {
           "name": "standard"
         }
       },
       "event": {
         "reason": "file.size: 429 -> 447; file.mtime: 2026-11-13T01:16:25.000Z -> 2026-11-13T01:17:20.000Z; file.hash.md5: 84054c1b6a576ec3ef7a7037d03aba02 -> 2db35c36c6646a969ff0aea18ec09bcb; file.hash.sha1: cdd97308fe979e962724e85f755039e2c683525f -> 6098afaa729ef94135e0e9f9a3b292b1371e263a; file.hash.sha256: 455f2af4122cb6d40c4001fc848e7ae83fa4145ac482b5b79de24807988c3780 -> 970ad845ce7932feb68ebe2956ea05cb35db4a932b88525cdc948cbd84e896fa",
         "original": "{\"collector\":\"file\",\"module\":\"fim\",\"data\":{\"event\":{\"created\":\"2026-11-13T01:17:20.492Z\",\"type\":\"modified\",\"changed_fields\":[\"file.size\",\"file.mtime\",\"file.hash.md5\",\"file.hash.sha1\",\"file.hash.sha256\"]},\"file\":{\"size\":447,\"permissions\":[\"rw-r--r--\"],\"uid\":\"0\",\"owner\":\"root\",\"gid\":\"0\",\"group\":\"root\",\"inode\":\"1367\",\"device\":\"66305\",\"mtime\":\"2026-11-13T01:17:20.000Z\",\"hash\":{\"md5\":\"2db35c36c6646a969ff0aea18ec09bcb\",\"sha1\":\"6098afaa729ef94135e0e9f9a3b292b1371e263a\",\"sha256\":\"970ad845ce7932feb68ebe2956ea05cb35db4a932b88525cdc948cbd84e896fa\"},\"path\":\"/etc/hosts.allow\",\"mode\":\"whodata\",\"previous\":{\"size\":429,\"mtime\":\"2026-11-13T01:16:25.000Z\",\"hash\":{\"md5\":\"84054c1b6a576ec3ef7a7037d03aba02\",\"sha1\":\"cdd97308fe979e962724e85f755039e2c683525f\",\"sha256\":\"455f2af4122cb6d40c4001fc848e7ae83fa4145ac482b5b79de24807988c3780\"}},\"content_changes\":\"11a12\\n> ALL: 192.168.32.6\\n\",\"audit\":{\"user_id\":\"0\",\"user_name\":\"root\",\"process_name\":\"/usr/bin/nano\",\"process_id\":21950,\"cwd\":\"/home/smith\",\"group_id\":\"0\",\"group_name\":\"root\",\"audit_uid\":\"1001\",\"audit_name\":\"smith\",\"effective_uid\":\"0\",\"effective_name\":\"root\",\"parent_name\":\"/usr/bin/sudo\",\"parent_cwd\":\"/home/smith\",\"ppid\":21949}}}}",
         "kind": "event",
         "created": "2026-11-13T01:17:20.492Z",
         "action": "modified",
         "index": ".ds-wazuh-events-v5-system-activity-000001",
         "category": [
           "file"
         ],
         "type": [
           "change"
         ],
         "dataset": "wazuh.fim",
         "doc_id": "-EJ70qEB348XT2D6PU_m",
         "outcome": "success",
         "changed_fields": [
           "file.size",
           "file.mtime",
           "file.hash.md5",
           "file.hash.sha1",
           "file.hash.sha256"
         ]
       },
       "user": {
         "effective": {
           "name": "root",
           "id": "0"
         },
         "name": "smith",
         "id": "1001",
         "group": {
           "name": "root",
           "id": "0"
         }
       }
     },
     "fields": {
       "@timestamp": [
         "2026-11-13T01:17:21.655Z"
       ]
     },
     "sort": [
       1794532641655
     ]
   }

.. _the_ebpf_mode:

The eBPF mode
~~~~~~~~~~~~~~~

Extended Berkeley Packet Filter (eBPF) lets developers build programs that run securely in the Linux kernel space. Who-data monitoring in eBPF mode extracts FIM events directly from eBPF programs, eliminating the need for external dependencies such as auditd, for faster event extraction.

The FIM events extracted from eBPF programs for who-data monitoring include:

-  ``vfs_open``: When a new file has been created on the endpoint.
-  ``security_inode_setattr``: When a file has been modified on the endpoint.
-  ``vfs_unlink``: When a file has been removed from the endpoint.

Wazuh uses a kernel data structure called ``ring_buffer`` to transfer these events from the kernel to the user space, where the FIM module analyzes them.

In eBPF mode, the ``process.name``, ``process.executable``, ``process.parent.name``, and ``process.parent.executable`` fields hold the task name that the Linux kernel keeps for each process, for example, ``bash``. The kernel limits this name to 15 characters and truncates longer program names. To match these fields in rules or searches, use the first 15 characters of the program name. In audit mode, these fields hold the full program name and path.

.. note::

   Who-data monitoring with eBPF requires a kernel that supports the BPF ring buffer and BTF. Upstream kernels support them from version 5.8, and some distributions backport them to older kernels, such as RHEL 8.10 (kernel 4.18). When the agent starts, the FIM module runs a health check of the eBPF provider and uses it only if the health check succeeds.

Configuration
""""""""""""""""

Configuring who-data in eBPF mode requires a ``provider`` option within the ``<whodata>`` tag. The ``<provider>`` tag accepts two values, ``audit`` and ``ebpf``. Use only one provider. If you configure both, the agent uses the last configured provider for every directory with ``whodata="yes"``.

.. note::

   -  If the ``<provider>`` tag is not configured, the FIM module uses the ``audit`` provider by default. To confirm which mode is in use, check the Wazuh agent log file ``/var/ossec/logs/ossec.log``.
   -  When the eBPF provider is configured and the eBPF health check succeeds, the agent logs this message ``(6048): Healthcheck for eBPF FIM whodata module success.``
   -  If the eBPF provider is configured but the health check fails, FIM falls back to the ``audit`` provider. The agent logs this message ``(6959): The eBPF healthcheck has failed. Switching all whodata eBPF configuration to audit.``
   -  If BPF LSM isn't active on the kernel, the eBPF provider captures events through kprobe hooks instead, and who-data monitoring keeps working. The Wazuh agent logs a message that starts with ``(6052): BPF LSM is not active``. No action is needed.

A configuration block of who-data in eBPF mode to monitor the ``/home/user/documents`` directory is shown below:

.. code-block:: xml

   <syscheck>
     <directories whodata="yes">/home/user/documents</directories>
     <whodata>
       <provider>ebpf</provider>
     </whodata>
   </syscheck>

Given the high speed at which eBPF detects events, it is important to fine-tune the ``queue_size`` of the ``whodata`` option. This adjustment gives it enough size to handle a big burst of events that may be generated by the kernel, such as during a massive deletion event. An increase in the value of the ``queue_size`` will prevent events from being lost when a large number of events are collected from monitored endpoints. Note that increasing the value of the ``queue_size`` increases the memory consumption of the Wazuh agent on the monitored endpoint.

The configuration below enables who-data in eBPF mode to handle up to 50000 events:

.. code-block:: xml

   <whodata>
     <provider>ebpf</provider>
     <queue_size>50000</queue_size>
   </whodata>

You can learn more about the available configuration options in the :ref:`whodata <reference_ossec_syscheck_whodata>` reference section.

Example: Monitoring changes in configuration files
""""""""""""""""""""""""""""""""""""""""""""""""""""

Monitoring configuration files such as the ``sshd_config`` file on Linux endpoints can help detect unauthorized changes. This approach ensures the integrity of configuration files is not compromised and provides early detection of suspicious behavior.

Perform the steps below to monitor changes made to the ``/etc/ssh/sshd_config`` configuration file on an Ubuntu endpoint using who-data in eBPF mode.

.. rubric:: Configuration

#. Append the configuration below to the ``/var/ossec/etc/ossec.conf`` configuration file on the Ubuntu endpoint:

   .. code-block:: xml

      <ossec_config>
        <syscheck>
          <directories whodata="yes">/etc/ssh/sshd_config</directories>
          <whodata>
            <provider>ebpf</provider>
            <queue_size>50000</queue_size>
          </whodata>
        </syscheck>
      </ossec_config>

#. Restart the Wazuh agent to apply the configuration changes:

   .. code-block:: console

      # systemctl restart wazuh-agent

.. rubric:: Test the configuration

Log in to the Ubuntu endpoint as a user with sudo privileges and switch to the ``root`` user. Then append a comment line to the ``/etc/ssh/sshd_config`` file. A comment line keeps the file valid for the SSH server:

.. code-block:: console

   $ sudo su -
   # echo "# eBPF test" >> /etc/ssh/sshd_config

.. rubric:: Visualize the finding

Navigate to **Endpoint security** > **File Integrity Monitoring** > **Findings** on the Wazuh dashboard to view the finding generated when the FIM module detects changes in the monitored file.

.. thumbnail:: /images/manual/fim/fim-detects-changes-2.png
  :title: FIM detects changes 2
  :alt: FIM detects changes 2
  :align: center
  :width: 80%

Expand the finding to view more information. In the finding fields below, you can see that the user ``ubuntu`` switched to ``root`` with ``su`` and added a line to the ``/etc/ssh/sshd_config`` file using ``bash``. The ``user.name`` field shows the user who logged in, and ``user.effective.name`` shows ``root``. When you finish the test, remove the line with ``sed -i '/^# eBPF test$/d' /etc/ssh/sshd_config``.

.. thumbnail:: /images/manual/fim/expand-the-finding.png
  :title: Expand the finding
  :alt: Expand the finding
  :align: center
  :width: 80%

Finding in JSON format.

.. code-block:: json

   {
     "_index": ".ds-wazuh-findings-v5-system-activity-000001",
     "_id": "dhVvV1egjkQ_NXN7oIutFA",
     "_score": null,
     "_source": {
       "process": {
         "parent": {
           "name": "su",
           "pid": 23251,
           "executable": "su"
         },
         "real_user": {
           "name": "root",
           "id": "0"
         },
         "name": "bash",
         "pid": 23252,
         "real_group": {
           "name": "root",
           "id": "0"
         },
         "working_directory": "/root",
         "executable": "bash"
       },
       "@timestamp": "2026-11-13T01:23:39.341837428Z",
       "file": {
         "owner": "root",
         "gid": "0",
         "mtime": "2026-11-13T01:23:32.000Z",
         "directory": "/etc/ssh",
         "inode": "1346",
         "mode": [
           "rw-r--r--"
         ],
         "path": "/etc/ssh/sshd_config",
         "uid": "0",
         "size": 3529,
         "name": "sshd_config",
         "device": "66305",
         "hash": {
           "sha1": "bfadbeff0680d1fb8e9e507e530bb64573f35ce6",
           "sha256": "398948695e840e5ac2f8db41b19a4b8f88173e2ffc4d0262961597dc946a5748",
           "md5": "edd7cf578d51500e0742fc4db8029f21"
         },
         "group": "root"
       },
       "related": {
         "user": [
           "root",
           "ubuntu"
         ],
         "hash": [
           "edd7cf578d51500e0742fc4db8029f21",
           "bfadbeff0680d1fb8e9e507e530bb64573f35ce6",
           "398948695e840e5ac2f8db41b19a4b8f88173e2ffc4d0262961597dc946a5748"
         ]
       },
       "data_stream": {
         "type": "logs",
         "dataset": "wazuh.fim"
       },
       "wazuh": {
         "cluster": {
           "node": "node01",
           "name": "wazuh"
         },
         "protocol": {
           "location": "syscheck",
           "queue": 56
         },
         "agent": {
           "host": {
             "hostname": "Ubuntu24",
             "os": {
               "name": "Ubuntu",
               "type": "linux",
               "version": "24.04.5 LTS (Noble Numbat)",
               "platform": "ubuntu"
             },
             "architecture": "x86_64"
           },
           "name": "Ubuntu24",
           "groups": [
             "default"
           ],
           "id": "001",
           "version": "v5.0.0"
         },
         "integration": {
           "name": "wazuh-fim",
           "decoders": [
             "decoder/core-wazuh-message/0",
             "decoder/wazuh-fim/0"
           ],
           "category": "system-activity"
         },
         "rule": {
           "level": "medium",
           "compliance": {
             "iso_27001": [
               "A.8.15",
               "A.8.8",
               "A.6.8"
             ],
             "hipaa": [
               "164.308.a.1.ii.D",
               "164.308.a.6",
               "164.312.b",
               "164.312.c.2"
             ],
             "pci_dss": [
               "10.2.2",
               "11.5.2",
               "11.5"
             ],
             "tsc": [
               "A1.2",
               "CC7.2",
               "CC7.3"
             ],
             "nis2": [
               "21.2.a",
               "21.2.e",
               "23"
             ],
             "nist_800_171": [
               "3.3.1",
               "3.3.2",
               "3.4.1",
               "3.14.6",
               "3.14.7"
             ],
             "fedramp": [
               "AU-6",
               "CM-6",
               "SI-4"
             ],
             "nist_800_53": [
               "AU-6",
               "CM-6",
               "SI-4"
             ],
             "cmmc": [
               "AU.L2-3.3.1",
               "CM.L2-3.4.1",
               "SI.L2-3.14.1"
             ],
             "gdpr": [
               "II_5.1.f",
               "IV_32.1.a",
               "IV_33.1",
               "IV_34.1"
             ]
           },
           "mitre": {
             "technique": {
               "name": [
                 "Data Manipulation",
                 "Masquerading"
               ],
               "id": [
                 "T1565",
                 "T1036"
               ]
             },
             "tactic": {
               "name": [
                 "Stealth",
                 "Impact"
               ],
               "id": [
                 "TA0005",
                 "TA0040"
               ]
             }
           },
           "id": "c90baadd-1510-5657-bf72-000375cbcac8",
           "title": "Wazuh FIM - File modified - /etc/ssh/sshd_config",
           "tags": [
             "medium",
             "wazuh-fim",
             "attack.stealth",
             "attack.impact",
             "attack.t1565.001",
             "attack.t1036"
           ],
           "status": "stable"
         },
         "event": {
           "id": "407cbd3b-0ee5-47ac-8bf7-483b9a4b4608"
         },
         "space": {
           "name": "standard"
         }
       },
       "event": {
         "reason": "file.size: 3517 -> 3529; file.mtime: 2026-10-08T17:19:18.000Z -> 2026-11-13T01:23:32.000Z; file.hash.md5: 0a12ef5cc3580c2e0533fba58dba866d -> edd7cf578d51500e0742fc4db8029f21; file.hash.sha1: f6bc31820b9b04c820b0f46a55f2d1eed0b65ba9 -> bfadbeff0680d1fb8e9e507e530bb64573f35ce6; file.hash.sha256: 64325541513d33ea1d2ccd19c77750d458e67e7967fd2e7ef81d92f0aa2ffe21 -> 398948695e840e5ac2f8db41b19a4b8f88173e2ffc4d0262961597dc946a5748",
         "original": "{\"collector\":\"file\",\"module\":\"fim\",\"data\":{\"event\":{\"created\":\"2026-11-13T01:23:32.501Z\",\"type\":\"modified\",\"changed_fields\":[\"file.size\",\"file.mtime\",\"file.hash.md5\",\"file.hash.sha1\",\"file.hash.sha256\"]},\"file\":{\"size\":3529,\"permissions\":[\"rw-r--r--\"],\"uid\":\"0\",\"owner\":\"root\",\"gid\":\"0\",\"group\":\"root\",\"inode\":\"1346\",\"device\":\"66305\",\"mtime\":\"2026-11-13T01:23:32.000Z\",\"hash\":{\"md5\":\"edd7cf578d51500e0742fc4db8029f21\",\"sha1\":\"bfadbeff0680d1fb8e9e507e530bb64573f35ce6\",\"sha256\":\"398948695e840e5ac2f8db41b19a4b8f88173e2ffc4d0262961597dc946a5748\"},\"path\":\"/etc/ssh/sshd_config\",\"mode\":\"whodata\",\"previous\":{\"size\":3517,\"mtime\":\"2026-10-08T17:19:18.000Z\",\"hash\":{\"md5\":\"0a12ef5cc3580c2e0533fba58dba866d\",\"sha1\":\"f6bc31820b9b04c820b0f46a55f2d1eed0b65ba9\",\"sha256\":\"64325541513d33ea1d2ccd19c77750d458e67e7967fd2e7ef81d92f0aa2ffe21\"}},\"audit\":{\"user_id\":\"0\",\"user_name\":\"root\",\"process_name\":\"bash\",\"process_id\":23252,\"cwd\":\"/root\",\"group_id\":\"0\",\"group_name\":\"root\",\"audit_uid\":\"1000\",\"audit_name\":\"ubuntu\",\"effective_uid\":\"0\",\"effective_name\":\"root\",\"parent_name\":\"su\",\"parent_cwd\":\"\",\"ppid\":23251}}}}",
         "kind": "event",
         "created": "2026-11-13T01:23:32.501Z",
         "action": "modified",
         "index": ".ds-wazuh-events-v5-system-activity-000001",
         "category": [
           "file"
         ],
         "type": [
           "change"
         ],
         "dataset": "wazuh.fim",
         "doc_id": "jEKB0qEB348XT2D6ClD4",
         "outcome": "success",
         "changed_fields": [
           "file.size",
           "file.mtime",
           "file.hash.md5",
           "file.hash.sha1",
           "file.hash.sha256"
         ]
       },
       "user": {
         "effective": {
           "name": "root",
           "id": "0"
         },
         "name": "ubuntu",
         "id": "1000",
         "group": {
           "name": "root",
           "id": "0"
         }
       }
     },
     "fields": {
       "@timestamp": [
         "2026-11-13T01:23:39.341Z"
       ]
     },
     "sort": [
       1794533019341
     ]
   }

Who-data monitoring on Windows
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

How it works
~~~~~~~~~~~~~~

The who-data monitoring functionality uses the Microsoft Windows auditing subsystem to identify who modifies a monitored directory. These changes produce audit events, which the FIM module processes and reports to the Wazuh manager. This feature works on every Windows version that the Wazuh agent supports.

Configuration
~~~~~~~~~~~~~~~

To enable the who-data feature, set the ``whodata`` attribute to ``yes`` in the ``<directories>`` option of the ``C:\Program Files (x86)\ossec-agent\ossec.conf`` configuration file. Wazuh automatically configures the Local Audit Policies and System Access Control List (SACL) for each monitored directory.

.. code-block:: xml

   ...
   <syscheck>
     ...
     <directories check_all="yes" whodata="yes">C:\test</directories>
     ...
   </syscheck>
   ...

The FIM module configures the required Local Audit Policies and SACLs at launch. However, other services might change this configuration and prevent who-data from receiving monitored events. To prevent this, FIM detects the change and switches the affected directories to real-time mode, using two available mechanisms:

#. Wazuh monitors the Windows Security event 4719, which Windows logs when an audit policy changes. When the event shows that success auditing was removed from the **Audit File System** or **Audit Handle Manipulation** policy, the FIM module switches the directories to real-time mode.
#. Periodically, Wazuh checks that the Audit Policies and the SACLs are configured as expected. You can modify the frequency of this verification with ``windows_audit_interval``.

If the system doesn't configure the audit policies automatically, configure them manually. See :ref:`Manual configuration of the Windows Audit Policies <manual_configuration_of_the_windows_audit_policies>`.

The following table establishes a correspondence between audit fields and their equivalent Wazuh Common Schema (WCS) fields in a finding when who-data is enabled:

+--------------+--------------------------+------------------------------------------------------------------------------------------------+
| Audit field  | WCS field                | Fields description                                                                             |
+==============+==========================+================================================================================================+
| User         | | ``user.name``          | Contains the name and ID of the user who started the process that modified the monitored       |
|              | | ``user.id``            | file. The ``related.user`` field lists this user and the file owner.                           |
+--------------+--------------------------+------------------------------------------------------------------------------------------------+
| Process id   | ``process.pid``          | Contains the ID of the process used to modify the monitored file.                              |
+--------------+--------------------------+------------------------------------------------------------------------------------------------+
| Process name | ``process.name``         | Contains the name of the process used to modify the monitored file.                            |
+--------------+--------------------------+------------------------------------------------------------------------------------------------+

Example: Monitor changes in a text file on Windows
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Perform the following steps to configure the FIM module to monitor changes to a text file and collect information about the user and process responsible for the changes.

#. Edit the Wazuh agent ``C:\Program Files (x86)\ossec-agent\ossec.conf`` configuration file and add the ``Documents`` directory for FIM monitoring inside the ``<ossec_config>`` block. Replace ``<USER_NAME>`` with the name of the user whose Documents folder you monitor. Monitoring ``C:\Users\*\Documents`` also matches system profiles that the Wazuh agent can't audit, which fills the Wazuh agent log with ``Access is denied`` warnings. With a single user's folder, the Wazuh agent still logs a few of these warnings when it starts, for the My Music, My Pictures, and My Videos links inside Documents. You can ignore them. The configuration enables who-data monitoring for changes to monitored files:

   .. code-block:: xml

      <syscheck>
        <directories check_all="yes" whodata="yes">C:\Users\<USER_NAME>\Documents</directories>
      </syscheck>

#. Restart the Wazuh agent using PowerShell to apply the changes:

   .. code-block:: powershell

      > Restart-Service -Name WazuhSvc

Test the configuration
~~~~~~~~~~~~~~~~~~~~~~~~

#. Sign in to the endpoint as ``<USER_NAME>``. In PowerShell, create the ``audit_docu.txt`` file in the ``Documents`` folder:

   .. code-block:: powershell

      > New-Item -Path "$env:USERPROFILE\Documents\audit_docu.txt" -ItemType File

#. Add the text *Hello* to the file:

   .. code-block:: powershell

      > Add-Content -Path "$env:USERPROFILE\Documents\audit_docu.txt" -Value "Hello"

Visualize the finding
~~~~~~~~~~~~~~~~~~~~~~~

Navigate to **Endpoint security** > **File Integrity Monitoring** > **Findings** on the Wazuh dashboard and find the finding generated when the FIM module detects changes in the monitored directory.

.. thumbnail:: /images/manual/fim/windows-whodata-finding.png
  :title: Windows whodata finding
  :alt: Windows whodata finding
  :align: center
  :width: 80%

Expand the finding to view all the information. In the finding fields below, you can see that the ``test`` user modified the ``audit_docu.txt`` file with PowerShell (powershell.exe).

.. thumbnail:: /images/manual/fim/windows-whodata-finding-expanded.png
  :title: Windows whodata finding expanded
  :alt: Windows whodata finding expanded
  :align: center
  :width: 80%

Finding in JSON:

.. code-block:: json
   :emphasize-lines: 6-8, 11, 27, 41-43

   {
     "_index": ".ds-wazuh-findings-v5-system-activity-000001",
     "_id": "ja0KszO7J9sHv6ZjDmBdHQ",
     "_score": null,
     "_source": {
       "process": {
         "real_user": {
           "name": "test",
           "id": "S-1-5-21-1349147258-1164413856-2138503564-1000"
         },
         "name": "powershell.exe",
         "pid": 4840,
         "executable": "C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\powershell.exe"
       },
       "@timestamp": "2026-11-12T23:44:06.889319160Z",
       "file": {
         "owner": "test",
         "extension": "txt",
         "mtime": "2026-11-12T23:44:04.000Z",
         "directory": "c:\\users\\test\\documents",
         "inode": "0",
         "mode": [
           "{\"S-1-5-18\":{\"name\":\"SYSTEM\",\"allowed\":[\"delete\",\"read_control\",\"write_dac\",\"write_owner\",\"synchronize\",\"read_data\",\"write_data\",\"append_data\",\"read_ea\",\"write_ea\",\"execute\",\"read_attributes\",\"write_attributes\"]}}",
           "{\"S-1-5-32-544\":{\"name\":\"Administrators\",\"allowed\":[\"delete\",\"read_control\",\"write_dac\",\"write_owner\",\"synchronize\",\"read_data\",\"write_data\",\"append_data\",\"read_ea\",\"write_ea\",\"execute\",\"read_attributes\",\"write_attributes\"]}}",
           "{\"S-1-5-21-1349147258-1164413856-2138503564-1000\":{\"name\":\"test\",\"allowed\":[\"delete\",\"read_control\",\"write_dac\",\"write_owner\",\"synchronize\",\"read_data\",\"write_data\",\"append_data\",\"read_ea\",\"write_ea\",\"execute\",\"read_attributes\",\"write_attributes\"]}}"
         ],
         "path": "c:\\users\\test\\documents\\audit_docu.txt",
         "uid": "S-1-5-21-1349147258-1164413856-2138503564-1000",
         "size": 7,
         "name": "audit_docu.txt",
         "attributes": [
           "ARCHIVE"
         ],
         "device": "2",
         "hash": {
           "sha1": "fedd18797811a4af659678ea5db618f8dc91480b",
           "sha256": "05ade08fcfb104f40b2536a14dfcd6e916d643f5cf8044b19028b607ae8f4908",
           "md5": "b73bf7d3ba1a517644661bc4bcd85f9a"
         }
       },
       "related": {
         "user": [
           "test"
         ],
         "hash": [
           "b73bf7d3ba1a517644661bc4bcd85f9a",
           "fedd18797811a4af659678ea5db618f8dc91480b",
           "05ade08fcfb104f40b2536a14dfcd6e916d643f5cf8044b19028b607ae8f4908"
         ]
       },
       "data_stream": {
         "type": "logs",
         "dataset": "wazuh.fim"
       },
       "wazuh": {
         "cluster": {
           "node": "node01",
           "name": "wazuh"
         },
         "protocol": {
           "location": "syscheck",
           "queue": 56
         },
         "agent": {
           "host": {
             "hostname": "WIN-SERVER-2022",
             "os": {
               "name": "Microsoft Windows Server 2022 Datacenter",
               "type": "windows",
               "version": "10.0.20348.5773",
               "platform": "windows"
             },
             "architecture": "x86_64"
           },
           "name": "WindowsServer2022",
           "groups": [
             "default"
           ],
           "id": "002",
           "version": "v5.0.0"
         },
         "integration": {
           "name": "wazuh-fim",
           "decoders": [
             "decoder/core-wazuh-message/0",
             "decoder/wazuh-fim/0"
           ],
           "category": "system-activity"
         },
         "rule": {
           "level": "medium",
           "compliance": {
             "iso_27001": [
               "A.8.15",
               "A.8.8",
               "A.6.8"
             ],
             "hipaa": [
               "164.308.a.1.ii.D",
               "164.308.a.6",
               "164.312.b",
               "164.312.c.2"
             ],
             "pci_dss": [
               "10.2.2",
               "11.5.2",
               "11.5"
             ],
             "tsc": [
               "A1.2",
               "CC7.2",
               "CC7.3"
             ],
             "nis2": [
               "21.2.a",
               "21.2.e",
               "23"
             ],
             "nist_800_171": [
               "3.3.1",
               "3.3.2",
               "3.4.1",
               "3.14.6",
               "3.14.7"
             ],
             "fedramp": [
               "AU-6",
               "CM-6",
               "SI-4"
             ],
             "nist_800_53": [
               "AU-6",
               "CM-6",
               "SI-4"
             ],
             "cmmc": [
               "AU.L2-3.3.1",
               "CM.L2-3.4.1",
               "SI.L2-3.14.1"
             ],
             "gdpr": [
               "II_5.1.f",
               "IV_32.1.a",
               "IV_33.1",
               "IV_34.1"
             ]
           },
           "mitre": {
             "technique": {
               "name": [
                 "Data Manipulation",
                 "Masquerading"
               ],
               "id": [
                 "T1565",
                 "T1036"
               ]
             },
             "tactic": {
               "name": [
                 "Stealth",
                 "Impact"
               ],
               "id": [
                 "TA0005",
                 "TA0040"
               ]
             }
           },
           "id": "c90baadd-1510-5657-bf72-000375cbcac8",
           "title": "Wazuh FIM - File modified - c:\\users\\test\\documents\\audit_docu.txt",
           "tags": [
             "medium",
             "wazuh-fim",
             "attack.stealth",
             "attack.impact",
             "attack.t1565.001",
             "attack.t1036"
           ],
           "status": "stable"
         },
         "event": {
           "id": "75433e63-b7d5-4b85-a91a-3afa75b12347"
         },
         "space": {
           "name": "standard"
         }
       },
       "event": {
         "reason": "file.size: 0 -> 7; file.mtime: 2026-11-12T23:43:01.000Z -> 2026-11-12T23:44:04.000Z; file.hash.md5: d41d8cd98f00b204e9800998ecf8427e -> b73bf7d3ba1a517644661bc4bcd85f9a; file.hash.sha1: da39a3ee5e6b4b0d3255bfef95601890afd80709 -> fedd18797811a4af659678ea5db618f8dc91480b; file.hash.sha256: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855 -> 05ade08fcfb104f40b2536a14dfcd6e916d643f5cf8044b19028b607ae8f4908",
         "original": "{\"collector\":\"file\",\"module\":\"fim\",\"data\":{\"event\":{\"created\":\"2026-11-12T23:44:05.487Z\",\"type\":\"modified\",\"changed_fields\":[\"file.size\",\"file.mtime\",\"file.hash.md5\",\"file.hash.sha1\",\"file.hash.sha256\"]},\"file\":{\"size\":7,\"permissions\":[\"{\\\"S-1-5-18\\\":{\\\"name\\\":\\\"SYSTEM\\\",\\\"allowed\\\":[\\\"delete\\\",\\\"read_control\\\",\\\"write_dac\\\",\\\"write_owner\\\",\\\"synchronize\\\",\\\"read_data\\\",\\\"write_data\\\",\\\"append_data\\\",\\\"read_ea\\\",\\\"write_ea\\\",\\\"execute\\\",\\\"read_attributes\\\",\\\"write_attributes\\\"]}}\",\"{\\\"S-1-5-32-544\\\":{\\\"name\\\":\\\"Administrators\\\",\\\"allowed\\\":[\\\"delete\\\",\\\"read_control\\\",\\\"write_dac\\\",\\\"write_owner\\\",\\\"synchronize\\\",\\\"read_data\\\",\\\"write_data\\\",\\\"append_data\\\",\\\"read_ea\\\",\\\"write_ea\\\",\\\"execute\\\",\\\"read_attributes\\\",\\\"write_attributes\\\"]}}\",\"{\\\"S-1-5-21-1349147258-1164413856-2138503564-1000\\\":{\\\"name\\\":\\\"test\\\",\\\"allowed\\\":[\\\"delete\\\",\\\"read_control\\\",\\\"write_dac\\\",\\\"write_owner\\\",\\\"synchronize\\\",\\\"read_data\\\",\\\"write_data\\\",\\\"append_data\\\",\\\"read_ea\\\",\\\"write_ea\\\",\\\"execute\\\",\\\"read_attributes\\\",\\\"write_attributes\\\"]}}\"],\"uid\":\"S-1-5-21-1349147258-1164413856-2138503564-1000\",\"owner\":\"test\",\"inode\":\"0\",\"device\":\"2\",\"mtime\":\"2026-11-12T23:44:04.000Z\",\"hash\":{\"md5\":\"b73bf7d3ba1a517644661bc4bcd85f9a\",\"sha1\":\"fedd18797811a4af659678ea5db618f8dc91480b\",\"sha256\":\"05ade08fcfb104f40b2536a14dfcd6e916d643f5cf8044b19028b607ae8f4908\"},\"attributes\":[\"ARCHIVE\"],\"path\":\"c:\\\\users\\\\test\\\\documents\\\\audit_docu.txt\",\"mode\":\"whodata\",\"previous\":{\"size\":0,\"mtime\":\"2026-11-12T23:43:01.000Z\",\"hash\":{\"md5\":\"d41d8cd98f00b204e9800998ecf8427e\",\"sha1\":\"da39a3ee5e6b4b0d3255bfef95601890afd80709\",\"sha256\":\"e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855\"}},\"audit\":{\"user_id\":\"S-1-5-21-1349147258-1164413856-2138503564-1000\",\"user_name\":\"test\",\"process_name\":\"C:\\\\Windows\\\\System32\\\\WindowsPowerShell\\\\v1.0\\\\powershell.exe\",\"process_id\":4840}}}}",
         "kind": "event",
         "created": "2026-11-12T23:44:05.487Z",
         "action": "modified",
         "index": ".ds-wazuh-events-v5-system-activity-000001",
         "category": [
           "file"
         ],
         "type": [
           "change"
         ],
         "dataset": "wazuh.fim",
         "doc_id": "E0Il0qEB348XT2D6w0V0",
         "outcome": "success",
         "changed_fields": [
           "file.size",
           "file.mtime",
           "file.hash.md5",
           "file.hash.sha1",
           "file.hash.sha256"
         ]
       }
     },
     "sort": [
       1794527046889319160
     ]
   }

.. _manual_configuration_of_the_windows_audit_policies:

Manual configuration of the Windows Audit Policies
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

When you monitor a file or directory with the ``whodata`` option, Wazuh automatically configures the Local Audit Policies and the System Access Control List (SACL) for the file or directory. If this doesn't happen, configure the audit policies and the SACL manually.

Local Audit Policies in Windows
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

To manually configure the audit policies needed to run FIM in who-data mode, activate the logging of successful events.

On the Run dialog box (**Win** + **R**), open the *Local Group Policy Editor* using the following command:

.. code-block:: none

   gpedit.msc

Configure the **Audit Events** field to **Success** for the following policies:

#. **Computer Configuration → Windows Settings → Security Settings → Advanced Audit Policy Configuration → Object Access → Audit File System**
#. **Computer Configuration → Windows Settings → Security Settings → Advanced Audit Policy Configuration → Object Access → Audit Handle Manipulation**

   .. thumbnail:: ../../../images/manual/fim/advanced-audit-policy-configuration-section.png
     :title: Advanced Audit Policy Configuration section
     :alt: Advanced Audit Policy Configuration section
     :align: center
     :width: 80%

If your system does not allow configuring subcategories through Advanced Audit Policy Configuration, configure the **Security Setting** field to **Success** for the following policy:

**Computer Configuration → Windows Settings → Security Settings → Local Policies → Audit Policy → Audit object access**

.. thumbnail:: ../../../images/manual/fim/audit-policy-section.png
  :title: Audit Policy section
  :alt: Audit Policy section
  :align: center
  :width: 80%

System Access Control List (SACL) in Windows
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

A system access control list (SACL) enables administrators to log attempts to access a secured object. You can check and modify SACLs of each monitored directory through **Properties**, selecting the **Security** tab, and clicking on **Advanced**:

.. thumbnail:: /images/manual/fim/click-on-advanced.png
  :title: click on Advanced
  :alt: click on Advanced
  :align: center
  :width: 80%

It is necessary to have a *Success* entry in the Auditing tab:

.. thumbnail:: /images/manual/fim/successful-entry-in-the-auditing-tab.png
  :title: Successful entry in the Auditing tab
  :alt: Successful entry in the Auditing tab
  :align: center
  :width: 80%

If there is no *Success* entry, click on **Add** to create it with these **advanced permissions**:

.. thumbnail:: /images/manual/fim/click-on-add.png
  :title: Click on Add
  :alt: Click on Add
  :align: center
  :width: 80%

Tuning audit to deal with a flood of who-data events
--------------------------------------------------------

The ``syscheck.rt_delay`` variable in the internal FIM configuration helps to prevent the loss of events by setting a delay before sending events to the Wazuh manager. You can configure this variable in the ``/var/ossec/etc/internal_options.conf`` file on the Wazuh agent. The allowed value for this variable is a numerical value. You must set the delay in milliseconds. Increase the delay to better handle event floods, or decrease it when you need faster processing of ``realtime`` or ``whodata`` events.

Windows installation directory monitoring
--------------------------------------------

In 64-bit architecture systems, you can specifically locate 32-bit and 64-bit DLLs.

-  ``System32`` is reserved for 64-bit DLLs.
-  ``SysWOW64`` is reserved for all 32-bit DLLs.

Furthermore, 32-bit processes running in 64-bit environments access ``System32`` through a virtual folder called ``Sysnative``.

The Wazuh agent disables this redirection, so it accesses ``System32`` directly. Monitoring ``%WINDIR%/System32`` and ``%WINDIR%/Sysnative`` directories is equivalent, and Wazuh shows the path ``%WINDIR%/System32`` in the findings. ``SysWOW64`` is a different directory. To monitor ``%WINDIR%/SysWOW64``, you must add it to the ``C:\Program Files (x86)\ossec-agent\ossec.conf`` configuration file.

You can monitor the Windows special directories ``%WINDIR%/System32`` and ``%WINDIR%/SysWOW64`` by configuring them with any of the FIM modes. For example:

-  **Scheduled scan**

   .. code-block:: xml

      <syscheck>
        <directories>%WINDIR%/System32</directories>
        <directories>%WINDIR%/SysWOW64</directories>
      </syscheck>

-  **Real-time**

   .. code-block:: xml

      <syscheck>
        <directories realtime="yes">%WINDIR%/System32</directories>
        <directories realtime="yes">%WINDIR%/SysWOW64</directories>
      </syscheck>

-  **Who-data**

   .. code-block:: xml

      <syscheck>
        <directories whodata="yes">%WINDIR%/System32</directories>
        <directories whodata="yes">%WINDIR%/SysWOW64</directories>
      </syscheck>

.. note::

   The FIM module on Windows does not support monitoring network locations. This includes:

   -  UNC paths (for example, ``\\server\share\folder``)
   -  Mapped drives (for example, ``Z:\folder``)

   If these types of paths are included in your ``<directories>`` configuration, they will be ignored, and no FIM events will be generated for them. This applies to all FIM modes: scheduled, real-time, and whodata.

.. _recursion_level_directories:

Recursion level
------------------

You can configure the maximum recursion level allowed for a specific directory by using the ``recursion_level`` option of the ``directories`` option. The ``recursion_level`` value must be an integer between 0 and 320.

.. note::

   This 320 limit applies specifically to ``<directories>`` (file and folder monitoring). The ``recursion_level`` option for ``<windows_registry>`` is different and supports a wider range. See :ref:`Recursion level <recursion_level_windows_registry>` in *Windows Registry monitoring*.

The following configuration example sets the ``recursion_level`` of the monitored directory to 3. Replace ``<FILEPATH_OF_MONITORED_DIRECTORY>`` with your own file paths.

#. Add the following settings inside the ``<ossec_config>`` block of the Wazuh agent configuration file:

   -  Linux: ``/var/ossec/etc/ossec.conf``
   -  Windows: ``C:\Program Files (x86)\ossec-agent\ossec.conf``
   -  macOS: ``/Library/Ossec/etc/ossec.conf``

   .. code-block:: xml

      <syscheck>
        <directories check_all="yes" recursion_level="3"><FILEPATH_OF_MONITORED_DIRECTORY></directories>
      </syscheck>

#. Restart the Wazuh agent to apply any configuration change:

   -  Linux: ``systemctl restart wazuh-agent``
   -  Windows: ``Restart-Service -Name WazuhSvc``
   -  macOS: ``/Library/Ossec/bin/wazuh-control restart``

If you have the following directory structure and the above setting with ``recursion_level="3"``, FIM then generates findings for ``file_3.txt`` and all files up to ``<FILEPATH_OF_MONITORED_DIRECTORY>/level_1/level_2/level_3/``, but not for any files in the directory deeper than ``level_3``.

.. code-block:: none

   <FILEPATH_OF_MONITORED_DIRECTORY>
   ├── file_0.txt
   └── level_1
       ├── file_1.txt
       └── level_2
           ├── file_2.txt
           └── level_3
               ├── file_3.txt
               └── level_4
                   ├── file_4.txt
                   └── level_5
                       └── file_5.txt

To disable the recursion and generate the findings only for the files in the monitored folder, you need to set the ``recursion_level`` value to ``0``.

If you don't set ``recursion_level``, the FIM module uses ``256``, the default value of ``syscheck.default_max_depth`` in the internal options configuration file. To change this default, set ``syscheck.default_max_depth`` to a value from 1 to 320 in the ``local_internal_options.conf`` file of the Wazuh agent: ``/var/ossec/etc/local_internal_options.conf`` on Linux, ``C:\Program Files (x86)\ossec-agent\local_internal_options.conf`` on Windows, and ``/Library/Ossec/etc/local_internal_options.conf`` on macOS.

Process priority
-------------------

To adjust the CPU usage of the FIM module on a monitored endpoint, use the ``process_priority`` option in the agent configuration. This works on Windows, Linux, and macOS.

The process priority scale for the Wazuh FIM module ranges from -20 to 19 for each Wazuh agent. The default ``process_priority`` value is set to 10. Increasing this value lowers the priority of the FIM process, reducing its access to CPU resources and potentially slowing its execution.

You need to edit the Wazuh agent ``/var/ossec/etc/ossec.conf`` configuration file to configure the process priority of the Wazuh FIM module.

In the configuration example below, the FIM module on the Wazuh agent is set to run with the minimum process priority:

#. Add the following settings inside the ``<ossec_config>`` block of the Wazuh agent configuration file:

   -  Linux: ``/var/ossec/etc/ossec.conf``
   -  Windows: ``C:\Program Files (x86)\ossec-agent\ossec.conf``
   -  macOS: ``/Library/Ossec/etc/ossec.conf``

   .. code-block:: xml

      <syscheck>
        <process_priority>19</process_priority>
      </syscheck>

#. Restart the Wazuh agent to apply any configuration change:

   -  Linux: ``systemctl restart wazuh-agent``
   -  Windows: ``Restart-Service -Name WazuhSvc``
   -  macOS: ``/Library/Ossec/bin/wazuh-control restart``

Setting the ``process_priority`` value lower than the default gives the FIM module higher priority, more CPU resources, and makes it run faster. In the configuration example below, the FIM module has the maximum process priority.

#. Add the following settings inside the ``<ossec_config>`` block of the Wazuh agent configuration file:

   -  Linux: ``/var/ossec/etc/ossec.conf``
   -  Windows: ``C:\Program Files (x86)\ossec-agent\ossec.conf``
   -  macOS: ``/Library/Ossec/etc/ossec.conf``

   .. code-block:: xml

      <syscheck>
        <process_priority>-20</process_priority>
      </syscheck>

#. Restart the Wazuh agent to apply any configuration change:

   -  Linux: ``systemctl restart wazuh-agent``
   -  Windows: ``Restart-Service -Name WazuhSvc``
   -  macOS: ``/Library/Ossec/bin/wazuh-control restart``

Database storage
-------------------

Wazuh uses a SQLite database to store information about FIM events, such as the creation, modification, and deletion of regular files. When the Wazuh agent starts, the FIM module performs a first scan and generates the agent's database. The Wazuh agent saves this database to disk at ``/var/ossec/queue/fim/db`` on Linux, ``C:\Program Files (x86)\ossec-agent\queue\fim\db`` on Windows, and ``/Library/Ossec/queue/fim/db`` on macOS.

The location is fixed. The ``database`` option of earlier versions is deprecated and has no effect. The Wazuh agent logs a warning when it finds it: ``The <database> option is deprecated and no longer has any effect.``

Synchronization
-------------------

The FIM module keeps the FIM state indices in the Wazuh indexer synchronized with the local database of the Wazuh agent, so the inventory of monitored files stays up to date. The agent periodically synchronizes with the manager, transmitting local FIM database changes and validating consistency through scheduled integrity checks. If a sync attempt fails due to a timeout or temporary connectivity issue, the agent automatically retries before marking it failed.

At startup, the Wazuh agent rebuilds its local FIM database, scans to establish the current state of monitored files, and synchronizes the resulting inventory with the manager. Directories monitored in ``realtime`` or ``whodata`` mode report changes as they occur, while directories monitored in scheduled mode are synchronized after the corresponding scan completes. If the Wazuh agent is offline, file changes are not reported immediately; once connectivity is restored, subsequent synchronization and integrity validation reconcile the local database of the Wazuh agent and the FIM state indices to keep them consistent.

You can see below the default ``synchronization`` setting on the ``/var/ossec/etc/ossec.conf`` configuration file:

.. code-block:: xml

   <syscheck>
     <synchronization>
       <enabled>yes</enabled>
       <interval>5m</interval>
       <integrity_interval>24h</integrity_interval>
     </synchronization>
   </syscheck>

The table below explains the supported attributes of the synchronization option:

+------------------------+-------------------+----------------------------------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Attribute              | Default value     | Allowed values                                                       | Description                                                                                                                                                                                                                                                                           |
+========================+===================+======================================================================+=======================================================================================================================================================================================================================================================================================+
| ``enabled``            | ``yes``           | yes, no                                                              | Enable or disable FIM synchronization.                                                                                                                                                                                                                                                |
+------------------------+-------------------+----------------------------------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``interval``           | ``5m``            | Any number greater than or equal to 1. Allowed suffixes (s, m, h, d) | Specifies how often the agent initiates a sync with the manager.                                                                                                                                                                                                                      |
+------------------------+-------------------+----------------------------------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``integrity_interval`` | ``24h``           | Any number greater than or equal to 1. Allowed suffixes (s, m, h, d) | Specifies how often the agent performs a full integrity validation by comparing checksums with the manager.                                                                                                                                                                           |
+------------------------+-------------------+----------------------------------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
