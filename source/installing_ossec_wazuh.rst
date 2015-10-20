Installing OSSEC Wazuh
=============================================================

Introduction
--------------------

This document will guide you through the installation and configuration of OSSEC HIDS forked by Wazuh.

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


Installation
--------------------

.. note:: Remember we **ARE NOT** installing official OSSEC release, you need to compile and install Wazuh version.


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


Configuration
--------------------
We need just one tweak at OSSEC configuration files, enable JSON output. 

Open OSSEC conf file ::

   $ sudo vi /var/ossec/etc/ossec.conf

Add inside **<global></global>** tags the JSON output setting ::

   <jsonout_output>yes</jsonout_output>

That's all! Now start your OSSEC Manager ::

   $ sudo /var/ossec/bin/ossec-control start

How to know if everything was okay? Check if *alerts.json* file exits and contains alerts ::

   $ sudo cat /var/ossec/logs/alerts/alerts.json


If you are thinking about using OSSEC RESTful API, mount dev folder on OSSEC directory like this ::

 $ sudo mkdir /var/ossec/dev/
 $ sudo mount -o bind /dev /var/ossec/dev/ 


Agents
-----------

Agent deployment is fully explained in agent install documentation, check out there how to install, deploy and connect OSSEC Agents: `OSSEC Agents <http://documentation.wazuh.com/en/latest/source.html#agent-installation>`_

What next?
-----------

Once you have OSSEC Wazuh installed you can move forward and try out ELK integration or the API RESTful, check them on:

* `ELK Integration Guide <http://documentation.wazuh.com/en/latest/integrating_ossec_elk.html>`_
* `API RESTful Installation Guide <http://documentation.wazuh.com/en/latest/installing_ossec_api.html>`_


.. toctree:: 
   :maxdepth: 2