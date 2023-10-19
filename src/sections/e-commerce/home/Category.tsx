import { Box, Grid, Paper, Stack, Typography, styled } from "@mui/material";
import React from "react";
import Slider from "react-slick";
import useResponsive from "src/hooks/useResponsive";

const category = [
  {
    title: "Sách tâm lý",
    image:
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Ym9va3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
  },
  {
    title: "Sách tâm lý",
    image:
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Ym9va3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
  },
  {
    title: "Sách tâm lý",
    image:
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Ym9va3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
  },
  {
    title: "Sách tâm lý",
    image:
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Ym9va3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
  },
  {
    title: "Sách tâm lý",
    image:
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Ym9va3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
  },
  {
    title: "Sách tâm lý",
    image:
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Ym9va3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
  },
];

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  // ...theme.typography.body2,
  // padding: theme.spacing(2),
  color: theme.palette.text.secondary,
  // border: "1px solid #3333",
  // height: "200px",
  cursor: "pointer",
  textAlign: 'center'
}));

export default function Category() {
  const isMdUp = useResponsive("up", "md");

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    centerMode: true,
    cssEase: "linear",
  };

  return (
    <Box sx={{ width: "100%", paddingTop: "20px" }}>
      <Typography variant="h6" sx={{ paddingBottom: "20px" }}>
        Danh mục sản phẩm
      </Typography>

      {isMdUp ? (
        <Grid container rowSpacing={4} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {category.map((pr, index) => (
            <Grid item md={2} key={index}>
              <Item>
                <img
                  src={pr.image}
                  alt={pr.title}
                  width="100%"
                  height="120px"
                  style={{ objectFit: "cover" }}
                />
                <Typography variant="overline">{pr.title}</Typography>
              </Item>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Slider {...settings}>
          {category.map((pr, index) => (
            <Stack key={index}>
              <img
                src={pr.image}
                alt={pr.title}
                width="100%"
                height="120px"
                style={{ objectFit: "cover" }}
              />
              <Typography variant="overline" alignSelf="center">
                {pr.title}
              </Typography>
            </Stack>
          ))}
        </Slider>
      )}
    </Box>
  );
}
