.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Find out how to integrate Wazuh with Opensearch in this integration guide.

OpenSearch integration
======================

`OpenSearch <https://opensearch.org/>`__ is a distributed, community-driven, Apache 2.0-licensed, 100% open source search and analytics suite used for a broad set of use cases like real-time application monitoring, log analytics, and website search. OpenSearch is a fork from Elasticsearch. They have many similarities in configuration and integration steps.

In this guide, you can find out how to integrate Wazuh with OpenSearch in the following ways:

-  `Wazuh indexer integration using Logstash`_
-  `Wazuh server integration using Logstash`_

.. thumbnail:: /images/integrations/integration-diagram-opensearch.png
   :title: OpenSearch integration diagram
   :align: center
   :width: 80%

Wazuh indexer integration using Logstash
----------------------------------------

Perform the steps below on your Logstash server. You must install Logstash on a dedicated server or on the server hosting the third-party indexer. We performed these steps on a Linux operating system. Logstash forwards the data from the Wazuh indexer to OpenSearch in the form of indexes.

Learn more about the :ref:`Wazuh indexer integration <wazuh_indexer_integration>` and its necessary :ref:`considerations <capacity_planning>`.

Installing Logstash
^^^^^^^^^^^^^^^^^^^

Perform the following steps to install Logstash and the required plugins. Ensure your `Logstash and OpenSearch versions are compatible <https://opensearch.org/docs/latest/tools/index/#compatibility-matrices>`__.

#. Follow the Elastic documentation to `install Logstash <https://www.elastic.co/guide/en/logstash/current/installing-logstash.html>`__.
#. Install the `logstash-input-opensearch plugin <https://github.com/opensearch-project/logstash-input-opensearch>`__ and the `logstash-output-opensearch plugin <https://github.com/opensearch-project/logstash-output-opensearch>`__ using the following command. These plugins allow reading the data from the Wazuh indexer into the Logstash pipeline and writing the data into OpenSearch.

   .. code-block:: console

      $ sudo /usr/share/logstash/bin/logstash-plugin install logstash-input-opensearch logstash-output-opensearch

#. Copy the Wazuh indexer and OpenSearch root certificates on the Logstash server.

   .. note::
      
      You can add the certificates to any directory of your choice. For example, we added them in ``/etc/logstash/wazuh-indexer-certs`` and ``/etc/logstash/opensearch-certs`` respectively.

#. Give the ``logstash`` user the necessary permissions to read the copied certificates:

   .. code-block:: console

      $ sudo chmod -R 755 </PATH/TO/LOCAL/WAZUH-INDEXER/CERTIFICATE>/root-ca.pem
      $ sudo chmod -R 755 </PATH/TO/LOCAL/OPENSEARCH/CERTIFICATE>/root-ca.pem

   Replace ``</PATH/TO/LOCAL/WAZUH-INDEXER/CERTIFICATE>/root-ca.pem`` and ``</PATH/TO/LOCAL/OPENSEARCH/CERTIFICATE>/root-ca.pem`` with your Wazuh indexer and Opensearch certificate local path on the Logstash endpoint respectively.

Configuring new indexes
^^^^^^^^^^^^^^^^^^^^^^^

You must define the mappings between the data and the index types to ensure OpenSearch indexes your data correctly. OpenSearch can infer these mappings, but we recommend that you explicitly configure them. Wazuh provides a set of mappings to ensure OpenSearch indexes the data correctly.

You need to use the `logstash/os_template.json <https://packages.wazuh.com/integrations/opensearch/4.x-2.x/dashboards/wz-os-4.x-2.x-template.json>`__ template to configure this index initialization for your OpenSearch platform.

Create a ``/etc/logstash/templates/`` directory and download the template as ``wazuh.json`` using the following commands:

.. code-block:: console

   # mkdir /etc/logstash/templates
   # curl -o /etc/logstash/templates/wazuh.json https://packages.wazuh.com/integrations/opensearch/4.x-2.x/dashboards/wz-os-4.x-2.x-template.json

In OpenSearch, the indexes support up to ``1000`` fields by default. However, Wazuh logs might contain even more than this number of fields. To solve this issue, the provided ``wazuh.json`` template has the fields set to ``10000`` by default as shown below:

