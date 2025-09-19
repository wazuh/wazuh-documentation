.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Wazuh provides an automated way of building the Wazuh indexer package. Learn more in this section of the documentation.

Wazuh indexer
=============

Wazuh provides an automated way of building the Wazuh indexer package. The package generation process is orchestrated by two scripts, which are located in the ``wazuh-indexer/packaging_scripts`` directory of the `wazuh-indexer <https://github.com/wazuh/wazuh-indexer>`__ repository. The generation process is separated into two stages:

-  **Build stage**: In this stage, the Java application is compiled and bundled into a package using the ``build.sh`` script.
-  **Assemble stage**: In this stage, plugins and configuration files are added to the package from the previous step using the ``assemble.sh`` script. The package is then ready for deployment in production.

.. note::

   Official packages are built through a GitHub Actions pipeline, but the process is designed to be flexible and adaptable, and not strictly tied to GitHub Actions. Additionally, `act <https://github.com/nektos/act>`__ enables local testing and debugging of GitHub Actions workflows. The packages can also be built directly in a local Linux environment.

Prerequisites
-------------

-  Clone the `wazuh-indexer <https://github.com/wazuh/wazuh-indexer>`__ repository and navigate to the ``wazuh-indexer/`` directory. Select the version, for example, ``v|WAZUH_CURRENT|``.

   .. code-block:: console

      $ git clone https://github.com/wazuh/wazuh-indexer && cd wazuh-indexer && git checkout v|WAZUH_CURRENT|

Build stage
-----------

Docker environment
^^^^^^^^^^^^^^^^^^

Follow the steps below to build the Wazuh indexer package using the provided `Docker environment <https://www.github.com/wazuh/wazuh-indexer/tree/v|WAZUH_CURRENT|/docker>`__:

#. Run the ``ci.sh`` script to start the provisioned containers for package generation:

   .. code-block:: console

      $ cd docker/ci/ && bash ./ci.sh up

   .. note::

      The provisioned container can be further managed using: ``./ci.sh {up|down|stop}``.

#. Run the following command to build the Wazuh indexer package using the Docker container:

   .. tabs::

      .. group-tab:: RPM

         .. code-block:: console

            $ docker exec -it wi-build_v|WAZUH_CURRENT| bash packaging_scripts/build.sh -a x64 -d rpm

      .. group-tab:: DEB

         .. code-block:: console

            $ docker exec -it wi-build_v|WAZUH_CURRENT| bash packaging_scripts/build.sh -a x64 -d deb

      .. group-tab:: TAR

         .. code-block:: console

            $ docker exec -it wi-build_v|WAZUH_CURRENT| bash packaging_scripts/build.sh -a x64 -d tar

The generated package is sent to the ``wazuh-indexer/artifacts/dist`` directory.

Local package generation
^^^^^^^^^^^^^^^^^^^^^^^^

For local package generation, use the ``build.sh`` script. Take a look at the ``build.yml`` workflow file for an example of usage.

.. code:: console

   # bash packaging_scripts/build.sh -a x64 -d tar -n $(bash packaging_scripts/baptizer.sh -a x64 -d tar -m)

The generated package is sent to the ``wazuh-indexer/artifacts/dist`` folder.

Assembly stage
--------------

Docker environment
^^^^^^^^^^^^^^^^^^

Follow the steps below to assemble the generated Wazuh indexer package using the provided `Docker environment <https://www.github.com/wazuh/wazuh-indexer/tree/v|WAZUH_CURRENT|/docker>`__:

#. Navigate to the ``wazuh-indexer/artifacts/dist`` directory to access the created packages from the build stage:

   .. code-block:: console

      $ cd ../../artifacts/dist

#. Run the following commands to assemble the packages using the Docker container provisioned in the build stage with the ``ci.sh`` script:

   .. tabs::

      .. group-tab:: RPM

         .. code-block:: console

            # docker exec -it wi-assemble_|WAZUH_CURRENT| bash packaging_scripts/assemble.sh -a x64 -d rpm

      .. group-tab:: DEB

         .. code-block:: console

            # docker exec -it wi-assemble_|WAZUH_CURRENT| bash packaging_scripts/assemble.sh -a x64 -d deb

      .. group-tab:: TAR

         .. code-block:: console

            # docker exec -it wi-assemble_|WAZUH_CURRENT| bash packaging_scripts/assemble.sh -a x64 -d tar

Local package generation
^^^^^^^^^^^^^^^^^^^^^^^^

Follow the steps below to assemble the generated package locally for both RPM and DEB environments.

.. note::

   Set the environment variable ``TEST=true`` to assemble a package with a minimal set of plugins. This will speed up the assembly process.

