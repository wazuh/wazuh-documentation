.. _ossec_container:

OSSEC HIDS Container
===============================

These Docker container source files can be found in our `ossec-server Github repository <https://github.com/wazuh/wazuh-docker>`_. To install it run this command: ::

   $ docker run --name ossec-server -d -p 1514:1514/udp -p 1515:1515\
  -e SYSLOG_FORWARDING_ENABLED=true -e SYSLOG_FORWARDING_SERVER_IP=X.X.X.X\
  -v /somepath/ossec_mnt:/var/ossec/data wazuh/docker-ossec

The ``/var/ossec/data`` directory allows the container to be replaced without configuration or data loss: logs, etc, stats,rules, and queue. In addition to those directories, the bin/.process_list file is symlinked to process_list in the data volume.

Other available configuration parameters are:

- AUTO_ENROLLMENT_ENABLED: Specifies whether or not to enable auto-enrollment via ossec-authd. Defaults to ``true``.
- AUTHD_OPTIONS: Options to passed ``ossec-authd``, other than ``-p`` and ``-g``. No default.
- SYSLOG_FORWADING_ENABLED: Specifies whether Syslog forwarding is enabled or not. Defaults to ``false``.
- SYSLOG_FORWARDING_SERVER_IP: The IP address for the Syslog server. No default.
- SYSLOG_FORWARDING_SERVER_PORT: The destination port for Syslog messages. Default is ``514``.
- SYSLOG_FORWARDING_FORMAT: The Syslog message format to use. Default is ``default``.
- SMTP_ENABLED: Whether or not to enable SMTP notifications. Defaults to ``true`` if ALERTS_TO_EMAIL is specified, otherwise defaults to ``false``.
- SMTP_RELAY_HOST: The relay host for SMTP messages, required for SMTP notifications. This host must support non-authenticated SMTP. No default.
- ALERTS_FROM_EMAIL: The email address the alerts should come from. Defaults to ``ossec@$HOSTNAME``.
- ALERTS_TO_EMAIL: The destination email address for SMTP notifications, required for SMTP notifications. No default.

.. note:: All SMTP and SYSLOG configuration variables are only applicable for the first time setup. Once the container's data volume has been initialized, all the configuration options for OSSEC can be changed.

Once the system starts up, you can execute the standard OSSEC commands using docker. For example, to list active agents: ::

   $ docker exec -ti ossec-server /var/ossec/bin/list_agents -a
