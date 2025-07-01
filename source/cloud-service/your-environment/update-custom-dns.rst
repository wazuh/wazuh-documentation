.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Check out how to update the certificates for your custom domain to access an environment in Wazuh Cloud. Learn more about it in this section of the documentation.

Update your domain certificates
===============================
To keep your custom domain secured with a valid SSL/TLS certificate, you'll need to replace your existing certificates in the **Wazuh Cloud Console** from time to time.
The process below walks you through removing the old certificates and uploading new ones, without touching your DNS records.

-  **1. Log in & open the Custom DNS panel**:

   -  Sign in to your Wazuh Cloud account.
   -  From the main dashboard, go to your environment details page → **Manage** → **Custom DNS**.
   
   .. thumbnail:: ../../images/cloud-service/custom-dns-menu.png
      :title: Manage menu
      :alt: Manage menu
      :align: center
      :width: 80%
   
   -  The Custom DNS panel will pop up showing your current domain.
   
   .. thumbnail:: ../../images/cloud-service/custom-dns-panel.png
      :title: Custom DNS panel
      :alt: Custom DNS panel
      :align: center
      :width: 80%

-  **2. Remove the existing certificates**: 

   -  Click the **Remove configuration** button, and wait for the page to reload.
   
   .. thumbnail:: ../../images/cloud-service/custom-dns-remove-config.png
      :title: Remove old configuration
      :alt: Remove old configuration
      :align: center
      :width: 80%
   
   -  Note that, at this moment, your environment's custom domain will briefly lose its HTTPS certificate, making it temporarily unreachable via that hostname.

-  **3. Upload your new certificates**:

   -  Re-open the Custom DNS panel if it closed.
   -  Enter the desired custom domain name and, paste or upload your new certificate files ``(.crt/.pem)`` and its matching private key.
   
   .. thumbnail:: ../../images/cloud-service/custom-dns-add-certs.png
      :title: Add new certificates
      :alt: Add new certificates
      :align: center
      :width: 80%
   
   -  Click the **Apply** button to start deploying the new cert.

-  **4. Wait for deployment & verify**:

   -  The **Apply** button will show a loading spinner. This typically takes just a few seconds.
   -  Once the configuration is complete, your environment will be accessible again via HTTPS at your custom domain. No DNS or ``CNAME`` changes are required.
