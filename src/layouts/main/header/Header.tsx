import { Icon } from "@iconify/react";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import {
  AppBar,
  Button,
  Container,
  IconButton,
  InputBase,
  Stack,
  Toolbar,
  Typography,
  alpha,
  styled,
} from "@mui/material";
import { ITEMS_NAVIGATION_LIST } from "../../../constans";
import { ItemsNavType } from "../../../types";
import { Link } from "src/components/Link";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  flex: 1,
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.55),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.75),
  },
  ":focus-within": {
    backgroundColor: alpha(theme.palette.common.white, 0.75),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    //   marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    //   [theme.breakpoints.up('md')]: {
    //     width: '100%',
    //   },
  },
  width: "100%",
}));

export default function Header() {
  return (
    <Stack sx={{ flexDirection: "column",  }}>
      <AppBar position="fixed" sx={{backgroundColor: 'rgb(157 202 251 / 90%)',color: (theme) => theme.palette.text.primary, boxShadow: 'none'}}>
        <Toolbar>
          <Container
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              gap: 2,
              padding: "10px 0",
              
            }}
          >
            <Stack
              sx={{
                flex: { xs: 1, md: 0 },
                alignItems: { xs: "center", md: "flex-start" },
                justifyContent: "center",
              }}
            >
              <Link to="/">
                    <img
                    src="https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images/logo.png"
                    width="201px"
                    height="49px"
                    style={{ objectFit: 'contain' }}
                    alt="logo"
                  />
              </Link>
            </Stack>

            <Stack
              sx={{
                flex: 1,
                flexDirection: { xs: "row" },
                alignItems: { xs: "center" },
                gap: 2,
              }}
            >
              <Typography
                sx={{ display: { xs: "none", md: "flex" } }}
                variant="h6"
              >
                Nhà sách
              </Typography>

              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ "aria-label": "search" }}
                />
              </Search>

              <IconButton
              sx={{
                  display:{ xs: "flex", md: "none" }
                }}
                size="large"
                edge="start"
                color="inherit"
                aria-label="open drawer"
              >
                <MenuIcon />
              </IconButton>

              <Stack
                display={{ xs: "none", md: "flex", }}
                flexDirection="row"
                justifyContent="center"
                alignItems="center"
                gap={3}
              >
                {ITEMS_NAVIGATION_LIST.map((item: ItemsNavType) => (
                  <Button
                    key={item.id}
                    variant="text"
                    sx={{flexDirection: "column", color: (theme) => theme.palette.text.primary }}
                  >
                    <Icon icon={item.icon} fontSize={24} />
                    <Typography variant="button">{item.title}</Typography>
                  </Button>
                ))}
              </Stack>
            </Stack>
          </Container>
        </Toolbar>
      </AppBar>
    </Stack>
  );
}
