.. Copyright (C) 2022 Wazuh, Inc.

.. meta::
  :description: Install the Wazuh central components by using the installation assistant.

Install the Wazuh central components
====================================

Wazuh is a security platform that provides unified XDR and SIEM protection for endpoints and cloud workloads. The solution is composed of a single universal agent and three central components: the Wazuh server, the Wazuh indexer, and the Wazuh dashboard. Check the :doc:`Getting Started </getting-started/index>` documentation to learn more. 

To set your Learning Wazuh environment, you can install the Wazuh central components in any of the following ways:

-  Using the installation assistant
-  Downloading the ready-to-use :ref:`OVA <virtual_machine>`
-  Launching an EC2 Instance with our :doc:`AMI </deployment-options/amazon-machine-images/amazon-machine-images>`

Check our :ref:`Installation guide <installation_guide>` for more details and other installation options.

.. note::
   
   Root user privileges are required to execute all the commands below.

Install Wazuh using the Wazuh installation assistant
----------------------------------------------------

Requirements
^^^^^^^^^^^^

Hardware requirements highly depend on the number of protected endpoints and cloud workloads. For this lab, we recommend 4 vCPU, 8 GiB of RAM and 50 GB of storage. 

Wazuh central components can be installed on a 64-bit Linux operating system, the recommended operating systems are:
 
-  Red Hat Enterprise Linux 7, 8, 9
-  CentOS 7, 8
-  Amazon Linux 2
-  Ubuntu 16.04, 18.04, 20.04, 22.04

Installing Wazuh
^^^^^^^^^^^^^^^^

#.  Download and run the Wazuh installation assistant. 

    .. code-block:: console

        $ curl -sO https://packages.wazuh.com/|WAZUH_CURRENT_MINOR|/wazuh-install.sh && sudo bash ./wazuh-install.sh -a


    Once the assistant finishes the installation, the output shows the access credentials and a message that confirms that the installation was successful.

    .. code-block:: none
        :emphasize-lines: 4          
     
        INFO: --- Summary ---
        INFO: You can access the web interface https://<wazuh-dashboard-ip>
            User: admin
            Password: <ADMIN_PASSWORD>
        INFO: Installation finished.

    You now have installed and configured Wazuh.

#.  Access the Wazuh web interface with ``https://<wazuh-dashboard-ip>`` and your credentials:

    -   Username: admin
    -   Password: <ADMIN_PASSWORD>

When you access the Wazuh dashboard for the first time, the browser shows a warning message stating that the certificate was not issued by a trusted authority. This is expected and the user has the option to accept the certificate as an exception or, alternatively, configure the system to use a certificate from a trusted authority.

Configure the Wazuh manager to allow self registration of new agents with authentication
----------------------------------------------------------------------------------------

#. Run the following commands to enable authentication and set the password for agent registration.  

   .. code-block:: console

      # grep "<use_password>" -B7 -A8 /var/ossec/etc/ossec.conf
      # sed -i 's/<use_password>no/<use_password>yes/' /var/ossec/etc/ossec.conf
      # grep "<use_password>" -B7 -A8 /var/ossec/etc/ossec.conf
      # echo "please123" > /var/ossec/etc/authd.pass 

   The password echoed to ``/var/ossec/etc/authd.pass`` is the one agents will use for self-registration. 

#. Restart the Wazuh manager. 

   .. include:: /_templates/common/restart_manager.rst

#. Confirm the agent listener and the self-registration listener are in place:

   .. code-block:: console

      # netstat -natp | egrep "(:1514|:1515)"

   .. code-block:: none
      :class: output

      tcp        0      0 0.0.0.0:1514            0.0.0.0:*               LISTEN      14311/wazuh-remoted
      tcp        0      0 0.0.0.0:1515            0.0.0.0:*               LISTEN      14263/wazuh-authd
