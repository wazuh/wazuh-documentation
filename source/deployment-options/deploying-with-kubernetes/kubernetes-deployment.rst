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

There are two variants of the manifest: one for EKS clusters located in ``envs/eks`` and the second for other cluster types located in ``envs/local-env``.

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

Namespace
~~~~~~~~~

Run the following command to check that the Wazuh namespace is active:

.. code-block:: console

   $ kubectl get namespaces | grep wazuh

.. code-block:: none
   :class: output

   wazuh         Active    12m

Services
~~~~~~~~

Run the command below to view all running services in the Wazuh namespace:

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

.. note::

   Take note of the External IP addresses for the ``wazuh`` and ``wazuh-workers`` services, as they are required during the Wazuh agent installation.

   The ``wazuh`` External IP is used as the Wazuh Registration Server IP address (port ``1515``), while the ``wazuh-workers`` External IP is used as the Wazuh Manager IP address for event transmission (port ``1514``) after enrollment.

Deployments
~~~~~~~~~~~

Run the command below to check for the deployments in the Wazuh namespace:

.. code-block:: console

   $ kubectl get deployments -n wazuh

.. code-block:: none
   :class: output

   NAME             DESIRED   CURRENT   UP-TO-DATE   AVAILABLE   AGE
   wazuh-dashboard  1         1         1            1           11m

Statefulset
~~~~~~~~~~~

Run the command below to check the active StatefulSets in the Wazuh namespace:

.. code-block:: console

   $ kubectl get statefulsets -n wazuh

.. code-block:: none
   :class: output

   NAME                   READY   AGE
   wazuh-indexer          3/3     15m
   wazuh-manager-master   1/1     15m
   wazuh-manager-worker   2/2     15m

Pods
~~~~

Run the command below to view the pods status in the Wazuh namespace:

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

Enrolling a Wazuh agent
~~~~~~~~~~~~~~~~~~~~~~~

Follow the steps below to enroll a Wazuh agent to a Wazuh manager running in a Kubernetes environment.

#. Execute this command on the Kubernetes cluster and note the External IP of the ``wazuh`` and ``wazuh-workers`` load balancers:

   .. code-block:: console

      # kubectl get services -n wazuh

   .. code-block:: none
      :class: output

      NAME                  TYPE           CLUSTER-IP       EXTERNAL-IP        PORT(S)                          AGE
      indexer               ClusterIP      xxx.yy.zzz.24    <none>             9200/TCP                         12m
      dashboard             ClusterIP      xxx.yy.zzz.76    <none>             5601/TCP                         11m
      wazuh                 LoadBalancer   xxx.yy.zzz.209   internal-a7a8...   1515:32623/TCP,55000:30283/TCP   9m
      wazuh-cluster         ClusterIP      None             <none>             1516/TCP                         9m
      Wazuh-indexer         ClusterIP      None             <none>             9300/TCP                         12m
      wazuh-workers         LoadBalancer   xxx.yy.zzz.26    internal-a7f9...   1514:31593/TCP                   9m

#. Set the following Wazuh agent :doc:`deployment variables </user-manual/agent/agent-enrollment/deployment-variables/index>` to simplify the installation, enrollment, and configuration process of the Wazuh agent.

   -  ``WAZUH_MANAGER``: External IP of the ``wazuh-workers`` load balancer.
   -  ``WAZUH_REGISTRATION_SERVER``: External IP of the ``wazuh`` load balancer.
   -  ``WAZUH_REGISTRATION_PASSWORD``: The default password for deploying agents in Wazuh on Kubernetes is ``password``. This password is used for enrolling new agents. The ``/var/ossec/etc/authd.pass`` file contains this password. For more information, see :doc:`/user-manual/agent/agent-enrollment/security-options/using-password-authentication`.
   -  ``WAZUH_AGENT_NAME``: Name of the new Wazuh agent to be enrolled.

