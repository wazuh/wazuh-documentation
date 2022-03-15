.. Copyright (C) 2022 Wazuh, Inc.

.. _quickstart:


.. meta::
  :description: Install and configure Wazuh, the open source security platform, in just a few minutes using the unattended installation script. 


Quickstart
==========

Wazuh is a security platform that provides unified XDR and SIEM protection for endpoints and cloud workloads. The solution is composed of a single universal agent and three central components: the Wazuh server, the Wazuh indexer, and the Wazuh dashboard. For more information, check the :doc:`Getting Started </getting-started/index>` documentation.

Wazuh is free and open source. Its components abide by the `GNU General Public License, version 2 <https://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html>`_, and the `Apache License, Version 2.0 <https://www.apache.org/licenses/LICENSE-2.0>`_ (ALv2).

This document shows you how to install and configure the central components in just a few minutes. All the components are installed on the same host using the Wazuh unattended installer. Alternatively, you can check our :ref:`Installation guide <installation_guide>` to learn how to install and configure each component in cluster configurations.

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
  | RAM (GB) |  CPU (cores) |  RAM (GB)    |   CPU (cores)  |
  +==========+==============+==============+================+
  |     4    |     2        |     16       |       8        |
  +----------+--------------+--------------+----------------+


- **Disk space**: The amount of data depends on the generated alerts per second (APS). This table details the estimated disk space needed per agent to store 90 days of alerts on a Wazuh server, depending on the type of monitored endpoints.

  +------------------------------+-----+---------------------------+
  | Monitored endpoints          | APS | | Storage                 |
  |                              |     | | (GB/90 days)            |
  +==============================+=====+===========================+
  | Servers                      | 0.25|           3.8             |
  +------------------------------+-----+---------------------------+
  | Workstations                 | 0.1 |           1.5             |
  +------------------------------+-----+---------------------------+
  | Network devices              | 0.5 |           7.6             |
  +------------------------------+-----+---------------------------+

  For example, for an environment with 80 workstations, 10 servers, and 10 network devices, the storage needed for 90 days of alerts is 236 GB approximately. 


Recommended operating systems
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Wazuh can be installed on a 64-bit Linux operating system. Wazuh supports the following operating system versions:


.. list-table::
   :width: 100%
   
   * - Amazon Linux 2
     - CentOS 7, 8
   * - Red Hat Enterprise Linux 7, 8
     - Ubuntu 16.04, 18.04, 20.04
 

.. _unattended_all_in_one:

Installing Wazuh
----------------

#. Download and run the Wazuh unattended installer. 

   .. code-block:: console

     # curl -sO https://s3.us-west-1.amazonaws.com/packages-dev.wazuh.com/resources/4.3/wazuh_install.sh && sudo bash ./wazuh_install.sh -a

   After executing the installer, the output shows the access credentials and a message that confirms that the installation was successful.
   
   .. code-block:: console
     :emphasize-lines: 4
     
     INFO: Passwords changed.
     INFO: Starting Wazuh dashboard (this may take a while).
     INFO: Wazuh dashboard started.
     INFO: You can access the web interface https://<wazuh-dashboard-ip>. The credentials are admin:<admin_password>
     INFO: Installation finished.


   You now have installed and configured Wazuh. 

#. Access the Wazuh web interface with ``https://<wazuh-dashboard-ip>`` and your credentials:

    - **Username**: admin
    - **Password**: <admin_password>

   When you access the Wazuh dashboard for the first time, the browser shows a warning message stating that the certificate was not issued by a trusted authority. This is expected and the user has the option to accept the certificate as an exception or, alternatively, configure the system to use a certificate from a trusted authority. 

 
If you want to uninstall the Wazuh central components, run the Wazuh unattended installer using the option ``-u`` or ``--uninstall``.

Next steps
----------

Now that your Wazuh installation is ready, select your endpoint operating system and follow the installation steps to deploy the :doc:`/installation-guide/wazuh-agent/index`. The agent is a single, universal, and lightweight monitoring software that runs on most operating systems. It provides visibility into the endpoint by collecting critical system and application records, inventory data, and detecting potential anomalies.


.. raw:: html

  <div class="link-boxes-group">
    <div class="link-boxes-item">
      <a class="link-boxes-link" href="installation-guide/wazuh-agent/wazuh-agent-package-linux.html">
        <p class="link-boxes-label">Linux</p>

.. image:: /images/installation/linux.png
      :align: center

.. raw:: html

      </a>
    </div>
    <div class="link-boxes-item">
      <a class="link-boxes-link" href="installation-guide/wazuh-agent/wazuh-agent-package-windows.html">
        <p class="link-boxes-label">Windows</p>

.. image:: /images/installation/windows-logo.png
      :align: center

.. raw:: html

      </a>
    </div>
    <div class="link-boxes-item">
      <a class="link-boxes-link" href="installation-guide/wazuh-agent/wazuh-agent-package-macos.html">
        <p class="link-boxes-label">macOS</p>

.. image:: /images/installation/macOS-logo.png
      :align: center

.. raw:: html

      </a>
    </div>
    <div class="link-boxes-item">
      <a class="link-boxes-link" href="installation-guide/wazuh-agent/wazuh-agent-package-solaris.html">
        <p class="link-boxes-label">Solaris</p>

.. image:: /images/installation/solaris.png
      :align: center

.. raw:: html

      </a>
    </div>
    <div class="link-boxes-item">
      <a class="link-boxes-link" href="installation-guide/wazuh-agent/wazuh-agent-package-aix.html">
        <p class="link-boxes-label">AIX</p>

.. image:: /images/installation/AIX.png
      :align: center

.. raw:: html

      </a>
    </div>
    <div class="link-boxes-item">
      <a class="link-boxes-link" href="installation-guide/wazuh-agent/wazuh-agent-package-hpux.html">
        <p class="link-boxes-label">HP-UX</p>

.. image:: /images/installation/hpux.png
      :align: center

.. raw:: html

      </a>
    </div>
  </div>
