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

  <div class="item-deployment" id="aio">
    <div class="image-container">

.. thumbnail:: ../images/installation/all_in_one_icon.png
      :align: center        

.. raw:: html  

  </div>
  <a href="./open-distro/all-in-one-deployment/index.html" >
    <div class="deployment-text">
      <h2>All in one deployment</h2>
      <p>Wazuh with Open Distro for Elasticsearch or Elastic Stack are installed in the same host, this type of deployment is suitable for testing and small working environments.</p>
    </div></a>
  </div>

  <div class="item-deployment" id="distributed">
    <div class="image-container">

.. thumbnail:: ../images/installation/distributed_icon.png
      :align: center       

.. raw:: html

  </div>
  <a href="./open-distro/distributed-deployment/index.html">
    <div class="deployment-text">
      <h2>Distributed deployment</h2>
      <p>Each component is installed in a separate host as a single-node or multi-node cluster. This type of deployment allows the high availability and scalability of the product and is suitable for large working environments.</p>
    </div></a>
  </div>

  <div class="item-deployment" id="cloud">
    <div class="image-container">

.. thumbnail:: ../images/installation/cloud_icon.png
      :align: center       

.. raw:: html

  </div>
  <a href="https://wazuh.com/cloud/">
    <div class="deployment-text">
      <h2>Wazuh cloud</h2>
      <p>All components are hosted in our PCI-DSS certified SaaS solution and maintained by our team. With Wazuh cloud no dedicated hardware is required and everything is ready to use. This service offers a flexible infrastructure to match your enterprise's need.</p>
    </div></a>
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

   

 



