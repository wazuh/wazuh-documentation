.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: The Wazuh FIM module monitors directories to detect file changes, additions, and deletions. Discover some FIM use cases in this section of our documentation. 
  
Reporting file changes
======================

The functionality to report changes made to a file allows you to confirm the implementation of changes to an application or system. For example, if you change an application configuration file, the FIM capability reports the specific changes made to the file and shows the state before and after the change.

Having a record of file changes might be useful for troubleshooting issues or for auditing purposes. By providing visibility into file changes, the FIM capability plays a crucial role in effective change management.

Use case description
--------------------

  +---------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
  | Endpoint            | Description                                                                                                                                                                    |
  +=====================+================================================================================================================================================================================+
  | Ubuntu 20.04        | The FIM module monitors a directory on this endpoint for file changes. It reports the exact changes made to a specified file and hides the changes made to an excluded file.   |                                                                                                                               
  +---------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

Configuration
-------------

Perform the following steps to configure the FIM module to report changes made to a file. The configuration reports changes made to files in ``/appfolder`` except for the ``private-file.conf`` file. 

#. Edit the ``/var/ossec/etc/ossec.conf`` configuration file and add the configuration below. This sets ``/appfolder`` for monitoring and makes an exception in reporting changes for ``/appfolder/private-file.conf`` using ``nodiff``:

   .. code-block:: xml
      
      <syscheck>
        <directories realtime="yes" report_changes="yes">/appfolder</directories>
        <nodiff>/appfolder/private-file.conf</nodiff>
      </syscheck>

#. Restart the Wazuh agent to apply the configuration changes:

   .. code-block:: console

      systemctl restart wazuh-agent

Test the configuration
----------------------

#. Create a directory ``/appfolder`` and the files ``appreport.conf`` and ``private-file.conf`` in the directory:

   .. code-block:: console

      # mkdir /appfolder && touch /appfolder/appreport.conf && touch /appfolder/private-file.conf

#. Add the value ``I added this text`` to the ``appreport.conf``  and ``private-file.conf`` files:

   .. code-block:: console

      echo “I added this text” | tee /appfolder/appreport.conf /appfolder/private-file.conf

Visualize the alert
-------------------

Navigate to **Modules > Integrity monitoring** on the Wazuh dashboard to view the alert. You can find four alerts related to the monitored directory.

.. thumbnail:: /images/manual/fim/alerts-related-monitored-directory.png
  :title: Alerts related to the monitored directory
  :alt: Alerts related to the monitored directory
  :align: center
  :width: 80%

Expand the alert for the ``appreport.conf`` file with ``rule.id:550`` to find information about the changes made to the file. In the image below, under the **syscheck.diff** field, you see the content added to the file. 

.. thumbnail:: /images/manual/fim/content-added-to-the-file.png
  :title: Content added to the file
  :alt: Content added to the file
  :align: center
  :width: 80%

Expand the alert for the ``private-file.conf`` file with ``rule.id:550`` to search for information about the changes made to the file. In the image below, under the **syscheck.diff** field, you see that FIM doesn’t report the content added to the file. 

.. thumbnail:: /images/manual/fim/alert-for-the-private-file-conf.png
  :title: Alert for the private-file.conf file
  :alt: Alert for the private-file.conf file
  :align: center
  :width: 80%