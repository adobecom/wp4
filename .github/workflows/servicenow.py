import requests
import time
import datetime
import timedelta
import json
import os
import sys

def find_string_in_json(json_data, target_string):
  """
  Finds a target string in a JSON object.

  Args:
      json_data (dict or list): The JSON data to search.
      target_string (str): The string to find.

  Returns:
      bool: True if the string is found, False otherwise.
  """

  if isinstance(json_data, dict):
      for key, value in json_data.items():
          if isinstance(value, str) and target_string in value:
              return True
          elif isinstance(value, (dict, list)):
              if find_string_in_json(value, target_string):
                  return True
  elif isinstance(json_data, list):
      for item in json_data:
          if isinstance(item, str) and target_string in item:
              return True
          elif isinstance(item, (dict, list)):
              if find_string_in_json(item, target_string):
                  return True

  return False

# Execute Script logic:
# python3 servicenow.py
if __name__ == "__main__":

  print("Starting CMR Action...")

  print("Setting Planned Maintenance Time Windows for CMR...")
  start_time = (datetime.datetime.now() + datetime.timedelta(seconds = 10)).timestamp()
  end_time = (datetime.datetime.now() + datetime.timedelta(minutes = 10)).timestamp()

  print("Set Release Summary for CMR...")
  release_title = os.environ['PR_TITLE']
  release_details = os.environ['PR_BODY']
  pr_num = os.environ['PR_NUMBER']
  pr_created = os.environ['PR_CREATED_AT']
  pr_merged = os.environ['PR_MERGED_AT']
  release_summary = f"Release_Details: {release_details} \n\nPull Request Number: {pr_num} \nPull Request Created At: {pr_created} \nPull Request Merged At: {pr_merged}"

  print("Getting IMS Token")
  ims_url = 'https://ims-na1.adobelogin.com/ims/token'
  headers = {"Content-Type":"multipart/form-data"}
  data = {
    'client_id': os.environ['IMSACCESS_CLIENT_ID'],
    'client_secret': os.environ['IMSACCESS_CLIENT_SECRET'],
    'grant_type': "authorization_code",
    'code': os.environ['IMSACCESS_AUTH_CODE']
  }
  response = requests.post(ims_url, data=data)
  jsonParse = json.loads(response.text)

  if response.status_code != 200:
    print("POST failed with response code: ", response.status_code)
    print(response.text)
    sys.exit(1)
  elif find_string_in_json(jsonParse, "error"):
    print("IMS token request failed with response code: ", response.status_code)
    print(response.text)
    sys.exit(1)
  else:
    print("IMS token request was successful")
    token = jsonParse["access_token"]

  print("Create CMR in ServiceNow...")

  servicenow_cmr_url = 'https://ipaasapi.adobe-services.com/change_management/changes'
  headers = {
    "Accept":"application/json",
    "Authorization":token,
    "Content-Type":"application/json",
    "api_key":os.environ['IPAAS_KEY']
  }
  data = {
    "title":release_title,
    "description":release_summary,
    "instanceIds": [ 537445 ],
    "plannedStartDate": start_time,
    "plannedEndDate": end_time,
    "coordinator": "narcis@adobe.com",
    "customerImpact": "No Impact",
    "changeReason": [ "New Features", "Bug Fixes", "Enhancement", "Maintenance", "Security" ],
    "preProductionTestingType": [ "End-to-End", "Functional", "Integrations", "QA", "Regression", "UAT", "Unit Test" ],
    "backoutPlanType": "Roll back",
    "approvedBy": [  "casalino@adobe.com", "jmichnow@adobe.com", "mauchley@adobe.com", "bbalakrishna@adobe.com", "tuscany@adobe.com", "brahmbha@adobe.com" ],
    "testPlan": "Test plan is documented in the PR link in the Milo repository above. See the PR's merge checks to see Unit and Nala testing.",
    "implementationPlan": "The change will be released as part of the continuous deployment of Milo's production branch, i.e., \"main\"",
    "backoutPlan": "Revert merge to the Milo production branch by creating a revert commit.", "testResults": "Changes are tested and validated successfully in staging environment. Please see the link of the PR in the description for the test results and/or the \"#nala-test-results\" slack channel."
  }
  response = requests.post(servicenow_cmr_url, headers=headers, json=data)
  jsonParse = json.loads(response.text)

  if response.status_code != 200:
    print("POST failed with response code: ", response.status_code)
    print(response.text)
    sys.exit(1)
  elif find_string_in_json(jsonParse, "error"):
    print("CMR creation failed with response code: ", response.status_code)
    print(response.text)
    sys.exit(1)
  else:
    print("CMR creation was successful")
    transaction_id = jsonParse["id"]

  print("Waiting for Transaction from Queue to ServiceNow then Retrieve CMR ID...")

  servicenow_get_cmr_url = f'https://ipaasapi.adobe-services.com/change_management/transactions/{transaction_id}'
  headers = {
    "Accept":"application/json",
    "Authorization":token,
    "api_key":os.environ['IPAAS_KEY']
  }

  # Wait 10 seconds to provide time for the transaction to exit the queue and be saved into ServiceNow as a CMR record.
  time.sleep(10)
  response = requests.get(servicenow_get_cmr_url, headers=headers)
  jsonParse = json.loads(response.text)

  if response.status_code != 200:
    print("GET failed with response code: ", response.status_code)
    print(response.text)
    sys.exit(1)
  elif find_string_in_json(jsonParse, "error"):
    print("CMR ID retrieval failed with response code: ", response.status_code)
    print(response.text)
    sys.exit(1)
  else:
    print("CMR ID retrieval was successful")
    cmr_id = jsonParse["result"]["changeId"]

  print("Setting Actual Maintenance Time Windows for CMR...")
  actual_start_time = (datetime.datetime.now() - datetime.timedelta(seconds = 10)).timestamp()
  actual_end_time = datetime.datetime.now().timestamp()

  print("Closing CMR in ServiceNow...")

  headers = {
    "Accept":"application/json",
    "Authorization":token,
    "Content-Type":"application/json",
    "api_key":os.environ['IPAAS_KEY']
  }
  data = {
    "id": transaction_id,
    "actualStartDate": actual_start_time,
    "actualEndDate": actual_end_time,
    "state": "Closed",
    "closeCode": "Successful",
    "notes": "The change request is closed as the change was released successfully"
  }
  response = requests.post(servicenow_cmr_url, headers=headers, json=data)
  jsonParse = json.loads(response.text)

  if response.status_code != 200:
    print("POST failed with response code: ", response.status_code)
    print(response.text)
    sys.exit(1)
  elif find_string_in_json(jsonParse, "error"):
    print("CMR closure failed with response code: ", response.status_code)
    print(response.text)
    sys.exit(1)
  else:
    print("CMR closure was successful")
