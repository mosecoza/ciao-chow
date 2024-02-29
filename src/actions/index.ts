"use server"

import { AuthSuccessResponse, Data } from "src/types/api";
import { Chows } from "src/types/chow";

const apiUrl = process.env.NEXT_PUBLIC_ENDPOINT;

export const signUpAction = async (prevState: Data<AuthSuccessResponse | null>,
  signUpData: FormData): Promise<Data<AuthSuccessResponse | null>> => {

  const email = signUpData.get("email");
  const password = signUpData.get("password");
  const username = signUpData.get("username");

  try {
    const response = await fetch(
      `${apiUrl}/auth/local/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, username }),
      }
    );

    if (!response.ok) {
      throw `HTTP error! status: ${response.status}`;
    }

    const resolved: AuthSuccessResponse = await response.json();

    if (resolved.jwt) {
      return { data: resolved, message: "Success", success: true }
    } else {
      return { data: null, message: "Failed", success: false }
    }

  } catch (error) {
    return { data: null, message: "Success", success: false }
  }

}

export const signInAction = async (prevState: Data<AuthSuccessResponse | null>,
  signUpData: FormData): Promise<Data<AuthSuccessResponse | null>> => {

  const email = signUpData.get("email");
  const password = signUpData.get("password");

  try {

    const response = await fetch(
      `${apiUrl}/auth/local`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ identifier: email, password }),
      }
    );

    if (!response.ok) {
      console.error(response.statusText)
      throw `HTTP error! status: ${response.status}`;
    }

    const resolved = await response.json();

    if (resolved.jwt) {
      return { data: resolved, message: "Success", success: true }
    } else {
      return { data: null, message: "Failed", success: false }
    }

  } catch (error) {
    return { data: null, message: "Failed", success: false }
  }

}

export const fetchChowsAction = async (prevState: Data<Chows | null>,
  signUpData: FormData): Promise<Data<Chows | null>> => {

  const jwt = signUpData.get("jwt");

  try {

    const response = await fetch(
      `${apiUrl}/chows?populate=*`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${jwt}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      console.error(response.statusText)
      throw `HTTP error! status: ${response.status}`;
    }

    const resolved: Chows = await response.json();

    if (resolved.data) {
      return { data: resolved, message: "Success", success: true }
    } else {
      return { data: null, message: "Failed", success: false }
    }

  } catch (error) {
    return { data: null, message: "Failed", success: false }
  }

}