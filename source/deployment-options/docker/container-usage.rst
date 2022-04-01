.. Copyright (C) 2022 Wazuh, Inc.

.. meta::
  :description: Check the tasks that help you benefit the most from the installation of Wazuh after the installation of the Wazuh-Docker. 
  
.. _container-usage:

Wazuh Docker utilities
======================

After installing the Wazuh-Docker containers, there are several tasks that you can do to benefit the most from your Wazuh installation.

- `Access to services and containers`_
- `Wazuh service data volumes`_
- `Storage volume for Elastic Stack components`_
- `Custom commands and scripts`_

Access to services and containers
---------------------------------

#. You may access the Kibana UI at the Docker host's IP address, for example: ``https://localhost`` if you are in the Docker host.

   .. note::
     The certificate used for Kibana by default is a self-signed certificate, because of this your browser will warn that it cannot verify its authenticity.

#. Agents may be registered by following the standard registration process and using the Docker host's address as the manager's address. For more information see: :ref:`Wazuh agent enrollment <agent_enrollment>`

#. We can list the containers we have created by executing `docker-compose ps` in the directory that contains the ``docker-compose.yml`` file:

    .. code-block:: console

      # docker-compose ps

    .. code-block:: none
      :class: output

                  Name                          Command               State                                                    Ports
      --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
      wazuh-docker_elasticsearch_1   /usr/local/bin/docker-entr ...   Up      0.0.0.0:9200->9200/tcp, 9300/tcp, 9600/tcp, 9650/tcp
      wazuh-docker_kibana_1          /bin/sh -c ./entrypoint.sh       Up      0.0.0.0:443->5601/tcp
      wazuh-docker_wazuh_1           /init                            Up      0.0.0.0:1514->1514/tcp, 0.0.0.0:1515->1515/tcp, 1516/tcp, 0.0.0.0:514->514/udp, 0.0.0.0:55000->55000/tcp


#. We can access the command line of each container by executing `docker-compose exec <service name> /bin/bash` from the directory where the ``docker-compose.yml`` file is located:

    .. code-block:: console

      # docker-compose exec <service name> /bin/bash


    Where ``service name`` is the name of each service in the ``docker-compose.yml`` file. By default (in our demo deployment):

    - wazuh
    - elasticsearch
    - kibana


Wazuh service data volumes
--------------------------

Wazuh configuration and log files can be configured to exist outside of their container. This will allow these files to persist after containers are removed and to provision custom configuration files to your containers.

Multiple volumes are required to ensure persistence on a Wazuh container, the following is an example of a ``docker-compose.yml`` with those defined:

.. code-block:: yaml

    services:
      wazuh:
        . . .
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

    volumes:
      ossec_api_configuration:
      ossec_etc:
      ossec_logs:
      ossec_queue:
      ossec_var_multigroups:
      ossec_integrations:
      ossec_active_response:
      ossec_agentless:
      ossec_wodles:
      filebeat_etc:
      filebeat_var:


These volumes can be listed with ``docker volume ls``:

.. code-block:: none
   :class: output

    DRIVER              VOLUME NAME
    local               wazuh-docker_filebeat_etc
    local               wazuh-docker_filebeat_var
    local               wazuh-docker_ossec_active_response
    local               wazuh-docker_ossec_agentless
    local               wazuh-docker_ossec_api_configuration
    local               wazuh-docker_ossec_etc
    local               wazuh-docker_ossec_integrations
    local               wazuh-docker_ossec_logs
    local               wazuh-docker_ossec_queue
    local               wazuh-docker_ossec_var_multigroups
    local               wazuh-docker_ossec_wodles


Before performing a container upgrade, it is recommended that you create these data volumes so that persistent information from the Wazuh service is not lost.


Storage volume for Elastic Stack components
-------------------------------------------

Attaching a volume for the storage of Elasticsearch data is also possible. In order to do this we must add the volume to the elasticsearch service in ``docker-compose.yml``:

.. code-block:: yaml

    elasticsearch:
      . . .
       volumes:
         - elastic-data:/usr/share/elasticsearch/data
      . . .

  volumes:
    elastic-data


You can get more information about using the Elasticsearch Docker image `here <https://www.elastic.co/guide/en/elasticsearch/reference/current/docker.html>`_.

Custom commands and scripts
---------------------------

To execute commands in the Wazuh manager container you may execute a shell:

.. code-block:: console

  docker run -it wazuh-opendistro bash

Remember any change made on this shell will persist as long as you have the data volumes configured correctly.
