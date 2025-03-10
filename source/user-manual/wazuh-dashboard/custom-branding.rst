.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: The Wazuh dashboard white-labeling feature allows you to replace some elements with custom ones. Learn more in this section of the documentation.

Setting up custom branding
==========================

The Wazuh dashboard white-labeling feature allows you to replace the following elements with custom ones:

-  Logos on the Wazuh dashboard.

   -  Loading logos
   -  Health check logo
   -  Wazuh dashboard home logo

-  Logo, header, and footer on PDF reports.

Custom logos on the Wazuh dashboard
-----------------------------------

Loading logos
^^^^^^^^^^^^^

To customize the *global App loading* logo, do the following.

.. thumbnail:: /images/kibana-app/features/white-labeling/custom-branding-settings-loading-page.png
   :title: Global App loading logo
   :alt: Global App loading logo
   :align: center
   :width: 80%

#. Edit ``opensearch_dashboards.yml``. You can find this file in the following locations:

   -  ``/etc/wazuh-dashboard/``
   -  ``/usr/share/wazuh-dashboard/config/`` for Docker installations.

#. Add the URL of your default and dark theme logos.

   .. code-block:: yaml

      opensearchDashboards.branding:
         loadingLogo:
            defaultUrl: "https://domain.org/default-logo.png"
            darkModeUrl: "https://domain.org/dark-mode-logo.png"

#. Restart the Wazuh dashboard service:

   .. code-block:: console

      # systemctl restart wazuh-dashboard

To customize the *Wazuh plugins loading* logo, do the following.

.. thumbnail:: /images/kibana-app/features/white-labeling/custom-branding-settings-loading.png
   :title: Wazuh plugins loading logo
   :alt: Wazuh plugins loading logo
   :align: center
   :width: 80%

#. Navigate to **Dashboard management** > **App Settings** on the Wazuh dashboard.
#. Set up ``customization.logo.app`` (App main logo) in the **Custom branding** section.

This property sets the *App loading* logo image when the user is logging in to the Wazuh server. It has a size limit of 1 MB. It replaces the logo image in the Wazuh loading animation when a new section initializes. Recommended size: 300 pixels width, 70 pixels height. Once you are done setting your custom logo images, you can find them saved in ``/usr/share/wazuh-dashboard/plugins/wazuh/public/assets/custom/images/``.

Wazuh dashboard home logo
^^^^^^^^^^^^^^^^^^^^^^^^^

To customize the *Wazuh dashboard home* logo in the top header, do the following.

.. thumbnail:: /images/kibana-app/features/white-labeling/custom-branding-settings-header.png
   :title: Wazuh dashboard home logo
   :alt: Wazuh dashboard home logo
   :align: center
   :width: 80%

#. Edit ``opensearch_dashboards.yml``. You can find this file in the following locations:

   -  ``/etc/wazuh-dashboard/``
   -  ``/usr/share/wazuh-dashboard/config/`` for Docker installations.

#. Add the URL of your default and dark theme logos.

   .. code-block:: yaml

      opensearchDashboards.branding:
         mark:
            defaultUrl: "https://domain.org/default-logo.png"
            darkModeUrl: "https://domain.org/dark-mode-logo.png"

#. Restart the Wazuh dashboard service:

   .. code-block:: console

      # systemctl restart wazuh-dashboard

Once you are done setting your custom logo image, you can find it saved in ``/usr/share/wazuh-dashboard/plugins/wazuh/public/assets/custom/images/``.

Health check logo
^^^^^^^^^^^^^^^^^

To use your own *Health check* logo in the Wazuh dashboard, do the following.

.. thumbnail:: /images/kibana-app/features/white-labeling/custom-branding-settings-health-check.png
   :title: Health check logo
   :alt: Health check logo
   :align: center
   :width: 80%

#. Navigate to **Dashboard management** > **App Settings** on the Wazuh dashboard.
#. Under the **Custom branding** section, set up ``customization.logo.healthcheck``. This property sets the *Health check* logo image. It has a size limit of 1 MB. It replaces the logo on top of the check list displayed during the health check routine. Recommended size: 300 pixels width, 70 pixels height.

