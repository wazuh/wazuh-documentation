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
`Manager installation <http://documentation.wazuh.com/en/latest/source.html#manager-installation/> `_ .

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

   sudo /var/ossec/bin/ossec-control start

Check if alerts.json file exits and is working ::

   sudo cat /var/ossec/logs/alerts/alerts.json


1.3 Agents
""""""""""""""""""
This section is covered `here <http://documentation.wazuh.com/en/latest/source.html#agent-installation>`_

2. Logstash
^^^^^^^^^^^^^^^^^^^
.. note:: At this poing you will need Java 8 installed on your system, please proceed to install it before install any of next tools.

We proceed to install Logstash Server, in this case we are installing it on the **same** machine we previously installed OSSEC Manager, that's why some configuration settings will refer local OSSEC files.

2.1 Installation
""""""""""""""""""
**Logstash 1.5 version**

We recommend to install Logstash from official repositories, inside next link you will find YUM and DEB packages.

`Elastic.co: Install Logstash from repositories <https://www.elastic.co/guide/en/logstash/current/package-repositories.html>`_

For instance, to install DEB packages for example to an Ubuntu SO:

Download and install the Public Signing Key: ::

   wget -qO - https://packages.elasticsearch.org/GPG-KEY-elasticsearch | sudo apt-key add -

Add the repository definition to your /etc/apt/sources.list file: ::

   echo "deb http://packages.elasticsearch.org/logstash/1.5/debian stable main" | sudo tee -a /etc/apt/sources.list

Run sudo apt-get update and the repository is ready for use. You can install it with: ::

   sudo apt-get update && sudo apt-get install logstash
   

2.1 Configuration
""""""""""""""""""

**Configuration files**

Once Logstash be installed copy Wazuh **SINGLE-HOST** Logstash file to Logstash configuration files: ::

  sudo cp ~/ossec_tmp/ossec-wazuh/extensions/logstash/01-ossec-singlehost.conf /etc/logstash/conf.d/

Or copy Wazuh Logstash **MULTI-HOST** file to Logstash configuration files ::

  sudo cp ~/ossec_tmp/ossec-wazuh/extensions/logstash/01-ossec.conf  /etc/logstash/conf.d/

**GeoIP DB** 

Download GeoLiteCity from Maxmind website, unzip and move to Logstash folder ::

  sudo curl -O "http://geolite.maxmind.com/download/geoip/database/GeoLiteCity.dat.gz"
  sudo sudo gzip -d GeoLiteCity.dat.gz && sudo mv GeoLiteCity.dat /etc/logstash/

**Logstash user** 

In 


2.2 Logstash-Forwarder
""""""""""""""""""
Collect and transport data.


3. Elasticsearch
^^^^^^^^^^^^^^^^^^^

4. Kibana
^^^^^^^^^^^^^^^^^^^

Troubleshooting
-------------------------
.. toctree::
   :maxdepth: 2



