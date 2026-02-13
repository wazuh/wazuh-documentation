.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :Description: Ansible is an agentless automation platform. Learn more about remote endpoints deployments in this section of the Wazuh documentation.
  
Remote endpoint connection
==========================

Ansible is agentless and connects to remote endpoints to execute tasks and playbooks. The connection method depends on the operating system of the endpoint. Ansible connects to Linux endpoints using SSH while Windows endpoints are managed over Windows Remote Management (WinRM).

Managing Linux endpoints with Ansible
-------------------------------------

Ansible manages Linux endpoints using SSH for remote execution. The Ansible control server must have network access to the target remote endpoints and authenticate using either passwords or SSH keys.

Authenticate with passwords
~~~~~~~~~~~~~~~~~~~~~~~~~~~

This method authenticate via SSH with a username and password. Ansible provides several useful options that can be used for SSH authentication with passwords:

-  ``-u`` <user> set the connection user.

-  ``-k`` prompt for the user's SSH password to the remote endpoint.

-  ``-b`` execute task and operations with a privilege user.

-  ``-K`` prompt for the sudo password.

You can use the above arguments as follows:

.. code-block:: console

   # ansible -m setup all -u foo -k -b -K

This command sets the connection user as ``foo``. Also, it requests the connection user password and privileged user password.

Authenticate with SSH key-pairing
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

You can set up an SSH key-pair to provide a passwordless authentication mechanism. Perform the following steps to set up SSH key-pairing between the Ansible control server and the managed endpoint.

#. Generate the SSH authentication key pair for the root user of the Ansible control server using the ssh-keygen tool.

   #. Switch to root and navigate to the ``$HOME`` directory of the Ansible server:

      .. code-block:: consoleF

         $ sudo su
         # cd ~

   #. Generate an authentication key pair for SSH:

      .. code-block:: console

         # ssh-keygen

      .. note::

         -  To improve security on this setup, please ensure you provide a passphrase for this key.

         -  Using ssh-agent, we can avoid repeatedly asking for the key password on every Ansible deployment. Ssh-agent will cache the key to be used in further actions, until you log out.

   #. Verify the permissions of the generated keys:

      .. code-block:: console

         # ls -la ~/.ssh

      ``id_rsa`` must have restrictive permissions (``600 or "-rw-------"``).

      .. code-block:: none
         :class: output

         drwx------. 2 root root   57 Mar 18 10:06 .
         dr-xr-x---. 5 root root  210 Mar 18 08:44 ..
         -rw-------. 1 root root 1675 Mar 18 12:34 id_rsa
         -rw-r--r--. 1 root root  408 Mar 18 12:34 id_rsa.pub
         -rw-r--r--. 1 root root  175 Mar 18 10:14 known_hosts

      The ``/root/.ssh/`` directory must have its permissions set to ``700 (drwx------)``. The permissions can be set using the command below:

      .. code-block:: console

         # chmod 700 ~/.ssh/

#. Follow the steps below to prepare the remote endpoint to receive the Ansible server public key.

   #. Install OpenSSH server if it is not present.

      .. tabs::

         .. group-tab:: CentOS/RHEL/Fedora

            .. code-block:: console

               # yum install openssh-server

         .. group-tab:: Ubuntu/Debian

            .. code-block:: console

               # apt-get install openssh-server

   #. Start the SSH service.

      .. tabs::

         .. group-tab:: Systemd

            -  CentOS / RHEL / Fedora:

               .. code-block:: console

                  # systemctl start sshd

            -  Ubuntu/Debian:

               .. code-block:: console

                  # systemctl start ssh

         .. group-tab:: SysV Init

            -  CentOS / RHEL / Fedora:

               .. code-block:: console

                  # service sshd start

            -  Ubuntu/Debian:

               .. code-block:: console

                  # service ssh start

   #. Navigate to the ``$HOME`` directory of the remote endpoint, create the ``.ssh`` directory, and assign the appropriate permissions to it:

      .. code-block:: console

         $ cd ~
         $ mkdir .ssh
         $ chmod 700 .ssh/

   #. Create the ``authorized_keys`` file in the ``.ssh/`` directory with the appropriate permission if it is not there by default, otherwise the public key authentication will not work properly:

      .. code-block:: console

         $ touch .ssh/authorized_keys
         $ chmod 644 .ssh/authorized_keys

#. Follow the steps below to add the public key (``id_rsa.pub``) of the Ansible server to the ``~/.ssh/authorized_keys`` file in the ``$HOME`` directory of the remote endpoint using SSH.

   #. Run the command below from the Ansible server:

      .. code-block:: console

         # cat ~/.ssh/id_rsa.pub | ssh <REMOTE_ENDPOINT_USERNAME>@<REMOTE_ENDPOINT_IP_ADDRESS> "cat >> ~/.ssh/authorized_keys"

   #. Verify that the key is stored on the remote endpoint:

      .. code-block:: console

         # cat ~/.ssh/authorized_keys

