import axios from "axios";

export const API_BASE_URL = 'http://localhost:7000/api/v1';


const CLOUDFLARE_ACCOUNT_ID = "25bcc0e5e92cb8ce6fdad79ef0633673";
const CLOUDFLARE_API_KEY = "DWVu7Jf1Y1JhthdNsNik7CQxTX4Ez5ydPGkEmAzR";

export const handleCloudflareUpload = async (
  file,
  onProgress,
  onProcessingStatus
) => {
  try {
    // Step 1: Generate a Direct Upload URL
    const uploadUrlResponse = await axios.post(
      `https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ACCOUNT_ID}/stream/direct_upload`,
      {
        meta: { name: file?.name },
        requireSignedURLs: false,
        maxDurationSeconds: 3600,
      },
      {
        headers: {
          Authorization: `Bearer ${CLOUDFLARE_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const { uploadURL, uid } = uploadUrlResponse.data.result;
    console.log("Generated upload URL:", uploadURL);

    // Step 2: Upload the File
    const formData = new FormData();
    formData.append("file", {
      uri: file.uri, // React Native URI
      type: file.type, // MIME type
      name: file.name, // File name
    });

    await axios.post(uploadURL, formData, {
      headers: { "Content-Type": "multipart/form-data" },
      onUploadProgress: (progressEvent) => {
        const progress = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        console.log(`Upload Progress: ${progress}%`);
        if (onProgress) onProgress(progress); // Callback for progress
      },
    });

    console.log("File uploaded successfully!");

    // Step 3: Poll for Video Processing Status
    const pollForStatus = async () => {
      const response = await axios.get(
        `https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ACCOUNT_ID}/stream/${uid}`,
        {
          headers: { Authorization: `Bearer ${CLOUDFLARE_API_KEY}` },
        }
      );

      const videoMetaData = response.data.result;

      // Update processing status via callback
      if (onProcessingStatus) {
        onProcessingStatus({
          state: videoMetaData.status.state,
          readyToStream: videoMetaData.readyToStream,
          error: videoMetaData.status.errorReasonText,
        });
      }

      if (videoMetaData.readyToStream) {
        console.log("Video is ready to stream:", videoMetaData);
        return videoMetaData;
      } else {
        console.log("Video is still processing...");
        await new Promise((resolve) => setTimeout(resolve, 5000)); // Wait 5 seconds
        return pollForStatus(); // Recursive call to keep polling
      }
    };

    const videoMetaData = await pollForStatus();

    return {
      playbackUrl: videoMetaData.playback.hls,
      thumbnailUrl: videoMetaData.thumbnail,
      meta: videoMetaData.meta,
    };
  } catch (error) {
    console.error(
      "Error handling Cloudflare upload:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const handleImageUploadToCloudflare = async (file, onProgress) => {
  try {
    // Step 1: Generate a Direct Upload URL
    const uploadUrlResponse = await axios.post(
      `https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ACCOUNT_ID}/images/v1/direct_upload`,
      {},
      {
        headers: {
          Authorization: `Bearer ${CLOUDFLARE_API_KEY}`,
        },
      }
    );

    const uploadUrl = uploadUrlResponse.data.result.uploadURL;
    console.log("Generated Image ", uploadUrlResponse.data.result);

    // Step 2: Upload the Image
    const formData = new FormData();
    formData.append("file", {
      uri: file.uri, // For React Native
      type: file.type, // MIME type (e.g., image/png)
      name: file.name, // File name
    });

    const uploadResponse = await axios.post(uploadUrl, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: (progressEvent) => {
        const progress = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        console.log(`Image Upload Progress: ${progress}%`);
        if (onProgress) onProgress(progress); // Callback for progress
      },
    });

    console.log("Image uploaded successfully:", uploadResponse.data.result);
    return uploadResponse.data.result.variants[0]; // Return the optimized image URL
  } catch (error) {
    console.error(
      "Error handling image upload to Cloudflare:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const getDirectUploadUrl = async () => {
  const options = {
    method: "POST",
    url: `https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ACCOUNT_ID}/stream/direct_upload`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${CLOUDFLARE_API_KEY}`,
    },
    data: {
      meta: { name: "user-uploaded-video" }, // Optional metadata
      requireSignedURLs: false, // Set to true if you want secure playback
      maxDurationSeconds: 3600,
    },
    // data: {
    //   allowedOrigins: ['example.com'],
    //   creator: 'creator-id_abcde12345',
    //   expiry: 'Now + 30 minutes',
    //   maxDurationSeconds: 1,
    //   meta: {name: 'video12345.mp4'},
    //   requireSignedURLs: false,
    //   scheduledDeletion: '2014-01-02T02:20:00Z',
    //   thumbnailTimestampPct: 0.529241,
    //   watermark: {uid: 'ea95132c15732412d22c1476fa83f27a'}
    // }
  };

  try {
    const response = await axios.request(options);
    console.log("upload url data ", response?.data?.result);
    return response.data.result; // Direct upload URL
  } catch (error) {
    console.error(
      "Error generating direct upload URL:",
      error.response?.data || error?.message
    );
    throw error;
  }
};

