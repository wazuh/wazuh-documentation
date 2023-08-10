.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Find out how to integrate Wazuh with Elastic in this integration guide.

Elastic Stack integration
=========================

`Elasticsearch <https://www.elastic.co/what-is/elasticsearch>`__ is the central component of the Elastic Stack (commonly referred to as the `ELK Stack <https://www.elastic.co/elastic-stack/>`__ - Elasticsearch, Logstash, and Kibana), which is a set of free and open tools for data ingestion, enrichment, storage, analysis, and visualization. Elasticsearch is a distributed, free, and open search and analytics engine for all types of data, including textual, numerical, geospatial, structured, and unstructured. It is a tool that stores information in indexes. Indexes are collections of documents with similar properties. You can create indexes using the Elasticsearch API or Kibana.

In this guide, you can find how to integrate Wazuh with Elastic in the following ways:

-  `Wazuh indexer integration using Logstash`_
-  `Wazuh server integration using Logstash`_

.. thumbnail:: /images/integrations/image2.png
   :title: ELK integration diagram
   :align: center
   :width: 80%

Wazuh indexer integration using Logstash
----------------------------------------

Perform all the steps described below on your Logstash server. You must install Logstash on a dedicated server or on the server hosting the third-party indexer. We performed the steps on a Linux operating system. Logstash forwards the data from the Wazuh indexer to Elasticsearch in the form of indexes.

Installing Logstash
^^^^^^^^^^^^^^^^^^^

Perform the following steps to install Logstash and the required plugin.

#. Follow the Elastic documentation to `install Logstash <https://www.elastic.co/guide/en/logstash/current/installing-logstash.html>`__. Ensure that you consider the `requirements <https://www.elastic.co/guide/en/logstash/current/getting-started-with-logstash.html>`__ and `performance tuning <https://www.elastic.co/guide/en/logstash/current/performance-troubleshooting.html>`__ guidelines for running Logstash.

   .. note::

      Ensure all components of your ELK (Elasticsearch, Logstash, and Kibana) stack are the same version to avoid compatibility issues.

#. Run the following command to install the `logstash-input-opensearch <https://github.com/opensearch-project/logstash-input-opensearch>`__ plugin. This plugin reads data from the Wazuh indexer into the Logstash pipeline.

   .. code-block:: console

      $ sudo /usr/share/logstash/bin/logstash-plugin install logstash-input-opensearch

#. Copy the Wazuh indexer and Elasticsearch root certificates to the Logstash server. 

   .. note::

      You can add the certificates to any directory of your choice. For example, we added them in ``/etc/logstash/wazuh-indexer-certs`` and ``/etc/logstash/elasticsearch-certs`` respectively.

Configuring new indexes
^^^^^^^^^^^^^^^^^^^^^^^

You must define the mappings between the data and the index types to ensure Elasticsearch indexes your data correctly. Elasticsearch can infer these mappings, but we recommend that you explicitly configure them. Wazuh provides a set of mappings to ensure Elasticsearch indexes the data correctly.

You need to use the `logstash/es_template.json <https://raw.githubusercontent.com/wazuh/wazuh-kibana-app/4.6/docker/integrations/config/logstash/es_template.json>`__ template to configure this index initialization for your Elasticsearch platform. The ``refresh_interval`` is set to ``5s`` in the template we provide.

Create a ``/etc/logstash/templates/`` directory and download the template as wazuh.json using the following commands:

.. code-block:: console

   # mkdir /etc/logstash/templates
   # curl -o /etc/logstash/templates/wazuh.json https://raw.githubusercontent.com/wazuh/wazuh-kibana-app/4.6/docker/integrations/config/logstash/es_template.json

In Elasticsearch, the indexes support up to ``1000`` fields by default. However, Wazuh logs might contain even more than this number of fields. To solve this issue, the provided ``wazuh.json`` template has the fields set to ``10000`` by default as shown below:

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

