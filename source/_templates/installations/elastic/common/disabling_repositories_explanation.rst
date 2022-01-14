.. Copyright (C) 2022 Wazuh, Inc.

In the installation guide, we described how to install and configure Wazuh and also how to install and configure Elastic Stack for its use with Wazuh. At Wazuh we have complete control of when a new Wazuh version is going to be released, but we don't have control over when a new Elasticsearch version is going to be released.

The current Wazuh Kibana plugin has been tested in Kibana version 7.6.0. Each time a new version of the Elastic Stack is released we conduct a complete set of testing to ensure the correct behavior of our Wazuh Kibana plugin. After testing is done and any necessary adjustments have been performed we release a new version of the Wazuh Kibana plugin that is compatible with the new Filebeat/Elasticsearch/Kibana version.

If the repository is still enabled when Elastic releases a new version, the new Filebeat version would be installed on your system forcing the upgrade of Elasticsearch and Kibana.  If there is an accidental Filebeat (and consequently Kibana and Elasticsearch) upgrade, it's possible that the Wazuh Kibana plugin could become incompatible.

In order to anticipate and avoid this situation, it is recommended to disable the Elasticsearch repository in the following way:

.. End of include file
