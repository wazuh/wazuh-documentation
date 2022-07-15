.. Copyright (C) 2015, Wazuh, Inc.

.. _verify-agent-conf:

verify-agent-conf
=================

The **verify-agent-conf** program verifies the Wazuh :ref:`shared.conf <reference_shared_conf>` configuration.

This program searches in ``/var/ossec/etc/shared`` for the possible folders belonging to groups and verifies the ``shared.conf`` file
inside them if it exists. We can also specify the path of the file to be verified.

Usage:

.. code-block:: console

      verify-agent-conf [-f <shared.conf file>]
