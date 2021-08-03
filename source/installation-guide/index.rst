.. Copyright (C) 2021 Wazuh, Inc.

.. _installation_guide:

.. meta::
  :description: Wazuh is a free, open source, and enterprise-ready security monitoring solution for threat detection, integrity monitoring, incident response, and regulatory compliance.


Installation guide
==================

Wazuh is a free, open source, and enterprise-ready security monitoring solution for threat detection, integrity monitoring, incident response, and regulatory compliance. To learn more about the Wazuh solution, its components, architecture, and capabilities, check the :ref:`Getting started <getting_started>` section. 

The :ref:`Wazuh central components <central_components>` include the :ref:`Wazuh server <wazuh_server_installation>`, :ref:`the Wazuh indexer <wazuh_indexer_installation>`, and the :ref:`Wazuh dashboard <wazuh_dashboard_installation>`. You can install each component manually by following detailed step-by-step instructions or in an unattended mode by using a script. 

Deployment types
----------------

There are two different options for deploying Wazuh:

- All-in-one: Install the Wazuh server, the Wazuh indexer, and the Wazuh dashboard on the same host. With this deployment option, you can install Wazuh directly on your system or download our ready-to-use :ref:`OVA <virtual_machine>`.

- Distributed: Each component is installed on a separate host as a single-node or multi-node cluster. This type of deployment provides high availability and scalability of the product, and it is convenient for large working environments.



.. raw:: html

  <div class="deployment-types">
    <div class="item-deployment" id="aio">
      <h3>All-in-one deployment</h3>

.. thumbnail:: ../images/installation/all_in_one.png
      :title: Wazuh all-in-one installation
      :align: center
      :class: detailed

.. image:: ../images/installation/all_in_one.png
      :align: center
      :class: front

.. raw:: html

    </div>
    <div class="item-deployment" id="distributed">
      <h3>Distributed deployment</h3>

.. thumbnail:: ../images/installation/distributed.png
      :title: Wazuh distributed installation
      :align: center
      :class: detailed

.. image:: ../images/installation/distributed.png
      :align: center
      :class: front

.. raw:: html

    </div>
  </div>


Installing the Wazuh central components
---------------------------------------

You can install all the Wazuh central components on the same server, as an all-in-one deployment, or on different servers as a distributed deployment. 

Moreover, the Wazuh server and the Wazuh indexer can each be installed as a single-node or multi-node cluster. Small Wazuh deployments, which do not require processing large amounts of data, can easily be handled by a single-node cluster. Multi-node clusters are recommended when there is a large number of monitored endpoints, when a large volume of data is anticipated, or when high availability is required.

The diagram below represents a Wazuh deployment architecture. It shows the solution components and how the Wazuh servers and Wazuh indexer can be configured as a cluster, providing load balancing and high-availability.

.. thumbnail:: ../images/getting_started/deployment.png
    :alt: Wazuh deployment
    :align: center
    :wrap_image: No



Alternatively, Wazuh can also be installed with commercial options like Elastic Stack basic license or Splunk. To learn more about these options and other installation alternatives, see the :ref:`More installation alternatives <more_installation_alternatives>` section.

.. note:: Wazuh also offers the `Wazuh Cloud <https://wazuh.com/cloud/>`_, where all components are hosted on our PCI-DSS and SOC 2 Type 2 certified SaaS solution, which is maintained by our team. With the Wazuh cloud, no dedicated hardware is required and everything is ready to use. This service offers a highly flexible infrastructure to match your enterprise needs.


Wazuh agent installation
------------------------

The :ref:`Wazuh agent <wazuh_agent>` is a single, light-weight monitoring software that runs on most operating systems and provides visibility into the endpoint's security by collecting critical system and application records, inventory data, and detecting potential anomalies. If the Wazuh central components are already installed on your environment, select your operating system and follow the installation steps to deploy the agent to the endpoints. 

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
  <div class="item-agent" id="solaris-logo">
      <a href="./wazuh-agent/wazuh_agent_package_solaris.html" class="d-flex align-items-center">
          <p>Solaris</p>

.. image:: ../images/installation/solaris.png
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
  </div>


.. toctree::
    :hidden:
    :maxdepth: 1

    central-components/index
    wazuh-agent/index
    packages-list

