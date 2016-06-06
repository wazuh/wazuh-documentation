.. _ossec_elk_logstash:

Logstash
========

When integrating OSSEC HIDS with ELK Stack, we use Logstash to model OSSEC alerts output using an Elasticsearch template that will let the indexer know how to process each alert field.

For single-host type of deployments we directly install the ``Logstash server`` on the same system where the OSSEC manager and Elasticsearch are running. This type of installations do not require the ``Logstash forwarder`` component. This one is only necessary when deploying the OSSEC manager on a different server from the one where ``Logstash server`` and ``Elasticsearch`` are running.

.. Note:: Remember Java 8 JRE is required by Logstash server. You can see instructions to install it at :ref:`our documentation <ossec_elk_java>`.

.. topic:: Distributed architectures

	 For distributed deployments, with multiple servers, this is where you need to install Logstash components:

	 - Elasticsearch main cluster node: Logstash server
	 - OSSEC manager server: Logstash forwarder


Logstash installation on Debian
-------------------------------

To install ``Logstash server`` version 2.1 on Debian based distributions run the following commands on your system: ::

 $ wget -qO - https://packages.elasticsearch.org/GPG-KEY-elasticsearch | sudo apt-key add -
 $ echo "deb https://packages.elasticsearch.org/logstash/2.1/debian stable main" | sudo tee -a /etc/apt/sources.list
 $ sudo apt-get update && sudo apt-get install logstash

If you have any doubt, visit the `official installation guide <https://www.elastic.co/guide/en/logstash/current/package-repositories.html>`_.
 
Logstash forwarder
^^^^^^^^^^^^^^^^^^

Only for distributed architectures you need to install ``Logstash forwarder``, on the system where you run your OSSEC manager, running the following commands: ::

 $ wget -qO - https://packages.elasticsearch.org/GPG-KEY-elasticsearch | sudo apt-key add -
 $ sudo echo "deb https://packages.elasticsearch.org/logstashforwarder/debian stable main" | sudo tee -a /etc/apt/sources.list
 $ sudo apt-get update && sudo apt-get install logstash-forwarder

Logstash installation on CentOS
-------------------------------

To install ``Logstash server`` version 2.1 RPM package. Lets start importing the repository GPG key: ::

 $ sudo rpm --import https://packages.elasticsearch.org/GPG-KEY-elasticsearch

Then we need to create ``/etc/yum.repos.d/logstash.repo`` file with the following content: ::

 [logstash-2.1]
 name=Logstash repository for 2.1.x packages
 baseurl=https://packages.elastic.co/logstash/2.1/centos
 gpgcheck=1
 gpgkey=https://packages.elastic.co/GPG-KEY-elasticsearch
 enabled=1

And finally we install the RPM package with yum: ::

 $ sudo yum install logstash
 
If you have any doubt, visit the `official installation guide <https://www.elastic.co/guide/en/logstash/current/package-repositories.html>`_.

Logstash forwarder
^^^^^^^^^^^^^^^^^^

Only for distributed architectures you need to install ``Logstash forwarder``, on the system where you run your OSSEC manager. Lets start importing the necessary GPG key: ::

 $ sudo rpm --import https://packages.elasticsearch.org/GPG-KEY-elasticsearch

Then we create a yum repository in ``/etc/yum.repos.d/logstash-forwarder.repo`` with the following content: ::

 [logstash-forwarder]
 name=logstash-forwarder repository
 baseurl=https://packages.elasticsearch.org/logstashforwarder/centos
 gpgcheck=1
 gpgkey=https://packages.elasticsearch.org/GPG-KEY-elasticsearch
 enabled=1

And now we install the RPM package with yum: ::

 $ sudo yum install logstash-forwarder


Logstash forwarder configuration
--------------------------------

.. note:: This step is only necessary when deploying the OSSEC manager and Elasticsearch on different systems. If you are using a single host deployment, with OSSEC manager and ELK Stack on the same box, you can skip this section.

Since we are going to use Logstash forwarder to ship logs from our hosts to our Logstash server, we need to create an SSL certificate and key pair. The certificate is used by the Logstash forwarder to verify the identity of Logstash server and encrypt communications. 

SSL Certificate
^^^^^^^^^^^^^^^

The SSL certificate needs to be created on your ``Logstash Sever``, and then copied to your Logstash forwarder machine. See below how to create this certificate when you run your Logstash server on a Debian or a CentOS Linux distribution.

SSL Certificate on Debian
"""""""""""""""""""""""""

To create the SSL certificate on a Debian system, open ``/etc/ssl/openssl.cnf`` and find the ``[ v3_ca ]`` section, adding the following line below it (replacing ``logstash_server_ip`` with your Logstash Server IP): ::

 [ v3_ca ]
 subjectAltName = IP: logstash_server_ip

Now generate the SSL certificate and private key, and copy it to your Logstash forwarder system via scp (substituting ``user`` and ``logstash_forwarder_ip`` by their real values): ::

 $ cd /etc/ssl/
 $ sudo openssl req -config /etc/ssl/openssl.cnf -x509 -days 3650 -batch -nodes -newkey rsa:2048 -keyout /etc/logstash/logstash-forwarder.key -out /etc/logstash/logstash-forwarder.crt
 $ scp /etc/logstash/logstash-forwarder.crt user@logstash_forwarder_ip:/tmp

Then log into your Logstash forwarder system, via SSH, and move the certificate to the right directory: ::
   
 $ sudo mv /tmp/logstash-forwarder.crt /opt/logstash-forwarder/

SSL Certificate on CentOS
"""""""""""""""""""""""""

