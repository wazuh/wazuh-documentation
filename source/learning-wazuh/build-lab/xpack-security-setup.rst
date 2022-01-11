.. Copyright (C) 2021 Wazuh, Inc.

.. meta::
    :description: Learn more about how to prepare your Wazuh Lab environment. In this section, we explain how to configure X-Pack Security. 
    
.. _build_lab_xpack-security-setup:

Configure X-Pack Security
=========================

Since your Wazuh Server and Elastic Server instances are located on separate instances, it's
actually important to set up SSL encryption along with the verification between Filebeat and
Elasticsearch. Also, since your Kibana is publicly exposed to internet, it's
important to add authentication to access it as well.


Setting up SSL for Elasticsearch
--------------------------------


1. Create the file ``/usr/share/elasticsearch/instances.yml`` and fill it with
   the instances you want to secure.

.. code-block:: console

    [root@elastic-server ~]# cat > /usr/share/elasticsearch/instances.yml << EOF
    instances:
        - name: "wazuh-manager"
          ip:
            - "172.30.0.10"
        - name: "elasticsearch"
          ip:
            - "172.30.0.20"
        - name: "kibana"
          ip:
            - "172.30.0.20"
    EOF

2. Create the required certificates, private keys and the certificate authority (CA) structure using the native `elasticsearch-certutil
   <https://www.elastic.co/guide/en/elasticsearch/reference/current/certutil.html>`_ tool.

.. code-block:: console

    [root@elastic-server ~]# /usr/share/elasticsearch/bin/elasticsearch-certutil cert ca --pem --in instances.yml --out certs.zip


3. Extract the generated ``/usr/share/elasticsearch/certs.zip`` file from the
   previous step:

.. code-block:: console

    # unzip /usr/share/elasticsearch/certs.zip -d /usr/share/elasticsearch/

.. note::

    The ``ca.crt`` file is shared for all the instances. The ``.crt`` and ``.key`` pairs are unique for each instance.

Configure SSL in Elasticsearch
::::::::::::::::::::::::::::::


1. Create the directory ``/etc/elasticsearch/certs``, then copy the certificate
   authorities, the certificate and the key there.

.. code-block:: console

    # mkdir /etc/elasticsearch/certs/ca -p
    # cp /usr/share/elasticsearch/ca/ca.crt /etc/elasticsearch/certs/ca
    # cp /usr/share/elasticsearch/elasticsearch/elasticsearch.crt /etc/elasticsearch/certs
    # cp /usr/share/elasticsearch/elasticsearch/elasticsearch.key /etc/elasticsearch/certs
    # chown -R elasticsearch: /etc/elasticsearch/certs
    # chmod -R 770 /etc/elasticsearch/certs

2. Add the proper settings for both the transport and the HTTP layers in
   ``/etc/elasticsearch/elasticsearch.yml``.

.. code-block:: console

    [root@elastic-server ~]# cat >> /etc/elasticsearch/elasticsearch.yml << EOF

    # Unbind to a specific IP:
    network.host: 0.0.0.0
    discovery.seed_hosts: ["172.30.0.20"]

    # Transport layer
    xpack.security.transport.ssl.enabled: true
    xpack.security.transport.ssl.verification_mode: certificate
    xpack.security.transport.ssl.key: /etc/elasticsearch/certs/elasticsearch.key
    xpack.security.transport.ssl.certificate: /etc/elasticsearch/certs/elasticsearch.crt
    xpack.security.transport.ssl.certificate_authorities: [ "/etc/elasticsearch/certs/ca/ca.crt" ]

    # HTTP layer
    xpack.security.http.ssl.enabled: true
    xpack.security.http.ssl.verification_mode: certificate
    xpack.security.http.ssl.key: /etc/elasticsearch/certs/elasticsearch.key
    xpack.security.http.ssl.certificate: /etc/elasticsearch/certs/elasticsearch.crt
    xpack.security.http.ssl.certificate_authorities: [ "/etc/elasticsearch/certs/ca/ca.crt" ]
    EOF

3. Restart the service:

.. code-block:: console

    # systemctl restart elasticsearch

Configure SSL in Kibana
:::::::::::::::::::::::

1. Create the directory ``/etc/kibana/certs``, then copy the certificate
   authorities, the certificate and the key there.

.. code-block:: console

    # mkdir /etc/kibana/certs/ca -p
    # cp /usr/share/elasticsearch/ca/ca.crt /etc/kibana/certs/ca
    # cp /usr/share/elasticsearch/kibana/kibana.crt /etc/kibana/certs
    # cp /usr/share/elasticsearch/kibana/kibana.key /etc/kibana/certs
    # chown -R kibana: /etc/kibana/certs
    # chmod -R 770 /etc/kibana/certs

2. Add the proper settings in ``/etc/kibana/kibana.yml``.

.. code-block:: console

    [root@elastic-server ~]# cat >> /etc/kibana/kibana.yml << EOF

    # Elasticsearch from/to Kibana
    elasticsearch.hosts: ["https://172.30.0.20:9200"]
    elasticsearch.ssl.certificateAuthorities: ["/etc/kibana/certs/ca/ca.crt"]
    elasticsearch.ssl.certificate: "/etc/kibana/certs/kibana.crt"
    elasticsearch.ssl.key: "/etc/kibana/certs/kibana.key"

    # Browser from/to Kibana
    server.ssl.enabled: true
    server.ssl.certificate: "/etc/kibana/certs/kibana.crt"
    server.ssl.key: "/etc/kibana/certs/kibana.key"
    EOF

