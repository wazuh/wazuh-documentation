.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Discover the offline step-by-step process to install the Wazuh central components without connection to the Internet.

Offline installation
====================

You can install Wazuh even when there is no connection to the Internet. Installing the solution offline involves downloading the Wazuh central components to later install them on a system with no Internet connection. The Wazuh server, the Wazuh indexer, and the Wazuh dashboard can be installed and configured on the same host in an all-in-one deployment, or each component can be installed on a separate host as a distributed deployment, depending on your environment needs. 

For more information about the hardware requirements and the recommended operating systems, check the :ref:`Requirements <installation_requirements>` section.

.. note:: You need root user privileges to run all the commands described below.

Prerequisites
-------------

- ``curl``, ``tar``, and ``setcap`` need to be installed in the target system where the offline installation will be carried out. ``gnupg`` might need to be installed as well for some Debian-based systems.

- In some systems, the command ``cp`` is an alias for ``cp -i`` — you can check this by running ``alias cp``. If this is your case, use ``unalias cp`` to avoid being asked for confirmation to overwrite files.

Download the packages and configuration files
---------------------------------------------

#. Run the following commands from any Linux system with Internet connection. This action executes a script that downloads all required files for the offline installation on x86_64 architectures. Select the package format to download.
    
   .. tabs::

        .. group-tab:: RPM

            .. code-block:: console
        
               # curl -sO https://packages.wazuh.com/|WAZUH_CURRENT_MINOR|/wazuh-install.sh
               # chmod 744 wazuh-install.sh
               # ./wazuh-install.sh -dw rpm

        .. group-tab:: DEB

            .. code-block:: console
        
               # curl -sO https://packages.wazuh.com/|WAZUH_CURRENT_MINOR|/wazuh-install.sh
               # chmod 744 wazuh-install.sh
               # ./wazuh-install.sh -dw deb
          
#. Download the certificates configuration file.

      .. code-block:: console
        
         # curl -sO https://packages.wazuh.com/|WAZUH_CURRENT_MINOR|/config.yml

#. Edit ``config.yml`` to prepare the certificates creation.

   -  If you are performing an all-in-one deployment, replace ``"<indexer-node-ip>"``, ``"<wazuh-manager-ip>"``, and ``"<dashboard-node-ip>"`` with ``127.0.0.1``.
        
   -  If you are performing a distributed deployment, replace the node names and IP values with the corresponding names and IP addresses. You need to do this for all the Wazuh server, the Wazuh indexer, and the Wazuh dashboard nodes. Add as many node fields as needed.


#.  Run the ``./wazuh-install.sh -g`` to create the certificates. For a multi-node cluster, these certificates need to be later deployed to all Wazuh instances in your cluster.

    .. code-block:: console
    
        # ./wazuh-install.sh -g            

#. Copy or move the ``wazuh-install.sh``, ``wazuh-offline.tar.gz`` and ``wazuh-install-files.tar`` files to a directory of the host(s) from where the offline installation will be carried out. This can be done by using ``scp``.


Next steps
----------

Once the Wazuh files are ready and copied to the specified hosts, it is necessary to install the Wazuh components.


.. toctree::
  :maxdepth: 1

  installation-assistant
  step-by-step