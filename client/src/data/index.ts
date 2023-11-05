import axios from "axios";
import { User } from "../types";

// Function to fetch random images from Unsplash
export const fetchRandomImages = async (count: number) => {
  try {
    const response = await axios.get(
      `https://api.unsplash.com/photos/random?client_id=-ovQpZKXdBSMx8qtTQAfTvBFJInIt_hzPdCaVv77BdM&count=${count}`
    );
    const images = response.data.map((image: any) => image.urls.regular);
    return images;
  } catch (error) {
    console.error("Error fetching images:", error);
    return [];
  }
};

// Generate 20 random images and update the dummyData array
const updateDummyDataWithImages = async () => {
  const randomImages = await fetchRandomImages(20);
  dummyData.forEach((item, index) => {
    item.avatar = randomImages[index];
  });
};

// Call the function to update the dummyData array with random images

const dummyData: User[] = [
  {
    avatar:
      "https://cdn.discordapp.com/attachments/1013263999611195503/1102600476345765929/Pngtreecreative_car_car_standard_volkswagen_333932.png",
    name: "John Doe",
    email: "john.doe@example.com",
    isadmin: true,
    isverified: true,
    joinDate: "22-3-2023",
    activeDate: "2-5-2023",
  },
  {
    avatar: "https://example.com/avatar2.png",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    isadmin: false,
    isverified: false,
    joinDate: "30-3-2023",
    activeDate: "3-5-2023",
  },
  {
    avatar: "https://example.com/avatar3.png",
    name: "Michael Johnson",
    email: "michael.johnson@example.com",
    isadmin: false,
    isverified: true,
    joinDate: "12-4-2023",
    activeDate: "4-5-2023",
  },
  {
    avatar: "https://example.com/avatar4.png",
    name: "Emily Wilson",
    email: "emily.wilson@example.com",
    isadmin: true,
    isverified: true,
    joinDate: "5-4-2023",
    activeDate: "5-5-2023",
  },
  {
    avatar: "https://example.com/avatar5.png",
    name: "David Brown",
    email: "david.brown@example.com",
    isadmin: false,
    isverified: false,
    joinDate: "18-4-2023",
    activeDate: "6-5-2023",
  },
  {
    avatar: "https://example.com/avatar6.png",
    name: "Sarah Davis",
    email: "sarah.davis@example.com",
    isadmin: true,
    isverified: true,
    joinDate: "1-5-2023",
    activeDate: "7-5-2023",
  },
  {
    avatar: "https://example.com/avatar7.png",
    name: "Daniel Thomas",
    email: "daniel.thomas@example.com",
    isadmin: false,
    isverified: false,
    joinDate: "7-5-2023",
    activeDate: "8-5-2023",
  },
  {
    avatar: "https://example.com/avatar8.png",
    name: "Olivia Martinez",
    email: "olivia.martinez@example.com",
    isadmin: true,
    isverified: true,
    joinDate: "13-5-2023",
    activeDate: "9-5-2023",
  },
  {
    avatar: "https://example.com/avatar9.png",
    name: "James Clark",
    email: "james.clark@example.com",
    isadmin: false,
    isverified: false,
    joinDate: "20-5-2023",
    activeDate: "10-5-2023",
  },
  {
    avatar: "https://example.com/avatar11.png",
    name: "Noah Lee",
    email: "noah.lee@example.com",
    isadmin: false,
    isverified: false,
    joinDate: "27-5-2023",
    activeDate: "12-5-2023",
  },
  {
    avatar: "https://example.com/avatar12.png",
    name: "Emma Hernandez",
    email: "emma.hernandez@example.com",
    isadmin: true,
    isverified: true,
    joinDate: "28-5-2023",
    activeDate: "13-5-2023",
  },
  {
    avatar: "https://example.com/avatar13.png",
    name: "Liam Walker",
    email: "liam.walker@example.com",
    isadmin: false,
    isverified: false,
    joinDate: "29-5-2023",
    activeDate: "14-5-2023",
  },
  {
    avatar: "https://example.com/avatar14.png",
    name: "Ava Green",
    email: "ava.green@example.com",
    isadmin: true,
    isverified: true,
    joinDate: "30-5-2023",
    activeDate: "15-5-2023",
  },
  {
    avatar: "https://example.com/avatar15.png",
    name: "Mason Hall",
    email: "mason.hall@example.com",
    isadmin: false,
    isverified: false,
    joinDate: "31-5-2023",
    activeDate: "16-5-2023",
  },
  {
    avatar: "https://example.com/avatar16.png",
    name: "Isabella Adams",
    email: "isabella.adams@example.com",
    isadmin: true,
    isverified: true,
    joinDate: "1-6-2023",
    activeDate: "17-5-2023",
  },
  {
    avatar: "https://example.com/avatar17.png",
    name: "Benjamin Turner",
    email: "benjamin.turner@example.com",
    isadmin: false,
    isverified: false,
    joinDate: "2-6-2023",
    activeDate: "18-5-2023",
  },
  {
    avatar: "https://example.com/avatar18.png",
    name: "Mia Collins",
    email: "mia.collins@example.com",
    isadmin: true,
    isverified: true,
    joinDate: "3-6-2023",
    activeDate: "19-5-2023",
  },
  {
    avatar: "https://example.com/avatar19.png",
    name: "Ethan Hill",
    email: "ethan.hill@example.com",
    isadmin: false,
    isverified: false,
    joinDate: "4-6-2023",
    activeDate: "20-5-2023",
  },
  {
    avatar: "https://example.com/avatar20.png",
    name: "Charlotte Cook",
    email: "charlotte.cook@example.com",
    isadmin: true,
    isverified: true,
    joinDate: "5-6-2023",
    activeDate: "21-5-2023",
  },
];
updateDummyDataWithImages();
export default dummyData;
