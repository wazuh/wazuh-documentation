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

    .. include:: debian/all_in_one_tab.rst





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

    .. include:: debian/kibana_all_in_one_tab.rst



  .. group-tab:: Different Elasticsearch host


    .. include:: debian/kibana_different_host_tab.rst



Disabling repositories
----------------------

.. include:: ../../../_templates/installation-guide/deb/disabling_elastic_repository.rst

Uninstall
---------

.. include:: ../../../_templates/installation-guide/deb/uninstall_elastic_stack.rst

