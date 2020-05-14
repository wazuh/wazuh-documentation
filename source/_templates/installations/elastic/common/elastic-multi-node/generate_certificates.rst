.. Copyright (C) 2020 Wazuh, Inc.

The certificates can be generated as follows:

  #. Move to the installation location and create the certificates directory:

    .. code-block:: console

      # mkdir /etc/elasticsearch/certs
      # cd /etc/elasticsearch/certs

  #. Download the `Search Guard offline TLS tool <https://docs.search-guard.com/latest/offline-tls-tool>`_ to create the certificates
    
    .. code-block:: console

      # wget https://releases.floragunn.com/search-guard-tlstool/1.7/search-guard-tlstool-1.7.zip
      # unzip search-guard-tlstool-1.7.zip -d searchguard

  #. Extract the downloaded file. It is assumed that it has been downloaded in ``/etc/elasticsearch/certs``: 

    .. code-block:: console

      # unzip search-guard-tlstool-1.7.zip -d searchguard

  #. Download the ``search-guard.yml`` configuration file. Choose either ``Wazuh single-node cluster`` if there is only one Wazuh server, or ``Wazuh multi-node cluster`` in case of having more than two Wazuh servers:

  .. tabs::

    .. group-tab:: Wazuh single-node cluster

      .. code-block:: console

        # curl -so /etc/elasticsearch/certs/search-guard.yml https://raw.githubusercontent.com/wazuh/wazuh/new-documentation-templates/extensions/searchguard/multi-node/search-guard.yml

      
      After downloading the configuration file, replace the values ``<elasticsearch_X_IP>`` with the corresponding Elasticsearch's IPs. There can be indicated more than one IP, setting one per line:

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

        # curl -so /etc/elasticsearch/certs/search-guard.yml https://raw.githubusercontent.com/wazuh/wazuh/new-documentation-templates/extensions/searchguard/multi-node/search-guard-multi-node.yml     

      
      After downloading the configuration file, replace the values ``<elasticsearch_X_IP>`` with the corresponding Elasticsearch's IPs. There can be indicated more than one IP, setting one per line:

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

  #. Execute the Search Guard's script to create the certificates:

    .. code-block:: console

      # ./searchguard/tools/sgtlstool.sh -c ./search-guard.yml -ca -crt  

  #. Remove all the unnecessary files:

    .. code-block:: console

      # rm /etc/elasticsearch/certs/client-certificates.readme /etc/elasticsearch/certs/elasticsearch_elasticsearch_config_snippet.yml search-guard-tlstool-1.7.zip

  #. Compress all the necessary files to be sended to the rest of the involved parts:

    .. code-block:: console

      # tar -cf certs.tar *

.. End of include file
