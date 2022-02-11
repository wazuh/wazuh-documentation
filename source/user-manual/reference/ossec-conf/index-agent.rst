.. Copyright (C) 2020 Wazuh, Inc.

.. _reference_client_conf:

Agent configuration (agent.conf)
================================

.. warning::
    Upgrade from an older version than v5.0.0 creates a new agent.conf file and the current configuration is saved into ossec.conf.backup file, restarting configuration from zero.

The ``agent.conf`` file is the main configuration file on the Wazuh agent. It is located at ``/var/ossec/etc/agent.conf`` on Linux machines. On Windows agents, we can find it at ``C:\Program Files (x86)\ossec-agent\agent.conf``. It is recommended to back up this file before making changes to it. A configuration error might prevent Wazuh services from starting up.

The ``agent.conf`` file is in XML format and all of its configuration options are nested in their appropriate section of the file. In this file, the outermost XML tag is ``<wazuh_config>``. There can be more than one ``<wazuh_config>`` tag.

Here is an example of the proper location of the *active-response* configuration section:

.. code-block:: xml

    <wazuh_config>
        <active-response>
            <!--
            active-response options here
            -->
        </active-response>
    </wazuh_config>

The ``shared.conf`` file is very similar to ``agent.conf``, but ``shared.conf`` is used to centrally distribute configuration information to agents. See more :doc:`here <../centralized-configuration>`.

Wazuh can be installed in two ways: as a manager by using the "server/manager" installation type and as an agent by using the "agent" installation type.

+-------------------------------------------------------+
| Configuration sections                                |
+=======================================================+
| :doc:`active-response-agent <active-response-agent>`  |
+-------------------------------------------------------+
| :doc:`agent-upgrade-agent <agent-upgrade-agent>`      |
+-------------------------------------------------------+
| :doc:`client <client>`                                |
+-------------------------------------------------------+
| :doc:`client_buffer <client-buffer>`                  |
+-------------------------------------------------------+
| :doc:`fluent-forward <fluent-forward>`                |
+-------------------------------------------------------+
| :doc:`github <github-module>`                         |
+-------------------------------------------------------+
| :doc:`labels-agent <labels-agent>`                    |
+-------------------------------------------------------+
| :doc:`localfile <localfile>`                          |
+-------------------------------------------------------+
| :doc:`logging-agent <logging-agent>`                  |
+-------------------------------------------------------+
| :doc:`office365 <office365-module>`                   |
+-------------------------------------------------------+
| :doc:`rootcheck <rootcheck>`                          |
+-------------------------------------------------------+
| :doc:`sca <sca>`                                      |
+-------------------------------------------------------+
| :doc:`socket <socket>`                                |
+-------------------------------------------------------+
| :doc:`syscheck <syscheck>`                            |
+-------------------------------------------------------+
| :doc:`wodle name="aws-s3" <wodle-s3>`                 |
+-------------------------------------------------------+
| :doc:`wodle name="azure-logs" <wodle-azure-logs>`     |
+-------------------------------------------------------+
| :doc:`wodle name="cis-cat" <wodle-ciscat>`            |
+-------------------------------------------------------+
| :doc:`wodle name="command" <wodle-command>`           |
+-------------------------------------------------------+
| :doc:`wodle name="docker-listener" <wodle-docker>`    |
+-------------------------------------------------------+
| :doc:`wodle name="open-scap" <wodle-openscap>`        |
+-------------------------------------------------------+
| :doc:`wodle name="osquery" <wodle-osquery>`           |
+-------------------------------------------------------+
| :doc:`wodle name="syscollector" <wodle-syscollector>` |
+-------------------------------------------------------+
| :doc:`gcp-pubsub <gcp-pubsub>`                        |
+-------------------------------------------------------+
| :doc:`gcp-bucket <gcp-bucket>`                        |
+-------------------------------------------------------+

All of the above sections must be located within the top-level ``<wazuh_config>`` tag. Adding another ``<wazuh_config>`` tag might override the values set on the previous tag.


.. toctree::
   :hidden:
   :maxdepth: 1

   active-response-agent
   agent-upgrade-agent
   client
   client-buffer
   fluent-forward
   gcp-pubsub
   github-module
   labels-agent
   localfile
   logging-agent
   office365-module
   rootcheck
   sca
   socket
   syscheck
   wodle-ciscat
   wodle-command
   wodle-docker
   wodle-openscap
   wodle-osquery
   wodle-s3
   wodle-syscollector
   verifying-configuration.rst
