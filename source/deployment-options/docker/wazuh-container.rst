.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Wazuh supports the deployment of the central components on Docker. Learn more in this section of the documentation.

Wazuh Docker deployment
=======================

Wazuh consists of a multi-platform Wazuh agent and three central components: the Wazuh manager, the Wazuh indexer, and the Wazuh dashboard. For more information, refer to the :doc:`Wazuh components </getting-started/components/index>` documentation.

Deployment options
------------------

Wazuh supports deploying its central components and agent on Docker.

-  :ref:`Single-node stack <single-node-stack>`: This stack deploys one of each Wazuh central component as a separate container. It includes:

   -  Wazuh indexer container: Stores and indexes security data collected by the Wazuh manager. It also provides near real-time search and security analytics.
   -  Wazuh manager container: Transforms data received from Wazuh agents and agentless devices into standardized schema documents using the Wazuh Common Schema (WCS).
   -  Wazuh dashboard container: Centralized web interface for monitoring and searching security data, and managing Wazuh.

   It provides persistent storage and certificates for secure communication.

-  :ref:`Multi-node stack <multi-node-stack>`: This stack deploys each Wazuh component as a separate container. It includes:

   -  Three Wazuh indexer containers: Work together in a cluster to store and replicate indexed data, ensuring scalability and fault tolerance.
   -  Two Wazuh manager containers: One master and one worker node. The master coordinates Wazuh agent management and rule updates, while the worker provides redundancy and load distribution.
   -  One Wazuh dashboard container.
   -  One Nginx proxy container: This provides a single secure entry point that load-balances traffic across multiple Wazuh manager nodes for high availability. The Nginx container acts as a reverse proxy, distributing incoming requests across the available manager nodes and providing SSL termination for secure communication.

   This deployment stack provides persistent storage, secure communication, and high availability.

-  `Wazuh agent`_: This deploys the Wazuh agent as a container on your Docker host.

Prerequisites
-------------

Before deploying Wazuh on Docker, ensure your environment meets the following requirements.

System requirements
^^^^^^^^^^^^^^^^^^^

Single-node stack deployment
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

-  **Operating system**: Linux, Windows, or macOS
-  **Architecture**: AMD64 or ARM64 (AARCH64)
-  **CPU**: At least 4 cores
-  **Memory**: At least 8 GB of RAM for the Docker host
-  **Disk space**: At least 50 GB storage for Docker images and data volumes

Multi-node stack deployment
~~~~~~~~~~~~~~~~~~~~~~~~~~~

-  **Operating system**: Linux, Windows, or macOS
-  **Architecture**: AMD64 or ARM64 (AARCH64)
-  **CPU**: At least 4 cores
-  **Memory**: At least 16 GB for the Docker host
-  **Disk space**: At least 100 GB storage for Docker images and data volumes

Wazuh agent deployment
~~~~~~~~~~~~~~~~~~~~~~

-  **Operating system**: Linux, Windows, or macOS
-  **Architecture**: AMD64 or ARM64 (AARCH64)
-  **CPU**: At least 2 cores
-  **Memory**: At least 1 GB of RAM for the Docker host
-  **Disk space**: At least 10 GB storage for Docker images and logs

Software requirements
^^^^^^^^^^^^^^^^^^^^^

.. tabs::

   .. group-tab:: Linux

      -  **Docker Engine**:

         -  `Install Docker Engine <https://docs.docker.com/engine/install/>`__ (requires version 20.10.0 or newer)

      -  **Docker Compose**: Latest stable version
      -  **Git**: Required for cloning the Wazuh Docker repository

         -  `Install the latest version of Git <https://git-scm.com/install/>`__

   .. group-tab:: Windows

      -  **Docker Desktop**:

         -  `Install Docker Desktop <https://docs.docker.com/desktop/setup/install/windows-install/>`__ (requires WSL 2)
         -  Docker Compose is included with Docker Desktop on Windows

      -  **Git**: Required for cloning the Wazuh Docker repository

         -  `Install the latest version of Git <https://git-scm.com/install/>`__

   .. group-tab:: macOS

      -  **Docker Desktop**:

         -  `Install Docker Desktop <https://docs.docker.com/desktop/setup/install/mac-install/>`__
         -  Docker Compose

      -  **Git**: Required for cloning the Wazuh Docker repository

         -  `Install the latest version of Git <https://git-scm.com/install/>`__

      -  **Bash shell**
      -  `Install OpenSSL <https://formulae.brew.sh/formula/openssl@3>`__
      -  **GNU versions of apps**:

         -  `Install GNU sed <https://formulae.brew.sh/formula/gnu-sed>`__
         -  `Install GNU awk <https://formulae.brew.sh/formula/gawk>`__
         -  `Install GNU grep <https://formulae.brew.sh/formula/grep>`__

