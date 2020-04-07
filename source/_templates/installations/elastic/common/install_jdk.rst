.. Copyright (C) 2020 Wazuh, Inc.

.. tabs::

    .. group-tab:: Java 11
        
        .. tabs::

            .. group-tab:: APT

                #. Add the repository:

                    .. tabs::

                        .. group-tab:: Debian

                            .. code-block:: console

                                # sudo echo 'deb http://deb.debian.org/debian stretch-backports main' > /etc/apt/sources.list.d/backports.list
                                # apt update

                        
                        .. group-tab:: Other Debian based OS

                            .. code-block:: console

                                # add-apt-repository ppa:openjdk-r/ppa
                                # apt update


                #. Install Java 11:

                    .. code-block:: console

                        # apt install openjdk-11-jdk

            .. group-tab:: Yum

                .. code-block:: console

                    # yum install java-11-openjdk-devel



    .. group-tab:: Java 8
        
        .. tabs::

            .. group-tab:: APT

                #. Add the repository:

                    .. tabs::

                        .. group-tab:: Debian

                            .. code-block:: console

                                # sudo echo 'deb http://deb.debian.org/debian stretch-backports main' > /etc/apt/sources.list.d/backports.list
                                # apt update

                        
                        .. group-tab:: Other Debian based OS

                            .. code-block:: console

                                # add-apt-repository ppa:openjdk-r/ppa
                                # apt update


                #. Install Java 8:

                    .. code-block:: console

                        # apt install openjdk-8-jdk

            .. group-tab:: Yum

                .. code-block:: console

                    # yum install java-8-openjdk-devel

.. End of include file
