Integrating OSSEC-ELK Stack
=============================================================

Introduction
--------------------
Welcome to OSSEC-ELK Stack integration guide by Wazuh, throught some simple steps you will set up an entire ELK Stack architecture to monitor, collect, process, index and display your OSSEC Alerts.

The full guide is based on OSSEC Wazuh version, we contribute with OSSEC community by developing extended funcionality.

These are some features we are talking about:

* **OSSEC-Wazuh Ruleset**
   Weekly OSSEC Ruleset updates
* **OSSEC PCI DSS 3.0 & CIS Requirements**
   Detailed groups and Benchmarks (ex: 1.4 Debian Linux Benchmark, 11.4 PCI...)
* **OSSEC JSON Custom Output**
   Groups array, timestamps, Agents name, locations, file integrity..
* **Logstash input/filter/output plugins**
   GeoIP, names format, elasticsearch template, elasticsearch ossec cluster.
* **Elasticsearch**
   Custom index mapping template to fit OSSEC alert fields. 
* **Kibana 4**
   OSSEC Alerts, PCI Complianace, CIS Compliance, Agents management, Agents Info Dashboards.
   Hiding non useful fields, display short summary of PCI Requirements on mouseover on PCI Alerts.

If you have any questions or issues while reading this guide don't hesitate to contact us at: info@wazuh.com


.. note:: This functionalty requires OSSEC-Wazuh version and OSSEC-Wazuh Ruleset, keep reading this guide to install it.


Architecture explanation
-------------------------
The whole architecture is based on log analysis, collect, index and display alerts. To acomplish this we are going to use the following tools:

**OSSEC-HIDS**

`OSSEC Official Website <http://www.ossec.net/>`_

OSSEC is an Open Source Host-based Intrusion Detection System that performs log analysis, file integrity checking, policy monitoring, rootkit detection, real-time alerting and active response.

**Logstash**

`Logstash Official Website <https://www.elastic.co/products/logstash/>`_

Logstash is a data pipeline that helps you process logs and other event data from a variety of systems. Logstash will read and process send our OSSEC JSON Files to Elasticsearch Cluster.

**Logstash-Forwarder**

`Logstash-Forwarder Official Website <https://www.elastic.co/products/logstash/>`_

Logstash-Forwarder is a shipment tool to ship logs from our Servers to our Logstash Server, in our case we will send logs from OSSEC Manager host to ELK Stack host.

**Elasticsearch**

`Elasticsearch Official Website <https://www.elastic.co/products/elasticsearch/>`_

Search & Analyze Data in Real Time. Distributed, scalable, and highly available. Real-time search and analytics capabilities. Elasticsearch will index and sotre all our OSSEC alerts, this way we will be able to search and explore thousands of alerts in few clicks.

**Kibana**

`Kibana Official Website <https://www.elastic.co/products/kibana/>`_

Kibana is a friendly WEB interface to explore all elasticsearch indexes, Kibana support custom dashboard creations, in our case Security Compliance dashboards and OSSEC high risk security alerts.

**Scaling to large deployments**

To multi-node and high availability architectures we will use some extra tools like Logstash-Forwarder or Redis Server.


Installing
-------------------------
Requirements
^^^^^^^^^^^^^^^^^^^
* SSH access to at least one server and sudo privilegies.
* Java 8 `(Example Ubuntu install guide) <http://tecadmin.net/install-oracle-java-8-jdk-8-ubuntu-via-ppa/>`_

Considerations
^^^^^^^^^^^^^^^^^^^
**Single/multiple host configurations**

The entire guide is orientated to single-node configuration but you still can build this architecture up on differentes servers, it is recommended to split ELK Server from OSSEC Manager server, for example, four differentes hosts: 

* Host 1: OSSEC Manager+Logstash Forwarder
* Host 2: Logstash server + Elasticsearch + Kibana
* Host 3: Node 2
* Host 3: Node 3

We will give you differents configuration files depends on the architecture you choose.

Remember

* Single-host: All the tools on same machine
* Multi-host: Tools split-up on differents machines.

1. OSSEC
^^^^^^^^^^^^^^^^^^^
First of all, download the whole OSSEC-Wazuh repository from Github which includes OSSEC HIDS latest version (2.8.2 base), Wazuh enhace capabilites and ELK Stack configuration files.

