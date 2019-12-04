.. Copyright (C) 2019 Wazuh, Inc.

.. meta:: :description: Learn how to install Elastic Stack for using Wazuh on Debian

.. _kibana_cluster:


Kibana
======

Kibana is a flexible and intuitive web interface for mining and visualizing the events and archives stored in Elasticsearch. Find more information at `Kibana <https://www.elastic.co/products/kibana>`_.

The following Kibana installation may vary depending on if you will install Kibana in the same host that Elasticsearch or not. Please, select the correct option from the tabs below:

.. tabs::



  .. tab:: Same Elasticsearch host

    #. Install the Kibana package:


    .. tabs::

        .. group-tab:: APT


            .. include:: ../../_templates/installations/elastic/deb/add_repository.rst



        .. group-tab:: Yum


            .. include:: ../../_templates/installations/elastic/yum/add_repository.rst



        .. group-tab:: ZYpp


            .. include:: ../../_templates/installations/elastic/zypp/add_repository.rst



    .. include:: ../../_templates/deb/install_kibana.rst

    #. Copy the Elasticsearch certificates into Kibana configuration folder:

        .. include:: ../../_templates/common/copy_certificates_kibana_aio.rst

    #. Configure Kibana:

        .. include:: ../../_templates/common/configure_kibana_aio.rst

    #. Install the Wazuh Kibana plugin:

        .. include:: ../../_templates/common/install_wazuh_kibana_plugin.rst

    #. Enable and start the Kibana service:

        .. include:: ../../_templates/deb/enable_start_kibana.rst

    In order to establish HTTPS communication between the browser and Kibana, go to the browser's settings and import the ``ca.crt`` extracted from the .zip file.

    .. note:: The Kibana service listens on the default port 5601.




  .. tab:: Different Elasticsearch host


    #. Install the Kibana package:

    .. include:: ../../_templates/deb/install_kibana.rst

    #. Copy the Elasticsearch certificates into Kibana configuration folder:

        .. include:: ../../_templates/common/copy_certificates_kibana.rst

    #. Configure Kibana:

        .. include:: ../../_templates/common/configure_kibana_aio.rst

    #. Install the Wazuh Kibana plugin:

        .. include:: ../../_templates/common/install_wazuh_kibana_plugin.rst

    #. Enable and start the Kibana service:

        .. include:: ../../_templates/deb/enable_start_kibana.rst

    In order to establish HTTPS communication between the browser and Kibana, go to the browser's settings and import the ``ca.crt`` extracted from the .zip file.

    .. note:: The Kibana service listens on the default port 5601.




