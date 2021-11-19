.. _poc_monitoring_docker:

Monitoring Docker
=================

The Wazuh module for Docker can be used to identify security incidents across containers, alerting in real-time. It acts as a subscriber to the Docker Engine API.

In this scenario you will need:

* CentOS Linux 8 with Wazuh manager up and running
* CentOS Linux 8 with Wazuh agent installed

Learn more about monitoring Docker and the Docker wodle, see the :ref:`Monitoring containers activity <docker-monitor-index>` section of the documentation.


Configuration
-------------

Configure your environment as follows to test the POC.

#. Configure the Docker listener in the ``/var/ossec/etc/ossec.conf`` configuration file at the CentOS 8 Agent endpoint.

    .. code-block:: XML

        <ossec_config>
            <wodle name="docker-listener">
            <interval>10m</interval>
            <attempts>5</attempts>
            <run_on_start>yes</run_on_start>
            <disabled>no</disabled>
            </wodle>
        </ossec_config>

#. Restart the Wazuh agent to apply the changes.

    .. code-block:: console

        # systemctl restart wazuh-agent


Steps to generate the alerts
----------------------------

#. Pull a Docker image, start the container, run a Docker command and delete the container.

    .. code-block:: console

        # docker stop `docker ps -a -q` && docker rm `docker ps -a -q`
        # docker pull nginx
        # docker run -d -P --name nginx_container nginx
        # docker exec -ti nginx_container cat /etc/passwd
        # docker exec -ti nginx_container /bin/bash
        # exit
        # docker stop nginx_container
        # docker rm nginx_container

Query the alerts
----------------

At the Kibana menu go to the Discover option, from there you will be able to add filters and search-related alerts using the following filters:

* ``rule.groups: "docker"``
* Additionally, the ``data.docker.Action`` field states which action was performed.

.. thumbnail:: ../images/poc/Monitoring_Docker.png
          :title: Monitoring Docker
          :align: center
          :wrap_image: No

Troubleshooting
---------------

* In case of getting the following error in the agent log file ``/var/ossec/logs/ossec.log``: 

    ``wazuh-modulesd:docker-listener: ERROR: /usr/bin/env: ‘python’: No such file or directory`` 

    This can be solved by creating a symbolic link.

        .. code-block:: console
            
            # ln -s /usr/bin/python3 /usr/bin/python

* In case of getting the following error in the agent log file ``/var/ossec/logs/ossec.log``: 

    ``wazuh-modulesd:docker-listener: ERROR: 'docker' module needs to be installed. Execute 'pip install docker' to do it.`` 

    This can be solved by running the following command.
        
        .. code-block:: console
            
            # pip3 install docker

