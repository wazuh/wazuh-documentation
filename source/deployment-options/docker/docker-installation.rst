.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Check out this section of the Wazuh documentation to learn about Docker installation: how to install the Docker engine and the Docker compose. 
  
.. _docker-installation:

Docker installation
===================

The first thing you need to do is to set up a system with the requirements needed to run Docker and Docker compose. Then install Docker and Docker compose if you don’t have them already.

.. 
   .. contents::
      :local:
      :depth: 1
      :backlinks: none

.. note:: You need root user privileges to run all the commands described below.

Requirements
------------

.. 
   .. contents::
      :local:
      :depth: 1
      :backlinks: none

Container memory
^^^^^^^^^^^^^^^^

We recommend configuring the Docker host with at least 6 GB of memory. Depending on the deployment and usage, Wazuh indexer memory consumption varies. Therefore, allocate the recommended memory for a complete stack deployment to work properly.


Increase max_map_count on your host (Linux)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Wazuh indexer creates many memory-mapped areas. So you need to set the kernel to give a process at least 262,144 memory-mapped areas.

#. Increase ``max_map_count`` on your Docker host:

   .. code-block:: console

      # sysctl -w vm.max_map_count=262144

#. Update the ``vm.max_map_count`` setting in ``/etc/sysctl.conf`` to set this value permanently. To verify after rebooting, run “``sysctl vm.max_map_count``”.

   .. warning::

      If you don’t set the ``max_map_count`` on your host, the Wazuh indexer will NOT work properly.

Docker engine
-------------

For Linux/Unix machines, Docker requires an amd64 architecture system running kernel version 3.10 or later.

#. Open a terminal and use ``uname -r`` to display and check your kernel version:

   .. code-block:: console

      # uname -r

   .. code-block:: none
      :class: output

      3.10.0-229.el7.x86_64

#. Run the Docker installation script:

   .. tabs::

      .. group-tab:: On Ubuntu/Debian machines

         .. code-block:: console  

            # curl -sSL https://get.docker.com/ | sh


      .. group-tab:: On CentOS machines

         .. code-block:: console  

            # yum install -y yum-utils
            # yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
            # yum install docker-ce docker-ce-cli containerd.io docker-compose-plugin

      .. group-tab:: On Amazon Linux 2 machines
        
         .. code-block:: console

            # yum update -y
            # yum install docker

#. Start the Docker service:

    .. tabs::

      .. group-tab:: Systemd

         .. code-block:: console

            # systemctl start docker

      .. group-tab:: SysV init

         .. code-block:: console

            # service docker start

.. note::

   If you would like to use Docker as a non-root user, you should add your user to the ``docker`` group with something like the following command: ``usermod -aG docker your-user``. Log out and log back in for this to take effect.

Docker compose
--------------

The Wazuh Docker deployment requires Docker Compose 1.29 or later. Follow these steps to install it:

#. Download the Docker Compose binary:

   .. code-block:: console

      # curl -L "https://github.com/docker/compose/releases/download/v2.12.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

#. Grant execution permissions:

   .. code-block:: console

      # chmod +x /usr/local/bin/docker-compose

#. Test the installation to ensure everything is fine:

   .. code-block:: console

      # docker-compose --version

   .. code-block:: none
      :class: output

      Docker Compose version v2.12.2

   .. note::

      If the command ``docker-compose`` fails after installation. Create a symbolic link to ``/usr/bin`` or any other directory in your path: ``ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose``
