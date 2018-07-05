.. Copyright (C) 2018 Wazuh, Inc.

.. _connect_kibana_app:

Connect the app with the API
============================

Follow these steps to register the Wazuh RESTful API with the Wazuh app in Kibana:

1. Open a web browser and go to the Kibana's IP address on port 5601 (default Kibana port). Then, from the left menu, go to the Wazuh app.

  .. image:: ../../images/kibana-app/connect-api/starting-app.png
    :align: center
    :width: 100%

2. If this is the first time you open the app, you'll be automatically redirected to *Settings*. If not, you can open the page with the gear icon on the top right corner. Click on the ``Add new API`` button to open the form.

  .. image:: ../../images/kibana-app/connect-api/add-api-button.png
    :align: center
    :width: 100%

3. Before filling out the fields, go to your Wazuh manager and, using the command prompt as ``root``, replace the default credentials with your desired username where ``myUsername`` is shown below to protect your Wazuh API.

  .. code-block:: console

    # cd /var/ossec/api/configuration/auth
    # node htpasswd -c user myUserName

  Do not forget to restart the API to apply the changes with these commands:

  .. code-block:: console

    # systemctl restart wazuh-api
    or
    # service wazuh-api restart

4. Fill in the *Username* and *Password* fields with the credentials you created in the previous step. Enter ``http://MANAGER_IP`` for the *URL* field where ``MANAGER_IP`` is the real IP address of the Wazuh manager and enter "55000" for the *Port* field.

  .. image:: ../../images/kibana-app/connect-api/add-api-form.png
    :align: center
    :width: 100%

.. note::

    If you have followed :ref:`kibana_ssl`, the URL must be set as ``https://localhost``.

6. Click on the ``Save API`` button to store it. Now you can go to the other app sections, like *Overview*, and start visualizing your alerts.

  .. image:: ../../images/kibana-app/showcase/overview-general.png
    :align: center
    :width: 100%

If you want to learn more about the app capabilities, go to the :ref:`kibana_features` section to see useful information about it.
