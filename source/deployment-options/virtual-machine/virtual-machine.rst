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

This default size matches the :doc:`Quickstart </quickstart>` guide recommendation for 26 to 100 Wazuh agents. For up to 25 agents, you can lower it to 4 CPU cores and 8 GB of RAM when you import the VM. You can adjust the hardware configuration based on the number of protected endpoints and indexed alert data.

.. _vm_import_and_access:

Import and access the virtual machine
-------------------------------------

#. Download the `wazuh-|WAZUH_CURRENT_OVA|-|WAZUH_CURRENT_OVA_REV|.ova <https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR_OVA|/vm/wazuh-|WAZUH_CURRENT_OVA|-|WAZUH_CURRENT_OVA_REV|.ova>`__ file. To check the download, run the following command and compare its output with the value in the `sha512 <https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR_OVA|/checksums/wazuh/|WAZUH_CURRENT_OVA|/wazuh-|WAZUH_CURRENT_OVA|-|WAZUH_CURRENT_OVA_REV|.ova.sha512>`__ file:

   .. code-block:: console

      $ sha512sum wazuh-|WAZUH_CURRENT_OVA|-|WAZUH_CURRENT_OVA_REV|.ova

#. Import the OVA into your virtualization platform. In VirtualBox, select **File** > **Import Appliance**, then select the ``wazuh-|WAZUH_CURRENT_OVA|-|WAZUH_CURRENT_OVA_REV|.ova`` file. If your host can't spare 8 CPU cores and 16 GB of RAM, lower them before you click **Finish**. The VM also runs with 4 CPU cores and 8 GB of RAM. To import from a terminal instead, run:

   .. code-block:: console

      $ VBoxManage import wazuh-|WAZUH_CURRENT_OVA|-|WAZUH_CURRENT_OVA_REV|.ova --vsys 0 --cpus 4 --memory 8192

#. If you use VirtualBox, change two settings before you start the VM. Other graphics controllers can freeze the VM window, and without the UTC setting, the VM clock can jump by your time zone offset during the first start.

   #. Select the imported VM and click **Settings**. In VirtualBox 7.1 and later, switch from **Basic** to **Expert** mode at the top-left of the settings window.
   #. In **Display**, select ``VMSVGA`` from the **Graphics Controller** list.
   #. In **System** > **Motherboard**, select **Hardware Clock in UTC Time**.

   To change both settings from a terminal instead, run the following command while the VM is powered off. Replace ``<VM_NAME>`` with the VM's name:

   .. code-block:: console

      $ VBoxManage modifyvm "<VM_NAME>" --graphicscontroller vmsvga --rtc-use-utc on

#. Start the VM. The first start configures the VM and takes about 5 minutes.

#. Log in on the VM console, or over SSH to the VM's IP address. To find the address, run the following command on the console. Use the ``inet`` address of the interface on the network you connect from. With the default single network adapter, that is ``eth0``.

   .. code-block:: console

      $ ip -4 addr

   Use these credentials:

   -  User: ``wazuh-user``
   -  Password: ``wazuh``

   The SSH ``root`` user login is disabled. The ``wazuh-user`` has sudo privileges. To switch to root, execute the following command:

   .. code-block:: console

      $ sudo -i

   The VM runs Amazon Linux in FIPS mode. For SSH key login, use an RSA or ECDSA key. Ed25519 keys are refused.

#. Check that the first start has finished:

   .. code-block:: console

      $ sudo systemctl status wazuh-starter

   It has finished when the output shows ``status=0/SUCCESS``. After a later reboot, the command reports that the unit could not be found instead. If it shows ``failed``, the Wazuh dashboard doesn't start.

Access the Wazuh dashboard
--------------------------

When the first start has finished, access the Wazuh dashboard in a web browser. Replace ``<VM_IP_ADDRESS>`` with the VM's IP address from step 5 of :ref:`vm_import_and_access`:

-  URL: ``https://<VM_IP_ADDRESS>``
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

Network configuration
---------------------

By default, the network interface type is set to **Bridged Adapter**. The VM attempts to obtain an IP address from the network DHCP server. Alternatively, you can give the VM a static IP address as described in :ref:`vm_set_static_ip_address`. If the VM's address changes after its first start, reissue the agent listener certificate as described in :ref:`vm_reissue_agent_listener_certificate`.

.. _vm_set_static_ip_address:

Set a static IP address
^^^^^^^^^^^^^^^^^^^^^^^

The VM gets its addresses from DHCP. To give one of its network interfaces a static address, run the following steps in the VM as root.

