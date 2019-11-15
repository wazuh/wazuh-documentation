.. Copyright (C) 2019 Wazuh, Inc.

.. meta:: :description: Learn how to install Elastic Stack for using Wazuh on Amazon Linux

.. _elastic_stack_packages_amazon:


Amazon Linux
============

To install the Elastic Stack components on Amazon Linux 1 or higher versions, you have to install the relevant packages after you've added the repositories.

.. note:: Root user privileges are necessary to execute all the commands described below.

Adding the Elastic Stack repository
-----------------------------------

#.. Add the Elastic repository and its GPG key:

  .. code-block:: console

    # rpm --import https://packages.elastic.co/GPG-KEY-elasticsearch
    # cat > /etc/yum.repos.d/elastic.repo << EOF
    [elasticsearch-7.x]
    name=Elasticsearch repository for 7.x packages
    baseurl=https://artifacts.elastic.co/packages/7.x/yum
    gpgcheck=1
    gpgkey=https://artifacts.elastic.co/GPG-KEY-elasticsearch
    enabled=1
    autorefresh=1
    type=rpm-md
    EOF

Installing Elasticsearch
------------------------

Elasticsearch is a highly scalable full-text search and analytics engine. For more information, please see `Elasticsearch <https://www.elastic.co/products/elasticsearch>`_. Below, you can follow the type of installation with regard to the desired architecture and whether you want to configure only one Elasticsearch node or if you want to configure an Elasticsearch cluster.

