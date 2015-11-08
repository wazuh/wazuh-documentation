.. _ossec_docker:

Installing OSSEC with Docker
=====================================

How install Docker
------------------

Prerequisites
-------------

Docker requires a 64-bit installation regardless of your CentOS/Debina/Ubuntu version. Also, your kernel must be 3.10 at minimum.

To check your current kernel version, open a terminal and use uname -r to display your kernel version::

   $ uname -r
   3.10.0-229.el7.x86_64

Adding yum repository
---------------------

To add docker yum repository, create a file named /etc/yum.repos.d/docker.repo::

   $ cd /etc/yum.repos.d
   $ vi docker.repo


**For CentOS**::

   [dockerrepo]
   name=Docker Repository
   baseurl=https://yum.dockerproject.org/repo/main/centos/7
   enabled=1
   gpgcheck=1
   gpgkey=https://yum.dockerproject.org/gpg

**For Fedora**

For Fedora 21::

   [dockerrepo]
   name=Docker Repository
   baseurl=https://yum.dockerproject.org/repo/main/fedora/21
   enabled=1
   gpgcheck=1
   gpgkey=https://yum.dockerproject.org/gpg


For Fedora 22::

   [dockerrepo]
   name=Docker Repository
   baseurl=https://yum.dockerproject.org/repo/main/fedora/22
   enabled=1
   gpgcheck=1
   gpgkey=https://yum.dockerproject.org/gpg

Adding apt-get repository
-------------------------

Add the new gpg key::

  $ apt-key adv --keyserver hkp://pgp.mit.edu:80 --recv-keys 58118E89F3A912897C070ADBF76221572C52609D

To add docker apt-get repository, create a file named /etc/apt/sources.list.d/docker.list::

   $ cd /etc/apt/sources.list.d/
   $ vi docker.list

**For Ubuntu**

For Ubuntu Vivid::

   # Ubuntu Vivid
   deb https://apt.dockerproject.org/repo ubuntu-vivid main

For Ubuntu Trusty::

   # Ubuntu Trusty
   deb https://apt.dockerproject.org/repo ubuntu-trusty main

For Ubuntu Wily::

   # Ubuntu Wily
   deb https://apt.dockerproject.org/repo ubuntu-wily main

**For Debian**

For Debian Wheezy::

   # Debian Wheezy
   deb https://apt.dockerproject.org/repo debian-wheezy main

For Debian Jessie::

   # Debian Jessie
   deb https://apt.dockerproject.org/repo debian-jessie main

For Debian Strech::

   # Debian Stretch/Sid
   deb https://apt.dockerproject.org/repo debian-stretch main

Install the Docker package
--------------------------

**In CentOS / Fedora**::

   $ sudo yum install docker-engine

To start the daemon::

   $ sudo service docker start

To ensure Docker starts when you boot your system, do the following::

   $ chkconfig docker on

**In Ubuntu / Debian**::

   $ sudo apt-get update && apt-get install docker-engine

To start the dameon::

   $ sudo service docker start

To ensure Docker starts when you boot your system, do the following::

   $ sudo systemctl enable docker

.. note:: For 14.10 and below the above installation method automatically configures upstart to start the docker daemon on boot

Install Docker in different plataforms
--------------------------------------

For install Docker in different plataform you can review the official guide `here <https://docs.docker.com/installation/>`_


Run the Ossec-elk Container
---------------------------

To run the osec-elk container is very easy, only need to type this command::

   $ docker run -d -p 1514:1514/udp -p 514:514/udp -p 5601:5601 -v /somepath/ossec_mnt:/var/ossec/data --name ossec wazuh/ossec-elkstack

The following directories are externalized under /var/ossec/data to allow the container to be replaced without configuration or data loss: logs, etc, stats,rules, and queue. In addition to those directories, the bin/.process_list file is symlinked to process_list in the data volume.


Available Configuration Parameters
**********************************

* __AUTO_ENROLLMENT_ENABLED__: Specifies whether or not to enable auto-enrollment via ossec-authd. Defaults to `true`;
* __AUTHD_OPTIONS__: Options to passed ossec-authd, other than -p and -g. Defaults to empty;
* __SYSLOG_FORWADING_ENABLED__: Specify whether syslog forwarding is enabled or not. Defaults to `false`.
* __SYSLOG_FORWARDING_SERVER_IP__: The IP for the syslog server to send messagse to, required for syslog fowarding. No default.
* __SYSLOG_FORWARDING_SERVER_PORT__: The destination port for syslog messages. Default is `514`.
* __SYSLOG_FORWARDING_FORMAT__: The syslog message format to use. Default is `default`.

.. note:: All SYSLOG configuration variables are only applicable to the first time setup. Once the container's data volume has been initialized, all the configuration options for OSSEC can be changed.

ossec-execd is not enabled
**************************

Since this is a docker container, ossec-execd really isn't a great idea anyway. Having a log server, such as graylog, react based on log entries is the recommended approach.



