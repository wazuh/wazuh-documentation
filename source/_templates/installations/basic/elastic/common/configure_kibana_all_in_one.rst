.. Copyright (C) 2015, Wazuh, Inc.

.. code-block:: console

  # curl -so /etc/kibana/kibana.yml https://packages.wazuh.com/4.5/tpl/elastic-basic/kibana_all_in_one.yml

Edit the ``/etc/kibana/kibana.yml`` file:

.. code-block:: yaml

    elasticsearch.password: <elasticsearch_password>

Values to be replaced:

- ``<elasticsearch_password>``: the password generated during the Elasticsearch installation and configuration for the ``elastic`` user.

.. End of configure_kibana.rst
