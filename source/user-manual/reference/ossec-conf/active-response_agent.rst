.. Copyright (C) 2020 Wazuh, Inc.

.. _reference_ossec_active_response_agent:

active-response (Agent)
=======================

.. topic:: XML section name

	.. code-block:: xml

		<active-response>
		</active-response>

.. note:: It is also necessary to include active-response configuration in the manager side, check :ref:`here <reference_ossec_active_response_manager>`.

Options
-------

- `disabled`_
- `repeated_offenders`_

disabled
^^^^^^^^

Toggles the active-response capability on and off. Setting this option to ``yes`` on an agent.conf will disable active-response for that agent only.

.. note::

    This option is available on server, local, and agent installations.

+--------------------+------------+
| **Default value**  | no         |
+--------------------+------------+
| **Allowed values** | yes, no    |
+--------------------+------------+


repeated_offenders
^^^^^^^^^^^^^^^^^^

Sets timeouts in minutes for repeat offenders. This is a comma-separated list of increasing timeouts that can contain a maximum of 5 entries.

+--------------------+-----------------------------+
| **Default value**  | n/a                         |
+--------------------+-----------------------------+
| **Allowed values** | A positive number (minutes) |
+--------------------+-----------------------------+

.. warning::
    This option must be configured in the **agent.conf** file, even when using a manager/agent setup with centralized configuration of other settings via **shared.conf**. Apart from that, it has to be defined in the upper ``<active-response>`` section found in the configuration file.

Sample Configuration
--------------------

.. code-block:: xml

    <!-- On the agent.conf file -->
    <active-response>
      <disabled>no</disabled>
      <repeated_offenders>1,5,10</repeated_offenders>
    </active-response>
