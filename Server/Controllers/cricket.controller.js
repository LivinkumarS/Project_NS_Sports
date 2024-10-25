import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();
const URL = process.env.API_URL;

export const auth = async (req, res, next) => {
  const { projectKey, apiKey } = req.body;

  try {
    const response = await fetch(
      `${URL}/v5/core/${projectKey}/auth/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          api_key: apiKey,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json(data);
    }

    res.json(data);
  } catch (error) {
    console.error("Error fetching from API provider:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const match = async (req, res, next) => {
  const { projectKey, matchKey, access_token } = req.body;

  try {
    const response = await fetch(
      `${URL}/v5/cricket/${projectKey}/match/${matchKey}/`,
      {
        method: "GET",
        headers: {
          "rs-token": access_token,
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json(data);
    }

    res.json(data);
  } catch (error) {
    console.error("Error fetching from API provider:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const featuredMatches2 = async (req, res, next) => {
  const { projectKey, access_token } = req.body;

  try {
    const response = await fetch(
      `${URL}/v5/cricket/${projectKey}/featured-matches-2/`,
      {
        method: "GET",
        headers: {
          "rs-token": access_token,
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json(data);
    }

    res.json(data);
  } catch (error) {
    console.error("Error fetching from API provider:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const featuredTournaments = async (req, res, next) => {
  const { projectKey, access_token } = req.body;

  try {
    const response = await fetch(
      `${URL}/v5/cricket/${projectKey}/featured-tournaments/`,
      {
        method: "GET",
        headers: {
          "rs-token": access_token,
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json(data);
    }

    res.json(data);
  } catch (error) {
    console.error("Error fetching from API provider:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getFlag = async (req, res, next) => {
  const { projectKey, access_token, countryCode } = req.body;

  try {
    const response = await fetch(
      `${URL}/v5/cricket/${projectKey}/country/${countryCode}/flags/`,
      {
        method: "GET",
        headers: {
          "rs-token": access_token,
        },
      }
    );

    const data = await response.text();

    if (!response.ok) {
      return res.status(response.status).json(data);
    }

    res.json(data);
  } catch (error) {
    console.error("Error fetching from API provider:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const tournament = async (req, res, next) => {
  const { projectKey, access_token, tourKey } = req.body;

  try {
    const response = await fetch(
      `${URL}/v5/cricket/${projectKey}/tournament/${tourKey}/`,
      {
        method: "GET",
        headers: {
          "rs-token": access_token,
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json(data);
    }

    res.json(data);
  } catch (error) {
    console.error("Error fetching from API provider:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const tournamentFixtures = async (req, res, next) => {
  const { projectKey, access_token, tourKey } = req.body;

  try {
    const response = await fetch(
      `${URL}/v5/cricket/${projectKey}/tournament/${tourKey}/fixtures/`,
      {
        method: "GET",
        headers: {
          "rs-token": access_token,
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json(data);
    }

    res.json(data);
  } catch (error) {
    console.error("Error fetching from API provider:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
