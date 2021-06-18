.. Copyright (C) 2021 Wazuh, Inc.

* Download the Search Guard offline TLS tool to create the certificates:

  .. code-block:: console

    # curl -so ~/wazuh-cert-tool.sh https://raw.githubusercontent.com/wazuh/wazuh-documentation/3128-Certificate_tool/resources/open-distro/tools/certificate-utility/wazuh-cert-tool.sh
    # curl -so ~/instances_aio.yml https://raw.githubusercontent.com/wazuh/wazuh-documentation/3128-Certificate_tool/resources/open-distro/tools/certificate-utility/instances_aio.yml

* Run the Wazuh Cert Tool to create the certificates:

  .. code-block:: console

    #  ~/wazuh-cert-tool.sh

.. End of include file
