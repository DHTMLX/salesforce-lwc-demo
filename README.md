# DHTMLX Widgets Demo for Salesforce LWC

[![dhtmlx.com](https://img.shields.io/badge/made%20by-DHTMLX-blue)](https://dhtmlx.com/)
[![License: GPL v2](https://img.shields.io/badge/license-GPL%20v2-blue.svg)](https://www.gnu.org/licenses/old-licenses/gpl-2.0.html)

This project contains a complete integration of DHTMLX Widgets for Lightning Web Components on Salesforce Platform, including:

- **📅 Scheduler** - Event calendar and timeline management
- **📊 Kanban** - Task board with drag-and-drop functionality  
- **📈 Gantt** - Project management with task dependencies

The sample is implemented with the help of JavaScript libraries from [DHTMLX](https://dhtmlx.com/docs/products/).

## Prerequisites

- Read Salesforce docs [Developer Hub](https://developer.salesforce.com/docs/atlas.en-us.sfdx_setup.meta/sfdx_setup/sfdx_setup_enable_devhub.htm) in your organization
- Apply for Salesforce Dev [trial](https://www.salesforce.com/form/developer-signup/?d=pb)
- Install the [Salesforce CLI](https://developer.salesforce.com/tools/sfdxcli)

##  Environment Setup

1. **Create a Salesforce Developer Account**  
    [Sign up here](https://www.salesforce.com/form/developer-signup/?d=pb)

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
    sfdx org create scratch -f config/project-scratch-def.json --target-org dhtmlx
    ```

6. **Deploy Source Code**  
    ```sh
    sfdx force:source:deploy -p force-app --target-org dhtmlx
    ```

7. **Set Trusted URLs**  
    - If your code uses images, add their URLs to **Trusted URLs** in Salesforce settings.
    - For demo images and attachments, this project uses [https://snippet.dhtmlx.com](https://snippet.dhtmlx.com) as an external image host.  
      Make sure to add `https://snippet.dhtmlx.com` to the list of Trusted URLs in your Salesforce org.

8. **Configure Profile Tab Visibility**
    - Go to **Setup** → **Users** → **Profiles**
    - Find and edit your user profile (e.g., "System Administrator")
    - In **Custom App Settings** section, locate the DHTMLX components
    - Set **Tab Settings** for Gantt, Kanban, and Scheduler tabs to **Default On** or **Visible**
    - Save the profile changes

## Additional Setup for Kanban Attachments

To enable file uploads and attachments in the Kanban component, you need to create a Content Library:

### Create Content Library

1. **Go to Files  → Libraries → New Library**.  
    Note: This option  not in the general settings. The navigation path should resemble:  
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
   sfdx force:source:deploy -p force-app/main/default/classes/KanbanData.cls
   ```

**Note:** In large organizations, this may return many users and impact performance. Consider adding additional WHERE conditions to filter users as needed.

## Components Overview

### 📅 Scheduler
Event calendar with multiple view modes (day, week, month). Manages SchedulerEvent__c custom objects.

**Features:**
- Multiple calendar views
- Event creation, editing, deletion
- Integration with Salesforce data

### 📊 Kanban  
Task management board with columns and drag-and-drop functionality. Uses multiple custom objects (KanbanCard__c, KanbanColumn__c, etc.).

**Features:**
- Drag-and-drop task management
- Customizable columns and swimlanes  
- Task assignments and comments
- File attachments support
- Voting and priority management

### 📈 Gantt
Project management with task dependencies and timeline visualization. Works with GanttTask__c and GanttLink__c objects.

**Features:**
- Task hierarchy and dependencies
- Timeline visualization
- Progress tracking

## How to configure / modify

### Backend Classes

Each component has its own Apex data controller:

- **SchedulerData.cls** - Manages SchedulerEvent__c data
- **KanbanData.cls** - Handles all Kanban-related objects  
- **GanttData.cls** - Controls GanttTask__c and GanttLink__c data

Modify the SOQL queries in these classes to adjust data retrieval as needed.

### Frontend Components

Lightning Web Components are located in `force-app/main/default/lwc/`:

- **scheduler/** - Scheduler component implementation
- **kanban/** - Kanban board component
- **gantt/** - Gantt component

Each component contains:
- `*.js` - Main component logic and DHTMLX integration
- `*.html` - Component template
- `*.css` - Component styling
- `*.xml` - Component metadata


### DHTMLX Library Versions

The project uses trial versions of DHTMLX components in `force-app/main/default/staticresources/`. For production usage, replace these with licensed versions from your DHTMLX package.

**Minimum compatible versions:**
- DHTMLX Scheduler v7.2+
- DHTMLX Kanban v1.7+  
- DHTMLX Gantt v9.0+

## Custom Objects

The project includes several custom objects:

**Scheduler:**
- SchedulerEvent__c - Calendar events

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

## Profiles and Permissions

The project includes a pre-configured profile:
- **Client Demo Profile** - Complete access to all DHTMLX components and objects

## Related Resources

**Documentation:**
- [DHTMLX Scheduler](https://docs.dhtmlx.com/scheduler/)
- [DHTMLX Kanban](https://docs.dhtmlx.com/kanban/) 
- [DHTMLX Gantt](https://docs.dhtmlx.com/gantt/)

**Product Pages:**
- [DHTMLX Scheduler](https://dhtmlx.com/docs/products/dhtmlxScheduler/)
- [DHTMLX Kanban](https://dhtmlx.com/docs/products/dhtmlxKanban/)
- [DHTMLX Gantt](https://dhtmlx.com/docs/products/dhtmlxGantt/)

**Salesforce Integration:**
- [DHTMLX Scheduler in Salesforce](https://dhtmlx.com/docs/products/demoApps/salesforce-scheduler/)
- [DHTMLX Gantt in Salesforce](https://dhtmlx.com/docs/products/demoApps/salesforce-gantt-chart/)

## Support Us

Star our GitHub repo ⭐

Read us on [Medium](https://medium.com/@dhtmlx) 📰

Follow us on [Twitter](https://twitter.com/dhtmlx) 🐦

Like our page on [Facebook](https://www.facebook.com/dhtmlx/) 👍

## TROUBLESHOOTING

### 1. Kanban, Scheduler, or Gantt components are not visible
**Problem:** Components don't appear in Salesforce interface.
**Solution:** 
- Go to Profile settings in Salesforce Setup
- Ensure that Custom Tabs for Gantt, Kanban, and Scheduler are set to "Visible"

### 2. Images cannot be uploaded in Kanban
**Problem:** File upload functionality in Kanban doesn't work.
**Solution:**
- Ensure Content Library is created and properly configured
- Check that the library name in `KanbanData.cls` (constant `LIB_NAME`) matches your actual library name
- Verify that users have proper permissions to upload content to the library

### 4. No users appear in Kanban user assignments
**Problem:** The Kanban card user dropdown is empty or only shows a few users.
**Solution:**
- The demo uses hardcoded user IDs that may not exist in your Salesforce org.
- Open `KanbanData.cls` and locate the `getUsers()` method (around lines 109–116).
- Disable the demo user filtering by commenting out the code that restricts users to specific IDs:

    Comment out:
    ```apex
    // Set<Id> allowed = new Set<Id>{
    //     '005gL000004asAsQAI', // 'Steve Smith'
    //     '005gL000004ayJVQAY', // 'Angela Allen'
    //     '005gL000004ayjJQAQ', // 'Aron Long'
    //     '005gL000004ayplQAA', // 'Angela Long'
    //     '005gL000004qjErQAI' // DHTMLX USER
    // };

    // List<User> us = [
    //     SELECT Id, Name, SmallPhotoUrl
    //     FROM   User
    //     WHERE  Id IN :allowed
    //     AND    IsActive = true
    //     ORDER  BY Name
    // ];
    ```

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
