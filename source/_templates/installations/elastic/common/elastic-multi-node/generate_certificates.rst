.. Copyright (C) 2020 Wazuh, Inc.

* Move to the installation location and create the certificates directory:

  .. code-block:: console

    # mkdir /etc/elasticsearch/certs
    # cd /etc/elasticsearch/certs

* Download the `Search Guard offline TLS tool <https://docs.search-guard.com/latest/offline-tls-tool>`_ to create the certificates:

  .. code-block:: console

    # curl -so /etc/elasticsearch/certs/search-guard-tlstool-1.8.zip https://maven.search-guard.com/search-guard-tlstool/1.8/search-guard-tlstool-1.8.zip

* Extract the downloaded file. It is assumed that it has been downloaded in ``/etc/elasticsearch/certs``:

  .. code-block:: console

    # unzip search-guard-tlstool-1.8.zip -d searchguard

* Download the ``search-guard.yml`` configuration file. Choose either ``Wazuh single-node cluster`` if there is only one Wazuh server, or ``Wazuh multi-node cluster`` in case of having more than one Wazuh servers:

  .. tabs::

    .. group-tab:: Wazuh single-node cluster

      .. code-block:: console

        # curl -so /etc/elasticsearch/certs/searchguard/search-guard.yml https://raw.githubusercontent.com/wazuh/wazuh/new-documentation-templates/extensions/searchguard/multi-node/search-guard.yml


      After downloading the configuration file in ``/etc/elasticsearch/certs/searchguard/search-guard.yml``, replace the values ``<elasticsearch_X_IP>`` with the corresponding Elasticsearch's IPs. More than one IP can be specified (one entry per line):

        .. code-block:: yaml

          nodes:
            - name: node-1
            dn: CN=node-1,OU=Docu,O=Wazuh,L=California,C=ES
            ip:
              - <elasticsearch_X_IP>
            - name: node-2
            dn: CN=node-2,OU=Docu,O=Wazuh,L=California,C=ES
            ip:
              - <elasticsearch_X_IP>
            - name: node-3
            dn: CN=node-3,OU=Docu,O=Wazuh,L=California,C=ES
            ip:
              - <elasticsearch_X_IP>

    .. group-tab:: Wazuh multi-node cluster

      .. code-block:: console

        # curl -so /etc/elasticsearch/certs/searchguard/search-guard.yml https://raw.githubusercontent.com/wazuh/wazuh/new-documentation-templates/extensions/searchguard/multi-node/search-guard-multi-node.yml


      After downloading the configuration file, replace the values ``<elasticsearch_X_IP>`` with the corresponding Elasticsearch's IPs in the file ``/etc/elasticsearch/certs/searchguard/search-guard.yml``. More than one IP can be specified (one entry per line):

        .. code-block:: yaml

          nodes:
            - name: node-1
            dn: CN=node-1,OU=Docu,O=Wazuh,L=California,C=ES
            ip:
              - <elasticsearch_X_IP>
            - name: node-2
            dn: CN=node-2,OU=Docu,O=Wazuh,L=California,C=ES
            ip:
              - <elasticsearch_X_IP>
            - name: node-3
            dn: CN=node-3,OU=Docu,O=Wazuh,L=California,C=ES
            ip:
              - <elasticsearch_X_IP>

      There should be added as many ``filebeat-X`` sections as Wazuh servers will be involved in the installation:

        .. code-block:: yaml

          - name: filebeat-1
            dn: CN=filebeat-1,OU=Docu,O=Wazuh,L=California,C=ES
          - name: filebeat-2
            dn: CN=filebeat-2,OU=Docu,O=Wazuh,L=California,C=ES


  To learn more about how to create and configure the certificates visit the :ref:`Certificates deployment section <user_manual_certificates>`.

* Run the Search Guard's script to create the certificates:

  .. code-block:: console

    # ./searchguard/tools/sgtlstool.sh -c ./searchguard/search-guard.yml -ca -crt -t /etc/elasticsearch/certs/
    # mv /etc/elasticsearch/certs/node-1.pem /etc/elasticsearch/certs/elasticsearch.pem
    # mv /etc/elasticsearch/certs/node-1.key /etc/elasticsearch/certs/elasticsearch.key
    # mv /etc/elasticsearch/certs/node-1_http.pem /etc/elasticsearch/certs/elasticsearch_http.pem
    # mv /etc/elasticsearch/certs/node-1_http.key /etc/elasticsearch/certs/elasticsearch_http.key

  In case of further certificates deployments, it is highly recommended to keep Search Guard's TLS offline tool and its configuration file ``search-guard.yml`` on the master node.

* Compress all the necessary files to be sent to the rest of the involved parts:

  .. code-block:: console

    # tar -cf certs.tar *
    # tar --delete -f certs.tar 'searchguard'

* Copy ``certs.tar`` to all the servers of the distributed deployment. This can be done by using, for example, ``scp``. 

* Once the certificates have been deployed into their corresponding destination, they can be removed from the Elasticsearch's server:

  .. code-block:: console

    # rm /etc/elasticsearch/certs/client-certificates.readme /etc/elasticsearch/certs/elasticsearch_elasticsearch_config_snippet.yml search-guard-tlstool-1.7.zip filebeat* node-* -f

.. End of include file