You can further increase this value by following the `creating an index template <https://www.elastic.co/guide/en/elasticsearch/reference/current/index-templates.html>`__ documentation.

Configuring a pipeline
^^^^^^^^^^^^^^^^^^^^^^

A `Logstash pipeline <https://www.elastic.co/guide/en/logstash/current/configuration.html>`__ allows Logstash to use plugins to read the data from the Wazuh indexes and send them to Elasticsearch.

The Logstash pipeline requires access to the following secret values:

-  Wazuh indexer credentials
-  Elasticsearch credentials

We use the `Logstash keystore <https://www.elastic.co/guide/en/logstash/current/keystore.html>`__ to securely store these values.

#. Run the following commands on your Logstash server to set a keystore password:

   .. code-block:: console

      # touch /etc/sysconfig/logstash
      # set +o history
      # echo 'LOGSTASH_KEYSTORE_PASS="<MY_KEYSTORE_PASSWORD>"' > /etc/sysconfig/logstash
      # export LOGSTASH_KEYSTORE_PASS=<MY_KEYSTORE_PASSWORD>
      # set -o history
      # chown root /etc/sysconfig/logstash
      # chmod 600 /etc/sysconfig/logstash
      # systemctl start logstash

   Where ``<MY_KEYSTORE_PASSWORD>`` is your keystore password.

   .. note::
      
      You need to create the ``/etc/sysconfig`` folder if it does not exist on your server.

#. Run the following commands to securely store the credentials of the Wazuh indexer and Elasticsearch in the Logstash keystore.

   .. note::

      When you run each of the commands, you will be prompted to enter your credentials and the credentials will not be visible as you enter them.

      ``ELASTICSEARCH_USERNAME``, ``ELASTICSEARCH_PASSWORD``, ``WAZUH_INDEXER_USERNAME``, and ``WAZUH_INDEXER_PASSWORD`` are `keys <https://www.elastic.co/guide/en/logstash/current/keystore.html>`__ representing the secret values you are adding to the Logstash keystore. These keys will be used in the Logstash pipeline.
   
   #. Create a new Logstash keystore:

      .. code-block:: console

         $ sudo -E /usr/share/logstash/bin/logstash-keystore --path.settings /etc/logstash create
   
   #. Store your Elasticsearch username and password:

      .. code-block:: console

         $ sudo -E /usr/share/logstash/bin/logstash-keystore --path.settings /etc/logstash add ELASTICSEARCH_USERNAME
         $ sudo -E /usr/share/logstash/bin/logstash-keystore --path.settings /etc/logstash add ELASTICSEARCH_PASSWORD
   
   #. Store your Wazuh indexer administrator username and password:

      .. code-block:: console

         $ sudo -E /usr/share/logstash/bin/logstash-keystore --path.settings /etc/logstash add WAZUH_INDEXER_USERNAME
         $ sudo -E /usr/share/logstash/bin/logstash-keystore --path.settings /etc/logstash add WAZUH_INDEXER_PASSWORD
   
   Where:

   -  ``ELASTICSEARCH_USERNAME`` and ``ELASTICSEARCH_PASSWORD`` are keys representing your Elasticsearch username and password respectively.
   -  ``WAZUH_INDEXER_USERNAME`` and ``WAZUH_INDEXER_PASSWORD`` are keys representing your Wazuh indexer administrator username and password respectively.

