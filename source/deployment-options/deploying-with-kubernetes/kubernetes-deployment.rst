.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: This section covers deploying Wazuh on Kubernetes for Amazon EKS and Local Kubernetes clusters, from environment preparation to verifying that all components are running correctly.

Deployment
==========

This section covers deploying Wazuh on Kubernetes for Amazon EKS and Local Kubernetes clusters, from environment preparation to verifying that all components are running correctly.

Clone the Wazuh Kubernetes repository for the necessary services and pods:

.. code-block:: console

   $ git clone https://github.com/wazuh/wazuh-kubernetes.git -b v|WAZUH_CURRENT_KUBERNETES| --depth=1
   $ cd wazuh-kubernetes

.. _kubernetes_ssl_certificates:

Setup SSL certificates
^^^^^^^^^^^^^^^^^^^^^^

Perform the steps below to generate the required certificates for the deployment:

#. Generate self-signed certificates for the Wazuh indexer cluster using the script at ``wazuh/certs/indexer_cluster/generate_certs.sh`` or provide your own certificates.

   .. code-block:: console

      # wazuh/certs/indexer_cluster/generate_certs.sh

   .. code-block:: none
      :class: output

      Root CA
      Admin cert
      create: admin-key-temp.pem
      create: admin-key.pem
      create: admin.csr
      Ignoring -days without -x509; not generating a certificate
      create: admin.pem
      Certificate request self-signature ok
      subject=C=US, L=California, O=Company, CN=admin
      * Node cert
      create: node-key-temp.pem
      create: node-key.pem
      create: node.csr
      Ignoring -days without -x509; not generating a certificate
      create: node.pem
      Certificate request self-signature ok
      subject=C=US, L=California, O=Company, CN=indexer
      * dashboard cert
      create: dashboard-key-temp.pem
      create: dashboard-key.pem
      create: dashboard.csr
      Ignoring -days without -x509; not generating a certificate
      create: dashboard.pem
      Certificate request self-signature ok
      subject=C=US, L=California, O=Company, CN=dashboard
      * Filebeat cert
      create: filebeat-key-temp.pem
      create: filebeat-key.pem
      create: filebeat.csr
      Ignoring -days without -x509; not generating a certificate
      create: filebeat.pem
      Certificate request self-signature ok
      subject=C=US, L=California, O=Company, CN=filebeat

#. Generate self-signed certificates for the Wazuh dashboard using the script at ``wazuh/certs/dashboard_http/generate_certs.sh`` or provide your own certificates.

   .. code-block:: console

      # wazuh/certs/dashboard_http/generate_certs.sh

   The required certificates are imported via ``secretGenerator`` in the ``kustomization.yml`` file:

   .. code-block:: yaml

      secretGenerator:
          - name: indexer-certs
            files:
              - certs/indexer_cluster/root-ca.pem
              - certs/indexer_cluster/node.pem
              - certs/indexer_cluster/node-key.pem
              - certs/indexer_cluster/dashboard.pem
              - certs/indexer_cluster/dashboard-key.pem
              - certs/indexer_cluster/admin.pem
              - certs/indexer_cluster/admin-key.pem
              - certs/indexer_cluster/filebeat.pem
              - certs/indexer_cluster/filebeat-key.pem
          - name: dashboard-certs
            files:
              - certs/dashboard_http/cert.pem
              - certs/dashboard_http/key.pem
              - certs/indexer_cluster/root-ca.pem

Setup storage class (optional for non-EKS cluster)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The storage class provisioner varies depending on your cluster. Edit the ``envs/local-env/storage-class.yaml`` file to set the provisioner that matches your cluster type.

Check your storage class by running ``kubectl get sc``:

.. code-block:: console

   # kubectl get sc

.. code-block:: none
   :class: output

   NAME                          PROVISIONER            RECLAIMPOLICY   VOLUMEBINDINGMODE   ALLOWVOLUMEEXPANSION   AGE
   elk-gp2                       microk8s.io/hostpath   Delete          Immediate           false                  67d
   microk8s-hostpath (default)   microk8s.io/hostpath   Delete          Immediate           false                  54d

The provisioner column displays ``microk8s.io/hostpath``.

