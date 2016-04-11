.. _ossec_api_installation:


Installation
======================

OSSEC Wazuh RESTful API requires you to have previously installed our OSSEC fork as your manager. You can download and install it following :ref:`these instructions <wazuh_installation>`. 

As well, OSSEC API works under a NodeJS server (v0.10.x) with Express module (4.0.x), and has the following dependencies:

- Body parser
- FS
- HTTPS
- HTTP-AUTH
- Moment

The service will operate on port 55000/tcp by default, and NodeJS service will be protected with HTTP Authentication and encrypted by HTTPS.

Copy the API folder to OSSEC folder: ::

 $ cd ~ && git clone https://github.com/wazuh/wazuh-API.git
 $ sudo mkdir -p /var/ossec/api && sudo cp -r wazuh-API/* /var/ossec/api

NodeJS
------------

On CentOS, install ``epel-release`` and ``nodejs`` packages: ::
 
 $ sudo yum install epel-release
 $ sudo yum install nodejs
 $ sudo yum install npm

On Debian, update your repositories and install ``nodejs`` package: ::

 $ sudo apt-get update
 $ sudo apt-get install nodejs
 $ sudo apt-get install npm
 
Once you have installed NodeJS and NPM, you must install the modules used by Wazuh Api: ::
 
 $ sudo -s
 $ cd /var/ossec/api
 $ npm install

.. note:: Remember to open 55000 port TCP in your firewall, as it is used by the API service.

Python packages
------------------
The API uses Python to perform some tasks. Install in your system:

- Python 2.6+
- Package *xmljson*: ``pip install xmljson``

Configuration
----------------

You can configure some parameters using the file ``api/config.js``:

- Port: **55000** by default.


- Security

 - https: Use HTTP protocol over TLS/SSL. Default value: **yes**.
 - basic_auth: Use basic authentication. Default value: **yes**.
 - AccessControlAllowOrigin: Set header **Access-Control-Allow-Origin**. Default value: *****.
 - AccessControlAllowHeaders: Set header **Access-Control-Allow-Headers**. Default value: *****.

- Network

 - BehindProxyServer: it indicates if the API is behind a proxy. Default value: **no**.

- Paths:

 - ossec_path: */var/ossec* by default.

- Logs

 - logs: Log level (disabled, info, warning, error, debug). Each level includes the previous level. Default value: **info**.
 - logs_tag: Tag to use in logs. Default value: **WazuhAPI**.


SSL Certificate
----------------

At ``/var/ossec/api`` directory you can find some certificates we already created for you. But, if you want to create your own certificates, you can do it by following these steps (they require you to have openssl installed): ::

 $ cd /var/ossec/api/ssl
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

Basic Authentication
--------------------------

By default you can access by entering user "foo" and password "bar". We recommend you to generate new credentials. This can be done very easily, doing the following steps:

At first please make sure that you have ``htpasswd`` tool installed.

On Debian, update your repositories and install ``apache2-utils`` package: ::

 $ sudo apt-get update
 $ sudo apt-get install apache2-utils

Then, run htpasswd with your desired username: :: 

 $ cd /var/ossec/api/ssl
 $ sudo htpasswd -c htpasswd username

Running API on the background
----------------------------------

Time to start the API, we are going to start it on background and redirect the standard output to a log file called ``api.log``: ::

 $ /bin/node /var/ossec/api/app.js > /var/ossec/logs/api.log &

.. note:: Sometimes NodeJS binary is called "nodejs" or it is located on /usr/bin/, if the API does not start, check it please.

Running API as service
----------------------------------

In order to run the API as a service on your operating system, we provide a script that automatically detects if you are using *SysVinit* or *Systemd* and install the service: ::

 $ sudo /var/ossec/api/scripts/install_daemon.sh

Then, check out if the API is running:

  * Systemd systems: systemctl status wazuh-api
  * SysVinit systems: service wazuh-api status

The available options are: start, stop, status and restart.