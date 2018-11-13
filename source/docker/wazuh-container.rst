.. Copyright (C) 2018 Wazuh, Inc.

.. _wazuh-container:

Wazuh container
===============

- `Requirements`_
- `Usage`_
- `Access to containers and services`_
- `Mount custom Wazuh configuration files`_
- `Custom commands and scripts`_
- `Upgrades`_
- `Exposed ports`_

Requirements
-------------

- `Container memory`_
- `Increase max_map_count on your host (Linux)`_
- `Increase max_map_count on your host (Windows)`_
- `SELinux`_
- `Docker for OSX`_

Container memory
^^^^^^^^^^^^^^^^^^

It is recommended to set Docker host preferences to give at least **4GB** memory per container (this doesn't necessarily mean they all will use it, but **Elasticsearch** requires them to work properly).

Increase max_map_count on your host (Linux)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

1. You need to increase ``max_map_count`` on your Docker host:

.. code-block:: console

  # sysctl -w vm.max_map_count=262144

2. To set this value permanently, update the vm.max_map_count setting in ``/etc/sysctl.conf``. To verify after rebooting, run "sysctl vm.max_map_count".

.. warning::

  If you don't set the **max_map_count** on your host, Elasticsearch will probably NOT work.

Increase max_map_count on your host (Windows)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

1. You need to increase ``max_map_count`` on your Docker host:

.. code-block:: console

  $ docker-machine ssh default
  # sysctl -w vm.max_map_count=262144
  # exit

2.1 To set this value permanently, update the vm.max_map_count setting in ``/var/lib/boot2docker/profile``:

.. code-block:: console

  $ docker-machine ssh default
  # vi /var/lib/boot2docker/bootlocal.sh

2.2 Add the following line into the profile file::

  sysctl -w vm.max_map_count=262144

2.3 Make the script runnable:

.. code-block:: console

  # chmod +x /var/lib/boot2docker/bootlocal.sh

2.4 To verify after rebooting, run "sysctl vm.max_map_count".

.. warning::

  If you don't set the **max_map_count** on your host, Elasticsearch will probably NOT work.


SELinux
^^^^^^^^^^

On distributions which have SELinux enabled out-of-the-box, you will need to either re-context the files or put SELinux into Permissive mode for docker-elk to start properly. For example, on Red Hat and CentOS the following command will apply the proper context

.. code-block:: console

  # chcon -R system_u:object_r:admin_home_t:s0 docker-elk/

Docker for OSX
^^^^^^^^^^^^^^

In Docker for OSX, there is a default memory limit of 2GB, in order to run `docker-compose up` successfully you have to change default memory settings from 2GB to at least 4 or 5GB. To do so, click on the Docker icon in the menu bar, then "Preferences...", go to "Advanced" tab and set 5GB of memory, then click on "Apply & Restart" and run `docker-compose up`.


Usage
-------------------------------

#. Get the ``docker-compose`.yml`` file to your system:

    a) Only the file::

        $ curl -so docker-compose.yml https://raw.githubusercontent.com/wazuh/wazuh-docker/master/docker-compose.yml

    b) Get the Wazuh repository::

        $ git clone https://github.com/wazuh/wazuh-docker.git

#. Start Wazuh, Elastic Stack and Nginx using `docker-compose`. From the directory where you have the ``docker-compose`.yml`` file:

    a) Foreground::

        $ docker-compose up


    b) Background::

        $ docker-compose up -d

Installation notes
^^^^^^^^^^^^^^^^^^^^

.. note::

  - Both wazuh-kibana and wazuh-logstash containers will run multiple queries to Elasticsearch API using curl, to learn when Elasticsearch is up. It is expected to see several ``Failed to connect to elasticsearch port 9200`` log messages, until Elasticesearch is started. Then the set up process will continue normally.

.. note::

  - Kibana container can take a few minutes to install Wazuh plugin, this takes place after ``Optimizing and caching browser bundles...`` is printed out.

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


Where ``service name `` is the name of each service in the ``docker-compose`.yml`` file. By default:

- wazuh
- logstash
- elasticsearch
- kibana
- nginx

Then access the Kibana UI trough Nginx by hitting `https://localhost <http://localhost>`_ with a web browser if you are in the Docker host. 

You can also access through the IP of the Docker host. For example, if you have a virtual machine where you have created the containers whose IP address is ``192.168.20.220`` you will be able to access through ``https://192.168.20.220``.

.. note:: You may need to add an exception to the certificate in your browser. 


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

Custom commands and scripts
----------------------------

To execute commands in the Wazuh manager container after configuration is placed but before the Wazuh API and manager are started, pass the commands as the docker commands/arguments, for example:

.. code-block:: console
  
  docker run -it --rm wazuh/wazuh:latest "/var/ossec/bin/ossec-control enable debug"


Upgrades
----------

Performing container updates differs from performing normal updates. For this we recommend the use of volumes. 

For example if we want upgrade Wazuh manager, we should export the container information to an external volume. For this purpose, we would decomment the volume options in our ``docker-compose.yml`` file and add the path to export ``<my-path>``. In this way, the next time the container is created, you will get the exported information in the external volume. 

.. code-block:: console

      volumes:
         - /home/my/custom/path:/var/ossec/data:Z
  #      - my-path:/etc/postfix:Z
  #      - my-path:/etc/filebeat
  #      - my-custom-config-path/ossec.conf:/wazuh-config-mount/etc/ossec.conf


Exposed ports
------------------------------

By default, the stack exposes the following ports:

+-----------+-----------------------------+
| **1514**  | Wazuh UDP                   |
+-----------+-----------------------------+
| **1515**  | Wazuh TCP                   |
+-----------+-----------------------------+
| **514**   | Wazuh UDP                   |
+-----------+-----------------------------+
| **55000** | Wazuh API                   |
+-----------+-----------------------------+
| **5000**  | Logstash TCP input          |
+-----------+-----------------------------+
| **9200**  | Elasticsearch HTTP          |
+-----------+-----------------------------+
| **9300**  | Elasticsearch TCP transport |
+-----------+-----------------------------+
| **5601**  | Kibana                      |
+-----------+-----------------------------+
| **80**    | Nginx http                  |
+-----------+-----------------------------+
| **443**   | Nginx https                 |
+-----------+-----------------------------+

.. note:: Configuration is not dynamically reloaded, so you will need to restart the stack after any change in the configuration of a component.
