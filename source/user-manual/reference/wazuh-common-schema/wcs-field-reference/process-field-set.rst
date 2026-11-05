.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: The fields of the process field set of the Wazuh Common Schema (WCS), grouped by name prefix, with an example of how to use process.command_line.

``process`` field set
=====================

The ``process`` field set is the largest group of event fields, so its tables are grouped by name prefix, for example ``process.*`` for its top-level fields. Expand a table under its heading, or use the search and filter bar to find a field.

Example: Extract the command line of a started process
------------------------------------------------------

``process.command_line`` holds the full command line of a process. This decoder extracts it with a parse pattern: the text between the quotes after ``cmdline=`` goes into the field.

The decoder is a child of the root decoder of your integration, ``decoder/core-wazuh-message/0``, as in :ref:`Create a security analytics detection workflow <data_analysis_detection_workflow>`. Create it in **Ruleset management** > **Normalization** > **Decoders**, then check the output in **Log test**. The highlighted lines show where ``process.command_line`` is used and where it appears in the output.

**Sample log**

.. code-block:: none

   procmon: pid=4242 user=alice name=curl cmdline="curl -s -o /tmp/update.sh http://198.51.100.7/update.sh"

**Decoder**

.. code-block:: yaml
   :emphasize-lines: 12

   name: decoder/procmon/0
   enabled: true
   metadata:
     title: Process monitor logs
     author: Security Team
     description: Decodes the process start events of the process monitor.
   parents:
     - decoder/core-wazuh-message/0
   check:
     - event.original: starts_with("procmon:")
   parse|event.original:
     - "procmon: pid=<process.pid> user=<user.name> name=<process.name> cmdline=\"<process.command_line>\""
   normalize:
     - map:
         - event.kind: "event"
         - event.category: array_append(process)
         - event.dataset: "procmon"

**Output event (excerpt)**

.. code-block:: json
   :emphasize-lines: 5

   {
     "process": {
       "pid": 4242,
       "name": "curl",
       "command_line": "curl -s -o /tmp/update.sh http://198.51.100.7/update.sh"
     },
     "user": { "name": "alice" },
     "event": { "dataset": "procmon", "kind": "event", "category": [ "process" ] }
   }

.. note::

   -  A parse pattern must consume the whole log line. If the line has a different format, the decoder rejects the event.


Fields
------

.. wcs-field-tables:: stateless/events/main
   :field-sets: process
   :group-by-prefix:
   :collapsible:
