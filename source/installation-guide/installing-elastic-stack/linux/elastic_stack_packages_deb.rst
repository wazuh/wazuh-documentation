.. Copyright (C) 2019 Wazuh, Inc.

.. meta:: :description: Learn how to install Elastic Stack for using Wazuh on Debian

.. _elastic_stack_packages_deb:


Debian
======

This document will guide you to install the Elastic Stack components on Debian 7 or higher versions.

.. note:: Root user privileges are necessary to execute all the commands described below.

Adding the Elastic Stack repository
-----------------------------------

.. include:: deb/add_repository.rst

Installing Elasticsearch
------------------------

Elasticsearch is a highly scalable full-text search and analytics engine. For more information, please see `Elasticsearch <https://www.elastic.co/products/elasticsearch>`_. Below, you can follow the type of installation with regard to the desired architecture and whether you want to configure only one Elasticsearch node or if you want to configure an Elasticsearch cluster.

#. Install the Elasticsearch package:

    .. include:: deb/install_elasticsearch.rst

#. Configure Elasticsearch:

    .. include:: common/configure_elasticsearch.rst

    .. note:: If your using Debian 7, you will need to change the ulimit by ``ulimit -u 4096``. In addition to this, the setting ``bootstrap.system_call_filter`` must be added and set to ``false`` in the ``/etc/elasticsearch/elasticsearch.yml`` configuration file.

#. Enable and start the Elasticsearch service:

    .. include:: common/enable_elasticsearch.rst

#. Generate credentials for all the Elastic Stack pre-built roles and users:

    .. include:: common/generate_password.rst

Configure Filebeat
------------------

#. Once Elasticsearch is up and running, we need to finish the Filebeat configuration by editing the file ``/etc/filebeat/filebeat.yml``:

    .. include:: common/configure_filebeat.rst

#. Enable and start the Filebeat service:

    .. include:: common/enable_filebeat.rst

#. Load the Filebeat template:

    .. include:: common/load_filebeat_template.rst

    ending text

Installing Kibana
-----------------

Kibana is a flexible and intuitive web interface for mining and visualizing the events and archives stored in Elasticsearch. Find more information at `Kibana <https://www.elastic.co/products/kibana>`_.

#. Install the Kibana package:

    .. include:: deb/install_kibana.rst

#. Configure certificates. Copy the certificates from the Elasticsearch configuration folder into the kibana:

    .. include:: common/copy_kibana_certificates.rst

#. Configure Kibana:

    .. include:: common/configure_kibana.rst

#. Install the Wazuh Kibana plugin. You can install it by using an URL (a) or a previously downloaded package (b):

    .. include:: common/install_kibana_plugin.rst

#. Enable and start the Kibana service:

    .. include:: common/enable_kibana.rst

.. include:: common/kibana_final_note.rst

Disabling repositories
----------------------

.. include:: common/disabling_repositories_explanation.rst

In order to anticipate and avoid this situation, we recommend disabling the Elasticsearch repository in the following way:

.. include:: deb/disabling_repositories.rst

Next steps
----------

.. include:: common/next_steps.rst

Uninstall
---------

To uninstall Elasticsearch:

.. include:: deb/uninstall_elasticsearch.rst

To uninstall Kibana:

.. include:: deb/uninstall_kibana.rst
