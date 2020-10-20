.. Copyright (C) 2020 Wazuh, Inc.

.. _cloud_getting_started_wui_access:

Access Wazuh WUI
================

.. meta::
  :description: Learn about how to access Wazuh WUI. 
		
Once an environment has been successfully created, an email will be sent containing a Cloud ID and credentials for the created environment. This Cloud ID is remarkable as it is used in every communication with your environment.

Access the Web User Interface (WUI) through the web browser using the URL included on the previous email, ``https://<cloud_id>cloud.wazuh.com``, replacing ``<cloud_id>`` with its Cloud ID and filling with the adquired credentials.


Access from Cloud Console
-------------------------

WUI can also be accessed from the Cloud Console:

1- Go to the Welcome page (or your environment list).

2- Click on Kibana under the Quick link section.

3- Access WUI with your credentials.

4- Use the WUI as normally.


Granting WUI access to others
-----------------------------

More users can be added to consult the WUI besides the administrator.

1- Log in to your WUI

2- Choose **Security**, **Internal Users**, and **Create internal user**.

3- Provide a username and password. The security plugin automatically hashes the password and stores it.

4- If desired, specify user attributes.

5- Choose **Submit**.
