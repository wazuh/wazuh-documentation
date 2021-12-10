.. Copyright (C) 2021 Wazuh, Inc.

.. _quickstart:


.. meta::
  :description: Install and configure Wazuh, the open source security platform, in just a few minutes using the unattended installation script. 


Quickstart
==========

**Version 2.0**

Wazuh is a free, open source and enterprise-ready security monitoring solution for threat detection, integrity monitoring, incident response, and regulatory compliance. The solution is widely used by thousands of organizations around the world, from small businesses to large enterprises. You can start using Wazuh as well with our Quickstart that installs and configures the Wazuh components in just a few minutes.

This Quickstart only requires you to run the unattended script which quickly installs all the :ref:`Wazuh central components <components>` on the same host. These central components are in charge of analyzing the data gathered by the Wazuh agents, providing a search engine and data visualization tool that allow users to navigate through their security alerts.

Alternatively, you can install each component on the same server, one by one, or on different servers as a distributed deployment for scalability and high availability, depending on the environment needs. Check our :ref:`Installation guide <installation_guide>` to learn more about these deployment alternatives. 


Community and support
---------------------

Wazuh is quick and easy to install, but if you have any questions, our developers and contributors are more than happy to answer them. You can join our community to learn from other users, participate in discussions, talk to our development team, and contribute to the project. The following resources are easily available:

- `Slack channel <https://wazuh.com/community/join-us-on-slack>`_: Join our community channel to chat with our developers and technical team in a close to real-time experience.
- `Google group <https://groups.google.com/forum/#!forum/wazuh>`_: Here you can share questions and learn from other Wazuh users and developers. It is easy to subscribe via `email <wazuh+subscribe@googlegroups.com>`_.
- `GitHub repositories <https://github.com/wazuh>`_: Get access to the Wazuh source code, report issues, and contribute to the project. We happily review and accept pull requests.


.. _installation_requirements:

Requirements
------------
Check the supported operating systems and the recommended hardware requirements for the Wazuh installation.

Supported operating systems
^^^^^^^^^^^^^^^^^^^^^^^^^^^

Wazuh can be installed on a 64-bit Linux operating system.

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
- Hardware
  
  +-------------------------+-------------------------------+
  |  Minimum                |   Recommended                 |
  +----------+--------------+--------------+----------------+
  |  RAM (GB)|  CPU (cores) |  RAM (GB)    |   CPU (cores)  |
  +==========+==============+==============+================+
  |     4    |     2        |     16       |       8        |
  +----------+--------------+--------------+----------------+

- Disk space

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

#. Download and run the Wazuh unattended installation script. 

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

   You now have installed and configured Wazuh.

#. Access the Wazuh web interface with ``https://<server_ip>`` and the credentials shown below.

.. thumbnail:: images/quickstart/welcome-to-wazuh_v2.png
  :title: Wazuh web interface credentials
  :align: center
  :width: 100%

When you access Kibana for the first time, the browser shows a warning message stating that the certificate was not issued by a trusted authority. You can make an exception for this in the advanced options of the web browser or, for increased security, the ``root-ca.pem`` file previously generated can be imported to the certificate manager of the browser. Alternatively, a certificate from a trusted authority can be configured. 

If you want to uninstall Wazuh, run the unattended installation script and use the option ``-r / --uninstall``.  

Next steps
----------

Now that your environment is ready, select your endpoint's operating system and follow the installation steps to deploy the :ref:`Wazuh agent <wazuh_agent>`. The agent is a single and lightweight monitoring software that runs on most operating systems. It provides visibility into the endpoint's security by collecting critical system and application records, inventory data, and detecting potential anomalies. 

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