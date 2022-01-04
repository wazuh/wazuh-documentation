.. Copyright (C) 2021 Wazuh, Inc.

.. _quickstart:


.. meta::
  :description: Install and configure Wazuh, the open source security platform, in just a few minutes using the unattended installation script. 


Quickstart
==========

Wazuh is a free and open source security platform that unifies XDR and SIEM capabilities. The solution is composed of a :ref:`single universal agent <wazuh_agent>` and three central components: the :ref:`Wazuh server <wazuh_server>`, the :ref:`Wazuh indexer <wazuh_indexer>`, and the :ref:`Wazuh dashboard <wazuh_dashboard>`. For more information about its components, architecture, and capabilities, you can check the :ref:`Getting started <getting_started>` section.  

The Wazuh server and the Wazuh agent abide by the `GNU General Public License, version 2 <https://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html>`_ and the Wazuh indexer and the Wazuh dashboard by the `Apache License, Version 2.0 <https://www.apache.org/licenses/LICENSE-2.0>`_ (ALv2). 

In this section, you install and configure the central components in just a few minutes. All the components are installed on the same host using a single, automated installation script. Alternatively, you can check our :ref:`Installation guide <installation_guide>` to learn how to install and configure each component in single or cluster configurations.

.. _installation_requirements:

Requirements
------------
Check the hardware requirements and the supported operating systems for the Wazuh installation:

Hardware requirements
^^^^^^^^^^^^^^^^^^^^^

- **Memory and CPU**: Minimum and recommended memory and CPU configurations.
    
  +-------------------------+-------------------------------+
  |  Minimum                |   Recommended                 |
  +----------+--------------+--------------+----------------+
  |  RAM (GB)|  CPU (cores) |  RAM (GB)    |   CPU (cores)  |
  +==========+==============+==============+================+
  |     4    |     2        |     16       |       8        |
  +----------+--------------+--------------+----------------+


- **Disk space**: The amount of data depends on the generated alerts per second (APS). This table details the estimated disk space needed per agent to store 90 days of alerts on a Wazuh server, depending on the type of monitored endpoints.

  +------------------------------+-----+---------------------------+
  | Monitored endpoints          | APS | Storage                   |
  |                              |     |  (GB/90 days)             |
  +==============================+=====+===========================+
  | Servers                      | 0.25|           3.8             |
  +------------------------------+-----+---------------------------+
  | Workstations                 | 0.1 |           1.5             |
  +------------------------------+-----+---------------------------+
  | Network devices              | 0.5 |           7.6             |
  +------------------------------+-----+---------------------------+

  For example, for an environment with 80 workstations, 10 servers, and 10 network devices, the storage needed for 90 days of alerts is 236 GB approximately. 



Supported operating systems
^^^^^^^^^^^^^^^^^^^^^^^^^^^

Wazuh can be installed on a 64-bit Linux operating system. Wazuh supports all the operating system versions listed below and their later versions too:


.. list-table::
   :width: 100%
   :widths: 50 50

   * - Amazon Linux 2
     - CentOS 7
   * - Debian 8 ELTS
     - Fedora Linux 33
   * - openSUSE Tumbleweed, Leap 15.2
     - Oracle Linux 6 Extended
   * - Red Hat Enterprise Linux 6 ELS
     - SUSE Linux enterprise server 11 LTSS
   * - Ubuntu 14.04 ESM
     - 
 

.. _unattended_all_in_one:

Installing Wazuh
----------------

#. Download and run the Wazuh unattended installation. 

   .. code-block:: console

     # curl -sO https://s3.us-west-1.amazonaws.com/packages-dev.wazuh.com/resources/4.2/unattended_installation.sh && sudo bash ./unattended_installation.sh -A

   After executing the script, the output prompts all the users' passwords, and a message confirms that the installation was successful.

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

   You now have installed and configured Wazuh. 

#. Access the Wazuh web interface with ``https://<server_ip>`` and your credentias:

    - **Username**: wazuh
    - **Password**: <wazuh_password>

   When you access the Wazuh dashboard for the first time, the browser shows a warning message stating that the certificate was not issued by a trusted authority. An exception can be added in the advanced options of the web browser or, for increased security, the ``root-ca.pem`` file previously generated can be imported to the certificate manager of the browser. Alternatively, a certificate from a trusted authority can be configured. 

If you want to uninstall the Wazuh central components, run the unattended installation script and use the option ``-r / --uninstall``.  

Next steps
----------

Now that your environment is ready, select your endpoint’s operating system and follow the installation steps to deploy the :ref:`Wazuh agent <wazuh_agent>`. The agent is a single, universal and lightweight monitoring software that runs on most operating systems. It provides visibility into the endpoint’s security by collecting critical system and application records, inventory data, and detecting potential anomalies.

.. raw:: html

  <div class="link-boxes-group">
    <div class="link-boxes-item">
      <a class="link-boxes-link" href="./installation-guide/wazuh-agent/wazuh_agent_package_linux.html" class="d-flex align-items-center">
        <p class="link-boxes-label">Linux</p>

.. image:: /images/installation/linux.png
      :align: center

.. raw:: html

        </a>
    </div>
    <div class="link-boxes-item">
      <a class="link-boxes-link" href="./installation-guide/wazuh-agent/wazuh_agent_package_windows.html" class="d-flex align-items-center">
        <p class="link-boxes-label">Windows</p>

.. image:: /images/installation/windows_icon.png
      :align: center

.. raw:: html

        </a>
    </div>
    <div class="link-boxes-item">
      <a class="link-boxes-link" href="./installation-guide/wazuh-agent/wazuh_agent_package_macos.html" class="d-flex align-items-center">
        <p class="link-boxes-label">macOS</p>

.. image:: /images/installation/macOS_logo.png
      :align: center

.. raw:: html

      </a>
  </div>
  <div class="link-boxes-item">
    <a class="link-boxes-link" href="./installation-guide/wazuh-agent/wazuh_agent_package_solaris.html" class="d-flex align-items-center">
      <p class="link-boxes-label">Solaris</p>

.. image:: /images/installation/solaris.png
    :align: center      

.. raw:: html

        </a>
    </div>
    <div class="link-boxes-item">
      <a class="link-boxes-link" href="./installation-guide/wazuh-agent/wazuh_agent_package_aix.html" class="d-flex align-items-center">
        <p class="link-boxes-label">AIX</p>

.. image:: /images/installation/AIX.png
      :align: center

.. raw:: html

        </a>
    </div>
    <div class="link-boxes-item">
      <a class="link-boxes-link" href="./installation-guide/wazuh-agent/wazuh_agent_package_hpux.html" class="d-flex align-items-center">
        <p class="link-boxes-label">HP-UX</p>

.. image:: /images/installation/hpux.png
      :align: center

.. raw:: html

          </a>
      </div>
  </div>