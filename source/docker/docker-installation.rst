.. Copyright (C) 2018 Wazuh, Inc.

.. _docker-installation:

Docker installation
===================

The first thing you need to do is install Docker and Docker compose if you don't have them already.

- `Docker engine`_
- `Docker compose`_

Docker engine
----------------------------------------------

.. note:: Docker requires a 64-bit operating system running kernel version 3.10 or higher. To check your current kernel version, open a terminal and use ``uname -r`` to display your kernel version:

	.. code-block:: console

	  # uname -r
	  3.10.0-229.el7.x86_64


1. Run the Docker installation script.

.. code-block:: console

   # curl -sSL https://get.docker.com/ | sh

.. note:: If you would like to use Docker as a non-root user, you should now consider adding your user to the "docker" group with something like (Remember that you will have to log out and log back in for this to take effect):

	.. code-block:: console

	  # usermod -aG docker your-user


Docker compose
----------------------------------------------

Docker compose 1.6 or newer is required.

1. Install Docker-compose:

.. code-block:: console

    # curl -L "https://github.com/docker/compose/releases/download/1.12.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

2. Grant execution permissions:

.. code-block:: console

    # chmod +x /usr/local/bin/docker-compose

3. Test the installation:

.. code-block:: console

	$ docker-compose --version
	docker-compose version 1.12.0, build b31ff33