#. After setting the deployment variables, install the Wazuh agent using the :doc:`Wazuh agent installation </installation-guide/wazuh-agent/index>` guide.
#. The example below shows the command you must run to set the deployment variables and install the Wazuh agent on a Linux endpoint after adding the :ref:`Wazuh repository <agent-installation-add-wazuh-repository>`.

   .. code-block:: console

      # WAZUH_MANAGER="<EXTERNAL_IP_WAZUH_WORKER>" WAZUH_REGISTRATION_SERVER="<EXTERNAL_IP_WAZUH>" WAZUH_REGISTRATION_PASSWORD="<PASSWORD>" WAZUH_AGENT_NAME="WAZUH_K8S_AGENT"  \
        apt-get install wazuh-agent

   Replace:

   -  ``EXTERNAL_IP_WAZUH_WORKER`` with the external IP address of the ``wazuh-workers`` load balancer service.
   -  ``EXTERNAL_IP_WAZUH`` with the external IP address of the ``wazuh`` load balancer service.
   -  ``PASSWORD`` with the password used to enroll agents.
   -  ``WAZUH_K8S_AGENT`` with the Wazuh agent name that will be used for enrollment

#. Enable and start the Wazuh agent service.

   .. code-block:: console

      # systemctl daemon-reload
      # systemctl enable wazuh-agent
      # systemctl start wazuh-agent

To learn more about enrolling Wazuh agents, see the :doc:`/user-manual/agent/agent-enrollment/index` section of the documentation.

Accessing Wazuh dashboard
~~~~~~~~~~~~~~~~~~~~~~~~~

If you created domain names for the services, access the dashboard using the URL ``https://wazuh.<YOUR_DOMAIN>.com``. Otherwise, access the Wazuh dashboard using the external IP address or hostname that your cloud provider assigned.

Check the services to view the external IP:

.. code-block:: console

   $ kubectl get services -o wide -n wazuh

.. code-block:: none
   :class: output

   NAME                  TYPE           CLUSTER-IP       EXTERNAL-IP                      PORT(S)                          AGE       SELECTOR
   dashboard             LoadBalancer   xxx.xx.xxx.xxx   xxx.xx.xxx.xxx                   80:31831/TCP,443:30974/TCP       15m       app=wazuh-dashboard

.. note::

   For a local cluster deployment where the external IP address is not accessible, you can access the Wazuh dashboard using a ``port-forward`` as shown below:

   .. code-block:: console

      # kubectl -n wazuh port-forward --address <KUBERNETES_HOST> service/dashboard 8443:443

   Replace ``<KUBERNETES_HOST>`` with the IP address of the Kubernetes host.

The Wazuh dashboard is accessible at ``https://<KUBERNETES_HOST>:8443``.

The default credentials are ``admin:SecretPassword``.

Change the password of Wazuh users
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Improve security by changing default passwords for Wazuh users. There are two categories of Wazuh users:

-  `Wazuh indexer users`_
-  `Wazuh server API users`_

Wazuh indexer users
~~~~~~~~~~~~~~~~~~~

Before starting the password change process, log out of your Wazuh dashboard session. Failing to do so might result in errors when accessing Wazuh after changing user passwords due to persistent session cookies.

To change the password of the default ``admin`` and ``kibanaserver`` users, do the following.

.. warning::

   If you have custom users, add them to the ``internal_users.yml`` file. Otherwise, executing this procedure deletes them.

Set a new password hash
.......................

#. Start a Bash shell in the ``wazuh-indexer-0`` pod.

   .. code-block:: console

      # kubectl exec -it wazuh-indexer-0 -n wazuh -- /bin/bash

#. Run these commands to generate the hash of your new password. When prompted, input the new password and press Enter.

   .. code-block:: console

	   $ export JAVA_HOME=/usr/share/wazuh-indexer/jdk
	   $ bash /usr/share/wazuh-indexer/plugins/opensearch-security/tools/hash.sh

   .. warning::

      Do not use the ``$`` or ``&`` characters in your new password. These characters can cause errors during deployment.

#. Copy the generated hash and exit the Bash shell.

