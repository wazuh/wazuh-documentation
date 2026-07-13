.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how to monitor Docker hosts and container events with Wazuh in this section of our documentation.

Using Wazuh to monitor Docker
=============================

To maintain the security and compliance of your Docker environment, you must proactively monitor your Docker host and containers. The Docker host is the backbone of your container infrastructure and manages container deployment and resource allocation. By monitoring the Docker host, you can keep track of resource usage, unauthorized access attempts, performance issues, and other security concerns.

However, it is not enough to monitor only the Docker host. You also need to monitor the containers themselves. Container monitoring provides insight into the activities of your containers, such as network connections, file system changes, and process executions. Monitoring these activities helps to detect suspicious behavior, identify malware or malicious processes, and respond to security incidents in real time.

By monitoring both the Docker host and the containers, you can proactively detect and respond to security threats, ensuring the security and compliance of your Docker environment with regulatory standards.

Perform the following steps to monitor your Docker environment with Wazuh:

#. :doc:`Install the Wazuh agent </installation-guide/wazuh-agent/index>` on your Docker host. The Wazuh agent secures the underlying Docker infrastructure by monitoring the server where the Docker daemon is running.
#. :ref:`Enable the Wazuh Docker listener module <enable-wazuh-docker-listener>` to monitor container activity. The Wazuh Docker listener module runs on the agent deployed on the Docker host to collect and forward Docker-related logs to the Wazuh manager.

Configuration
-------------

The Wazuh Docker listener module allows the Wazuh agent to capture Docker events and forward them to the Wazuh manager. The following sections describe how to install the Python Docker module and enable the Wazuh Docker listener module.

Prerequisites
^^^^^^^^^^^^^

#. Install Python and pip:

   .. code-block:: console

      $ sudo apt install -y python3 python3-pip

#. Upgrade pip:

   .. code-block:: console

      $ sudo pip3 install --upgrade pip

#. Install Docker:

   .. code-block:: console

      $ sudo curl -sSL https://get.docker.com/ | sh

#. Install `Python Docker library <https://pypi.org/project/docker/>`__ and other dependencies:

   .. code-block:: console

      $ pip3 install docker==7.1.0 urllib3==1.26.20 requests==2.32.2 --break-system-packages

   .. note::

      This command modifies the default externally managed Python environment. See the `PEP 668 <https://peps.python.org/pep-0668/>`__ description for more information. To prevent the modification, run ``pip3 install --upgrade pip`` within a virtual environment. Then update the Docker ``/var/ossec/wodles/docker/DockerListener`` script shebang with your virtual environment interpreter, for example, ``#!</path/to/your/virtual/environment>/bin/python3``.

      Delete any newer version of urllib3 if present.

#. Start and enable the Docker service:

   .. code-block:: console

      $ sudo systemctl start docker.service
      $ sudo systemctl enable docker.service

.. _enable-wazuh-docker-listener:

Enable the Wazuh Docker listener module
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Perform the following steps on the Docker host to configure the Wazuh agent to forward Docker events to the Wazuh manager.

#. Add the following configuration to the Wazuh agent configuration file ``/var/ossec/etc/ossec.conf`` to enable the Wazuh Docker listener module:

   .. code-block:: XML

      <wodle name="docker-listener">
        <interval>2m</interval>
        <attempts>5</attempts>
        <run_on_start>yes</run_on_start>
        <disabled>no</disabled>
      </wodle>

#. Restart the Wazuh agent to apply the changes:

   .. code-block:: console

      # systemctl restart wazuh-agent

Wazuh Docker dashboard
----------------------

The Wazuh Docker dashboard offers a centralized and user-friendly interface that allows you to monitor the security of your Dockerized infrastructure. It provides real-time insights that help system administrators and security teams to review container events, detect and respond to threats.

Wazuh Docker listener module configuration options
--------------------------------------------------

In this section, we provide more information about the Wazuh Docker listener module and all possible configuration options. The Wazuh Docker listener module has main options and scheduling options.

Main options
^^^^^^^^^^^^

The main options allow you to enable or disable the Wazuh Docker listener module and to configure the number of attempts to rerun the listener in case it fails. The two main options are ``disabled`` and ``attempts``.

+------------------+--------------------------------------------------+---------------+-------------------+
| Parameter        | Description                                      | Default value | Allowed values    |
+==================+==================================================+===============+===================+
| ``disabled``     | Enables or disables the Wazuh Docker listener    | no            | yes, no           |
|                  | module.                                          |               |                   |
+------------------+--------------------------------------------------+---------------+-------------------+
| ``attempts``     | The number of attempts to execute the listener   | 5             | A positive number |
|                  | in case it fails.                                |               |                   |
+------------------+--------------------------------------------------+---------------+-------------------+

Scheduling options
^^^^^^^^^^^^^^^^^^

The scheduling options allow you to configure when the Wazuh Docker listener module executes. The available scheduling options are ``run_on_start``, ``interval``, ``day``, ``wday``, and ``time``. By default, when the module is enabled without scheduling options, it runs when the Wazuh agent starts.

+------------------+------------------------------------------------+---------------+------------------------------------+
| Parameter        | Description                                    | Default value | Allowed values                     |
+==================+================================================+===============+====================================+
| ``run_on_start`` | Runs the Wazuh Docker listener module          | yes           | yes, no                            |
|                  | immediately when the Wazuh agent starts.       |               |                                    |
+------------------+------------------------------------------------+---------------+------------------------------------+
| ``interval``     | Waiting time to rerun the Wazuh Docker         | 1m            | A positive number with a suffix    |
|                  | listener module in case it fails.              |               | character indicating a time unit:  |
|                  |                                                |               | s (seconds), m (minutes), h        |
|                  |                                                |               | (hours), d (days), M (months).     |
+------------------+------------------------------------------------+---------------+------------------------------------+
| ``day``          | Day of the month to run the scan. This option  | n/a           | Day of the month [1..31]           |
|                  | is not compatible with the ``wday`` option.    |               |                                    |
|                  | **Note:** When the ``day`` option is set, the  |               |                                    |
|                  | interval value must be a multiple of months.   |               |                                    |
|                  | The default interval is set to a month.        |               |                                    |
+------------------+------------------------------------------------+---------------+------------------------------------+
| ``wday``         | Day of the week to run the scan. This option   | n/a           | Day of the week: sunday/sun,       |
|                  | is not compatible with the ``day`` option.     |               | monday/mon, tuesday/tue,           |
|                  | **Note:** When the ``wday`` option is set, the |               | wednesday/wed, thursday/thu,       |
|                  | interval value must be a multiple of weeks.    |               | friday/fri, saturday/sat           |
|                  | The default interval is set to a week.         |               |                                    |
+------------------+------------------------------------------------+---------------+------------------------------------+
| ``time``         | Time of the day to run the scan. Must be       | n/a           | Time of day [hh:mm]                |
|                  | represented in the format hh:mm. **Note:**     |               |                                    |
|                  | When only the ``time`` option is set, the      |               |                                    |
|                  | interval value must be a multiple of days or   |               |                                    |
|                  | weeks. The default interval is set to a day.   |               |                                    |
+------------------+------------------------------------------------+---------------+------------------------------------+

Example configuration
---------------------

The example configuration below shows an enabled Wazuh Docker listener module. The module attempts to execute five times at ten-minute intervals if it fails.

.. code-block:: XML

   <wodle name="docker-listener">
     <interval>10m</interval>
     <attempts>5</attempts>
     <run_on_start>no</run_on_start>
     <disabled>no</disabled>
   </wodle>
