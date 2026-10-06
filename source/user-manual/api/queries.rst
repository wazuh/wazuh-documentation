.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Advance filtering is possible using the Wazuh API's queries. Learn more about it in this section of the Wazuh documentation.
 
.. _queries:

Filtering data using Wazuh Query Language (WQL)
===============================================

Advance filtering is possible using the Wazuh API's queries. Queries are specified using the ``q`` parameter. A query has the following structure:

* **Field name**: Field name to filter by. If an incorrect field name is used, an error will be raised.
* **Operator**: Operator to filter by:
    * ``=``: equality.
    * ``!=``: not equality.
    * ``<``: smaller.
    * ``>``: bigger.
    * ``~``: like as.
    * ``()``: grouping operators.
* **Value**: Value to filter by.
* **Separator**: Operator to join multiple "queries":
    * ``,``: represents an ``OR``.
    * ``;``: represents an ``AND``.

.. note::
    Reserved characters need to be percent-encoded, especially semicolons (``;`` → ``%3B``). You can use ``--data-urlencode`` inside cURL to make the process easier.

Examples
--------

For example, to filter Ubuntu agents with a version higher than 18, the following query would be used. Remember that the value of the parameter q is being encoded with ``--data-urlencode``:

.. code-block:: console

    # curl -G --data-urlencode "q=os.name=ubuntu;os.version>18" -k -X GET "https://localhost:55000/agents?limit=500&pretty=true&select=id,name,os.name,os.version,os.codename,os.major" -H  "Authorization: Bearer $TOKEN"

.. code-block:: json
    :class: output

    {
       "data": {
          "affected_items": [
             {
                "os": {
                   "codename": "Bionic Beaver",
                   "major": "18",
                   "name": "Ubuntu",
                   "version": "18.04.4 LTS"
                },
                "name": "wazuh-master",
                "id": "000"
             },
             {
                "os": {
                   "codename": "Bionic Beaver",
                   "major": "18",
                   "name": "Ubuntu",
                   "version": "18.04.4 LTS"
                },
                "name": "wazuh-agent4",
                "id": "004"
             },
             {
                "os": {
                   "codename": "Bionic Beaver",
                   "major": "18",
                   "name": "Ubuntu",
                   "version": "18.04.4 LTS"
                },
                "name": "wazuh-agent5",
                "id": "005"
             },
             {
                "os": {
                   "codename": "Bionic Beaver",
                   "major": "18",
                   "name": "Ubuntu",
                   "version": "18.04.4 LTS"
                },
                "name": "wazuh-agent6",
                "id": "006"
             },
             {
                "os": {
                   "codename": "Bionic Beaver",
                   "major": "18",
                   "name": "Ubuntu",
                   "version": "18.04.4 LTS"
                },
                "name": "wazuh-agent7",
                "id": "007"
             },
             {
                "os": {
                   "codename": "Bionic Beaver",
                   "major": "18",
                   "name": "Ubuntu",
                   "version": "18.04.4 LTS"
                },
                "name": "wazuh-agent8",
                "id": "008"
             },
             {
                "os": {
                   "codename": "Bionic Beaver",
                   "major": "18",
                   "name": "Ubuntu",
                   "version": "18.04.2 LTS"
                },
                "name": "wazuh-agent9",
                "id": "009"
             },
             {
                "os": {
                   "codename": "Bionic Beaver",
                   "major": "18",
                   "name": "Ubuntu",
                   "version": "18.04.2 LTS"
                },
                "name": "wazuh-agent10",
                "id": "010"
             }
          ],
          "total_affected_items": 8,
          "total_failed_items": 0,
          "failed_items": []
       },
       "message": "All selected agents information was returned",
       "error": 0
    }

The same field can be used multiple times to get a more accurate result. For example, filtering agents with a version higher than Ubuntu 18 but lower than Ubuntu 18.04.4:

.. code-block:: console

    # curl -G --data-urlencode "q=os.name=ubuntu;os.version>18;os.version<18.04.4" -k -X GET "https://localhost:55000/agents?limit=500&pretty=true&select=id,name,os.name,os.version,os.codename,os.major" -H  "Authorization: Bearer $TOKEN"