.. tabs::
  .. ************************************************* ************************* *************************************************
  .. *************************************************  Start of single node tab *************************************************
  .. ************************************************* ************************* *************************************************
  .. group-tab:: Single node

    1. Install the Elasticsearch package:

      .. code-block:: console

        # yum install elasticsearch-7.4.2


    2. Once Elasticsearch is installed we need to configure it by downloading and editing the file ``/etc/elasticsearch/elasticsearch.yml`` as follows:

      2.1. Download the Elasticsearch configuration file from the Wazuh repository:

        .. code-block:: console

          # curl -so /etc/elasticsearch/elasticsearch.yml https://raw.githubusercontent.com/wazuh/wazuh/elk-secured/extensions/elasticsearch/7.x/elasticsearch.yml

      2.2. Edit the file ``/etc/elasticsearch/elasticsearch.yml``

        .. code-block:: yaml

          network.host: <elasticsearch_ip>
          node.name: <node_name>
          cluster.initial_master_nodes: ["<node_name>"]

      Replace ``<elasticsearch_ip>`` and ``<node_name>`` with your desired values (host IP and host name). For ``<elasticsearch_ip>`` the value ``0.0.0.0`` is an acceptable IP address and will bind to all network interfaces.

    3. Configure Elastic Stack to use encrypted connections:

      3.1. We need to create all certificates separated by host. After you’ve created them, you will have to distribute each certificate to the host on which the corresponding component is installed. First, we will create the specification file ``/usr/share/elasticsearch/instances.yml``:

        .. code-block:: yaml

          instances:
          - name: "filebeat"
            ip:
              - "10.0.0.2"
          - name: "elasticsearch"
            ip:
              - "10.0.0.3"
          - name: "kibana"
            ip:
              - "10.0.0.4"

        Replace the ``10.0.0.x`` IPs with your hosts' IPs. You can change the names and remove or add instances depending on your needs.

        *Example:* if you have installed the Wazuh server, Elasticsearch and Kibana in the same host, the IPs values must be the same. In case of one Wazuh server host and one Elastic Stack host, the Elasticserch IP and Kibana IP must be the same and the Wazuh manager must to be different.

        In the following steps, we will create a file that contains a folder named after the instance defined here. This folder will contain the certificate and the key necessary to communicate with the Elasticsearch node using SSL.

      3.2. Create the certificates using the `elasticsearch-certutil <https://www.elastic.co/guide/en/elasticsearch/reference/current/certutil.html>`_ tool. The ``--keep-ca-key`` modifier may be used to keep the CA's certificate and key files. If there are future expansions, these files may be used to sign certificates for new servers. If this modifier is not used, these files will be deleted and any future certificates will require a new CA. As a result, the previous certificates will no longer be valid and will need to be redistributed. It is important to ensure that the ``ca.key`` file is properly secured.

        .. code-block:: console

          # /usr/share/elasticsearch/bin/elasticsearch-certutil cert ca --pem --in instances.yml --out certs.zip  --keep-ca-key

        The file created contains the ``ca.key`` due to the ``--keep-ca-key`` modifier. You have to distribute the zip file but we recommend not distributing it with the ``ca.key``. You can remove it from the zip file as follow:

        .. code-block:: console

          # zip -d /usr/share/elasticsearch/certs.zip "ca.key"

        This is the ``zip`` content:

        .. code-block:: console

          certs.zip
          |-- ca
              |-- ca.crt
          |-- filebeat
          |   |-- filebeat.crt
          |   |-- filebeat.key
          |-- elasticsearch
          |   |-- elasticsearch.crt
          |   |-- elasticsearch.key
          |-- kibana
              |-- kibana.crt
              |-- kibana.key

        .. note:: The ``ca.crt`` file is shared for all the instances while the ``.crt`` and ``.key`` pairs are unique for each instance.

      3.3. Extract the generated ``/usr/share/elasticsearch/certs.zip`` file from the previous step. You can use ``unzip``:

        .. code-block:: console

          # unzip /usr/share/elasticsearch/certs.zip -d /usr/share/elasticsearch/

      3.4. Create the directory ``/etc/elasticsearch/certs``, and then copy the certificate authorities, the certificate and the key there.

        .. code-block:: console

          # mkdir /etc/elasticsearch/certs/ca -p
          # cp -R /usr/share/elasticsearch/ca/ /usr/share/elasticsearch/elasticsearch/* /etc/elasticsearch/certs/
          # chown -R elasticsearch: /etc/elasticsearch/certs
          # chmod -R 770 /etc/elasticsearch/certs

        Note that if you changed the node names in step 3.1, you will have the folder with the name used there, instead of ``elasticsearch``.

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

    5. Generate credentials for all the Elastic Stack pre-built roles and users:

      .. code-block:: console

          # /usr/share/elasticsearch/bin/elasticsearch-setup-passwords auto

      Make a note of, at the very least, the password for the ``elastic`` user.

    6. Once Elasticsearch is up and running, we need to place the corresponding Filebeat CA, certificate and key **in the Wazuh server host**, so the following steps must be performed in the Wazuh server:

      6.1. Copy the file `/usr/share/elasticsearch/certs.zip` from the Elasticsearch node into the Wazuh server. You can use `scp` or others. Now, let's suppose that the file was copied into ``/usr/share/filebeat/``.

      6.2. Extract the certificates file:

        .. code-block:: console

          # unzip /usr/share/filebeat/certs.zip -d /usr/share/filebeat/

      6.3. Create the directory ``/etc/filebeat/certs``, then copy the certificate authorities, the certificate and the key there.

        .. code-block:: console

            # mkdir /etc/filebeat/certs/ca -p
            # cp -R /usr/share/filebeat/ca/ /usr/share/filebeat/filebeat/* /etc/filebeat/certs/
            # chmod 770 -R /etc/filebeat/certs

        Note that if you changed the node names in step 3.1, you will have the folder with the name used there instead of ``filebeat``.

      6.4 Setting up credentials for Filebeat and Elasticsearch output. Change the following line, with the previously generated Elasticsearch password, in the file ``/etc/filebeat/filebeat.yml``.

      .. code-block:: yaml

        output.elasticsearch.password: "password_generated_for_elastic"

      Replace ``YOUR_ELASTIC_SERVER_IP`` with the IP address or the hostname of the Elasticsearch server. For example:

      .. code-block:: yaml

        output.elasticsearch.hosts: ['YOUR_ELASTIC_SERVER_IP:9200']

      Review the settings ``output.elasticsearch.ssl.certificate``, ``output.elasticsearch.ssl.key`` and ``output.elasticsearch.ssl.certificate_authorities``. They should have the correct paths to the certificates deployed in step 6.3.

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

    **Steps for all Elasticsearch nodes**

    1. Install the Elasticsearch package in all cluster hosts:

      .. code-block:: console

        # yum install elasticsearch=7.4.2

    2. Download the Elasticsearch configuration file from the Wazuh repository:

      .. code-block:: console

        # curl -so /etc/elasticsearch/elasticsearch.yml https://raw.githubusercontent.com/wazuh/wazuh/elk-secured/extensions/elasticsearch/7.x/elasticsearch.yml

    3. Once we have Elasticsearch installed we need to configure it by editing the file ``/etc/elasticsearch/elasticsearch.yml`` as follow:

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

          - ``<elasticsearch_ip>``: the host IP. I.e: ``10.0.0.2``. The value ``0.0.0.0`` is an acceptable IP address and will bind to all network interfaces.
          - ``<node_name>``: The node name. I.e: ``elastic-master1``.
          - ``<elastic_cluster>``: The cluster name. I.e: ``elastic-cluster-production``.
          - ``<elasticsearch_ip_nodeX>``: others Elasticsearch cluster nodes IPs. I.e: ``10.0.0.3``.
          - ``<master_node_X>``: others elasticsearch master node names. I.e: ``elastic-master2``.

        Depending on the node type, some parameters may vary between nodes. You should include the parameter ``node.master: false`` in every Elasticsearch node that you don't want to configure as master.

    **Steps for master Elasticsearch node**

    4. Configure Elastic Stack to use encrypted connections:

      4.1. We need to create all certificates separated by host. After the creation, you will have to distribute the certificates into the hosts according to the component installed on those hosts. First, we will create the specification file ``/usr/share/elasticsearch/instances.yml``:

        .. code-block:: yaml

          instances:
          - name: "filebeat"
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

      4.2. Create the certificates using the `elasticsearch-certutil <https://www.elastic.co/guide/en/elasticsearch/reference/current/certutil.html>`_ tool. The ``--keep-ca-key`` modifier may be used in order to keep the CA's certificate and key files, in the case of future expansions these files may be used to sign certificates for new servers. If this modifier is not used, these files will be deleted and any future certificates will require a new CA, in consequence the previous certificates will no longer be valid and will need to be redistributed. It is important that the ``ca.key`` file be properly secured.

        .. code-block:: console

          # /usr/share/elasticsearch/bin/elasticsearch-certutil cert ca --pem --in instances.yml --out certs.zip --keep-ca-key

        The file created contains the ``ca.key`` due to the ``--keep-ca-key`` modifier. You have to distribute the zip file but we recommend not distributing it with the ``ca.key``. You can remove it from the zip file as follow:

        .. code-block:: console

          # zip -d /usr/share/elasticsearch/certs.zip "ca.key"

        This is the ``zip`` content:

        .. code-block:: console

          certs.zip
          |-- ca
              |-- ca.crt
          |-- filebeat
          |   |-- filebeat.crt
          |   |-- filebeat.key
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

      4.3. Extract the generated ``/usr/share/elasticsearch/certs.zip`` file from the previous step. You can use ``unzip``:

        .. code-block:: console

          # unzip /usr/share/elasticsearch/certs.zip -d /usr/share/elasticsearch/

      4.4. Create the directory ``/etc/elasticsearch/certs``, then copy the certificate authorities, the certificate and the key there.

        .. code-block:: console

          # mkdir /etc/elasticsearch/certs/ca -p
          # cp -R /usr/share/elasticsearch/ca/ /usr/share/elasticsearch/elasticsearch-node1/* /etc/elasticsearch/certs/
          # chown -R elasticsearch: /etc/elasticsearch/certs
          # chmod -R 770 /etc/elasticsearch/certs

        Depending on the Elasticsearch node in where you are deploying the certificates, you need to replace ``elasticsearch-node1`` by the name that you provided to the node in the `instances.yml` file (step 4.1).

      4.5. In the Elasticsearch configuration file ``/etc/elasticsearch/elasticsearch.yml`` you have to review the path according with the previous step:

        .. code-block:: console

          # Transport layer
          xpack.security.transport.ssl.enabled: true
          xpack.security.transport.ssl.verification_mode: certificate
          xpack.security.transport.ssl.key: /etc/elasticsearch/certs/elasticsearch-node1.key
          xpack.security.transport.ssl.certificate: /etc/elasticsearch/certs/elasticsearch-node1.crt
          xpack.security.transport.ssl.certificate_authorities: [ "/etc/elasticsearch/certs/ca/ca.crt" ]

          # HTTP layer
          xpack.security.http.ssl.enabled: true
          xpack.security.http.ssl.verification_mode: certificate
          xpack.security.http.ssl.key: /etc/elasticsearch/certs/elasticsearch-node1.key
          xpack.security.http.ssl.certificate: /etc/elasticsearch/certs/elasticsearch-node1.crt
          xpack.security.http.ssl.certificate_authorities: [ "/etc/elasticsearch/certs/ca/ca.crt" ]

      Review the settings ``xpack.security.transport.ssl.key``, ``xpack.security.transport.ssl.certificate``, ``xpack.security.transport.ssl.certificate_authorities``, ``xpack.security.http.ssl.key``, ``xpack.security.http.ssl.certificate`` and ``xpack.security.http.ssl.certificate_authorities``. They should have the correct paths to the certificates deployed in step 4.4.


    5. Enable and start the Elasticsearch service:

      a) For Systemd:

      .. code-block:: console

        # systemctl daemon-reload
        # systemctl enable elasticsearch.service
        # systemctl start elasticsearch.service

      b) For SysV Init:

      .. code-block:: console

        # update-rc.d elasticsearch defaults 95 10
        # service elasticsearch start

    6. Generate credentials for all the Elastic Stack pre-built roles and users.

      .. code-block:: console

          # /usr/share/elasticsearch/bin/elasticsearch-setup-passwords auto

      Note down at least the password for the ``elastic`` user.

    **Steps for all others Elasticsearch nodes**

    .. note:: A default Elasticsearch configuration appoints the node as master. If you want to avoid this, you have to use the setting ``node.master`` to false in the Elasticsearch configuration file ``/etc/elasticsearch/elasticsearch.yml``

    7. The file `cert.zip` created in the step 4.2 has to be copied in *all* nodes with Elasticsearch, filebeat and/or Kibana. For the Elasticsearch nodes, you have to follow the steps **4.3, 4.4, 4.5 and 5**.

    8. Once completed the step 8 in every Elasticsearch node, you should have an Elasticsearch cluster working. The following ``curl`` must to show you all the connected cluster nodes (replacing ``<password_generated_for_elastic>`` by the password generated in step 6 and ``<elasticsearch_ip>`` by the Elasticsearch node that you want to query):

      .. code-block:: console

        curl https://<elasticsearch_ip>:9200/_cat/nodes -u elastic:<password_generated_for_elastic> -k

      .. code-block:: console

        10.0.0.3 19 98 96 1.19 1.40 1.57 dim * elastic1
        10.0.0.4 19 98 96 1.19 1.40 1.57 dim - elastic2
        10.0.0.5 29 98 96 1.19 1.40 1.57 dim - elastic3

    **Wazuh server or servers**

    9. Once Elasticsearch is up and running, we need to place the filebeat corresponding CA, certificate and key in the **in the Wazuh server host**, so the following steps needs to be done in the Wazuh server or servers in case of Wazuh cluster:

      9.1. Copy from the Elasticsearch node, the file `/usr/share/elasticsearch/certs.zip` into the Wazuh server. You could use `scp` or others. Let's suppose that the file was copied into ``/usr/share/filebeat/``.

      9.2. Extract the certificates file:

        .. code-block:: console

          # unzip /usr/share/filebeat/certs.zip -d /usr/share/filebeat/

      9.3. Create the directory ``/etc/filebeat/certs``, then copy the certificate authorities, the certificate and the key there.

        .. code-block:: console

            # mkdir /etc/filebeat/certs/ca -p
            # cp -R /usr/share/filebeat/ca/ /usr/share/filebeat/filebeat/* /etc/filebeat/certs/
            # chmod -R 770 /etc/filebeat/certs

        You will need to replace ``filebeat`` by the name that you provided to the node in the `instances.yml` file (step 4.1).

      9.4 Setting up credentials for Filebeat. Change the following line, with the previously generated Elasticsearch password, in the file ``/etc/filebeat/filebeat.yml``.

        .. code-block:: yaml

          output.elasticsearch.password: "password_generated_for_elastic"

      In addition to this, it is necessary to add all elasticsearch nodes to the output configuration. Replace the line:

        .. code-block:: yaml

          output.elasticsearch.hosts: ['YOUR_ELASTIC_SERVER_IP:9200']

      By this configuration:

        .. code-block:: yaml

          output.elasticsearch:
            hosts: ['<elasticsearch_ip_node1>:9200','<elasticsearch_ip_node2>:9200','<elasticsearch_ip_node3>:9200']
            loadbalance: true

      Also, if you changed the node names in step 4.1, you need to review the certificates paths, the parameters: ``output.elasticsearch.ssl.certificate`` and ``output.elasticsearch.ssl.key``.


      9.5. Enable and start the Filebeat service:

        * For Systemd:

          .. code-block:: console

            # systemctl daemon-reload
            # systemctl enable filebeat.service
            # systemctl start filebeat.service

        * For SysV Init:

          .. code-block:: console

            # chkconfig --add filebeat
            # service filebeat start

      9.6. Load the Filebeat template:

        .. code-block:: console

          # filebeat setup --index-management -E setup.template.json.enabled=false

