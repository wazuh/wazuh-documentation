.. Copyright (C) 2021 Wazuh, Inc.

* Download the Wazuh cert tool to create the certificates:

  .. code-block:: console

    # curl -so ~/wazuh-cert-tool.sh https://raw.githubusercontent.com/wazuh/wazuh-documentation/4.1/resources/open-distro/tools/certificate-utility/wazuh-cert-tool.sh
    # curl -so ~/instances.yml https://raw.githubusercontent.com/wazuh/wazuh-documentation/4.1/resources/open-distro/tools/certificate-utility/instances_aio.yml

* Run the Wazuh cert Tool to create the certificates:

  .. code-block:: console

    #  bash ~/wazuh-cert-tool.sh

* Move the Elasticsearch certificates to their corresponding location:

  .. code-block:: console

    # mkdir /etc/elasticsearch/certs/
    # mv ~/certs/elasticsearch* /etc/elasticsearch/certs/
    # mv ~/certs/admin* /etc/elasticsearch/certs/
    # cp ~/certs/root-ca* /etc/elasticsearch/certs/

.. End of include file
