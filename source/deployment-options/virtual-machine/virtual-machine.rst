.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Wazuh provides a pre-built virtual machine image in Open Virtual Appliance (OVA) format.  It includes the Amazon Linux 2023 operating system and the Wazuh central components.

Virtual machine (VM)
====================

Wazuh provides a pre-built virtual machine image in Open Virtual Appliance (OVA) format. The ``.ova`` file contains a descriptor file (``.ovf``), which describes the structure and configuration of the virtual machine, as well as the virtual disks (``.vmdk``) required for its operation.

It includes the Amazon Linux 2023 operating system and the Wazuh components:

-  Wazuh manager |WAZUH_CURRENT_OVA|-|WAZUH_CURRENT_OVA_REV|
-  Wazuh indexer |WAZUH_CURRENT_OVA|-|WAZUH_CURRENT_OVA_REV|
-  Wazuh dashboard |WAZUH_CURRENT_OVA|-|WAZUH_CURRENT_OVA_REV|
-  Wazuh agent |WAZUH_CURRENT_OVA|-|WAZUH_CURRENT_OVA_REV|

The Wazuh OVA is designed to be deployed in an all-in-one configuration, meaning all components are installed on a single instance. It comes with a preinstalled Wazuh agent configured to communicate with the local Wazuh manager.

You can import the Wazuh virtual machine image to VirtualBox or other OVA-compatible virtualization systems. This VM runs only on 64-bit systems with x86_64/AMD64 architecture. It does not provide high availability or scalability out of the box. However, you can implement these using :doc:`distributed deployment </installation-guide/index>`.

Download the `virtual appliance (OVA) <https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR_OVA|/vm/wazuh-|WAZUH_CURRENT_OVA|-|WAZUH_CURRENT_OVA_REV|.ova>`__.

.. |VM_AL_64_OVA| replace:: `wazuh-|WAZUH_CURRENT_OVA|-|WAZUH_CURRENT_OVA_REV|.ova <https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR_OVA|/vm/wazuh-|WAZUH_CURRENT_OVA|-|WAZUH_CURRENT_OVA_REV|.ova>`__ (`sha512 <https://www.google.com/url?q=https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR_OVA|/checksums/wazuh/|WAZUH_CURRENT_OVA|/wazuh-|WAZUH_CURRENT_OVA|-|WAZUH_CURRENT_OVA_REV|.ova.sha512>`__)
.. |WAZUH_OVA_VERSION| replace:: |WAZUH_CURRENT_OVA|-|WAZUH_CURRENT_OVA_REV|

+-------------------+-----------------------------------+--------------+----------------------+-----------------+
|  OS               | Architecture                      | VM Format    | Version              | Package         |
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

.. |OVA_COMPONENT| replace:: Wazuh v|WAZUH_CURRENT_OVA|-|WAZUH_CURRENT_OVA_REV| OVA

+------------------+----------------+--------------+--------------+
|    Component     |   CPU (cores)  |   RAM (GB)   | Storage (GB) |
+==================+================+==============+==============+
| |OVA_COMPONENT|  |       4        |      8       |     50       |
+------------------+----------------+--------------+--------------+

.. warning::

   Change the VirtualBox system setting to 8 CPU cores and 16 GB RAM.

The hardware configuration can be modified depending on the number of protected endpoints and indexed alert data. For more information about requirements, see :doc:`/quickstart`.

Import and access the virtual machine
-------------------------------------

#. Import the `wazuh-|WAZUH_CURRENT_OVA|-|WAZUH_CURRENT_OVA_REV|.ova <https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR_OVA|/vm/wazuh-|WAZUH_CURRENT_OVA|-|WAZUH_CURRENT_OVA_REV|.ova>`_ file to your virtualization platform.

#. If you use VirtualBox, set the Graphics Controller to ``VMSVGA``. Other controllers can freeze the VM window.

   #. Select the imported VM
   #. Click **Settings** > **Display**
   #. Switch from **Basic** to **Expert** mode at the top-left of the settings window.
   #. From the **Graphic controller** dropdown, select the ``VMSVGA`` option.

#. Start the VM.

#. Log in using these credentials. You can use the virtualization platform or access it via SSH.

   -  User: ``wazuh-user``
   -  Password: ``wazuh``

   The SSH ``root`` user login is disabled. The ``wazuh-user`` has sudo privileges. To switch to root, execute the following command:

   .. code-block:: console

      sudo -i

Access the Wazuh dashboard
--------------------------

It might take a few seconds to minutes for the Wazuh dashboard to complete initialization. Find ``<WAZUH_MANAGER_IP>`` by typing the following command in the VM:

.. code-block:: console

   # ip a

After starting the VM, access the Wazuh dashboard in a web browser using these credentials:

-  URL: ``https://<WAZUH_MANAGER_IP>``
-  User: ``admin``
-  Password: ``admin``

Configuration files
-------------------

All components in this virtual image are configured to work out of the box. However, all components can be fully customized. These are the configuration file locations:

-  Wazuh manager: ``/var/wazuh-manager/etc/wazuh-manager.conf``
-  Wazuh indexer: ``/etc/wazuh-indexer/opensearch.yml``
-  Wazuh dashboard: ``/etc/wazuh-dashboard/opensearch_dashboards.yml``
-  Wazuh agent: ``/var/ossec/etc/ossec.conf``

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


Once the virtual machine is imported and running, it is ready for monitoring using the preinstalled Wazuh agent. To monitor additional endpoints, :doc:`deploy the Wazuh agents </installation-guide/wazuh-agent/index>` on the systems you want to include.

Troubleshooting
---------------

VM fails to start on AMD processors with VMware
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

**Issue**:

-  After importing the Wazuh OVA into VMware Workstation on a host with an AMD processor, the VM fails to start with the error:

   .. code-block:: none

      The guest operating system has disabled the CPU. Power off or reset the virtual machine.

**Workaround**:

#. Locate and edit the VM ``.vmx`` file after importing the OVA.
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
