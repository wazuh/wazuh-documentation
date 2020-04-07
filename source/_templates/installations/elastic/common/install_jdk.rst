.. Copyright (C) 2020 Wazuh, Inc.

.. tabs::

    .. group-tab:: Java 11

        .. tabs::

            # Add the repository:

            .. group-tab:: APT

                # Add the repository:

                    .. code-block:: console

                        .. tabs::

                            .. group-tab:: Debian

                                .. code-block:: console

                                    # sudo echo 'deb http://deb.debian.org/debian stretch-backports main' > /etc/apt/sources.list.d/backports.list

                            
                            .. group-tab:: Others Debian based OS

                                .. code-block:: console

                                    # add-apt-repository ppa:openjdk-r/ppa



            .. group-tab:: Yum

                .. code-block:: console

                    # yum install java-11-openjdk-devel



    .. group-tab:: Java 8

        .. tabs::

            .. group-tab:: APT


                .. include:: ../_templates/installations/elastic/deb/install_elasticsearch.rst



            .. group-tab:: Yum

                .. code-block:: console

                    # yum install java-1.8.0-openjdk-devel 

.. End of include file