.. code-block:: none
   :emphasize-lines: 8

   ...
   "template": {
     ...
     "settings": {
           ...
           "mapping": {
            "total_fields": {
               "limit": 10000
            }
           }
           ...
     }
     ...
   }
   ...

You can further increase this value by following the `creating an index template <https://opensearch.org/docs/latest/im-plugin/index-templates/>`__ documentation.

Configuring a pipeline
^^^^^^^^^^^^^^^^^^^^^^

A `Logstash pipeline <https://www.elastic.co/guide/en/logstash/current/configuration.html>`__ allows Logstash to use plugins to read the data from the Wazuh indexes and send them to OpenSearch.

The Logstash pipeline requires access to the following secret values:

-  Wazuh indexer credentials
-  OpenSearch credentials

We use the  `Logstash keystore <https://www.elastic.co/guide/en/logstash/current/keystore.html>`__ to securely store these values.

#. Run the following commands on your Logstash server to set a keystore password:

   .. code-block:: console
      :emphasize-lines: 2,3

      $ set +o history
      $ echo 'LOGSTASH_KEYSTORE_PASS="<MY_KEYSTORE_PASSWORD>"'| sudo tee /etc/sysconfig/logstash
      $ export LOGSTASH_KEYSTORE_PASS=<MY_KEYSTORE_PASSWORD>
      $ set -o history
      $ sudo chown root /etc/sysconfig/logstash
      $ sudo chmod 600 /etc/sysconfig/logstash
      $ sudo systemctl start logstash

   Where ``<MY_KEYSTORE_PASSWORD>`` is your keystore password.

   .. note::
      
      You need to create the ``/etc/sysconfig`` folder if it does not exist on your server.

#. Run the following commands to securely store the credentials of the Wazuh indexer and OpenSearch in the Logstash keystore.

   .. note::

      When you run each of the commands, you will be prompted to enter your credentials and the credentials will not be visible as you enter them.

      ``OPENSEARCH_USERNAME``, ``OPENSEARCH_PASSWORD``, ``WAZUH_INDEXER_USERNAME``, and ``WAZUH_INDEXER_PASSWORD`` are `keys <https://www.elastic.co/guide/en/logstash/current/keystore.html>`__ representing the secret values you are adding to the Logstash keystore. These keys will be used in the Logstash pipeline.

   #. Create a new Logstash keystore:

      .. code-block:: console

         $ sudo -E /usr/share/logstash/bin/logstash-keystore --path.settings /etc/logstash create
   
   #. Store your OpenSearch username and password:

      .. code-block:: console
      
         $ sudo -E /usr/share/logstash/bin/logstash-keystore --path.settings /etc/logstash add OPENSEARCH_USERNAME
         $ sudo -E /usr/share/logstash/bin/logstash-keystore --path.settings /etc/logstash add OPENSEARCH_PASSWORD

   #. Store your Wazuh indexer administrator username and password:

      .. code-block:: console

         $ sudo -E /usr/share/logstash/bin/logstash-keystore --path.settings /etc/logstash add WAZUH_INDEXER_USERNAME
         $ sudo -E /usr/share/logstash/bin/logstash-keystore --path.settings /etc/logstash add WAZUH_INDEXER_PASSWORD

   Where:

   -  ``OPENSEARCH_USERNAME`` and ``OPENSEARCH_PASSWORD`` are keys representing your OpenSearch username and  password respectively.
   -  ``WAZUH_INDEXER_USERNAME`` and ``WAZUH_INDEXER_PASSWORD`` are keys representing your Wazuh indexer administrator username and password respectively.