.. _install_kibana_app_amazon:

Installing Kibana
-----------------

Kibana is a flexible and intuitive web interface for mining and visualizing the events and archives stored in Elasticsearch. Find more information at `Kibana <https://www.elastic.co/products/kibana>`_.

1. Install the Kibana package:

  .. code-block:: console

    # yum install kibana=7.4.2

2. Configure certificates. Copy the file `/usr/share/elasticsearch/certs.zip` from the Elasticsearch node into the Wazuh server. You can use `scp` or others. Now, let's suppose that the file was copied into ``/usr/share/kibana/``.

  2.1. Extract the certificates file:

    .. code-block:: console

      # unzip /usr/share/kibana/certs.zip -d /usr/share/kibana/

  2.2. Create the directory ``/etc/kibana/certs``, then copy the certificate authorities, the certificate and the key there.

    .. code-block:: console

        # mkdir /etc/kibana/certs/ca -p
        # cp -R /usr/share/kibana/ca/ /usr/share/kibana/kibana/* /etc/kibana/certs/
        # chmod 770 -R /etc/kibana/certs
        # chown -R kibana:kibana /etc/kibana/


3. Once Kibana is installed, we need to configure it by downloading and editing the file ``/etc/kibana/kibana.yml`` as follows:

  3.1. Download the Kibana configuration file from the Wazuh repository:

        .. code-block:: console

          # curl -so /etc/kibana/kibana.yml https://raw.githubusercontent.com/wazuh/wazuh/elk-secured/extensions/kibana/7.x/kibana.yml

  3.2 Edit the file ``/etc/kibana/kibana.yml``:

    .. code-block:: yaml

        server.host: "<kibana_ip>"
        elasticsearch.hosts: ["https://<elasticsearch_ip>:9200"]
        elasticsearch.password: "<password_generated_for_elastic>"

    The values to be replaced:

      - ``<elasticsearch_ip>``: the host IP. i.e: ``10.0.0.2``. If you have more than one Elasticsearch node, you can separate the nodes with commas.
      - ``<kibana_ip>``: Kibana will only listen on the loopback interface (localhost) by default, which means that it can be only accessed from the same machine. To access Kibana from the outside make it listen on its network IP by replacing ``<kibana_ip>`` with the Kibana host IP. I.e: ``10.0.0.2``.
      - ``<password_generated_for_elastic>``: The password generated in step 5. I.e: ``IJB8YtGoTgrpaPdGZbSO``.

    Review the settings ``elasticsearch.ssl.certificateAuthorities``, ``elasticsearch.ssl.certificate``, ``elasticsearch.ssl.key``, ``server.ssl.enabled``, ``server.ssl.certificate`` and ``server.ssl.key``. They should have the correct paths to the certificates deployed in step 2.2 of Installing Kibana.

