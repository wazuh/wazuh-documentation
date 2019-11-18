.. Copyright (C) 2019 Wazuh, Inc.

.. _learning_wazuh_vuln_detection:

Track down vulnerable applications
==================================

Of the many software packages installed on your environment's computers,
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
on the Wazuh Manager to periodically scan the collected inventory data for known
vulnerable packages.
We will observe relevant log messages and vulnerability alerts in Kibana including
a dashboard dedicated to this.  We will also interact with the Wazuh API to more
deeply mine the inventory data, and even take a look at the databases where it is
stored.

Configure ``syscollector`` for the all  agents
----------------------------------------------

In the ``/var/ossec/etc/ossec.conf`` file of the Wazuh manager and agents
see the default configuration and find the syscollector section:

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
      </wodle>

By default it will collect inventory information for hardware, operating system,
network interfaces, installed packages, open ports and running processes every hour.

Configure ``vulnerability-detector`` on  the Wazuh Manager
----------------------------------------------------------

In the ``/var/ossec/etc/ossec.conf`` file of the Wazuh manager, scroll down to the **vulnerability-detector** wodle (Wazuh module) and enable both the service and feeds you may want to use.

  .. code-block:: xml

    <vulnerability-detector>
      <enabled>yes</enabled>
      <interval>5m</interval>
      <ignore_time>6h</ignore_time>
      <run_on_start>yes</run_on_start>
      <provider name="canonical">
        <enabled>no</enabled>
        <os>precise</os>
        <os>trusty</os>
        <os>xenial</os>
        <os>bionic</os>
        <update_interval>1h</update_interval>
      </provider>
      <provider name="debian">
        <enabled>no</enabled>
        <os>wheezy</os>
        <os>stretch</os>
        <os>jessie</os>
        <update_interval>1h</update_interval>
      </provider>
      <provider name="redhat">
        <enabled>yes</enabled>
        <update_from_year>2010</update_from_year>
        <update_interval>1h</update_interval>
      </provider>
      <provider name="nvd">
        <enabled>yes</enabled>
        <update_from_year>2010</update_from_year>
        <update_interval>1h</update_interval>
      </provider>
    </vulnerability-detector>

In the example above we have enabled the feeds for RedHat, which will allow us
to monitor CentOS systems, and NVD, the National Vulnerability Database, which
will allow us to monitor Windows systems. More information on this module and
how to configure it can be found in the
:ref:`Vulnerability Detection Section <vulnerability-detection>` of the documentation.

Restart the Wazuh manager.

a. For Systemd:

  .. code-block:: console

    # systemctl restart wazuh-manager

b. For SysV Init:

  .. code-block:: console

    # service wazuh-manager restart

Look at the logs
----------------

The ``vulnerability-detector`` module generates logs on the manager, and ``syscollector`` does as well on the manager and agents.

Try ``grep syscollector: /var/ossec/logs/ossec.log`` on the manager and on an agent:

  .. code-block:: xml

      2019/11/14 19:21:21 wazuh-modulesd:syscollector: INFO: Module started.
      2019/11/14 19:21:22 wazuh-modulesd:syscollector: INFO: Starting evaluation.
      2019/11/14 19:21:29 wazuh-modulesd:syscollector: INFO: Evaluation finished.

and try ``grep vulnerability-detector: /var/ossec/logs/ossec.log`` on the manager

  .. code-block:: console

    2019/11/14 19:23:38 wazuh-modulesd:vulnerability-detector: INFO: (5461): Starting Red Hat Enterprise Linux database update.
    2019/11/14 19:24:14 wazuh-modulesd:vulnerability-detector: INFO: (5494): The update of the Red Hat Enterprise Linux feed finished successfully.
    2019/11/14 19:24:15 wazuh-modulesd:vulnerability-detector: INFO: (5461): Starting National Vulnerability Database database update.
    2019/11/14 19:24:25 wazuh-modulesd:vulnerability-detector: INFO: (5494): The update of the National Vulnerability Database feed finished successfully.
    2019/11/14 19:24:25 wazuh-modulesd:vulnerability-detector: INFO: (5452): Starting vulnerability scanning.
    2019/11/14 19:24:25 wazuh-modulesd:vulnerability-detector: INFO: (5453): Vulnerability scanning finished.



See the alerts in Kibana
------------------------

