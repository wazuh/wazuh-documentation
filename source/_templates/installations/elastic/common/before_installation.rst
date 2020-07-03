.. Copyright (C) 2020 Wazuh, Inc.

.. tabs::

        .. group-tab:: Yum

            Install all the necessary packages:
                
                .. code-block:: console

                    # yum install java-11-openjdk-devel && export JAVA_HOME=/usr/ && yum install curl unzip wget libcap

            If the OS used does not support JDK 11, alternatively, JDK 8 can be installed, using the package ``java-1.8.0-openjdk.x86_64``

        .. group-tab:: APT

                #. Add the repository for Java Development Kit (JDK):

                    * For Debian:

                        .. code-block:: console

                            # echo 'deb http://deb.debian.org/debian stretch-backports main' > /etc/apt/sources.list.d/backports.list


                    * Ubuntu and other Debian based OS:

                            .. code-block:: console

                                # add-apt-repository ppa:openjdk-r/ppa

                #. Update repository data:

                        .. code-block:: console

                            # apt update

                #. Install all the required utilities:

                    .. code-block:: console

                        # apt install openjdk-11-jdk && export JAVA_HOME=/usr/ && apt install curl apt-transport-https unzip wget

.. End of include file
