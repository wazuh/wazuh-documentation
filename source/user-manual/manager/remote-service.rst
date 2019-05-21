.. Copyright (C) 2019 Wazuh, Inc.

.. _remote-service:

.. meta::
  :description: A complete user manual about how to manage and administer the Wazuh manager.


Remote service
==============

The Wazuh manager is the system that analyzes the data received from all registered agents triggering alerts when an event matches a rule, for example: intrusion detected, file modified, configuration not compliant with policy, possible rootkit, etc. The manager also operates as an agent on the local machine, so it has all the features that an agent has. Also, the manager can forward the alerts it triggers through syslog, emails or integrated external APIs.

The Wazuh manager can be configured to publish the remote service used by agents as follows:

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
