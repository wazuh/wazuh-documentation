.. Copyright (C) 2020 Wazuh, Inc.

.. code-block:: console

  # zypper remove wazuh-agent

There are files marked as configuration files. Due to this designation, the package manager doesn’t remove those files from the filesystem. The complete files removal action is a user responsibility. It can be done by removing the folder ``/var/ossec``.

.. End of include file
