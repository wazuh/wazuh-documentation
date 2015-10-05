Integrating OSSEC-ELK Stack
=============================================================

Introduction
--------------------
This document will guide you through the installation and configuration of ELK Stack for proper integration with OSSEC HIDS.

This integration makes use of expanded logging features that have been implemented in our OSSEC Github fork, our OSSEC rule set, our OSSEC RESTful API, custom Logstash/Elaskticsearch configurations and Kibana hardcoded modifications. See below a more detailed list of the components and modifications involved in this integration:

* **OSSEC rule set**
   Includes new rules and compliance mapping for PCI DSS 3.0 controls and CIS requirements. 
   It will be updated periodically, in our Github repository, with new rules and decoders.
* **OSSEC expanded JSON output**
   Several fields have been modified/added. E.g. groups array, timestamps, agent names, locations, file integrity.
* **OSSEC RESTful API**
   Used to get configuration and agents related information from OSSEC installation. 
* **Logstash and Elasticsearch**
   Logstash configuration includes GeoIP and a customized elasticsearch template for OSSEC.
* **Kibana 4**
   Includes OSSEC Alerts, PCI Complianace, CIS Compliance, Agents management, Agents Info dashboards.
   It also hides non useful fields and displays a short summary of PCI Requirements on mouseover on PCI Alerts.

.. note:: If you detect any error in this documentation please report it as an issue in our Github repository. We also appreciate contributions to make it better and more accurate.


Architecture 
-------------
As mentioned in the introduction, this integration involves several components, that are used to process, index and store OSSEC alerts.

* *`OSSEC HIDS <http://www.ossec.net/>`_* Performs log analysis, file integrity checking, policy monitoring, rootkits/malware detection and real-time alerting. The alerts are written in an extended JSON format, and stored locally in the box running the OSSEC manager.

* *`Logstash <https://www.elastic.co/products/logstash/>`_*

Logstash is a data pipeline used process logs and other event data from a variety of systems. Logstash will read and process OSSEC JSON files, adding IP Geolocation information and modeling data before sending it to the Elasticsearch Cluster.

* *`Logstash-Forwarder <https://www.elastic.co/products/logstash/>`_*

Logstash-Forwarder is a shipment tool used to send logs from our OSSEC manager server to our Logstash server, where we will also be running our instance of Elasticsearch.

* *`Elasticsearch <https://www.elastic.co/products/elasticsearch/>`_*

Search engine used to index and store our OSSEC alerts. It can be deployed as a cluster, with multiple nodes, for better performance and data replication. 

* *`Kibana <https://www.elastic.co/products/kibana/>`_*

Kibana is a WEB framework used to explore all elasticsearch indexes. We will use it to analyze OSSEC alerts and to create custom dashboards for different use cases, including compliance regulations like PCI DSS or benchmarks like CIS.

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
* Java 8 `(Example Ubuntu install guide) <http://tecadmin.net/install-oracle-java-8-jdk-8-ubuntu-via-ppa/>`_

1. OSSEC
^^^^^^^^^^^^^^^^^^^
First of all, download the whole OSSEC-Wazuh repository from Github which includes **OSSEC HIDS** latest version (2.8.2 base), Wazuh enhanced capabilities and ELK Stack configuration files.

1.1 Installation
""""""""""""""""""

Create a folder on your preferred home directory and download the repository.

Go home folder, create temporal folder, clone the repository ::

   $ cd ~
   $ mkdir ossec_tmp && cd ossec_tmp
   $ git clone https://github.com/wazuh/ossec-wazuh.git
   $ cd ossec-wazuh

Now we have the OSSEC source code on our machine, let's compile it. 
We need development and packages tools like g++, gcc etc... if it is needed, install them this ::

 For CentOS: $ sudo yum groupinstall 'Development Tools'
 For Debian Linux: $ sudo apt-get install build-essential

.. note:: **CentOS** requires add an OSSEC user BEFORE the installation : **$ sudo useradd ossec**

Finally compile and install **OSSEC Manager** ::

   $ sudo ./install.sh

Follow the installation steps OSSEC prompts at console, they are identical to OSSEC official version, you can read a detailed explanation here: `Manager installation  <http://documentation.wazuh.com/en/latest/source.html#manager-installation/>`_


You can let all prompt steps by **default** by pressing ENTER at every question OSSEC installation ask you, by now, we don't need a specific OSSEC config installation.


1.2 Configuration
""""""""""""""""""
We need just one tweak at OSSEC configuration files, enable JSON output. 

Open OSSEC conf file ::

   $ sudo vi /var/ossec/etc/ossec.conf

Add inside **<global></global>** tags the JSON output setting ::

   <jsonout_output>yes</jsonout_output>

That's all! Now start your OSSEC Manager ::

   $ sudo /var/ossec/bin/ossec-control start

How to know if everything was okay? Check if *alerts.json* file exits and contains alerts ::

   $ sudo cat /var/ossec/logs/alerts/alerts.json


1.3 Agents
""""""""""""""""""

Agent deployment is fully explained in agent install documentation, check out there how to install, deploy and connect OSSEC Agents: `OSSEC Agents <http://documentation.wazuh.com/en/latest/source.html#agent-installation>`_

For the completation of this guide we don't need to add agents by now.

2. Logstash
^^^^^^^^^^^^^^^^^^^
.. note:: At this point you will need Java 8 JRE update 20 or later installed on your system, please proceed to install it before continue with the guide. `Install Java 8 <#a-install-java-8>`_

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

