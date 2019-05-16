.. Copyright (C) 2019 Wazuh, Inc.

.. _remote-service:

Remote service
==============

The Wazuh Manager can be configured to publish the remote service used by agents as follows:

Configuration
-------------

All of the configuration of Remote Service is done via the ``ossec.conf`` file using the ``<remote>`` XML tag. The available options are detailed in :ref:`Remote config <reference_ossec_remote>`.

You can change the IP address used to listen the service with the following configuration:

::

  <ossec_config>
    <remote>
      <local_ip>10.0.0.10</local_ip>
    </remote>
  </ossec_config>

This will set the manager to listen on IP address to 10.0.0.10.

When you change any value in the ``ossec.conf`` file, you must restart the service before these changes will take effect.

a. For Systemd:

.. code-block:: console

  # systemctl restart wazuh-manager

b. For SysV Init:

.. code-block:: console

  # service wazuh-manager restart
