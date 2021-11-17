.. Copyright (C) 2021 Wazuh, Inc.

.. _create-ova:

Virtual machine
===============

Wazuh provides an automated way of generating a virtual machine image in OVA format that is ready to run the Wazuh manager and ELK.

To create the virtual appliance follow these steps:

Requirements
------------
  * `Virtual Box <https://www.virtualbox.org/manual/UserManual.html#installation>`_
  * `Vagrant <https://www.vagrantup.com/docs/installation/>`_
  * `Git <https://git-scm.com/book/en/v2/Getting-Started-Installing-Git>`_
  * `Python <https://www.python.org/download/releases/2.7/>`_

Generating the virtual machine
------------------------------

#. Download the `wazuh-packages` repository from GitHub and switch to the `/ova` directory for the `|WAZUH_PACKAGES_BRANCH|` branch.

    .. code-block:: console

      $ git clone https://github.com/wazuh/wazuh-packages && cd wazuh-packages/ova && git checkout v|WAZUH_LATEST|

#. Check the full list of available options for the ``generate_ova.sh`` script using the ``-h`` parameter.

      .. code-block:: console

        $ ./generate_ova.sh -h

        General usage: ./generate_ova.sh [OPTIONS]
          -r,    --repository       [Optional] Select the software repository [prod/dev]. By default: prod
          -s,    --store <path>     [Optional] Set the destination absolute path where the OVA file will be stored.
          -c,    --checksum         [Optional] Generate checksum [yes/no]. By default: no
          -g,    --debug            [Optional] Set debug mode on [yes/no]. By default: no
          -h,    --help             [  Util  ] Show this help.

      The ``--repository`` option indicates whether to use the production or the development packages to install Wazuh.

      * ``prod``: The OVA uses release packages.
      * ``dev``: The OVA uses pre-release packages.


#. Run one of the following commands depending on your choice of a set of packages to generate the virtual machine image.

    * Using production packages.

        .. code-block:: console

          # ./generate_ova.sh


     * Using development packages.

         .. code-block:: console

           # ./generate_ova.sh -r dev
