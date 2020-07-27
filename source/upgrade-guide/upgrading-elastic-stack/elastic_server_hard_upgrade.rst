.. Copyright (C) 2020 Wazuh, Inc.

.. _elastic_server_hard_upgrade:

Upgrading Elastic Stack from a legacy version
=============================================

To upgrade Elasticsearch to the latest version from a version prior to ``6.8.x``, it is needed to first upgrade to Elasticsearch ``6.8.x`` as an intermediate step. Once Elastic Stack is on version ``6.x`` it can be upgraded to the :ref:`latest version <elastic_server_rolling_upgrade>`

Prepare the Elastic Stack
-------------------------

1. Stop the services:

  .. code-block:: console

    # systemctl stop logstash
    # systemctl stop filebeat
    # systemctl stop kibana

2. In case of having disabled the repository for Elastic Stack 6.x it can be enabled using:

  * For CentOS/RHEL/Fedora:

    .. code-block:: console

      # sed -i "s/^enabled=0/enabled=1/" /etc/yum.repos.d/elastic.repo

  * For Debian/Ubuntu:

    .. code-block:: console

      # sed -i "s/#deb/deb/" /etc/apt/sources.list.d/elastic-6.x.list
      # apt-get update

  * For openSUSE:

    .. code-block:: console

      # sed -i "s/^enabled=0/enabled=1/" /etc/zypp/repos.d/elastic.repo

Upgrade Elasticsearch
---------------------

1. Disable shard allocation

  .. code-block:: bash

    curl -X PUT "localhost:9200/_cluster/settings" -H 'Content-Type: application/json' -d'
    {
      "persistent": {
        "cluster.routing.allocation.enable": "primaries"
      }
    }
    '

2. Stop non-essential indexing and perform a synced flush. (Optional)

  .. code-block:: bash

    curl -X POST "localhost:9200/_flush/synced"

3. Shut down a single node.

  .. code-block:: console

    # systemctl stop elasticsearch

4. Upgrade the node you shut down.

  * For CentOS/RHEL/Fedora:

    .. code-block:: console

      # yum install elasticsearch-|ELASTIC_6_LATEST|

  * For Debian/Ubuntu:

    .. code-block:: console

      # apt-get install elasticsearch=|ELASTIC_6_LATEST|


These steps must be repeated in all the Elasticsearch nodes of the installation.

Upgrade Logstash
----------------

1. Upgrade the ``logstash`` package:

  a) For CentOS/RHEL/Fedora:

  .. code-block:: console

    # yum install logstash-|ELASTIC_6_LATEST|

  b) For Debian/Ubuntu:

  .. code-block:: console

    # apt-get install logstash=1:|ELASTIC_6_LATEST|-1


Upgrade Filebeat
----------------

1. Upgrade Filebeat.

  * For CentOS/RHEL/Fedora:

    .. code-block:: console

      # yum install filebeat-|ELASTIC_6_LATEST|

  * For Debian/Ubuntu:

    .. code-block:: console

      # apt-get install filebeat=|ELASTIC_6_LATEST|


Upgrade Kibana
--------------

1. Upgrade the ``kibana`` package:

  a) For CentOS/RHEL/Fedora:

  .. code-block:: console

    # yum install kibana-|ELASTIC_6_LATEST|

  b) For Debian/Ubuntu:

  .. code-block:: console

    # apt-get install kibana=|ELASTIC_6_LATEST|

2. Uninstall the Wazuh app from Kibana:

  a) Update file permissions. This will avoid several errors prior to updating the app:

  .. code-block:: console

    # chown -R kibana:kibana /usr/share/kibana/optimize
    # chown -R kibana:kibana /usr/share/kibana/plugins

  b) Remove the Wazuh app:

  .. code-block:: console

    # cd /usr/share/kibana/
    # sudo -u kibana bin/kibana-plugin remove wazuh


Disabling repositories
----------------------

    * For CentOS/RHEL/Fedora:

      .. code-block:: console

        # sed -i "s/^enabled=1/enabled=0/" /etc/yum.repos.d/elastic.repo

    * For Debian/Ubuntu:

      .. code-block:: console

        # sed -i "s/^deb/#deb/" /etc/apt/sources.list.d/elastic-6.x.list
        # apt-get update

      Alternatively, you can set the package state to ``hold``, which will stop updates (although you can still upgrade it manually using ``apt-get install``).

      .. code-block:: console

        # echo "elasticsearch hold" | sudo dpkg --set-selections
        # echo "kibana hold" | sudo dpkg --set-selections

    * For openSUSE:

      .. code-block:: console

        # sed -i "s/^enabled=1/enabled=0/" /etc/zypp/repos.d/elastic.repo

Now that the installation has been upgraded to 6.8.x version, it can be upgraded to the latest version available following the steps in the section :ref:`elastic_server_rolling_upgrade`.
