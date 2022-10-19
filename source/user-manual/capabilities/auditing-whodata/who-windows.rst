.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
    :description: Learn more about how to audit who-data in Windows with Wazuh. In this section, we explain how it works, it configuration and some alert examples.

.. _who-windows:

Auditing who-data in Windows
============================

How it works
^^^^^^^^^^^^

The who-data monitoring functionality uses the Microsoft Windows auditing subsystem to get the related information about who made modifications in a monitored directory. These changes produce audit events that are processed by *syscheck* and reported to the manager. This feature is only compatible with systems greater than Windows Vista.

For the correct operation of this auditing subsystem, it is necessary to have configured some Local Audit Policies and the SACLs of each configured directory from which to receive these events. Wazuh automatically performs this task when the tag ``whodata="yes"`` is declared within the ``directories`` statement in the ``ossec.conf`` file:

.. code-block:: xml

    <syscheck>
      <directories check_all="yes" whodata="yes">C:\Windows\System32\drivers\etc</directories>
    </syscheck>

However, other processes could modify some of these configurations, preventing syscheck from receiving the necessary information. In this case the directories configured in whodata mode will be reconfigured to realtime mode, so that syscheck will continue to generate alerts. Wazuh detects these changes in two different ways:

#. Windows generates specific events (ID 4719) when one of the Audit Policies is modified (Success removed).
#. Periodically, Wazuh checks that the Audit Policies and the SACLs are configured as expected. It is possible to modify this interval, see :ref:`the configuration section of windows_audit_interval<reference_ossec_syscheck_windows_audit_interval>`.

To manually configure Local Audit Policies and SACLs, see :ref:`the guide to configure Local Audit Policies and SACLs<who-windows-policies>`.

Alert fields
^^^^^^^^^^^^

The following fields are received in alerts when who-data is enabled:

+------------------------------+--------------------------------------------------------------------------------------------------------------------+
| **(Audit) User**             | Contains the ID and name of the user who started the process that modified the monitored file.                     |
+------------------------------+                                                                                                                    +
| **audit.user.id**            |                                                                                                                    |
|                              |                                                                                                                    |
| **audit.user.name**          |                                                                                                                    |
+------------------------------+--------------------------------------------------------------------------------------------------------------------+
| **(Audit) Process id**       | Contains the ID and name of the process used to modify the monitored file.                                         |
|                              |                                                                                                                    |
| **(Audit) Process name**     |                                                                                                                    |
+------------------------------+                                                                                                                    +
| **audit.process.id**         |                                                                                                                    |
|                              |                                                                                                                    |
| **audit.process.name**       |                                                                                                                    |
+------------------------------+--------------------------------------------------------------------------------------------------------------------+


Alert examples
^^^^^^^^^^^^^^

Alert in log format:

.. code-block:: none
    :class: output

    ** Alert 1531323832.10357533: - ossec,syscheck,pci_dss_11.5,gpg13_4.11,gdpr_II_5.1.f,
    2018 Jul 11 17:43:52 (vpc-agent-win) any->syscheck
    Rule: 550 (level 7) -> 'Integrity checksum changed.'
    Integrity checksum changed for: 'C:\Windows\System32\drivers\etc\hosts'
    Size changed from '825' to '857'
    Old md5sum was: '76eae1f63f77154db8c9dd884a47e994'
    New md5sum is : 'e71b0c5cf0e3a8d1848312f1394e448f'
    Old sha1sum was: '9c2abeed447447d072aec2128f296e6d3f1ad21a'
    New sha1sum is : '0f89ca73534037c5cf23193d032c93cbf0fc4af4'
    Old sha256sum was: 'f8d35672114862f660424d8436d621261279703a65bc8ac3146016d5b023520b'
    New sha256sum is : 'b9cc339e89fc5d8890cfb8a47249b3b515f5982d8a7348e2e5eb104aec232c9f'
    (Audit) User: 'Administrator (S-1-5-21-3292556202-24657078-706277677-500)'
    (Audit) Process id: '1736'
    (Audit) Process name: 'C:\Windows\System32\notepad.exe'
    What changed:
    ***** QUEUE\DIFF\LOCAL\WINDOWS\SYSTEM32\DRIVERS\ETC\HOSTS\state.1531323769
    ***** QUEUE\DIFF\LOCAL\WINDOWS\SYSTEM32\DRIVERS\ETC\HOSTS\LAST-ENTRY
            10.0.0.211      dns_server
    *****
    Attributes:
     - Size: 857
     - Date: Wed Jul 11 17:43:39 2018
     - User: SYSTEM (S-1-5-18)
     - MD5: e71b0c5cf0e3a8d1848312f1394e448f
     - SHA1: 0f89ca73534037c5cf23193d032c93cbf0fc4af4
     - SHA256: b9cc339e89fc5d8890cfb8a47249b3b515f5982d8a7348e2e5eb104aec232c9f
     - File attributes: ARCHIVE, COMPRESSED, HIDDEN, NOT_CONTENT_INDEXED
     - Permissions:
       standar_user  (DENIED) - FILE_READ_DATA, FILE_WRITE_DATA, FILE_APPEND_DATA, FILE_READ_EA
       SYSTEM  (ALLOWED) - FILE_READ_DATA, FILE_WRITE_DATA, FILE_APPEND_DATA, FILE_READ_EA, FILE_WRITE_EA, FILE_EXECUTE, FILE_READ_ATTRIBUTES, FILE_WRITE_ATTRIBUTES, FILE_DELETE, DELETE, READ_CONTROL, WRITE_DAC, WRITE_OWNER, SYNCHRONIZE


