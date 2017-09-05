.. _custom-repository:

Adding custom repository
========================



It is possible to generate custom upgrade packages for agents. For this we must generate a repository to host the generated WPK files so that the manager
can send them to the agents.

WPK files must be named matching this pattern:

.. code-block:: console

    wazuh_agent_W_X_Y_Z.wpk

Where:
    - W is the version of the released version.
    - X is the name of the operating system.
    - Y is the version of the operating system.
    - Z is the machine's architecture.

For instance:

.. code-block:: console

    wazuh_agent_v3.0.0_centos_7_x86_64.wpk


The structure of the repository should be as shown below:

.. code-block:: console

    /
    └── centos
        └── 7
            └── x86_64
                ├── versions
                ├── wazuh_agent_v3.0.0_centos_7_x86_64.wpk
                └── wazuh_agent_v3.1.0_centos_7_x86_64.wpk

Every folder must contain a file named versions that contain each version contained in the folder and the file's SHA1 hash.
The latest version must be placed in the first line. For instance:

.. code-block:: console

    # cat our_wpk_repo/centos/7/x86_64/versions

    v3.1.0 f835015c6bbf87356a62bdfd513c7f1ffc16e0af
    v3.0.0 df5397c8c4a1b29c42726dfa821330fa1bac7058


This way the manager will check the agent OS, version and architecture and will look for the latest package to upgrade by default.
For example, for an agent installed on Centos 7 x86_64, the manager will look for the latest package in *our_wpk_repo/centos/7/x86_64/*.
