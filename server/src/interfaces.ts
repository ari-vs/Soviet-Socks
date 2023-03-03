//interface for socks data
export interface Sock {
  id: number
  model: string;
  quantity: number;
  size: string;
  lat: number;
  lon: number;
  base: string;
  city: string;
  manufactured: string;
  officer: string;
}

//interface for officer data
export interface Officer {
  name: string;
  email: string;
  phone: string;
}

//interface for location history data
export interface Location_history {
  arrived_departed: string;
  date: string;
  to_location: string;
  socks_id: number;
}