Apply all manifests
^^^^^^^^^^^^^^^^^^^

There are two variants of the manifest: one for EKS clusters located in envs/eks and the second for other cluster types located in ``envs/local-env``.

You can adjust cluster resources by editing patches in ``envs/eks/`` or ``envs/local-env/``. You can also tune CPU, memory, and storage for persistent volumes of each cluster object. Remove patches from ``kustomization.yml`` or modify patch values to undo changes.

Deploy the cluster using the ``kustomization.yml`` file:

-  EKS cluster

   .. code-block:: console

      # kubectl apply -k envs/eks/

-  Other cluster types

   .. code-block:: console

      # kubectl apply -k envs/local-env/

Verifying the deployment
^^^^^^^^^^^^^^^^^^^^^^^^

**Namespace**

    .. code-block:: console

        $ kubectl get namespaces | grep wazuh

    .. code-block:: none
        :class: output

        wazuh         Active    12m

**Services**

    .. code-block:: console

        $ kubectl get services -n wazuh

    .. code-block:: none
        :class: output

        NAME                  TYPE           CLUSTER-IP       EXTERNAL-IP        PORT(S)                          AGE
        indexer               ClusterIP      xxx.yy.zzz.24    <none>             9200/TCP                         12m
        dashboard             ClusterIP      xxx.yy.zzz.76    <none>             5601/TCP                         11m
        wazuh                 LoadBalancer   xxx.yy.zzz.209   internal-a7a8...   1515:32623/TCP,55000:30283/TCP   9m
        wazuh-cluster         ClusterIP      None             <none>             1516/TCP                         9m
        Wazuh-indexer         ClusterIP      None             <none>             9300/TCP                         12m
        wazuh-workers         LoadBalancer   xxx.yy.zzz.26    internal-a7f9...   1514:31593/TCP                   9m


**Deployments**

    .. code-block:: console

        $ kubectl get deployments -n wazuh

    .. code-block:: none
        :class: output

        NAME             DESIRED   CURRENT   UP-TO-DATE   AVAILABLE   AGE
        wazuh-dashboard  1         1         1            1           11m

**Statefulset**

    .. code-block:: console

        $ kubectl get statefulsets -n wazuh

    .. code-block:: none
        :class: output

        NAME                   READY   AGE
        wazuh-indexer          3/3     15m
        wazuh-manager-master   1/1     15m
        wazuh-manager-worker   2/2     15m

**Pods**

    .. code-block:: console

        $ kubectl get pods -n wazuh

    .. code-block:: none
        :class: output

        NAME                              READY     STATUS    RESTARTS   AGE
        wazuh-indexer-0                   1/1       Running   0          15m
        wazuh-dashboard-f4d9c7944-httsd   1/1       Running   0          14m
        wazuh-manager-master-0            1/1       Running   0          12m
        wazuh-manager-worker-0-0          1/1       Running   0          11m
        wazuh-manager-worker-1-0          1/1       Running   0          11m


**Accessing Wazuh dashboard**

In case you created domain names for the services, you should be able to access the dashboard using the proposed domain name: ``https://wazuh.your-domain.com``. Cloud providers usually provide an external IP address or hostname for direct access to the dashboard. This can be viewed by checking the services:

    .. code-block:: console
 
         $ kubectl get services -o wide -n wazuh



    .. code-block:: none
        :class: output

         NAME                  TYPE           CLUSTER-IP       EXTERNAL-IP                      PORT(S)                          AGE       SELECTOR
         dashboard             LoadBalancer   xxx.xx.xxx.xxx   xxx.xx.xxx.xxx                   80:31831/TCP,443:30974/TCP       15m       app=wazuh-dashboard


**Optional**: On a local cluster deployment where the external IP address is not accessible, you can use ``port-forward``:
 
.. code-block:: console

   $ kubectl -n wazuh port-forward --address <INTERFACE_IP_ADDRESS> service/dashboard 8443:443
  
Where ``<INTERFACE_IP_ADDRESS>`` is the IP address of the Kubernetes host.

The Wazuh dashboard is accessible on ``https://<INTERFACE_IP_ADDRESS>:8443``.

