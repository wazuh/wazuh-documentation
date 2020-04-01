.. Copyright (C) 2020 Wazuh, Inc.

.. _elastic_server_hard_upgrade:

Upgrading Elastic Stack from 6.x to 6.8
=======================================

Prepare the Elastic Stack
-------------------------

#. Stop the services:

  .. tabs::


    .. group-tab:: Systemd

      .. code-block:: console

        # systemctl stop logstash.service
        # systemctl stop filebeat.service
        # systemctl stop kibana.service



    .. group-tab:: SysV Init

      .. code-block:: console

          # service logstash stop
          # service filebeat stop
          # service kibana stop

#. In case of having disabled the repository for Elastic Stack 6.x it can be enabled using:

  .. tabs::


    .. group-tab:: Yum

      .. code-block:: console

        # sed -i "s/^enabled=0/enabled=1/" /etc/yum.repos.d/elastic.repo



    .. group-tab:: APT

      .. code-block:: console

          # sed -i "s/#deb/deb/" /etc/apt/sources.list.d/elastic-6.x.list
          # apt-get update

    .. group-tab:: ZYpp

      .. code-block:: console

          # sed -i "s/^enabled=0/enabled=1/" /etc/zypp/repos.d/elastic.repo   

Upgrade Elasticsearch
---------------------

At Wazuh we have complete control of when a new Wazuh version is going to be released, but we don't have control over when a new Elasticsearch version is going to be released.

The current Wazuh Kibana plugin has been tested in Kibana version |ELASTIC_6_LATEST|. Each time a new version of the Elastic Stack is released we conduct a complete set of testing to ensure the correct behavior of our Wazuh Kibana plugin. After testing is done and any necessary adjustments have been performed we release a new version of the Wazuh Kibana plugin that is compatible with the new Filebeat/Elasticsearch/Kibana version.

If the repository is still enabled when Elastic releases a new version, the new Filebeat version would be installed on your system forcing the upgrade of Elasticsearch and Kibana.  If there is an accidental Filebeat (and consequently Kibana and Elasticsearch) upgrade, it's possible that the Wazuh Kibana plugin could become incompatible.

In order to anticipate and avoid this situation, it is recommended to disable the Elasticsearch repository in the following way:

#. Disable shard allocation:

    .. include:: ../../_templates/upgrading/common/disable_shard_allocation.rst

#. (Optional) Stop non-essential indexing and perform a synced flush:

    .. include:: ../../_templates/upgrading/common/stop_indexing.rst

#. Shut down the node:

    .. include:: ../../_templates/upgrading/common/stop_elastic.rst

4. Upgrade the node you shut down.

    .. tabs::


      .. group-tab:: Yum

        .. code-block:: console

          # yum install elasticsearch-|ELASTIC_6_LATEST|



      .. group-tab:: APT

        .. code-block:: console

            # apt-get install elasticsearch=|ELASTIC_6_LATEST|

  
      .. group-tab:: ZYpp

        .. code-block:: console

            # zypper install elasticsearch-|ELASTIC_6_LATEST|        

#. Restart the service.

    .. include:: ../../_templates/upgrading/common/enable_elastic.rst

#. Once the node is enabled, check that the node works properly:

    .. include:: ../../_templates/upgrading/common/check_upgrade.rst

#. Reenable shard allocation.

    .. include:: ../../_templates/upgrading/common/enable_shard_allocation.rst

#. Check if the shard allocation is finished:

    .. include:: ../../_templates/upgrading/common/check_shard_allocation.rst

    Once the shard allocation is finished, the next node in the cluster, if any, can be upgraded.   

#. Load the Wazuh template for Elasticsearch:

  .. code-block:: console

    # curl https://raw.githubusercontent.com/wazuh/wazuh/v|WAZUH_LATEST|/extensions/elasticsearch/6.x/wazuh-template.json | curl -X PUT "http://localhost:9200/_template/wazuh" -H 'Content-Type: application/json' -d @-

Upgrade Logstash
----------------

#. Upgrade logstash.

    .. tabs::


      .. group-tab:: Yum

        .. code-block:: console

          # yum install logstash-|ELASTIC_6_LATEST|


      .. group-tab:: APT

        .. code-block:: console

            # apt-get install logstash=|ELASTIC_6_LATEST|

  
      .. group-tab:: ZYpp

        .. code-block:: console

            # zypper install logstash-|ELASTIC_6_LATEST|

