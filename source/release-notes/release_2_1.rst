.. Copyright (C) 2019 Wazuh, Inc.

.. _release_2_1:

2.1 Release Notes
===================

This section shows the most relevant new features of Wazuh v2.1. You will find more detailed information in our `changelog <https://github.com/wazuh/wazuh/blob/2.1/CHANGELOG.md>`_ file.

**New features:**

- `Anti-flooding mechanism`_
- `Labels for agent alerts`_
- `Improved Authd performance`_
- `New features for internal logs`_
- `Updated external libraries`_
- `Wazuh API`_
- `Ruleset`_

Anti-flooding mechanism
-----------------------

The Anti-flooding mechanism is designed to prevent large bursts of events on an agent from negatively impacting the network or the manager. It uses a leaky bucket queue that collects all generated events and sends them to the manager at a rate below a specified events per second threshold.

Learn more about this new mechanism at :doc:`Anti-flooding mechanism <../user-manual/capabilities/antiflooding>`.

Labels for agent alerts
-----------------------

This feature allows agent-specific attributes to be included in each alert. These labels provide a simple way of adding valuable metadata to alert records and can include data points like who is in charge of a particular agent or the agent's installation date and .

For more details about this new feature see our :doc:`Labels section <../user-manual/capabilities/labels>`.

Improved Authd performance
--------------------------

The Authd program has been improved in this version such that the Wazuh API and the ``manage_agents`` tools can now register an agent while ``ossec-authd`` is running.

Additionally, :doc:`ossec-authd <../user-manual/reference/daemons/ossec-authd>` now runs in the background and can be enabled using the command ``ossec-control enable auth``. See the :doc:`auth section <../user-manual/reference/ossec-conf/auth>` of ``ossec.conf`` for configuration options and sample configuration.

Finally, the new ``force_insert`` and ``force_time`` options in Authd (``-F<time>`` from the ``ossec-authd`` command line) allow for the automatic deletion of agents that match the name or IP address of a new agent you are attempting to register.

New features for internal logs
------------------------------

As JSON is one of the most popular logging formats, we have made it possible in this new version to have internal logs written in JSON format, plain text or both.  This can be configured in the :doc:`logging section <../user-manual/reference/ossec-conf/logging>` of ``ossec.conf``.

In addition, we have simplified the management of internal logs such that they are rotated and compressed daily.  We have further made it possible to control the use of disk space by configuring a the length of time for between the rotated logs before they are automatically deleted.

These parameters are configured in the ``monitord`` section of :doc:`Internal configuration <../user-manual/reference/internal-options>`.

Updated external libraries
--------------------------

External libraries used by Wazuh have been updated to improve their integration with our components.

Wazuh API
---------

The request ``/agents`` now returns information about the OS and a specified list of agents can now be restarted or deleted.

Ruleset
--------

The previous Windows decoders extracted a wrong user (the subject user) but this has been corrected in this version and new fields have also been added.
