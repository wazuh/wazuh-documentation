.. Copyright (C) 2015, Wazuh, Inc.

.. code-block:: console

  # apt-get remove wazuh-agent

Some files are marked as configuration files. Due to this designation, the package manager does not remove these files from the filesystem. If you want to completely remove all files, run the following command:

.. code-block:: console

  # apt-get remove --purge wazuh-agent

.. End of include file
