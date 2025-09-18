.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: You can query and visualize centralized system inventory data from all monitored endpoints in the **IT Hygiene** section on the Wazuh dashboard. Learn more about it in this section of the Wazuh documentation.

Viewing system inventory data
=============================

You can query and visualize centralized system inventory data from all monitored endpoints in the **IT Hygiene** section on the Wazuh dashboard. This provides a unified view of your environment's status across all monitored endpoints.

The IT Hygiene section organizes data into multiple categories:

-  **Dashboard**: View an overview of key metrics and a summary of your environment.
-  **System**: Analyze operating system and hardware information.
-  **Software**: Review installed packages and software vendors.
-  **Processes**: Monitor running processes.
-  **Network**: Inspect network configurations, interfaces, and traffic.

To access the IT hygiene section, navigate to **Security operations** > **IT Hygiene** on the Wazuh dashboard.

Dashboard
---------

Shows a consolidated view of the system inventory data across multiple or selected monitored endpoints. It visualizes key metrics such as operating system families, package types, installed packages, running packages, operating systems, host CPUs, source ports, and process start times.

.. thumbnail:: /images/manual/system-inventory/system-inventory-dashboard.png
   :title: System inventory dashboard
   :alt: System inventory dashboard
   :align: center
   :width: 80%

System
------

Provides a detailed breakdown of the operating systems and hardware in your environment.

-  The **OS** tab provides an operating system and hardware information breakdown across all monitored endpoints.

   .. thumbnail:: /images/manual/system-inventory/system-inventory-system-os-tab.png
      :title: System inventory - System OS tab
      :alt: System inventory - System OS tab
      :align: center
      :width: 80%

-  The **Hardware** tab displays top CPU models, CPU cores, the most used memory, and a summary data table.

   .. thumbnail:: /images/manual/system-inventory/system-inventory-system-hardware-tab.png
      :title: System inventory - System Hardware tab
      :alt: System inventory - System Hardware tab
      :align: center
      :width: 80%

Software
--------

Contains an overview of software packages and Windows KBs on monitored endpoints.

-  The **Packages** tab displays package data, including top software vendors, the number of installed packages, the types of packages, and a summary data table.

   .. thumbnail:: /images/manual/system-inventory/system-inventory-software-packages-tab.png
      :title: System inventory - Software Packages tab
      :alt: System inventory - Software Packages tab
      :align: center
      :width: 80%

-  The **Windows KBs** tab displays the Windows Knowledge Base data, including the most and least common Knowledge Bases.

   .. thumbnail:: /images/manual/system-inventory/system-inventory-software-windows-kbs-tab.png
      :title: System inventory - Software Windows KBs tab
      :alt: System inventory - Software Windows KBs tab
      :align: center
      :width: 80%

Processess
----------

Displays running processes, process start times, and a summary data table containing process details for the monitored endpoints.

.. thumbnail:: /images/manual/system-inventory/system-inventory-processes.png
   :title: System inventory - Processes
   :alt: System inventory - Processes
   :align: center
   :width: 80%

Network
-------

Contains the **Addresses**, **Interfaces**, **Protocols**, **Services**, and **Traffic** tabs.

-  The **Addresses** tab provides a detailed view of network types, unique network IP addresses, interface names, and a summary data table containing detailed network address information.

   .. thumbnail:: /images/manual/system-inventory/system-inventory-network-addresses-tab.png
      :title: System inventory - Network Addresses tab
      :alt: System inventory - Network Addresses tab
      :align: center
      :width: 80%

-  The **Interfaces** tab offers a detailed view of network interfaces, displaying average packet loss, interface states, interface types, and a summary data table of interface-level details.

   .. thumbnail:: /images/manual/system-inventory/system-inventory-network-interfaces-tab.png
      :title: System inventory - Network Interfaces tab
      :alt: System inventory - Network Interfaces tab
      :align: center
      :width: 80%

-  The **Protocols** tab offers a detailed view of network types, network metrics, and DHCP status, and a summary table with more protocol-level details.

   .. thumbnail:: /images/manual/system-inventory/system-inventory-network-protocols-tab.png
      :title: System inventory - Network Protocols tab
      :alt: System inventory - Network Protocols tab
      :align: center
      :width: 80%

-  The **Services** tab presents a detailed view of source ports, transport protocols, processes, and a summary data table for each endpoint.

   .. thumbnail:: /images/manual/system-inventory/system-inventory-network-services-tab.png
      :title: System inventory - Network Services tab
      :alt: System inventory - Network Services tab
      :align: center
      :width: 80%

-  The **Traffic** tab provides a detailed view of active listening ports, including source ports, destination ports, transport protocols, processes, and a summary data table for each endpoint.

   .. thumbnail:: /images/manual/system-inventory/system-inventory-network-traffic-tab.png
      :title: System inventory - Network Traffic tab
      :alt: System inventory - Network Traffic tab
      :align: center
      :width: 80%

Query the agent inventory database
----------------------------------

