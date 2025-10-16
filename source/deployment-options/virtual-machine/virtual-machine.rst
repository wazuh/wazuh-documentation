.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: The pre-built Wazuh Virtual Machine includes all Wazuh components ready-to-use. Test all Wazuh capabilities with our OVA.  

Virtual Machine (OVA)
=====================

Wazuh provides a pre-built virtual machine image in Open Virtual Appliance (OVA) format.  It includes the Amazon Linux 2023 operating system and the Wazuh central components.

-  Wazuh manager |WAZUH_CURRENT_OVA|
-  Filebeat-OSS |FILEBEAT_LATEST_OVA|
-  Wazuh indexer |WAZUH_CURRENT_OVA|
-  Wazuh dashboard |WAZUH_CURRENT_OVA|

You can import the Wazuh virtual machine image to VirtualBox or other OVA-compatible virtualization systems. This VM runs only on 64-bit systems with x86_64/AMD64 architecture. It does not provide high availability or scalability out of the box. However, you can implement these using :doc:`distributed deployment </installation-guide/index>`.

Download the `virtual appliance (OVA) <https://packages.wazuh.com/|WAZUH_CURRENT_MAJOR_OVA|/vm/wazuh-|WAZUH_CURRENT_OVA|.ova>`_.

Open Virtual Appliances
-----------------------

.. |VM_AL_64_OVA| replace:: `wazuh-|WAZUH_CURRENT_OVA|.ova <https://packages.wazuh.com/|WAZUH_CURRENT_MAJOR_OVA|/vm/wazuh-|WAZUH_CURRENT_OVA|.ova>`__ (`sha512 <https://packages.wazuh.com/|WAZUH_CURRENT_MAJOR_OVA|/checksums/wazuh/|WAZUH_CURRENT_OVA|/wazuh-|WAZUH_CURRENT_OVA|.ova.sha512>`__)
.. |WAZUH_OVA_VERSION| replace:: |WAZUH_CURRENT_OVA|

+-------------------+-----------------------------------+--------------+----------------------+-----------------+
|  Distribution     | Architecture                      | VM Format    | Version              | Package         |
+===================+===================================+==============+======================+=================+
| Amazon Linux 2023 | 64-bit x86_64/AMD64 architecture  |      OVA     | |WAZUH_OVA_VERSION|  | |VM_AL_64_OVA|  |
+-------------------+-----------------------------------+--------------+----------------------+-----------------+

Hardware requirements
---------------------

The following requirements have to be in place before the Wazuh VM can be imported into a host operating system:

-  The host operating system must be 64-bit with x86_64/AMD64 architecture.
-  Enable hardware virtualization in the host firmware.
-  Install a virtualization platform, such as VirtualBox, on the host system.

The Wazuh VM is configured with these specifications by default:

.. |OVA_COMPONENT| replace:: Wazuh v|WAZUH_CURRENT_OVA| OVA

+------------------+----------------+--------------+--------------+
|    Component     |   CPU (cores)  |   RAM (GB)   | Storage (GB) |
+==================+================+==============+==============+
| |OVA_COMPONENT|  |       4        |      8       |     50       |
+------------------+----------------+--------------+--------------+

The hardware configuration can be modified depending on the number of protected endpoints and indexed alert data. For more information about requirements, see :doc:`Quickstart </quickstart>`. 

Import and access the virtual machine
-------------------------------------

#. Import the `wazuh-|WAZUH_CURRENT_OVA|.ova <https://packages.wazuh.com/|WAZUH_CURRENT_MAJOR_OVA|/vm/wazuh-|WAZUH_CURRENT_OVA|.ova>`_ file to your virtualization platform.

#. If you use VirtualBox, set the Graphics Controller to ``VMSVGA``. Other controllers can freeze the VM window.

   #. Select the imported VM
   #. Click **Settings** > **Display**
   #. Switch from **Basic** to **Expert** mode at the top-left of the settings window.
   #. From the **Graphic controller** dropdown, select the ``VMSVGA`` option.

#. Start the VM.

#. Log in using these credentials. You can use the virtualization platform or access it via SSH.

   .. code-block:: none

      user: wazuh-user
      password: wazuh

   The SSH ``root`` user login is disabled. The ``wazuh-user`` has sudo privileges. To switch to root, execute the following command:

   .. code-block:: console

      sudo -i

Access the Wazuh dashboard
--------------------------

After starting the VM, access the Wazuh dashboard in a web browser using these credentials:

  .. code-block:: none

     URL: https://<WAZUH_SERVER_IP>
     user: admin
     password: admin

It might take a few seconds to minutes for the Wazuh dashboard to complete initialization. You can find ``<WAZUH_SERVER_IP>`` by typing the following command in the VM:

  .. code-block:: none

     ip a


Configuration files
-------------------

All components in this virtual image are configured to work out of the box. However, all components can be fully customized. These are the configuration file locations:

  - Wazuh manager: ``/var/ossec/etc/ossec.conf``

  - Wazuh indexer: ``/etc/wazuh-indexer/opensearch.yml``

  - Filebeat-OSS: ``/etc/filebeat/filebeat.yml``

  - Wazuh dashboard: 

     - ``/etc/wazuh-dashboard/opensearch_dashboards.yml``

     - ``/usr/share/wazuh-dashboard/data/wazuh/config/wazuh.yml``

VirtualBox time configuration
-----------------------------

If you use VirtualBox, the VM might experience time skew when VirtualBox synchronizes the guest machine time. Follow the steps below to avoid this:

#. Select the imported Wazuh VM 
#. Click on **Settings** > **System**.
#. Switch from **Basic** to **Expert** mode at the top-left of the settings window.
#. Click on the **Motherboard** sub-tab.
#. Enable the ``Hardware Clock in UTC Time`` option under **Features**.

.. note::
   By default, the network interface type is set to **Bridged Adapter**. The VM attempts to obtain an IP address from the network DHCP server. Alternatively, you can set a static IP address by configuring the network files in Amazon Linux.


Once the virtual machine is imported and running, the next step is to :doc:`deploy the Wazuh agents </installation-guide/wazuh-agent/index>` on the systems to be monitored.

Troubleshooting
---------------

VM fails to start on AMD processors with VMware
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

**Issue**:

-  After importing the Wazuh OVA into VMware Workstation on a host with an AMD processor, the VM fails to start with the error:

   .. code-block:: none

      The guest operating system has disabled the CPU. Power off or reset the virtual machine.

**Workaround**:

#. Locate and edit the VM's ``.vmx`` file after importing the OVA.
#. Add the following lines to the end of the file to resolve compatibility issues between the VM and AMD processors.

   .. code-block:: ini

      cpuid.0.eax = "0000:0000:0000:0000:0000:0000:0000:1011"
      cpuid.0.ebx = "0111:0101:0110:1110:0110:0101:0100:0111"
      cpuid.0.ecx = "0110:1100:0110:0101:0111:0100:0110:1110"
      cpuid.0.edx = "0100:1001:0110:0101:0110:1110:0110:1001"
      cpuid.1.eax = "0000:0000:0000:0001:0000:0110:0111:0001"
      cpuid.1.ebx = "0000:0010:0000:0001:0000:1000:0000:0000"
      cpuid.1.ecx = "1000:0010:1001:1000:0010:0010:0000:0011"
      cpuid.1.edx = "0000:0111:1000:1011:1111:1011:1111:1111"
      featureCompat.enable = "FALSE"

#. Save the file and power on the VM.

Upgrading the VM
----------------

The virtual machine can be upgraded as a traditional installation:

  - :doc:`Upgrading the Wazuh central components </upgrade-guide/upgrading-central-components>`
