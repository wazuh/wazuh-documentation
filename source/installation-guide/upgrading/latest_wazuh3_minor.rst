.. Copyright (C) 2019 Wazuh, Inc.

.. _upgrading_latest_minor:

Upgrade from the same major version (3.x)
=========================================

The following steps show how to upgrade to the latest available version of Wazuh 3.x (which implies upgrading to the latest version of Elastic Stack 6.x).

Starting the upgrade
--------------------

If you followed our :ref:`manager <installation>` or :ref:`agents <installation_agents>` installation guides, probably you disabled the repository in order to avoid undesired upgrades. It's necessary to enable them again to get the last packages.

a) For CentOS/RHEL/Fedora:

  .. code-block:: console

    # sed -i "s/^enabled=0/enabled=1/" /etc/yum.repos.d/wazuh.repo

b) For Debian/Ubuntu:

  This step is not necessary if you set the packages to the ``hold`` state instead of disabling the repositories.

  .. code-block:: console

    # sed -i "s/^#deb/deb/" /etc/apt/sources.list.d/wazuh.list

Upgrade the Wazuh manager
^^^^^^^^^^^^^^^^^^^^^^^^^

.. note::
  Since Wazuh v3.7.0 the File Integrity Monitoring database is not used anymore. In order to add to Wazuh DB the file and registry entries stored from previous versions it's necessary to run the :ref:`FIM migration tool <fim_migrate>`.

1. Upgrade the ``wazuh-manager`` package:

  a) For CentOS/RHEL/Fedora:

  .. code-block:: console

    # yum upgrade wazuh-manager

  b) For Debian/Ubuntu:

  .. code-block:: console

    # apt-get update && apt-get install wazuh-manager

2. Upgrade the ``wazuh-api`` package:

  a) For CentOS/RHEL/Fedora:

  .. code-block:: console

    # yum upgrade wazuh-api

  b) For Debian/Ubuntu:

  .. code-block:: console

    # apt-get update 
    # apt-get install wazuh-api

.. note::
  The installation of the updated packages **will automatically restart the services** for the Wazuh manager, API and agents. Your Wazuh config file will keep **unmodified**, so you'll need to manually add the settings for the new capabilities. Check the :ref:`User Manual <user_manual>` for more information.

Upgrade the Wazuh agent
^^^^^^^^^^^^^^^^^^^^^^^

1. Upgrade the ``wazuh-agent`` package:

  a) For CentOS/RHEL/Fedora:

  .. code-block:: console

    # yum upgrade wazuh-agent

  b) For Debian/Ubuntu:

  .. code-block:: console

    # apt-get update 
    # apt-get install wazuh-agent

  c) For Windows:

  The agent upgrading process for Windows systems requires to download the latest available installer from the :ref:`packages list <packages>`. There are two ways of using it (both of them require **administrator rights**):

  * Using the GUI installer:

  Open the installer and follow the instructions to upgrade the agent.

    .. image:: ../../images/installation/windows.png
      :align: center

  * Using the command line:

  To upgrade the Windows agent from the command line, run the installer using Windows PowerShell or the command prompt (the ``/q`` argument is used for unattended installations):

  .. code-block:: console

    # wazuh-agent-3.9.0-1.msi /q

.. note::
  To learn more about the unattended installation process, you can check the :ref:`Windows installation guide <wazuh_agent_windows>`.

Finishing the Wazuh upgrade
^^^^^^^^^^^^^^^^^^^^^^^^^^^

You've finished upgrading your Wazuh installation to the latest version. Now you can disable again the Wazuh repositories in order to avoid undesired upgrades and compatibility issues.

a) For CentOS/RHEL/Fedora:

  .. code-block:: console

    # sed -i "s/^enabled=1/enabled=0/" /etc/yum.repos.d/wazuh.repo

b) For Debian/Ubuntu:

  This step is not necessary if you set the packages to the ``hold`` state instead of disabling the repositories.

  .. code-block:: console

    # sed -i "s/^deb/#deb/" /etc/apt/sources.list.d/wazuh.list
    # apt-get update

Upgrade to the latest Elastic Stack version
-------------------------------------------

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

    # sed -i "s/^#deb/deb/" /etc/apt/sources.list.d/elastic-7.x.list
    # apt-get update

