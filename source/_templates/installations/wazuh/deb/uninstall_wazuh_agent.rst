.. Copyright (C) 2015, Wazuh, Inc.

.. code-block:: console

   # apt-get remove wazuh-agent

Some files are marked as configuration files. Due to this designation, the package manager does not remove these files from the filesystem. Run the following command If you want to remove all files completely.

.. code-block:: console

   # apt-get remove --purge wazuh-agent

.. End of include file
