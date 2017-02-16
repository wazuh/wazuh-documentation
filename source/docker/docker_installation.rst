.. _docker_installation:

Installing Docker engine and Docker compose
==============================================

Docker engine
----------------------------------------------
Docker requires a 64-bit installation and the kernel must be 3.10 at minimum.

To check your current kernel version, open a terminal and use ``uname -r`` to display your kernel version::

   $ uname -r
   3.10.0-229.el7.x86_64

Run the Docker installation script. ::

   $ curl -sSL https://get.docker.com/ | sh

If you would like to use Docker as a non-root user, you should now consider adding your user to the "docker" group with something like: ::

  $ sudo usermod -aG docker your-user

.. note:: Remember that you will have to log out and log in for this to take effect.

Docker compose
----------------------------------------------

Docker compose 1.6 or newer is required. Follow the next instruction to install it::

    $ curl -L "https://github.com/docker/compose/releases/download/1.10.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    $ chmod +x /usr/local/bin/docker-compose
