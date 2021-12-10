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


Wazuh central components
^^^^^^^^^^^^^^^^^^^^^^^^

==============================================================    =============
Component                                                         Description
==============================================================    =============
:ref:`Elasticsearch <wazuh_indexer_installation>`                 It is a highly scalable, full-text search and analytics engine. During the installation of Elasticsearch, the Wazuh certificates tool is used to create certificates needed for encrypting the communication between the components. These certificates must be distributed to all the servers in the Wazuh installation and random passwords are also generated for the system users. 

:ref:`Wazuh server <wazuh_server_installation>`                   It is in charge of analyzing the data received from the Wazuh agents and triggering alerts when threats or anomalies are detected. It is also used to manage the agents' configuration and monitor their status remotely. This component includes the Wazuh manager and Filebeat. 

:ref:`Kibana <wazuh_dashboard_installation>`                      It is a flexible and intuitive web interface for mining, analyzing, and visualizing data. It includes out-of-the-box dashboards for security events, detected vulnerable applications, file integrity monitoring data, configuration assessment results, and cloud infrastructure monitoring events. Kibana also helps organizations with regulatory compliance such as PCI DSS, GDPR, CIS, HIPAA, and NIST 800-53 standards.
==============================================================    =============

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

==============================================================================================================================    =============
Operating systems                                                                                                                 Description
==============================================================================================================================    =============
`Linux  <https://documentation.wazuh.com/current/installation-guide/wazuh-agent/wazuh-agent-package-linux.html>`_                 The deployment of a Wazuh agent on a Linux system uses deployment variables that facilitate installing, registering, and configuring the agent.
`Windows <https://documentation.wazuh.com/current/installation-guide/wazuh-agent/wazuh-agent-package-windows.html>`_              You can monitor your Windows systems with Wazuh, from Windows XP to the latest versions, including Windows 11 and Windows Server 2022.
`macOS <https://documentation.wazuh.com/current/installation-guide/wazuh-agent/wazuh-agent-package-macos.html>`_                  Wazuh allows you to monitor your macOS systems and our package is suitable for macOS Sierra or later.
`Solaris <https://documentation.wazuh.com/current/installation-guide/wazuh-agent/wazuh-agent-package-solaris.html>`_              You can monitor your Solaris systems with Wazuh. To start the installation process, all you need to do is select your architecture between i386 or Sparc. 
`AIX <https://documentation.wazuh.com/current/installation-guide/wazuh-agent/wazuh-agent-package-aix.html>`_                      The deployment of a Wazuh agent on an AIX system uses variables that facilitate installing, registering, and configuring the agent.
`HP-UX <https://documentation.wazuh.com/current/installation-guide/wazuh-agent/wazuh-agent-package-hpux.html>`_                   You can monitor your HP-UX systems with Wazuh.  Wazuh allows you to monitor your HP-UX systems with Wazuh. You only need to start the installation process by downloading the `HP-UX installer <https://packages.wazuh.com/|CURRENT_MAJOR|/hp-ux/wazuh-agent-|WAZUH_LATEST|-|WAZUH_REVISION_HPUX|-hpux-11v3-ia64.tar>`_. 
==============================================================================================================================    =============


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


Installation guide FAQ
----------------------

How do I install Wazuh?
^^^^^^^^^^^^^^^^^^^^^^^

Install Wazuh by following the installation methods listed below that best suit your needs. Check the :ref:`Components <components>` section to learn more about each component and its capabilities.


**Installing Wazuh server**

You can choose an installation method and start installing the Wazuh server:

- :ref:`Unattended installation <wazuh_server_unattended>`: Install this component using a script that automates the installation process.  
- :ref:`Step-by-step installation <wazuh_server_step_by_step>`: Install this component manually following detailed step-by-step instructions.


**Installing Elasticsearch**

You can choose an installation method and start installing Elasticsearch: 

- :ref:`Unattended installation <wazuh_indexer_unattended>`: Install this component using a script that automates the installation process. 
- :ref:`Step-by-step installation <wazuh_indexer_step_by_step>`: Install this component manually following detailed step-by-step instructions.


**Installing Kibana**

You can choose an installation method and start installing Kibana: 

- :ref:`Unattended installation <wazuh_dashboard_unattended_installation>`: Install this component using a script that automates the installation process. 
- :ref:`Step-by-step installation <wazuh_dashboard_step_by_step>`: Install this component manually following detailed step-by-step instructions.


**Installing Wazuh agent**

To install a Wazuh agent, select your operating system from the list above and follow the instructions.



How do I install Wazuh agents on Windows?
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Monitor your Windows systems with Wazuh, from Windows XP to the latest available versions, including Windows 11 and Windows Server 2022:

- To start the installation process, download the `Windows installer <https://packages.wazuh.com/|CURRENT_MAJOR|/windows/wazuh-agent-|WAZUH_LATEST|-|WAZUH_REVISION_WINDOWS|.msi>`_.
- Administrator privileges are required to perform the installation.
- Select the installation method you want to follow: command line interface (CLI) or graphical user interface (GUI).
- By default, all agent files are stored in ``C:\Program Files (x86)\ossec-agent`` after the installation.
- Read the :ref:`Installing Wazuh agents on Windows systems <wazuh_agent_package_windows>` section for more information.  



How do I register Wazuh agents?
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Open a terminal in the Linux/Unix Wazuh agent's host as a ``root`` user:

- Run the ``agent-auth`` utility, using the Wazuh manager’s IP address to register the Wazuh agent.
- To enable communication with the Wazuh manager, edit the Wazuh agent’s configuration file placed at ``/var/ossec/etc/ossec.conf``.
- Restart the Wazuh agent.
- Read the :ref:`Registering Wazuh agents <register_agents>` section for more information.  



.. toctree::
    :hidden:
    :maxdepth: 1

    elasticsearch/index
    wazuh-server/index
    kibana/index
    wazuh-agent/index
    packages-list
