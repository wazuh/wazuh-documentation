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

        # wget https://raw.githubusercontent.com/wazuh/wazuh/new-documentation-templates/extensions/searchguard/search-guard.yml      

    .. group-tab:: Wazuh multi-node cluster

     #. tab2


  After downloading the configuration file, replace the value ``<elasticsearch_IP>`` with the corresponding Elasticsearch's IP.

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
