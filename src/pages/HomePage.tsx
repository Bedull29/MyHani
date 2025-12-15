import Stack from "@mui/material/Stack";
import { COMMON_TITLES } from "src/constant";
import HeroSection from "src/components/HeroSection";
import { genreSliceEndpoints, useGetGenresQuery } from "src/store/slices/genre";
import { MEDIA_TYPE } from "src/types/Common";
import { CustomGenre, Genre } from "src/types/Genre";
import SliderRowForGenre from "src/components/VideoSlider";
import store from "src/store";

export default function HomePage() {
  return (
    <Component />
  )
}


export async function loader() {
  await store.dispatch(genreSliceEndpoints.getGenres.initiate(MEDIA_TYPE.Movie));
  return null;
}

export function Component() {

  const { data: genres, isSuccess } = useGetGenresQuery(MEDIA_TYPE.Movie);



  if (isSuccess && genres && genres.length > 0) {
    return (
      <Stack spacing={2}>
        <HeroSection mediaType={MEDIA_TYPE.Movie} />
        <SliderRowForGenre
          genre={COMMON_TITLES[0]}
          mediaType={MEDIA_TYPE.Movie}
        />
        <SliderRowForGenre
          genre={COMMON_TITLES[1]}
          mediaType={MEDIA_TYPE.Movie}
        />
        <SliderRowForGenre
          genre={COMMON_TITLES[2]}
          mediaType={MEDIA_TYPE.Movie}
        />
      </Stack>
    );
  }
  return null;
}
