import Masonry from "react-masonry-css";
import { Post } from "../UI";
import { Center, createStyles } from "@mantine/core";
import { Post as PostType } from "../../types";

interface HomeLayoutProps {
  posts: PostType[];
}

const useStyles = createStyles((theme) => ({
  masonry: {
    display: "flex",
    marginLeft: "-1.25rem",
    width: "auto",
  },
  column: {
    paddingLeft: theme.spacing.lg,
    backgroundClip: "padding-box",
  },
}));

const Home = ({ posts }: HomeLayoutProps) => {
  const { classes, theme } = useStyles();
  const breakpointColumnsObj = {
    default: 3,
    1408: 3,
    1200: 3,
    992: 2,
    768: 1,
    576: 1,
  };

  return (
    <Center>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className={classes.masonry}
        columnClassName={classes.column}
      >
        {posts.map((post) => (
          <Post key={post.id} {...post} />
        ))}
      </Masonry>
    </Center>
  );
};

export default Home;
