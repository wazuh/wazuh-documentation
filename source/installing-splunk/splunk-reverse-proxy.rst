.. Copyright (C) 2019 Wazuh, Inc.

.. _splunk_reverse_proxy:

Setting up reverse proxy configuration for Splunk
=================================================

According to the Splunk official documentation, Splunk web can be placed behind a proxy in a reverse proxy type of configuration. In this section, we will describe how this can be done with an NGINX setup.

NGINX is a popular open-source web server and reverse proxy known for its high performance, stability, rich feature set, simple configuration and low resource consumption.

In this example, we will use it as a reverse proxy to provide encrypted and authenticated access to Splunk to the end users.

.. note::
    The default port for the Splunk web interface is *8000*. This tutorial will make the *80* and *443* ports available for HTTP/HTTPS access.

.. warning::
    The App Manager is not supported for use with a proxy server, if you use a proxy server with Splunk web, you must download and update apps manually.

.. topic:: Contents

    1. `NGINX SSL proxy for Splunk (RPM-based distributions)`_
    2. `NGINX SSL proxy for Splunk (Debian-based distributions)`_

NGINX SSL proxy for Splunk (RPM-based distributions)
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
      # cp <ssl_pem> /etc/pki/tls/certs/splunk-access.pem
      # cp <ssl_key> /etc/pki/tls/private/splunk-access.key

  b. If you do not have a valid **signed certificate**, create a **self-signed certificate** as follows. Remember to set the ``Common Name`` field to your server name. For instance, if your server is ``example.com``, you would do the following:

    .. code-block:: console

      # mkdir -p /etc/pki/tls/certs /etc/pki/tls/private
      # openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout /etc/pki/tls/private/splunk-access.key -out /etc/pki/tls/certs/splunk-access.pem
        Generating a 2048 bit RSA private key
        ...........+++
        ................+++
        writing new private key to '/etc/pki/tls/private/splunk-access.key'
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


3. Configure NGINX as an HTTPS reverse proxy to Splunk:

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
        ssl_certificate /etc/pki/tls/certs/splunk-access.pem;
        ssl_certificate_key /etc/pki/tls/private/splunk-access.key;
        access_log            /var/log/nginx/nginx.access.log;
        error_log            /var/log/nginx/nginx.error.log;
        location / {
            auth_basic "Restricted";
            auth_basic_user_file /etc/nginx/conf.d/splunk.htpasswd;
            proxy_pass http://splunk-server-ip:8000/;
        }
    }
    EOF

4. Allow NGINX to connect to the Splunk port if SELinux is being used:

  .. code-block:: console

    # semanage port -a -t http_port_t -p tcp 8000

  .. note::

    This assumes that you have ``policycoreutils-python`` installed to manage SELinux. Also that the used port is the default one.


Enable authentication by htpasswd
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

1. Install the package ``httpd-tools``:

  .. code-block:: console

    # yum install httpd-tools

2. Generate the ``.htpasswd`` file. Make sure to replace ``wazuh`` with your chosen username, matching with the `auth_basic_user_file`:

  .. code-block:: console

    # htpasswd -c /etc/nginx/conf.d/splunk.htpasswd wazuh

3. Restart NGINX:

  a. For Systemd:

    .. code-block:: console

      # systemctl restart nginx

  b. For SysV Init:

    .. code-block:: console

      # service nginx restart

Now, access the Splunk web interface via HTTPS. It will prompt you for the username and password that you created in the steps above.

NGINX SSL proxy for Splunk (Debian-based distributions)
-------------------------------------------------------

1. Install NGINX:

  .. code-block:: console

    # apt-get install nginx

2. Install your SSL certificate and private key:

  a. If you have a valid **signed certificate**, copy your key file ``<ssl_key>`` and your certificate file ``<ssl_pem>`` to their proper locations:

    .. code-block:: console

      # mkdir -p /etc/ssl/certs /etc/ssl/private
      # cp <ssl_pem> /etc/ssl/certs/splunk-access.pem
      # cp <ssl_key> /etc/ssl/private/splunk-access.key

  b. If you do not have a valid **signed certificate**, create a **self-signed certificate** as follows. Remember to set the ``Common Name`` field to your server name. For instance, if your server is ``example.com``, you would do the following:

    .. code-block:: console

      # mkdir -p /etc/ssl/certs /etc/ssl/private
      # openssl req -x509 -batch -nodes -days 365 -newkey rsa:2048 -keyout /etc/ssl/private/splunk-access.key -out /etc/ssl/certs/splunk-access.pem
        Generating a 2048 bit RSA private key
        .............+++
        ..+++
        writing new private key to '/etc/ssl/private/splunk-access.key'
        -----

3. Configure NGINX as an HTTPS reverse proxy to Splunk:

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
        ssl_certificate /etc/ssl/certs/splunk-access.pem;
        ssl_certificate_key /etc/ssl/private/splunk-access.key;
        access_log            /var/log/nginx/nginx.access.log;
        error_log            /var/log/nginx/nginx.error.log;
        location / {
            auth_basic "Restricted";
            auth_basic_user_file /etc/nginx/conf.d/splunk.htpasswd;
            proxy_pass http://splunk-server-ip:8000/;
        }
    }
    EOF

Enable authentication by htpasswd
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

1. Install the package ``apache2-utils``:

  .. code-block:: console

    # apt-get install apache2-utils

2. Generate the ``.htpasswd`` file replacing ``<user>`` below with your chosen username:

  .. code-block:: console

    # htpasswd -c /etc/nginx/conf.d/splunk.htpasswd <user>

3. Restart NGINX:

  a. For Systemd:

    .. code-block:: console

      # systemctl restart nginx

  b. For SysV Init:

    .. code-block:: console

      # service nginx restart

Now, access the Splunk web interface via HTTPS. It will prompt you for the username and password that you created in the steps above.

.. warning::
    If you're facing permission issues or 502 code error, try executing this command: ``setsebool -P httpd_can_network_connect 1``

Root endpoint
-------------

If you are hosting Splunk web behind a proxy that does not place it at the proxy's root, you may need to configure the root_endpoint setting in `$SPLUNK_HOME/etc/system/local/web.conf`, navigate to the file and edit it.

For example, if your proxy hosts Splunk web at ``yourhost.com:8000/splunk``, you have to set up the ``root_endpoint`` option like this:

    .. code-block:: console

      [settings]
      root_endpoint=/splunk
