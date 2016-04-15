.. _ossec_splunk_installation:


Installation
============

Pre-requisites
--------------

Reporting and Management for Wazuh requires you to have previously installed:
- Splunk Enterprise (Version 6.1.1 and above).
- OSSEC Wazuh HIDS
- OSSEC Wazuh RESTful API (Version 1.2 and above).

Automatic installation
----------------------

Download ``wazuh.tar.gz`` from our `repository <https://github.com/wazuh/wazuh-splunk>`_

In Splunk go to ``Apps->Manage Apps``, select ``Install app from file`` and upload the file downloaded before. 

Manual installation
-------------------

Copy the "wazuh/" folder to Splunk Apps folder: ::

 $ cd ~ && git clone https://github.com/wazuh/wazuh-splunk.git
 $ sudo mkdir -p /opt/splunk/etc/apps/wazuh && sudo cp -r wazuh-splunk/wazuh/* /opt/splunk/etc/apps/wazuh

Patch for Splunk 6.2 and older
------------------------------

If you are using a Splunk version older than 6.2, you need to apply a patch: ::

 $ sudo cp -r wazuh-splunk/611Patch/* /opt/splunk/etc/apps/wazuh

If prompted to confirm overwrite, answer yes.

Configuration
-------------

If Splunk is not installed in default location or the username is not admin, open ``SPLUNK_DIR/etc/apps/wazuh/bin/ossec_agent_status.py`` and change the values of ``wazuh_dir`` and/or ``wazuh_user``.

The first time a user access the application the following steps are required:

- The user will be asked for a user/password pair, and a name for the pair. The pair is used for Wazuh Restful API. Type a user and password valid for the API on all the OSSEC managers, and name it Splunk.
- In the menu, go to ``Searches & Reports -> Utility``. Execute ``Initialize OSSEC Server Lookup Table`` and ``Rebuild OSSEC Server Lookup Table``.

The credentials pair Splunk is required, because the application will look for it when tries to check the agents' status. 
To add more credentials pairs go to ``Apps->Manage Apps`` and click ``Set up`` in Reporting and Management for Wazuh row. Credentials are stored in a secure way, using Splunk Storage Passwords.

Adding new managers
-------------------

By default, Reporting and Management for Wazuh will read the local file ``/var/ossec/logs/alerts/alerts.json`` as data input. In order to add new managers, you need to provide Splunk access to the ``alerts.json`` file in ``Settings->Data Inputs`` menu, or configure a Splunk Universal Forwarder. 

- When asked for a source type, select ``ossec_json``.
- When asked for a host method, chose IP or DNS.
- If the ``alerts.json`` file comes from Splunk Universal Forwarder, open ``/opt/splunk/etc/system/local/inputs.conf`` in Splunk Universal Forwarder machine and set host value equals to his IP. Alternatively, create a DNS entry in the Splunk machine pointing the name of Splunk Universal Forwarder machine to his IP.

Upgrading from "Reporting and Management for OSSEC"
---------------------------------------------------

This application is based on Reporting and Management for OSSEC. However, this application introduces a number of changes. The recommended procedure is to remove the old app before installing. Installing over top of Reporting and Managerment for OSSEC won’t work.


 