.. Copyright (C) 2020 Wazuh, Inc.

.. _xpack_security:

X-Pack
======

Elastic Stack security features give the right access to the right people. IT, operations, and application teams rely on them to manage well-intended users and keep malicious actors at bay, while executives and customers can rest easy knowing data stored in the Elastic Stack is safe and secure.

Configure Elastic Stack to use encrypted connections
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

This section describes how to secure the communications between the involved components, adding an SSL layer.

1. Create the file ``/usr/share/elasticsearch/instances.yml`` and fill it with the instances you want to secure.

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

2. Create the certificates using the `elasticsearch-certutil <https://www.elastic.co/guide/en/elasticsearch/reference/current/certutil.html>`_ tool. The ``--keep-ca-key`` modifier may be used in order to keep the CA's certificate and key files, in the case of future expansions these files may be used to sign certificates for new servers. If this modifier is not used, these files will be deleted and any future certificates will require a new CA, in consequence the previous certificates will no longer be valid and will need to be redistributed. It is important that the ``ca.key`` file be properly secured.

.. code-block:: console

    # /usr/share/elasticsearch/bin/elasticsearch-certutil cert --pem --in instances.yml --out certs.zip --keep-ca-key

.. code-block:: none
    :class: output

    certs.zip
    |-- ca
    |   |-- ca.crt
        |-- ca.key
    |-- wazuh-manager
    |   |-- wazuh-manager.crt
    |   |-- wazuh-manager.key
    |-- elasticsearch
    |   |-- elasticsearch.crt
    |   |-- elasticsearch.key
    |-- kibana
        |-- kibana.crt
        |-- kibana.key

3. Extract the generated ``/usr/share/elasticsearch/certs.zip`` file from the previous step. You can use ``unzip``:

.. code-block:: console

    # unzip /usr/share/elasticsearch/certs.zip -d /usr/share/elasticsearch/

.. note::

    The ``ca.crt`` file is shared for all the instances. The ``.crt`` and ``.key`` pairs are unique for each instance.

**Configure the Elasticsearch instance**


1. Create the directory ``/etc/elasticsearch/certs``, then copy the certificate authorities, the certificate and the key there.

.. note::

    The following commands are assuming a single-host installation, if the components are distributed each file should be distributed to its components (via scp or other available means).


.. code-block:: console

    # mkdir /etc/elasticsearch/certs/ca -p
    # cp ca/ca.crt /etc/elasticsearch/certs/ca
    # cp elasticsearch/elasticsearch.crt /etc/elasticsearch/certs
    # cp elasticsearch/elasticsearch.key /etc/elasticsearch/certs
    # chown -R elasticsearch: /etc/elasticsearch/certs
    # chmod -R 770 /etc/elasticsearch/certs

2. Add the proper settings for both the transport and the HTTP layers in ``/etc/elasticsearch/elasticsearch.yml``.

.. code-block:: yaml

    xpack.security.transport.ssl.enabled: true
    xpack.security.transport.ssl.verification_mode: certificate
    xpack.security.transport.ssl.key: /etc/elasticsearch/certs/elasticsearch.key
    xpack.security.transport.ssl.certificate: /etc/elasticsearch/certs/elasticsearch.crt
    xpack.security.transport.ssl.certificate_authorities: [ "/etc/elasticsearch/certs/ca/ca.crt" ]

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
    # cp ca/ca.crt /etc/filebeat/certs/ca
    # cp wazuh-manager/wazuh-manager.crt /etc/filebeat/certs
    # cp wazuh-manager/wazuh-manager.key /etc/filebeat/certs
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
    # cp ca/ca.crt /etc/kibana/certs/ca
    # cp kibana/kibana.crt /etc/kibana/certs
    # cp kibana/kibana.key /etc/kibana/certs
    # chown -R kibana: /etc/kibana/certs
    # chmod -R 770 /etc/kibana/certs

2. Add the proper settings in ``/etc/kibana/kibana.yml``.

.. code-block:: yaml

    elasticsearch.hosts: ["https://10.0.0.3:9200"]
    elasticsearch.ssl.certificateAuthorities: ["/etc/kibana/certs/ca/ca.crt"]
    elasticsearch.ssl.certificate: "/etc/kibana/certs/kibana.crt"
    elasticsearch.ssl.key: "/etc/kibana/certs/kibana.key"

    server.ssl.enabled: true
    server.ssl.certificate: "/etc/kibana/certs/kibana.crt"
    server.ssl.key: "/etc/kibana/certs/kibana.key"

3. Restart the service:

.. code-block:: console

    # systemctl restart kibana

In order to establish HTTPS communication between the browser and Kibana, go to the browser's settings and import the ``ca.crt`` extracted from the .zip file.


Adding authentication for Elasticsearch
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

1. Add the next line to ``/etc/elasticsearch/elasticsearch.yml``.

.. code-block:: yaml

    xpack.security.enabled: true

2. Restart Elasticsearch and wait for the service to be ready.

.. code-block:: console

    # systemctl restart elasticsearch


3. Generate credentials for all the Elastic Stack pre-built roles and users.

.. code-block:: console

    # /usr/share/elasticsearch/bin/elasticsearch-setup-passwords auto

4. Note down at least the password for the ``elastic`` user.
5. Setting up credentials for Filebeat. Add the next two lines to ``/etc/filebeat/filebeat.yml``.

.. code-block:: yaml

    output.elasticsearch.username: "elastic"
    output.elasticsearch.password: "password_generated_for_elastic"

6. Restart Filebeat.

.. code-block:: console

    # systemctl restart filebeat

7. Setting up credentials for Kibana. Add the next lines to ``/etc/kibana/kibana.yml``.

.. code-block:: yaml

    xpack.security.enabled: true
    elasticsearch.username: "elastic"
    elasticsearch.password: "password_generated_for_elastic"

8. Restart Kibana.

.. code-block:: console

    # systemctl restart kibana

You may now login to your Kibana web interface and use the elastic user credentials to login:

.. thumbnail:: ../../../images/protect-elastic-stack/xpack-login.png
  :align: center
  :width: 100%
