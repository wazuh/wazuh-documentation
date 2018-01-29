.. _kibana_ssl:

Setting up SSL and authentication for Kibana
============================================

By default, the communication between Kibana (including the Wazuh app) and the web browser on end-user systems is not encrypted. It’s strongly recommended that Kibana be configured to use SSL encryption and to enable authentication.  In this section, we will briefly describe how this can be done with a NGINX setup.

NGINX is a popular open-source web server and reverse proxy known for its high performance, stability, rich feature set, simple configuration and low resource consumption. In this example, we will use it as a reverse proxy to provide encrypted and authenticated access to Kibana to the end users.

.. note:: Many of the commands described below need to be executed with root user privileges.

.. topic:: Contents

    1. `NGINX SSL proxy for Kibana (RPM-based distributions)`_
    2. `NGINX SSL proxy for Kibana (Debian-based distributions)`_

NGINX SSL proxy for Kibana (RPM-based distributions)
----------------------------------------------------

1. Install NGINX:

  a. For CentOS:

    .. code-block:: console

      # cat > /etc/yum.repos.d/nginx.repo <<\EOF
      [nginx]
      name=nginx repo
      baseurl=http://nginx.org/packages/centos/$releasever/$basearch/
      gpgcheck=0
      enabled=1
      EOF

      # yum install nginx

  b. For RHEL:

    .. code-block:: console

      # cat > /etc/yum.repos.d/nginx.repo <<\EOF
      [nginx]
      name=nginx repo
      baseurl=http://nginx.org/packages/rhel/$releasever/$basearch/
      gpgcheck=0
      enabled=1
      EOF

      # yum install nginx

  .. note:: For more information, see `NGINX: Official Red Hat/CentOS packages <https://www.nginx.com/resources/wiki/start/topics/tutorials/install/#official-red-hat-centos-packages>`_.

2. Install your SSL certificate and private key:

  a. If you have a valid **signed certificate**, copy your key file ``<ssl_key>`` and your certificate file ``<ssl_pem>`` to their proper locations:

    .. code-block:: console

      # mkdir -p /etc/pki/tls/certs /etc/pki/tls/private
      # cp <ssl_pem> /etc/pki/tls/certs/kibana-access.pem
      # cp <ssl_key> /etc/pki/tls/private/kibana-access.key

  b. If you do not have a valid **signed certificate**, create a **self-signed certificate** as follows. Remember to set the ``Common Name`` field to your server name. For instance, if your server is ``example.com``, you would do the following:

    .. code-block:: console

      # mkdir -p /etc/pki/tls/certs /etc/pki/tls/private
      # openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout /etc/pki/tls/private/kibana-access.key -out /etc/pki/tls/certs/kibana-access.pem
        Generating a 2048 bit RSA private key
        ...........+++
        ................+++
        writing new private key to '/etc/pki/tls/private/kibana-access.key'
        -----
        You are about to be asked to enter information that will be incorporated
        into your certificate request.
        What you are about to enter is what is called a Distinguished Name or a DN.
        There are quite a few fields but you can leave some blank
        For some fields there will be a default value,
        If you enter '.', the field will be left blank.
        -----
        Country Name (2 letter code) [AU]: US
        State or Province Name (full name) [Some-State]: California
        Locality Name (eg, city) []: San Jose
        Organization Name (eg, company) [Internet Widgits Pty Ltd]: Example Inc.
        Organizational Unit Name (eg, section) []: section
        Common Name (e.g. server FQDN or YOUR name) []: example.com
        Email Address []: example@mail.com


3. Configure NGINX as an HTTPS reverse proxy to Kibana:

  .. code-block:: console

    # cat > /etc/nginx/conf.d/default.conf <<\EOF
    server {
        listen 80;
        listen [::]:80;
        return 301 https://$host$request_uri;
    }

    server {
        listen 443 default_server;
        listen            [::]:443;
        ssl on;
        ssl_certificate /etc/pki/tls/certs/kibana-access.pem;
        ssl_certificate_key /etc/pki/tls/private/kibana-access.key;
        access_log            /var/log/nginx/nginx.access.log;
        error_log            /var/log/nginx/nginx.error.log;
        location / {
            auth_basic "Restricted";
            auth_basic_user_file /etc/nginx/conf.d/kibana.htpasswd;
            proxy_pass http://localhost:5601/;
        }
    }
    EOF

  .. note::

    We configure Nginx in order to encapsulate the IP address of the Kibana server. This configuration allows Kibana requests to be redirected to HTTPS. When using this configuration, it is recommended that the file ``/etc/kibana/kibana.yml`` be edited to set the field ``server.host`` to ``localhost``. The Kibana service must be restarted to apply this change.

