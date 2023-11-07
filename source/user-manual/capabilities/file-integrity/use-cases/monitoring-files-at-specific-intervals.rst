.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: The Wazuh FIM module monitors directories to detect file changes, additions, and deletions. Discover some FIM use cases in this section of our documentation. 
  
Monitoring files at specific intervals
======================================

Compliance with regulatory standards and laws, such as PCI DSS, requires monitoring access and detecting changes to:

- Critical files
- Configuration files
- Content files

This is important for protecting an organization's critical assets and data and detecting potential security breaches.

You can run scheduled scans with the FIM module to detect file modifications. In this example, the file is ``user_details.txt``,  and 
you schedule FIM to scan the file every 5 minutes.

Use case description
--------------------

  +---------------------+-----------------------------------------------------------------------------------------------+
  | Endpoint            | Description                                                                                   |
  +=====================+===============================================================================================+
  | macOS Monterey      | The FIM module monitors a file on this endpoint within specific intervals.                    |                                                                                                                               
  +---------------------+-----------------------------------------------------------------------------------------------+

Configuration
-------------

Perform the following steps to configure the FIM module to monitor a ``user_details.txt`` file every 5 minutes.

1. Create a text file ``user_details.txt`` and save it in the ``Documents`` directory.

2. Edit the Wazuh agent ``/var/ossec/etc/ossec.conf`` configuration file and add the ``user_details.txt`` file for monitoring:

   .. code-block:: xml
      
      <syscheck>
        <frequency>300</frequency>
        <directories>/Users/*/Documents/user_details.txt</directories>
      </syscheck>

3. Restart the Wazuh agent to apply the configuration:

   .. code-block:: console

      /Library/Ossec/bin/wazuh-control restart

Test the configuration
----------------------

1. Modify the ``user_details.txt`` file and wait for 5 minutes which is the time configured for the FIM scan.

Visualize the alert
-------------------

Navigate to **File Integrity Monitoring** on the Wazuh dashboard to view the alert generated when the FIM module detects changes to the ``user_details.txt`` file.

.. thumbnail:: /images/manual/fim/changes-user-details-file.png
  :title: Changes to the user_details.txt file
  :alt: Changes to the user_details.txt file
  :align: center
  :width: 80%
