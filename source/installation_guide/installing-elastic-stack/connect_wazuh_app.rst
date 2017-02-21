.. _connect_wazuh_app:

Connect the Wazuh App with the API
==================================

In this section, we'll register the Wazuh App in Kibana to communicate with the Wazuh API.

1. Open a web browser and go to the Elastic server's IP address on port 5601 (default Kibana port).

..

2. Go through the menu to the Wazuh App.

.. image:: ../../images/installation/wazuhapp/kibana_app.png
    :align: center
    :width: 100%

3. Click on *Add new API*.

.. image:: ../../images/installation/wazuhapp/connect_api.png
    :align: center
    :width: 100%

4. Before filling out the fields, go to the command prompt as root and set a non-default username and password to protect your Wazuh API.  Replace newname and newpassword with credentials of your choosing::

	cd /var/ossec/api/configuration/auth
	./htpasswd -bc /var/ossec/api/configuration/auth/user newname newpassword

5. Fill in the new name and new password that you just defined.  Also, put in "http://*MANAGERIP*" for URL, where *MANAGERIP* is the real IP address of the Wazuh Manager, and "55000" for Port.

.. image:: ../../images/installation/wazuhapp/fields_api.png
    :align: center
    :width: 100%

6. Click on *Save*.

.. image:: ../../images/installation/wazuhapp/app_running.png
    :align: center
    :width: 100%

Next steps
----------

Once the Elastic server and Wazuh manager are installed and connected, you can install and connect Wazuh agents. How to do it:

- :ref:`Debian/Ubuntu <wazuh_agent_deb>`
- :ref:`RedHat/CentOS <wazuh_agent_rpm>`
- :ref:`Windows <wazuh_agent_windows>`
