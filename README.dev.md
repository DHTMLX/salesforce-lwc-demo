# Salesforce Scheduler Development Setup Guide

Welcome! Follow these steps to set up your Salesforce development environment and configure your app for users.

---

## 1. Environment Setup

1. **Create a Salesforce Developer Account**  
    [Sign up here](https://developer.salesforce.com/tools/vscode/en/user-guide/development-models)

2. **Enable Dev Hub**  
    - Go to **Setup** > **Dev Hub** and enable it.

3. **Configure My Domain**  
    - In **Quick Find**, search for `My Domain`.
    - Copy your domain (e.g., `orgfarm-699063b98a-dev-ed.develop.my.salesforce.com`).
    - Paste it into your `sfdx-project.json`.

4. **Authenticate with Salesforce CLI**  
    ```sh
    sfdx auth:web:login -d -a dhtmlx
    ```
    - Use any alias (e.g., `dhtmlx`).
    - You can find your username in Salesforce under **Users**.

5. **Create a Scratch Org**  
    ```sh
    sfdx org create scratch -f config/project-scratch-def.json
    ```

6. **Deploy Source Code**  
    ```sh
    sfdx force:source:deploy -p force-app
    ```

7. **Set Trusted URLs**  
    - If your code uses images, add their URLs to **Trusted URLs** in Salesforce settings.

---

## 2. User Setup

1. **Add a New User**  
    - Go to **Users** and click **Add User**.

2. **Assign License and Profile**  
    - Select the **Salesforce** license.
    - Choose the **Standard User** profile.

3. **Edit User Profile Tabs**  
    - Open **Profiles** > **Standard User** > **Edit**.
    - Find your tab and set it to **Default On**.

---

## 3. Lightning App Setup

1. **Create a New Lightning App**  
    - Go to **Apps** > **App Manager**.
    - Click **New Lightning App**.

2. **Configure Navigation Items**  
    - In the **Navigation Items** tab:
      - Remove unnecessary items from the left list (both Standard and Custom).
      - Add only the tabs you want users to see.
      - Arrange the order as desired for the navigation bar.
    - Save the app.

3. **Assign App to Users**  
    - In **App Manager**, find your app and click **Manage Profiles** from the right menu.
    - Select the profiles of users who should have access.
    - Save your changes.