The Syscollector module runs periodic scans and sends the updated data in JSON format to the Wazuh server. The Wazuh server analyzes and stores this data in a separate database for each endpoint. The databases contain tables that store each type of system information. You can query the database for specific information using the Wazuh API or the ``SQLite`` tool.

Using the Wazuh API
^^^^^^^^^^^^^^^^^^^

You can query the Wazuh inventory data using the `Wazuh API <https://documentation.wazuh.com/current/user-manual/api/reference.html#tag/Syscollector>`_, which retrieves nested data in JSON format. You can use the Wazuh API GUI on the dashboard or a command line tool like ``cURL`` to query the inventory database. 

Wazuh API GUI
~~~~~~~~~~~~~

On the Wazuh dashboard, navigate to **Server management** > **Dev Tools**. On the **Console**, type the following:

.. code-block:: none

   GET /syscollector/<AGENT_ID>/

Where ``<AGENT_ID>`` corresponds to the agent ID of the endpoint.

The Wazuh dashboard will suggest a list of available tables that you can query via the API.

.. thumbnail:: /images/manual/system-inventory/api-console.png
  :title: Server management > Dev Tools
  :alt: Server management > Dev Tools
  :align: center
  :width: 80%

For example, you can use the command ``GET /syscollector/<AGENT_ID>/packages`` to query the inventory data for installed packages on the endpoint. After typing, click the play icon to run the query.

Furthermore, you can query the inventory data for specific information about any property. For example, the command below queries the package inventory to check for the ``wazuh-agent`` package: 

.. code-block:: none

   GET /syscollector/<AGENT_ID>/packages?pretty=true&name=wazuh-agent 

Where: 

- ``packages`` reference the package table in the inventory database, which stores information about the currently installed software on an endpoint. You can reference the table of your interest.
- ``name=wazuh-agent`` specifies the ``wazuh-agent`` package name. You can use different properties and values.
- ``pretty=true`` ensures the output is properly formatted and easy to read.

.. thumbnail:: /images/manual/system-inventory/query-the-inventory-data.png
  :title: Query the inventory data
  :alt: Query the inventory data
  :align: center
  :width: 80%

.. _inventory_wazuh_api_curl:

cURL
~~~~

Follow the steps below to query the endpoint database from the command line using ``cURL``:

- Generate a JSON Web Token (JWT) for authenticating to the Wazuh server by running the following command. The default API credentials are ``wazuh:wazuh``. Replace ``<WAZUH_SERVER_IP>`` with your Wazuh server IP address.

   .. code-block:: console

      TOKEN=$(curl -u <USER>:<PASSWORD> -k -X GET "https://<WAZUH_SERVER_IP>:55000/security/user/authenticate?raw=true")

   Run the command ``echo $TOKEN`` to confirm that you successfully generated the token. The output should be like this:
   
   .. code-block:: console
      :class: output

      eyJhbGciOiJFUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3YXp1aCIsImF1ZCI6IldhenVoIEFQSSBSRVNUIiwibmJmIjoxNjQzMDExMjQ0LCJleHAiOjE2NDMwMTIxNDQsInN1YiI6IndhenVoIiwicnVuX2FzIjpmYWxzZSwicmJhY19yb2xlcyI6WzFdLCJyYmFjX21vZGUiOiJ3aGl0ZSJ9.Ad6zOZvx0BEV7K0J6s3pIXAXTWB-zdVfxaX2fotLfZMQkiYPMkwDaQHUFiOInsWJ_7KZV3y2BbhEs9-kBqlJAMvMAD0NDBPhEQ2qBd_iutZ7QWZECd6eYfIP83xGqH9iqS7uMI6fXOKr3w4aFV13Q6qsHSUQ1A-1LgDnnDGGaqF5ITYo

