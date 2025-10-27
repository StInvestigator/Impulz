import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AlbumSimpleDto } from "../../../models/DTO/album/AlbumSimpleDto.ts";
import { $api, $authApi } from "../../../http";
import type { AlbumDto } from "../../../models/AlbumDto.ts";
// import { useAppDispatch } from "../../../hooks/redux.ts";
import { setTotalPages } from "../PageSlice.ts";
import type { AlbumCreationDto } from "../../../models/DTO/album/AlbumCreationDto.ts";

export const fetchAlbumsByAuthor = createAsyncThunk<
  AlbumSimpleDto[],
  { authorId: string; page?: number; size?: number },
  { rejectValue: string }
>(
  "albums/albumsByAuthor",
  async ({ authorId, page = 0, size = 20 }, { rejectWithValue, dispatch }) => {
    try {
      const params = new URLSearchParams();
      if (page !== undefined) params.append("page", page.toString());
      if (size !== undefined) params.append("size", size.toString());

      const response = await $authApi.get(
        `/albums/ByAuthor/${authorId}?${params}`
      );
      dispatch(setTotalPages(response.data.totalPages));
      return response.data.content;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      return rejectWithValue(`Не удалось загрузить альбомы`);
    }
  }
);

export const fetchAlbumDetails = createAsyncThunk<
  AlbumDto,
  number,
  { rejectValue: string }
>(
    "albums/fetchAlbumDetails",
    async (albumId, { rejectWithValue }) => {
      try {
        const response = await $authApi.get(`/albums/Dto/${albumId}`);
        return response.data;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (e) {
        return rejectWithValue("Не удалось загрузить информацию об альбоме");
      }
    }
);

export const fetchAuthorAlbumCollaborations = createAsyncThunk<
  AlbumSimpleDto[],
  { authorId: string; page?: number; size?: number },
  { rejectValue: string }
>(
  "albums/fetchAuthorCollaborations",
  async ({ authorId, page = 0, size = 20 }, { rejectWithValue, dispatch }) => {
    try {
      const params = new URLSearchParams();
      if (page !== undefined) params.append("page", page.toString());
      if (size !== undefined) params.append("size", size.toString());

      const response = await $authApi.get(
        `/albums/ByAuthor/Collaborations/${authorId}?${params}`
      );
      dispatch(setTotalPages(response.data.totalPages));
      return response.data.content;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      return rejectWithValue(`Не удалось загрузить альбомы`);
    }
  }
);

export const fetchAlbumTodayRecommendations = createAsyncThunk<
  AlbumSimpleDto[],
  { page?: number; size?: number },
  { rejectValue: string }
>(
  "albums/fetchAlbumTodayRecommendations",
  async ({ page = 0, size = 20 }, { rejectWithValue, dispatch }) => {
    try {
      const params = new URLSearchParams();
      if (page !== undefined) params.append("page", page.toString());
      if (size !== undefined) params.append("size", size.toString());

      const response = await $api.get(
        `/albums/Recommendations/Today?${params}`
      );
      dispatch(setTotalPages(response.data.totalPages));
      return response.data.content;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      return rejectWithValue(`Не удалось загрузить альбомы`);
    }
  }
);

export const fetchPersonalAlbumsByGenre = createAsyncThunk<
  AlbumSimpleDto[],
  { userId: string; page?: number; size?: number },
  { rejectValue: string }
>(
  "albums/fetchPersonalAlbumsByGenre",
  async ({ userId, page = 0, size = 20 }, { rejectWithValue, dispatch }) => {
    try {
      const params = new URLSearchParams();
      if (page !== undefined) params.append("page", page.toString());
      if (size !== undefined) params.append("size", size.toString());

      const response = await $api.get(
        `/albums/Recommendations/PersonalByGenres/${userId}?${params}`
      );
      dispatch(setTotalPages(response.data.totalPages));
      return response.data.content;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      return rejectWithValue(`Не удалось загрузить альбомы`);
    }
  }
);

export const fetchRecentAlbumsByGenre = createAsyncThunk<
  AlbumSimpleDto[],
  { genreId: number; page?: number; size?: number },
  { rejectValue: string }
>(
  "albums/fetchRecentAlbumsByGenre",
  async ({ genreId, page = 0, size = 20 }, { rejectWithValue, dispatch }) => {
    try {
      const params = new URLSearchParams();
      if (page !== undefined) params.append("page", page.toString());
      if (size !== undefined) params.append("size", size.toString());

      const response = await $api.get(
        `/albums/ByGenre/Recent/${genreId}?${params}`
      );
      dispatch(setTotalPages(response.data.totalPages));
      return response.data.content;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      return rejectWithValue(`Не удалось загрузить альбомы по жанру`);
    }
  }
);

export const createAlbum = createAsyncThunk<
  AlbumDto,
  {
    metadata: AlbumCreationDto;
    coverFile: File | null;
    trackFiles: (File | null)[];
    trackCoverFiles: (File | null)[];
  },
  { rejectValue: string }
>("albums/createAlbum", async (albumData, { rejectWithValue }) => {
  try {
    const formData = new FormData();

    formData.append(
      "metadata",
      new Blob([JSON.stringify(albumData.metadata)], { type: "application/json" })
    );

    if (albumData.coverFile) {
      formData.append("cover", albumData.coverFile);
    }

    if (albumData.trackFiles) {
      albumData.trackFiles.forEach((file) => {
        if (file) {
          formData.append("trackFiles", file);
        }
      });
    }

    if (albumData.trackCoverFiles) {
      albumData.trackCoverFiles.forEach((file) => {
        if (file) {
          formData.append("trackCovers", file);
        }
      });
    }

    console.log("FormData entries: ", Array.from(formData.entries()));
    const response = await $authApi.post("/albums/create", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    return rejectWithValue("Не удалось создать альбом");
  }
});

export const likeAlbum = createAsyncThunk<
    void,
    { userId : string;albumId : number },
    { rejectValue: string }
>(
    'track/likeAlbum',
    async({userId,albumId},{rejectWithValue}) => {
        try {
            await $authApi.post('/albums/like', null, {
                params: {
                    userId: userId,
                    trackId: albumId.toString()
                }
            });
        }
        catch (error: unknown)
        {
            return rejectWithValue(`Failed to like album : ${error}`);
        }
    }
);
