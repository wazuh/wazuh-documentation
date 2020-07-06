.. Copyright (C) 2020 Wazuh, Inc.

.. _upgrading_elastic_stack:

Upgrading Elastic Stack
=======================

This section guides through the upgrade process of Elastic Stack components including Elasticsearch, Filebeat and Kibana for both Open Distro for Elasticsearch and Elastic distributions. As some of the steps may differ depending on the distribution, the following tags will be used:

- [*OD*] - indicates that the step should be done only during the Open Distro for Elasticsearch upgrade.

- [*Elastic*] - indicates that the step should be done only during the Elastic upgrade.

.. note::
  This guide is meant for upgrades from 7.x to 7.y. The upgrade instructions for Elastic Stack in version prior to 7.0 can be found in the :ref:`Upgrading Elastic Stack from a legacy version <upgrading_elastic_stack_legacy>` section.

Preparing Elastic Stack
-----------------------

#. Stop the services:

    .. code-block:: console

      # systemctl stop filebeat
      # systemctl stop kibana

#. Prepare the repository:

    .. tabs::

      .. group-tab:: Open Distro for Elasticsearch

         If the Wazuh repository is disabled it is necessary to enable it to get the latest packages:

          * YUM:

            .. code-block:: console

              # sed -i "s/^enabled=0/enabled=1/" /etc/yum.repos.d/wazuh.repo

          * APT:

            This step is not necessary if the packages are set to a ``hold`` state instead of disabling the repository.

            .. code-block:: console

              # sed -i "s/^#deb/deb/" /etc/apt/sources.list.d/wazuh.list

          * ZYpp:

            .. code-block:: console

              # sed -i "s/^enabled=0/enabled=1/" /etc/zypp/repos.d/wazuh.repo

      .. group-tab:: Elastic

          In case of having disabled the repository for Elastic Stack 7.x it can be enabled using:

          * YUM:

            .. code-block:: console

              # sed -i "s/^enabled=0/enabled=1/" /etc/yum.repos.d/elastic.repo

          * APT:

            This step is not necessary if the packages are set to a ``hold`` state instead of disabling the repository.

            .. code-block:: console

              # sed -i "s/#deb/deb/" /etc/apt/sources.list.d/elastic-7.x.list
              # apt-get update

          * ZYpp:

            .. code-block:: console

              # sed -i "s/^enabled=0/enabled=1/" /etc/zypp/repos.d/elastic.repo

#. [*Elastic*] Before the upgrade process it is important to ensure that the Wazuh repository is disabled, as it contains Filebeat packages used by Open Distro for Elasticsearch distribution, which might be accidentally installed instead of the Elastic package.

   In case of having enabled the Wazuh repository it can be disabled using:

       .. tabs::

         .. group-tab:: YUM

           .. code-block:: console

             # sed -i "s/^enabled=1/enabled=0/" /etc/yum.repos.d/wazuh_pre.repo

         .. group-tab:: APT

           .. code-block:: console

             # sed -i "s/^deb/#deb/" /etc/apt/sources.list.d/wazuh_trash.list
             # apt-get update

         .. group-tab:: ZYpp

           .. code-block:: console

             # sed -i "s/^enabled=1/enabled=0/" /etc/zypp/repos.d/wazuh.repo


Upgrading Elasticsearch
-----------------------

This guide explains how to perform a rolling upgrade, which lets to shut down one node at a time for minimal disruption of service.
The cluster remains available throughout the process.

In the commands below ``127.0.0.1`` IP address is used. If Elasticsearch is bound to a specific IP address, replace ``127.0.0.1`` with your Elasticsearch IP. If using ``http`` instead of ``https`` the options ``-u`` and ``-k`` must be omitted.

#. Disable shard allocation:

    .. code-block:: bash

      curl -X PUT "https://127.0.0.1:9200/_cluster/settings"  -u <username>:<password> -k -H 'Content-Type: application/json' -d'
      {
        "persistent": {
          "cluster.routing.allocation.enable": "primaries"
        }
      }
      '

#. Stop non-essential indexing and perform a synced flush (optional):

    .. code-block:: bash

      curl -X POST "https://127.0.0.1:9200/_flush/synced" -u <username>:<password> -k

#. Shut down a single node:

    .. code-block:: console

      # systemctl stop elasticsearch

