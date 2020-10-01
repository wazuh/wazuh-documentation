.. Copyright (C) 2020 Wazuh, Inc.

.. _installation_guide:

.. meta::
  :description: Wazuh is a free, open source and enterprise-ready security monitoring solution for threat detection, integrity monitoring, incident response and compliance.


Wazuh installation guide
========================

This section aims to guide the user through the process of installing Wazuh and its multiple components. A brief explanation about each component and its capabilities can be found in the :ref:`getting started <components>` section. 

Install Wazuh with Open Distro for Elasticsearch
------------------------------------------------

There are three different alternatives to deploy a Wazuh installation. Here is a brief explanation about each method:

- **All in one**: Wazuh with Open Distro for Elasticsearch or Elastic Stack are installed in the same host, this type of deployment is suitable for testing and small working environments.

- **Distributed**: Each component is installed in a separate host as a single-node or multi-node cluster. This type of deployment allows the high availability and scalability of the product and is suitable for large working environments.

- **Wazuh Cloud**: All components are hosted in our PCI-DSS certified SaaS solution and maintained by our team. With Wazuh cloud no dedicated hardware is required and everything is ready to use. This service offers a flexible infrastructure to match your enterprise's need. For more information visit `Wazuh Cloud <https://wazuh.com/cloud/>`_.

.. raw:: html

  <div class="deployment-types">
    <div class="item-deployment" id="aio">
      <h3>All in one deployment</h3>

.. thumbnail:: ../images/installation/all_in_one.png
      :align: center 
      :class: detailed   

.. image:: ../images/installation/all_in_one_no_title.png
      :align: center   
      :class: front

.. raw:: html

    </div>
    <div class="item-deployment" id="distributed">
      <h3>Distributed deployment</h3>    

.. thumbnail:: ../images/installation/distributed.png
      :align: center 
      :class: detailed   

.. image:: ../images/installation/distributed_no_title.png
      :align: center   
      :class: front

.. raw:: html

    </div>
    <div class="item-deployment" id="cloud">
      <h3>Wazuh cloud</h3>    

.. thumbnail:: ../images/installation/cloud.png
      :align: center 
      :class: detailed   

.. image:: ../images/installation/cloud_no_title.png
      :align: center   
      :class: front

.. raw:: html

    </div>        
  </div>


Take Wazuh for a test drive with our ready to use :ref:`OVA <virtual_machine>`.

This installation guide will show how to install Wazuh manager along with Open Distro for Elasticsearch, Filebeat-OSS, and Open Distro for Elasticsearch Kibana. Alternativaly, Wazuh can be installed with the Elastic Stack components. To learn more about this process and other installation alternatives, visit the :ref:`alternative installation methods <other_installation_alternatives>` section.

Install Wazuh agents
--------------------

.. raw:: html

  <div class="agent-os">
      <div class="item-agent">
          <a href="./wazuh-agent/wazuh_agent_package_linux.html" class="d-flex align-items-center">
            <p>Linux</p>

.. image:: ../images/installation/linux.png        
      :align: center

.. raw:: html

        </a>
    </div>
    <div class="item-agent">
        <a href="./wazuh-agent/wazuh_agent_package_windows.html" class="d-flex align-items-center">
                    <p>Windows</p>

.. image:: ../images/installation/windows_icon.png        
      :align: center

.. raw:: html

        </a>
    </div>
    <div class="item-agent">
        <a href="./wazuh-agent/wazuh_agent_package_macos.html" class="d-flex align-items-center">
            <p>macOS</p>        

.. image:: ../images/installation/macOS.png        
      :align: center

.. raw:: html

        </a>
    </div>
    <div class="item-agent">
        <a href="./wazuh-agent/wazuh_agent_package_aix.html" class="d-flex align-items-center">
            <p>AIX</p>        

.. image:: ../images/installation/AIX.png        
      :align: center

.. raw:: html

        </a>
    </div>
    <div class="item-agent">
        <a href="./wazuh-agent/wazuh_agent_package_hpux.html" class="d-flex align-items-center">
            <p>HP-UX</p>        

.. image:: ../images/installation/hpux.png        
      :align: center

.. raw:: html

        </a>
    </div>
    <div class="item-agent">
        <a href="./wazuh-agent/wazuh_agent_package_solaris.html" class="d-flex align-items-center">
            <p>Solaris</p>        

.. image:: ../images/installation/solaris.png        
      :align: center

.. raw:: html

          </a>
      </div>
  </div>



Requirements
------------

The requirements section specifies the supported operating systems as well as the minimum recommended hardware specifications to guarantee the expected performance. Furthermore, information about the expected alerts per second depending on the different types of monitored endpoint can be found, allowing users to calculate the expected data storage needed for their environments.  

Packages list
-------------

The installation can be done by configuring the official repositories or by downloading and installing the packages directly.  A list of all the available packages can be found in the packages list section.

.. toctree::
    :maxdepth: 1

    requirements
    open-distro/index
    wazuh-agent/index
    packages-list
    other-installation-alternatives/index

   

 



