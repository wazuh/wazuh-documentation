.. _learning_wazuh_vuln_detection:

Track down vulnerable applications
==================================

.. warning::
  This lab requires manager and agents to run Wazuh 3.2.1 or higher because in 3.2.0 the syscollector wodle configuration breaks the 
  Wazuh agents if distributed through agent.conf.

Of the many software packages installed on your Red Hat, CentOS, and/or Ubuntu systems, which ones have known vulnerabilities that might 
impact your security posture?  Wazuh helps you answer this question with the ``syscollector`` and ``vulnerability-detector`` modules.  
On each agent, ``syscollector`` can scan the system for the presence and version of all software packages.  This information is submitted 
to the Wazuh manager where it is stored in an agent-specific database for later assessment.  On the Wazuh manager, 
``vulnerability-detector`` maintains a fresh copy of the desired CVE sources of vulnerability data, and periodically compares agent 
packages with the relevant CVE database and generates alerts on matches.

In this lab, we will configure ``syscollector`` to run on wazuh-server and on both of the Linux agents.  We will also configure 
``vulnerability-detector`` on wazuh-server to periodically scan the collected inventory data for known vulnerable packages. We will
observe relevant log messages and vulnerability alerts in Kibana including a dashboard dedicated to this.  We will also interact with
the Wazuh API to more deeply mine the inventory data, and even take a look at the databases where it is stored.

Configure ``syscollector`` for the Linux agents
-----------------------------------------------

In ``/var/ossec/etc/shared/linux/agent.conf`` on wazuh-server, just before the ``open-scap`` wodle configuration section, insert the 
following so each Linux agent will scan itself.

  .. code-block:: xml

    <wodle name="syscollector">
      <disabled>no</disabled>
      <interval>1d</interval>
      <scan_on_start>yes</scan_on_start>
      <hardware>yes</hardware>
      <os>yes</os>
      <packages>yes</packages>
    </wodle>

Run ``verify-agent-conf`` to confirm no errors were introduced into agent.conf.



Configure ``vulnerability-detector`` and ``syscollector`` on wazuh-server
-------------------------------------------------------------------------

In ``ossec.conf`` on wazuh-server, just before the ``open-scap`` wodle configuration section, insert the following so 
that it will inventory its own software plus scan all collected software inventories against published CVEs, alerting where
there are matches:

  .. code-block:: xml

    <wodle name="vulnerability-detector">
      <disabled>no</disabled>
      <interval>1d</interval>
      <run_on_start>yes</run_on_start>
      <!-- <update_ubuntu_oval interval="15h" version="12,14,16">yes</update_ubuntu_oval> -->
      <!-- <update_redhat_oval interval="15h" version="5,6,7">yes</update_redhat_oval> -->
      <update_redhat_oval interval="15h" version="7">yes</update_redhat_oval>
    </wodle>

    <wodle name="syscollector">
      <disabled>no</disabled>
      <interval>1d</interval>
      <scan_on_start>yes</scan_on_start>
      <hardware>yes</hardware>
      <os>yes</os>
      <packages>yes</packages>
    </wodle>

Restart the manager with ``ossec-control restart``.  This will also cause the agents to restart as they pick up their new ``agent.conf``.



Look at the logs
----------------

The ``vulnerability-detector`` module generates logs on the manager, and ``syscollector`` does as well on the manager and agents.

Try ``grep syscollector: /var/ossec/logs/ossec.log`` on the manager and on an agent:

  .. code-block:: xml

      2018/02/23 00:55:33 wazuh-modulesd:syscollector: INFO: Module started.
      2018/02/23 00:55:34 wazuh-modulesd:syscollector: INFO: Starting evaluation.
      2018/02/23 00:55:35 wazuh-modulesd:syscollector: INFO: Evaluation finished.

and try ``grep vulnerability-detector: /var/ossec/logs/ossec.log`` on the manager 

  .. code-block:: console

    2018/02/23 00:55:33 wazuh-modulesd:vulnerability-detector: INFO: (5461): Starting Red Hat Enterprise Linux 7 DB update...
    2018/02/23 00:55:33 wazuh-modulesd:vulnerability-detector: INFO: (5452): Starting vulnerability scanning.
    2018/02/23 00:55:33 wazuh-modulesd:vulnerability-detector: INFO: (5453): Vulnerability scanning finished.



