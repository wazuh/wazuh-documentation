.. Copyright (C) 2020 Wazuh, Inc.

In case of installing Kibana on a separate host where Elasticsearch was installed, new certificates for Kibana should be created. This step must be done on the Elasticsearch master-node where the rest of the certificates were created:


* Modify the ``search-guard.yml`` file placed at ``/etc/elasticsearch/certs/searchguard`` and add the following information at the end of the ``clients`` section:

  .. code-block:: yaml

    - name: kibana
      dn: CN=kibana,OU=Docu,O=Wazuh,L=California,C=ES

* Run the Search Guard’s script to create the certificates:

  .. code-block:: console

    # ./searchguard/tools/sgtlstool.sh -c /etc/elasticsearch/certs/searchguard/search-guard.yml -crt -t /etc/elasticsearch/certs/

* Add the new certificates to the ``certs.tar`` compressed file:

  .. code-block:: console

    # tar -rvf certs.tar kibana.pem kibana.key

Once the certificates have been created, they can be removed from the Elasticsearch master node and added to the ``certs.tar`` file, then it must be copied into the Kibana server, for example, using ``scp``. This guide assumes that the file is placed in ~/ (home user folder):

.. code-block:: console

  # mkdir /etc/kibana/certs
  # mv ~/certs.tar /etc/kibana/certs/
  # cd /etc/kibana/certs/
  # tar -xf certs.tar kibana.pem kibana.key root-ca.pem

.. End of include file
