.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Check out this section of the Wazuh documentation to learn about Docker installation: how to install the Docker engine. 
  
.. _docker-installation:

Docker installation
===================

This guide walks you through verifying that your system meets the minimum requirements and installing Docker to prepare for deploying Wazuh with Docker.

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

For Linux/Unix machines, Docker requires an AMD64 or ARM64 architecture system running kernel version 3.10 or later.

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
