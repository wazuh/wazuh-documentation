.. Copyright (C) 2018 Wazuh, Inc.

.. _queries:

Filtering data using queries
============================

.. versionadded:: 3.7.0

Advance filtering is possible using the Wazuh API's queries. Queries are translated directly into SQL sentences which will be used to filter the results returned by the API. Queries are specified using the ``q`` parameter. A query has the following structure:

* **Field name**: Field name to filter by. If an incorrect field name is used, an error will be raised.
* **Operator**: Operator to filter by. Available operators are ``=``, ``!=``, ``<`` and ``>``.
* **Value**: Value to filter filter by.
* **Separator**: Operator to join multiple "queries":

    * ``,``: represents an ``OR``.
    * ``;``: represents an ``AND``.

Examples
--------

Filtering agents by OS name and OS version
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

For example, to filter ubuntu agents with a version higher than 12, the following query would be used:

.. code-block:: javascript

    $ curl -u foo:bar "localhost:55000/agents?pretty&q=os.name=ubuntu;os.version>12&select=id,name,os.name,os.version,os.codename,os.major"
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

.. code-block:: javascript

    $ curl -u foo:bar "localhost:55000/agents?pretty&q=os.name=ubuntu;os.version>12;os.version<18&select=id,name,os.name,os.version,os.codename,os.major"
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

.. code-block:: javascript

    $ curl -u foo:bar "localhost:55000/agents?pretty&q=os.name=ubuntu,os.name=centos+linux&select=id,name,os.name,os.version,os.codename,os.major"
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

Filtering syscheck events by date
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The following example shows how to check Syscheck events generated in a specified timeframe:

.. code-block:: javascript

    $ curl -u foo:bar "localhost:55000/syscheck/000?pretty&q=scanDate<9h15m"
    {
        "error": 0,
        "data": {
            "totalItems": 43,
            "items": [
                {
                    "sha1": "e1f8ab9e7928e7668ec6105ddb07674888053094",
                    "group": "root",
                    "user": "root",
                    "file": "/etc/emacs/site-start.d/50python-docutils.el",
                    "modificationDate": "2018-02-13 14:13:09",
                    "octalMode": "100644",
                    "size": 466,
                    "inode": 303072,
                    "event": "modified",
                    "md5": "4990891acb4f250008e154560e9f235d",
                    "scanDate": "2018-08-22 18:51:43"
                },
                {
                    "sha1": "3a14e8015b58f225528c141257659502d7da61f3",
                    "group": "root",
                    "user": "root",
                    "file": "/etc/alternatives/rst2html5",
                    "modificationDate": "2018-08-22 16:38:16",
                    "octalMode": "120777",
                    "size": 45,
                    "inode": 186570,
                    "event": "modified",
                    "md5": "79c10890a4abc6aac3a74f135bd1c56a",
                    "scanDate": "2018-08-22 18:51:46"
                },
                [...]
            ]
        }
    }

A more precise timeframe can be specified using operators ``>`` and ``<`` together:

.. code-block:: javascript

    $ curl -u foo:bar "localhost:55000/syscheck/000?pretty&q=scanDate<12h;scanDate>11h&limit=2"
    {
        "error": 0,
        "data": {
            "totalItems": 53,
            "items": [
                {
                    "sha1": "3dec5570307472381671ff18bbe4d4be09951690",
                    "group": "root",
                    "user": "root",
                    "file": "/etc/sgml/xml-core.cat",
                    "modificationDate": "2017-09-18 17:52:45",
                    "octalMode": "100644",
                    "size": 45,
                    "inode": 302983,
                    "event": "modified",
                    "md5": "055ba0bd3154c0a58b9bf8a0c9ecf2fa",
                    "scanDate": "2018-08-22 18:51:40"
                },
                {
                    "sha1": "fd2defc6bd5841a14ae93af311d7876f0aeab697",
                    "group": "root",
                    "user": "root",
                    "file": "/etc/sgml/docutils-common.cat",
                    "modificationDate": "2018-02-13 14:13:09",
                    "octalMode": "100644",
                    "size": 40,
                    "inode": 303074,
                    "event": "modified",
                    "md5": "07d0fedda91cf07511ba147169574df9",
                    "scanDate": "2018-08-22 18:51:40"
                }
            ]
        }
    }

