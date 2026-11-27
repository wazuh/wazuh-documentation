.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how Wazuh monitors Docker container runtime events, tracks container workloads, detects suspicious activity in containers, and centralizes container event logs.

Container security
==================

Container security focuses on protecting containerized applications and the infrastructure that runs them. As organizations adopt Docker and Kubernetes to deploy and scale applications, they need visibility into container activity and runtime events to reduce security risks.

Wazuh helps organizations secure containerized environments by monitoring Docker runtime events, detecting suspicious container activity, and centralizing container event logs.

Monitoring container runtime activity
-------------------------------------

The Wazuh agent captures the events that the Docker engine reports in real time with its :doc:`Docker listener </user-manual/capabilities/container-security/monitoring-docker>` module. These events include container creation, startup, pause, shutdown, and removal. The standard Docker integration generates findings for activity that needs attention. Examples include pulling an image from an untrusted registry, killing a container, or deleting an image. The Docker integration is disabled by default, so you enable it on the Wazuh dashboard before Wazuh analyzes Docker events.

Security teams can investigate unexpected runtime activity, identify unauthorized container deployments, and monitor lifecycle events across their container environment.

The **Findings** tab of the **Docker** dashboard, under **Cloud security**, shows the findings for runtime activity on monitored Docker hosts.

.. thumbnail:: /images/getting-started/use-cases/container-security/docker-runtime-events.png
   :title: Wazuh dashboard showing runtime events from monitored Docker containers
   :alt: Wazuh dashboard showing runtime events from monitored Docker containers
   :align: center
   :width: 80%

Tracking container workloads
----------------------------

The Docker listener module forwards the events that the Docker daemon reports, including the container and image each event involves. These events help organizations track the container workloads on their Docker hosts.

Security teams can use the **Docker** dashboard to see the container and image behind each finding, and to investigate container deployments across monitored environments.

The **Dashboard** tab of the **Docker** dashboard summarizes the Docker findings from monitored Docker hosts.

.. thumbnail:: /images/getting-started/use-cases/container-security/tracking-container-workloads.png
   :title: Tracking container workloads
   :alt: Tracking container workloads
   :align: center
   :width: 80%

You can also create custom dashboards to view this container and image information.

Detecting suspicious activity in containers
-------------------------------------------

Wazuh analyzes Docker events and container logs to detect suspicious activity within containerized workloads. The Docker integration generates findings when a user runs a command inside a container or copies files between a container and the host. It also flags an exported container file system and a container that connects to the host network. When the Wazuh agent collects container logs, the standard ruleset detects attacks in them, such as SQL injection attempts against a web container. You can also create :ref:`custom detection rules <data_analysis_create_custom_rule>` to detect activity based on your organization's specific requirements. For examples, see the :doc:`container security use cases </user-manual/capabilities/container-security/use-cases>`.

Security teams can investigate these findings alongside endpoint and cloud telemetry in the Wazuh dashboard. The finding details provide information about the suspicious activity detected in the monitored container.

Centralized logging of container events
---------------------------------------

Wazuh centralizes container event logging, so you can view all container events in one place. The Wazuh indexer stores and indexes container events, allowing security teams to search and analyze them from the Wazuh dashboard. Organizations can also configure data retention policies to manage how long container event data is stored.

Wazuh dashboards provide a centralized view of container events, enabling security teams to monitor and investigate activity across containerized environments. Teams can use this information to identify suspicious behavior, unauthorized actions, and other security events.

The image below shows the details of a Docker finding, including the container and image names.

.. thumbnail:: /images/getting-started/use-cases/container-security/centralized-logging-of-container-events.png
   :title: Centralized logging of container events
   :alt: Centralized logging of container events
   :align: center
   :width: 80%
