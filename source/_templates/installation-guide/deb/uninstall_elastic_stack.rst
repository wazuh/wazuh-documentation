.. Copyright (C) 2019 Wazuh, Inc.

To uninstall Elasticsearch:

  .. code-block:: console

    # apt-get remove elasticsearch

There are files marked as configuration and data files. Due to this designation, the package manager doesn't remove those files from the filesystem. The complete file removal action is the user's responsibility. It can be done by removing the folder ``/var/lib/elasticsearch`` and ``/etc/elasticsearch``.

To uninstall Kibana:

  .. code-block:: console

    # apt-get remove kibana

As in the previous case, the complete file removal can be done by removing the folder ``/var/lib/kibana`` and ``/etc/kibana``.

.. End of install_elasticsearch.rst
