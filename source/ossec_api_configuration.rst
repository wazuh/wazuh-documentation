.. _ossec_api_configuration:

Configuration
======================

The API will run on port 55000/tcp by default, encrypted by HTTPS and protected with authentication. Below, we explain how to configure these options and how to run the API.

Configuration file
---------------------

You can configure some parameters using the file ``/var/ossec/api/config.js``: ::

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
----------------------------------------

By default you can access by typing user "foo" and password "bar". We recommend you to generate new credentials. This can be done very easily, doing the following steps:

At first, please make sure that you have ``htpasswd`` tool installed.

On Debian and Ubuntu based Linux distributions: ::

 $ sudo apt-get update
 $ sudo apt-get install apache2-utils

On Red Hat, CentOS and Fedora: ::

 $ sudo yum install httpd-tools

Then, run htpasswd with your desired username: ::

 $ cd /var/ossec/api/ssl
 $ sudo htpasswd -c htpasswd myUsername

SSL Certificate
----------------------------------------

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
----------------------------------------

In order to run the API on background execute the following command: ::


 $ /bin/node /var/ossec/api/app.js &

API logs will be saved at ``/var/ossec/logs/api.log``.

.. note:: Sometimes NodeJS binary is called "nodejs" or it is located on /usr/bin/, if the API does not start, check it please.


.. _api-service-label:

Running API as service
----------------------------------------

We **recommend** to run the API as a service. In order to install the service excecute the following script: ::

 $ sudo /var/ossec/api/scripts/install_daemon.sh

Then, check out if the API is running:

  * Systemd systems: systemctl status wazuh-api
  * SysVinit systems: service wazuh-api status

The available options are: start, stop, status and restart.
