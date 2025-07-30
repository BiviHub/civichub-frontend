import { useEffect, useState, Fragment } from 'react';
import { getAllUsers } from '../../services/authService';
import type { UserDTO } from '../../types/AuthTypes';
import { Search, Eye } from 'lucide-react';
import { Dialog } from '@headlessui/react';
import { CSVLink } from 'react-csv';

const USERS_PER_PAGE = 5;

const AllUsers = () => {
    const [users, setUsers] = useState<UserDTO[]>([]);
    const [filteredUsers, setFilteredUsers] = useState<UserDTO[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedUser, setSelectedUser] = useState<UserDTO | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await getAllUsers();
                setUsers(response);
                setFilteredUsers(response);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    useEffect(() => {
        const filtered = users.filter((user) =>
            `${user.firstName} ${user.lastName} ${user.email} ${user.phoneNumber} ${user.gender} ${user.role}`
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
        );
        setFilteredUsers(filtered);
        setCurrentPage(1);
    }, [searchTerm, users]);

    const totalPages = Math.ceil(filteredUsers.length / USERS_PER_PAGE);
    const paginatedUsers = filteredUsers.slice(
        (currentPage - 1) * USERS_PER_PAGE,
        currentPage * USERS_PER_PAGE
    );

    const getInitial = (name: string) => name?.charAt(0)?.toUpperCase() || '?';

    return (
        <div className="min-h-screen p-6 bg-gradient-to-br from-green-50 to-blue-50">
            <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-xl p-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">All Users</h2>
                    <CSVLink data={filteredUsers} filename="users.csv" className="text-blue-600 hover:underline">
                        Export CSV
                    </CSVLink>
                </div>

                <div className="relative mb-6">
                    <input
                        type="text"
                        placeholder="Search users..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm pl-10"
                    />
                    <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm text-left">
                        <thead className="bg-gray-100 border-b font-semibold text-gray-700">
                        <tr>
                            <th className="py-2 px-4">Profile</th>
                            <th className="py-2 px-4">Name</th>
                            <th className="py-2 px-4">Email</th>
                            <th className="py-2 px-4">Phone</th>
                            <th className="py-2 px-4">Gender</th>
                            <th className="py-2 px-4">Role</th>
                            <th className="py-2 px-4">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {paginatedUsers.length === 0 ? (
                            <tr>
                                <td colSpan={7} className="text-center py-6 text-gray-500">
                                    No users found.
                                </td>
                            </tr>
                        ) : (
                            paginatedUsers.map((user, index) => (
                                <tr key={index} className="border-b hover:bg-gray-50 transition">
                                    <td className="py-3 px-4">
                                        <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold text-lg">
                                            {getInitial(user.firstName)}
                                        </div>
                                    </td>
                                    <td className="py-3 px-4">
                                        {user.firstName} {user.lastName}
                                    </td>
                                    <td className="py-3 px-4">{user.email}</td>
                                    <td className="py-3 px-4">{user.phoneNumber}</td>
                                    <td className="py-3 px-4">{user.gender}</td>
                                    <td className="py-3 px-4">{user.role}</td>
                                    <td className="py-3 px-4">
                                        <button
                                            onClick={() => {
                                                setSelectedUser(user);
                                                setIsModalOpen(true);
                                            }}
                                            className="text-blue-600 hover:underline flex items-center gap-1"
                                        >
                                            <Eye size={16} /> View
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                        </tbody>
                    </table>
                </div>

                <div className="flex justify-between items-center mt-4">
                    <button
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="px-4 py-2 bg-gray-200 text-sm rounded disabled:opacity-50"
                    >
                        Previous
                    </button>
                    <span className="text-sm">
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 bg-gray-200 text-sm rounded disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            </div>

            {/* ✅ Updated Modal */}
            <Dialog as={Fragment} open={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    {/* Modal background overlay */}
                    <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

                    {/* Modal content */}
                    <Dialog.Panel className="z-50 bg-white rounded-lg p-6 max-w-md w-full shadow-lg">
                        <Dialog.Title className="text-xl font-semibold mb-4">User Details</Dialog.Title>
                        {selectedUser && (
                            <div className="space-y-2">
                                <p><strong>Name:</strong> {selectedUser.firstName} {selectedUser.lastName}</p>
                                <p><strong>Email:</strong> {selectedUser.email}</p>
                                <p><strong>Phone:</strong> {selectedUser.phoneNumber}</p>
                                <p><strong>Gender:</strong> {selectedUser.gender}</p>
                                <p><strong>Role:</strong> {selectedUser.role}</p>
                                <p><strong>Address:</strong> {selectedUser.address}</p>
                            </div>
                        )}
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
                        >
                            Close
                        </button>
                    </Dialog.Panel>
                </div>
            </Dialog>
        </div>
    );
};

export default AllUsers;


