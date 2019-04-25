.. Copyright (C) 2019 Wazuh, Inc.

.. _wazuh_ansible_installation:

Install Ansible
===============

In this section we will proceed to install the Ansible server. To be able to deploy using Ansible we only need to have the tool installed on a single server. From this control server, Ansible will access the other servers and execute the playbooks configured for any type of deployment or installation. It is only necessary to have a server with Ansible installed.

In the example we will follow in this guide, we will have the following infrastructure.

- Ansible server.
- Wazuh server.
- Elastic Stack server.
- Wazuh agent.

.. note:: OpenSSH Compatibility

	Ansible version 1.3 and later uses native OpenSSH for remote communication.


- `Windows hosts`_
- `Installation on CentOS/RHEL/Fedora`_
- `Installation on Debian/Ubuntu`_
- `Remote Connection`_
- `Test Connection`_
- `Playbooks and Roles`_

Windows hosts
-------------

Windows hosts are supported by Ansible from version 1.7 via the remote execution of PowerShell. As opposed to Linux hosts, it is necessary to do some pre-work before being able to use Ansible in Windows hosts. Please refer to `Windows Guide <https://docs.ansible.com/ansible/latest/user_guide/windows.html>`_ on Ansible official documentation. Consider the following minimum requirements:

Installation on CentOS/RHEL/Fedora
----------------------------------

Install using yum from `EPEL <http://fedoraproject.org/wiki/EPEL>`_. Only CentOS/RedHat version 6 or 7, and Fedora distributions, are currently supported. Follow the next steps:

1 - Install EPEL repository:

.. code-block:: console

    # yum -y install epel-release

2 - Install ansible:

.. code-block:: console

    # yum install ansible

Installation on Debian/Ubuntu
-----------------------------

For Debian and Ubuntu we will use the Ansible PPA repository. Follow the next steps:

1 - Install required dependencies:

.. code-block:: console

  	# apt-get update
  	# apt-get install lsb-release software-properties-common

2 - Setup ansible repository:

  a. For Ubuntu:

  .. code-block:: console

      # apt-add-repository -y ppa:ansible/ansible
      # apt-get update

  b. For Debian:

  .. code-block:: console

      # echo "deb http://ppa.launchpad.net/ansible/ansible/ubuntu trusty main" | sudo tee -a /etc/apt/sources.list.d/ansible-debian.list
      apt-key adv --keyserver keyserver.ubuntu.com --recv-keys 93C4A3FD7BB9C367
      apt-get update

3 - Finally, install ansible:

.. code-block:: console

    # apt-get install ansible

Remote Connection
-----------------

Ansible was born with the idea to be an agentless automation platform. Ansible relies on SSH the connection to remote hosts, meaning that, you can connect to remote hosts as SSH does. We can make the connection using ssh key-pairing.

Using SSH key-pairing
~~~~~~~~~~~~~~~~~~~~~

Our Ansible server will need to connect to the other systems. Let's see how to make the connection for example with the machine where we will install the Wazuh server. We will have to repeat this procedure for each machine that we want to connect to the Ansible server, as for example the machines of the ELK server and the machines of the Wazuh agents.

1 - The first step is to generate the SSH authentication key pair for the Ansible server using the ssh-keygen tool. SSH implements public key authentication using RSA or DSA. Version 1 of the SSH protocol only supports RSA, while version 2 supports both systems.

1.1 - Move to the $HOME directory of Ansible server.

.. code-block:: console

		ansible@ansible:~$ cd

1.2 - Generate authentication key pair for SSH.

.. code-block:: console

	ansible@ansible:~$ ssh-keygen
	Generating public/private rsa key pair.
	Enter file in which to save the key (/home/ansible/.ssh/id_rsa):
	Enter passphrase (empty for no passphrase):
	Enter same passphrase again:
	Your identification has been saved in /home/ansible/.ssh/id_rsa.
	Your public key has been saved in /home/ansible/.ssh/id_rsa.pub.
	The key fingerprint is:
	SHA256:Z2nkI+fOVMa21NxP8YZaKpQWFqbm4cnAKXZezkuG/0g ansible@ansible
	The key's randomart image is:
	+---[RSA 2048]----+
	|          o      |
	|     . . o .     |
	|    o = = +    . |
	|   . + @ * = o oo|
	|      o S % * = =|
	|       + @ * = o.|
	|        E + +   .|
	|       . * .     |
	|        . +      |
	+----[SHA256]-----+

	If you wish you can include a passphrase.

1.3 - Check the permissions of the generated keys.

- ``id_rsa`` must have restrictive permits (600 or "- r w - - - - - - -").

.. code-block:: console

	drwx------  2 ansible ansible 4,0K sep 12 13:37 .
	-rw-------  1 ansible ansible 1,7K sep 12 13:37 id_rsa
	-rw-r--r--  1 ansible ansible  397 sep 12 13:37 id_rsa.pub
	drwxr-xr-x 15 ansible ansible 4,0K sep 12 13:32 ..

- In addition, the ``/home/ansible/.ssh/`` directory must have the entry permissions at 700 (d r w x - - - - - -), as we can see.

2 - Now it is necessary to copy the public key of the Ansible server to the file ~/.ssh/authorized_keys in the $HOME directory of the remote system (Wazuh server in this example).

2.1 - We install openssh-server if we do not have it installed.

- CentOS/RHEL/Fedora

.. code-block:: console

	# yum install openssh-server

- Ubuntu/Debian

.. code-block:: console

	# apt-get install openssh-server

Starting the service.

	a. For Systemd:

	.. code-block:: console

		# systemctl start sshd

	b. For SysV Init:

	.. code-block:: console

		# service sshd start

2.2 - Move to the $HOME directory of remote system.

.. code-block:: console

	[centos@localhost ~]$ cd

2.3 - If it does not exist, create the ``.ssh`` directory and assign the appropriate permissions to it:

.. code-block:: console

	[centos@localhost ~]$ mkdir .ssh
	[centos@localhost ~]$ chmod 700 .ssh/

2.4 - If the ``.ssh/authorized_keys`` file does not exist, create it with the appropriate permissions, otherwise public key authentication will not work properly:

.. code-block:: console

	[centos@localhost ~]$ touch .ssh/authorized_keys
	[centos@localhost ~]$ chmod 644 .ssh/authorized_keys

Check the permissions.

.. code-block:: console

	[centos@localhost ~]$ ls -lath .ssh/
	total 4,0K
	drwx------.  2 centos centos   29 sep 12 14:07 .
	-rw-r--r--.  1 centos centos    0 sep 12 14:07 authorized_keys
	drwx------. 15 centos centos 4,0K sep 12 14:03 ..


3 - Return to the Ansible server and concatenate the public key to the ``~/.ssh/authorized_keys`` file in the $HOME of Wazuh server using SSH

3.1 - From Ansible server.

.. code-block:: console

	ansible@ansible:~$ cat .ssh/id_rsa.pub | ssh centos@192.168.0.180 "cat >> .ssh/authorized_keys"
	centos@192.168.0.180's password:

We could see the authorized_keys content.

.. code-block:: console

	[centos@localhost ~]$ cat .ssh/authorized_keys
	ssh-rsa AAA...60V ansible@ansible

4 - Before the public key authentication mechanism can be tested, it is necessary to verify that the SSH server allows it. To do this, open the file ``/etc/ssh/sshd_config`` in Wazuh server.

.. code-block:: console

	[centos@localhost ~]$ sudo vi /etc/ssh/sshd_config

4.1 - Check that the following lines are uncommented:

	- ``PubkeyAuthentication yes``
	- ``AuthorizedKeysFile .ssh/authorized_keys``

4.2 - If RSA keys are used instead of DSA, it will also be necessary to uncomment the following line if it exists.

	- ``RSAAuthentication yes``

4.3 - Restart the ssh service.


	a. For Systemd:

	.. code-block:: console

		# systemctl restart sshd

	b. For SysV Init:

	.. code-block:: console

		# service sshd restart

5 - Verify authentication with public key.

5.1 - From Ansible server.

.. code-block:: console

	ansible@ansible:~$ ssh centos@192.168.0.180
	Last login: Wed Sep 12 13:57:48 2018 from 192.168.0.107

As we can see, we access without having to enter any password.

Test Connection
---------------

1 - Add hosts to control

Adding hosts is easy, just put the hostname or IP Address on ``/etc/ansible/hosts`` in our Ansible server. Our Wazuh server Ip is ``192.168.0.180`` and the user is ``centos`` in this example. We have to add ``192.168.0.180 ansible_ssh_user=centos``.

.. code-block:: yaml

	# This is the default ansible 'hosts' file.
	#
	# It should live in /etc/ansible/hosts
	#
	#   - Comments begin with the '#' character
	#   - Blank lines are ignored
	#   - Groups of hosts are delimited by [header] elements
	#   - You can enter hostnames or ip addresses
	#   - A hostname/ip can be a member of multiple groups

	# Ex 1: Ungrouped hosts, specify before any group headers.

	## green.example.com
	## blue.example.com
	## 192.168.100.1
	## 192.168.100.10

	# Ex 2: A collection of hosts belonging to the 'webservers' group

	## [webservers]
	## alpha.example.org
	## beta.example.org
	## 192.168.1.100
	## 192.168.1.110

	# If you have multiple hosts following a pattern you can specify
	# them like this:

	## www[001:006].example.com

	# Ex 3: A collection of database servers in the 'dbservers' group

	## [dbservers]
	##
	## db01.intranet.mydomain.net
	## db02.intranet.mydomain.net
	## 10.25.1.56
	## 10.25.1.57

	# Here's another example of host ranges, this time there are no
	# leading 0s:

	## db-[99:101]-node.example.com

	192.168.0.180 ansible_ssh_user=centos

.. note:: Python 3

	In some systems, such as Ubuntu 18, we may have problems with the use of Python interpreter due to its version and the path that Ansible has to follow for its use. If this happens, we must add to the host side the following line:

	 - 192.168.0.181  ansible_ssh_user=ubuntu   **ansible_python_interpreter=/usr/bin/python3**


2 - This will attempt a connection with the remote hosts using ping module.

.. code-block:: console

	ansible@ansible:~$ ansible all -m ping

You will get a output like this:

.. code-block:: console

	192.168.0.180 | SUCCESS => {
	    "changed": false,
	    "ping": "pong"
	}


This way we will know that Ansible server reaches the remote system (Wazuh server).

Playbooks and Roles
-------------------

We can obtain the necessary palybooks and roles for the installation of the Wazuh server components, Elastic Stack components and Wazuh agents cloning the repository in ``/etc/ansible/roles``.

From Ansible server.

.. code-block:: console

	ansible@ansible:~$ cd /etc/ansible/roles/
	ansible@ansible:/etc/ansible/roles$ sudo git clone --branch v3.8.2_6.5.4 https://github.com/wazuh/wazuh-ansible.git
	ansible@ansible:/etc/ansible/roles$ ls
	wazuh-ansible