#. Find the interface on the network you want to configure. Its ``inet`` line shows the address it has now:

   .. code-block:: console

      # ip -4 addr

   With the default single network adapter, the interface is ``eth0``. With more than one adapter, the interface names don't always follow the adapter order in your virtualization platform, so identify the interface by its address.

#. Create ``/etc/systemd/network/10-static.network`` with the following content. Replace ``<INTERFACE>``, ``<STATIC_IP>``, ``<PREFIX_LENGTH>``, ``<GATEWAY_IP>``, and ``<DNS_SERVER_IP>`` with your values:

   .. code-block:: ini
      :emphasize-lines: 2,4-6

      [Match]
      Name=<INTERFACE>
      [Network]
      Address=<STATIC_IP>/<PREFIX_LENGTH>
      Gateway=<GATEWAY_IP>
      DNS=<DNS_SERVER_IP>

   This file applies only to that interface. The other interfaces keep using DHCP through ``/etc/systemd/network/20-eth0.network``. Keep that file unchanged, because it matches every Ethernet interface.

#. Apply the change. An SSH session to the old address disconnects, so reconnect to the new address:

   .. code-block:: console

      # systemctl restart systemd-networkd

#. Reissue the agent listener certificate as described in the :ref:`vm_reissue_agent_listener_certificate` section, so agents can verify the Wazuh manager at the new address.

Enroll additional Wazuh agents
------------------------------

Once the virtual machine is imported and running, it is ready for monitoring using the preinstalled Wazuh agent. To monitor additional endpoints, enroll Wazuh agents on them with an enrollment token. Wazuh 5.x agents connect to the VM on TCP port ``1517`` for enrollment and for their connection, while older agents still use the legacy ports.

#. Run the following command in the VM as root to create an enrollment token. Replace ``<VM_IP_ADDRESS>`` with the address the agents use to reach the VM. It must be an address the VM had when it first started. If the address has changed since then, see :ref:`vm_reissue_agent_listener_certificate` below.

   .. code-block:: console

      # /var/wazuh-manager/bin/wazuh-manager-authd --create-enrollment-token --address <VM_IP_ADDRESS>

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

#. Point the Wazuh agent on each endpoint to the new address. Follow the steps for the endpoint's operating system.

   .. tabs::

      .. group-tab:: Linux

         As root, save the token to a file only root can read, for example ``/root/token``, then run:

         .. code-block:: console

            # systemctl stop wazuh-agent
            # /var/ossec/bin/wazuh-agent-auth --token-file /root/token --certs-only
            # rm /root/token
            # systemctl start wazuh-agent

         The output of ``wazuh-agent-auth`` confirms the new address: ``etc/ossec.conf now points <manager><endpoint> at '<NEW_ADDRESS>'.``

      .. group-tab:: macOS

         As root, save the token to a file only root can read, for example ``/var/root/token``, then run:

         .. code-block:: console

            # launchctl bootout system /Library/LaunchDaemons/com.wazuh.agent.plist
            # /Library/Ossec/bin/wazuh-agent-auth --token-file /var/root/token --certs-only
            # rm /var/root/token
            # launchctl bootstrap system /Library/LaunchDaemons/com.wazuh.agent.plist

         The output of ``wazuh-agent-auth`` confirms the new address: ``etc/ossec.conf now points <manager><endpoint> at '<NEW_ADDRESS>'.``

      .. group-tab:: Windows

         Run the following commands in PowerShell as an administrator. Replace ``<TOKEN>`` with the token:

         .. code-block:: powershell
            :emphasize-lines: 1

            > Set-Content -Path C:\token.txt -Value "<TOKEN>"
            > Stop-Service WazuhSvc
            > & "C:\Program Files (x86)\ossec-agent\wazuh-agent-auth.exe" --token-file C:\token.txt --certs-only
            > Remove-Item C:\token.txt
            > Start-Service WazuhSvc

         Write the token file with ``Set-Content`` as shown. A file with a byte order mark, such as one ``Out-File`` writes in Windows PowerShell, fails with ``invalid enrollment token: malformed token``. The output of ``wazuh-agent-auth.exe`` confirms the new address: ``ossec.conf now points <manager><endpoint> at '<NEW_ADDRESS>'.``

         Alternatively, open **Manage Agent** GUI from the Start menu and select **Manage** > **Update CA**. Paste the token and click **OK**. Click **Yes** to stop the Wazuh agent service. When the message ``Trust anchor and manager address refreshed.`` appears, click **OK**, then click **Yes** to start the service.

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

#. Save the file and power on the VM. These lines make VMware present the CPU to the VM as an older Intel CPU without AVX instructions, which can reduce performance. Use them only if you get the error above.
