.. _wazuh_api_configuration:

Configuration
======================

The API will run on port 55000/tcp by default and protected with authentication. Below, we explain how to configure these options and how to run the API.

Configuration file
---------------------

You can configure some parameters using the file ``/var/ossec/api/configuration/config.js``: ::

    // Path
    config.ossec_path = "/var/ossec";
    // TCP Port used by the API.
    config.port = "55000";
    // Use HTTP protocol over TLS/SSL. Values: yes, no.
    config.https = "no";
    // Use HTTP authentication. Values: yes, no.
    config.basic_auth = "yes";
    //In case the API run behind a proxy server, turn to "yes" this feature. Values: yes, no.
    config.BehindProxyServer = "no";

Automatic configuration
-------------------------

Run the script ``/var/ossec/api/scripts/configure_api.sh`` in order to configure the basic settings.


Manual configuration
-------------------------

Basic Authentication
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

By default you can access by typing user "foo" and password "bar". We recommend you to generate new credentials. This can be done very easily, doing the following steps:

Then, run htpasswd with your desired username: ::

 $ cd /var/ossec/api/configuration/auth
 $ sudo node htpasswd -c user myUserName

SSL Certificate
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

At this point, you will create certificates to use the API, in case you prefer to use the out-of-the-box certificates, skip this section.

Follow the next steps to generate them (Openssl package is required): ::

 $ cd /var/ossec/api/configuration/ssl
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


Running API
----------------------------------------


There are two ways to run the API: as service or on background.

.. _api-service-label:

Service
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

We **recommend** to run the API as a service. In order to install the service excecute the following script: ::

 $ sudo /var/ossec/api/scripts/install_daemon.sh

Then, check out if the API is running:

  * Systemd systems: systemctl status wazuh-api
  * SysVinit systems: service wazuh-api status

The available options are: start, stop, status and restart.

Background
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

In order to run the API on background execute the following command: ::

 $ /bin/node /var/ossec/api/app.js &

API logs will be saved at ``/var/ossec/logs/api.log``.

.. note:: Sometimes NodeJS binary is called "nodejs" or it is located on /usr/bin/, if the API does not start, check it please.
