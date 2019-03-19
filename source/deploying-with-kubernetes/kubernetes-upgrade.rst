.. Copyright (C) 2018 Wazuh, Inc.

.. _kubernetes_upgrade:

Upgrade Wazuh installed in Kubernetes
=====================================

Check which files are exported to the volume
--------------------------------------------

Our Kubernetes deployment uses our Wazuh images from Docker. If we look at the following code extracted from the Wazuh configuration using Docker we can see which directories and files are used in the upgrade.

.. code-block:: bash

    DATA_DIRS[((i++))]="api/configuration"
    DATA_DIRS[((i++))]="etc"
    DATA_DIRS[((i++))]="logs"
    DATA_DIRS[((i++))]="queue/db"
    DATA_DIRS[((i++))]="queue/rootcheck"
    DATA_DIRS[((i++))]="queue/agent-groups"
    DATA_DIRS[((i++))]="queue/agent-info"
    DATA_DIRS[((i++))]="queue/agents-timestamp"
    DATA_DIRS[((i++))]="queue/agentless"
    DATA_DIRS[((i++))]="queue/cluster"
    DATA_DIRS[((i++))]="queue/rids"
    DATA_DIRS[((i++))]="queue/fts"
    DATA_DIRS[((i++))]="var/multigroups"

Any modification related to these files will also be made in the associated volume. When the replica pod creates, it will get those files from the volume, keeping the previously changes.

For a better understanding, we will give an example:

Assuming we have already deployed the environment using the following Wazuh image:

.. code-block:: yml

    containers:
    - name: wazuh-manager
      image: 'wazuh/wazuh:3.6.1_6.4.0'

Let's proceed by creating a set of rules in our `local_rules.xml` file at location `/var/ossec/etc/rules` in our wazuh manager master pod.

Edit the `local_rules.xml` file:

.. code-block:: xml

    <!-- Local rules -->

    <!-- Modify it at your will. -->

    <!-- Example -->
    <group name="local,syslog,sshd,">

    <!--
    Dec 10 01:02:02 host sshd[1234]: Failed none for root from 1.1.1.1 port 1066 ssh2
    -->
    <rule id="100001" level="5">
        <if_sid>5716</if_sid>
        <srcip>1.1.1.1</srcip>
        <description>sshd: authentication failed from IP 1.1.1.1.</description>
        <group>authentication_failed,pci_dss_10.2.4,pci_dss_10.2.5,</group>
    </rule>

    <rule id="100002" level="5">
        <if_sid>5716</if_sid>
        <srcip>2.1.1.1</srcip>
        <description>sshd: authentication failed from IP 2.1.1.1.</description>
        <group>authentication_failed,pci_dss_10.2.4,pci_dss_10.2.5,</group>
    </rule>

    <rule id="100003" level="7">
        <if_sid>5716</if_sid>
        <srcip>3.1.1.1</srcip>
        <description>sshd: authentication failed from IP 3.1.1.1.</description>
        <group>authentication_failed,pci_dss_10.2.4,pci_dss_10.2.5,</group>
    </rule>

    </group>

 
.. code-block:: yml

    volumeMounts:
    - name: config
      mountPath: /wazuh-config-mount/etc/ossec.conf
      subPath: ossec.conf
      readOnly: true
    - name: wazuh-manager-master
      mountPath: /var/ossec/data
    - name: wazuh-manager-master
      mountPath: /etc/postfix

We can see their content:

.. code-block:: console

    root@wazuh-manager-master-0:/# cat /var/ossec/data/etc/rules/local_rules.xml

.. code-block:: xml

    <!-- Local rules -->

    <!-- Modify it at your will. -->

    <!-- Example -->
    <group name="local,syslog,sshd,">

    <!--
    Dec 10 01:02:02 host sshd[1234]: Failed none for root from 1.1.1.1 port 1066 ssh2
    -->
    <rule id="100001" level="5">
        <if_sid>5716</if_sid>
        <srcip>1.1.1.1</srcip>
        <description>sshd: authentication failed from IP 1.1.1.1.</description>
        <group>authentication_failed,pci_dss_10.2.4,pci_dss_10.2.5,</group>
    </rule>

    <rule id="100002" level="5">
        <if_sid>5716</if_sid>
        <srcip>2.1.1.1</srcip>
        <description>sshd: authentication failed from IP 2.1.1.1.</description>
        <group>authentication_failed,pci_dss_10.2.4,pci_dss_10.2.5,</group>
    </rule>

    <rule id="100003" level="7">
        <if_sid>5716</if_sid>
        <srcip>3.1.1.1</srcip>
        <description>sshd: authentication failed from IP 3.1.1.1.</description>
        <group>authentication_failed,pci_dss_10.2.4,pci_dss_10.2.5,</group>
    </rule>
    </group>
    

.. code-block:: console

    root@wazuh-manager-master-0:/# cat /etc/postfix/etc/rules/local_rules.xml

.. code-block:: xml

    <!-- Local rules -->

    <!-- Modify it at your will. -->

    <!-- Example -->
    <group name="local,syslog,sshd,">

    <!--
    Dec 10 01:02:02 host sshd[1234]: Failed none for root from 1.1.1.1 port 1066 ssh2
    -->
    <rule id="100001" level="5">
        <if_sid>5716</if_sid>
        <srcip>1.1.1.1</srcip>
        <description>sshd: authentication failed from IP 1.1.1.1.</description>
        <group>authentication_failed,pci_dss_10.2.4,pci_dss_10.2.5,</group>
    </rule>

    <rule id="100002" level="5">
        <if_sid>5716</if_sid>
        <srcip>2.1.1.1</srcip>
        <description>sshd: authentication failed from IP 2.1.1.1.</description>
        <group>authentication_failed,pci_dss_10.2.4,pci_dss_10.2.5,</group>
    </rule>

    <rule id="100003" level="7">
        <if_sid>5716</if_sid>
        <srcip>3.1.1.1</srcip>
        <description>sshd: authentication failed from IP 3.1.1.1.</description>
        <group>authentication_failed,pci_dss_10.2.4,pci_dss_10.2.5,</group>
    </rule>
    </group>

At this point, if the pod was dropped or updated, Kubernetes would be in charge of creating a replica of it that would link to the volumes created and would maintain any changes referenced in the files and directories that we export to those volumes.

Once explained the operation regarding the volumes, we proceed to update Wazuh in two simple steps.

Change the image of the container
---------------------------------

The second step is to change the image of the pod in each file that deploys each node of the Wazuh cluster.

These files are the *StatefulSet* files:

    - wazuh-master-sts.yaml
    - wazuh-worker-0-sts.yaml
    - wazuh-worker-1-sts.yaml

For example, we had this version before:

.. code-block:: yml

    containers:
    - name: wazuh-manager
      image: 'wazuh/wazuh:3.6.1_6.4.0'


Apply the new configuration
---------------------------

The third and last step is to apply the new configuration of each pod. For example for the wazuh manager master:

.. code-block:: console

    ubuntu@k8s-control-server:~/wazuh-kubernetes/manager_cluster$ kubectl apply -f wazuh-manager-master-sts.yaml
    statefulset.apps "wazuh-manager-master" configured

This process will end the old pod while creating a new one with the new version, linked to the same volume. Once the Pods are booted, we will have our update ready and we can check the new version of Wazuh installed, the cluster and the changes that have been maintained through the use of the volumes.
