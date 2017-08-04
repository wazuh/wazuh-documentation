.. _release_2_1:

2.1 Release Notes
=================

This section shows the most relevant new features of Wazuh v2.1.0. In our changelog file
it is available more detailed information about all changes for this version.

**New features:**

- `Anti-flooding mechanism`_
- `Labels for agent alerts`_
- `Improved Authd performance`_
- `New features for internal logs`_
- `Updated external libraries`_

Anti-flooding mechanism
-----------------------

This mechanism is designed in light of the necessity of guarantee that a bad configuration of an agent could not cause any repercussion in the network or the manager. It consists in an leaky bucket
that collects all the generated events, sending them to the manager regularly.

Learn more about this new mechanism at :doc:`Anti-flooding mechanism <../user-manual/capabilities/internal-capabilities/antiflooding>`.

Labels for agent alerts
-----------------------

This feature permits include exclusive information of each agent to the alerts related with that agent. For example, this extra information would be useful to include in alerts
who is in charge of a particular agent, or the installation date of that agent. That way, it is a simple method to add value to the alerts information.

For knowing more details about this new feature see our :doc:`Labels section <../user-manual/capabilities/internal-capabilities/labels>`.

Improved Authd performance
--------------------------

The Authd program has been improved for this version. Before Wazuh 2.1.0, the Wazuh API and ``manage_agents`` tool could not register an agent when ``ossec-authd`` was running.
This issue has been solved for this version adding the possibility of register agents simultaneously with these tools.

Additionally, since this version :doc:`ossec-authd <../user-manual/reference/daemons/ossec-authd>` runs in background, it can be enabled using the command ``ossec-control enable auth``. Moreover, its options
can be configured in :doc:`auth section <../user-manual/reference/ossec-conf/auth>` of ``ossec.conf``, where it is shown an example of configuration.

Finally, option ``-F<time>`` of ``ossec-authd`` allows to remove old agent with the same name that the new one.

New features for internal logs
------------------------------

It is widely known that JSON is one of the most popular log format, that is why since this version internal logs can be written in JSON format. For these logs, it exists
the possibility of enable JSON output, plain text output, or both, configuring this option in the :doc:`logging section <../user-manual/reference/ossec-conf/logging>` of ``ossec.conf``.

In addition, internal logs are rotated and compressed every day making easier their management as well as they are removed 31 days after their rotation freeing occupied memory.
These parameters are configurable in section ``monitord`` of :doc:`Internal configuration <../user-manual/reference/internal-options>`.

Updated external libraries
--------------------------

It has been updated every external libraries included in Wazuh with the aim of improve their integration with our components.