- Query the endpoint information of interest using a command which takes the following format:

   .. code-block:: console

      curl -k -X GET "https://<WAZUH_SERVER_IP>:55000/syscollector/<AGENT_ID>/<SYSCOLLECTOR_PROPERTY>?pretty=true" -H "Authorization: Bearer $TOKEN"

   For example, to retrieve information about the applications installed on an endpoint with agent ID of ``010``, the command will be:

   .. code-block:: console

      curl -k -X GET "https://<WAZUH_SERVER_IP>:55000/syscollector/010/packages?pretty=true" -H  "Authorization: Bearer $TOKEN"

   The other inventory properties are ``hardware``, ``hotfixes``, ``netaddr``, ``netiface``, ``netproto``, ``os``, ``ports``, and ``processes``. These all correspond to the tables in the :doc:`inventory database </user-manual/capabilities/system-inventory/available-inventory-fields>`. You can learn more about these options in our `API documentation <https://documentation.wazuh.com/current/user-manual/api/reference.html#tag/Syscollector>`_.

   .. code-block:: console
      :class: output

      {
         "data": {
            "affected_items": [
               {
                  "scan": {
                     "id": 0,
                     "time": "2022-09-27T09:16:45+00:00"
                  },
                  "priority": "optional",
                  "multiarch": "foreign",
                  "format": "deb",
                  "vendor": "Ubuntu Developers <ubuntu-devel-discuss@lists.ubuntu.com>",
                  "size": 12219,
                  "version": "0.4.9-2",
                  "description": "encoding data for the poppler PDF rendering library",
                  "section": "misc",
                  "name": "poppler-data",
                  "architecture": "all",
                  "agent_id": "010"
               },
               {
                  "scan": {
                     "id": 0,
                     "time": "2022-09-27T09:16:45+00:00"
                  },
                  "priority": "optional",
                  "multiarch": "foreign",
                  "format": "deb",
                  "vendor": "Ubuntu Developers <ubuntu-devel-discuss@lists.ubuntu.com>",
                  "size": 31,
                  "version": "3.20-4",
                  "description": "data tables pertaining to HTML",
                  "section": "perl",
                  "name": "libhtml-tagset-perl",
                  "architecture": "all",
                  "agent_id": "010"
               },
               {
                  "scan": {
                     "id": 0,
                     "time": "2022-09-27T09:16:45+00:00"
                  },
                  "priority": "optional",
                  "multiarch": "same",
                  "format": "deb",
                  "vendor": "Ubuntu Developers <ubuntu-devel-discuss@lists.ubuntu.com>",
                  "size": 426,
                  "version": "1.17-6ubuntu4.1",
                  "description": "MIT Kerberos runtime libraries - krb5 GSS-API Mechanism",
                  "section": "libs",
                  "source": "krb5",
                  "name": "libgssapi-krb5-2",
                  "architecture": "amd64",
                  "agent_id": "010"
               },
      …            

   Furthermore, you can query the inventory data to find specific information about any property. For example, the command below queries the package inventory to check if the ``wazuh-agent`` package is present.

   .. code-block:: console

      curl -k -X GET "https://<WAZUH_SERVER_IP>:55000/syscollector/001/packages?pretty=true&name=wazuh-agent" -H  "Authorization: Bearer $TOKEN"

   .. code-block:: console
      :class: output
      :emphasize-lines: 9

      {
         "data": {
            "affected_items": [
               {
                  "scan": {
                     "id": 0,
                     "time": "2025-08-18T16:50:06+00:00"
                  },
                  "name": "wazuh-agent",
                  "section": "System Environment/Daemons",
                  "architecture": "x86_64",
                  "description": "Wazuh helps you to gain security visibility into your infrastructure by monitoring\nhosts at an operating system and application level. It provides the following capabilities:\nlog analysis, file integrity monitoring, intrusions detection and policy and compliance monitoring",
                  "location": " ",
                  "source": " ",
                  "format": "rpm",
                  "install_time": "1755535740",
                  "version": "4.12.0-1",
                  "size": 30461944,
                  "priority": " ",
                  "vendor": "Wazuh, Inc <info@wazuh.com>",
                  "agent_id": "001"
               }
            ],
            "total_affected_items": 1,
            "total_failed_items": 0,
            "failed_items": []
         },
         "message": "All specified syscollector information was returned",
         "error": 0
      }

Using SQLite
^^^^^^^^^^^^

The location of the database for each monitored endpoint is on the Wazuh server at ``/var/ossec/queue/db/``. You can query each database directly. To connect to the database of an endpoint, use the command below:

.. code-block:: console

   $ sqlite3 /var/ossec/queue/db/<AGENT_ID>.db

Where ``<AGENT_ID>`` corresponds to the agent ID of the monitored endpoint.

.. code-block:: console
   :class: output

   SQLite version 3.7.17 2013-05-20 00:56:22
   Enter ".help" for instructions
   Enter SQL statements terminated with a ";"
   sqlite> 

After connecting to the database, you can query the list of tables in it using the command below:

.. code-block:: console

   sqlite>.tables

.. code-block:: console
   :class: output

   ciscat_results        sca_scan_info         sys_osinfo          
   fim_entry             scan_info             sys_ports           
   metadata              sync_info             sys_processes       
   pm_event              sys_hotfixes          sys_programs        
   sca_check             sys_hwinfo            vuln_cves           
   sca_check_compliance  sys_netaddr           vuln_metadata       
   sca_check_rules       sys_netiface        
   sca_policy            sys_netproto 

You can further query the tables for any information you are interested in. For example, if you want to know if a particular software is present on an endpoint, you can query the ``sys_programs`` table using  ``sqlite>select * from sys_programs where name="<SOFTWARE_NAME>";``. The command below checks whether the ``wazuh-agent`` program is present on a monitored Linux endpoint and shows the captured details:

.. code-block:: console

   sqlite>select * from sys_programs where name="wazuh-agent";

.. code-block:: console
   :class: output

   0|2023/01/06 13:48:56|rpm|wazuh-agent||System Environment/Daemons|25988677|Wazuh, Inc <info@wazuh.com>|1673012221|4.3.10-1|x86_64|||Wazuh helps you to gain security visibility into your infrastructure by monitoring hosts at an operating system and application level. It provides the following capabilities: log analysis, file integrity monitoring, intrusions detection and policy and compliance monitoring||1|||1cf5a056a0ff5b6201939eba76ef68f6d860af36|5747279dac052d61c6d3ec87b475edddb84e9dd1