1.1 Installation
""""""""""""""""""

Create a folder on your prefered home directory and download the repository like this:

Go home folder, create tmp folder, clone the repository ::

   $ cd ~
   $ mkdir ossec_tmp && cd ossec_tmp
   $ git clone https://github.com/wazuh/ossec-wazuh.git
   $ cd ossec-wazuh

Now we have the OSSEC source code on our machine, let's compile it. We need development and packages tools like g++, gcc etc... if it is needed, install them.

Finally compile and install OSSEC Manager by entering ::

   $ sudo ./install

Follow the installation steps OSSEC prompts at console, they are identical to OSSEC official version, you can read a detailed explanation here: 

`Manager installation  <http://documentation.wazuh.com/en/latest/source.html#manager-installation/>`_

Remember we ARE NOT installing official OSSEC relealse, you need to compile and install Wazuh version.

You can let all prompt steps by **default** by pressing ENTER at every question OSSEC installation ask you, by now, we don't need a specific OSSEC config installation.


1.2 Configuration
""""""""""""""""""
We need just one tweak at OSSEC configuration files, enable JSON output. 

Open OSSEC conf file ::

   $ sudo vi /var/ossec/etc/ossec.conf

Add inside **<global></global>** tags the json output setting ::

   <jsonout_output>yes</jsonout_output>

That's all! Now restart your OSSEC Manager ::

   $ sudo /var/ossec/bin/ossec-control start

Check if alerts.json file exits and is working ::

   $ sudo cat /var/ossec/logs/alerts/alerts.json


1.3 Agents
""""""""""""""""""
This section is covered `here <http://documentation.wazuh.com/en/latest/source.html#agent-installation>`_

2. Logstash
^^^^^^^^^^^^^^^^^^^
.. note:: At this poing you will need Java 8 installed on your system, please proceed to install it before install any of next tools. `Install Java 8 <http://tecadmin.net/install-oracle-java-8-jdk-8-ubuntu-via-ppa/>`_

We proceed to install Logstash Server, in this case we are installing it on the **same** machine we previously installed OSSEC Manager, that's why some configuration settings will refer local OSSEC files.

2.1 Installation
""""""""""""""""""
**Logstash 1.5 version**

We recommend to install Logstash from official repositories, inside next link you will find YUM and DEB packages.

`Elastic.co: Install Logstash from repositories <https://www.elastic.co/guide/en/logstash/current/package-repositories.html>`_

For instance, to install DEB packages for example to an Ubuntu SO:

Download and install the Public Signing Key: ::

   $ wget -qO - https://packages.elasticsearch.org/GPG-KEY-elasticsearch | sudo apt-key add -

Add the repository definition to your /etc/apt/sources.list file: ::

   $ echo "deb http://packages.elasticsearch.org/logstash/1.5/debian stable main" | sudo tee -a /etc/apt/sources.list

Run sudo apt-get update and the repository is ready for use. You can install it with: ::

   $ sudo apt-get update && sudo apt-get install logstash
   

2.1 Configuration
""""""""""""""""""

**Configuration files**

Once Logstash be installed copy Wazuh **SINGLE-HOST** Logstash file to Logstash configuration files ::

  $ sudo cp ~/ossec_tmp/ossec-wazuh/extensions/logstash/01-ossec-singlehost.conf /etc/logstash/conf.d/

Or copy Wazuh Logstash **MULTI-HOST** file to Logstash configuration files ::

  $ sudo cp ~/ossec_tmp/ossec-wazuh/extensions/logstash/01-ossec.conf  /etc/logstash/conf.d/

