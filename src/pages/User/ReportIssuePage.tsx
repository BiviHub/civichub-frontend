// src/pages/ReportIssuePage.tsx
import { useEffect, useState } from "react";
import { X, Send } from "lucide-react";
import { createReport } from "../../services/authService";
import { useNavigate } from "react-router-dom";

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

    // Attempt to get geolocation on mount (optional). You can remove if you prefer "click to get current location".
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
                    // silently fail — user can trigger "Use Current Location" manually
                    setLocationError(null);
                },
                { timeout: 6000 }
            );
        }
    }, []);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const newImages = Array.from(e.target.files).filter((file) => file.type.startsWith("image/"));
            setImages((prev) => [...prev, ...newImages].slice(0, 5)); // cap 5
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
            // Resolve human-readable location
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

            const dto = {
                Location: locationToSend,
                Description: description,
                CitizenId: citizenId,
                Photos: images, // service converts File[] into FormData
            };

            await createReport(dto);

            // success — navigate back to feed (or show success toast)
            navigate("/user/news");
        } catch (err) {
            console.error("Failed to create report:", err);
            setSubmitError(err instanceof Error ? err.message : "Failed to submit report.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto py-8 px-4">
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow p-6 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold">Report an Issue</h2>
                    <button onClick={() => navigate(-1)} className="text-gray-600 dark:text-gray-300">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium mb-1">Describe the Issue</label>
                        <textarea
                            rows={4}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Briefly describe the issue..."
                            className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 outline-none resize-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Upload Images (Up to 5)</label>
                        <div className="border-2 border-dashed rounded-lg p-4 bg-gray-50 dark:bg-gray-800">
                            <input
                                type="file"
                                multiple
                                accept="image/*"
                                onChange={handleImageChange}
                                className="w-full text-sm text-gray-500 dark:text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-600"
                            />

                            {images.length > 0 && (
                                <div className="mt-4 grid grid-cols-2 gap-2">
                                    {images.map((image, idx) => (
                                        <div key={idx} className="relative">
                                            <img src={URL.createObjectURL(image)} alt={`Preview ${idx}`} className="w-full h-24 object-cover rounded-lg" />
                                            <button
                                                onClick={() => handleDeleteImage(idx)}
                                                className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
                                                type="button"
                                            >
                                                <X size={14} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Location</label>

                        {locationError ? (
                            <p className="text-red-500 text-sm mb-2">{locationError}</p>
                        ) : reportLocation.placeName ? (
                            <div className="bg-gray-200 dark:bg-gray-800 p-2 rounded-lg text-gray-800 dark:text-white">
                                <p className="text-sm font-medium">📍 {reportLocation.placeName}</p>
                                <button onClick={() => setReportLocation({ latitude: null, longitude: null, placeName: null })} className="mt-1 text-red-500 text-sm hover:underline">
                                    Clear Location
                                </button>
                            </div>
                        ) : reportLocation.latitude && reportLocation.longitude ? (
                            <div className="bg-gray-200 dark:bg-gray-800 p-2 rounded-lg text-gray-800 dark:text-white">
                                <p>Latitude: {reportLocation.latitude.toFixed(6)}, Longitude: {reportLocation.longitude.toFixed(6)}</p>
                                <button onClick={() => setReportLocation({ latitude: null, longitude: null, placeName: null })} className="mt-1 text-red-500 text-sm hover:underline">
                                    Clear Location
                                </button>
                            </div>
                        ) : (
                            <button onClick={handleUseCurrentLocation} className="px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                                Use Current Location
                            </button>
                        )}
                    </div>

                    {submitError && <p className="text-red-500 text-sm">{submitError}</p>}

                    <div className="flex justify-end gap-3">
                        <button onClick={() => navigate(-1)} className="px-4 py-2 rounded-md bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-white">
                            Cancel
                        </button>

                        <button
                            onClick={handleSubmit}
                            disabled={isSubmitting || !description || !reportLocation.latitude || !reportLocation.longitude}
                            className="px-4 py-2 rounded-md bg-gradient-to-r from-blue-600 to-green-500 text-white flex items-center gap-2 disabled:opacity-60"
                        >
                            {isSubmitting ? <span className="animate-spin">⏳</span> : <><Send className="w-4 h-4" /> Submit Report</>}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
