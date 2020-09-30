.. Copyright (C) 2020 Wazuh, Inc.

.. _installation_guide:

.. meta::
  :description: Wazuh is a free, open source and enterprise-ready security monitoring solution for threat detection, integrity monitoring, incident response and compliance.


Wazuh installation guide
========================

This section aims to guide the user through the process of installing Wazuh and its multiple components. A brief explanation about each component and its capabilities can be found in the :ref:`getting started <components>` section. 

Install Wazuh with Open Distro for Elasticsearch
------------------------------------------------

.. raw:: html

  <div class="deployment-types">
    <div class="item-deployment" id="aio">

.. thumbnail:: ../images/installation/all_in_one.png
      :align: center 
      :class: detailed   

.. image:: ../images/installation/all_in_one_a.png
      :align: center   
      :class: front

.. raw:: html

    </div>
    <div class="item-deployment" id="distributed">

.. thumbnail:: ../images/installation/distributed.png
      :align: center 
      :class: detailed   

.. image:: ../images/installation/distributed_a.png
      :align: center   
      :class: front

.. raw:: html

    </div>
    <div class="item-deployment" id="cloud">

.. thumbnail:: ../images/installation/cloud.png
      :align: center 
      :class: detailed   

.. image:: ../images/installation/cloud_a.png
      :align: center   
      :class: front

.. raw:: html

    </div>        
  </div>


Take Wazuh for a test drive with our ready to use :ref:`OVA <virtual_machine>`.

This installation guide will show how to install Wazuh manager along with Open Distro for Elasticsearch, Filebeat-OSS, and Open Distro for Elasticsearch Kibana. Alternativaly, Wazuh can be installed with the Elastic Stack components. To learn more about this process and other installation alternatives, visit the :ref:`alternative installation methods <other_installation_alternatives>` section.

Install Wazuh agents
--------------------




Requirements
------------

The requirements section specifies the supported operating systems as well as the minimum recommended hardware specifications to guarantee the expected performance. Furthermore, information about the expected alerts per second depending on the different types of monitored endpoint can be found, allowing users to calculate the expected data storage needed for their environments.  

Packages list
-------------

The installation can be done by configuring the official repositories or by downloading and installing the packages packages directly.  A list of all the available packages can be found in the packages list section.

.. toctree::
    :maxdepth: 1

    requirements
    open-distro/index
    wazuh-agent/index
    packages-list
    other-installation-alternatives/index

   

 



