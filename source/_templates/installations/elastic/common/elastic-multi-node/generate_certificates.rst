.. Copyright (C) 2021 Wazuh, Inc.

#. Move to the installation location and create the certificates directory:

    .. code-block:: console

      # mkdir /etc/elasticsearch/certs
      # cd /etc/elasticsearch/certs

#. Download the Search Guard offline TLS tool to create the certificates:

    .. code-block:: console

      # curl -so ~/search-guard-tlstool-1.8.zip https://maven.search-guard.com/search-guard-tlstool/1.8/search-guard-tlstool-1.8.zip

#. Extract the downloaded file. It is assumed that it has been downloaded in ``~/`` (home directory):

    .. code-block:: console

      # unzip ~/search-guard-tlstool-1.8.zip -d ~/searchguard

#. Select the Wazuh single-node cluster tab if there is only one Wazuh server or the Wazuh multi-node cluster tab in case of having more than one Wazuh server, and follow the steps:

    .. tabs::

      .. group-tab:: Wazuh single-node cluster

        .. code-block:: console

          # curl -so ~/searchguard/search-guard.yml https://raw.githubusercontent.com/wazuh/wazuh-documentation/3128-Certificate_tool/resources/open-distro/searchguard/multi-node/search-guard.yml


        After downloading the configuration file in ``~/searchguard/search-guard.yml``, replace the values ``<elasticsearch_X_IP>`` and ``<kibana_ip>``  with the corresponding IP addresses. More than one IP can be specified (one entry per line):

          .. code-block:: yaml

            # Nodes certificates
            nodes:
              - name: node-1
                dn: CN=node-1,OU=Docu,O=Wazuh,L=California,C=US
                ip:
                  - <elasticsearch_1_IP>
              - name: node-2
                dn: CN=node-2,OU=Docu,O=Wazuh,L=California,C=US
                ip:
                  - <elasticsearch_2_IP>
              - name: node-3
                dn: CN=node-3,OU=Docu,O=Wazuh,L=California,C=US
                ip:
                  - <elasticsearch_3_IP>
              - name: kibana
                dn: CN=kibana,OU=Docu,O=Wazuh,L=California,C=US      
                ip:
                  - <kibana_ip>   

      .. group-tab:: Wazuh multi-node cluster

        .. code-block:: console

          # curl -so ~/searchguard/search-guard.yml https://raw.githubusercontent.com/wazuh/wazuh-documentation/3128-Certificate_tool/resources/open-distro/searchguard/multi-node/search-guard-multi-node.yml


        After downloading the configuration file, replace the values ``<elasticsearch_X_IP>`` and ``<kibana_ip>``  with the corresponding IP addresses in the file ``~/searchguard/search-guard.yml``. More than one IP can be specified (one entry per line):

          .. code-block:: yaml

            # Nodes certificates
            nodes:
              - name: node-1
                dn: CN=node-1,OU=Docu,O=Wazuh,L=California,C=US
                ip:
                  - <elasticsearch_1_IP>
              - name: node-2
                dn: CN=node-2,OU=Docu,O=Wazuh,L=California,C=US
                ip:
                  - <elasticsearch_2_IP>
              - name: node-3
                dn: CN=node-3,OU=Docu,O=Wazuh,L=California,C=US
                ip:
                  - <elasticsearch_3_IP>
              - name: kibana
                dn: CN=kibana,OU=Docu,O=Wazuh,L=California,C=US      
                ip:
                  - <kibana_ip>   


        There should as many ``filebeat-X`` sections as there are Wazuh servers in the installation:

          .. code-block:: yaml

            - name: filebeat-1
              dn: CN=filebeat-1,OU=Docu,O=Wazuh,L=California,C=US
            - name: filebeat-2
              dn: CN=filebeat-2,OU=Docu,O=Wazuh,L=California,C=US


    To learn more about how to create and configure the certificates, see the :ref:`Certificates deployment <user_manual_certificates>` section.

#. Run the Search Guard script to create the certificates:

    .. code-block:: console

      # ~/searchguard/tools/sgtlstool.sh -c ~/searchguard/search-guard.yml -ca -crt -t /etc/elasticsearch/certs/
      # mv /etc/elasticsearch/certs/node-1.pem /etc/elasticsearch/certs/elasticsearch.pem
      # mv /etc/elasticsearch/certs/node-1.key /etc/elasticsearch/certs/elasticsearch.key
      # mv /etc/elasticsearch/certs/node-1_http.pem /etc/elasticsearch/certs/elasticsearch_http.pem
      # mv /etc/elasticsearch/certs/node-1_http.key /etc/elasticsearch/certs/elasticsearch_http.key

    In case of further certificates deployment, it is highly recommended to keep Search Guard TLS offline tool and its configuration file ``search-guard.yml`` on the master node.

#. Compress all the necessary files to be deployed to all the servers in the distributed deployment:

    .. code-block:: console

      # tar -cf /etc/elasticsearch/certs/certs.tar *

#. Copy ``certs.tar`` to all the instances of the distributed deployment. This can be done by using, for example, ``scp``. 

#. Remove unnecessary files:

    .. code-block:: console

      # rm /etc/elasticsearch/certs/client-certificates.readme /etc/elasticsearch/certs/elasticsearch_elasticsearch_config_snippet.yml search-guard-tlstool-1.7.zip filebeat* node-* -f

#. If Kibana will be installed on this node, keep the certificates file. Otherwise, if the file is already copied to all the instances of the distributed deployment, remove it to increase security  ``rm -f certs.tar``.

.. End of include file
