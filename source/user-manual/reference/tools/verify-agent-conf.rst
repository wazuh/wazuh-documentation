
.. _verify-agent-conf:

verify-agent-conf
=================

The **verify-agent-conf** program verifies the Wazuh :ref:`agent.conf <reference_agent_conf>` configuration.

This program searches in ``/var/ossec/etc/shared`` the possible folders belonging to groups and verifies the ``agent.conf`` file
inside them if it exists. We can also specify the path of the file to be verified.

Usage:

.. code-block:: console

      verify-agent-conf [-f <agent.conf file>]
