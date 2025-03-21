## General API

::accordion{default-value="first-item" collapsible}
  ::accordion-item{value="first-item"}
  #title
  How are API calls measured?

#content
  When you sign up with an account and select a plan, you will receive a unique API Key that will grant you access to send API Calls to any of the pdfRest API Tools. At the start of each calendar month, your total number of API Calls will be tallied for the previous month, and you will be billed for your base plan plus any overage you may have accrued if your monthly API Calls were in excess of your plan's included amount. This count starts over at zero on the first day of each month.
  <br><br>
  pdfRest supports two types of API Calls:
  - **POST Requests**: These are used to process files with each of the API Tools
  - **GET Requests**: These are used to retrieve files back from the processing server or poll for request status and response
  <br><br>

  All calls that require your API Key count towards your monthly total, including all POST requests and GET requests sent to the `/request-status` endpoint. GET requests sent to the `/resource` endpoint do not require your API Key or count towards your monthly total.

  ::

  ::accordion-item
  #title
  What is the API Lab?

  #content
  API Lab is your one-stop shop for getting started with pdfRest. It's a web-based interface built directly into the pdfRest website that can be used with free or paid accounts. API Lab allows you to:
  <br><br>
  - Test and Validate Solutions: Experiment with pdfRest's functionality in real-time. Upload your own files and test different tools and options to see how they work before integrating them into your application.
  0 Learn by Doing: Explore the various features and parameters offered by pdfRest. API Lab provides a user-friendly interface to discover the potential of different tools.
  - Generate Code: Save valuable development time! Once you've customized your processing options in API Lab, it can automatically generate code snippets in your preferred programming language. Simply copy and paste this code into your project to get started.
  <br><br>

  Think of API Lab as your personal pdfRest playground – a space to experiment, learn, and streamline your development process.
  ::

  ::accordion-item
  #title
  What are Pro Tools?

  #content
  Pro Tools are powerful API Tools that require a Pro or Enterprise plan for unrestricted access. All plans may be used to test Pro Tools, but output will be watermarked, redacted, or otherwise limited with a Starter, or Premium account.

  The current list of Pro Tools includes:
  - [Flatten Forms](https://pdfrest.com/apitools/flatten-forms/)
  - [Import Form Data](https://pdfrest.com/apitools/import-form-data/)
  - [Export Form Data](https://pdfrest.com/apitools/export-form-data/)
  - [XFA to Acroforms](https://pdfrest.com/apitools/xfa-to-acroforms/)
  - [PDF to Word](https://pdfrest.com/apitools/pdf-to-word/)
  - [PDF to Excel](https://pdfrest.com/apitools/pdf-to-excel/)
  - [PDF to PowerPoint](https://pdfrest.com/apitools/pdf-to-powerpoint/)
  ::

  ::accordion-item
  #title
  What is the File Retention Period?

  #content
  File Retention Period refers to the duration for which pdfRest stores the uploaded input files and processed output files after an API call completes. This allows you to access or download the converted documents for a specific period.
  <br><br>
  After this amount of time, files are automatically and permanently deleted for your security. We cannot recover files after they are deleted, so be sure to retrieve them after processing completes. Please refer to the [Pricing page](https://pdfrest.com/pricing/) for the file retention period for each Plan. This value can be customized for Enterprise plans.
  ::
::

## Security and Compliance

::accordion{default-value="first-item" collapsible}

  ::accordion-item
  #title
  Is the Cloud API service GDPR compliant?

  #content
  Yes, pdfRest Cloud API is GDPR compliant when you submit your calls to our EU-hosted API.
  <br><br>
  We adhere to strict security and privacy standards, including:

  - Data Protection: We implement robust security measures to protect your data, including encryption and access controls.
  - Data Retention: We follow GDPR's strict data retention policies, ensuring that your data is deleted after the specified file retention period.
  - Compliance: We are committed to complying with GDPR and other relevant data protection regulations.
  <br>

  For more detailed information, please refer to our [Data Processing Agreement](https://pdfrest.com/data-processing-agreement/), specifically Appendix C, which outlines our security controls and practices.
  <br><br>
  Please [contact us](https://pdfrest.com/support/) if you have any further questions relating to GDPR compliance or our security practices.
  ::

  ::accordion-item
  #title
  How do EU GDPR AP calls work?

  #content
  pdfRest offers a dedicated EU GDPR Cloud API for organizations requiring data processing within the European Union to comply with GDPR regulations. Here's how it works:
  <br><br>
  **Dedicated EU Endpoint**
  <br>
  - To ensure your data remains within the EU, you must direct your API requests to our dedicated EU endpoint: `eu-api.pdfrest.com`
  - Requests sent to our standard US endpoint `api.pdfrest.com` will result in data being processed within the United States, which may not meet your GDPR compliance requirements.

  **Simple Endpoint Changes**
  <br>
  - All of our existing PDF processing tools are available through the EU endpoint.
  - You simply need to change the root URL of your API requests, while keeping the endpoint paths the same.
  - For example, to compress a PDF, use `eu-api.pdfrest.com/compressed-pdf`.

  **Data Processing Within the EU**
  <br>
  - Using the EU endpoint guarantees that all data uploads, processing, and storage occur exclusively within our secure EU data centers.
  - This ensures adherence to GDPR data protection laws and minimizes the risk of non-compliance.

  **Data Processing Agreement (DPA)**
  <br>
  - We provide a [Data Processing Agreement (DPA)](https://pdfrest.com/data-processing-agreement/), a legally binding contract outlining our responsibilities and obligations regarding personal data processing.
  - This DPA demonstrates our commitment to GDPR compliance and provides transparency into our data processing practices.

  **Plan Level Access and Pricing**
  <br>
  - Premium and Pro plans have a fee associated with each call to the EU GDPR Cloud API. There is no fee for Enterprise usage. Please refer to the [Pricing page](https://pdfrest.com/pricing/) for more details.
  ::
::
## Features and Pricing 

::accordion{default-value="first-item" collapsible}
  ::accordion-item{value="first-item"}
  #title
  Is it accessible?

  #content
  Yes. It adheres to the WAI-ARIA design pattern.
  ::

  ::accordion-item
  #title
  Is it unstyled?

  #content
  Yes. It's unstyled by default, giving you freedom over the look and feel.
  ::
  :accordion-item{title="Can it be animated?" content="Yes! You can use the transition prop to configure the animation."}
::