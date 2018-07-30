.. Copyright (C) 2018 Wazuh, Inc.

.. _osquery:

Osquery
============

.. versionadded:: 3.5.0 

- `How it works`_
- `Configuration`_
- `Alert examples`_

How it works
------------
Osquery can be used to expose an operating system as a high-performance relational database. This allows you to write SQL-based queries to explore operating system data.

Bellow you can see some examples of the queries we can make:

List all the local users of the machine.

.. code-block:: sql

    SELECT * FROM users; 

Get the process name, port, and PID, for processes listening on all interfaces.

.. code-block:: sql

    SELECT DISTINCT processes.name, listening_ports.port, processes.pid
    FROM listening_ports JOIN processes USING (pid)
    WHERE listening_ports.address = '0.0.0.0';

Check the processes that have a deleted executable.

.. code-block:: sql

    SELECT * FROM processes WHERE on_disk = 0;

A complete list of all the available tables can be found `here <https://osquery.io/schema/3.2.6/>`_.

Configuration
-------------
The first thing we need is to install osquery in our system. To install osquery we must go to the osquery official `download page <https://osquery.io/downloads/official/3.2.6/>`_ and get the version compatible with our operating system.

Once we have it installed, we will need a configuration file for osquery. If you don't have any, you can use the following one provided by Wazuh:

.. code-block:: console

    {
        "options": {
            "config_plugin": "filesystem",
            "logger_plugin": "filesystem",
            "utc": "true"
        },

        "schedule": {
            "system_info": {
            "query": "SELECT hostname, cpu_brand, physical_memory FROM system_info;",
            "interval": 3600
            },
            "high_load_average": {
            "query": "SELECT period, average, '70%' AS 'threshold' FROM load_average WHERE period = '15m' AND average > '0.7';",
            "interval": 900,
            "description": "Report if load charge is over 70 percent."
            },
            "low_free_memory": {
            "query": "SELECT memory_total, memory_free, CAST(memory_free AS real) / memory_total AS memory_free_perc, '10%' AS threshold FROM memory_info WHERE memory_free_perc < 0.1;",
            "interval": 1800,
            "description": "Free RAM is under 10%."
            }
        },

        "packs": {
            "osquery-monitoring": "/usr/share/osquery/packs/osquery-monitoring.conf",
            "incident-response": "/usr/share/osquery/packs/incident-response.conf",
            "it-compliance": "/usr/share/osquery/packs/it-compliance.conf",
            "vuln-management": "/usr/share/osquery/packs/vuln-management.conf",
            "hardware-monitoring": "/usr/share/osquery/packs/hardware-monitoring.conf",
            "ossec-rootkit": "/usr/share/osquery/packs/ossec-rootkit.conf"
        }
    }

As you can see in this sample configuration, ``system_info``, ``high_load_average`` and ``low_free_memory`` queries will be executed every hour. 

Furthermore, this configuration uses some default packs such as ``osquery-monitoring``, ``hardware-monitoring`` or ``ossec-rootkit`` among others. You can define you own packs and use it with this wodle.

Alert examples
--------------
Sample alert in log format: 

.. code-block:: console

    ** Alert 1532958886.437707: - osquery,
        2018 Jul 30 13:54:46 manager->osquery
        Rule: 24010 (level 3) -> 'osquery data grouped'
        {"name":"system_info","hostIdentifier":"manager","calendarTime":"Mon Jul 30 13:54:45 2018 UTC","unixTime":1532958885,"epoch":0,"counter":461,"columns":{"cgroup_namespace":"4026531835","cmdline":"","cwd":"/","disk_bytes_read":"0","disk_bytes_written":"0","egid":"0","euid":"0","gid":"0","ipc_namespace":"4026531839","mnt_namespace":"4026531840","name":"migration/0","net_namespace":"4026531957","nice":"0","on_disk":"-1","parent":"2","path":"","pgroup":"0","pid":"9","pid_namespace":"4026531836","resident_size":"","root":"/","sgid":"0","start_time":"0","state":"S","suid":"0","system_time":"2","threads":"1","total_size":"","uid":"0","user_namespace":"4026531837","user_time":"0","uts_namespace":"4026531838","wired_size":"0"},"action":"added"}
        name: system_info
        hostIdentifier: manager
        calendarTime: Mon Jul 30 13:54:45 2018 UTC
        unixTime: 1532958885
        epoch: 0
        counter: 461
        columns.cgroup_namespace: 4026531835
        columns.cmdline: 
        columns.cwd: /
        columns.disk_bytes_read: 0
        columns.disk_bytes_written: 0
        columns.egid: 0
        columns.euid: 0
        columns.gid: 0
        columns.ipc_namespace: 4026531839
        columns.mnt_namespace: 4026531840
        columns.name: migration/0
        columns.net_namespace: 4026531957
        columns.nice: 0
        columns.on_disk: -1
        columns.parent: 2
        columns.path: 
        columns.pgroup: 0
        columns.pid: 9
        columns.pid_namespace: 4026531836
        columns.resident_size: 
        columns.root: /
        columns.sgid: 0
        columns.start_time: 0
        columns.state: S
        columns.suid: 0
        columns.system_time: 2
        columns.threads: 1
        columns.total_size: 
        columns.uid: 0
        columns.user_namespace: 4026531837
        columns.user_time: 0
        columns.uts_namespace: 4026531838
        columns.wired_size: 0

