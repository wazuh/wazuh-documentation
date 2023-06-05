.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: The FIM module runs periodic scans on specific paths and monitors specific directories for changes in real time. Learn more about how FIM works in this section. 
  
How it works
============

The FIM module runs periodic scans on specific paths and monitors specific directories for changes in real time. You can set which paths to monitor in the configuration of the Wazuh agents and manager.

FIM stores the files checksums and other attributes in a local FIM database. Upon a scan, the Wazuh agent reports any changes the FIM module finds in the monitored paths to the Wazuh server. The FIM module looks for file modifications by comparing the checksums of a file to its stored checksums and attribute values. It generates an alert if it finds discrepancies.

The Wazuh FIM module uses two databases to collect FIM event data, such as file creation, modification, and deletion data. One is a local SQLite-based database on the monitored endpoint that stores the data in: 

- ``C:\Program Files (x86)\ossec-agent\queue\fim\db`` on Windows.
- ``/var/ossec/queue/fim/db`` on Linux.
- ``/Library/Ossec/queue/fim/db`` on macOS. 

The other is an agent database on the Wazuh server. The :doc:`wazuh-db </user-manual/reference/daemons/wazuh-db>`. daemon creates and manages a database for each agent on the Wazuh server. It uses the ID of the agent to identify the database. This service stores the databases at ``/var/ossec/queue/db``.

.. thumbnail:: ../../../images/manual/fim/fim-flow.png
  :title: File integrity monitoring
  :alt: File integrity monitoring
  :align: center
  :width: 80%

The FIM module keeps the Wazuh agent and the Wazuh server databases synchronized with each other. It always updates the file inventory in the Wazuh server with the data available to  the Wazuh agent. An up-to-date Wazuh server database allows for servicing FIM-related API queries. The synchronization mechanism only updates the Wazuh server with information from the Wazuh agents such as checksums and file attributes that have changed. 

The Wazuh agent and manager have the FIM module enabled and :ref:`pre-configured <reference_ossec_syscheck_default_configuration>` by default. However, we recommend that you review the configuration of your endpoints to ensure that you tailor the FIM settings, such as monitored paths, to your environment.

