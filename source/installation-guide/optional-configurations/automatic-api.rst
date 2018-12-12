.. Copyright (C) 2018 Wazuh, Inc.

.. _automatic_api:

Insert a Wazuh API entry automatically
======================================

If you want to add the Wazuh API credentials on one of our apps more quickly (for instance, for deployment purposes) you can execute the following commands depending on your case.

Kibana app
----------

Execute the following command on the instance where Elasticsearch is installed:

.. code-block:: none

  # curl -X POST "http://<ELASTICSEARCH_IP>:9200/.wazuh/wazuh-configuration/1513629884013" -H 'Content-Type: application/json' -d'
  {
    "api_user": "<WAZUH_API_USERNAME>",
    "api_password": "<WAZUH_API_PASSWORD>",
    "url": "<WAZUH_API_URL>",
    "api_port": "<WAZUH_API_PORT>",
    "insecure": "true",
    "component": "API",
    "cluster_info" : {
      "manager" : "<WAZUH_MANAGER_HOSTNAME>",
      "cluster" : "<WAZUH_MANAGER_CLUSTER_NAME>",
      "status" : "<WAZUH_MANAGER_CLUSTER_STATUS>"
    },
    "extensions" : {
      "audit" : true,
      "pci" : true,
      "gdpr" : true,
      "oscap" : true,
      "ciscat" : false,
      "aws" : false,
      "virustotal" : false,
      "osquery" : false
    }
  }'

**Note the following:**

1. ``<ELASTICSEARCH_IP>`` is the URL to the Elasticsearch host.
2. The number used on the cURL command (``1513629884013``) is a random number used to identify the Wazuh API entry as unique. If you want to add more APIs, you must use a different number.
3. ``<WAZUH_API_USERNAME>`` and ``<WAZUH_API_PASSWORD>`` represent the Wazuh API credentials to be stored on the app.
4. The API password must be stored in *base64* format. Using ``echo -n '<WAZUH_API_PASSWORD>' | base64`` will return the password on the proper format to use.
5. ``<WAZUH_API_URL>`` and ``<WAZUH_API_PORT>`` are the full IP address and the port to the Wazuh API. The URL must include ``http://`` or ``https://``, depending on the current configuration.
6. ``<WAZUH_MANAGER_HOSTNAME>`` is the hostname of the instance where the Wazuh manager is installed. You can get this information just by running the ``hostname`` command on the manager host.
7. ``<WAZUH_MANAGER_CLUSTER_NAME>`` is the name of the Wazuh cluster. It's configured on the ``ossec.conf`` file. If you're not using the Wazuh cluster, use ``Disabled`` as the name.
8. ``<WAZUH_MANAGER_CLUSTER_STATUS>`` is the current status of the Wazuh cluster. Use ``enabled`` or ``disabled`` depending on your configuration.

Splunk app
----------

Execute the following command on the same instance where you installed the Wazuh app for Splunk:

.. code-block:: console

  # curl -X POST "http://<SPLUNK_IP>:<SPLUNK_PORT>/en-US/custom/SplunkAppForWazuh/manager/add_api?url=<WAZUH_API_URL>&portapi=<WAZUH_API_PORT>&userapi=<WAZUH_API_USERNAME>&passapi=<WAZUH_API_PASSWORD>"

**Note the following:**

1. ``<SPLUNK_IP>`` is the hostname or IP address of the Splunk instance where the app was installed.
2. ``<SPLUNK_PORT>`` is the port of the Splunk instance where the app was installed. By default, it's 8000.
3. ``<WAZUH_API_URL>``, ``<WAZUH_API_PORT>``, ``<WAZUH_API_USERNAME>`` and ``<WAZUH_API_PASSWORD>`` represent the Wazuh API credentials to be stored on the app. Keep in mind that the Wazuh API URL must include ``http://`` or ``https://``, depending on the current configuration.
