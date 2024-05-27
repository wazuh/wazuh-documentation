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

Build manually
^^^^^^^^^^^^^^

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

2. Generate the final packages, by running the script ``build-packages.sh`` in the ``dev-tools/build-packages/`` folder of the repository. 
The script requires the following parameters:

- ``-v``: Version of the package.
- ``-r``: Revision of the package.
- ``--deb`` or ``--rpm``: Distribution of the package.
- ``-a``: Path to the ``wazuh-package.zip``.
- ``-s``: Path to the ``security-package.zip``.
- ``-b``: Path to the ``dashboard-package.zip``.

.. code-block:: console

    # cd ../wazuh-dashboard/dev-tools/build-packages/
    # ./build-packages.sh -v <version> -r <revision> <distribution(--deb || --rpm)> -a <path to wazuh-package.zip> -s <path to security-package.zip> -b <path to dashboard-package.zip>

The package will be generated in the ``output`` folder of the same directory where the script is located.


Build with Docker image
^^^^^^^^^^^^^^^^^^^^^^^

With this option you can create an image that has the package in tar.gz format
and then if desired you can use the created package to generate the .deb or .rpm file.

1. Clone the Wazuh Dashboard repository.

.. code-block:: console

    # git clone -b <branch> https://www.github.com/wazuh/wazuh-dashboard.git
    # cd wazuh-dashboard/dev-tools/build-packages/

2. Build the Docker image with the following parameters:

- ``NODE_VERSION``: Node version to use in the ``.nvmrc`` file.
- ``WAZUH_DASHBOARDS_BRANCH``: Branch of the Wazuh Dashboards repository.
- ``WAZUH_DASHBOARDS_PLUGINS``: Branch of the Wazuh Dashboards Plugins repository.
- ``WAZUH_SECURITY_DASHBOARDS_PLUGIN_BRANCH``: Branch of the Wazuh Security Dashboards Plugin repository.
- ``OPENSEARCH_DASHBOARDS_VERSION``: Version of the OpenSearch Dashboards(you can find the version in the package.json file of the Wazuh Dashboards repository)
- ``-t``: Tag of the image.

.. code-block:: console

    # docker build \
    # --build-arg NODE_VERSION=<Node version> \
    # --build-arg WAZUH_DASHBOARDS_BRANCH=<Branch of wazuh-dashboard> \
    # --build-arg WAZUH_DASHBOARDS_PLUGINS=<Branch of the wazuh-dashboard-plugins> \
    # --build-arg WAZUH_SECURITY_DASHBOARDS_PLUGIN_BRANCH=<Branch of wazuh-security-dashboards-plugin> \
    # --build-arg OPENSEARCH_DASHBOARDS_VERSION=<Opensearch dashboard version> \
    # -t <Tag of image> \ 
    # -f wazuh-dashboard.Dockerfile .

Example:

.. code-block:: console

    # docker build \
    # --build-arg NODE_VERSION=18.19.0 \
    # --build-arg WAZUH_DASHBOARDS_BRANCH=4.9.0 \
    # --build-arg WAZUH_DASHBOARDS_PLUGINS=4.9.0 \
    # --build-arg WAZUH_SECURITY_DASHBOARDS_PLUGIN_BRANCH=4.9.0 \
    # --build-arg OPENSEARCH_DASHBOARDS_VERSION=2.13.0 \
    # -t wzd:4.9.0 \
    # -f wazuh-dashboard.Dockerfile .

3. Run the Docker image:

.. code-block:: console

    # docker run -d --rm --name wazuh-dashboard-package <Tag of image> tail -f /dev/null

Example:

.. code-block:: console

    # docker run -d --rm --name wazuh-dashboard-package wzd:4.9.0 tail -f /dev/null

4. Copy the package to the host:

.. code-block:: console

    # docker cp wazuh-dashboard-package:/home/node/packages/. <path to save the package>

Example:

.. code-block:: console

    # docker cp wazuh-dashboard-package:/home/node/packages/. /

This copies the final package and the packages that were used to generate the final package.

5 (Optional). If you want to generate the .deb or .rpm file, you can use the script ``launcher.sh`` in the ``dev-tools/build-packages/(rpm or deb)/`` folder of the repository with the following parameters:

- ``-v``: Version of the package.
- ``-r``: Revision of the package.
- ``-p``: Path to the package in tar.gz format generated in the previous step

.. code-block:: console

    # ./launcher.sh -v <version> -r <revision> -p <path to package>

Example:

.. code-block:: console

    # ./launcher.sh -v 4.9.0 -r 1 -p file:///wazuh-dashboard-4.9.0-1-linux-x64.tar.gz

The package will be generated in the ``output`` folder of the ``rpm`` or ``deb`` folder.
