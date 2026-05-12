import { ApiResponse } from "../api";

interface LoginSuccessData {
  access_token: string;
  refresh_token: string;
}

export type LoginSuccessResponse = ApiResponse<LoginSuccessData>;
