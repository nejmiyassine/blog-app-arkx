const basePath = import.meta.env.VITE_REACT_API_URL;
export const imageUrl = (imagePath) =>
    `${basePath}/${imagePath.replace(/\\/g, '/')}`;
