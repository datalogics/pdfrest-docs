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

### GET /resource/{id}

#### Summary

Retrieve a resource or its URL by ID. Resource IDs can be found in the JSON response of POST requests.

#### Path Parameters

::field-group
  ::field{name="id" type="boolean" defaultValue="none" required}
  A field with a default value.
  ::
  OR
  ::field{name="file" type="boolean" required}
  A required field.
  ::
  ::field{name="clear (path?: string)" type="void"}
  Clears form errors associated with a specific path. If no path is provided, clears all form errors.
  ::
  ::field{name="getErrors (path?: string)" type="FormError[]"}
  Retrieves form errors associated with a specific path. If no path is provided, returns all form errors.
  ::
  ::field{name="setErrors (errors: FormError[], path?: string)" type="void"}
  Sets form errors for a given path. If no path is provided, overrides all errors.
  ::
  ::field{name="errors" type="Ref<FormError[]>"}
  A reference to the array containing validation errors. Use this to access or manipulate the error information.
  ::
::


#### Examples

::code-group
  ```curl [cURL]
  curl -X GET "https://api.pdfrest.com/resource/xxxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx?format=url"

  ```

  ```JavaScript [JavaScript]
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
::


#### Path Parameters



