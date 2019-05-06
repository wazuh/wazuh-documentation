.. Copyright (C) 2019 Wazuh, Inc.

.. _installation_elastic_legacy:

Upgrading Elastic Stack
=======================

.. warning::

    This guide is intended for Elastic Stack 6.x users only, for installing the latest Elastic Stack version, please follow the :ref:`official guide <installation_elastic>`.


This guide describes the upgrading of an Elastic Stack server comprised of Filebeat, Logstash, Elasticsearch, and Kibana. We will illustrate package-based installations of these components.  You can also install them from binary tarballs, however, this is not preferred or supported under Wazuh documentation.

In addition to Elastic Stack components, you will also find the instructions to install and configure the Wazuh app (deployed as a Kibana plugin).

Depending on your operating system you can choose to upgrade Elastic Stack from RPM or DEB packages. Consult the table below and choose how to proceed:

+--------------------------------------------------+-----------------------------------------------+
| Type                                             | Description                                   |
+==================================================+===============================================+
| :doc:`RPM packages <elastic_server_rpm>`         | Upgrade Elastic Stack on CentOS/RHEL/Fedora.  |
+--------------------------------------------------+-----------------------------------------------+
| :doc:`DEB packages <elastic_server_deb>`         | Upgrade Elastic Stack on Debian/Ubuntu.       |
+--------------------------------------------------+-----------------------------------------------+

.. toctree::
   :hidden:
   :maxdepth: 4

   elastic_server_rpm
   elastic_server_deb