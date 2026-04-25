import { prisma } from '../src/lib/backend/prisma';

const timeoutMs = Number(process.env.DB_HEALTH_TIMEOUT_MS ?? 10000);

function withTimeout<T>(promise: Promise<T>, label: string): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const timeoutId = setTimeout(() => {
      reject(new Error(`${label} timed out after ${timeoutMs}ms`));
    }, timeoutMs);

    promise
      .then((value) => {
        clearTimeout(timeoutId);
        resolve(value);
      })
      .catch((error: unknown) => {
        clearTimeout(timeoutId);
        reject(error);
      });
  });
}

async function checkDatabaseHealth() {
  const startedAt = Date.now();

  try {
    await withTimeout(prisma.$connect(), 'Database connection');

    const pingStartedAt = Date.now();
    await withTimeout(prisma.$runCommandRaw({ ping: 1 }), 'Database ping');
    const pingMs = Date.now() - pingStartedAt;

    const [users, projects, files] = await withTimeout(Promise.all([
      prisma.user.count(),
      prisma.project.count(),
      prisma.file.count(),
    ]), 'Database count queries');

    const totalMs = Date.now() - startedAt;

    console.log('DB health check: OK');
    console.log(`Ping: ${pingMs}ms`);
    console.log(`Users: ${users}`);
    console.log(`Projects: ${projects}`);
    console.log(`Files: ${files}`);
    console.log(`Total time: ${totalMs}ms`);

    process.exitCode = 0;
  } catch (error) {
    console.error('DB health check: FAILED');
    console.error(error);
    process.exitCode = 1;
  } finally {
    await prisma.$disconnect();
  }
}

void checkDatabaseHealth();
