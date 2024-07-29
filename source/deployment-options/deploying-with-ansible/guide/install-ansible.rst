.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how to install the Ansible server in this section of the Wazuh documentation. Check out this step-by-step guide.

Install Ansible
===============

In this section, we will proceed to install the Ansible server. To be able to deploy using Ansible, we need to have the tool installed on a single server. From this control server, Ansible will access other endpoints and execute the playbooks configured for any type of deployment or installation.

In the example we will follow in this guide, we have the following infrastructure.

-  Ansible server
-  Wazuh server
-  Wazuh agent

.. note::

   OpenSSH Compatibility: Ansible version 1.3 and later uses native OpenSSH for remote communication.

.. contents::
   :local:
   :depth: 1
   :backlinks: none

Installation on CentOS/RHEL/Fedora
----------------------------------

.. tabs::

   .. tab:: CentOS/RHEL 7 and Fedora

      #. Install the `EPEL <http://fedoraproject.org/wiki/EPEL>`__ repository:

         .. code-block:: console
         
            # yum -y install epel-release

      #. Install Ansible:

         .. code-block:: console
         
            # yum install ansible


   .. tab:: CentOS/RHEL 8

      #. Install Ansible using pip.

         .. code-block:: console
         
            # pip3 install --upgrade --ignore-installed pip setuptools --user
            # python3 -m pip install --user ansible

Installation on Debian/Ubuntu
-----------------------------

For Debian and Ubuntu, we will use the Ansible PPA repository. The steps are as follows:

#. Install required dependencies:

   .. code-block:: console

      # apt-get update
      # apt-get install lsb-release software-properties-common

#. Setup ansible repository:

   .. tabs::

      .. tab:: Ubuntu

         .. code-block:: console

            # apt-add-repository -y ppa:ansible/ansible
            # apt-get update

      .. tab:: Debian

         While Ansible is available from the main Debian repository, it can be out of date.

         To get a more recent version, Debian users can use the Ubuntu PPA according to the following table:

         +----------------------+-----------------------+-----------------+
         | Debian               | Ubuntu                | UBUNTU_CODENAME |
         +======================+=======================+=================+
         | Debian 12 (Bookworm) | Ubuntu 22.04 (Jammy)  | jammy           |
         +----------------------+-----------------------+-----------------+
         | Debian 11 (Bullseye) | Ubuntu 20.04 (Focal)  | focal           |
         +----------------------+-----------------------+-----------------+
         | Debian 10 (Buster)   | Ubuntu 18.04 (Bionic) | bionic          |
         +----------------------+-----------------------+-----------------+

         In the following example, we assume that you have wget and gpg already installed (sudo apt install wget gpg).

         Set UBUNTU_CODENAME=... based on the table above (we use jammy in this example)

         .. code-block:: console

            # UBUNTU_CODENAME=jammy
            # echo "deb http://ppa.launchpad.net/ansible/ansible/ubuntu $UBUNTU_CODENAME main" | sudo tee -a /etc/apt/sources.list.d/ansible-debian.list
            # apt-key adv --keyserver keyserver.ubuntu.com --recv-keys 93C4A3FD7BB9C367
            # apt-get update

In Debian installation, Previously, you may have used apt-key add. This is now deprecated for security reasons (on Debian, Ubuntu, and elsewhere). Also note that, for security reasons, we do NOT add the key to /etc/apt/trusted.gpg.d/ nor to /etc/apt/trusted.gpg where it would be allowed to sign releases from ANY repository

#. Finally, install ansible:

   .. code-block:: console

      # apt-get install ansible

Remote Connection
-----------------

Ansible is an agentless automation platform. Hence, it relies on SSH connections to make deployments to remote endpoints. These connections can be made from the Ansible server using SSH key-pairing.

Configuring SSH key-pairing
~~~~~~~~~~~~~~~~~~~~~~~~~~~

Our Ansible server will need to connect to the other endpoints. Let’s see how to make this connection between our ansible server and the machine where we will install the Wazuh server. This procedure has to be repeated for each machine we want to connect to the Ansible server. For example, the endpoints where Wazuh agents will be deployed.

#. The first step is to generate the SSH authentication key pair for the root user of the Ansible server using the ssh-keygen tool.

   #. Switch to root and navigate to the $HOME directory of the Ansible server.

      .. code-block:: console

         $ sudo su
         # cd ~

   #. Generate an authentication key pair for SSH. If you wish to, you can include a passphrase.

      .. code-block:: console

         # ssh-keygen

   #. Check the permissions of the generated keys.

      .. code-block:: console

         # ls -la ~/.ssh

      ``id_rsa`` must have restrictive permissions (600 or “- r w - - - - - - -“).

      .. code-block:: none
         :class: output

         drwx------. 2 root root   57 Mar 18 10:06 .
         dr-xr-x---. 5 root root  210 Mar 18 08:44 ..
         -rw-------. 1 root root 1675 Mar 18 12:34 id_rsa
         -rw-r--r--. 1 root root  408 Mar 18 12:34 id_rsa.pub
         -rw-r--r--. 1 root root  175 Mar 18 10:14 known_hosts

      In addition, the ``/root/.ssh/`` directory must have its permissions set to ``700 (d r w x - - - - - -)``. The permissions can be set using the command below:

      .. code-block:: console

         # chmod 700 ~/.ssh/

