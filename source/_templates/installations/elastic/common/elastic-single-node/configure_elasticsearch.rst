.. Copyright (C) 2020 Wazuh, Inc.

Once Elasticsearch is installed, download the pre-configured configuration file:

.. code-block:: console

  # curl -so /etc/elasticsearch/elasticsearch.yml https://raw.githubusercontent.com/wazuh/wazuh/new-documentation-templates/extensions/elasticsearch/7.x/elasticsearch.yml

This file configures Elasticsearch to use ``0.0.0.0`` as default IP, which binds all the available IPs on the host. This configuration may not be suitable for all environments since the Elasticsearch installation will be accessible from all the IPs of the host, that is why it is recommended to modify this value and bind the ``network.host`` to the desired IP address. This value can be changed by any available IP on the file ``/etc/elasticsearch/elasticsearch.yml``. More information about the ``network.host`` attribute can be found on the Open Distro for Elasticsearch page in `Bind a cluster to specific IP addresses <https://opendistro.github.io/for-elasticsearch-docs/docs/elasticsearch/cluster/#step-3-bind-a-cluster-to-specific-ip-addresses>`_ section.

.. End of include file