See the alerts in Kibana
------------------------

Search Kibana for ``location:"vulnerability-detector" AND data.vulnerability.severity:"High"``, selecting some of the more helpful fields for viewing like below:

    +-----------------------------------------------------------------------------------------------+
    | .. thumbnail:: ../images/learning-wazuh/labs/vuln-found-list.png                              |
    |     :title: flood                                                                             |
    |     :align: center                                                                            |
    |     :width: 100%                                                                              |
    +-----------------------------------------------------------------------------------------------+

Expand one of the records to see all the information available:

    +-----------------------------------------------------------------------------------------------+
    | .. thumbnail:: ../images/learning-wazuh/labs/vuln-found.png                                   |
    |     :title: flood                                                                             |
    |     :align: center                                                                            |
    |     :width: 100%                                                                              |
    +-----------------------------------------------------------------------------------------------+
 


Look deeper with the Wazuh API:
-------------------------------

Up to now we have only seen the Wazuh API enable the Wazuh Kibana App to interface directly with the Wazuh manager.  However, you can also
access the API directly from your own scripts or from the command line with curl.  This is especially helpful here as full software 
inventory data is not stored in Elasticsearch or visible in Kibana -- only the CVE match alerts are.  The actual inventory data is kept
in agent-specific databases on the Wazuh manager.  To see that, plus other information collected
by ``syscollector``, you can mine the Wazuh API.  Not only are software packages inventoried, but basic hardware and operating 
system data is also tracked.

1. Run ``agent_control -l`` on wazuh-server to list your agents as you will need to query the API by agent id number:

  .. code-block:: console

    Wazuh agent_control. List of available agents:
      ID: 000, Name: wazuh-server (server), IP: 127.0.0.1, Active/Local
      ID: 001, Name: linux-agent, IP: any, Active
      ID: 002, Name: elastic-server, IP: any, Active
      ID: 003, Name: windows-agent, IP: any, Active

2. On wazuh-server, query the Wazuh API for scanned hardware data about agent 002.

  .. code-block:: console

    # curl -u wazuhapiuser:wazuhlab -k -X GET "https://127.0.0.1:55000/syscollector/002/hardware?pretty"

  The results should look like this:

  .. code-block:: json

    {
      "error": 0,
      "data": {
          "board_serial": "unknown",
          "ram": {
            "total": 8009024,
            "free": 156764
          },
          "cpu": {
            "cores": 2,
            "mhz": 2400.188,
            "name": "Intel(R) Xeon(R) CPU E5-2676 v3 @ 2.40GHz"
          },
          "scan": {
            "id": 1794797325,
            "time": "2018/02/18 02:05:31"
          }
      }
    }

3. Next, query the Wazuh API for scanned OS data about agent 002.

  .. code-block:: console

    # curl -u wazuhapiuser:wazuhlab -k -X GET "https://127.0.0.1:55000/syscollector/002/os?pretty"

  The results should look like this:

  .. code-block:: json

    {
      "error": 0,
      "data": {
          "sysname": "Linux",
          "version": "#1 SMP Thu Jan 25 20:13:58 UTC 2018",
          "architecture": "x86_64",
          "scan": {
            "id": 1524588903,
            "time": "2018/02/23 01:12:21"
          },
          "release": "3.10.0-693.17.1.el7.x86_64",
          "hostname": "elastic-server",
          "os": {
            "version": "7 (Core)",
            "name": "CentOS Linux"
          }
      }
    }