.. tabs::

   .. group-tab:: RPM

      The ``assemble.sh`` script will use the output from the ``build.sh`` script and use it as a base to bundle together a final package containing the plugins, the production configuration, and the service files.

      The script will:

      #. Extract the RPM package using ``rpm2cpio`` and ``cpio`` tools.

         By default, ``rpm2cpio`` and ``cpio`` tools expect the package to be in ``wazuh-indexer/artifacts/tmp/rpm``.
         The script creates the required folder structure, copying also the min package and the SPEC file.

         Current folder loadout at this stage:

         .. code-block:: none

            /rpm/$ARCH
                /etc
                /usr
                /var
                wazuh-indexer-min-*.rpm
                wazuh-indexer.rpm.spec

         ``usr``, ``etc`` and ``var`` folders contain ``wazuh-indexer`` files, extracted from ``wazuh-indexer-min-*.rpm``.

         ``wazuh-indexer.rpm.spec`` is copied from ``wazuh-indexer/distribution/packages/src/rpm/wazuh-indexer.rpm.spec``.

         The ``wazuh-indexer-performance-analyzer.service`` file is also copied from the same folder. It is a dependency of the SPEC file.

      #. Install the plugins using the ``opensearch-plugin`` CLI tool.
      #. Set up configuration files. They are included in ``min-package``. Default files are overwritten.
      #. Bundle an RPM file with ``rpmbuild`` and the SPEC file ``wazuh-indexer.rpm.spec``.

         ``rpmbuild`` is part of the ``rpm`` OS package. ``rpmbuild`` is invoked from ``wazuh-indexer/artifacts/tmp/rpm``.

         It creates the ``{BUILD,RPMS,SOURCES,SRPMS,SPECS,TMP}`` folders and applies the rules in the SPEC file.

         If successful, ``rpmbuild`` will generate the package in the ``RPMS/`` folder.

         The script will copy it to ``wazuh-indexer/artifacts/dist`` and cleanly remove the ``tmp\`` folder and its contents.

         Current folder loadout at this stage:

         .. code-block:: none

            /rpm/$ARCH
                /{BUILD,RPMS,SOURCES,SRPMS,SPECS,TMP}
                /etc
                /usr
                /var
                wazuh-indexer-min-*.rpm
                wazuh-indexer.rpm.spec

   .. group-tab:: DEB

      For DEB packages, the ``assemble.sh`` script will perform the following operations:

      #. Extract the DEB package using ``ar`` and ``tar`` tools.

         By default, the ``ar`` and ``tar`` tools expect the package to be in the ``wazuh-indexer/artifacts/tmp/deb`` directory. The script creates the required folder structure, copying also the min package and the Makefile.

         Current folder loadout at this stage:

         .. code-block:: none

            artifacts/
            |-- dist
            |   |-- wazuh-indexer-min_|WAZUH_CURRENT|_amd64.deb
            `-- tmp
                `-- deb
                    |-- Makefile
                    |-- data.tar.gz
                    |-- debmake_install.sh
                    |-- etc
                    |-- usr
                    |-- var
                    `-- wazuh-indexer-min_|WAZUH_CURRENT|_amd64.deb

         ``usr``, ``etc`` and ``var`` folders contain ``wazuh-indexer`` files, extracted from ``wazuh-indexer-min-*.deb`` directory.

         ``Makefile`` and the ``debmake_install`` are copied over from ``wazuh-indexer/distribution/packages/src/deb`` directory.

         The ``wazuh-indexer-performance-analyzer.service`` file is also copied from the same folder. It is a dependency of the SPEC file.

      #. Install the plugins using the ``opensearch-plugin`` CLI tool.
      #. Set up configuration files. They are included in ``min-package``. The default files are overwritten.
      #. Bundle a DEB file with ``debmake`` and the ``Makefile``.

         ``debmake`` and other dependencies can be installed using the ``provision.sh`` script. The script is invoked by the GitHub Workflow.

         Current folder loadout at this stage:

         .. code-block:: none

            artifacts/
            |-- artifact_name.txt
            |-- dist
            |   |-- wazuh-indexer-min_|WAZUH_CURRENT|_amd64.deb
            |   `-- wazuh-indexer_|WAZUH_CURRENT|_amd64.deb
            `-- tmp
                `-- deb
                    |-- Makefile
                    |-- data.tar.gz
                    |-- debmake_install.sh
                    |-- etc
                    |-- usr
                    |-- var
                    |-- wazuh-indexer-min_|WAZUH_CURRENT|_amd64.deb
                    `-- debian/
                        | -- control
                        | -- copyright
                        | -- rules
                        | -- preinst
                        | -- prerm
                        | -- postinst

   .. group-tab:: TAR

      The assembly process for tarballs consists on:

      #. Extraction of the minimal package
      #. Bundling of plugins
      #. Addition of Wazuh configuration files and tooling
      #. Compression

      .. code:: console

         # bash packaging_scripts/assemble.sh -a x64 -d tar -r 1

Build and assemble scripts reference
------------------------------------

The package generation process is guided through bash scripts. Below is a reference showing their inputs, outputs, and code:

.. code:: none

   scripts:
      - file: build.sh
        description: |
           generates a distribution package by running the appropiate Gradle task 
           depending on the parameters.
        inputs:
           architecture: [x64, arm64] # Note: we only build x86_64 packages
           distribution: [tar, deb, rpm]
           name: the name of the package to be generated.
        outputs:
           package: minimal wazuh-indexer package for the required distribution.

      - file: assemble.sh
        description: |
           bundles the wazuh-indexer package generated in by build.sh with plugins, 
           configuration files and demo certificates (certificates yet to come).
        inputs:
           architecture: [x64, arm64] # Note: we only build x86_64 packages
           distribution: [tar, deb, rpm]
           revision: revision number. 0 by default.
        outputs:
           package: wazuh-indexer package.

      - file: provision.sh
        description: Provision script for the assembly of DEB packages.

      - file: baptizer.sh
        description: generate the wazuh-indexer package name depending on the parameters.
        inputs:
           architecture: [x64, arm64] # Note: we only build x86_64 packages
           distribution: [tar, deb, rpm]
           revision: revision number. 0 by default.
           is_release: if set, uses release naming convention.
           is_min: if set, the package name will start by `wazuh-indexer-min`. Used on the build stage.
        outputs:
           package: the name of the wazuh-indexer package
