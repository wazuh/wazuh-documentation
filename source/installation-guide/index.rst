.. Copyright (C) 2020 Wazuh, Inc.

.. _installation_guide:

.. meta::
  :description: Wazuh is a free, open source and enterprise-ready security monitoring solution for threat detection, integrity monitoring, incident response and compliance.


Wazuh installation guide
========================

This section aims to guide the user through the process of installing Wazuh and its multiple components. A brief explanation about each component and its capabilities can be found in the :ref:`getting started <components>` section. 

The following diagram illustrates a typical installation: 

.. thumbnail:: ../images/installation/Setup.png
  :align: center
  :width: 100%


The following sections will focus on the installation of the Wazuh components on the server side, the instructions on how to install the Wazuh agents can be found :ref:`here <installation_agents>`.

This installation guide will show how to install Wazuh manager along with Open Distro for Elasticsearch, Filebeat-OSS, and Open Distro for Elasticsearch Kibana. Alternativaly Wazuh can be installed with the Elastic Stack components. To learn more about this process and other installation alternatives, visit the :ref:`alternative installation methods <other_installation_alternatives>` section.

Deployment types
----------------

There are three different alternatives to deploy a Wazuh installation. Here is a bried explanation about each method:

- **All in one**: Wazuh with Open Distro for Elasticsearch or Elastic Stack are installed in the same host, this type of deployment is suitable for testing and small working environments.

- **Distributed**: Each component is installed in a separate host as a single-node or multi-node cluster. This type of deployment allows the high availability and scalability of the product and is suitable for large working environments.

- **Wazuh Cloud**: All components are hosted in our PCI-DSS certified SaaS solution and maintained by our team. With Wazuh cloud no dedicated hardware is required and everything is ready to use. This service offers a flexible infrastructure to match your enterprise's need. For more information visit `Wazuh Cloud <https://wazuh.com/cloud/>`_.

.. raw:: html

   <div class="screenshots" id="deployment-types">
      <div id="slider" class="carousel slide" data-ride="carousel">
        <div class="carousel-inner">
          <div class="carousel-item active">

.. thumbnail:: ../images/installation/all_in_one.png
  :title: All in one deployment
  :class: d-block w-100

.. raw:: html

          </div>

          <div class="carousel-item">

.. thumbnail:: ../images/installation/distributed.png
   :title: Distributed deployment
   :class: d-block w-100

.. raw:: html

          </div>

          <div class="carousel-item">

.. thumbnail:: ../images/installation/cloud.png
   :title: Cloud deployment
   :class: d-block w-100   

.. raw:: html

          </div>

          <a class="carousel-control-prev" href="#slider" role="button" data-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
          </a>
          <a class="carousel-control-next" href="#slider" role="button" data-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
          </a>

        </div>
      </div>

.. raw:: html

   </div>


Installation methods
---------------------

Once the desired configuration is selected the user can choose between two installation methods:

- Unattended installation: Using scripts developed by Wazuh to automatically install and configure all the components.

- Step-by-step installation: A manual way of doing the installation that includes a detailed explanation of every step of the installation process.


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

   

 



