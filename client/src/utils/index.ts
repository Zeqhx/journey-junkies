import { formatDistanceToNow } from "date-fns";
import Compressor from "compressorjs";

export const convertToBase64 = (file: File): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    new Compressor(file, {
      quality: 0.5, // Adjust the compression quality as needed
      success(result) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64String = reader.result as string;
          resolve(base64String);
        };
        reader.onerror = reject;
        reader.readAsDataURL(result);
      },
      error(err) {
        reject(err);
      },
    });
  });
};

export function timeAgo(dateString: string) {
  const date = new Date(dateString);
  return formatDistanceToNow(date, { addSuffix: true });
}

export const formatDate = (date: any) => {
  const d = new Date(date);
  return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
};

export const convertFromBase64 = (
  base64String: string,
  fileName: string
): File => {
  const mimeType = base64String.split(",")[0].split(":")[1].split(";")[0];
  const byteString = atob(base64String.split(",")[1]);
  const arrayBuffer = new ArrayBuffer(byteString.length);
  const uint8Array = new Uint8Array(arrayBuffer);
  for (let i = 0; i < byteString.length; i++) {
    uint8Array[i] = byteString.charCodeAt(i);
  }
  const blob = new Blob([arrayBuffer], { type: mimeType });
  return new File([blob], fileName, { type: mimeType });
};

export const filterRates = (rates: any) => {
  let filteredRates: any = [];
  rates.forEach((rate: any) => {
    const date = formatDate(rate.created_at);
    const index = filteredRates.findIndex((r: any) => r.date === date);
    if (index === -1) {
      filteredRates.push({ date, rating: [rate.rating] });
    }
    if (index !== -1) {
      filteredRates[index].rating.push(rate.rating);
    }
  });
  filteredRates.forEach((rate: any) => {
    const average =
      rate.rating.reduce((a: any, b: any) => a + b, 0) / rate.rating.length;
    rate.rating = average.toFixed(2);
  });
  return filteredRates;
};
