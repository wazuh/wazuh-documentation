.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn about the steps to upgrade a Wazuh agent using a custom WPK file in a WPK repository.

Installing a custom WPK
=======================

Follow the steps below to upgrade a Wazuh agent using a custom WPK file in a WPK repository:

#. Install the root CA into the Wazuh agent. The root CA certificate or the certificate used to sign the WPK package must be installed in the Wazuh agent before an upgrade.

   You have two options to perform this action:

   -  Add a new certificate by editing the ``ossec.conf`` file:

      .. code-block:: xml

         <agent-upgrade>
           <ca_verification>
             <enabled>yes</enabled>
             <ca_store>/var/ossec/etc/wpk_root.pem</ca_store>
             <ca_store>/<PATH_TO>/certificate</ca_store>
             <ca_store>wpk_root.pem</ca_store>
           </ca_verification>
         </agent-upgrade>

   -  Overwrite the shipped root CA with your certificate.

      .. note::

         Overwriting the shipped root CA will prevent your agent from upgrading using WPK packages from the Wazuh manager.

      .. code-block:: console

         # cp /<PATH_TO>/certificate <PATH_TO>/wpk_root.pem

      Location of ``/wpk_root.pem`` on the monitored endpoint:

      -  Linux/Unix endpoints - ``/var/ossec/etc/wpk_root.pem``
      -  macOS endpoint - ``/Library/Ossec/etc/wpk_root.pem``
      -  Windows endpoints:

         -  ``C:\Program Files (x86)\ossec-agent\wpk_root.pem`` for 64-bit systems
         -  ``C:\Program Files\ossec-agent\wpk_root.pem`` for 32-bit systems.

#. Initiate the upgrade by running this command on the Wazuh server:

   .. code-block:: console

      # /var/ossec/bin/agent_upgrade -a 001 -f <PATH_TO>/myagent.wpk -x upgrade.sh

   Where:

   -  ``-a 001`` specifies the agent to upgrade.
   -  ``-f <PATH_TO>/myagent.wpk`` designates the path to the WPK package.
   -  ``-x upgrade.sh`` is the name of the upgrading script contained in the package.

   .. note::

      To upgrade a Windows agent, you must use ``upgrade.bat`` instead of ``upgrade.sh``.

   .. code-block:: none
      :class: output

      Upgrading...

      Upgraded agents:
          Agent 001 upgraded: Wazuh v4.7.2 -> Wazuh v4.8.0
