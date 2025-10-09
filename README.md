# DHTMLX Widgets (Kanban, Gantt, Scheduler) Demo for Salesforce LWC

[![dhtmlx.com](https://img.shields.io/badge/made%20by-DHTMLX-blue)](https://dhtmlx.com/)
[![License: GPL v2](https://img.shields.io/badge/license-GPL%20v2-blue.svg)](https://www.gnu.org/licenses/old-licenses/gpl-2.0.html)

This project contains a complete integration of DHTMLX widgets for Lightning Web Components on the Salesforce Platform, including:

- **[DHTMLX Kanban](https://dhtmlx.com/docs/products/dhtmlxKanban/)** for creating interactive Kanban boards for task and project management with drag-and-drop functionality.  
- **[DHTMLX Gantt](https://dhtmlx.com/docs/products/dhtmlxGantt/)** for building powerful Gantt charts to visualize and manage projects with task dependencies.
- **[DHTMLX Scheduler](https://dhtmlx.com/docs/products/dhtmlxScheduler/)** for creating event calendars to organize, display, and manage appointments or tasks in various views.

The sample is implemented with the help of [DHTMLX JavaScript components](https://dhtmlx.com/docs/products/).

---
<p align="center">
🚀 <b>Try the Live Demo Online</b>
</p>
<p align="center">
  You can test the components in a live Salesforce environment without any local setup.
</p>
<p align="center">
  <a href="https://dhtmlx-dev-ed.develop.lightning.force.com/lightning/n/Kanban">
  Click here to open the demo >>> </a>
<p align="center">Login: <code>user</code></p>
<p align="center">Password: <code>demo</code></p>

---

**TODO for Marketing: Please create a GIF and put here that shows a user clicking through the three main tabs: Gantt, Kanban, and Scheduler.**

## Prerequisites

- Read Salesforce docs [Developer Hub](https://developer.salesforce.com/docs/atlas.en-us.sfdx_setup.meta/sfdx_setup/sfdx_setup_enable_devhub.htm) in your organization.
- Apply for Salesforce Dev [trial](https://www.salesforce.com/form/developer-signup/?d=pb).
- Install the [Salesforce CLI](https://developer.salesforce.com/tools/sfdxcli).

**Note:** After installing the CLI, it's recommended to restart your computer. This ensures VS Code and your terminal can find the new `sf` command.

##  Environment Setup

### 1. Create a Salesforce Developer Account 

- [Sign up here](https://www.salesforce.com/form/developer-signup/?d=pb).
 
### 2. Enable Dev Hub

- Go to **Setup** > **Dev Hub** and enable it.

### 3. Configure My Domain

- In **Quick Find**, search for `My Domain`.
- Copy your domain (e.g., `https://orgfarm-699063b98a-dev-ed.develop.my.salesforce.com`).
- Insert this value into the `sfdcLoginUrl` field of your `sfdx-project.json`.

### 4. Authenticate with your Dev Hub

This command securely connects the Salesforce CLI to your main developer account (your Dev Hub).

```sh
sf auth web login -d
```

A browser window will open. Log in to authorize the CLI. The `-d` flag sets this org as your default Dev Hub for creating scratch orgs.

### 5. Create a Scratch Org and Assign Its Alias

Now, we'll create a temporary "scratch" org for the demo. We should give it a nickname (an alias) so we can easily send commands to it.
   
```sh
sf org create scratch -f config/project-scratch-def.json -a dhtmlx
```
    
**Why the alias `dhtmlx`?** The alias you assign here (`-a dhtmlx`) is **required** for the following steps (`deploy` and `open`). The commands in this guide are already written to use the `dhtmlx` alias.

**Recommendation:** Simply copy and paste the command as is. This ensures all subsequent steps will work without changes.

### 6. Deploy Source Code
  
```sh
sf project deploy start -d force-app --target-org dhtmlx
```

### 7. Populate Org with Demo Data

Run the Apex script to create the initial records for the demo.

```sh
sf apex run --file scripts/apex/reset.apex -o dhtmlx
```

### 8. Open Scratch Org

```sh
sf org open -o dhtmlx
```
     
### 9. Launch the Application

- In the top-left corner, click the **App Launcher** (the icon with nine dots).
- In the search bar, type **`DHTMLX`**.
- Click on the **DHTMLX** application to open it.

**Your application should now be running!** If you encounter any issues (like missing tabs), proceed to the verification steps below.

## Verifying Configuration

The deployment script should handle the following settings automatically. These steps are for verification or manual setup if something went wrong.

### 1. Verify Profile Tab Visibility

This process ensures your user has permissions to see the DHTMLX tabs.

- **A. Find your Profile Name:**
  - Go to **Setup** → **Users** → **Users**.
  - Find your user (username will look like `test-....@example.com`).
  - Check the **Profile** column. Most likely, it will be **System Administrator**.

- **B. Edit the Profile:**
  - Go to **Setup** → **Users** → **Profiles**.
  - To quickly find the profile, use the alphabetical navigation at the top of the list and click on **'S'**.
  - Find **System Administrator** and click **Edit**.

- **C. Set Tab Visibility:**
  - On the profile edit page, scroll down to the **Custom Tab Settings** section.
  - Find the `Gantt`, `Kanban`, and `Scheduler` tabs.
  - Ensure their visibility is set to **Default On**. If not, change it and click **Save**.

### 2. Verify Trusted URLs for Demo Images
This step is required only if you plan to add data with images to the components. For security reasons, Salesforce requires you to approve external image sources.

- The image host for this demo is `https://snippet.dhtmlx.com`.
- To add it, go to **Setup** → **Security** → **Trusted URLs**.
- Click **New URL**, enter `https://snippet.dhtmlx.com` in the URL field, and save.

## Additional Setup for Kanban Attachments

To enable file uploads and attachments in the Kanban component, you need to create a Content Library:

### Create Content Library

1. **Go to Files  → Libraries → New Library**.  
    Note: This option is not in the general settings. The navigation path should resemble:  
    `https://<your-domain>.lightning.force.com/lightning/o/ContentDocument/home`
2. **Create New Library:**
   - Name: `KanbanFiles` (recommended)
   - Description: "File storage for Kanban card attachments"
3. **Set Library Permissions (if needed):**
   - Add all Kanban users as library members
   - Grant "Library Administrator" or "Author" permissions
   - Enable "Upload Content" permission

### Update KanbanData.cls (if needed)

If you used a different library name than "KanbanFiles":

1. Open `force-app/main/default/classes/KanbanData.cls`
2. Find line 3: `private static final String LIB_NAME = 'KanbanFiles';`
3. Replace `'KanbanFiles'` with your actual library name
4. Redeploy the class to your org

**Note:** This step is only required if you named your library differently than "KanbanFiles".

## Additional Setup for Kanban Users

By default, the demo uses hardcoded user IDs that may not exist in your organization. To display all active users from your org:

### Enable All Organization Users

1. **Open KanbanData.cls**
   - Navigate to `force-app/main/default/classes/KanbanData.cls`
   - Find the `getUsers()` method around lines 109-116

2. **Uncomment User Query Code**
   - Comment out the demo-specific user filtering
   - Uncomment the lines that retrieve all active users from your organization:
   ```apex
   List<User> us = [
       SELECT Id, Name, SmallPhotoUrl
       FROM   User
       WHERE  IsActive = true
       ORDER  BY Name
   ];
   ```

3. **Redeploy Changes**
   ```sh
   sf project deploy start -d force-app/main/default/classes/KanbanData.cls
   ```

**Note:** In large organizations, this may return many users and impact performance. Consider adding additional WHERE conditions to filter users as needed.

## Components Overview

### Kanban  

Task management board with columns and drag-and-drop functionality. Uses multiple custom objects (KanbanCard__c, KanbanColumn__c, etc.).

**Features:**
- Drag-and-drop task management
- Customizable columns and swimlanes  
- Task assignments and comments
- File attachments support
- Voting and priority management

### Gantt
Project management with task dependencies and timeline visualization. Works with GanttTask__c and GanttLink__c objects.

**Features:**
- Timeline visualization
- Task hierarchy and dependencies
- Progress tracking
- Rich drag-and-drop behavior to manage tasks and dependencies

### Scheduler
Event calendar with multiple view modes (day, week, month). Manages SchedulerEvent__c custom objects.

**Features:**
- Multiple calendar views
- Event creation, editing, deletion
- Integration with Salesforce data

## How to configure / modify

### Backend Classes

Each component has its own Apex data controller:

- **KanbanData.cls** - Handles all Kanban-related objects  
- **GanttData.cls** - Controls GanttTask__c and GanttLink__c data
- **SchedulerData.cls** - Manages SchedulerEvent__c data

Modify the SOQL queries in these classes to adjust data retrieval as needed.

### Frontend Components

Lightning Web Components are located in `force-app/main/default/lwc/`:

- **kanban/** - Kanban board component
- **gantt/** - Gantt component
- **scheduler/** - Scheduler component implementation

Each component contains:
- `*.js` - Main component logic and DHTMLX integration
- `*.html` - Component template
- `*.css` - Component styling
- `*.xml` - Component metadata


### DHTMLX Library Versions

The project uses trial versions of DHTMLX components in `force-app/main/default/staticresources/`. For production usage, replace these with licensed versions from your DHTMLX package.

[Choose a proper license >](https://dhtmlx.com/docs/products/licenses.shtml)

**Minimum compatible versions:**
- DHTMLX Kanban v1.7+  
- DHTMLX Gantt v9.0+
- DHTMLX Scheduler v7.2+

## Custom Objects

The project includes several custom objects:

**Kanban:**  
- KanbanCard__c - Task cards
- KanbanColumn__c - Board columns
- KanbanRow__c - Swimlanes
- KanbanComment__c - Task comments
- KanbanAttachment__c - File attachments
- KanbanVote__c - Task voting
- KanbanLink__c - Card relationships
- KanbanCardUser__c - User assignments

**Gantt:**
- GanttTask__c - Project tasks  
- GanttLink__c - Task dependencies

**Scheduler:**
- SchedulerEvent__c - Calendar events

## Profiles and Permissions

The project includes a pre-configured profile:
- **Client Demo Profile** - Complete access to all DHTMLX components and objects

## Related Resources

**Documentation:**
- [DHTMLX Kanban](https://docs.dhtmlx.com/kanban/) 
- [DHTMLX Gantt](https://docs.dhtmlx.com/gantt/)
- [DHTMLX Scheduler](https://docs.dhtmlx.com/scheduler/)

**Tutorials**
- [DHTMLX Gantt with Resource Management for Salesforce](https://dhtmlx.com/blog/announcing-new-dhtmlx-demo-gantt-resource-management-salesforce/)
- [How to Create a Basic Gantt Chart with Salesforce Lightning](https://dhtmlx.com/blog/create-gantt-chart-salesforce-lightning/)

**Salesforce Integrations**
- [DHTMLX Scheduler in Salesforce](https://dhtmlx.com/docs/products/demoApps/salesforce-scheduler/)
- [DHTMLX Gantt in Salesforce](https://dhtmlx.com/docs/products/demoApps/salesforce-gantt-chart/)

## Troubleshooting

### 1. `sf` or `sfdx` command is not recognized
**Problem:** The terminal returns an error like "command not found".
**Solution:** This happens when your terminal session started before the CLI was fully installed into the system's PATH. Restart VS Code, your terminal, or **your entire computer** to fix this.

### 2. Components are empty (no demo data)
**Problem:** The Gantt, Kanban, or Scheduler components load but show no tasks or events.
**Solution:** This is expected. The demo project deploys functional components but does not include a script to populate them with data. You can start creating your own tasks and events to test the functionality.

### 3. Kanban, Scheduler, or Gantt components are not visible
**Problem:** Components don't appear in Salesforce interface.
**Solution:** 
- Go to Profile settings in Salesforce Setup.
- Ensure that Custom Tabs for Gantt, Kanban, and Scheduler are set to "Default On" as described in the setup guide.

### 4. Images cannot be uploaded in Kanban
**Problem:** File upload functionality in Kanban doesn't work.
**Solution:**
- Ensure Content Library is created and properly configured.
- Check that the library name in `KanbanData.cls` (constant `LIB_NAME`) matches your actual library name.
- Verify that users have proper permissions to upload content to the library.

### 5. No users appear in Kanban user assignments
**Problem:** The Kanban card user dropdown is empty or only shows a few users.
**Solution:**
- The demo uses hardcoded user IDs that may not exist in your Salesforce org.
- Open `KanbanData.cls` and locate the `getUsers()` method (around lines 109-116).
- Disable the demo user filtering by commenting out the code that restricts users to specific IDs.
- Instead, uncomment the code that retrieves all active users:
    ```apex
    List<User> us = [
        SELECT Id, Name, SmallPhotoUrl
        FROM   User
        WHERE  IsActive = true
        ORDER  BY Name
    ];
    ```
- This will display all active users in your organization in the Kanban user assignment dropdown.
- **Warning:** In large organizations, this may list many users.

## Join our online community

- Star our GitHub repo :star:
- Read us on [Medium](https://dhtmlx.medium.com) :newspaper:
- Follow us on [X](https://x.com/dhtmlx) :bird:
- Check our news and updates on [Facebook](https://www.facebook.com/dhtmlx/) :feet:
