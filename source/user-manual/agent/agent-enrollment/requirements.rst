.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn about the requirements to ensure the Wazuh agent enrollment is successful.

Requirements
============

The following requirements have to be in place to ensure the Wazuh agent enrollment is successful:

-  An installed and running Wazuh manager.
-  An installed and running Wazuh agent on the endpoint that the user needs to enroll.
-  Outbound connectivity from the Wazuh agent to the Wazuh manager services. The following ports are configurable:

   -  1514/TCP for agent communication.
   -  1515/TCP for enrollment via automatic agent request.
   -  55000/TCP for enrollment via Wazuh server API.

.. note::

   Instructions for installing and enrolling agents can be found in the Wazuh dashboard. Go to **Agents management** > **Summary**, and click on **Deploy new agent**.
