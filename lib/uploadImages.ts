let USER_ID = "";
export async function uploadImages(
  images: File[],
  userId: string
): Promise<string[]> {
  USER_ID = userId;
  const imageUploadRequests = images.map(uploadImage);
  const results = await Promise.all(imageUploadRequests);

  return results;
}

async function uploadImage(image: File) {
  const imageName = USER_ID + crypto.randomUUID();
  //get signed req
  const signResponse = await fetch("/api/sign-cloudinary-params", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ folder: "wine_labels", public_id: imageName }),
  });

  const signData = await signResponse.json();

  const data = new FormData();
  data.append("file", image);
  data.append("api_key", signData.apikey);
  data.append("timestamp", signData.timestamp);
  data.append("signature", signData.signature);
  data.append("folder", "wine_labels");
  //   const imageName = sanitizeName(image.name);
  data.append("public_id", imageName);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/dgwhzqt43/image/upload/`,
    {
      method: "POST",
      body: data,
    }
  );
  const resData = await res.json();
  return resData.url;
}

function sanitizeName(name: string) {
  const parts = name.split(".");
  if (parts.length > 1) {
    parts.pop();
  }
  return parts.join(".");
}

function getNameFromUrl(url: string) {
  const lastSlashIndex = url.lastIndexOf("/");
  if (lastSlashIndex !== -1) {
    return url.substring(lastSlashIndex + 1);
  } else {
    //there are no "/"
    return url;
  }
}

export async function destroyImage(url: string) {
  const imageName = sanitizeName(getNameFromUrl(url));
  const signResponse = await fetch("/api/sign-cloudinary-params", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ public_id: imageName }),
  });
  const signData = await signResponse.json();

  const data = new FormData();
  data.append("api_key", signData.apikey);
  data.append("timestamp", signData.timestamp);
  data.append("signature", signData.signature);
  data.append("folder", "wine_labels");
  data.append("public_id", imageName);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/dgwhzqt43/image/destroy/`,
    {
      method: "POST",
      body: data,
    }
  );
  const resData = await res.json();
  return resData;
}
