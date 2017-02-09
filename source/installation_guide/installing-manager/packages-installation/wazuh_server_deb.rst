.. _wazuh_server_deb:

Install Wazuh manager and API (deb)
====================================

Adding Wazuh repositories
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Add the Wazuh repositories to your system. Also, it is possible to download the :ref:`required package <packages>`.

**1.** In order to perform this procedure properly, packages ``curl`` and ``apt-transport-https`` must be installed into your system. If they are not, install them::

	apt-get install curl apt-transport-https

**2.** Install the GPG key::

	curl -s https://packages.wazuh.com/key/GPG-KEY-WAZUH | apt-key add -

**3.** Add the Wazuh repository depending on your operating system:

- Debian 7 "Wheezy"::

    echo "deb https://packages.wazuh.com/apt wheezy main" | tee /etc/apt/sources.list.d/wazuh.list

- Debian 8 "Jessie"::

    echo "deb https://packages.wazuh.com/apt jessie main" | tee /etc/apt/sources.list.d/wazuh.list

- Debian "stretch" (testing)::

    echo "deb https://packages.wazuh.com/apt stretch main" | tee /etc/apt/sources.list.d/wazuh.list

- Debian "sid" (unstable)::

    echo "deb https://packages.wazuh.com/apt sid main" | tee /etc/apt/sources.list.d/wazuh.list

- Ubuntu 12.04 "Precise Pangolin"::

    echo "deb https://packages.wazuh.com/apt precise main" | tee /etc/apt/sources.list.d/wazuh.list

- Ubuntu 14.04 "Trusty Tahr"::

    echo "deb https://packages.wazuh.com/apt trusty main" | tee /etc/apt/sources.list.d/wazuh.list

- Ubuntu 15.04 "Vivid Vervet"::

    echo "deb https://packages.wazuh.com/apt vivid main" | tee /etc/apt/sources.list.d/wazuh.list

- Ubuntu 15.10 "Wily Werewolf"::

    echo "deb https://packages.wazuh.com/apt wily main" | tee /etc/apt/sources.list.d/wazuh.list

- Ubuntu 16.04 "Xenial Xerus"::

    echo "deb https://packages.wazuh.com/apt xenial main" | tee /etc/apt/sources.list.d/wazuh.list

- Ubuntu 16.10 "Yakkety Yak"::

    echo "deb https://packages.wazuh.com/apt yakkety main" | tee /etc/apt/sources.list.d/wazuh.list

**4.** Update the package information::

	apt-get update

Installing manager
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Install the Wazuh manager::

	apt-get install wazuh-manager


Installing API
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

**1.** NodeJS >= 4.6.1 is required in order to run the API. If you do not have installed NodeJS or your version is older than 4.6.1, we recommend to add the official repositories::

	curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -

**2.** Install the Wazuh API. It will update NodeJS if it is required::

	apt-get install wazuh-api

**3.** Python >= 2.7 is required in order to run the API. It is installed by default or included in the official repositories in the most of Linux distributions.

It is possible to set the path of Python in the API configuration at */var/ossec/api/configuration/config.js*::

    config.python = [
        // Default installation
        {
            bin: "python",
            lib: ""
        },
        // Package 'python27' for CentOS 6
        {
            bin: "/opt/rh/python27/root/usr/bin/python",
            lib: "/opt/rh/python27/root/usr/lib64"
        }
    ];

Next steps
----------

Once you've installed the Wazuh manager, you may want to :ref:`Install Filebeat <filebeat_deb>`.
