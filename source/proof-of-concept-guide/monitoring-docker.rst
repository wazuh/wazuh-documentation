.. _poc_monitoring_docker:


Monitoring Docker
=================

The Wazuh module for Docker can be used to identify security incidents across containers, alerting in real-time. It acts as a subscriber to the Docker Engine API.

Check `Docker Wodle <https://documentation.wazuh.com/current/docker-monitor/monitoring_containers_activity.html>`_ for detailed info

Configuration
-------------

- On the monitored system (the Docker host), install required Wazuh module dependency ``pip install docker``

- Configure the Docker listener in the RHEL Agent

    .. code-block:: XML

        <ossec_config>
            <wodle name="docker-listener">
            <interval>10m</interval>
            <attempts>5</attempts>
            <run_on_start>yes</run_on_start>
            <disabled>no</disabled>
            </wodle>
        </ossec_config>

Steps to generate the alerts
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

- Perform any usual Docker action like pulling an image, starting a container, running a command or deleting the container.

    .. code-block:: console

        docker stop `docker ps -a -q` && docker rm `docker ps -a -q`
        docker pull nginx
        docker run -d -P --name nginx_container nginx
        docker exec -ti nginx_container cat /etc/passwd
        docker exec -ti nginx_container /bin/bash
        docker stop nginx_container
        docker rm nginx_container

Alerts
^^^^^^

Related alerts can be found with:

- ``rule.groups: "docker"``
- It's interesting to check for ``data.docker.Action`` field which states which action was performed

Affected endpoint
^^^^^^^^^^^^^^^^^
- Linux RHEL