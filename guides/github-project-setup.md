# GitHub Project Setup Guide

Below is a sample **Markdown** file that you can include in your project. It walks through **step-by-step** instructions to:

1. **Set Up a New GitHub Repo**  
2. **Create & Configure a GitHub Project** (Kanban board)  
3. **Set Up a CI/CD Pipeline** (via GitHub Actions)  
4. **Establish a Task Management System** (with GitHub Projects or a local folder, and how to sync with VS Code)

It also includes recommendations on **when** in your development process to implement each feature. You can adjust any of these steps to fit your exact workflow.

---

## **Project Setup Guide**

This document provides step-by-step instructions on how to initialize and manage your project in GitHub, integrate CI/CD pipelines, and establish a consistent task management workflow.

---

## **1. Create Your GitHub Repository**

> **When to do this:** *At the very beginning*, as soon as you decide to start your project.

1. Sign in to your GitHub account (or [create one](https://github.com/)).
2. Click the **New** button (usually top-left under your repositories list).
3. Name your repository (e.g., `my-mvp-app`) and add a brief description.
4. Select whether you want the repo to be **Public** or **Private**.
5. (Optional) Add a `.gitignore` appropriate for your tech stack (e.g., Node, Python, etc.).
6. (Optional) Add a license if you plan to open-source.
7. Click **Create Repository**.

**After creation**, clone it locally:

```bash
git clone https://github.com/YOUR-USERNAME/my-mvp-app.git
cd my-mvp-app
```

---

## **2. Initialize Basic Project Structure**

> **When to do this:** *Immediately after creating the repo*, before you begin coding in earnest.

1. Create a basic folder structure for your app:

    ```bash
    ├── src/
    ├── docs/
    ├── tests/
    ├── .github/
    │   └── workflows/
    └── README.md
    ```

2. Inside `README.md`, add:
    - A short project overview
    - Basic setup steps (install instructions)
    - How to contribute or run tests

3. Commit and push these initial files:

    ```bash
    git add .
    git commit -m "Initialize project structure"
    git push origin main
    ```

---

## **3. Set Up GitHub Project (Kanban or Scrum Board)**

> **When to do this:** *Right after your initial structure is pushed to GitHub*, so you can immediately track tasks and progress.

### **3.1. Create a GitHub Project**

1. In your repo, click the **Projects** tab, or go to **github.com/YOUR-USERNAME/my-mvp-app/projects**.
2. Select **New Project** → **Board** (Kanban) or **Table**, whichever you prefer.
3. Name the project (e.g., `MVP Kanban Board`).

### **3.2. Customize Your Columns**

- **To Do**  
- **In Progress**  
- **Review/QA** *(Optional)*  
- **Done**  

> You can rename or add more columns to fit your workflow.

### **3.3. Integrate with VS Code**

1. Install the **GitHub Pull Requests and Issues** extension in VS Code.
2. Sign in with your GitHub account via VS Code settings.
3. Open your repo folder in VS Code to see Issues and Project Boards in the sidebar.

### **3.4. Linking Tasks**

- Create **Issues** for each task or feature (e.g., “Build Login Page”).
- Convert those Issues into **project tasks** by dragging them into your GitHub Project board.
- From VS Code, you can open the **Issues** panel, create new issues, and attach them to your GitHub Project.

> **Tip:** If you want to track tasks strictly in your local environment, you *could* create a `task-board` folder and store markdown files for each “To Do,” “In Progress,” etc. However, GitHub Projects integrates directly with your repo and CI/CD, making it easier to track commits and pull requests.

---

## **4. Set Up CI/CD with GitHub Actions**

> **When to do this:** *Once you have a basic working structure and at least one test to automate*, so that each commit can be tested early on.

### **4.1. Create a GitHub Actions Workflow**

1. In your repo, create a file at:

   ```bash
   .github/workflows/ci.yml
   ```

2. Add a basic sample workflow (Node.js example below — adjust for your tech stack):

   ```yaml
   name: CI

   on:
     push:
       branches: [ "main" ]
     pull_request:
       branches: [ "main" ]

   jobs:
     build-and-test:
       runs-on: ubuntu-latest
       
       steps:
         - name: Check out repository
           uses: actions/checkout@v3

         - name: Set up Node
           uses: actions/setup-node@v3
           with:
             node-version: '16'

         - name: Install dependencies
           run: npm install

         - name: Run tests
           run: npm test
   ```

3. Commit and push the workflow file:

   ```bash
   git add .github/workflows/ci.yml
   git commit -m "Add CI workflow"
   git push origin main
   ```

4. Go to the **Actions** tab in your GitHub repo to see if the workflow is triggered.

> **Tip:** If you have multiple environments or more complex builds, create additional workflow files (e.g., `build.yml`, `deploy.yml`).  

### **4.2. Optional: Setup Deployment Stages**

- If you deploy to services like **AWS**, **Heroku**, **Vercel**, or **Netlify**, add steps in your CI workflow to deploy automatically when tests pass.
- For a staging environment, use a separate branch (e.g., `staging`) and a matching GitHub Actions workflow.

---

## **5. Recommended Development Flow**

Below is a suggested timeline of *when* to implement each piece:

1. **Repo Creation**  
   *Start of the project.*  

2. **Basic Structure & README**  
   *Immediately after repo creation.*  

3. **Create GitHub Project (Kanban Board)**  
   - *Right after you initialize your project structure.*  
   - Begin adding tasks so you have a clear plan for your next steps.

4. **Local Development & Branching Strategy**  
   - Create and switch to a feature branch whenever you start a new feature:

     ```bash
     git checkout -b feature/login-page
     ```

   - Once finished, submit a Pull Request (PR) to merge into `main`.

5. **Setup CI Workflow**  
   - *As soon as you have at least one test to run.*  
   - This ensures you catch code issues early and can see your pipeline’s success/failure in GitHub.

6. **Add Additional CI/CD Workflows** (Deployment, Linting, Code Coverage)  
   - *After you confirm your basic CI is stable.*  
   - Introduce environment variables, secrets, and more advanced steps as your app matures.

7. **Maintain Documentation & Task Board**  
   - Throughout the entire development process, *update tasks*, **link pull requests** to issues, and keep your README/Wiki up to date.

> **Pro Tip:** If you’re using various AI assistants (Cursor AI in VS Code, ChatGPT, etc.), ensure they have access to your GitHub Project tasks by:
>
> - Updating tasks in GitHub Issues or the GitHub Project board, or
> - Storing a local `tasks` folder (if needed) that your AI tools can read from.  
> However, *prefer* GitHub Projects if you want direct linking between commits, PRs, and tasks.

---

## **6. Folder for Local Task Tracking (Optional)**

If you decide **not** to use GitHub Projects:

1. Create a folder (e.g., `project-tasks`) in your repo.
2. Add markdown files for each task status:  

   ```bash
   project-tasks/
   ├── todo.md
   ├── in-progress.md
   ├── review.md
   └── done.md
   ```

3. Let AI assistants read/write to these markdown files for updates.  
   **However**, you’ll lose out on the automatic linking between GitHub commits, Issues, and CI/CD statuses.

---

## **Conclusion**

By following these steps, you’ll have:

- **Version Control** handled in GitHub  
- **Continuous Integration** via GitHub Actions  
- **Project Management** using a GitHub Project board (or local markdown tasks)  
- A clear roadmap for **when** to set up each component in your development lifecycle  

Feel free to adapt these instructions as your MVP evolves. The key is to keep everything **organized**, **tracked**, and **integrated** for smoother collaboration—both with human developers and AI assistants.
