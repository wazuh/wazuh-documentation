.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Learn more about how to prepare your Wazuh Lab environment by following the step-by-step guide in this section of our documentation. 
  
.. _build_lab:

Prepare your Wazuh Lab Environment
==================================

Follow this guide to set your Lab Environment. First, install the Wazuh central components: the Wazuh server, the Wazuh indexer, and the Wazuh dashboard. To learn more, see the :doc:`/getting-started/components/index` documentation. 

Then install a Wazuh agent on the endpoints to be monitored, a Linux and a Windows system. 

.. thumbnail:: ../../images/learning-wazuh/build-lab/vpc-diagram.png
    :title: VPC Diagram
    :align: center
    :width: 75%

.. topic:: Steps

  .. toctree::
      :maxdepth: 1

      install-wazuh-central-components 
      install-linux-agents
      install-windows-agent
