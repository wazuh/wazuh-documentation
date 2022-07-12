.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Learn more about how to perform the offline update of the Wazuh Vulnerability Detector in this section of our documentation.

.. _learning_wazuh_vuln_detection:

Track down vulnerable applications
==================================

Of the many software packages installed on your environment computers,
which ones have known vulnerabilities that might impact your security posture?
Wazuh helps you answer this question with the ``syscollector`` and
``vulnerability-detector`` modules.

On each agent, ``syscollector`` can scan the system for the presence and
version of all software packages.  This information is submitted to the Wazuh
manager where it is stored in an agent-specific database for later assessment.
On the Wazuh manager, ``vulnerability-detector`` maintains a fresh copy of the
desired CVE sources of vulnerability data, and periodically compares agent
packages with the relevant CVE database and generates alerts on matches.

In this lab, we will see how ``syscollector`` is configured by default to run on
the Wazuh Manager and on the agents. We will also configure ``vulnerability-detector``
on the Wazuh manager to periodically scan the collected inventory data for known
vulnerable packages.
We will observe relevant log messages and vulnerability alerts in the Wazuh dashboard including
a dashboard dedicated to this.  We will also interact with the Wazuh API to more
deeply mine the inventory data, and even take a look at the databases where it is
stored.

Configure ``syscollector`` for all the agents
---------------------------------------------

In the ``/var/ossec/etc/ossec.conf`` file of the Wazuh manager and agents, 
see the default configuration and find the ``syscollector`` section.

- For Linux systems:

   .. code-block:: xml

      <!-- System inventory -->
      <wodle name="syscollector">
        <disabled>no</disabled>
        <interval>1h</interval>
        <scan_on_start>yes</scan_on_start>
        <hardware>yes</hardware>
        <os>yes</os>
        <network>yes</network>
        <packages>yes</packages>
        <ports all="no">yes</ports>
        <processes>yes</processes>

        <!-- Database synchronization settings -->
        <synchronization>
          <max_eps>10</max_eps>
        </synchronization>
      </wodle>      

- For Windows, you should enable the ``hotfixes`` option, to report the Windows updates installed:

   .. code-block:: xml
      :emphasize-lines: 12

      <!-- System inventory -->
      <wodle name="syscollector">
        <disabled>no</disabled>
        <interval>1h</interval>
        <scan_on_start>yes</scan_on_start>
        <hardware>yes</hardware>
        <os>yes</os>
        <network>yes</network>
        <packages>yes</packages>
        <ports all="no">yes</ports>
        <processes>yes</processes>
        <hotfixes>yes</hotfixes>      

        <!-- Database synchronization settings -->
        <synchronization>
          <max_eps>10</max_eps>
        </synchronization>
      </wodle>

By default, it will collect inventory information for hardware, operating system,
network interfaces, installed packages, open ports and running processes every hour.

Configure ``vulnerability-detector`` on  the Wazuh Manager
----------------------------------------------------------

