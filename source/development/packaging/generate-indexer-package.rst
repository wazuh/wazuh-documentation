Wazuh Indexer packages generation guide
=======================================

The packages' generation process consists on 2 steps:

-  **Build**: compiles the Java application and bundles it into a
   package.
-  **Assembly**: uses the package from the previous step and inflates it
   with plugins and configuration files, ready for production
   deployment.

We usually generate the packages using GitHub Actions, however, the
process is designed to be independent enough for maximum portability.
GitHub Actions provides infrastructure, while the building process is
self-contained in the application code.

Instructions for Act, Docker and local build environments can be found
below:

Act
---

-  `Install Act <https://github.com/nektos/act>`__

The names of the packages are managed by the ``baptizer.sh`` script.

Build:
~~~~~~

::

   act -j build -W .github/workflows/build.yml --artifact-server-path ./artifacts

   [Build slim packages/build] 🏁  Job succeeded

Assemble:
~~~~~~~~~

DEB:
^^^^

::

   act -j assemble -W .github/workflows/build.yml --artifact-server-path ./artifacts --matrix distribution:deb --matrix architecture:x64

   [Build slim packages/build] 🏁  Job succeeded

RPM:
^^^^

::

   act -j assemble -W .github/workflows/build.yml --artifact-server-path ./artifacts --matrix distribution:rpm --matrix architecture:x64 --var OPENSEARCH_VERSION=2.11.1

   [Build slim packages/build] 🏁  Job succeeded

Docker
------

.. _build-1:

Build:
~~~~~~

DEB/RPM
^^^^^^^

Using the `Docker environment <../docker>`__:

::

   docker exec -it wi-build_$(<VERSION) bash packaging_scripts/build.sh -a {x64|arm64} -d {rpm|deb|tar}

.. _assemble-1:

Assemble:
~~~~~~~~~

.. _deb-1:

DEB
^^^

Pre-requisites:

-  Current directory: ``wazuh-indexer/``
-  Existing deb package in ``wazuh-indexer/artifacts/dist/deb``, as a
   result of the *Build* stage.
-  Using the `Docker environment <../docker>`__:

::

   docker exec -it wi-assemble_$(<VERSION) bash packaging_scripts/assemble.sh -a x64 -d deb

.. _rpm-1:

RPM
^^^

Pre-requisites:

-  Current directory: ``wazuh-indexer/``
-  Existing rpm package in ``wazuh-indexer/artifacts/dist/rpm``, as a
   result of the *Build* stage.
-  Using the `Docker environment <../docker>`__:

::

   docker exec -it wi-assemble_$(<VERSION) bash packaging_scripts/assemble.sh -a x64 -d rpm

Local
-----

.. _build-2:

Build
~~~~~

For local package generation, use the ``build.sh`` script. Take a look
at the ``build.yml`` workflow file for an example of usage.

::

   bash packaging_scripts/build.sh -a x64 -d tar -n $(bash packaging_scripts/baptizer.sh -a x64 -d tar -m)

The generated package is sent to the ``wazuh-indexer/artifacts`` folder.

.. _assemble-2:

Assemble
~~~~~~~~

**Note:** set the environment variable ``TEST=true`` to assemble a
package with a minimal set of plugins, speeding up the assembly process.

TAR
~~~

The assembly process for tarballs consists on:

#. Extraction of the minimal package
#. Bundling of plugins
#. Addition of Wazuh configuration files and tooling
#. Compression

::

   bash packaging_scripts/assemble.sh -a x64 -d tar -r 1

.. _deb-2:

DEB
~~~

For DEB packages, the ``assemble.sh`` script will perform the following
operations:

