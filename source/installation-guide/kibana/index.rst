.. Copyright (C) 2020 Wazuh, Inc.

.. meta:: :description: Learn how to install Elastic Stack for using Wazuh on Debian

.. _kibana:


Kibana
======

Kibana is a flexible and intuitive web interface for mining and visualizing the events and archives stored in Elasticsearch. More information can be found at `Elastic Kibana site <https://www.elastic.co/products/kibana>`_.

Elastic recommends installing Kibana on the same server as Elasticsearch, but it is not required. The following Kibana installation may vary depending on whether Kibana will be installed in the same server as Elasticsearch or not.

Before installing Wazuh server and Elastic stack, some extra packages must be installed. Open Distro for Elasticsearch requires the installation of Java Develpment Kit. Besides, ``wget`` and ``unzip`` utilities will in futher steps.

  .. include:: ../../_templates/installations/elastic/common/before_installation_kibana_filebeat.rst

Adding the Wazuh repository
~~~~~~~~~~~~~~~~~~~~~~~~~~~

  .. tabs::


    .. group-tab:: APT


      .. include:: ../../_templates/installations/wazuh/deb/add_repository.rst



    .. group-tab:: Yum


      .. include:: ../../_templates/installations/wazuh/yum/add_repository.rst





Kibana installation and configuration
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

#. Install the Kibana package:

    .. tabs::

        .. group-tab:: APT


            .. include:: ../../_templates/installations/elastic/deb/install_kibana.rst



        .. group-tab:: Yum


            .. include:: ../../_templates/installations/elastic/yum/install_kibana.rst


#. The next step, involving the certificate placement, may vary depending on whether Kibana will be installed in the same server as Elasticsearch or in a different one:


    .. tabs::



        .. tab:: Same Elasticsearch server


            Copy the Elasticsearch certificates:

            .. include:: ../../_templates/installations/elastic/common/copy_certificates_kibana_elastic_server.rst



        .. tab:: Different Elasticsearch server


            .. include:: ../../_templates/installations/elastic/common/generate_new_kibana_certificates.rst



#. Download the Kibana configuration file:

    .. include:: ../../_templates/installations/elastic/common/configure_kibana.rst


#. Install the Wazuh Kibana plugin:

    The installation of the plugin must be done from the Kibana home directory.

    .. code-block:: console

        # cd /usr/share/kibana

    .. code-block:: console

        # sudo -u kibana /usr/share/kibana/bin/kibana-plugin install https://s3-us-west-1.amazonaws.com/packages-dev.wazuh.com/trash/app/kibana/wazuhapp-3.13.0-tsc-opendistro.zip

#. Enable and start the Kibana service:

    .. include:: ../../_templates/installations/elastic/common/enable_kibana.rst

    With the first access to Kibana, the browser shows a warning message stating that the certificate was not issued by a trusted authority. This can be accepted by clicking on ``Advanced options`` to add an exception or, for increased security, by importing the ``ca.crt`` previously created to the Certificate Manager of each browser that will access the Kibana interface.

    .. note:: The Kibana service listens to the default port 5601. The browser address will be: ``https://<kibana_ip>:5601`` replacing <kibana_ip> by the Kibana server IP.

After the first attempt to access the Wazuh Kibana plugin may prompt a message that indicates that the Wazuh API is not working. To solve this issue edit the file ``/usr/share/kibana/optimize/wazuh/config/wazuh.yml`` and replace the ``url`` value by the Wazuh's server IP in which the Wazuh API is installed:

  .. code-block:: yaml

    hosts:
      - default:
        url: <Wazuh_server_IP>
        port: 55000
        user: foo
        password: bar


Next steps
~~~~~~~~~~

Once the Wazuh - Elastic Stack environment is ready, a Wazuh agent can be installed in every endpoint to be monitored. The Wazuh installation guide is available for most operating systems and it can be found :ref:`here<installation_agents>`.

Uninstall Kibana
~~~~~~~~~~~~~~~~

To uninstall Kibana:

.. tabs::


  .. group-tab:: APT


    .. include:: ../../_templates/installations/elastic/deb/uninstall_kibana.rst



  .. group-tab:: Yum


    .. include:: ../../_templates/installations/elastic/yum/uninstall_kibana.rst
