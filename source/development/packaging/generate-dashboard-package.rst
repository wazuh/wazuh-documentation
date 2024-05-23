===============
Wazuh Dashboard
===============

The packages' generation process is orchestrated by one script, which is
found within the ``dev-tools/build-packages/build-packages.sh`` folder of the repository:

- ``build-packages.sh``: This script is responsible for bundling plugins into 1 single application in tar, rpm and/or deb distributions. With the parameters ``version``, ``revision``, ``distribution``,  package of ``wazuh-dashboard``, ``wazuh-dashboard-plugins`` and ``wazuh-security-dashboards-plugin``.

Official packages are built through a GitHub Actions pipeline, however,
the process is designed to be independent enough for maximum
portability. The building process is self-contained in the application
code.

Build stage
^^^^^^^^^^^

1. To use the scrip you first need to generate the packages from the repositories:

- ``wazuh-dashboard``
- ``wazuh-security-dashboards-plugin`` 
- ``wazuh-dashboard-plugins``

To do so, follow these steps:

    1.1. Clone the Wazuh Dashboard repository and build the application.

    .. code-block:: console

        # git clone -b <branch> https://www.github.com/wazuh/wazuh-dashboard.git
        # cd wazuh-dashboard/
        # yarn osd bootstrap
        # yarn build --linux --skip-os-packages --release

    1.2. Clone the Wazuh Security Dashboards Plugin and build the plugin.

    .. code-block:: console

        # cd plugins/
        # git clone -b <branch> https://www.github.com/wazuh/wazuh-security-dashboards-plugin.git
        # cd wazuh-security-dashboards-plugin/
        # yarn
        # yarn build

    1.3. Clone the Wazuh Dashboard Plugins repository and build the plugins.

    .. code-block:: console

        # cd ../
        # git clone -b <branch> https://www.github.com/wazuh/wazuh-dashboard-plugins.git
        # cd wazuh-dashboard-plugins/
        # cp -r plugins/* ../
        # cd ../main
        # yarn
        # yarn build
        # cd ../wazuh-core/
        # yarn
        # yarn build
        # cd ../wazuh-check-updates/
        # yarn
        # yarn build

    1.4. Zip the packages and move them to the packages folder

    .. code-block:: console

        # cd ../../../
        # mkdir packages
        # cd packages
        # zip -r -j ./dashboard-package.zip ../wazuh-dashboard/target/opensearch-dashboards-<opensearch version>-linux-x64.tar.gz
        # zip -r -j ./security-package.zip ../wazuh-dashboard/plugins/wazuh-security-dashboards-plugin/build/security-dashboards-<opensearch version>.0.zip
        # zip -r -j ./wazuh-package.zip ../wazuh-dashboard/plugins/wazuh-check-updates/build/wazuhCheckUpdates-<opensearch version>.zip ../wazuh-dashboard/plugins/main/build/wazuh-<opensearch version>.zip ../wazuh-dashboard/plugins/wazuh-core/build/wazuhCore-<opensearch version>.zip

At this point you must have 3 packages in the packages folder:

-  ``dashboard-package.zip``
-  ``security-package.zip``
-  ``wazuh-package.zip``

2. Generate the final packages, by running the script:

.. code-block:: console

    # cd ../wazuh-dashboard/dev-tools/build-packages/
    # ./build-packages.sh -v <version> -r <revision> <distribution(--deb || --rpm)> -a <path to wazuh-package.zip> -s <path to security-package.zip> -b <path to dashboard-package.zip>
