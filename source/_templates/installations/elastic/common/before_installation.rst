.. Copyright (C) 2020 Wazuh, Inc.

.. tabs::

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

                        # apt install openjdk-11-jdk curl apt-transport-https gnupg2 unzip wget libcap2-bin                    

        .. group-tab:: Yum

            Install all the required utilities:

                .. code-block:: console

                    # yum install java-11-openjdk-devel curl gnupg2 unzip wget libcap2-bin

.. End of include file
