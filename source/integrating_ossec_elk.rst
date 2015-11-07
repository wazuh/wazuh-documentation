.. _ossec_elk:

Integrating OSSEC-ELK Stack
=============================================================

Introduction
--------------------
This document will guide you through the installation and configuration of ELK Stack and OSSEC HIDS for their integration.

We will make use of expanded logging features that have been implemented in our OSSEC Github fork, our OSSEC rule set, our OSSEC RESTful API, custom Logstash/Elaskticsearch configurations and Kibana hardcoded modifications. See below a more detailed description of the mentioned components:

* **OSSEC rule set**
   Includes new rules and decoders. In addition, compliance information has been included mapping rules with PCI DSS controls and CIS benchmark requirements. This rule set is updated periodically in our Github repository.
* **OSSEC expanded JSON output**
   Additional fields have been included in the alerts output, for better integration with Elasticsearch, for example to add compliance controls information. As well, JSON output has been implemented for raw events (archives), and as an output option for ossec binaries (e.g. agent_control).
* **OSSEC RESTful API**
   Provides an interface to interact with OSSEC from anything that can send an HTTP request. Will be used to monitor agent status and configuration and, in some cases, to manage your OSSEC installation.
* **Logstash and Elasticsearch**
   Logstash wil be used to add GeoIP information to OSSEC alerts, and to define how fields are going to be indexed, using a custom Elasticsearch template.
* **Kibana 4**
   Includes OSSEC Alerts, PCI DSS Compliance, CIS Benchmark, Agents management, Agents Info dashboards.
   It also hides non useful fields and displays a short description of compliance requirements on mouseover.

.. note:: If you detect any error in this documentation please report it as an issue in our Github repository. We also appreciate contributions to make it better and more accurate.


Architecture 
-------------
Just in case you are not familiar with the components and tools involved in this integration, here is a brief description of each one of them:

* `OSSEC HIDS <http://www.ossec.net/>`_: Performs log analysis, file integrity checking, policy monitoring, rootkits/malware detection and real-time alerting. The alerts are written in an extended JSON format, and stored locally in the box running the OSSEC manager.

* `Logstash <https://www.elastic.co/products/logstash/>`_: Is a data pipeline used process logs and other event data from a variety of systems. Logstash will read and process OSSEC JSON files, adding IP Geolocation information and modeling data before sending it to the Elasticsearch Cluster.

* `Logstash-Forwarder <https://www.elastic.co/products/logstash/>`_: Is a shipment tool used to send logs from our OSSEC manager server to our Logstash server, where we will also be running our instance of Elasticsearch.

* `Elasticsearch <https://www.elastic.co/products/elasticsearch/>`_: Is the search engine used to index and store our OSSEC alerts. It can be deployed as a cluster, with multiple nodes, for better performance and data replication. 

* `Kibana <https://www.elastic.co/products/kibana/>`_: Kibana is a WEB framework used to explore all elasticsearch indexes. We will use it to analyze OSSEC alerts and to create custom dashboards for different use cases, including compliance regulations like PCI DSS or benchmarks like CIS.

Installation
------------
The above mentioned components can be deployed in a single host or across multiple systems. This last configuration is useful for load balancing, high availability or data replication. For example, this is how our deployment would look like if we decided to use four different hosts:

* *Host 1:* OSSEC Manager + Logstash Forwarder
* *Host 2:* Logstash Server + Elasticsearch Node 1 + Kibana
* *Host 3:* Elasticsearch Node 2
* *Host 3:* Elasticsearch Node 3

This document describes the steps to deploy the entire system in a single host, so we don't need to have multiple servers. In any case you could still build this architecture on different servers. Notes for distributed configurations are included in the documentation. 

Server requirements
^^^^^^^^^^^^^^^^^^^
* RAM memory: Elasticsearch tends to utilize a high amount of memory for data sorting and aggregation. Although it would still work, according to their documentation less than 8GB RAM is counterproductive. In our case, for a single-node deployment, the same server will be sharing resources for OSSEC and ELK Stack, so we recommend to at least meet this 8GB memory requirement. 
* Java 8 `Installing Java 8`_
* `OSSEC Wazuh <http://documentation.wazuh.com/en/latest/installing_ossec_wazuh.html>`_

Installing Java 8
--------------------

