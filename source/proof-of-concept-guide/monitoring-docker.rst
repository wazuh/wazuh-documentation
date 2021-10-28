.. _poc_monitoring_docker:

Monitoring Docker
=================

Alert in real time about the NGINX Docker container's activity using the Wazuh module for Docker. This module acts as a subscriber to the Docker Engine API and is used to identify security incidents across containers.

Check `Docker Wodle <https://documentation.wazuh.com/current/docker-monitor/monitoring_containers_activity.html>`_ for detailed information.

Configuration
-------------

#. Configure the Docker listener in ``/var/ossec/etc/ossec.conf`` at the RHEL 7 Agent endpoint.

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
        # docker stop nginx_container
        # docker rm nginx_container

Alerts
------

Related alerts can be found with:

* ``rule.groups: "docker"``. The ``data.docker.Action`` field states which action was performed.

Affected endpoints
------------------

* RHEL 7 agent host
