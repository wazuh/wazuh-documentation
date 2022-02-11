.. Copyright (C) 2022 Wazuh, Inc.

* Download the ``wazuh-cert-tool.sh``:

  .. code-block:: console

    # curl -so ~/wazuh-cert-tool.sh https://packages.wazuh.com/resources/4.2/open-distro/tools/certificate-utility/wazuh-cert-tool.sh
    # curl -so ~/instances.yml https://packages.wazuh.com/resources/4.2/open-distro/tools/certificate-utility/instances_aio.yml

* Run the  ``wazuh-cert-tool.sh`` to create the certificates:

  .. code-block:: console

    #  bash ~/wazuh-cert-tool.sh

* Move the Elasticsearch certificates to their corresponding location:

  .. code-block:: console

    # mkdir /etc/elasticsearch/certs/
    # mv ~/certs/elasticsearch* /etc/elasticsearch/certs/
    # mv ~/certs/admin* /etc/elasticsearch/certs/
    # cp ~/certs/root-ca* /etc/elasticsearch/certs/

.. End of include file
