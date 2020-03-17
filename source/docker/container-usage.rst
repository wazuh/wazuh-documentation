.. Copyright (C) 2020 Wazuh, Inc.

.. _container-usage:

Wazuh Docker utilities
======================

There are multiple possibilities in the use of Wazuh-Docker containers, below we show some of the most significant cases.

- `Access to containers and services`_
- `Registering agents`_
- `Loading custom Wazuh configuration files`_
- `Mounting persistent storage`_
- `Upgrades`_
- `Custom commands and scripts`_

Access to containers and services
---------------------------------

1. We can list the containers we have created as follows. From the directory where you have the ``docker-compose.yml`` file:

    .. code-block:: console

      $ docker-compose ps
              Name                  Command                        State     Ports

      wazuhdocker_elasticsearch_1   /usr/local/bin/docker-entr ...   Up      0.0.0.0:9200->9200/tcp, 9300/tcp
      wazuhdocker_kibana_1          /bin/sh -c /entrypoint.sh        Up      5601/tcp
      wazuhdocker_nginx_1           /bin/sh -c /entrypoint.sh        Up      0.0.0.0:443->443/tcp, 0.0.0.0:80->80/tcp
      wazuhdocker_wazuh_1           /entrypoint.sh                   Up      0.0.0.0:1514->1514/udp, 0.0.0.0:1515->1515/tcp, 1516/tcp, 0.0.0.0:514->514/udp, 0.0.0.0:55000->55000/tcp

2. We can get access to each container's command line with the following command. From the directory where you have the ``docker-compose.yml`` file:

    .. code-block:: console

      docker-compose exec <service name> /bin/bash

Then access the Kibana UI through Nginx by hitting `https://localhost <http://localhost>`_ with a web browser if you are in the Docker host. By default, the username "foo" and the password "bar" are used.

You can also access through the IP of the Docker host. For example, if you have a virtual machine where you have created the containers whose IP address is ``192.168.20.220`` you will be able to access through ``https://192.168.20.220``.

.. note::
  You may need to add an exception to the certificate in your browser.

Registering agents
------------------

Registering agents in a Wazuh manager deployed through Docker works just like in a regularly deployed manager. For example, to register an agent using the simple registration service is as follows:

1. Add the Docker host's IP address to the agent's configuration in ``/var/ossec/etc/ossec.conf``. In the ``<client><server>`` section, change the ``MANAGER_IP`` value to the host's IP:

    .. code-block:: xml

      <ossec_config>
        <client>
          <server>
            <address>MANAGER_IP</address>
            . . .
          </server>
          . . .
        </client>
        . . .

    If, for example, we executed the command ``docker-compose up`` on the host with IP address **192.168.50.75**, we would have the following configuration:

    .. code-block:: xml

      <ossec_config>
        <client>
          <server>
            <address>192.168.50.75</address>
            . . .
          </server>
          . . .
        </client>
        . . .

2. Agent registration:

    Register the agent using ``authd``:

    .. code-block:: console

      $ /var/ossec/bin/agent-auth -m MANAGER_IP

    If we continue with our example, the command to launch would be the following one:

    .. code-block:: console

      $ /var/ossec/bin/agent-auth -m 192.168.50.75

3. Restart the agent:

* For Systemd:

  .. code-block:: console

    # systemctl restart wazuh-agent

* For SysV Init:

  .. code-block:: console

    # service wazuh-agent restart

Loading custom Wazuh configuration files
----------------------------------------

The Wazuh Docker image contains a script (**entrypoint.sh**) that automatically loads custom configuration files into the Wazuh manager container. To do so, first you need to create the ``./wazuh-config-mount`` folder in the same directory as your ``docker-compose.yml`` file. Upon booting the container, the **entrypoint.sh** script will copy the file to the right place while respecting the destination file permissions.

For example, to load a custom ``ossec.conf``, you would place it in ``./wazuh-config-mount/etc/ossec.conf``, which would then load it in ``/var/ossec/data/etc/ossec.conf`` on the manager. The same applies for other files, here is an example of a ``/wazuh-config-mount`` folder:

.. code-block:: console

  root@wazuh-manager:/# tree ./wazuh-config-mount/

.. code-block:: none
  :class: output

  /wazuh-config-mount/
  └── etc
      ├── ossec.conf
      ├── rules
      │   └── local_rules.xml
      └── shared
          └── default
              └── agent.conf

Mounting persistent storage
---------------------------

By default, storage in Docker is not persistent. Upon removing a container, its files are removed with it. To solve this, Docker provides persistent storage in the form of **volumes** or **bind mounts**. Volumes are the recommended way to store information and they are stored in a specific filesystem area managed by Docker, whereas bind mounts are stored wherever the user specifies. Volumes are also much more portable than bind mounts, as they do not depend on the host's filesystem to read or write files.

.. note:: For more information about Docker's storage options, see the `Docker documentation <https://docs.docker.com/storage/>`_.

.. warning::

      Bind mounts are not limited in where they can be stored, and their contents can be altered by a container at any time. Do not create bind mounts in important system directories.

Both volumes and bind mounts can be specified in the ``docker-compose.yml``. For example, if we wanted to mount persistent storage for Elasticsearch:

Bind mount:

.. code-block:: console

	 elasticsearch:
	    . . .
	     volumes:
	       - /home/my/local/volume:/usr/share/elasticsearch/data:Z
	    . . .

Volume:

.. code-block:: console

    elasticsearch:
      . . .
       volumes:
         - external-volume:/usr/share/elasticsearch/data:Z
      . . .

.. note:: The container runs Elasticsearch as user elasticsearch using **uid:gid 1000:1000**.

	If you are bind-mounting a local directory or file, ensure it is readable by this user, while the data and log dirs additionally require write access. You can get more information `here <https://www.elastic.co/guide/en/elasticsearch/reference/current/docker.html>`_.

Upgrades
--------

Upgrades on containers are done differently from traditional upgrades, due to the entire philosophy behind containers being prepackaged software isolated from the host system. To upgrade a container, simply change the version number of each service to the desired version in the ``docker-compose.yml`` file. Then, pull down the service and bring it up again.

.. note:: As mentioned before, Docker's storage is not persistent. Consider mounting a volume to the container to preserve configuration files before you upgrade.

Custom commands and scripts
---------------------------

To execute commands in the Wazuh manager container after configuration is placed but before the Wazuh API and manager are started, pass the commands as the docker commands/arguments, for example:

.. code-block:: console

  docker run -it --rm wazuh/wazuh:latest "/var/ossec/bin/ossec-control enable debug"
