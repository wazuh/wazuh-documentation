.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: The Wazuh module for Docker identifyes security incidents across containers alerting in real time. Learn more about this in this PoC.

Monitoring Docker events
========================

Docker automates the deployment of different applications inside software containers. The Wazuh module for Docker identifies security incidents across containers and alerts in real-time. In this use case, you configure Wazuh to monitor Docker events on an Ubuntu endpoint hosting Docker containers.

See the :doc:`Monitoring container activity </user-manual/capabilities/container-security/monitoring-docker>` section of the documentation to learn more about monitoring Docker and the ``docker-listener`` module.

Infrastructure
--------------

+---------------+------------------------------------------------------------------+
| Endpoint      | Description                                                      |
+===============+==================================================================+
| Ubuntu 22.04  | This is the Docker host where you create and delete containers.  |
+---------------+------------------------------------------------------------------+

Configuration
-------------

Perform the following steps to install Docker on the Ubuntu endpoint and configure Wazuh to monitor Docker events.

#. Install Python and pip:

   .. code-block:: console

      # sudo apt install python3 python3-pip

#. Upgrade pip:

   .. code-block:: console

      # pip3 install --upgrade pip

#. Install Docker and Python Docker Library:

   .. code-block:: console

      $ curl -sSL https://get.docker.com/ | sh
      $ sudo pip3 install docker==4.2.0

#. Edit the Wazuh agent configuration file ``/var/ossec/etc/ossec.conf`` and add this block to enable the ``docker-listener`` module:

   .. code-block:: xml

      <ossec_config>
        <wodle name="docker-listener">
          <interval>10m</interval>
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

Perform several Docker activities like pulling a Docker image, starting an instance, running some other Docker commands, and then deleting the container.

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

Visualize the alerts
--------------------

You can visualize the alert data in the Wazuh dashboard. To do this, go to the **Threat hunting** module and add the filters in the search bar to query the alerts.

-  ``rule.groups: "docker"``

   .. thumbnail:: /images/poc/docker-group-alerts.png
      :title: Docker group alerts
      :align: center
      :width: 80%

-  Additionally, using the **Filter by type** search field, apply the ``data.docker.Action`` filter to show what actions were performed.

   .. thumbnail:: /images/poc/docker-actions-alerts.png
      :title: Docker actions alerts
      :align: center
      :width: 80%

Troubleshooting
---------------

-  **Error log**:

   .. code-block:: none

      wazuh-modulesd:docker-listener: ERROR: /usr/bin/env: ‘python’: No such file or directory
   
   **Location**: Wazuh agent log - ``/var/ossec/logs/ossec.log``

   **Resolution**: You can create a symbolic link to solve this:

   .. code-block:: console

      $ sudo ln -s /usr/bin/python3 /usr/bin/python
