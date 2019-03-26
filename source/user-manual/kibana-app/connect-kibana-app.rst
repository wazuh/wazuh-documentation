.. Copyright (C) 2018 Wazuh, Inc.

.. _connect_kibana_app:

Setting up the app
==================

Follow these steps to register the Wazuh RESTful API with the Wazuh app in Kibana:

1. Open a web browser and go to the Kibana's IP address on port 5601 (default Kibana port). Then, from the left menu, click on the Wazuh app icon.

  .. image:: ../../images/kibana-app/connect-api/starting-app.png
    :align: center
    :width: 100%

2. Open the *Settings* page with the gear icon on the top right corner (the first time you open the app, you’ll be automatically redirected to Settings). Click on the ``Add new API`` button to open the form.

  .. image:: ../../images/kibana-app/connect-api/add-api-button.png
    :align: center
    :width: 100%

3. To protect your Wazuh API, follow the :ref:`securing_api` section.

4. Fill in the *Username* and *Password* fields with the credentials you created in the previous step. Enter ``http://MANAGER_IP`` for the *URL* field where ``MANAGER_IP`` is the real IP address of the Wazuh manager and enter "55000" for the *Port* field.

  .. image:: ../../images/kibana-app/connect-api/add-api-form.png
    :align: center
    :width: 100%

.. note::

    If you have followed :ref:`elasticsearch_kibana`, the URL must be set as ``https://localhost``.

6. Click on the ``Save API`` button to store it. Now you can navigate to the other app sections, like *Overview*, and start visualizing your alerts.

  .. image:: ../../images/kibana-app/connect-api/overview-general.png
    :align: center
    :width: 100%

If you want to learn more about the app capabilities, go to the :ref:`kibana_features` section to see useful information about it.
