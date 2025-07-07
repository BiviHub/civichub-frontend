import { useState } from 'react';
import { Upload, MapPin, Send, X } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import * as React from "react";

const ReportIssuePage = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    category: '',
    priority: '',
    images: [] as File[],
    contactInfo: '',
  });

  const [previewImages, setPreviewImages] = useState<string[]>([]);

  const categories = [
    'Road Maintenance',
    'Street Lighting',
    'Garbage Collection',
    'Water Supply',
    'Public Safety',
    'Others'
  ];

  const priorities = [
    'Low',
    'Medium',
    'High',
    'Critical'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const files = Array.from(e.target.files || []);
      
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...files]
      }));

      const newPreviewUrls = files.map(file => URL.createObjectURL(file));
      setPreviewImages(prev => [...prev, ...newPreviewUrls]);
    } catch (error) {
      console.error('Error uploading images:', error);
    }
  };

  const removeImage = (index: number) => {
    try {
      URL.revokeObjectURL(previewImages[index]);
      
      setFormData(prev => ({
        ...prev,
        images: prev.images.filter((_, i) => i !== index)
      }));
      
      setPreviewImages(prev => prev.filter((_, i) => i !== index));
    } catch (error) {
      console.error('Error removing image:', error);
    }
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setFormData(prev => ({
            ...prev,
            location: `${latitude}, ${longitude}`
          }));
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
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Title Field */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Issue Title*
              </label>
              <input
                type="text"
                id="title"
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Brief title of the issue"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                required
              />
            </div>

            {/* Category and Priority Row */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                  Category*
                </label>
                <select
                  id="category"
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  value={formData.category}
                  onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                  required
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="priority" className="block text-sm font-medium text-gray-700">
                  Priority*
                </label>
                <select
                  id="priority"
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  value={formData.priority}
                  onChange={(e) => setFormData(prev => ({ ...prev, priority: e.target.value }))}
                  required
                >
                  <option value="">Select priority</option>
                  {priorities.map((priority) => (
                    <option key={priority} value={priority}>{priority}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Location Field */}
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                Location*
              </label>
              <div className="mt-1 relative">
                <input
                  type="text"
                  id="location"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter location"
                  value={formData.location}
                  onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                  required
                />
                <button
                  type="button"
                  onClick={getCurrentLocation}
                  className="absolute right-2 top-2 text-blue-600 hover:text-blue-700"
                >
                  <MapPin className="w-5 h-5" />
                </button>
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
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Detailed description of the issue"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                required
              />
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
                    <label htmlFor="images" className="cursor-pointer text-sm text-blue-600 hover:text-blue-700">
                      <span>Upload files</span>
                      <input
                        id="images"
                        type="file"
                        className="sr-only"
                        multiple
                        accept="image/*"
                        onChange={handleImageUpload}
                      />
                    </label>
                    <p className="text-xs text-gray-500 mt-1">PNG, JPG, GIF up to 10MB</p>
                  </div>
                </div>

                {/* Image Preview */}
                {previewImages.length > 0 && (
                  <div className="mt-4 grid grid-cols-3 gap-4">
                    {previewImages.map((preview, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={preview}
                          alt={`Preview ${index + 1}`}
                          className="h-24 w-full object-cover rounded-md"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Contact Information */}
            <div>
              <label htmlFor="contactInfo" className="block text-sm font-medium text-gray-700">
                Contact Information (optional)
              </label>
              <input
                type="text"
                id="contactInfo"
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Email or phone number"
                value={formData.contactInfo}
                onChange={(e) => setFormData(prev => ({ ...prev, contactInfo: e.target.value }))}
              />
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