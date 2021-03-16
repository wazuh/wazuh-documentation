.. Copyright (C) 2021 Wazuh, Inc.

* Move to the installation location and create the certificates directory:

  .. code-block:: console

    # mkdir /etc/elasticsearch/certs

* Download the Wazuh certificates tool and the configuration file:

  .. code-block:: console

    # curl -so ~/wazuh-cert-tool.sh https://raw.githubusercontent.com/wazuh/wazuh-documentation/3364-Unattended_improvements/resources/open-distro/tools/certificate-utility/wazuh-cert-tool.sh
    # curl -so ~/instances.yml https://raw.githubusercontent.com/wazuh/wazuh-documentation/3364-Unattended_improvements/resources/open-distro/tools/certificate-utility/instances_aio.yml

* Run the script to generate the certificates:

  .. code-block:: console

    #  bash ~/wazuh-cert-tool.sh

* Copy the certificates into the Elasticsearch location

  .. code-block:: console

    # cp ~/certs/elasticsearch* /etc/elasticsearch/certs/
    # cp ~/certs/root-ca.pem /etc/elasticsearch/certs/
    # cp ~/certs/admin* /etc/elasticsearch/certs/

.. End of include file
