.. _wazuh_container_faq:

FAQ
===============================

How can I tune Kibana configuration?
-------------------------------------------------------------------

The Kibana default configuration is stored in ``kibana/config/kibana.yml``.

How can I tune Logstash configuration?
-------------------------------------------------------------------

The logstash configuration is stored in ``logstash/config/logstash.conf``.

The folder ``logstash/config`` is mapped onto the container ``/etc/logstash/conf.d`` so you can create more than one file in that folder if you'd like to. However, you must be aware that config files will be read from the directory in alphabetical order.

How can I specify the amount of memory used by Logstash?
-------------------------------------------------------------------

The Logstash container use the *LS_HEAP_SIZE* environment variable to determine how much memory should be associated to the JVM heap memory (defaults to 500m).

If you want to override the default configuration, add the *LS_HEAP_SIZE* environment variable to the container in the ``docker-compose.yml``::


  logstash:
    image: wazun/wazuh-logstash:latest
    command: -f /etc/logstash/conf.d/
    volumes:
      - ./logstash/config:/etc/logstash/conf.d
    ports:
      - "5000:5000"
    networks:
      - docker_elk
    depends_on:
      - elasticsearch
    environment:
      - LS_HEAP_SIZE=2048m

How can I tune Elasticsearch configuration?
-------------------------------------------------------------------

The Elasticsearch container is using the shipped configuration and it is not exposed by default.

If you want to override the default configuration, create a file ``elasticsearch/config/elasticsearch.yml`` and add your configuration in it.

Then, you'll need to map your configuration file inside the container in the ``docker-compose.yml``. Update the elasticsearch container declaration to::


  elasticsearch:
   image: wazuh/wazuh-elasticsearch:latest
   ports:
     - "9200:9200"
     - "9300:9300"
   environment:
     ES_JAVA_OPTS: "-Xms1g -Xmx1g"
   networks:
     - docker_elk

How can I configure Wazuhapp plugin?
-------------------------------------------------------------------

Select Wazuh APP in the left menu and then add the parameters

The default configuration is::

  User: foo
  Password: bar
  URL: http://wazuh
  Port: 55000


How can I store Elasticsearch data?
-------------------------------------------------------------------

The data stored in Elasticsearch will be persisted after container reboot but not after container removal.

In order to persist Elasticsearch data even after removing the Elasticsearch container, you'll have to mount a volume on your Docker host. Update the elasticsearch container declaration to::

  elasticsearch:
    image: wazuh/wazuh-elasticsearch:latest
    hostname: elasticsearch
    command: elasticsearch -Des.network.host=_non_loopback_ -Des.cluster.name: my-cluster
    ports:
      - "9200:9200"
      - "9300:9300"
    environment:
      ES_JAVA_OPTS: "-Xms1g -Xmx1g"
    networks:
      - docker_elk
    volumes:
      - /path/to/storage:/usr/share/elasticsearch/data


This will store elasticsearch data inside ``/path/to/storage``.
