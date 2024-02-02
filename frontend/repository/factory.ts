import type { RuntimeConfig } from "nuxt/schema";
import axios, { type AxiosInstance } from "axios";
import TravelsRepository from "./modules/travels";

const getClient = ({ REST_HOST }: RuntimeConfig["public"]): AxiosInstance => {
  const timeout = 15 * 1000;

  const client = axios.create({
    baseURL: REST_HOST,
    timeout,
  });

  return client;
};

export const createRepository = (config: RuntimeConfig) => {
  const client = getClient(config.public);

  return {
    travels: TravelsRepository(client),
  };
};