#. Now, proceed to copy the public key of the Ansible server to the  ~/.ssh/authorized_keys file in the $HOME directory of the remote system (the Wazuh server in this example).

   #. On the remote system, install openssh-server if it is not installed.

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

            .. code-block:: console

               # systemctl start sshd

         .. group-tab:: SysV init

            .. code-block:: console

               # service sshd start

   #. Move to the $HOME directory of the remote system.

      .. code-block:: console

         $ cd ~

   #. Check for the ``.ssh`` directory. If it does not exist, create the ``.ssh`` directory and assign the appropriate permissions to it:

      .. code-block:: console

         $ mkdir .ssh
         $ chmod 700 .ssh/

   #. If the ``authorized_keys`` file does not exist in the ``.ssh/`` directory, create it with the appropriate permissions, otherwise public key authentication will not work properly:

      .. code-block:: console

         $ touch .ssh/authorized_keys
         $ chmod 644 .ssh/authorized_keys

#. Return to the Ansible server and add the public key (``id_rsa.pub``) of the Ansible server to the ``~/.ssh/authorized_keys`` file in the $HOME directory of the Wazuh server using SSH.


   #. From the Ansible server, run the following command. Using this command will prompt you for the password of the user you are connecting with:

      .. code-block:: console

         # cat ~/.ssh/id_rsa.pub | ssh <USERNAME>@<REMOTE_SERVER_IP_ADDRESS> "cat >> ~/.ssh/authorized_keys"

   #. When we read the Wazuh server ``~/.ssh/authorized_keys``, we can see it contains the public key of the ansible server.

      .. code-block:: console

         $ cat .ssh/authorized_keys

#. Before the public key authentication mechanism can be tested, we have to verify that the SSH configuration on the remote endpoint allows it. To do this, open the file ``/etc/ssh/sshd_config`` on the Wazuh server.

   .. code-block:: console

      # vi /etc/ssh/sshd_config

   #. Check that the following lines are uncommented:

      | ``PubkeyAuthentication yes``
      | ``AuthorizedKeysFile .ssh/authorized_keys``

   #. Restart the ssh service.

      .. tabs::

         .. group-tab:: Systemd

            .. code-block:: console

               # systemctl restart sshd

         .. group-tab:: SysV init

            .. code-block:: console

               # service sshd restart

   #. Verify that the authentication with the public key works. Test from the Ansible server.

      .. code-block:: console

         # ssh <USERNAME>@<REMOTE_SERVER_IP_ADDRESS>

      It is expected that we will gain access without having to enter a password.

Windows endpoints
-----------------

Windows endpoints are supported by Ansible from version 1.7 via the remote execution of PowerShell. As opposed to Linux endpoints, it is necessary to do some pre-work before being able to use Ansible on Windows endpoints. Please refer to the `Windows Guide <https://docs.ansible.com/ansible/latest/user_guide/windows.html>`_ in the official documentation of Ansible.

The following minimum requirements should be met to use Ansible on Windows endpoints:

-  Windows versions under current and extended support from Microsoft. Ansible can manage desktop OSs including Windows 7, 8.1, and 10, and server OSs including Windows Server 2008, 2008 R2, 2012, 2012 R2, 2016, and 2019.
-  PowerShell 3.0 or newer.
-  At least .NET version 4.0 should be installed on the Windows endpoint.
-  A WinRM listener should be created and activated.

Before deploying on your Windows endpoints, you must set Ansible to use port ``5986`` . Edit the ``/etc/ansible/hosts`` file and add a configuration block for the Windows agents. For example:

.. code-block:: ini

   [windows_agents]
   agent1 ansible_host=<WAZUH_AGENT_1_IP_ADDRESS> ansible_port=5986
   agent2 ansible_host=<WAZUH_AGENT_2_IP_ADDRESS> ansible_port=5986
   agent3 ansible_host=<WAZUH_AGENT_3_IP_ADDRESS> ansible_port=5986

Where:

-  ``windows_agents`` is a host group name for the Windows agents.
-  ``agent1``, ``agent2``, and ``agent3`` are names for each host.

Make sure to replace these values with your Windows agents actual data. Add and remove lines accordingly.

Testing the Ansible connection to remote endpoints
--------------------------------------------------

#. Add endpoints for management by Ansible.

   This is done by including the hostname or IP Address in ``/etc/ansible/hosts`` on our Ansible server. In this case, we intend to use the Ansible playbooks to deploy the Wazuh indexer, dashboard, and manager on one server (all-in-one deployment).

   We proceed to add the following entry to the ``/etc/ansible/hosts`` file:

   .. code-block:: none

      [all_in_one]
      <REMOTE_SERVER_IP_ADDRESS> ansible_ssh_user=<USERNAME>

   .. note::
     :class: long

      Python 3 usage: In some systems, such as Ubuntu 18, we may have problems with the use of Python interpreter due to its version and the default path where Ansible checks for it. If this happens, we must add  the following line to the Ansible host file:

      ``<ENDPOINT_IP_ADDRESS> ansible_ssh_user=<SSH_USER>``

      ``ansible_python_interpreter=/usr/bin/python3``

#. Attempt a connection with the remote endpoints using the ping module.

   .. code-block:: console

      # ansible all -m ping

   The expected output is:

   .. code-block:: none
      :class: output

      <REMOTE_SERVER_IP_ADDRESS> | SUCCESS => {
          "changed": false,
          "ping": "pong"
      }

This way, we confirm that the Ansible server reaches the remote system.

Playbooks and Roles
-------------------

We can obtain the necessary playbooks and roles for the installation of the Wazuh server components,  and Wazuh agents by cloning the wazuh-ansible repository in ``/etc/ansible/roles``.

On the Ansible server, the following commands are run:

.. code-block:: console

   # cd /etc/ansible/roles/
   # sudo git clone --branch v|WAZUH_CURRENT_ANSIBLE| https://github.com/wazuh/wazuh-ansible.git
   # ls

.. code-block:: none
	:class: output

	wazuh-ansible
