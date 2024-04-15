.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :Description: Ansible is an agentless automation platform. Learn more about remote endpoints deployments in this section of the Wazuh documentation.
  
Remote endpoints connection
===========================

Ansible is an agentless automation platform. Hence, it relies on SSH connections to make deployments to remote endpoints. We briefly explain two (2) methods SSH connections can be made from the Ansible server below.

.. note::

   We recommend the :doc:`passwords </deployment-options/deploying-with-ansible/setup-remote-systems>` method, to avoid sharing your public SSH Key among several hosts.

.. _ansible_connection_passwords:

Using passwords
---------------

Ansible does most of the work via SSH, and uses SSH authentication mechanisms. In order to establish a connection with remote endpoints, a username/password must be supplied. The following is a description of some useful options that can be used for SSH authentication with passwords in ansible:

.. code-block:: none
   :class: output

   -u <user>   Set the connection user.
   -k          Ask the password of the connection user.
   -b          Execute task and operations with a privilege user.
   -K          Ask for sudo password, intended for privilege escalation.

You can use the above arguments as follows:

.. code-block:: console

   # ansible -m setup all -u foo -k -b -K

This will set the connection user as ``foo``. Also, it will ask for the connection user password and privileged user password.

Using SSH key-pairing
---------------------

You can set up an SSH key-pair to provide a passwordless authentication mechanism. First, create an OpenSSH key-pair on the Ansible server:

.. code-block:: console

   # ssh-keygen

.. note::
  
   -  To improve security on this setup, please ensure you provide a passphrase for this key.
   -  Using ssh-agent, we can avoid repeatedly asking for the key password on every Ansible deployment. Ssh-agent will cache the key to be used in further actions, until you log out.

Adding the public key to remote systems
---------------------------------------

After creating the Ansible server key-pair, you need to add the public key to all remote endpoints to be managed. This can be done by following the steps below:

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

#. Check the permissions of the files in ``.ssh/``.

   .. code-block:: console
    
      $ ls -lath .ssh/

#. Return to the Ansible server and add the public key (``id_rsa.pub``) of the Ansible server to the ``~/.ssh/authorized_keys`` file in the $HOME directory of the remote system using SSH. From the Ansible server, run the following command:

   .. code-block:: console

      # cat ~/.ssh/id_rsa.pub | ssh centos@192.168.33.31 "cat >> ~/.ssh/authorized_keys"

#. When we read the remote endpoint ``~/.ssh/authorized_keys``, we can see it contains the public key of the ansible server.

   .. code-block:: console

      $ cat ~/.ssh/authorized_keys

Ensure you know the user to store ``authorized_keys``, this will be the user you use for any action via Ansible. Also, the user should be a ``sudo`` user.

Add endpoints for management
----------------------------

This can be done by including the hostname or IP Address of the target endpoint in ``/etc/ansible/hosts``. Endpoints can also be grouped. This is useful for executing tasks and roles to several endpoints at once:

.. code-block:: console

   # cat /etc/ansible/hosts

.. code-block:: none
   :class: output

   [wazuh-agents]
   hosts1.example.net
   hosts2.example.net

.. note::

   You can check the `Ansible inventory documentation <http://docs.ansible.com/ansible/intro_inventory.html>`_ for more info regarding hosts and groups.

Testing the connection to remote endpoints
------------------------------------------

We can attempt to verify the connection with the remote endpoints using the ``ping`` module.

.. code-block:: console

   # ansible all -m ping

You will get an output like this.

.. code-block:: none
   :class: output

   hosts1.example.net | SUCCESS => {
     "changed": false,
     "ping": "pong"
   }
   hosts2.example.net | SUCCESS => {
     "changed": false,
     "ping": "pong"
   }

If you see the above, then Ansible is fully usable.

Windows authentication
----------------------

Windows hosts use a different mechanism to perform authentication. Please refer to `Authentication Options <http://docs.ansible.com/ansible/latest/intro_windows.html#authentication-options>`_ in the Ansible documentation order to set up the adequate option.
