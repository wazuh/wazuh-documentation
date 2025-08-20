.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how to deploy Wazuh using official Docker images, including the Wazuh manager, indexer, dashboard, and agent in this section of the documentation.

Deployment on Docker
====================


`Docker <https://www.docker.com/>`__ is an open source platform that simplifies building, delivering, and running applications in lightweight, portable containers. These containers bundle their application with all its dependencies, such as code, system tools, system libraries, and settings. Docker enables the separation of applications from the underlying infrastructure and ensures they run consistently across any environment, whether in the cloud or on-premises.

Wazuh provides official Docker images that you can install to streamline deployment. These include:

-  ``wazuh-manager``
-  ``wazuh-indexer``
-  ``wazuh-dashboard``
-  ``wazuh-agent``

You can find all available Wazuh Docker images on `Docker Hub <https://hub.docker.com/u/wazuh>`__.

.. toctree::
   :maxdepth: 1

   prerequisites
   wazuh-container
   container-usage
   upgrading-wazuh-docker
   faq-wazuh-container
