.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how to monitor Docker hosts and container events with Wazuh in this section of our documentation.

Monitoring Docker environments
===============================

To maintain the security and compliance of your Docker environment, you must proactively monitor your Docker host and containers. The Docker host is the backbone of your container infrastructure and manages container deployment and resource allocation. By monitoring the Docker host, you can keep track of resource usage, unauthorized access attempts, performance issues, and other security concerns.

However, it is not enough to monitor only the Docker host. You also need to monitor the containers themselves. Container monitoring provides insight into the activities of your containers, such as network connections, file system changes, and process executions. These activities help you detect suspicious behavior, identify malware or malicious processes, and respond to security incidents in real time.

By monitoring both the Docker host and the containers, you can proactively detect and respond to security threats. This ensures the security and compliance of your Docker environment with regulatory standards. The Wazuh Docker listener module runs on the agent deployed on the Docker host to collect and forward Docker-related logs to the Wazuh manager.

.. _monitoring_docker_configuration:

Configuration
--------------

The Wazuh Docker listener module allows the Wazuh agent to capture Docker events and forward them to the Wazuh manager. The following sections describe how to install the Python Docker module and enable the Wazuh Docker listener module.

Perform the following steps to monitor your Docker environment with Wazuh.

Prerequisites
^^^^^^^^^^^^^

#. :doc:`Install the Wazuh agent </installation-guide/wazuh-agent/index>` on the Docker host and enroll it on a Wazuh manager.

#. Install Python and pip:

   .. tabs::

      .. group-tab:: APT

         .. code-block:: console

            $ sudo apt install -y python3 python3-pip

      .. group-tab:: Yum

         .. code-block:: console

            $ sudo yum install -y python3 python3-pip

      .. group-tab:: DNF

         .. code-block:: console

            $ sudo dnf install -y python3 python3-pip

#. Install Docker:

   .. code-block:: console

      $ curl -sSL https://get.docker.com/ -o get-docker.sh
      $ sudo sh get-docker.sh

#. Install `Python Docker library <https://pypi.org/project/docker/>`__ and other dependencies:

   .. tabs::

      .. group-tab:: APT

         .. code-block:: console

            $ sudo apt remove python3-urllib3
            $ sudo pip3 install docker==7.1.0 urllib3==1.26.20 requests==2.32.2 --ignore-installed --break-system-packages

      .. group-tab:: Yum

         .. code-block:: console

            $ sudo yum remove python3-urllib3
            $ sudo pip3 install docker==7.1.0 urllib3==1.26.20 requests==2.32.2 --ignore-installed --break-system-packages

      .. group-tab:: DNF

         .. code-block:: console

            $ sudo dnf remove python3-urllib3
            $ sudo pip3 install docker==7.1.0 urllib3==1.26.20 requests==2.32.2 --ignore-installed --break-system-packages

   .. note::

      The above commands modify the default externally managed Python environment. See the `PEP 668 <https://peps.python.org/pep-0668/>`__ description for more information. To prevent the modification, create a virtual environment and install the dependencies inside it. Then update the Docker ``/var/ossec/wodles/docker/DockerListener`` script shebang with your virtual environment interpreter, for example, ``#!<VIRTUAL_ENVIRONMENT_PATH>/bin/python3``.

      The ``urllib3`` and ``requests`` versions are pinned to the versions compatible with the Wazuh Docker listener. The command removes any existing version of ``urllib3`` (and its dependencies) and replaces it with the pinned version.

#. Start and enable the Docker service:

   .. code-block:: console

      $ sudo systemctl start docker.service
      $ sudo systemctl enable docker.service

.. _enable-wazuh-docker-listener:

Enable the Wazuh Docker listener module
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Perform the following steps on the Docker host to configure the Wazuh agent to forward Docker events to the Wazuh manager.

#. Add the following configuration within an ``<ossec_config>`` block in the Wazuh agent ``/var/ossec/etc/ossec.conf`` configuration file to enable the Wazuh Docker listener module:

   .. code-block:: xml

      <wodle name="docker-listener">
        <interval>1m</interval>
        <attempts>5</attempts>
        <run_on_start>yes</run_on_start>
        <disabled>no</disabled>
      </wodle>

   **Where:**

   -  ``<interval>`` sets how long to wait before restarting the Docker listener after it exits due to unexpected error or other issues. In this example, it is ``1m`` (1 minute).
   -  ``<attempts>`` sets how many times the Wazuh agent tries to run the Docker listener if it fails. In this example, it is ``5``.
   -  ``<run_on_start>`` runs the Docker listener immediately when the Wazuh agent starts. The value ``yes``, enables this behavior.
   -  ``<disabled>`` enables or disables the Docker listener. The value ``no``, enables it.

   Refer to :ref:`Wazuh Docker listener module configuration options <docker_listener_module_configuration_options>` for more information about the available options.

#. Restart the Wazuh agent to apply the changes:

   .. code-block:: console

      $ sudo systemctl restart wazuh-agent

