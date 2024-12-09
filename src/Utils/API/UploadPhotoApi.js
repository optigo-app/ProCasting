import axios from "axios";

export const uploadPhotos = async (fileInputs, treeBatch) => {
    console.log("fileInputs: ", fileInputs);
    const empData = JSON.parse(localStorage.getItem("getemp"));
    const init = JSON.parse(localStorage.getItem("initmfg"));

    try {
        debugger;
        const body = new FormData();

        fileInputs.forEach((fileInput, index) => {
            body.append(`pdf_${index}`, fileInput.file);
        });

        body.append("mode", "savetreephoto");
        body.append("UploadLogicalPath", init?.UploadLogicalPath ?? "");
        body.append("ukey", init?.ukey ?? "");
        body.append("uploadname", "castingtree");
        body.append("castbatchno", treeBatch ?? "XP");

        // Log the FormData contents
        console.log("Logging FormData:");
        for (const [key, value] of body.entries()) {
            console.log(`${key}:`, value);
        }

        const response = await axios.post(
            "http://api.optigoapps.com/test/photoupload.aspx",
            body,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        return response;
    } catch (error) {
        console.error("Error uploading photos:", error);
        throw error;
    }
};
