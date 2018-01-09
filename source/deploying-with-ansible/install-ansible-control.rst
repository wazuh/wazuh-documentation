.. _setup_ansible_control:

Install Ansible
============================

OpenSSH Compatibility
------------------------------

Ansible version 1.3 and later uses native OpenSSH for remote communication and, also, uses ControlPersist, a feature available for OpenSSH v5.6. This will increase performance by speeding up SSH Session Creation, which is very useful for Ansible. Otherwise, you will need to consider to setup `Accelerated Mode <http://docs.ansible.com/ansible/playbooks_acceleration.html>`_ on Ansible.

Windows hosts
------------------

Windows hosts are supported by Ansible from version 1.7 via the remote execution of PowerShell. As opposed to Linux hosts, it is necessary to do some pre-work before being able to use Ansible in Windows hosts. Please refer to `Windows Support <http://docs.ansible.com/ansible/latest/intro_windows.html#windows-support>`_ on Ansible official documentation. Consider the following minimum requirements:

* `Pywinrm <https://pypi.python.org/pypi/pywinrm>`_ version 0.2.2 or later is required for Ansible control machine.
* PowerShell 3.0 or later is required to be able to run Ansible modules on Windows hosts.

Installation on CentOS/RHEL/Fedora
------------------------------------

Install using yum from `EPEL <http://fedoraproject.org/wiki/EPEL>`_. Only CentOS/RedHat version 6 or 7, and Fedora distrutions, are currently supported. Follow the next steps:

1. Install EPEL repository:

.. code-block:: console

    # yum -y install epel-release

2. Install ansible:

.. code-block:: console

    # yum install ansible

Installation on Debian/Ubuntu
------------------------------

For Debian and Ubuntu we will use the Ansible PPA repository. Follow the next steps:

1. Install required dependencies:

.. code-block:: console

  	# apt-get update
  	# apt-get install lsb-release software-properties-common

2. Setup ansible repository:

  a. For Ubuntu:

  .. code-block:: console

      # apt-add-repository -y ppa:ansible/ansible
      # apt-get update

  b. For Debian:

  .. code-block:: console

      # echo "deb http://ppa.launchpad.net/ansible/ansible/ubuntu trusty main" | sudo tee -a /etc/apt/sources.list.d/ansible-debian.list
      apt-key adv --keyserver keyserver.ubuntu.com --recv-keys 93C4A3FD7BB9C367
      apt-get update

3. Finally, install ansible:

.. code-block:: console

    # apt-get install ansible
