"use client";

import Image from "next/image";
import { Pencil, Save, MapPin, Calendar, Droplet, User } from "lucide-react";
import { useRef, useState } from "react";
import axios from "axios";

export default function ProfileCard({ profile }: { profile: any }) {
  const [editField, setEditField] = useState<string | null>(null);
  const [tempValue, setTempValue] = useState("");
  const [currentProfile, setCurrentProfile] = useState(profile);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const startEdit = (field: string, value: string) => {
    setEditField(field);
    setTempValue(value || "");
  };

  const saveEdit = async (field: string) => {
    try {
      const res = await axios.patch(
        "/api/profile",
        { id: profile.id, [field]: tempValue },
        { withCredentials: true }
      );

      setCurrentProfile(res.data.profile);
      setEditField(null);
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };

  // 🔹 Handle Image Upload
  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await axios.patch(
        `http://localhost:5000/profile/image/${profile.id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );

      setCurrentProfile(res.data.profile);
    } catch (error) {
      console.error("Failed to upload image:", error);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 flex flex-col md:flex-row items-center gap-6">
      {/* صورة المستخدم */}
      <div className="relative overflow-hidden w-40 h-40">
        <Image
          src={
            currentProfile.photo
              ? `http://localhost:5000${currentProfile.photo}`
              : "/default-avatar.png"
          }
          alt="User image"
          fill
          className="rounded-full border-4 border-red-500 object-cover"
        />
        <button
          onClick={() => fileInputRef.current?.click()}
          className="absolute bottom-0 right-0 bg-red-500 hover:bg-red-600 text-white p-1 rounded-full"
        >
          <Pencil size={14} />
        </button>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleImageUpload}
          className="hidden"
        />
      </div>

      {/* باقي بيانات المستخدم */}
      <div className="flex flex-col gap-2 text-center md:text-left">
        <span className="text-sm px-3 py-1 rounded-full bg-red-100 text-red-600 w-fit mx-auto md:mx-0">
          {currentProfile.role}
        </span>

        <div className="flex flex-wrap gap-4 text-gray-600 mt-2 justify-center md:justify-start">
          {/* Location */}
          <p className="flex items-center gap-2">
            <MapPin size={16} />
            {editField === "location" ? (
              <>
                <input
                  value={tempValue}
                  onChange={(e) => setTempValue(e.target.value)}
                  className="border rounded px-2 py-1 text-sm"
                />
                <button
                  onClick={() => saveEdit("location")}
                  className="bg-green-500 hover:bg-green-600 text-white p-1 rounded"
                >
                  <Save size={14} />
                </button>
              </>
            ) : (
              <>
                {currentProfile.location || "No location set"}
                <button
                  onClick={() => startEdit("location", currentProfile.location)}
                  className="text-gray-500 hover:text-red-500"
                >
                  <Pencil size={14} />
                </button>
              </>
            )}
          </p>

          {/* Gender */}
          <p className="flex items-center gap-2">
            <User size={16} />
            {editField === "gender" ? (
              <>
                <select
                  value={tempValue}
                  onChange={(e) => setTempValue(e.target.value)}
                  className="border rounded px-2 py-1 text-sm"
                >
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
                <button
                  onClick={() => saveEdit("gender")}
                  className="bg-green-500 hover:bg-green-600 text-white p-1 rounded"
                >
                  <Save size={14} />
                </button>
              </>
            ) : (
              <>
                {currentProfile.gender || "Not specified"}
                <button
                  onClick={() => startEdit("gender", currentProfile.gender)}
                  className="text-gray-500 hover:text-red-500"
                >
                  <Pencil size={14} />
                </button>
              </>
            )}
          </p>

          {/* Birthdate */}
          <p className="flex items-center gap-2">
            <Calendar size={16} />
            {editField === "birthdate" ? (
              <>
                <input
                  type="date"
                  value={tempValue}
                  onChange={(e) => setTempValue(e.target.value)}
                  className="border rounded px-2 py-1 text-sm"
                />
                <button
                  onClick={() => saveEdit("birthdate")}
                  className="bg-green-500 hover:bg-green-600 text-white p-1 rounded"
                >
                  <Save size={14} />
                </button>
              </>
            ) : (
              <>
                {currentProfile.birthdate || "Not set"}
                <button
                  onClick={() =>
                    startEdit("birthdate", currentProfile.birthdate)
                  }
                  className="text-gray-500 hover:text-red-500"
                >
                  <Pencil size={14} />
                </button>
              </>
            )}
          </p>

          {/* Blood Type */}
          <p className="flex items-center gap-2">
            <Droplet size={16} /> Blood Type:{" "}
            <b>{currentProfile.bloodType || "Not set"}</b>
          </p>
        </div>
      </div>
    </div>
  );
}
