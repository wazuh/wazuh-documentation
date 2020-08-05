.. Copyright (C) 2020 Wazuh, Inc.

.. tabs::

        .. group-tab:: Yum

            Install all the necessary packages for the installation:
                
                .. code-block:: console

                    # yum install curl unzip wget libcap

            Add the repository of AdoptOpenJDK:

                .. code-block:: console

                    #  cat <<'EOF' > /etc/yum.repos.d/adoptopenjdk.repo
                    [AdoptOpenJDK]
                    name=AdoptOpenJDK
                    baseurl=http://adoptopenjdk.jfrog.io/adoptopenjdk/rpm/centos/$releasever/$basearch
                    enabled=1
                    gpgcheck=1
                    gpgkey=https://adoptopenjdk.jfrog.io/adoptopenjdk/api/gpg/key/public
                    EOF

            Install the AdoptOpenJDK-11 package:

                .. code-block:: console

                    # yum install adoptopenjdk-11-hotspot && export JAVA_HOME=/usr/ 


        .. group-tab:: APT

                Install all the necessary packages for the installation:

                    .. code-block:: console

                        # apt install curl apt-transport-https unzip wget libcap2-bin software-properties-common

                Import the GPG key for AdoptOpenJDK:

                    .. code-block:: console

                        # wget -qO - https://adoptopenjdk.jfrog.io/adoptopenjdk/api/gpg/key/public | apt-key add -

                Add the repository of AdoptOpenJDK:

                    .. code-block:: console

                        # add-apt-repository https://adoptopenjdk.jfrog.io/adoptopenjdk/deb/

                Update repository data:

                        .. code-block:: console

                            # apt update

                Install the AdoptOpenJDK-11 package:

                    .. code-block:: console

                        # apt install adoptopenjdk-11-hotspot && export JAVA_HOME=/usr/

.. End of include file