3. Restart the service:

.. code-block:: console

    # systemctl restart kibana

Configure SSL for Filebeat
::::::::::::::::::::::::::

1. We must now copy the generated certificate, private key and CA from the Elastic server to the Wazuh
   Manager. In order to do so, you may place the ``Wazuh_Lab.pem`` file in your
   Elastic Server:

  a. Using scp from Linux:

   .. code-block:: console

      # scp -i Wazuh_Lab.pem Wazuh_Lab.pem centos@N.N.N.N:

   Where N.N.N.N must be replaced with the Elastic IP address of your Elastic Server.

  b. Alternatively you may copy and paste the content of this file onto this file
     on the Elasticsearch instance.

2. Now copy the SSL files from the Elastic Server onto the Wazuh Manager

   .. code-block:: console

      [root@elastic-server ~]# scp -i /home/centos/Wazuh_Lab.pem /usr/share/elasticsearch/ca/ca.crt /usr/share/elasticsearch/wazuh-manager/wazuh-manager.* centos@172.30.0.10:


3. From the Wazuh Manager instance, create the directory ``/etc/filebeat/certs``,
   then copy the certificate authorities, the certificate and the key there.

  .. code-block:: console

      [root@wazuh-manager ~]# mkdir /etc/filebeat/certs/ca -p
      [root@wazuh-manager ~]# mv /home/centos/ca.crt /etc/filebeat/certs/ca
      [root@wazuh-manager ~]# mv /home/centos/wazuh-manager.crt /etc/filebeat/certs
      [root@wazuh-manager ~]# mv /home/centos/wazuh-manager.key /etc/filebeat/certs
      [root@wazuh-manager ~]# chmod 770 -R /etc/filebeat/certs

4. Add the proper settings in ``/etc/filebeat/filebeat.yml``.

  .. code-block:: console

      [root@wazuh-manager ~]# sed -i "s#http://##g" /etc/filebeat/filebeat.yml
      [root@wazuh-manager ~]# cat >> /etc/filebeat/filebeat.yml << EOF
      output.elasticsearch.protocol: https
      output.elasticsearch.ssl.certificate: "/etc/filebeat/certs/wazuh-manager.crt"
      output.elasticsearch.ssl.key: "/etc/filebeat/certs/wazuh-manager.key"
      output.elasticsearch.ssl.certificate_authorities: ["/etc/filebeat/certs/ca/ca.crt"]
      EOF

.. note::

    You can test Filebeat output using ``filebeat test output``.

5. Restart the service:

  .. code-block:: console

      # systemctl restart filebeat

Adding authentication for Elasticsearch
---------------------------------------

X-Pack security also provides authentication within each component. The credentials
are configured in the Elastic Server using Elasticsearch directly.

1. Add ``xpack.security.enabled`` to ``/etc/elasticsearch/elasticsearch.yml``.

  .. code-block:: console

      [root@elastic-server ~]# echo 'xpack.security.enabled: true' >> /etc/elasticsearch/elasticsearch.yml

2. Restart Elasticsearch and wait for the service to be ready.

  .. code-block:: console

      [root@elastic-server ~]# systemctl restart elasticsearch


3. When Elasticsearch finishes restarting, generate credentials for all the Elastic Stack pre-built roles and users.

  .. code-block:: console

      [root@elastic-server ~]# /usr/share/elasticsearch/bin/elasticsearch-setup-passwords interactive

4. When prompted confirm you wish to continue and provide a password. Then
   provide a password for each one of the components as prompted.

5. Restart Elasticsearch and wait for the service to be ready.

  .. code-block:: console

      [root@elastic-server ~]# systemctl restart elasticsearch

6. Set up credentials for Kibana by adding the following lines to
   ``/etc/kibana/kibana.yml``:

  .. code-block:: console

      [root@elastic-server ~]# cat >> /etc/kibana/kibana.yml << EOF

      xpack.security.enabled: true
      elasticsearch.username: "elastic"
      elasticsearch.password: "password_provided_for_elastic"
      EOF


Note that you may use the "elastic" user and the password you configured for it in the previous step.

7. Restart Kibana.

  .. code-block:: console

      [root@elastic-server ~]# systemctl restart kibana

8. Set up credentials for Filebeat on the Wazuh server by adding the following
   lines to ``/etc/filebeat/filebeat.yml``.

  .. code-block:: console

      [root@wazuh-manager ~]# cat >> /etc/filebeat/filebeat.yml << EOF

      output.elasticsearch.username: "elastic"
      output.elasticsearch.password: "password_provided_for_elastic"
      EOF

9. Restart Filebeat

  .. code-block:: console

      [root@wazuh-manager ~]# systemctl restart filebeat

Log in to Kibana to verify it is working
------------------------------------------------

1. Now use your local web browser to surf to ``https://SERVER_IP`` where SERVER_IP
   is the Elastic IP address assigned to your Elastic Server instance.  Bypass the
   security warnings caused by the fact that we are using a self-signed
   certificate.  You should then be prompted to authenticate with the
   "elastic" username, and the password you just created.

.. thumbnail:: ../../images/learning-wazuh/build-lab/xpack-login.png
  :align: center
  :width: 100%
