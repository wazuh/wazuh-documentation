.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Follow these steps to enroll a Linux/Unix endpoint through the Wazuh agent configuration method.

Linux/Unix
==========

Follow these steps to enroll a Linux/UNIX endpoint through the Wazuh agent configuration method.

#. Launch the terminal, obtain root access, edit the Wazuh agent configuration file ``/var/ossec/etc/ossec.conf``, and make the following changes:

   #. Add the Wazuh manager IP address or fully qualified domain name (FQDN) to the ``<address>`` setting in the ``<client><manager>`` section:

      .. code-block:: xml
         :emphasize-lines: 3

         <client>
           <manager>
             <address><WAZUH_MANAGER_IP></address>
             ...
           </manager>
         </client>

      This setting allows the Wazuh agent to connect to the Wazuh manager and request a client key automatically.

      .. note::

         If you have a Wazuh manager cluster, you can add multiple ``<client>`` sections that point to the worker nodes.

   #. (Optional) Add enrollment parameters in the ``<client><enrollment>`` section.

      .. code-block:: xml
         :emphasize-lines: 4,5

         <client>
             ...
             <enrollment>
                 <agent_name>EXAMPLE_NAME</agent_name>
                 <groups>GROUP1,GROUP2,GROUP3</groups>
                 ...
             </enrollment>
         </client>

      These optional enrollment parameters provide the Wazuh agent with specific information during enrollment. Some common enrollment parameters are:

      -  ``<agent_name>EXAMPLE_NAME</agent_name>``: Specifies the name that the Wazuh agent uses during enrollment. If you do not configure this setting, the Wazuh agent uses the endpoint hostname.
      -  ``<groups>GROUP1,GROUP2,GROUP3</groups>``: Specifies the groups that the Wazuh agent joins during enrollment. An agent group is a collection of Wazuh agents that share the same configuration. The Wazuh manager pushes configuration settings to Wazuh agents that belong to the same group. Enrollment fails if you specify a group that does not exist. Create the required group on the Wazuh manager before you use the ``<groups>`` setting. For more information, see :doc:`Grouping agents </user-manual/agent/agent-management/grouping-agents>`.

#. Restart the Wazuh agent to make the changes effective:

   .. include:: /_templates/common/restart_agent_more.rst

#. Click on the upper-left menu icon and navigate to **Agents management** > **Endpoints Summary** on the Wazuh dashboard to check for the newly enrolled Wazuh agent and its connection status. If the enrollment was successful, you will have an interface similar to the image below.

   .. thumbnail:: /images/manual/agent/linux-check-newly-enrolled.png
      :title: Check newly enrolled Wazuh agent - Linux
      :alt: Check newly enrolled Wazuh agent - Linux
      :align: center
      :width: 80%
