.. _api_configuration:

Configuration
======================

The API will run on port 55000/tcp by default and protected with authentication. Below, we explain how to configure the API.


Configuration script
-------------------------

Run the script ``/var/ossec/api/scripts/configure_api.sh`` in order to configure the basic settings.

Configuration file
-------------------------

You can configure some parameters using the file ``/var/ossec/api/configuration/config.js``: ::

    // Path
    config.ossec_path = "/var/ossec";
    // The host to bind the API to.
    config.host = "0.0.0.0";
    // TCP Port used by the API.
    config.port = "55000";
    // Use HTTP protocol over TLS/SSL. Values: yes, no.
    config.https = "yes";
    // Use HTTP authentication. Values: yes, no.
    config.basic_auth = "yes";
    //In case the API run behind a proxy server, turn to "yes" this feature. Values: yes, no.
    config.BehindProxyServer = "no";

Basic Authentication
-------------------------

By default you can access by typing user "foo" and password "bar". We recommend you to generate new credentials. This can be done very easily, with the following steps:

TODO: Steps?

Then, run htpasswd with your desired username: ::

 $ cd /var/ossec/api/configuration/auth
 $ sudo node htpasswd -c user myUserName

SSL Certificate
-------------------------

At this point, you will create certificates to use the API.

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
