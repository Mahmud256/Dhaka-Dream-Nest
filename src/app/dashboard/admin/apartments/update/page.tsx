// Update Apartment Page Component
"use client";

import { useState, useEffect } from "react";
import Swal from "sweetalert2";
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
import { useSearchParams, useRouter } from "next/navigation";

const imageApiKey = process.env.NEXT_PUBLIC_IMGBB_KEY;
const imageUploadApi = `https://api.imgbb.com/1/upload?key=${imageApiKey}`;

export default function UpdateApartment() {
    const params = useSearchParams();
    const router = useRouter();
    const id = params.get("id");

    const [aprtno, setAprtno] = useState("");
    const [flrno, setFlrno] = useState("");
    const [block, setBlock] = useState("");
    const [rent, setRent] = useState("");
    const [existingImage, setExistingImage] = useState("");
    const [imageFile, setImageFile] = useState<File | null>(null);

    // 👉 Load previous apartment data
    useEffect(() => {
        if (!id) return;

        fetch(`/api/apartments/${id}`)
            .then((res) => res.json())
            .then((apt) => {
                setAprtno(apt.aprtno);
                setFlrno(apt.flrno);
                setBlock(apt.block);
                setRent(String(apt.rent));
                setExistingImage(apt.aimage);
            })
            .catch(() => Swal.fire("Error", "Failed to load apartment data", "error"));
    }, [id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        let uploadedImage = existingImage;

        // 👉 Upload new image if selected
        if (imageFile) {
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

            uploadedImage = imgData.data.display_url;
        }

        const updatedApartment = {
            aprtno,
            flrno,
            block,
            rent: Number(rent),
            aimage: uploadedImage,
        };

        const res = await fetch(`/api/apartments/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedApartment),
        });

        if (res.ok) {
            Swal.fire("Success", "Apartment updated!", "success");
            router.push("/dashboard/admin/apartments");
        } else {
            Swal.fire("Error", "Failed to update apartment", "error");
        }
    };

    return (
        <Box sx={{ maxWidth: 550, mx: "auto", mt: 4 }}>
            <Card elevation={4} sx={{ borderRadius: 3 }}>
                <CardContent>
                    <Typography variant="h4" align="center" fontWeight="bold">
                        Update Apartment
                    </Typography>

                    <form onSubmit={handleSubmit}>
                        <Stack spacing={3} mt={3}>

                            {/* Apartment No */}
                            <TextField
                                label="Apartment No"
                                value={aprtno}
                                onChange={(e) => setAprtno(e.target.value)}
                                fullWidth
                                required
                            />

                            {/* Floor No */}
                            <TextField
                                label="Floor No"
                                value={flrno}
                                onChange={(e) => setFlrno(e.target.value)}
                                fullWidth
                                required
                            />

                            {/* Block */}
                            <TextField
                                label="Block"
                                value={block}
                                onChange={(e) => setBlock(e.target.value)}
                                fullWidth
                                required
                            />

                            {/* Rent */}
                            <TextField
                                label="Rent (৳)"
                                type="number"
                                value={rent}
                                onChange={(e) => setRent(e.target.value)}
                                fullWidth
                                required
                            />

                            {/* Existing Image Preview */}
                            <Box>
                                <Typography fontWeight="bold">Existing Image:</Typography>
                                <img
                                    src={existingImage}
                                    alt="Apartment"
                                    className="w-full h-40 object-cover rounded mt-1"
                                />
                            </Box>

                            {/* Upload New Image */}
                            <Box>
                                <Typography sx={{ mb: 1 }}>Upload New Image (Optional)</Typography>
                                <Input
                                    type="file"
                                    fullWidth
                                    onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                                />
                            </Box>

                            <Button
                                type="submit"
                                variant="contained"
                                size="large"
                                sx={{ py: 1.5, fontWeight: "bold", borderRadius: 2 }}
                            >
                                Update Apartment
                            </Button>
                        </Stack>
                    </form>
                </CardContent>
            </Card>
        </Box>
    );
}
