.. Copyright (C) 2021 Wazuh, Inc.

* Download the Search Guard offline TLS tool to create the certificates:

  .. code-block:: console

    # curl -so ~/wazuh-cert-tool.sh https://raw.githubusercontent.com/wazuh/wazuh-documentation/3128-Certificate_tool/resources/open-distro/tools/certificate-utility/wazuh-cert-tool.sh
    # curl -so ~/instances.yml https://raw.githubusercontent.com/wazuh/wazuh-documentation/3128-Certificate_tool/resources/open-distro/tools/certificate-utility/instances_aio.yml

* Run the Wazuh Cert Tool to create the certificates:

  .. code-block:: console

    #  bash ~/wazuh-cert-tool.sh

* Move the Elasticsearch certificates to their corresponding location:

  .. code-block:: console

    # mkdir /etc/elasticsearch/certs/
    # mv ~/certs/elasticsearch* /etc/elasticsearch/certs/
    # mv ~/certs/admin* /etc/elasticsearch/certs/
    # cp ~/certs/root-ca* /etc/elasticsearch/certs/

.. End of include file