The default credentials are ``admin:SecretPassword``.

Change the password of Wazuh users
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

To improve security, you can change the default password of the Wazuh users. There are two types of Wazuh users:

-  Wazuh indexer users
-  Wazuh API users

Wazuh indexer users
~~~~~~~~~~~~~~~~~~~

 To change the password of the default ``admin`` and ``kibanaserver`` users, do the following.

.. warning::

   If you have custom users, add them to the ``internal_users.yml`` file. Otherwise, executing this procedure deletes them.

Closing your Wazuh dashboard session
....................................

Before starting the password change process, we recommend to log out of your Wazuh dashboard session.

If you don't log out, persistent session cookies might cause errors when accessing Wazuh after changing user passwords.

Setting a new hash
..................

#. Start a Bash shell in ``wazuh-indexer-0``.

   .. code-block:: console

      # kubectl exec -it wazuh-indexer-0 -n wazuh -- /bin/bash

#. Run these commands to generate the hash of your new password. When prompted, input the new password and press **Enter**.

   .. code-block:: console

	  wazuh-indexer@wazuh-indexer-0:~$ export JAVA_HOME=/usr/share/wazuh-indexer/jdk
	  wazuh-indexer@wazuh-indexer-0:~$ bash /usr/share/wazuh-indexer/plugins/opensearch-security/tools/hash.sh

#. Copy the generated hash and exit the Bash shell.

#. Open the ``wazuh/indexer_stack/wazuh-indexer/indexer_conf/internal_users.yml`` file. Locate the block for the user you are changing password for.

#. Replace the hash.

   -  ``admin`` user

      .. code-block:: YAML
         :emphasize-lines: 3

         ...
         admin:
             hash: "$2y$12$K/SpwjtB.wOHJ/Nc6GVRDuc1h0rM1DfvziFRNPtk27P.c4yDr9njO"
             reserved: true
             backend_roles:
             - "admin"
             description: "Demo admin user"

         ...

   -  ``kibanaserver`` user

      .. code-block:: YAML
         :emphasize-lines: 3

         ...
         kibanaserver:
             hash: "$2a$12$4AcgAt3xwOWadA5s5blL6ev39OXDNhmOesEoo33eZtrq2N0YrU3H."
             reserved: true
             description: "Demo kibanaserver user"

         ...

Setting the new password
........................

.. warning::

   Don't use the ``$`` or ``&`` characters in your new password. These characters can cause errors during deployment.

#. Encode your new password in base64 format. Avoid inserting a trailing newline character to maintain the hash value. For example, use the ``-n`` option with the ``echo`` command as follows.

   .. code-block:: console

      # echo -n "NewPassword" | base64

#. Edit the indexer or dashbboard secrets configuration file as follows. Replace the value of the ``password`` field with your new encoded password.

   -  To change the ``admin`` user password, edit the ``wazuh/secrets/indexer-cred-secret.yaml`` file.

      .. code-block:: YAML
         :emphasize-lines: 8

         ...
         apiVersion: v1
         kind: Secret
         metadata:
             name: indexer-cred
         data:
             username: YWRtaW4=              # string "admin" base64 encoded
             password: U2VjcmV0UGFzc3dvcmQ=  # string "SecretPassword" base64 encoded
         ...

   -  To change the ``kibanaserver`` user password, edit the ``wazuh/secrets/dashboard-cred-secret.yaml`` file.

      .. code-block:: YAML
         :emphasize-lines: 8

         ...
         apiVersion: v1
         kind: Secret
         metadata:
             name: dashboard-cred
         data:
             username: a2liYW5hc2VydmVy  # string "kibanaserver" base64 encoded
             password: a2liYW5hc2VydmVy  # string "kibanaserver" base64 encoded
         ...

Applying the changes
....................

#. Apply the manifest changes

   -  EKS cluster

      .. code-block:: console

         # kubectl apply -k envs/eks/

   -  Other cluster types

      .. code-block:: console

         # kubectl apply -k envs/local-env/

#. Start a bash shell in ``wazuh-indexer-0`` once more.

   .. code-block:: console

      # kubectl exec -it wazuh-indexer-0 -n wazuh -- /bin/bash

