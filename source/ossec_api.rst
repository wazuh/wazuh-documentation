.. _ossec_api:

OSSEC Wazuh RESTful API 
=======================

Introduction
------------

OSSEC Wazuh RESTful API is a service to control OSSEC Wazuh manager using REST requests. It will allow you to execute OSSEC commands for agents remote management (add, restart, info, key export) or to extract rootcheck and syscheck information (restart, check last scan...). The goal is to provide an interface to manage your OSSEC deployment remotely (e.g. through a web browser), or to integrate OSSEC with external systems.

OSSEC Wazuh API RESTful capabilities:

* Agents overview
* Agent status, rootcheck and syscheck info.
* Restart agent
* Add agent
* Get agent key
* SSL Certificates
* HTTPS Secure
* User authentication

RESTful Requests
----------------

There are some current API capabilities, we are currently working on extending them and constantly improving the API versatility.

List your existing agents: :: 

 /agents

Get agent information: :: 

 /agents/:agent_id

Restart an agent: :: 

 /agents/:agent_id/restart

Add a new agent: :: 

 /agents/add/:agent_name

Extract an agent key: :: 

 /agents/:agent_id/key

Restart syscheck/rootcheck on all agents :: 

 /agents/sysrootcheck/restart

Restart syscheck/rootcheck restart on one agent :: 

 /agents/:agent_id/sysrootcheck/restart


Installation
------------

OSSEC Wazuh RESTful API requires you to have previously installed our OSSEC fork as your manager. You can download and install it following :ref:`these instructions <ossec_wazuh>`. 

As well, OSSEC API works under a NodeJS server (v0.10.x) with Express module (4.0.x), and has the following dependencies:

- Body parser
- FS
- HTTPS
- HTTP-AUTH
- Moment

The service will operate on port 55000/tcp by default, and NodeJS service will be protected with HTTP Authentication and encrypted by a HTTPS SSL Certificate.

Remember (as indicated when installing OSSEC Wazuh fork), that OSSEC RESTful API requires you to mount your system ``/dev`` directory on your OSSEC location: :: 

 $ sudo mkdir /var/ossec/dev/
 $ sudo mount -o bind /dev /var/ossec/dev/

And copy the API folder to OSSEC folder: ::

 $ sudo cp -rf ~/ossec_tmp/ossec-wazuh/extensions/api  /var/ossec/

NodeJS
^^^^^^

On CentOS, install ``epel-release`` and ``nodejs`` packages: ::
 
 $ sudo yum install epel-release
 $ sudo yum install nodejs

On Debian, update your repositories and install ``nodejs`` package: ::

 $ sudo apt-get update
 $ sudo apt-get install nodejs

.. note:: Remember to open 55000 port TCP in your firewall, as it is used by the API service.

SSL Certificate
^^^^^^^^^^^^^^^

At ``/var/ossec/api`` directory you can find some certificates we already created for you. But, if you want to create your own certificates, you can do it by following these steps (they require you to have openssl installed): ::

 $ cd /var/ossec/api	
 $ sudo openssl genrsa -des3 -out server.key 1024
 $ sudo openssl req -new -key server.key -out server.csr

The password must be entered everytime you run the server, if you don't want to enter the password everytime, you can remove it by running these commands: ::

 $ sudo cp server.key server.key.org
 $ sudo openssl rsa -in server.key.org -out server.key

Now generate your self-signed certificate: ::

 $ sudo openssl x509 -req -days 365 -in server.csr -signkey server.key -out server.crt

And remove temporary files: ::

 $ sudo rm server.csr
 $ sudo rm server.key.org

HTTP Authentication
^^^^^^^^^^^^^^^^^^^

By default you can access by entering user "foo" and password "bar". We recommend you to change these credentials. This can be done very easily by running: ::

 $ cd /var/ossec/api
 $ sudo htpasswd -c htpasswd username

Running API on the background
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Time to start the API, we are going to start it on background and redirect the standard output to a log file called ``api.log``: ::

 $ /bin/node /var/ossec/api/server.js &>/var/ossec/api/api.log &

.. note:: Sometimes NodeJS binary is called "nodejs" or it is located on /usr/bin/, if the API does not start, check it please.

API sample use cases
--------------------

At this point you should be able to access the API through a web browser or through the command line (using curl). For example, go to your browser and navigate to your server IP addreess (via HTTPS, port 55000). Do not forget to enter your username and password, you just created: ::

 https://server.ip:55000

Or in the command line try some requests: ::
 
 $ curl -XGET  -u username -k https://your.ip:55000/agents
 $ curl -XGET  -u username -k https://your.ip:55000/agents/000

See below some sample outputs.

Agents list: ::

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


Agent info: ::

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

Agent restarted: ::

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

Agent syscheck/rootcheck restared: ::

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


What's next
-----------

Once you have your OSSEC RESTful API running, we recommend you to check our OSSEC Wazuh ruleset:

* `OSSEC Wazuh Ruleset installation guide <http://documentation.wazuh.com/en/latest/ossec_rule_set.html>`_ 
