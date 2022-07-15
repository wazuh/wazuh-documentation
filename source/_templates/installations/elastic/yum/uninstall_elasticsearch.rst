.. Copyright (C) 2015, Wazuh, Inc.

.. code-block:: console

  # yum remove opendistroforelasticsearch

There are files marked as configuration and data files. Due to this designation, the package manager does not remove those files from the filesystem. The complete file removal action is on user's responsibility. It can be done by removing the folder ``/var/lib/elasticsearch`` and ``/etc/elasticsearch``.

.. End of include file