.. code-block:: json
    :class: output

    {
       "data": {
          "affected_items": [
             {
                "os": {
                   "codename": "Bionic Beaver",
                   "major": "18",
                   "name": "Ubuntu",
                   "version": "18.04.2 LTS"
                },
                "name": "wazuh-agent9",
                "id": "009"
             },
             {
                "os": {
                   "codename": "Bionic Beaver",
                   "major": "18",
                   "name": "Ubuntu",
                   "version": "18.04.2 LTS"
                },
                "name": "wazuh-agent10",
                "id": "010"
             }
          ],
          "total_affected_items": 2,
          "total_failed_items": 0,
          "failed_items": []
       },
       "message": "All selected agents information was returned",
       "error": 0
    }

An example of using the OR (``,``) operator and LIKE AS (``~``) can be filtering agents whose operating system name contains *windows* or *centos*.

.. code-block:: console

    # curl -G --data-urlencode "q=os.name~centos,os.name~windows" -k -X GET "https://localhost:55000/agents?limit=500&pretty=true&select=id,name,os.name,os.version,os.codename,os.major" -H  "Authorization: Bearer $TOKEN"

.. code-block:: json
    :class: output

    {
       "data": {
          "affected_items": [
             {
                "os": {
                   "major": "6",
                   "name": "Microsoft Windows 7 Ultimate Edition Professional Service Pack 1",
                   "version": "6.1.7601"
                },
                "name": "jmv74211-PC",
                "id": "013"
             }
          ],
          "total_affected_items": 1,
          "total_failed_items": 0,
          "failed_items": []
       },
       "message": "All selected agents information was returned",
       "error": 0
    }

Getting the ubuntu agents with id other than 0 and lower than 4, whose name contains the substring ``waz`` and whose major version is 16 or 18, is an example that involves multiple operators at the same time:

.. code-block:: console

    # curl -G --data-urlencode "q=id!=0;id<4;name~waz;(os.major=16,os.major=18)" -k -X GET "https://localhost:55000/agents?limit=500&pretty=true&select=id,name,os.name,os.version,os.codename,os.major" -H  "Authorization: Bearer $TOKEN"

.. code-block:: json
    :class: output

    {
       "data": {
          "affected_items": [
             {
                "os": {
                   "codename": "Xenial Xerus",
                   "major": "16",
                   "name": "Ubuntu",
                   "version": "16.04.6 LTS"
                },
                "name": "wazuh-agent1",
                "id": "001"
             },
             {
                "os": {
                   "codename": "Xenial Xerus",
                   "major": "16",
                   "name": "Ubuntu",
                   "version": "16.04.6 LTS"
                },
                "name": "wazuh-agent2",
                "id": "002"
             },
             {
                "os": {
                   "codename": "Xenial Xerus",
                   "major": "16",
                   "name": "Ubuntu",
                   "version": "16.04.6 LTS"
                },
                "name": "wazuh-agent3",
                "id": "003"
             }
          ],
          "total_affected_items": 3,
          "total_failed_items": 0,
          "failed_items": []
       },
       "message": "All selected agents information was returned",
       "error": 0
    }

Getting agents with an ID higher than ``007`` that run on *Windows* or whose operating system major version is either 14 or 18:


.. code-block:: console

    # curl -G --data-urlencode "q=id>007;(os.name~windows,(os.major=14,os.major=18))" -k -X GET "https://localhost:55000/agents?limit=500&pretty=true&select=id,name,os.name,os.version,os.codename,os.major" -H  "Authorization: Bearer $TOKEN"

.. code-block:: json
    :class: output

    {
       "data": {
          "affected_items": [
             {
                "os": {
                   "codename": "Bionic Beaver",
                   "major": "18",
                   "name": "Ubuntu",
                   "version": "18.04.4 LTS"
                },
                "name": "wazuh-agent8",
                "id": "008"
             },
             {
                "os": {
                   "codename": "Bionic Beaver",
                   "major": "18",
                   "name": "Ubuntu",
                   "version": "18.04.2 LTS"
                },
                "name": "wazuh-agent9",
                "id": "009"
             },
             {
                "os": {
                   "codename": "Bionic Beaver",
                   "major": "18",
                   "name": "Ubuntu",
                   "version": "18.04.2 LTS"
                },
                "name": "wazuh-agent10",
                "id": "010"
             },
             {
                "os": {
                   "major": "6",
                   "name": "Microsoft Windows 7 Ultimate Edition Professional Service Pack 1",
                   "version": "6.1.7601"
                },
                "name": "jmv74211-PC",
                "id": "013"
             }
          ],
          "total_affected_items": 4,
          "total_failed_items": 0,
          "failed_items": []
       },
       "message": "All selected agents information was returned",
       "error": 0
    }