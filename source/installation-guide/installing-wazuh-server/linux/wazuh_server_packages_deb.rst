.. Copyright (C) 2019 Wazuh, Inc.

.. _wazuh_server_packages_deb:

Debian
======

For Debian 7 or greater, installing the Wazuh server components entails the installation of the relevant packages after adding the repositories.

.. note:: All the commands described below need to be executed with root user privileges.

Adding the Wazuh repository
---------------------------

The first step to setting up Wazuh is to add the Wazuh repository to your server or servers in case that you want to configure a Wazuh cluster. If you want to download the wazuh-manager package directly, or check the compatible versions, click :ref:`here <packages>`.

#. To perform this procedure, the ``curl``, ``apt-transport-https`` and ``lsb-release`` packages must be installed on your system. If they are not already present, install them using the commands below:

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

Remember to repeat the *Adding the Wazuh repository* steps in every server where you want to install the Wazuh manager.

Installing the Wazuh server
----------------------------

.. tabs::

  .. group-tab:: Single Wazuh node

    On your terminal, install the Wazuh manager:

      .. code-block:: console

        # apt-get install wazuh-manager

    Once the process is completed, you can check the service status with:

      * For Systemd:

        .. code-block:: console

          # systemctl status wazuh-manager

      * For SysV Init:

        .. code-block:: console

          # service wazuh-manager status

  .. group-tab:: Cluster Wazuh node

    **Wazuh server master node**

    On your terminal, install the Wazuh manager:

      .. code-block:: console

        # apt-get install wazuh-manager

    The Wazuh manager is installed and configured in a non-cluster mode (single-node mode) by default. Now, you need to configure the cluster mode by editing the following settings in ``/var/ossec/etc/ossec.conf`` in the Wazuh manager node that you want to be the *master node*:

      .. code-block:: xml

        <cluster>
            <name>wazuh</name>
            <node_name>master-node</node_name>
            <key>c98b62a9b6169ac5f67dae55ae4a9088</key>
            <node_type>master</node_type>
            <port>1516</port>
            <bind_addr>0.0.0.0</bind_addr>
            <nodes>
                <node>master</node>
            </nodes>
            <hidden>no</hidden>
            <disabled>no</disabled>
        </cluster>

    The parameters:

      - :ref:`name <cluster_name>`: Name that we will assign to the cluster.
      - :ref:`node_name <cluster_node_name>`: Name of the current node.
      - :ref:`key <cluster_key>`: The key must be 32 characters long and should be the same for all of the nodes of the cluster. You may use the following command to generate a random one:

        .. code-block:: console

          # openssl rand -hex 16

      - :ref:`node_type <cluster_node_type>`: Set the node type (master/worker).
      - :ref:`port <cluster_port>`: Destination port for cluster communication.
      - :ref:`bind_addr <cluster_bind_addr>`: This specifies which network IP the node will be bound in order to listen for incoming requests. (0.0.0.0 any IP).
      - :ref:`nodes <cluster_nodes>`: The address of the **master node** must be specified in all nodes (including the master itself). The address can be either an IP or a DNS.
      - :ref:`hidden <cluster_hidden>`: Toggles whether or not to show information about the cluster that generated an alert.
      - :ref:`disabled <cluster_disabled>`: Indicates whether the node will be enabled or not in the cluster.

    Once edited the ``/var/ossec/etc/ossec.conf`` configuration file, the Wazuh manager needs to be restarted:

      * For Systemd:

        .. code-block:: console

          # systemctl restart wazuh-manager

      * For SysV Init:

        .. code-block:: console

          # service wazuh-manager restart

    **Wazuh server worker nodes**

    After configuring the Wazuh manager master node, you need to configure the worker nodes (one or more). On your terminal, install the Wazuh manager:

      .. code-block:: console

        # apt-get install wazuh-manager

    By default, Wazuh manager is configured in a non-cluster mode (single-node mode). In order to configure them in cluster mode as workers you can do it as follow:

      .. code-block:: xml

        <cluster>
            <name>wazuh</name>
            <node_name>worker-node</node_name>
            <key>c98b62a9b6169ac5f67dae55ae4a9088</key>
            <node_type>worker</node_type>
            <port>1516</port>
            <bind_addr>0.0.0.0</bind_addr>
            <nodes>
                <node>master</node>
            </nodes>
            <hidden>no</hidden>
            <disabled>no</disabled>
        </cluster>

    As you can see in the previous example, you have to set the :ref:`node_type <cluster_node_type>` as ``worker``, give a name in :ref:`node_name <cluster_node_name>` (it has to be different in every node), the previously generated :ref:`key <cluster_key>` (the same for all nodes), the setting of the :ref:`nodes <cluster_nodes>` have to contain the master address (it can be either an IP or a DNS), and :ref:`disabled <cluster_disabled>` to ``no``.

    Once edited the ``/var/ossec/etc/ossec.conf`` configuration file, the Wazuh manager needs to be restarted:

      * For Systemd:

        .. code-block:: console

          # systemctl restart wazuh-manager

      * For SysV Init:

        .. code-block:: console

          # service wazuh-manager restart

    Finnally, you can check if the Wazuh cluster is working and connected with:

      .. code-block:: console

        # /var/ossec/bin/cluster_control -l
        NAME         TYPE    VERSION  ADDRESS
        master-node  master  3.10.2   10.0.0.3
        worker-node1 worker  3.10.2   10.0.0.4
        worker-node2 worker  3.10.2   10.0.0.5

    Note that ``10.0.0.3``, ``10.0.0.4``, ``10.0.0.5`` are examples IPs. You will find your Wazuh server nodes IPs.

