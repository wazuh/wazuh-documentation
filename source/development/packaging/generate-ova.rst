.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Wazuh provides an automated way of generating a Virtual machine in OVA format. Learn how to build a Virtual machine with Wazuh central components installed in this section.  

Virtual machine
===============

We provide an automated way of generating a virtual machine (VM). The ``generate_ova.sh`` script creates a VM in OVA format. The generated VM is ready to run the Wazuh central components.

Requirements
------------

-  `Virtual Box <https://www.virtualbox.org/manual/UserManual.html#installation>`__
-  `Vagrant <https://www.vagrantup.com/docs/installation/>`__
-  `Git <https://git-scm.com/book/en/v2/Getting-Started-Installing-Git>`__
-  `Python <https://www.python.org/download/releases/2.7/>`__

We recommend using a system with at least the following hardware specifications:

-  8 GB RAM
-  4 cores CPU

Creating the Wazuh VM
---------------------

To create the virtual machine follow these steps:

#. Download our *wazuh-packages* repository from GitHub and navigate to the ``ova/`` directory. Select the version, for example, ``v|WAZUH_CURRENT_OVA|``.

   .. code-block:: console

      $ git clone https://github.com/wazuh/wazuh-packages && cd wazuh-packages/ova && git checkout v|WAZUH_CURRENT_OVA|

#. Execute the ``generate_ova.sh`` script.

   -  Using production packages.

      .. code-block:: console

         $ ./generate_ova.sh

   -  Using development packages.

      .. code-block:: console

         $ ./generate_ova.sh -r dev

   These alternative commands above build a Wazuh VM with Wazuh central components. Check all available options by running the following command.

   .. code-block:: console

      $ ./generate_ova.sh -h

   .. code-block:: none
      :class: output

      General usage: generate_ova.sh [OPTIONS]
        -r,    --repository       [Optional] Select the software repository [prod/dev]. By default: prod
        -s,    --store <path>     [Optional] Set the destination absolute path where the OVA file will be stored.
        -c,    --checksum         [Optional] Generate checksum [yes/no]. By default: no
        -g,    --debug            [Optional] Set debug mode on [yes/no]. By default: no
        -h,    --help             [  Util  ] Show this help.
    
   The ``-r`` or ``--repository`` option selects the stage to use for the packages. Depending on this parameter, the script generates the OVA file using Wazuh packages in this way:

   -  ``prod``: Packages released for production environments.
   -  ``dev``: Pre-release packages for testing and development purposes.
