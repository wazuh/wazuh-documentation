.. _elastic_ssl:

Setting up SSL for Filebeat and Logstash
========================================

By default, the communications between **Wazuh server** (Filebeat) and **Elastic Stack server** (Logstash) are not encrypted. It’s strongly recommended to configure Logstash to use SSL encryption. Please follow the next guide to setting up SSL for Filebeat and Logstash.

.. warning::
	This configuration applies only for **distributed architectures**.

Get a SSL certificate
---------------------

First, we need a SSL certificate and a key. We'll explain how to generate a self-signed certificate.

1. On the **machine with Logstash server** installed, create a copy of the OpenSSL example configuration file. The file location may change depending on your operating system:

	a. On Debian or Ubuntu::

		cp /etc/ssl/openssl.cnf custom_openssl.cnf

	b. On CentOS or Red Hat::

		cp /etc/pki/tls/openssl.cnf custom_openssl.cnf

2. Edit the custom configuration file, ``custom_openssl.cnf``.

	Find the section ``[ v3_ca ]`` and add a line such this, setting your Elastic server's IP address::

		[ v3_ca ]
		subjectAltName = IP: YOUR_SERVER_IP

	For example::

		[ v3_ca ]
		subjectAltName = IP: 192.168.1.2

3. Generate the SSL certificate and key::

	openssl req -x509 -batch -nodes -days 3650 -newkey rsa:2048 -keyout /etc/logstash/logstash.key -out /etc/logstash/logstash.crt -config custom_openssl.cnf

4. You may remove the custom configuration file::

	rm custom_openssl.cnf

Configure Logstash server
-------------------------

At this point you should have your certificate and key at ``/etc/logstash/logstash.crt`` and ``/etc/logstash/logstash.key`` respectively. Now we'll configure Logstash to use it on connections with Filebeat.

1. Edit file ``/etc/logstash/conf.d/01-wazuh.conf`` and uncomment the lines related to SSL at ``input/beats``. The file should remain such this::

	input {
	    beats {
	        port => 5000
	        codec => "json_lines"
	        ssl => true
	        ssl_certificate => "/etc/logstash/logstash.crt"
	        ssl_key => "/etc/logstash/logstash.key"
	    }
	}

2. Restart Logstash. The command depends on the OS init system:

	a. For Systemd::

		systemctl restart logstash.service

	b. For legacy SysV Init::

		service logstash restart

Configure Filebeat
------------------

Now we will configure Filebeat to verify the Logstash server's certificate.

1. On the **machine with Filebeat installed**, get the Logstash server's file ``/etc/logstash/logstash.crt`` and copy it into ``/etc/filebeat/logstash.crt``.

	This is an **example command** to get it from the Filebeat client machine, but you may use another method::

		scp root@LOGSTASH_SERVER_IP:/etc/logstash/logstash.crt /etc/filebeat

2. Edit the file ``/etc/filebeat/filebeat.yml`` and uncomment the lines related to SSL inside ``logstash``. The file should remain like this::

	output:
	 logstash:
	   hosts: ["192.168.1.2:5000"]
	   ssl:
	     certificate_authorities: ["/etc/filebeat/logstash.crt"]

2. Restart Filebeat. The command depends on the OS init system:

	a. For Systemd::

		systemctl restart filebeat.service

	b. For legacy SysV Init::

		service filebeat restart

.. note::
	You can get more info at `Securing communication with Logstash <https://www.elastic.co/guide/en/beats/filebeat/current/configuring-ssl-logstash.html>`_ guide from Elastic.

Next steps
----------

At this point Wazuh manager and Elastic server are properly configured. It's the time to :ref:`add a manager to the Kibana app <connect_wazuh_app>`.
