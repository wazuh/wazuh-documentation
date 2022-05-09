.. Copyright (C) 2022 Wazuh, Inc.

.. meta::
  :description: The Wazuh manager can be configured to publish the remote service. Check out this section of our documentation to learn more about this.

.. _remote-service:

Remote service
==============

The Wazuh manager can be configured to publish the remote service used by agents as follows:

Configuration
-------------

All of the configuration of Remote Service is done via the ``manager.conf`` file using the ``<remote>`` XML tag. The available options are detailed in :ref:`Remote config <reference_ossec_remote>`.

You can change the IP address used to listen the service with the following configuration:

::

  <wazuh_config>
    <remote>
      <local_ip>10.0.0.10</local_ip>
    </remote>
  </wazuh_config>

This will set the manager to listen on IP address ``10.0.0.10``.

When you change any value in the ``manager.conf`` file, you must restart the service for these changes to take effect.

a. For Systemd:

.. code-block:: console

  # systemctl restart wazuh-manager

b. For SysV Init:

.. code-block:: console

  # service wazuh-manager restart
