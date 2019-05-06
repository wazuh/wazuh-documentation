.. Copyright (C) 2019 Wazuh, Inc.

.. _installation_elastic:

Installing Elastic Stack
========================

This guide describes the installation of an Elastic Stack server comprised of Logstash, Elasticsearch, and Kibana. We will illustrate package-based installations of these components.  You can also install them from binary tarballs, however, this is not preferred or supported under Wazuh documentation.

In addition to Elastic Stack components, you will also find the instructions to install and configure the Wazuh app (deployed as a Kibana plugin).

Depending on your operating system you can choose to install Elastic Stack from RPM or DEB packages. Consult the table below and choose how to proceed:

+------------------------------------------------------------------------+-------------------------------------------------------------+
| Type                                                                   | Description                                                 |
+========================================================================+=============================================================+
| :ref:`RPM packages <elastic_server_rpm>`                               | Install Elastic Stack on CentOS/RHEL/Fedora.                |
+------------------------------------------------------------------------+-------------------------------------------------------------+
| :ref:`DEB packages <elastic_server_deb>`                               | Install Elastic Stack on Debian/Ubuntu.                     |
+------------------------------------------------------------------------+-------------------------------------------------------------+

There are some related additional configurations that can be applied:

- :ref:`Setting up SSL for Filebeat and Logstash <elastic_ssl>` 
- :ref:`Setting up SSL and authentication for Kibana <kibana_ssl>` 
- :ref:`Elasticsearch tuning <elastic_tuning>` 
- :ref:`Search Guard configuration <searchguard>` 



.. note::
    Currently, the Elastic Stack is only supported on 64-bit operating systems, according to its `Support Matrix <https://www.elastic.co/support/matrix>`_.

.. toctree::
   :hidden:
   :maxdepth: 2

   elastic_server_rpm
   elastic_server_deb
   elastic_ssl
   kibana_ssl
   elastic_tuning
   searchguard
