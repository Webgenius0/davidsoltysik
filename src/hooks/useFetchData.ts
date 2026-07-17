import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { AxiosInstance } from "axios";

function useAxios(token: string | null = null): AxiosInstance {
  const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });
  return axiosInstance;
}

const useFetchDataWithToken = <T>(url: string, token: string | null = null) => {
  const axiosInstance = useAxios(token);

  const fetchData = async (): Promise<T> => {
    const response = await axiosInstance.get<T>(url);
    return response.data;
  };

  const { data, error, isError, isPending } = useQuery<T>({
    queryKey: [url],
    queryFn: fetchData,
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });

  return { data, error, isError, isPending };
};

export default useFetchDataWithToken;