#. In the ``/var/ossec/etc/ossec.conf`` file of the Wazuh manager, scroll down to the ``vulnerability-detector`` wodle (Wazuh module) and enable both the service and feeds you may want to use.

   .. code-block:: xml
      :emphasize-lines: 2, 28, 52, 58 

      <vulnerability-detector>
        <enabled>yes</enabled>
        <interval>5m</interval>
        <min_full_scan_interval>6h</min_full_scan_interval>
        <run_on_start>yes</run_on_start>
    
        <!-- Ubuntu OS vulnerabilities -->
        <provider name="canonical">
          <enabled>no</enabled>
          <os>trusty</os>
          <os>xenial</os>
          <os>bionic</os>
          <os>focal</os>
          <update_interval>1h</update_interval>
        </provider>
    
        <!-- Debian OS vulnerabilities -->
        <provider name="debian">
          <enabled>no</enabled>
          <os>stretch</os>
          <os>buster</os>
          <os>bullseye</os>
          <update_interval>1h</update_interval>
        </provider>
    
        <!-- RedHat OS vulnerabilities -->
        <provider name="redhat">
          <enabled>yes</enabled>
          <os>5</os>
          <os>6</os>
          <os>7</os>
          <os>8</os>
          <update_interval>1h</update_interval>
        </provider>
    
        <!-- Amazon Linux OS vulnerabilities -->
        <provider name="alas">
          <enabled>no</enabled>
          <os>amazon-linux</os>
          <os>amazon-linux-2</os>
          <update_interval>1h</update_interval>
        </provider>
    
        <!-- Arch OS vulnerabilities -->
        <provider name="arch">
          <enabled>no</enabled>
          <update_interval>1h</update_interval>
        </provider>
    
        <!-- Windows OS vulnerabilities -->
        <provider name="msu">
          <enabled>yes</enabled>
          <update_interval>1h</update_interval>
        </provider>
    
        <!-- Aggregate vulnerabilities -->
        <provider name="nvd">
          <enabled>yes</enabled>
          <update_from_year>2010</update_from_year>
          <update_interval>1h</update_interval>
        </provider>
    
      </vulnerability-detector>

   In the example above we have enabled the feeds for RedHat, which will allow us to monitor CentOS systems, the National Vulnerability Database (NVD), and the Microsoft Security Update which will allow us to monitor Windows systems. More information on this module and how to configure it can be found in the :ref:`Vulnerability Detection Section <vulnerability-detection>` of the documentation.

#. Restart the Wazuh manager.

   .. include:: /_templates/common/restart_manager.rst


.. note::

   Updating the Vulnerability database for the first time may take a while. 


Look at the logs
----------------

The ``vulnerability-detector`` module generates logs on the manager, and ``syscollector`` does as well on the manager and agents.

#. Try ``grep syscollector: /var/ossec/logs/ossec.log`` on the manager and on an agent:

   .. code-block:: none

      # grep syscollector: /var/ossec/logs/ossec.log

   .. code-block:: none
      :class: output

      2022/06/21 07:26:35 wazuh-modulesd:syscollector: INFO: Module started.
      2022/06/21 07:26:35 wazuh-modulesd:syscollector: INFO: Starting evaluation.
      2022/06/21 07:26:36 wazuh-modulesd:syscollector: INFO: Evaluation finished.


#. Try ``grep vulnerability-detector: /var/ossec/logs/ossec.log`` on the Wazuh manager:

   .. code-block:: none

      # grep vulnerability-detector: /var/ossec/logs/ossec.log

   .. code-block:: none
      :class: output

      2022/06/21 07:26:35 wazuh-modulesd:vulnerability-detector: INFO: (5400): Starting 'Red Hat Enterprise Linux 5' database update.
      2022/06/21 07:26:43 wazuh-modulesd:vulnerability-detector: INFO: (5430): The update of the 'Red Hat Enterprise Linux 5' feed finished successfully.
      2022/06/21 07:26:43 wazuh-modulesd:vulnerability-detector: INFO: (5400): Starting 'Red Hat Enterprise Linux 6' database update.
      2022/06/21 07:26:59 wazuh-modulesd:vulnerability-detector: INFO: (5430): The update of the 'Red Hat Enterprise Linux 6' feed finished successfully.
      2022/06/21 07:26:59 wazuh-modulesd:vulnerability-detector: INFO: (5400): Starting 'Red Hat Enterprise Linux 7' database update.
      2022/06/21 07:27:15 wazuh-modulesd:vulnerability-detector: INFO: (5430): The update of the 'Red Hat Enterprise Linux 7' feed finished successfully.
      2022/06/21 07:27:15 wazuh-modulesd:vulnerability-detector: INFO: (5400): Starting 'Red Hat Enterprise Linux 8' database update.
      2022/06/21 07:27:30 wazuh-modulesd:vulnerability-detector: INFO: (5430): The update of the 'Red Hat Enterprise Linux 8' feed finished successfully.
      2022/06/21 07:27:30 wazuh-modulesd:vulnerability-detector: INFO: (5400): Starting 'JSON Red Hat Enterprise Linux' database update.
      2022/06/21 07:29:28 wazuh-modulesd:vulnerability-detector: INFO: (5430): The update of the 'JSON Red Hat Enterprise Linux' feed finished successfully.
      2022/06/21 07:29:28 wazuh-modulesd:vulnerability-detector: INFO: (5400): Starting 'National Vulnerability Database' database update.
      2022/06/21 07:47:27 wazuh-modulesd:vulnerability-detector: INFO: (5430): The update of the 'National Vulnerability Database' feed finished successfully.
      2022/06/21 07:47:27 wazuh-modulesd:vulnerability-detector: INFO: (5400): Starting 'Microsoft Security Update' database update.
      2022/06/21 07:47:31 wazuh-modulesd:vulnerability-detector: INFO: (5430): The update of the 'Microsoft Security Update' feed finished successfully.
      2022/06/21 07:47:31 wazuh-modulesd:vulnerability-detector: INFO: (5431): Starting vulnerability scan.
      2022/06/21 07:47:31 wazuh-modulesd:vulnerability-detector: INFO: (5450): Analyzing agent '000' vulnerabilities.
      2022/06/21 07:52:30 wazuh-modulesd:vulnerability-detector: INFO: (5471): Finished vulnerability assessment for agent '000'
      2022/06/21 07:52:30 wazuh-modulesd:vulnerability-detector: INFO: (5450): Analyzing agent '001' vulnerabilities.
      2022/06/21 07:59:35 wazuh-modulesd:vulnerability-detector: INFO: (5471): Finished vulnerability assessment for agent '001'
      2022/06/21 07:59:35 wazuh-modulesd:vulnerability-detector: INFO: (5472): Vulnerability scan finished.






