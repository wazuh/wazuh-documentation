Ossec with Docker
=================

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


Configuring and access
----------------------

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


