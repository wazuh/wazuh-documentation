.. _build_lab_nginx_setup:

Set up Kibana
=============

Here we will set up SSL communications on the front end and back end of Kibana and the Wazuh Kibana API, as well as set up associated credentials.

Set up Nginx as an authenticating SSL reverse proxy to Kibana
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Since Kibana does not natively provide authentication or https service for web browser access, we will now set up Nginx to serve
as an authenticating SSL reverse proxy to Kibana.  Do the following on the Elastic Server:

1. Install Nginx:

    .. code-block:: console

      # cat > /etc/yum.repos.d/nginx.repo <<\EOF
      [nginx]
      name=nginx repo
      baseurl=http://nginx.org/packages/centos/$releasever/$basearch/
      gpgcheck=0
      enabled=1
      EOF

      # yum -y install nginx

2. Generate and sign an SSL certificate and private key:

    .. code-block:: console

      # openssl req -x509 -batch -nodes -days 365 -newkey rsa:2048 -keyout /etc/pki/tls/private/kibana-access.key -out /etc/pki/tls/certs/kibana-access.pem
      # ls -alh /etc/pki/tls/private/kibana-access.key /etc/pki/tls/certs/kibana-access.pem

3. Configure Nginx as an authenticating HTTPS reverse proxy to Kibana:

  .. code-block:: console

    # cat > /etc/nginx/conf.d/default.conf <<\EOF
    server {
        listen 443 default_server;
        listen            [::]:443;
        ssl on;
        ssl_certificate /etc/pki/tls/certs/kibana-access.pem;
        ssl_certificate_key /etc/pki/tls/private/kibana-access.key;
        access_log            /var/log/nginx/access.log;
        error_log            /var/log/nginx/error.log;
        location / {
            auth_basic "Restricted";
            auth_basic_user_file /etc/nginx/conf.d/kibana.htpasswd;
            proxy_pass http://localhost:5601/;
        }
    }
    EOF

4. Configure SELinux to allow Nginx to connect to Kibana:

  .. code-block:: console

    # semanage port -a -t http_port_t -p tcp 5601


Enable authentication by htpasswd
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

1. Install the package ``httpd-tools``:

  .. code-block:: console

    # yum -y install httpd-tools

2. Generate the ``.htpasswd`` file entry for a "wazuh" user.  The password you assign here will be for web browser logins to Kibana.

  .. code-block:: console

    # htpasswd -c /etc/nginx/conf.d/kibana.htpasswd wazuh

3. Restart Nginx:

  .. code-block:: console

    # systemctl restart nginx


Log in to Kibana and connect it to the Wazuh API
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

1. Now use your local web browser to surf to https://SERVER_IP where SERVER_IP is the Elastic IP assigned to your Elastic Server instance.  Bypass the security warnings caused by the fact that we are using a self-signed certificate.  You should then be prompted to authenticate with the "wazuh" username, and the password you just created.

2. Click on "Management", then on "Index Patterns", then on "wazuh-alerts-3.x-\*", and finally on the grey star button (upper right).  This will establish your default index pattern.

3. Click on the Wazuh icon on the left.  Fill out the form for connecting to the API like below (API password is "wazuhlab"):

  .. thumbnail:: ../../images/learning-wazuh/build-lab/kibana-to-api.png
      :title: API Connect
      :align: center
      :width: 75%

4. Click **[Save]** and then click on the Wazuh icon again to bring up the Wazuh Kibana App.  It should now be ready to use.
