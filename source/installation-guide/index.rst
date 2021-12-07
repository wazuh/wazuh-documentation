.. Copyright (C) 2021 Wazuh, Inc.

.. meta::
  :description: Visit the Wazuh installation guide and learn more about the deployment process, available installation alternatives, and requirements.
  
.. _installation_guide:

Installation guide
==================

**Version 1.0**

This section is a guide for installing Wazuh, a security monitoring solution for threat detection, integrity monitoring, incident response, and regulatory compliance. Below you can find the instructions for installing the Wazuh central components and the Wazuh agent, a single and lightweight monitoring software.

The purpose of this guide is that you can easily install each of the central components and all the needed agents as an all-in-one deployment or on different servers as a distributed deployment depending on your environment needs.

Check the :ref:`Getting started <getting_started>` section to learn more about the Wazuh solution, its components, architecture, and capabilities. Alternatively, you can check our :ref:`Wazuh quickstart <quickstart>` to learn how to install all the central components on the same host using the unattended installation script. You can install and configure the Wazuh in just a few minutes with the Wazuh quickstart.


Installing the Wazuh central components
---------------------------------------

Central components of Wazuh include the Wazuh server, Elasticsearch, and Kibana. Follow this installation workflow to install Wazuh:


.. thumbnail:: ../images/installation/Wazuh-Installation-workflow.png
  :title: Wazuh installation workflow
  :align: center
  :width: 100%


#. :ref:`Elasticsearch <wazuh_indexer_installation>` is a highly scalable, full-text search and analytics engine. During the installation of Elasticsearch, the Wazuh certificates tool is used to create certificates needed for encrypting the communication between the components. These certificates must be distributed to all the servers in the Wazuh installation and random passwords are also generated for the system users.

#. :ref:`Wazuh server <wazuh_server_installation>` is in charge of analyzing the data received from the Wazuh agents and triggering alerts when threats or anomalies are detected. It is also used to manage the agents' configuration and monitor their status remotely. This component includes the Wazuh manager and Filebeat. 

#. :ref:`Kibana <wazuh_dashboard_installation>` is a flexible and intuitive web interface for mining, analyzing, and visualizing data. It includes out-of-the-box dashboards for security events, detected vulnerable applications, file integrity monitoring data, configuration assessment results, and cloud infrastructure monitoring events. Kibana also helps organizations with regulatory compliance such as PCI DSS, GDPR, CIS, HIPAA, and NIST 800-53 standards.

The Wazuh server and Elasticsearch can be installed as a single-node or multi-node cluster depending on the environment needs. Small Wazuh deployments, which do not require processing large amounts of data, can easily be handled by a single-node cluster. Multi-node clusters are recommended when there are many monitored endpoints, when a large volume of data is anticipated, or when high availability is required.

The diagram below represents a Wazuh deployment architecture. It shows the solution components and how the Wazuh servers and Elasticsearch can be configured as a cluster, providing load balancing and high-availability.

.. thumbnail:: ../images/installation/distributed.png
    :alt: Wazuh deployment
    :align: center
    :wrap_image: No

Installation alternatives: Wazuh can also be installed with commercial options like Elastic Stack basic license or Splunk. To learn more about these options and other installation alternatives, see the :ref:`More installation alternatives <more_installation_alternatives>` section.

.. note:: Wazuh also offers the `Wazuh Cloud <https://wazuh.com/cloud/>`_, where all components are maintained by our team and hosted on our PCI-DSS, and SOC 2 Type 2 certified SaaS solution. This service offers a highly flexible infrastructure to match your enterprise needs. With Wazuh cloud, everything is ready to use, and you don't need any dedicated hardware.


Wazuh agent installation
------------------------

The :ref:`Wazuh agent <wazuh_agent>` is a single and lightweight monitoring software that runs on most operating systems. It provides visibility of the endpoints by collecting critical system and application records, inventory data, and detecting potential anomalies. If the Wazuh central components are already installed in your environment, select your operating system and follow the installation steps to deploy the agent to the endpoints. 

.. raw:: html

  <div class="agent-os">
      <div class="item-agent">
          <a href="./wazuh-agent/wazuh-agent-package-linux.html" class="d-flex align-items-center">
            <p>Linux</p>

.. image:: ../images/installation/linux.png
      :align: center

.. raw:: html

        </a>
    </div>
    <div class="item-agent">
        <a href="./wazuh-agent/wazuh-agent-package-windows.html" class="d-flex align-items-center">
                    <p>Windows</p>

.. image:: ../images/installation/windows_icon.png
      :align: center

.. raw:: html

        </a>
    </div>
    <div class="item-agent">
        <a href="./wazuh-agent/wazuh-agent-package-macos.html" class="d-flex align-items-center">
            <p>macOS</p>

.. image:: ../images/installation/macOS_logo.png
      :align: center

.. raw:: html

        </a>
    </div>
    <div class="item-agent" id="solaris-logo">
        <a href="./wazuh-agent/wazuh-agent-package-solaris.html" class="d-flex align-items-center">
            <p>Solaris</p>

.. image:: ../images/installation/solaris.png
      :align: center      

.. raw:: html

        </a>
    </div>
    <div class="item-agent">
        <a href="./wazuh-agent/wazuh-agent-package-aix.html" class="d-flex align-items-center">
            <p>AIX</p>

.. image:: ../images/installation/AIX.png
      :align: center

.. raw:: html

        </a>
    </div>
    <div class="item-agent">
        <a href="./wazuh-agent/wazuh-agent-package-hpux.html" class="d-flex align-items-center">
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

    elasticsearch/index
    wazuh-server/index
    kibana/index
    wazuh-agent/index
    packages-list