#. Upgrade the node you shut down:

      .. tabs::

        .. group-tab:: Open Distro for Elasticsearch

          * YUM:

            .. code-block:: console

              # yum install opendistroforelasticsearch-1.6.0

          * APT:

            Upgrade Elasticsearch OSS:

              .. code-block:: console

                # apt install elasticsearch-oss

            Upgrade Open Distro for Elasticsearch:

              .. code-block:: console

                # apt install opendistroforelasticsearch

          * ZYpp:

            .. code-block:: console

              # zypper update opendistroforelasticsearch-1.6.0

        .. group-tab:: Elastic

          * YUM:

            .. code-block:: console

              # yum install elasticsearch-|ELASTICSEARCH_LATEST|

          * APT:

            .. code-block:: console

              # apt-get install elasticsearch=|ELASTICSEARCH_LATEST|

          * ZYpp:

            .. code-block:: console

              # zypper update elasticsearch-|ELASTICSEARCH_LATEST|

#. [OD] Upgrade any additional plugins that you installed on the cluster. The package manager automatically upgrades Open Distro for Elasticsearch plugins (optional).


#. Restart the service:

    .. code-block:: console

      # systemctl daemon-reload
      # systemctl restart elasticsearch

#. Start the newly-upgraded node and confirm that it joins the cluster by checking the log file or by submitting a ``_cat/nodes`` request:

    .. code-block:: bash

      curl -X GET "https://127.0.0.1:9200/_cat/nodes" -u <username>:<password> -k

#. Reenable shard allocation:

    .. code-block:: bash

      curl -X PUT "https://127.0.0.1:9200/_cluster/settings" -u <username>:<password> -k -H 'Content-Type: application/json' -d'
      {
        "persistent": {
          "cluster.routing.allocation.enable": "all"
        }
      }
      '

#. Before upgrading the next node, wait for the cluster to finish shard allocation:

    .. code-block:: bash

      curl -X GET "https://127.0.0.1:9200/_cat/health?v" -u <username>:<password> -k

#. Repeat the steps for every Elasticsearch node.


Upgrading Filebeat
------------------

#. Upgrade Filebeat:

      .. tabs::

        .. group-tab:: Open Distro for Elasticsearch

          * YUM:

            .. code-block:: console

              # yum install filebeat

          * APT:

            .. code-block:: console

              # apt-get install filebeat

          * ZYpp:

            .. code-block:: console

              # zypper update filebeat


        .. group-tab:: Elastic

          * YUM:

            .. code-block:: console

              # yum install filebeat-|ELASTICSEARCH_LATEST|

          * APT:

            .. code-block:: console

              # apt-get install filebeat=|ELASTICSEARCH_LATEST|

          * ZYpp:

            .. code-block:: console

              # zypper update filebeat-|ELASTICSEARCH_LATEST|

#. Update the configuration file:

      .. tabs::

        .. group-tab:: Open Distro for Elasticsearch

          * All-in-One installation:

            .. code-block:: console

              # cp /etc/filebeat/filebeat.yml /backup/filebeat.yml.backup
              # curl -so /etc/filebeat/filebeat.yml https://raw.githubusercontent.com/wazuh/wazuh/new-documentation-templates/extensions/filebeat/7.x/filebeat_all_in_one.yml
              # chmod go+r /etc/filebeat/filebeat.yml

          * Distributed installation:

            .. code-block:: console

              # cp /etc/filebeat/filebeat.yml /backup/filebeat.yml.backup
              # curl -so /etc/filebeat/filebeat.yml https://raw.githubusercontent.com/wazuh/wazuh/new-documentation-templates/extensions/filebeat/7.x/filebeat.yml
              # chmod go+r /etc/filebeat/filebeat.yml

        .. group-tab:: Elastic

          .. code-block:: console

            # cp /etc/filebeat/filebeat.yml /backup/filebeat.yml.backup
            # curl -so /etc/filebeat/filebeat.yml https://raw.githubusercontent.com/wazuh/wazuh/v|WAZUH_LATEST|/extensions/filebeat/7.x/filebeat.yml
            # chmod go+r /etc/filebeat/filebeat.yml

#. Download the alerts template for Elasticsearch:

    .. code-block:: console

      # curl -so /etc/filebeat/wazuh-template.json https://raw.githubusercontent.com/wazuh/wazuh/v|WAZUH_LATEST|/extensions/elasticsearch/7.x/wazuh-template.json
      # chmod go+r /etc/filebeat/wazuh-template.json

