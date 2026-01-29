import { Request, Response } from "express";
import { uploadToCloudinary } from "../../lib/cloudinary";

const uploadImage = async (req: Request, res: Response) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "No file uploaded",
            });
        }

        const folder = req.query.folder as string || "grababite/meals";
        const result = await uploadToCloudinary(req.file.buffer, folder);

        res.status(200).json({
            success: true,
            data: {
                url: result.url,
                publicId: result.publicId,
            },
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message || "Failed to upload image",
        });
    }
};

export const UploadController = {
    uploadImage,
};
