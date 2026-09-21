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

disabled
^^^^^^^^

Enables or disables Active Response on the Wazuh agent. Set this option to ``yes`` to prevent the agent from executing Active Response commands.

This option is mandatory in every ``<active-response>`` section.

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

Sample Configuration
---------------------

.. code-block:: xml

   <active-response>
     <disabled>no</disabled>
     <repeated_offenders>1,5,10</repeated_offenders>
   </active-response>