And the same alert in ``JSON`` format:

.. code-block:: json

    {
    "timestamp": "2018-07-30T13:54:46.476+0000",
    "rule": {
        "level": 3,
        "description": "osquery data grouped",
        "id": "24010",
        "firedtimes": 207,
        "mail": false,
        "groups": [
        "osquery"
        ]
    },
    "agent": {
        "id": "000",
        "name": "manager"
    },
    "manager": {
        "name": "manager"
    },
    "id": "1532958886.437707",
    "full_log": "{\"name\":\"system_info\",\"hostIdentifier\":\"manager\",\"calendarTime\":\"Mon Jul 30 13:54:45 2018 UTC\",\"unixTime\":1532958885,\"epoch\":0,\"counter\":461,\"columns\":{\"cgroup_namespace\":\"4026531835\",\"cmdline\":\"\",\"cwd\":\"/\",\"disk_bytes_read\":\"0\",\"disk_bytes_written\":\"0\",\"egid\":\"0\",\"euid\":\"0\",\"gid\":\"0\",\"ipc_namespace\":\"4026531839\",\"mnt_namespace\":\"4026531840\",\"name\":\"migration/0\",\"net_namespace\":\"4026531957\",\"nice\":\"0\",\"on_disk\":\"-1\",\"parent\":\"2\",\"path\":\"\",\"pgroup\":\"0\",\"pid\":\"9\",\"pid_namespace\":\"4026531836\",\"resident_size\":\"\",\"root\":\"/\",\"sgid\":\"0\",\"start_time\":\"0\",\"state\":\"S\",\"suid\":\"0\",\"system_time\":\"2\",\"threads\":\"1\",\"total_size\":\"\",\"uid\":\"0\",\"user_namespace\":\"4026531837\",\"user_time\":\"0\",\"uts_namespace\":\"4026531838\",\"wired_size\":\"0\"},\"action\":\"added\"}",
    "decoder": {
        "name": "json"
    },
    "data": {
        "action": "added",
        "name": "system_info",
        "hostIdentifier": "manager",
        "calendarTime": "Mon Jul 30 13:54:45 2018 UTC",
        "unixTime": "1532958885",
        "epoch": "0",
        "counter": "461",
        "columns": {
            "cgroup_namespace": "4026531835",
            "cmdline": "",
            "cwd": "/",
            "disk_bytes_read": "0",
            "disk_bytes_written": "0",
            "egid": "0",
            "euid": "0",
            "gid": "0",
            "ipc_namespace": "4026531839",
            "mnt_namespace": "4026531840",
            "name": "migration/0",
            "net_namespace": "4026531957",
            "nice": "0",
            "on_disk": "-1",
            "parent": "2",
            "path": "",
            "pgroup": "0",
            "pid": "9",
            "pid_namespace": "4026531836",
            "resident_size": "",
            "root": "/",
            "sgid": "0",
            "start_time": "0",
            "state": "S",
            "suid": "0",
            "system_time": "2",
            "threads": "1",
            "total_size": "",
            "uid": "0",
            "user_namespace": "4026531837",
            "user_time": "0",
            "uts_namespace": "4026531838",
            "wired_size": "0"
        }
    },
    "predecoder": {
        "hostname": "manager"
    },
    "location": "osquery"
    }

.. note::
    If more than one report with the same content is received, only one alert will be generated the first time. The rest will be discarded.