Depend on your architecture Logstash need to be configured to work gathering files from **same machine** (local, single-host) or waiting log shipments from **external network machines** (Logstash-Forwarder, multi-host) at 5000 UDP port, in this last case the configurations includes SSL Certificaties to authentify and encrypt the messages exchanged.

Here is a example what we are talking about.

Single-host input plugin example ::

  input {
    file {
      type => "ossec-alerts"
      path => "/var/ossec/logs/alerts/alerts.json"
      codec => "json"
    }
  }


Multi-host input plugin example ::

  input {
    lumberjack {
      port => 5000
      type => "lumberjack"
      ssl_certificate => "/etc/pki/tls/certs/logstash-forwarder.crt"
      ssl_key => "/etc/pki/tls/private/logstash-forwarder.key"
      codec => json
     }
  }


Once Logstash be installed copy Wazuh **SINGLE-HOST** Logstash file to Logstash configuration files ::

  $ sudo cp ~/ossec_tmp/ossec-wazuh/extensions/logstash/01-ossec-singlehost.conf /etc/logstash/conf.d/

Or copy Wazuh Logstash **MULTI-HOST** file to Logstash configuration files ::

  $ sudo cp ~/ossec_tmp/ossec-wazuh/extensions/logstash/01-ossec.conf  /etc/logstash/conf.d/

In both cases edit *01-ossec.conf* or *01-ossec-singlehost.conf* file and set your Elasticsearch Server IP (Single-host case the IP should be 127.0.0.1) ::

  elasticsearch {
           host => "your_elasticsearch_server_ip"


And remember to open **5000 UDP PORT** if you are going to deploy multi-host architecture.

**Elasticsearch template** 

Copy Elasticsearch custom mapping from extensions folder to to Logstash folder ::

  $ sudo cp ~/ossec_tmp/ossec-wazuh/extensions/elasticsearch/elastic-ossec-template.json  /etc/logstash/

**GeoIP DB** 

Download GeoLiteCity from Maxmind website, unzip and move it to Logstash folder ::

  $ sudo curl -O "http://geolite.maxmind.com/download/geoip/database/GeoLiteCity.dat.gz"
  $ sudo sudo gzip -d GeoLiteCity.dat.gz && sudo mv GeoLiteCity.dat /etc/logstash/

**Logstash user** 

In case you are installing single-host architecture, Logstash will need to read from OSSEC alerts file, we need to grants permission to do that.

Open users groups file ::

  $ sudo vi /etc/group

Search for "*ossec*" and add **logstash** at the end of that line, just like this ::

  ubuntu:x:1000:
  ossec:x:1001:logstash
  scanner:x:111:

**Restart Logstash** 
  
Finally restart Logstash service to apply last changes ::

 $ sudo service logstash restart

2.2 Generate SSL Certificates on Logstash-Server
""""""""""""""""""""""""""""""""""""""""""""""""

.. warning:: SSL Certificates it is only needed for **multi-host** architecture, if you are installing all tools on one machine, you don't need to install Logstash-Forwarder so you don't need to generate SSL Certificates, please refer directly to section `4. Elasticsearch <#id4>`_

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

.. warning:: Logstash-Forwarder configuration it is only necessary to **multi-host** architecture, if you are installing all tools on one machine, you don't need to install Logstash-Forwarder, please refer directly to section `4. Elasticsearch <#id4>`_

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

 network.bind_host: 127.0.0.1

Elasticsearch **publish IP Address**, how the network will discover our Elasticsearch server ::

 network.publish_host: 127.0.0.1

*publish_host* and *bind_host* variables, this variable set both of them at same time same value ::

 network.host: 127.0.0.1

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

  elasticsearch - nofile 65535    
  elasticsearch   -       memlock         unlimited


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

In case of Centos open and edit */usr/lib/systemd/system/elasticsearch.service* and uncomment the line ::

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

 $ curl -XPUT "http://localhost:9200/_template/ossec/" -d "@~/ossec_tmp/ossec-wazuh/extensions/elasticsearch/elastic-ossec-template.json"
      
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

 $ sudo cp ~/ossec_tmp/ossec-wazuh/extensions/kibana/kibana4 /etc/init.d/

Then you should give it *execution permissions* and add to update rc.d configuration (Debian Linux) ::

 $ sudo chmod +x /etc/init.d/kibana4
 $ sudo update-rc.d kibana4 defaults 96 9

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

So, proceed to copy *index.js* to Kibana folder ::

 $ sudo cp ~/ossec_tmp/ossec-wazuh/extensions/kibana/index.js /opt/kibana/src/public

Now you can import the custom dashboards, access to Kibana WEB on your browser and navigate to Objects:

- Click at top bar on Settings
- Click on Objects
- Then click the button **Import** and select the file ~/ossec_tmp/ossec-wazuh/extensions/kibana/kibana-ossecwazuh-dashboards.json

That's all! Refresh Kibana page and load the recently and fresh **imported Dashboards**.

.. note:: Some Dashboard visualizations required time and some special alerts to works, please be patient and don't worry if some visualizations not works properly in few days since first import.


Conclusions
-------------------------



Troubleshooting
-------------------------


Appendix
-------------------------

Some extra guides to help you out with some configurations or installations relationed with OSSEC/ELK Stack.

A. Install Java 8
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

B. Securing Kibana
^^^^^^^^^^^^^^^^^^^
SSL, Nginx, Reverse proxy, Certificates.


.. toctree::
   :maxdepth: 2



