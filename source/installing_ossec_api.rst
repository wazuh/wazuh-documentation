OSSEC RESTful API 
=============================================================

1. Introduction
--------------------

OSSEC RESTful API is a service to control OSSEC Manager using REST requests. Through RESTful petitions we will able to interact with OSSEC controls like agents control, rootcheck and syscheck controls or rules control.

Nowdays it is basic to have an API which allows the software an easy communication with other software, we build this API aiming to turns OSSEC into a modern and technologic HIDS solution able to receive and send JSON petitions.

2. Goal
--------------------

The goal is pretty simple, stop using the command line to manage OSSEC. What if you could manage OSSEC just with some URL's in your browser? What if OSSEC could have different privilegies levels depending of what command is executed? What if you could deploy thousand of OSSEC agents just calling a POST request?

We are currently working on it and with the open source community we will create a magnific OSSEC API.


3. Dependencies
--------------------

OSSEC API is currently working under a NodeJS server (v0.10.x) with Express module (4.0.x) and the following dependencies:

- Body parser
- FS
- HTTP
- HTTPS
- HTTP-AUTH


4. OSSEC tweaks
--------------------

We have changed some internal OSSEC functionalities, we want to adapt OSSEC binaries to output JSON output so there are few new features and scripts.
For example in some binaries we could use "-j" argument to display the results in JSON format (./agent_control -l -j).

Moreover, we add two new folders on */var/ossec/* default folder, **dev** and **api**

5. Capabilities
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


6. Security
--------------------

The API will operate on port 55000 TCP, NodeJS will be protected with HTTP Authentication and encrypted by HTTPS SSL Certificate.


7. Installing
--------------------

To get the API working we need OSSEC-Wazuh version, download and install it, you can follow the installation guide at `OSSEC Wazuh installation  <http://documentation.wazuh.com/en/latest/installing_ossec_wazuh.html/>`_

Just in case you forgot it, mount dev folder to OSSEC location :: 

 $ sudo mkdir /var/ossec/dev/
 $ sudo mount -o bind /dev /var/ossec/dev/

And copy the API folder to OSSEC folder ::

 $ sudo cp -rf ~/ossec_tmp/ossec-wazuh/extensions/api  /var/ossec/