See the alerts in the Wazuh dashboard
-------------------------------------

Search the Wazuh dashboard for "vulnerability-detector", selecting some of the more helpful fields for viewing the alerts. 

.. thumbnail:: ../images/learning-wazuh/labs/vulnerabilities-found-list.png
    :title: Found Vulnerabilities
    :align: center
    :width: 80%


Expand one of the records to see all the information available:

.. thumbnail:: ../images/learning-wazuh/labs/vulnerability-found.png
    :title: Vulnerability event
    :align: center
    :width: 80%


Note all the available fields and remember that the different components of Wazuh
may be configured to act differently depending on the fields of each alert, as
well as the ability to create visualizations and filter search results in the Wazuh dashboard.

.. note::

   When the field ``data.vulnerability.state`` has the value "Fixed", this
   indicates that the vulnerability has been corrected in future versions of
   the software. However, the vulnerability is still present in the version
   installed in your system.

Look deeper with the Wazuh API
------------------------------

You can access the Wazuh API directly from your own scripts or from the command line with curl.  This is especially helpful here to obtain environment-wide package information.
The actual inventory data is kept in agent-specific databases on the Wazuh manager.
To see that, as well as other information collected by ``syscollector``, you can
query the Wazuh API :api-ref:`syscollector endpoints<tag/Syscollector>`.  Not only are software packages inventoried, but basic
hardware and operating system data is also tracked.

#. Run ``agent_control -l`` on the Wazuh Manager to list your agents as you will
   need to query the Wazuh API by agent id number:

   .. code-block:: none
      :class: output

      # agent_control -l

   .. code-block:: none
      :class: output

      Wazuh agent_control. List of available agents:
       ID: 000, Name: wazuh-manager (server), IP: 127.0.0.1, Active/Local
       ID: 001, Name: linux-agent, IP: 172.30.0.30, Active
       ID: 002, Name: windows-agent, IP: 172.30.0.40, Active


#. From the Wazuh Manager, request a token and export it to an environment variable to use it in the authorization header of future API requests. Replace ``<user>:<password>`` with your Wazuh API credentials. 

   .. code-block:: none
      
      TOKEN=$(curl -u <user>:<password> -k -X GET "https://localhost:55000/security/user/authenticate?raw=true")