#. Perform the following steps to configure the Logstash pipeline.

   #. Create the configuration file ``wazuh-opensearch.conf`` in ``/etc/logstash/conf.d/`` folder:

      .. code-block:: console

         $ sudo touch /etc/logstash/conf.d/wazuh-opensearch.conf
   
   #. Add the following configuration to the ``wazuh-opensearch.conf`` file.  This sets the parameters required to run Logstash.

      .. code-block:: none
         :emphasize-lines: 3,8,24,31

         input {
           opensearch {
            hosts =>  ["<WAZUH_INDEXER_ADDRESS>:9200"]
            user  =>  "${WAZUH_INDEXER_USERNAME}"
            password  =>  "${WAZUH_INDEXER_PASSWORD}"
            index =>  "wazuh-alerts-4.x-*"
            ssl => true
            ca_file => "</PATH/TO/LOCAL/WAZUH-INDEXER/CERTIFICATE>/root-ca.pem"
            query =>  '{
                "query": {
                   "range": {
                      "@timestamp": {
                         "gt": "now-1m"
                      }
                   }
                }
            }'
            schedule => "* * * * *"
           }
         }
         
         output {
             opensearch {
               hosts => ["<OPENSEARCH_ADDRESS>"]
               auth_type => {
                  type => 'basic'
                  user => '${OPENSEARCH_USERNAME}'
                  password => '${OPENSEARCH_PASSWORD}'
               }
               index  => "wazuh-alerts-4.x-%{+YYYY.MM.dd}"
               cacert => "</PATH/TO/LOCAL/OPENSEARCH/CERTIFICATE>/root-ca.pem"
               ssl => true
               template => "/etc/logstash/templates/wazuh.json"
               template_name => "wazuh"
               template_overwrite => true
               legacy_template => false
             }
         }

      Where:

      -  ``<WAZUH_INDEXER_ADDRESS>`` is your Wazuh indexer address or addresses in case of cluster deployment.
      -  ``<OPENSEARCH_ADDRESS>`` is your OpenSearch address.
      -  ``</PATH/TO/LOCAL/WAZUH-INDEXER/CERTIFICATE>/root-ca.pem`` is your Wazuh indexer certificate local path on the Wazuh server. For example,  you can use ``/etc/logstash/wazuh-indexer-certs/root-ca.pem`` which is the Wazuh indexer root certificate that was copied earlier.
      -  ``</PATH/TO/LOCAL/OPENSEARCH/CERTIFICATE>/root-ca.pem`` is your OpenSearch certificate local path on the Wazuh server. For example, you can use ``/etc/logstash/opensearch-certs/root-ca.pem`` which is the OpenSearch certificate that was copied earlier.

      .. note::
         
         For testing purposes, you can avoid SSL verification by replacing ``cacert => "</PATH/TO/LOCAL/OPENSEARCH/CERTIFICATE>/root-ca.pem"`` with ``ssl_certificate_verification => false``.

         If you aren't using composable index templates and the _index_template API, remove the `legacy_template => false <https://opensearch.org/docs/latest/tools/logstash/ship-to-opensearch/#optional-parameters>`__ parameter.

Running Logstash
^^^^^^^^^^^^^^^^

#. Once you have everything set, run Logstash from CLI with your configuration:

   .. code-block:: console

      $ sudo systemctl stop logstash
      $ sudo -E /usr/share/logstash/bin/logstash -f /etc/logstash/conf.d/wazuh-opensearch.conf --path.settings /etc/logstash/

   Make sure to use your own paths for the Logstash executable, the pipeline, and the configuration files.

   Ensure that Wazuh indexer RESTful API port (9200) is open on your Wazuh indexer. To verify that the necessary ports for Wazuh component communication are open, refer to the list of :ref:`required ports <default_ports>`.

#. After confirming that the configuration loads correctly without errors, cancel the command and run Logstash as a service. This way Logstash is not dependent on the lifecycle of the terminal it's running on. You can now enable and run Logstash as service:

   .. code-block:: console

      $ sudo systemctl enable logstash
      $ sudo systemctl start logstash

Check Elastic documentation for more details on `setting up and running Logstash <https://www.elastic.co/guide/en/logstash/current/setup-logstash.html>`__.

.. note::
   
   Any data indexed before the configuration is complete would not be forwarded to the OpenSearch indexes.

   The ``/var/log/logstash/logstash-plain.log`` file in the Logstash instance stores events produced when Logstash runs. View this file in case you need to troubleshoot.

After Logstash is successfully running, check how to :ref:`configure the Wazuh alert index pattern <configuring_wazuh_alerts_index_pattern_in_opensearch>` and :ref:`verify the integration <verifying_opensearch_integration>`.

Wazuh server integration using Logstash
---------------------------------------

