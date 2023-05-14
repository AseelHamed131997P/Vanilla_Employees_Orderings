import { Config } from "types/config";
const { REACT_APP_GATEWAY = "http://localhost:80/ngn" } = process.env;

const config: Config = {
  api: {
    endpoint: REACT_APP_GATEWAY,
  },
};

export default config;
