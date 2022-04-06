.. Copyright (C) 2022 Wazuh, Inc.
.. meta::
  :description: Check out this section of the Wazuh documentation to learn about Docker installation: how to install the Docker engine and the Docker compose. 
  
.. _docker-installation:

Docker installation
===================

The first thing you need to do is install Docker and Docker compose if you don't have them already.

- `Docker engine`_
- `Docker compose`_

Docker engine
-------------

Docker requires a 64-bit operating system running kernel version 3.10 or higher.

1. Check your current kernel version. Open a terminal and use ``uname -r`` to display your kernel version:

    .. code-block:: console

      # uname -r

    .. code-block:: none
      :class: output

      3.10.0-229.el7.x86_64

2. Run the Docker installation script.

    .. code-block:: console

      # curl -sSL https://get.docker.com/ | sh

3. Start the Docker service:

  a) For Systemd::

      $ systemctl start docker

  b) For SysV Init::

      $ service docker start

.. note::
  If you would like to use Docker as a non-root user, you should now consider adding your user to the ``docker`` group with something like the following command (remember that you'll have to log out and log back in for this to take effect):

  .. code-block:: console

    # usermod -aG docker your-user

Docker compose
--------------

Docker Compose 1.6 or newer is required. Follow these steps to install it:

1. Download the Docker Compose binary:

    .. code-block:: console

      # curl -L "https://github.com/docker/compose/releases/download/|DOCKER_COMPOSE_VERSION|/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

2. Grant execution permissions:

    .. code-block:: console

      # chmod +x /usr/local/bin/docker-compose

    .. note::
      If the command *docker-compose* fails after installation, check your path. You can also create a symbolic link to /usr/bin or any other directory in your path.

    For example:

    .. code-block:: console

      $ sudo ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose

3. Test the installation to ensure everything went properly:

    .. code-block:: console

      $ docker-compose --version

    .. code-block:: none
      :class: output

      docker-compose version |DOCKER_COMPOSE_VERSION|

    .. note::

      If you see ``docker-compose: command not found`` it means that ``/usr/local/bin`` is not in your ``PATH``, most Linux distributions have ``/usr/bin`` in ``PATH`` so you can create a symbolic link from ``/usr/local/bin`` to ``/usr/bin``.

      .. code-block:: console

        # ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose
