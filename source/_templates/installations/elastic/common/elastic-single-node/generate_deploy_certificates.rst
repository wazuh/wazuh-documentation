.. Copyright (C) 2020 Wazuh, Inc.

#. Move to the installation location and create the certificates directory:

  .. code-block:: console

    # mkdir /etc/elasticsearch/certs
    # cd /etc/elasticsearch/certs

#. Download the `Search Guard offline TLS tool <https://docs.search-guard.com/latest/offline-tls-tool>`_ to create the certificates:

  .. code-block:: console

    # wget https://releases.floragunn.com/search-guard-tlstool/1.7/search-guard-tlstool-1.7.zip

#. Extract the downloaded file. It is assumed that it has been downloaded in ``/etc/elasticsearch/certs``:

  .. code-block:: console

    # unzip search-guard-tlstool-1.7.zip -d searchguard

#. Download the ``search-guard.yml`` configuration file. Choose either ``Wazuh single-node cluster`` if there is only one Wazuh server, or ``Wazuh multi-node cluster`` in case of having more than one Wazuh servers:

  .. tabs::

    .. group-tab:: Wazuh single-node cluster

      .. code-block:: console

        # curl -so /etc/elasticsearch/certs/searchguard/search-guard.yml https://raw.githubusercontent.com/wazuh/wazuh/new-documentation-templates/extensions/searchguard/single-node/search-guard.yml


      After downloading the configuration file in ``/etc/elasticsearch/certs/searchguard/search-guard.yml``, replace the value ``<elasticsearch_IP>`` with the corresponding Elasticsearch's IP. There can be indicated more than one IP, setting one per line:

        .. code-block:: yaml

          nodes:
            - name: elasticsearch
            dn: CN=node-1,OU=Docu,O=Wazuh,L=California,C=ES
            ip:
              - <elasticsearch_IP>

    .. group-tab:: Wazuh multi-node cluster

      .. code-block:: console

        # curl -so /etc/elasticsearch/certs/searchguard/search-guard.yml https://raw.githubusercontent.com/wazuh/wazuh/new-documentation-templates/extensions/searchguard/single-node/search-guard-multi-node.yml


      After downloading the configuration file, replace the value ``<elasticsearch_IP>`` with the corresponding Elasticsearch's IP. There can be indicated more than one IP, setting one per line:

        .. code-block:: yaml

          nodes:
            - name: elasticsearch
            dn: CN=node-1,OU=Docu,O=Wazuh,L=California,C=ES
            ip:
              - <elasticsearch_IP>

      There should be added as many ``filebeat-X`` sections as Wazuh servers will be involved in the installation:

        .. code-block:: yaml

          - name: filebeat-1
            dn: CN=filebeat-1,OU=Docu,O=Wazuh,L=California,C=ES
          - name: filebeat-2
            dn: CN=filebeat-2,OU=Docu,O=Wazuh,L=California,C=ES


  To learn more about how to create and configure the certificates visit the :ref:`Certificates deployment section <user_manual_certificates>`.

#. Execute the Search Guard's script to create the certificates:

  .. code-block:: console

    # ./searchguard/tools/sgtlstool.sh -c ./searchguard/search-guard.yml -ca -crt -t /etc/elasticsearch/certs/


  In case of further certificates deployments, it is highly recommended to keep Search Guard's TLS offline tool and its configuration file ``search-guard.yml`` on the master node.

#. Compress all the necessary files to be sended to the rest of the involved parts:

  .. code-block:: console

    # tar -cf certs.tar *
    # tar --delete -f certs.tar 'searchguard'

#. Once the certificates have been deployed into their corresponding destination, they can be removed from the Elasticsearch's server:

  .. code-block:: console

    # rm /etc/elasticsearch/certs/client-certificates.readme /etc/elasticsearch/certs/elasticsearch_elasticsearch_config_snippet.yml search-guard-tlstool-1.7.zip filebeat*

.. End of include file
