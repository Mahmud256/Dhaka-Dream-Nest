"use client";

import { useState } from "react";
import Swal from "sweetalert2";

// MUI Components
import {
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Box,
  Stack,
  Input,
} from "@mui/material";

const imageApiKey = process.env.NEXT_PUBLIC_IMGBB_KEY;
const imageUploadApi = `https://api.imgbb.com/1/upload?key=${imageApiKey}`;

export default function AddApartment() {
  const [aprtno, setAprtno] = useState("");
  const [flrno, setFlrno] = useState("");
  const [block, setBlock] = useState("");
  const [rent, setRent] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!imageFile) {
      Swal.fire("Error", "Please upload an image", "error");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("image", imageFile);

      const uploadRes = await fetch(imageUploadApi, {
        method: "POST",
        body: formData,
      });

      const imgData = await uploadRes.json();
      if (!imgData.success) {
        Swal.fire("Error", "Image upload failed!", "error");
        return;
      }

      const newApartment = {
        aprtno,
        flrno,
        block,
        rent: Number(rent),
        aimage: imgData.data.display_url,
      };

      const res = await fetch("/api/apartments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newApartment),
      });

      if (res.ok) {
        Swal.fire("Success", "Apartment added successfully!", "success");

        setAprtno("");
        setFlrno("");
        setBlock("");
        setRent("");
        setImageFile(null);
      } else {
        Swal.fire("Error", "Failed to add apartment", "error");
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Something went wrong!", "error");
    }
  };

  return (
    <Box sx={{ maxWidth: 550, mx: "auto", mt: 4 }}>
      <Card elevation={4} sx={{ borderRadius: 3 }}>
        <CardContent>
          <Typography variant="h4" fontWeight="bold" align="center" gutterBottom>
            Add Apartment
          </Typography>

          <form onSubmit={handleSubmit}>
            <Stack spacing={3} mt={2}>
              
              <TextField
                label="Apartment No"
                value={aprtno}
                onChange={(e) => setAprtno(e.target.value)}
                fullWidth
                required
              />

              <TextField
                label="Floor No"
                value={flrno}
                onChange={(e) => setFlrno(e.target.value)}
                fullWidth
                required
              />

              <TextField
                label="Block"
                value={block}
                onChange={(e) => setBlock(e.target.value)}
                fullWidth
                required
              />

              <TextField
                label="Rent (৳)"
                type="number"
                value={rent}
                onChange={(e) => setRent(e.target.value)}
                fullWidth
                required
              />

              <Box>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  Upload Image
                </Typography>

                <Input
                  type="file"
                  fullWidth
                  onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                  required
                />
              </Box>

              <Button
                type="submit"
                variant="contained"
                size="large"
                sx={{ py: 1.5, fontWeight: "bold", borderRadius: 2 }}
              >
                Add Apartment
              </Button>
            </Stack>
          </form>

        </CardContent>
      </Card>
    </Box>
  );
}
