.. _ossec_elk_kibana:

Kibana
======

This is your last step in the process of setting up your ELK cluster. In this section you will find the instructions to install Kibana, version 4.1.2, and to configure it to provide a centralized OSSEC alerts dashboard. In addition you will find dashboards for CIS security benchmark and PCI DSS compliance regulation. 

Furthermore, the documentation also includes extra steps to secure your Kibana interface with username and password, using Nginx web server.

Kibana installation
-------------------

Assuming you have followed the previous steps of :ref:`our guide <ossec_elk>`, and that you are using a single-host type of deployment. You can now install Kibana following running these commands: ::

 $ cd ~/ossec_tmp
 $ sudo wget https://download.elastic.co/kibana/kibana/kibana-4.1.2-linux-x64.tar.gz 
 $ sudo tar xvf kibana-*.tar.gz && sudo mkdir -p /opt/kibana && sudo cp -R kibana-4*/* /opt/kibana/

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

Kibana configuration
--------------------

Open the ``/opt/kibana/config/kibana.yml`` configuration file and set up the following variables: ::

 # The host to bind the server to.
 host: "0.0.0.0"

 # The Elasticsearch instance to use for all your queries.
 elasticsearch_url: "http://127.0.0.1:9200"

.. note:: Please note that the IP address we use in ``elasticsearch_url`` variable needs to match the one we used for ``network.bind_host`` and ``network.host`` when we configured the Elasticsearch component.

Now we can start Kibana: :: 

 $ sudo service kibana4 start

OSSEC alerts index
^^^^^^^^^^^^^^^^^^

To create OSSEC alerts index, access your Kibana interface at http://your_server_ip:5601, and set it up following these steps: ::

- Kibana will ask you to "Configure an index pattern".
- Check "Use event times to create index names".
- Index pattern interval: Daily.
- Index name or pattern: [ossec-]YYYY.MM.DD
- On "Time-field name" list select @timestamp option.
- Click on "Create" button.
- Go to "Discover" tap on top bar buttons.

.. note:: Kibana will search Elasticsearch index name pattern ``ossec-yyyy.mm.dd``. You need to have at least an OSSEC alert before you set up the index pattern on Kibana. Otherwise it won't find any index on Elasticsearch. If you want to generate one, for example you could try a ``sudo -s`` and miss the password on purpose several times.

OSSEC extensions
^^^^^^^^^^^^^^^^

OSSEC Wazuh extensions for Kibana are: 

- index.js: Kibana AngularJS index that is used to hide non-useful alert fields, build a read-only mode, and add descriptions for PCI DSS requirements.
- kibana-ossecwazuh-dashboards.json: Custom dashboards for OSSEC alerts, geoIP maps, file integrity, PCI DSS controls and CIS benchmark.

To install the extensions we need to copy the necessary files to the Kibana folder: ::

 $ sudo cp ~/ossec_tmp/ossec-wazuh/extensions/kibana/index.js /opt/kibana/src/public
 $ sudo mkdir /opt/kibana/src/public/components/compliance
 $ sudo cp ~/ossec_tmp/ossec-wazuh/extensions/kibana/compliance.json /opt/kibana/src/public/components/compliance/

Now you can import the custom dashboards. Access Kibana web interface on your browser and navigate to "Objects": ::

- Click at top bar on "Settings".
- Click on "Objects".
- Then click the button "Import" and select the file ~/ossec_tmp/ossec-wazuh/extensions/kibana/kibana-ossecwazuh-dashboards.json

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
