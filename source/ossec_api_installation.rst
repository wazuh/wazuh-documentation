.. _ossec_api_installation:

Installation
======================

Pre-requisites
----------------

In order to install and run the API, you will need some packages, in the following steps we will guide you to install them.

- Wazuh HIDS
- NodeJS server (v0.10.x) with Express module (4.0.x)
- Python 2.6 or superior


OSSEC Wazuh RESTful API requires you to have previously installed our OSSEC fork as your manager. You can download and install it following :ref:`these instructions <wazuh_installation>`.

The API will operate on port 55000/tcp by default, and NodeJS service will be protected with HTTP Authentication and encrypted by HTTPS.

NodeJS
------------

Most of distributions contain a version of NodeJS in its default repositories but we prefer to use the repositories maintained by NodeSource because they have more recent versions. Follow the `official guide <https://nodejs.org/en/download/package-manager/>`_ to install it.

Usually, it is enough with the next commands:

Debian and Ubuntu based Linux distributions: ::

 $ curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash -
 $ sudo apt-get install -y nodejs

Red Hat, CentOS and Fedora: ::

 $ curl --silent --location https://rpm.nodesource.com/setup_4.x | bash -
 $ yum -y install nodejs


Python packages
------------------

The API needs **Python** 2.6 or newer to perform some tasks.

Also, you need to install the python package *xmljson*: ::

 $ sudo pip install xmljson

In case you need the **pip** tool, you can install it following these steps:

Debian and Ubuntu based Linux distributions: ::

 $ sudo apt-get install python-pip

Red Hat, CentOS and Fedora: ::

 $ sudo yum install python-pip
 

RESTful API
--------------------

Proceed to download the API and copy API folder to OSSEC folder: ::

 $ cd ~
 $ wget https://github.com/wazuh/wazuh-API/archive/v1.2.tar.gz -O wazuh-API-1.2.tar.gz
 $ tar -xvf wazuh-API-*.tar.gz
 $ sudo mkdir -p /var/ossec/api && sudo cp -r wazuh-API-*/* /var/ossec/api

Once you have installed NodeJS, NPM and the API, you must install the NodeJS modules: ::

 $ sudo -s
 $ cd /var/ossec/api
 $ npm install

Configuration
----------------

You can configure some parameters using the file ``api/config.js`` ::

    // Port
    // TCP Port used by the API.
    config.port = "55000";

    // Security
    // Use HTTP protocol over TLS/SSL
    config.https = "yes";

    // Use HTTP authentication
    config.basic_auth = "yes";

    // In case the API run behind a proxy server, turn to "yes" this feature.
    config.BehindProxyServer = "no";

    // Cross-origin resource sharing
    config.cors = "yes";

    // Paths
    config.ossec_path = "/var/ossec";
    config.log_path = "/var/ossec/logs/api.log";
    config.api_path = __dirname;

    // Logs
    // Values for API log: disabled, info, warning, error, debug (each level includes the previous level).
    config.logs = "info";
    config.logs_tag = "WazuhAPI";

Basic Authentication
--------------------------

By default you can access by entering user "foo" and password "bar". We recommend you to generate new credentials. This can be done very easily, doing the following steps:

At first please make sure that you have ``htpasswd`` tool installed.

On Debian, update your repositories and install ``apache2-utils`` package: ::

 $ sudo apt-get update
 $ sudo apt-get install apache2-utils

On Centos, install the package running ::

 $ sudo yum install httpd-tools

Then, run htpasswd with your desired username: ::

 $ cd /var/ossec/api/ssl
 $ sudo htpasswd -c htpasswd username

SSL Certificate
----------------

At this point, you will create certificates to use the API, in case you prefer to use the out-of-the-box certificates, skip this section.

Follow the next steps to generate them (Openssl package is required): ::

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
