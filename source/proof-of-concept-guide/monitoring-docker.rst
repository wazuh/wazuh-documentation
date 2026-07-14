.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: The Wazuh module for Docker identifies security incidents across containers and alerts in real time. Learn more about this in this PoC.

Monitoring Docker events
========================

Docker automates the deployment of different applications inside software containers. The Wazuh module for Docker identifies security incidents across containers and alerts in real time. In this use case, you configure Wazuh to monitor Docker events on an Ubuntu endpoint hosting Docker containers.

Infrastructure
--------------

+--------------+-----------------------------------------------------------------+
| Endpoint     | Description                                                     |
+==============+=================================================================+
| Ubuntu 24.04 | This is the Docker host where you create and delete containers. |
+--------------+-----------------------------------------------------------------+

Configuration
-------------

Perform the following steps to install Docker on the Ubuntu endpoint and configure Wazuh to monitor Docker events.

#. Install Python and pip:

   .. code-block:: console

      $ sudo apt install -y python3

#. Download pip:

   .. code-block:: console

      $ curl -sS https://bootstrap.pypa.io/get-pip.py -o get-pip.py
      $ python3 get-pip.py --break-system-packages

#. Install Docker and the Python Docker library. For Python 3.11 to 3.12:

   .. code-block:: console

      $ curl -sSL https://get.docker.com | sh
      $ sudo pip3 install docker==7.1.0 urllib3==1.26.20 requests==2.32.2 --break-system-packages

   .. note::

      This command modifies the default externally managed Python environment. See the `PEP 668 <https://peps.python.org/pep-0668/>`__ description for more information. To prevent the modification, you can run ``pip3 install --upgrade pip`` within a virtual environment. You must update the Docker ``/var/ossec/wodles/docker/DockerListener`` script shebang with your virtual environment interpreter, for example, ``#!</path/to/your/virtual/environment>/bin/python3``.

      Delete any newer version of urllib3 if present.

#. Start and enable the Docker service:

   .. code-block:: console

      $ sudo systemctl start docker.service
      $ sudo systemctl enable docker.service

#. Edit the Wazuh agent configuration file ``/var/ossec/etc/ossec.conf`` and add this block to enable the ``docker-listener`` module:

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

Test the configuration
----------------------

Perform several Docker activities, such as pulling a Docker image, starting an instance, running additional Docker commands, and deleting the container.

#. Pull an image, such as the NGINX image, and run a container:

   .. code-block:: console

      $ sudo docker pull nginx
      $ sudo docker run -d -P --name nginx_container nginx
      $ sudo docker exec -it nginx_container cat /etc/passwd
      $ sudo docker exec -it nginx_container /bin/bash
      $ exit

#. Stop and remove the container:

   .. code-block:: console

      $ sudo docker stop nginx_container
      $ sudo docker rm nginx_container

Visualize the findings
----------------------

You can visualize the findings on the Wazuh dashboard. Go to **Cloud security** > **Docker** and select **Findings**.

.. thumbnail:: /images/poc/docker-findings.png
   :title: Visualize Docker findings
   :align: center
   :width: 80%

Troubleshooting
---------------

-  **Error log**:

   .. code-block:: none

      wazuh-modulesd:docker-listener: ERROR: /usr/bin/env: 'python': No such file or directory

   **Location**: Wazuh agent log - ``/var/ossec/logs/ossec.log``

   **Resolution**: Create a symbolic link to solve this:

   .. code-block:: console

      $ sudo ln -s /usr/bin/python3 /usr/bin/python