Perform all the steps below on your Wazuh server. Learn more about the :ref:`Wazuh server integration <wazuh_server_integration>` and its necessary :ref:`considerations <capacity_planning>`.

Installing Logstash
^^^^^^^^^^^^^^^^^^^

We use Logstash to forward security data in the ``/var/ossec/logs/alerts/alerts.json`` alerts file from the Wazuh server to the OpenSearch indexes.

Perform the following steps to install Logstash and the required plugin.

#. Follow the Elastic documentation to `install Logstash <https://www.elastic.co/guide/en/logstash/current/installing-logstash.html>`__ on the Wazuh server.
#. Run the following command to install the `logstash-output-opensearch plugin <https://github.com/opensearch-project/logstash-output-opensearch>`__. This plugin allows Logstash to write the data into OpenSearch.

   .. code-block:: console

      $ sudo /usr/share/logstash/bin/logstash-plugin install logstash-output-opensearch

#. Copy the OpenSearch root certificate to the Wazuh server. You can add the certificate to any directory of your choice. In our case, we add it in the ``/etc/logstash/opensearch-certs`` directory.

#. Give the ``logstash`` user the necessary permissions to read the copied certificates:

   .. code-block:: console

      $ sudo chmod -R 755 </PATH/TO/LOCAL/OPENSEARCH/CERTIFICATE>/root-ca.pem

   Replace ``</PATH/TO/LOCAL/OPENSEARCH/CERTIFICATE>/root-ca.pem`` with your OpenSearch certificate local path on the Wazuh server.

Configuring new indexes
^^^^^^^^^^^^^^^^^^^^^^^

You must define the mappings between the data and the index types to ensure Opensearch indexes your data correctly. Opensearch can infer these mappings, but we recommend that you explicitly configure them. Wazuh provides a set of mappings to ensure Opensearch indexes the data correctly.

You need to use the `logstash/os_template.json <https://packages.wazuh.com/integrations/opensearch/4.x-2.x/dashboards/wz-os-4.x-2.x-template.json>`__ template to configure this index initialization for your Opensearch platform. The ``refresh_interval`` is set to ``5s`` in the template we provide.

Create a ``/etc/logstash/templates/`` directory and download the template as ``wazuh.json`` using the following commands:

.. code-block:: console

   # mkdir /etc/logstash/templates
   # curl -o /etc/logstash/templates/wazuh.json https://packages.wazuh.com/integrations/opensearch/4.x-2.x/dashboards/wz-os-4.x-2.x-template.json

In OpenSearch, the indexes support up to ``1000`` fields by default. However, Wazuh logs might contain even more than this number of fields. To solve this issue, the provided ``wazuh.json`` template has the fields set to ``10000`` by default as shown below:

.. code-block:: none
   :emphasize-lines: 8

   ...
   "template": {
     ...
     "settings": {
           ...
           "mapping": {
            "total_fields": {
               "limit": 10000
            }
           }
           ...
     }
     ...
   }
   ...

You can further increase this value by following the `creating an index template <https://opensearch.org/docs/latest/im-plugin/index-templates/>`__ documentation.

Configuring a pipeline
^^^^^^^^^^^^^^^^^^^^^^

A `Logstash pipeline <https://www.elastic.co/guide/en/logstash/current/configuration.html>`__ allows Logstash to use plugins to read the data in the Wazuh ``/var/ossec/logs/alerts/alerts.json`` alerts file and send them to OpenSearch.

The Logstash pipeline requires access to your OpenSearch credentials.

We use the `Logstash keystore <https://www.elastic.co/guide/en/logstash/current/keystore.html>`__ to securely store these values.

#. Run the following commands on your Logstash server to set a keystore password:

   .. code-block:: console
      :emphasize-lines: 2,3

      $ set +o history
      $ echo 'LOGSTASH_KEYSTORE_PASS="<MY_KEYSTORE_PASSWORD>"'| sudo tee /etc/sysconfig/logstash
      $ export LOGSTASH_KEYSTORE_PASS=<MY_KEYSTORE_PASSWORD>
      $ set -o history
      $ sudo chown root /etc/sysconfig/logstash
      $ sudo chmod 600 /etc/sysconfig/logstash
      $ sudo systemctl start logstash

   Where ``<MY_KEYSTORE_PASSWORD>`` is your keystore password.

   .. note::
      
      You need to create the ``/etc/sysconfig`` folder if it does not exist on your server.

