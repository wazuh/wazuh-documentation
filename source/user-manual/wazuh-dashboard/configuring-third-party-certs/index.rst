.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: This guide includes instructions for creating and configuring Let's Encrypt certificates.

Configuring third-party SSL certificates
========================================

In the :doc:`Wazuh dashboard installation </installation-guide/wazuh-dashboard/step-by-step>` guide, self-signed SSL certificates generated during the Wazuh indexer installation were configured for the Wazuh dashboard.

You can use third-party certificates instead of self-signed ones in the Wazuh dashboard. This guide includes instructions for creating and configuring Let's Encrypt certificates. Let's Encrypt is a nonprofit Certificate Authority (CA) providing free SSL/TLS certificates to millions of websites.

To generate this type of certificate, you need a fully qualified domain name (FQDN). Let's Encrypt verifies if you have control over the domain.

You can install the SSL certificate directly on the Wazuh dashboard. Alternatively, you can install it using NGINX, a third-party open source proxy software, to offload the SSL decryption processing from the Wazuh dashboard.

Choose a preferred method to start configuring the SSL/TLS certificate for the Wazuh dashboard:

.. toctree::
   :maxdepth: 1

   ssl
   ssl-nginx
