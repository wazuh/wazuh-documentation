=============
Wazuh Dashboard
=============

The packages' generation process is orchestrated by one script, which is
found within the ``dev-tools/build-packages/build-packages.sh`` folder of the repository:

-  ``build-packages.sh``: This script is responsible for bundling plugins into 1 single application 
in tar, rpm and/or deb distributions. With the parameters ``version``, ``revision``, ``distribution``, 
package of ``wazuh-dashboard``, ``wazuh-dashboard-plugins`` and ``wazuh-security-dashboards-plugin``

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

    1. Clone the Wazuh Dashboard repository and build the application.

.. code:: console
    # // Clone the Wazuh Dashboard repository
    # git clone -b <branch> https://www.github.com/wazuh/wazuh-dashboard
    # // Install the dependencies
    # cd wazuh-dashboard/
    # yarn osd bootstrap
    # // Build the application
    # yarn build --linux --skip-os-packages 

    2. Clone the Wazuh Security Dashboards Plugin and build the plugin.

.. code:: console
    # // Clone the Wazuh Security Dashboards Plugin repository
    # cd plugins/
    # git clone -b <branch> https://www.github.com/wazuh/wazuh-security-dashboards-plugin
    # cd wazuh-security-dashboards-plugin/
    # // Build the plugin
    # yarn build

    3. Clone the Wazuh Dashboard Plugins repository and build the plugins.

.. code:: console
    # // Clone the Wazuh Dashboard Plugins repository
    # cd ../
    # git clone -b <branch> https://www.github.com/wazuh/wazuh-dashboard-plugins
    # // Move the plugin to the plugins folder
    # cd wazuh-dashboard-plugins/
    # cp -r plugins/* ../
    # // Build plugins
    # cd ../main
    # yarn
    # yarn build
    # cd ../wazuh-core/
    # yarn
    # yarn build
    # cd ../wazuh-check-updates/
    # yarn
    # yarn build

    4. Zip the packages and move them to the packages folder

.. code:: console
    # // Zip the packeges
    # cd ../../../
    # mkdir packages
    # cd packages
    # zip -r -j ./dashboard-package.zip ../wazuh-dashboard/target/opensearch-dashboards-<opensearch version>-SNAPSHOT-linux-x64.tar.gz
    # zip -r -j ./security-package.zip ../wazuh-dashboard/plugins/wazuh-security-dashboards-plugin/build/security-dashboards-<opensearch version>.0.zip
    # zip -r -j ./wazuh-package.zip ../wazuh-dashboard/plugins/wazuh-check-updates/build/wazuhCheckUpdates-<opensearch version>.zip ../wazuh-dashboard/plugins/main/build/wazuh-<opensearch version>.zip ../wazuh-dashboard/plugins/wazuh-core/build/wazuhCore-<opensearch version>.zip

At this point you must have 3 packages in the packages folder:

-  ``dashboard-package.zip``
-  ``security-package.zip``
-  ``wazuh-package.zip``

2. Generate the final packages, by running the script:

.. code:: console
    # // Run the script
    # cd ../wazuh-dashboard/dev-tools/build-packages/
    # ./build-packages.sh -v <version> -r <revision> <distribution(--deb || --rpm)> -a <path to wazuh-package.zip> -s <path to security-package.zip> -b <path to dashboard-package.zip>
    # ./build-packages.sh -v 4.9.0 -r 1 --tar -a /Users/ianyenienserrano/wazuh/buildPackage/pacakes/wazuh-package.zip  -s /Users/ianyenienserrano/wazuh/buildPackage/pacakes/security-package.zip -b /Users/ianyenienserrano/wazuh/buildPackage/pacakes/dashboard-package.zip
