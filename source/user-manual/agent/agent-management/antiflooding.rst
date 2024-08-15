.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: The Wazuh agent includes a queue mechanism to prevent large bursts of events from negatively impacting the network or the Wazuh manager. Learn more in this section of the documentation.

Wazuh agent queue
=================

The Wazuh agent includes a queue mechanism ``queue_ad`` to prevent large bursts of events on a Wazuh agent from negatively impacting the network or the Wazuh manager. It uses a leaky bucket queue that collects all generated events and sends them to the Wazuh manager at a rate below the specified :ref:`events per second <>` threshold. This helps to avoid the loss of events or unexpected behavior from the Wazuh components.

Additionally, Wazuh agent modules such as Log collector, File Integrity Monitoring (FIM), Security configuration assessment (SCA), can be configured to limit their event production rate, reducing the risk of saturating the leaky bucket's buffer.

.. contents::
   :local:
   :depth: 2
   :backlinks: none

Why a queue is needed
---------------------

In the Wazuh architecture, Wazuh agents collect information from log files, command outputs, different kinds of scans, etc. They then send all the collected information to the Wazuh manager, separated into individual events. Without any congestion control, a Wazuh agent could potentially send events at a rate as high as the system can transmit, which could be hundreds or thousands of events per second.

Due to this fact, an incorrect configuration in a Wazuh agent may generate enough events to saturate a network or its Wazuh manager. Here are some misconfiguration scenarios that could lead to this problem:

-  Real-time file integrity monitoring of a directory with files that keep changing:

   Events are generated every time a file under a monitored directory changes. If the FIM module monitors a directory that changes constantly, it will generate a large volume of events. In addition, if the monitored directory contains any file to which Wazuh continuously updates when it generates an event, like ``/var/ossec/logs/``, it will cause an infinite loop.

-  Windows Filtering Platform:

   A Windows firewall event (ID 5156) is generated each time an outbound network connection is allowed. When this event is enabled in Windows, and Wazuh is configured to monitor all Windows security event logs, the result is an infinite loop. When the Wazuh agent connects to its Wazuh manager, it generates a Windows firewall event that causes the Wazuh agent to connect again to its manager.

-  Applications that retry on errors with no rate limiting:

   When certain applications encounter an error, such as disk full, they may generate an error log entry and retry the task hundreds of times per second, generating massive events.

Each of these scenarios may create such a high rate of events that the functioning of the Wazuh agent, network, and/or manager may be significantly hampered.

Event congestion controls
-------------------------

To better handle these kinds of situations, the following controls have been deployed:

-  Agent-to-manager event congestion management (Leaky bucket):

   This provides event congestion control with an agent-side leaky bucket queue to guard against saturation of the network or of the Wazuh manager by a Wazuh agent.

-  Internal agent event congestion management:

   This mechanism uses internal limits in different components of the Wazuh agent to control the rate at which they generate events.

Agent-to-manager event congestion management (Leaky bucket)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

As mentioned above, the leaky bucket is a congestion control located in Wazuh agents and focused on agent-to-manager communication. The Wazuh agent collects events and stores them temporarily in a buffer that can hold up to 5000 events by default. It then forwards these events to the Wazuh manager, ensuring that no more than 500 events are sent per second, which is the default setting. This ensures a controlled flow of information to the Wazuh manager. These values are set by default; however, you can change them depending on your infrastructure requirement. The following graphic shows how the bucket works.

.. thumbnail:: /images/manual/internal-capabilities/bucket.png
  :title: Leaky bucket diagram
  :alt: Leaky bucket diagram
  :align: center
  :width: 80%

There are several levels of control for the bucket. These control levels are set to monitor the buffer status and address a potential flooding situation. They include:

-  Warning alert: The first control level will trigger an alert on the Wazuh manager when the occupied capacity of the buffer has reached a certain threshold. By default, it is set at ``90%``.
-  Full alert: After the first control level, if the buffer gets filled, the Wazuh manager will receive another alert. This new alert is more serious than a warning alert because subsequent events will be dropped when the bucket is filled.
-  Flood alert: This alert is generated if more than a customizable timeout passes between a full alert event and the buffer level dropping below the ``warning level``. For example, you might set the timeout to 60 seconds. This means if the buffer remains full for more than 60 seconds after a "Full alert," the "Flood alert" will be triggered
-  Normal alert: This announces that the buffer level has returned to normal (by default <= ``70%``) after having previously triggered a warning alert or higher.

The leaky bucket can be configured to adapt to any environment with the use of the following configuration options:

.. contents::
   :local:
   :depth: 1
   :backlinks: none

Throughput configuration
~~~~~~~~~~~~~~~~~~~~~~~~

