.. Copyright (C) 2019 Wazuh, Inc.

#. Install the Kibana package:

    .. include:: /_templates/installation-guide/deb/install_kibana.rst

#. Copy the Elasticsearch certificates into Kibana configuration folder:

    .. include:: /_templates/installation-guide/common/copy_certificates_kibana_aio.rst

#. Configure Kibana:

    .. include:: /_templates/installation-guide/common/configure_kibana_aio.rst

#. Install the Wazuh Kibana plugin:

    .. include:: /_templates/installation-guide/common/install_wazuh_kibana_plugin.rst

#. Enable and start the Kibana service:

    .. include:: /_templates/installation-guide/deb/enable_start_kibana.rst

In order to establish HTTPS communication between the browser and Kibana, go to the browser's settings and import the ``ca.crt`` extracted from the .zip file.

.. note:: The Kibana service listens on the default port 5601.

.. End of kibana_all_in_one_tab.rst
