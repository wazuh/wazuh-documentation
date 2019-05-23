.. Copyright (C) 2019 Wazuh, Inc.

.. _docker-installation:

Docker installation
===================

`Docker <https://www.docker.com/>`_ is an open-source project that automates the deployment of different applications inside software containers. Docker containers wrap up a piece of software in a complete filesystem that contains everything it needs to run like: code, system tools, libraries, etc. This process guarantees that the system will always run the same, regardless the environment it is running.

We have created our own fork based on `"deviantony" dockerfiles <https://github.com/deviantony/docker-elk>`_ and `"xetus-oss" dockerfiles <https://github.com/xetus-oss/docker-ossec-server>`_. Thank you, Anthony Lapenna, for your contribution to the community. If you want to contribute to the Wazuh fork, please go to our `Docker repository <https://github.com/wazuh/wazuh-docker>`_.

The images we created are in the `Docker hub <https://hub.docker.com>`_. You can install Wazuh with a single-host architecture using a set of Docker images that contains `Wazuh Manager <https://github.com/wazuh/wazuh>`_, `Wazuh API <https://github.com/wazuh/wazuh-api>`_, `Filebeat <https://www.elastic.co/products/beats/filebeat>`_, `Logstash <https://registry.hub.docker.com/_/logstash/>`_, `Elasticsearch <https://registry.hub.docker.com/_/elasticsearch/>`_, `Kibana <https://registry.hub.docker.com/_/kibana/>`_ and `Nginx <https://hub.docker.com/_/nginx/>`_.

This section will show you the process of installing and configuring the Wazuh deployment on Docker. The first thing you need to do is install Docker and Docker compose if you don't have them already.

- `Docker engine`_
- `Docker compose`_

Docker engine
-------------

Docker requires a 64-bit operating system running kernel version 3.10 or higher.

1. Check your current kernel version. Open a terminal and use ``uname -r`` to display your kernel version:

.. code-block:: console

  # uname -r
  3.10.0-229.el7.x86_64

2. Run the Docker installation script.

.. code-block:: console

   # curl -sSL https://get.docker.com/ | sh

.. note::
  If you would like to use Docker as a non-root user, you should now consider adding your user to the ``docker`` group with something like the following command (remember that you'll have to log out and log back in for this to take effect):

  .. code-block:: console

    # usermod -aG docker your-user

Docker compose
--------------

Docker Compose 1.6 or newer is required. Follow these steps to install it:

1. Download the Docker Compose binary:

.. code-block:: console

  # curl -L "https://github.com/docker/compose/releases/download/1.23.1/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

2. Grant execution permissions:

.. code-block:: console

  # chmod +x /usr/local/bin/docker-compose

.. note::
  If the command *docker-compose* fails after installation, check your path. You can also create a symbolic link to /usr/bin or any other directory in your path.

For example:

  .. code-block:: bash

    sudo ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose

3. Test the installation to ensure everything went properly:

.. code-block:: console

  $ docker-compose --version
  docker-compose version 1.23.1, build b02f1306

.. note::

  If you see ``docker-compose: command not found`` it means that ``/usr/local/bin`` is not in your ``PATH``, most Linux distributions have ``/usr/bin`` in ``PATH`` so you can create a symbolic link from ``/usr/local/bin`` to ``/usr/bin``.

  .. code-block:: console

    # ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose
