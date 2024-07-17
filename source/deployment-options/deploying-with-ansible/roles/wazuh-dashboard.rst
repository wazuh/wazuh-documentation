.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how to use a preconfigured role to install the Wazuh dashboard and customize the installation with different variables in this section.

Wazuh dashboard
---------------

This role deploys the Wazuh dashboard. You can customize the installation with the following variables:

-  ``indexer_network_host``: This defines the Elasticsearch node IP address (default: ``127.0.0.1``).
-  ``indexer_http_port``: This defines the Elasticsearch node listening port (default: ``9200``).
-  ``dashboard_server_host``: This defines the Wazuh dashboard listening node address (default: ``0.0.0.0``).

To use the role in a playbook, a YAML file ``wazuh-dashboard.yml`` can be created with the contents below:

.. code-block:: yaml

   - hosts: dashboard
     roles:
       - wazuh-dashboard

Custom variable definitions for different environments can be set. For example:

-  For a production environment, the variables can be saved in ``vars-production.yml``:

   .. code-block:: yaml

      indexer_network_host: '<WAZUH_INDEXER_PROD_IP_ADDRESS>'

-  For a development environment, the variables can be saved in ``vars-development.yml``:

   .. code-block:: yaml

      indexer_network_host: '<WAZUH_INDEXER_DEV_IP_ADDRESS>'

To run the playbook for a specific environment, the command below is run:

.. code-block:: console

   $ ansible-playbook wazuh-dashboard.yml -e@vars-production.yml

The example above will install the Wazuh dashboard and configure ``<WAZUH_INDEXER_PROD_IP_ADDRESS>`` as the Indexer node.

Please review the :ref:`variable references <wazuh_ansible_reference_dashboard>` section to see all variables available for this role.
