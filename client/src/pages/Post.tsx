import {
  Button,
  Center,
  Container,
  Divider,
  Flex,
  Image,
  Paper,
  Text,
  TextInput,
  Title,
  createStyles,
  rem,
  Group,
  Rating,
  Menu,
} from "@mantine/core";
import { LoaderData } from "../types";
import { Form, useLoaderData, useNavigate, useSubmit } from "react-router-dom";
import { postPageLoader } from "../loaders";
import HTMLReactParser from "html-react-parser";
import Comment from "../components/UI/Comment";
import {
  IconMoodHappy,
  IconSettings,
  IconEdit,
  IconTrash,
} from "@tabler/icons-react";
import { timeAgo } from "../utils";
import { useUser } from "@clerk/clerk-react";
import { GoogleMap, LoadScript, MarkerF } from '@react-google-maps/api';

const useStyles = createStyles((theme) => ({
  title: {
    fontWeight: 800,
    fontSize: rem(40),
    letterSpacing: rem(-1),
    marginBottom: theme.spacing.xs,
    textAlign: "center",
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
  },
}));

const Post = () => {
  const { post, comments, ratings } = useLoaderData() as LoaderData<
    typeof postPageLoader
  >;
  const { classes, theme } = useStyles();
  const submit = useSubmit();
  const navigate = useNavigate();
  const { user } = useUser();
  const Post = () => {
    const { post, comments, ratings } = useLoaderData() as LoaderData<
      typeof postPageLoader
    >;
    const [markerPosition, setMarkerPosition] = useState({ lat: post.location.lat, lng: post.location.lng });
    //samer change this to post. whatever you do
  
    return (
      <Center my="xl">
        <Container>
          {user?.id === post.author && (
            <Group position="right">
              <Form method="post">
                <Menu
                  trigger="hover"
                  openDelay={100}
                  closeDelay={400}
                  shadow="md"
                  width={160}
                >
                  <Menu.Target>
                    <IconSettings size={24} cursor="pointer" />
                  </Menu.Target>
                  <Menu.Dropdown>
                    <Menu.Item
                      icon={<IconEdit size={14} />}
                      onClick={() => navigate(`/${post.id}/edit`)}
                    >
                      Edit Post
                    </Menu.Item>
                    <Menu.Item
                      color="red"
                      type="submit"
                      name="intent"
                      value="delete"
                      icon={<IconTrash size={14} />}
                    >
                      Delete Post
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              </Form>
            </Group>
          )}
          <Flex justify="center" gap="md" direction="column" mb="md">
            <Center>
              <Text
                fw={500}
                fz={"sm"}
                color={theme.colors[theme.primaryColor][4]}
              >
                {post?.location || "Europe"}
              </Text>
            </Center>
            <Title className={classes.title}>{post.title}</Title>
            <Center>
              <Text fz={"sm"} color="dimmed">
                {timeAgo(post.created_at)}
              </Text>
            </Center>
            <Image
              fit="fill"
              alt={post.title}
              src={post.image}
              radius="md"
              width="100%"
              mih="100%"
            />
            <LoadScript googleMapsApiKey="AIzaSyB_dpImNu2XvLmYc91JsHg_Ll5bUlvqJpQ">
              <GoogleMap
                mapContainerStyle={{ width: '100%', height: '400px' }}
                zoom={10}
                center={markerPosition}
              >
                {markerPosition && <MarkerF position={markerPosition} />}
              </GoogleMap>
            </LoadScript>
          </Flex>
          {HTMLReactParser(post.content)}
          <Flex justify="center" mt={40}>
            <TextInput display={"none"} name="user" value={user?.id} readOnly />
            <Rating
              fractions={2}
              defaultValue={
                ratings?.filter((rating: any) => rating.user === user?.id)![0]
                  ?.rating || 0
              }
              ml={8}
              name="rate"
              onChange={(event) => {
                let formData = new FormData();
                formData.append("intent", "rate");
                formData.append("user", user?.id as string);
                formData.append("rate", String(event));
                formData.append("post_author", String(post.author));
                submit(formData, {
                  action: `/${post.id}`,
                  method: "post",
                });
              }}
              // hide the rating if the user is the author of the post
              display={user?.id === post.author ? "none" : "flex"}
            />
          </Flex>
          <Paper p="lg" my="lg">
            <Flex justify="center" gap="sm" direction="column">
              <Text size="lg" fw={600} mb="lg">
                Comments
              </Text>
              <Form method="post">
                <TextInput
                  display={"none"}
                  name="author"
                  value={JSON.stringify({
                    name: user?.fullName,
                    image: user?.profileImageUrl,
                    verify: user?.unsafeMetadata["verified"],
                  })}
                  readOnly
                />
                <TextInput
                  display={"none"}
                  name="author_id"
                  value={user?.id}
                  readOnly
                />
                <TextInput
                  name="comment"
                  placeholder="Add a comment..."
                  icon={<IconMoodHappy />}
                  mb="lg"
                  rightSectionWidth={rem(62)}
                  rightSection={
                    <Button
                      type="submit"
                      name="intent"
                      value="comment"
                      variant="subtle"
                    >
                      Post
                    </Button>
                  }
                />
              </Form>
              {comments.map((comment: any, index: any) => (
                <div key={comment.id}>
                  <Comment
                    postedAt={timeAgo(comment.created_at)}
                    author={{
                      image: JSON.parse(comment.author).image,
                      name: JSON.parse(comment.author).name,
                      verify: JSON.parse(comment.author).verify,
                    }}
                    body={comment.comment}
                  />
                  {index !== comments.length - 1 && <Divider mt={10} />}
                </div>
              ))}
            </Flex>
          </Paper>
        </Container>
      </Center>
    );
  };
};

export default Post;