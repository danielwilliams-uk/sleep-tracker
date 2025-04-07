import queryString from "query-string";

const create = async (credentials, sleepdata) => {
  try {
    let response = await fetch("/api/sleepdata", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: credentials?.t ? "Bearer " + credentials.t : undefined,
      },
      body: JSON.stringify(sleepdata),
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

const getUserSleepData = async (params, credentials, signal) => {
  try {
    let response = await fetch("/api/sleepdata/" + params.sleepdataId, {
      method: "GET",
      signal: signal,
      headers: {
        Accept: "application/json",
        Authorization: credentials?.t ? "Bearer " + credentials.t : undefined,
      },
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

const listByUser = async (params, credentials, signal) => {
  const query = queryString.stringify(params);
  try {
    let response = await fetch("/api/sleepdata?" + query, {
      method: "GET",
      signal: signal,
      headers: {
        Accept: "application/json",
        Authorization: credentials?.t ? "Bearer " + credentials.t : undefined,
      },
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};
