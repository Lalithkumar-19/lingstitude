import React, { useState, useEffect, ChangeEvent } from "react";
import { Camera, User, Phone, Mail, GraduationCap } from "lucide-react";
import axiosInstance from "@/lib/axiosInstance";
import axios from "axios";

interface UserProfile {
  fullName: string;
  enrolled_batch?: string;
  phoneNumber?: string;
  email: string;
  profilePic?: string;
}

function Profile() {
  const [imagePreview, setImagePreview] = useState<string>(
    "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&h=400&fit=crop"
  );
  const [profile, setProfile] = useState<UserProfile>({
    fullName: "",
    enrolled_batch: "",
    phoneNumber: "",
    email: "",
    profilePic: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<UserProfile>({ ...profile });

  // Fetch user profile on component mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("Usertoken");
        // Assuming token is stored in localStorage
        const { data } = await axiosInstance.get("/api/user/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("helle", data);
        setProfile(data);
        setImagePreview(data.profilePic || imagePreview);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    fetchProfile();
  }, []);

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();

      // Wait for uploadImage to return the URL
      const url = await uploadImage(file);

      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setFormData((prev) => ({ ...prev, profilePic: url }));
      };

      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditClick = () => {
    setFormData({ ...profile });
    setIsEditing(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("Usertoken");
      const { data } = await axiosInstance.put(
        "/api/user/profile/update",
        {
          fullName: formData.fullName,
          phoneNumber: formData.phoneNumber,
          profilePic: formData.profilePic,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setProfile(data);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <div className="mt-10 min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-blue-600 h-32"></div>
          <div className="relative px-4 sm:px-6 lg:px-8 pb-8">
            <div className="relative -mt-16 flex justify-center">
              <div className="relative">
                <img
                  src={imagePreview}
                  alt="Profile"
                  className="h-32 w-32 rounded-full border-4 border-white object-cover"
                />
                <label
                  htmlFor="image-upload"
                  className="absolute bottom-0 right-0 bg-blue-600 p-2 rounded-full text-white cursor-pointer hover:bg-blue-700 transition-colors"
                >
                  <Camera className="h-5 w-5" />
                  <input
                    type="file"
                    id="image-upload"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </label>
              </div>
            </div>

            {isEditing ? (
              <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <User className="h-5 w-5 text-blue-600" />
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Full Name"
                      required
                    />
                  </div>
                  <div className="flex items-center space-x-4">
                    <GraduationCap className="h-5 w-5 text-blue-600" />
                    <input
                      type="text"
                      name="batch"
                      value={formData.enrolled_batch}
                      onChange={handleInputChange}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enrolled Batch"
                      disabled
                    />
                  </div>
                  <div className="flex items-center space-x-4">
                    <Phone className="h-5 w-5 text-blue-600" />
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Phone Number"
                      required
                    />
                  </div>
                  <div className="flex items-center space-x-4">
                    <Mail className="h-5 w-5 text-blue-600" />
                    <span className="font-medium">{formData.email}</span>
                  </div>
                </div>

                <div className="flex justify-center space-x-4 pt-4">
                  <button
                    type="submit"
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div className="mt-8 space-y-6">
                <div className="space-y-4 text-gray-700">
                  <div className="flex items-center space-x-4">
                    <User className="h-5 w-5 text-blue-600" />
                    <span className="font-medium">{profile.fullName}</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <GraduationCap className="h-5 w-5 text-blue-600" />
                    <span>{profile.enrolled_batch}</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Phone className="h-5 w-5 text-blue-600" />
                    <span>{profile.phoneNumber || "Not provided yet"}</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Mail className="h-5 w-5 text-blue-600" />
                    <span>{profile.email}</span>
                  </div>
                </div>

                <div className="flex justify-center pt-4">
                  <button
                    type="button"
                    onClick={handleEditClick}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Edit Profile
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;

const uploadImage = async (selectedFile) => {
  const api_key = "2cb1ba99b417044af6b2391607e1c254";

  const formData = new FormData();
  formData.append("image", selectedFile);

  try {
    const { data } = await axios.post(
      `https://api.imgbb.com/1/upload?key=${api_key}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (data.data.url) {
      return data.data.url;
      console.log("Image uploaded successfully:", data.data.url);
    } else {
      alert("Error: Unable to upload image.");
    }
  } catch (error) {
    console.error(
      "Error while uploading:",
      error.response?.data || error.message
    );
    alert("Error while uploading the image.");
  }
};
