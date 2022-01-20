.. Copyright (C) 2022 Wazuh, Inc.

Checking services and certificates
----------------------------------

Check the certificates:

.. code-block:: console

  # curl -sL  https://packages.wazuh.com/resources/4.2/certificate_checker.sh | bash -

Check the Wazuh manager service:


.. tabs::


  .. group-tab:: Systemd


    .. code-block:: console

      # systemctl status wazuh-manager


  .. group-tab:: SysV Init

    .. code-block:: console

      # service wazuh-manager status



Check the Wazuh API service:

.. tabs::


  .. group-tab:: Systemd


    .. code-block:: console

      # systemctl status wazuh-api


  .. group-tab:: SysV Init

    .. code-block:: console

      # service wazuh-api status



Check the Filebeat service:

.. tabs::


  .. group-tab:: Systemd


    .. code-block:: console

      # systemctl status filebeat


  .. group-tab:: SysV Init

    .. code-block:: console

      # service filebeat status



.. End of include file