#. Confirm SSH configuration allows public key authentication. Edit ``/etc/ssh/sshd_config`` on the remote endpoint and ensure the following settings are uncommented:

   .. code-block:: none

      PubkeyAuthentication yes
      AuthorizedKeysFile .ssh/authorized_keys

#. Restart the SSH service:

   .. tabs::

      .. group-tab:: Systemd

         -  CentOS / RHEL / Fedora:

            .. code-block:: console

               # systemctl start sshd

         -  Ubuntu/Debian:

            .. code-block:: console

               # systemctl start ssh

      .. group-tab:: SysV Init

         -  CentOS / RHEL / Fedora:

            .. code-block:: console

               # service sshd start

         -  Ubuntu/Debian:

            .. code-block:: console

               # service ssh start

#. Test the connection from the Ansible server:

   .. code-block:: console

      # ssh <REMOTE_ENDPOINT_USERNAME>@<REMOTE_ENDPOINT_IP_ADDRESS>

   You should connect without being prompted for a password.

.. note::

   Repeat this procedure for each endpoint that Ansible will manage.

Managing Windows endpoints with Ansible
---------------------------------------

Windows endpoints are supported by Ansible from version 1.7 via the remote execution of PowerShell. As opposed to Linux endpoints, it is necessary to do some pre-work before being able to use Ansible on Windows endpoints. Please refer to the `Windows guide <https://docs.ansible.com/ansible/latest/user_guide/windows.html>`_ in the official documentation of Ansible.

Requirements
~~~~~~~~~~~~

The following minimum requirements should be met to use Ansible on Windows endpoints:

-  Supported Windows versions: Windows 7, 8.1, 10, Server 2008 (including R2), 2012 (including R2), 2016, 2019.

-  PowerShell 3.0 or later.

-  .NET Framework 4.0 or later.

-  A Windows Remote Management (WinRM) listener configured and running. Ansible communicates with Windows endpoints over WinRM HTTPS (port 5986).

.. note::

   Configuring WinRM over HTTPS requires a server authentication certificate. WinRM HTTPS cannot be enabled without a certificate. This guide uses a self-signed certificate, but certificates issued by a trusted Certificate Authority are recommended for production environments.

Configuring WinRM on Windows endpoints
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Run the following commands in PowerShell as Administrator on the Windows endpoint.

#. Verify the existing WinRM listeners. By default, only the HTTP listener (port 5985) is enabled:

   .. code-block:: powershell

      winrm enumerate winrm/config/Listener

   .. code-block:: none
      :class: output

      Listener
          Address = *
          Transport = HTTP
          Port = 5985
          Hostname
          Enabled = true
          URLPrefix = wsman
          CertificateThumbprint
          ListeningOn = 127.0.0.1, 172.31.78.21, ::1, fe80::dbdf:890c:7f17:b1f1%6

#. Obtain the hostname of the Windows endpoint:

   .. code-block:: powershell

      Write-Output $env:COMPUTERNAME

   .. code-block:: none
      :class: output

      Windows11

#. Create a self-signed certificate for the endpoint hostname:

   .. code-block:: powershell

      New-SelfSignedCertificate -DnsName "<DNS_NAME>" -CertStoreLocation Cert:\LocalMachine\My

   Replace ``<DNS_NAME>`` with the hostname obtained in the previous step, and note the certificate thumbprint returned.

   .. code-block:: none
      :class: output

      PSParentPath: Microsoft.PowerShell.Security\Certificate::LocalMachine\My

      Thumbprint                                Subject
      ----------                                -------
      DD8FA81230445C6AFB90B253BF996345E0ADF6FC  CN=EC2AMAZ-JNOKRGC

#. Create an HTTPS WinRM listener using the certificate thumbprint:

   .. code-block:: powershell

      winrm create winrm/config/Listener?Address=*+Transport=HTTPS '@{Hostname="<DNS_NAME>"; CertificateThumbprint="<CERTIFICATE_THUMBPRINT>"}'

   Replace:

   -  ``<DNS_NAME>`` with the Windows endpoint hostname obtained above.

   -  ``<CERTIFICATE_THUMBPRINT>`` with the thumbprint of the certificate.

#. Open port 5986 on the Windows firewall to allow WinRM HTTPS traffic:

   .. code-block:: powershell

      netsh advfirewall firewall add rule name="Windows Remote Management (HTTPS-In)" dir=in action=allow protocol=TCP localport=5986

