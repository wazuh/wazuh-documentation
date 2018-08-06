.. Copyright (C) 2018 Wazuh, Inc.

.. _who-linux:

Auditing who-data in Linux
==========================

How it works
^^^^^^^^^^^^

The who-data monitoring functionality uses the Linux Audit subsystem to get the information about who made the changes in a monitored directory.
These changes produce audit events that are processed by *syscheck* and reported to the manager.

Configuration
^^^^^^^^^^^^^

Firstly we need to check if the Audit daemon is installed in our system.

In RedHat based system, Auditd is commonly installed by default. If it's not installed, we need to install it using the following command:
::

    yum install auditd

For Debian based systems, use the following:
::

    apt install auditd

Next step is to configure syscheck to enable who-data monitoring in the selected folder in our ``ossec.conf`` file:

.. code-block:: xml

    <syscheck>
      <directories check_all="yes" whodata="yes">/etc</directories>
    </syscheck>

Once this configuration is added, we need to restart Wazuh to apply the changes.

We can check if the Audit rule for monitoring the selected folder is applied. To check that, we need to execute the following command
::

    auditctl -l | grep wazuh_fim

and check if the rule was added
::

    -w /etc -p wa -k wazuh_fim

When the agent is stopped, we can use the same command to check that the added rule was successfully removed.

Alert fields
^^^^^^^^^^^^

The following fields are received in FIM alerts when who-data is enabled:

+------------------------------+--------------------------------------------------------------------------------------------------------------------+
| **(Audit) User**             | Contains the user ID and name of the user who started the process that modified the monitored file.                |
+------------------------------+                                                                                                                    +
| **audit.user.id**            |                                                                                                                    |
|                              |                                                                                                                    |
| **audit.user.name**          |                                                                                                                    |
+------------------------------+--------------------------------------------------------------------------------------------------------------------+
| **(Audit) Login user**       | Contains the Audit user ID and name, that are the login uid and login name.                                        |
+------------------------------+ This ID is assigned to a user upon login and is inherited by every process even when the user's identity changes.  +
| **audit.login_user.id**      |                                                                                                                    |
|                              |                                                                                                                    |
| **audit.login_user.name**    |                                                                                                                    |
+------------------------------+--------------------------------------------------------------------------------------------------------------------+
| **(Audit) Effective user**   | Contains the effective user ID and name of the user who started the process that modified the monitored file.      |
+------------------------------+                                                                                                                    +
| **audit.effective_user.id**  |                                                                                                                    |
|                              |                                                                                                                    |
| **audit.effective_user.name**|                                                                                                                    |
+------------------------------+--------------------------------------------------------------------------------------------------------------------+
| **(Audit) Group**            | Contains the group ID and group name of the user who started the process that modified the monitored file.         |
+------------------------------+                                                                                                                    +
| **audit.group.id**           |                                                                                                                    |
|                              |                                                                                                                    |
| **audit.group.name**         |                                                                                                                    |
+------------------------------+--------------------------------------------------------------------------------------------------------------------+
| **(Audit) Process id**       | Contains the ID and name of the process used to modify the monitored file.                                         |
|                              |                                                                                                                    |
| **(Audit) Process name**     |                                                                                                                    |
+------------------------------+                                                                                                                    +
| **audit.proccess.id**        |                                                                                                                    |
|                              |                                                                                                                    |
| **audit.proccess.name**      |                                                                                                                    |
+------------------------------+--------------------------------------------------------------------------------------------------------------------+
| **audit.proccess.ppid**      | Contains the parent process ID of the process used to modify the monitored file.                                   |
+------------------------------+--------------------------------------------------------------------------------------------------------------------+

Alert examples
^^^^^^^^^^^^^^

In the following example we can see how the user *Smith* added a new IP to the file ``/etc/hosts.allow`` using the *nano* editor with **sudo** privileges:


Alert in log format:

::

    ** Alert 1531224328.2834462: - ossec,syscheck,pci_dss_11.5,gpg13_4.11,gdpr_II_5.1.f,
    2018 Jul 10 14:05:28 (vpc-agent-debian) any->syscheck
    Rule: 550 (level 7) -> 'Integrity checksum changed.'
    Integrity checksum changed for: '/etc/hosts.allow'
    Size changed from '421' to '433'
    Old md5sum was: '4b8ee210c257bc59f2b1d4fa0cbbc3da'
    New md5sum is : 'acb2289fba96e77cee0a2c3889b49643'
    Old sha1sum was: 'd3452e66d5cfd3bcb5fc79fbcf583e8dec736cfd'
    New sha1sum is : 'b87a0e558ca67073573861b26e3265fa0ab35d20'
    Old sha256sum was: '6504e867b41a6d1b87e225cfafaef3779a3ee9558b2aeae6baa610ec884e2a81'
    New sha256sum is : 'bfa1c0ec3ebfaac71378cb62101135577521eb200c64d6ee8650efe75160978c'
    (Audit) User: 'root (0)'
    (Audit) Login user: 'smith (1000)'
    (Audit) Effective user: 'root (0)'
    (Audit) Group: 'root (0)'
    (Audit) Process id: '82845'
    (Audit) Process name: '/bin/nano'
    What changed:
    10a11,12
    > 10.0.12.34
    Attributes:
     - Size: 433
     - Permissions: 100644
     - Date: Tue Jul 10 14:05:28 2018
     - Inode: 268234
     - User: root (0)
     - Group: root (0)
     - MD5: acb2289fba96e77cee0a2c3889b49643
     - SHA1: b87a0e558ca67073573861b26e3265fa0ab35d20
     - SHA256: bfa1c0ec3ebfaac71378cb62101135577521eb200c64d6ee8650efe75160978c


Alert in JSON format:

.. code-block:: json

  {
    "timestamp":"2018-07-10T14:05:28.452-0800",
    "rule":{
        "level":7,
        "description":"Integrity checksum changed.",
        "id":"550",
        "firedtimes":10,
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
        "id":"058",
        "ip": "10.0.0.121",
        "name":"vpc-agent-debian"
    },
    "manager":{
        "name":"vpc-wazuh-manager"
    },
    "id":"1531224328.283446",
    "syscheck":{
        "path":"/etc/hosts.allow",
        "size_before":"421",
        "size_after":"433",
        "perm_after":"100644",
        "uid_after":"0",
        "gid_after":"0",
        "md5_before":"4b8ee210c257bc59f2b1d4fa0cbbc3da",
        "md5_after":"acb2289fba96e77cee0a2c3889b49643",
        "sha1_before":"d3452e66d5cfd3bcb5fc79fbcf583e8dec736cfd",
        "sha1_after":"b87a0e558ca67073573861b26e3265fa0ab35d20",
        "sha256_before":"6504e867b41a6d1b87e225cfafaef3779a3ee9558b2aeae6baa610ec884e2a81",
        "sha256_after":"bfa1c0ec3ebfaac71378cb62101135577521eb200c64d6ee8650efe75160978c",
        "uname_after":"root",
        "gname_after":"root",
        "mtime_before":"2018-07-10T14:04:25",
        "mtime_after":"2018-07-10T14:05:28",
        "inode_after":268234,
        "diff":"10a11,12\n> 10.0.12.34\n",
        "event":"modified",
        "audit":{
            "user":{
                "id":"0",
                "name":"root"
            },
            "group":{
                "id":"0",
                "name":"root"
            },
            "proccess":{
                "id":"82845",
                "name":"/bin/nano",
                "ppid":"3195"
            },
            "login_user":{
                "id":"1000",
                "name":"smith"
            },
            "effective_user":{
                "id":"0",
                "name":"root"
            }
        }
    },
    "decoder":{
        "name":"syscheck_integrity_changed"
    },
    "location":"syscheck"
  }