#. Open the ``wazuh/indexer_stack/wazuh-indexer/indexer_conf/internal_users.yml`` file. Locate the block for the user whose password you want to change and replace the hash:

   -  ``admin`` user

      .. code-block:: YAML
         :emphasize-lines: 3

         ...
         admin:
             hash: "<ADMIN_PASSWORD_HASH>"
             reserved: true
             backend_roles:
             - "admin"
             description: "Demo admin user"

         ...

      Replace ``<ADMIN_PASSWORD_HASH>`` with the password hash generated in the previous step.

   -  ``kibanaserver`` user

      .. code-block:: YAML
         :emphasize-lines: 3

         ...
         kibanaserver:
             hash: "<KIBANASERVER_PASSWORD_HASH>"
             reserved: true
             description: "Demo kibanaserver user"

         ...

      Replace ``<KIBANASERVER_PASSWORD_HASH>`` with the password hash generated in the previous step.

Setting the new password
........................

#. Encode your new password in base64 format. Use the ``-n`` option with the ``echo`` command as follows to avoid inserting a trailing newline character to maintain the hash value.

   .. code-block:: console

      # echo -n "NewPassword" | base64

#. Edit the indexer or dashbboard secrets configuration file as follows. Replace the value of the ``password`` field with the base64 encoded password.

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

#. Start a new Bash shell in the ``wazuh-indexer-0`` pod.

   .. code-block:: console

      # kubectl exec -it wazuh-indexer-0 -n wazuh -- /bin/bash

#. Set the following variables:

   .. code-block:: bash

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

#. Log in to the Wazuh dashboard using the new credentials.

Wazuh server API users
~~~~~~~~~~~~~~~~~~~~~~

The ``wazuh-wui`` user is the default user used to connect to the Wazuh server API. Follow the steps below to change the password.

.. note::

   The password for Wazuh server API users must be between 8 and 64 characters long. It must contain at least one uppercase and one lowercase letter, a number, and a symbol.

#. Encode your new password in base64 format. Use the ``-n`` option with the ``echo`` command as follows to avoid inserting a trailing newline character to maintain the hash value.

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

#. Restart the Wazuh dashboard and Wazuh manager master pods.

   .. code-block:: console

      # kubectl delete pod wazuh-manager-master-0 wazuh-manager-worker-0-0 wazuh-manager-worker-1-0 wazuh-dashboard-f4d9c7944-httsd

Agents
^^^^^^

The Wazuh agent can be deployed directly within your Kubernetes environment to monitor workloads, pods, and container activity. This setup provides visibility into the cluster’s runtime behavior, helping detect threats and configuration issues at the container and node levels.

There are two main deployment models for Wazuh agents in Kubernetes:

-  **DaemonSet deployment** where one Wazuh agent runs on each node to monitor the node and all containers on that node.
-  **Sidecar deployment** where the Wazuh agent runs as a companion container alongside a specific application pod to monitor that application only.

Deploying the Wazuh Agent as a DaemonSet
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

This is the most common approach for full-cluster monitoring. Each node runs one agent, ensuring complete coverage without manual intervention when new nodes are added.

