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

#. Check the ``max_map_count`` value on your Docker host. The Wazuh indexer creates a large number of virtual memory-mapped areas (VMAs), so it needs a value of at least ``262144``.

   The Linux kernel default is ``65530``, but some distributions set a higher value. For example, Ubuntu 24.04 sets ``1048576``.

   A VMA is a region of memory that the kernel reserves for applications like the Wazuh indexer to access files directly from disk as if they were in RAM.

   .. code-block:: console

      # sysctl vm.max_map_count

   If the value is lower than ``262144``, run the following command to set it:

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

+----------+-------------------------------------------+
| **Port** | **Component**                             |
+----------+-------------------------------------------+
| 1517     | Wazuh 5.x agent connection and enrollment |
+----------+-------------------------------------------+
| 1514     | Wazuh 4.x agent connection                |
+----------+-------------------------------------------+
| 1515     | Wazuh 4.x agent enrollment                |
+----------+-------------------------------------------+
| 514      | Wazuh UDP                                 |
+----------+-------------------------------------------+
| 55000    | Wazuh manager API                         |
+----------+-------------------------------------------+
| 443      | Wazuh dashboard HTTPS                     |
+----------+-------------------------------------------+

In the multi-node stack, the Nginx container publishes ports 1517 and 1514, and the Wazuh manager master node publishes ports 1515, 514, and 55000. Neither stack publishes the Wazuh indexer API on port 9200. Only the other containers can reach it.

Wazuh central components
------------------------

Below are the steps for deploying the Wazuh central components in :ref:`single-node <single-node-stack>` and :ref:`multi-node <multi-node-stack>` stacks.

.. warning::

   Do not run the single-node and multi-node stacks simultaneously on the same Docker host. Both stacks publish the same host ports: ``443``, ``514/udp``, ``1514``, ``1515``, ``1517``, and ``55000``. While one stack is running, starting the other stack fails with ``port is already allocated``, and its Wazuh manager and the containers that depend on it don't start.

   To switch stacks, run the following command from the directory of the running stack, ``wazuh-docker/single-node/`` or ``wazuh-docker/multi-node/``:

   .. code-block:: console

      # docker compose down

   This command removes the stack's containers and keeps its data volumes. The stacks do not share volumes, so switching does not need the ``-v`` flag, which deletes the stack's data.

   If you already tried to start the other stack while this one was running, also run ``docker compose down`` in the other stack's directory before you start it. Otherwise, Docker can start its Wazuh manager without a network, and the stack doesn't work.

.. _single-node-stack:

Single-node stack deployment
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Follow the steps below to deploy the Wazuh central components in a single-node stack:

.. note::

   You need root user privileges to run the commands below. If you use Docker as a non-root user, run them with ``sudo``.

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

#. Run the certificate creation script and replace ``<DOCKER_HOST_IP>`` with the IP address that Wazuh agents use to reach the Docker host:

   .. code-block:: console

      # bash ../tools/utils/deployment/certificates-conf.sh --cert --copy --priv --agent-san <DOCKER_HOST_IP>

   Where:

   -  ``--cert`` generates the certificates.
   -  ``--priv`` option sets the file owners the Wazuh containers need.
   -  ``--agent-san`` option adds the address to the certificate the Wazuh manager presents to Wazuh agents. Wazuh agents check that this certificate names the address they connect to, and the Wazuh manager creates enrollment tokens only for addresses it names. Repeat ``--agent-san`` for each address agents use, such as a DNS name.

Create the credentials
~~~~~~~~~~~~~~~~~~~~~~

The Wazuh Docker images ship no passwords. Generate the passwords for your deployment once, after you prepare the certificates and before you start the stack for the first time.

#. Download the Wazuh credentials library to the ``single-node`` directory:

   .. code-block:: console

      # curl -o wazuh-credentials.sh https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR|/installation-assistant/wazuh-credentials-|WAZUH_CURRENT_DOCKER|-|WAZUH_CURRENT_DOCKER_REV|.sh

#. Run the credentials creation script:

   .. code-block:: console

      # bash ../tools/utils/deployment/credentials-conf.sh

   The script writes a random password for each account to ``config/credentials/indexer.env``, ``config/credentials/manager.env``, and ``config/credentials/dashboard.env``. The stack does not start without these files. Keep them, because they are the only record of your passwords. Don't edit them after the first start: an edit doesn't change the passwords, and the files then no longer match your deployment.

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

