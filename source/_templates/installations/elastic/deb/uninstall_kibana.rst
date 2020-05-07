.. Copyright (C) 2020 Wazuh, Inc.

.. code-block:: console

  # apt-get remove kibana opendistroforelasticsearch-kibana

There are files marked as configuration and data files. Due to this designation, the package manager doesn’t remove those files from the filesystem. The complete files removal action is a user responsibility. It can be done by removing the folder ``/var/lib/kibana`` and ``/etc/kibana``.

.. End of include file