#. Query the Wazuh API for scanned hardware data about agent 002 using endpoint :api-ref:`GET /syscollector/{agent_id}/hardware <operation/api.controllers.syscollector_controller.get_hardware_info>`:

   .. code-block:: console

      # curl -k -X GET "https://localhost:55000/syscollector/002/hardware?pretty=true" -H "Authorization: Bearer $TOKEN"


   The result should look like this:

   .. code-block:: json
      :class: output

      {
         "data": {
            "affected_items": [
               {
                  "cpu": {
                     "cores": 3,
                     "mhz": 2304,
                     "name": "Intel(R) Core(TM) i7-10510U CPU @ 1.80GHz"
                  },
                  "ram": {
                     "free": 6287324,
                     "total": 8379956,
                     "usage": 24
                  },
                  "scan": {
                     "id": 0,
                     "time": "2022-06-21T13:09:15Z"
                  },
                  "board_serial": "0",
                  "agent_id": "002"
               }
            ],
            "total_affected_items": 1,
            "total_failed_items": 0,
            "failed_items": []
         },
         "message": "All specified syscollector information was returned",
         "error": 0
      }


#. Next, query the Wazuh API for scanned OS data about agent 002 using endpoint :api-ref:`GET /syscollector/{agent_id}/os <operation/api.controllers.syscollector_controller.get_os_info>`:

   .. code-block:: console

      # curl -k -X GET "https://localhost:55000/syscollector/002/os?pretty=true" -H "Authorization: Bearer $TOKEN"


   The result should look like this:

   .. code-block:: json
      :class: output

      {
         "data": {
            "affected_items": [
               {
                  "os": {
                     "build": "19044",
                     "display_version": "21H2",
                     "major": "10",
                     "minor": "0",
                     "name": "Microsoft Windows 10 Home",
                     "version": "10.0.19044"
                  },
                  "scan": {
                     "id": 0,
                     "time": "2022-06-21T13:09:15Z"
                  },
                  "architecture": "x86_64",
                  "os_release": "2009",
                  "hostname": "DESKTOP-9J68DDH",
                  "agent_id": "002"
               }
            ],
            "total_affected_items": 1,
            "total_failed_items": 0,
            "failed_items": []
         },
         "message": "All specified syscollector information was returned",
         "error": 0
      }


#. You can also use the experimental capabilities of the API to list information
   of all agents in the environment. In order to do so it is necessary to enable
   this capability in ``/var/ossec/api/configuration/api.yaml``. A complete API configuration
   guide can be found :ref:`here <api_configuration>`.



#. Restart the Wazuh API using the ``wazuh-manager`` service:

   .. include:: /_templates/common/restart_manager.rst