Add agents
**********

For add agent use the next command::

   $ docker exec -it ossec /var/ossec/bin/manage_agents

Or can use auto enrollment tipping the next comman in the machine with the agent::

   $ /var/ossec/bin/agent-auth -m ossec -p 1515 -A example-agent
   INFO: Connected to ossec:1515
   INFO: Using agent name as: melancia
   INFO: Send request to manager. Waiting for reply.
   INFO: Received response with agent key
   INFO: Valid key created. Finished.
   INFO: Connection closed.

.. note:: Don't forget to do a `docker exec -it ossec /var/ossec/bin/ossec-control restart` after you'd added your first agent. 



Configuring and access to Kibana4
---------------------------------

Now we need to create a Kibana index, Kibana will do it automatically but we need to set up some fields on the first Kibana initialization.

- Access to kibana url in the browser, http://localhost:5601 or http://yourlocalip:5601, and set up a new index pattern
- Kibana will ask you to "Configure an index pattern", then do the following:
- Check "Use event times to create index names"
- Index pattern interval: Daily
- Index name or pattern: **[ossec-]YYYY.MM.DD**
- On **Time-field name** list select **@timestamp** option
- Click on Create button
- Go to Discover tap on top bar buttons.

.. note:: Kibana will search Elasticsearch index name pattern "ossec-yyyy.mm.dd" you need to generate alerts from OSSEC BEFORE try to set up an index pattern on kibana, otherwise Kibana won't find any index on elasticsearch. For example you can try a sudo -s and miss the password on purpose several times.

Now you can import the custom dashboards, access to Kibana WEB on your browser and navigate to Objects:

- Click at top bar on Settings
- Click on Objects
- Then click the button **Import** and select the file ~/ossec_tmp/ossec-wazuh/extensions/kibana/kibana-ossecwazuh-dashboards.json

That's all! Refresh Kibana page and load the recently and fresh **imported Dashboards**.

.. note:: Some Dashboard visualizations required time and some special alerts to works, please be patient and don't worry if some visualizations not works properly in few days since first import.

Run the Ossec HIDS  Container
-----------------------------

To run the osec-elk container is very easy, only need to type this command::

   $ docker run --name ossec-server -d -p 1514:1514/udp -p 1515:1515\
  -e SYSLOG_FORWADING_ENABLED=true -e SYSLOG_FORWARDING_SERVER_IP=X.X.X.X\
  -v /somepath/ossec_mnt:/var/ossec/data wazuh/docker-ossec

The following directories are externalized under /var/ossec/data to allow the container to be replaced without configuration or data loss: logs, etc, stats,rules, and queue. In addition to those directories, the bin/.process_list file is symlinked to process_list in the data volume.


Once the system starts up, you can execute the standard ossec commands using docker. For example, to list active agents::

   $ docker exec -ti ossec-server /var/ossec/bin/list_agents -a

Available Configuration Parameters
**********************************

* __AUTO_ENROLLMENT_ENABLED__: Specifies whether or not to enable auto-enrollment via ossec-authd. Defaults to `true`;
* __AUTHD_OPTIONS__: Options to passed ossec-authd, other than -p and -g. Defaults to empty;
* __SMTP_ENABLED__: Whether or not to enable SMTP notifications. Defaults to `true` if ALERTS_TO_EMAIL is specified, otherwise `false`
* __SMTP_RELAY_HOST__: The relay host for SMTP messages, required for SMTP notifications. This host must support non-authenticated SMTP ([see this thread](https://ossec.uservoice.com/forums/18254-general/suggestions/803659-allow-full-confirguration-of-smtp-service-in-ossec)). No default.
* __ALERTS_FROM_EMAIL__: The email address the alerts should come from. Defaults to `ossec@$HOSTNAME`.
* __ALERTS_TO_EMAIL__: The destination email address for SMTP notifications, required for SMTP notifications. No default.
* __SYSLOG_FORWADING_ENABLED__: Specify whether syslog forwarding is enabled or not. Defaults to `false`.
* __SYSLOG_FORWARDING_SERVER_IP__: The IP for the syslog server to send messagse to, required for syslog fowarding. No default.
* __SYSLOG_FORWARDING_SERVER_PORT__: The destination port for syslog messages. Default is `514`.
* __SYSLOG_FORWARDING_FORMAT__: The syslog message format to use. Default is `default`.

**Please note**: All the SMTP and SYSLOG configuration variables are only applicable to the first time setup. Once the container's data volume has been initialized, all the configuration options for OSSEC can be changed.

## Known Issues / Warnings

##### A default localhost agent is added

On first launch, the ossec server will not start up properly and bind to port 1514, unless at least one agent to be present in the client.keys file. To avoid that issue, a local agent is setup by default. See [this bug](https://groups.google.com/forum/#!topic/ossec-list/qeC_h3EZCxQ) with OSSEC.

Based in xetusoss code https://github.com/xetus-oss/docker-ossec-server
