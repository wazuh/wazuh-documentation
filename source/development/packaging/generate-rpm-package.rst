.. Copyright (C) 2020 Wazuh, Inc.

.. _create-rpm:

RPM
===

Wazuh provides an automated way of building RPM packages using docker so there is no need for any other dependency.

To create an RPM package follow these steps:

Requirements
^^^^^^^^^^^^

 * Docker
 * Git

Download our wazuh-packages repository from GitHub and go to the rpms directory of the |WAZUH_PACKAGES_BRANCH| branch.

.. code-block:: console

 $ git clone https://github.com/wazuh/wazuh-packages && cd wazuh-packages/rpms && git checkout |WAZUH_PACKAGES_BRANCH|

Execute the ``generate_rpm_package.sh`` script, with the different options you desire. This script will build a Docker image with all the necessary tools to create the RPM and run a container that will build it:

.. code-block:: console

  #  ./generate_rpm_package.sh -h

.. code-block:: none
  :class: output

  Usage: ./generate_rpm_package.sh [OPTIONS]
  
      -b, --branch <branch>        [Required] Select Git branch or tag.
      -t, --target <target>        [Required] Target package to build [manager/api/agent].
      --packages-branch            [Required] Branch of the wazuh packages repository. 
      -a, --architecture <arch>    [Optional] Target architecture of the package [x86_64/i386/ppc64le/aarch64/armv7hl].
      -r, --revision <rev>         [Optional] Package revision that append to version e.g. x.x.x-rev
      -l, --legacy                 [Optional] Build package for CentOS 5.
      -s, --store <path>           [Optional] Set the destination path of package. By default, an output folder will be created.
      -j, --jobs <number>          [Optional] Number of parallel jobs when compiling.
      -p, --path <path>            [Optional] Installation path for the package. By default: /var/ossec.
      -d, --debug                  [Optional] Build the binaries with debug symbols and create debuginfo packages. By default: no.
      -c, --checksum <path>        [Optional] Generate checksum on the desired path (by default, if no path is specified it will be generated on the same directory than the package).
      --dont-build-docker          [Optional] Locally built docker image will be used instead of generating a new one.
      --sources <path>             [Optional] Absolute path containing wazuh source code. This option will use local source code instead of downloading it from GitHub.
      --dev                        [Optional] Use the SPECS files stored in the host instead of downloading them from GitHub.
      --src                        [Optional] Generate the source package in the destination directory.
      -h, --help                   Show this help.

Below, you will find some examples of how to build an RPM package.

.. code-block:: console

  # ./generate_rpm_package.sh -b v|WAZUH_LATEST| --packages-branch |WAZUH_PACKAGES_BRANCH| -s /tmp -t manager -a x86_64 -r my_rev.

This will generate a |WAZUH_LATEST| Wazuh manager RPM package with revision ``my_rev`` for ``x86_64`` systems.

.. code-block:: console

  # ./generate_rpm_package.sh -b v|WAZUH_LATEST| --packages-branch |WAZUH_PACKAGES_BRANCH| -s /tmp -t api -a i386 -r my_rev

This will generate a |WAZUH_LATEST| Wazuh api RPM package with revision ``my_rev`` for ``i386`` systems and store it in ``/tmp``.

.. code-block:: console

  # ./generate_rpm_package.sh -b v|WAZUH_LATEST| --packages-branch |WAZUH_PACKAGES_BRANCH| -t agent -a x86_64 -p /opt/ossec

This will generate a |WAZUH_LATEST| Wazuh agent RPM package with ``/opt/ossec`` as installation directory for ``x86_64`` systems.
