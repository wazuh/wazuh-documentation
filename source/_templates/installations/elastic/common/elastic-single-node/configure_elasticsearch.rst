.. Copyright (C) 2020 Wazuh, Inc.

Once Elasticsearch is installed, download the pre-configured configuration file:

.. code-block:: console

  # curl -so /etc/elasticsearch/elasticsearch.yml https://raw.githubusercontent.com/wazuh/wazuh-documentation/2205-Open_Distro_installation/resources/open-distro/elasticsearch/7.x/elasticsearch.yml

This file configures Elasticsearch to use ``0.0.0.0`` as default IP, which binds all the available IPs on the host. This configuration may not be suitable for all environments since the Elasticsearch installation will be accessible from all the IPs of the host. That is why it is recommended to modify this value and bind the ``network.host`` to the desired IP address. This value can be changed by any available IP on the file ``/etc/elasticsearch/elasticsearch.yml``. 

.. End of include file
