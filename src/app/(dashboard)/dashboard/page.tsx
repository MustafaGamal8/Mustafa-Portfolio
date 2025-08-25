import { redirect } from 'next/navigation';

export default function DashboardPage() {
  // TODO: Add authentication check
  // if (!isAuthenticated) {
  //   redirect('/login');
  // }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-card p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">Total Projects</h3>
            <p className="text-3xl font-bold text-primary">6</p>
          </div>

          <div className="bg-card p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">Contact Messages</h3>
            <p className="text-3xl font-bold text-primary">12</p>
          </div>

          <div className="bg-card p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">Skills</h3>
            <p className="text-3xl font-bold text-primary">15</p>
          </div>

          <div className="bg-card p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">Achievements</h3>
            <p className="text-3xl font-bold text-primary">8</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-card p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Recent Projects</h2>
            <p className="text-muted-foreground">Project management interface will be implemented here.</p>
          </div>

          <div className="bg-card p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Recent Messages</h2>
            <p className="text-muted-foreground">Contact messages interface will be implemented here.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
