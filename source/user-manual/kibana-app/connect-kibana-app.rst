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

3. To protect your Wazuh API, before filling out the fields, open a terminal on your Wazuh manager and, using the ``root`` user, replace the default credentials with your desired username where ``myUsername`` is shown below:

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

6. Click on the ``Save API`` button to store it. Now you can navigate to the other app sections, like *Overview*, and start visualizing your alerts.

  .. image:: ../../images/kibana-app/connect-api/overview-general.png
    :align: center
    :width: 100%

7. (Optional) Insert a Wazuh API entry automatically:

  If you want to add the Wazuh API credentials more quickly (for instance, for deployment purposes) you can execute the following command on the instance where Elasticsearch is installed:

  .. code-block:: none

    # curl -X POST "http://localhost:9200/.wazuh/wazuh-configuration/1513629884013" -H 'Content-Type: application/json' -d'
    {
      "api_user": "<WAZUH_API_USERNAME>",
      "api_password": "<WAZUH_API_PASSWORD>",
      "url": "<WAZUH_API_URL>",
      "api_port": "<WAZUH_API_PORT>",
      "insecure": "true",
      "component": "API",
      "cluster_info": {
        "manager": "<WAZUH_MANAGER_HOSTNAME>",
        "cluster": "Disabled",
        "status": "disabled"
      },
      "extensions": {
        "oscap": true,
        "audit": true,
        "pci": true,
        "aws": true,
        "virustotal": true,
        "gdpr": true,
        "ciscat": true
      }
    }'

  **Note the following:**

  1. ``<WAZUH_API_USERNAME>`` and ``<WAZUH_API_PASSWORD>`` represent the Wazuh API credentials to be stored on the app.
  2. The API password must be stored on *base64* format. Using ``echo -n '<WAZUH_API_PASSWORD>' | base64`` will return the password on the proper format to use.
  3. ``<WAZUH_API_URL>`` and ``<WAZUH_API_PORT>`` are the full IP address and the port to the Wazuh API. The URL must include ``http://`` or ``https://``, depending on the current configuration.
  4. ``<WAZUH_MANAGER_HOSTNAME>`` is the hostname of the instance where the Wazuh manager is installed. You can get this information just by running the ``hostname`` command on the manager host.

If you want to learn more about the app capabilities, go to the :ref:`kibana_features` section to see useful information about it.
