.. Copyright (C) 2019 Wazuh, Inc.

.. meta:: :description: Learn how to install Elastic Stack for using Wazuh

.. _installation_elastic:

Installing Elastic Stack
========================

This guide describes the installation of an Elastic Stack server comprised of Elasticsearch, and Kibana. We will illustrate package-based installations of these components.  You can also install them from binary tarballs, however, this is not preferred or supported under Wazuh documentation.

In addition to Elastic Stack components, you will also find the instructions to install and configure the Wazuh app (deployed as a Kibana plugin).

In the following table you will find the Elastic stack installation guide for the available operating systems:

+-------------------------------+---------------------------------------------------------------+
| Operating system              | Version                                                       |
+===============================+===============================================================+
| Amazon Linux                  | :ref:`1 or greater <elastic_stack_packages_amazon>`           |
+-------------------------------+---------------------------------------------------------------+
| CentOS                        | :ref:`6 or greater <elastic_stack_packages_centos>`           |
+-------------------------------+---------------------------------------------------------------+
| Debian                        | :ref:`7 or greater <elastic_stack_packages_deb>`              |
+-------------------------------+---------------------------------------------------------------+
| Oracle Linux                  | :ref:`6 or greater <elastic_stack_packages_oracle>`           |
+-------------------------------+---------------------------------------------------------------+
| OpenSUSE                      | :ref:`42 or greater <elastic_stack_packages_opensuse>`        |
+-------------------------------+---------------------------------------------------------------+
| Red Hat Enterprise Linux      | :ref:`6 or greater <elastic_stack_packages_rhel>`             |
+-------------------------------+---------------------------------------------------------------+
| SUSE                          | :ref:`12 <elastic_stack_packages_suse>`                       |
+-------------------------------+---------------------------------------------------------------+
| Ubuntu                        | :ref:`12.10 or greater <elastic_stack_packages_ubuntu>`       |
+-------------------------------+---------------------------------------------------------------+

.. note::

    Currently, the Elastic Stack is only supported on 64-bit operating systems, according to its `Support Matrix <https://www.elastic.co/support/matrix>`_.

.. toctree::
    :hidden:
    :maxdepth: 2

    linux/elastic_stack_packages_amazon
    linux/elastic_stack_packages_centos
    linux/elastic_stack_packages_deb
    linux/elastic_stack_packages_opensuse
    linux/elastic_stack_packages_oracle
    linux/elastic_stack_packages_rhel
    linux/elastic_stack_packages_suse
    linux/elastic_stack_packages_ubuntu
