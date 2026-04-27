export interface PlayerParams {
  params: Promise<{ teamId: string; playerId: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}
