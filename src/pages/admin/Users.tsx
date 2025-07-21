import AdminSidebar from '../../components/AdminSidebar';
import { User2, ShieldCheck, Ban, MoreHorizontal } from 'lucide-react';

const users = [
    {
        id: 1,
        name: 'Jane Citizen',
        email: 'jane@example.com',
        role: 'user',
        status: 'active',
    },
    {
        id: 2,
        name: 'Admin John',
        email: 'john@civiclink.com',
        role: 'admin',
        status: 'active',
    },
    {
        id: 3,
        name: 'Mike Trouble',
        email: 'mike@spam.com',
        role: 'user',
        status: 'suspended',
    },
];

const Users = () => {
    return (
        <div className="flex bg-gradient-to-br from-green-50 to-blue-50 min-h-screen">
            <AdminSidebar />

            <main className="ml-64 w-full p-6">
                <h1 className="text-2xl font-bold text-blue-700 mb-6">Users</h1>

                <div className="grid gap-4">
                    {users.map((user) => (
                        <div
                            key={user.id}
                            className="bg-white border border-gray-100 shadow rounded-xl p-4 flex items-center justify-between"
                        >
                            <div className="flex items-center gap-4">
                                <User2 className="w-10 h-10 text-blue-600" />
                                <div>
                                    <h3 className="text-lg font-semibold">{user.name}</h3>
                                    <p className="text-sm text-gray-500">{user.email}</p>
                                    <span
                                        className={`text-xs px-2 py-1 rounded ${
                                            user.status === 'suspended'
                                                ? 'bg-red-100 text-red-700'
                                                : 'bg-green-100 text-green-700'
                                        }`}
                                    >
                    {user.status}
                  </span>
                                </div>
                            </div>

                            <div className="flex gap-3">
                                {user.role === 'user' && (
                                    <button className="inline-flex items-center gap-1 px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition">
                                        <ShieldCheck className="w-4 h-4" />
                                        Promote to Admin
                                    </button>
                                )}

                                {user.status === 'active' ? (
                                    <button className="inline-flex items-center gap-1 px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200 transition">
                                        <Ban className="w-4 h-4" />
                                        Suspend
                                    </button>
                                ) : (
                                    <button className="inline-flex items-center gap-1 px-3 py-1 text-sm bg-green-100 text-green-700 rounded hover:bg-green-200 transition">
                                        <ShieldCheck className="w-4 h-4" />
                                        Restore
                                    </button>
                                )}

                                <button className="inline-flex items-center gap-1 px-3 py-1 text-sm bg-gray-100 text-gray-600 rounded hover:bg-gray-200 transition">
                                    <MoreHorizontal className="w-4 h-4" />
                                    Options
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default Users;
