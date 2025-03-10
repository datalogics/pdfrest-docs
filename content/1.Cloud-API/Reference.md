# pdfRest Cloud API Reference Guide

REST API Tools for simple PDF processing with GET and POST HTTP requests

## Getting Started

Welcome to the pdfRest Cloud API Reference Guide! Below you will find all the information you will need to get started using the
pdfRest API Tools with your dedicated API Key. If you don't have a key yet, generate one for free at pdfrest.com/getstarted

This guide is organized by API endpoints, which express the output file types that can be generated from input files supplied with
requests. For example, to convert a JPG file to a PDF, you would send the JPG file to the /pdf endpoint.

### Additional Resources

- API Lab - an intuitive interface to learn the tools and parameters, build code automatically, send API calls directly from the website, and download output files
- GitHub Repository - functional code examples available for several popular languages
  - cURL
  - JavaScript
  - Python
  - PHP
  - .NET
  - Java
  - Postman Collection - preconfigured API calls ready to send using the Postman API Platform

## API Endpoints

### Retrieve File (Download)

::card
---
description: Retrieve a resource or its URL by ID. Resource IDs can be found in
  the JSON response of POST requests.
title: GET /resource/{id}
---
::

#### Examples

::code-group
```python [Python]
import requests
import json

# Resource UUIDs can be found in the JSON response of POST requests as "outputId". Resource UUIDs usually look like this: '0950b9bdf-0465-4d3f-8ea3-d2894f1ae839'.
id = 'xxxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx' # place resource uuid here

# The response format can be 'file' or 'url'. 
# If 'url', then JSON containing the url of the resource file is returned.
# If 'file', then the file itself is returned.
format = 'file'

resource_url = f"https://api.pdfrest.com/resource/{id}?format={format}"

print("Sending GET request to /resource/{id} endpoint...")
response = requests.get(resource_url)

print("Response status code: " + str(response.status_code))

if response.ok and format == 'url':
  response_json = response.json()
  print(json.dumps(response_json, indent = 2))
elif response.ok and format == 'file':
  # You will find a file (associated with the resource UUID above) in the same folder as the sample when the sample executes successfully.
  output_file_name = response.headers.get("Content-Disposition").split("filename=")[1]

  with open(output_file_name, 'wb') as f:
      f.write(response.content)

  print(f"The file {output_file_name} was created.")
else:
  print(response.text)
```

```bash [cURL]
curl -X GET "https://api.pdfrest.com/resource/xxxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx?format=url"

```

```js [JavaScript]
// This request demonstrates how to retrieve a resource using an ID.
const axios = require('axios');

let config = {
method: 'get',
maxBodyLength: Infinity, // set maximum length of the request body
url: 'https://api.pdfrest.com/resource/xxxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx?format=url',
headers: { }
};

// define configuration options for axios request
axios.request(config)
.then((response) => {
console.log(JSON.stringify(response.data));
})
.catch((error) => {
console.log(error);
});

```

\::

#### Path Parameters
::

#### Path Parameters

::field-group
  :::field{required name="id" type="boolean"}
  Alphanumeric ID (UUID) of the resource to return. Any valid resource `id` returned by a POST request.
  :::

  :::field{required name="format" type="string"}
  Specify whether to return the file directly, URL to the file, or information about the file:br:brAccepts:
  
  - `file` - return the file itself
  - `url` - return JSON containing the URL of the resource file
  - `info` - return JSON containing detailed information about the file:
    - resource ID
    - file name
    - url
    - file type
    - file size (bytes)
    - last modified datetime
  :::
::

### Convert to PDF/A (Archival)

::card
---
description: Converts standard PDF to a variety of PDF/A versions, intended for long-term compatibility.
title:  POST /pdfa
---
::

#### Summary

Converts PDF to any of the following PDF/A versions:
- PDF/A-1b - Basic conformance with visual appearance.
- PDF/A-2b - Basic conformance with archival standards but revised for later versions of the PDF format. PDF/A-2 includes options for OpenType fonts, layers, attachments (which must also be PDF/A compliant) and JPEG 2000 image compression.
- PDF/A-2u - Matches PDF/A-2b but also requires that all text in the document have Unicode mappings.
- PDF/A-3b - Matches PDF/A-2b, except that it is possible to embed any kind of file in the PDF document. For example, with PDF/A-3 a user can save a XML, CSV, CAD, spreadsheet, or other type of file in the PDF document and be compliant. The file embedded in the PDF/A-3 does not need to PDF/A compliant.
- PDF/A-3u - Matches PDF/A-3b, but also requires that all text in the document have Unicode mapping.