#. Perform the following steps to configure the Logstash pipeline.

   #. Create the configuration file ``wazuh-elasticsearch.conf`` in ``/etc/logstash/conf.d/`` folder:

      .. code-block:: console

         # touch /etc/logstash/conf.d/wazuh-elasticsearch.conf
   
   #. Add the following configuration to the ``wazuh-elasticsearch.conf`` file. This sets the parameters required to run Logstash.

      .. code-block:: none

         input {
           opensearch {
         	hosts =>  ["<WAZUH_INDEXER_ADDRESS>:9200"]
         	user  =>  "${WAZUH_INDEXER_USERNAME}"
         	password  =>  "${WAZUH_INDEXER_PASSWORD}"
         	index =>  "wazuh-alerts-4.x-*"
         	ssl => true
         	ca_file => "</PATH/TO/LOCAL/WAZUH_INDEXER>/root-ca.pem"
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
             elasticsearch {
                  hosts => "<ELASTICSEARCH_ADDRESS>"
                  index  => "wazuh-alerts-4.x-%{+YYYY.MM.dd}"
                  user => '${ELASTICSEARCH_USERNAME}'
                  password => '${ELASTICSEARCH_PASSWORD}'
                  ssl => true
                  cacert => "</PATH/TO/LOCAL/ELASTICSEARCH>/root-ca.pem"
                  template => "/etc/logstash/templates/wazuh.json"
                  template_name => "wazuh"
                  template_overwrite => true
         	}
         }

      Where:

      -  ``<WAZUH_INDEXER_ADDRESS>`` is your Wazuh indexer address or addresses in case of cluster deployment.
      -  ``<ELASTICSEARCH_ADDRESS>`` is your Elasticsearch IP address.
      -  ``</PATH/TO/LOCAL/WAZUH_INDEXER>/root-ca.pem`` is your Wazuh indexer certificate local path on the Logstash server. For example,  you can use ``/etc/logstash/wazuh-indexer-certs/root-ca.pem`` which is the Wazuh indexer root certificate that was copied earlier.
      -  ``</PATH/TO/LOCAL/ELASTICSEARCH>/root-ca.pem`` is your Elasticsearch certificate local path on the Logstash server. For example, you can use ``/etc/logstash/elasticsearch-certs/root-ca.pem`` which is the Elasticsearch certificate that was copied earlier.

      .. note::
         
         For testing purposes, you can avoid SSL verification by replacing ``cacert => "</PATH/TO/LOCAL/ELASTICSEARCH>/root-ca.pem"`` with ``ssl_certificate_verification => false``.

         If you are using composable index templates and the _index_template API, set the optional parameter `legacy_template => false <https://opensearch.org/docs/latest/tools/logstash/ship-to-opensearch/#optional-parameters>`__.

Running Logstash
^^^^^^^^^^^^^^^^

#. Once you have everything set, run Logstash from CLI with your configuration:

   .. code-block:: console

      $ sudo systemctl stop logstash
      $ sudo -E /usr/share/logstash/bin/logstash -f /etc/logstash/conf.d/wazuh-elasticsearch.conf --path.settings /etc/logstash/
   
   Make sure to use your own paths for the executable, the pipeline, and the configuration files. 

#. After confirming that the configuration loads correctly without errors, cancel the command and run Logstash as a service. This way Logstash is not dependent on the lifecycle of the terminal it's running on. You can now enable and run Logstash as a service:

   .. code-block:: console

      $ sudo systemctl enable logstash.service
      $ sudo systemctl start logstash.service

.. note::
   
   Any data indexed before the configuration is complete will not be forwarded to the Elastic indexes.

   The ``/var/log/logstash/logstash-plain.log`` file in the Logstash instance stores events generated when Logstash runs. View this file in case you need to troubleshoot.

Check Elastic documentation for more details on setting up and running Logstash .

Wazuh server integration using Logstash
---------------------------------------

Perform all the steps below on your Wazuh server. 

Installing Logstash
^^^^^^^^^^^^^^^^^^^

We use Logstash to forward security data in the ``/var/ossec/logs/alerts/alerts.json`` alerts file from the Wazuh server to the Elasticsearch indexes.

Perform the following steps to install Logstash and the required plugin.

#. Follow the Elastic documentation to `install Logstash <https://www.elastic.co/guide/en/logstash/current/installing-logstash.html>`__. Ensure that you consider the `requirements <https://www.elastic.co/guide/en/logstash/current/getting-started-with-logstash.html>`__ and `performance tuning <https://www.elastic.co/guide/en/logstash/current/performance-troubleshooting.html>`__ guidelines for running Logstash.

   .. note::
      
      Ensure all components of your ELK (Elasticsearch, Logstash, and Kibana) stack are the same version to avoid compatibility issues. 

#. Run the following command to install the `logstash-output-elasticsearch <https://github.com/logstash-plugins/logstash-output-elasticsearch>`__ plugin. This plugin allows Logstash to write data into Elasticsearch.

   .. code-block:: console

      $ sudo /usr/share/logstash/bin/logstash-plugin install logstash-output-elasticsearch

#. Copy the Elasticsearch root certificate to the Wazuh server. You can add the certificate to any directory of your choice. In our case, we add it in ``/etc/logstash/elasticsearch-certs`` directory.

Configuring new indexes
^^^^^^^^^^^^^^^^^^^^^^^

You must define the mappings between the data and the index types to ensure Elasticsearch indexes your data correctly. Elasticsearch can infer these mappings, but we recommend that you explicitly configure them. Wazuh provides a set of mappings to ensure Elasticsearch indexes the data correctly.

You need to use the `logstash/es_template.json <https://raw.githubusercontent.com/wazuh/wazuh-kibana-app/4.6/docker/integrations/config/logstash/es_template.json>`__ template to configure this index initialization for your Elasticsearch platform. The refresh_interval is set to 5s in the template we provide.

Create a ``/etc/logstash/templates/`` directory and download the template as ``wazuh.json`` using the following commands:

.. code-block:: console

   # mkdir /etc/logstash/templates
   # curl -o /etc/logstash/templates/wazuh.json https://raw.githubusercontent.com/wazuh/wazuh-kibana-app/4.6/docker/integrations/config/logstash/es_template.json

In Elasticsearch, the indexes support up to ``1000`` fields by default. However, Wazuh logs might contain even more than this number of fields. To solve this issue, the provided ``wazuh.json`` template has the fields set to ``10000`` by default as shown below:

.. code-block:: none

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

You can further increase this value by following the `creating an index template <https://www.elastic.co/guide/en/elasticsearch/reference/current/index-templates.html>`__ documentation.

Configuring a pipeline
^^^^^^^^^^^^^^^^^^^^^^

A `Logstash pipeline <https://www.elastic.co/guide/en/logstash/current/configuration.html>`__ allows Logstash to use plugins to read the data in the Wazuh ``/var/ossec/logs/alerts/alerts.json`` alert file and send them to Elasticsearch.

The Logstash pipeline requires access to your Elasticsearch credentials.

We use the `Logstash keystore <https://www.elastic.co/guide/en/logstash/current/keystore.html>`__ to securely store these values.

#. Run the following commands on your Logstash server to set a keystore password:

   .. code-block:: console

      # touch /etc/sysconfig/logstash
      # set +o history
      # echo 'LOGSTASH_KEYSTORE_PASS="<MY_KEYSTORE_PASSWORD>"' > /etc/sysconfig/logstash
      # export LOGSTASH_KEYSTORE_PASS=<MY_KEYSTORE_PASSWORD>
      # set -o history
      # chown root /etc/sysconfig/logstash
      # chmod 600 /etc/sysconfig/logstash
      # systemctl start logstash

   Where ``<MY_KEYSTORE_PASSWORD>`` is your keystore password.

   .. note::
      
      You need to create the ``/etc/sysconfig`` folder if it does not exist on your server.

#. Run the following commands to securely store the credentials of Elasticsearch.

   .. note::
      
      When you run each of the commands, you will be prompted to enter your credentials and the credentials will not be visible as you enter them.

      ``ELASTICSEARCH_USERNAME`` and ``ELASTICSEARCH_PASSWORD`` are `keys <https://www.elastic.co/guide/en/logstash/current/keystore.html>`__ representing the secret values you are adding to the Logstash keystore. These keys will be used in the Logstash pipeline.

   #. Create a new Logstash keystore:

      .. code-block:: console

         # sudo -E /usr/share/logstash/bin/logstash-keystore --path.settings /etc/logstash create
   
   #. Store your Elasticsearch username and password:

      .. code-block:: console

         # sudo -E /usr/share/logstash/bin/logstash-keystore --path.settings /etc/logstash add ELASTICSEARCH_USERNAME
         # sudo -E /usr/share/logstash/bin/logstash-keystore --path.settings /etc/logstash add ELASTICSEARCH_PASSWORD

      Where ``ELASTICSEARCH_USERNAME`` and ``ELASTICSEARCH_PASSWORD`` are keys representing your Elasticsearch username and password respectively.

#. Perform the following steps to configure the Logstash pipeline.

   #. Create the configuration file ``wazuh-elasticsearch.conf`` in ``/etc/logstash/conf.d/`` folder:

      .. code-block:: console

         # touch /etc/logstash/conf.d/wazuh-elasticsearch.conf
   
   #. Add the following configuration to the ``wazuh-elasticsearch.conf`` file. This sets the parameters required to run Logstash.

      .. code-block:: none

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
             elasticsearch {
                  hosts => "<ELASTICSEARCH_ADDRESS>"
                  index  => "wazuh-alerts-4.x-%{+YYYY.MM.dd}"
                  user => '${ELASTICSEARCH_USERNAME}'
                  password => '${ELASTICSEARCH_PASSWORD}'
                  ssl => true
                  cacert => "</PATH/TO/LOCAL/ELASTICSEARCH>/root-ca.pem"
                  template => "/etc/logstash/templates/wazuh.json"
                  template_name => "wazuh"
                  template_overwrite => true
         	}
         }

      Where:

      -  ``<ELASTICSEARCH_ADDRESS>`` is your Elasticsearch IP address.
      -  ``</PATH/TO/LOCAL/ELASTICSEARCH>/root-ca.pem`` is your Elasticsearch root certificate local path on the Wazuh server. For example, you can use ``/etc/logstash/elasticsearch-certs/root-ca.pem`` which is the Elasticsearch root certificate that was copied earlier.

      .. note::
         
         For testing purposes you can avoid SSL verification by replacing ``cacert => "/PATH/TO/LOCAL/ELASTICSEARCH/root-ca.pem"`` with ``ssl_certificate_verification => false``.