APT
^^^^^^^^^^^^^^^^^^^
First you need to add *webupd8team* JAVA repository in your system, then proceed to install Java 8 via apt-get install ::

 $ sudo add-apt-repository ppa:webupd8team/java
 $ sudo apt-get update
 $ sudo apt-get install oracle-java8-installer


YUM
^^^^^^^^^^^^^^^^^^^
Change to your home directory and download the **Oracle Java 8 JDK RPM** with these commands ::

 $ cd ~
 $ wget --no-cookies --no-check-certificate --header "Cookie: gpw_e24=http%3A%2F%2Fwww.oracle.com%2F; oraclelicense=accept-securebackup-cookie" "http://download.oracle.com/otn-pub/java/jdk/8u60-b27/jdk-8u60-linux-x64.rpm"

Install the RPM with this yum command ::

 $ sudo yum localinstall jdk-8u60-linux-x64.rpm

Delete the archive file that you downloaded earlier ::

 $ rm ~/jdk-8u60-linux-x64.rpm 

Set your **JAVA_HOME** environment variable in a bash shell ::

 $ export JAVA_HOME=/usr/java/jdk1.8.0_60/jre 

1. OSSEC
^^^^^^^^^^^^^^^^^^^

First of all, download the whole OSSEC-Wazuh repository from Github which includes **OSSEC HIDS** latest version (2.8.2 base), Wazuh enhanced capabilities and ELK Stack configuration files.

Please complete Wazuh installation guide first, then you can go into this tutorial.

* `Install OSSEC Wazuh <http://documentation.wazuh.com/en/latest/installing_ossec_wazuh.html>`_

.. note:: Remember we are installing OSSEC HIDS forked by Wazuh.

Once OSSEC Wazuh installation has completed, move forward to Logstash installation.

2. Logstash
^^^^^^^^^^^^^^^^^^^
.. note:: At this point you will need Java 8 JRE update 20 or later installed on your system, please proceed to install it before continue with the guide. `Installing Java 8`_

We proceed to install *Logstash Server*, in this case we are installing it on the **same** machine (single-host) where we previously installed OSSEC Manager, that's why some configuration settings will refer local OSSEC files.

In case you go for multi-host architecture, it is recommended to install Logstash in **different** machine than OSSEC Manager, for example, install it on the Elasticsearch machine (explained in detail below).


2.1 Installation
""""""""""""""""""
**Logstash 1.5 version**

We recommend to install Logstash from official repositories, inside next link you will find YUM and DEB packages.

`Elastic.co: Install Logstash from repositories <https://www.elastic.co/guide/en/logstash/current/package-repositories.html>`_

For **Debian Linux** distribution, install DEB packages proceed like following lines.

Download and install the Public Signing Key ::

   $ wget -qO - https://packages.elasticsearch.org/GPG-KEY-elasticsearch | sudo apt-key add -

Add the repository definition to your */etc/apt/sources.list* file ::

   $ echo "deb http://packages.elasticsearch.org/logstash/1.5/debian stable main" | sudo tee -a /etc/apt/sources.list

Update the repository and install **Logstash** ::

   $ sudo apt-get update && sudo apt-get install logstash

   
For **CentOS** distribution, install YUM packages proceed like following lines.

Download and install the Public Signing Key ::

   $ sudo rpm --import https://packages.elasticsearch.org/GPG-KEY-elasticsearch