Log in to the Wazuh dashboard with the ``admin`` username. The password is the ``WAZUH_INDEXER_ADMIN_PASSWORD`` value in ``config/credentials/indexer.env``. Run the following command from the ``single-node`` directory to print it:

.. code-block:: console

   # grep '^WAZUH_INDEXER_ADMIN_PASSWORD=' config/credentials/indexer.env | cut -d= -f2-

.. note::

   To determine when the Wazuh indexer is up, the Wazuh dashboard container uses ``curl`` to repeatedly query the Wazuh indexer API (port 9200). You can expect to see several ``Failed to connect to Wazuh indexer port 9200`` log messages or ``Wazuh dashboard server is not ready yet`` until the Wazuh indexer is started. Then the setup process continues normally. It takes about one minute for the Wazuh indexer to start up.

.. _multi-node-stack:

Multi-node stack deployment
^^^^^^^^^^^^^^^^^^^^^^^^^^^

Follow the steps below to deploy the Wazuh central components in a multi-node stack:

.. note::

   You need root user privileges to run the commands below. If you use Docker as a non-root user, run them with ``sudo``.

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

#. Run the certificate creation script and replace ``<DOCKER_HOST_IP>`` with the IP address that Wazuh agents use to reach the Docker host:

   .. code-block:: console

      # bash ../tools/utils/deployment/certificates-conf.sh --cert --copy --priv --agent-san <DOCKER_HOST_IP>

   Where:

   -  ``--cert`` generates the certificates.
   -  ``--priv`` option sets the file owners the Wazuh containers need.
   -  ``--agent-san`` option adds the address to the agent listener certificate of both nodes so that an agent can verify whichever node answers. Don't add this address to ``config.yml`` instead, because the script rejects an address repeated across Wazuh manager nodes. Repeat ``--agent-san`` for each address agents use, such as a DNS name.

Create the credentials
~~~~~~~~~~~~~~~~~~~~~~

The Wazuh Docker images ship no passwords. Generate the passwords for your deployment once, after you prepare the certificates and before you start the stack for the first time.

#. Download the Wazuh credentials library to the ``multi-node`` directory:

   .. code-block:: console

      # curl -o wazuh-credentials.sh https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR|/installation-assistant/wazuh-credentials-|WAZUH_CURRENT_DOCKER|-|WAZUH_CURRENT_DOCKER_REV|.sh

#. Run the credentials creation script:

   .. code-block:: console

      # bash ../tools/utils/deployment/credentials-conf.sh

   The script writes a random password for each account to ``config/credentials/indexer.env``, ``config/credentials/manager.env``, and ``config/credentials/dashboard.env``. The stack does not start without these files. Keep them, because they are the only record of your passwords. Don't edit them after the first start: an edit doesn't change the passwords, and the files then no longer match your deployment.

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

   Allow a few minutes for the Wazuh indexer cluster and other components to initialize, especially on the first run.

Accessing the Wazuh dashboard
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

After deploying the multi-node stack, you can access the Wazuh dashboard using your Docker host's IP address or localhost.

.. code-block:: none

   https://<DOCKER_HOST_IP>

.. note::

   If you use a self-signed certificate, your browser will display a warning that it cannot verify the certificate's authenticity.

Log in to the Wazuh dashboard with the ``admin`` username. The password is the ``WAZUH_INDEXER_ADMIN_PASSWORD`` value in ``config/credentials/indexer.env``. Run the following command from the ``multi-node`` directory to print it:

.. code-block:: console

   # grep '^WAZUH_INDEXER_ADMIN_PASSWORD=' config/credentials/indexer.env | cut -d= -f2-

.. note::

   To determine when the Wazuh indexer is up, the Wazuh dashboard container uses ``curl`` to repeatedly query the Wazuh indexer API (port 9200). You can expect to see several ``Failed to connect to Wazuh indexer port 9200`` log messages or ``Wazuh dashboard server is not ready yet`` until the Wazuh indexer is started. Then the setup process continues normally. It takes about one minute for the Wazuh indexer to start up.

Wazuh agent
-----------

Running the Wazuh agent in a Docker container provides a lightweight option for integrations and log collection via syslog without installing the Wazuh agent directly on a host. However, when deployed this way, the containerized Wazuh agent cannot directly access or monitor the host system.

.. _agent_deployment_docker:

Deployment
^^^^^^^^^^

Follow these steps to deploy the Wazuh agent using Docker.

