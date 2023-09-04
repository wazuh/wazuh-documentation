.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Check an example of an alert generated when a monitored file changes using the FIM capability in this section of the documentation.
    
File integrity monitoring
=========================

The File Integrity Monitoring (FIM) component generates an alert when it detects a change in the file system. This capability is often used to detect access or changes to sensitive data. If your servers are PCI DSS compliant, requirement 11.5 stipulates that a file integrity monitoring solution must be installed to pass the audit successfully.

Below is an example of an alert generated when a monitored file is changed. Metadata includes MD5, SHA1, and SHA256 checksums, file sizes (before and after the change), file permissions, file owner, content changes, and the user who made these changes (who-data).

.. code-block:: json
   :emphasize-lines: 14,22,27,37,48,54,60
   :class: output

   {
     "agent": {
         "id": "006",
         "ip": "10.0.1.214",
         "name": "RHEL7"
     },
     "decoder": {
         "name": "syscheck_integrity_changed"
     },
     "syscheck": {
         "audit": {
             "effective_user": {
                 "id": "0",
                 "name": "root"
             },
             "group": {
                 "id": "0",
                 "name": "root"
             },
             "login_user": {
                 "id": "1001",
                 "name": "wazuh"
             },
             "process": {
                 "cwd": "/home/wazuh",
                 "id": "13235",
                 "name": "/usr/bin/vim",
                 "parent_cwd": "/home/wazuh",
                 "parent_name": "/usr/bin/bash",
                 "ppid": "10942"
             },
             "user": {
                 "id": "0",
                 "name": "root"
             }
         },
         "diff": "0a1\n> 8.8.8.8     ads.fastclick.net\n",
         "event": "modified",
         "gid_after": "0",
         "gname_after": "root",
         "inode_after": 198194,
         "inode_before": 55652,
         "md5_after": "feb5cea0deb5925101b642bca97dc7b3",
         "md5_before": "54fb6627dbaa37721048e4549db3224d",
         "mode": "whodata",
         "mtime_after": "2020-07-12T18:07:57",
         "mtime_before": "2020-07-12T18:00:55",
         "path": "/etc/hosts",
         "perm_after": "rw-r--r--",
         "sha1_after": "2aa2079c3972b4bb8f28d69877a7c5e93dacbe6f",
         "sha1_before": "7335999eb54c15c67566186bdfc46f64e0d5a1aa",
         "sha256_after": "48f09f8c313b303ce2ca9365f70ae8d992c5589c56493ac055f0ab129d82c365",
         "sha256_before": "498f494232085ec83303a2bc6f04bea840c2b210fbbeda31a46a6e5674d4fc0e",
         "size_after": "188",
         "size_before": "158",
         "uid_after": "0",
         "uname_after": "root"
     },
     "rule": {
         "description": "Integrity checksum changed.",
         "id": "550",
         "level": 7,
         "mitre": {
             "id": [
                 "T1492"
             ],
             "tactic": [
                 "Impact"
             ],
             "technique": [
                 "Stored Data Manipulation"
             ]
         }
     },
     "timestamp": "2020-07-12T18:07:57.676+0000"
   }

In the Integrity Monitoring section of the Wazuh dashboard, users can see all of the details of the alerts triggered and find a comprehensive summary of detected changes.
    
.. thumbnail:: /images/getting-started/use-cases/integrity-monitoring.png
   :title: Integrity monitoring
   :alt: Integrity monitoring
   :align: center
   :width: 80% 

.. thumbnail:: /images/getting-started/use-cases/integrity-monitoring-events.png
   :title: Integrity monitoring events
   :alt: Integrity monitoring events
   :align: center
   :width: 80% 

.. thumbnail:: /images/getting-started/use-cases/integrity-monitoring-inventory.png
   :title: Integrity monitoring inventory
   :Alt: Integrity monitoring inventory
   :align: center
   :width: 80%

You can find more information on how Wazuh monitors file integrity in the :doc:`user manual </user-manual/capabilities/file-integrity/index>`.
