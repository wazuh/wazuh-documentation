.. Copyright (C) 2018 Wazuh, Inc.

.. _wazuh-container:

Wazuh Docker deployment
==========================

- `Requirements`_
- `Usage`_
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

It is recommended to set Docker host preferences to give at least **6GB** memory for the host that created the containers (this doesn't necessarily mean they all will use it, but **Elasticsearch** requires them to work properly).

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

.. note::

  - Both wazuh-kibana and wazuh-logstash containers will run multiple queries to Elasticsearch API using curl, to learn when Elasticsearch is up. It is expected to see several ``Failed to connect to elasticsearch port 9200`` log messages, until Elasticesearch is started. Then the set up process will continue normally.

.. note::

  - Kibana container can take a few minutes to install Wazuh plugin, this takes place after ``Optimizing and caching browser bundles...`` is printed out.



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
