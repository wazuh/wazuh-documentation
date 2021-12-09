.. Copyright (C) 2021 Wazuh, Inc.

.. _quickstart:


.. meta::
  :description: Install and configure Wazuh, the open source security platform, in just a few minutes using the unattended installation script. 


Wazuh quickstart
================

**Version 3.0**

In this section of the documentation, you will learn how to install the Wazuh server, Elasticsearch, and Kibana on the same host using the unattended installation script. You will be able to install and configure the Wazuh in just a few minutes just by running the automated script.

These central components are in charge of analyzing the data gathered by the Wazuh agents, providing a search engine and data visualization tool that allow users to navigate through their security alerts.

Check the :ref:`Getting started <getting_started>` section to learn more about the Wazuh solution, its components, architecture, and capabilities. Alternatively, you can check our :ref:`Installation guide <installation_guide>` to learn how to install each component individually on the same server, as an all-in-one deployment, or on different servers as a distributed deployment depending on the environment needs.
 

.. _installation_requirements:

Requirements
------------
Below you can check the supported operating systems and the recommended hardware requirements for the Wazuh installation.

Supported operating systems
^^^^^^^^^^^^^^^^^^^^^^^^^^^

Wazuh can be installed on the 64-bit Linux operating system detailed in the list below:

.. list-table::
   :width: 50%
   
   * - Amazon Linux 2
   * - CentOS 7 and later
   * - Debian 8 ELTS and later
   * - Fedora Linux 33 and later
   * - openSUSE Tumbleweed, Leap 15.2 and later
   * - Oracle Linux 6 Extended and later
   * - Red Hat Enterprise Linux 6 ELS and later
   * - SUSE Linux enterprise server 11 LTSS and later
   * - Ubuntu 14.04 ESM and later



Hardware requirements
^^^^^^^^^^^^^^^^^^^^^

- **Memory and CPU**
  
  Minimum and recommended memory and CPU configurations:
  
  +-------------------------+-------------------------------+
  |        Minimum          |         Recommended           |
  +----------+--------------+--------------+----------------+
  |  RAM (GB)|  CPU (cores) |  RAM (GB)    |   CPU (cores)  |
  +==========+==============+==============+================+
  |     4    |     2        |     16       |       8        |
  +----------+--------------+--------------+----------------+

- **Disk space**

  The amount of data depends on the generated alerts per second (APS). This table details the estimated disk space needed per agent to store 90 days of alerts on a Wazuh server, depending on the type of monitored endpoints.

  +-------------------------------------------------+-----+---------------------------+
  | Monitored endpoints                             | APS | Storage                   |
  |                                                 |     |  (GB/90 days)             |
  +=================================================+=====+===========================+
  | Servers                                         | 0.25|           3.8             |
  +-------------------------------------------------+-----+---------------------------+
  | Workstations                                    | 0.1 |           1.5             |
  +-------------------------------------------------+-----+---------------------------+
  | Network devices                                 | 0.5 |           7.6             |
  +-------------------------------------------------+-----+---------------------------+

  For example, for an environment with 80 workstations, 10 servers, and 10 network devices, the storage needed for 90 days of alerts is 236 GB approximately. 
 

.. _unattended_all_in_one:

Installing Wazuh
----------------

#. Download and run the Wazuh unattended installation. 

   .. code-block:: console

     # curl -so ./unattended-installation.sh https://packages.wazuh.com/resources/4.2/unattended-installation/unattended-installation.sh && sudo bash ./unattended-installation.sh

   After executing the script, the output prompts all the users' passwords and a message confirms that the installation was successful.

   Expand the output to see an example response.
   
   .. code-block:: none
     :class: output accordion-output
     :emphasize-lines: 1,26

      The password for wazuh is vhDpq7YcwA08BLTmcdeYeJmXPU_VD31f

      The password for admin is uLo9SBKCE80B8OSE8zNbOWlVvHlOjQ00
      
      The password for kibanaserver is -A452dUzB8gnk3ed7nSuci_kNiSZ0y6z
      
      The password for kibanaro is yyNBlV28VzJHKnYVPNLgoAEssgics9d4
      
      The password for logstash is Hm86wUT7paLDPNhtq-I6Q1H8Weh7tX-g
      
      The password for readall is ZDqyYqvV5moE60k_X5580-4US6CIjBmi
      
      The password for snapshotrestore is FCHX-YhCV_o6IE8x_AA6lFQsjzlmCVe7
      
      The password for wazuh_admin is rkDgTQEnyw8Li3hYXfhD9td-voCw1awm
      
      The password for wazuh_user is _9JE9cY2nMWdR5GRb_Gda8ikrRRvsASH
      
      Checking the installation...
      Elasticsearch installation succeeded.
      Filebeat installation succeeded.
      Initializing Kibana (this may take a while)
      .
      Installation finished
      
      You can access the web interface https://<server_ip>. The credentials are wazuh:vhDpq7YcwA08BLTmcdeYeJmXPU_VD31f

   You now have installed and configured Wazuh. Access the web interface and start securing your systems with Wazuh.       