Search Kibana for ``vulnerability-detector``, selecting some of the more helpful
fields for viewing like below:

    +---------------------------------------------------------------------------+
    | .. thumbnail:: ../images/learning-wazuh/labs/vuln-found-list.png          |
    |     :title: Found Vulnerabilities                                         |
    |     :align: center                                                        |
    |     :width: 100%                                                          |
    +---------------------------------------------------------------------------+

Expand one of the records to see all the information available:

    +---------------------------------------------------------------------------+
    | .. thumbnail:: ../images/learning-wazuh/labs/vuln-found.png               |
    |     :title: Vulnerability event                                           |
    |     :align: center                                                        |
    |     :width: 100%                                                          |
    +---------------------------------------------------------------------------+

Note all the available fields and remember that the different components of Wazuh
may be configured to act differently depending on the fields of each alert, as
well as the ability to create visualizations and filtering search results in Kibana.

.. note::

   When the field ``data.vulnerability.state`` has the value "Fixed", this
   indicates that the vulnerability has been corrected in future versions of
   the software. However the vulnerability is still present in the version
   installed in your system.

Look deeper with the Wazuh API:
-------------------------------

Up to now we have only seen the Wazuh API enable the Wazuh Kibana App to
interface directly with the Wazuh manager.  However, you can also access the
API directly from your own scripts or from the command line with curl.  This is
especially helpful here to obtain environment-wide package information.
The actual inventory data is kept in agent-specific databases on the Wazuh manager.
To see that, as well as other information collected by ``syscollector``, you can
query the Wazuh API.  Not only are software packages inventoried, but basic
hardware and operating system data is also tracked.

1. Run ``agent_control -l`` on the Wazuh Manager to list your agents as you will
   need to query the API by agent id number:

  .. code-block:: console

    Wazuh agent_control. List of available agents:
      ID: 000, Name: wazuh-manager (server), IP: localhost, Active/Local
      ID: 001, Name: RHEL7, IP: any, Active
      ID: 002, Name: Windows2012, IP: any, Active
      ID: 003, Name: Debian, IP: any, Active

2. From the Wazuh Manager, query the Wazuh API for scanned hardware data about
   agent 002.

  .. code-block:: console

    # curl -u foo:bar -k -X GET "http://localhost:55000/syscollector/002/hardware?pretty"

  Where ``foo:bar`` are the default credentials for the API.
  The results should look like this:

  .. code-block:: json

    {
       "error": 0,
       "data": {
          "cpu": {
             "cores": 1,
             "mhz": 2208,
             "name": "Intel(R) Core(TM) i7-8750H CPU @ 2.20GHz"
          },
          "ram": {
             "free": 1280472,
             "total": 2096692,
             "usage": 38
          },
          "scan": {
             "id": 1678215913,
             "time": "2019/11/15 14:04:48"
          },
          "board_serial": "0"
       }
    }


3. Next, query the Wazuh API for scanned OS data about agent 002.

  .. code-block:: console

    # curl -u foo:bar -k -X GET "http://localhost:55000/syscollector/002/os?pretty"

  The results should look like this:

  .. code-block:: json

    {
       "error": 0,
       "data": {
          "os": {
             "build": "9600",
             "major": "6",
             "minor": "3",
             "name": "Microsoft Windows Server 2012 R2 Standard",
             "version": "6.3.9600"
          },
          "scan": {
             "id": 1997683397,
             "time": "2019/11/15 14:04:48"
          },
          "version": "6.2",
          "hostname": "WINDOWS",
          "architecture": "x86_64"
       }
    }


4. You can also use the experimental capabilities of the API to list information
   of all agents in the environment. In order to do so it is necessary to enable
   this capability by editing the API's configuration file:

  .. code-block:: console

     sed -i 's/config.experimental_features  = false/config.experimental_features  = true/g' /var/ossec/api/configuration/config.js

5. Restart the Wazuh API service:

  a. For Systemd:

    .. code-block:: console

      # systemctl restart wazuh-api

  b. For SysV Init:

    .. code-block:: console

      # service wazuh-api restart


