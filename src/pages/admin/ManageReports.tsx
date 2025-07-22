import AdminSidebar from '../../components/AdminSidebar';


const ManageReports = () => {
    return (
        <div className="flex bg-gradient-to-br from-green-50 to-blue-50 min-h-screen">
            <AdminSidebar />

            <main className="ml-64 w-full p-6">
                <h1 className="text-2xl font-bold text-blue-700 mb-6">Manage Reports</h1>

                <div className="text-gray-600 text-center">
                    No reports available.
                </div>
            </main>
        </div>
    );
};

export default ManageReports;