To create the SSL certificate on a CentOS system, open ``/etc/pki/tls/openssl.cnf`` and find the ``[ v3_ca ]`` section, adding the following line below it (replacing ``logstash_server_ip`` with your Logstash Server IP): ::

 [ v3_ca ]
 subjectAltName = IP: logstash_server_ip

Now generate the SSL certificate and private key, and copy it to your Logstash forwarder system via scp (substituting ``user`` and ``logstash_forwarder_ip`` by their real values): ::

 $ cd /etc/pki/tls/
 $ sudo openssl req -config /etc/pki/tls/openssl.cnf -x509 -days 3650 -batch -nodes -newkey rsa:2048 -keyout /etc/logstash/logstash-forwarder.key -out /etc/logstash/logstash-forwarder.crt
 $ scp /etc/logstash/logstash-forwarder.crt user@logstash_forwarder_ip:/tmp

Then log into your Logstash forwarder system, via SSH, and move the certificate to the right directory: ::
 
 $ sudo mv /tmp/logstash-forwarder.crt /opt/logstash-forwarder

Logstash forwarder settings
^^^^^^^^^^^^^^^^^^^^^^^^^^^

Now on your Logstash forwarder system (same one where you run the OSSEC manager), open the configuration file ``/etc/logstash-forwarder.conf`` and, at the network section, modify the ``servers`` array adding your Logstash server IP address (substitute ``logstash_server_ip`` with the real value). As well don't forget to uncomment the line ::

 # A list of downstream servers listening for our messages.
 # logstash-forwarder will pick one at random and only switch if
 # the selected one appears to be dead or unresponsive
 "servers": [ "logstash_server_ip:5000" ],

Below those lines you will find the CA configuration settings. We use ``ssl ca`` variable to specify the path to our Logstash forwarder SSL certificate ::

 # The path to your trusted ssl CA file. This is used
 # to authenticate your downstream server.
 "ssl ca": "/opt/logstash-forwarder/logstash-forwarder.crt",

Once that is done, in the same file, uncomment timeout option line to increase connection reliability: ::

 # logstash-forwarder will assume the connection or server is bad and
 # will connect to a server chosen at random from the servers list.
 "timeout": 15

Finally set Logstash forwarder to read OSSEC alerts file, modify list of files configuration to look like this: ::

 # The list of files configurations
 "files": [
  {
     "paths": [
       "/var/ossec/logs/alerts/alerts.json"
      ],
     "fields": { "type": "ossec-alerts" }
 }
 ]

At this point, save and exit the Logstash forwarder configuration file. Let's now give it permissions to read the alerts file, by adding ``logstash-forwarder`` user to the ``ossec`` group: ::

 $ sudo usermod -a -G ossec logstash-forwarder

We are now done with the configuration, and just need to restart the Logstash Forwarder to apply changes: ::

 $ sudo service logstash-forwarder restart

Logstash server configuration
-----------------------------

Logstash configuration is based on three different plugins: *input*, *filter* and *output*. You can find the plugins already preconfigured, to integrate OSSEC with ELK Stack, in our `public github repository <http://github.com/wazuh/ossec-wazuh/>`_.

Depending on your architecture, single-host or distributed, we will configure Logstash server to read OSSEC alerts directly from OSSEC log file, or to read the incoming data (sent by Logstash forwarder) from port 5000/udp (remember to open your firewall to accept this traffic). 

For ``single-host deployments`` (everything running on the same box), just copy the configuration file ``01-ossec-singlehost.conf`` to the right directory: ::

 $ sudo cp ~/ossec_tmp/ossec-wazuh/extensions/logstash/01-ossec-singlehost.conf /etc/logstash/conf.d/

Instead, for distributed architectures, you need to copy the configuration file ``01-ossec.conf`` ::

 $ sudo cp ~/ossec_tmp/ossec-wazuh/extensions/logstash/01-ossec.conf  /etc/logstash/conf.d/

Logstash server by default is bound to loopback address *127.0.0.1* , if your Elasticsearch server is in a different host, remember to modify ``01-ossec.conf`` or ``01-ossec-singlehost.conf`` to set up your Elastic IP ::

 hosts => ["elasticsearch_server_ip:9200"]

.. note:: Remember that, for both single-host and distributed deployments, we recommend to run Logstash server and Elasticsearch on the same server. This means that *elasticsearch_server_ip* would match your *logstash_server_ip*.

Copy the Elasticsearch custom mapping from the extensions folder to the Logstash folder: ::

 $ sudo cp ~/ossec_tmp/ossec-wazuh/extensions/elasticsearch/elastic-ossec-template.json  /etc/logstash/

And now download and install GeoLiteCity from the Maxmind website. This will add geolocation support for public IP addresses: ::

 $ sudo curl -O "http://geolite.maxmind.com/download/geoip/database/GeoLiteCity.dat.gz"
 $ sudo gzip -d GeoLiteCity.dat.gz && sudo mv GeoLiteCity.dat /etc/logstash/

In single-host deployments, you also need to grant the *logstash* user access to OSSEC alerts file: ::

 $ sudo usermod -a -G ossec logstash
  
.. note:: We are not going to start Logstash service yet, we need to wait until we import Wazuh template into Elasticsearch (see next guide)

What's next
-----------

Once you have Logstash installed and configured you can move forward with Elasticsearch and Kibana:

* :ref:`Elasticsearch <ossec_elk_elasticsearch>`
* :ref:`Kibana <ossec_elk_kibana>`
* :ref:`OSSEC Wazuh RESTful API <ossec_api>`
* :ref:`OSSEC Wazuh Ruleset <ossec_ruleset>`
