.. Copyright (C) 2022 Wazuh, Inc.

.. meta::
  :description: Find out more about Wazuh server administration and its configurations in this section of our documentation. 
  
.. _elasticsearch:

Elasticsearch
=============

The Wazuh manager is the system that analyzes the data received from all registered agents and triggers alerts when an event coincides with a rule, for example: intrusion detected, file modified, configuration not in accordance with the policy, possible rootkit, among others. The manager also works as an agent on the local machine, which means that it has all the features that an agent has. In addition, the manager can forward the alerts that it triggers through syslog, emails or integrated external APIs.



    .. toctree::
        :maxdepth: 2

        elastic-tuning
        troubleshooting
        configure-indices
        elasticsearch