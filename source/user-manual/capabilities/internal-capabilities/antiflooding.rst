.. _antiflooding:

Anti-flooding mechanism
=======================

This mechanism is designed in light of the necessity of guarantee that a bad configuration of an agent could not cause any repercussion in the network or the manager. It consists in an leaky bucket
that collects all the generated events, sending them to the manager regularly. This way expects to avoid extreme situations with their consequences like the loss of event or the unexpected
behavior of Wazuh components.

Another filter that provide the anti-flooding mechanism allows to configure daemons that may flood the buffer quickly with a puntual boost of events. Therefore, daemons like OpenScap
Wodle that previously could send thousands of events per second have a configurable limit of the maximun events per second sent.

- `Why it is necessary an anti-flooding mechanism?`_
- `How it works: Leaky bucket`_
- `Use case: Leaky bucket`_
- `Anti-flooding in agent modules`_

Why it is necessary an anti-flooding mechanism?
-----------------------------------------------

Based on Wazuh architecture, we know that Wazuh agents collect information from log files, command outputs, different kind of scans, etc. Sending all the collected information
organized by events to their manager. Without any congestion control, an agent could send all the events per second that its hardware permits it.

Due to the previous fact, a bad configuration in an agent may generate enough events to collapse a network or its manager. Next cases try to be ilustrative of a bad configuration:

- Realtime FIM of a changeable directory: Realtime FIM is in charge of ``Syscheck`` program, it generates events when the checksum of a certain directory changes. Whether Syscheck
  monitor a folder which changes constantly, it will generate a big amount of events without any interesting value. In addition, if the monitored folder contains any file where Wazuh writes
  when it generates an event, like ``/var/ossec/queue/``, it will provoke an infinite loop.

- Windows Filtering Platform: This is another example of bad configuration of an agent on Windows. There is an event in Windows events for Firewall, particularly the 5156 event ID,
  that generates an event each time when a remote connection is accepted. When this event is active and Wazuh is monitoring Windows events, a connection between the agent and its
  manager will generate an event, and in turn that event will open another remote connection. This situation provokes flooding at least in agents and their managers inevitably.

In order to avoid situations like previous described, it has been deployed the following controls:

- Agent-manager anti-flooding mechanisms: This mechanism is developed as a way of communication congestion control with a leaky bucket that avoid the congestion of a network or a manager by an agent.

- Internal agent anti-flooding control: This mechanism is based on internal limits in different components of Wazuh allowing more control over the internal data flow in an agent.


How it works: Leaky bucket
--------------------------

As it has been described before, the leaky bucket is a congestion control located in agents and focused in agent-manager communication. It has been developed like a buffer which collects events generated in agents,
and send them to the manager with a constant rate, measured in events per second (EPS). This buffer has been measured thinking in the expected number of events generated in an agent, beeing carefully with the aim
of not to affect agents permormance. The following graphic shows how the bucket works.

.. thumbnail:: /images/manual/internal-capabilities/bucket.png
    :title: Anti-flooding bucket
    :align: center
    :width: 70%

It exists several levels of control for the bucket with the aim to be aware about the buffer status, and have the capacity to foresee a flooding situation.

- Warning alert: The first control will trigger an alert in the manager when the occupied capacity of the buffer has reached a certain threshold. By default it is set in 90 percent.

- Full alert: After the first control, if the buffer gets filled, another alert will be triggered in the manager. This new alert is more serious than a warning alert due to **a full bucket will**
  **drop incoming events**.

- Flood alert: It has been set a tolerance time since the buffer gets filled, triggering an alert whether the tolerance time has passed and the occupied capacity has not been lowered ``warning level`` in that time.

- Normal alert: The aim of this alert is to know whether the buffer has come back to a normal load after have reached whatever of higher levels. By default this level is set in 70 percent of buffer usage.

The leaky bucket is totally configurable to adapt it to any environment. For this purpose, the following configuration is available.

Measured configuration
^^^^^^^^^^^^^^^^^^^^^^

In ``<client_buffer>`` section of :doc:`Local configuration <../../reference/ossec-conf/index>` it is possible to disable the buffer, configure the size of the buffer, in number of events, and its throughput measured in EPS.

- Disable buffer: This parameter allows to disable the agent buffer and keep going with the data flow of old versions.

- Buffer length: The buffer length should be configured according to the expected number of events that an agent may generate. This value is set to 5000 events by default, which is plenty of size for a proper functioning.

- Events per second: It will be determine the throughput of the buffer. In order to avoid that an agent cause a flooding situation, this parameter set the maximum
  number of events per second sent to the manager. It should be stablished according to the capacity of the network and the number of agents that a manager is serving.

Threshold configuration
^^^^^^^^^^^^^^^^^^^^^^^^

In :doc:`Internal configuration <../../reference/internal-options>`, there are more advanced options related to the buffer operation. Specifically, it is configurable both thresholds available (warning level and normal level), and the tolerance
time to trigger the flooding alert.

Centralized configuration
^^^^^^^^^^^^^^^^^^^^^^^^^

Measured configuration is also available in :doc:`Centralized configuration <../../reference/centralized-configuration>` which means it can be set in ``agent.conf`` with
the aim of configure bucket options from the manager side. When an agent is configured by ``agent.conf``, that configuration overrides its own previous configuration.
For this reason, it is set another variable establishing the minimum value permited to ``events_per_second`` in the XML configuration in order to avoid configuration errors.
This variable is called ``agent.min_eps`` and it is located at :doc:`Internal configuration <../../reference/internal-options>`.