#. Download the Wazuh module for Filebeat:

    .. code-block:: console

      # curl -s https://packages.wazuh.com/3.x/filebeat/wazuh-filebeat-0.1.tar.gz | sudo tar -xvz -C /usr/share/filebeat/module

#. Edit the ``/etc/filebeat/filebeat.yml`` configuration file:

      .. tabs::

        .. group-tab:: Open Distro for Elasticsearch

          This step is needed only for the upgrade of the ``Distributed installation``. In case of having ``All-in-one`` installation, the file is already configured.

          * Elasticsearch single-node:

            .. code-block:: yaml

              output.elasticsearch:
                hosts: ["<elasticsearch_ip>:9200"]

            Replace ``elasticsearch_ip`` with the IP address or the hostname of the Elasticsearch server.

          * Elasticsearch multi-node:

            .. code-block:: yaml

              output.elasticsearch:
                hosts: ["<elasticsearch_ip_node_1>:9200", "<elasticsearch_ip_node_2>:9200", "<elasticsearch_ip_node_3>:9200"]

            Replace ``elasticsearch_ip_node_x`` with the IP address or the hostname of the Elasticsearch server to connect to.

          During the installation, the default username and password were used. If those credentials were changed, replace those values in the ``filebeat.yml`` configuration file.

        .. group-tab::  Elastic

          Replace ``YOUR_ELASTIC_SERVER_IP`` with the IP address or the hostname of the Elasticsearch server. For example:

          .. code-block:: yaml

            output.elasticsearch.hosts: ['http://YOUR_ELASTIC_SERVER_IP:9200']

#. Restart Filebeat:

    .. code-block:: console

      # systemctl daemon-reload
      # systemctl restart filebeat

Upgrading Kibana
----------------

.. warning::
  Since Wazuh 3.12.0 release, regardless of the Elastic Stack version, the location of the Wazuh Kibana plugin configuration file has been moved from the ``/usr/share/kibana/plugins/wazuh/wazuh.yml``, for the version 3.11.x, and from the ``/usr/share/kibana/plugins/wazuh/config.yml``, for the version 3.10.x or older, to the ``/usr/share/kibana/optimize/wazuh/config/wazuh.yml``.

#. Copy the Wazuh Kibana plugin configuration file to its new location. This step is not needed for upgrades from 3.12.x to 3.13.x:

      .. tabs::

          .. group-tab:: For upgrades from 3.11.x to 3.13.x

              Create the new directory and copy the Wazuh Kibana plugin configuration file:

                .. code-block:: console

                  # mkdir -p /usr/share/kibana/optimize/wazuh/config
                  # cp /usr/share/kibana/plugins/wazuh/wazuh.yml /usr/share/kibana/optimize/wazuh/config/wazuh.yml


          .. group-tab:: For upgrades from 3.10.x or older to 3.13.x


              Create the new directory and copy the Wazuh Kibana plugin configuration file:

                    .. code-block:: console

                      # mkdir -p /usr/share/kibana/optimize/wazuh/config
                      # cp /usr/share/kibana/plugins/wazuh/config.yml /usr/share/kibana/optimize/wazuh/config/wazuh.yml


              Edit the ``/usr/share/kibana/optimize/wazuh/config/wazuh.yml`` configuration file and add to the end of the file the following default structure to define an Wazuh API entry:

                    .. code-block:: yaml

                      hosts:
                        - <id>:
                           url: http(s)://<api_url>
                           port: <api_port>
                           user: <api_user>
                           password: <api_password>

                    The following values need to be replaced:

                      -  ``<id>``: an arbitrary ID.

                      -  ``<api_url>``: url of the Wazuh API.

                      -  ``<api_port>``: port.

                      -  ``<api_user>``: credentials to authenticate.

                      -  ``<api_password>``: credentials to authenticate.

                    In case of having more Wazuh API entries, each of them must be added manually.



#. Remove the Wazuh Kibana plugin:

    .. code-block:: console

      # cd /usr/share/kibana/
      # sudo -u kibana bin/kibana-plugin remove wazuh