#. Run the following commands to securely store the credentials of OpenSearch.

   .. note::
      
      When you run each of the commands, you will be prompted to enter your credentials and the credentials will not be visible as you enter them.

      ``OPENSEARCH_USERNAME`` and ``OPENSEARCH_PASSWORD`` are `keys <https://www.elastic.co/guide/en/logstash/current/keystore.html>`__ representing the secret values you are adding to the Logstash keystore. These keys will be used in the Logstash pipeline.

   #. Create a new Logstash keystore:

      .. code-block:: console

         $ sudo -E /usr/share/logstash/bin/logstash-keystore --path.settings /etc/logstash create

   #. Store your OpenSearch username and password:

      .. code-block:: console

         $ sudo -E /usr/share/logstash/bin/logstash-keystore --path.settings /etc/logstash add OPENSEARCH_USERNAME
         $ sudo -E /usr/share/logstash/bin/logstash-keystore --path.settings /etc/logstash add OPENSEARCH_PASSWORD

      Where ``OPENSEARCH_USERNAME`` and ``OPENSEARCH_PASSWORD`` are keys representing your OpenSearch username and password respectively.

#. Perform the following steps to configure the Logstash pipeline.

   #. Create the configuration file ``wazuh-opensearch.conf`` in ``/etc/logstash/conf.d/`` folder:

      .. code-block:: console

         $ sudo touch /etc/logstash/conf.d/wazuh-opensearch.conf

   #. Add the following configuration to the ``wazuh-opensearch.conf`` file. This sets the parameters required to run Logstash.

      .. code-block:: console
         :emphasize-lines: 15,22

         input {
           file {
             id => "wazuh_alerts"
             codec => "json"
             start_position => "beginning"
             stat_interval => "1 second"
             path => "/var/ossec/logs/alerts/alerts.json"
             mode => "tail"
             ecs_compatibility => "disabled"
           }
         }
         
         output {
             opensearch {
               hosts => ["<OPENSEARCH_ADDRESS>"]
               auth_type => {
                  type => 'basic'
                  user => '${OPENSEARCH_USERNAME}'
                  password => '${OPENSEARCH_PASSWORD}'
               }
               index  => "wazuh-alerts-4.x-%{+YYYY.MM.dd}"
               cacert => "</PATH/TO/LOCAL/OPENSEARCH/CERTIFICATE>/root-ca.pem"
               ssl => true
               template => "/etc/logstash/templates/wazuh.json"
               template_name => "wazuh"
               template_overwrite => true
               legacy_template => false
             }
         }

      Where:

      -  ``<OPENSEARCH_ADDRESS>`` is your OpenSearch IP address.
      -  ``</PATH/TO/LOCAL/OPENSEARCH/CERTIFICATE>/root-ca.pem`` is your OpenSearch certificate local path on the Wazuh server. In our case, we used ``/etc/logstash/opensearch-certs/root-ca.pem``.

      .. note::
         
         For testing purposes, you can avoid SSL verification by replacing ``cacert => "</PATH/TO/LOCAL/OPENSEARCH/CERTIFICATE>/root-ca.pem"`` with ``ssl_certificate_verification => false``.

         If you aren't using composable index templates and the _index_template API, remove the `legacy_template => false <https://opensearch.org/docs/latest/tools/logstash/ship-to-opensearch/#optional-parameters>`__ parameter.

#. By default the ``/var/ossec/logs/alerts/alerts.json`` file is owned by the ``wazuh`` user with restrictive permissions. You must add the ``logstash`` user to the ``wazuh`` group so it can read the file when running Logstash as a service:

   .. code-block:: console

      $ sudo usermod -a -G wazuh logstash

Running Logstash
^^^^^^^^^^^^^^^^

#. Once you have everything set, run Logstash from CLI with your configuration:

   .. code-block:: console

      $ sudo systemctl stop logstash
      $ sudo -E /usr/share/logstash/bin/logstash -f /etc/logstash/conf.d/wazuh-opensearch.conf --path.settings /etc/logstash/

   Make sure to use your own paths for the executable, the pipeline, and the configuration files.

   Ensure that Wazuh server RESTful API port (55000) is open on your Wazuh server. To verify that the necessary ports for Wazuh component communication are open, refer to the list of :ref:`required ports <default_ports>`.

