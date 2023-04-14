.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: This section of the Wazuh documentation guides through the upgrade process of the Wazuh agent from 1.x to 2.x.
  
.. _upgrading_agent_1.x_2.x:

Upgrading the Wazuh agent from 1.x to 2.x
=========================================

Follow these steps to update the Wazuh agent 1.x to the Wazuh agent 2.x:

.. tabs::

  .. group-tab:: DEB or RPM based Linux systems

    On DEB or RPM based Linux systems, the Wazuh agents can be upgraded using the packages manager. The process is similar to :ref:`installing the Wazuh agent on Linux <wazuh_agent_package_linux>`.

    The Wazuh agent's version can be verified by running the following command:

    .. code-block:: console

        # /var/ossec/bin/manage_agents -V

    .. code-block:: none
        :class: output

        Wazuh v2.0 - Wazuh Inc.

        This program is free software; you can redistribute it and/or modify
        it under the terms of the GNU General Public License (version 2) as
        published by the Free Software Foundation.

  .. group-tab:: Windows

    On Windows systems, the Wazuh agent upgrade can be done by deleting the previous version and installing the Wazuh agent 2.x from scratch. As the Wazuh agent's ``ossec.conf`` configuration file will be overwritten, it is recommended to backup the old configuration file and import previous settings where needed.

    More information about the process can be found in the :ref:`Wazuh agent installation on Windows <wazuh_agent_package_windows>` section.


  .. group-tab:: MacOS X

    On MacOS X system the Wazuh agent upgrade can be done by deleting the previous version and installing the Wazuh agent 2.x from scratch. As the Wazuh agent's ``ossec.conf`` configuration file will be overwritten, it is recommended to backup the old configuration file and import previous settings where needed.

    More information about the process can be found in the :ref:`Wazuh agent installation on MacOS X <wazuh_agent_package_macos>` section.
