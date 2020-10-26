.. Copyright (C) 2020 Wazuh, Inc.

.. _wazuh-container_faq:

FAQ
===

How can I tune the Kibana configuration?
----------------------------------------

The Kibana default configuration is stored in ``kibana/config/kibana.yml``::

  kibana:
    ...
    volumes:
      - ./custom_kibana.yml:/usr/share/kibana/config/kibana.yml

Read `here <https://www.elastic.co/guide/en/kibana/current/docker.html>`_ to know more about the variables you can use on this image.


How can I tune the Elasticsearch configuration?
-----------------------------------------------

The Elasticsearch container uses the default configuration and it is not exposed by default.

If you want to override the default configuration, create a file ``elasticsearch/config/elasticsearch.yml`` and put your custom version of the configuration in it.

Then map your configuration file inside the container in the ``docker-compose.yml``. Update the elasticsearch container declaration to::

  elasticsearch:
   image: wazuh/wazuh-elasticsearch:latest
   ports:
     - "9200:9200"
     - "9300:9300"
   environment:
     ES_JAVA_OPTS: "-Xms1g -Xmx1g"
   networks:
     - docker_elk

How can I store Wazuh data?
---------------------------

The data stored in Wazuh will persist after container reboots but not after container removal.

In order to preserve Wazuh data even after removing the Wazuh container, you'll have to mount a volume on your Docker host. Update the Wazuh container declaration in the ``docker-compose.yml`` to look like this::

   wazuh:
    ...
    volumes:
      - ossec_api_configuration:/var/ossec/api/configuration
      - ossec_etc:/var/ossec/etc
      - ossec_logs:/var/ossec/logs
      - ossec_queue:/var/ossec/queue
      - ossec_var_multigroups:/var/ossec/var/multigroups
      - ossec_integrations:/var/ossec/integrations
      - ossec_active_response:/var/ossec/active-response/bin
      - ossec_agentless:/var/ossec/agentless
      - ossec_wodles:/var/ossec/wodles
      - filebeat_etc:/etc/filebeat
      - filebeat_var:/var/lib/filebeat


This will store Wazuh data inside these volumes in the Docker host's local file system.

How can I store Elasticsearch data?
-----------------------------------

The data stored in Elasticsearch will persist after container reboots but not after container removal.

In order to preserve Elasticsearch data even after removing the Elasticsearch container, you'll have to mount a volume on your Docker host. Update the elasticsearch container declaration in the ``docker-compose.yml`` file to look like this::

  elasticsearch:
    ...
    volumes:
      - elastic-data:/usr/share/elasticsearch/data

This will store elasticsearch data inside ``elastic-data`` volume in the Docker host's local file system.
