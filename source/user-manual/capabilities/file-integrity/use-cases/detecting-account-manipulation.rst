.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: The Wazuh FIM module monitors directories to detect file changes, additions, and deletions. Discover some FIM use cases in this section of our documentation.

Detect account manipulation
============================

Account manipulation refers to the creation, modification, or deletion of user accounts or credentials within an organization's IT infrastructure. Monitoring this activity is critical, since unauthorized account manipulation can grant attackers access to sensitive systems and data.

To maintain persistence on a victim endpoint, adversaries can alter the SSH ``authorized_keys`` file in Linux. The ``.ssh`` directory within a user's home directory holds this file. For example, for a user named *smith*, you can find the ``authorized_keys`` file located at ``/home/smith/.ssh/authorized_keys``. This file defines the public keys the user can use to log in, with each line representing a single key.

You can configure the Wazuh FIM module to monitor the ``authorized_keys`` file and trigger a finding whenever a user or process modifies its public keys. This lets you act before a system compromise occurs.

Use case description
---------------------

+---------------------+---------------------------------------------------------------+
| Endpoint            | Description                                                   |
+=====================+===============================================================+
| **CentOS Stream 9** | The FIM module detects SSH key modification on this endpoint. |
+---------------------+---------------------------------------------------------------+

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

      # systemctl restart wazuh-agent

Test the configuration
-----------------------

Run the following commands on the CentOS 9 endpoint and ensure you are in the user's home directory.

#. Generate an SSH key pair for user authentication and save it as ``.ssh/test_key`` using the following command:

   .. code-block:: console

      # ssh-keygen -f .ssh/test_key

#. Run the following command on the CentOS endpoint to create the ``.ssh`` directory with the correct permissions. It then appends your ``test_key.pub`` public key to the user's ``authorized_keys`` file:

   .. code-block:: console

      # mkdir -m 700 -p ~/.ssh && cat ~/.ssh/test_key.pub >> ~/.ssh/authorized_keys && chmod 600 ~/.ssh/authorized_keys

Visualize the finding
----------------------

Navigate to **Endpoint security** → **File Integrity Monitoring** → **Findings** on the Wazuh dashboard to view the finding generated when the FIM module detects changes to the ``authorized_keys`` file.

.. thumbnail:: /images/manual/fim/changes-authorized-keys-file.png
   :title: Changes to the authorized_keys file
   :alt: Changes to the authorized_keys file
   :align: center
   :width: 80%
