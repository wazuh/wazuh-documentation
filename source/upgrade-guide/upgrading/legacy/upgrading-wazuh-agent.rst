.. Copyright (C) 2020 Wazuh, Inc.

.. _upgrading_wazuh_agent:

Upgrading the Wazuh agents
==========================

Follow these steps to update the Wazuh v1.x agents to Wazuh v2.x:

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

  .. group-tab:: Windows, Mac OS and other operating systems

    On Windows, Mac OS and other operating systems, it can be done by deleting the previous version and installing Wazuh v2.x from scratch. More information about the process can be found on:

    - :ref:`Install Wazuh agent on Windows <wazuh_agent_package_windows>`
    - :ref:`Install Wazuh agent on Mac OS X <wazuh_agent_package_macos>`
