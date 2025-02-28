::hero-alt
---

actions:
  - name: AWS Marketplace
    to: https://aws.amazon.com/marketplace/seller-profile?id=2bceface-f777-4fcb-a529-91c088f45034
    icon: vscode-icons:file-type-aws
#  - name: GitHub
#    variant: ghost
 #   to: https://github.com/ZTL-UwU/shadcn-docs-nuxt
#mobileRight: 'top' # 'top' | 'bottom'
---

#title
Configure Deployed Self-Hosted API

#description
How to configure Self-Hosted API deployments from the AWS Marketplace.

#right
![logo](aws-circle.png)
::

## Configure CloudFormation deployments

## Configure AMI-based EC2s

### Start the Docker Container

For this process, you will need to have already launched an instance by following the [AMI Deployment guide](pdfrest.com/documentation/self-hosted/ami-deploy/).

::steps{level=4}

#### You can view information about your instance in the EC2 Console Instances view. You can reach it from the EC2 Dashboard with any of these links.

![EC2 Instances menu](https://cms.pdfrest.com/content/images/2022/12/image2.png)

#### Checking the box will select the instance in this view, and clicking the link will open the instance details in its own view. For this guide, we’ll click the link and open the instance details in its own view.

![Highlighted instance ID in Instances view](https://cms.pdfrest.com/content/images/2022/12/image10.png)

#### Look for Public IPv4 DNS on the Details tab. Log onto the server using this DNS address, the username ec2-user, and the keypair you selected when creating the instance.

![Public IPv4 DNS details of instance](https://cms.pdfrest.com/content/images/2022/12/Screenshot-at-Dec-08-17-44-52.png)

#### The following command will start the server with the default settings:
```
docker run -d -p 80:3000 --restart always pdf_toolkit_self-hosted_api:latest
```

#### If the Docker daemon is not running, run `sudo systemctl start docker` before starting the server.

::

### Controlling the Container

The following commands control the Docker container:

- `docker ps` to view the running container and get its randomly generated name.

- `docker stop <container_name>` to stop the server.

- `docker rm <container_name>` to remove the container.

![Docker commands run in a terminal](https://cms.pdfrest.com/content/images/2024/03/l5b.png)


### Environment variables customization

Above, using the `docker run` command, we started the server using the default configuration. There are a number options that can be customized for the pdfRest service through its environment variables.

The following codeblock shows how to configure multiple variables when starting the container:

```
docker run -d -p 80:3000 --restart always \
-e REMOVE_ORIGINAL_PROCESSED=1 \
-e MAX_PROCESS_TIME=1800 \
pdf_toolkit_self-hosted_api:latest
```

The following are the configurable environmental variables:

- REMOVE_ORIGINAL_PROCESSED: Controls whether uploaded and processed documents are deleted from the system. Set to 1 for **true** or 2 for **false**. Defaults to 1 for **true**.

- REMOVE_ORIGINAL_PROCESSED_DELAY: Controls how long before those documents are deleted from the system in milliseconds. Requires **REMOVE_ORIGINAL_PROCESSED** to be **true**. Defaults to 1800000 (30 minutes)

- MAX_PROCESS_TIME: Controls how long a single document will process before timing out in seconds. Defaults to 1800 (30 minutes)

- MAX_UPLOAD_SIZE: Controls the maxiumum uploaded file size in MB. Defaults to 1000

- INPUT_KEY: A value appended to all input file IDs to visually and programatically identify them. Defaults to 1

- OUTPUT_KEY: A value appended to all output file IDs to visually and programatically identify them. Defaults to 2

- REDIRECT_ROOT_URL: Controls the url that users will be redirected to if they try to manually navigate to the server domain. Defaults to https://pdfrest.com

- PDFREST_SERVER_DOMAIN: Controls which domain the pdfRest API will tell users to retrieve their files from after processing. Must be set to the scheme and host of the actual server

- PDFREST_MAX_CLU_CONCURRENCY: Sets the maximum number of processing requests that can run at the same time; any additional requests will queue. This prevents performance issues when the server is overloaded by bursts of simulteneous requests. The default is the available concurrency (usually the number of CPU cores) minus 1, with a lower bound of 1.