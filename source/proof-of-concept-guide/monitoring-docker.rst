.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: The Wazuh module for Docker identifies security incidents across containers and alerts in real time. Learn more about this in this PoC.

Monitoring Docker events
========================

Docker runs applications inside software containers. The Wazuh module for Docker collects Docker events, such as image pulls and container creation and removal, to identify security incidents across containers. In this use case, you install Docker on the Ubuntu endpoint and configure Wazuh to monitor its events. See :doc:`Monitoring Docker </user-manual/capabilities/container-security/monitoring-docker>`.

Endpoints
---------

+--------------+-----------------------------------------------------+
| Endpoint     | Role                                                |
+==============+=====================================================+
| Ubuntu 24.04 | Docker host where you create and delete containers. |
+--------------+-----------------------------------------------------+

Configuration
-------------

Ubuntu endpoint
^^^^^^^^^^^^^^^

#. Install Python and pip:

   .. code-block:: console

      $ sudo apt update
      $ sudo apt install -y python3 python3-pip

#. `Install Docker <https://docs.docker.com/engine/install/ubuntu/>`__:

   .. code-block:: console

      $ curl -sSL https://get.docker.com | sh

#. Install the `Python Docker library <https://pypi.org/project/docker/>`__ and its dependencies:

   .. warning::

      Before you confirm the removal, check the packages that apt lists. Apt also removes the packages that depend on ``python3-urllib3``, such as ``cloud-init``, ``ubuntu-server``, and ``python3-boto3``.

   .. code-block:: console

      $ sudo apt remove python3-urllib3
      $ sudo pip3 install docker==7.1.0 urllib3==1.26.20 requests==2.32.2 --ignore-installed --break-system-packages

   .. note::

      These commands modify the default externally managed Python environment. See `PEP 668 <https://peps.python.org/pep-0668/>`__ for more information. Ubuntu can install ``urllib3`` from a Debian package, so the first command removes it before ``pip3`` installs the required version.

#. Start and enable the Docker service:

   .. code-block:: console

      $ sudo systemctl start docker.service
      $ sudo systemctl enable docker.service

#. Append the following configuration to ``/var/ossec/etc/ossec.conf`` to enable the ``docker-listener`` module:

   .. code-block:: xml

      <ossec_config>
        <wodle name="docker-listener">
          <interval>5m</interval>
          <attempts>5</attempts>
          <run_on_start>yes</run_on_start>
          <disabled>no</disabled>
        </wodle>
      </ossec_config>

#. Restart the Wazuh agent to apply the changes:

   .. code-block:: console

      $ sudo systemctl restart wazuh-agent

Wazuh dashboard
^^^^^^^^^^^^^^^

#. Go to **Ruleset management** > **Overview**.

#. Search for ``docker`` and click the **docker** integration name to open it.

#. Click **Actions** and select **Enable**.

   .. thumbnail:: /images/poc/docker-integration-enable.png
      :title: Enable the docker integration
      :alt: Wazuh dashboard Ruleset management page of the docker integration with the Enable option in the Actions menu
      :align: center
      :width: 80%

#. Go to **Ruleset management** > **Detectors** and select the **docker** detector. If it isn't active, click **Actions** and select **Start detector**.

   .. thumbnail:: /images/poc/docker-detector-start.png
      :title: Start the docker detector
      :alt: Wazuh dashboard Ruleset management Detectors page of the docker detector with the Actions menu open
      :align: center
      :width: 80%

Wait a few minutes before you test the configuration. The Wazuh manager applies content changes at its next synchronization.

Verify data ingestion
---------------------

Check that the Docker module started:

.. code-block:: console

   $ sudo grep -i docker-listener /var/ossec/logs/ossec.log

The output includes ``Module docker-listener started.`` and no ``ERROR`` line.

Test the configuration
----------------------

Run the following Docker commands on the Ubuntu endpoint to generate events.

#. Pull the NGINX image, run a container, and run commands inside it:

   .. code-block:: console

      $ sudo docker pull nginx
      $ sudo docker run -d -P --name nginx_container nginx
      $ sudo docker exec -it nginx_container cat /etc/passwd
      $ sudo docker exec -it nginx_container /bin/bash
      # exit

#. Pause, unpause, stop, and remove the container:

   .. code-block:: console

      $ sudo docker pause nginx_container
      $ sudo docker unpause nginx_container
      $ sudo docker stop nginx_container
      $ sudo docker rm nginx_container

View the findings
-----------------

You see one finding for each container action, for example ``Command executed inside Docker container - nginx_container`` and ``Interactive shell session started inside Docker container - nginx_container``.

In the Wazuh dashboard, go to **Cloud security** > **Docker** and select **Findings**. You see findings for the image pull and the container activity.

.. thumbnail:: /images/poc/docker-findings.png
   :title: Visualize Docker findings
   :alt: Wazuh dashboard Docker Findings tab listing the findings for the container actions on the Ubuntu endpoint
   :align: center
   :width: 80%

Troubleshooting
---------------

+---------------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------+
| Check                                 | How                                                                                                                                                |
+=======================================+====================================================================================================================================================+
| The Docker module runs                | ``sudo grep -i docker-listener /var/ossec/logs/ossec.log`` shows no ``ERROR`` line.                                                                |
+---------------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------+
| The interactive shell opened          | ``docker exec -it`` needs a terminal. Without one, run ``sudo docker exec nginx_container /bin/bash -c id``, which raises only the medium finding. |
+---------------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------+
| Docker events reach Wazuh             | In **Explore** > **Discover**, search for ``wazuh.integration.name: docker``.                                                                      |
+---------------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------+
| The ``docker`` integration is enabled | **Ruleset management** > **Overview** shows it enabled. With it off, Wazuh drops the events without any message.                                   |
+---------------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------+

Clean up
--------

The test already removes the container. To also remove the NGINX image, run the following command:

.. code-block:: console

   $ sudo docker rmi nginx
