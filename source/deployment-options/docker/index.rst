.. Copyright (C) 2022 Wazuh, Inc.

.. meta::
  :description: Learn more about the process of installing and configuring the Wazuh deployment on Docker in this section of our documentation. 

Deployment on Docker
====================

This section details the process of installing Wazuh on Docker.

`Docker <https://www.docker.com/>`_ is an open platform to build, deliver, and running applications inside software containers. Docker containers package up software, including everything needed to run: code, runtime, system tools, system libraries, and settings. Docker enables separating applications from infrastructure, which guarantees that the application will always run the same, regardless of the container's environment. Therefore, containers can run in the cloud or on-premises.

You can install Wazuh using the Docker images such as ``wazuh/wazuh-manager``, ``wazuh/wazuh-indexer`` and ``wazuh/wazuh-dashboard``. All these Wazuh Docker images are found in the `Docker hub <https://hub.docker.com/u/wazuh>`_.

In the :doc:`/deployment-options/docker/docker-installation` section, you will see how to install Docker. You can also learn how to install Wazuh on Docker in the :doc:`/deployment-options/docker/wazuh-container`. Read the :doc:`/deployment-options/docker/container-usage` section to learn how to access the services and containers, manage data volumes, and execute a shell. Finally, you can find answers to some frequent questions in the :doc:`/deployment-options/docker/faq-wazuh-container`.


.. toctree::
   :maxdepth: 1
   :hidden:

   docker-installation
   wazuh-container
   container-usage   
   faq-wazuh-container
