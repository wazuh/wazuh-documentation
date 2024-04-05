.. Copyright (C) 2015, Wazuh, Inc.

.. _install-custom-wpk:

Installing a custom WPK package
===============================

1. Install the root CA into the agent
-------------------------------------

Either the root CA certificate or the certificate used to sign the WPK package must be installed in the agent before running an upgrade.

You have two options to perform this action:

    a. Overwrite the shipped root CA with your certificate. This will prevent your agent from upgrading using WPK packages from Wazuh.

    .. code-block:: console

        # cp /path/to/certificate etc/wpk_root.pem

    b. Add a new certificate by editing the ossec.conf file:

    .. code-block:: xml

        <agent-upgrade>
            <ca_verification>
                <enabled>yes</enabled>
                <ca_store>/var/ossec/etc/wpk_root.pem</ca_store>
                <ca_store>/path/to/certificate</ca_store>
            </ca_verification>
        </agent-upgrade>


2. Run the upgrade
------------------

Run the WPK package from the Wazuh manager:

.. code-block:: console

    # /var/ossec/bin/agent_upgrade -a 001 -f path/to/myagent.wpk -x upgrade.sh

Where:
    - **-a 001** specifies the agent to upgrade.
    - **-f path/to/myagent.wpk** designates the path to the WPK package.
    - **-x upgrade.sh** is the name of the upgrading script contained in the package.

.. note::
   To upgrade a Windows agent, you must use ``upgrade.bat`` instead of ``upgrade.sh``.

Output example:

.. code-block:: none
    :class: output

    Upgrading...

    Upgraded agents:
        Agent 001 upgraded: Wazuh v4.2.7 -> Wazuh v|WAZUH_CURRENT|
