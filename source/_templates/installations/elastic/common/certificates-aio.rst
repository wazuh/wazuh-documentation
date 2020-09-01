.. Copyright (C) 2020 Wazuh, Inc.

* Move to the installation location and create the certificates directory:

  .. code-block:: console

    # mkdir /etc/elasticsearch/certs
    # cd /etc/elasticsearch/certs

* Download the Search Guard offline TLS tool to create the certificates:

  .. code-block:: console

    # curl -so /etc/elasticsearch/certs/search-guard-tlstool-1.8.zip https://maven.search-guard.com/search-guard-tlstool/1.8/search-guard-tlstool-1.8.zip

* Extract the downloaded file. It is assumed that it has been downloaded in ``/etc/elasticsearch/certs``:

  .. code-block:: console

    # unzip search-guard-tlstool-1.8.zip -d searchguard

* Download the ``search-guard.yml`` configuration file. This file is pre-configured to generate all the necessary certificates:

  .. code-block:: console

      # curl -so /etc/elasticsearch/certs/searchguard/search-guard.yml https://raw.githubusercontent.com/wazuh/wazuh-documentation/2205-Open_Distro_installation/resources/open-distro/searchguard/search-guard-aio.yml

* Run the Search Guard's script to create the certificates:

  .. code-block:: console

    #  /etc/elasticsearch/certs/searchguard/tools/sgtlstool.sh -c /etc/elasticsearch/certs/searchguard/search-guard.yml -ca -crt -t /etc/elasticsearch/certs/


* Once the certificates have been created, remove the unnecessary files:

  .. code-block:: console

    # rm /etc/elasticsearch/certs/client-certificates.readme /etc/elasticsearch/certs/elasticsearch_elasticsearch_config_snippet.yml search-guard-tlstool-1.7.zip -f

.. End of include file
