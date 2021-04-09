.. Copyright (C) 2021 Wazuh, Inc.

.. _installation_guide:

.. meta::
  :description: Wazuh is a free, open source and enterprise-ready security monitoring solution for threat detection, integrity monitoring, incident response and compliance.


Installation guide
==================

This section aims to guide the user through the process of installing Wazuh and its multiple components. A brief explanation about each component and its capabilities can be found in the :ref:`getting started <components>` section.

Install Wazuh server
--------------------

There are two different alternatives to deploy a Wazuh installation: 

- :ref:`All-in-one <all_in_one_index>`: All the Wazuh components are installed in the same host. This type of deployment is appropriate for testing and small working environments. If you want to test Wazuh, you can download our ready-to-use :ref:`OVA <virtual_machine>`.

- :ref:`Distributed <distributed_index>`: Each component is installed in a separate host as a single-node or multi-node cluster. This type of deployment allows high availability and scalability of the product and is convenient for large working environments.

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





.. note:: Wazuh also offers the `Wazuh Cloud <https://wazuh.com/cloud/>`_, where all components are hosted on our PCI-DSS certified SaaS solution and maintained by our team. With the Wazuh cloud, no dedicated hardware is required and everything is ready to use. This service offers a highly flexible infrastructure to match your enterprise needs.

This installation guide will teach you how to install all Wazuh components: the Wazuh agent, the Wazuh manager and Elastic Stack. Alternatively, Wazuh can be installed with commercial options like Elastic Stack basic license or Splunk. To learn more about these options and other installation alternatives, visit the :ref:`more installation alternatives <more_installation_alternatives>` section.


Install Wazuh agents
--------------------

The Wazuh Agent is a single, light-weight monitoring software that  that runs on most operating systems and provides visibility into the security of that endpoint by collecting critical system and application records, inventory data and detecting potential anomalies. To install a Wazuh agent, select your operating system and follow the installation steps:

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



Requirements
------------

The :ref:`requirements <installation_requirements>`  section specifies the supported operating systems as well as the minimum recommended hardware specifications to guarantee the expected performance. Furthermore, information about the expected alerts per second depending on the different types of monitored endpoints can be found, allowing users to calculate the expected data storage needed for their environments.

.. toctree::
    :hidden:
    :maxdepth: 1

    quickstart
    wazuh-components/index
    packages-list







