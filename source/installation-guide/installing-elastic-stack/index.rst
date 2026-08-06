.. Copyright (C) 2019 Wazuh, Inc.

.. _installation_elastic:

Installing Elastic Stack
========================

This guide describes the installation of an Elastic Stack server comprised of Filebeat, Elasticsearch, and Kibana. We will illustrate package-based installations of these components.  You can also install them from binary tarballs, however, this is not preferred or supported under Wazuh documentation.

In addition to Elastic Stack components, you will also find the instructions to install and configure the Wazuh app (deployed as a Kibana plugin).

Depending on your operating system you can choose to install Elastic Stack from RPM or DEB packages. Consult the table below and choose how to proceed:

+--------------------------------------------+-----------------------------------------------+
| Type                                       | Description                                   |
+============================================+===============================================+
| `RPM packages <elastic_server_rpm.html>`_  | Install Elastic Stack on CentOS/RHEL/Fedora.  |
+--------------------------------------------+-----------------------------------------------+
| `DEB packages <elastic_server_deb.html>`_  | Install Elastic Stack on Debian/Ubuntu.       |
+--------------------------------------------+-----------------------------------------------+

After the installation, find below optional steps you may find interesting:

- :ref:`Elasticsearch tuning <elastic_tuning>`
- :ref:`Transform your data with Logstash <transform_logstash>`
- :ref:`Configure an Elasticsearch Cluster <configure_elasticsearch_cluster>`


.. note::

    Currently, the Elastic Stack is only supported on 64-bit operating systems, according to its `Support Matrix <https://www.elastic.co/support/matrix>`_.

.. toctree::
   :hidden:
   :maxdepth: 2

   elastic_server_rpm
   elastic_server_deb
   protect-installation/index
   transform_logstash
   elastic_tuning
   configure-elasticsearch-cluster.rst