#. Access the Wazuh web interface with your credentials. 

    - URL: *https://<server_ip>*
    - **Username**: *wazuh*
    - **Password**: *<wazuh_password>*

  When you access Kibana for the first time, the browser shows a warning message stating that the certificate was not issued by a trusted authority. An exception can be added in the advanced options of the web browser or, for increased security, the ``root-ca.pem`` file previously generated can be imported to the certificate manager of the browser. Alternatively, a certificate from a trusted authority can be configured. 

If you want to uninstall the components of the all-in-one installation, run the unattended installation script and use the option ``-r / --uninstall``.  

Next steps
----------

The Wazuh environment is now ready and you can proceed with installing the Wazuh agent on the endpoints to be monitored.

The :ref:`Wazuh agent <wazuh_agent>` is a single and lightweight monitoring software that runs on most operating systems and provides visibility into the endpoint's security by collecting critical system and application records, inventory data, and detecting potential anomalies. Now that your environment is ready, select your operating system and follow the installation steps to deploy the agent to the endpoints. 

.. raw:: html

  <div class="agent-os">
      <div class="item-agent">
          <a href="./installation-guide/wazuh-agent/wazuh_agent_package_linux.html" class="d-flex align-items-center">
            <p>Linux</p>

.. image:: /images/installation/linux.png
      :align: center

.. raw:: html

        </a>
    </div>
    <div class="item-agent">
        <a href="./installation-guide/wazuh-agent/wazuh_agent_package_windows.html" class="d-flex align-items-center">
                    <p>Windows</p>

.. image:: /images/installation/windows_icon.png
      :align: center

.. raw:: html

        </a>
    </div>
    <div class="item-agent">
        <a href="./installation-guide/wazuh-agent/wazuh_agent_package_macos.html" class="d-flex align-items-center">
            <p>macOS</p>

.. image:: /images/installation/macOS_logo.png
      :align: center

.. raw:: html

      </a>
  </div>
  <div class="item-agent" id="solaris-logo">
      <a href="./installation-guide/wazuh-agent/wazuh_agent_package_solaris.html" class="d-flex align-items-center">
          <p>Solaris</p>

.. image:: /images/installation/solaris.png
    :align: center      

.. raw:: html

        </a>
    </div>
    <div class="item-agent">
        <a href="./installation-guide/wazuh-agent/wazuh_agent_package_aix.html" class="d-flex align-items-center">
            <p>AIX</p>

.. image:: /images/installation/AIX.png
      :align: center

.. raw:: html

        </a>
    </div>
    <div class="item-agent">
        <a href="./installation-guide/wazuh-agent/wazuh_agent_package_hpux.html" class="d-flex align-items-center">
            <p>HP-UX</p>

.. image:: /images/installation/hpux.png
      :align: center

.. raw:: html

          </a>
      </div>
  </div>

==============================================================================================================================    =============
Operating systems                                                                                                                 Description
==============================================================================================================================    =============
`Linux systems <https://documentation.wazuh.com/current/installation-guide/wazuh-agent/wazuh-agent-package-linux.html>`_          The deployment of a Wazuh agent on a Linux system uses deployment variables that facilitate the task of installing, registering, and configuring the agent.
`Windows systems <https://documentation.wazuh.com/current/installation-guide/wazuh-agent/wazuh-agent-package-windows.html>`_      Monitor your Windows systems with Wazuh, from Windows XP to the latest available versions including Windows 11 and Windows Server 2022.
`macOS systems <https://documentation.wazuh.com/current/installation-guide/wazuh-agent/wazuh-agent-package-macos.html>`_          Monitor your macOS systems with Wazuh, the package is suitable for macOS Sierra or later.
`AIX systems <https://documentation.wazuh.com/current/installation-guide/wazuh-agent/wazuh-agent-package-aix.html>`_              The deployment of a Wazuh agent on an AIX system uses deployment variables that facilitate the task of installing, registering, and configuring the agent.
`HP-UX systems <https://documentation.wazuh.com/current/installation-guide/wazuh-agent/wazuh-agent-package-hpux.html>`_           Monitor your HP-UX systems with Wazuh.
`Solaris systems <https://documentation.wazuh.com/current/installation-guide/wazuh-agent/wazuh-agent-package-solaris.html>`_      Monitor your Solaris systems with Wazuh, to start the installation process, select your architecture: i386 or Sparc. 
==============================================================================================================================    =============