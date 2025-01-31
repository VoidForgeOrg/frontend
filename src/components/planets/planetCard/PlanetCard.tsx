// mockup type
import {Card, CardActionArea, CardContent, CardMedia, Typography} from "@mui/material";
import planetImage from "./planet.jpg";

type Planet = {
    name: string;
}


type PlanetCardProps = {
    planet: Planet;
}

const PlanetCard = ({planet}: PlanetCardProps) => {
    return (
        <Card sx={{ width: 245 }} >
            <CardActionArea>
                <CardMedia
                    sx={{ height: 140 }}
                    image={planetImage}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {planet.name}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

export default PlanetCard
