.. Copyright (C) 2021 Wazuh, Inc.

.. _wazuh_server_installation:

.. meta::
  :description: Wazuh is a free, open source and enterprise-ready security monitoring solution for threat detection, integrity monitoring, incident response and compliance.


Wazuh server
============

The Wazuh server is in charge of analyzing the data received from the Wazuh agents, triggering alerts when threats or anomalies are detected. It is also used to manage the agents configuration remotely and to monitor their status. 

Choose between two installation methods:

- :ref:`Unattended <wazuh_server_unattended>`: You can install Wazuh server by using scripts that automate the installation process.  

- :ref:`Step by step <wazuh_server_step_by_step>`: This is a manual way of carrying out the installation that includes a detailed description of each step of the process.

.. toctree::
    :hidden:
    :maxdepth: 1

    Unattended <unattended>
    Step-by-step <step-by-step>
