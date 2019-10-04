.. Copyright (C) 2019 Wazuh, Inc.

.. _elastic_stack_packages_deb:


Debian
======

For Debian 8 or 9, installing the Elastic stack components entails the installation of the relevant packages after adding the repositories.

.. note:: All the commands described below need to be executed with root user privileges.

Preparation
-----------

1. Add the Elastic repository and its GPG key in all the host in which you want to install Filebeat, Elasticsearch and/or Kibana:

  .. code-block:: console

    # apt-get update
    # apt-get install curl apt-transport-https
    # curl -s https://artifacts.elastic.co/GPG-KEY-elasticsearch | apt-key add -
    # echo "deb https://artifacts.elastic.co/packages/7.x/apt stable main" | tee /etc/apt/sources.list.d/elastic-7.x.list
    # apt-get update

Elasticsearch
-------------

Elasticsearch is a highly scalable full-text search and analytics engine. For more information, please see `Elasticsearch <https://www.elastic.co/products/elasticsearch>`_. Bellow, you can follow the type of installation depending of desired architecture, if you want to configure only one Elasticsearch node or if you want to configure a Elasticsearch cluster.

.. tabs::
  .. ************************************************* ************************* *************************************************
  .. *************************************************  Start of single node tab *************************************************
  .. ************************************************* ************************* *************************************************
  .. group-tab:: Single  node

    1. Install the Elasticsearch package:

      .. code-block:: console

        # apt-get install elasticsearch=7.3.2


    2. Once we have Elasticsearch installed we need to configure it by downloading and editing the file ``/etc/elasticsearch/elasticsearch.yml`` as follow:

      2.1. Download the Elasticsearch configuration file from the Wazuh repository:

        .. code-block:: console

          # curl -so /etc/elasticsearch/elasticsearch.yml https://raw.githubusercontent.com/wazuh/wazuh/elk-secured/extensions/elasticsearch/7.x/elasticsearch.yml

      2.2. Edit the file ``/etc/elasticsearch/elasticsearch.yml``

        .. code-block:: yaml

          network.host: <elasticsearch_ip>
          node.name: <node_name>
          cluster.initial_master_nodes: ["<node_name>"]

      Replace ``<elasticsearch_ip>`` and ``<node_name>`` with your desired values (host IP and host name).

    3. Configure Elastic Stack to use encrypted connections:

      3.1. Certificates creation. We need to create all certificates separated by component. After the creation, you will have to distribute into the host according to the component installed on those host. First, we will create the specification file ``/usr/share/elasticsearch/instances.yml``:

        .. code-block:: yaml

          instances:
          - name: "wazuh-manager"
            ip:
              - "10.0.0.2"
          - name: "elasticsearch"
            ip:
              - "10.0.0.3"
          - name: "kibana"
            ip:
              - "10.0.0.4"

        Replace the ``10.0.0.x`` IPs by your hosts' IPs. You could change the names, remove or add instances depending on your needs. In the next steps, we will create a file that contains a folder named as the instance defined here. This folder will contain the certificate and the key necessary to communicate using SSL with the Elasticsearch node.

      3.2. Create the certificates using the `elasticsearch-certutil <https://www.elastic.co/guide/en/elasticsearch/reference/current/certutil.html>`_ tool.

        .. code-block:: console

          # /usr/share/elasticsearch/bin/elasticsearch-certutil cert ca --pem --in instances.yml --out certs.zip

        This is the ``zip`` content:

        .. code-block:: console

          certs.zip
          |-- ca
          |   |-- ca.crt
          |-- wazuh-manager
          |   |-- wazuh-manager.crt
          |   |-- wazuh-manager.key
          |-- elasticsearch
          |   |-- elasticsearch.crt
          |   |-- elasticsearch.key
          |-- kibana
              |-- kibana.crt
              |-- kibana.key

        .. note:: The ``ca.crt`` file is shared for all the instances. The ``.crt`` and ``.key`` pairs are unique for each instance.

      3.3. Extract the generated ``/usr/share/elasticsearch/certs.zip`` file from the previous step. You can use ``unzip``:

        .. code-block:: console

          # unzip /usr/share/elasticsearch/certs.zip -d /usr/share/elasticsearch/

      3.4. Create the directory ``/etc/elasticsearch/certs``, then copy the certificate authorities, the certificate and the key there.

        .. code-block:: console

          # cd /usr/share/elasticsearch/
          # mkdir /etc/elasticsearch/certs/ca -p
          # cp -R ca/ elasticsearch/* /etc/elasticsearch/certs/
          # chown -R elasticsearch: /etc/elasticsearch/certs
          # chmod -R 770 /etc/elasticsearch/certs

        Note that, if you changed the node names in the step 3.1, you will have the folder with the name used there, instead ``elasticsearch``.

    4. Enable and start the Elasticsearch service:

      a) For Systemd:

      .. code-block:: console

        # systemctl daemon-reload
        # systemctl enable elasticsearch.service
        # systemctl start elasticsearch.service

      b) For SysV Init:

      .. code-block:: console

        # update-rc.d elasticsearch defaults 95 10
        # service elasticsearch start

    5. Generate credentials for all the Elastic Stack pre-built roles and users.

      .. code-block:: console

          # /usr/share/elasticsearch/bin/elasticsearch-setup-passwords auto

      Note down at least the password for the ``elastic`` user.

    6. Once Elasticsearch is up and running, we need to place the filebeat corresponding CA, certificate and key in the **in the Wazuh server host**, so the following steps needs to be done in the Wazuh server:

      6.1. Copy from the Elasticsearch node, the file `/usr/share/elasticsearch/certs.zip` into the Wazuh server. You could use `scp` or others. Let's suppose that the file was copied into ``/usr/share/filebeat/``

      6.2. Extract the certificates file:

        .. code-block:: console

          # unzip /usr/share/filebeat/certs.zip -d /usr/share/filebeat/

      6.3. Create the directory ``/etc/filebeat/certs``, then copy the certificate authorities, the certificate and the key there.

        .. code-block:: console

            # cd /usr/share/filebeat/
            # mkdir /etc/filebeat/certs/ca -p
            # cp -R ca/ wazuh-manager/* /etc/wazuh-manager/certs/
            # chmod 770 -R /etc/filebeat/certs

        Note that, if you changed the node names in the step 3.1, you will have the folder with the name used there, instead ``wazuh-manager``.

      6.4 Setting up credentials for Filebeat. Change the following line, with the previously generated Elasticsearch password, in the file ``/etc/filebeat/filebeat.yml``.

      .. code-block:: yaml

        output.elasticsearch.password: "password_generated_for_elastic"

      6.5. Enable and start the Filebeat service:

        * For Systemd:

          .. code-block:: console

            # systemctl daemon-reload
            # systemctl enable filebeat.service
            # systemctl start filebeat.service

        * For SysV Init:

          .. code-block:: console

            # chkconfig --add filebeat
            # service filebeat start

      6.6. Load the Filebeat template:

        .. code-block:: console

          # filebeat setup --index-management -E setup.template.json.enabled=false

  .. ************************************************* ******************** *************************************************
  .. ************************************************* Start of Cluster tab *************************************************
  .. ************************************************* ******************** *************************************************
  .. group-tab:: Cluster

    1. Install the Elasticsearch package:

      .. code-block:: console

        # apt-get install elasticsearch=7.3.2


    2. Once we have Elasticsearch installed we need to configure it by downloading and editing the file ``/etc/elasticsearch/elasticsearch.yml`` as follow:

      2.1. Download the Elasticsearch configuration file from the Wazuh repository:

        .. code-block:: console

          # curl -so /etc/elasticsearch/elasticsearch.yml https://raw.githubusercontent.com/wazuh/wazuh/elk-secured/extensions/elasticsearch/7.x/elasticsearch.yml

      2.2. Edit the file ``/etc/elasticsearch/elasticsearch.yml``

        .. code-block:: yaml

          network.host: <elasticsearch_ip>
          node.name: <node_name>
          cluster.name: <elastic_cluster>
          cluster.initial_master_nodes:
	          - <master_node_1>
	          - <master_node_2>
 	          - <master_node_3>
          discovery.seed_hosts:
	          - <elasticsearch_ip_node1>
	          - <elasticsearch_ip_node2>
	          - <elasticsearch_ip_node3>

      The values to be replaced:
        - ``<elasticsearch_ip>``: the host IP. I.e: ``10.0.0.2``.
        - ``<node_name>``: The node name. I.e: ``elastic-master1``.
        - ``<elastic_cluster>``: The cluster name. I.e: ``elastic-cluster-production``.
        - ``<elasticsearch_ip_nodeX>``: others Elasticsearch cluster nodes IPs. I.e: ``10.0.0.3``.
        - ``<master_node_X>``: others elasticsearch master node names. I.e: ``elastic-master2``.

    3. Configure Elastic Stack to use encrypted connections:

      3.1. Certificates creation. The steps 3.1 and 3.2 needs to be executed only in the Elasticsearch master node. We need to create all certificates separated by component. After the creation, you will have to distribute into the host according to the component installed on those host. First, we will create the specification file ``/usr/share/elasticsearch/instances.yml``:

        .. code-block:: yaml

          instances:
          - name: "wazuh-manager"
            ip:
              - "10.0.0.2"
          - name: "elasticsearch-node1"
            ip:
              - "10.0.0.3"
          - name: "elasticsearch-node2"
            ip:
              - "10.0.0.4"
          - name: "elasticsearch-node3"
            ip:
              - "10.0.0.5"
          - name: "kibana"
            ip:
              - "10.0.0.6"

        Replace the ``10.0.0.x`` IPs by your hosts IPs.

      3.2. Create the certificates using the `elasticsearch-certutil <https://www.elastic.co/guide/en/elasticsearch/reference/current/certutil.html>`_ tool.

        .. code-block:: console

          # /usr/share/elasticsearch/bin/elasticsearch-certutil cert ca --pem --in instances.yml --out certs.zip

        This is the ``zip`` content:

        .. code-block:: console

          certs.zip
          |-- ca
          |   |-- ca.crt
          |-- wazuh-manager
          |   |-- wazuh-manager.crt
          |   |-- wazuh-manager.key
          |-- elasticsearch-node1
          |   |-- elasticsearch-node1.crt
          |   |-- elasticsearch-node1.key
          |-- elasticsearch-node2
          |   |-- elasticsearch-node2.crt
          |   |-- elasticsearch-node2.key
          |-- elasticsearch-node3
          |   |-- elasticsearch-node3.crt
          |   |-- elasticsearch-node3.key
          |-- kibana
              |-- kibana.crt
              |-- kibana.key

        .. note:: The ``ca.crt`` file is shared for all the instances. The ``.crt`` and ``.key`` pairs are unique for each instance.

      3.3. Extract the generated ``/usr/share/elasticsearch/certs.zip`` file from the previous step. You can use ``unzip``:

        .. code-block:: console

          # unzip /usr/share/elasticsearch/certs.zip -d /usr/share/elasticsearch/

      3.4. Create the directory ``/etc/elasticsearch/certs``, then copy the certificate authorities, the certificate and the key there.

        .. code-block:: console

          # cd /usr/share/elasticsearch/
          # mkdir /etc/elasticsearch/certs/ca -p
          # cp ca/ca.crt /etc/elasticsearch/certs/ca
          # cp elasticsearch/elasticsearch.crt /etc/elasticsearch/certs
          # cp elasticsearch/elasticsearch.key /etc/elasticsearch/certs
          # chown -R elasticsearch: /etc/elasticsearch/certs
          # chmod -R 770 /etc/elasticsearch/certs

    4. Enable and start the Elasticsearch service:

      a) For Systemd:

      .. code-block:: console

        # systemctl daemon-reload
        # systemctl enable elasticsearch.service
        # systemctl start elasticsearch.service

      b) For SysV Init:

      .. code-block:: console

        # update-rc.d elasticsearch defaults 95 10
        # service elasticsearch start

    .. note: The file `cert.zip` has to be copied in *all* nodes with Elasticsearch, filebeat and/or Kibana. For the Elasticsearch nodes, you have to follow the steps 3.3, 3.4 and 4.

    5. Generate credentials for all the Elastic Stack pre-built roles and users.

      .. code-block:: console

          # /usr/share/elasticsearch/bin/elasticsearch-setup-passwords auto

      Note down at least the password for the ``elastic`` user.

    6. Once Elasticsearch is up and running, we need to place the filebeat corresponding CA, certificate and key in the **in the Wazuh server host**, so the following steps needs to be done in the Wazuh server:

      5.1. Copy from the Elasticsearch node, the file `/usr/share/elasticsearch/certs.zip` into the Wazuh server. You could use `scp` or others. Let's suppose that the file was copied into ``/usr/share/filebeat/``

      5.2. Extract the certificates file:

        .. code-block:: console

          # unzip /usr/share/filebeat/certs.zip -d /usr/share/filebeat/

      5.3. Create the directory ``/etc/filebeat/certs``, then copy the certificate authorities, the certificate and the key there.

        .. code-block:: console

            # cd /usr/share/filebeat/
            # mkdir /etc/filebeat/certs/ca -p
            # cp ca/ca.crt /etc/filebeat/certs/ca
            # cp wazuh-manager/wazuh-manager.crt /etc/filebeat/certs
            # cp wazuh-manager/wazuh-manager.key /etc/filebeat/certs
            # chmod 770 -R /etc/filebeat/certs

      5.4 Setting up credentials for Filebeat. Change the following line, with the previously generated Elasticsearch password, in the file ``/etc/filebeat/filebeat.yml``.

        .. code-block:: yaml

          output.elasticsearch.password: "password_generated_for_elastic"

      In addition to this, it is necessary to add all elasticsearch nodes to the output configuration:

        .. code-block:: yaml

          output.elasticsearch:
            hosts: ['<elasticsearch_ip_node1>:9200','<elasticsearch_ip_node2>:9200','<elasticsearch_ip_node3>:9200']
            loadbalance: true

      5.5. Enable and start the Filebeat service:

        * For Systemd:

          .. code-block:: console

            # systemctl daemon-reload
            # systemctl enable filebeat.service
            # systemctl start filebeat.service

        * For SysV Init:

          .. code-block:: console

            # chkconfig --add filebeat
            # service filebeat start

      5.6. Load the Filebeat template:

        .. code-block:: console

          # filebeat setup --index-management -E setup.template.json.enabled=false

