.. Copyright (C) 2020 Wazuh, Inc.

.. _upgrading_latest_minor:

Upgrade from the same major version (3.x)
=========================================

In this section it is described how to upgrade to the latest Wazuh version. This implies upgrading Elastic Stack to the latest version. Further instructions can be found :ref:`here <elastic_stack_packages_legacy>`.

Starting the upgrade
--------------------

In the :ref:`manager's <installation_guide>` and the :ref:`agent's <installation_agents>` installation guides was recommended to disable the repositories in order to prevent undesired updates. If the Wazuh repository was disabled, it should be reenabled using the following command:

    .. include:: ../../_templates/upgrading/wazuh/add_repository.rst

Upgrade the Wazuh manager and API
----------------------------------

    .. include:: ../../_templates/upgrading/wazuh/update_manager_api.rst

.. note::
  The installation of the updated packages **will automatically restart the services** for the Wazuh manager and API. The Wazuh config file will keep **unmodified**, so the settings for the new capabilities will have to be added manually. Check the :ref:`User Manual <user_manual>` for more information.


Disabling repositories
----------------------

    .. include:: ../../_templates/upgrading/wazuh/disable_repository.rst

Next steps
----------

Once you have updated the Wazuh manager and API you are ready to :ref:`upgrade the Elastic Stack<elastic_stack_packages_legacy>`.
