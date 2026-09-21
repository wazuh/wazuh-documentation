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

The ``<active-response>`` section controls Active Response behavior on the Wazuh agent. Use this section to enable or disable Active Response on the agent.

Options
-------

- `disabled`_

disabled
^^^^^^^^

Enables or disables Active Response on the Wazuh agent. Set this option to ``yes`` to prevent the agent from executing Active Response commands.

This option is mandatory in every ``<active-response>`` section.

+----------------------+-----------+
| **Default value**    | no        |
+----------------------+-----------+
| **Allowed values**   | yes, no   |
+----------------------+-----------+

Sample Configuration
---------------------

.. code-block:: xml

   <active-response>
     <disabled>no</disabled>
   </active-response>
