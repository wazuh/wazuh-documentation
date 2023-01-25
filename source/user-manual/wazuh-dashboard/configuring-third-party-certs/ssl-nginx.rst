.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: You can use third-party certificates, instead of self-signed, in the Wazuh dashboard. Learn more about it in this section of the Wazuh documentation. 

.. _ssl-nginx:

Configuring SSL certificates on the Wazuh dashboard using NGINX
===============================================================

NGINX is an open source software for web serving, reverse proxying, caching, load balancing, and media streaming. It provides improved performance optimization during SSL decryption, better utilization, and complete end-to-end encryption of the Wazuh dashboard server. NGINX can be installed directly on the endpoint hosting the Wazuh dashboard or on a separate endpoint outside of the Wazuh cluster. However, for this use case, NGINX is installed on the Wazuh dashboard node.

Install and configure the Let’s Encrypt SSL certificate using NGINX on a Wazuh dashboard by following the step-by-step instructions below.

Setting up NGINX as Reverse proxy 
---------------------------------

Installing the NGINX software on the Wazuh dashboard
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

#. Install NGINX:

   .. tabs::

      .. group-tab:: YUM

         .. code-block:: console

            # yum install epel-release
            # yum install nginx

      .. group-tab:: APT

         .. code-block:: console

            # apt-get update
            # apt-get install nginx

#. Start NGINX and verify the status is active:

   .. code-block:: console

      # systemctl start nginx
      # systemctl status nginx

#. Open ports 80 (HTTP) and 443 (HTTPS):

   .. tabs::

      .. group-tab:: YUM

         .. code-block:: console

            # systemctl start firewalld
            # firewall-cmd --permanent --add-port=443/tcp
            # firewall-cmd --permanent --add-port=80/tcp

      .. group-tab:: APT

         .. code-block:: console

            # ufw allow 443
            # ufw allow 80 

Configure the proxy and the certificates
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

#. Install snap: 

   .. tabs::

      .. group-tab:: YUM

         .. code-block:: console

            # yum install epel-release
            # yum upgrade
            # yum install snapd
            # systemctl enable --now snapd.socket
            # ln -s /var/lib/snapd/snap /snap

      .. group-tab:: APT

         .. code-block:: console

            # apt-get update
            # apt-get install snap
            # snap install core; snap refresh core

#. Install certbot:

   .. tabs::

      .. group-tab:: YUM

         .. code-block:: console

            # yum remove certbot
            # snap install --classic certbot

      .. group-tab:: APT

         .. code-block:: console

            # apt remove certbot 
            # snap install --classic certbot

#. Configure a symbolic link to the certbot directory:

   .. code-block:: console

      # ln -s /snap/bin/certbot /usr/bin/certbot

#. Navigate to ``/etc/nginx/conf.d`` and create a ``wazuh.conf`` file for the certificate installation:

   .. code-block:: console

      # unlink /etc/nginx/sites-enabled/default
      # cd /etc/nginx/conf.d
      # nano wazuh.conf

#. Create the following configuration and save it in ``wazuh.conf``:

   .. code-block:: console

      server {
         listen 80 default_server;

         server_name <YOUR_DOMAIN_NAME>;

         location / {
            proxy_pass https://<WAZUH_DASHBOARD_IP>:443;
            proxy_set_header Host $host;
         }
      }

   Replace the following:

   - ``<YOUR_DOMAIN_NAME>`` with your domain name
   - ``<WAZUH_DASHBOARD_IP>`` with your Wazuh dashboard IP address

#. Use certbot to generate an SSL certificate:

   .. code-block:: console

      # certbot --nginx -d <YOUR_DOMAIN_NAME>


#. Check that NGINX is properly configured and verify that you have the same configuration in the ``/etc/nginx/conf.d/wazuh.conf`` file with the sample below: 

   .. code-block:: console

      server {
         listen 80 default_server;

         server_name <YOUR_DOMAIN_NAME>;

         location / {
            proxy_pass https://<WAZUH_DASHBOARD_IP>:443;
            proxy_set_header Host $host;
         }
      }
      server {
         server_name <YOUR_DOMAIN_NAME>; 

         location / {
            proxy_pass https://<WAZUH_DASHBOARD_IP>:443;
            proxy_set_header Host $host;
         }

         listen 443 ssl; 
         ssl_certificate /etc/letsencrypt/live/<YOUR_DOMAIN_NAME>/fullchain.pem; 
         ssl_certificate_key /etc/letsencrypt/live/<YOUR_DOMAIN_NAME>/privkey.pem; 
         include /etc/letsencrypt/options-ssl-nginx.conf; 
         ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; 

      }server {
         if ($host = <YOUR_DOMAIN_NAME>) {
            return 301 https://$host$request_uri;
         } 

         listen 80 ;
         server_name <YOUR_DOMAIN_NAME>;
         return 404; 

      }

#. Restart the NGINX service:

   .. code-block:: console

      # systemctl restart nginx

#. Access the Wazuh dashboard via the configured domain name.

      .. thumbnail:: /images/configuring-third-party-certs/wazuh-dashboard.png
         :title: Wazuh dashboard
         :align: center
         :width: 80%

#. You can further prevent access via public IP address by removing the first server block in the NGINX ``/etc/nginx/conf.d/wazuh.conf``:

   .. code-block:: console

      server {
         listen 80 default_server;

         server_name <YOUR_DOMAIN_NAME>;

         location / {
            proxy_pass https://<WAZUH_DASHBOARD_IP>:443;
            proxy_set_header Host $host;
         }
      }

The NGINX server has been configured and the Let’s Encrypt certificate installation is active on the Wazuh dashboard. You can proceed to access it by using the configured domain name.
