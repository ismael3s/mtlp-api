import { createConnection, getConnectionOptions } from "typeorm";

export default async (host = "localhost") => {
  const defaultOptions = await getConnectionOptions();

  return createConnection(
    Object.assign(defaultOptions, {
      host: process.env.NODE_ENV === "test" ? "localhost" : host,
      database:
        process.env.NODE_ENV === "test" ? "mtlp_test" : defaultOptions.database,
    })
  );
};
