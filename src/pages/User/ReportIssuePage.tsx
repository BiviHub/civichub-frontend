import { useEffect, useState } from "react";
import { X, Send } from "lucide-react";
import { createReport } from "../../services/authService";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Swal from "sweetalert2"; // Standard SweetAlert2 import

interface LocationShape {
    latitude: number | null;
    longitude: number | null;
    placeName: string | null;
}

export default function ReportIssuePage() {
    const [reportLocation, setReportLocation] = useState<LocationShape>({ latitude: null, longitude: null, placeName: null });
    const [locationError, setLocationError] = useState<string | null>(null);
    const [description, setDescription] = useState("");
    const [images, setImages] = useState<File[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setReportLocation({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        placeName: null,
                    });
                    setLocationError(null);
                },
                () => {
                    setLocationError(null);
                },
                { timeout: 6000 }
            );
        }
    }, []);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const newImages = Array.from(e.target.files).filter((file) => file.type.startsWith("image/"));
            setImages((prev) => [...prev, ...newImages].slice(0, 5));
        }
    };

    const handleDeleteImage = (index: number) => {
        setImages((prev) => prev.filter((_, i) => i !== index));
    };

    const reverseGeocode = async (lat: number, lon: number): Promise<string | null> => {
        try {
            const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${encodeURIComponent(lat)}&lon=${encodeURIComponent(lon)}`;
            const res = await fetch(url, { headers: { "Accept-Language": "en" } });
            if (!res.ok) return null;
            const data = await res.json();
            return data?.display_name ?? null;
        } catch (err) {
            console.warn("Reverse geocode failed:", err);
            return null;
        }
    };

    const handleUseCurrentLocation = () => {
        if (!("geolocation" in navigator)) {
            setLocationError("Geolocation not available in this browser.");
            return;
        }
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setReportLocation({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    placeName: null,
                });
                setLocationError(null);
            },
            () => setLocationError("Failed to get location. Please enable location services.")
        );
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        setSubmitError(null);

        try {
            let readableLocation: string | null = reportLocation.placeName ?? null;
            if (!readableLocation && reportLocation.latitude && reportLocation.longitude) {
                readableLocation = await reverseGeocode(reportLocation.latitude, reportLocation.longitude);
                setReportLocation((prev) => ({ ...prev, placeName: readableLocation }));
            }

            const locationToSend =
                readableLocation ??
                (reportLocation.latitude && reportLocation.longitude
                    ? `${reportLocation.latitude},${reportLocation.longitude}`
                    : "Unknown location");

            const citizenId = localStorage.getItem("userId") || "defaultCitizenId";

            if (citizenId === "defaultCitizenId") {
                setSubmitError("Please log in again to submit a report.");
                console.error("Invalid CitizenId: defaultCitizenId used");
                setIsSubmitting(false);
                return;
            }

            const dto = {
                Location: locationToSend,
                Description: description,
                CitizenId: citizenId,
                Photos: images,
            };

            console.log("DTO:", dto);
            console.log("Token:", localStorage.getItem("token"));
            console.log("UserId:", citizenId);

            await createReport(dto);

            // Show SweetAlert2 success message
            await Swal.fire({
                icon: "success",
                title: "Report Submitted",
                text: "Your issue has been successfully reported!",
                confirmButtonColor: "#2563eb",
                timer: 3000,
                customClass: {
                    popup: "dark:bg-gray-800 dark:text-white",
                    title: "dark:text-white",
                    confirmButton: "dark:bg-blue-600 dark:hover:bg-blue-700",
                },
            });

            navigate("/user/news");
        } catch (err: any) {
            console.error("Error details:", {
                status: err.response?.status,
                data: err.response?.data,
                config: err.config,
            });
            setSubmitError(err.response?.data?.message || err.message || "Failed to submit report.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-green-50 dark:from-gray-900 dark:to-gray-800 p-4">
            <motion.div
                className="bg-white dark:bg-gray-900 shadow-xl rounded-xl p-6 w-full max-w-lg"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-gray-800 dark:text-white">Report an Issue</h2>
                    <button onClick={() => navigate(-1)} className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Describe the Issue</label>
                        <textarea
                            rows={3}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Briefly describe the issue..."
                            className="w-full mt-1 px-3 py-2 rounded-md border border-gray-300 bg-gray-50 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-white/20 dark:bg-white/5 dark:text-white dark:placeholder-white/50 dark:focus:ring-white/40 transition"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Upload Images (Up to 5)</label>
                        <div className="border-2 border-dashed border-gray-300 dark:border-white/20 rounded-md p-3 bg-gray-50 dark:bg-white/5">
                            <input
                                type="file"
                                multiple
                                accept="image/*"
                                onChange={handleImageChange}
                                className="w-full text-sm text-gray-500 dark:text-gray-400 file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-600 dark:file:bg-blue-600 dark:hover:file:bg-blue-700"
                            />
                            {images.length > 0 && (
                                <div className="mt-3 grid grid-cols-2 gap-2">
                                    {images.map((image, idx) => (
                                        <div key={idx} className="relative">
                                            <img src={URL.createObjectURL(image)} alt={`Preview ${idx}`} className="w-full h-20 object-cover rounded-md" />
                                            <button
                                                onClick={() => handleDeleteImage(idx)}
                                                className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700"
                                                type="button"
                                            >
                                                <X size={12} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Location</label>
                        {locationError ? (
                            <p className="text-red-500 dark:text-red-400 text-sm mb-2">{locationError}</p>
                        ) : reportLocation.placeName ? (
                            <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded-md text-gray-800 dark:text-gray-200">
                                <p className="text-sm font-medium">📍 {reportLocation.placeName}</p>
                                <button onClick={() => setReportLocation({ latitude: null, longitude: null, placeName: null })} className="mt-1 text-red-500 dark:text-red-400 text-sm hover:underline">
                                    Clear Location
                                </button>
                            </div>
                        ) : reportLocation.latitude && reportLocation.longitude ? (
                            <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded-md text-gray-800 dark:text-gray-200">
                                <p>Latitude: {reportLocation.latitude.toFixed(6)}, Longitude: {reportLocation.longitude.toFixed(6)}</p>
                                <button onClick={() => setReportLocation({ latitude: null, longitude: null, placeName: null })} className="mt-1 text-red-500 dark:text-red-400 text-sm hover:underline">
                                    Clear Location
                                </button>
                            </div>
                        ) : (
                            <button onClick={handleUseCurrentLocation} className="w-full mt-1 px-3 py-2 rounded-md border border-gray-300 bg-gray-50 text-gray-800 hover:bg-gray-100 dark:border-white/20 dark:bg-white/5 dark:text-white dark:hover:bg-white/10 dark:focus:ring-white/40 transition">
                                Use Current Location
                            </button>
                        )}
                    </div>

                    {submitError && <p className="text-red-500 dark:text-red-400 text-sm text-center">{submitError}</p>}

                    <div className="flex justify-end gap-2">
                        <button onClick={() => navigate(-1)} className="px-3 py-1.5 rounded-md bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 transition">
                            Cancel
                        </button>
                        <button
                            onClick={handleSubmit}
                            disabled={isSubmitting || !description || !reportLocation.latitude || !reportLocation.longitude}
                            className="px-3 py-1.5 rounded-md bg-gradient-to-r from-blue-600 to-green-600 text-white flex items-center gap-2 disabled:opacity-60 hover:opacity-90 dark:from-blue-600 dark:to-green-600 dark:hover:opacity-90 transition"
                        >
                            {isSubmitting ? <span className="animate-spin">⏳</span> : <><Send className="w-4 h-4" /> Submit</>}
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}