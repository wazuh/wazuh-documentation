.. Copyright (C) 2020 Wazuh, Inc.

.. _installation_guide:

.. meta::
  :description: Wazuh is a free, open source and enterprise-ready security monitoring solution for threat detection, integrity monitoring, incident response and compliance.


Installation guide
==================

This section aims to guide the user through the process of installing Wazuh and its multiple components. A brief explanation about each component and its capabilities can be found in the :ref:`getting started <components>` section.

Install Wazuh server
--------------------

There are two different alternatives to deploy a Wazuh installation. Here is a brief explanation about each deployment type:

- All-in-one: All the Wazuh components are installed in the same host, this type of deployment is suitable for testing and small working environments. If you want to test Wazuh, you can download our ready to use :ref:`OVA <virtual_machine>`.

- Distributed: Each component is installed in a separate host as a single-node or multi-node cluster. This type of deployment allows the high availability and scalability of the product and is suitable for large working environments.

.. raw:: html

  <div class="deployment-types">
    <div class="item-deployment" id="aio">
      <h3>All-in-one deployment</h3>

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
  </div>





.. note:: Wazuh also offers the `Wazuh Cloud <https://wazuh.com/cloud/>`_, where all components are hosted in our PCI-DSS certified SaaS solution and maintained by our team. With Wazuh cloud no dedicated hardware is required and everything is ready to use. This service offers a flexible infrastructure to match your enterprise needs.

This installation guide will teach you how to install all Wazuh components: the Wazuh agent, the Wazuh manager and Elastic Stack. In the Quickstart section, instructions on how to install Wazuh in an all-in-one deployment using an automated script can be found. The sections Wazuh server and Elastic Stack include detailed instructions to make the corresponding installations in a distributed deployment.    

Alternatively, Wazuh can be installed with commercial options like Elastic Stack basic license or Splunk. To learn more about these options and other installation alternatives, visit the :ref:`more installation alternatives <more_installation_alternatives>` section. 


Install Wazuh agents
--------------------

The Wazuh Agent is a single, light-weight monitoring software that can be installed in the majority of Operating Systems providing visibility on the security of that endpoint by collecting critical system and application logs, inventory data and detecting possible anomalies. To install a Wazuh agent select your operating system and follow the installation steps:

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

.. image:: ../images/installation/macOS_logo.png
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
    <div class="item-agent" id="solaris-logo">
        <a href="./wazuh-agent/wazuh_agent_package_solaris.html" class="d-flex align-items-center">
            <p>Solaris</p>

.. image:: ../images/installation/solaris.png
      :align: center

.. raw:: html

          </a>
      </div>
  </div>




.. toctree::
    :hidden:
    :maxdepth: 1

    open-distro/quickstart
    open-distro/elasticsearch-multi-node-cluster
    open-distro/wazuh-multi-node-cluster
    open-distro/kibana
    wazuh-agent/index
    packages-list
    more-installation-alternatives/index







