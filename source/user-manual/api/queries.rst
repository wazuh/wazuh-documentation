.. Copyright (C) 2019 Wazuh, Inc.

.. _queries:

Filtering data using queries
============================

.. versionadded:: 3.7.0

Advance filtering is possible using the Wazuh API's queries. Queries are specified using the ``q`` parameter. A query has the following structure:

* **Field name**: Field name to filter by. If an incorrect field name is used, an error will be raised.
* **Operator**: Operator to filter by:
    * ``=``: equality.
    * ``!=``: not equality.
    * ``<``: smaller.
    * ``>``: bigger.
    * ``~``: like as.
* **Value**: Value to filter filter by.
* **Separator**: Operator to join multiple "queries":
    * ``,``: represents an ``OR``.
    * ``;``: represents an ``AND``.

Examples
--------

Filtering agents by OS name and OS version
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

For example, to filter Ubuntu agents with a version higher than 12, the following query would be used:

.. code-block:: console

    # curl -u foo:bar -X GET "http://localhost:55000/agents?pretty&q=os.name=ubuntu;os.version>12&select=id,name,os.name,os.version,os.codename,os.major"
    {
        "error": 0,
        "data": {
            "totalItems": 2,
            "items": [
                {
                    "os": {
                    "codename": "Bionic Beaver",
                    "version": "18.04.1 LTS",
                    "major": "18",
                    "name": "Ubuntu"
                    },
                    "name": "wazuh",
                    "id": "000"
                },
                {
                    "os": {
                    "codename": "Xenial Xerus",
                    "version": "16.04.5 LTS",
                    "major": "16",
                    "name": "Ubuntu"
                    },
                    "name": "ubuntu",
                    "id": "001"
                }
            ]
        }
    }

The same field can be used multiple times to get a more accurate result. For example, filtering agents with a version higher than Ubuntu 12 but lower than Ubuntu 18:

.. code-block:: console

    # curl -u foo:bar -X GET "http://localhost:55000/agents?pretty&q=os.name=ubuntu;os.version>12;os.version<18&select=id,name,os.name,os.version,os.codename,os.major"
    {
        "error": 0,
        "data": {
            "totalItems": 1,
            "items": [
                {
                    "os": {
                    "codename": "Xenial Xerus",
                    "version": "16.04.5 LTS",
                    "major": "16",
                    "name": "Ubuntu"
                    },
                    "name": "ubuntu",
                    "id": "001"
                }
            ]
        }
    }

An example of using the OR operator can be filtering Ubuntu or CentOS agents:

.. code-block:: console

    # curl -u foo:bar -X GET "http://localhost:55000/agents?pretty&q=os.name=ubuntu,os.name=centos+linux&select=id,name,os.name,os.version,os.codename,os.major"
    {
        "error": 0,
        "data": {
            "totalItems": 3,
            "items": [
                {
                    "os": {
                    "codename": "Bionic Beaver",
                    "version": "18.04.1 LTS",
                    "major": "18",
                    "name": "Ubuntu"
                    },
                    "name": "wazuh",
                    "id": "000"
                },
                {
                    "os": {
                    "codename": "Xenial Xerus",
                    "version": "16.04.5 LTS",
                    "major": "16",
                    "name": "Ubuntu"
                    },
                    "name": "ubuntu",
                    "id": "001"
                },
                {
                    "os": {
                    "codename": "Core",
                    "version": "7",
                    "major": "7",
                    "name": "CentOS Linux"
                    },
                    "name": "centos7",
                    "id": "002"
                }
            ]
        }
    }

Another example using the ``~`` operator is the following:

.. code-block:: console

    # curl -u foo:bar -X GET "http://localhost:55000/agents?pretty&q=os.name~cent"
    {
        "error": 0,
        "data": {
            "items": [
                {
                    "os": {
                    "arch": "x86_64",
                    "codename": "Core",
                    "major": "7",
                    "name": "CentOS Linux",
                    "platform": "centos",
                    "uname": "Linux |localhost.localdomain |3.10.0-862.11.6.el7.x86_64 |#1 SMP Tue Aug 14 21:49:04 UTC 2018 |x86_64",
                    "version": "7"
                    },
                    "name": "agent002",
                    "configSum": "ab73af41699f13fdd81903b5f23d8d00",
                    "node_name": "master",
                    "status": "Active",
                    "lastKeepAlive": "2018-10-16 16:36:36",
                    "mergedSum": "bcb219b9b009801f3b29eb9e00a6a88d",
                    "id": "002",
                    "group": [
                    "default"
                    ],
                    "manager": "localhost.localdomain",
                    "version": "Wazuh v3.7.0",
                    "dateAdd": "2018-10-16 13:34:24",
                    "ip": "192.168.122.19"
                }
            ],
            "totalItems": 1
        }
    }


Filtering rootcheck events by date
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The following example shows how to check rootcheck events generated in a specified timeframe:

.. code-block:: console

    # curl -u foo:bar -X GET "http://localhost:55000/rootcheck/001?pretty&q=oldDay<3h25m&limit=2"
    {
        "error": 0,
        "data": {
            "totalItems": 7,
            "items": [
                {
                    "status": "outstanding",
                    "oldDay": "2018-10-03 12:47:26",
                    "event": "Ending CIS-CAT scan. File: /var/ossec/wodles/ciscat/benchmarks/CIS_Ubuntu_Linux_16.04_LTS_Benchmark_v1.0.0-xccdf.xml. ",
                    "readDay": "2018-10-03 15:44:53"
                },
                {
                    "status": "outstanding",
                    "oldDay": "2018-10-03 12:46:06",
                    "event": "Starting CIS-CAT scan. File: /var/ossec/wodles/ciscat/benchmarks/CIS_Ubuntu_Linux_16.04_LTS_Benchmark_v1.0.0-xccdf.xml. ",
                    "readDay": "2018-10-03 15:44:18"
                }
            ]
        }
    }


A more precise timeframe can be specified using operators ``>`` and ``<`` together:

.. code-block:: console

    # curl -u foo:bar -X GET "http://localhost:55000/rootcheck/001?pretty&q=oldDay<3h30m;oldDay>3h&limit=2"
    {
        "error": 0,
        "data": {
            "totalItems": 7,
            "items": [
                {
                    "status": "outstanding",
                    "oldDay": "2018-10-03 12:47:26",
                    "event": "Ending CIS-CAT scan. File: /var/ossec/wodles/ciscat/benchmarks/CIS_Ubuntu_Linux_16.04_LTS_Benchmark_v1.0.0-xccdf.xml. ",
                    "readDay": "2018-10-03 15:44:53"
                },
                {
                    "status": "outstanding",
                    "oldDay": "2018-10-03 12:46:06",
                    "event": "Starting CIS-CAT scan. File: /var/ossec/wodles/ciscat/benchmarks/CIS_Ubuntu_Linux_16.04_LTS_Benchmark_v1.0.0-xccdf.xml. ",
                    "readDay": "2018-10-03 15:44:18"
                }
            ]
        }
    }
