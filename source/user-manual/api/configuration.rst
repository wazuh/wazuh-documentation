.. _api_configuration:

Configuration
======================

The API will bind to port 55000/tcp by default and is requires username/password authentication. The default username and password is "foo" and "bar".


Configuration script
-------------------------

Run the script ``/var/ossec/api/scripts/configure_api.sh`` to configure the basic settings.

Configuration file
-------------------------

You can configure certain API settings in the file ``/var/ossec/api/configuration/config.js``: ::

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

Make sure to restart wazuh-api service after editing the config file using the command below appropriate for your system::

    # systemctl restart wazuh-api
    # service wazuh-api restart


Basic Authentication
-------------------------

It is generally recommended to generate new credentials to replace foo:bar. This can be done very easily with the following steps, substituting your desired username for **myUserName**::

    # cd /var/ossec/api/configuration/auth
    # node htpasswd -c user myUserName

Do not forget to restart the API to apply the changes::

    # systemctl restart wazuh-api
    # service wazuh-api restart

Manually enable https support
---------------------------------

Generate key and certificate request (the Openssl package is required): ::

 # cd /var/ossec/api/configuration/ssl
 # openssl genrsa -des3 -out server.key 1024
 # openssl req -new -key server.key -out server.csr

By default, the key's password must be entered every time you run the server.  If you don't want to enter the password every time, you can remove it by running these commands: ::

 # cp server.key server.key.org
 # openssl rsa -in server.key.org -out server.key

Next generate your self-signed certificate: ::

 # openssl x509 -req -days 365 -in server.csr -signkey server.key -out server.crt

And remove temporary files: ::

 # rm server.csr
 # rm server.key.org
