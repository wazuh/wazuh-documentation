.. _upgrading_latest_minor:

Upgrade to the latest version of Wazuh 3.x
================================================

The following steps show how to upgrade to the latest available version of Wazuh 3.x (which implies upgrading to the latest version of Elastic Stack 6.x).

Upgrade the Wazuh agent
-----------------------

1. Upgrade the ``wazuh-agent`` package:

  a) For CentOS/RHEL/Fedora:

  .. code-block:: console

    # yum upgrade wazuh-agent

  b) For Debian/Ubuntu:

  .. code-block:: console

    # apt-get update && apt-get install --only-upgrade wazuh-agent

  c) For Windows:

  The agent upgrading process for Windows systems requires to download the latest available installer from the :ref:`packages list <packages>`. There are two ways of using it (both of them require **administrator rights**):

  * Using the GUI installer:

  Open the installer and follow the instructions to upgrade the agent.

    .. image:: ../../images/installation/windows.png
      :align: center

  * Using the command line:

  To upgrade the Windows agent from the command line, run the installer using Windows PowerShell or the command prompt (the /q argument is used for unattended installations):

  .. code-block:: console

    # wazuh-agent-3.2.1-1.msi /q

.. note::
  To learn more about the unattended installation process, you can check the :ref:`Windows installation guide <wazuh_agent_windows>`.

Upgrade the Wazuh manager
-------------------------

1. Upgrade the ``wazuh-manager`` package:

  a) For CentOS/RHEL/Fedora:

  .. code-block:: console

    # yum upgrade wazuh-manager

  b) For Debian/Ubuntu:

  .. code-block:: console

    # apt-get update && apt-get install --only-upgrade wazuh-manager

2. Upgrade the ``wazuh-api`` package:

  a) For CentOS/RHEL/Fedora:

  .. code-block:: console

    # yum upgrade wazuh-api

  b) For Debian/Ubuntu:

  .. code-block:: console

    # apt-get update && apt-get install --only-upgrade wazuh-api

.. note::
  The installation of the updated packages **will automatically restart the services** for the Wazuh manager, API and agents. Your Wazuh config file will keep **unmodified**, so you'll need to manually add the settings for the new capabilities. Check the :ref:`User Manual <user_manual>` for more information.

Upgrade to the latest Elastic Stack version
-------------------------------------------

Since the release of Wazuh 3.0.0, there's been several updates to the 6.x version of the Elastic Stack, introducing several bugfixes and important changes. In order to use the latest version of Wazuh, it's necessary to install the latest compatible Elastic Stack packages.

1. Stop the services:

  .. code-block:: console

    # systemctl stop filebeat
    # systemctl stop logstash
    # systemctl stop kibana
    # systemctl stop elasticsearch

2. Enable the Elastic repository:

  If you followed our :ref:`Elastic Stack Installation Guide <installation_elastic>`, probably you disabled the repository in order to avoid undesired upgrades for the Elastic Stack. It's necessary to enable them again to get the last packages.

  a) For CentOS/RHEL/Fedora:

  .. code-block:: console

    # sed -i "s/^enabled=0/enabled=1/" /etc/yum.repos.d/elastic.repo

  b) For Debian/Ubuntu:

  .. code-block:: console

    # sed -i "s/^#deb/deb/" /etc/apt/sources.list.d/elastic-6.x.list
    # apt-get update

Upgrade Elasticsearch
^^^^^^^^^^^^^^^^^^^^^

1. Upgrade the ``elasticsearch`` package:

  a) For CentOS/RHEL/Fedora:

  .. code-block:: console

    # yum install elasticsearch-6.2.2

  b) For Debian/Ubuntu:

  .. code-block:: console

    # apt-get install elasticsearch=6.2.2

2. Start the Elasticsearch service:

  .. code-block:: console

    # systemctl daemon-reload
    # systemctl enable elasticsearch.service
    # systemctl start elasticsearch.service

  It's important to wait until the Elasticsearch server finishes starting. Check the current status with the following command, which should give you a response like the shown below:

  .. code-block:: console

    # curl localhost:9200/?pretty

    {
      "name" : "5urh-FJ",
      "cluster_name" : "elasticsearch",
      "cluster_uuid" : "B5rXKBg2Tr-KWwFdbDHJQg",
      "version" : {
        "number" : "6.2.2",
        "build_hash" : "7299dc3",
        "build_date" : "2018-02-07T19:34:26.990113Z",
        "build_snapshot" : false,
        "lucene_version" : "7.2.1",
        "minimum_wire_compatibility_version" : "5.6.0",
        "minimum_index_compatibility_version" : "5.0.0"
      },
      "tagline" : "You Know, for Search"
    }

