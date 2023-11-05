import { useCallback, useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import { useTranslation } from "react-i18next";
import { Avatar, Tooltip, Grid, Link, Paper, Typography } from "@mui/material";
import { UserBriefProfileDTO } from "../../global/types";
import { PublicDataService } from "../../services";

export default function AuthorDisplayPanel(props: { userId: string }) {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const [profile, setProfile] = useState<UserBriefProfileDTO | null>(null);
  const loadProfile = useCallback((): void => {
    PublicDataService.getBriefProfileByUserId(props.userId)
      .then((response) => {
        setProfile(response.data);
      })
      .catch(() => {
        enqueueSnackbar(t("article-reading-page.msg.error"), {
          variant: "error",
        });
      });
  }, [enqueueSnackbar, t, props.userId]);

  useEffect(() => loadProfile(), [loadProfile]);
  return profile ? (
    <Paper sx={{ p: 0, mb: 1 }} variant="outlined">
      <Grid container>
        <Grid item container xs={12}>
          <Grid
            container
            item
            justifyContent="center"
            alignContent="center"
            direction="column"
            sx={{ borderBottom: "1px solid rgba(0,0,0,0.12)" }}
          >
            <Avatar
              alt={profile.firstName || ""}
              src={profile.avatarUrl || ""}
              sx={{ width: 60, height: 60, m: "0 auto", my: 2 }}
            ></Avatar>
            <Typography variant="h6" color="text.secondary">
              {profile.firstName + " " + profile.lastName}
            </Typography>
          </Grid>
          <Grid
            container
            item
            sx={{ borderBottom: "1px solid rgba(0,0,0,0.12)", py: 1 }}
          >
            <Tooltip title={t("components.author-panel.public-creation-count")}>
              <Grid
                item
                xs={6}
                sx={{ borderRight: "1px solid rgba(0,0,0,0.12)" }}
              >
                <Typography
                  variant="h6"
                  color="text.secondary"
                  sx={{ textAlign: "center" }}
                >
                  {profile.publicCreationCount}
                </Typography>
              </Grid>
            </Tooltip>
            <Tooltip title={t("components.author-panel.view-count")}>
              <Grid item xs={6}>
                <Typography
                  variant="h6"
                  color="text.secondary"
                  sx={{ textAlign: "center" }}
                >
                  {profile.viewCount}
                </Typography>
              </Grid>
            </Tooltip>
          </Grid>
        </Grid>

        <Grid item xs={12} sx={{ px: 2, py: 1 }}>
          <Typography variant="subtitle2" color="text.secondary">
            Blog:{" "}
            <Link href={profile?.blog} target="_blank" color="text.secondary">
              {profile.blog}
            </Link>
          </Typography>
        </Grid>

        <Grid item xs={12} sx={{ px: 2, py: 1 }}>
          <Typography
            variant="subtitle2"
            color="text.secondary"
            sx={{ whiteSpace: "pre-wrap" }}
          >
            {profile.introduction}
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  ) : (
    <></>
  );
}