#. Let's list the versions of curl on all of our Linux systems:

   .. code-block:: console

      # curl -k -X GET "https://localhost:55000/experimental/syscollector/packages?pretty=true&name=curl" -H "Authorization: Bearer $TOKEN"


   The result should look like this:

   .. code-block:: json
      :class: output

      {
         "data": {
            "affected_items": [
               {
                  "scan": {
                     "id": 0,
                     "time": "2022-05-23T08:22:56Z"
                  },
                  "section": "Applications/Internet",
                  "format": "rpm",
                  "description": "A utility for getting files from remote servers (FTP, HTTP, and others)",
                  "install_time": "1588284371",
                  "version": "7.29.0-57.el7",
                  "size": 540404,
                  "vendor": "CentOS",
                  "architecture": "x86_64",
                  "name": "curl",
                  "agent_id": "000"
               },
               {
                  "scan": {
                     "id": 0,
                     "time": "2022-06-14T13:47:43Z"
                  },
                  "section": "Applications/Internet",
                  "format": "rpm",
                  "description": "A utility for getting files from remote servers (FTP, HTTP, and others)",
                  "install_time": "1588284371",
                  "version": "7.29.0-57.el7",
                  "size": 540404,
                  "vendor": "CentOS",
                  "architecture": "x86_64",
                  "name": "curl",
                  "agent_id": "001"
               }
            ],
            "total_affected_items": 2,
            "total_failed_items": 0,
            "failed_items": []
         },
        "message": "All specified syscollector information was returned",
        "error": 0




.. note::
  Take time to read the online documentation about the :ref:`Wazuh API <api>` . It is a
  powerful utility that puts all sorts of data, configuration details, and
  state information at your fingertips once you know how to ask for it.



A quick peek at the actual agent databases
------------------------------------------

Agent-specific databases on the Wazuh manager store, among other things, the ``syscollector`` scan results for each agent.

#. On the Wazuh Manager, list the tables in an agent SQLite database.

   .. code-block:: console

      # sqlite3 /var/ossec/queue/db/001.db .tables

   .. code-block:: none
      :class: output

      ciscat_results        sca_scan_info         sys_osinfo          
      fim_entry             scan_info             sys_ports           
      metadata              sync_info             sys_processes       
      pm_event              sys_hotfixes          sys_programs        
      sca_check             sys_hwinfo            vuln_cves           
      sca_check_compliance  sys_netaddr           vuln_metadata       
      sca_check_rules       sys_netiface        
      sca_policy            sys_netproto   


   The ``sys_`` tables are populated by ``syscollector``.

#. Query the OS information table.

   .. code-block:: console

      # sqlite3 /var/ossec/queue/db/001.db 'select * from sys_osinfo;' -header


   .. code-block:: none
      :class: output

      scan_id|scan_time|hostname|architecture|os_name|os_version|os_codename|os_major|os_minor|os_patch|os_build|os_platform|sysname|release|version|os_release|checksum|os_display_version|triaged|reference
      0|2022/06/21 19:42:16|linux-agent|x86_64|Centos Linux|7.8.2003|Core|7|8|2003||centos|Linux|3.10.0-1127.el7.x86_64|#1 SMP Tue Mar 31 23:36:51 UTC 2020||1655840535487993960||1|016166771307639663d0dce9b36315c60c608ae0


#. Do a quick dump of the software packages.

   .. code-block:: console

      # sqlite3 /var/ossec/queue/db/001.db "select name,version,description from sys_programs;" -header

   .. code-block:: none
      :class: output

      name|version|description
      dracut|033-572.el7|Initramfs generator using udev
      openssl|1:1.0.2k-25.el7_9|Utilities from the general purpose cryptography library with TLS implementation
      libnetfilter_conntrack|1.0.6-1.el7_3|Netfilter conntrack userspace library
      sudo|1.8.23-10.el7_9.2|Allows restricted root access for specified users
      kernel-headers|3.10.0-1160.66.1.el7|Header files for the Linux kernel for use by glibc
      binutils|2.27-44.base.el7_9.1|A GNU collection of binary utilities
      perl-constant|1.27-2.el7|Perl pragma to declare constants
      perl-libs|4:5.16.3-299.el7_9|The libraries for the perl runtime
      pytalloc|2.1.16-1.el7|Developer tools for the Talloc library
      libmount|2.23.2-65.el7_9.1|Device mounting library
      nmap-ncat|2:6.40-19.el7|Nmap's Netcat replacement
      expat|2.1.0-14.el7_9|An XML parser library
      grub2-common|1:2.02-0.87.0.1.el7.centos.9|grub2 common layout
      dbus-glib|0.100-7.el7|GLib bindings for D-Bus
      libtdb|1.3.18-1.el7|The tdb library
      libtirpc|0.2.4-0.16.el7|Transport Independent RPC Library


      ...

Wazuh dashboard
---------------

While the Wazuh API and SQLite databases let you get at the nitty-gritty data,
usually the most beautiful place to see your vulnerability detection results
is in the Wazuh dashboard.  In the **Vulnerabilities** dashboard, you can select an agent to see a dashboard with the most relevant vulnerabilities information.

.. thumbnail:: ../images/learning-wazuh/labs/vulnerabilities-dashboard.png
    :title: Vulnerabilities dashboard
    :align: center
    :width: 80%


Optional exercise
-----------------

You could create a CDB for escalating alerts about your own custom set of high-priority CVEs.  Write a child rule of Wazuh rule 23501 that looks for a match in
this CDB and generates alerts of a high severity like 12.  Consider how you might
use a key/value CDB listing pairs of agent names and software package names that
you want to especially keep an eye on.  For example, you might want an escalated
alert about high-level CVE matches on the "apache" software package on your
Internet-facing web servers but not for other internal servers.
The possibilities are endless.
