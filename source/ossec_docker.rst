.. _ossec_docker:

OSSEC Docker container
======================

Docker installation
-------------------

Docker requires a 64-bit installation regardless of your CentOS or Debian version. Also, your kernel must be 3.10 at minimum.

To check your current kernel version, open a terminal and use ``uname -r`` to display your kernel version::

   $ uname -r
   3.10.0-229.el7.x86_64

.. note:: These Docker containers are based on "xetus-oss" dockerfiles, which can be found at `https://github.com/xetus-oss/docker-ossec-server <https://github.com/xetus-oss/docker-ossec-server>`_. We created our own fork, which we test and maintain. Thank you Terence Kent for your contribution to the community.

Run the Docker installation script. ::

   $ curl -sSL https://get.docker.com/ | sh

If you would like to use Docker as a non-root user, you should now consider
adding your user to the "docker" group with something like: ::

  $ sudo usermod -aG docker your-user

.. note:: Remember that you will have to log out and back in for this to take effect!


OSSEC-ELK Container
-------------------

These Docker container source files can be found in our `ossec-wazuh Github repository <https://github.com/wazuh/docker-ossec-wazuh>`_. It includes both an OSSEC manager and an Elasticsearch single-node cluster, with Logstash and Kibana. You can find more information on how these components work together in :ref:`our documentation <wazuh_installation>`.

To install the ossec-elk container run this command: ::

   $ docker run -d -p 55000:55000 -p 1514:1514/udp -p 1515:1515 -p 514:514/udp -p 5601:5601 -v /somepath/ossec_mnt:/var/ossec/data --name ossec wazuh/ossec-elk

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

OSSEC HIDS  Container
---------------------

These Docker container source files can be found in our `ossec-server Github repository <https://github.com/wazuh/docker-ossec>`_. To install it run this command: ::

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
