'use client'
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAppDispatch } from "@/lib/redux/hooks";
import { setNewFile } from "@/lib/redux/features/profileSlice";

export function InputPhotoProfile() {
    const dispatch = useAppDispatch();
    const [file, setFile] = useState<File | null>(null);
    const [error, setError] = useState("");

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const selectedFile = event.target.files[0];
            if (selectedFile) {
                const fileType = selectedFile.type
                console.log(selectedFile)
                console.log(fileType)
                dispatch(setNewFile(selectedFile))
            }
            // if (selectedFile) {
            //     const fileType = selectedFile.type;
            //     const fileSize = selectedFile.size;
    
            //     // Allowed file types
            //     const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
    
            //     if (!allowedTypes.includes(fileType)) {
            //         setError("Only JPG, JPEG, PNG, and GIF files are allowed.");
            //         setFile(null);
            //         return;
            //     }
    
            //     // Max file size in bytes (1 MB = 1048576 bytes)
            //     if (fileSize > 1048576) {
            //         setError("File size should be less than 1 MB.");
            //         setFile(null);
            //         return;
            //     }
    
            //     setError("");
            //     setFile(selectedFile);
            // }
        }
    };

    return (
        <div className="input-layout-user-profile">
            <Label htmlFor="picture">Picture</Label>
            <Input
                id="picture"
                type="file"
                accept=".jpg,.jpeg,.png,.gif"
                onChange={handleFileChange}
                className="input-width-user-profile"
            />
            {error && <p className="text-red-500">{error}</p>}
            {file && <p>File selected: {file.name}</p>}
        </div>
    );
}
