.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn the prerequisites to deploy Wazuh using official Docker images in this section of the documentation.

Prerequisites
=============

Before deploying Wazuh on Docker, ensure your environment meets the following requirements.

System requirements
-------------------

-  **Operating system**: Linux (recommended), Windows, or macOS
-  **Architecture**: AMD64 or ARM64
-  **Kernel version**: 3.10 or later (for Linux)
-  **CPU**: At least 4 cores
-  **Memory**: At least 6 GB of RAM for the Docker host
-  **Disk space**: At least 50 GB storage for Docker images and data volumes
-  **Network**: Internet connectivity for downloading Docker images

Required software
-----------------

Linux (recommended)
^^^^^^^^^^^^^^^^^^^

-  **Docker Engine**: Latest stable version
-  **Docker Compose**: Latest stable version
-  **Git**: For cloning the Wazuh Docker repository

Additional configuration is required to ensure proper functionality when running Wazuh Docker on a Linux operating system.

#. Run the following command to set the ``max_map_count`` on your Docker host to ``262,144``. The Wazuh indexer creates a large number of memory‑mapped areas, so the kernel must be configured to allow at least ``262,144`` memory-mapped areas:

   .. code-block:: console

      # sysctl -w vm.max_map_count=262144

   .. warning::

      If you don’t set a minimum value of at least ``262,144`` for ``max_map_count`` on your Linux host, the Wazuh indexer will not work correctly.

#. If you want to use Docker as a non-root user, you should add your user to the ``docker`` group using the following command:

   .. code-block:: console

      # usermod -aG docker your-user

   Log out and back in for changes to take effect.

#. If the command ``docker-compose`` fails after installation. Create a symbolic link to ``/usr/bin`` or any other directory in your path using the following command:

   .. code-block:: console

      # ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose

macOS
^^^^^

-  **Docker Engine**: Latest stable version
-  **Docker Compose**: Latest stable version
-  **Git**: For cloning the Wazuh Docker repository

Windows
^^^^^^^

-  **Docker Desktop (Windows)**: Latest stable version
-  **Git**: For cloning the Wazuh Docker repository
-  **WSL 2**: Required for Windows hosts to run Docker
