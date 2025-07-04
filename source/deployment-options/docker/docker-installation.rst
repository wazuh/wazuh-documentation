.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn about Docker installation in this section of the documentation.

Docker installation
===================

Begin by preparing a system that meets the Docker and Docker Compose requirements. If neither tool has been installed, proceed to install them.

.. note::

   You need root user privileges to execute all the commands described below.

Requirements
------------

Before installing Docker tools on your host environment, ensure your system meets the following requirements to support a smooth and successful installation.

Container memory
^^^^^^^^^^^^^^^^

We recommend configuring the Docker host with at least 6 GB of memory. Wazuh indexer memory consumption varies depending on the deployment and usage. Therefore, allocate the recommended memory for a complete stack deployment to work properly.

Increase max_map_count on your host (Linux)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Wazuh indexer creates many memory-mapped areas. To support this, the kernel must be configured to allow a process to create at least 262,144 memory-mapped areas.

#. Run the following command to set the ``max_map_count`` on your Docker host to ``262,144``:

   .. code-block:: console

      # sysctl -w vm.max_map_count=262144

#. Add the following line to the ``/etc/sysctl.conf`` file on your Docker host:

   .. code-block:: linux-config

      vm.max_map_count=262144

   This will ensure the ``vm.max_map_count`` value remains set after a reboot.

#. Run the following command to confirm that the value has been applied after rebooting:

   .. code-block:: console

      # sysctl vm.max_map_count

   .. code-block:: none
      :class: output

      vm.max_map_count = 262144

.. warning::

   If you don’t set at least this minimum ``max_map_count`` value of ``262,144`` on your host, the Wazuh indexer will not work correctly.

Docker engine
-------------

For Linux/Unix machines, Docker requires an AMD64 or ARM64 architecture system running kernel version 3.10 or later.

#. Run the following command to display and check your kernel version:

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

   If you want to use Docker as a non-root user, you should add your user to the ``docker`` group using the following command: ``usermod -aG docker your-user``.

   Log out and log back in for these changes to take effect.

Docker compose
--------------

The Wazuh Docker deployment requires Docker Compose 1.29 or later. Follow these steps to install it:

#. Download the Docker Compose binary:

   .. code-block:: console

      # curl -L "https://github.com/docker/compose/releases/download/v2.12.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

#. Grant execution permissions to the ``docker-compose`` binary:

   .. code-block:: console

      # chmod +x /usr/local/bin/docker-compose

#. Check the version of the installation to confirm everything is fine:

   .. code-block:: console

      # docker-compose --version

   The following shows an example of an output:

   .. code-block:: none
      :class: output

      Docker Compose version v2.12.2

   .. note::

      If the command ``docker-compose`` fails after installation. Create a symbolic link to ``/usr/bin`` or any other directory in your path using the command: ``ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose``