Linux/Unix host requirements
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Additional configuration is required to ensure proper functionality when running Wazuh Docker on a Linux/Unix operating system.

#. Run the following command to set the ``max_map_count`` on your Docker host to ``262144``. The Wazuh indexer creates a large number of virtual memory-mapped areas (VMAs), so the kernel must be configured above the Linux default limit of ``65530``. A VMA is a region of memory that the kernel reserves for applications like the Wazuh indexer to access files directly from disk as if they were in RAM.

   .. code-block:: console

      # sysctl -w vm.max_map_count=262144

   .. warning::

      This configuration allows more files and index segments to be mapped to memory simultaneously without errors or crashes. If you don't set a minimum value of at least ``262144`` for ``max_map_count`` on your Linux host, the Wazuh indexer will not work correctly.

#. If you want to use Docker as a non-root user, you should add the user to the ``docker`` group using the following command:

   .. code-block:: console

      # usermod -aG docker <USER>

   Replace ``<USER>`` with your username. Log out and back in for changes to take effect.

Exposed ports
-------------

The following ports are exposed when the Wazuh central components are deployed.

+-----------+-----------------------------+
| **Port**  | **Component**               |
+-----------+-----------------------------+
| 1514      | Wazuh TCP                   |
+-----------+-----------------------------+
| 1515      | Wazuh TCP                   |
+-----------+-----------------------------+
| 514       | Wazuh UDP                   |
+-----------+-----------------------------+
| 55000     | Wazuh manager API           |
+-----------+-----------------------------+
| 9200      | Wazuh indexer API           |
+-----------+-----------------------------+
| 443       | Wazuh dashboard HTTPS       |
+-----------+-----------------------------+

Wazuh central components
------------------------

Below are the steps for deploying the Wazuh central components in :ref:`single-node <single-node-stack>` and :ref:`multi-node <multi-node-stack>` stacks.

.. warning::

   Do not run the single-node and multi-node stacks simultaneously on the same Docker host. Both stacks use overlapping resources (such as container names, ports, and volumes), which can lead to conflicts, unexpected behavior, or data corruption.

.. _single-node-stack:

Single-node stack deployment
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Follow the steps below to deploy the Wazuh central components in a single-node stack:

.. note::

   All deployment commands provided apply to Windows, macOS, and Linux environments. Some commands may require minor syntax adjustments depending on the shell or terminal in use.

Cloning the repository
~~~~~~~~~~~~~~~~~~~~~~

Perform the following to clone the Wazuh Docker repository:

#. Clone the `Wazuh Docker <https://github.com/wazuh/wazuh-docker>`__ repository to your system:

   .. code-block:: console

      # git clone https://github.com/wazuh/wazuh-docker.git -b v|WAZUH_CURRENT_DOCKER|-|WAZUH_CURRENT_DOCKER_REV|

#. Navigate to the ``single-node`` directory to execute all the following commands.

   .. code-block:: console

      # cd wazuh-docker/single-node/

.. note::

   When testing Wazuh Docker |WAZUH_CURRENT_DOCKER|-|WAZUH_CURRENT_DOCKER_REV|, update the image tags in the ``docker-compose.yml`` file to use the ``-latest`` suffix. For example: ``image: wazuh/wazuh-manager:|WAZUH_CURRENT_DOCKER|-|WAZUH_CURRENT_DOCKER_REV|-latest``.

Prepare certificate
~~~~~~~~~~~~~~~~~~~

Secure communication between Wazuh components requires the use of certificates. Follow the steps below to prepare and generate the certificates:

