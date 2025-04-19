import qs from "qs";
import queryString from "query-string";

const create = async (credentials, sleepdata) => {
  try {
    let response = await fetch("/api/sleepdata/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization:
          credentials && credentials.t ? "Bearer " + credentials.t : undefined,
      },
      body: JSON.stringify(sleepdata),
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

const listByUser = async (params, credentials, signal) => {
  const query = queryString.stringify(params);
  console.log("===================>>> params inside listByUser:", params);
  try {
    console.log("===================>>> queryString inside try block:", query);
    let response = await fetch("/api/sleepdata?" + query, {
      method: "GET",
      signal: signal,
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + credentials.t,
      },
    });
    console.log("=====================>>> Response from fetch:", response);

    return await response.json();
  } catch (err) {
    console.log(err);
  }
};
export { create, listByUser };
