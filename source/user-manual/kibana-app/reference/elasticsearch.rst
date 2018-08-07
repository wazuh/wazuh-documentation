.. Copyright (C) 2018 Wazuh, Inc.

.. _elasticsearch:

Elasticsearch indices
=====================

Once you've installed the Wazuh app some new indices will be generated in Elasticsearch. Let's see a more in deep view about them.
The user shouldn't take care about them and shouldn't modify them unless the Wazuh team suggest it.

The ``.wazuh`` index
--------------------

This index is used by the Wazuh app to store Wazuh API credentials and useful information about the Wazuh manager currently being used.
The next document example shows you how we store a Wazuh API entry. This index could grow up if you add more Wazuh API entries.

.. code-block:: console

    {
        "api_user" : "foo",
        "api_password" : "YmFy",
        "url" : "http://localhost",
        "api_port" : "55000",
        "insecure" : "true",
        "component" : "API",
        "cluster_info" : {
            "manager" : "osboxes",
            "cluster" : "Disabled",
            "status" : "disabled"
        },
        "extensions" : {
        "audit" : true,
        "pci" : false,
        "gdpr" : true,
        "oscap" : true,
        "aws" : false,
        "virustotal" : false
        }
    }


The ``.wazuh-version`` index
----------------------------

This index has only one document and it includes useful information and it's being used by internal Wazuh app purposes. It includes information such your current version or your installation date. The next example shows you how we store that information.

.. code-block:: console

    {
        "name" : "Wazuh app",
        "app-version" : "3.2.2",
        "revision" : "0390",
        "installationDate" : "2018-04-27T08:56:16.088Z",
        "lastRestart" : "2018-05-22T07:13:30.327Z"
    }

The ``.kibana`` index
---------------------

This index is mainly used by Kibana itself. It's useful to tell Kibana how are the index patterns we are using along other technical details. This index should be similar for any user and it's a bit long to show its content here. Also its content is useless for the user knowledge.

The ``wazuh-alerts-3.x-`` indices
---------------------------------

They are auto-generated and they store the Wazuh alerts. Logstash will send data to Elasticsearch and will create an index per day.

The ``wazuh-monitoring-3.x-`` indices
-------------------------------------

They are auto-generated and they store the Wazuh agents statuses periodically. The Wazuh app is which will send data to Elasticsearch and will create an index per day. This feature can be disabled. You can also adjust the insertion frequency. These indices are mainly used by the ``Agents status`` visualization from the Overview dashboard in the Wazuh app.

More information
----------------

- `Elasticsearch documentation - Exploring Your Cluster <https://www.elastic.co/guide/en/elasticsearch/reference/6.3/_exploring_your_cluster.html>`_