#. Run the following command to download the certificate creation script:

   .. code-block:: console

      # curl -o wazuh-certs-tool.sh https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR|/installation-assistant/wazuh-certs-tool-|WAZUH_CURRENT_DOCKER|-|WAZUH_CURRENT_DOCKER_REV|.sh

#. Create a ``config.yml`` file with the following content:

   .. code-block:: yaml

      nodes:
        # Wazuh indexer server nodes
        indexer:
          - name: wazuh.indexer
            dns: "wazuh.indexer"

        # Wazuh manager nodes
        # Use node_type only with more than one Wazuh manager
        manager:
          - name: wazuh.manager
            dns: "wazuh.manager"

        # Wazuh dashboard node
        dashboard:
          - name: wazuh.dashboard
            dns: "wazuh.dashboard"

#. Run the certificate creation script:

   .. code-block:: console

      # bash ../tools/utils/deployment/certificates-conf.sh --cert --copy --priv

Deployment
~~~~~~~~~~

Start the Wazuh Docker deployment using the ``docker compose`` command:

.. tabs::

   .. group-tab:: Background

      .. code-block:: console

         # docker compose up -d

   .. group-tab:: Foreground

      .. code-block:: console

         # docker compose up

.. note::

   Docker does not dynamically reload the configuration. After changing a component's configuration, you need to restart the stack.

   Allow a minute or two for the Wazuh indexer and other components to initialize, especially on the first run.

Accessing the Wazuh dashboard
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

After deploying the single-node stack, you can access the Wazuh dashboard using your Docker host's IP address or localhost.

.. code-block:: none

   https://<DOCKER_HOST_IP>

.. note::

   If you use a self-signed certificate, your browser will display a warning that it cannot verify the certificate's authenticity.

This is the default username and password to access the Wazuh dashboard:

-  Username: ``admin``
-  Password: ``admin``

.. note::

   To determine when the Wazuh indexer is up, the Wazuh dashboard container uses ``curl`` to repeatedly query the Wazuh indexer API (port 9200). You can expect to see several ``Failed to connect to Wazuh indexer port 9200`` log messages or ``Wazuh dashboard server is not ready yet`` until the Wazuh indexer is started. Then the setup process continues normally. It takes about one minute for the Wazuh indexer to start up. You can find the default Wazuh indexer credentials in the ``docker-compose.yml`` file.

.. _multi-node-stack:

Multi-node stack deployment
^^^^^^^^^^^^^^^^^^^^^^^^^^^

Follow the steps below to deploy the Wazuh central components in a multi-node stack:

.. note::

   All deployment commands provided apply to Windows, macOS, and Linux environments. Some commands may require minor syntax adjustments depending on the shell or terminal in use.

Cloning the repository
~~~~~~~~~~~~~~~~~~~~~~

Perform the following to clone the Wazuh Docker repository:

#. Clone the `Wazuh Docker <https://github.com/wazuh/wazuh-docker>`__ repository to your system:

   .. code-block:: console

      # git clone https://github.com/wazuh/wazuh-docker.git -b v|WAZUH_CURRENT_DOCKER|-|WAZUH_CURRENT_DOCKER_REV|

#. Navigate to the ``multi-node`` directory to execute all the following commands.

   .. code-block:: console

      # cd wazuh-docker/multi-node/

.. note::

   When testing Wazuh Docker |WAZUH_CURRENT_DOCKER|-|WAZUH_CURRENT_DOCKER_REV|, update the image tags in the ``docker-compose.yml`` file to use the ``-latest`` suffix. For example: ``image: wazuh/wazuh-manager:|WAZUH_CURRENT_DOCKER|-|WAZUH_CURRENT_DOCKER_REV|-latest``.

Prepare certificate
~~~~~~~~~~~~~~~~~~~

Secure communication between Wazuh components requires the use of certificates. Follow the steps below to prepare and generate the certificates:

#. Run the following command to download the certificate creation script:

   .. code-block:: console

      # curl -o wazuh-certs-tool.sh https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR|/installation-assistant/wazuh-certs-tool-|WAZUH_CURRENT_DOCKER|-|WAZUH_CURRENT_DOCKER_REV|.sh

