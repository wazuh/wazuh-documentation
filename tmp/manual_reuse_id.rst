.. _manual_reuse_id:

Agent ID reusage
================

.. versionadded:: v1.0.4

When OSSEC adds a new agent, assigns an unique ID for it and creates a shared
key which will be used to encrypt messages between agent and server. All this
information is stored on the file ``etc/client.keys``.

Information about agents' id and keys are not removed by default when removing 
agents, instead of it OSSEC "comments" the corresponding line in the file. This 
behavior can potentially make the ``client.keys`` grow if agents are re-added 
frequently with forcing.

In order to solve this issue, there is an optional feature: **id reusage**, that
can be enabled as compile option: ::

    make TARGET=server REUSE_ID=yes (...)

.. note:: This option affects only to managers.

When enabled, deleting agents will remove the corresponding key from
``client.keys``. Every time that ``manage_agents`` or ``ossec-auth``
remove an agent to add another with the same IP, **the new agent will get the id
of the former**, and the key in ``client.keys`` will be overwritten.

This feature doesn't affect the backup: the old agent's data will still be
backed up.

.. seealso::
    - :ref:`manual_authd`
    - :ref:`manage_agents`
