.. _setup_ansible_control:

Install Ansible
============================

OpenSSH Compatibility
------------------------------

Ansible version 1.3 and later use native OpenSSH for remote communication and also use ControlPersist a feature available from OpenSSH v5.6. This will increase performance by speeding up SSH Session Creation what is useful for Ansible. Otherwise, you will need to consider the setup `Accelerated Mode <http://docs.ansible.com/ansible/playbooks_acceleration.html>`_ on Ansible.

Windows hosts
------------------

Windows hosts support is included in Ansible from version 1.7, this is done via the remote execution of PowerShell. Is necessary to make prior tasks before using Ansible in Windows hosts, please refer to `Windows Support <http://docs.ansible.com/ansible/latest/intro_windows.html#windows-support>`_ on Ansible official documentation. Consider the following minimal requirements:

* `Pywinrm <https://pypi.python.org/pypi/pywinrm>`_ version 0.2.2 or later is required in Ansible control machine.
* PowerShell 3.0 or later must be present to run Ansible modules on Windows hosts.

Installation on CentOS/RHEL/Fedora
------------------------------------

Install using yum from `EPEL <http://fedoraproject.org/wiki/EPEL>`_, only 6,7 CentOS/RedHat version and Fedora distrutions are currently supported, follow the next steps:

1. Install EPEL repository:

.. code-block:: bash

    $ sudo yum -y install epel-release

2. Install ansible:

.. code-block:: bash

    $ sudo yum install ansible

Installation on Debian/Ubuntu
------------------------------

For Debian and Ubuntu we will use the ansible PPA repository, follow the next steps:

1. Install required dependencies:

.. code-block:: bash

  	$ sudo apt-get update
  	$ sudo apt-get install lsb-release software-properties-common

2. Setup ansible repository:

  a. For Ubuntu:

  .. code-block:: bash

      sudo apt-add-repository -y ppa:ansible/ansible
      sudo apt-get update

  b. For Debian:

  .. code-block:: bash

      echo "deb http://ppa.launchpad.net/ansible/ansible/ubuntu trusty main" | sudo tee -a /etc/apt/sources.list.d/ansible-debian.list
      sudo apt-key adv --keyserver keyserver.ubuntu.com --recv-keys 93C4A3FD7BB9C367
      sudo apt-get update

3. Finally, install ansible:

.. code-block:: bash

    $ sudo apt-get install ansible