export const uploadFileToCloudflare = async (file, uploadUrl) => {
  console.log("file:", file);
  console.log("uploadUrl:", uploadUrl);

  const formData = new FormData();
  formData.append("file", {
    uri: file.uri, // For React Native
    type: file.type, // MIME type (e.g., video/mp4, image/png)
    name: file.name, // File name
  });

  try {
    const response = await axios.post(uploadUrl, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: (progressEvent) => {
        const progress = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        console.log(`Upload Progress: ${progress}%`);
      },
    });

    console.log("File uploaded successfully:", response);
    return response.data; // Return the response data
  } catch (error) {
    if (error.response) {
      console.error("Error uploading file to Cloudflare:", error.response.data);
      throw new Error(
        `Failed to upload file: ${error.response.data.errors || error.message}`
      );
    } else {
      console.error("Error uploading file to Cloudflare:", error.message);
      throw new Error(`Failed to upload file: ${error.message}`);
    }
  }
};

export const getVideoMetadata = async (videoId) => {
  try {
    const response = await axios.get(
      `https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ACCOUNT_ID}/stream/${videoId}`,
      {
        headers: {
          Authorization: `Bearer ${CLOUDFLARE_API_KEY}`,
        },
      }
    );

    console.log("Video metadata:", response.data.result);
    return response.data.result;
  } catch (error) {
    console.error(
      "Error fetching video metadata:",
      error.response?.data || error.message
    );
    throw error;
  }
};

const checkVideoStatus = async (videoId) => {
  try {
    const response = await axios.get(
      `https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ACCOUNT_ID}/stream/${videoId}`,
      {
        headers: {
          Authorization: `Bearer ${CLOUDFLARE_API_KEY}`,
        },
      }
    );

    const videoMetaData = response.data.result;
    console.log("Video metadata:", videoMetaData);

    if (videoMetaData.readyToStream) {
      console.log("Video is ready to stream!");
      return videoMetaData;
    } else {
      console.log("Video is still processing...");
      setTimeout(() => checkVideoStatus(videoId), 5000); // Poll every 5 seconds
    }
  } catch (error) {
    console.error(
      "Error checking video status:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const getLocalTime = (utcDate) => {
  const date = new Date(utcDate);
  const localTime = date.toLocaleString();
  return localTime;
};

// Function to get user data from AsyncStorage

export const getUserData = async () => {
    try {
      const userDataFromStorage = localStorage.getItem("userData");
      // Uncomment these lines if you want to debug the data:
      // console.log("User data:", JSON.parse(userDataFromStorage));
      // console.log("User data from storage:", userDataFromStorage);
      return userDataFromStorage ? JSON.parse(userDataFromStorage) : null;
    } catch (error) {
      console.error("Error fetching user data from storage:", error);
      return null;
    }
  };


// Function to get JWT token from AsyncStorage and create config


export const getConfig = () => {
    try {
      const jwtToken = localStorage.getItem("jwtToken");
      return {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          "Content-Type": "application/json",
        },
      };
    } catch (error) {
      console.error("Error fetching JWT token from storage:", error);
      return {
        headers: {
          Authorization: "",
        },
      };
    }
  };


export const removeJwtToken = () => {
    try {
      localStorage.removeItem("jwtToken");
      console.log("JWT token removed successfully");
    } catch (error) {
      console.error("Failed to remove JWT token:", error);
    }
  };


  export const removeUserStorageData = () => {
    try {
      localStorage.removeItem("userData");
      console.log("User data removed successfully");
    } catch (error) {
      console.error("Failed to remove user data:", error);
    }
  };


export const getConfigWithFileSystem =  () => {
  try {
    const jwtToken =  localStorage.getItem("jwtToken");
    return {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        "Content-Type": "multipart/form-data", // Add Content-Type for file uploads
      },
    };
  } catch (error) {
    console.error("Error fetching JWT token from storage:", error);
    return {
      headers: {
        Authorization: "",
        "Content-Type": "multipart/form-data", // Ensure Content-Type is set even in case of error
      },
    };
  }
};

