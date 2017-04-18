.. _installation_elastic:

Installing Elastic Stack
========================

This guide describes the installation of Logstash, Elasticsearch, and Kibana on your Elastic Stack server.  We will illustrate package-based installations of these components.  You can also also install them from binary tarballs, but this is rather less convenient and is outside of the scope of Wazuh documentation.

In addition to Elastic Stack components, you will also find here the instructions to install and configure the Wazuh App (deployed as a Kibana plugin).

Depending on your operating system you can choose to install Elastic Stack from RPM or DEB packages. Consult the table below and choose how to proceed:

+------------------------------------------------------------------------+-------------------------------------------------------------+
| Type                                                                   | Description                                                 |
+========================================================================+=============================================================+
| :ref:`RPM packages <elastic_server_rpm>`                               | Install Elastic Stack on CentOS/RHEL/Fedora.                |
+------------------------------------------------------------------------+-------------------------------------------------------------+
| :ref:`DEB packages <elastic_server_deb>`                               | Install Elastic Stack on Debian/Ubuntu.                     |
+------------------------------------------------------------------------+-------------------------------------------------------------+

.. toctree::
   :hidden:
   :maxdepth: 2

   elastic_server_rpm
   elastic_server_deb
