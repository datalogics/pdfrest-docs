# pdfRest PDF Toolkit Container API

Welcome to the documentation for the PDF Toolkit Container API, which provides developers and organizations with powerful, secure, and customizable PDF solutions. These API Tools easily integrate into any workflow or application to support bulk, batch, and automated document processing.

Built with the Adobe PDF Library, the same technology that powers Adobe Acrobat, and developed by Datalogics, globally-trusted document processing experts for over 50 years, pdfRest is the gold-standard API for high-quality PDF processing.

Additional documentation including the [Self-Hosted Reference Guide](https://pdfrest.com/pdf-toolkit-self-hosted-reference), which is fully applicable to the Container API, can be found at [https://pdfrest.com](https://pdfrest.com).

- Support for the pdfRest can be found on the [Datalogics Support Portal](https://datalogics-jira.atlassian.net/servicedesk/customer/portal/3/group/8/create/22).

- Questions regarding container licensing can be directed towards sales@datalogics.com.


## Loading the image

The Docker container can be obtained in tar form from links provided by the Datalogics Sales team.

Once the image has been downloaded you will need to load it into your environment. Ex. with [`docker load`](https://docs.docker.com/reference/cli/docker/image/load/)

## Using the image

The guide covers two containerized deployment methods, Docker and Kubernetes.

### Docker

The simplest YAML file to define a docker stack that utilizes the pdfRest Container API can be found below:

```
services:
  pdfrest-toolkit:
    platform: linux/amd64
    image: <image_name>
    restart: always
    environment:
      - PDFREST_SERVER_DOMAIN=https://api.yourDomainHere.com
    ports:
     - "80:3000"
    volumes:
      - /tmp:/opt/datalogics/public
```

This will instruct Docker to set up a pdfRest instances on a Linux machine using the pdfRest container image previously loaded with `docker load`.

The optional `PDFREST_SERVER_DOMAIN` formats the input and output URLs of documents uploaded to and processed by the API.

The `ports` section of the YAML instructs the stack to listen for API calls on port 80 and forward those calls to port 3000 inside of the container. You can change the listener to a port other than 80, but 3000 is a mandatory value for the forwarding port.

If you require shared storage between multiple running instances, set up a shared volume as described in the [Docker storage volume documentation](https://docs.docker.com/storage/volumes) and configure the `volumes` section of the YAML to mount that volume as shown below:

```
volumes:
  - <your_volume>:/opt/datalogics/public
```

### Kubernetes

Using the image previously loaded with `docker load` you can now create and expose a deployment. The only item to note is that the pdfRest server listens on port 3000

`kubectl create deployment pdfrest --image=<image_name>`

`kubectl expose deployment pdfrest --type=NodePort --port=3000`

When running multiple instances you will want to set up a shared volume so that all instances of pdfRest can read and write to the same location. This ensures that all input and output documents are available no matter which instance a processing or retrieval API call load-balances to. This requires the creation of a PersistentVolume.

Here, we will demonstrate with a _hostPath_ PersistentVolume for testing and development purposes. It is not recommended to use a hostPath in a production cluster. A cluster administrator should provision a networked resource such as an NFS share, a Google Cloud persistent disk, Azure File Share, or an AWS EFS volume.

First, create the PersistentVolume:

```
apiVersion: v1
kind: PersistentVolume
metadata:
  name: pdfrest-pv
  labels:
    type: local
spec:
  storageClassName: manual
  capacity:
    storage: 10Gi
  accessModes:
    - ReadWriteMany
  hostPath:
    path: "/mnt/data"
```

save it as **pdfrest-pv.yaml** and apply it to your deployment with

`kubectl apply -f pdfrest-pv.yaml`

This configuration specifies that the volume will be found at `/mnt/data/` on the cluster Node. It also defines the StorageClass name for the PersistentVolume as `manual`, which will be used to bind PersistentVolumeClaim requests to this PersistentVolume.

Then, create the PersistentVolumeClaim:

```
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: pdfrest-pvc
spec:
  storageClassName: manual
  accessModes:
    - ReadWriteMany
  resources:
    requests:
      storage: 10Gi
```

Save it as **pdfrest-pvc.yaml** and apply it to your deployment with

`kubectl apply -f pdfrest-pvc.yaml`

The PersistentVolumeClaim should be automatically bound to the PersistentVolume you created.

Then configure the pdfRest deployment to use the PersistentVolumeClaim you made as a volume.

`kubectl edit deployment pdfrest`

Edit the deployment .yaml, under spec > template > spec:

```
spec:
# ...
  template:
    # ...
    spec:
      # Add the PersistentVolumeClaim under volumes
      volumes:
      - name: pdfrest-storage
        persistentVolumeClaim:
          claimName: pdfrest-pvc
      containers:
        # Mount to the /opt/datalogics/public directory
        volumeMounts:
          - name: pdfrest-storage
            mountPath: /opt/datalogics/public
```

## Environment variables customization

There are a few options that can be customized for the pdfRest service through its environment variables.

- REMOVE_ORIGINAL_PROCESSED: Controls whether uploaded and processed documents are deleted from the system. Set to **true** or **false**. Defaults to **true**.

- REMOVE_ORIGINAL_PROCESSED_DELAY: Controls how long before those documents are deleted from the system in milliseconds. Requires **REMOVE_ORIGINAL_PROCESSED** to be **true**. Defaults to 1800000 (30 minutes)

- MAX_PROCESS_TIME: Controls how long a single document will process before timing out in seconds. Defaults to 1800 (30 minutes)

- MAX_UPLOAD_SIZE: Controls the maxiumum uploaded file size in MB. Defaults to 1000

- INPUT_KEY: A value appended to all input file IDs to visually and programatically identify them. Defaults to 1

- OUTPUT_KEY: A value appended to all output file IDs to visually and programatically identify them. Defaults to 2

- REDIRECT_ROOT_URL: Controls the url that users will be redirected to if they try to manually navigate to the server domain. Defaults to https://pdfrest.com

- PDFREST_SERVER_DOMAIN: Controls which domain the pdfRest API will tell users to retrieve their files from after processing. Must be set to the scheme and host of the actual server

- PDFREST_MAX_CLU_CONCURRENCY: Sets the maximum number of processing requests that can run at the same time; any additional requests will queue. This prevents performance issues when the server is overloaded by bursts of simulteneous requests. The default is the available concurrency (usually the number of CPU cores) minus 1, with a lower bound of 1.

### Environment variables in Docker

In docker these variables can be set under services > **pdfrest_service** > env.

```
services:
  pdfrest-toolkit:
    platform: linux/amd64
    image: <image_name>
    restart: always
    environment:
      - PDFREST_SERVER_DOMAIN=https://api.pdfrest.com
      - MAX_UPLOAD_SIZE=1000
```

### Environment variables in Kubernetes

In Kubernetes this would be found under spec > template > spec > containers > **pdfrest_container** > env.

```
spec:
  template:
    spec:
      containers:
        - name: pdfrest
          image: <image_name>
          env:
            - name: PDFREST_SERVER_DOMAIN
              value: https://api.pdfrest.com
            - name: REMOVE_ORIGINAL_PROCESSED
              value: false
```

## Installing Microsoft Core Fonts

Some routes such as /watermarked-pdf may require additional fonts to be installed. pdfRest is designed with the assumption that the Microsoft core fonts package is installed, which cannot be included in the package for legal reasons. However, they are free to install by following the [instructions available from Microsoft](https://mscorefonts2.sourceforge.net).

These commands should be programmed to run on server start, or configured as a new layer on top of the existing one.

```
dnf install -y curl cabextract xorg-x11-font-utils fontconfig \
&& rpm -i https://downloads.sourceforge.net/project/mscorefonts2/rpms/msttcore-fonts-installer-2.6-1.noarch.rpm
```