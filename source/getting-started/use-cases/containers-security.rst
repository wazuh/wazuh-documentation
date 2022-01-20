.. Copyright (C) 2022 Wazuh, Inc.

.. meta::
  :description: Wazuh is used to monitor containers security and protect containers workloads at both the infrastructure and container level. Learn more here. 
  
.. _containers_security:

Containers security monitoring
==============================

Wazuh is used to monitor for signs of security incidents across containers, alerting in real time. Wazuh protects container workloads at two different levels:

Infrastructure level
--------------------

Wazuh provides the following mechanisms to monitor Docker hosts or Kubernetes nodes:

- **Integration with Docker engine and Kubernetes APIs:** In this scenario, the Wazuh module for Docker acts as a subscriber. It listens for Docker or Kubernetes events, being able to alert when an anomaly or security incident is detected.

- **Wazuh agent deployment to Docker hosts and Kubernetes nodes:** For a self-managed infrastructure, the deployment of the :ref:`Wazuh agent <wazuh_agent>` provides a comprehensive set of security capabilities, such as malware detection, file integrity monitoring, configuration assessment, log data analysis, vulnerability detection and active responses.

- **Integration with hosted infrastructure providers (e.g. Google GKE, Amazon EKS, etc.):** In this case, the Wazuh modules for cloud security monitoring download the managed service audit logs for security analysis.

Example of security alerts at an infrastructure level:

.. list-table::
   :width: 100%
   :widths: 50 50

   * - A Docker image is downloaded or updated
     - A container is running in privileged mode
   * - Kubernetes configuration is changed
     - Hardening checks fail for the Docker host
   * - A new container or Pod is created
     - A user runs a command or a shell inside a container
   * - A new application is installed on the Docker host
     - Vulnerabilities are detected on the Docker host

Example of alert when a Docker container is created:

.. code-block:: json
  :emphasize-lines: 9,12,14
  :class: output

  {
    "agent": {
        "id": "006",
        "ip": "10.0.1.214",
        "name": "RHEL7"
    },
    "data": {
        "docker": {
            "Action": "create",
            "Actor": {
                "Attributes": {
                    "image": "nginx",
                    "maintainer": "NGINX Docker Maintainers <docker-maint@nginx.com>",
                    "name": "nginx_container"
                },
                "ID": "e9730949586a38d8ab25990234fb8ccba428e3ec1c8bfbf12fe08ed279aaf11d"
            },
            "Type": "container",
            "from": "nginx",
            "id": "e9730949586a38d8ab25990234fb8ccba428e3ec1c8bfbf12fe08ed279aaf11d",
            "scope": "local",
            "status": "create",
            "time": "1599186260",
            "timeNano": "1599186260265422592.000000"
        }
    },
    "rule": {
        "description": "Docker: Container nginx_container created",
        "level": 3,
        "id": "87901"
    },
    "timestamp": "2020-09-04T02:24:20.266+0000"
  } 

Example of alert when a command is executed inside a container:

.. code-block:: json
  :emphasize-lines: 9,15
  :class: output

  {
    "agent": {
        "id": "006",
        "ip": "10.0.1.214",
        "name": "RHEL7"
    },
    "data": {
        "docker": {
            "Action": "exec_start: cat /etc/passwd",
            "Actor": {
                "Attributes": {
                    "execID": "363d220ce7a34c521707477d14b7700e4fb26987f9f4e27bc558788ce66570b4",
                    "image": "nginx",
                    "maintainer": "NGINX Docker Maintainers <docker-maint@nginx.com>",
                    "name": "nginx_container"
                },
                "ID": "e9730949586a38d8ab25990234fb8ccba428e3ec1c8bfbf12fe08ed279aaf11d"
            },
            "Type": "container",
            "from": "nginx",
            "id": "e9730949586a38d8ab25990234fb8ccba428e3ec1c8bfbf12fe08ed279aaf11d",
            "scope": "local",
            "status": "exec_start: cat /etc/passwd",
            "time": "1599186799",
            "timeNano": "1599186799425748992.000000"
        }
    },
    "rule": {
        "description": "Docker: Command launched in container nginx_container",
        "level": 3,
        "id": "87907"
    },
    "timestamp": "2020-09-04T02:33:19.431+0000"
  }

Container level
---------------

In order to get visibility at a container level, you can deploy the :ref:`Wazuh agent <wazuh_agent>` to a Kubernetes DaemonSet container. This kind of deployment ensures that the Wazuh agent will run in all nodes of your Kubernetes cluster. Besides, other Kubernetes Pods will be able to send data (e.g. application log messages) to the DaemonSet container, so the agent can process it and forward it to the :ref:`Wazuh server <wazuh_server>` for security analysis.

Example of security alerts at a container level:

.. list-table::
   :width: 100%
   :widths: 50 50

   * - New process created in a container
     - File integrity monitoring alerts
   * - New application installed in a container
     - Vulnerability detected in a container
   * - Log analysis alert (e.g. Nginx event)
     - Hardening check failed in a container
