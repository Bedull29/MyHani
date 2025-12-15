import { forwardRef, useCallback, useRef, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import Player from "video.js/dist/types/player";

import MaxLineTypography from "./MaxLineTypography";
import PlayButton from "./PlayButton";
import NetflixIconButton from "./NetflixIconButton";
import AgeLimitChip from "./AgeLimitChip";
import QualityChip from "./QualityChip";
import { formatMinuteToReadable, getRandomNumber } from "src/utils/common";
import SimilarVideoCard from "./SimilarVideoCard";
import { useDetailModal } from "src/providers/DetailModalProvider";
import { useGetSimilarVideosQuery } from "src/store/slices/discover";
import { MEDIA_TYPE } from "src/types/Common";
import VideoJSPlayer from "./watch/VideoJSPlayer";
import { useGetConfigurationQuery } from "src/store/slices/configuration";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DetailModal() {
  const { detail, setDetailType } = useDetailModal();
  const { data: similarVideos } = useGetSimilarVideosQuery(
    { mediaType: detail.mediaType ?? MEDIA_TYPE.Movie, id: detail.id ?? 0 },
    { skip: !detail.id }
  );
  const playerRef = useRef<Player | null>(null);
  const [muted, setMuted] = useState(true);
  const { data: configuration } = useGetConfigurationQuery(undefined);

  const handleReady = useCallback((player: Player) => {
    playerRef.current = player;
    setMuted(player.muted());
  }, []);

  const handleMute = useCallback((status: boolean) => {
    if (playerRef.current) {
      playerRef.current.muted(!status);
      setMuted(!status);
    }
  }, []);

  if (detail.mediaDetail) {
    return (
      <Dialog
        fullWidth
        scroll="body"
        maxWidth="md"
        open={!!detail.mediaDetail}
        id="detail_dialog"
        TransitionComponent={Transition}
      >
        <DialogContent sx={{ p: 0, bgcolor: "#181818" }}>
          <Box
            sx={{
              top: 0,
              left: 0,
              right: 0,
              position: "relative",
              mb: 3,
            }}
          >
            <Box
              sx={{
                width: "100%",
                position: "relative",
                height: "calc(9 / 16 * 100%)",
              }}
            >
              {detail.mediaDetail?.videos.results[0]?.key ? (
                <VideoJSPlayer
                  options={{
                    loop: true,
                    autoplay: true,
                    controls: false,
                    responsive: true,
                    fluid: true,
                    techOrder: ["youtube"],
                    sources: [
                      {
                        type: "video/youtube",
                        src: `https://www.youtube.com/watch?v=${detail.mediaDetail?.videos.results[0]?.key}`,
                      },
                    ],
                  }}
                  onReady={handleReady}
                />
              ) : (
                <Box
                  component="img"
                  src={
                    detail.mediaDetail?.backdrop_path?.startsWith("http")
                      ? detail.mediaDetail?.backdrop_path
                      : `${configuration?.images.base_url}original${detail.mediaDetail?.backdrop_path}`
                  }
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              )}

              <Box
                sx={{
                  background: `linear-gradient(77deg,rgba(0,0,0,.6),transparent 85%)`,
                  top: 0,
                  left: 0,
                  bottom: 0,
                  right: "26.09%",
                  opacity: 1,
                  position: "absolute",
                  transition: "opacity .5s",
                }}
              />
              <Box
                sx={{
                  backgroundColor: "transparent",
                  backgroundImage:
                    "linear-gradient(180deg,hsla(0,0%,8%,0) 0,hsla(0,0%,8%,.15) 15%,hsla(0,0%,8%,.35) 29%,hsla(0,0%,8%,.58) 44%,#141414 68%,#141414)",
                  backgroundRepeat: "repeat-x",
                  backgroundPosition: "0px top",
                  backgroundSize: "100% 100%",
                  bottom: 0,
                  position: "absolute",
                  height: "14.7vw",
                  opacity: 1,
                  top: "auto",
                  width: "100%",
                }}
              />
              <IconButton
                onClick={() => {
                  setDetailType({ mediaType: undefined, id: undefined });
                }}
                sx={{
                  top: 15,
                  right: 15,
                  position: "absolute",
                  bgcolor: "#181818",
                  width: { xs: 22, sm: 40 },
                  height: { xs: 22, sm: 40 },
                  "&:hover": {
                    bgcolor: "primary.main",
                  },
                }}
              >
                <CloseIcon
                  sx={{ color: "white", fontSize: { xs: 14, sm: 22 } }}
                />
              </IconButton>
              <Box
                sx={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  bottom: 16,
                  px: { xs: 2, sm: 3, md: 5 },
                }}
              >
                <MaxLineTypography variant="h4" maxLine={1} sx={{ mb: 2 }}>
                  {detail.mediaDetail?.title}
                </MaxLineTypography>
                <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
                  <PlayButton sx={{ color: "black", py: 0 }} />
                  <NetflixIconButton>
                    <AddIcon />
                  </NetflixIconButton>
                  <NetflixIconButton>
                    <ThumbUpOffAltIcon />
                  </NetflixIconButton>
                  <Box flexGrow={1} />
                  <NetflixIconButton
                    size="large"
                    onClick={() => handleMute(muted)}
                    sx={{ zIndex: 2 }}
                  >
                    {!muted ? <VolumeUpIcon /> : <VolumeOffIcon />}
                  </NetflixIconButton>
                </Stack>

                <Container
                  sx={{
                    p: "0px !important",
                  }}
                >
                  <Grid container spacing={5} alignItems="center">
                    <Grid item xs={12} sm={6} md={8}>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Typography
                          variant="subtitle1"
                          sx={{ color: "success.main" }}
                        >{`${getRandomNumber(100)}% Match`}</Typography>
                        <Typography variant="body2">
                          {detail.mediaDetail?.release_date.substring(0, 4)}
                        </Typography>
                        <AgeLimitChip label={`${getRandomNumber(20)}+`} />
                        <Typography variant="subtitle2">{`${formatMinuteToReadable(
                          getRandomNumber(180)
                        )}`}</Typography>
                        <QualityChip label="HD" />
                      </Stack>

                      <MaxLineTypography
                        maxLine={10}
                        variant="body1"
                        sx={{ mt: 2 }}
                      >
                        {detail.mediaDetail?.overview}
                      </MaxLineTypography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                      <Typography variant="body2" sx={{ my: 1 }}>
                        <span style={{ color: "#777" }}>Genre :</span> <span style={{ color: "white" }}>Romantis, Drama, Cinta</span>
                      </Typography>
                      <Typography variant="body2" sx={{ my: 1 }}>
                        <span style={{ color: "#777" }}>Tersedia dalam :</span> <span style={{ color: "white" }}>Bahasa Indonesia</span>
                      </Typography>
                    </Grid>
                  </Grid>
                </Container>
              </Box>
            </Box>
            {similarVideos && similarVideos.results.length > 0 && (
              <Container
                sx={{
                  py: 2,
                  px: { xs: 2, sm: 3, md: 5 },
                }}
              >
                <Typography variant="h6" sx={{ mb: 2 }}>

                </Typography>
                <Grid container spacing={2}>
                  {similarVideos.results.slice(0, 1).map((sm) => (
                    <Grid item xs={12} key={sm.id}>
                      <Box sx={{ display: "flex", bgcolor: "#333", borderRadius: 1, overflow: "hidden", height: { xs: "auto", sm: 180 }, flexDirection: { xs: "column", sm: "row" } }}>
                        <Box sx={{ width: { xs: "100%", sm: 250 }, minWidth: { sm: 250 }, position: "relative", height: { xs: 200, sm: "100%" } }}>
                          <img
                            src={
                              sm.backdrop_path?.startsWith("https")
                                ? sm.backdrop_path
                                : `${configuration?.images.base_url}w780${sm.backdrop_path}`
                            }
                            alt={sm.title}
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                          />
                          <Box sx={{ position: 'absolute', top: 5, right: 5 }}>
                            <Typography variant="subtitle2" sx={{ bgcolor: 'rgba(0,0,0,0.6)', px: 0.5, borderRadius: 0.5 }}>
                              {formatMinuteToReadable(getRandomNumber(180))}
                            </Typography>
                          </Box>
                        </Box>
                        <Box sx={{ p: 2, flex: 1, display: "flex", flexDirection: "column" }}>
                          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
                            <Typography variant="h6" sx={{ color: "white" }}>
                              {sm.title}
                            </Typography>
                            <NetflixIconButton>
                              <AddIcon />
                            </NetflixIconButton>
                          </Stack>

                          <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                            <Typography variant="subtitle2" sx={{ color: "success.main" }}>
                              {`${getRandomNumber(100)}% Match`}
                            </Typography>
                            <AgeLimitChip label={`${getRandomNumber(20)}+`} />
                            <Typography variant="body2">{sm.release_date.substring(0, 4)}</Typography>
                            <QualityChip label="HD" />
                          </Stack>

                          <MaxLineTypography maxLine={3} variant="body2" sx={{ color: "grey.400" }}>
                            {sm.overview}
                          </MaxLineTypography>
                        </Box>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Container>
            )}
            <Container
              sx={{
                py: 2,
                px: { xs: 2, sm: 3, md: 5 },
                color: "text.secondary"
              }}
            >
              <Typography variant="h6" sx={{ mb: 2, color: "white" }}>
                Tentang Film Ini
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                <span style={{ color: "#777" }}>Sutradara:</span> <span style={{ color: "white" }}>Iamdull</span>
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                <span style={{ color: "#777" }}>Pemeran:</span> <span style={{ color: "white" }}>Hanny,Iamdull</span>
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                <span style={{ color: "#777" }}>Penulis:</span> <span style={{ color: "white" }}>Iamdull</span>
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                <span style={{ color: "#777" }}>Genre:</span> <span style={{ color: "white" }}>Romantis, Drama, Cinta</span>
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                <span style={{ color: "#777" }}>Rating usia:</span> <span style={{ color: "white" }}>18+</span>
              </Typography>
            </Container>
          </Box>
        </DialogContent>
      </Dialog>
    );
  }

  return null;
}