#### Examples

::code-group
```python [Python]
from requests_toolbelt import MultipartEncoder
import requests
import json

pdfa_endpoint_url = 'https://api.pdfrest.com/pdfa'

# The /pdfa endpoint can take a single PDF file or id as input.
mp_encoder_pdfa = MultipartEncoder(
    fields={
        'file': ('file_name.pdf', open('/path/to/file', 'rb'), 'application/pdf'),
        'output_type': 'PDF/A-1b',
        'rasterize_if_errors_encountered': 'on',
        'output' : 'example_pdfa_out',
    }
)

# Let's set the headers that the pdfa endpoint expects.
# Since MultipartEncoder is used, the 'Content-Type' header gets set to 'multipart/form-data' via the content_type attribute below.
headers = {
    'Accept': 'application/json',
    'Content-Type': mp_encoder_pdfa.content_type,
    'Api-Key': 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx' # place your api key here
}

print("Sending POST request to pdfa endpoint...")
response = requests.post(pdfa_endpoint_url, data=mp_encoder_pdfa, headers=headers)

print("Response status code: " + str(response.status_code))

if response.ok:
    response_json = response.json()
    print(json.dumps(response_json, indent = 2))
else:
    print(response.text)

# If you would like to download the file instead of getting the JSON response, please see the 'get-resource-id-endpoint.py' sample.

```

```bash [cURL]
curl -X POST "https://api.pdfrest.com/pdfa" \
  -H "Accept: application/json" \
  -H "Content-Type: multipart/form-data" \
  -H "Api-Key: xxxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx" \
  -F "file=@/path/to/file" \
  -F "output=example_out" \
  -F "output_type=PDF/A-1b" \
  -F "rasterize_if_errors_encountered=off"

```

```js [JavaScript]
// This request demonstrates how to convert any of several formats to PDF/A. 
var axios = require('axios');
var FormData = require('form-data');
var fs = require('fs');

// Create a new form data object and append the PDF file and parameters to it
var data = new FormData();
data.append('file', fs.createReadStream('/path/to/file'));
data.append('output_type', 'PDF/A-2b'); 
data.append('rasterize_if_errors_encountered', 'off');
data.append('output', 'pdfrest_pdfa');

// define configuration options for axios request
var config = {
  method: 'post',
  maxBodyLength: Infinity, // set maximum length of the request body
  url: 'https://api.pdfrest.com/pdfa', 
  headers: { 
    'Api-Key': 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx', // Replace with your API key
    ...data.getHeaders() // set headers for the request
  },
  data : data // set the data to be sent with the request
};

// send request and handle response or error
axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error); 
});

// If you would like to download the file instead of getting the JSON response, please see the 'get-resource-id-endpoint.js' sample.
```

\::

#### Path Parameters
::

#### Path Parameters

::field-group
  :::field{required name="id" type="string"}
  Use only one of `id` or `file`.
  <br>
  <br>
  Alphanumeric ID (UUID) of the resource to return. Any valid resource `id` returned by a POST request.
  :::
OR
  :::field{required name="file" type="string"}
  Use only one of `id` or `file`.
  <br>
  <br>
  Specify whether to return the file directly, URL to the file, or information about the file:br:brAccepts:
  
  - `file` - return the file itself
  - `url` - return JSON containing the URL of the resource file
  - `info` - return JSON containing detailed information about the file:
    - resource ID
    - file name
    - url
    - file type
    - file size (bytes)
    - last modified datetime
  :::
  :::field{required name="output_type" type="string" required}
  Desired PDF/A version for the output.
  <br>
  <br>
  Accepts:
  <br>
  - `PDF/A-1b`
  - `PDF/A-2b`
  - `PDF/A-2u`
  - `PDF/A-3b`
  - `PDF/A-3u`
  :::
  :::field{name="output" type="string" defaultValue="Default: [INPUT_FILE_NAME]_pdfrest_pdfa"}
  Name of the generated output file, without extension.
  <br>
  <br>
  Accepts any valid filename.
  <br><br>Example:<br><br>
  `example_out`
  :::
  :::field{name="rasterize_if_errors_encountered" type="string" defaultValue="Default:off"}
  When set to ON, if the API finds errors when converting a PDF document, it will rasterize the page with the problem into a graphic image and continue to save the document as a PDF/A document. If set to OFF it will instead return an error in such cases.
  <br>
  <br>
  Accepts: `on` or `off`
  :::
::