6. Let's list the versions of curl on all of our Linux systems:

  .. code-block:: console

    # curl -u foo:bar -k -X GET "http://localhost:55000/experimental/syscollector/packages?name=curl&pretty"

  The results should look like this:

  .. code-block:: json

      {
         "error": 0,
         "data": {
            "items": [
               {
                  "scan": {
                     "id": 1079269475,
                     "time": "2019/11/18 16:55:30"
                  },
                  "size": 527,
                  "architecture": "x86_64",
                  "format": "rpm",
                  "vendor": "CentOS",
                  "description": "A utility for getting files from remote servers (FTP, HTTP, and others)",
                  "install_time": "2019/06/01 17:14:25",
                  "version": "7.29.0-51.el7",
                  "name": "curl",
                  "section": "Applications/Internet",
                  "agent_id": "000"
               },
               {
                  "scan": {
                     "id": 462044543,
                     "time": "2019/11/18 16:56:18"
                  },
                  "size": 527,
                  "architecture": "x86_64",
                  "format": "rpm",
                  "vendor": "CentOS",
                  "description": "A utility for getting files from remote servers (FTP, HTTP, and others)",
                  "install_time": "2019/06/01 17:14:25",
                  "version": "7.29.0-51.el7",
                  "name": "curl",
                  "section": "Applications/Internet",
                  "agent_id": "001"
               }
            ],
            "totalItems": 2
         }
      }


.. note::
  Take time to read the online documentation about the Wazuh API.  It is a
  powerful utility that puts all sorts of data, configuration details, and
  state information at your fingertips once you know how to ask for it.



A quick peek at the actual agent databases
------------------------------------------

Agent-specific databases on the Wazuh manager store, among other things,
the ``syscollector`` scan results for each agent.

1. On the Wazuh Manager, list the tables in an agent's SQLite database:

  .. code-block:: console

    # sqlite3 /var/ossec/queue/db/001.db .tables

  You should see:

  .. code-block:: console

    ciscat_results        sca_policy            sys_netproto
    fim_entry             sca_scan_info         sys_osinfo
    metadata              scan_info             sys_ports
    pm_event              sys_hotfixes          sys_processes
    sca_check             sys_hwinfo            sys_programs
    sca_check_compliance  sys_netaddr           vuln_metadata
    sca_check_rules       sys_netiface

  The ``sys_`` table are populated by ``syscollector``.

2. Query the OS information table

  .. code-block:: console

    #  sqlite3 /var/ossec/queue/db/001.db 'select * from sys_osinfo;' -header

  You should see:

  .. code-block:: console

    scan_id|scan_time|hostname|architecture|os_name|os_version|os_codename|os_major|os_minor|os_build|os_platform|sysname|release|version|os_release
    1753634782|2019/11/18 16:56:18|agent|x86_64|CentOS Linux|7.7||7|7||centos|Linux|3.10.0-957.12.2.el7.x86_64|#1 SMP Tue May 14 21:24:32 UTC 2019|


3. Do a quick dump of the software packages.

  .. code-block:: console

    # sqlite3 /var/ossec/queue/db/001.db "select name,version,description from sys_programs;" -header

  You should see something like:

  .. code-block:: console

    name|version|description
    quota|1:4.01-17.el7|System administration tools for monitoring users' disk usage
    grub2-common|1:2.02-0.76.el7.centos.1|grub2 common layout
    pciutils|3.5.1-3.el7|PCI bus related utilities
    grub2-pc-modules|1:2.02-0.76.el7.centos.1|Modules used to build custom grub images
    libdrm|2.4.91-3.el7|Direct Rendering Manager runtime library
    bind-license|32:9.9.4-73.el7_6|License of the BIND DNS suite
    NetworkManager|1:1.12.0-10.el7_6|Network connection manager and user applications
    tzdata|2019a-1.el7|Timezone data
    gssproxy|0.7.0-21.el7|GSSAPI Proxy
    ...

Wazuh Kibana App
----------------

While the Wazuh API and SQLite databases let you get at the nitty-gritty data,
usually the most beautiful place to see your vulnerability detection results
is in the Wazuh Kibana App itself.  Both in the **Overview** section as well as
when you have drilled down into a specific agent, you can open the **Vulnerabilities**
tab to see a nice dashboard of this information:

    +---------------------------------------------------------------------------+
    | .. thumbnail:: ../images/learning-wazuh/labs/vuln-dash.png                |
    |     :title: flood                                                         |
    |     :align: center                                                        |
    |     :width: 100%                                                          |
    +---------------------------------------------------------------------------+



Optional exercise
-----------------

You could create a CDB for escalating alerts about your own custom set of high
priority CVEs.  Write a child rule of Wazuh rule 23501 that looks for a match in
this CDB and generates alerts of a high severity like 12.  Consider how you might
use a key/value CDB listing pairs of agent names and software package names that
you want to especially keep an eye on.  For example, you might want an escalated
alert about high-level CVE matches on the "apache" software package on your
Internet-facing web servers but not for other internal servers.
The possibilities are endless...
