.. Copyright (C) 2018 Wazuh, Inc.

.. _manager_status_section:

Status
======

The Status tab provides a quick look at your manager daemons, basic installation information and the last registered agent.

.. thumbnail:: ../../../../images/kibana-app/manager/manager-status-1.png
    :title: manager-status-1
    :align: center
    :width: 100%

Daemons statuses and metrics
----------------------------

The boxes with the daemons show you their statuses (running or not running). Some daemons usually could be not running due 
to configuration such the cluster daemon. Also you see some useful metrics about your agents such total number of agents or agents coverage.

.. thumbnail:: ../../../../images/kibana-app/manager/manager-status-2.png
    :title: manager-status-2
    :align: center
    :width: 100%


Manager and last registered agent
---------------------------------

Left box shows you information about the Wazuh manager currently installed. The right box shows you useful information about your
last registered agent. The last registered box will change whenever you register a new agent. The manager box will change once you upgrade the 
Wazuh manager.

.. thumbnail:: ../../../../images/kibana-app/manager/manager-status-3.png
    :title: manager-status-3
    :align: center
    :width: 100%