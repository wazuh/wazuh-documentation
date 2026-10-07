.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Wazuh provides a pre-built virtual machine (VM) image in Open Virtual Appliance (OVA) format.  It includes the Amazon Linux 2023 operating system and the Wazuh central components.

Virtual machine (VM)
====================

Wazuh provides a pre-built virtual machine (VM) image in Open Virtual Appliance (OVA) format. The ``.ova`` file contains a descriptor file (``.ovf``), which describes the structure and configuration of the virtual machine, as well as the virtual disks (``.vmdk``) required for its operation.

It includes the Amazon Linux 2023 operating system and the Wazuh central components.

-  Wazuh manager |WAZUH_CURRENT_OVA|-|WAZUH_CURRENT_OVA_REV|
-  Wazuh indexer |WAZUH_CURRENT_OVA|-|WAZUH_CURRENT_OVA_REV|
-  Wazuh dashboard |WAZUH_CURRENT_OVA|-|WAZUH_CURRENT_OVA_REV|
-  Wazuh agent |WAZUH_CURRENT_OVA|-|WAZUH_CURRENT_OVA_REV|

The Wazuh OVA is designed to be deployed in an all-in-one configuration, meaning all components are installed on a single instance. It comes with a preinstalled Wazuh agent configured to communicate with the local Wazuh manager.

You can import the Wazuh virtual machine image to VirtualBox or other OVA-compatible virtualization systems. This VM runs only on 64-bit systems with x86_64/AMD64 architecture. It does not provide high availability or scalability out of the box. However, you can implement these using :doc:`distributed deployment </installation-guide/index>`.

Download the `virtual appliance (OVA) <https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR_OVA|/vm/wazuh-|WAZUH_CURRENT_OVA|-|WAZUH_CURRENT_OVA_REV|.ova>`__.

.. |VM_AL_64_OVA| replace:: `wazuh-|WAZUH_CURRENT_OVA|-|WAZUH_CURRENT_OVA_REV|.ova <https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR_OVA|/vm/wazuh-|WAZUH_CURRENT_OVA|-|WAZUH_CURRENT_OVA_REV|.ova>`__ (`sha512 <https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR_OVA|/checksums/wazuh/|WAZUH_CURRENT_OVA|/wazuh-|WAZUH_CURRENT_OVA|-|WAZUH_CURRENT_OVA_REV|.ova.sha512>`__)
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
| |OVA_COMPONENT|  |       8        |      16      |     50       |
+------------------+----------------+--------------+--------------+

The hardware configuration can be modified depending on the number of protected endpoints and indexed alert data. For more information about requirements, see :doc:`/quickstart`.

Import and access the virtual machine
-------------------------------------

#. Download and import the `wazuh-|WAZUH_CURRENT_OVA|-|WAZUH_CURRENT_OVA_REV|.ova <https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR_OVA|/vm/wazuh-|WAZUH_CURRENT_OVA|-|WAZUH_CURRENT_OVA_REV|.ova>`_ file to your virtualization platform.

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

      $ sudo -i

Access the Wazuh dashboard
--------------------------

It might take a few seconds to minutes for the Wazuh dashboard to complete initialization. Find the ``<WAZUH_MANAGER_IP>`` by typing the following command in the VM:

.. code-block:: console

   # ip a

After starting the VM, access the Wazuh dashboard in a web browser:

-  URL: ``https://<WAZUH_MANAGER_IP>``
-  User: ``admin``
-  Password: generated for this VM at its first start. Print it by running the following command in the VM as root:

   .. code-block:: console

      # grep '^WAZUH_INDEXER_ADMIN_PASSWORD=' /etc/wazuh/credentials.env | cut -d= -f2-

The ``/etc/wazuh/credentials.env`` file holds every password generated for this VM, including the one for the Wazuh manager API user ``wazuh``. Save the passwords somewhere safe, then delete the file.

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

   By default, the network interface type is set to **Bridged Adapter**. The VM attempts to obtain an IP address from the network DHCP server. Alternatively, you can set a static IP address in ``/etc/systemd/network/20-eth0.network``. If the address changes after the VM first started, reissue the agent listener certificate as described in :ref:`vm_reissue_agent_listener_certificate`.

Enroll additional Wazuh agents
------------------------------

Once the virtual machine is imported and running, it is ready for monitoring using the preinstalled Wazuh agent. To monitor additional endpoints, enroll Wazuh agents on them with an enrollment token. Wazuh 5.x agents connect to the VM on TCP port ``1517`` for enrollment and for their connection, while older agents still use the legacy ports.

#. Run the following command in the VM as root to create an enrollment token. Replace ``<WAZUH_MANAGER_IP>`` with the address the agents use to reach the VM. It must be an address the VM had when it first started. If the address has changed since then, see :ref:`vm_reissue_agent_listener_certificate` below.

   .. code-block:: console

      # /var/wazuh-manager/bin/wazuh-manager-authd --create-enrollment-token --address <WAZUH_MANAGER_IP>

   Copy the token, the long string in the output.

