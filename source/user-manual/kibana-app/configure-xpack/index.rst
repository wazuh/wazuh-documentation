.. _configure_xpack:

Configure Wazuh app with X-Pack
==========================

X-Pack provides RBAC (role based access control) capabilities, among other features, for the Elastic Stack.

This guide provides steps to configure specific users to use the Wazuh app with X-Pack.

Preparation
------------

.. note:: Follow the official Elastic guide https://www.elastic.co/downloads/x-pack for a more in depth explanation.

Follow the next steps to install X-Pack:

1. Install X-Pack plugin for Elasticsearch:

  .. code-block:: console

    # /usr/share/elasticsearch/bin/elasticsearch-plugin install x-pack
    
2. Restart Elasticsearch:

  .. code-block:: console

    # systemctl restart elasticsearch

It's important to wait until Elasticsearch finishes loading. Check the current status with the following command:

.. code-block:: console

  # curl localhost:9200/?pretty -u elastic:elastic_password

  { 
    "name" : "5urh-FJ",
    "cluster_name" : "elasticsearch",
    "cluster_uuid" : "B5rXKBg2Tr-KWwFdbDHJQg",
    "version" : {
      "number" : "6.2.3",
      "build_hash" : "7299dc3",
      "build_date" : "2018-02-07T19:34:26.990113Z",
      "build_snapshot" : false,
      "lucene_version" : "7.2.1",
      "minimum_wire_compatibility_version" : "5.6.0",
      "minimum_index_compatibility_version" : "5.0.0"
    },
    "tagline" : "You Know, for Search"
  }


3. Generate X-Pack credentials and note them down:

  .. code-block:: console

    # /usr/share/elasticsearch/bin/x-pack/setup-passwords auto


4. Install X-Pack plugin for Kibana:

  .. code-block:: console

    # /usr/share/kibana/bin/kibana-plugin install x-pack


5. Temporarily set the `elastic` user for Kibana, edit /etc/kibana/kibana.yml as follow:

  .. code-block:: console

    elasticsearch.username: "elastic"
    elasticsearch.password: "elastic_password"


6. Restart Kibana

  .. code-block:: console

    # systemctl restart kibana


7. Login into Kibana UI using the `elastic` user when prompted.

.. topic:: Contents

    .. toctree::
        :maxdepth: 1

        create-xpack-users
        configure-xpack-users
        xpack-troubleshooting
