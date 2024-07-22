export const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

// Flags short title/description
export const metaFlag = (title, description) => {
  let flag = true;

  if (title.length >= 50 && title.length <= 60 && description?.length >= 140 && description?.length <= 155) {
    flag = false;
  } else if (title.length >= 50 && title.length <= 60 && description === undefined) {
    flag = false;
  }

  return flag;
};

// Formats date coming from DB
export const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  const day = String(date.getDate()).padStart(2, '0');
  const month = date.toLocaleString('en-US', { month: 'short' }).toUpperCase();
  const year = String(date.getFullYear()).slice(-2);

  return `${day}-${month}-${year}`;
};

// Converts string to slug
export const slugify = (str) => {
  // Convert the string to lowercase
  str = str.toLowerCase();

  // Replace spaces with hyphens
  str = str.replace(/\s+/g, '-');

  // Remove all special characters except hyphens
  str = str.replace(/[^\w\-]+/g, '');

  // Remove multiple consecutive hyphens
  str = str.replace(/\-\-+/g, '-');

  // Trim hyphens from the start and end of the string
  str = str.replace(/^-+/, '');
  str = str.replace(/-+$/, '');

  return str;
};

// Fetches page data
import axios from 'axios';

export async function fetchPageData(currentPageUrl) {
  try {
    const response0 = await axios.post(`${baseUrl}/api/page/get-page`, { currentPageUrl });
    const pages = response0.data[0];
    const { id } = response0.data[0];

    const response1 = await axios.post(`${baseUrl}/api/point/get-point`, { model: 'page', model_id: id });
    const points = separateByName(response1.data.points);

    const response2 = await fetch(`${baseUrl}/api/pages/banners?currentPageUrl=${encodeURIComponent(currentPageUrl)}`);
    const banners = await response2.json();

    const response3 = await axios.post(`${baseUrl}/api/testimonial/get-testimonial`, { model: 'page', model_id: id });
    const testimonials = response3.data.testimonials.filter((testimonial) => testimonial.status === 1);

    const response4 = await axios.post(`${baseUrl}/api/faq/get-faq`, { model: 'page', model_id: id });
    const faqs = response4.data.filter((faq) => faq.status === 1);

    return { pages, points, banners, testimonials, faqs };
  } catch (error) {
    console.error(error);
    throw error;
  }
}

function separateByName(array) {
  const nameMap = {};

  for (const obj of array) {
    const name = obj.name;

    if (nameMap.hasOwnProperty(name)) {
      nameMap[name].push(obj);
    } else {
      nameMap[name] = [obj];
    }
  }

  return Object.values(nameMap);
}

// Image operations - Upload/Delete/Update/Insert
// import fs from 'fs';
// import path from 'path';
// import query from '@/lib/db';

// const uploadImage = async (file, prefix, suffix) => {
//   try {
//     const oldPath = file.filepath;
//     const fileName = slugify(`${prefix} ${suffix}`) + '.' + file.originalFilename.split('.')[1];
//     const newPath = path.join(process.cwd(), 'public/uploads/', prefix) + '/' + fileName;
//     const rawData = await fs.promises.readFile(oldPath);
//     const imagePath = 'uploads/' + prefix + '/' + fileName;

//     const uploadDir = path.join(process.cwd(), 'public/uploads/', prefix);
//     if (!fs.existsSync(uploadDir)) {
//       await fs.promises.mkdir(uploadDir, { recursive: true });
//     }

//     await fs.promises.writeFile(newPath, rawData);

//     return imagePath;
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// };

// const deleteImage = async (imagePath) => {
//   try {
//     const filePath = path.join(process.cwd(), 'public/', imagePath);
//     if (fs.existsSync(filePath)) {
//       await fs.promises.unlink(filePath);
//     }
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// };

// const updateMediaEntry = async (fileName, altText, imagePath, mediaId) => {
//   try {
//     const response = await query('UPDATE media SET media = ?, alt = ?, path =