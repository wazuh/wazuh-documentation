.. _custom-repository:

Adding custom repository
========================



It is possible to generate custom upgrade packages for agents. For this we must generate a repository to host the generated WPK files so that the manager can send them to the agents.
The structure of the repository should be as shown below:

.. code-block:: console

    /
    └── centos
        └── 7
            └── x86_64
                ├── versions
                ├── wazuh_agent_v3.0.0_centos_7_x86_64.wpk
                └── wazuh_agent_v3.1.0_centos_7_x86_64.wpk

The version file should contain the list of available versions for each upgrade package (sorted from most recent to oldest) and its corresponding SHA1 hash:

.. code-block:: console

    # cat our_wpk_repo/centos/7/x86_64/versions

    v3.1.0 f835015c6bbf87356a62bdfd513c7f1ffc16e0af
    v3.0.0 df5397c8c4a1b29c42726dfa821330fa1bac7058


This way the manager will check the agent OS, version and architecture and will look for the latest package to upgrade by default.
For example, for an agent installed on Centos 7 x86_64, the manager will look for the latest package in *our_wpk_repo/centos/7/x86_64/*.
