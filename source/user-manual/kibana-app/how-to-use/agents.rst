.. Copyright (C) 2018 Wazuh, Inc.

.. _agents:

Agents 
======

You are able to check your agents statuses from the Wazuh App. Once you click on the Agents tab you'll see a list of agents 
provided by the Wazuh API. It means you'll see the same information as requesting to the Wazuh API on a better format. 

Useful metrics
--------------

At the very top of the Agents list you'll see two boxes with relevant information about your agents. The left box 
tells you how many active agents, how many disconnected agents, how many never connected agents and the agents coverage. The right box 
tells you about the last registered agent and the agent with the highest activity.

.. thumbnail:: ../../../images/kibana-app/agents/agents-1.png
    :title: agents-1
    :align: center
    :width: 60%

.. thumbnail:: ../../../images/kibana-app/agents/agents-2.png
    :title: agents-2
    :align: center
    :width: 60%

Search bar
----------

Writing on the bar ables you to search specific agents whose match your search criteria. The list will be updated while 
you are writing.

.. thumbnail:: ../../../images/kibana-app/agents/agents-3.png
    :title: agents-4
    :align: center
    :width: 60%

Status selector
---------------

Since the Wazuh agents could be at different statuses we thought an useful search criteria is the status. The agents could be 
active, disconnected or never connected. Use the selector to filter them properly.

.. thumbnail:: ../../../images/kibana-app/agents/agents-4.png
    :title: agents-4
    :align: center
    :width: 20%

OS platform selector
--------------------

You also could have different operative systems along your Wazuh agents such Windows Vista, CentOS 7, Ubuntu 16.04, etc. 
You could use the OS platform selector to apply a filter by operative system.

.. thumbnail:: ../../../images/kibana-app/agents/agents-5.png
    :title: agents-5
    :align: center
    :width: 20%