3. Load the Wazuh template for Elasticsearch:

  .. code-block:: console

    # curl https://raw.githubusercontent.com/wazuh/wazuh/3.2/extensions/elasticsearch/wazuh-elastic6-template-alerts.json | curl -XPUT 'http://localhost:9200/_template/wazuh' -H 'Content-Type: application/json' -d @-

Upgrade Logstash
^^^^^^^^^^^^^^^^

1. Upgrade the ``logstash`` package:

  a) For CentOS/RHEL/Fedora:

  .. code-block:: console

    # yum install logstash-6.2.2

  b) For Debian/Ubuntu:

  .. code-block:: console

    # apt-get install logstash=1:6.2.2-1

2. Start the Logstash service:

  .. code-block:: console

    # systemctl daemon-reload
    # systemctl enable logstash.service
    # systemctl start logstash.service

.. note::
  This is an upgrade of the same major version of the Elastic Stack, so it's not neccesary to set again the Wazuh configuration file for Logstash.

Upgrade Kibana
^^^^^^^^^^^^^^

1. Upgrade the ``kibana`` package:

  a) For CentOS/RHEL/Fedora:

  .. code-block:: console

    # yum install kibana-6.2.2

  b) For Debian/Ubuntu:

  .. code-block:: console

    # apt-get install kibana=6.2.2

2. Uninstall the Wazuh app from Kibana:

  .. code-block:: console

    # /usr/share/kibana/bin/kibana-plugin remove wazuh

3. Upgrade the Wazuh app:

  a) Increase the default Node.js heap memory limit to prevent out of memory errors when installing the Wazuh app:

  .. code-block:: console

    # export NODE_OPTIONS="--max-old-space-size=3072"

  b) Install the Wazuh app:

  .. code-block:: console

    # rm -rf /usr/share/kibana/optimize/bundles
    # /usr/share/kibana/bin/kibana-plugin install https://packages.wazuh.com/wazuhapp/wazuhapp-3.2.1_6.2.2.zip

.. warning::
  The Wazuh app installation process may take several minutes. Please wait patiently.

4. Start the Kibana service:

  .. code-block:: console

    # systemctl daemon-reload
    # systemctl enable kibana.service
    # systemctl start kibana.service

Upgrade Filebeat
^^^^^^^^^^^^^^^^

1. Upgrade the ``filebeat`` package:

  a) For CentOS/RHEL/Fedora:

  .. code-block:: console

    # yum install filebeat-6.2.2

  b) For Debian/Ubuntu:

  .. code-block:: console

    # apt-get update
    # apt-get install filebeat=6.2.2

2. Start the Filebeat service:

  .. code-block:: console

    # systemctl daemon-reload
    # systemctl enable filebeat.service
    # systemctl start filebeat.service

You've finished upgrading your Wazuh installation to the latest version. Now you can disable again the Elastic Stack repositories in order to avoid undesired upgrades and compatibility issues with the Wazuh app.

a) For CentOS/RHEL/Fedora:

.. code-block:: console

  # sed -i "s/^enabled=1/enabled=0/" /etc/yum.repos.d/elastic.repo

b) For Debian/Ubuntu:

.. code-block:: console

  # sed -i "s/^deb/#deb/" /etc/apt/sources.list.d/elastic-6.x.list
  # apt-get update

Official upgrading guides for the Elastic Stack:

  - `Upgrading Elasticsearch <https://www.elastic.co/guide/en/elasticsearch/reference/current/setup-upgrade.html>`_
  - `Upgrading Logstash <https://www.elastic.co/guide/en/logstash/current/upgrading-logstash.html>`_
  - `Upgrading Kibana <https://www.elastic.co/guide/en/kibana/current/upgrade.html>`_
  - `Upgrading Filebeat <https://www.elastic.co/guide/en/beats/libbeat/6.0/upgrading.html>`_
