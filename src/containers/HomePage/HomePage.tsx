import { Box, Grid, Typography } from "@mui/material";
import { BasicLayout } from "../../components";
import { useState } from "react";

export default function HomePage() {
  return (
    <BasicLayout>
      <GreatingSection />
    </BasicLayout>
  );
}

const Title = (props: any) => {
  return (
    <Box
      sx={{
        ...{ position: "absolute", top: 0, right: 0, p: 2 },
        ...props.sxBody,
      }}
    >
      <Typography
        variant="h1"
        align="right"
        sx={{
          fontWeight: 600,
          fontSize: "12rem",
        }}
      >
        Tobe
      </Typography>
      <Typography variant="h3" align="right" sx={{ fontWeight: 600 }}>
        more than you can dream!
      </Typography>
    </Box>
  );
};

function GreatingSection() {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const _onMouseMove = (event: any) => {
    const { clientWidth, clientHeight } = event.target;
    const { offsetX, offsetY } = event.nativeEvent;
    setX((offsetX / clientWidth) * 100);
    setY((offsetY / clientHeight) * 100);
    console.log(x, y);
  };

  const _onMouseOut = (event: any) => {
    setX(0);
    setY(0);
  };

  return (
    <Grid
      container
      spacing={2}
      sx={{
        width: "100%",
        paddingLeft: "20%",
        paddingRight: "20%",
      }}
    >
      <Grid item sm={false} md={4} />
      <Grid
        item
        sm={12}
        md={8}
        sx={{
          position: "relative",
          cursor: "pointer",
          pt: "0 !important",
          pl: "0 !important",
        }}
        onMouseMove={_onMouseMove}
        onMouseOut={_onMouseOut}
      >
        <Title sxBody={{ position: "relative", color: "#e55100" }} />
        <Title
          sxBody={{
            color: "#ff833a",
            "--maskX": x,
            "--maskY": y,
            transition: "all 0.8s cubic-bezier(0.165, 0.84, 0.44, 1)",
            clipPath:
              "polygon(0 0, calc(var(--maskX) * 1% + (var(--maskY) - 50) * .2%) 0, calc(var(--maskX) * 1% + (var(--maskY) - 50) * -.2%) 100%, 0 100%)",
          }}
        />
      </Grid>
    </Grid>
  );
}
