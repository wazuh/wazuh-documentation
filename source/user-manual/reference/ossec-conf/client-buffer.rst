.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Learn about the client_buffer configuration section of ossec.conf, which configures how the Wazuh agent buffers events before sending them to the Wazuh manager.

.. _reference_ossec_client_buffer:

client_buffer
=============

.. topic:: XML section name

   .. code-block:: xml

      <client_buffer>
      </client_buffer>

The ``<client_buffer>`` section configures how the Wazuh agent buffers events before sending them to the Wazuh manager. These settings control the size of the event queue and the rate at which buffered events are transmitted.

Options
-------

- `disabled`_
- `queue_size`_
- `events_per_second`_

disabled
^^^^^^^^

Toggles the agent buffer on and off. When set to ``yes``, the agent will send events to the manager without any congestion control.

+----------------------+-----------+
| **Default value**    | no        |
+----------------------+-----------+
| **Allowed values**   | yes, no   |
+----------------------+-----------+

.. note::
   Disabling this functionality in large environments may overwhelm the manager and the network, causing them to fail.

queue_size
^^^^^^^^^^^

Specifies the maximum number of events that can be stored in the client buffer before new events are dropped.

+----------------------+------------------------------------+
| **Default value**    | 5000                               |
+----------------------+------------------------------------+
| **Allowed values**   | Any number between 1 and 100000.   |
+----------------------+------------------------------------+

events_per_second
^^^^^^^^^^^^^^^^^^^

Specifies the maximum number of buffered events the agent sends to the Wazuh manager each second. Use this option to throttle event transmission after connectivity is restored or when the agent is processing a backlog of events.

+----------------------+----------------------------------+
| **Default value**    | 500                              |
+----------------------+----------------------------------+
| **Allowed values**   | Any number between 1 and 1000.   |
+----------------------+----------------------------------+

Default configuration
------------------------

.. code-block:: xml

   <client_buffer>
     <!-- Agent buffer options -->
     <disabled>no</disabled>
     <queue_size>5000</queue_size>
     <events_per_second>500</events_per_second>
   </client_buffer>
