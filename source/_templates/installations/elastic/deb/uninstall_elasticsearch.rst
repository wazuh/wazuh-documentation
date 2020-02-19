.. Copyright (C) 2020 Wazuh, Inc.

.. code-block:: console

  # apt-get remove elasticsearch

There are files marked as configuration and data files. Due to this designation, the package manager doesn't remove those files from the filesystem. The complete file removal action is the user's responsibility. It can be done by removing the folder ``/var/lib/elasticsearch`` and ``/etc/elasticsearch``.

.. End of include file
