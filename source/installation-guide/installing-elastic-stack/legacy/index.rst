.. Copyright (C) 2019 Wazuh, Inc.

.. _installation_elastic_legacy:

Installing Elastic Stack (legacy)
=================================

.. warning::

    This guide is intended for Elastic Stack 6.x users only, for installing the latest Elastic Stack version, please follow the :ref:`official guide <installation_elastic>`.


This guide describes the installation of an Elastic Stack server comprised of Logstash, Elasticsearch, and Kibana. We will illustrate package-based installations of these components.  You can also install them from binary tarballs, however, this is not preferred or supported under Wazuh documentation.

In addition to Elastic Stack components, you will also find the instructions to install and configure the Wazuh app (deployed as a Kibana plugin).

Depending on your operating system you can choose to install Elastic Stack from RPM or DEB packages. Consult the table below and choose how to proceed:

+------------------------------------------------------------------------+-------------------------------------------------------------+
| Type                                                                   | Description                                                 |
+========================================================================+=============================================================+
| `RPM packages <elastic_server_rpm_legacy.html>`_                       | Install Elastic Stack on CentOS/RHEL/Fedora.                |
+------------------------------------------------------------------------+-------------------------------------------------------------+
| `DEB packages <elastic_server_deb_legacy.html>`_                       | Install Elastic Stack on Debian/Ubuntu.                     |
+------------------------------------------------------------------------+-------------------------------------------------------------+

.. note::
    Currently, the Elastic Stack is only supported on 64-bit operating systems, according to its `Support Matrix <https://www.elastic.co/support/matrix>`_.

.. toctree::
   :hidden:
   :maxdepth: 2

   elastic_server_rpm_legacy
   elastic_server_deb_legacy