#. By default the ``/var/ossec/logs/alerts/alerts.json`` file is owned by the ``wazuh`` user with restrictive permissions. You must add the ``logstash`` user to the ``wazuh`` group so it can read the file when running Logstash as a service:

   .. code-block:: console

      $ sudo usermod -a -G wazuh logstash

Running Logstash
^^^^^^^^^^^^^^^^

#. Once you have everything set, run Logstash from CLI with your configuration:

   .. code-block:: console

      $ sudo systemctl stop logstash
      $ sudo -E /usr/share/logstash/bin/logstash -f /etc/logstash/conf.d/wazuh-elasticsearch.conf --path.settings /etc/logstash/

   Make sure to use your own paths for the executable, the pipeline, and the configuration files.

#. After confirming that the configuration loads correctly without errors, cancel the command and run Logstash as a service. This way Logstash is not dependent on the lifecycle of the terminal it's running on. You can now enable and run Logstash as service:

   .. code-block:: console

      $ sudo systemctl enable logstash.service
      $ sudo systemctl start logstash.service

.. note::

   Any data indexed before the configuration is complete would not be forwarded to the Elastic indexes.

   The ``/var/log/logstash/logstash-plain.log`` file in the Logstash instance stores events generated when Logstash runs. View this file in case you need to troubleshoot.

Check Elastic documentation for more details on `setting up and running Logstash <https://www.elastic.co/guide/en/logstash/current/setup-logstash.html>`__.

Configuring the Wazuh alerts index pattern in Elastic
-----------------------------------------------------

