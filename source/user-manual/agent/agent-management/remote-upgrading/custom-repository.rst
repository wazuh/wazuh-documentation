.. Copyright (C) 2015, Wazuh, Inc.

.. _custom-repository:

Adding a custom repository
==========================

Custom agent upgrade packages may be created by generating a repository to host the generated WPK files.  The manager can then be set to send files to the agents from this repository.

WPK files must be named using the following pattern:

.. code-block:: none

    wazuh_agent_W_X_Y.Z.wpk

Where:
    - W is the version of the release,
    - X is the name of the operating system,
    - Y is the machine's architecture, and
    - Z is the type of package included in the WPK file.

For instance:

.. code-block:: none

    wazuh_agent_v4.9.0_linux_x86_64.rpm.wpk


The structure of the repository should be as shown below:

.. code-block:: none
    :class: output

    /
    └── linux
        └── rpm
            └── x86_64
                ├── versions
                ├── wazuh_agent_v4.9.0_linux_x86_64.rpm.wpk
                └── wazuh_agent_v4.9.1_linux_x86_64.rpm.wpk

Every folder must contain a file named ``versions`` that lists each version represented in the folder, along with the file's SHA1 hash. The latest version must be placed in the first line of this file. For instance:

.. code-block:: console

    # cat our_wpk_repo/linux/rpm/x86_64/versions

.. code-block:: none
    :class: output

    v4.9.1 f835015c6bbf87356a62bdfd513c7f1ffc16e0af
    v4.9.0 df5397c8c4a1b29c42726dfa821330fa1bac7058


This repository structure is necessary for the manager to check the agent OS, version, architecture, and type of package and look for the correct upgrade package. For example, for an agent installed on Centos 7 x86_64, the manager will look for the latest package in *our_wpk_repo/linux/rpm/x86_64/*.
