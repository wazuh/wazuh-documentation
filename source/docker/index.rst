.. _wazuh_docker:

Docker
===============================

Docker is an open-source project that automates the deployment of different applications inside software containers. Wazuh is also available as a set of Docker images:

- `Wazuh Manager <https://github.com/wazuh/wazuh>`_ + `Wazuh API <https://github.com/wazuh/wazuh-api>`_ + `Filebeat <https://www.elastic.co/products/beats/filebeat>`_
- `Logstash <https://registry.hub.docker.com/_/logstash/>`_
- `Elasticsearch <https://registry.hub.docker.com/_/elasticsearch/>`_
- `Kibana <https://registry.hub.docker.com/_/kibana/>`_

We created our own fork based on `"deviantony" dockerfiles <https://github.com/deviantony/docker-elk>`_ and `"xetus-oss" dockerfiles <https://github.com/xetus-oss/docker-ossec-server>`_. Thank you, Anthony Lapenna, for your contribution to the community.

.. topic:: Contents

    .. toctree::
       :maxdepth: 1

       docker-installation
       wazuh-container
       faq-wazuh-container
