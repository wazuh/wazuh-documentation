.. _how_to_remediation:

HOWTos
==========================

1. `Configure an active response that can remove the action`_

``Configure an active response that can remove the action``
-----------------------------------------------------------

Using the ``timeout_allowed`` option. More info: :ref:`command <reference_ossec_commands>`

Example:

Command::

  <command>
    <name>win_route-null</name>
    <executable>route-null.cmd</executable>
    <expect>srcip</expect>
    <timeout_allowed>yes</timeout_allowed>
  </command>

We allow the command to use timeout option.

Active Response::

  <active‐response>
    <command>win_route‐null</command>
    <location>local</location>
    <level>8</level>
    <timeout>900</timeout>
  </active‐response>

Timeout indicate the time until remove the action.
