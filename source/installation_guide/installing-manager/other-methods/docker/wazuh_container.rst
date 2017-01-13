.. _wazuh_container:

Wazuh Container
===============================

ToDo: Image1: Elatic Stack, Image2: Wazuh Manager + api.

ToDo: docker pull ...

These Docker container source files can be found in our `ossec-wazuh Github repository <https://github.com/wazuh/wazuh-docker>`_. It includes both an OSSEC manager and an Elasticsearch single-node cluster, with Logstash and Kibana. You can find more information on how these components work together in :ref:`our documentation <installation>`.

To install the ossec-elk container run this command: ::

   $ docker run -d -p 55000:55000 -p 1514:1514/udp -p 1515:1515 -p 514:514/udp -p 5601:5601 -v /somepath/elasticsearch:/var/lib/elasticsearch -v /somepath/ossec_mnt:/var/ossec/data --name ossec wazuh/ossec-elk

The ``/var/ossec/data`` directory allows the container to be replaced without configuration or data loss: logs, etc, stats,rules, and queue (all OSSEC files). In addition to those directories, the bin/.process_list file is symlinked to process_list in the data volume.

Other available configuration parameters are:

- AUTO_ENROLLMENT_ENABLED: Specifies whether or not to enable auto-enrollment via ossec-authd. Defaults to ``true``.
- AUTHD_OPTIONS: Options to passed ``ossec-authd``, other than ``-p`` and ``-g``. No default.
- SYSLOG_FORWADING_ENABLED: Specifies whether Syslog forwarding is enabled or not. Defaults to ``false``.
- SYSLOG_FORWARDING_SERVER_IP: The IP address for the Syslog server. No default.
- SYSLOG_FORWARDING_SERVER_PORT: The destination port for Syslog messages. Default is ``514``.
- SYSLOG_FORWARDING_FORMAT: The Syslog message format to use. Default is ``default``.

.. note:: All SYSLOG configuration variables are only applicable to the first time setup. Once the container's data volume has been initialized, all the configuration options for OSSEC can be changed.

To add an agent use the next command: ::

   $ docker exec -it ossec /var/ossec/bin/manage_agents

.. note:: You can also use agents auto enrollment with ossec-authd

Then restart your OSSEC manager: ::

   $ docker exec -it ossec /var/ossec/bin/ossec-control restart

Access to Kibana4.5
^^^^^^^^^^^^^^^^^^^

If you have an error the first time you log in kibana: move to a different menu and return to discover and it should be working properly.

.. note:: Some Dashboard visualizations require time and specific alerts to work. Please don't worry if some visualizations do not display data immidiately after the import.
