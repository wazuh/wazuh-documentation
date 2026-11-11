.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: There are different ways to remove a Wazuh agent that is enrolled in the Wazuh manager. Learn more in this section of the documentation.

Removing agents
===============

There are different ways to remove a Wazuh agent that is enrolled in the Wazuh manager. This includes using the CLI or querying the Wazuh server API.

The Wazuh manager can also remove agents automatically. Set the ``monitord.delete_old_agents`` internal option in ``/var/ossec/etc/local_internal_options.conf`` to the number of minutes that an agent must stay disconnected before the Wazuh manager removes it, from ``0`` to ``9600``. The default value, ``0``, keeps disconnected agents. See :doc:`Internal configuration </user-manual/reference/internal-options>` in the Reference.

.. toctree::
   :maxdepth: 2

   remove
   restful-api-remove
