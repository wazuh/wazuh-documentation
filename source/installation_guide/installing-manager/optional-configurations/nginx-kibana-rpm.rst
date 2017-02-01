NGINX SSL proxy for Kibana (rpm)
===================================

1. Install NGINX:

    a. For CentOS::

        cat > /etc/yum.repos.d/nginx.repo <<\EOF
        [nginx]
        name=nginx repo
        baseurl=http://nginx.org/packages/centos/$releasever/$basearch/
        gpgcheck=0
        enabled=1
        EOF

        yum install nginx

    a. For RHEL::

        cat > /etc/yum.repos.d/nginx.repo <<\EOF
        [nginx]
        name=nginx repo
        baseurl=http://nginx.org/packages/rhel/$releasever/$basearch/
        gpgcheck=0
        enabled=1
        EOF

        yum install nginx

    .. note::
        For more details, see `NGINX: Official Red Hat/CentOS packages <https://www.nginx.com/resources/wiki/start/topics/tutorials/install/#official-red-hat-centos-packages>`_.

2. Install your SSL certificate and private key:

    a. If you have a valid **signed certificate**::

        mkdir -p /etc/pki/tls/certs /etc/pki/tls/private
        cp <ssl_pem> /etc/pki/tls/certs/kibana-access.pem
        cp <ssl_key> /etc/pki/tls/private/kibana-access.key

    b. Otherwise, create a **self-signed certificate**. Remember to set the *Common Name* field to your server name. For instance, if your server is *example.com*::

        mkdir -p /etc/pki/tls/certs /etc/pki/tls/private
        openssl req -x509 -batch -nodes -days 365 -newkey rsa:2048 -keyout /etc/pki/tls/private/kibana-access.key -out /etc/pki/tls/certs/kibana-access.pem -subj "/CN=example.com"

2. Create a HTTPS virtual server for Kibana::

    cat > /etc/nginx/conf.d/default.conf <<\EOF
    server {
        listen 80;
        listen [::]:80;
        return 301 https://$host$request_uri;
    }

    server {
        listen *:443;
        listen [::]:443;

        server_name "";

        ssl on;
        ssl_certificate /etc/pki/tls/certs/kibana-access.pem;
        ssl_certificate_key /etc/pki/tls/private/kibana-access.key;

        access_log /var/log/nginx/kibana.access.log;
        error_log /var/log/nginx/kibana.error.log;

        location ~ (/|/app/kibana|/bundles/|/kibana4|/status|/plugins) {
            proxy_pass http://localhost:5601;
        }
    }
    EOF

3. Edit the file ``/etc/nginx/sites-available/default`` and fill the field ``server_name`` with your server name (the same that appears in the SSL certificate).

4. Start NGINX:

    a. For Systemd::

        systemctl start nginx

    b. For SysV Init::

        service nginx start

Enable authentication by htpasswd (optional)
--------------------------------------------

1. Install package *httpd-tools*::

    yum install httpd-tools

2. Edit file ``/etc/nginx/sites-available/default`` and insert the following lines into ``location`` section::

    auth_basic "Restricted";
    auth_basic_user_file /etc/nginx/conf.d/kibana.htpasswd;

.. note::

    The file content should remain like this::

        server {
            listen 80;
            listen [::]:80;
            return 301 https://$host$request_uri;
        }

        server {
            listen *:443;
            listen [::]:443;

            server_name "example.com";

            ssl on;
            ssl_certificate /etc/pki/tls/certs/kibana-access.pem;
            ssl_certificate_key /etc/pki/tls/private/kibana-access.key;

            access_log /var/log/nginx/kibana.access.log;
            error_log /var/log/nginx/kibana.error.log;

            location ~ (/|/app/kibana|/bundles/|/kibana4|/status|/plugins) {
                proxy_pass http://localhost:5601;
                auth_basic "Restricted";
                auth_basic_user_file /etc/nginx/conf.d/kibana.htpasswd;
            }
        }

3. Generate the *.htpasswd* file. Replace ``<user>`` for your chosen username::

    htpasswd -c /etc/nginx/conf.d/kibana.htpasswd <user>

4. Restart NGINX:

    a. For Systemd::

        systemctl restart nginx

    b. For SysV Init::

        service nginx restart

Now try to access the Kibana web interface via HTTPS. It will ask for the username and password that you just created.

.. note::

    If you are running **SELinux in enforcing mode**, you might need to do some additional configuration in order to allow connections to ``localhost:5601``.