.. _install_kibana_app_deb:

Kibana
------

Kibana is a flexible and intuitive web interface for mining and visualizing the events and archives stored in Elasticsearch. Find more information at `Kibana <https://www.elastic.co/products/kibana>`_.

1. Install the Kibana package:

  .. code-block:: console

    # apt-get install kibana=7.3.2

2. Configure certificates. Copy from the Elasticsearch node, the file `/usr/share/elasticsearch/certs.zip` into the Wazuh server. You could use `scp` or others. Let's suppose that the file was copied into ``/usr/share/kibana/``

  2.1. Extract the certificates file:

    .. code-block:: console

      # unzip /usr/share/kibana/certs.zip -d /usr/share/kibana/

  2.2. Create the directory ``/etc/kibana/certs``, then copy the certificate authorities, the certificate and the key there.

    .. code-block:: console

        # cd /usr/share/kibana/
        # mkdir /etc/kibana/certs/ca -p
        # cp -R ca/ kibana/* /etc/kibana/certs/
        # chmod 770 -R /etc/kibana/certs
        # chown -R kibana:kibana /etc/kibana/


3. Once we have Kibana installed we need to configure it by downloading and editing the file ``/etc/kibana/kibana.yml`` as follow:

  3.1. Download the Kibana configuration file from the Wazuh repository:

        .. code-block:: console

          # curl -so /etc/kibana/kibana.yml https://raw.githubusercontent.com/wazuh/wazuh/elk-secured/extensions/kibana/7.x/kibana.yml

  3.2 Edit the file ``/etc/kibana/kibana.yml``:

    .. code-block:: yaml

        server.host: "<kibana_ip>"
        elasticsearch.hosts: ["https://<elasticsearch_ip>:9200"]
        elasticsearch.password: "<password_generated_for_elastic>"

    The values to be replaced:

      - ``<elasticsearch_ip>``: the host IP. I.e: ``10.0.0.2``. You can separate by commas the Elasticsearch nodes if you have more than one Elasticsearch node.
      - ``<kibana_ip>``: Kibana will only listen on the loopback interface (localhost) by default, which means that it can be only accessed from the same machine. To access Kibana from the outside make it listen on its network IP by replacing ``<kibana_ip>`` with the Kibana host IP. I.e: ``10.0.0.2``.
      - ``<password_generated_for_elastic>``: The password generated in step 5. I.e: ``IJB8YtGoTgrpaPdGZbSO``.