Alert in JSON format:

.. code-block:: json
    :class: output

    {
        "timestamp":"2018-07-11T17:43:52.914+0200",
        "rule":{
            "level":7,
            "description":"Integrity checksum changed.",
            "id":"550",
            "firedtimes":24,
            "mail":false,
            "groups":[
                "ossec",
                "syscheck"
            ],
            "pci_dss":[
                "11.5"
            ],
            "gpg13":[
                "4.11"
            ],
            "gdpr":[
                "II_5.1.f"
            ]
        },
        "agent":{
            "id":"005",
            "name":"vpc-agent-win"
        },
        "manager":{
            "name":"vpc-wazuh-manager"
        },
        "id":"1531323832.103575",
        "syscheck":{
            "path":"C:\\Windows\\System32\\drivers\\etc\\hosts",
            "size_before":"825",
            "size_after":"857",
            "win_perm_after":[
                {
                    "name":"standar_user",
                    "denied":[
                        "FILE_READ_DATA",
                        "FILE_WRITE_DATA",
                        "FILE_APPEND_DATA",
                        "FILE_READ_EA"
                    ]
                },
                {
                    "name":"SYSTEM",
                    "allowed":[
                        "FILE_READ_DATA",
                        "FILE_WRITE_DATA",
                        "FILE_APPEND_DATA",
                        "FILE_READ_EA",
                        "FILE_WRITE_EA",
                        "FILE_EXECUTE",
                        "FILE_READ_ATTRIBUTES",
                        "FILE_WRITE_ATTRIBUTES",
                        "FILE_DELETE",
                        "DELETE",
                        "READ_CONTROL",
                        "WRITE_DAC",
                        "WRITE_OWNER",
                        "SYNCHRONIZE"
                    ]
                }
            ],
            "uid_after":"S-1-5-18",
            "md5_before":"76eae1f63f77154db8c9dd884a47e994",
            "md5_after":"e71b0c5cf0e3a8d1848312f1394e448f",
            "sha1_before":"9c2abeed447447d072aec2128f296e6d3f1ad21a",
            "sha1_after":"0f89ca73534037c5cf23193d032c93cbf0fc4af4",
            "sha256_before":"f8d35672114862f660424d8436d621261279703a65bc8ac3146016d5b023520b",
            "sha256_after":"b9cc339e89fc5d8890cfb8a47249b3b515f5982d8a7348e2e5eb104aec232c9f",
            "attrs_after":[
                "ARCHIVE",
                "COMPRESSED",
                "HIDDEN",
                "NOT_CONTENT_INDEXED"
            ],
            "uname_after":"SYSTEM",
            "mtime_before":"2018-07-11T17:42:29",
            "mtime_after":"2018-07-11T17:43:39",
            "diff":"What changed:\n***** QUEUE\\DIFF\\LOCAL\\WINDOWS\\SYSTEM32\\DRIVERS\\ETC\\HOSTS\\state.1531323769\r\n***** QUEUE\\DIFF\\LOCAL\\WINDOWS\\SYSTEM32\\DRIVERS\\ETC\\HOSTS\\LAST-ENTRY\r\n        10.0.0.211      dns_server   \r\n*****\r\n\r\n",
            "event":"modified",
            "audit":{
                "user":{
                    "id":"S-1-5-21-3292556202-24657078-706277677-500",
                    "name":"Administrator"
                },
                "process":{
                    "id":"1736",
                    "name":"C:\\Windows\\System32\\notepad.exe"
                }
            }
        },
        "decoder":{
            "name":"syscheck_integrity_changed"
        },
        "location":"syscheck"
    }
