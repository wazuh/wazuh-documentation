.. Copyright (C) 2019 Wazuh, Inc.


**Elasticsearch configuration**

#. Add the Elastic repository and its GPG key

    .. include:: /_templates/installation-guide/deb/add_elastic_repository.rst

#. Install the Elasticsearch package>

    .. include:: /_templates/installation-guide/deb/install_elasticsearch.rst

#. Once Elasticsearch is installed we need to configure it by downloading and editing the file ``/etc/elasticsearch/elasticsearch.yml`` as follows:

    .. include:: /_templates/installation-guide/common/edit_elastic_yml_single_node.rst

    .. note:: If your using Debian 7, you will need to change the ulimit by ``ulimit -u 4096``. In addition to this, the setting ``bootstrap.system_call_filter`` must be added and set to ``false`` in the ``/etc/elasticsearch/elasticsearch.yml`` configuration file.

#. Certificates creation:

    .. include:: /_templates/installation-guide/common/certificates_creation_aio.rst

#. Enable and start the Elasticsearch service:

    .. include:: /_templates/installation-guide/deb/enable_start_elasticsearch.rst

#. Generate credentials for all the Elastic Stack pre-built roles and users:

    .. include:: /_templates/installation-guide/common/generate_elastic_credentials.rst

**Filebeat configuration**

#. Configure filebeat to use the Elasticsearch certificates and set-up the Elasticsearch credentials:

    .. include:: /_templates/installation-guide/common/configure_filebeat.rst

#. Enable and start the Filebeat service:

    .. include:: /_templates/installation-guide/deb/enable_start_filebeat.rst

#. Load the Filebeat template:

    .. include:: /_templates/installation-guide/common/load_filebeat_template.rst

    .. note:: You can test Filebeat output using ``filebeat test output``.

.. End of all_in_one_tab.rst
