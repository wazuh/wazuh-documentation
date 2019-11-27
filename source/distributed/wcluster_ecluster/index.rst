.. Copyright (C) 2019 Wazuh, Inc.

.. meta:: :description: Learn how to install Wazuh

.. _wcluster_ecluster_installation_guide:

Wazuh cluster with Elasticsearch cluster
========================================

The Wazuh installation guide is a basic document which show how to install Wazuh and Elastic Stack in a cluster host. As we described in :ref:`the installation guide welcome<installation_guide>`, there are 5 installation types.



+-------------------------------+---------------------------------------------------------------+
| Operating system              | Version                                                       |
+===============================+===============================================================+
| Amazon Linux                  | :ref:`1 or greater <wcluster_ecluster_amazon>`                |
+-------------------------------+---------------------------------------------------------------+
| CentOS                        | :ref:`6 or greater <wcluster_ecluster_centos>`                |
+-------------------------------+---------------------------------------------------------------+
| Debian                        | :ref:`7 or greater <wcluster_ecluster_deb>`                   |
+-------------------------------+---------------------------------------------------------------+
| Fedora                        | :ref:`42 or greater <wcluster_ecluster_fedora>`               |
+-------------------------------+---------------------------------------------------------------+
| Oracle Linux                  | :ref:`6 or greater <wcluster_ecluster_oracle>`                |
+-------------------------------+---------------------------------------------------------------+
| OpenSUSE                      | :ref:`42 or greater <wcluster_ecluster_opensuse>`             |
+-------------------------------+---------------------------------------------------------------+
| Red Hat Enterprise Linux      | :ref:`6 or greater <wcluster_ecluster_rhel>`                  |
+-------------------------------+---------------------------------------------------------------+
| SUSE                          | :ref:`12 <wcluster_ecluster_suse>`                            |
+-------------------------------+---------------------------------------------------------------+
| Ubuntu                        | :ref:`12.10 or greater <wcluster_ecluster_ubuntu>`            |
+-------------------------------+---------------------------------------------------------------+

.. note::

    Currently, the Elastic Stack is only supported on 64-bit operating systems, according to its `Support Matrix <https://www.elastic.co/support/matrix>`_.

.. toctree::
    :maxdepth: 2

    amazon
    centos
    deb
    fedora
    oracle
    opensuse
    rhel
    suse
    ubuntu

.. +---------------------------------+------------------------------------------------------------------------------------------------------------------------------------------------+
.. |                                 | How you want to configure Elasticsearch                                                                                                        |
.. |                                 +-------------------------------------------------------------------------+----------------------------------------------------------------------+
.. | How you want to configure Wazuh | cluster node                                                             | Cluster                                                              |
.. +=================================+=========================================================================+======================================================================+
.. | cluster node                     | :ref:`Wazuh cluster node and Elasticsearch cluster node<wcluster_ecluster>` | :ref:`Wazuh cluster node and Elasticsearch cluster<wcluster_ecluster>` |
.. +---------------------------------+-------------------------------------------------------------------------+----------------------------------------------------------------------+
.. | Cluster mode                    | :ref:`Wazuh cluster and Elasticsearch cluster node<wcluster_ecluster>`    | :ref:`Wazuh cluster and Elasticsearch cluster<wcluster_ecluster>`    |
.. +---------------------------------+-------------------------------------------------------------------------+----------------------------------------------------------------------+



.. .. topic:: Contents
.. 
..     .. toctree::
..         :maxdepth: 1
.. 
..         wcluster_ecluster/index
..         wcluster_ecluster/index
..         wcluster_ecluster/index
..         wcluster_ecluster/index
.. 
.. 
..         In the following table you will find the Elastic stack installation guide for the available operating systems:
