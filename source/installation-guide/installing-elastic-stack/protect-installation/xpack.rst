.. Copyright (C) 2019 Wazuh, Inc.

.. _xpack_security:

X-Pack
======

Elastic Stack security features give the right access to the right people. IT, operations, and application teams rely on them to manage well-intentioned users and keep malicious actors at bay, while executives and customers can rest easy knowing data stored in the Elastic Stack is safe and secure.

Adding authentication for Elasticsearch
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

1. Add the next lines to ``/etc/elasticsearch/elasticsearch.yml``.

.. code-block:: yaml

    xpack.security.enabled: true
    xpack.security.transport.ssl.enabled: true

2. Restart Elasticsearch.

.. code-block:: console

    # systemctl restart elasticsearch

3. Generate credentials for all the Elastic Stack pre-built roles and users.

.. code-block:: console

    # /usr/share/elasticsearch/bin/elasticsearch-setup-passwords auto

4. Note down at least the password for the ``elastic`` user.
5. Setting up credentials for Filebeat. Add the next two lines to ``/etc/filebeat/filebeat.yml``.

.. code-block:: yaml

    output.elasticsearch.username: "elastic"
    output.elasticsearch.password: "elastic_password"

6. Restart Filebeat.

.. code-block:: console

    # systemctl restart filebeat

6. Setting up credentials for Kibana. Add the next lines to ``/etc/kibana/kibana.yml``.

.. code-block:: yaml

    xpack.security.enabled: true
    elasticsearch.username: "elastic"
    elasticsearch.password: "elastic_password"

Configure Elastic Stack to use encrypted connections 
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

This section describes how to secure the communications between the involved components, adding an SSL layer.

1. Create a file named ``instances.yml`` and fill it with the instances you want to secure.

.. code-block:: yaml

    instances:
        - name: "wazuh-manager"
          ip:
            - "10.0.0.2"
        - name: "elasticsearch"
          ip:
            - "10.0.0.3"
        - name: "kibana"
          ip:
            - "10.0.0.4"

2. Create the certificates using the `elasticsearch-certutil <https://www.elastic.co/guide/en/elasticsearch/reference/current/certutil.html>`_ tool. 

.. code-block:: console

    # /usr/share/elasticsearch/bin/elasticsearch-certutil cert ca --pem --in instances.yml --out certs.zip

3. Extract the generated file named ``certs.zip`` from the previous step.

.. code-block:: console

    certs/
    |-- ca
    |   |-- ca.crt
    |-- wazuh-manager
    |   |-- wazuh-manager.crt
    |   |-- wazuh-manager.key
    |-- elasticsearch
    |   |-- elasticsearch.crt
    |   |-- elasticsearch.key
    |-- kibana
        |-- kibana.crt
        |-- kibana.key

.. note::

    The ``ca.crt`` file is shared for all the instances. The ``.crt`` and ``.key`` pairs are unique for each instance.

**Configure the Elasticsearch instance**

1. Create the directory ``/etc/elasticsearch/certs``, then copy the certificate authorities, the certificate and the key there.

.. code-block:: console

    # mkdir /etc/elasticsearch/certs/ca -p
    # cp certs/ca/ca.crt /etc/elasticsearch/certs/ca
    # cp certs/elasticsearch/elasticsearch.crt /etc/elasticsearch/certs
    # cp certs/elasticsearch/elasticsearch.key /etc/elasticsearch/certs
    # chown -R elasticsearch: /etc/elasticsearch/certs
    # chmod -R 770 /etc/elasticsearch/certs

2. Add the proper settings for both the transport and the HTTP layers in ``/etc/elasticsearch/elasticsearch.yml``.

.. code-block:: yaml

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

3. Restart the service:

.. code-block:: console

    # systemctl restart elasticsearch

**Configure the Filebeat instance (Wazuh manager instance)**

1. Create the directory ``/etc/filebeat/certs``, then copy the certificate authorities, the certificate and the key there.

.. code-block:: console

    # mkdir /etc/filebeat/certs/ca -p
    # cp certs/ca/ca.crt /etc/filebeat/certs/ca
    # cp certs/wazuh-manager/wazuh-manager.crt /etc/filebeat/certs
    # cp certs/wazuh-manager/wazuh-manager.key /etc/filebeat/certs
    # chmod 770 -R /etc/filebeat/certs

2. Add the proper settings in ``/etc/filebeat/filebeat.yml``.

.. code-block:: yaml

    output.elasticsearch.hosts: ['10.0.0.3:9200']
    output.elasticsearch.protocol: https
    output.elasticsearch.ssl.certificate: "/etc/filebeat/certs/wazuh-manager.crt"
    output.elasticsearch.ssl.key: "/etc/filebeat/certs/wazuh-manager.key"
    output.elasticsearch.ssl.certificate_authorities: ["/etc/filebeat/certs/ca/ca.crt"]

.. note::

    You can test Filebeat output using ``filebeat test output``.

3. Restart the service:

.. code-block:: console

    # systemctl restart filebeat

**Configure the Kibana instance**

1. Create the directory ``/etc/kibana/certs``, then copy the certificate authorities, the certificate and the key there.

.. code-block:: console

    # mkdir /etc/kibana/certs/ca -p
    # cp certs/ca/ca.crt /etc/kibana/certs/ca
    # cp certs/kibana/kibana.crt /etc/kibana/certs
    # cp certs/kibana/kibana.key /etc/kibana/certs
    # chown -R kibana: /etc/kibana/certs
    # chmod -R 770 /etc/kibana/certs

2. Add the proper settings in ``/etc/kibana/kibana.yml``.

.. code-block:: yaml

    # Elasticsearch from/to Kibana
    elasticsearch.hosts: ["https://10.0.0.3:9200"]
    elasticsearch.ssl.certificateAuthorities: ["/etc/kibana/certs/ca/ca.crt"]
    elasticsearch.ssl.certificate: "/etc/kibana/certs/kibana.crt"
    elasticsearch.ssl.key: "/etc/kibana/certs/kibana.key"

    # Browser from/to Kibana
    server.ssl.enabled: true
    server.ssl.certificate: "/etc/kibana/certs/kibana.crt"
    server.ssl.key: "/etc/kibana/certs/kibana.key"

3. Restart the service:

.. code-block:: console

    # systemctl restart kibana

.. thumbnail:: ../../../images/protect-elastic-stack/xpack-login.png
  :align: center
  :width: 100%