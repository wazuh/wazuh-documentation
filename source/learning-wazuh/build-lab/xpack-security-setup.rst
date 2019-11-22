.. Copyright (C) 2019 Wazuh, Inc.
  
.. _build_lab_xpack-security-setup:

Configure X-Pack Security
=========================

Since your Wazuh Server and Elastic Server instances are on separate servers, it
is important to configure SSL encryption and verification between Filebeat and
Elasticsearch. And since your Kibana is exposed to the World Wide Web it is
important to add authentication to access it.


Setting up SSL for Elastic Stack
--------------------------------


1. Create the file ``/usr/share/elasticsearch/instances.yml`` and fill it with 
   the instances you want to secure.

.. code-block:: console

    # cat > /usr/share/elasticsearch/instances.yml << EOF
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

2. Create the certificates using the `elasticsearch-certutil 
   <https://www.elastic.co/guide/en/elasticsearch/reference/current/certutil.html>`_ tool.

.. code-block:: console

    # /usr/share/elasticsearch/bin/elasticsearch-certutil cert ca --pem --in instances.yml --out certs.zip


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

    # cat >> /etc/elasticsearch/elasticsearch.yml << EOF

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

    # cat >> /etc/kibana/kibana.yml << EOF
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

1. We must now copy the certificate files from the Elastic server to the Wazuh 
   Manager. In order to do so you may place the ``WazuhLab.pem`` file in your 
   Elastic Server:

  a. Using scp from Linux:

   .. code-block:: console

      # scp -i WazuhLab.pem WazuhLab.pem centos@1.2.3.4:
   
   Where 1.2.3.4 should be replaced with the Elastic IP of your Elastic Server.

  b. Alternatively you may copy and paste the contents of this file onto this file 
     on the Elastic server. 

2. Now copy the SSL files from the Elastic Server onto the Wazuh Manager

   .. code-block:: console

      # scp -i /home/centos/WazuhLab.pem /usr/share/elasticsearch/ca/ca.crt /usr/share/elasticsearch/wazuh-manager/wazuh-manager.* centos@172.30.0.10:


3. From the Wazuh Manager instance, create the directory ``/etc/filebeat/certs``,
   then copy the certificate authorities, the certificate and the key there.

.. code-block:: console

    # mkdir /etc/filebeat/certs/ca -p
    # mv /home/centos/ca.crt /etc/filebeat/certs/ca
    # mv /home/centos/wazuh-manager.crt /etc/filebeat/certs
    # mv /home/centos/wazuh-manager.key /etc/filebeat/certs
    # chmod 770 -R /etc/filebeat/certs

4. Add the proper settings in ``/etc/filebeat/filebeat.yml``.

.. code-block:: console
    
    # sed "s#http://##g" /etc/filebeat/filebeat.yml
    # cat >> /etc/filebeat/filebeat.yml << EOF
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

1. Add ``x.pack.security.enabled`` to ``/etc/elasticsearch/elasticsearch.yml``.

.. code-block:: console

    # echo 'xpack.security.enabled: true' >> /etc/elasticsearch/elasticsearch.yml

2. Restart Elasticsearch and wait for the service to be ready.

.. code-block:: console

    # systemctl restart elasticsearch


3. Generate credentials for all the Elastic Stack pre-built roles and users.

.. code-block:: console

    # /usr/share/elasticsearch/bin/elasticsearch-setup-passwords interactive

4. When prompted confirm you wish to continue and provide a password. Then
   provide a password for each one of the components as prompted.

5. Set up credentials for Kibana by adding the following lines to 
   ``/etc/kibana/kibana.yml``:

.. code-block:: console

    # cat >> /etc/kibana/kibana.yml << EOF

    xpack.security.enabled: true
    elasticsearch.username: "elastic"
    elasticsearch.password: "password_provided_for_elastic"
    EOF
   
   Note that you may use the "elastic" user and the password you configured for
   it in the previous step.

6. Restart Kibana.

   .. code-block:: console

    # systemctl restart kibana

7. Set up credentials for Filebeat on the Wazuh server by adding the following
   lines to ``/etc/filebeat/filebeat.yml``.

.. code-block:: console

    # cat >> /etc/filebeat/filebeat.yml << EOF

    output.elasticsearch.username: "elastic"
    output.elasticsearch.password: "password_generated_for_elastic"
    EOF

8. Restart Filebeat

.. code-block:: console

    # systemctl restart filebeat

Log in to Kibana and connect it to the Wazuh API
------------------------------------------------

1. Now use your local web browser to surf to https://SERVER_IP where SERVER_IP 
   is the Elastic IP assigned to your Elastic Server instance.  Bypass the 
   security warnings caused by the fact that we are using a self-signed 
   certificate.  You should then be prompted to authenticate with the 
   "elastic" username, and the password you just created.

.. thumbnail:: ../../images/learning-wazuh/build-lab/xpack-login.png
  :align: center
  :width: 100%

2. Click on the Wazuh icon on the left.  Fill out the form for connecting to the
   API like below, where the user is "wazuhapiuser", the API password is "wazuhlab"
   the host is "https://172.30.0.10" and the port is "55000":

  .. thumbnail:: ../../images/learning-wazuh/build-lab/kibana-to-api.png
      :title: API Connect
      :align: center
      :width: 75%

4. Click **[Save]** and then click on the Wazuh icon again to bring up the Wazuh
   Kibana App.  It should now be ready to use.
