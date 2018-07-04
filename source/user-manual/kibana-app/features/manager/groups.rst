.. Copyright (C) 2018 Wazuh, Inc.

.. _manager_groups_section:

Groups
======

The Groups tab provides information about the current groups defined on the manager. You can list all the different groups, and select one to open more detailed information about it.

.. thumbnail:: ../../../../images/kibana-app/manager/manager-groups.png
  :align: center
  :width: 100%

Group agents
------------

When you click on a group, you'll see a list of all the agents belonging to this group. In each tab entry, you can find the agent's current Wazuh version, OS version, name and IP.

.. thumbnail:: ../../../../images/kibana-app/manager/manager-groups-agents.png
  :align: center
  :width: 100%

Group content
-------------

You can access to the list of group files if you click on the *Content* link on the top of the Groups tab, inside the *Details* card. This section will list all the available files stored on the ``/var/ossec/etc/shared/<GROUP>`` folder.

.. thumbnail:: ../../../../images/kibana-app/manager/manager-groups-content.png
  :align: center
  :width: 100%

Clicking on a file will open the JSON viewer to see the full file contents.

.. thumbnail:: ../../../../images/kibana-app/manager/manager-groups-content-raw.png
  :align: center
  :width: 100%

More information
----------------

https://documentation.wazuh.com/current/user-manual/reference/centralized-configuration.html?highlight=groups