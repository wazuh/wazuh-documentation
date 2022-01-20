.. Copyright (C) 2021 Wazuh, Inc.

.. meta::
  :description: Learn more about the process of installing and configuring the Wazuh deployment on Docker in this section of our documentation. 

Deployment on Docker
====================

This section shows the process of installing Wazuh on Docker.

`Docker <https://www.docker.com/>`_ is an open platform to build, deliver, and run applications inside software containers. Docker containers package up software including everything needed to run: code, runtime, system tools, system libraries, and settings. Docker enables separating applications from infrastructure. This guarantees that the application will always run the same, regardless of the environment the container is running on. Containers can run in the cloud or on-premises.

You can install Wazuh using the Docker images we have created, such as ``wazuh/wazuh-odfe`` and ``wazuh/wazuh-kibana-odfe``. All the Wazuh Docker images are found in the `Docker hub <https://hub.docker.com/u/wazuh>`_.

In the :doc:`/deployment-options/docker/docker-installation` subsection you will see how to install Docker. You will see how to install Wazuh on Docker in the :doc:`/deployment-options/docker/wazuh-container` subsection. Read the :doc:`/deployment-options/docker/container-usage` subsection to learn how to access the services and containers, manage data volumes, and execute a shell. In the :doc:`/deployment-options/docker/upgrade-guide` subsection you can learn how to upgrade Wazuh 3.x on Docker. Finally, you can find answers to some frequent questions in the :doc:`/deployment-options/docker/faq-wazuh-container`.


.. toctree::
   :maxdepth: 1
   :hidden:

   docker-installation
   wazuh-container
   container-usage
   upgrade-guide
   faq-wazuh-container