#. Extract the deb package using ``ar`` and ``tar`` tools.

      By default, ``ar`` and ``tar`` tools expect the package to be in
      ``wazuh-indexer/artifacts/tmp/deb``. The script takes care of
      creating the required folder structure, copying also the min
      package and the Makefile.

   Current folder loadout at this stage:

   ::

      artifacts/
      |-- dist
      |   |-- wazuh-indexer-min_4.9.0_amd64.deb
      `-- tmp
          `-- deb
              |-- Makefile
              |-- data.tar.gz
              |-- debmake_install.sh
              |-- etc
              |-- usr
              |-- var
              `-- wazuh-indexer-min_4.9.0_amd64.deb

   ``usr``, ``etc`` and ``var`` folders contain ``wazuh-indexer`` files,
   extracted from ``wazuh-indexer-min-*.deb``. ``Makefile`` and the
   ``debmake_install`` are copied over from
   ``wazuh-indexer/distribution/packages/src/deb``. The
   ``wazuh-indexer-performance-analyzer.service`` file is also copied
   from the same folder. It is a dependency of the SPEC file.

#. Install the plugins using the ``opensearch-plugin`` CLI tool.

#. Set up configuration files.

      Included in ``min-package``. Default files are overwritten.

#. Bundle a DEB file with ``debmake`` and the ``Makefile``.

      ``debmake`` and other dependencies can be installed using the
      ``provision.sh`` script. The script is invoked by the GitHub
      Workflow.

   Current folder loadout at this stage:

   ::

      artifacts/
      |-- artifact_name.txt
      |-- dist
      |   |-- wazuh-indexer-min_4.9.0_amd64.deb
      |   `-- wazuh-indexer_4.9.0_amd64.deb
      `-- tmp
          `-- deb
              |-- Makefile
              |-- data.tar.gz
              |-- debmake_install.sh
              |-- etc
              |-- usr
              |-- var
              |-- wazuh-indexer-min_4.9.0_amd64.deb
              `-- debian/
                  | -- control
                  | -- copyright
                  | -- rules
                  | -- preinst
                  | -- prerm
                  | -- postinst

.. _rpm-2:

RPM
~~~

The ``assemble.sh`` script will use the output from the ``build.sh``
script and use it as a base to bundle together a final package
containing the plugins, the production configuration and the service
files.

The script will:

#. Extract the RPM package using ``rpm2cpio`` and ``cpio`` tools.

      By default, ``rpm2cpio`` and ``cpio`` tools expect the package to
      be in ``wazuh-indexer/artifacts/tmp/rpm``.The script takes care of
      creating the required folder structure, copying also the min
      package and the SPEC file.

   Current folder loadout at this stage:

   ::

      /rpm/$ARCH
          /etc
          /usr
          /var
          wazuh-indexer-min-*.rpm
          wazuh-indexer.rpm.spec

   ``usr``, ``etc`` and ``var`` folders contain ``wazuh-indexer`` files,
   extracted from ``wazuh-indexer-min-*.rpm``.
   ``wazuh-indexer.rpm.spec`` is copied over from
   ``wazuh-indexer/distribution/packages/src/rpm/wazuh-indexer.rpm.spec``.
   The ``wazuh-indexer-performance-analyzer.service`` file is also
   copied from the same folder. It is a dependency of the SPEC file.

#. Install the plugins using the ``opensearch-plugin`` CLI tool.

#. Set up configuration files.

      Included in ``min-package``. Default files are overwritten.

#. Bundle an RPM file with ``rpmbuild`` and the SPEC file
   ``wazuh-indexer.rpm.spec``.

      ``rpmbuild`` is part of the ``rpm`` OS package.

   ..

      ``rpmbuild`` is invoked from ``wazuh-indexer/artifacts/tmp/rpm``.
      It creates the {BUILD,RPMS,SOURCES,SRPMS,SPECS,TMP} folders and
      applies the rules in the SPEC file. If successful, ``rpmbuild``
      will generate the package in the ``RPMS/`` folder. The script will
      copy it to ``wazuh-indexer/artifacts/dist`` and clean: remove the
      ``tmp\`` folder and its contents.

   Current folder loadout at this stage:

   ::

      /rpm/$ARCH
          /{BUILD,RPMS,SOURCES,SRPMS,SPECS,TMP}
          /etc
          /usr
          /var
          wazuh-indexer-min-*.rpm
          wazuh-indexer.rpm.spec

``build.sh`` and ``assemble.sh`` reference
------------------------------------------

The packages' generation process is guided through bash scripts. Below
is a reference of their inputs, outputs and code:

::

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
         package: the name of the wazuh-indexer package.
