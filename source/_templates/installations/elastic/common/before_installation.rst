.. Copyright (C) 2020 Wazuh, Inc.

.. tabs::

        .. group-tab:: APT

                #. Add the repository for Java Development Kit (JDK): 
                
                    .. tabs::

                        .. group-tab:: Debian

                            .. code-block:: console

                                # echo 'deb http://deb.debian.org/debian stretch-backports main' > /etc/apt/sources.list.d/backports.list
                                # apt update

                        
                        .. group-tab:: Other Debian based OS

                            .. code-block:: console

                                # add-apt-repository ppa:openjdk-r/ppa
                                # apt update


                #. Install Java 11:

                    .. code-block:: console

                        # apt install openjdk-11-jdk

            
                #. Once Java is installed, add ``wget`` and ``unzip`` utilities:

                    .. code-block:: console

                        # apt install wget unzip                        

        .. group-tab:: Yum

            #. Install the Java Development Kit (JDK):

                .. code-block:: console

                    # yum install java-11-openjdk-devel


            #. Once Java is installed, add ``wget`` and ``unzip`` utilities:

                .. code-block:: console

                    # yum install wget unzip

.. End of include file
