
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CitizenDashboard from "./pages/CitizenDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import WorkerDashboard from "./pages/WorkerDashboard";
import ReportIssuePage from "./pages/ReportIssuePage";

const queryClient = new QueryClient();

const App = () => (
    <QueryClientProvider client={queryClient}>

            <BrowserRouter>
                <div className="min-h-screen bg-gray-50 flex flex-col">

                    <main className="flex-1">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/citizen-dashboard" element={<CitizenDashboard />} />
                            <Route path="/admin-dashboard" element={<AdminDashboard />} />
                            <Route path="/worker-dashboard" element={<WorkerDashboard />} />
                            <Route path="/report" element={<ReportIssuePage />} />
                        </Routes>
                    </main>


                </div>
            </BrowserRouter>

    </QueryClientProvider>
);

export default App;

