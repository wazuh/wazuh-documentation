.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: WPK files are archive files used for distributing and installing updates or new versions of the Wazuh agent on various operating systems. Learn more in this section of the documentation.

Wazuh signed package (WPK) files
================================

WPK files are archive files used for distributing and installing updates or new versions of the Wazuh agent on various operating systems. A WPK file must contain an installation program in binary form or a script in any language the Wazuh agent supports (Bash, Python, etc). Linux WPK packages must contain a Bash script named ``upgrade.sh`` for UNIX or ``upgrade.bat`` for Windows. This program must:

-  Fork itself, as the parent, will return 0 immediately.
-  Restart the Wazuh agent.
-  Write a file called ``upgrade_result`` containing a status number (0 means OK) before exiting.

There are two methods to remotely upgrade Wazuh agents when using the WPK feature:

-  Using a repository (Wazuh provides access to an updated WPK repository for each new release. This repository is used by default).
-  Using a custom WPK file

Custom agent upgrade packages are created by generating a repository on the Wazuh server to host the generated WPK (Wazuh package) files. The Wazuh manager can then be set to send files to the Wazuh agents from this repository.

.. note::

   In case of having a multi-node Wazuh server cluster, the custom WPK file has to exist on all Wazuh server nodes in the specified path.

.. toctree::
   :maxdepth: 3

   create-custom-wpk
   install-custom-wpk
   wpk-list
