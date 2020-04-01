.. Copyright (C) 2020 Wazuh, Inc.

.. _elastic_server_minor_upgrade:

Upgrading Elastic Stack from 7.x to 7.y
=======================================

In case of having more than one Elasticsearch nodes, the process of upgrading Elastic Stack must be done in each node of the cluster, one at a time, otherwise, the cluster may become corrupt.

Prepare the Elastic Stack
-------------------------

#. Stop the services:

    .. include:: ../../_templates/upgrading/common/stop_services.rst

#. In case of having disabled the repository for Elastic Stack 7.x it can be enabled using:

    .. include:: ../../_templates/upgrading/common/add_repository.rst
         

Upgrade Elasticsearch
---------------------

#. Disable shard allocation:

    .. include:: ../../_templates/upgrading/common/disable_shard_allocation.rst

#. (Optional) Stop non-essential indexing and perform a synced flush:

    .. include:: ../../_templates/upgrading/common/stop_indexing.rst

#. Shut down the node:

    .. include:: ../../_templates/upgrading/common/stop_elastic.rst

#. Upgrade the node:

    .. tabs::


      .. group-tab:: Yum

        .. code-block:: console

          # yum install elasticsearch-|ELASTICSEARCH_LATEST|



      .. group-tab:: APT

        .. code-block:: console

            # apt-get install elasticsearch=|ELASTICSEARCH_LATEST|

  
      .. group-tab:: ZYpp

        .. code-block:: console

            # zypper install elasticsearch-|ELASTICSEARCH_LATEST|

#. Restart the service.

    .. include:: ../../_templates/upgrading/common/enable_elastic.rst

#. Once the node is enabled, check that the node works properly:

    .. include:: ../../_templates/upgrading/common/check_upgrade.rst

#. Reenable shard allocation:

    .. include:: ../../_templates/upgrading/common/enable_shard_allocation.rst

#. Check if the shard allocation is finished:

    .. include:: ../../_templates/upgrading/common/check_shard_allocation.rst

Once the shard allocation is finished, the next node in the cluster, if any, can be upgraded.    

Upgrade Filebeat
----------------

#. Upgrade Filebeat.

    .. tabs::


      .. group-tab:: Yum

        .. code-block:: console

          # yum install filebeat-|ELASTICSEARCH_LATEST|



      .. group-tab:: APT

        .. code-block:: console

            # apt-get install filebeat=|ELASTICSEARCH_LATEST|

  
      .. group-tab:: ZYpp

        .. code-block:: console

            # zypper install filebeat-|ELASTICSEARCH_LATEST|

#. Update the configuration file.

    .. code-block:: console

      # cp /etc/filebeat/filebeat.yml /backup/filebeat.yml.backup
      # curl -so /etc/filebeat/filebeat.yml https://raw.githubusercontent.com/wazuh/wazuh/v|WAZUH_LATEST|/extensions/filebeat/7.x/filebeat.yml
      # chmod go+r /etc/filebeat/filebeat.yml

#. Download the alerts template for Elasticsearch:

    .. code-block:: console

      # curl -so /etc/filebeat/wazuh-template.json https://raw.githubusercontent.com/wazuh/wazuh/v|WAZUH_LATEST|/extensions/elasticsearch/7.x/wazuh-template.json
      # chmod go+r /etc/filebeat/wazuh-template.json

#. Download the Wazuh module for Filebeat:

    .. include:: ../../_templates/upgrading/common/download_wazuh_module.rst

#. Edit the file ``/etc/filebeat/filebeat.yml`` and replace ``YOUR_ELASTIC_SERVER_IP`` with the IP address or the hostname of the Elasticsearch server. For example:

    .. include:: ../../_templates/upgrading/common/edit_filebeat_file.rst

#. Restart Filebeat.

    .. include:: ../../_templates/upgrading/common/enable_filebeat.rst

Upgrade Kibana
--------------

.. warning::
  Since Wazuh 3.12.0 release (regardless of the Elastic Stack version) the location of the wazuh.yml has been moved from /usr/share/kibana/plugins/wazuh/wazuh.yml to /usr/share/kibana/optimize/wazuh/config/wazuh.yml.

#. Copy the wazuh.yml to its new location. (Only needed for upgrades from 3.11.x to 3.12.y).

    .. include:: ../../_templates/upgrading/common/copy_wazuh_yml.rst

#. Remove the Wazuh app.

    .. include:: ../../_templates/upgrading/common/remove_wazuh_app.rst

#. Upgrade Kibana.

    .. tabs::


      .. group-tab:: Yum

        .. code-block:: console

          # yum install kibana-|ELASTICSEARCH_LATEST|



      .. group-tab:: APT

        .. code-block:: console

            # apt-get install kibana=|ELASTICSEARCH_LATEST|

  
      .. group-tab:: ZYpp

        .. code-block:: console

            # zypper install kibana-|ELASTICSEARCH_LATEST|

#. Remove generated bundles.

    .. include:: ../../_templates/upgrading/common/remove_generated_bundles.rst

#. Update file permissions. This will avoid several errors prior to updating the app.

    .. include:: ../../_templates/upgrading/common/update_kibana_file_permissions.rst

#. Install the Wazuh app.

  .. tabs::

    .. group-tab:: From URL

      .. code-block:: console

        # cd /usr/share/kibana/
        # sudo -u kibana bin/kibana-plugin install https://packages.wazuh.com/wazuhapp/wazuhapp-|WAZUH_LATEST|_|ELASTICSEARCH_LATEST|.zip

    .. group-tab:: From the package

      .. code-block:: console

        # cd /usr/share/kibana/
        # sudo -u kibana bin/kibana-plugin install file:///path/wazuhapp-|WAZUH_LATEST|_|ELASTICSEARCH_LATEST|.zip


     
        

#. Update the configuration file permissions.

    .. include:: ../../_templates/upgrading/common/update_kibana_conf_permissions.rst

#. For installations on Kibana 7.6.X versions it is recommended to increase the heap size of Kibana to ensure the Kibana's plugins installation:

    .. include:: ../../_templates/upgrading/common/increase_heap_size.rst

#. Restart Kibana.

    .. include:: ../../_templates/upgrading/common/enable_kibana.rst

Disabling repositories
^^^^^^^^^^^^^^^^^^^^^^

.. include:: ../../_templates/upgrading/common/disabling_repository_message.rst


.. tabs::


  .. group-tab:: APT


    .. include:: ../../_templates/installations/elastic/deb/disabling_repositories.rst



  .. group-tab:: Yum


    .. include:: ../../_templates/installations/elastic/yum/disabling_repositories.rst



  .. group-tab:: ZYpp


    .. include:: ../../_templates/installations/elastic/zypp/disabling_repositories.rst
