.. _installation_elastic:

.. warning::

    You are looking at documentation for an older release. Not what you want? See the `current release documentation <https://documentation.wazuh.com/current/installation-guide/installing-elastic-stack/index.html>`_.

Installing Elastic Stack
========================

This guide describes the installation of an Elastic Stack server composed by Logstash, Elasticsearch, and Kibana. We will illustrate package-based installations of these components.  You can also install them from binary tarballs, however, this is not preferred or supported under Wazuh documentation.

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