#. Create the Wazuh Agent DaemonSet manifest ``wazuh-agent-daemonset.yaml``:

   .. code-block:: yaml
      :emphasize-lines: 84,90,167

      apiVersion: v1
      kind: Namespace
      metadata:
        name: wazuh-daemonset
      ---
      apiVersion: apps/v1
      kind: DaemonSet
      metadata:
        name: wazuh-agent
        namespace: wazuh-daemonset
      spec:
        selector:
          matchLabels:
            app: wazuh-agent
        template:
          metadata:
            labels:
              app: wazuh-agent
          spec:
            serviceAccountName: default
            terminationGracePeriodSeconds: 20

            #        INIT CONTAINERS
            initContainers:
              # 1) Clean stale PID / lock files
              - name: cleanup-ossec-stale
                image: busybox:1.36
                imagePullPolicy: IfNotPresent
                command: ["/bin/sh", "-lc"]
                args:
                  - |
                    set -e
                    echo "[init] Cleaning old locks..."
                    mkdir -p /agent/var/run /agent/queue/ossec
                    rm -f /agent/var/run/*.pid || true
                    rm -f /agent/queue/ossec/*.lock || true
                volumeMounts:
                  - name: ossec-data
                    mountPath: /agent

              # 2) Seed /var/ossec into hostPath (first run only)
              - name: seed-ossec-tree
                image: wazuh/wazuh-agent:|WAZUH_CURRENT_KUBERNETES|
                imagePullPolicy: IfNotPresent
                command: ["/bin/sh", "-lc"]
                args:
                  - |
                    set -e
                    echo "[init] Checking if seeding is required..."
                    if [ ! -d /agent/bin ]; then
                      echo "[init] Seeding /var/ossec to hostPath..."
                      tar -C /var/ossec -cf - . | tar -C /agent -xpf -
                    else
                      echo "[init] Existing data found, skipping seed"
                    fi
                volumeMounts:
                  - name: ossec-data
                    mountPath: /agent

              # 3) Fix ownership/permissions
              - name: fix-permissions
                image: busybox:1.36
                imagePullPolicy: IfNotPresent
                command: ["/bin/sh", "-lc"]
                args:
                  - |
                    set -e
                    echo "[init] Fixing permissions..."
                    for d in etc logs queue var rids tmp "active-response"; do
                      [ -d "/agent/$d" ] && chown -R 999:999 "/agent/$d"
                    done
                    chown -R 0:0 /agent/bin /agent/lib || true
                    find /agent/bin -type f -exec chmod 0755 {} \; || true
                volumeMounts:
                  - name: ossec-data
                    mountPath: /agent

              # 4) Write ossec.conf with PASSWORD ENROLLMENT
              - name: write-ossec-config
                image: busybox:1.36
                imagePullPolicy: IfNotPresent
                env:
                  - name: WAZUH_MANAGER
                    value: "<EXTERNAL_IP_WAZUH_WORKER>"
                  - name: WAZUH_PORT
                    value: "1514"
                  - name: WAZUH_PROTOCOL
                    value: "tcp"
                  - name: WAZUH_REGISTRATION_SERVER
                    value: "<EXTERNAL_IP_WAZUH>"
                  - name: WAZUH_REGISTRATION_PORT
                    value: "1515"
                  - name: NODE_NAME
                    valueFrom:
                      fieldRef:
                        fieldPath: spec.nodeName
                command: ["/bin/sh", "-lc"]
                args:
                  - |
                    set -e
                    echo "[init] Writing ossec.conf..."
                    mkdir -p /agent/etc


                    cat > /agent/etc/ossec.conf <<EOF
                    <ossec_config>
                       <client>
                          <server>
                            <address>${WAZUH_MANAGER}</address>
                            <port>${WAZUH_PORT}</port>
                            <protocol>${WAZUH_PROTOCOL}</protocol>
                          </server>

                          <enrollment>
                            <enabled>yes</enabled>
                            <agent_name>${NODE_NAME}</agent_name>
                            <manager_address>${WAZUH_REGISTRATION_SERVER}</manager_address>
                            <port>${WAZUH_REGISTRATION_PORT}</port>
                            <authorization_pass_path>/var/ossec/etc/authd.pass</authorization_pass_path>
                          </enrollment>
                       </client>
                    </ossec_config>
                    EOF

                    chown 999:999 /agent/etc/ossec.conf
                    chmod 0640 /agent/etc/ossec.conf
                volumeMounts:
                  - name: ossec-data
                    mountPath: /agent

              # 5) Copy authd.pass from Secret and fix ownership
              - name: fix-authd-pass-perms
                image: busybox:1.36
                imagePullPolicy: IfNotPresent
                command: ["/bin/sh", "-lc"]
                args:
                  - |
                    set -e
                    echo "[init] Copying authd.pass from Secret..."
                    mkdir -p /agent/etc
                    cp /secret/authd.pass /agent/etc/authd.pass
                    chown 0:999 /agent/etc/authd.pass
                    chmod 0640 /agent/etc/authd.pass
                    ls -l /agent/etc/authd.pass
                volumeMounts:
                  - name: ossec-data
                    mountPath: /agent
                  - name: wazuh-authd-pass
                    mountPath: /secret/authd.pass
                    subPath: authd.pass
                    readOnly: true


            #        MAIN CONTAINER
            containers:
              - name: wazuh-agent
                image: wazuh/wazuh-agent:|WAZUH_CURRENT_KUBERNETES|
                imagePullPolicy: IfNotPresent
                command: ["/bin/sh", "-lc"]
                args:
                  - |
                    set -e
                    ln -sf /var/ossec/etc/ossec.conf /etc/ossec.conf || true
                    exec /init
                env:
                  - name: WAZUH_MANAGER
                    value: "<EXTERNAL_IP_WAZUH_WORKER>"
                  - name: NODE_NAME
                    valueFrom:
                      fieldRef:
                        fieldPath: spec.nodeName
                securityContext:
                  runAsUser: 0
                  allowPrivilegeEscalation: true
                  capabilities:
                    add: ["SETGID","SETUID"]
                volumeMounts:
                  - name: varlog
                    mountPath: /var/log
                    readOnly: true
                  - name: dockersock
                    mountPath: /var/run/docker.sock
                    readOnly: true
                  - name: ossec-data
                    mountPath: /var/ossec


            #            VOLUMES
            volumes:
              - name: varlog
                hostPath:
                  path: /var/log
                  type: Directory
              - name: dockersock
                hostPath:
                  path: /var/run/docker.sock
                  type: Socket
              - name: ossec-data
                hostPath:
                  path: /var/lib/wazuh
                  type: DirectoryOrCreate
              - name: wazuh-authd-pass
                secret:
                  secretName: wazuh-authd-pass

   Replace:

   -  ``<EXTERNAL_IP_WAZUH_WORKER>`` with the External IP of the ``wazuh-workers`` load balancer.
   -  ``<EXTERNAL_IP_WAZUH>`` with the External IP of the ``wazuh`` load balancer.

#. Create the namespace:

   .. code-block:: console

      $ kubectl create namespace wazuh-daemonset

#. Create the Kubernetes secret for the enrollment password:

   .. code-block:: console

      $ kubectl create secret generic wazuh-authd-pass \
        -n wazuh-daemonset \
        --from-literal=authd.pass=password

   .. note::

      The default password for enrolling the Wazuh agent in your Kubernetes cluster is ``password``. This value is stored in the ``/var/ossec/etc/authd.pass`` file on the Wazuh Manager. For more information, see :doc:`/user-manual/agent/agent-enrollment/security-options/using-password-authentication` documentation.

#. Deploy the Wazuh agent:

   .. code-block:: console

      $ kubectl apply -f wazuh-agent-daemonset.yaml

#. Verify that the Wazuh agent was deployed across all nodes with the following command:

   .. code-block:: console

      $ kubectl get pods -n wazuh-daemonset -o wide

   .. code-block:: none
      :class: output

      NAME                READY   STATUS    RESTARTS   AGE   IP          NODE     NOMINATED NODE   READINESS GATES
      wazuh-agent-t2fwl   1/1     Running   0          21m   10.42.0.9   server   <none>           <none>

Deploying the Wazuh Agent as a Sidecar
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The sidecar approach is ideal for targeted monitoring of sensitive applications or workloads that require isolated log collection. Perform the steps below to deploy Wazuh as a Sidecar:

#. Modify your application’s deployment to include the Wazuh agent container. In the example below, we deploy Wazuh alongside the Apache Tomcat application from the ``wazuh-agent-sidecar.yaml`` deployment file:

   .. code-block:: yaml
      :emphasize-lines: 72,78,178,184

      apiVersion: v1
      kind: Namespace
      metadata:
        name: wazuh-sidecar
      ---
      apiVersion: apps/v1
      kind: StatefulSet
      metadata:
        name: tomcat-wazuh-agent
        namespace: wazuh-sidecar
      spec:
        serviceName: tomcat-app
        replicas: 1
        selector:
          matchLabels:
            app: tomcat-wazuh-agent
        template:
          metadata:
            labels:
              app: tomcat-wazuh-agent
          spec:
            terminationGracePeriodSeconds: 20
            securityContext:
              fsGroup: 999
              fsGroupChangePolicy: OnRootMismatch

            #        INIT CONTAINERS
            initContainers:
              - name: cleanup-ossec-stale
                image: busybox:1.36
                imagePullPolicy: IfNotPresent
                securityContext:
                  runAsUser: 0
                command: ["/bin/sh", "-lc"]
                args:
                  - |
                    set -e
                    mkdir -p /agent/var/run /agent/queue/ossec
                    rm -f /agent/var/run/*.pid || true
                    rm -f /agent/queue/ossec/*.lock || true
                    echo "Cleanup complete. Ready for next init step."
                volumeMounts:
                  - name: wazuh-agent-data
                    mountPath: /agent

              - name: seed-ossec-tree
                image: wazuh/wazuh-agent:|WAZUH_CURRENT_KUBERNETES|
                imagePullPolicy: IfNotPresent
                securityContext:
                  runAsUser: 0
                command: ["/bin/sh", "-lc"]
                args:
                  - |
                    set -e
                    if [ ! -d /agent/bin ]; then
                      echo "Seeding /var/ossec into PVC..."
                      tar -C /var/ossec -cf - . | tar -C /agent -xpf -
                    else
                      echo "Existing Wazuh data found, skipping seed."
                    fi
                volumeMounts:
                  - name: wazuh-agent-data
                    mountPath: /agent

              - name: write-ossec-config
                image: busybox:1.36
                imagePullPolicy: IfNotPresent
                securityContext:
                  runAsUser: 0
                env:
                  - name: WAZUH_MANAGER
                    value: "<EXTERNAL_IP_WAZUH_WORKER>"
                  - name: WAZUH_PORT
                    value: "1514"
                  - name: WAZUH_PROTOCOL
                    value: "tcp"
                  - name: WAZUH_REGISTRATION_SERVER
                    value: "<EXTERNAL_IP_WAZUH>"
                  - name: WAZUH_REGISTRATION_PORT
                    value: "1515"
                  - name: WAZUH_AGENT_NAME
                    valueFrom:
                      fieldRef:
                        fieldPath: metadata.name
                command: ["/bin/sh", "-lc"]
                args:
                  - |
                    set -e
                    mkdir -p /agent/etc
                    cat > /agent/etc/ossec.conf <<'EOF'
                    <ossec_config>
                      <client>
                        <server>
                          <address>${WAZUH_MANAGER}</address>
                          <port>${WAZUH_PORT}</port>
                          <protocol>${WAZUH_PROTOCOL}</protocol>
                        </server>
                        <enrollment>
                          <enabled>yes</enabled>
                          <agent_name>${WAZUH_AGENT_NAME}</agent_name>
                          <manager_address>${WAZUH_REGISTRATION_SERVER}</manager_address>
                          <port>${WAZUH_REGISTRATION_PORT}</port>
                          <authorization_pass_path>/var/ossec/etc/authd.pass</authorization_pass_path>
                        </enrollment>
                      </client>
                      <localfile>
                        <log_format>syslog</log_format>
                        <location>/usr/local/tomcat/logs/catalina.out</location>
                      </localfile>
                    </ossec_config>
                    EOF

                    sed -i \
                      -e "s|\${WAZUH_MANAGER}|${WAZUH_MANAGER}|g" \
                      -e "s|\${WAZUH_PORT}|${WAZUH_PORT}|g" \
                      -e "s|\${WAZUH_PROTOCOL}|${WAZUH_PROTOCOL}|g" \
                      -e "s|\${WAZUH_REGISTRATION_SERVER}|${WAZUH_REGISTRATION_SERVER}|g" \
                      -e "s|\${WAZUH_REGISTRATION_PORT}|${WAZUH_REGISTRATION_PORT}|g" \
                      -e "s|\${WAZUH_AGENT_NAME}|${WAZUH_AGENT_NAME}|g" \
                      /agent/etc/ossec.conf

                    chown 999:999 /agent/etc/ossec.conf
                    chmod 0640 /agent/etc/ossec.conf
                volumeMounts:
                  - name: wazuh-agent-data
                    mountPath: /agent

              - name: fix-authd-pass-perms
                image: busybox:1.36
                imagePullPolicy: IfNotPresent
                securityContext:
                  runAsUser: 0
                command: ["/bin/sh", "-lc"]
                args:
                  - |
                    set -e
                    echo "Copying authd.pass from Secret..."
                    mkdir -p /agent/etc
                    cp /secret/authd.pass /agent/etc/authd.pass
                    chown 0:999 /agent/etc/authd.pass
                    chmod 0640 /agent/etc/authd.pass
                    ls -l /agent/etc/authd.pass
                volumeMounts:
                  - name: wazuh-agent-data
                    mountPath: /agent
                  - name: wazuh-authd-pass
                    mountPath: /secret/authd.pass
                    subPath: authd.pass
                    readOnly: true


            #        MAIN CONTAINERS
            containers:
              - name: tomcat
                image: tomcat:10.1-jdk17
                imagePullPolicy: IfNotPresent
                ports:
                  - containerPort: 8080
                volumeMounts:
                  - name: application-data
                    mountPath: /usr/local/tomcat/logs

              - name: wazuh-agent
                image: wazuh/wazuh-agent:|WAZUH_CURRENT_KUBERNETES|
                imagePullPolicy: IfNotPresent
                lifecycle:
                  preStop:
                    exec:
                      command: ["/bin/sh", "-lc", "/var/ossec/bin/ossec-control stop || true; sleep 2"]
                command: ["/bin/sh", "-lc"]
                args:
                  - |
                    set -e
                    ln -sf /var/ossec/etc/ossec.conf /etc/ossec.conf
                    exec /init
                env:
                  - name: WAZUH_MANAGER
                    value: "<EXTERNAL_IP_WAZUH_WORKER>"
                  - name: WAZUH_PORT
                    value: "1514"
                  - name: WAZUH_PROTOCOL
                    value: "tcp"
                  - name: WAZUH_REGISTRATION_SERVER
                    value: "<EXTERNAL_IP_WAZUH>"
                  - name: WAZUH_REGISTRATION_PORT
                    value: "1515"
                  - name: WAZUH_AGENT_NAME
                    valueFrom:
                      fieldRef:
                        fieldPath: metadata.name
                securityContext:
                  runAsUser: 0
                  runAsGroup: 0
                volumeMounts:
                  - name: wazuh-agent-data
                    mountPath: /var/ossec
                  - name: application-data
                    mountPath: /usr/local/tomcat/logs

            #            VOLUMES
            volumes:
              - name: wazuh-authd-pass
                secret:
                  secretName: wazuh-authd-pass

        volumeClaimTemplates:
          - metadata:
              name: wazuh-agent-data
            spec:
              accessModes: ["ReadWriteOnce"]
              resources:
                requests:
                  storage: 3Gi
          - metadata:
              name: application-data
            spec:
              accessModes: ["ReadWriteOnce"]
              resources:
                requests:
                  storage: 5Gi
      ---
      apiVersion: v1
      kind: Service
      metadata:
        name: tomcat-app
        namespace: wazuh-sidecar
      spec:
        selector:
          app: tomcat-wazuh-agent
        type: NodePort
        ports:
          - protocol: TCP
            port: 80
            targetPort: 8080
            nodePort: 30013

   Replace:

   -  ``<EXTERNAL_IP_WAZUH_WORKER>`` with the External IP of the ``wazuh-workers`` load balancer.
   -  ``<EXTERNAL_IP_WAZUH>`` with the External IP of the ``wazuh`` load balancer.

#. Create the namespace for the Wazuh agent and the Node.js application:

   .. code-block:: console

      # kubectl create namespace wazuh-sidecar

#. Create the Kubernetes secret for the enrollment password:

   .. code-block:: console

      $ kubectl create secret generic wazuh-authd-pass \
        -n wazuh-sidecar \
        --from-literal=authd.pass=password

   .. note::

      The default password for enrolling the Wazuh agent in your Kubernetes cluster is ``password``. This value is stored in the ``/var/ossec/etc/authd.pass`` file on the Wazuh Manager. For more information, see :doc:`/user-manual/agent/agent-enrollment/security-options/using-password-authentication` documentation.

#. Deploy the sidecar setup:

   .. code-block:: console

      # kubectl apply -f wazuh-agent-sidecar.yaml

#. Run the command below to confirm that the ``tomcat-wazuh-agent`` pod is running:

   .. code-block:: console

      # kubectl get pods -n wazuh-sidecar

   .. code-block:: none
      :class: output

      NAME                           READY   STATUS     RESTARTS   AGE
      tomcat-wazuh-agent-0   2/2     Running           0          18s
