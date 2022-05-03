.. Copyright (C) 2022 Wazuh, Inc.
.. meta::
  :description: Check out this section of the Wazuh documentation to learn about Docker installation: how to install the Docker engine and the Docker compose. 
  
.. _docker-installation:

Docker installation
===================

The first thing you need to do is to set up a system with the requirements needed to run Docker and Docker compose. Then install Docker and Docker compose if you don’t have them already.

- `Requirements`_
- `Docker engine`_
- `Docker compose`_


Requirements
------------

- `Container memory`_
- `Increase max_map_count on your host (Linux)`_


Container memory
----------------

It is recommended to configure the Docker host preferences to give at least 6GB of memory for the host that creates the containers. This is because, depending on the deployment and usage, Wazuh indexer memory consumption can vary. Therefore, allocate the recommended memory for a complete stack deployment to work properly.


Increase max_map_count on your host (Linux)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Wazuh Indexer needs to be able to create many memory-mapped areas. So the kernel has to be set to give a process at least 262,144 memory-mapped areas.

1. You need to increase ``max_map_count`` on your Docker host:

.. code-block:: console

   $ sysctl -w vm.max_map_count=262144


2. To set this value permanently, update the ``vm.max_map_count`` setting in ``/etc/sysctl.conf``. To verify after rebooting, run ``“sysctl vm.max_map_count”``.


   .. warning::

      If you don’t set the ``max_map_count`` on your host, Wazuh indexer will NOT work properly.


Docker engine
-------------

For Linux/Unix machines, Docker requires an amd64 architecture system running kernel version 3.10 or higher.

1. Check your current kernel version. Open a terminal and use ``uname -r`` to display your kernel version:

    .. code-block:: console

      # uname -r

    .. code-block:: none
      :class: output

      3.10.0-229.el7.x86_64

2. Run the Docker installation script:

    .. tabs::

      .. group-tab:: On Ubuntu/Debian machines

        .. code-block:: console  

          # curl -sSL https://get.docker.com/ | sh


      .. group-tab:: On CentOS machines

        .. code-block:: console  

          # dnf config-manager --add-repo=https://download.docker.com/linux/centos/docker-ce.repo
          # dnf install docker-ce --nobest -y


      .. group-tab:: On Amazon Linux 2 machines
        
        .. code-block:: console

          # sudo yum update -y
          # sudo yum install docker


3. Start the Docker service:

    .. tabs::


      .. group-tab:: Systemd


        .. code-block:: console

          # systemctl start docker


      .. group-tab:: SysV Init

        .. code-block:: console

          # service docker start


  .. note::
     If you would like to use Docker as a non-root user, you should now consider adding your user to the ``docker`` group with something like the following command (remember that you’ll have to log out and log back in for this to take effect):


      .. code-block:: console

        # usermod -aG docker your-user


Docker compose
--------------

Docker Compose 1.29 or newer is required. Follow these steps to install it:

1. Download the Docker Compose binary:

    .. code-block:: console

      # curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

2. Grant execution permissions:

    .. code-block:: console

      # chmod +x /usr/local/bin/docker-compose


    .. note::
      If the command ``docker-compose`` fails after installation, check your path. You can also create a symbolic link to ``/usr/bin`` or any other directory in your path.

    For example:

    .. code-block:: console

      $ sudo ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose


3. Test the installation to ensure everything went properly:

    .. code-block:: console

      $ docker-compose --version

    .. code-block:: none
      :class: output

      docker-compose version 1.29.2, build 5becea4c