Add the following in your */etc/yum.repos.d/* directory in a file with a *.repo* suffix, for example *logstash.repo* ::

   $ sudo vi /etc/yum.repos.d/logstash.repo

 [logstash-1.5]
 name=Logstash repository for 1.5.x packages
 baseurl=http://packages.elasticsearch.org/logstash/1.5/centos
 gpgcheck=1
 gpgkey=http://packages.elasticsearch.org/GPG-KEY-elasticsearch
 enabled=1

And your repository is ready for use. You can install it with ::

   $ sudo yum install logstash


2.1 Configuration
""""""""""""""""""

**Configuration files**

Logstash configuration is based on three different plugins: *input*, *filter* and *output*.

We have prepared those three plugins configurations to fit OSSEC/ELK Stack installation (and security compliance extensions), those files are available on the public repository and at the website.

Depend on your architecture Logstash need to be configured to work gathering files from **same machine** (local, single-host) or listening log shipments from **external network machines** (Logstash-Forwarder, multi-host) at 5000 UDP port (Remember to open **5000 UDP** port if you are following multi-host architecture), in this last case the configurations includes SSL Certificaties to authentify and encrypt the messages exchanged.
 
Once Logstash is installed, copy Wazuh Logstash file to Logstash configuration files folder

**Single-host configuration** ::

 $ sudo cp ~/ossec_tmp/ossec-hids/extensions/logstash/01-ossec-singlehost.conf /etc/logstash/conf.d/

**Multi-host configuration** ::

 $ sudo cp ~/ossec_tmp/ossec-hids/extensions/logstash/01-ossec.conf  /etc/logstash/conf.d/

**Set Elasticsearch IP**

Edit *01-ossec.conf* or *01-ossec-singlehost.conf* file and set your Elasticsearch Server IP ::

 host => "your_elasticsearch_server_ip"


**Elasticsearch template** 

Copy Elasticsearch custom mapping from extensions folder to to Logstash folder ::

  $ sudo cp ~/ossec_tmp/ossec-hids/extensions/elasticsearch/elastic-ossec-template.json  /etc/logstash/

**GeoIP DB** 

Download GeoLiteCity from Maxmind website, unzip and move it to Logstash folder ::

  $ sudo curl -O "http://geolite.maxmind.com/download/geoip/database/GeoLiteCity.dat.gz"
  $ sudo gzip -d GeoLiteCity.dat.gz && sudo mv GeoLiteCity.dat /etc/logstash/

**Logstash user** 

In single-host architecture, Logstash user requires to read from OSSEC alerts file, we need to grants permission to do that.

Open users groups file ::

  $ sudo usermod -a -G ossec logstash

**Restart Logstash** 
  
Finally restart Logstash service to apply last changes ::

 $ sudo service logstash restart

2.2 Generate SSL Certificates on Logstash-Server
""""""""""""""""""""""""""""""""""""""""""""""""

.. warning:: SSL Certificates it is only needed for **multi-host** architecture, if you are installing all tools on one machine, you don't need to install Logstash-Forwarder so you don't need to generate SSL Certificates, please refer directly to section `4. Elasticsearch`_

Since we are going to use Logstash Forwarder to ship logs from our hosts to our Logstash Server, we need to create an SSL certificate and key pair. The certificate is used by the Logstash Forwarder to verify the identity of Logstash Server and encrypt communications.

The certificates are created on Logstash Server (we just installed it two steps before) and copied to Logstash-Fowarder machine.

On your **Logstash Server** machine generate the SSL Certificates.

Search and copy your OpenSSL configuration file, in this case we can find it on **/etc/ssl/openssl.cnf**, maybe in your Linux distribution the openssl.cnf is in different folder ::

 $ sudo cd /etc/pki/tls/
 $ sudo cp /etc/ssl/openssl.cnf .

Edit **openssl.cnf** file ::

 $ sudo vi /etc/pki/tls/openssl.cnf

Find the **[ v3_ca ]** section in the file, and *add* the following line below it, replace *logstash_server_private_ip* with your Logstash Server IP ::

 [ v3_ca ]
 subjectAltName = IP: logstash_server_private_ip

Save and exit.

Now generate the **SSL certificate** and private key in the appropriate locations /etc/pki/tls/ ::

 $ cd /etc/pki/tls
 $ sudo openssl req -config /etc/pki/tls/openssl.cnf -x509 -days 3650 -batch -nodes -newkey rsa:2048 -keyout private/logstash-forwarder.key -out certs/logstash-forwarder.crt

Finally we have our Logstash certificate and *key saved* on /etc/pki/tls/certs and /etc/pki/tls/private respectively, we will use them soon.

2.3 Copy SSL Certificate
""""""""""""""""""""""""""""""""""""""""""""""""""""""