2. Download and set the Wazuh configuration for Logstash:

    .. tabs::


      .. group-tab:: Local configuration

        .. code-block:: console

          # cp /etc/logstash/conf.d/01-wazuh.conf /backup_directory/01-wazuh.conf.bak
          # curl -so /etc/logstash/conf.d/01-wazuh.conf https://raw.githubusercontent.com/wazuh/wazuh/v|WAZUH_LATEST|/extensions/logstash/6.x/01-wazuh-local.conf
          # usermod -a -G ossec logstash

      .. group-tab:: Remote configuration

        .. code-block:: console

          # cp /etc/logstash/conf.d/01-wazuh.conf /backup_directory/01-wazuh.conf.bak
          # curl -so /etc/logstash/conf.d/01-wazuh.conf https://raw.githubusercontent.com/wazuh/wazuh/v|WAZUH_LATEST|/extensions/logstash/6.x/01-wazuh-remote.conf

#. Start the Logstash service:

  .. tabs::


    .. group-tab:: Systemd


      .. code-block:: console

        # systemctl daemon-reload
        # systemctl start logstash.service

    .. group-tab:: SysV Init

      .. code-block:: console
      
        # service logstash start

Upgrade Filebeat
----------------

#. Upgrade Filebeat.

    .. tabs::


      .. group-tab:: Yum

        .. code-block:: console

          # yum install filebeat-|ELASTIC_6_LATEST|


      .. group-tab:: APT

        .. code-block:: console

            # apt-get install filebeat=|ELASTIC_6_LATEST|

  
      .. group-tab:: ZYpp

        .. code-block:: console

            # zypper install filebeat-|ELASTIC_6_LATEST|

#. Update the configuration file.

  .. code-block:: console

    # cp /etc/filebeat/filebeat.yml /backup/filebeat.yml.backup
    # curl -so /etc/filebeat/filebeat.yml https://raw.githubusercontent.com/wazuh/wazuh/v|WAZUH_LATEST|/extensions/filebeat/6.x/filebeat.yml
    # chmod go+r /etc/filebeat/filebeat.yml

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

          # yum install kibana-|ELASTIC_6_LATEST|



      .. group-tab:: APT

        .. code-block:: console

            # apt-get install kibana=|ELASTIC_6_LATEST|

  
      .. group-tab:: ZYpp

        .. code-block:: console

            # zypper install kibana-|ELASTIC_6_LATEST|

#. Remove generated bundles.

    .. include:: ../../_templates/upgrading/common/remove_generated_bundles.rst

#. Update file permissions. This will avoid several errors prior to updating the app.

    .. include:: ../../_templates/upgrading/common/update_kibana_file_permissions.rst

#. Upgrade the Wazuh app:

    .. tabs::


      .. group-tab:: Install from URL

        .. code-block:: console

          # cd /usr/share/kibana/
          # rm -rf optimize/bundles
          # sudo -u kibana NODE_OPTIONS="--max-old-space-size=3072" bin/kibana-plugin install https://packages.wazuh.com/wazuhapp/wazuhapp-|WAZUH_LATEST|_|ELASTIC_6_LATEST|.zip

      .. group-tab:: Install from the package

        .. code-block:: console

          # cd /usr/share/kibana/
          # rm -rf optimize/bundles
          # sudo -u kibana NODE_OPTIONS="--max-old-space-size=3072" bin/kibana-plugin install file:///path/wazuhapp-|WAZUH_LATEST|_|ELASTIC_6_LATEST|.zip

      .. warning::

        The Wazuh app installation process may take several minutes. Please wait patiently.

#. Restart Kibana.

    .. include:: ../../_templates/upgrading/common/enable_kibana.rst

Disabling repositories
----------------------

  .. tabs::


    .. group-tab:: Yum

      .. code-block:: console

        # sed -i "s/^enabled=1/enabled=0/" /etc/yum.repos.d/elastic.repo



    .. group-tab:: APT

      .. code-block:: console

          # sed -i "s/^deb/#deb/" /etc/apt/sources.list.d/elastic-6.x.list
          # apt-get update

        Alternatively, you can set the package state to ``hold``, which will stop updates (although you can still upgrade it manually using ``apt-get install``).

        .. code-block:: console

          # echo "elasticsearch hold" | sudo dpkg --set-selections
          # echo "kibana hold" | sudo dpkg --set-selections

    .. group-tab:: ZYpp

      .. code-block:: console

          # sed -i "s/^enabled=1/enabled=0/" /etc/zypp/repos.d/elastic.repo
