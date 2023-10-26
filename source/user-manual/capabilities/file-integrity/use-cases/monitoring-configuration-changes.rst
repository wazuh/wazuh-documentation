.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: The Wazuh FIM module monitors directories to detect file changes, additions, and deletions. Discover some FIM use cases in this section of our documentation. 
  
Monitoring configuration changes
================================

Monitoring configuration changes helps to establish accountability for changes made to systems and applications. Organizations can identify responsible parties and ensure that changes are properly authorized and documented by maintaining a record of changes and who made them.

You can configure the FIM module to monitor configuration files and report any changes. The Wazuh FIM module uses the :ref:`whodata <who-data-monitoring>` and :ref:`report_changes <reporting-changes-in-registry-values>` attributes to record the following information about such changes:

- The login user that made the changes.
- The time of the changes.
- The process that the user executed.
- The changes made to the file.

Use case description
--------------------

  +---------------------+-----------------------------------------------------------------------------------------------+
  | Endpoint            | Description                                                                                   |
  +=====================+===============================================================================================+
  | Ubuntu 20.04        | The FIM module monitors a configuration file on this endpoint to detect file changes.         |                                                                                                                               
  +---------------------+-----------------------------------------------------------------------------------------------+
 
Configuration
-------------

Perform the following steps to configure the FIM module to monitor the ``/etc/app.conf`` file and report changes.

#. Create a file ``app.conf`` in the ``/etc`` directory:

   .. code-block:: console

      # touch /etc/app.conf 

#. Edit the ``/var/ossec/etc/ossec.conf`` configuration file and add the configuration below:

   .. code-block:: xml
      
      <syscheck>
        <directories check_all="yes" report_changes="yes" whodata="yes">/etc/app.conf</directories>
      </syscheck>

#. Restart the Wazuh agent to apply the configuration changes:

   .. code-block:: console

      systemctl restart wazuh-agent

Test the configuration
----------------------

#. Modify the ``/etc/app.conf`` file by using ``nano`` with root privilege:

   .. code-block:: console

      # nano /etc/app.conf

#. Add ``updated image to V2`` to the file and save.

Visualize the alert
-------------------

Navigate to **File integrity monitoring** on the Wazuh dashboard to view the alert generated when the FIM module detects modification of the configuration file.

.. thumbnail:: /images/manual/fim/modification-of-the-configuration-file.png
  :title: Modification of the configuration file
  :alt: Modification of the configuration file
  :align: center
  :width: 80%

Expand the alert to get more information about the event. In this example, the ``nano`` text editor modified the configuration file. The logged-in user on the endpoint was ``ubuntu``. The user modified the file using root privilege. The content added to the file is ``updated image to V2``.

.. thumbnail:: /images/manual/fim/get-more-information-about-the-event.png
  :title: Get more information about the event
  :alt: Get more information about the event
  :align: center
  :width: 80%