#. Verify that the Docker listener module started:

   .. code-block:: console

      $ sudo grep docker /var/ossec/logs/ossec.log

   The command output looks similar to this:

   .. code-block:: none
      :class: output

      2026/07/10 13:38:10 wazuh-modulesd:docker-listener: INFO: Module docker-listener started.
      2026/07/10 13:38:10 wazuh-modulesd:docker-listener: INFO: Starting to listening Docker events.
      2026/07/10 13:38:19 wazuh-modulesd:docker-listener: INFO: Wodle started.
      2026/07/10 13:38:20 wazuh-modulesd:docker-listener: INFO: Docker service was started.

Enable the Wazuh Docker integration
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Perform the following steps on the Wazuh dashboard to enable the Wazuh Docker integration.

#. Navigate to **Security Analytics** > **Overview**.
#. Enter ``docker`` into the search box and select **docker**.
#. Click on **Actions** and select **Enable**.

   .. thumbnail:: /images/manual/container-security/enable-docker-integration.png
      :title: Enable the Wazuh Docker integration
      :alt: Enable the Wazuh Docker integration
      :align: center
      :width: 80%

Wazuh Docker dashboard
-----------------------

The Wazuh Docker dashboard offers a centralized and user-friendly interface that allows you to monitor the security of your Dockerized infrastructure. It provides real-time insights that help system administrators and security teams review container events, detect and respond to threats. To view the Wazuh Docker dashboard, navigate to **Cloud security** > **Docker**.

.. thumbnail:: /images/manual/container-security/docker-dashboard.png
   :title: Wazuh Docker dashboard
   :alt: Wazuh Docker dashboard
   :align: center
   :width: 80%

.. _docker_listener_module_configuration_options:

Wazuh Docker listener module configuration options
-----------------------------------------------------

The Wazuh Docker listener module has main options and scheduling options.

Main options
^^^^^^^^^^^^

The main options enable or disable the Wazuh Docker listener module. They also set how many times the listener retries after a failure.

+------------------+----------------------------------------------------+----------------+---------------------+
| Parameter        | Description                                        | Default value  | Allowed values      |
+==================+====================================================+================+=====================+
| ``disabled``     | Enables or disables the Wazuh Docker listener      | ``no``         | ``yes``, ``no``     |
|                  | module.                                            |                |                     |
+------------------+----------------------------------------------------+----------------+---------------------+
| ``attempts``     | The number of attempts to execute the listener in  | ``5``          | A positive number   |
|                  | case it fails.                                     |                |                     |
+------------------+----------------------------------------------------+----------------+---------------------+

Scheduling options
^^^^^^^^^^^^^^^^^^

The scheduling options allow you to configure when the Wazuh Docker listener module executes. The available scheduling options are ``run_on_start``, ``interval``, ``day``, ``wday``, and ``time``.

+------------------+--------------------------------------------------+----------------+-------------------------------------+
| Parameter        | Description                                      | Default value  | Allowed values                      |
+==================+==================================================+================+=====================================+
| ``run_on_start`` | Runs the Wazuh Docker listener module            | ``no``         | ``yes``, ``no``                     |
|                  | immediately when the Wazuh agent starts.         |                |                                     |
+------------------+--------------------------------------------------+----------------+-------------------------------------+
| ``interval``     | How long to wait before restarting the Docker    | ``1m``         | A positive number with a suffix     |
|                  | listener after it exits due to unexpected error  |                | character indicating a time unit:   |
|                  | or other issues.                                 |                | ``s`` (seconds), ``m`` (minutes),   |
|                  |                                                  |                | ``h`` (hours), ``d`` (days), ``M``  |
|                  |                                                  |                | (months).                           |
+------------------+--------------------------------------------------+----------------+-------------------------------------+
| ``day``          | Day of the month on which to restart the Docker  | ``n/a``        | Day of the month [1..31]            |
|                  | listener after it exits. This option is not      |                |                                     |
|                  | compatible with the ``wday`` option. **Note:**   |                |                                     |
|                  | When the ``day`` option is set, the interval     |                |                                     |
|                  | value must be a multiple of months.              |                |                                     |
+------------------+--------------------------------------------------+----------------+-------------------------------------+
| ``wday``         | Day of the week on which to restart the Docker   | ``n/a``        | Day of the week: ``sunday/sun``,    |
|                  | listener after it exits. This option is not      |                | ``monday/mon``, ``tuesday/tue``,    |
|                  | compatible with the ``day`` option. **Note:**    |                | ``wednesday/wed``,                  |
|                  | When the ``wday`` option is set, the interval    |                | ``thursday/thu``, ``friday/fri``,   |
|                  | value must be a multiple of weeks.               |                | ``saturday/sat``                    |
+------------------+--------------------------------------------------+----------------+-------------------------------------+
| ``time``         | Time of the day to restart the Docker listener   | ``n/a``        | Time of day [hh:mm]                 |
|                  | after it exits. Must be represented in the       |                |                                     |
|                  | format hh:mm. **Note:** When only the ``time``   |                |                                     |
|                  | option is set, the interval value must be a      |                |                                     |
|                  | multiple of days or weeks. The default interval  |                |                                     |
|                  | is set to a day (1d).                            |                |                                     |
+------------------+--------------------------------------------------+----------------+-------------------------------------+
