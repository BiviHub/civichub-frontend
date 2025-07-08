
import { useState } from 'react';
import { Upload, MapPin, Send, X } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ReportIssuePage = () => {
  const [location, setLocation] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState<{ name: string; file: File }[]>([]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newFiles = files.map(file => ({
      name: file.name,
      file: file
    }));
    setUploadedFiles(prev => [...prev, ...newFiles]);
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setLocation(`${latitude}, ${longitude}`);
          },
          (error) => {
            console.error('Error getting location:', error);
          }
      );
    }
  };

  return (
      <div className="min-h-screen bg-gray-100 flex flex-col">
        <Navbar />

        <div className="flex-1 container mx-auto px-4 py-8 max-w-2xl">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="mb-6">
              <h1 className="text-2xl font-semibold text-gray-900 mb-2">Report an Issue</h1>
              <div className="mt-2 p-3 bg-blue-50 rounded-md">
                <p className="text-sm text-blue-700">
                  Fill out the form below with as much detail as possible.
                  Add photos if available to help us better understand the issue.
                </p>
              </div>
            </div>

            <form className="space-y-6">
              {/* Title Field */}
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  Issue Title*
                </label>
                <input
                    type="text"
                    id="title"
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    required
                />
              </div>

              {/* Category and Priority */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                    Category*
                  </label>
                  <select
                      id="category"
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                      required
                  >
                    <option value="">Select a category</option>
                    <option value="Road Maintenance">Road Maintenance</option>
                    <option value="Street Lighting">Street Lighting</option>
                    <option value="Garbage Collection">Garbage Collection</option>
                    <option value="Water Supply">Water Supply</option>
                    <option value="Public Safety">Public Safety</option>
                    <option value="Others">Others</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="priority" className="block text-sm font-medium text-gray-700">
                    Priority*
                  </label>
                  <select
                      id="priority"
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                      required
                  >
                    <option value="">Select priority</option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Critical">Critical</option>
                  </select>
                </div>
              </div>

              {/* Description Field */}
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Description*
                </label>
                <textarea
                    id="description"
                    rows={4}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    required
                />
              </div>

              {/* Location Field */}
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                  Location*
                </label>
                <div className="mt-1">
                  <input
                      type="text"
                      id="location"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="block w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter location"
                      required
                  />
                  <button
                      type="button"
                      onClick={getCurrentLocation}
                      className="mt-2 inline-flex items-center text-sm text-blue-600 hover:text-blue-700"
                  >
                    <MapPin className="w-4 h-4 mr-1" />
                    Use current location
                  </button>
                </div>
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Upload Images
                </label>
                <div className="mt-1 border-2 border-dashed border-gray-300 rounded-md p-4">
                  <div className="text-center">
                    <Upload className="mx-auto h-8 w-8 text-gray-400" />
                    <div className="mt-2">
                      <label htmlFor="images" className="cursor-pointer">
                        <span className="text-sm text-blue-600 hover:text-blue-700">Upload files</span>
                        <input
                            id="images"
                            type="file"
                            className="sr-only"
                            multiple
                            accept="image/*"
                            onChange={handleFileUpload}
                        />
                      </label>
                      <p className="text-xs text-gray-500 mt-1">PNG, JPG, GIF up to 10MB</p>
                    </div>
                  </div>

                  {/* File List */}
                  {uploadedFiles.length > 0 && (
                      <div className="mt-4 space-y-2">
                        {uploadedFiles.map((file, index) => (
                            <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded-md">
                              <span className="text-sm text-gray-600">{file.name}</span>
                              <button
                                  type="button"
                                  onClick={() => removeFile(index)}
                                  className="text-red-500 hover:text-red-700"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                        ))}
                      </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-2 pt-4">
                <button
                    type="button"
                    className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                    type="submit"
                    className="px-4 py-2 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-md hover:from-blue-700 hover:to-green-700 transition-colors inline-flex items-center"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Submit Report
                </button>
              </div>
            </form>
          </div>
        </div>

        <Footer />
      </div>
  );
};

export default ReportIssuePage;