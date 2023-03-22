.. Copyright (C) 2015, Wazuh, Inc.

.. tabs::

        .. group-tab:: Yum

            Run the following command to install all the necessary packages for the installation:
                
                .. code-block:: console

                    # export JAVA_HOME=/usr/ && yum install curl unzip wget libcap && yum install java-11-openjdk-devel
                    

            In case JDK 11 is not available for the operating system being used, install the package ``adoptopenjdk-11-hotspot`` using `Adopt Open JDK <https://adoptopenjdk.net/installation.html#x64_linux-jdk>`_.


        .. group-tab:: APT

                Run the following command to install all the necessary packages for the installation:

                    .. code-block:: console

                        # apt-get install curl apt-transport-https unzip wget libcap2-bin software-properties-common lsb-release gnupg


                Add the repository for Java Development Kit (JDK):

                    * For Debian:

                        .. code-block:: console

                            # echo 'deb http://deb.debian.org/debian stretch-backports main' > /etc/apt/sources.list.d/backports.list


                    * For Ubuntu and other Debian based operating systems:

                            .. code-block:: console

                                # add-apt-repository ppa:openjdk-r/ppa

                Update repository data:

                    .. code-block:: console

                        # apt-get update

                Install all the required utilities:

                .. code-block:: console

                    # export JAVA_HOME=/usr/ && apt-get install openjdk-11-jdk    

                In case JDK 11 is not available for the operating system being used, install the package ``adoptopenjdk-11-hotspot`` using `Adopt Open JDK <https://adoptopenjdk.net/installation.html#x64_linux-jdk>`_.

        .. group-tab:: ZYpp

            Run the following command to install all the necessary packages for the installation:
                
                .. code-block:: console

                    # export JAVA_HOME=/usr/ && zypper install curl unzip wget libcap && zypper install java-11-openjdk-devel

            In case JDK 11 is not available for the operating system being used, install the package ``adoptopenjdk-11-hotspot`` using `Adopt Open JDK <https://adoptopenjdk.net/installation.html#x64_linux-jdk>`_.    
            
.. End of include file

