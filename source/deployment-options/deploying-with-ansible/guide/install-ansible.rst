.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how to install the Ansible server in this section of the Wazuh documentation. Check out this step-by-step guide.

Installing Ansible
==================

Install Ansible on a single control server. From this server, Ansible connects to remote endpoints and runs playbooks to deploy or configure Wazuh components.

Perform the following to install Ansible:

.. contents::
   :local:
   :depth: 1
   :backlinks: none

Installation on CentOS/RHEL/Fedora
----------------------------------

.. tabs::

   .. tab:: CentOS/RHEL 7 and Fedora

      #. Install the EPEL repository:

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

         .. note::

            You have to create the default configuration file ``/etc/ansible/ansible.cfg`` and ``/etc/ansible/hosts`` inventory file if they are not created automatically. Please follow the steps below:

            #. Create the ``/etc/ansible/ansible.cfg`` config file.

               .. code-block:: console

                  # sudo mkdir -p /etc/ansible
                  # sudo touch /etc/ansible/ansible.cfg

            #. Edit ``/etc/ansible/ansible.cfg`` and add the following content.

               .. code-block:: ini

                  [defaults]
                  inventory = /etc/ansible/hosts
                  host_key_checking = False

Installation on Debian/Ubuntu
-----------------------------

#. Update the repositories and install required dependencies:

   .. code-block:: console

      # apt-get update

#. Setup Ansible repository:

   .. tabs::

      .. tab:: Ubuntu

         .. code-block:: console

            # apt-get install lsb-release software-properties-common
            # apt-add-repository -y ppa:ansible/ansible
            # apt-get update

      .. tab:: Debian

         .. code-block:: console

            # sudo apt-get install -y curl gnupg lsb-release
            # curl -fsSL "https://keyserver.ubuntu.com/pks/lookup?op=get&search=0x93C4A3FD7BB9C367" | sudo gpg --dearmor -o /usr/share/keyrings/ansible.gpg
            # echo "deb [signed-by=/usr/share/keyrings/ansible.gpg] http://ppa.launchpad.net/ansible/ansible/ubuntu trusty main" | \
            sudo tee /etc/apt/sources.list.d/ansible.list
            # sudo apt-get update

#. Install Ansible:

   .. code-block:: console

      # apt-get install ansible
