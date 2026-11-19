.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how to configure a custom domain name to access the Wazuh dashboard of your Wazuh Cloud environment from Wazuh Console.

Custom DNS
==========

By default, you reach the Wazuh dashboard of your environment through a subdomain of ``cloud.wazuh.com``. This page explains how to configure your own domain name for the environment in Wazuh Console.

You need the Editor role to create, update, or delete a custom DNS configuration. You can change the custom DNS configuration only while the environment is **Active**.

.. note::

   Your environment remains accessible through its default URL after you configure a custom domain.

Certificate requirements
------------------------

To configure a custom domain, you need a TLS certificate for it. All values are PEM encoded.

-  **Certificate**: the TLS certificate for your domain.

   -  Must use a SHA-2 signature algorithm.
   -  Must use an RSA key of at least 2048 bits.
   -  Must include TLS Web Server Authentication if it uses Extended Key Usage (EKU).
   -  Must contain the domain name in the Common Name (CN) or Subject Alternative Name (SAN) fields.

-  **Private key**: the private key of the certificate.

   -  Must match the certificate.
   -  Must not be encrypted or require a passphrase.

-  **Certificate chain**: the certificates that sign your certificate.

   -  Must contain all intermediate certificates of the chain.
   -  Must be signed by a trusted certificate authority.

Creating a custom DNS
---------------------

#. In the sidebar, under **Wazuh Cloud**, select **Environments** and open the details page of the environment.
#. On the **Custom DNS** card, click **Create Custom DNS**.
#. In the **Create Custom DNS** dialog, complete the fields:

   -  **Custom domain name**: the domain name to use, in lowercase, for example ``wazuh.example.com``. A domain name can be used by only one environment.
   -  **Certificate**: paste the certificate.
   -  **Private key**: paste the private key.
   -  **Certificate chain**: paste the certificate chain.
   -  **Allow wildcard domain**: select it if your certificate is a wildcard certificate, such as ``*.example.com``, that covers the custom domain name.

#. Click **Save Custom DNS**.

If the certificate doesn't meet the requirements, the console shows an error and doesn't save the configuration.

.. TODO: Confirm with engineering the maximum number of custom DNS configurations per environment.

After you save the configuration, the **Custom DNS** card lists the **Custom domain name**, the **Expiration date** of the certificate, and whether **Allow wildcard domain** is enabled.

Creating the DNS record
^^^^^^^^^^^^^^^^^^^^^^^

In your DNS provider, create a ``CNAME`` record that points your custom domain name to the default URL of your environment.

.. TODO: Confirm with engineering the CNAME target for custom DNS (default environment hostname vs a load balancer hostname) and whether the console shows it.

Updating a custom DNS
---------------------

Update the configuration to replace a certificate before it expires or to change the domain name.

#. On the **Custom DNS** card, open the options menu of the configuration and select **Edit**.
#. In the **Update Custom DNS** dialog, change the fields.
#. Click **Save Custom DNS**.

Deleting a custom DNS
---------------------

#. On the **Custom DNS** card, open the options menu of the configuration and select **Delete**.
#. Confirm the deletion.

After you delete the configuration, the custom domain stops reaching your environment. Remove the ``CNAME`` record from your DNS provider.

Changes to the custom DNS configuration appear in the environment :doc:`logs </cloud-service/your-environment/logs>`.