#. Create a ``config.yml`` file with the following content:

   .. code-block:: yaml

      nodes:
        # Wazuh indexer server nodes
        indexer:
          - name: wazuh1.indexer
            dns: "wazuh1.indexer"
          - name: wazuh2.indexer
            dns: "wazuh2.indexer"
          - name: wazuh3.indexer
            dns: "wazuh3.indexer"

        # Wazuh manager nodes
        # Use node_type only with more than one Wazuh manager
        manager:
          - name: wazuh.master
            dns: "wazuh.master"
            node_type: master
          - name: wazuh.worker
            dns: "wazuh.worker"
            node_type: worker

        # Wazuh dashboard node
        dashboard:
          - name: wazuh.dashboard
            dns: "wazuh.dashboard"

#. Run the certificate creation script:

   .. code-block:: console

      # bash ../tools/utils/deployment/certificates-conf.sh --cert --copy --priv

Deployment
~~~~~~~~~~

#. Start the Wazuh Docker deployment using the ``docker compose`` command:

   .. tabs::

      .. group-tab:: Background

         .. code-block:: console

            # docker compose up -d

      .. group-tab:: Foreground

         .. code-block:: console

            # docker compose up

.. note::

   Docker does not dynamically reload the configuration. After changing a component's configuration, you need to restart the stack.

Accessing the Wazuh dashboard
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

After deploying the multi-node stack, you can access the Wazuh dashboard using your Docker host's IP address or localhost.

.. code-block:: none

   https://<DOCKER_HOST_IP>

.. note::

   If you use a self-signed certificate, your browser will display a warning that it cannot verify the certificate's authenticity.

This is the default username and password to access the Wazuh dashboard:

-  Username: ``admin``
-  Password: ``admin``

.. note::

   To determine when the Wazuh indexer is up, the Wazuh dashboard container uses ``curl`` to repeatedly query the Wazuh indexer API (port 9200). You can expect to see several ``Failed to connect to Wazuh indexer port 9200`` log messages or ``Wazuh dashboard server is not ready yet`` until the Wazuh indexer is started. Then the setup process continues normally. It takes about one minute for the Wazuh indexer to start up. You can find the default Wazuh indexer credentials in the ``docker-compose.yml`` file.

Wazuh agent
-----------

Running the Wazuh agent in a Docker container provides a lightweight option for integrations and log collection via syslog without installing the Wazuh agent directly on a host. However, when deployed this way, the containerized Wazuh agent cannot directly access or monitor the host system.

.. _agent_deployment_docker:

Deployment
^^^^^^^^^^

Follow these steps to deploy the Wazuh agent using Docker.

#. Clone the `Wazuh Docker <https://github.com/wazuh/wazuh-docker>`__ repository to your system:

   .. code-block:: console

      # git clone https://github.com/wazuh/wazuh-docker.git -b v|WAZUH_CURRENT_DOCKER|-|WAZUH_CURRENT_DOCKER_REV|

#. Navigate to the ``wazuh-docker/wazuh-agent/`` directory within your repository:

   .. code-block:: console

      # cd wazuh-docker/wazuh-agent

#. Edit the ``docker-compose.yml`` file. Replace ``<WAZUH_MANAGER_IP>`` with the IP address of your Wazuh manager:

   .. code-block:: yaml
      :emphasize-lines: 6,7

      # Wazuh App Copyright (C) 2017, Wazuh Inc. (License GPLv2)
      services:
        wazuh.agent:
          image: wazuh/wazuh-agent:|WAZUH_CURRENT_DOCKER|-|WAZUH_CURRENT_DOCKER_REV|-latest
          restart: always
          environment:
            - WAZUH_MANAGER_SERVER=<WAZUH_MANAGER_IP>
          volumes:
            - ./config/wazuh-agent-conf:/wazuh-config-mount/etc/ossec.conf

#. Start the Wazuh agent deployment using ``docker compose``:

   .. tabs::

      .. group-tab:: Background

         .. code-block:: console

            # docker compose up -d

      .. group-tab:: Foreground

         .. code-block:: console

            # docker compose up

#. Verify from your Wazuh dashboard that the Wazuh agent deployment was successful and visible. Navigate to the **Agent management** > **Summary**, and you should see the Wazuh agent container active on your dashboard.
