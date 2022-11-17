.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn more about upgrading the Wazuh deployment on Docker in this section of our documentation. 
  
Upgrading Wazuh Docker
======================

This section describes how to upgrade Wazuh Docker deployments starting from version 4.3. To upgrade Wazuh deployments below version 4.3 (production deployment), refer to the :doc:`/deployment-options/docker/data-migration` documentation.

#. Run the following command from the ``wazuh-docker`` directory to stop the current v4.3.x environment:

   .. code-block::

      # docker-compose down

#. Set the new version of Wazuh:

   -  If you have a customized ``docker-compose.yml`` file and want to preserve it. Edit it and change the version of the images to the new version.
   -  If you want to use the default ``docker-compose.yml`` file of the new version. Navigate to the Git branch of the new version:

      .. code-block::

         # git checkout |WAZUH_CURRENT_DOCKER|

#. Start the new version of Wazuh using ``docker-compose``:

   .. code-block::

      # docker-compose up -d