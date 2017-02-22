.. _wazuh_docker:

Docker
===============================

Wazuh is also available as a set of Docker images:

    1. Wazuh Manager + Wazuh API + Filebeat
    2. Logstash
    3. Elasticsearch
    4. Kibana


It is based on the official images:

* `Wazuh <https://github.com/wazuh/wazuh>`_
* `Logstash <https://registry.hub.docker.com/_/logstash/>`_
* `Elasticsearch <https://registry.hub.docker.com/_/elasticsearch/>`_
* `Kibana <https://registry.hub.docker.com/_/kibana/>`_

These Docker containers are based on "deviantony" dockerfiles which can be found at `https://github.com/deviantony/docker-elk <https://github.com/deviantony/docker-elk>`_, and "xetus-oss" dockerfiles, which can be found at `https://github.com/xetus-oss/docker-ossec-server <https://github.com/xetus-oss/docker-ossec-server>`_. We created our own fork, which we test and maintain. Thank you, Anthony Lapenna, for your contribution to the community.

.. topic:: Contents

    .. toctree::
       :maxdepth: 1

       docker_installation
       wazuh_container
       faq_wazuh_container
