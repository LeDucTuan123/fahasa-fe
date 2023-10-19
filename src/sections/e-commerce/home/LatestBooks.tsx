import { Box, Grid, Paper, Typography, styled } from "@mui/material";
import React from "react";

const category = [
  {
    title: "Sách tâm lý",
    image:
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Ym9va3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",

    price: 200.0,
  },
  {
    title: "Sách tâm lý",
    image:
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Ym9va3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",

    price: 200.0,
  },
  {
    title: "Sách tâm lý",
    image:
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Ym9va3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",

    price: 200.0,
  },
  {
    title: "Sách tâm lý",
    image:
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Ym9va3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",

    price: 200.0,
  },
  {
    title: "Sách tâm lý",
    image:
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Ym9va3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",

    price: 200.0,
  },
  {
    title: "Sách tâm lý",
    image:
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Ym9va3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",

    price: 200.0,
  },
  {
    title: "Sách tâm lý",
    image:
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Ym9va3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
  },

];

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  color: theme.palette.text.secondary,
  border: "1px solid #3333",
  height: "200px",
  cursor: "pointer",
}));

export default function LatestBooks() {
  return (
    <Box sx={{ width: "100%", paddingTop: "20px" }}>
      <Typography variant="h6" sx={{ paddingBottom: "20px" }}>
        Sản phẩm mới nhất
      </Typography>

      <Grid container rowSpacing={4} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {category.map((pr, index) => (
          <Grid item xs={6} sm={4} md={3} lg={2.4} key={index}>
            <Item>
              <img
                src={pr.image}
                alt={pr.title}
                width="100%"
                height="120px"
                style={{ objectFit: "cover" }}
              />
              <Typography variant="overline">{pr.title}</Typography>
              <Typography variant="inherit">{pr.price}</Typography>
            </Item>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
