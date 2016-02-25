.. _ossec_docker:

OSSEC Docker container
======================

Docker installation
-------------------

Docker requires a 64-bit installation regardless of your CentOS or Debian version. Also, your kernel must be 3.10 at minimum.

To check your current kernel version, open a terminal and use ``uname -r to`` display your kernel version::

   $ uname -r
   3.10.0-229.el7.x86_64

.. note:: These Docker containers are based on "xetus-oss" dockerfiles, which can be found at `https://github.com/xetus-oss/docker-ossec-server <https://github.com/xetus-oss/docker-ossec-server>`_. We created our own fork, which we test and maintain. Thank you Terence Kent for your contribution to the community.

Docker installation on CentOS
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

To add the Docker yum repository, create a file named ``/etc/yum.repos.d/docker.repo`` with the following content: ::

   [dockerrepo]
   name=Docker Repository
   baseurl=https://yum.dockerproject.org/repo/main/centos/7
   enabled=1
   gpgcheck=1
   gpgkey=https://yum.dockerproject.org/gpg

Now install the RPM package and start the service: ::

   $ sudo yum install docker-engine
   $ sudo service docker start 
   $ chkconfig docker on     

Docker installation on Debian
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Add the new repository GPG key: ::

  $ apt-key adv --keyserver hkp://pgp.mit.edu:80 --recv-keys 58118E89F3A912897C070ADBF76221572C52609D

Then, to add Docker apt-get repository, create a file named ``/etc/apt/sources.list.d/docker.list`` with the following content depending on your Debian distribution.

For Debian Wheezy: ::

   # Debian Wheezy
   deb https://apt.dockerproject.org/repo debian-wheezy main

For Debian Jessie: ::

   # Debian Jessie
   deb https://apt.dockerproject.org/repo debian-jessie main

For Debian Strech: ::

   # Debian Stretch/Sid
   deb https://apt.dockerproject.org/repo debian-stretch main

Now we can install the Debian package and start the service: ::

   $ sudo apt-get update && apt-get install docker-engine
   $ sudo service docker start

To ensure Docker starts when you boot your system, do the following: ::

   $ sudo systemctl enable docker

.. note:: For 14.10 and below the above installation method automatically configures Upstart to start the Docker daemon on boot

OSSEC-ELK Container
-------------------

These Docker container source files can be found in our `ossec-wazuh Github repository <https://github.com/wazuh/docker-ossec-wazuh>`_. It includes both an OSSEC manager and an Elasticsearch single-node cluster, with Logstash and Kibana. You can find more information on how these components work together in :ref:`our documentation <wazuh_installation>`.

To install the ossec-elk container run this command: ::

   $ docker run -d -p 1514:1514/udp -p 1515:1515 -p 514:514/udp -p 5601:5601 -v /somepath/ossec_mnt:/var/ossec/data --name ossec wazuh/ossec-elk

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

Access to Kibana4
^^^^^^^^^^^^^^^^^

Now we need to create a Kibana index, Kibana will do it automatically but we need to set up some fields on the first Kibana initialization.

- Access the kibana url at ``http://your_docker_server_ip:5601`` and set up a new index pattern.
- Kibana will ask you to "Configure an index pattern".
- Check "Use event times to create index names".
- Index pattern interval: Daily.
- Index name or pattern: ``[ossec-]YYYY.MM.DD``
- On ``Time-field name`` list select ``@timestamp`` option.
- Click on "Create" button.
- Go to "Discover" tap on top bar buttons.


.. note:: Kibana will search Elasticsearch index name pattern ``ossec-yyyy.mm.dd``. You need to have at least an OSSEC alert before you set up the index pattern on Kibana. Otherwise it won't find any index on Elasticsearch. If you want to generate one, for example you could try a ``sudo -s`` and miss the password on purpose several times.

Now you can import the custom dashboards. Access Kibana web interface on your browser and navigate to "Objects": ::

- Click at top bar on "Settings".
- Click on "Objects".
- Then click the button "Import" and select the file ~/ossec_tmp/ossec-wazuh/extensions/kibana/kibana-ossecwazuh-dashboards.json

Refresh the Kibana page and you should be able to load your imported Dashboards.

.. note:: Some Dashboard visualizations require time and specific alerts to work. Please don't worry if some visualizations do not display data immidiately after the import.

OSSEC HIDS  Container
---------------------

These Docker container source files can be found in our `ossec-server Github repository <https://github.com/wazuh/docker-ossec>`_. To install it run this command: ::

   $ docker run --name ossec-server -d -p 1514:1514/udp -p 1515:1515\
  -e SYSLOG_FORWADING_ENABLED=true -e SYSLOG_FORWARDING_SERVER_IP=X.X.X.X\
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
