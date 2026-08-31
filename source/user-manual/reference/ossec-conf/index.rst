.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Learn about the Wazuh agent local configuration file, ossec.conf, including its configuration sections in this section of our documentation.

.. _reference_ossec_conf:

Wazuh agent local configuration (ossec.conf)
==============================================

The ``ossec.conf`` file is the main local configuration file for the Wazuh agent. Its location depends on the operating system:

-  Linux: ``/var/ossec/etc/ossec.conf``
-  macOS: ``/Library/Ossec/etc/ossec.conf``
-  Windows: ``C:\Program Files (x86)\ossec-agent\ossec.conf``

The file uses XML syntax. All configuration sections must be defined within the top-level ``<ossec_config>`` element. It is recommended to back up this file before making changes to it. A configuration error may prevent Wazuh services from starting up.

The following example shows the placement of the ``<client>`` section:

.. code-block:: xml

   <ossec_config>
     <client>
       <!-- Client configuration options -->
     </client>
   </ossec_config>

You can define multiple ``<ossec_config>`` elements in the file. When the same option is defined more than once, a later definition may override an earlier one.

Use ``ossec.conf`` to configure an individual agent locally. To distribute supported configuration settings centrally, use the ``agent.conf`` file for the agent group. See :doc:`centralized configuration <../centralized-configuration>`.

+---------------------------------------------------------+----------------------------------------------------------------------------------------------+
| Configuration sections                                  | Description                                                                                  |
+=========================================================+==============================================================================================+
| :doc:`active-response <active-response>`                | Controls whether the agent executes Active Response commands and configures repeated-        |
|                                                         | offender timeouts.                                                                           |
+---------------------------------------------------------+----------------------------------------------------------------------------------------------+
| :doc:`agent-upgrade <agent-upgrade>`                    | Configures remote agent upgrade behavior and WPK certificate validation.                     |
+---------------------------------------------------------+----------------------------------------------------------------------------------------------+
| :doc:`anti_tampering <anti-tampering>`                  | Requires Wazuh manager validation before uninstalling the agent package on supported Linux   |
|                                                         | systems.                                                                                     |
+---------------------------------------------------------+----------------------------------------------------------------------------------------------+
| :doc:`client <client>`                                  | Configures the agent connection, reconnection, enrollment, and communication settings.       |
+---------------------------------------------------------+----------------------------------------------------------------------------------------------+
| :doc:`client_buffer <client-buffer>`                    | Controls agent-side event buffering and transmission rate limits.                            |
+---------------------------------------------------------+----------------------------------------------------------------------------------------------+
| :doc:`github <github-module>`                           | Collects GitHub organization audit events.                                                   |
+---------------------------------------------------------+----------------------------------------------------------------------------------------------+
| :doc:`labels <labels>`                                  | Adds custom agent metadata to generated events.                                              |
+---------------------------------------------------------+----------------------------------------------------------------------------------------------+
| :doc:`localfile <localfile>`                            | Configures collection from log files, event channels, journald, macOS ULS, and command       |
|                                                         | output.                                                                                      |
+---------------------------------------------------------+----------------------------------------------------------------------------------------------+
| :doc:`logging <logging>`                                | Configures the agent internal log output format.                                             |
+---------------------------------------------------------+----------------------------------------------------------------------------------------------+
| :doc:`ms-graph <ms-graph-module>`                       | Collects logs through the Microsoft Graph API.                                               |
+---------------------------------------------------------+----------------------------------------------------------------------------------------------+
| :doc:`office365 <office365-module>`                     | Collects Microsoft 365 audit logs through the Office 365 Management Activity API.            |
+---------------------------------------------------------+----------------------------------------------------------------------------------------------+
| :doc:`rootcheck <rootcheck>`                            | Configures rootkit, trojan, system anomaly, and policy checks.                               |
+---------------------------------------------------------+----------------------------------------------------------------------------------------------+
| :doc:`sca <sca>`                                        | Configures Security Configuration Assessment scans and policies.                             |
+---------------------------------------------------------+----------------------------------------------------------------------------------------------+
| :doc:`socket <socket>`                                  | Defines custom output sockets for collected events.                                          |
+---------------------------------------------------------+----------------------------------------------------------------------------------------------+
| :doc:`syscheck <syscheck>`                              | Configures file integrity monitoring and Windows registry monitoring.                        |
+---------------------------------------------------------+----------------------------------------------------------------------------------------------+
| :doc:`wodle name="aws-s3" <wodle-s3>`                   | Collects logs from supported AWS buckets, services, and subscribers.                         |
+---------------------------------------------------------+----------------------------------------------------------------------------------------------+
| :doc:`wodle name="azure-logs" <wodle-azure-logs>`       | Collects logs from Azure Log Analytics, Microsoft Graph, and Azure Storage.                  |
+---------------------------------------------------------+----------------------------------------------------------------------------------------------+
| :doc:`wodle name="command" <wodle-command>`             | Executes scheduled commands and collects their output.                                       |
+---------------------------------------------------------+----------------------------------------------------------------------------------------------+
| :doc:`wodle name="docker-listener" <wodle-docker>`      | Monitors Docker container events.                                                            |
+---------------------------------------------------------+----------------------------------------------------------------------------------------------+
| :doc:`wodle name="syscollector" <wodle-syscollector>`   | Collects system inventory data.                                                              |
+---------------------------------------------------------+----------------------------------------------------------------------------------------------+
| :doc:`gcp-pubsub <gcp-pubsub>`                          | Collects logs from a Google Cloud Pub/Sub subscription.                                      |
+---------------------------------------------------------+----------------------------------------------------------------------------------------------+
| :doc:`gcp-bucket <gcp-bucket>`                          | Collects access logs from Google Cloud Storage buckets.                                      |
+---------------------------------------------------------+----------------------------------------------------------------------------------------------+

.. toctree::
   :hidden:
   :maxdepth: 1

   active-response
   agent-upgrade
   anti-tampering
   client
   client-buffer
   github-module
   labels
   localfile
   logging
   ms-graph-module
   office365-module
   rootcheck
   sca
   socket
   syscheck
   wodle-s3
   wodle-azure-logs
   wodle-command
   wodle-docker
   wodle-syscollector
   gcp-pubsub
   gcp-bucket
