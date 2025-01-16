.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how to install the Wazuh dashboard using the assisted installation method. The Wazuh dashboard is a flexible and intuitive web interface for mining and visualizing security events and archives. 

Installing the Wazuh dashboard using the assisted installation method
=====================================================================

Install and configure the Wazuh dashboard using the assisted installation method. Wazuh dashboard is a flexible and intuitive web interface for mining and visualizing security events and archives.

Wazuh dashboard installation
-----------------------------

#. Download the Wazuh installation assistant. You can skip this step if you have already installed Wazuh indexer on the same server.

   .. code-block:: console

      # curl -sO https://packages.wazuh.com/|WAZUH_CURRENT_MINOR|/wazuh-install.sh

#. Run the Wazuh installation assistant with the option ``--wazuh-dashboard`` and the node name to install and configure the Wazuh dashboard. The node name must be the same one used in ``config.yml`` for the initial configuration, for example, ``dashboard``.
   
   .. note::
      
      Make sure that a copy of the ``wazuh-install-files.tar`` file, created during the initial configuration step, is placed in your working directory.

   .. code-block:: console

      # bash wazuh-install.sh --wazuh-dashboard dashboard

   The default Wazuh web user interface port is 443, used by the Wazuh dashboard. You can change this port using the optional parameter ``-p|--port <PORT_NUMBER>``. Some recommended ports are 8443, 8444, 8080, 8888, and 9000.

   Once the Wazuh installation is completed, the output shows the access credentials and a message that confirms that the installation was successful.

   .. code-block:: none
      :emphasize-lines: 3,4          
    
      INFO: --- Summary ---
      INFO: You can access the web interface https://<WAZUH_DASHBOARD_IP_ADDRESS>
         User: admin
         Password: <ADMIN_PASSWORD>

      INFO: Installation finished.

   You now have installed and configured Wazuh. Find all passwords that the Wazuh installation assistant generated in the ``wazuh-passwords.txt`` file inside the ``wazuh-install-files.tar`` archive. To print them, run the following command:
   
   .. code-block:: console
   
      # tar -O -xvf wazuh-install-files.tar wazuh-install-files/wazuh-passwords.txt

#. Access the Wazuh web interface with your credentials. 

   -  **URL**: ``https://<WAZUH_DASHBOARD_IP_ADDRESS>``
   -  **Username**: ``admin``
   -  **Password**: ``<ADMIN_PASSWORD>``

   When you access the Wazuh dashboard for the first time, the browser shows a warning message stating that the certificate was not issued by a trusted authority. An exception can be added in the advanced options of the web browser. For increased security, the ``root-ca.pem`` file previously generated can be imported to the certificate manager of the browser instead. Alternatively, a certificate from a trusted authority can be configured. 

-  **Recommended Action**: Disable Wazuh Updates.

   We recommend disabling the Wazuh package repositories after installation to prevent accidental upgrades that could break the environment.

   Execute the following command to disable the Wazuh repository:

   .. tabs::

      .. group-tab:: YUM

         .. code-block:: console

            # sed -i "s/^enabled=1/enabled=0/" /etc/yum.repos.d/wazuh.repo

      .. group-tab:: APT (Debian/Ubuntu)

         .. code-block:: console

            # sed -i "s/^deb /#deb /" /etc/apt/sources.list.d/wazuh.list
            # apt update

Next steps
----------

All the Wazuh central components are successfully installed.

.. raw:: html

  <div class="link-boxes-group layout-3" data-step="4">
    <div class="steps-line">
      <div class="steps-number past-step">1</div>
      <div class="steps-number past-step">2</div>
      <div class="steps-number past-step">3</div>
    </div>
    <div class="link-boxes-item past-step">
      <a class="link-boxes-link" href="../wazuh-indexer/index.html">
        <p class="link-boxes-label">Install the Wazuh indexer</p>

.. image:: ../../images/installation/Indexer-Circle.png
     :align: center
     :height: 61px

.. raw:: html

      </a>
    </div>
  
    <div class="link-boxes-item past-step">
      <a class="link-boxes-link" href="../wazuh-server/index.html">
        <p class="link-boxes-label">Install the Wazuh server</p>

.. image:: ../../images/installation/Server-Circle.png
     :align: center
     :height: 61px

.. raw:: html

      </a>
    </div>
  
    <div class="link-boxes-item past-step">
      <a class="link-boxes-link" href="index.html">
        <p class="link-boxes-label">Install the Wazuh dashboard</p>

.. image:: ../../images/installation/Dashboard-Circle.png
     :align: center
     :height: 61px
     
.. raw:: html

      </a>
    </div>
  </div>

The Wazuh environment is now ready, and you can proceed with installing the Wazuh agent on the endpoints to be monitored. To perform this action, see the :doc:`Wazuh agent </installation-guide/wazuh-agent/index>` section.
