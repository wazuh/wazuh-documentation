.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Learn about the active-response configuration section of ossec.conf, which controls Active Response behavior on the Wazuh agent.

.. _reference_ossec_active_response:

active-response
================

.. topic:: XML section name

   .. code-block:: xml

      <active-response>
      </active-response>

The ``<active-response>`` section controls Active Response behavior on the Wazuh agent. Use this section to enable or disable Active Response and configure increasing timeout periods for repeated offenders.

Options
-------

- `disabled`_
- `repeated_offenders`_
- `allowlist`_

disabled
^^^^^^^^

Enables or disables Active Response on the Wazuh agent. Set this option to ``yes`` to prevent the agent from executing Active Response commands.

If you omit this option, Active Response is enabled. The ``<ca_store>`` and ``<ca_verification>`` options that the installer writes in this section are accepted for compatibility with Wazuh 4.x. Configure them in :doc:`agent-upgrade <agent-upgrade>` instead.

+----------------------+-----------+
| **Allowed values**   | yes, no   |
+----------------------+-----------+

repeated_offenders
^^^^^^^^^^^^^^^^^^^^

Defines increasing timeout periods for repeated offenders. Specify a comma-separated list of up to five values in increasing order.

The timeout configured on the Wazuh manager applies to the first occurrence. The values configured here apply to subsequent occurrences.

+----------------------+-------------------------------+
| **Default value**    | n/a                           |
+----------------------+-------------------------------+
| **Allowed values**   | A positive number (minutes)   |
+----------------------+-------------------------------+

.. note::
   Configure this option directly in the agent's ``ossec.conf`` file. It cannot be distributed through ``agent.conf`` and is not supported on Windows agents.

allowlist
^^^^^^^^^

Lists the IP addresses and networks that Active Response never blocks. Each ``<allowlist>`` element takes one IPv4 or IPv6 address, or a network in CIDR notation, for example ``10.0.0.0/8``. Repeat the element to add more entries.

The Wazuh agent always excludes the loopback addresses (``127.0.0.0/8`` and ``::1``), the unspecified addresses (``0.0.0.0`` and ``::``) and the address of the Wazuh manager, whether or not they are listed. A value such as ``any``, a negated address such as ``!10.0.0.1``, or a host name is rejected: ``wazuh-execd`` logs ``(1235): Invalid value for element 'allowlist'`` and doesn't start.

+----------------------+---------------------------------------------------+
| **Default value**    | n/a                                               |
+----------------------+---------------------------------------------------+
| **Allowed values**   | IPv4 or IPv6 address, or network in CIDR notation |
+----------------------+---------------------------------------------------+

Sample Configuration
---------------------

.. code-block:: xml

   <active-response>
     <disabled>no</disabled>
     <repeated_offenders>1,5,10</repeated_offenders>
     <allowlist>10.0.0.0/8</allowlist>
   </active-response>
