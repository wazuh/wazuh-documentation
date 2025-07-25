.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: The verify-agent-conf program verifies the Wazuh agent.conf configuration. Learn more about it in this section of the Wazuh documentation.

verify-agent-conf
=================

The **verify-agent-conf** program verifies the Wazuh :doc:`agent.conf </user-manual/reference/centralized-configuration>` configuration.

This program searches in ``/var/ossec/etc/shared`` the possible folders belonging to groups and verifies the ``agent.conf`` file
inside them if it exists. We can also specify the path of the file to be verified.

Usage:

.. code-block:: console

      verify-agent-conf [-f <agent.conf file>]
