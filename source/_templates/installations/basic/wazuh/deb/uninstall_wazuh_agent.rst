.. Copyright (C) 2015, Wazuh, Inc.

.. code-block:: console

  # apt-get remove wazuh-agent

There are certain files marked as configuration files. Due to this designation, the package manager does not remove those files from the filesystem. A complete file removal can be done using the following command:

.. code-block:: console

  # apt-get remove --purge wazuh-agent

.. End of include file
