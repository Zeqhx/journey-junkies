import { Image, Text, Title, createStyles, rem } from "@mantine/core";
import { Link } from "react-router-dom";
import { Post as PostType } from "../../types";
import { timeAgo } from "../../utils";
import { useUser, useClerk } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
const useStyles = createStyles((theme) => ({
  link: {
    all: "unset",
    cursor: "pointer",
  },
  container: {
    display: "grid",
    borderRadius: theme.radius.sm,
    maxWidth: rem(360),
    minWidth: rem(300),
    marginBottom: rem(20),
    padding: theme.spacing.xs,
    transition: "transform 150ms ease, box-shadow 150ms ease",
    "&:hover": {
      transform: "scale(1.02)",
    },
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
}));

const Post = ({
  id,
  created_at,
  image,
  title,
  description,
  location,
}: PostType) => {
  const { classes, theme } = useStyles();
  const { user } = useUser();
  const clerk = useClerk();
  const navigate = useNavigate();
  const postClickHandler = () => {
    if (user) {
      navigate(`/${id}`);
    } else {
      clerk.openSignIn();
    }
  };
  return (
    <div onClick={postClickHandler} className={classes.link}>
      <div className={classes.container}>
        <div className={classes.header}>
          <Text fw={500} fz={"sm"} color={theme.colors[theme.primaryColor][4]}>
            {location}
          </Text>
          <Text c="dimmed" fw={300} fz={"sm"}>
            {timeAgo(created_at)}
          </Text>
        </div>
        <Image
          my={rem(4)}
          fit="contain"
          alt={title}
          src={image}
          radius="md"
          withPlaceholder
        />
        <Title lineClamp={2} order={3}>
          {title}
        </Title>
        <Text lineClamp={3} color="dimmed" size="sm">
          {description}
        </Text>
      </div>
    </div>
  );
};

export default Post;
