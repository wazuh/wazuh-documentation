.. Copyright (C) 2019 Wazuh, Inc.

.. _faq_hardware:


Hardware size guidelines
========================

Use case #1: Monitoring 50-100 agents
-------------------------------------

 One node with Wazuh manager + ELK stack
 8 cores, 16GB RAM and a 128GB SSD hard-disk.

Use case #2: Monitoring 1000 agents
-----------------------------------

 In this use case, our recommendation is to use Wazuh as cluster. Two nodes should be enough for 1000 agents depending on the events per second the each agent sends.

Assuming this Wazuh cluster has two nodes, they will be node01 and node02.

 - node01
    - Wazuh manager
    - Elasticsearch + Kibana + Logstash
    - 8GB RAM, 4 CPU, 128GB SSD disk.

 - node02
    - Wazuh manager
    - Filebeat
    - 4GB RAM, 2CPU, 64GB disk

  - Agents x 1000
    - Using a load balancer as manager IP



The agents should use a load balancer, this way they will send events to different nodes each time. The agent hardware depends on how you will use them, other software will be used but the agent itself should not consume high resources, it's just a forwarder.
