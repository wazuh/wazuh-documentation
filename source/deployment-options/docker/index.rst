.. Copyright (C) 2021 Wazuh, Inc.

.. meta::
  :description: Learn more about the process of installing and configuring the Wazuh deployment on Docker in this section of our documentation. 

Deployment on Docker
====================

This section shows the process of installing Wazuh on Docker.

`Docker <https://www.docker.com/>`_ is an open platform to build, deliver, and run applications inside software containers. Docker containers package up software including everything needed to run: code, runtime, system tools, system libraries, and settings. Docker enables separating applications from infrastructure. This guarantees that the application will always run the same, regardless the environment the container is running on. Containers can run in the cloud or on-premises.

The `Wazuh Docker repository <https://github.com/wazuh/wazuh-docker>`_ was created as a fork of Anthony Lapenna's `deviantony/docker-elk <https://github.com/deviantony/docker-elk>`_ repository. It is also based on dockerfiles from `xetus-oss/docker-ossec-server <https://github.com/xetus-oss/docker-ossec-server>`_.

You can install Wazuh using the Docker images we have created, such as wazuh/wazuh-odfe and wazuh/wazuh-kibana-odfe. All the Wazuh Docker images are found  in the `Docker hub <https://hub.docker.com/u/wazuh>`_.


.. toctree::
   :maxdepth: 1
   :hidden:

   docker-installation
   wazuh-container
   container-usage
   upgrade-guide
   faq-wazuh-container
