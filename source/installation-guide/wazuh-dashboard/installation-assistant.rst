.. Copyright (C) 2015–2022 Wazuh, Inc.

.. meta:: :description: Learn how to install the Wazuh dashboard using the Wazuh installation assistant. The Wazuh dashboard is a flexible and intuitive web interface for mining and visualizing security events and archives. 


Installing the Wazuh dashboard using the assistant
==================================================

Install and configure the Wazuh dashboard with the aid of the Wazuh installation assistant. Wazuh dashboard is a flexible and intuitive web interface for mining and visualizing the security events and archives.

Wazuh dashboard installation
-----------------------------

#. Download the Wazuh installation assistant. This step can be skipped if you have already installed Wazuh indexer on the same server.

    .. code-block:: console

      # curl -sO https://packages.wazuh.com/|WAZUH_LATEST_MINOR|/wazuh-install.sh



#. Run the assistant with the option ``-wd`` and the node name to install and configure the Wazuh dashboard. The node name must be the same used in ``config.yml`` for the initial configuration, for example, ``dashboard``.
   
   .. note:: Make sure that a copy of ``wazuh-install-files.tar``, created during the Wazuh indexer installation, is placed in your working directory.

   .. code-block:: console

      # bash ./wazuh-install.sh -wd dashboard

    

#. Access the Wazuh web interface with your credentials. 

     - URL: *https://<SERVER_IP>*
     - **Username**: *admin*
     - **Password**: *<ADMIN_PASSWORD>*
  

    When you access the Wazuh dashboard for the first time, the browser shows a warning message stating that the certificate was not issued by a trusted authority. An exception can be added in the advanced options of the web browser. For increased security, the ``root-ca.pem`` file previously generated can be imported to the certificate manager of the browser instead. Alternatively, a certificate from a trusted authority can be configured. 


Next steps
----------

All the Wazuh central components are successfully installed.

.. thumbnail:: /images/installation/Wazuh-Installation-workflow-complete.png
    :alt: Wazuh installation workflow
    :align: center
    :width: 100%


The Wazuh environment is now ready and you can proceed with installing the Wazuh agent on the endpoints to be monitored. To perform this action, see the :ref:`Wazuh agent <installation_agents>` section.
