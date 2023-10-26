.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: The Wazuh FIM module monitors directories to detect file changes, additions, and deletions. Discover some FIM use cases in this section of our documentation. 
  
Detecting account manipulation
==============================

Account manipulation refers to the creation, modification, or deletion of user accounts or other credentials within an organization's IT infrastructure. Monitoring this activity is critical to the cybersecurity of an organization. Unauthorized account manipulations might grant an attacker access to sensitive systems and data. 

To maintain persistence on a victim endpoint, adversaries can alter the SSH ``authorized_keys`` file in Linux. The ``.ssh`` directory within a user home directory holds this file. For example, for a user named smith, you can find the ``authorized_keys`` file located at ``/home/smith/.ssh/authorized_keys``. This file defines the public keys this user uses to login into some of their accounts. Each line in the file represents a single public key.

You can configure the Wazuh FIM module to monitor the ``authorized_keys`` file. This triggers an alert whenever a user or process modifies the public keys in the file. Detecting the modification of the SSH keys allows you to take action before a system compromise occurs.

Use case description
--------------------

  +---------------------+-----------------------------------------------------------------------------------------------+
  | Endpoint            | Description                                                                                   |
  +=====================+===============================================================================================+
  | Ubuntu 20.04        | The FIM module detects SSH key modification on this endpoint.                                 |                                                                                                                               
  +---------------------+-----------------------------------------------------------------------------------------------+

Configuration
-------------

Perform the following steps to configure the FIM module to monitor SSH key modification.

#. Edit the ``/var/ossec/etc/ossec.conf`` configuration file and add ``authorized_keys`` for monitoring:

   .. code-block:: xml

      <syscheck>
        <directories whodata="yes">/home/*/.ssh/authorized_keys</directories>
      </syscheck>

#. Restart the Wazuh agent to apply the configuration:

   .. code-block:: console

      systemctl restart wazuh-agent

Test the configuration
----------------------

#. Generate an SSH key-pair for user authentication and save it as ``.ssh/test_key`` using the following command:

   .. code-block:: console

      ssh-keygen -f .ssh/test_key

#. Run the following command to copy the content of the generated SSH public key ``test_key.pub`` and add it to the ``authorized_keys`` file in the target Ubuntu user ``.ssh`` directory:

   .. code-block:: console

      cat ~/.ssh/test_key.pub | ssh <UBUNTU_USER>@<UBUNTU_IP> "sudo tee -a /home/<UBUNTU_USER>/.ssh/authorized_keys"

Replace ``<UBUNTU_USER>`` and ``<UBUNTU_IP>`` with the user and IP address for your Ubuntu endpoint respectively.

Visualize the alert
-------------------

Navigate to **File integrity monitoring** on the Wazuh dashboard to view the alert generated when the FIM module detects changes to the ``authorized_keys`` file.

.. thumbnail:: /images/manual/fim/changes-windows-authorized-keys-file.png
  :title: Changes to the authorized_keys file
  :alt: Changes to the authorized_keys file
  :align: center
  :width: 80%

