.. _connect_wazuh_app:

Connect the Wazuh App with the API
==================================

In this section, we will show you how to register the Wazuh API (installed on the Wazuh server) with the Wazuh App in Kibana:

1. Open a web browser and go to the Elastic Stack server's IP address on port 5601 (default Kibana port). Then, from the left menu, go to the Wazuh App.

  .. image:: ../../images/kibana-app/others/starting-app.png
    :align: center
    :width: 100%

2. Click on ``Add new API``.

  .. image:: ../../images/kibana-app/settings/api.png
    :align: center
    :width: 100%

3. Before filling out the fields, go to your Wazuh server and, using the command prompt as root, replace the default credentials with your desired username where `myUsername` is shown below to protect your Wazuh API.

  .. code-block:: console

    # cd /var/ossec/api/configuration/auth
    # node htpasswd -c user myUserName

  Do not forget to restart the API to apply the changes with these commands:

  .. code-block:: console

    # systemctl restart wazuh-api
    # service wazuh-api restart

4. Fill in the Username and Password fields with the credentials you created in the previous step.  Enter ``http://MANAGER_IP`` for the URL where ``MANAGER_IP`` is the real IP address of the Wazuh server and enter "55000" for the Port.

  .. image:: ../../images/kibana-app/settings/add-api.png
    :align: center
    :width: 100%

.. note:: If you have followed the Wazuh Documentation for Nginx, the URL must be set as ``https://localhost``.

6. Click on ``Save``.

  .. image:: ../../images/kibana-app/overview/overview-general.png
    :align: center
    :width: 100%

Next steps
----------

Once the Wazuh and Elastic Stack servers are installed and connected, you can install and connect Wazuh agents. Follow the appropriate link below for your specific installation environment:

- :ref:`Debian/Ubuntu <wazuh_agent_deb>`
- :ref:`RedHat/CentOS <wazuh_agent_rpm>`
- :ref:`Windows <wazuh_agent_windows>`
