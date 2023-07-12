.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how to white-list IP addresses and how to increase the active response blocking time in this section of the documentation.

Additional information
======================

White list
----------

You can set a list of IP addresses that should never be blocked by the active response using the :ref:`white_list <white_list>` field.  It allows setting one IP address, netblock, or  hostname. Although you must specify only one value for each ``<white_list>`` tag, you can use multiple ``<white_list>`` tags to include multiple values.

To configure a white list for the endpoint(s), add the related IP address, netblock, or hostname to the ``<white_list>`` field present in the global section of the Wazuh server ``/var/ossec/etc/ossec.conf`` configuration file:

.. code-block:: xml
   :emphasize-lines: 6

   <ossec_config>
     <global>
       <jsonout_output>yes</jsonout_output>
       <email_notification>no</email_notification>
       <logall>yes</logall>
       <white_list><WHITE_LISTED_IP><white_list>
     </global>
   </ossec_config>

Restart the Wazuh manager service to apply the changes:

.. code-block:: console

   $ sudo systemctl restart wazuh-manager

Increasing blocking time for repeated offenders
-----------------------------------------------

In cases where you need to increase the active response blocking time for :ref:`repeated offenders <repeated_offenders>`, add the following configuration in the ``/var/ossec/etc/ossec.conf`` file of the Wazuh agent:

.. code-block:: xml

   <ossec_config>
     <active-response>
       <repeated_offenders>10,20,30</repeated_offenders>
     </active-response>
   </ossec_config>

.. note::

   This option is currently not available for Wazuh agents running on Windows operating endpoints. The ``<repeated offenders>`` timer is in minutes while the active response ``<timeout>`` is in seconds. Also, it can contain a maximum of 5 entries.

Restart the Wazuh agent to apply changes:

.. code-block:: console

   $ sudo systemctl restart wazuh-agent

The first time the active response triggers, it blocks the IP address for the specified period using the ``<timeout>`` configured on the Wazuh server side. Then, the second time for 10 minutes, the third time for 20 minutes, and the fourth time for 30 minutes using the ``<repeated offenders>`` on the agent side.

Using the active response module, you can respond to several scenarios like restricting malicious activities and blocking attacks. Be aware that improperly configured responses can make an endpoint vulnerable, so you have to define your active responses carefully.
