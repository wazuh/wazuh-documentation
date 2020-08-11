.. Copyright (C) 2020 Wazuh, Inc.

.. tabs::

        .. group-tab:: Yum

            Install all the necessary packages for the installation:
                
                .. code-block:: console

                    # yum install curl unzip wget libcap && yum install java-11-openjdk-devel || yum install java-1.8.0-openjdk.x86_64 
                    # export JAVA_HOME=/usr/ 


        .. group-tab:: APT

                Install all the necessary packages for the installation:

                    .. code-block:: console

                        # apt install curl apt-transport-https unzip wget libcap2-bin software-properties-common

                Add the repository for Java Development Kit (JDK):

                    * For Debian:

                        .. code-block:: console

                            # echo 'deb http://deb.debian.org/debian stretch-backports main' > /etc/apt/sources.list.d/backports.list


                    * For Ubuntu and other Debian based OS:

                            .. code-block:: console

                                # add-apt-repository ppa:openjdk-r/ppa

                Update repository data:

                    .. code-block:: console

                        # apt update

                Install all the required utilities:

                .. code-block:: console

                    # apt install openjdk-11-jdk && export JAVA_HOME=/usr/    

.. End of include file

