export class ApiError extends Error {
   constructor(
      public statusCode: number,
      public message: string,
      public details?: any
   ) {
      super(message);
      this.name = "ApiError";
   }
}

export interface ErrorResponse {
   statusCode: number;
   message: string;
   details?: any;
   timestamp: string;

}
