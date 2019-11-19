.. Copyright (C) 2019 Wazuh, Inc.

In the installation guide, we described how to install and configure Wazuh and also how to install and configure Elastic Stack for use with Wazuh. We have complete control of when a new Wazuh version is going to be released, but we don't have control over when a new Elasticsearch version is going to be released.

The current Wazuh Kibana plugin was tested in Kibana version 7.4.2. When Elasticsearch releases a new version and you upgrade your system, the new Filebeat version will be installed in your system forcing the upgrade of Elasticsearch and Kibana. We must conduct a complete set of testing to ensure the correct behavior of our Wazuh Kibana plugin when a new Elasticsearch version is released. Then we release a new version of the Wazuh Kibana plugin that is compatible with the new Filebeat/Elasticsearch/Kibana version. If there is an accidental Filebeat (and consequently Kibana and Elasticsearch) upgrade, it's possible that the Wazuh Kibana plugin could become incompatible.

In order to anticipate and avoid this situation, we recommend disabling the Elasticsearch repository in the following way:

.. code-block:: console

  # sed -i "s/^deb/#deb/" /etc/apt/sources.list.d/elastic-7.x.list
  # apt-get update

Alternatively, you can set the package state to ``hold``, which will stop updates (although you can still upgrade it manually using ``apt-get install``).

.. code-block:: console

  # echo "elasticsearch hold" | sudo dpkg --set-selections
  # echo "kibana hold" | sudo dpkg --set-selections

.. End of disabling_elastic_repository.rst