4. You can also query the software inventory data in many ways.  Let's list the versions of wget on all of our Linux systems:

  .. code-block:: console

    # curl -u wazuhapiuser:wazuhlab -k -X GET "https://127.0.0.1:55000/syscollector/packages?pretty&search=wget"

  The results should look like this:

  .. code-block:: json

    {
      "error": 0,
      "data": {
          "totalItems": 3,
          "items": [
            {
                "scan_id": 1828761440,
                "vendor": "CentOS",
                "description": "A utility for retrieving files using the HTTP or FTP protocols",
                "format": "rpm",
                "scan_time": "2018/02/23 00:55:34",
                "agent_id": "000",
                "version": "1.14-15.el7_4.1",
                "architecture": "x86_64",
                "name": "wget"
            },
            {
                "scan_id": 302583356,
                "vendor": "CentOS",
                "description": "A utility for retrieving files using the HTTP or FTP protocols",
                "format": "rpm",
                "scan_time": "2018/02/23 01:11:23",
                "agent_id": "001",
                "version": "1.14-15.el7_4.1",
                "architecture": "x86_64",
                "name": "wget"
            },
            {
                "scan_id": 1797197868,
                "vendor": "CentOS",
                "description": "A utility for retrieving files using the HTTP or FTP protocols",
                "format": "rpm",
                "scan_time": "2018/02/23 01:12:21",
                "agent_id": "002",
                "version": "1.14-15.el7_4.1",
                "architecture": "x86_64",
                "name": "wget"
            }
          ]
      }
    }

.. note::
  Take time to read the online documentation about the Wazuh API.  It is a powerful facility that puts all sorts of data,  
  configuration details, and state information at your fingertips once you know how to ask for it.  



Take a quick peek at an agent's database
----------------------------------------

Agent-specific databases on the Wazuh manager store, among other things, the ``syscollector`` scan results for each agent. 

1. On wazuh-server, list the tables in linux-agent's SQLite database (agent 001):

  .. code-block:: console

    # sqlite3 /var/ossec/queue/db/001.db .tables

  You should see:

  .. code-block:: console

    fim_entry      metadata       sys_netaddr    sys_ports
    fim_event      pm_event       sys_netiface   sys_processes
    fim_file       sys_hwinfo     sys_osinfo     sys_programs

  The ``sys_`` table are populated by ``syscollector``.

2. Query the OS information table

  .. code-block:: console

    # echo "select * from sys_osinfo;" | sqlite3 /var/ossec/queue/db/001.db

  You should see:

  .. code-block:: console

    1364535564|2018/02/23 01:11:23|linux-agent|x86_64|CentOS Linux|7 (Core)|||||centos|Linux|3.10.0-693.11.6.el7.x86_64|#1 SMP Thu Jan 4 01:06:37 UTC 2018

3. Do a quick dump of the software packages.

  .. code-block:: console

    # echo "select * from sys_programs;" | sqlite3 /var/ossec/queue/db/001.db | cut -d\| -f4,6,8

  You should see something like:

  .. code-block:: console

    grub2-pc|1:2.02-0.65.el7.centos.2|Bootloader with support for Linux, Multiboot, and more
    centos-release|7-4.1708.el7.centos|CentOS Linux release file
    setup|2.8.71-7.el7|A set of system configuration and setup files
    policycoreutils-python|2.5-17.1.el7|SELinux policy core python utilities
    basesystem|10.0-7.el7.centos|The skeleton package which defines a simple CentOS Linux system
    net-tools|2.0-0.22.20131004git.el7|Basic networking tools
    libdaemon|0.14-7.el7|Library for writing UNIX daemons
    tzdata|2017c-1.el7|Timezone data
    nss-softokn-freebl|3.28.3-8.el7_4|Freebl library for the Network Security Services
    nspr|4.13.1-1.0.el7_3|Netscape Portable Runtime
    ...



Wazuh Kibana App
----------------

While the Wazuh API and SQLite databases let you get at the nitty-gritty data, usually the most beautiful place to see your vulnerability
detection results is in the Wazuh Kibana App itself.  Both in the OVERVIEW section as well as when you have drilled down into a specific agent, you
can open the VULNERABILITIES tab to see a nice dashboard of this information:

    +-----------------------------------------------------------------------------------------------+
    | .. thumbnail:: ../images/learning-wazuh/labs/vuln-dash.png                                    |
    |     :title: flood                                                                             |
    |     :align: center                                                                            |
    |     :width: 100%                                                                              |
    +-----------------------------------------------------------------------------------------------+



Optional exercise
-----------------

You could create a CDB for escalating alerts about your own custom set of high priority CVEs.  Write a child rule of Wazuh rule 23501 that
looks for a match in this CDB and generates alerts of a high severity like 12.  Consider how you might use a key/value CDB listing pairs of
agent names and software package names that you want to especially keep an eye on.  For example, you might want an escalated alert about 
high-level CVE matches on the "apache" software package on your Internet-facing web servers but not for other internal servers. 
The possibilities are endless...