import React from "react";
import { Typography, Card, CardContent, Box } from "@mui/material";

export default function NoMessage() {
  return (
    <Box
      sx={{
        marginTop: 1,
        marginBottom: 1,
      }}
    >
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h5" component="div">
            No Messages yet 🥺💔
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
