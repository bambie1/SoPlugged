import { projectStorage } from "../firebase/firebase.utils";

export const getImageUrl = async (file) => {
  const storageRef = projectStorage.ref();
  const fileRef = storageRef.child(file.name);
  await fileRef.put(file);
  const fileUrl = await fileRef.getDownloadURL();
  return fileUrl;
};
