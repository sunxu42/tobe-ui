import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Page } from "../../../components";
import { Box, Button, Paper } from "@mui/material";
interface Node {
  id: string;
  name: string;
  symbolSize: number;
  x: number;
  y: number;
  value: number;
  category: number;
  label: any;
}

export default function TagCollectionCreationPage() {
  const { t } = useTranslation();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    // do nothing
  };
  return (
    <Page openLoading={false} pageTitle={t("project-creation-page.form-title")}>
      <Paper
        variant="outlined"
        sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
      >
        <Box justifyContent="center" >
        </Box>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button onClick={() => window.history.back()} sx={{ mt: 3, ml: 1 }}>
              {t("project-creation-page.back-btn")}
            </Button>
            <Button variant="contained" type="submit" sx={{ mt: 3, ml: 1 }}>
              {t("project-creation-page.submit-btn")}
            </Button>
          </Box>
        </Box>
      </Paper>
    </Page>
  );
}
