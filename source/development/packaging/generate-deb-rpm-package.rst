.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Wazuh provides an automated way of building DEB or RPM packages. Learn how to build your own Wazuh DEB or RPM packages in this section of our documentation.

.. _create-deb-rpm:

Debian or RPM
=============

Wazuh provides an automated way of building DEB or RPM packages using docker so there is no need for any other dependency.

To create an Debian or RPM package follow these steps:

Requirements
^^^^^^^^^^^^

 * Docker
 * Git

Download our wazuh repository from GitHub and go to the debs directory.

.. code-block:: console

 $ git clone https://github.com/wazuh/wazuh && cd wazuh/packages && git checkout v|WAZUH_CURRENT|

Execute the ``generate_package.sh`` script, with the different options you desire. This script will build a Docker image with all the necessary tools to create the DEB or RPM and run a container that will build it:

.. code-block:: console

  # ./generate_package.sh -h

.. code-block:: none
  :class: output

  Usage: packages/generate_package.sh [OPTIONS]

    -b, --branch <branch>      [Optional] Select Git branch.
    -t, --target <target>      [Required] Target package to build: manager or agent.
    -a, --architecture <arch>  [Optional] Target architecture of the package [amd64/i386/ppc64le/arm64/armhf].
    -j, --jobs <number>        [Optional] Change number of parallel jobs when compiling the manager or agent. By default: 2.
    -r, --revision <rev>       [Optional] Package revision. By default: 0.
    -s, --store <path>         [Optional] Set the destination path of package. By default, an output folder will be created.
    -p, --path <path>          [Optional] Installation path for the package. By default: /var/ossec.
    -d, --debug                [Optional] Build the binaries with debug symbols. By default: no.
    -c, --checksum             [Optional] Generate checksum on the same directory than the package. By default: no.
    -l, --legacy               [Optional only for RPM] Build package for CentOS 5.
    --dont-build-docker        [Optional] Locally built docker image will be used instead of generating a new one.
    --tag                      [Optional] Tag to use with the docker image.
    --sources <path>           [Optional] Absolute path containing wazuh source code. This option will use local source code instead of downloading it from GitHub. By default use the script path.
    --is_stage                 [Optional] Use release name in package.
    --system                   [Optional] Select Package OS [rpm, deb]. By default is 'deb'.
    --src                      [Optional] Generate the source package in the destination directory.
    --future                   [Optional] Build test future package x.30.0 Used for development purposes.
    -h, --help                 Show this help.

Below, you will find some examples of how to build a DEB or RPM package.


.. tabs::

   .. group-tab:: DEB

      .. code-block:: console

        # ./generate_package.sh -s /tmp -t manager -a amd64 -r my_rev --system deb

      This will generate a |WAZUH_CURRENT| Wazuh manager package DEB with revision ``my_rev`` for ``amd64`` systems.

      .. code-block:: console

        # ./generate_package.sh -t agent -a amd64 -p /opt/ossec --system deb

      This will generate a |WAZUH_CURRENT| Wazuh agent DEB package with ``/opt/ossec`` as installation directory for ``amd64`` systems.

   .. group-tab:: RPM

      .. note::
        Use the following architecture equivalences:
          * amd64 -> x86_64
          * arm64 -> aarch64
          * armhf -> armv7hl

      .. code-block:: console

        # ./generate_package.sh -s /tmp -t manager -a amd64 -r my_rev --system rpm

      This will generate a |WAZUH_CURRENT| Wazuh manager RPM package with revision ``my_rev`` for ``x86_64`` systems.

      .. code-block:: console

        # ./generate_package.sh -t agent -a amd64 -p /opt/ossec --system rpm

      This will generate a |WAZUH_CURRENT| Wazuh agent RPM package with ``/opt/ossec`` as installation directory for ``x86_64`` systems.
