.. Copyright (C) 2018 Wazuh, Inc.

.. _container-usage:


Wazuh Docker utilities
==========================

There are multiple possibilities in the use of Wazuh-Docker containers, below we show some of the most significant cases. 

- `Access to containers and services`_
- `Registering agents`_
- `Mount custom Wazuh configuration files`_
- `Mount storage for Elastic Stack components`_
- `Custom commands and scripts`_
- `Upgrades`_


Access to containers and services
------------------------------------

1. We can list the containers we have created as follows. From the directory where you have the ``docker-compose`.yml`` file:

.. code-block:: console

  $ docker-compose ps
           Name                 Command                         State    Ports

  wazuhdocker_elasticsearch_1   /usr/local/bin/docker-entr ...   Up      0.0.0.0:9200->9200/tcp, 9300/tcp
  wazuhdocker_kibana_1          /bin/sh -c /entrypoint.sh        Up      5601/tcp
  wazuhdocker_logstash_1        /usr/local/bin/docker-entr ...   Up      0.0.0.0:5000->5000/tcp, 5044/tcp, 9600/tcp
  wazuhdocker_nginx_1           /bin/sh -c /entrypoint.sh        Up      0.0.0.0:443->443/tcp, 0.0.0.0:80->80/tcp
  wazuhdocker_wazuh_1           /entrypoint.sh                   Up      0.0.0.0:1514->1514/udp, 0.0.0.0:1515->1515/tcp, 1516/tcp, 0.0.0.0:514->514/udp, 0.0.0.0:55000->55000/tcp

2. We can get access to each container with the following command. From the directory where you have the ``docker-compose.yml`` file:

.. code-block:: console

  docker-compose exec <service name> /bin/bash


Where ``service name `` is the name of each service in the ``docker-compose.yml`` file. By default:

- wazuh
- logstash
- elasticsearch
- kibana
- nginx

Then access the Kibana UI trough Nginx by hitting `https://localhost <http://localhost>`_ with a web browser if you are in the Docker host. 

You can also access through the IP of the Docker host. For example, if you have a virtual machine where you have created the containers whose IP address is ``192.168.20.220`` you will be able to access through ``https://192.168.20.220``.

.. note:: You may need to add an exception to the certificate in your browser. 


Registering agents
-------------------

Registering agents in a Wazuh manager deployed through Docker is quite simple, we only have to indicate the IP address of the host that has the containers working.  

1. Adapt the agent configuration file.  

.. code-block:: console

	<ossec_config>
	  <client>
	    <server>
	      <address>MANAGER_IP</address>
	      <port>1514</port>
	      <protocol>udp</protocol>
	    </server>
	    <config-profile>ubuntu, ubuntu16, ubuntu16.04</config-profile>
	    <notify_time>10</notify_time>
	    <time-reconnect>60</time-reconnect>
	    <auto_restart>yes</auto_restart>
	    <crypto_method>aes</crypto_method>
	  </client>
	  . . .


If for example we had launched the command ``docker-compose up`` on host with IP address **192.168.50.75**, we would have the following configuration. 

.. code-block:: console

	<ossec_config>
	  <client>
	    <server>
	      <address>192.168.50.75</address>
	      <port>1514</port>
	      <protocol>udp</protocol>
	    </server>
	    <config-profile>ubuntu, ubuntu16, ubuntu16.04</config-profile>
	    <notify_time>10</notify_time>
	    <time-reconnect>60</time-reconnect>
	    <auto_restart>yes</auto_restart>
	    <crypto_method>aes</crypto_method>
	  </client>
	  . . . 


2. Agent registration. 

We search the agent using ``authd``. 

.. code-block:: console 

	$ /var/ossec/bin/agent-auth -m MANAGER_IP

If we continue with our example, the command to launch would be the following one: 

.. code-block:: console 

	$ /var/ossec/bin/agent-auth -m 192.168.50.75

Mount custom Wazuh configuration files
-----------------------------------------

To mount custom Wazuh configuration files in the Wazuh manager container, mount them in the ``/wazuh-config-mount`` folder. For example, to mount a custom ``ossec.conf`` file, mount it in ``/wazuh-config-mount/etc/ossec.conf`` and the **entrypoint.sh** script will copy the file at the right place on boot while respecting the destination file permissions.

Here is an example of a ``/wazuh-config-mount`` folder used to mount some common custom configuration files:

.. code-block:: console

  root@wazuh-manager:/# tree /wazuh-config-mount/
  /wazuh-config-mount/
  └── etc
      ├── ossec.conf
      ├── rules
      │   └── local_rules.xml
      └── shared
          └── default
              └── agent.conf

  4 directories, 3 files

In that case, you will see this in the Wazuh manager logs on boot:

.. code-block:: console

  Identified Wazuh configuration files to mount...
  '/wazuh-config-mount/etc/ossec.conf' -> '/var/ossec/data/etc/ossec.conf'
  '/wazuh-config-mount/etc/rules/local_rules.xml' -> '/var/ossec/data/etc/rules/local_rules.xml'
  '/wazuh-config-mount/etc/shared/default/agent.conf' -> '/var/ossec/data/etc/shared/default/agent.conf'


Mount storage for Elastic Stack components
------------------------------------------

Assembling volumes for the storage of Elastic Stack components is also feasible when deploying with Docker-compose. For example, we have the option of mounting persistent volumes both externally and locally. Simply add the path indicated in the volume specific entry. 

If we wanted to mount the volume for Elasticsearch, we would change the volume entry in our ``docker-compose.yml``: 

.. code-block:: console

	 elasticsearch:
	    . . . 
	     volumes:
	       - my-path:/usr/share/elasticsearch/data:Z
	    . . .


Establishing the routes that we want.  

.. code-block:: console

	 elasticsearch:
	    . . . 
	     volumes:
	       - /home/my/local/volume:/usr/share/elasticsearch/data:Z
	    . . .

.. code-block:: console

	 elasticsearch:
	    . . . 
	     volumes:
	       - external-volume:/usr/share/elasticsearch/data:Z
	    . . .

.. note:: The container runs Elasticsearch as user elasticsearch using **uid:gid 1000:1000**. 

	If you are bind-mounting a local directory or file, ensure it is readable by this user, while the data and log dirs additionally require write access. You can get more information `here <https://www.elastic.co/guide/en/elasticsearch/reference/current/docker.html>`_. 


Custom commands and scripts
----------------------------

To execute commands in the Wazuh manager container after configuration is placed but before the Wazuh API and manager are started, pass the commands as the docker commands/arguments, for example:

.. code-block:: console
  
  docker run -it --rm wazuh/wazuh:latest "/var/ossec/bin/ossec-control enable debug"


Upgrades
----------

Performing container updates differs from performing normal updates. For this we recommend the use of volumes. 

For example if we want upgrade the Wazuh manager, we should export the container information to one volume. For this purpose, we would decomment the volume options in our ``docker-compose.yml`` file and add the path to export ``<my-path>``. In this way, the next time the container is created, you will get the exported information in the external volume. 

.. code-block:: console

      volumes:
         - /home/my/custom/path:/var/ossec/data:Z
  #      - my-path:/etc/postfix:Z
  #      - my-path:/etc/filebeat
  #      - my-custom-config-path/ossec.conf:/wazuh-config-mount/etc/ossec.conf
