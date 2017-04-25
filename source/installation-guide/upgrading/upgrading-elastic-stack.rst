.. _upgrading_elastic_stack:

Upgrading Elastic Stack server
==============================

Although Wazuh v2.0 is compatible both with Elastic Stack 2.X and 5.X, it is recommended to run it with version 5.X. This is because our Wazuh Kibana App it is not compatible with Elastic Stack 2.X. In any case, here is a brief description of the upgrade process, no matter which version of the cluster you decide to keep.

#. `Keep using Elastic Stack 2.X`_
#. `Upgrade from Elastic Stack 2.X to 5.X`_

Keep using Elastic Stack 2.X
----------------------------

In this scenario you will only need to configure Logstash to receive data from Filebeat (or, for single-host architectures, to read it directly from Wazuh) and feed the Elasticsearch using the Wazuh alerts template:

Configure Logstash
^^^^^^^^^^^^^^^^^^

1. Download the new logstash configuration::

    curl -so /etc/logstash/conf.d/01-wazuh.conf https://raw.githubusercontent.com/wazuh/wazuh/2.0/extensions/logstash/01-wazuh.conf
    curl -so /etc/logstash/wazuh-elastic2-template.json https://raw.githubusercontent.com/wazuh/wazuh/2.0/extensions/elasticsearch/wazuh-elastic2-template.json

2. In the output section of ``/etc/logstash/conf.d/01-wazuh.conf``, comment the line for ``elastic5-template`` and uncomment the line for ``elastic2-template``::

    output {
      elasticsearch {
      hosts => ["localhost:9200"]
      index => "wazuh-alerts-%{+YYYY.MM.dd}"
      document_type => "wazuh"
            #      template => "/etc/logstash/wazuh-elastic5-template.json"
	          template => "/etc/logstash/wazuh-elastic2-template.json"
	          template_name => "wazuh"
	          template_overwrite => true
	    }
    }

3. *Only if you are using a single-host architecture* (where Wazuh server is running with Elastic Stack in the same host), edit ``/etc/logstash/conf.d/01-wazuh.conf`` commenting out the entire input section titled ``Remote Wazuh Manager - Filebeat input`` and uncommenting the entire input section titled ``Local Wazuh Manager - JSON file input``::

    # Wazuh - Logstash configuration file
    ## Remote Wazuh Manager - Filebeat input
    #input {
    #beats {
    #      port => 5000
    #      codec => "json_lines"
    #      ssl => true
    #      ssl_certificate => "/etc/logstash/logstash.crt"
    #      ssl_key => "/etc/logstash/logstash.key"
    #  }
    #}
    # Local Wazuh Manager - JSON file input
    input {
       file {
           type => "wazuh-alerts"
           path => "/var/ossec/logs/alerts/alerts.json"
           codec => "json"
       }
    }
    ...

   This configuration will set up Logstash to read the Wazuh ``alerts.json`` file directly from the local filesystem rather than expecting Filebeat on a separate server to ship the data to it.


Configure Kibana
^^^^^^^^^^^^^^^^

Below we will configure Kibana index pattern, in order to display Wazuh alerts data.

1. Go to Settings and configure a new wildcard:

  .. image:: ../../images/installation/kibana-elk2-set.png
    :align: center
    :width: 100%

2. Set ``wazuh-*`` as index pattern and choose ``timestamp`` as time field, then click on create:

  .. image:: ../../images/installation/kibana-elk2.png
    :align: center
    :width: 100%

3. Set as default wildcard by clicking on the Star:

  .. image:: ../../images/installation/kibana-elk.png
    :align: center
    :width: 100%

4. Go to the ``Discover`` tab in order to visualize the alerts data.

Upgrade from Elastic Stack 2.X to 5.X
-------------------------------------

Follow next steps to upgrade your Elastic Stack cluster to version 5.X:

1. Stop the running Logstash, Elasticsearch and Kibana instances:

  a) For Systemd::

      systemctl stop logstash.service
      systemctl stop elasticsearch.service
      systemctl stop kibana.service

  b) For SysV Init::

      service logstash stop
      service elasticsearch stop
      service kibana stop

2. Remove Logstash old configuration and template files:

  For single-host architectures (Wazuh server and Elastic Stack running in the same system)::

   rm /etc/logstash/conf.d/01-ossec-singlehost.conf
   rm /etc/logstash/elastic-ossec-template.json

  For distributed architectures (Elastic Stack standalone server)::

   rm /etc/logstash/conf.d/01-ossec.conf
   rm /etc/logstash/elastic-ossec-template.json

3. Remove deprecated settings from configuration file:

  To avoid conflicts and errors, we are going to remove deprecated settings of Elasticsearch. To do that, comment the following lines on your ``/etc/elasticsearch/elasticsearch.yml`` file::

    index.number_of_shards: 1
    index.number_of_replicas: 0

  ``ES_HEAP_SIZE`` option is now deprecated. You should also remove or comment out this option in your  ``/etc/sysconfig/elasticsearch`` file::

    # ES_HEAP_SIZE - Set it to half your system RAM memory
    ES_HEAP_SIZE=8g

  Now you can go ahead and configure it following the Elastic `jvm.options guide <https://www.elastic.co/guide/en/elasticsearch/reference/master/heap-size.html>`_

4. At this point you will have to install the new version of Elastic Stack. Depending on your operating system you can follow either of these installation instructions:

    - :ref:`Install Elastic Stack with RPM packages <elastic_server_rpm>`
    - :ref:`Install Elastic Stack with DEB packages <elastic_server_deb>`

5. To check that eveything worked as expected, lets check the software version of the different components:

  a) For Logstash::

      $ /usr/share/logstash/bin/logstash -V
      logstash 5.2.2

  b) For Elasticsearch::

      $ /usr/share/elasticsearch/bin/elasticsearch -V
      Version: 5.2.2, Build: f9d9b74/2017-02-24T17:26:45.835Z, JVM: 1.8.0_60

  c) For Kibana::

      $ /usr/share/kibana/bin/kibana -V
      5.2.

.. note:: Wazuh v2.X uses different indices and templates than Wazuh v1.X For that reason, you will not be able to see the previous alerts using Kibana. If you need to access them, you will have to reindex the previous indices.
