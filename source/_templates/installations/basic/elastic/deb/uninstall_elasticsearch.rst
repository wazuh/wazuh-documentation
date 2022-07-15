.. Copyright (C) 2015, Wazuh, Inc.

.. code-block:: console

  # apt-get remove elasticsearch

There are files marked as configuration and data files. Due to this designation, the package manager does not remove those files from the filesystem. A complete file removal can be done using the following command:

.. code-block:: console

  # apt-get remove --purge elasticsearch

.. End of include file
