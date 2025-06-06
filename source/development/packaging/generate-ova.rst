.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: In this section, we describe how to create a virtual machine (VM) in Open Virtual Appliance (OVA) format with the Wazuh server, dashboard, and indexer components pre-installed.

Virtual machine
===============

In this section, we describe how to create a virtual machine (VM) in Open Virtual Appliance (OVA) format with the Wazuh server, dashboard, and indexer components pre-installed. The ``wazuh-virtual-machines/ova/generate_ova.sh`` script automates the creation of the VM. The VM works with any hypervisor, allowing quick setup of a single-node Wazuh deployment.

Requirements
------------

You need a system with a minimum of 4 CPU cores and 8 GB of RAM to build the virtual machine. Ensure that these dependencies are installed on the system:

-  `Virtual Box <https://www.virtualbox.org/manual/UserManual.html#installation>`__
-  `Vagrant <https://www.vagrantup.com/docs/installation/>`__
-  `Git <https://git-scm.com/book/en/v2/Getting-Started-Installing-Git>`__
-  `Python <https://www.python.org/download/releases/2.7/>`__

Creating the Wazuh VM
---------------------

Follow the steps below to create the Wazuh virtual machine:

#. Clone the `wazuh-virtual-machines <https://github.com/wazuh/wazuh-virtual-machines>`__ repository and navigate to the ``ova/`` directory. Select the version, for example, ``v|WAZUH_CURRENT_OVA|``.

   .. code-block:: console

      $ git clone https://github.com/wazuh/wazuh-virtual-machines && cd wazuh-virtual-machines/ova/ && git checkout v|WAZUH_CURRENT_OVA|

#. Execute the ``generate_ova.sh`` script  to create the VM.

   .. code-block:: console

      $ ./generate_ova.sh

   .. code-block:: none
      :class: output
      :emphasize-lines: 22, 24

      . . .
      Exporting ova
      0%...10%...20%...30%...40%...50%...60%...70%...80%...90%...100%
      Successfully exported 1 machine(s).
      ==> default: Destroying VM and associated drives...
      wazuh-4.11.1.ovf
      wazuh-4.11.1-disk001.vmdk
      Setting up ova for VMware ESXi
      Standardizing OVA
      Setting OVA to default
      wazuh-4.11.1.ovf
      wazuh-4.11.1-disk001.vmdk
      OVF extracted
      mv: '/home/ubuntu/wazuh-virtual-machines/ova/new-ova/wazuh-4.11.1.ovf' and '/home/ubuntu/wazuh-virtual-machines/ova/new-ova/wazuh-4.11.1.ovf' are the same file
      Files renamed
      OVF Version changed
      OVF Size changed
      Manifest changed
      wazuh-4.11.1.ovf
      wazuh-4.11.1-disk-1.vmdk
      wazuh-4.11.1.mf
      New OVA created
      Cleaned temporary directory
      Process finished
      . . .

The above command builds a VM with Wazuh central components. It uses production packages by default. If you are building a pre-release version, you must select the development package ``dev`` instead.

   .. code-block:: console

      $ ./generate_ova.sh -r dev

The ``-r`` or ``--repository`` option selects the stage to use for the packages. For example:

-  ``prod``: Packages released for production environments.
-  ``dev``: Pre-release packages for testing and development purposes.

The generated virtual machine can be found in the ``/wazuh-virtual-machines/ova/output`` directory in ``.ova`` format.

Run the following command to check all available options:

.. code-block:: console

   $ ./generate_ova.sh -h

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
