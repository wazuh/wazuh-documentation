.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Wazuh must be authorized before it can pull logs and other content from the Microsoft Graph API.

Microsoft Graph API setup
=========================

Wazuh must be authorized before it can pull logs and other content from the Microsoft Graph API. This authentication process is possible using the ``tenant_id``, ``client_id``, and ``secret_value`` of an authorized application, which we will register through Azure.

Registering your app
--------------------

#. Register an application to authenticate with the Microsoft identity platform endpoint.

   .. thumbnail:: /images/cloud-security/azure/new-app-registration.png
      :align: center
      :width: 80%

#. Fill in the name of your app, choose the desired **account type**, and click on the **Register** button:

   .. thumbnail:: /images/cloud-security/azure/register-application3.png
      :align: center
      :width: 80%

The app is now registered; you can see information about it in its **Overview** section. Make sure to note down the ``client_id`` and ``tenant_id`` information:

.. thumbnail:: /images/cloud-security/azure/note-down-information.png
   :align: center
   :width: 80%
