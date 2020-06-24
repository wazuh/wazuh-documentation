.. Copyright (C) 2020 Wazuh, Inc.

.. tabs::

        .. group-tab:: Yum

            #. Install either JDK 11 or JDK 8: 
                
                #. Install JDK 11:

                    .. code-block:: console

                        # yum install java-11-openjdk-devel 

                #. Install JDK 8:

                    .. code-block:: console

                        # yum install java-1.8.0-openjdk-devel

            #. Install the rest of the necessary packages:

                .. code-block:: console

                    # yum install curl unzip wget libcap

        .. group-tab:: APT

                #. Add the repository for Java Development Kit (JDK):

                    #. For Debian:

                        .. code-block:: console

                            # echo 'deb http://deb.debian.org/debian stretch-backports main' > /etc/apt/sources.list.d/backports.list


                    #. Ubuntu and other Debian based OS:

                            .. code-block:: console

                                # add-apt-repository ppa:openjdk-r/ppa

                #. Update repository data:

                        .. code-block:: console

                            # apt update

                #. Install all the required utilities:

                    .. code-block:: console

                        # apt install openjdk-11-jdk curl apt-transport-https unzip wget

.. End of include file
