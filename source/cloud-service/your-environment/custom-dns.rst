.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Check out how to configure a custom domain to access an environment in Wazuh Cloud. Learn more about it in this section of the documentation.

Custom DNS
==========

By default, Wazuh Cloud environments are accessed through a subdomain of ``cloud.wazuh.com``.

You can configure your environment to use your own custom domain. To do this, go to the **Wazuh Cloud Console** under the environment details page. You need to provide the following:

-  **Certificate**: SSL/TLS certificate for your domain

   -  Must use SHA2
   -  Must use RSA with key size of at least 2048 bits
   -  TLS Web Server Authentication is required if using EKU
   -  Must contain domain name in CN or SAN field(s)
   -  Must be PEM encoded

-  **Private Key**: Associated with the provided certificate

   -  Must not be encrypted or require a passphrase
   -  Must be PEM encoded

-  **Certificate Chain**: Used to sign your certificate

   -  Must contain all intermediate certificates in the certificate chain
   -  Must be signed by a trusted certificate authority
   -  Must be PEM encoded

After providing the above and applying the configuration, create a ``CNAME`` DNS record using the value provided by the **Wazuh Cloud Console**.

.. note::

   Your Wazuh Cloud environment is still accessible through the default URL, even if you have configured a custom domain.
