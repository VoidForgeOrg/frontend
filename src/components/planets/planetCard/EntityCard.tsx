import {Card, CardActionArea, CardContent, CardMedia, Typography} from "@mui/material";
import planetImage from "./planet.jpg";
import {useUniverseHelpers} from "../../../utils";
import {Entity} from "@voidforgeorg/universe-client";
import {ENTITY_CARD_HEIGHT, ENTITY_CARD_WIDTH} from "./EntityCardSizes.ts";

type EntityCardProps = {
    entity: Entity;
}

const EntityCard = (props: EntityCardProps) => {

    const universeHelpers = useUniverseHelpers();
    const {solarSystem, segment} = universeHelpers.getEntityLocation(props.entity);

    return (
        <Card sx={{width: ENTITY_CARD_WIDTH}}>
            <CardActionArea>
                <CardMedia
                    sx={{height: ENTITY_CARD_HEIGHT}}
                    image={planetImage}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {props.entity.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Segment: {segment?.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Solar System: {solarSystem?.name}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

export default EntityCard;