Once you are done setting your custom logo images, you can find them saved in ``/usr/share/wazuh-dashboard/plugins/wazuh/public/assets/custom/images/``.

Custom branding of the PDF reports
----------------------------------

To customize the PDF reports, click the *hamburger* icon from the top left side and go to **Dashboard management** > **App Settings** > *Configuration*. Under the **Custom branding** section, set up the following properties:

-  ``customization.logo.reports``. This property sets the `PDF reports logo` image. It has a size limit of 1 MB. It's printed in the top left corner of the PDF reports. Recommended size: 190 pixels width, 40 pixels height. See #1 in the image below.

-  ``customization.reports.footer``. This property sets the `Reports footer` text block. It has a size limit of 2 lines of 50 characters each. It's printed in the bottom left corner of the PDF reports. See #2 in the image below.

-  ``customization.reports.header``. This property sets the `Reports header` text block. It has a size limit of 3 lines of 40 characters each. It's printed in the top right corner of the PDF reports. See #3 in the image below.

.. thumbnail:: /images/kibana-app/features/white-labeling/custom-pdf-report.png
   :title: Custom PDF report
   :align: center
   :width: 80%

Configuration
-------------

The following settings correspond to the custom branding feature. Edit the default branding of the main Wazuh dashboard and PDF reports using the user interface as explained above.

+--------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+---------------+---------------------+-----------------------------------------+
| Configuration name             | Description                                                                                                                                                                                                               | Default value | Allowed values      | Value limit                             |
+================================+===========================================================================================================================================================================================================================+===============+=====================+=========================================+
| customization.enabled          | Enables and disables custom branding of the Wazuh dashboard and PDF reports.                                                                                                                                              | true          | true, false         |                                         |
+--------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+---------------+---------------------+-----------------------------------------+
| customization.logo.app         | This is the image to be used as the logo in the main menu of the Wazuh dashboard. It is saved as ``/usr/share/wazuh-dashboard/plugins/wazuh/public/assets/custom/images/customization.logo.app.<FORMAT>``.                | ''            | jpeg, jpg, png, svg | 1 MB                                    |
+--------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+---------------+---------------------+-----------------------------------------+
| customization.logo.healthcheck | This is the image to be used as the health check logo. It is saved as ``/usr/share/wazuh-dashboard/plugins/wazuh/public/assets/custom/images/customization.logo.healthcheck.<FORMAT>``.                                   | ''            | jpeg, jpg, png, svg | 1 MB                                    |
+--------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+---------------+---------------------+-----------------------------------------+
| customization.logo.reports     | This is the image to be used as a logo in the PDF reports generated by the Wazuh dashboard. It is saved as ``/usr/share/wazuh-dashboard/plugins/wazuh/public/assets/custom/images/customization.logo.reports.<FORMAT>``.  | ''            | jpeg, jpg, png      | 1 MB                                    |
+--------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+---------------+---------------------+-----------------------------------------+
| customization.reports.header   | Header of the PDF reports. To use an empty header, type a space " " in the field. If the field is empty, it uses the default header.                                                                                      | ''            | Printable           | 3 lines of 40 characters each           |
|                                |                                                                                                                                                                                                                           |               | characters          |                                         |
+--------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+---------------+---------------------+-----------------------------------------+
| customization.reports.footer   | Footer of the PDF reports. To use an empty footer, type a space " " in the field. If the field is empty, it uses the default footer.                                                                                      | ''            | Printable           | 2 lines of 50 characters each           |
|                                |                                                                                                                                                                                                                           |               | characters          |                                         |
+--------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+---------------+---------------------+-----------------------------------------+

.. warning::

   Please, take into consideration the following notes:

   -  The value of any ``customization.logo.*`` setting must follow the pattern ``custom/images/<SETTING_NAME>.<IMAGE_FORMAT>``.
   -  The path ``custom/images/`` included in every ``customization.logo.*`` setting is relative to the ``/plugins/wazuh/public/assets/`` folder.
   -  Setting or modifying any ``customization.logo.*`` setting by hand is not recommended. Use the UI instead.
   -  The in-file ``customization.logo.*`` settings are flagged for deprecation, and will be no longer supported in future releases.