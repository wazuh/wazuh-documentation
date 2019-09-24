.. Copyright (C) 2019 Wazuh, Inc.

.. _create-custom-osx:

Creating custom OSX packages
=============================

Wazuh provides an automated way of building OSX packages, keep in mind that to build an OSX package you must run this tool in an OSX system.

To create an OSX package follow these steps:

Requirements
^^^^^^^^^^^^^

 * `<Packages <http://s.sudre.free.fr/Software/Packages/about.html>`_
 * `<Brew <https://brew.sh/>`_
 * git: on macOS install with homebrew use brew install git

If ``Packages`` and ``Brew`` are not already installed in your system, they can be installed using the generate_wazuh_packages.sh script

Download our wazuh-packages repository from GitHub and go to the macos directory.

.. code-block:: console

 $ git clone https://github.com/wazuh/wazuh-packages && cd wazuh-packages/macos

Execute the ``generate_wazuh_packages.sh`` script, with the different options you desire.

.. code-block:: console

 # ./generate_wazuh_packages.sh -h

 Usage: $0 [OPTIONS]
    -b, --branch <branch>     [Required] Select Git branch or tag e.g. $BRANCH"
    -s, --store-path <path>   [Optional] Set the destination absolute path of package."
    -j, --jobs <number>       [Optional] Number of parallel jobs when compiling."
    -r, --revision <rev>      [Optional] Package revision that append to version e.g. x.x.x-rev"
    -c, --checksum <path>     [Optional] Generate checksum on the desired path (by default, if no path is specified it will be generated on the same directory than the package).
    -h, --help                [  Util  ] Show this help."
    -i, --install-deps        [  Util  ] Install build dependencies (Packages)."
    -x, --install-xcode       [  Util  ] Install X-Code and brew. Can't be executed as root."


Below, you will find some examples of how to build OSX packages.

.. code-block:: console

 # ./generate_wazuh_packages.sh -b v3.10.2 -s /tmp

This will build a 3.10.2 package and store it in ``/tmp``.

.. code-block:: console

 # ./generate_wazuh_packages.sh -b v3.10.2 -s /tmp -j 6

This will also build a 3.10.2 package and store it in ``/tmp`` but will use 6 jobs to compile the sources.

.. code-block:: console

 # ./generate_wazuh_packages.sh -b v3.10.2 -s /tmp -j 6 -c

In addition to the previous settings this will generate a ``.sha512`` file containing the checksum of the package.