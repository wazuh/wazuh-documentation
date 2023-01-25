.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: In the Wazuh dashboard installation guide, self-signed SSL certificates generated during the Wazuh indexer installation were configured for the Wazuh dashboard. 

.. _configuring-third-party-ssl-certificates:

Configuring third-party SSL certificates
========================================

In the Wazuh dashboard installation guide, self-signed SSL certificates generated during the Wazuh indexer installation were configured for the Wazuh dashboard.

You can use third-party certificates, instead of self-signed, in the Wazuh dashboard. This guide includes instructions for creating and configuring Let's Encrypt certificates. Let's Encrypt is a nonprofit Certificate Authority providing free SSL/TLS certificates to millions of websites.

To generate this type of certificate you need a fully qualified domain name (FQDN). Let's Encrypt verifies if you have control over the domain.
You can install the SSL certificate directly on the Wazuh dashboard. Alternatively, you can install it using NGINX, a third-party open source proxy software, to offload the SSL decryption processing from the Wazuh dashboard.

Choose a preferred method to start configuring the SSL/TLS certificate for the Wazuh dashboard:

- :doc:`Configuring SSL certificates directly on the Wazuh dashboard <configuring-ssl-certificates-directly>`
- :doc:`Configuring SSL certificates on the Wazuh dashboard using NGINX <configuring-ssl-certificates-using-nginx>`

    .. toctree::
        :hidden:
        :maxdepth: 1

        configuring-ssl-certificates-directly
        configuring-ssl-certificates-using-nginx
        
