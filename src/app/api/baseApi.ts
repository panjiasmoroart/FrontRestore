import { fetchBaseQuery, type BaseQueryApi, type FetchArgs } from "@reduxjs/toolkit/query";
import { startLoading, stopLoading } from "../layout/uiSlice";
import { toast } from "react-toastify";

const customBaseQuery = fetchBaseQuery({
  baseUrl: "https://localhost:5001/api",
});

type ErrorResponse = | string | { title: string } | { errors: string[] };

const sleep = () => new Promise(resolve => setTimeout(resolve, 1000));

export const baseQueryWithErrorHandling = async (args: string | FetchArgs, api: BaseQueryApi, extraOptions: object) => {
  api.dispatch(startLoading());
  await sleep();
  const result = await customBaseQuery(args, api, extraOptions);
  api.dispatch(stopLoading());
  if (result.error) {
    console.log(result.error)
    // const { status, data } = result.error;
    // console.log({ status, data });
    const originalStatus = result.error.status === 'PARSING_ERROR' && result.error.originalStatus
      ? result.error.originalStatus
      : result.error.status

    const responseData = result.error.data as ErrorResponse;

    switch (originalStatus) {
      case 400:
        if (typeof responseData === 'string') toast.error(responseData);
        else if ('errors' in responseData) {
          toast.error('validation error');
          // throw Object.values(responseData.errors).flat().join(', ')
        }
        else toast.error(responseData.title);
        break;
      case 401:
        if (typeof responseData === 'object' && 'title' in responseData)
          toast.error(responseData.title)
        break;
      case 403:
        if (typeof responseData === 'object')
          toast.error('403 Forbidden');
        break;
      case 404:
        if (typeof responseData === 'object' && 'title' in responseData)
          toast.error(responseData.title)
        break;
      case 500:
        if (typeof responseData === 'object' && 'title' in responseData)
          toast.error(responseData.title)
        break;
      default:
        console.log("Unexpected error status:", originalStatus);
        break;
    }
  }

  return result;
}