In this case don't forget to edit 01-ossec.conf file to replace your Elasicsearch destination IP ::

  elasticsearch {
           host => "your_elasticsearch_server_ip"


**GeoIP DB** 

Download GeoLiteCity from Maxmind website, unzip and move to Logstash folder ::

  $ sudo curl -O "http://geolite.maxmind.com/download/geoip/database/GeoLiteCity.dat.gz"
  $ sudo sudo gzip -d GeoLiteCity.dat.gz && sudo mv GeoLiteCity.dat /etc/logstash/

**Logstash user** 

In case you are installing single-host architecture, Logstash will need to read from OSSEC alerts file, we need to grants permission to do that.

Open users groups file ::

  $ sudo vi /etc/group

Search for "ossec" and add logstash at the end of that line, just like this ::

  ubuntu:x:1000:
  ossec:x:1001:logstash
  scanner:x:111:

**Restart Logstash** 
  
Finally restart Logstash service to apply last changes ::

 $ sudo service logstash restart

3. Logstash-Forwarder
^^^^^^^^^^^^^^^^^^^^^

.. warning:: Logstash-Forwarder configuration it is only neccesary to **multi-host** architecture, if you are installing all tools on one machine, you don't need to install Logstash-Forwarder, please refer directly to section `5. Elasticsearch <#id4>`_


3.1 Generate SSL Certificates on Logstash-Server
""""""""""""""""""""""""""""""""""""""""""""""""
Since we are going to use Logstash Forwarder to ship logs from our Servers to our Logstash Server, we need to create an SSL certificate and key pair. The certificate is used by the Logstash Forwarder to verify the identity of Logstash Server.

On your **Logstash Server** (we just installed it!) generate the SSL Certificates like this:

Search and copy your OpenSSL configuration file, in this case we can find it on /etc/ssl/openssl.cnf ::

 $ sudo cd /etc/pki/tls/
 $ sudo cp /etc/ssl/openssl.cnf .

Edit openssl.cnf file ::

 $ sudo vi /etc/pki/tls/openssl.cnf

Find the [ v3_ca ] section in the file, and add this line under it (substituting in the Logstash Server's private IP address) ::

 $ subjectAltName = IP: logstash_server_private_ip

Save and exit.

Now generate the SSL certificate and private key in the appropriate locations (/etc/pki/tls/), with the following commands ::

 $ cd /etc/pki/tls
 $ sudo openssl req -config /etc/pki/tls/openssl.cnf -x509 -days 3650 -batch -nodes -newkey rsa:2048 -keyout private/logstash-forwarder.key -out certs/logstash-forwarder.crt

Finally we have our Logstash certificate and key saved on /etc/pki/tls/certs and /etc/pki/tls/private respectively, we will use them soon.

3.2 Copy SSL Certificate
""""""""""""""""""""""""""""""""""""""""""""""""""""""

On **Logstash Server**, copy the SSL certificate to Client Server(Logstash-Forwarder) (substitute the client server's IP address, and your own login)::

 scp /etc/pki/tls/certs/logstash-forwarder.crt user@server_private_IP:/tmp


3.2 Installing
""""""""""""""""""""""""""""""""""""""""""""""""""""""

You can visit Elasticsearch official website and download DEB or RPM packages directly from there. 

`Logstash Forwarder DEB & RPM packages <https://www.elastic.co/downloads/logstash>`_

In this case we are adding DEB repositories and installing by apt-get, proceed to add Logstash-Forwarder repositories, update and install::

 $ wget -qO - https://packages.elasticsearch.org/GPG-KEY-elasticsearch | sudo apt-key add -
 $ sudo echo "deb http://packages.elasticsearch.org/logstashforwarder/debian stable main" | sudo tee -a /etc/apt/sources.list
 $ sudo apt-get update && sudo apt-get install logstash-forwarder

Now copy the Logstash server's SSL certificate into the appropriate location (/etc/pki/tls/certs)::

 $ sudo cp /tmp/logstash-forwarder.crt /etc/pki/tls/certs/


3.2 Configuring
""""""""""""""""""""""""""""""""""""""""""""""""""""""

Open Logstash Forwarder configuration file, we need to modify some settings to add our certificate recently generated and the Logstash Server IP::

 $ sudo vi /etc/logstash-forwarder.conf

Under the network section, add the following lines into the file, substituting in your Logstash Server IP address for localhost:5043 and uncomment the line ::

 # A list of downstream servers listening for our messages.
 # logstash-forwarder will pick one at random and only switch if
 # the selected one appears to be dead or unresponsive
 "servers": [ "your_logstash_server_ip:5000" ],

Above thoose lines you will fined the CA configuration, edit with our CA path and uncomment the line ::

 # The path to your trusted ssl CA file. This is used
 # to authenticate your downstream server.
 "ssl ca": "/etc/pki/tls/certs/logstash-forwarder.crt",

Uncomment timeout option line for performance reasons ::

 # logstash-forwarder will assume the connection or server is bad and
 # will connect to a server chosen at random from the servers list.
 "timeout": 15

Finally set LogstashForwarder to fetch **OSSEC ALERTS FILE**, modify following lines like this ::

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

We recommend to install Elasticsearch from official repositories, inside next link you will find YUM and DEB packages.

`Elastic.co: Install Elasticsearch from repositories <https://www.elastic.co/guide/en/elasticsearch/reference/1.7/setup-repositories.html>`_

The followings steps are oriented to build a single-node Elasticsearch cluster but remember, Elasticsearch works better with a minium of three nodes splits in differents machines, this way Elastic can balance loads and split shards and replicas.
Big inconvenient with single-node configuration is no replicas will be created this means in case of takeover or failure of one or more shards there will not be replicas to patch this broken shards. Why we can't have replicas on the same machine? The essence of replicas is to split them between nodes, if we only have one node then we can't have replicas, this is why we will set replicas number to 0, otherwise the Cluster will never has GREEN health status.

Another consideration is be aware of the amount RAM usage that Elasticsearch supposes. Frecuently Elasticsearch is meant to have 50% of total machine RAM but in single-node configuration we will consider the RAM usage of Logstash, OSSEC, Kibana etc... thats why we not recommend in a single-node configuration set Elasticsearch RAM to the half of total RAM.




4.2 Installing
""""""""""""""""""""""""""""""""""""""""""""""""""""""

Install DEB packages for example to an Ubuntu SO:

Download and install the Public Signing Key: ::

   $ wget -qO - https://packages.elastic.co/GPG-KEY-elasticsearch | sudo apt-key add -

Add the repository definition to your /etc/apt/sources.list file ::

   $ echo "deb http://packages.elastic.co/elasticsearch/1.7/debian stable main" | sudo tee -a /etc/apt/sources.list.d/elasticsearch-1.7.list

Run sudo apt-get update and the repository is ready for use. You can install it with ::

   $ sudo apt-get update && sudo apt-get install elasticsearch

Install as service::

  $ sudo update-rc.d elasticsearch defaults 95 10


4.3 Basic configuration
""""""""""""""""""""""""""""""""""""""""""""""""""""""

We are not going to explain all the Elasticsearch configuration options, you can find them at officcial docs. We explain basic configuration and some tweaks to improve performance.

Open Elasticsearch configuration file::

 $ sudo vi /etc/elasticsearch/elasticsearch.yml

Set up Cluster Name and Node Name, remember that these settings ** HAS TO **  match with Logstash configuration file :: 
 cluster.name: ossec
 node.name: ossec_node1

Set up network configuration options

Elasticsearch IP Address server, in single-node case should be localhost, 127.0.0.1 or 0.0.0.0 ::

 network.bind_host: 127.0.0.1

Elasticsearch publish IP Address, how the network will discover our Elasticsearch server ::

 network.publish_host: 127.0.0.1

publish_host and bind_host variables, this variable set both of them at same time same value ::

 network.host: 127.0.0.1

Elasticsearch uses by default port 9200 for the API queries and ports 9300 to 9400 to network nodes discovering.

HTTP Elasticsearch API PORT, default 9200::

 http.port: 9200

Improve network load and prevent non-desired nodes to join our clusters :: 

 discovery.zen.ping.multicast.enabled: false
 discovery.zen.ping.timeout: 15s

Single-node shards/replicas configuration ::

  index.number_of_shards: 1
  index.number_of_replicas: 0

Multinode shards/replicas configuration ::

  index.number_of_shards: 4 
  index.number_of_replicas: 1

Multinode: We set before multicast ping to false so we need to manually specify the nodes connections ::

  discovery.zen.ping.unicast.hosts: ["host1", "host2:port"] 
 

**Save and exit elasticsearch.yml file** 

Start Elasticsearch ::

  $ sudo /etc/init.d/elasticsearch start


4.4 Extra performance configuration
""""""""""""""""""""""""""""""""""""""""""""""""""""""

Some tweats to optimize Elasticsearch general performance throught RAM configurations.

Basically we will try to lock Elasticsearch RAM minium and maximum amount, this way we can avoid the swapping, Elasticsearch **feels** so bad about swapping, everytime Elasticsearch needs to swap query and fecth queries multiply per ten their load time.

Open Elasticsearch configuration file ::

 $ sudo vi /etc/elasticsearch/elasticsearch.yml

Modify mklockall setting ::  

  bootstrap.mlockall: true

**Save and exit elasticsearch.yml file** 


Open and edit limits.conf file ::

 $ sudo vi /etc/security/limits.conf

Add this line at end of file:: 
      
  elasticsearch   -       memlock         unlimited

 **Save and exit limits.conf file** 
 
Open and edit Elasticsearch init file ::

 $ sudo vi /etc/default/elasticsearch

Find ES_HEAP_SIZE and set it to 50% of your total RAM, remember, if you are running single-node architecture, set it to 40% ::

 ES_HEAP_SIZE=1g

Find MAX_LOCKED_MEMORY and set it to unlimited ::

 MAX_LOCKED_MEMORY=unlimited

 **Save and exit /etc/default/elasticsearch file** 

Restart Elasticsearch ::

  $ sudo /etc/init.d/elasticsearch start

4.5 Cluster health
""""""""""""""""""""""""""""""""""""""""""""""""""""""

We will run some tests to see if Elasticsearch is working properly.

Elasticsearch is running ::

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

Elasticsearch Cluster is in a good health ::

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
  

4.6 Wazuh custom templates
""""""""""""""""""""""""""""""""""""""""""""""""""""""

 curl -XPUT "http://localhost:9200/_template/ossec/" -d "@/home/snaow/ossec-wazuh/extensions/elasticsearch/elastic-ossec-template.json"
      Should return: {"acknowledged":true}

5. Kibana
^^^^^^^^^^^^^^^^^^^

**Kibana 4.1.2 version**

`Kibana official website <https://www.elastic.co/downloads/kibana>`_

Time to display all the results on one....

5.1 Installing
""""""""""""""""""""""

$ cd ~
$ mkdir ossec_tmp && cd ossec_tmp
$ wget https://download.elastic.co/kibana/kibana/kibana-4.1.2-linux-x64.tar.gz 
untarit tar xvf kibana-*.tar.gz
- sudo mkdir -p /opt/kibana
- sudo cp -R kibana-4*/* /opt/kibana/
- Installing as a service:
-  cp /home/snaow/ossec-wazuh/extensions/kibana/kibana4 /etc/init.d/


5.2 Settings
""""""""""""""""""""""

- vi /opt/kibana/config/kibana.yml
- # The host to bind the server to.
host: "127.0.0.1" // 
- # The Elasticsearch instance to use for all your queries.
elasticsearch_url: "http://127.0.0.1:9200" // URL of elasticsearch hosts, we need to set here the same IP we previously set on elasticsearch bind_host config



5.3 Configuring
""""""""""""""""""""""

- Accesos to kibana url in the browser, http://localhost:5601 or http://yourlocalip:5601, and set up a new index pattern:
Kibana will ask you to "Configure an index pattern", then do the following: 
Check "Use event times to create index names"
Index pattern interval: Daily
Index name or pattern: [ossec-]YYYY.MM.DD
** NOTE!: Kibana will find elasticsearch index with pattern "ossec-yyyy.mm.dd" you need to generate alerts from ossec BEFORE try to set up an index pattern on kibana, otherwise Kibana won't find any index on elasticsearch. For example you can try a sudo -s and miss the password on pourpuse several times.

5.4 Wazuh extensions
""""""""""""""""""""""

cp /home/snaow/ossec-wazuh/extensions/kibana/index.js /opt/kibana/src/public

Run kibana service: sudo service kibana4 start
To tst: Accesos to kibana url in the browser, http://localhost:5601 or http://yourlocalip:5601, and set up a new index pattern:

  - Install wazuh custom dashboards, visualization and searches for OSSEC and PCI/CIS Compliance
    Go to Kibana, press at top bar on Settings, then Objects, then press the button Import and select wazuh-ossec custom pci/cis compliance dashboards, the file is in /tmpfolder/ossec-wazuh/extensions/kibana/kibana-ossecwazuh-dashboards.json


Overall
-------------------------


Troubleshooting
-------------------------
.. toctree::
   :maxdepth: 2



