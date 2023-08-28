import { useEffect, useState } from "react";
import { Divider, Grid, Paper, Link, Typography } from "@mui/material";
import { useAuthState } from "../../../contexts";
import { useParams, useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSnackbar } from "notistack";
import {
  AuthorDisplayPanel,
  TobeBreadcrumbs,
  RichReader,
  TagDisplayBar,
  Page,
} from "../../../components";
import { ArticleDetailDTO, BreadcrumbsNode } from "../../../global/types";
import { TimeFormat } from "../../../commons";
import { PublicDataService } from "../../../services";
import RelevantArticlePanel from "./RelevantArticlePanel";
import { URL } from "../../../routes";

export default function ArticleReadingPage() {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const { id } = useParams();
  let [searchParams] = useSearchParams();
  const breadcrumbs: BreadcrumbsNode[] = [];
  if (searchParams.has("subjectId") && searchParams.has("subjectName")) {
    breadcrumbs.push({
      label: t("breadcrumbs.subjects"),
      href: URL.SUBJECTS_PAGE,
    });
    breadcrumbs.push({
      label: searchParams.get("subjectName") || "",
      href: URL.SUBJECT_READING_PAGE.replace(
        ":id",
        searchParams.get("subjectId") || ""
      ),
    });
  }
  const authState = useAuthState();
  const [openLoading, setOpenLoading] = useState<boolean>(false);
  const [article, setArticle] = useState<ArticleDetailDTO | null>(null);

  useEffect(() => {
    function loadArticle(): void {
      setOpenLoading(true);
      PublicDataService.getArticleById(id || "")
        .then((response) => {
          setArticle(response.data);
        })
        .catch(() => {
          enqueueSnackbar(t("article-reading-page.msg.error"), {
            variant: "error",
          });
        })
        .finally(() => setOpenLoading(false));
    }
    loadArticle();
  }, [t, id, enqueueSnackbar]);

  return (
    <Page openLoading={openLoading} pageTitle={article?.title}>
      <TobeBreadcrumbs nodes={breadcrumbs} />
      <Grid container spacing={1}>
        <Grid item xs={12} sm={12} md={9}>
          <Paper sx={{ py: 2, px: 2 }} variant="outlined">
            <Grid container>
              {article && (
                <Grid item container xs={12} sx={{ my: 1 }}>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ flexGrow: 1 }}
                  >
                    {article.authorName} ·{" "}
                    {TimeFormat.dateAndTimeFormat(article.publishTime)} ·{" "}
                    {t("article-reading-page.view")} {article.viewCount}
                  </Typography>
                  {authState?.user.id === article.authorId && (
                    <Link href={`/my/articles/${id}`} sx={{ flexGrow: 0 }}>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ flexGrow: 1 }}
                      >
                        {t("article-reading-page.edit-btn")}
                      </Typography>
                    </Link>
                  )}
                </Grid>
              )}

              {article?.subTitle && (
                <>
                  <Grid item xs={12} sx={{ my: 1 }} color="text.secondary">
                    <Paper
                      sx={{ py: 1, px: 1, backgroundColor: "#f3f2ef" }}
                      variant="outlined"
                    >
                      <Typography variant="subtitle2" color="text.secondary">
                        {article?.subTitle}
                      </Typography>
                    </Paper>
                  </Grid>
                  <Divider />
                </>
              )}

              {article?.tags && (
                <Grid item xs={12} sx={{ mb: 1 }}>
                  <TagDisplayBar tags={article?.tags} />
                </Grid>
              )}

              {article?.content && (
                <Grid item xs={12} sx={{ my: 1 }}>
                  <RichReader htmlValue={article.content} />
                </Grid>
              )}
            </Grid>
          </Paper>
        </Grid>

        <Grid item sm={12} md={3}>
          {article?.authorId && (
            <AuthorDisplayPanel userId={article?.authorId} />
          )}
          {article?.tags && (
            <RelevantArticlePanel
              articleId={article.id}
              tages={article?.tags.map((i) => i.value)}
            />
          )}
        </Grid>
      </Grid>
    </Page>
  );
}
