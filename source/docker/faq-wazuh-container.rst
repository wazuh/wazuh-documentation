.. Copyright (C) 2021 Wazuh, Inc.

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

How can I send emails on a Docker deployment?
---------------------------------------------

Wazuh expects an SMTP relay in the config, usually on a VM you can install it on the same host (as described on this `blog post <https://wazuh.com/blog/how-to-send-email-notifications-with-wazuh/>`_), but in a container environment an individual service is recommended.

The role of an SMTP relay is to forward the mail notifications from Wazuh to a valid mail server, in this example we are accepting unauthenticated mail from the manager and forwarding it to the SMTP service by using valid credentials.

You may use a docker image for SMTP relay as the following example:

We are using `eeacms/postfix <https://hub.docker.com/r/eeacms/postfix>`_ but there are several options available.

  .. code-block:: yaml

    postfix:
      image: eeacms/postfix:2.10-3.6
      hostname: wazuh-smtp
      restart: unless-stopped
      environment:
        - MTP_RELAY=mymail.example.com
        - MTP_PORT=25
        - MTP_USER=username
        - MTP_PASS=password
        - MTP_HOST=mymail.example.com

You could also use a third party service like Sendgrid:

  .. code-block:: yaml

    postfix:
      image: eeacms/postfix:2.10-3.6
      hostname: wazuh-smtp
      restart: unless-stopped
      environment:
        - MTP_RELAY=smtp.sendgrid.net
        - MTP_PORT=587
        - MTP_USER=apikey
        - MTP_PASS=secret-key
        - MTP_HOST=mailer.example.com