#. After confirming that the configuration loads correctly without errors, cancel the command and run Logstash as a service. This way Logstash is not dependent on the lifecycle of the terminal it's running on. You can now enable and run Logstash as a service:

   .. code-block:: console

      $ sudo systemctl enable logstash
      $ sudo systemctl start logstash

.. note::
   
   Any data indexed before the configuration is complete would not be forwarded to the OpenSearch indexes.

   The ``/var/log/logstash/logstash-plain.log`` file in the Logstash instance stores events generated when Logstash runs. View this file in case you need to troubleshoot.

Check Elastic documentation for more details on `setting up and running Logstash <https://www.elastic.co/guide/en/logstash/current/setup-logstash.html>`__.

.. _configuring_wazuh_alerts_index_pattern_in_opensearch:

Configuring the Wazuh alerts index pattern in OpenSearch
--------------------------------------------------------

In Opensearch Dashboards, do the following to create the index pattern name for the Wazuh alerts.

#. Select **☰** > **Management** > **Dashboards Management**.
#. Choose **Index Patterns** and select **Create index pattern**.
#. Define ``wazuh-alerts-*`` as the index pattern name.
#. Select **timestamp** as the primary time field for use with the global time filter. Then **Create the index pattern**.
#. Open the menu and select **Discover** under **OpenSearch Dashboards**.

.. thumbnail:: /images/integrations/configuring-index-pattern-in-opensearch.gif
   :title: Configuring the Wazuh alerts index pattern in OpenSearch
   :align: center
   :width: 80%

.. _verifying_opensearch_integration:

Verifying the integration
-------------------------

To check the integration with OpenSearch, navigate to **Discover** in OpenSearch Dashboards and verify that you can find  the Wazuh security data within the index pattern ``wazuh-alerts-4.x*``.

.. thumbnail:: /images/integrations/finding-security-data-in-opensearch.png
   :title: Verify finding security data
   :align: center
   :width: 80%

.. _openSearch_dashboards:

OpenSearch dashboards
---------------------

Wazuh provides several `dashboards for OpenSearch <https://packages.wazuh.com/integrations/opensearch/4.x-2.x/dashboards/wz-os-4.x-2.x-dashboards.ndjson>`__. After finishing with the OpenSearch integration setup, these dashboards display your Wazuh alerts in OpenSearch.

.. thumbnail:: /images/integrations/security-events-dashboard-for-opensearch.png
   :title: Threat Hunting dashboard for Opensearch
   :align: center
   :width: 80%

Importing these dashboards defines the index pattern name ``wazuh-alerts-*``. The index pattern name is necessary for creating index names and receiving alerts.

Follow the next steps to import the Wazuh dashboards for OpenSearch.

#. Run the command below to download the Wazuh dashboard file for OpenSearch.

   #. If you are accessing the OpenSearch dashboard from a  Linux or macOS system:

      .. code-block:: console

         # wget https://packages.wazuh.com/integrations/opensearch/4.x-2.x/dashboards/wz-os-4.x-2.x-dashboards.ndjson

   #. If you are accessing the Opensearch dashboard from a Windows system (run the command using Powershell):

      .. code-block:: powershell

         # Invoke-WebRequest -Uri "https://packages.wazuh.com/integrations/opensearch/4.x-2.x/dashboards/wz-os-4.x-2.x-dashboards.ndjson" -OutFile "allDashboards.ndjson"

#. In OpenSearch Dashboards, navigate to **Management** > **Dashboards management**.
#. Click on **Saved Objects** and click **Import**.
#. Click on the **Import** icon, browse your files, and select the dashboard file.
#. Click the **Import** button to start importing then click **Done**.
#. To find the imported dashboards, navigate to **Dashboard** under **OpenSearch Dashboards**.

.. thumbnail:: /images/integrations/import-dashboard-in-opensearch.gif
   :title: Import dashboard file in Opensearch
   :align: center
   :width: 80%