4. Install the Wazuh app plugin for Kibana:

  * Install from URL:

  .. code-block:: console

    # sudo -u kibana /usr/share/kibana/bin/kibana-plugin install https://packages.wazuh.com/wazuhapp/wazuhapp-3.10.0_7.3.2.zip

  * Install from the package:

  .. code-block:: console

     # sudo -u kibana /usr/share/kibana/bin/kibana-plugin install file:///path/wazuhapp-3.10.0_7.3.2.zip

  .. note:: The `path` should have *read* permissions for *others*. E.g: The directory `/tmp/` accomplishes this.

5. Enable and start the Kibana service:

  a) For Systemd:

  .. code-block:: console

    # systemctl daemon-reload
    # systemctl enable kibana.service
    # systemctl start kibana.service

  b) For SysV Init:

  .. code-block:: console

    # update-rc.d kibana defaults 95 10
    # service kibana start

6. (Optional) Disable the Elasticsearch updates:

  It is recommended that the Elasticsearch repository be disabled in order to prevent an upgrade to a newer Elastic Stack version due to the possibility of undoing changes with the App. To do this, use the following command in all the hosts that you have installed Filebeat, Elasticsearch and/or Kibana:

  .. code-block:: console

    # sed -i "s/^deb/#deb/" /etc/apt/sources.list.d/elastic-7.x.list
    # apt-get update

  Alternately, you can set the package state to ``hold``, which will stop updates (although you can still upgrade it manually using ``apt-get install``).

  .. code-block:: console

    # echo "elasticsearch hold" | sudo dpkg --set-selections
    # echo "kibana hold" | sudo dpkg --set-selections

.. note:: The Kibana service listens on the default port 5601.

Next steps
----------

Once the Wazuh and Elastic Stack servers are installed and connected, you can install and connect Wazuh agents. Follow :ref:`this guide <installation_agents>` and read the instructions for your specific environment.

You can also read the Kibana app :ref:`user manual <kibana_app>` to learn more about its features and how to use it.

Uninstall
---------

To uninstall Elasticsearch:

    .. code-block:: console

      # apt-get remove elasticsearch

There are files marked as configuration and data files. Due to this designation, the package manager doesn't remove those files from the filesystem. The complete files removal action is a user responsibility. It can be done by removing the folder ``/var/lib/elasticsearch`` and ``/etc/elasticsearch``.

To uninstall Kibana:

    .. code-block:: console

      # apt-get remove kibana

As in the previous case, the complete files removal can be done by removing the folder ``/var/lib/kibana`` and ``/etc/kibana``.