export const fetchData =  (page = 1, limit = 50, endpoint) => {
  try {
    const config =  getConfig();
    const userData =  getUserData();

    const response =  axios.get(`${API_BASE_URL}/${endpoint}`, {
      params: {
        page,
        limit,
        userId: userData,
      },
      ...config,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Error(
      error.response
        ? error.response.data
        : "An error occurred while fetching data"
    );
  }
};
export const fetchDataWithSpecialId = async (
  page = 1,
  limit = 50,
  endpoint,
  specialId
) => {
  try {
    const config =  getConfig();
    const userData =  getUserData();

    const response =  axios.get(`${API_BASE_URL}/${endpoint}`, {
      params: {
        page,
        limit,
        userId: userData,
        specialId,
      },
      ...config,
    });

    // console.log("Response:", response);
    return response.data;
  } catch (error) {
    console.error("Error fetching data with id:", error);
    throw new Error(
      error.response
        ? error.response.data
        : "An error occurred while fetching data"
    );
  }
};

export const loginUser = async (communityData, endpoint) => {
  try {

    const response = await axios.post(
      `${API_BASE_URL}/${endpoint}`,
      communityData
    );
    const token = response.headers['authorization'];
    if( await token) {
       localStorage.setItem("jwtToken", token);
       localStorage.setItem("userRole", response?.data?.role); 
    }
    return response.data;
  } catch (error) {
    console.log("error ", error);
    throw error;
  }
};
export const createData = async (communityData, endpoint) => {
  try {
    const config = await getConfig();
    const response = await axios.post(
      `${API_BASE_URL}/${endpoint}`,
      communityData,
      config
    );
    console.log("res", response);
    return response.data;
  } catch (error) {
    console.log("error ", error);
    throw error;
  }
};
export const createDataWthFileSystem = async (communityData, endpoint) => {
  try {
    // const config=await getConfig();
    const config = await getConfigWithFileSystem();
    const response = await axios.post(
      `${API_BASE_URL}/${endpoint}`,
      communityData,
      config
    );
    // console.log("res", response);
    return response.data;
  } catch (error) {
    console.log("error ", error);
    throw error;
  }
};

// Update a data
export const updateData = async (itemData, endpoint) => {
  try {
    const config = await getConfig();
    const response = await axios.put(
      `${API_BASE_URL}/${endpoint}`,
      itemData,
      config
    );
    return response.data;
  } catch (error) {
    console.error("Error updating data:", error);
    throw new Error(
      error.response
        ? error.response.data
        : "An error occurred while updating data"
    );
  }
};
export const updateDataWithPostMethod = async (itemData, endpoint) => {
  try {
    const config = await getConfig();
    const response = await axios.post(
      `${API_BASE_URL}/${endpoint}`,
      itemData,
      config
    );
    return response.data;
  } catch (error) {
    console.error("Error updating data:", error);
    throw new Error(
      error.response
        ? error.response.data
        : "An error occurred while updating data"
    );
  }
};
export const updateDataWithFileSystem = async (itemData, endpoint) => {
  try {
    const config = await getConfigWithFileSystem();
    const response = await axios.post(
      `${API_BASE_URL}/${endpoint}`,
      itemData,
      config
    );
    return response.data;
  } catch (error) {
    console.error("Error updating data:", error);
    throw new Error(
      error.response
        ? error.response.data
        : "An error occurred while updating data"
    );
  }
};
