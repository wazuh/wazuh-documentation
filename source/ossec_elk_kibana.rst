.. _ossec_elk_kibana:

Kibana
======

This is your last step in the process of setting up your ELK cluster. In this section you will find the instructions to install Kibana, version 4.3, and to configure it to provide a centralized OSSEC alerts dashboard. In addition you will find dashboards for CIS security benchmark and PCI DSS compliance regulation. 

Furthermore, the documentation also includes extra steps to secure your Kibana interface with username and password, using Nginx web server.

Kibana installation
-------------------

Assuming you have followed the previous steps of :ref:`our guide <ossec_elk>`, and that you are using a single-host type of deployment. You can now install Kibana following running these commands: ::

 $ cd ~/ossec_tmp
 $ sudo wget https://download.elastic.co/kibana/kibana/kibana-4.3.1-linux-x64.tar.gz
 $ sudo tar xvf kibana-*.tar.gz && sudo mkdir -p /opt/kibana && sudo cp -R kibana-4*/* /opt/kibana/

If you need the 32 bit version use the download link: ``https://download.elastic.co/kibana/kibana/kibana-4.3.1-linux-x86.tar.gz``
 
Kibana service for SystemVinit
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

When using SystemVinit as your service manager (usually on Debian distributions), you can set up Kibana service following these steps: ::

 $ sudo cp ~/ossec_tmp/ossec-wazuh/extensions/kibana/kibana4 /etc/init.d/
 $ sudo chmod +x /etc/init.d/kibana4
 $ sudo update-rc.d kibana4 defaults 96 9

Kibana service for Systemd
^^^^^^^^^^^^^^^^^^^^^^^^^^

On the other hand, if your system uses Systemd to manage the services (usually on CentOS distributions), you can set up Kibana service by creating a Systemd unit file at ``/etc/systemd/system/kibana4.service`` with the following contents: ::

 [Service]
 ExecStart=/opt/kibana/bin/kibana
 Restart=always
 StandardOutput=syslog
 StandardError=syslog
 SyslogIdentifier=kibana4
 User=root
 Group=root
 Environment=NODE_ENV=production

 [Install]
 WantedBy=multi-user.target

Kibana on low memory systems
------------------------------
New Kibana 4.3 based on Node (V8) uses a lazy and greedy garbage collector. With its default limit of about 1.5 GB. In low ram memory systems (below 2GB) Kibana could not run properly. Kibana developers included one `fix <https://github.com/elastic/kibana/commit/626bf264595ef4f28c5609524fb29bf717c9b1c4l>`_, but later decided remove this `patch <https://github.com/elastic/kibana/commit/d4ac69af2a58d2ee538b9e9e1af1295282694754>`_.
If your host total RAM is below 2GB, from Wazuh we recommend to limit NodeJS max ram space, to do it open the file ``/opt/kibana/bin/kibana`` and add the following line ::

  NODE_OPTIONS="${NODE_OPTIONS:=--max-old-space-size=250}"

Change 250 value acording to your needs.

Kibana configuration
--------------------

Kibana is bound by default to ``0.0.0.0`` address (listening on all addresses), it uses by default ``5601`` port and try to connect to Elasticsearch using the URL ``http://localhost:9200``.
If you need to change any of this settings, open the ``/opt/kibana/config/kibana.yml`` configuration file and set up the following variables: ::

 # Kibana is served by a back end server. This controls which port to use.
 server.port: 80

 # The host to bind the server to.
 server.host: "0.0.0.0"
    
 # The Elasticsearch instance to use for all your queries.
 elasticsearch.url: "http://127.0.0.1:9200"

.. note:: Please note that the IP address we use in ``elasticsearch.url`` variable needs to match the one we used for ``network.bind_host`` and ``network.host`` when we configured the Elasticsearch component.

Now we can start Kibana: :: 

 $ sudo service kibana4 start

OSSEC alerts index
^^^^^^^^^^^^^^^^^^

To create OSSEC alerts index, access your Kibana interface at http://your_server_ip:5601, Kibana will ask you to "Configure an index pattern", set it up following these steps: ::

- Check "Index contains time-based events".
- Insert Index name or pattern: ossec-*
- On "Time-field name" list select @timestamp option.
- Click on "Create" button.
- You should see the fields list with about ~72 fields.
- Go to "Discover" tap on top bar buttons.

.. note:: Kibana will search Elasticsearch index name pattern ``ossec-yyyy.mm.dd``. You need to have at least an OSSEC alert before you set up the index pattern on Kibana. Otherwise it won't find any index on Elasticsearch. If you want to generate one, for example you could try a ``sudo -s`` and miss the password on purpose several times.

OSSEC Dashboards
^^^^^^^^^^^^^^^^

Custom dashboards for OSSEC alerts, GeoIP maps, file integrity, alert evolution, PCI DSS controls and CIS benchmark.

Import the custom dashboards. Access Kibana web interface on your browser and navigate to "Objects": ::

- Click at top bar on "Settings".
- Click on "Objects".
- Then click the button "Import"
- Select the file ~/ossec_tmp/ossec-wazuh/extensions/kibana/kibana-ossecwazuh-dashboards.json
- Optional: You can download the Dashboards JSON File directly from the repository `here<https://raw.githubusercontent.com/wazuh/ossec-wazuh/stable/extensions/kibana/kibana-ossecwazuh-dashboards.json>`_.

Refresh the Kibana page and you should be able to load your imported Dashboards.

.. note:: Some Dashboard visualizations require time and specific alerts to work. Please don't worry if some visualizations do not display data immidiately after the import.

Nginx secure proxy
------------------

We are going to use the Nginx web server to build a secure proxy to our Kibana web interface, we will establish a secure connection with SSL Certificates and HTTP Authentication.

To install Nginx on Debian systems, update your repositories and install Nginx and apache2-utils (for htpassword): ::

 $ sudo apt-get update
 $ sudo apt-get install nginx apache2-utils

To install Nginx on CentOS systems, run the following commands: ::

 $ sudo yum install epel-release
 $ sudo yum install nginx httpd-tools
 $ sudo systemctl start nginx

Nginx configuration
^^^^^^^^^^^^^^^^^^^

Create and edit Kibana configuration file for Nginx: :: 

- On CentOS: /etc/nginx/conf.d/kibana.conf
- On Debian: /etc/nginx/sites-available/default

Copy and paste the following configuration: :: 

 server {
        listen 80 default_server;                       #Listen on IPv4
        listen [::]:80;                                 #Listen on IPv6
        return 301 https://$host$request_uri;
 }

 server {
        listen                *:443;
        listen            [::]:443;
        ssl on;
        ssl_certificate /etc/pki/tls/certs/kibana-access.crt;
        ssl_certificate_key /etc/pki/tls/private/kibana-access.key;
        server_name           "Server Name";
        access_log            /var/log/nginx/kibana.access.log;
        error_log  /var/log/nginx/kibana.error.log;

        location / {
                auth_basic "Restricted";
                auth_basic_user_file /etc/nginx/conf.d/kibana.htpasswd;
                proxy_pass http://127.0.0.1:5601;
        }
 }

On CentOS we also need to edit ``/etc/nginx/nginx.conf``, including the following line inside the ``server`` block: ::

 include /etc/nginx/conf.d/*.conf;

SSL Certificate
^^^^^^^^^^^^^^^

Now we can create the SSL certificate to encrypt our connection via HTTPS. This can be done by following the next steps: :: 

 $ cd ~
 $ sudo openssl genrsa -des3 -out server.key 1024

Enter a password for the certificate and continue: :: 

 $ sudo openssl req -new -key server.key -out server.csr

Enter the password again, fill the certificate information, and continue: :: 

 $ sudo cp server.key server.key.org
 $ sudo openssl rsa -in server.key.org -out kibana-access.key
 $ sudo openssl x509 -req -days 365 -in server.csr -signkey server.key -out kibana-access.crt
 $ sudo mkdir -p /etc/pki/tls/certs
 $ sudo cp kibana-access.crt /etc/pki/tls/certs/
 $ sudo mkdir -p /etc/pki/tls/private/
 $ sudo cp kibana-access.key /etc/pki/tls/private/

Password authentication
^^^^^^^^^^^^^^^^^^^^^^^

To generate your .htpasswd file, run this command, replacing ``kibabaadmin`` with your own username :: 

 $ sudo htpasswd -c /etc/nginx/conf.d/kibana.htpasswd kibanaadmin

Now restart the Nginx service: :: 

 $ sudo service nginx restart

Try to access the Kibana web interface via HTTPS. It will ask for the username and password you just created. 


.. Note:: If you are running SELinux in enforcing mode, you might need to do some additional configuration in order to allow connections to 127.0.0.1:5601.

What's next
-----------

Now you have finished your ELK cluster installation and we recommend you to go to your OSSEC Wazuh manager and install OSSEC Wazuh RESTful API and OSSEC Wazuh Ruleset modules:

* :ref:`OSSEC Wazuh RESTful API <ossec_api>`
* :ref:`OSSEC Wazuh Ruleset <ossec_ruleset>`
