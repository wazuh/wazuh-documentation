.. _remote-service:

Remote service
==============

You can set how Wazuh Manager could publish their remote service used by Agents:

Configuration
-------------

All configuration of Remote Service is done via ``ossec.conf`` using ``<remote>`` XML tag, all the available options are detailed in :ref:`Remote config <reference_ossec_remote>`

You can change what ip address use to listen the service:

::

  <ossec_config>
    <remote>
      <local_ip>10.0.0.10</local_ip>
    </remote>
  </ossec_config>

This will set the default listen ip address to 10.0.0.10.

When you change any value on ``ossec.conf`` file, you need to restart the service to enabling previously changed values.

a. For Systemd:

.. code-block:: console

  # systemctl restart wazuh-manager

b. For SysV Init:

.. code-block:: console

  # service wazuh-manager restart
