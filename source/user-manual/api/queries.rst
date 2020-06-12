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

For example, to filter Ubuntu agents with an id higher than 9, the following query would be used:

.. code-block:: console

    # curl -X GET "https://localhost:55000/v4/agents?pretty=true&limit=500&q=os.name=ubuntu;id>9&select=id,name,os.name,os.version,os.codename,os.major" -H  "Authorization: Bearer <YOUR_JWT_TOKEN>"

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
                "id": "010",
                "name": "wazuh-agent10"
             },
             {
                "id": "011",
                "name": "wazuh-agent11"
             },
             {
                "id": "012",
                "name": "wazuh-agent12"
             }
          ],
          "total_affected_items": 3,
          "total_failed_items": 0,
          "failed_items": []
       },
       "message": "All selected agents information is shown"
    }

An example of using the OR operator can be filtering active or disconnected agents:

.. code-block:: console

    # curl -X GET "https://localhost:55000/v4/agents?pretty=true&q=status=active,status=disconnected&select=id,name,os.name,os.version,os.codename,os.major,status" -H  "Authorization: Bearer <YOUR_JWT_TOKEN>"

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
                "status": "active",
                "id": "000",
                "name": "wazuh-master"
             },
             {
                "os": {
                   "codename": "Bionic Beaver",
                   "major": "18",
                   "name": "Ubuntu",
                   "version": "18.04.2 LTS"
                },
                "status": "disconnected",
                "id": "009",
                "name": "wazuh-agent9"
             },
             {
                "os": {
                   "codename": "Bionic Beaver",
                   "major": "18",
                   "name": "Ubuntu",
                   "version": "18.04.2 LTS"
                },
                "status": "disconnected",
                "id": "010",
                "name": "wazuh-agent10"
             }
          ],
          "total_affected_items": 3,
          "total_failed_items": 0,
          "failed_items": []
       },
       "message": "All selected agents information is shown"
    }

Another example using the ``~`` operator is the following:

.. code-block:: console

    # curl -X GET "https://localhost:55000/v4/agents?pretty=true&q=os.platform~win" -H  "Authorization: Bearer <YOUR_JWT_TOKEN>"

.. code-block:: json
    :class: output

    {
       "data": {
          "affected_items": [
             {
                "os": {
                   "build": "7601",
                   "major": "6",
                   "minor": "1",
                   "name": "Microsoft Windows 7 Ultimate Edition Professional Service Pack 1",
                   "platform": "windows",
                   "uname": "Microsoft Windows 7 Ultimate Edition Professional Service Pack 1",
                   "version": "6.1.7601"
                },
                "dateAdd": "2020-06-12T08:14:31Z",
                "registerIP": "any",
                "status": "active",
                "mergedSum": "279579633ee2431d12f5a093a3010ed2",
                "node_name": "master-node",
                "lastKeepAlive": "2020-06-12T08:16:27Z",
                "id": "014",
                "name": "jmv74211-PC",
                "ip": "10.0.2.15",
                "version": "Wazuh v3.12.3",
                "configSum": "ab73af41699f13fdd81903b5f23d8d00",
                "manager": "wazuh-master",
                "group": [
                   "default"
                ]
             }
          ],
          "total_affected_items": 1,
          "total_failed_items": 0,
          "failed_items": []
       },
       "message": "All selected agents information is shown"
    }
