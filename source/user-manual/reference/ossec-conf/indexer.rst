.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description:

.. _reference_ossec_indexer:

indexer
=======

.. topic:: XML section name

   .. code-block:: xml

      <indexer>
      </indexer>

Configure these options to forward inventory data to the Wazuh indexer.

Options
-------

.. contents::
   :local:
   :depth: 1
   :backlinks: none

enabled
^^^^^^^

Enables forwarding inventory data to the Wazuh indexer.

+--------------------+-----------------------------+
| **Default**        | ``yes``                     |
+--------------------+-----------------------------+
| **Allowed values** | ``yes``, ``no``             |
+--------------------+-----------------------------+

hosts
^^^^^

Wazuh indexer nodes to connect to. Use the ``host`` option for setting up each node connection.

host
~~~~

Wazuh indexer node URL or IP address to connect to. For example, ``http://172.16.1.11`` or ``192.168.3.2:9230``.

+--------------------+-----------------------------+
| **Default**        | ``https://0.0.0.0:9200``    |
+--------------------+-----------------------------+
| **Allowed values** | Any valid URL or IP address |
+--------------------+-----------------------------+

ssl
^^^

Configuration options for the SSL parameters.

certificate_authorities
~~~~~~~~~~~~~~~~~~~~~~~

List of root certificate file paths for verification. Use the ``ca`` option for setting up each CA certificate file path.

ca
''

CA certificate file path.

+--------------------+--------------------------------------+
| **Default value**  | ``/etc/filebeat/certs/root-ca.pem``  |
+--------------------+--------------------------------------+
| **Allowed values** | Any valid file path                  |
+--------------------+--------------------------------------+

certificate
~~~~~~~~~~~

The end-entity (leaf) certificate.

+--------------------+------------------------------------------------+
| **Default value**  | ``/etc/filebeat/certs/filebeat.pem``           |
+--------------------+------------------------------------------------+
| **Allowed values** | Any valid file path                            |
+--------------------+------------------------------------------------+

key
~~~

The certificate key used for authentication.

+--------------------+----------------------------------------------+
| **Default value**  | ``/etc/filebeat/certs/filebeat-key.pem``     |
+--------------------+----------------------------------------------+
| **Allowed values** | Any valid file path                          |
+--------------------+----------------------------------------------+

Configuration example
---------------------

.. code-block:: xml

   <indexer>
     <enabled>yes</enabled>
     <hosts>
       <host>https://0.0.0.0:9200</host>
     </hosts>
     <ssl>
       <certificate_authorities>
         <ca>/etc/filebeat/certs/root-ca.pem</ca>
       </certificate_authorities>
       <certificate>/etc/filebeat/certs/filebeat.pem</certificate>
       <key>/etc/filebeat/certs/filebeat-key.pem</key>
     </ssl>
   </indexer>