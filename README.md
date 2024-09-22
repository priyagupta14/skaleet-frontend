# Introduction

We're thrilled to have you at this stage of our selection process! This test is designed to assess your skills and approach to problem-solving in a practical scenario. Please carefully follow the instructions below and ensure you read through the entire document. Good luck!

# Set up the Project

A significant challenge when working with React Native is setting up a complete environment before being able to run the project. We have intentionally omitted these instructions to assess your ability to independently set up said environment.

# Technical Test

You will be working on an application that facilitates transactions to beneficiaries. To successfully complete the test, you will need to implement the following features:
 - Introduce a new page to create a beneficiary, including fields for their first name, last name, and IBAN. Additionally, incorporate an IBAN validator to ensure the IBAN's validity.
 - Enable the selection of a beneficiary from a list when making a transaction.
 - Preserve the state of the application so that upon reopening, the list of beneficiaries, transaction history, and balance are retained.

Note: you have free rein in how you want to implement this test, give it you best shot!

# Result

Please share with us your Git repository where you have stored your implemented solution. Document all the commands needed to install and launch this project, excluding the installation of any external SDKs/platforms, our focus will remain strictly on this project.

We hope that you will enjoy taking this test, best of luck!

# Steps to Run the Project

1. Install dependencies 
2. Run Metro using, ```npm run start```
3. Run the application of either of the platform using ```npm run android``` or ```npm run ios```


# User Flow
1. Upon opening the application, the user will be presented with two buttons: "Add Beneficiary" and "Add Transaction".
2. To proceed, the user must add a beneficiary. At least one beneficiary is required before any transactions can be made.
3. To initiate a transaction, the user selects a beneficiary from a dropdown menu. The name and IBAN fields will be auto-populated as read-only values. The user then enters the amount and submits the transaction.
4. Once the transaction is completed, the user will be redirected to the home screen, where the transaction will be listed.
