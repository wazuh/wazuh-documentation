.. Copyright (C) 2020 Wazuh, Inc.

.. _migration-guide:

Migrating from X-Pack to Open Distro
====================================

This guide will explain how to migrate all Elastic stack components to Open Distro.

.. note:: Root user privileges are required to execute all the commands described below.

Removing the X-Pack components
------------------------------

The first step consists on uninstalling Elasticsearch, Kibana and Filebeat. This process will not remove the data placet at ``/usr/share/`` to prevent the loss of information.


Uninstall Elasticsearch
^^^^^^^^^^^^^^^^^^^^^^^

.. tabs::

  .. group-tab:: Yum

    .. code-block:: console

        # yum remove elasticsearch

  .. group-tab:: APT

    .. code-block:: console

        # apt-get remove elasticsearch

Uninstall Kibana
^^^^^^^^^^^^^^^^

.. tabs::

  .. group-tab:: Yum

    .. code-block:: console

        # yum remove kibana

  .. group-tab:: APT

    .. code-block:: console

        # apt-get remove kibana

Uninstall Filebeat
^^^^^^^^^^^^^^^^^^

.. tabs::

  .. group-tab:: Yum

    .. code-block:: console

        # yum remove filebeat

  .. group-tab:: APT

    .. code-block:: console

        # apt-get remove filebeat

Installing the Open Distro components
-------------------------------------

Before installing the corresponding packages, it is necessary to disable the Elasticsearch repository and add the Wazuh's one.

#. Disable Elastic's repository:

    .. code-block:: console

        # sed -i "s/^deb/#deb/" /etc/apt/sources.list.d/elastic-7.x.list 

#. Add the Wazuh's repository:

.. tabs::


  .. group-tab:: Yum


    .. include:: ../_templates/installations/wazuh/yum/add_repository.rst



  .. group-tab:: APT


    .. include:: ../_templates/installations/wazuh/deb/add_repository.rst

