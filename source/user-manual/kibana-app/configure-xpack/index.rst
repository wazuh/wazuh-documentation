.. Copyright (C) 2018 Wazuh, Inc.

.. _kibana_xpack:

Configure the app with X-Pack
=============================

X-Pack provides RBAC (role based access control) capabilities, among other features, for the Elastic Stack. This guide provides steps to configure specific users to use the Wazuh app with X-Pack.

.. note::

    As of the 6.3.0 version of the Elastic Stack, X-Pack comes pre-installed on the Elastic products. You can read more about this on their `announcement <https://www.elastic.co/blog/elastic-stack-6-3-0-released>`_.

.. warning::

    If you're using the OSS (Apache license) distribution of the Elastic Stack packages, X-Pack is not available.

Follow these steps to enable X-Pack:

1. Open *Management > License Management* on the Kibana interface. On this section, you can choose between a free 30-day trial to try the advanced X-Pack features, or insert a license if you already purchased one.

.. image:: ../../../images/kibana-app/configure-xpack/license-management.png
  :align: center
  :width: 100%

2. Enable the Security plugin on Elasticsearch. Open the ``/etc/elasticsearch/elasticsearch.yml`` file and set this option to ``true``:

  .. code-block:: yaml

    # Set this option in /etc/elasticsearch/elasticsearch.yml
    xpack.security.enabled: true

3. Create the passwords for the built-in users. The *interactive* mode prompts the user to enter new passwords for the ``elastic``, ``kibana``, ``logstash_system``, and ``beats_system`` users:

  .. code-block:: console

    # /usr/share/elasticsearch/bin/elasticsearch-setup-passwords interactive

.. note::

    Find more information about built-in users in `this Elastic documentation article <https://www.elastic.co/guide/en/elastic-stack-overview/current/built-in-users.html>`_.

4. Restart Elasticsearch:

  .. code-block:: console

    # systemctl restart elasticsearch

  It's important to wait until Elasticsearch finishes loading. Check the current status with the following command:

  .. code-block:: console

    # curl localhost:9200/?pretty -u elastic:<elastic_password>

    {
      "name" : "116m4ct",
      "cluster_name" : "elasticsearch",
      "cluster_uuid" : "2TbJlE6MRBKB6uHybVSQJA",
      "version" : {
        "number" : "6.3.0",
        "build_flavor" : "default",
        "build_type" : "deb",
        "build_hash" : "424e937",
        "build_date" : "2018-06-11T23:38:03.357887Z",
        "build_snapshot" : false,
        "lucene_version" : "7.3.1",
        "minimum_wire_compatibility_version" : "5.6.0",
        "minimum_index_compatibility_version" : "5.0.0"
      },
      "tagline" : "You Know, for Search"
    }

5. Temporarily set the `elastic` user for Kibana, editing the ``/etc/kibana/kibana.yml`` file as follow:

  .. code-block:: yaml

    # Set these options in /etc/kibana/kibana.yml
    elasticsearch.username: "elastic"
    elasticsearch.password: "<elastic_password>"

6. Restart Kibana

  .. code-block:: console

    # systemctl restart kibana

7. Login into the Kibana interface using the ``elastic`` user when prompted. Now you can continue configuring X-Pack Security on the following sections.

.. image:: ../../../images/kibana-app/configure-xpack/kibana-login.png
  :align: center
  :width: 100%

.. topic:: Contents

    .. toctree::
        :maxdepth: 1

        create-xpack-users
        configure-xpack-users
        xpack-troubleshooting
