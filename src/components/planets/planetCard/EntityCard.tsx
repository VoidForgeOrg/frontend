// mockup type
import {Card, CardActionArea, CardContent, CardMedia, Typography} from "@mui/material";
import planetImage from "./planet.jpg";
import {Entity} from "../PlanetsMenu.tsx";

type EntityCardProps = {
    entity: Entity;
}

const EntityCard = ({entity}: EntityCardProps) => {
    return (
        <Card sx={{ width: 245 }} >
            <CardActionArea>
                <CardMedia
                    sx={{ height: 140 }}
                    image={planetImage}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {entity.name}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

export default EntityCard
