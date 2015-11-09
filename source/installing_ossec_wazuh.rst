Installing OSSEC Wazuh
=============================================================

Other
-----

.. topic:: OSSEC HIDS - Wazuh

   Welcome to OSSEC Wazuh installation guide.

   Here you will find how to deploy an entire architecture from OSSEC repositories to Kibana Dashboards.

   We are currently working on improve OSSEC capabilites, helping out the community to understand and configure an entire OSSEC ELK Stack integration. We've made some changes to OSSEC source code this way it can provide PCI DSS 3.1 or CIS requirements.

   OSSEC Wazuh v1.0 features

   * Improved JSON capabilities
   * Improved security compliance integration
   * Improved API RESTful integration
   * Archives JSON output
   * Archives logall/json configurable
   * Updated ruleset
   * Binaries JSON output

   OSSEC Wazuh API RESTful features

   * Agent full list
   * Restart agent
   * Agent status, rootcheck and syscheck info.
   * Add agent
   * Get agent key
   * SSL Certificates
   * HTTPS Secure
   * Authentication capabilites

 
   If you have any questions don't hesitate to contact us at contact@wazuh.com.
   Remember, we are still building this guide, if you find any errors we appreciate your feedback.


Introduction
--------------------
This document will guide you through the installation and configuration of ELK Stack and Wazuh OSSEC HIDS for their integration.

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

.. note:: Remember we are installing OSSEC HIDS forked by Wazuh.

We need development and packages tools like g++ or gcc to compile OSSEC, please if it is needed, install them ::

 For CentOS: $ sudo yum groupinstall 'Development Tools'
 For Debian Linux: $ sudo apt-get install build-essential


We are cloning a Github repository, please if it is needed install *Git* package ::

 For CentOS: $ sudo yum install git
 For Debian Linux: $ sudo apt-get install git


Next step, create a folder on your preferred home directory and download the repository.

Go home folder, create temporal folder, clone the repository ::

   $ cd ~
   $ mkdir ossec_tmp && cd ossec_tmp
   $ git clone https://github.com/wazuh/ossec-hids.git
   $ cd ossec-hids

Finally compile and install **OSSEC Manager** ::

   $ sudo ./install.sh

Follow the installation steps OSSEC prompts, choose *server* installation and configure OSSEC as you like.

You can let all prompt steps by **default** by pressing ENTER at every question OSSEC installation ask you, by now, we don't need a specific OSSEC config installation.


Configuration
--------------------

Change OSSEC configuration files, enable JSON output. 

Open OSSEC conf file ::

   $ sudo vi /var/ossec/etc/ossec.conf

Add inside **<global></global>** tags the JSON output setting ::

   <jsonout_output>yes</jsonout_output>

That's all! Now start your OSSEC Manager ::

   $ sudo /var/ossec/bin/ossec-control start

How to know if everything was okay? Check if *alerts.json* file exits and contains alerts ::

   $ sudo cat /var/ossec/logs/alerts/alerts.json


If you are thinking about using OSSEC RESTful API, mount *dev* folder on OSSEC directory like this ::

 $ sudo mkdir /var/ossec/dev/
 $ sudo mount -o bind /dev /var/ossec/dev/ 


Agents
-----------

Agent deployment is fully explained in agent install documentation, check out there how to install, deploy and connect OSSEC Agents: `OSSEC Agents <http://documentation.wazuh.com/en/latest/source.html#agent-installation>`_

What next?
-----------

Once you have OSSEC Wazuh installed you can move forward and try out ELK integration, the API RESTful or the custom security compliance Ruleset, check them on:

* `ELK Integration Guide <http://documentation.wazuh.com/en/latest/integrating_ossec_elk.html>`_
* `API RESTful Installation Guide <http://documentation.wazuh.com/en/latest/installing_ossec_api.html>`_
* `Ruleset <http://documentation.wazuh.com/en/latest/ossec_rule_set.html>`_


.. toctree:: 
   :maxdepth: 2