#. On the Docker host that runs the Wazuh central components, create an enrollment token. Run the command from the ``single-node`` or ``multi-node`` directory. Replace ``<DOCKER_HOST_IP>`` with an address you added with ``--agent-san`` when preparing the certificates:

   .. tabs::

      .. group-tab:: Single-node stack

         .. code-block:: console

            # docker compose exec wazuh.manager /var/wazuh-manager/bin/wazuh-manager-authd --create-enrollment-token --address <DOCKER_HOST_IP>

      .. group-tab:: Multi-node stack

         .. code-block:: console

            # docker compose exec wazuh.master /var/wazuh-manager/bin/wazuh-manager-authd --create-enrollment-token --address <DOCKER_HOST_IP>

   The first line of the output is the enrollment token. Copy it. The token expires after 30 days, and any number of Wazuh agents can use it until then.

   If the command returns ``address not in certificate SAN``, the address isn't in the Wazuh manager agent listener certificate. Use an address you passed with ``--agent-san``, or add the address. To add it, run the following commands as root from the ``single-node`` or ``multi-node`` directory. Pass every address agents use, because the script creates the certificates again from ``config.yml`` and the ``--agent-san`` values:

   .. tabs::

      .. group-tab:: Single-node stack

         .. code-block:: console

            # rm -rf wazuh-certificates/
            # bash ../tools/utils/deployment/certificates-conf.sh --cert --copy --priv --agent-san <DOCKER_HOST_IP>
            # docker compose up -d --force-recreate --no-deps wazuh.manager

      .. group-tab:: Multi-node stack

         .. code-block:: console

            # rm -rf wazuh-certificates/
            # bash ../tools/utils/deployment/certificates-conf.sh --cert --copy --priv --agent-san <DOCKER_HOST_IP>
            # docker compose up -d --force-recreate --no-deps wazuh.master wazuh.worker

   The certificate creation script doesn't replace existing certificates. If you run it again without removing ``wazuh-certificates/``, it copies the old certificates and still prints ``Process completed.``.

#. On the Docker host for the Wazuh agent, clone the `Wazuh Docker <https://github.com/wazuh/wazuh-docker>`__ repository:

   .. code-block:: console

      # git clone https://github.com/wazuh/wazuh-docker.git -b v|WAZUH_CURRENT_DOCKER|-|WAZUH_CURRENT_DOCKER_REV|

#. Navigate to the ``wazuh-docker/wazuh-agent/`` directory within your repository:

   .. code-block:: console

      # cd wazuh-docker/wazuh-agent

#. Edit the ``docker-compose.yml`` file. Replace ``<ENROLLMENT_TOKEN>`` with the enrollment token from step 1:

   .. code-block:: yaml
      :emphasize-lines: 7,8

      # Wazuh App Copyright (C) 2017, Wazuh Inc. (License GPLv2)
      services:
        wazuh.agent:
          image: wazuh/wazuh-agent:|WAZUH_CURRENT_DOCKER|-|WAZUH_CURRENT_DOCKER_REV|
          restart: always
          environment:
            - WAZUH_ENROLLMENT_TOKEN=<ENROLLMENT_TOKEN>
            #- WAZUH_AGENT_NAME=<WAZUH_AGENT_NAME>
          volumes:
            - wazuh_agent_etc:/var/ossec/etc
      volumes:
        wazuh_agent_etc:

   The token carries the Wazuh manager address and identifies its certificate authority, so the Wazuh agent needs no other connection settings. Don't set ``WAZUH_MANAGER_SERVER`` or ``WAZUH_MANAGER_ENDPOINT`` together with the token. On the first start, the container exits with an error when both are set, and Docker restarts it in a loop. To name the Wazuh agent, uncomment ``WAZUH_AGENT_NAME`` and replace ``<WAZUH_AGENT_NAME>``.

   The ``wazuh_agent_etc`` volume keeps the Wazuh agent enrollment when you recreate the container. After the first start, the container keeps the connection settings stored in this volume and ignores ``WAZUH_ENROLLMENT_TOKEN`` and ``WAZUH_MANAGER_SERVER``.

#. Start the Wazuh agent deployment using ``docker compose``:

   .. tabs::

      .. group-tab:: Background

         .. code-block:: console

            # docker compose up -d

      .. group-tab:: Foreground

         .. code-block:: console

            # docker compose up

#. Verify from your Wazuh dashboard that the Wazuh agent deployment was successful and visible. Navigate to **Agents management** > **Summary**, and you should see the Wazuh agent container active on your dashboard.