Use case: Leaky bucket
----------------------

In this section, it will be shown how the leaky bucket acts facing an extreme situation. For this purpose, the following graphic shows different phases of the buffer usage
when it is receiving more events than it is expected, and how it acts step by step to manage the situation.

.. thumbnail:: /images/manual/internal-capabilities/graphic_with_flood.png
    :title: buffer usage with flooding
    :align: center
    :width: 80%

Normal status (green area)
^^^^^^^^^^^^^^^^^^^^^^^^^^

As the graphic shows in the left area, the buffer is working normally receiving and sending events. In this situation no alerts are
triggered in the manager. However, a big amount of events can provoke an increase in the buffer usage reaching the ``warning level``, set in 90 percent.

Warning status (orange area)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Once it has reached ``warning level``, an alert like this one is triggered in the manager side:

.. code-block:: console

  ** Alert 1501604235.59814: - wazuh,agent_flooding,
  2017 Aug 01 18:17:15 (fedora) any->ossec-agent
  Rule: 521 (level 7) -> 'Agent buffer is close to an overflow state.'
  wazuh: Agent buffer: '90%'.

The information included in this rule is the following:

- Rule ID: 521.
- Rule level: 7.
- Rule description: Agent buffer is close to an overflow state.
- Buffer status: 90 %.

Despite this alert, **no event has been dropped** because of there are still free space in the buffer.

Reached to 100 % (light red area)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Whether the buffer is receiving events faster than it send them, it will probably reach 100 percent of its capacity, triggering another alert in the manager:

.. code-block:: console

  ** Alert 1501604236.60027: - wazuh,agent_flooding,
  2017 Aug 01 18:17:16 (fedora) any->ossec-agent
  Rule: 522 (level 9) -> 'Agent buffer is full. Events may be lost.'
  wazuh: Agent buffer: 'full'.

In this case, the alert include the following information:

- Rule ID: 522.
- Rule level: 9.
- Rule description: Agent buffer is full. Events may be lost.
- Buffer status: Full.

It is important to know that whether an event tries to be stored in the buffer and it is full, **the event will be dropped**. For example, if in a second
1000 events arrive to a full buffer with a throughput of 500 EPS, 500 of these events will be stored and **another 500 will be dropped**.

When buffer gets filled, it starts to count the time elapsed comparing it to the ``tolerance time`` set in ``internal_options.conf``.
At this point, it could be happen two situations:

- The usage of the buffer decreases under ``warning level``: The count stops being fewer than ``tolerance time``. Consequently, no alert about flooding appears
  in the manager. The following part of graphic ilustrates this situation.

.. thumbnail:: /images/manual/internal-capabilities/graphic_without_flooding.png
    :title: buffer usage without flooding
    :align: center
    :width: 70%

- Tolerance time is elapsed: In this case, it is considered that the buffer will not come back to the normal status by itself. For that reason,
  a more severe alert is triggered in the manager.

Flooding status (red area)
^^^^^^^^^^^^^^^^^^^^^^^^^^

As it has been already mentioned, a severe alert is triggered when ``tolerance time`` is elapsed. This alert has the following appearance:

.. code-block:: console

  ** Alert 1501604250.60248: mail  - wazuh,agent_flooding,
  2017 Aug 01 18:17:30 (fedora) any->ossec-agent
  Rule: 523 (level 12) -> 'Agent buffer is flooded. Check the agent configuration.'
  wazuh: Agent buffer: 'flooded'.

We extract the following information from this alert:

- Rule ID: 523.
- Rule level: 12.
- Rule description: Agent buffer is flooded. Check the agent configuration.
- Buffer status: Flooded.

.. warning::
  Note that alert description warns the user to check the agent considering that it is probable that it will not recover the normal status by itself.
  Remember that **a flooded agent is surely dropping events**.

Returning to normal status
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The right area of the graphic shows how the buffer usage returns to a normal status after a limit situation. It can happen because of a few reasons like the modules stop generating events,
or the module which is flooding the whole agent is shut down manually.

In order to let manager know when an agent is working properly again, it has been set another alert which it is triggered when the buffer usage decreases under
``normal level`` (70 % by default) coming from any higher level. The alert triggered is like the following example:

.. code-block:: console

  ** Alert 1501604257.60486: - wazuh,agent_flooding,
  2017 Aug 01 18:17:37 (fedora) any->ossec-agent
  Rule: 524 (level 3) -> 'Agent buffer is back to normal load.'
  wazuh: Agent buffer: 'normal'.

This alert is completely informative, so it contains the following information:

- Rule ID: 524.
- Rule level: 3.
- Rule description: Agent buffer is back to normal load.
- Buffer status: Normal.

Therefore, when the bucket is in this status **no events are dropped**.

Anti-flooding in agent modules
------------------------------

Ir order to avoid the agent buffer collapse followed by the loss of event, it has been limitated the throughput of daemons that could cause this collapse.

- Logcollector: It has been prevented that a log file is written faster that logcollector can read it, which could cause some troubles to the agent. For this reason, it is limited the maximum number of lines of the same file read per cycle.

- OpenSCAP Wodle: This module used to send the whole scan data once it finished its work. Now it send the scan information to the manager with a regulated speed.

These are advanced configuration located at :doc:`Internal configuration <../../reference/internal-options>`. Particularly, the variables defined for this purpose are called ``logcollector.max_lines`` and
``wazuh_modules.max_eps``. It is recommended take care with them.
