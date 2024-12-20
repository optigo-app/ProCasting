import axios from "axios";

export const uploadPhotos = async (compressedFiles, treeBatch, mode, uploadName) => {
    // Initial input validation
    if (!compressedFiles || compressedFiles.length === 0) {
        return;
    }

    // Retrieve required localStorage data
    const empData = localStorage.getItem("getemp");
    const initData = localStorage.getItem("initmfg");

    if (!empData || !initData) {
        return;
    }

    const emp = JSON.parse(empData);
    const init = JSON.parse(initData);

    const formData = new FormData();
    try {
        formData.append("pdf", compressedFiles[0]?.file);
        formData.append("mode", mode ?? "savetreephoto");
        formData.append("UploadLogicalPath", init?.UploadLogicalPath ?? "");
        formData.append("ukey", init?.ukey ?? "");
        formData.append("uploadname", uploadName ?? "castingtree");
        formData.append("castbatchno", treeBatch ?? "XP");
    } catch (error) {
        return;
    }

    try {
        const header = {
            Authorization: `Bearer ${init?.token}`,
            Yearcode: init?.YearCode ?? "",
            Version: "V4",
            sp: "2",
        };

        const response = await axios.post(
            "https://api.optigoapps.com/test/photoupload.aspx",
            formData,
            {
                headers: header,
            }
        );

        return response;
    } catch (error) {
        if (error.response) {
            console.error('Error uploading image:', error.response.data);
        } else if (error.message.includes('CORS')) {
            console.error('Error uploading image:', 'CORS error');
        } else {
            console.error('Error uploading image:', error.message);
        }

        throw error;
    }
};