4. Allow NGINX to connect to the Kibana port if SELinux is being used:

  .. code-block:: console

    # semanage port -a -t http_port_t -p tcp 5601

  .. note::

    This assumes that you have ``policycoreutils-python`` installed to manage SELinux.


Enable authentication by htpasswd
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

1. Install the package ``httpd-tools``:

  .. code-block:: console

    # yum install httpd-tools

2. Generate the ``.htpasswd`` file. Make sure to replace ``wazuh`` with your chosen username, matching with the `auth_basic_user_file`:

  .. code-block:: console

    # htpasswd -c /etc/nginx/conf.d/kibana.htpasswd wazuh

3. Restart NGINX:

  a. For Systemd:

    .. code-block:: console

      # systemctl restart nginx

  b. For SysV Init:

    .. code-block:: console

      # service nginx restart

Now, access the Kibana web interface via HTTPS. It will prompt you for the username and password that you created in the steps above.

NGINX SSL proxy for Kibana (Debian-based distributions)
-------------------------------------------------------

1. Install NGINX:

  .. code-block:: console

    # apt-get install nginx

2. Install your SSL certificate and private key:

  a. If you have a valid **signed certificate**, copy your key file ``<ssl_key>`` and your certificate file ``<ssl_pem>`` to their proper locations:

    .. code-block:: console

      # mkdir -p /etc/ssl/certs /etc/ssl/private
      # cp <ssl_pem> /etc/ssl/certs/kibana-access.pem
      # cp <ssl_key> /etc/ssl/private/kibana-access.key

  b. If you do not have a valid **signed certificate**, create a **self-signed certificate** as follows. Remember to set the ``Common Name`` field to your server name. For instance, if your server is ``example.com``, you would do the following:

    .. code-block:: console

      # mkdir -p /etc/ssl/certs /etc/ssl/private
      # openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout /etc/pki/tls/private/kibana-access.key -out /etc/pki/tls/certs/kibana-access.pem
        Generating a 2048 bit RSA private key
        ...........+++
        ................+++
        writing new private key to '/etc/pki/tls/private/kibana-access.key'
        -----
        You are about to be asked to enter information that will be incorporated
        into your certificate request.
        What you are about to enter is what is called a Distinguished Name or a DN.
        There are quite a few fields but you can leave some blank
        For some fields there will be a default value,
        If you enter '.', the field will be left blank.
        -----
        Country Name (2 letter code) [AU]: US
        State or Province Name (full name) [Some-State]: California
        Locality Name (eg, city) []: San Jose
        Organization Name (eg, company) [Internet Widgits Pty Ltd]: Example Inc.
        Organizational Unit Name (eg, section) []: section
        Common Name (e.g. server FQDN or YOUR name) []: example.com
        Email Address []: example@mail.com

3. Configure NGINX as an HTTPS reverse proxy to Kibana:

  .. code-block:: console

    # cat > /etc/nginx/sites-available/default <<\EOF
    server {
        listen 80;
        listen [::]:80;
        return 301 https://$host$request_uri;
    }

    server {
        listen 443 default_server;
        listen            [::]:443;
        ssl on;
        ssl_certificate /etc/ssl/certs/kibana-access.pem;
        ssl_certificate_key /etc/ssl/private/kibana-access.key;
        access_log            /var/log/nginx/nginx.access.log;
        error_log            /var/log/nginx/nginx.error.log;
        location / {
            auth_basic "Restricted";
            auth_basic_user_file /etc/nginx/conf.d/kibana.htpasswd;
            proxy_pass http://localhost:5601/;
        }
    }
    EOF

  .. note::

    We configure Nginx in order to encapsulate the IP address of the Kibana server. This configuration allows Kibana requests to be redirected to HTTPS. When using this configuration, it is recommended that the file ``/etc/kibana/kibana.yml`` be edited to set the field ``server.host`` to ``localhost``. The Kibana service must be restarted to apply this change.

Enable authentication by htpasswd
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

1. Install the package ``apache2-utils``:

  .. code-block:: console

    # apt-get install apache2-utils

2. Generate the ``.htpasswd`` file replacing ``<user>`` below with your chosen username:

  .. code-block:: console

    # htpasswd -c /etc/nginx/conf.d/kibana.htpasswd <user>

3. Restart NGINX:

  a. For Systemd:

    .. code-block:: console

      # systemctl restart nginx

  b. For SysV Init:

    .. code-block:: console

      # service nginx restart

Now, access the Kibana web interface via HTTPS. It will prompt you for the username and password that you created in the steps above.