#. Verify that the HTTPS listener is enabled:

   .. code-block:: powershell

      winrm enumerate winrm/config/Listener

   .. code-block:: none
      :class: output

      Listener
          Address = *
          Transport = HTTP
          Port = 5985
          Hostname
          Enabled = true
          URLPrefix = wsman
          CertificateThumbprint
          ListeningOn = 127.0.0.1, 172.31.78.21, ::1, fe80::dbdf:890c:7f17:b1f1%6

      Listener
          Address = *
          Transport = HTTPS
          Port = 5986
          Hostname = EC2AMAZ-JNOKRGC
          Enabled = true
          URLPrefix = wsman
          CertificateThumbprint = DD8FA81230445C6AFB90B253BF996345E0ADF6FC
          ListeningOn = 127.0.0.1, 172.31.78.21, ::1, fe80::dbdf:890c:7f17:b1f1%6

#. Enable Basic authentication if it is not enabled:

   .. code-block:: powershell

      Set-Item -Path WSMan:\localhost\Service\Auth\Basic -Value $true

   .. note::

      As an optional step, run the command below to remove the default HTTP listener to enforce secure communication:

      .. code-block:: powershell

         winrm delete winrm/config/Listener?Address=*+Transport=HTTP

      Basic authentication must be used only with HTTPS enabled. For production environments, we recommend more secure authentication methods such as Kerberos, NTLM or certificate-based authentication.

Adding endpoints to the inventory
---------------------------------

Define the remote endpoints that Ansible will manage by adding them to the inventory file ``/etc/ansible/hosts`` on the Ansible control server. You can group endpoints to run tasks and roles on multiple endpoints at once.

Below is an example of the content of the ``/etc/ansible/hosts`` inventory file on the Ansible control server:

.. code-block:: ini

   [linux_remote_endpoints]
   linux_remote_endpoint_1 ansible_host=<LINUX_REMOTE_ENDPOINT_1_IP_ADDRESS> ansible_ssh_user=<REMOTE_ENDPOINT_USERNAME>

   [windows_remote_endpoints]
   windows_remote_endpoint_1 ansible_host=<WINDOWS_REMOTE_ENDPOINT_1_IP_ADDRESS> ansible_user=<REMOTE_ENDPOINT_USERNAME> ansible_password=<PASSWORD> ansible_connection=winrm ansible_port=5986 ansible_winrm_transport=basic ansible_winrm_server_cert_validation=ignore

Where:

-  ``[linux_remote_endpoints]`` and ``[windows_remote_endpoints]`` are the group names for managing the remote Linux and Windows endpoints.

-  ``linux_remote_endpoint_1`` and ``windows_remote_endpoint_1`` are logical hostnames used by Ansible to identify the Linux or Windows remote endpoints. This name does not need to match the DNS hostname of the Linux or Windows endpoint.

-  ``ansible_ssh_user`` specifies the remote user account Ansible uses to connect over SSH.

-  ``ansible_host`` specifies the IP address or DNS hostname of the Linux or Windows endpoint.

-  ``ansible_user`` defines the Windows user account Ansible uses to authenticate to the endpoint. The account should have administrative privileges on the Windows endpoint.

-  ``ansible_password`` specifies the password for the Windows user account.

-  ``ansible_connection=winrm`` instructs Ansible to use Windows Remote Management (WinRM) to communicate with the Windows endpoint.

-  ``ansible_port`` specifies the WinRM HTTPS port used for secure communication.

-  ``ansible_winrm_transport`` configures Ansible to use Basic authentication for WinRM connections. Basic authentication requires HTTPS to protect credentials in transit.

-  ``ansible_winrm_server_cert_validation=ignore`` disable server certificate validation. This is required when WinRM HTTPS is configured with a self-signed certificate that is not trusted by the Ansible control node.

.. note::

   On systems such as Ubuntu 18 and Debian, Ansible may not detect the default Python path. Use the ``ansible_python_interpreter`` variable to set the correct path. If this happens, add the following line to the ansible host file:

   ``ansible_python_interpreter=/usr/bin/python3``

   You can check the `Ansible inventory documentation <http://docs.ansible.com/ansible/intro_inventory.html>`_ for more info regarding hosts and groups.

Testing the Ansible connection to remote endpoints
--------------------------------------------------

You can verify Ansible connectivity to remote endpoints before deploying Wazuh components.

Linux endpoints
###############

Perform the following steps using the ``ping`` module to confirm that the Ansible control server can connect to Linux endpoints over SSH:

#. Test the connection with the ping module:

   .. code-block:: console

      # ansible all -m ping

   The expected output is:

   .. code-block:: none
      :class: output

      linux_remote_endpoint_1 | SUCCESS => {
          "changed": false,
          "ping": "pong"
      }

Windows endpoints
#################

Perform the following steps using the ``win_ping`` module to confirm that the Ansible control server can connect to Windows endpoints over WinRM:

#. Test the connection:

   .. code-block:: console

      ansible windows_remote_endpoints -m win_ping

   The expected output is:

   .. code-block:: none
      :class: output

      windows_remote_endpoint_1 | SUCCESS => {
          "changed": false,
          "ping": "pong"
      }
