.. Copyright (C) 2018 Wazuh, Inc.

.. _sources_installation:

Install Wazuh manager on MacBook Pro
======================================

In Mac, just the wazuh agent can be installed. However, a Wazuh manager to whom the Wazuh agent would report is necessary.
Thus for the test purposes, installing a Virtual Machine such as Virtual Box is a solution.

.. note:: Many of the commands described below need to be executed with root user privileges.

Importing the Virtual Image in Virtual Box
----------------------------------------------

1. Install VirtualBox for Mac, please follow steps in the link 

  a) Download Virtual Box for MacOS

    https://www.virtualbox.org/wiki/Downloads

  b) Configure Virtual Box: Machine>Settings>Network

    Select attached to Bridget Adapter and in name Wi-Fi (in case of being connected to WiFi)

2. Download a virtual image (OVA) that contains a wazuh manager along with the ELK. It can be downloaded from:

  https://documentation.wazuh.com/current/installation-guide/virtual-machine.html

3. Import the OVA (File>Import) in Virtual Box and run the virtual machine. The wazuh server login is ``root`` and the password ``wazuh``
  

In Terminal of Ubuntu (64 Bits)
---------------------------------

1. Assure that ``sslmanager.cert`` and  ``sslmanager.key`` are in the following path
  
    .. code-block:: console

      # /var/ossec/etc/ 
      

  2. Start the authd server in the Manager in the specified path
   
    .. code-block:: console

      # /var/ossec/bin/   
      
      # ./ossec-authd 

  
Next steps
----------

Once you have installed the manager, to connect to the agent :ref:`Elastic Stack <installation_elastic>`.
1. run ``ifconfig`` to include server-ip address on the agent side

