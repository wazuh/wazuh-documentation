.. Copyright (C) 2020 Wazuh, Inc.

.. _upgrading_same_minor_or_major:

Upgrade from the same minor or major version
============================================

This section explains how to upgrade a Wazuh installation within same minor version (for example, 3.9.0 to 3.9.5)
or within the same major version (for example, from 3.8.2 to |WAZUH_LATEST|).

Upgrade the Wazuh manager and Wazuh API
---------------------------------------

    .. include:: ../../_templates/upgrading/wazuh/update_manager_api.rst

.. note::
  The installation of the updated packages **will automatically restart the services** for the Wazuh manager and API. The Wazuh config file will keep **unmodified**, so the settings for the new capabilities will have to be added manually. Check the :ref:`User Manual <user_manual>` for more information.


Disabling repositories
----------------------

    .. include:: ../../_templates/upgrading/wazuh/disable_repository.rst
    