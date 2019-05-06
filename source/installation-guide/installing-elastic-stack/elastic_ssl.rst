.. Copyright (C) 2019 Wazuh, Inc.

.. _elastic_ssl:

Setting up SSL for Filebeat and Logstash
========================================

If you are running Wazuh server and Elastic Stack on separate systems and servers (**distributed architecture**), it is important to configure SSL encryption between Filebeat and Logstash. (This does not apply to **single-server architectures**.)

.. note:: All the commands described below need to be executed with root user privileges.

Generating a self-signed SSL certificate
----------------------------------------

1. Generate an SSL certificate and key as follows:

	On the **machine with Logstash server** installed, create a copy of the OpenSSL sample configuration file. The file location may vary depending on your operating system:

	a. On Debian or Ubuntu:

		.. code-block:: console

			# cp /etc/ssl/openssl.cnf custom_openssl.cnf

	b. On CentOS or Red Hat:

		.. code-block:: console

			# cp /etc/pki/tls/openssl.cnf custom_openssl.cnf

  .. note:: Typically you will run the Logstash server in your Elastic Stack server or, if you have set up a distributed Elasticsearch cluster, in one of its nodes.

2. Edit the custom configuration file, ``custom_openssl.cnf``:

	Find the section ``[ v3_ca ]`` and add a line like the one below that includes your Elastic server's IP address:

		.. code-block:: ini

			[ v3_ca ]
			subjectAltName = IP: YOUR_SERVER_IP

	For example:

		.. code-block:: ini

			[ v3_ca ]
			subjectAltName = IP: 192.168.1.2

3. Generate the SSL certificate and key:

	.. code-block:: console

		# openssl req -x509 -batch -nodes -days 365 -newkey rsa:2048 -keyout /etc/logstash/logstash.key -out /etc/logstash/logstash.crt -config custom_openssl.cnf

4. You may remove the custom configuration file:

	.. code-block:: console

		# rm custom_openssl.cnf

Configure Logstash server
-------------------------

The newly generated SSL certificate and key will be found at ``/etc/logstash/logstash.crt`` and ``/etc/logstash/logstash.key``, respectively. Next, configure Logstash to use this new key for communication with Filebeat.

1. Grant read permissions for ``/etc/logstash/logstash.crt`` and ``/etc/logstash/logstash.key``.

	.. code-block:: console

		# chmod 644 /etc/logstash/logstash.crt
		# chmod 644 /etc/logstash/logstash.key

2. Edit the file ``/etc/logstash/conf.d/01-wazuh.conf`` and uncomment the lines related to SSL under ``input/beats``. The active input section should now look like this:

	.. code-block:: bash

		input {
		    beats {
		        port => 5000
		        codec => "json_lines"
		        ssl => true
		        ssl_certificate => "/etc/logstash/logstash.crt"
		        ssl_key => "/etc/logstash/logstash.key"
		    }
		}

3. Restart Logstash. The command depends on the OS init system:

	a. For Systemd:

		.. code-block:: console

			# systemctl restart logstash.service

	b. For legacy SysV Init:

		.. code-block:: console

			# service logstash restart

Configure Filebeat
------------------

Configure Filebeat to verify the Logstash server's certificate.

1. On the **instance where Filebeat is installed** (the Wazuh server), fetch the Logstash server's SSL certificate file at ``/etc/logstash/logstash.crt`` and copy it into ``/etc/filebeat/logstash.crt``.

	Here is an example that can be used to copy the SSL certificate from the Logstash server to the Wazuh server where Filebeat is installed:

	.. code-block:: console

		# scp root@LOGSTASH_SERVER_IP:/etc/logstash/logstash.crt /etc/filebeat

2. Grant read permissions for ``/etc/filebeat/logstash.crt``.

	.. code-block:: console

		# chmod 644 /etc/filebeat/logstash.crt

3. Edit the file ``/etc/filebeat/filebeat.yml`` and uncomment the lines related to SSL inside of ``logstash``. The file should look like this:

	.. code-block:: yaml

	    output:
	     logstash:
	       hosts: ["192.168.1.2:5000"]
	       ssl:
	         certificate_authorities: ["/etc/filebeat/logstash.crt"]

4. Restart Filebeat. The command depends on the OS init system:

	a. For Systemd:

		.. code-block:: console

			# systemctl restart filebeat.service

	b. For legacy SysV Init:

		.. code-block:: console

			# service filebeat restart

.. note::

	More detailed information is available in the `Securing communication with Logstash <https://www.elastic.co/guide/en/beats/filebeat/current/configuring-ssl-logstash.html>`_ guide from Elastic.