Upgrade Elasticsearch
^^^^^^^^^^^^^^^^^^^^^

1. Upgrade the ``elasticsearch`` package:

  a) For CentOS/RHEL/Fedora:

  .. code-block:: console

    # yum install elasticsearch-7.0.0

  b) For Debian/Ubuntu:

  .. code-block:: console

    # apt-get install elasticsearch=7.0.0

2. Start the Elasticsearch service:

  .. code-block:: console

    # systemctl daemon-reload
    # systemctl enable elasticsearch.service
    # systemctl start elasticsearch.service

  It's important to wait until the Elasticsearch server finishes starting. Check the current status with the following command:

  .. code-block:: console

    # curl "http://localhost:9200/?pretty"

3. Load the Wazuh template for Elasticsearch:

  .. code-block:: console

    # curl https://raw.githubusercontent.com/wazuh/wazuh/3.9/extensions/elasticsearch/wazuh-elastic7-template-alerts.json | curl -X PUT "http://localhost:9200/_template/wazuh" -H 'Content-Type: application/json' -d @-

Upgrade Logstash
^^^^^^^^^^^^^^^^

1. Upgrade the ``logstash`` package:

  a) For CentOS/RHEL/Fedora:

  .. code-block:: console

    # yum install logstash-7.0.0

  b) For Debian/Ubuntu:

  .. code-block:: console

    # apt-get install logstash=1:7.0.0-1

2. Download and set the Wazuh configuration for Logstash:

  a) Local configuration:

    .. code-block:: console

      # cp /etc/logstash/conf.d/01-wazuh.conf /backup_directory/01-wazuh.conf.bak
      # curl -so /etc/logstash/conf.d/01-wazuh.conf https://raw.githubusercontent.com/wazuh/wazuh/3.9/extensions/logstash/01-wazuh-local-7.conf
      # usermod -a -G ossec logstash

  b) Remote configuration:

    .. code-block:: console

      # cp /etc/logstash/conf.d/01-wazuh.conf /backup_directory/01-wazuh.conf.bak
      # curl -so /etc/logstash/conf.d/01-wazuh.conf https://raw.githubusercontent.com/wazuh/wazuh/3.9/extensions/logstash/01-wazuh-remote-7.conf

3. Start the Logstash service:

  .. code-block:: console

    # systemctl daemon-reload
    # systemctl enable logstash.service
    # systemctl start logstash.service

Upgrade Kibana
^^^^^^^^^^^^^^

1. Upgrade the ``kibana`` package:

  a) For CentOS/RHEL/Fedora:

  .. code-block:: console

    # yum install kibana-7.0.0

  b) For Debian/Ubuntu:

  .. code-block:: console

    # apt-get install kibana=7.0.0

2. Uninstall the Wazuh app from Kibana:

  .. code-block:: console

    # sudo -u kibana /usr/share/kibana/bin/kibana-plugin remove wazuh

3. Upgrade the Wazuh app:

  .. code-block:: console

    # rm -rf /usr/share/kibana/optimize/bundles
    # chown -R kibana:kibana /usr/share/kibana/optimize
    # chown -R kibana:kibana /usr/share/kibana/plugins
    # sudo -u kibana /usr/share/kibana/bin/kibana-plugin install https://packages.wazuh.com/wazuhapp/wazuhapp-3.9.0_7.0.0.zip

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

    # yum install filebeat-7.0.0

  b) For Debian/Ubuntu:

  .. code-block:: console

    # apt-get update
    # apt-get install filebeat=7.0.0

2. Start the Filebeat service:

  .. code-block:: console

    # systemctl daemon-reload
    # systemctl enable filebeat.service
    # systemctl start filebeat.service

Official upgrading guides for the Elastic Stack
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

- `Upgrading Elasticsearch <https://www.elastic.co/guide/en/elasticsearch/reference/current/setup-upgrade.html>`_
- `Upgrading Logstash <https://www.elastic.co/guide/en/logstash/current/upgrading-logstash.html>`_
- `Upgrading Kibana <https://www.elastic.co/guide/en/kibana/current/upgrade.html>`_
- `Upgrading Filebeat <https://www.elastic.co/guide/en/beats/libbeat/current/upgrading.html>`_