4. Install the Wazuh Kibana plugin:

  * Install from URL:

  .. code-block:: console

    # sudo -u kibana /usr/share/kibana/bin/kibana-plugin install https://packages.wazuh.com/wazuhapp/wazuhapp-3.10.2_7.4.2.zip

  * Install from the local file:

  .. code-block:: console

     # sudo -u kibana /usr/share/kibana/bin/kibana-plugin install file:///path/wazuhapp-3.10.2_7.4.2.zip

  .. note:: The `path` should have *read* permissions for *others*. E.g: The directory `/tmp/` will accomplish this.

  The Wazuh Kibana plugin must be configured to point to the master’s API.

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

In order to establish HTTPS communication between the browser and Kibana, go to the browser's settings and import the ``ca.crt`` extracted from the .zip file.

.. note:: The Kibana service listens on the default port 5601.

Disabling repositories
----------------------

In the installation guide, we described how to install and configure Wazuh and also how to install and configure Elastic Stack for use with Wazuh. We have complete control of when a new Wazuh version is going to be released, but we don't have control over when a new Elasticsearch version is going to be released.

The current Wazuh Kibana plugin was tested in Kibana version 7.4.2. When Elasticsearch releases a new version and you upgrade your system, the new Filebeat version will be installed in your system forcing the upgrade of Elasticsearch and Kibana. We must conduct a complete set of testing to ensure the correct behavior of our Wazuh Kibana plugin when a new Elasticsearch version is released. Then we release a new version of the Wazuh Kibana plugin that is compatible with the new Filebeat/Elasticsearch/Kibana version. If there is an accidental Filebeat (and consequently Kibana and Elasticsearch) upgrade, it's possible that the Wazuh Kibana plugin could become incompatible.

In order to anticipate and avoid this situation, we recommend disabling the Elasticsearch repository in the following way:

.. code-block:: console

  # sed -i "s/^enabled=1/enabled=0/" /etc/yum.repos.d/elastic.repo

Next steps
----------

Once the Wazuh and Elastic Stack servers are installed and connected, you can install and connect Wazuh agents. Follow :ref:`this guide <installation_agents>` for instructions related to your specific environment.

You can also read the Wazuh Kibana plugin :ref:`user manual <kibana_app>` to learn more about its features and how to use it.

Uninstall
---------

To uninstall Elasticsearch:

    .. code-block:: console

      # yum remove elasticsearch

There are files marked as configuration and data files. Due to this designation, the package manager doesn't remove those files from the filesystem. The complete file removal action is the user's responsibility. It can be done by removing the folder ``/var/lib/elasticsearch`` and ``/etc/elasticsearch``.

To uninstall Kibana:

    .. code-block:: console

      # yum remove kibana

As in the previous case, the complete file removal can be done by removing the folder ``/var/lib/kibana`` and ``/etc/kibana``.

