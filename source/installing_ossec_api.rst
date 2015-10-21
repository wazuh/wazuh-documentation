OSSEC RESTful API 
=============================================================

Introduction
--------------------

OSSEC RESTful API is a service to control OSSEC Manager using REST requests. Through RESTful petitions we will able to interact with OSSEC controls like agents control, rootcheck and syscheck controls or rules control.

Nowdays it is basic to have an API which allows the software an easy communication with other software, we build this API aiming to turns OSSEC into a modern and technologic HIDS solution able to receive and send JSON petitions.

Goal
--------------------

The goal is pretty simple, stop using the command line to manage OSSEC. What if you could manage OSSEC just with some URL's in your browser? What if OSSEC could have different privilegies levels depending of what command is executed? What if you could deploy thousand of OSSEC agents just calling a POST request?

We are currently working on it and with the open source community we will create a magnific OSSEC API.


Dependencies
--------------------

OSSEC API is currently working under a NodeJS server (v0.10.x) with Express module (4.0.x) and the following dependencies:

- Body parser
- FS
- HTTP
- HTTPS
- HTTP-AUTH


OSSEC tweaks
--------------------

We have changed some internal OSSEC functionalities, we want to adapt OSSEC binaries to output JSON output so there are few new features and scripts.
For example in some binaries we could use "-j" argument to display the results in JSON format (./agent_control -l -j).

Moreover, we add two new folders on */var/ossec/* default folder, **dev** and **api**

Capabilities
--------------------

Summary of current API capabilities.

- Agents list
- Agent info and status
- Agent restart
- Agent add
- Agent extract key
- Agents syscheck/rootcheck restart
- Agent syscheck restart
- Agent rootcheck restart


Security
--------------------

The API will operate on port 55000 TCP, NodeJS will be protected with HTTP Authentication and encrypted by HTTPS SSL Certificate.


Installing
--------------------

API Folders
^^^^^^^^^^^^^^^^^^^

To get the API working we need OSSEC HIDS forked by Wazuh, download and install it, you can follow the installation guide at `OSSEC Wazuh installation  <http://documentation.wazuh.com/en/latest/installing_ossec_wazuh.html/>`_

Just in case you forgot it, mount dev folder to OSSEC location :: 

 $ sudo mkdir /var/ossec/dev/
 $ sudo mount -o bind /dev /var/ossec/dev/

And copy the API folder to OSSEC folder ::

 $ sudo cp -rf ~/ossec_tmp/ossec-wazuh/extensions/api  /var/ossec/

Install NodeJS
^^^^^^^^^^^^^^^^^^^

Choose **yum** por CentOS distributions or **apt** for Debian Linux/Ubuntu distributions.

**YUM**

Install *epel-release* and install *nodejs* package :: 
 
 $ sudo yum install epel-release
 $ sudo yum install nodejs


**APT**

Update repositories and install *nodejs* package :: 

 $ sudo apt-get update
 $ sudo apt-get install nodejs


.. note:: Remember to open 55000 port TCP in your firewall.


Generating certificates
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

At *api* folder you can found some certificates we already created for you, if you don't want to generate new certificates it is not neccesary to do it, you can move forward to next section of this guide.

In the other way, maybe you are interested on generate your own certificates with your company or personal data, you can do it as follows.

Install OpenSSL :: 

 $ sudo apt-get install openssl

Create a Server Certificate :: 

 $ cd /var/ossec/api	
 $ sudo openssl genrsa -des3 -out server.key 1024
 $ sudo req -new -key server.key -out server.csr

The password must be inserted everytime you run the server, if you don't want to enter the password everytime, remove it ::

 $ sudo cp server.key server.key.org
 $ sudo openssl rsa -in server.key.org -out server.key

Generate your self-signed certificate ::

 $ sudo openssl x509 -req -days 365 -in server.csr -signkey server.key -out server.crt

Remove temp files ::

 $ sudo rm server.csr
 $ sudo rm server.key.org

Adding password
^^^^^^^^^^^^^^^^^^^^^^

By default you can enter the API by entering user *foo* and password *bar*, but you can of course generate your own password like this ::

 $ cd /var/ossec/api
 $ sudo htpasswd -c htpasswd username

Running API in background
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Time to start the API, we are going to start it on background and redirect the standard output to a log file called *api.log* ::

 $ /bin/node /var/ossec/api/server.js &>/var/ossec/api/api.log &

.. note:: Sometimes NodeJS binary is called "nodejs" or it is located on /user/bin/, if the API does not start, check it please.


Sample outputs
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
That's all! Now you can access the API via browser o via *curl* commands at terminal. 

For example go to your browser and navitage to your server ip, not forget to enter the username and password created previously ::

 https://server.ip:55000

Or in the command line try some requests ::
 
 $ curl -XGET  -u username -k https://your.ip:55000/agents
 $ curl -XGET  -u username -k https://your.ip:55000/agents/000

Some sample outputs.

Agents list ::

 [
  {
    "ID": "000",
    "Name": "vpc-ossec-manager (server)",
    "IP": "127.0.0.1",
    "Status": "Active/Local"
  },
  {
    "ID": "001",
    "Name": "vpc-agent-debian",
    "IP": "10.0.0.121",
    "Status": "Active"
  },
  {
    "ID": "005",
    "Name": "vpc-agent-centos-public",
    "IP": "10.0.0.125",
    "Status": "Active"
  },
  {
    "ID": "004",
    "Name": "vpc-agent-windows",
    "IP": "10.0.0.124",
    "Status": "Active"
  },
  {
    "ID": "006",
    "Name": "vpc-agent-ubuntu-public",
    "IP": "10.0.0.126",
    "Status": "Active"
  }
 ]

Agent info ::

 {
  "response": {
    "id": "001",
    "name": "vpc-agent-debian",
    "ip": "10.0.0.121",
    "status": "Active",
    "operating_system": "Linux vpc-agent-debian 3.2.0-4-amd64 #1 SMP Debian 3.2.68-1+deb7u2 x86_64",
    "client_version": "OSSEC HIDS v2.8 / 4fb9c2ba06bbb72185e8ba7c19b9ea29",
    "last_keepalive": "Wed Oct 21 16:29:47 2015",
    "syscheck_last_started": "Unknown",
    "syscheck_last_ended": "Unknown",
    "rootcheck_last_started": "Wed Oct 21 16:31:02 2015",
    "rootcheck_last_ended": "Wed Oct 21 16:16:02 2015"
  },
  "error": 0
 }

Agent restarted ::

 {
  "response": {
    "id": "001",
    "name": "vpc-agent-debian",
    "ip": "10.0.0.121",
    "message": "Restarting agent"
  },
  "error": 0,
  "description": ""
 }

Agent syscheck/rootcheck restared ::

 {
  "response": {
    "id": "001",
    "name": "vpc-agent-debian",
    "ip": "10.0.0.121",
    "message": "Restarting agent"
  },
  "error": 0,
  "description": ""
 }



What next?
-----------

Once you have OSSEC Wazuh installed you can move forward and try out ELK integration, check it on:

* `ELK Integration Guide <http://documentation.wazuh.com/en/latest/integrating_ossec_elk.html>`_