#. :doc:`Deploy the Wazuh agent </installation-guide/wazuh-agent/index>` on each endpoint, and use the token as the value of ``WAZUH_ENROLLMENT_TOKEN``. See the :doc:`Wazuh agent installation guide </installation-guide/wazuh-agent/index>` for more information.

.. _vm_reissue_agent_listener_certificate:

Reissue the agent listener certificate
--------------------------------------

Wazuh agents verify the Wazuh manager with its agent listener certificate, ``/var/wazuh-manager/etc/certs/remoted.pem``. The VM issues it at its first start, for the addresses it has at that moment and for loopback. If the VM's address changes later, or agents reach it through an address that is not on the VM, such as a NAT port forward, agents fail to verify it. Creating an enrollment token for that address fails with ``ERROR 9025: Enrollment token refused: address not in certificate SAN``.

Reissue the certificate from the VM's own certificate authority. Run the following steps in the VM as root. Agents enrolled before the change keep trusting the Wazuh manager because the certificate authority stays the same.

#. Stop the Wazuh manager, then check that none of its processes are still running:

   .. code-block:: console

      # systemctl stop wazuh-manager
      # /var/wazuh-manager/bin/wazuh-manager-control status

   If any line ends in ``is running...``, stop them:

   .. code-block:: console

      # /var/wazuh-manager/bin/wazuh-manager-control stop

#. Check the Wazuh manager's indexer certificate:

   .. code-block:: console

      # openssl verify -CAfile /etc/wazuh/ca/root-ca.pem /var/wazuh-manager/etc/certs/indexer-connector.pem

   The output ends in ``OK``. If it doesn't, also move the indexer certificate pair in the next step.

#. Move the current certificate pair to a backup directory:

   .. code-block:: console

      # mkdir -p /root/wazuh-certs-backup
      # mv /var/wazuh-manager/etc/certs/remoted.pem /var/wazuh-manager/etc/certs/remoted-key.pem /root/wazuh-certs-backup/

   If step 2 did not print ``OK``, also run:

   .. code-block:: console

      # mv /var/wazuh-manager/etc/certs/indexer-connector.pem /var/wazuh-manager/etc/certs/indexer-connector-key.pem /root/wazuh-certs-backup/

#. Issue the new certificate. Use the command that matches how agents reach the VM.

   -  **The address is on the VM**, for example, a new DHCP lease or a static IP. The certificate covers the VM's hostname, ``localhost``, loopback, and every address the VM has now:

      .. code-block:: console

         # /var/wazuh-manager/bin/wazuh-manager-resolve-credentials --install

   -  **The address is not on the VM**, for example, a NAT port forward. Forward TCP port ``1517`` to the VM, then list the addresses agents use. The list replaces the discovered addresses, and loopback is always added. Replace ``<AGENT_FACING_ADDRESS>``:

      .. code-block:: console

         # WAZUH_MANAGER_REMOTED_CERT_SANS='IP:<AGENT_FACING_ADDRESS>' /var/wazuh-manager/bin/wazuh-manager-resolve-credentials --install

   The output includes a line that starts with ``resolve-credentials: remoted.pem:`` and lists the new address. If that line is missing, the certificate was not issued. Move the files in ``/root/wazuh-certs-backup/`` back to ``/var/wazuh-manager/etc/certs/`` and start the Wazuh manager.

#. Start the Wazuh manager:

   .. code-block:: console

      # systemctl restart wazuh-manager

#. Create an enrollment token for the new address to confirm the change. The command now succeeds:

   .. code-block:: console

      # /var/wazuh-manager/bin/wazuh-manager-authd --create-enrollment-token --address <NEW_ADDRESS>

Move enrolled agents to the new address
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Wazuh agents enrolled before the change keep their ID. Point each one to the new address with a token that cannot enroll new agents.

#. Run the following command in the VM as root. Replace ``<NEW_ADDRESS>`` with the new address, and copy the token from the output:

   .. code-block:: console

      # /var/wazuh-manager/bin/wazuh-manager-authd --create-enrollment-token --address <NEW_ADDRESS> --no-credential

#. On each Linux endpoint, as root, save the token to a file only root can read, for example ``/root/token``, then run:

   .. code-block:: console

      # systemctl stop wazuh-agent
      # /var/ossec/bin/wazuh-agent-auth --token-file /root/token --certs-only
      # rm /root/token
      # systemctl start wazuh-agent

   The output of ``wazuh-agent-auth`` confirms the new address: ``etc/ossec.conf now points <manager><endpoint> at '<NEW_ADDRESS>'.``

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