#. Set the following variables:

   .. code-block:: console

      export INSTALLATION_DIR=/usr/share/wazuh-indexer
      export CONFIG_DIR=$INSTALLATION_DIR/config
      CACERT=$CONFIG_DIR/certs/root-ca.pem
      KEY=$CONFIG_DIR/certs/admin-key.pem
      CERT=$CONFIG_DIR/certs/admin.pem
      export JAVA_HOME=/usr/share/wazuh-indexer/jdk

#. Wait for the Wazuh indexer to initialize properly. The waiting time can vary from two to five minutes. It depends on the size of the cluster, the assigned resources, and the speed of the network. Then, run the ``securityadmin.sh`` script to apply all changes.

   .. code-block:: console

      $ bash /usr/share/wazuh-indexer/plugins/opensearch-security/tools/securityadmin.sh -cd $CONFIG_DIR/opensearch-security/ -nhnv -cacert  $CACERT -cert $CERT -key $KEY -p 9200 -icl -h $NODE_NAME

#. Force the Wazuh dashboard deployment rollout to update the component credentials.

   .. code-block:: console

      $ kubectl rollout restart deploy/wazuh-dashboard -n wazuh

#. Delete all Wazuh manager pods to update the component credentials.

   .. code-block:: console

      $ kubectl delete -n wazuh pod/wazuh-manager-master-0 pod/wazuh-manager-worker-0 pod/wazuh-manager-worker-1

#. Login with the new credentials on the Wazuh dashboard.

Wazuh API users
~~~~~~~~~~~~~~~

The ``wazuh-wui`` user is the user to connect with the Wazuh API by default. Follow these steps to change the password.

.. note::

   The password for Wazuh API users must be between 8 and 64 characters long. It must contain at least one uppercase and one lowercase letter, a number, and a symbol.

#. Encode your new password in base64 format. Avoid inserting a trailing newline character to maintain the hash value. For example, use the ``-n`` option with the ``echo`` command as follows.

   .. code-block:: console

      # echo -n "NewPassword" | base64

#. Edit the ``wazuh/secrets/wazuh-api-cred-secret.yaml`` file and replace the value of the ``password`` field.

   .. code-block:: YAML
      :emphasize-lines: 8

      apiVersion: v1
      kind: Secret
      metadata:
          name: wazuh-api-cred
          namespace: wazuh
      data:
          username: d2F6dWgtd3Vp          # string "wazuh-wui" base64 encoded
          password: UGFzc3dvcmQxMjM0LmE=  # string "MyS3cr37P450r.*-" base64 encoded

#. Apply the manifest changes.

    .. code-block:: console

        # kubectl apply -k envs/eks/

#. Restart pods for Wazuh dashboard and Wazuh manager master.

Agents
^^^^^^

Wazuh agents are designed to monitor hosts. To start using them, follow the steps below:

#. :ref:`Add the Wazuh repository <agent-installation-add-wazuh-repository>` to download the official packages.
#. Run the following command to install the Wazuh agent and enroll to your kubernetes cluster:

   .. code-block:: console

      # WAZUH_MANAGER="EXTERNAL_IP_WAZUH_WORKER" WAZUH_REGISTRATION_SERVER="EXTERNAL_IP_WAZUH" WAZUH_REGISTRATION_PASSWORD="PASSWORD" \
        apt-get install wazuh-agent

   Replace:

   -  ``EXTERNAL_IP_WAZUH_WORKER`` with the external IP address of the Wazuh workers loadbalancer service.
   -  ``EXTERNAL_IP_WAZUH`` with the external IP address of the Wazuh loadbalancer service.
   -  ``PASSWORD`` with the password used to enroll agents.

   .. note::

      The default password for deploying agents in Wazuh on Kubernetes is ``password``. This password is used for enrolling new agents. A file at ``/var/ossec/etc/authd.pass`` contains this password.

#. Enable and start the Wazuh agent service.

   .. code-block:: console

      # systemctl daemon-reload
      # systemctl enable wazuh-agent
      # systemctl start wazuh-agent

To learn more about enrolling agents, see the :doc:`Wazuh agent enrollment </user-manual/agent/agent-enrollment/index>` section of the documentation.