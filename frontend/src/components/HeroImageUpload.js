"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { Upload } from "lucide-react";
import ImageComponent from "@/components/ImageComponent";
import useAuthAdminStore from "@/store/AuthAdminStore";
import { Snackbar, Alert } from "@mui/material";

const HeroImageUpload = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const { token } = useAuthAdminStore();

  const fetchImages = async () => {
    try {
      const response = await axios.get(`${apiUrl}/pagecontent`);
      if (response.data.heroImage) {
        if (Array.isArray(response.data.heroImage)) {
          setImages(response.data.heroImage);
        } else {
          setImages([
            { _id: "single-image", heroImage: response.data.heroImage },
          ]);
        }
      } else {
        setImages([]);
      }
    } catch (error) {
      console.error("Error fetching images", error);
    }
  };

  useEffect(() => {
    if (apiUrl) fetchImages();
  }, [apiUrl]);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("heroImage", file);

    setLoading(true);
    try {
      const response = await axios.put(`${apiUrl}/pagecontent`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      const updatedHeroImage = response.data?.data?.heroImage;
      if (updatedHeroImage) {
        setSnackbarOpen(true);
        setImages([{ _id: "single-image", heroImage: updatedHeroImage }]); // ✅ directly update from response
      }
    } catch (error) {
      console.error("Error uploading image", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 shadow bg-white rounded-lg">
      <h1 className="border-l-4 primaryBorderColor primaryTextColor mb-6 pl-2 text-lg font-semibold self-start">
        Manage Hero Image
      </h1>

      <label className="cursor-pointer inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow transition duration-300">
        <Upload className="mr-2" size={18} />
        Select Image
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />
      </label>

      {loading && <p className="text-blue-500 mt-3">Uploading...</p>}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <AnimatePresence>
          {images.length > 0 ? (
            images.map((image) => (
              <motion.div
                key={image._id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="relative bg-white shadow rounded-lg overflow-hidden"
              >
                <ImageComponent
                  imageName={image.heroImage}
                  className="object-cover rounded-lg"
                />
              </motion.div>
            ))
          ) : (
            <p className="text-gray-500 col-span-3">No images uploaded yet.</p>
          )}
        </AnimatePresence>
      </div>

      {/* ✅ Success Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Image uploaded successfully!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default HeroImageUpload;