On **Logstash Server**, copy the SSL Certificate we **just created** to Logstash-Forwarder machine (substitute the client server's IP address, and your own login)::

 scp /etc/pki/tls/certs/logstash-forwarder.crt user@server_private_IP:/tmp

Now we have on our Logstash-Forwarder machine the certificate on /tmp folder, next step is to install and configure Logstash Forwarder.

3. Logstash-Forwarder
^^^^^^^^^^^^^^^^^^^^^

.. warning:: Logstash-Forwarder configuration it is only necessary to **multi-host** architecture, if you are installing all tools on one machine, you don't need to install Logstash-Forwarder, please refer directly to section `4. Elasticsearch`_

3.1 Installing
""""""""""""""""""""""""""""""""""""""""""""""""""""""

You can visit Elasticsearch official website and download DEB or RPM packages directly from there. 

`Logstash Forwarder DEB & RPM packages <https://www.elastic.co/downloads/logstash>`_

**Debian Linux** DEB repositories and installing by apt-get, proceed to add Logstash-Forwarder repositories, update and install::

 $ wget -qO - https://packages.elasticsearch.org/GPG-KEY-elasticsearch | sudo apt-key add -
 $ sudo echo "deb http://packages.elasticsearch.org/logstashforwarder/debian stable main" | sudo tee -a /etc/apt/sources.list
 $ sudo apt-get update && sudo apt-get install logstash-forwarder


**CentOS** distribution, install YUM packages proceed like following lines.

Download and install the Public Signing Key ::

 $ sudo rpm --import https://packages.elasticsearch.org/GPG-KEY-elasticsearch

Create a file in your */etc/yum.repos.d/* directory in a file with a *.repo* suffix, for example *logstash-forwarder.repo* ::

 $ sudo vi /etc/yum.repos.d/logstash-forwarder.repo

Add the following lines ::

 [logstash-forwarder]
 name=logstash-forwarder repository
 baseurl=http://packages.elasticsearch.org/logstashforwarder/centos
 gpgcheck=1
 gpgkey=http://packages.elasticsearch.org/GPG-KEY-elasticsearch
 enabled=1

Now copy the Logstash server's SSL certificate into the appropriate location (/etc/pki/tls/certs) ::

 $ sudo cp /tmp/logstash-forwarder.crt /etc/pki/tls/certs/

Remember, this certificate is the same we created on 2.3 section.


3.2 Configuring
""""""""""""""""""""""""""""""""""""""""""""""""""""""

Open Logstash Forwarder configuration file, we need to modify some settings to add our certificate recently generated and the Logstash Server IP::

 $ sudo vi /etc/logstash-forwarder.conf

At network section, modify *servers* array, add your **Logstash Server IP address** and uncomment the line ::

 # A list of downstream servers listening for our messages.
 # logstash-forwarder will pick one at random and only switch if
 # the selected one appears to be dead or unresponsive
 "servers": [ "your_logstash_server_ip:5000" ],

Below those lines you will fined the CA configuration, edit with our CA path and uncomment the line ::

 # The path to your trusted ssl CA file. This is used
 # to authenticate your downstream server.
 "ssl ca": "/etc/pki/tls/certs/logstash-forwarder.crt",

Uncomment timeout option line for performance reasons ::

 # logstash-forwarder will assume the connection or server is bad and
 # will connect to a server chosen at random from the servers list.
 "timeout": 15

Finally set LogstashForwarder to fetch **OSSEC ALERTS FILE**, modify list of files and fields to look like this ::

 # The list of files configurations
 "files": [
  {
     "paths": [
       "/var/ossec/logs/alerts/alerts.json"
      ],
     "fields": { "type": "ossec-alerts" }
 }

**Logstash-Forwarder user** 

Logstash-forwarder user requires to read from OSSEC alerts file, we need to grants permission to do that.

Open users groups file ::

  $ sudo usermod -a -G ossec logstash-forwarder

Restart and we are finish to configure Logstash Forwarder ::

  $ sudo service logstash-forwarder restart


4. Elasticsearch
^^^^^^^^^^^^^^^^^^^

4.1 Introduction
""""""""""""""""""""""""""""""""""""""""""""""""""""""

**Elasticsearch 1.7 version**

We recommend to install **Elasticsearch** from official repositories, inside next link you will find YUM and DEB packages.

`Elastic.co: Install Elasticsearch from repositories <https://www.elastic.co/guide/en/elasticsearch/reference/1.7/setup-repositories.html>`_

The followings steps are oriented to build a *single-node* Elasticsearch cluster but remember, Elasticsearch works much better with a minimum of three nodes splitted in different machines, this way Elastic can balance loads and locate shards and replicas.

Big inconvenient with single-node configuration is **no replicas will be created**, this means in case of a takeover or failure of one or more shards there will not be replicas to patch this broken shards. 

Why we can't have replicas on the same machine? The essence of replicas is to spread themselves between nodes, if we only have one node then we can't have replicas, this is why we will set replicas number to 0, otherwise the Cluster will never has **GREEN** health status.

Another consideration is be aware of the amount **RAM usage** that Elasticsearch supposes. Frecuently Elasticsearch is meant to have 50% of total machine RAM but in *single-node* configuration we will consider the RAM usage of Logstash, OSSEC, Kibana etc... that's why we not recommend in a single-node configuration set Elasticsearch RAM to the half of total RAM.




4.2 Installing
""""""""""""""""""""""""""""""""""""""""""""""""""""""

For **Debian Linux** distribution, install DEB packages proceed like following lines.

Download and install the Public Signing Key ::

   $ wget -qO - https://packages.elastic.co/GPG-KEY-elasticsearch | sudo apt-key add -

Add the repository definition to your */etc/apt/sources.list* file ::

   $ echo "deb http://packages.elastic.co/elasticsearch/1.7/debian stable main" | sudo tee -a /etc/apt/sources.list.d/elasticsearch-1.7.list

Update the repository and install **Logstash** ::

   $ sudo apt-get update && sudo apt-get install elasticsearch

Install as service ::

  $ sudo update-rc.d elasticsearch defaults 95 10
   

For **CentOS** distribution, install YUM packages proceed like following lines.

Download and install the Public Signing Key ::

   $ sudo rpm --import https://packages.elastic.co/GPG-KEY-elasticsearch

Add the following in your */etc/yum.repos.d/* directory in a file with a *.repo* suffix, for example *elasticsearch.repo* ::

   $ sudo vi /etc/yum.repos.d/elasticsearch.repo

 [elasticsearch-1.7]
 name=Elasticsearch repository for 1.7.x packages
 baseurl=http://packages.elastic.co/elasticsearch/1.7/centos
 gpgcheck=1
 gpgkey=http://packages.elastic.co/GPG-KEY-elasticsearch
 enabled=1

And your repository is ready for use. You can install it with ::

   $ sudo yum install elasticsearch

Configure Elasticsearch to automatically start during bootup. If your distribution is using SysV init, then you will need to run ::

 $ sudo chkconfig --add elasticsearch

 
Otherwise if your distribution is using systemd ::

 $ sudo /bin/systemctl daemon-reload
 $ sudo /bin/systemctl enable elasticsearch.service



4.3 Basic configuration
""""""""""""""""""""""""""""""""""""""""""""""""""""""

We are not going to explain all the Elasticsearch configuration options, you can find them at official docs. We will explain basic configuration and some tweaks to improve performance.

Open Elasticsearch configuration file ::

 $ sudo vi /etc/elasticsearch/elasticsearch.yml

Set up **Cluster Name** and **Node Name**, remember that these settings ** HAS TO **  match with Logstash configuration file (in case you wan't to change cluster name remember to change it on Logstash output plugin) :: 

 cluster.name: ossec
 node.name: ossec_node1

Set up network configuration options

Elasticsearch **IP server address**, in *single-node* case should be localhost, 127.0.0.1 or 0.0.0.0 ::

 network.bind_host: 0.0.0.0

Elasticsearch **publish IP Address**, how the network will discover our Elasticsearch server ::

 network.publish_host: publicip

*publish_host* and *bind_host* variables, this variable set both of them at same time same value ::

 network.host: publicip

Elasticsearch uses by default **port 9200** for the API queries and ports **9300 to 9400** to network nodes discovering. Remember to open the ports in your router/firewall settings.

HTTP Elasticsearch API PORT, default 9200::

 http.port: 9200

*Improve network* load and prevent non-desired nodes to join our clusters :: 

 discovery.zen.ping.multicast.enabled: false
 discovery.zen.ping.timeout: 15s

**Single-node** shards/replicas configuration ::

  index.number_of_shards: 1
  index.number_of_replicas: 0

**Multinode** shards/replicas configuration ::

  index.number_of_shards: 4 
  index.number_of_replicas: 1

**Multinode**: We set before multicast ping to false so we need to manually specify the nodes connections ::

  discovery.zen.ping.unicast.hosts: ["host1", "host2:port"] 
 

**Save and exit elasticsearch.yml file** 

Start Elasticsearch ::

  $ sudo /etc/init.d/elasticsearch start


4.4 Extra performance configuration
""""""""""""""""""""""""""""""""""""""""""""""""""""""

Some tweats to *optimize* Elasticsearch general performance thought RAM configurations.

Basically we will try to lock Elasticsearch RAM minimum and maximum amount, this way we can avoid the swapping, Elasticsearch feels so bad about swapping, every time Elasticsearch needs to swap query and fetch queries **multiply per ten their load time**.

Open Elasticsearch configuration file ::

 $ sudo vi /etc/elasticsearch/elasticsearch.yml


Modify **mklockall** setting, set it to true ::  

  bootstrap.mlockall: true


**Save and exit elasticsearch.yml file** 


Open and edit **limits.conf** file ::

 $ sudo vi /etc/security/limits.conf


Add this lines at bottom of the file :: 

  elasticsearch - nofile  65535    
  elasticsearch - memlock unlimited


**Save and exit limits.conf file** 
 
Open and edit Elasticsearch init file

Debian Linux  ::

 $ sudo vi /etc/default/elasticsearch

CentOS ::

 $ sudo vi /etc/sysconfig/elasticsearch

Find **ES_HEAP_SIZE** and set it to *50%* of your total RAM, remember, if you are running single-node architecture, set it to *40%* ::

 ES_HEAP_SIZE=1g

Find **MAX_LOCKED_MEMORY** and set it to unlimited ::

 MAX_LOCKED_MEMORY=unlimited

Find **MAX_OPEN_FILES** and set it to 65535 ::

 MAX_OPEN_FILES=65535

In case of CentOS open and edit */usr/lib/systemd/system/elasticsearch.service* and uncomment the line ::

 LimitMEMLOCK=infinity

 
**Save and exit /etc/default/elasticsearch file** 


Restart Elasticsearch ::

  $ sudo /etc/init.d/elasticsearch start


4.5 Cluster health
""""""""""""""""""""""""""""""""""""""""""""""""""""""

We will run some tests to see if Elasticsearch is *working properly*.

Elasticsearch is **running** ::

  $ curl -XGET localhost:9200

Expected result ::

  {
    "status" : 200,
    "name" : "ossec_node1",
    "cluster_name" : "ossec",
    "version" : {
      "number" : "1.7.2",
      "build_hash" : "e43676b1385b8125d647f593f7202acbd816e8ec",
      "build_timestamp" : "2015-09-14T09:49:53Z",
      "build_snapshot" : false,
      "lucene_version" : "4.10.4"
    },
    "tagline" : "You Know, for Search"
  }

Elasticsearch Cluster is in a **good health** ::

  $ curl -XGET 'http://localhost:9200/_cluster/health?pretty=true'

Expected result ::

  {
    "cluster_name" : "ossec",
    "status" : "green",
    "timed_out" : false,
    "number_of_nodes" : 2,
    "number_of_data_nodes" : 1,
    "active_primary_shards" : 0,
    "active_shards" : 0,
    "relocating_shards" : 0,
    "initializing_shards" : 0,
    "unassigned_shards" : 0,
    "delayed_unassigned_shards" : 0,
    "number_of_pending_tasks" : 0,
    "number_of_in_flight_fetch" : 0
  }
  

4.6 Custom template
""""""""""""""""""""""""""""""""""""""""""""""""""""""

It's time to integrate OSSEC Wazuh custom mapping. It is consist in a Elasticsearch template which has already mapped all the posible OSSEC fields, the mapping is adjusted to fit the special Wazuh OSSEC JSON Output and Logstash filters and it is prepared to display friendly fields name on Kibana.

This template allow us the posterior creation of **Kibana dashboards**.

Add the template by a *CURL* request to Elastic API ::

 $ cd ~/ossec_tmp/ossec-hids/extensions/elasticsearch/ && curl -XPUT "http://localhost:9200/_template/ossec/" -d "@elastic-ossec-template.json"
      
If everything was okey, the API response should be ::

 {"acknowledged":true}

To make sure it is added you can check for actual template load on Elastic ::

 $ curl -XGET http://localhost:9200/_template/ossec?pretty


5. Kibana
^^^^^^^^^^^^^^^^^^^

**Kibana 4.1.2 version**

`Kibana official website <https://www.elastic.co/downloads/kibana>`_

**The final step!** Finally we will able to see the whole architecture results in a web display ! I can tell you it is worth it all the previous steps when you see the Kibana interface working at real time.

Remember Kibana it is only a web display for Elasticsearch, Kibana *won't let you add or update Elastic documents*, it is only for viewing and analyzing purposes.

Okay, Let's do this!

5.1 Installing
""""""""""""""""""""""

Kibana is the only tool *doesn't have proper repositories*, that's mean we can only get and install it by downloading the tar compressed files and after that install some scripts to turn Kibana into a proper Linux service.

Go to your OSSEC tmp folder(we created it at the very beginning) and **download** Kibana there :: 

 $ sudo cd ~/ossec_tmp
 $ sudo wget https://download.elastic.co/kibana/kibana/kibana-4.1.2-linux-x64.tar.gz 

**Untar** the file and copy the files to a more proper directory ::

 $ sudo tar xvf kibana-*.tar.gz
 $ sudo mkdir -p /opt/kibana
 $ sudo cp -R kibana-4*/* /opt/kibana/

To run **Kibana as a service** we will use a script created apparently by *bsmith*, thanks you. Copy it from extensions kibana ossec wazuh folder :: 

 $ sudo cp ~/ossec_tmp/ossec-hids/extensions/kibana/kibana4 /etc/init.d/

Then you should give it *execution permissions* and add to update rc.d configuration (Debian Linux) ::

 $ sudo chmod +x /etc/init.d/kibana4
 $ sudo update-rc.d kibana4 defaults 96 9

To run **Kibana as a service** in CentOS create the Kibana systemd init file using vi::

 $ sudo vi /etc/systemd/system/kibana4.service

Now paste in this Kibana init file:::

 [Service]
 ExecStart=/opt/kibana/bin/kibana
 Restart=always
 StandardOutput=syslog
 StandardError=syslog
 SyslogIdentifier=kibana4
 User=root
 Group=root
 Environment=NODE_ENV=production

 [Install]
 WantedBy=multi-user.target

Save and exit.

Now start the Kibana service, and enable it::

 $ sudo systemctl start kibana4
 $ sudo systemctl enable kibana4


5.2 Settings
""""""""""""""""""""""

Time to set up our Kibana configuration.

Open *kibana.yml* configuration file and make some changes ::

 $ sudo vi /opt/kibana/config/kibana.yml

Change host ip address if you need it, normally you won't change this ::

 # The host to bind the server to.
 host: "127.0.0.1"

Change Elasticsearch URL, this has to be identital to the URL we set on Elasticsearch configuration options on "network.bind_host" or "network.host" ::

 # The Elasticsearch instance to use for all your queries.
 elasticsearch_url: "http://127.0.0.1:9200"

Start Kibana :: 

 $ sudo service kibana4 start

5.3 Configuring
""""""""""""""""""""""

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

5.4 Extensions
""""""""""""""""""""""

Wazuh extensions consist in **two** different files:

* index.js: Kibana AngularJS Index

We tune up this index to hide non-useful fields, view only mode and PCI Requirements tooltip descriptions.

* kibana-ossecwazuh-dashboards.json

Custom dashboards for OSSEC Alerts, GeoIP Maps, File integrity, PCI Requirements & CIS Benchmarks.

So, proceed to copy the necessary files to Kibana folder ::

 $ sudo cp ~/ossec_tmp/ossec-hids/extensions/kibana/index.js /opt/kibana/src/public
 $ sudo mkdir /opt/kibana/src/public/components/compliance
 $ sudo cp ~/ossec_tmp/ossec-hids/extensions/kibana/compliance.json /opt/kibana/src/public/components/compliance/


Now you can import the custom dashboards, access to Kibana WEB on your browser and navigate to Objects:

- Click at top bar on Settings
- Click on Objects
- Then click the button **Import** and select the file ~/ossec_tmp/ossec-hids/extensions/kibana/kibana-ossecwazuh-dashboards.json

That's all! Refresh Kibana page and load the recently and fresh **imported Dashboards**.

.. note:: Some Dashboard visualizations required time and some special alerts to works, please be patient and don't worry if some visualizations not works properly in few days since first import.


Protecting Kibana 4
--------------------

We are going to use **Nginx web server** to build a secure proxy to secure our Kibana Web Interface, we will establish a secure connection with SSL Certificates and HTTP Authentication.

Install Nginx
^^^^^^^^^^^^^^^^^^^

**APT**

Update repositories and install Nginx and apache2-utils (for htpassword) ::

 $ sudo apt-get update
 $ sudo apt-get install nginx apache2-utils


**YUM**

Install and start Nginx :: 

 $ sudo yum install epel-release
 $ sudo yum install nginx httpd-tools
 $ sudo systemctl start nginx

Configure Nginx
^^^^^^^^^^^^^^^^^^^

Add a configuration file on **conf.d** Nginx folder(CentOS) :: 

  $ sudo vi /etc/nginx/conf.d/kibana.conf

Add a configuration file on **conf.d** Nginx folder(Ubuntu) :: 

  $ sudo /etc/nginx/sites-available/default

Paste the following configuration :: 

 server {
        listen 80 default_server;                       #Listen on IPv4
        listen [::]:80;                                 #Listen on IPv6
        return 301 https://$host$request_uri;
 }

 server {
        listen                *:443;
         listen            [::]:443;
        ssl on;
        ssl_certificate /etc/pki/tls/certs/kibana-access.crt;
        ssl_certificate_key /etc/pki/tls/private/kibana-access.key;
        server_name           "Server Name";
        access_log            /var/log/nginx/kibana.access.log;
        error_log  /var/log/nginx/kibana.error.log;

        location / {
                auth_basic "Restricted";
                auth_basic_user_file /etc/nginx/conf.d/kibana.htpasswd;
                proxy_pass http://127.0.0.1:5601;
        }
 }


In CentOS need some more changes::

   $ sudo vi /etc/nginx/nginx.conf

Find the default server block (starts with server {), the last configuration block in the file, and delete it. When you are done, the last two lines in the file should look like this::

    include /etc/nginx/conf.d/*.conf;
    }

Save and exit.


This configuration set up Nginx to listen on 443 and 80, but this last will redirect every connection to 443 port (HTTPS).

**Generate certificates**

Create the SSL certificates and copy them to the proper directory :: 

 $ cd ~
 $ sudo openssl genrsa -des3 -out server.key 1024

Enter the password you choose and continue :: 

 $ sudo openssl req -new -key server.key -out server.csr

Enter again the password, fill the certificate information (the data you fill up won't affect the final result) and continue :: 

 $ sudo cp server.key server.key.org
 $ sudo openssl rsa -in server.key.org -out kibana-access.key
 $ sudo openssl x509 -req -days 365 -in server.csr -signkey server.key -out kibana-access.crt
 $ sudo mkdir -p /etc/pki/tls/certs
 $ sudo cp kibana-access.crt /etc/pki/tls/certs/
 $ sudo mkdir -p /etc/pki/tls/private/
 $ sudo cp kibana-access.key /etc/pki/tls/private/

That's all, now we have our certificates finished and our connection will be encrypted, let's move on generate password for HTTP authentication.

**Generate users and passwords**

Replace **kibabaadmin** with your own username :: 

 $ sudo htpasswd -c /etc/nginx/conf.d/kibana.htpasswd kibanaadmin

**Restart Nginx**

Restart Nginx service :: 

 $ sudo service nginx restart

That's all! Try to access to Kibana Web and the HTTP authentication will prompt asking for the password you just created. Now we got a Kibana instance HTTPS and password protected secured.


.. warning:: If in CentOS have logs similar than this ** *6 connect() to 127.0.0.1:5601 failed (13: Permission denied) while connecting to upstream, client: ** follow follow the next setp

Disable SELinux CentOS
-----------------------

SELinux is a security extension of CentOS that should provide extended security. SELinux was causing the problem you can change to permissive follow the next steps::

   $ sudo vi /etc/selinux/config

Change SELINUX to permissive::

   # This file controls the state of SELinux on the system.
   # SELINUX= can take one of these three values:
   #     enforcing - SELinux security policy is enforced.
   #     permissive - SELinux prints warnings instead of enforcing.
   #     disabled - No SELinux policy is loaded.
   SELINUX=**permissive**
   # SELINUXTYPE= can take one of these two values:
   #     targeted - Targeted processes are protected,
   #     mls - Multi Level Security protection.
   SELINUXTYPE=targeted

Afterwards we must reboot the system::

  $ sudo reboot



What next?
-----------

Once you have OSSEC Wazuh installed you can move forward and try out the API RESTful, check it on:

* `API RESTful Installation Guide <http://documentation.wazuh.com/en/latest/installing_ossec_api.html>`_

.. toctree:: 
   :maxdepth: 2



