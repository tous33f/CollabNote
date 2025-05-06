import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // 1. Users
  const users = [];
  for (let i = 1; i <= 5; i++) {
    const user = await prisma.user.upsert({
      where: { email: `user${i}@example.com` },
      update: {},
      create: {
        name: `User ${i}`,
        email: `user${i}@example.com`,
        password: `password${i}`,
      },
    });
    users.push(user);
  }

  // 2. Workspaces
  const workspaces = [];
  for (let i = 1; i <= 5; i++) {
    const workspace = await prisma.workspace.create({
      data: {
        name: `Workspace ${i}`,
        owner_id: users[i % users.length].id,
      },
    });
    workspaces.push(workspace);
  }

  // 3. Workspace Members
  for (const workspace of workspaces) {
    for (const user of users) {
      await prisma.workspace_Members.create({
        data: {
          user_id: user.id,
          workspace_id: workspace.id,
          role: 'member',
        },
      });
    }
  }

  // 4. Projects
  const projects = [];
  for (let i = 0; i < 5; i++) {
    const project = await prisma.project.create({
      data: {
        id: i + 1,
        name: `Project ${i + 1}`,
        description: `Description for project ${i + 1}`,
        workspace_id: workspaces[i % workspaces.length].id,
      },
    });
    projects.push(project);
  }

  // 5. Tasks
  const tasks = [];
  for (let i = 0; i < 5; i++) {
    const task = await prisma.task.create({
      data: {
        id: i + 1,
        title: `Task ${i + 1}`,
        description: `This is task ${i + 1}`,
        status: i % 2 === 0 ? 'Todo' : 'In Progress',
        project_id: projects[i % projects.length].id,
        assignee_id: users[i % users.length].id,
      },
    });
    tasks.push(task);
  }

  // 6. Comments
  for (let i = 0; i < 5; i++) {
    await prisma.comment.create({
      data: {
        id: i + 1,
        comment: `Comment ${i + 1} on Task`,
        task_id: tasks[i % tasks.length].id,
        user_id: users[i % users.length].id,
      },
    });
  }

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
