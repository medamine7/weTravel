import axios, { type AxiosInstance } from "axios";
import TravelsRepository from "./modules/travels";

const getClient = (): AxiosInstance => {
  const timeout = 15 * 1000;
  const REST_HOST = process.env.REST_HOST;

  console.log("REST_HOST", REST_HOST);

  const client = axios.create({
    baseURL: REST_HOST,
    timeout,
  });

  console.log("REST_HOST", REST_HOST);

  return client;
};

export const createRepository = () => {
  const client = getClient();

  return {
    travels: TravelsRepository(client),
  };
};
