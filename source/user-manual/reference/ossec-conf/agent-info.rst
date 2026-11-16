.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn about the agent-info configuration section of ossec.conf, which sets how often the Wazuh agent collects its metadata and checks that the Wazuh manager has the same data.

.. _reference_ossec_agent_info:

agent-info
==========

.. topic:: XML section name

   .. code-block:: xml

      <agent-info>
      </agent-info>

The ``<agent-info>`` section configures the agent-info module of the Wazuh agent on Linux, Windows, and macOS. The module collects the agent metadata, such as its ID, name, version, operating system, and groups, and keeps it synchronized with the Wazuh manager. The module always runs with its default settings, so define this section only when you need to change them.

You can also define this section in the ``agent.conf`` file of a group. See :doc:`centralized configuration <../centralized-configuration>`. An ``<agent-info>`` block resets the options it doesn't set to their default values, so a block in ``agent.conf`` replaces the whole local section.

Options
-------

- `interval`_
- `integrity_interval`_

interval
^^^^^^^^

Time, in seconds, between two collections of the agent metadata.

+----------------------+------------------------------+
| **Default value**    | 60                           |
+----------------------+------------------------------+
| **Allowed values**   | Integer from 60 to 86400     |
+----------------------+------------------------------+

integrity_interval
^^^^^^^^^^^^^^^^^^

Time, in seconds, between two integrity checks that verify that the agent state stored on the Wazuh manager matches the agent.

+----------------------+------------------------------+
| **Default value**    | 86400 (24 hours)             |
+----------------------+------------------------------+
| **Allowed values**   | Integer from 60 to 604800    |
+----------------------+------------------------------+

.. note::
   The Wazuh agent ignores a value that is out of range or not an integer, logs a warning, and uses the default value. It also logs a warning for any other option in the section and ignores it.

The ``agent_info.max_entries`` and ``agent_info.ttl`` options, which bound the task registry of the module, are set in the :ref:`internal configuration <reference_internal_options>` file.

Sample Configuration
--------------------

.. code-block:: xml

   <agent-info>
     <interval>60</interval>
     <integrity_interval>86400</integrity_interval>
   </agent-info>
