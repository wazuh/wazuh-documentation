.. Copyright (C) 2019 Wazuh, Inc.

.. meta:: :description: Learn how to install Wazuh manager on Debian

.. _wazuh_server_packages_deb:

Debian
======

To install the Wazuh server components on Debian 7 or higher versions, you have to install the relevant packages after you've added the repositories.

.. note:: Root user privileges are required to execute all the commands described below.

Adding the Wazuh repository
---------------------------

The first step to set up Wazuh is to add the Wazuh repository to your server or servers in the event you want to configure a Wazuh cluster. Alternatively, if you want to download the Wazuh manager package directly, or check the compatible versions, click :ref:`here <packages>`.

#. For this, the ``curl``, ``apt-transport-https``, ``lsb-release`` and ``gnupg2`` packages must be installed on your system. If they are not already present, install them using the commands below:

    .. code-block:: console

      # apt-get update
      # apt-get install curl apt-transport-https lsb-release gnupg2

#. Install the GPG key:

    .. code-block:: console

      # curl -s https://packages.wazuh.com/key/GPG-KEY-WAZUH | apt-key add -

#. Add the repository:

    .. code-block:: console

      # echo "deb https://packages.wazuh.com/3.x/apt/ stable main" | tee -a /etc/apt/sources.list.d/wazuh.list

#. Update the package information:

    .. code-block:: console

      # apt-get update

Remember to repeat the *Adding the Wazuh repository* steps in every system that will act as a Wazuh server.

Installing the Wazuh manager
----------------------------

Use your terminal to install the Wazuh manager:

  .. code-block:: console

    # apt-get install wazuh-manager

Once the process is completed, you can check the service status with:

  * For Systemd:

    .. code-block:: console

      # systemctl status wazuh-manager

  * For SysV Init:

    .. code-block:: console

      # service wazuh-manager status

Installing the Wazuh API
------------------------

Before starting, note that if you are setting up a Wazuh cluster, the Wazuh API has to be installed in the Wazuh master node and not in the Wazuh worker nodes.

#. NodeJS >= 4.6.1 is required to run the Wazuh API. If NodeJS in not installed, or your version is older than 4.6.1, we recommend that you add the official NodeJS repository like this:

    .. code-block:: console

      # curl -sL https://deb.nodesource.com/setup_8.x | bash -

    .. note::

        If you are using **Debian 7 (Wheezy)** you must install NodeJS 6 using the command below:

        .. code-block:: console

          # curl -sL https://deb.nodesource.com/setup_6.x | bash -

    and then, install NodeJS:

    .. code-block:: console

      # apt-get install nodejs

#. Install the Wazuh API. It will update NodeJS if necessary:

    .. code-block:: console

      # apt-get install wazuh-api

#. Once the process is complete, you can check the service status with:

    * For Systemd:

      .. code-block:: console

        # systemctl status wazuh-api

    * For SysV Init:

      .. code-block:: console

        # service wazuh-api status

.. note::
  Now, that the Wazuh API is installed, we strongly recommend securing the API. In the following document :ref:`securing_api` you will learn how to enable the HTTPS communication, how to change the default user and password and more.

.. _wazuh_server_packages_deb_filebeat:

Installing Filebeat
-------------------

Filebeat is the tool on the Wazuh server that securely forwards alerts and archived events to Elasticsearch. It has to be installed in every Wazuh manager server. To install it:

#. Add the Elastic repository and its GPG key:

    .. code-block:: console

      # apt-get install curl apt-transport-https
      # curl -s https://artifacts.elastic.co/GPG-KEY-elasticsearch | apt-key add -
      # echo "deb https://artifacts.elastic.co/packages/7.x/apt stable main" | tee /etc/apt/sources.list.d/elastic-7.x.list
      # apt-get update

#. Install Filebeat:

    .. code-block:: console

      # apt-get install filebeat=7.4.2

#. Download the Filebeat config file from the Wazuh repository. This is pre-configured to forward Wazuh alerts to Elasticsearch:

    .. code-block:: console

      # curl -so /etc/filebeat/filebeat.yml https://raw.githubusercontent.com/wazuh/wazuh/elastic-secured-3.10/extensions/filebeat/7.x/filebeat.yml

#. Download the alerts template for Elasticsearch:

    .. code-block:: console

      # curl -so /etc/filebeat/wazuh-template.json https://raw.githubusercontent.com/wazuh/wazuh/v3.10.2/extensions/elasticsearch/7.x/wazuh-template.json

#. Download the Wazuh module for Filebeat:

    .. code-block:: console

      # curl -s https://packages.wazuh.com/3.x/filebeat/wazuh-filebeat-0.1.tar.gz | tar -xvz -C /usr/share/filebeat/module

Disabling repositories
----------------------

In the installation guide, we described how to install and configure Wazuh and also how to install and configure Filebeat for use with Wazuh. We have complete control of when a new Wazuh version is going to be released, but we don't have control over when a new Elasticsearch version is going to be released.

In the Elastic Stack installation guide, we will show you how to install and configure Elasticsearch, Kibana and the Wazuh Kibana plugin. The current Wazuh Kibana plugin was tested in Kibana version 7.4.2. When Elasticsearch releases a new version and you upgrade your system, the new Filebeat version will be installed in your system forcing the upgrade of Elasticsearch and Kibana. We must conduct a complete set of testing to ensure the correct behavior of our Wazuh Kibana plugin when a new Elasticsearch version is released. Then we release a new version of the Wazuh Kibana plugin that is compatible with the new Filebeat/Elasticsearch/Kibana version.

If there is an accidental Filebeat (and consequently Kibana and Elasticsearch) upgrade, it's possible that the Wazuh Kibana plugin could become incompatible.

In order to anticipate and avoid this situation, we recommend disabling the Wazuh and Elasticsearch repositories in the following way:

  .. code-block:: console

    # sed -i "s/^deb/#deb/" /etc/apt/sources.list.d/wazuh.list
    # sed -i "s/^deb/#deb/" /etc/apt/sources.list.d/elastic-7.x.list
    # apt-get update

Alternatively, you can set the package state to ``hold``, which will stop updates (although you can still upgrade it manually using ``apt-get install``).

  .. code-block:: console

    # echo "wazuh-manager hold" | sudo dpkg --set-selections
    # echo "wazuh-api hold" | sudo dpkg --set-selections
    # echo "filebeat hold" | sudo dpkg --set-selections

Uninstall
---------

To uninstall the Wazuh manager and Wazuh API:

    .. code-block:: console

      # apt-get remove wazuh-manager wazuh-api

There are certain files marked as configuration files. Due to this designation, the package manager doesn't remove those files from the filesystem. A complete file removal can be done using the following command:

    .. code-block:: console

      # apt-get remove --purge wazuh-manager wazuh-api

To uninstall Filebeat:

    .. code-block:: console

      # apt-get remove filebeat

The Filebeat complete file removal can be accomplished with the following command:

    .. code-block:: console

      # apt-get remove --purge filebeat
