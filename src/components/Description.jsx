import { Container, Typography } from "@material-ui/core";

export const Description = () => {
  return (
    <Container maxWidth="sm">
      <Typography variant="h3" align="center" color="textPrimary" gutterBottom>
        Veja antes de visitar!
      </Typography>
      <Typography variant="h5" align="center" color="textSecondary" paragraph>
        Aqui você irá encontrar avaliações pessoais escritas por pessoas que
        deixaram sua opinião sobre os restaurantes que frequentaram:
      </Typography>
    </Container>
  );
};
