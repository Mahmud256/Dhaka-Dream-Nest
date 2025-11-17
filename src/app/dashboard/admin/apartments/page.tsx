"use client";

import React, { useState, useEffect } from "react";
import {
  Card,
  CardMedia,
  Typography,
  Button,
  Box,
  IconButton,
  CardContent,
  CardActions,
  Grid,
  Avatar,
  Chip,
  Divider,
  Stack,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import HomeWorkIcon from "@mui/icons-material/HomeWork";

import Swal from "sweetalert2";
import axios from "axios";
import { useRouter } from "next/navigation";

interface ApartmentType {
  _id: string;
  aimage: string;
  aprtno: string;
  flrno: string;
  block: string;
  rent: number;
}

const ApartmentsAdmin: React.FC = () => {
  const [apartments, setApartments] = useState<ApartmentType[]>([]);
  const router = useRouter();

  useEffect(() => {
    axios
      .get("/api/apartments")
      .then((res) => setApartments(res.data))
      .catch((err) => console.log(err));
  }, []);

  // 👉 Go to update page
  const handleUpdate = (apt: ApartmentType) => {
    router.push(`/dashboard/admin/apartments/update?id=${apt._id}`);
  };

  // 👉 Delete apartment
  const handleDelete = async (apt: ApartmentType) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: `Delete Apartment ${apt.aprtno}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
    });

    if (!confirm.isConfirmed) return;

    await axios.delete(`/api/apartments/${apt._id}`);

    Swal.fire("Deleted!", "Apartment has been removed", "success");

    setApartments((prev) => prev.filter((a) => a._id !== apt._id));
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#f3f4f6",
        py: 8,
        px: { xs: 2, md: 6 },
      }}
    >
      {/* Header Section */}
      <Box sx={{ mb: 6, textAlign: "center" }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", color: "#103c3b" }}>
          🏢 Apartment Management Dashboard
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          View, update & delete apartments from the system
        </Typography>
      </Box>

      {/* Apartment Cards */}
      <Grid container spacing={4}>
        {apartments.map((apt) => (
          <Grid item xs={12} sm={6} md={4} key={apt._id}>
            <Card
              sx={{
                borderRadius: 3,
                overflow: "hidden",
                boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                transition: "0.3s",
                "&:hover": { boxShadow: "0 6px 24px rgba(0,0,0,0.12)" },
              }}
            >
              <CardMedia
                component="img"
                image={apt.aimage}
                alt={apt.aprtno}
                sx={{
                  height: 200,
                  objectFit: "cover",
                }}
              />

              <CardContent>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Avatar sx={{ bgcolor: "#103c3b" }}>
                    <HomeWorkIcon />
                  </Avatar>
                  <Typography variant="h6" fontWeight="bold">
                    Apartment {apt.aprtno}
                  </Typography>
                </Stack>

                <Divider sx={{ my: 2 }} />

                <Stack spacing={1}>
                  <Typography>
                    <strong>Floor:</strong> {apt.flrno}
                  </Typography>
                  <Typography>
                    <strong>Block:</strong> {apt.block}
                  </Typography>

                  <Chip
                    label={`৳${apt.rent} / month`}
                    color="primary"
                    sx={{ mt: 1, fontSize: "15px" }}
                  />
                </Stack>
              </CardContent>

              <CardActions sx={{ display: "flex", justifyContent: "space-between", px: 2, pb: 2 }}>
                <IconButton
                  color="primary"
                  onClick={() => handleUpdate(apt)}
                  sx={{
                    bgcolor: "#e3f2fd",
                    "&:hover": { bgcolor: "#bbdefb" },
                  }}
                >
                  <EditIcon />
                </IconButton>

                <IconButton
                  color="error"
                  onClick={() => handleDelete(apt)}
                  sx={{
                    bgcolor: "#ffebee",
                    "&:hover": { bgcolor: "#ffcdd2" },
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </CardActions>

            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ApartmentsAdmin;
