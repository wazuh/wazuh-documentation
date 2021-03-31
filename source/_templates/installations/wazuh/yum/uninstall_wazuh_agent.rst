.. Copyright (C) 2021 Wazuh, Inc.

.. code-block:: console

  # yum remove wazuh-agent

Some files are marked as configuration files. Due to this designation, the package manager does not remove these files from the filesystem. The complete file deletion action is the responsibility of the user and can be done by deleting the folder ``/var/ossec``.

.. End of include file
