.. Copyright (C) 2022 Wazuh, Inc.

.. tabs::

  .. group-tab:: Wazuh manager

      .. tabs::

        .. tab:: Systemd

          .. code-block:: console

            systemctl restart wazuh-manager

        .. tab:: SysV Init

          .. code-block:: console

            service wazuh-manager restart

  .. group-tab:: Wazuh agent

      .. tabs::

        .. tab:: Systemd

          .. code-block:: console

            systemctl restart wazuh-agent

        .. tab:: SysV Init

          .. code-block:: console

            service wazuh-agent restart

.. End of include file
