.. Copyright (C) 2019 Wazuh, Inc.

.. meta:: :description: Learn how to install Elastic Stack for using Wazuh on Debian

.. _elastic_stack_packages_deb:


Debian
======

This document will guide you to install the Elastic Stack components on Debian 7 or higher versions.

.. note:: Root user privileges are necessary to execute all the commands described below.


Installing Elasticsearch
------------------------

Elasticsearch is a highly scalable full-text search and analytics engine. For more information, please see `Elasticsearch <https://www.elastic.co/products/elasticsearch>`_. Below, you can follow the type of installation with regard to the desired architecture and whether you want to configure only one Elasticsearch node or if you want to configure an Elasticsearch cluster depending of the previous Wazuh server installation type.

If you have any doubt, please check again the :ref:`Installation types guide<installation_guide>`.

.. tabs::


  .. group-tab:: Single-host

    **Elasticsearch configuration**

    #. Add the Elastic repository and its GPG key

        .. include:: ../../../_templates/installation-guide/deb/add_elastic_repository.rst

    #. Install the Elasticsearch package>

        .. include:: ../../../_templates/installation-guide/deb/install_elasticsearch.rst

    #. Once Elasticsearch is installed we need to configure it by downloading and editing the file ``/etc/elasticsearch/elasticsearch.yml`` as follows:

        .. include:: ../../../_templates/installation-guide/common/edit_elastic_yml_single_node.rst

        .. note:: If your using Debian 7, you will need to change the ulimit by ``ulimit -u 4096``. In addition to this, the setting ``bootstrap.system_call_filter`` must be added and set to ``false`` in the ``/etc/elasticsearch/elasticsearch.yml`` configuration file.

    #. Certificates creation:

        .. include:: ../../../_templates/installation-guide/common/certificates_creation_aio.rst

    #. Enable and start the Elasticsearch service:

        .. include:: ../../../_templates/installation-guide/deb/enable_start_elasticsearch.rst

    #. Generate credentials for all the Elastic Stack pre-built roles and users:

        .. include:: ../../../_templates/installation-guide/common/generate_elastic_credentials.rst

    **Filebeat configuration**

    #. Configure filebeat to use the Elasticsearch certificates and set-up the Elasticsearch credentials:

        .. include:: ../../../_templates/installation-guide/common/configure_filebeat.rst

    #. Enable and start the Filebeat service:

        .. include:: ../../../_templates/installation-guide/deb/enable_start_filebeat.rst

    #. Load the Filebeat template:

        .. include:: ../../../_templates/installation-guide/common/load_filebeat_template.rst

        .. note:: You can test Filebeat output using ``filebeat test output``.








  .. group-tab:: Wazuh host and Elastic Stack host


    how to install Wazuh single and Elastic stack single

    .. include:: ../../../_templates/installation-guide/deb/add_elastic_repository.rst

    ending text


  .. group-tab:: Wazuh cluster and Elastic Stack host


    how to install Wazuh single and Elastic stack cluster

    .. include:: ../../../_templates/installation-guide/deb/add_elastic_repository.rst

    ending text


  .. group-tab:: Wazuh host and Elastic Stack cluster


    how to install Wazuh cluster and Elastic stack single

    .. include:: ../../../_templates/installation-guide/deb/add_elastic_repository.rst

    ending text


  .. group-tab:: Wazuh cluster and Elastic Stack cluster

    how to install Wazuh cluster and elastic cluster

    .. include:: ../../../_templates/installation-guide/deb/add_elastic_repository.rst

    ending text

Installing Kibana
-----------------

Kibana is a flexible and intuitive web interface for mining and visualizing the events and archives stored in Elasticsearch. Find more information at `Kibana <https://www.elastic.co/products/kibana>`_.

The following Kibana installation may vary depending on if you will install Kibana in the same host that Elasticsearch or not. Please, select the correct option from the tabs below:

.. tabs::


  .. group-tab:: Same Elasticsearch host

    #. Install the Kibana package:

      .. include:: ../../../_templates/installation-guide/deb/install_kibana.rst

    #. Copy the Elasticsearch certificates into Kibana configuration folder:

      .. include:: ../../../_templates/installation-guide/common/copy_certificates_kibana_aio.rst

    #. Configure Kibana:

      .. include:: ../../../_templates/installation-guide/common/configure_kibana_aio.rst

    #. Install the Wazuh Kibana plugin:

      .. include:: ../../../_templates/installation-guide/common/install_wazuh_kibana_plugin.rst

    #. Enable and start the Kibana service:

      .. include:: ../../../_templates/installation-guide/deb/enable_start_kibana.rst

    In order to establish HTTPS communication between the browser and Kibana, go to the browser's settings and import the ``ca.crt`` extracted from the .zip file.

    .. note:: The Kibana service listens on the default port 5601.


  .. group-tab:: Different Elasticsearch host


    how to install Wazuh single and Elastic stack single

    .. include:: ../../../_templates/installation-guide/deb/add_elastic_repository.rst

    ending text


Disabling repositories
----------------------

.. include:: ../../../_templates/installation-guide/deb/disabling_elastic_repository.rst

.. note:: The repositories disabling must be done in all hosts where any Elastic Stack components were installed.

Uninstall
---------

.. include:: ../../../_templates/installation-guide/deb/uninstall_elastic_stack.rst