#. Upgrade Kibana:

      .. tabs::

        .. group-tab:: Open Distro for Elasticsearch

          * YUM:

            .. code-block:: console

              # yum install opendistroforelasticsearch-kibana

          * APT:

            .. code-block:: console

              # apt-get install opendistroforelasticsearch-kibana

          * ZYpp:

            .. code-block:: console

              # zypper update opendistroforelasticsearch-kibana

        .. group-tab::  Elastic

          * YUM:

            .. code-block:: console

              # yum install kibana-|ELASTICSEARCH_LATEST|

          * APT:

            .. code-block:: console

              # apt-get install kibana=|ELASTICSEARCH_LATEST|

          * ZYpp:

            .. code-block:: console

              # zypper update kibana=|ELASTICSEARCH_LATEST|

#. Remove generated bundles:

    .. code-block:: console

      # rm -rf /usr/share/kibana/optimize/bundles

#. Update file permissions. This will prevent errors when generating new bundles or updating the Wazuh Kibana plugin:

    .. code-block:: console

      # chown -R kibana:kibana /usr/share/kibana/optimize
      # chown -R kibana:kibana /usr/share/kibana/plugins

#. Install the Wazuh Kibana plugin:

    .. tabs::

      .. group-tab:: From the URL

        .. code-block:: console

          # cd /usr/share/kibana/
          # sudo -u kibana /usr/share/kibana/bin/kibana-plugin install https://s3-us-west-1.amazonaws.com/packages-dev.wazuh.com/trash/app/kibana/wazuhapp-3.13.0-tsc-opendistro.zip

      .. group-tab:: From the package

        .. code-block:: console

          # cd /usr/share/kibana/
          # sudo -u kibana bin/kibana-plugin install file:///path/wazuhapp-|WAZUH_LATEST|_|ELASTICSEARCH_LATEST|.zip



#. Update configuration file permissions:

    .. code-block:: console

      # sudo chown kibana:kibana /usr/share/kibana/optimize/wazuh/config/wazuh.yml
      # sudo chmod 600 /usr/share/kibana/optimize/wazuh/config/wazuh.yml

#. For installations on Kibana 7.6.x version and higher, it is recommended to increase the heap size of Kibana to ensure the Kibana's plugins installation:

    .. code-block:: console

      # cat >> /etc/default/kibana << EOF
      NODE_OPTIONS="--max_old_space_size=2048"
      EOF

#. [*OD*] Link Kibana’s socket to priviledged port 443:

    .. code-block:: console

      # setcap 'cap_net_bind_service=+ep' /usr/share/kibana/node/bin/node

#. Restart Kibana:

    .. code-block:: console

      # systemctl daemon-reload
      # systemctl restart kibana

Disabling the repository
^^^^^^^^^^^^^^^^^^^^^^^^

      .. tabs::

        .. group-tab:: Open Distro for Elasticsearch

           It is recommended to disable the Wazuh repository to prevent an upgrade to a newest Elastic Stack version due to the possibility of undoing changes with the Wazuh Kibana plugin:

            * YUM:

              .. code-block:: console

                # sed -i "s/^enabled=1/enabled=0/" /etc/yum.repos.d/wazuh_pre.repo

            * APT:

              .. code-block:: console

                # sed -i "s/^deb/#deb/" /etc/apt/sources.list.d/wazuh_trash.list
                # apt-get update

            * ZYpp:

              .. code-block:: console

                # sed -i "s/^enabled=1/enabled=0/" /etc/zypp/repos.d/wazuh.repo

        .. group-tab:: Elastic

           It is recommended to disable the Elastic repository to prevent an upgrade to a newest Elastic Stack version due to the possibility of undoing changes with the Wazuh Kibana plugin:

            * YUM:

              .. code-block:: console

                # sed -i "s/^enabled=1/enabled=0/" /etc/yum.repos.d/elastic.repo

            * APT:

              .. code-block:: console

                # sed -i "s/^deb/#deb/" /etc/apt/sources.list.d/elastic-7.x.list
                # apt-get update

              Alternatively, the user can set the package state to ``hold``, which will stop updates. It will be still possible to upgrade it manually using ``apt-get install``:

              .. code-block:: console

                # echo "elasticsearch hold" | sudo dpkg --set-selections
                # echo "filebeat hold" | sudo dpkg --set-selections
                # echo "kibana hold" | sudo dpkg --set-selections

            * ZYpp:

              .. code-block:: console

                # sed -i "s/^enabled=1/enabled=0/" /etc/zypp/repos.d/elastic.repo
