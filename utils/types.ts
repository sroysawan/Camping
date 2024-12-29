export type actionFunction = (
  prevState: any,
  formData: FormData
) => Promise<{ message: string }>;

export type LandmarkCardProps = {
  id: string;
  name: string;
  description: string;
  image: string;
  category: string;
  province: string;
  price: number;
  lat: number;
  lng: number;
};

export type ProfileProps = {
  id: string;
  firstName: string;
  lastName: string;
  userName: string;
  profileImage: string;
};

export type Latlng = [number, number]
export type SearchParams = {
  q: string;
  format: "json";
  addressdetails: number;
  polygon_geojson: number;
};
