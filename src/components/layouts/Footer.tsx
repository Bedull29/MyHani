import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";

export default function Footer() {
  const footerLinks = [
    [
      "FAQ",
      "Investor Relations",
      "Watch to Watch",
      "Coorporate Information",
      "Only on Netflix",
    ],
    ["Help Center", "Jobs", "Term of Use", "Contact Us"],
    ["Account", "Redeem Gift Cards", "Privacy", "Speed Test"],
    [
      "Media Center",
      "Buy Gift Cards",
      "Cookies Preferences",
      "Legal Notices",
    ],
  ];

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "#141414",
        color: "grey.500",
        py: 8,
        px: { xs: 2, md: "60px" },
        mt: "auto",
      }}
    >
      <Box sx={{ maxWidth: "1000px", margin: "0 auto" }}>
        <Typography variant="body1" sx={{ mb: 4 }}>
          Questions? Call <Link href="tel:0895327360742" underline="hover" color="inherit">0895327360742</Link>
        </Typography>

        <Grid container spacing={2}>
          {footerLinks.map((column, index) => (
            <Grid item xs={6} sm={3} key={index}>
              <Stack spacing={2}>
                {column.map((link) => (
                  <Link
                    key={link}
                    href="#"
                    underline="hover"
                    color="inherit"
                    variant="caption"
                    sx={{ fontSize: "13px" }}
                  >
                    {link}
                  </Link>
                ))}
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
