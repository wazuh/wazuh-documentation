.. meta::
  :description: The Wazuh module for Docker can be used to identify security incidents across containers, alerting in real time. Learn more about this in this POC.
  
.. _poc_monitoring_docker:

Monitoring Docker
=================

Docker automates the deployment of different applications inside software containers. The Wazuh module for Docker is a subscriber to the Docker Engine API that identifies security incidents across containers and alerts in real time.

See the :ref:`Monitoring container activity <docker-monitor-index>` section of the documentation to learn more about monitoring Docker and the Docker wodle.


Configuration
-------------

Configure your environment as follows to test the POC.

#. Configure the Docker listener in the ``/var/ossec/etc/ossec.conf`` configuration file at the CentOS 8 endpoint.

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

You can visualize the alert data in the Wazuh Kibana plugin. To do this, go to the **Security events** module and add the filters in the search bar to query the alerts.

* ``rule.groups: "docker"``
* Additionally, the ``data.docker.Action`` field states which action was performed.

.. thumbnail:: ../images/poc/Monitoring-Docker.png
          :title: Monitoring Docker
          :align: center
          :wrap_image: No

Troubleshooting
---------------

* Error in the agent log file ``/var/ossec/logs/ossec.log``: 

    ``wazuh-modulesd:docker-listener: ERROR: /usr/bin/env: ‘python’: No such file or directory`` 

This can be solved by creating a symbolic link.

    .. code-block:: console
        
        # ln -s /usr/bin/python3 /usr/bin/python

* Error in the agent log file ``/var/ossec/logs/ossec.log``: 

    ``wazuh-modulesd:docker-listener: ERROR: 'docker' module needs to be installed. Execute 'pip install docker' to do it.`` 

This can be solved by running the following command.
    
    .. code-block:: console
        
        # pip3 install docker