Installing the Wazuh API
------------------------

Before to start, note that if you are setting up a Wazuh cluster, the Wazuh API has to be installed in the Wazuh master node. The Wazuh app must be configured to point to the master’s API.

#. NodeJS >= 4.6.1 is required in order to run the Wazuh API. If you do not have NodeJS installed or your version is older than 4.6.1, we recommend that you add the official NodeJS repository like this:

    .. code-block:: console

      # curl -sL https://deb.nodesource.com/setup_8.x | bash -

    .. note::

        If you are using **Debian 7 (Wheezy)** you must install NodeJS 6 using the command below:

        .. code-block:: console

          # curl -sL https://deb.nodesource.com/setup_6.x | bash -

    and then, install NodeJS:

    .. code-block:: console

      # apt-get install nodejs

#. Install the Wazuh API. It will update NodeJS if it is required:

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
      Now that the Wazuh API is installed, check out the section :ref:`securing_api` to set up some additional settings.

#. (Optional) Disable the Wazuh updates:

    It is recommended that the Wazuh repository be disabled in order to prevent accidental upgrades. To do this, use the following command:

    .. code-block:: console

      # sed -i "s/^deb/#deb/" /etc/apt/sources.list.d/wazuh.list
      # apt-get update

    Alternately, you can set the package state to ``hold``, which will stop updates (although you can still upgrade it manually using ``apt-get install``).

    .. code-block:: console

      # echo "wazuh-manager hold" | sudo dpkg --set-selections
      # echo "wazuh-api hold" | sudo dpkg --set-selections

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

      # apt-get install filebeat=7.3.2

#. Download the Filebeat config file from the Wazuh repository. This is pre-configured to forward Wazuh alerts to Elasticsearch:

    .. code-block:: console

      # curl -so /etc/filebeat/filebeat.yml https://raw.githubusercontent.com/wazuh/wazuh/elk-secured/extensions/filebeat/7.x/filebeat.yml

#. Download the alerts template for Elasticsearch:

    .. code-block:: console

      # curl -so /etc/filebeat/wazuh-template.json https://raw.githubusercontent.com/wazuh/wazuh/v3.10.2/extensions/elasticsearch/7.x/wazuh-template.json

#. Download the Wazuh module for Filebeat:

    .. code-block:: console

      # curl -s https://packages.wazuh.com/3.x/filebeat/wazuh-filebeat-0.1.tar.gz | tar -xvz -C /usr/share/filebeat/module

#. (Optional) Disable the Elasticsearch updates:

    In the installation guide we described how to install and configure Wazuh and also how to install and configure Filebeat with a Wazuh use purpose. We have absolute control of when a new Wazuh version is going to be released, but not when a new Elasticsearch version is going to be released.

    Currently, the Wazuh Kibana plugin it was tested in Kibana version 7.3.2. If Elasticsearch releases a new version and you upgrade your system, the new Filebeat version will be installed in your system, forcing the upgrade of Elasticsearch and Kibana. We can't ensure the correct behavior of our Wazuh Kibana plugin until a complete set of testing when a new Elasticsearch version is released. Then a new version of the Wazuh Kibana plugin will be released to ensure the complete compatibility with the new Filebeat/Elasticsearch/Kibana version.
    In case of accidental Filebeat (thus Kibana and Elasticsearch) upgrade, it's possible to have a non-compatible Wazuh Kibana plugin.

    In order to prevent this situation, it is recommended that the Elasticsearch repository be disabled as follow:

    .. code-block:: console

      # sed -i "s/^deb/#deb/" /etc/apt/sources.list.d/elastic-7.x.list
      # apt-get update

    Alternately, you can set the package state to ``hold``, which will stop updates (although you can still upgrade it manually using ``apt-get install``).

    .. code-block:: console

      # echo "elasticsearch hold" | sudo dpkg --set-selections
      # echo "kibana hold" | sudo dpkg --set-selections

Now, before to start the filebeat service, it's necessary to have the certificate generated in the Elasticsearch master node. This process will be described in :ref:`Elastic Stack <installation_elastic>`.



Uninstall
---------

To uninstall the Wazuh manager and Wazuh API:

    .. code-block:: console

      # apt-get remove wazuh-manager wazuh-api

There are files marked as configuration files. Due to this designation, the package manager doesn't remove those files from the filesystem. The complete files removal action can be done using the following command:

    .. code-block:: console

      # apt-get remove --purge wazuh-manager wazuh-api

To uninstall filebeat:

    .. code-block:: console

      # apt-get remove filebeat

The Filebeat complete files removal action can be done using the following command:

    .. code-block:: console

      # apt-get remove --purge filebeat
