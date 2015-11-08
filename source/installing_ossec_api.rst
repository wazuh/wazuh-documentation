.. _ossec_api:

OSSEC RESTful API 
=============================================================

Introduction
--------------------

OSSEC RESTful API is a service to control OSSEC Manager using REST requests. RESTful petitions will allow you to execute OSSEC commands like agents management (add, restart, info, key export) or rootcheck and syscheck information (restart, check last scan...)

OSSEC Wazuh API RESTful Capatibilites

* Agent full list
* Agent status, rootcheck and syscheck info.
* Restart agent
* Add agent
* Get agent key
* SSL Certificates
* HTTPS Secure
* Authentication capabilites

Check the `Sample outputs`_ at the end of this documentation and take a look for JSON output examples.

Goal
--------------------

The goal is pretty simple, stop using the command line to manage OSSEC. What if you could manage OSSEC just with some URL's in your browser? What if OSSEC could have different privilegies levels depending of what command is executed? What if you could deploy thousand of OSSEC agents just calling a POST request?

We are currently working on it and with the open source community we will create a magnific OSSEC API.


Requirements
--------------------

OSSEC API is currently working under a NodeJS server (v0.10.x) with Express module (4.0.x) and the following dependencies:

- Body parser
- FS
- HTTPS
- HTTP-AUTH
- Moment

Moreover, you need OSSEC HIDS forked by Wazuh, download and install it, you can follow the installation guide at `OSSEC Wazuh installation  <http://documentation.wazuh.com/en/latest/installing_ossec_wazuh.html>`_

Finally to access the API externally you will need to open the port 55000 TCP


Requests
--------------------

There are some current API capabilities, we are currently working on extend them and improve the API versatility.

List :: 

 /agents

Info and status :: 

 /agents/:agent_id

Restart :: 

 /agents/:agent_id/restart

Add :: 

 /agents/add/:agent_name

Extract key :: 

 /agents/:agent_id/key

Syscheck/rootcheck on all agents :: 

 /agents/sysrootcheck/restart

Syscheck/rootcheck restart on one agent :: 

 /agents/:agent_id/sysrootcheck/restart



Security
--------------------

The API will operate on port 55000 TCP, NodeJS will be protected with HTTP Authentication and encrypted by HTTPS SSL Certificate.


Installing
--------------------

Install API
^^^^^^^^^^^^^^^^^^^

.. warning:: To get the API working we need OSSEC HIDS forked by Wazuh, download and install it, you can follow the installation guide at `OSSEC Wazuh installation  <http://documentation.wazuh.com/en/latest/installing_ossec_wazuh.html>`_

Now we can continue installing OSSEC API, you will find the folders we need at Wazuh repository at *ossec-hids/extensions/api*.

Just in case you forgot it, mount dev folder to OSSEC location :: 

 $ sudo mkdir /var/ossec/dev/
 $ sudo mount -o bind /dev /var/ossec/dev/

And copy the API folder to OSSEC folder ::

 $ sudo cp -rf ~/ossec_tmp/ossec-hids/extensions/api  /var/ossec/

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
 $ sudo openssl req -new -key server.key -out server.csr

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

By default you can access by entering user *foo* and password *bar*, if you prefer you can of course generate your own password like this ::

 $ cd /var/ossec/api
 $ sudo htpasswd -c htpasswd **username**

Running API in background
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Time to start the API, we are going to start it on background and redirect the standard output to a log file called *api.log* ::

 $ /bin/node /var/ossec/api/server.js &>/var/ossec/api/api.log &

.. note:: Sometimes NodeJS binary is called "nodejs" or it is located on /usr/bin/, if the API does not start, check it please.


Sample outputs
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
That's all! Now you can access the API via browser o via *curl* commands at terminal. 

For example go to your browser and navitage to your server ip, not forget to enter the username and password created previously ::

 https://server.ip:55000

Or in the command line try some requests ::
 
 $ curl -XGET  -u username -k https://your.ip:55000/agents
 $ curl -XGET  -u username -k https://your.ip:55000/agents/000

.. note:: Rembember to use **HTTPS** URL when accesing


Some sample outputs.

Agents list ::

 {
	error: 0,
	response: [
		{
			id: "000",
			name: "vpc-ossec-manager (server)",
			ip: "127.0.0.1",
			status: "Active/Local"
		},
		{
			id: "005",
			name: "vpc-agent-centos-public",
			ip: "10.0.0.12",
			status: "Disconnected"
		},
		{
			id: "004",
			name: "vpc-agent-windows",
			ip: "10.0.0.13",
			status: "Active"
		},
		{
			id: "006",
			name: "vpc-agent-ubuntu-public",
			ip: "10.0.0.14",
			status: "Active"
		},
		{
			id: "014",
			name: "ossec-agent-centos5",
			ip: "any",
			status: "Never connected"
		}
	] 
 }


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
* `OSSEC Ruleset <http://documentation.wazuh.com/en/latest/ossec_rule_set.html>`_ 
